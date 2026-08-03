# ENSI Knowledge

A Guide on how to survive your studies at ENSI. You will find tips, references, projects & cheat sheets.

## Contributions

This project is principally community driven and needs **your support**, every line **helps**.

Adding courses, cheat sheets, links to projects, exams and any content related to your field that would prove useful is welcome.

For an excellent markdown edit experience I highly recommend using [Marktext](https://github.com/marktext/marktext) as an editor instead of manually changing the markdown.

Even if you don't have content to add to the project you can check the [issues](https://github.com/YOUR_GITHUB_USERNAME/ensi-knowledge/issues) for any potential bugs and tasks.

New to open-source? Please read [this guide](https://www.dataschool.io/how-to-contribute-on-github/) on how to contribute to open-source projects.

## Setup

This project makes use of [Volta](https://volta.sh/) to manage the node and yarn versions.

Make sure [Volta](https://volta.sh/) is installed and configured on your system. This project relies on **specific** node & yarn versions.

### Unix/Linux

```bash
curl https://get.volta.sh | bash
```

### Windows

Follow this [guide](https://docs.volta.sh/guide/getting-started)

### Dependencies Installation

Install your dependencies. This project uses **Yarn Berry** with the `node-modules` linker, so a regular `node_modules/` folder is created.

```bash
yarn
```

## PDF sources

Every doc's "PDF" tab (`<PdfViewer file="/pdfs/...">`) shows the original source PDF the page was transcribed from. Those PDFs are **not stored in this repo** — they live in a Google Drive folder (`ensi-knowledge-pdfs/`, mirroring `docs/`'s folder structure), and `static/pdfs/*.pdf` is gitignored. Two separate mechanisms populate `static/pdfs/` from that same Drive folder — they don't share code, just the source:

- **Production builds** (CI): a step in `.github/workflows/deploy.yml` runs `scripts/fetch-pdfs.mjs` before `yarn build`, downloading every referenced PDF from Drive **via a Google service account** (`GDRIVE_SERVICE_ACCOUNT_KEY` secret + `GDRIVE_PDFS_FOLDER_ID`) into `static/pdfs/`. The step fails the build if any expected PDF is missing or fails to download — it never ships a doc with a silently-broken PDF tab.
- **Local dev**: run `yarn sync-pdfs` to copy the same files **straight off the GVFS Google Drive mount** (`scripts/sync-pdfs-dev.mjs`) — no service account, no network round-trip, just a local filesystem read via Nautilus/GNOME Online Accounts. If Drive hasn't been mounted yet this session, the script tells you to open the Files app and click into Google Drive once, then re-run it.
- **Without running the sync**: `static/pdfs/` stays empty and `PdfViewer` shows a "PDF preview only available in production" placeholder per-file instead of a broken embed — this is a genuine existence check (`fetch(...HEAD)`), not an environment check, so it also self-heals the moment a file shows up (e.g. partway through a sync).
- **Adding a new PDF**: drop it into the matching folder under `ensi-knowledge-pdfs/` in Drive (same relative path as the doc under `docs/`), then add it to `scripts/pdf-manifest.json` (`{ "name": "...", "drivePath": [...] }`) so both CI and `yarn sync-pdfs` pick it up.

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
