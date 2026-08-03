import React, { useMemo, useState } from "react";
import katex from "katex";

// ponytail: one hardcoded worked example (the 4-sommets graph from the course
// PDF, with a negative edge 3->1) — the Floyd-Warshall recurrence itself IS run
// generically over an n x n matrix built from EDGES.

type NodeId = 1 | 2 | 3 | 4;

const NODES: Record<NodeId, { x: number; y: number }> = {
  1: { x: 150, y: 90 },
  2: { x: 450, y: 90 },
  3: { x: 150, y: 340 },
  4: { x: 450, y: 340 },
};

const IDS: NodeId[] = [1, 2, 3, 4];

const EDGES: [NodeId, NodeId, number][] = [
  [1, 2, 3],
  [2, 1, 2],
  [3, 1, -2],
  [2, 3, 2],
  [4, 2, 4],
  [2, 4, 2],
  [3, 4, 1],
  [4, 3, 4],
  [4, 1, 3],
];

type Cell = number | "∞";
type PCell = NodeId | 0;

interface Step {
  label: string;
  k: NodeId | null;
  L: Cell[][]; // 1-indexed via offset, L[i-1][j-1]
  P: PCell[][];
  changedCells: Set<string>; // "i-j"
}

function buildSteps(): Step[] {
  const n = IDS.length;
  let L: Cell[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      const a = IDS[i];
      const b = IDS[j];
      if (a === b) return 0;
      const e = EDGES.find(([from, to]) => from === a && to === b);
      return e ? e[2] : "∞";
    })
  );
  // P⁽⁰⁾ : p_ij = 0 si l_ij = +∞, sinon i (le prédécesseur direct de j sur l'arc i->j est i lui-même)
  let P: PCell[][] = L.map((row, i) =>
    row.map((v) => (v === "∞" ? 0 : IDS[i]))
  );

  const steps: Step[] = [
    {
      label:
        "L⁽⁰⁾ = L : matrice initiale des arcs directs (0 sur la diagonale, +∞ si aucun arc direct).",
      k: null,
      L: L.map((row) => [...row]),
      P: P.map((row) => [...row]),
      changedCells: new Set(),
    },
  ];

  for (const k of IDS) {
    const nextL = L.map((row) => [...row]);
    const nextP = P.map((row) => [...row]);
    const changed = new Set<string>();
    const ki = IDS.indexOf(k);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        const lik = L[i][ki];
        const lkj = L[ki][j];
        if (lik === "∞" || lkj === "∞") continue;
        const candidate = lik + lkj;
        if (L[i][j] === "∞" || candidate < L[i][j]) {
          nextL[i][j] = candidate;
          nextP[i][j] = P[ki][j];
          changed.add(`${IDS[i]}-${IDS[j]}`);
        }
      }
    }
    steps.push({
      label:
        changed.size > 0
          ? `k=${k} : passage par ${k} améliore ${[...changed]
              .map((c) => `l(${c.replace("-", ",")})`)
              .join(", ")}.`
          : `k=${k} : aucune amélioration en passant par ${k}.`,
      k,
      L: nextL,
      P: nextP,
      changedCells: changed,
    });
    L = nextL;
    P = nextP;
  }

  return steps;
}

const STEPS = buildSteps();

const CONTROL_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  margin: "0.75rem 0",
};

const BUTTON_STYLE: React.CSSProperties = {
  padding: "0.4rem 0.9rem",
  borderRadius: 4,
  border: "1px solid var(--ifm-color-emphasis-300)",
  background: "var(--ifm-background-surface-color)",
  cursor: "pointer",
};

// real KaTeX \bmatrix (same rendering path as the site's own $...$ math),
// not a hand-drawn bracket — changed cells get \textcolor'd inline in the
// LaTeX source itself so KaTeX renders the highlight, not CSS.
function matrixToLatex(
  rows: (Cell | PCell)[][],
  changed?: Set<string>
): string {
  const body = rows
    .map((row, ri) =>
      row
        .map((v, ci) => {
          const text = v === "∞" ? "\\infty" : String(v);
          const isChanged = changed?.has(`${IDS[ri]}-${IDS[ci]}`);
          return isChanged ? `\\textcolor{#e67700}{\\mathbf{${text}}}` : text;
        })
        .join(" & ")
    )
    .join(" \\\\ ");
  return `\\begin{bmatrix} ${body} \\end{bmatrix}`;
}

