import React, { useEffect, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

// ponytail: 768px matches Infima's mobile breakpoint used elsewhere in the theme
const MOBILE_QUERY = "(max-width: 768px)";

const IFRAME_STYLE: React.CSSProperties = {
  border: "1px solid var(--ifm-color-emphasis-300)",
};

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mql.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  return isMobile;
}

const CONTROLS_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  marginTop: "0.75rem",
};

const BUTTON_STYLE: React.CSSProperties = {
  padding: "0.4rem 0.9rem",
  borderRadius: 4,
  border: "1px solid var(--ifm-color-emphasis-300)",
  background: "var(--ifm-background-surface-color)",
  cursor: "pointer",
};

const PAGE_INPUT_STYLE: React.CSSProperties = {
  width: "3rem",
  textAlign: "center",
  border: "1px solid var(--ifm-color-emphasis-300)",
  borderRadius: 4,
  padding: "0.3rem",
};

const MODE_TOGGLE_STYLE: React.CSSProperties = {
  ...BUTTON_STYLE,
  display: "block",
  margin: "0 0 0.75rem auto",
  fontSize: "0.85rem",
};

type Mode = "paginated" | "scroll";

function MobilePdfPages({ file }: { file: string }) {
  const [Document, setDocument] = useState<any>(null);
  const [Page, setPage] = useState<any>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [width, setWidth] = useState<number>(360);
  const [mode, setMode] = useState<Mode>("paginated");

  useEffect(() => {
    let cancelled = false;
    import("react-pdf").then((reactPdf) => {
      if (cancelled) return;
      reactPdf.pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${reactPdf.pdfjs.version}/pdf.worker.min.mjs`;
      setDocument(() => reactPdf.Document);
      setPage(() => reactPdf.Page);
    });
    setWidth(Math.min(window.innerWidth - 48, 500));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setPageInput(String(pageNumber));
  }, [pageNumber]);

  function goTo(n: number) {
    setPageNumber(Math.min(Math.max(n, 1), numPages || n));
  }

  function submitPageInput() {
    const n = parseInt(pageInput, 10);
    if (!Number.isNaN(n)) goTo(n);
    else setPageInput(String(pageNumber));
  }

  if (!Document || !Page) {
    return <p>Chargement du PDF…</p>;
  }

  return (
    <div>
      {numPages > 1 && (
        <button
          type="button"
          style={MODE_TOGGLE_STYLE}
          onClick={() => setMode(mode === "paginated" ? "scroll" : "paginated")}
        >
          {mode === "paginated" ? "☰ Vue défilement" : "▤ Vue par page"}
        </button>
      )}
      <Document
        file={file}
        loading="Chargement du PDF…"
        onLoadSuccess={({ numPages: n }: { numPages: number }) =>
          setNumPages(n)
        }
      >
        {mode === "scroll" ? (
          Array.from({ length: numPages }, (_, i) => (
            <Page
              key={i + 1}
              pageNumber={i + 1}
              width={width}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))
        ) : (
          // ponytail: only the current page (a window of 1) is ever mounted,
          // so a very long PDF never pays for pages the reader hasn't reached
          <Page
            pageNumber={pageNumber}
            width={width}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        )}
      </Document>
      {mode === "paginated" && numPages > 1 && (
        <div style={CONTROLS_STYLE}>
          <button
            type="button"
            style={BUTTON_STYLE}
            onClick={() => goTo(pageNumber - 1)}
            disabled={pageNumber <= 1}
          >
            ‹ Précédent
          </button>
          <span>
            Page{" "}
            <input
              style={PAGE_INPUT_STYLE}
              value={pageInput}
              inputMode="numeric"
              onChange={(e) => setPageInput(e.target.value)}
              onBlur={submitPageInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitPageInput();
              }}
            />{" "}
            / {numPages}
          </span>
          <button
            type="button"
            style={BUTTON_STYLE}
            onClick={() => goTo(pageNumber + 1)}
            disabled={pageNumber >= numPages}
          >
            Suivant ›
          </button>
        </div>
      )}
    </div>
  );
}

const PLACEHOLDER_STYLE: React.CSSProperties = {
  border: "1px dashed var(--ifm-color-emphasis-300)",
  borderRadius: 8,
  padding: "3rem 1.5rem",
  textAlign: "center",
  color: "var(--ifm-color-emphasis-700)",
  background: "var(--ifm-background-surface-color)",
};

function PdfUnavailablePlaceholder({ file }: { file: string }) {
  return (
    <div style={PLACEHOLDER_STYLE}>
      <p style={{ fontSize: "1.5rem", margin: 0 }}>📄</p>
      <p style={{ fontWeight: "bold", margin: "0.5rem 0" }}>
        PDF preview only available in production
      </p>
      <p style={{ fontSize: "0.85rem", margin: 0 }}>
        Source PDFs live in Drive and are fetched at CI build time —{" "}
        <code>static/pdfs/</code> isn't populated in local dev.
        <br />
        Expected file: <code>{file}</code>
      </p>
    </div>
  );
}

// checks real availability via fetch rather than an env-var/NODE_ENV branch,
// so the same code path also degrades gracefully if a file is ever missing
// in production (e.g. the CI fetch step silently under-delivered).
function usePdfAvailable(file: string): boolean | null {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    setAvailable(null);
    fetch(file, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setAvailable(res.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, [file]);

  return available;
}

/**
 * Renders a PDF: a native iframe on desktop, or a single-page image with
 * prev/next + jump-to-page controls on mobile (native iframes handle PDFs
 * inconsistently on mobile browsers, notably iOS Safari). Shows a placeholder
 * instead of a broken embed if the file isn't actually reachable (e.g. local
 * dev, where static/pdfs/ is intentionally not populated).
 */
export default function PdfViewer({ file }: { file: string }): JSX.Element {
  return (
    // @ts-expect-error -- BrowserOnly's typed return (ReactNode) predates the
    // stricter JSX.Element typing pulled in by this repo's React types.
    <BrowserOnly fallback={<div style={{ height: 800 }} />}>
      {() => <PdfViewerInner file={file} />}
    </BrowserOnly>
  );
}

function PdfViewerInner({ file }: { file: string }) {
  const isMobile = useIsMobile();
  const available = usePdfAvailable(file);

  if (available === null) {
    return <p>Chargement du PDF…</p>;
  }
  if (available === false) {
    return <PdfUnavailablePlaceholder file={file} />;
  }
  if (isMobile) {
    return <MobilePdfPages file={file} />;
  }

  return <iframe src={file} width="100%" height="800px" style={IFRAME_STYLE} />;
}
