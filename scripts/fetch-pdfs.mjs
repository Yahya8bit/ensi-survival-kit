// Fetches every publicly-referenced course PDF from the Drive archive
// (ensi-knowledge-pdfs/, mirroring docs/) into static/pdfs/ at CI build time.
// static/pdfs/*.pdf is gitignored — this step is what actually populates it
// in production. Local dev intentionally does not run this; PdfViewer shows
// a placeholder instead (see src/components/PdfViewer).
//
// Fails loudly (non-zero exit) on any missing/failed file — a build must
// never silently ship without a PDF a doc expects.

import { google } from 'googleapis';
import { createWriteStream, mkdirSync } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(
  await import('node:fs').then((fs) => fs.readFileSync(path.join(__dirname, 'pdf-manifest.json'), 'utf-8'))
);

const ROOT_FOLDER_ID = process.env.GDRIVE_PDFS_FOLDER_ID;
const KEY_JSON = process.env.GDRIVE_SERVICE_ACCOUNT_KEY;

if (!ROOT_FOLDER_ID) {
  console.error('FATAL: GDRIVE_PDFS_FOLDER_ID is not set.');
  process.exit(1);
}
if (!KEY_JSON) {
  console.error('FATAL: GDRIVE_SERVICE_ACCOUNT_KEY is not set.');
  process.exit(1);
}

const credentials = JSON.parse(KEY_JSON);
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});
const drive = google.drive({ version: 'v3', auth });

function escapeForQuery(name) {
  return name.replace(/'/g, "\\'");
}

async function findChild(parentId, name, mimeTypeClause) {
  const q = `'${parentId}' in parents and name = '${escapeForQuery(name)}' and trashed = false${mimeTypeClause}`;
  const res = await drive.files.list({ q, fields: 'files(id, name, size)', pageSize: 5 });
  return res.data.files?.[0] ?? null;
}

async function resolveFolderPath(rootId, segments) {
  let current = rootId;
  for (const segment of segments) {
    const folder = await findChild(current, segment, " and mimeType = 'application/vnd.google-apps.folder'");
    if (!folder) {
      throw new Error(`Drive folder not found: .../${segments.join('/')} (missing segment "${segment}")`);
    }
    current = folder.id;
  }
  return current;
}

async function downloadFile(fileId, destPath) {
  const res = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' });
  await pipeline(res.data, createWriteStream(destPath));
}

const outDir = path.join(__dirname, '..', 'static', 'pdfs');
mkdirSync(outDir, { recursive: true });

const failures = [];

for (const entry of manifest) {
  const { name, drivePath } = entry;
  const destPath = path.join(outDir, name);
  try {
    const folderId = await resolveFolderPath(ROOT_FOLDER_ID, drivePath);
    const file = await findChild(folderId, name, '');
    if (!file) {
      throw new Error(`file not found in Drive folder ${drivePath.join('/')}/`);
    }
    await downloadFile(file.id, destPath);
    console.log(`OK: ${name}`);
  } catch (err) {
    console.error(`FAILED: ${name} — ${err.message}`);
    failures.push(name);
  }
}

if (failures.length > 0) {
  console.error(`\n${failures.length}/${manifest.length} PDFs failed to fetch from Drive:`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(`\nAll ${manifest.length} PDFs fetched successfully.`);