function Matrix({
  title,
  rows,
  changed,
}: {
  title: string;
  rows: (Cell | PCell)[][];
  changed?: Set<string>;
}): JSX.Element {
  const html = useMemo(
    () =>
      katex.renderToString(matrixToLatex(rows, changed), {
        throwOnError: false,
        displayMode: true,
      }),
    [rows, changed]
  );
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 1.5rem",
      }}
    >
      <div style={{ fontSize: "0.95rem", marginBottom: "0.3rem" }}>{title}</div>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default function FloydWarshallVisualizer(): JSX.Element {
  const [i, setI] = useState(0);
  const step = STEPS[i];

  return (
    <div>
      <svg
        viewBox="0 0 600 430"
        style={{
          width: "100%",
          maxWidth: 420,
          display: "block",
          margin: "0 auto",
        }}
      >
        <defs>
          <marker
            id="fw-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L7,3 L0,6 Z" fill="var(--ifm-color-emphasis-500)" />
          </marker>
        </defs>
        {EDGES.map(([a, b, w]) => {
          const pa = NODES[a];
          const pb = NODES[b];
          const dx = pb.x - pa.x;
          const dy = pb.y - pa.y;
          const len = Math.hypot(dx, dy);
          const r = 22;
          const x1 = pa.x + (dx / len) * r;
          const y1 = pa.y + (dy / len) * r;
          const x2 = pb.x - (dx / len) * r;
          const y2 = pb.y - (dy / len) * r;
          // offset parallel edges (a->b vs b->a) so they don't overlap
          const midx = (x1 + x2) / 2 - (dy / len) * 12;
          const midy = (y1 + y2) / 2 + (dx / len) * 12;
          return (
            <g key={`${a}-${b}`}>
              <path
                d={`M ${x1} ${y1} Q ${midx} ${midy} ${x2} ${y2}`}
                stroke="var(--ifm-color-emphasis-500)"
                strokeWidth={1.5}
                fill="none"
                markerEnd="url(#fw-arrow)"
              />
              <text
                x={midx}
                y={midy}
                fontSize="12"
                textAnchor="middle"
                fill="var(--ifm-font-color-base)"
              >
                {w}
              </text>
            </g>
          );
        })}
        {IDS.map((id) => {
          const { x, y } = NODES[id];
          const isCurrent = step.k === id;
          return (
            <g key={id}>
              <circle
                cx={x}
                cy={y}
                r={22}
                fill={
                  isCurrent
                    ? "var(--ifm-color-primary)"
                    : "var(--ifm-color-emphasis-100)"
                }
                stroke="var(--ifm-color-emphasis-600)"
                strokeWidth={2}
              />
              <text
                x={x}
                y={y + 5}
                fontSize="14"
                textAnchor="middle"
                fontWeight="bold"
                fill={isCurrent ? "white" : "var(--ifm-font-color-base)"}
              >
                {id}
              </text>
            </g>
          );
        })}
      </svg>

      <p style={{ textAlign: "center", minHeight: "2.5em" }}>{step.label}</p>

      <div
        style={{
          overflowX: "auto",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Matrix
          title={`L${step.k === null ? "⁽⁰⁾" : ` (k=${step.k})`}`}
          rows={step.L}
          changed={step.changedCells}
        />
        <Matrix
          title={`P${step.k === null ? "⁽⁰⁾" : ` (k=${step.k})`}`}
          rows={step.P}
          changed={step.changedCells}
        />
      </div>
      <p
        style={{
          textAlign: "center",
          fontSize: "0.85rem",
          color: "var(--ifm-color-emphasis-600)",
        }}
      >
        lignes/colonnes dans l'ordre 1, 2, 3, 4
      </p>

      <div style={CONTROL_STYLE}>
        <button
          type="button"
          style={BUTTON_STYLE}
          onClick={() => setI((n) => Math.max(0, n - 1))}
          disabled={i === 0}
        >
          ‹ Précédent
        </button>
        <span>
          Étape {i + 1} / {STEPS.length}
        </span>
        <button
          type="button"
          style={BUTTON_STYLE}
          onClick={() => setI((n) => Math.min(STEPS.length - 1, n + 1))}
          disabled={i === STEPS.length - 1}
        >
          Suivant ›
        </button>
      </div>
    </div>
  );
}
