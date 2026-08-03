import React, { useEffect, useMemo, useRef } from "react";
import ErrorBoundary from "@docusaurus/ErrorBoundary";
import {
  ErrorBoundaryErrorMessageFallback,
  useColorMode,
} from "@docusaurus/theme-common";
import {
  MermaidContainerClassName,
  useMermaidRenderResult,
} from "@docusaurus/theme-mermaid/client";
import styles from "./styles.module.css";

// ponytail: mermaid.options.themeVariables is a single object shared across
// light/dark (only the theme *name* is picked per-mode by docusaurus), and
// mermaid parses colors synchronously so CSS var() strings don't work — so
// we pick a literal palette here based on colorMode instead. Same tokens as
// the rest of the site (--ifm-color-primary, surface grays), just resolved
// to hex since mermaid needs real values.
// Values traced from src/css/custom.css + Infima defaults (node_modules/infima),
// same tokens DiskCalculator.tsx uses for its card/border/accent — see PR
// discussion. Node fill is a translucent wash of --ifm-color-primary
// (#3578e5) since Infima has no lighter-than-lightest tint token; everything
// else is a literal resolved --ifm-* value (mermaid parses colors
// synchronously, so var() strings aren't usable here).
const LIGHT_VARS = {
  background: "#ffffff",
  primaryColor: "rgba(53,120,229,0.10)",
  primaryTextColor: "#1c1e21",
  primaryBorderColor: "#dadde1",
  secondaryColor: "#f5f6f7",
  secondaryTextColor: "#1c1e21",
  secondaryBorderColor: "#dadde1",
  tertiaryColor: "#f5f6f7",
  tertiaryTextColor: "#1c1e21",
  tertiaryBorderColor: "#dadde1",
  lineColor: "#8d949e",
  textColor: "#1c1e21",
  nodeTextColor: "#1c1e21",
  mainBkg: "rgba(53,120,229,0.10)",
  nodeBorder: "#dadde1",
  clusterBkg: "#f5f6f7",
  clusterBorder: "#dadde1",
  edgeLabelBackground: "#f5f6f7",
  titleColor: "#1c1e21",
};

const DARK_VARS = {
  background: "#1e2125",
  primaryColor: "rgba(53,120,229,0.18)",
  primaryTextColor: "#e3e3e3",
  primaryBorderColor: "#606770",
  secondaryColor: "#1c1e21",
  secondaryTextColor: "#e3e3e3",
  secondaryBorderColor: "#606770",
  tertiaryColor: "#121212",
  tertiaryTextColor: "#e3e3e3",
  tertiaryBorderColor: "#606770",
  lineColor: "#ccd0d5",
  textColor: "#e3e3e3",
  nodeTextColor: "#e3e3e3",
  mainBkg: "rgba(53,120,229,0.18)",
  nodeBorder: "#606770",
  clusterBkg: "#121212",
  clusterBorder: "#606770",
  edgeLabelBackground: "#1c1e21",
  titleColor: "#e3e3e3",
};

function MermaidRenderResult({ renderResult }) {
  const ref = useRef(null);
  useEffect(() => {
    const div = ref.current;
    renderResult.bindFunctions?.(div);
  }, [renderResult]);
  return (
    <div
      ref={ref}
      className={`${MermaidContainerClassName} ${styles.container}`}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: renderResult.svg }}
    />
  );
}

function MermaidRenderer({ value }: { value: string }) {
  const { colorMode } = useColorMode();
  // Must be a stable reference: useMermaidRenderResult's effect depends on
  // `config` by identity, so a fresh object literal here would retrigger
  // the render on every result update — infinite loop.
  const config = useMemo(
    () => ({
      startOnLoad: false,
      theme: "base" as const,
      themeVariables: colorMode === "dark" ? DARK_VARS : LIGHT_VARS,
    }),
    [colorMode]
  );
  const renderResult = useMermaidRenderResult({ text: value, config });
  if (renderResult === null) {
    return null;
  }
  return <MermaidRenderResult renderResult={renderResult} />;
}

export interface Props {
  value: string;
}

export default function Mermaid({ value }: Props): JSX.Element {
  return (
    <ErrorBoundary
      fallback={(params) => <ErrorBoundaryErrorMessageFallback {...params} />}
    >
      <MermaidRenderer value={value} />
    </ErrorBoundary>
  );
}
