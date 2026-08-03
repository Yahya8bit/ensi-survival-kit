// Local-dev counterpart to scripts/fetch-pdfs.mjs. CI fetches PDFs from Drive
// via a service account; here, dev just reads them straight off the GVFS
// Google Drive mount (Nautilus/GNOME Online Accounts), since it's the same
// filesystem read either way. Reuses the same manifest (pdf-manifest.json —
// 89 referenced files) and writes to the same flat static/pdfs/<name> layout
// fetch-pdfs.mjs produces, so PdfViewer's /pdfs/<name> paths never change.
//
// This is a real filesystem sync, not a build step — safe to run repeatedly,
// and safe to skip (PdfViewer falls back to a placeholder per-file if a PDF
// genuinely isn't there).

import { execSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(
  await import('node:fs').then((fs) => fs.readFileSync(path.join(__dirname, 'pdf-manifest.json'), 'utf-8'))
);

const outDir = path.join(__dirname, '..', 'static', 'pdfs');
const gvfsBase = `/run/user/${process.getuid()}/gvfs`;

function findMyDriveRoot(accountDir) {
  // `ls`/readdir on a Drive GVFS mount shows opaque file IDs, not names —
  // only `gio list`'s standard::display-name attribute resolves the real
  // name, so that's the one place we need it. Everything below "My Drive"
  // we already know the literal names for (our own manifest), and GVFS
  // resolves a known name directly without needing a listing.
  let out;
  try {
    out = execSync(`gio list -a standard::display-name "${accountDir}"`, { encoding: 'utf-8' });
  } catch {
    return null;
  }
  for (const line of out.split('\n')) {
    if (line.includes('display-name=My Drive')) {
      return line.split('\t')[0];
    }
  }
  return null;
}

function findSourceRoot() {
  if (!existsSync(gvfsBase)) return null;
  const entries = readdirSync(gvfsBase).filter((e) => e.startsWith('google-drive:host='));
  for (const entry of entries) {
    const accountDir = path.join(gvfsBase, entry);
    const myDriveId = findMyDriveRoot(accountDir);
    if (!myDriveId) continue;
    const candidate = path.join(accountDir, myDriveId, 'ensi-knowledge-pdfs');
    if (existsSync(candidate) && statSync(candidate).isDirectory()) {
      return candidate;
    }
  }
  return null;
}

const sourceRoot = findSourceRoot();

if (!sourceRoot) {
  console.error(`
No GVFS Google Drive mount with an "ensi-knowledge-pdfs" folder was found under:
  ${gvfsBase}/google-drive:host=*,user=*/

This is expected if Drive hasn't been mounted yet this session — GVFS mounts
lazily and won't appear on disk until Nautilus (the Files app) has opened
Google Drive at least once.

  → Open the Files app, click into "Google Drive" in the sidebar once, then
    re-run this script (yarn sync-pdfs).

static/pdfs/ was left untouched — PdfViewer will show its "not available"
placeholder for any PDF that isn't already there.
`);
  process.exit(1);
}

console.log(`Found Drive source: ${sourceRoot}`);
mkdirSync(outDir, { recursive: true });

let synced = 0;
const missing = [];

for (const entry of manifest) {
  const { name, drivePath } = entry;
  const src = path.join(sourceRoot, ...drivePath, name);
  const dest = path.join(outDir, name);
  if (!existsSync(src)) {
    missing.push(name);
    continue;
  }
  copyFileSync(src, dest);
  synced += 1;
}

console.log(`Synced ${synced}/${manifest.length} PDFs into static/pdfs/.`);
if (missing.length > 0) {
  console.warn(`\n${missing.length} file(s) not found in Drive (left missing locally, PdfViewer will show a placeholder for these):`);
  for (const m of missing) console.warn(`  - ${m}`);
}
