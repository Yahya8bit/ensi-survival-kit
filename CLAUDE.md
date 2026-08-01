# PDF → Markdown conversion guidelines

These rules apply whenever you (Claude Code) are converting a PDF, scanned document, or extracted text (course slides, TD/TP statements, exam PDFs, handbooks) into a markdown doc under `docs/`. They exist to keep this a faithful, trustworthy transcription layer — not a rewrite.

## 1. The core rule: fidelity over improvement

Your job in a conversion pass is **transcription with formatting**, not editing. Two separate jobs get conflated easily — don't let them:

- **Conversion pass**: PDF content → correctly formatted markdown. Content must match the source.
- **Enhancement pass**: adding admonitions, diagrams, interactive widgets. A **separate, later, explicitly-requested** task.

Never do both in the same pass unless the user asks for both. If a conversion task tempts you to also "clean up" an exercise statement, rephrase an awkward sentence, or add an explanation the source doesn't have — don't. Flag it in your summary instead and let the person decide.

## 2. Never change

- **Numbers, values, formulas, code, exercise statements** — transcribe exactly. A typo in the source PDF (e.g. a professor's OCR-mangled variable name) gets flagged in your output summary, not silently "corrected" based on your guess at intent.
- **The order and structure of content** — sections, exercise numbering, sub-question lettering stay in the source's order.
- **Language** — courses here are in French; do not translate to English or vice versa, and do not "fix" mixed terminology (franglais technical terms are normal in this domain).
- **Meaning-bearing wording** — a professor's specific phrasing of a definition or a warning is content, not decoration. Reformat its container (e.g. wrap it in `:::warning`), never rewrite its sentence.
- **Correction/solution content** — if a PDF includes a correction, transcribe it in full inside a `<details>` block (see existing pattern in this repo) — don't summarize or truncate it.

## 3. What conversion formatting IS allowed to change

This is purely structural/presentational, and should be applied consistently:

- Markdown headings (`#`, `##`) reflecting the PDF's existing heading hierarchy — don't invent new hierarchy levels the source doesn't have.
- Front matter (`sidebar_position`, `slug` if needed) and a `_category_.json` per folder, following the pattern already used in this repo (see an existing category file for the exact shape, including the `link.generated-index` field so breadcrumbs stay clickable).
- Fenced code blocks for code/pseudocode, with a language tag when determinable.
- Tables for genuinely tabular source content (not for prose reflowed into a table).
- Removing PDF artifacts that carry no content: page numbers, running headers/footers, "page X of Y", repeated document titles on every page, OCR line-break hyphenation (`exem-\nple` → `exemple`).
- Converting the source's own ASCII-art diagrams into Mermaid **only when the diagram already exists in the source** — this is a faithful re-rendering of existing content, not new content. Do not invent a diagram for a concept that was only prose in the PDF; that's an enhancement-pass decision (see §4).
  - **Match the source's spatial layout, not just its nodes and edges.** Mermaid's default `flowchart TD` auto-layout stacks everything top-to-bottom regardless of how the original diagram was arranged. If the source shows two elements side by side (e.g. two peer subsystems that exchange data), nest them in an outer `subgraph` with `direction LR` so they render as peers — don't let auto-layout silently turn a left-right peer relationship into a top-down hierarchy, since that changes what the diagram communicates (peers vs. steps in a sequence).
  - **Match arrow directionality exactly.** If the source shows a bidirectional arrow (data/control flows both ways), use `<-->`, not `-->`. A one-directional arrow where the source had two-way flow is a fidelity error, not a simplification.
  - Curved/hand-drawn arrow styling in the source (e.g. Excalidraw-style diagrams) does not need to be replicated — Mermaid's straight auto-routed edges are an acceptable stylistic difference as long as the topology (grouping, direction, connections) matches.
  - After converting, sanity-check the rendered diagram against the source image side by side before considering the conversion done.
- Math notation: LaTeX via `$...$` / `$$...$$` for formulas that were rendered as math in the source.

## 4. Adding visuals or interactivity — separate task, explicit approval only

Do **not** add these during a conversion pass, even if they'd obviously improve the doc:

- New diagrams (Mermaid or otherwise) for concepts the source only described in prose
- Admonition conversions (`:::tip`/`:::warning`/`:::info`) for prose that wasn't already visually distinguished in the source
- Interactive MDX components (calculators, simulators, visualizers)
- Difficulty/time badges, quizzes, or any other pedagogical addition

These are real value-adds for this project, but they're **editorial decisions about a specific doc**, made deliberately by the person maintaining the site — not something to bundle into a bulk PDF conversion. Mixing them in makes diffs impossible to review (can't tell what's a transcription fix vs. new content) and risks silently introducing a beginner-facing widget with a bug, framed as if the PDF said so.

If you notice a conversion candidate for one of these while doing a conversion pass, note it in your summary ("this section's `Attention !` callouts would be good `:::warning` candidates — want me to do that as a follow-up?") rather than acting on it.

## 5. When something is ambiguous — flag, don't guess

If OCR/extraction produced something unclear (garbled character, unreadable table cell, a formula that didn't extract cleanly), do not silently invent a plausible-looking fix. Options, in order of preference:

1. Leave a clearly marked placeholder: `<!-- TODO: unclear in source, verify against original PDF page N -->`
2. Ask the person if you have access to check the original page/image.
3. If you must make a best-effort guess to keep the doc usable, say so explicitly in your task summary — never silently.

## 6. Workflow

- Convert **one document at a time**, unless the person explicitly asks for a bulk pass.
- Show a diff or before/after before writing to `docs/` when converting a doc that already exists (i.e. this is a re-conversion or fix), so the person can catch anything that drifted from "formatting only."
- For brand-new conversions (PDF has no existing markdown counterpart yet), it's fine to write directly, but summarize what you did and flag anything from §5.
- Preserve the module/semester/specialization folder structure already established in `docs/` — new content goes in the matching `Semester N/` or `Semester 5/<track>/` folder, following existing `_category_.json` and file-naming conventions (lowercase, hyphenated slugs).

## 7. Attribution

If the source PDF is a specific handbook, professor's slides, or named document, note the source at the top of the converted doc (e.g. as a short italic line under the title), so future editors know where to check the original if something looks off.
