import React, { useState } from "react";

// ponytail: one hardcoded worked example (the C-source graph from the course PDF),
// not a generic graph engine — add one when a second example is actually needed.

type NodeId = "A" | "B" | "C" | "D" | "E" | "F" | "G";
type Value = number | "∞";

const NODES: Record<NodeId, { x: number; y: number }> = {
  A: { x: 90, y: 150 },
  B: { x: 300, y: 40 },
  C: { x: 500, y: 90 },
  G: { x: 340, y: 210 },
  F: { x: 220, y: 170 },
  E: { x: 110, y: 320 },
  D: { x: 430, y: 320 },
};

const EDGES: { from: NodeId; to: NodeId; w: number }[] = [
  { from: "A", to: "B", w: 8 },
  { from: "B", to: "C", w: 1 },
  { from: "G", to: "B", w: 6 },
  { from: "C", to: "G", w: 14 },
  { from: "C", to: "D", w: 5 },
  { from: "F", to: "G", w: 2 },
  { from: "F", to: "D", w: 7 },
  { from: "E", to: "F", w: 2 },
  { from: "E", to: "A", w: 11 },
  { from: "D", to: "E", w: 3 },
];

const ORDER: NodeId[] = ["C", "A", "B", "D", "E", "F", "G"];

interface Step {
  label: string;
  current: NodeId | null;
  values: Record<NodeId, Value>;
  settled: NodeId[];
  relaxed: string[]; // "from-to" edge keys highlighted this step
}

const STEPS: Step[] = [
  {
    label:
      "Initialisation : π(C)=0, voisins directs de C mis à jour, le reste à +∞.",
    current: null,
    values: { C: 0, A: "∞", B: "∞", D: 5, E: "∞", F: "∞", G: 14 },
    settled: ["C"],
    relaxed: ["C-D", "C-G"],
  },
  {
    label: "Sélection de D (π=5, minimum). Relaxation de D→E.",
    current: "D",
    values: { C: 0, A: "∞", B: "∞", D: 5, E: 8, F: "∞", G: 14 },
    settled: ["C", "D"],
    relaxed: ["D-E"],
  },
  {
    label: "Sélection de E (π=8, minimum). Relaxation de E→F et E→A.",
    current: "E",
    values: { C: 0, A: 19, B: "∞", D: 5, E: 8, F: 10, G: 14 },
    settled: ["C", "D", "E"],
    relaxed: ["E-F", "E-A"],
  },
  {
    label: "Sélection de F (π=10, minimum). Relaxation de F→G (12 < 14).",
    current: "F",
    values: { C: 0, A: 19, B: "∞", D: 5, E: 8, F: 10, G: 12 },
    settled: ["C", "D", "E", "F"],
    relaxed: ["F-G"],
  },
  {
    label: "Sélection de G (π=12, minimum). Relaxation de G→B.",
    current: "G",
    values: { C: 0, A: 19, B: 18, D: 5, E: 8, F: 10, G: 12 },
    settled: ["C", "D", "E", "F", "G"],
    relaxed: ["G-B"],
  },
  {
    label:
      "Sélection de B (π=18, minimum). Aucune relaxation utile (B→C déjà réglé).",
    current: "B",
    values: { C: 0, A: 19, B: 18, D: 5, E: 8, F: 10, G: 12 },
    settled: ["C", "D", "E", "F", "G", "B"],
    relaxed: [],
  },
  {
    label: "Sélection de A (π=19, minimum). S̄₁ = ∅ : terminé.",
    current: "A",
    values: { C: 0, A: 19, B: 18, D: 5, E: 8, F: 10, G: 12 },
    settled: ["C", "D", "E", "F", "G", "B", "A"],
    relaxed: [],
  },
];

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

export default function DijkstraVisualizer(): JSX.Element {
  const [i, setI] = useState(0);
  const step = STEPS[i];

  return (
    <div>
      <svg
        viewBox="0 0 560 380"
        style={{
          width: "100%",
          maxWidth: 560,
          display: "block",
          margin: "0 auto",
        }}
      >
        <defs>
          <marker
            id="dv-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L7,3 L0,6 Z" fill="var(--ifm-color-emphasis-600)" />
          </marker>
        </defs>
        {EDGES.map(({ from, to, w }) => {
          const a = NODES[from];
          const b = NODES[to];
          const key = `${from}-${to}`;
          const isRelaxed = step.relaxed.includes(key);
          // shrink the segment so the arrowhead doesn't hide under the node circle
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const len = Math.hypot(dx, dy);
          const r = 18;
          const x1 = a.x + (dx / len) * r;
          const y1 = a.y + (dy / len) * r;
          const x2 = b.x - (dx / len) * r;
          const y2 = b.y - (dy / len) * r;
          return (
            <g key={key}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isRelaxed ? "#e67700" : "var(--ifm-color-emphasis-600)"}
                strokeWidth={isRelaxed ? 3 : 1.5}
                markerEnd="url(#dv-arrow)"
              />
              <text
                x={(x1 + x2) / 2}
                y={(y1 + y2) / 2 - 6}
                fontSize="13"
                textAnchor="middle"
                fill={isRelaxed ? "#e67700" : "var(--ifm-font-color-base)"}
              >
                {w}
              </text>
            </g>
          );
        })}
        {ORDER.map((id) => {
          const { x, y } = NODES[id];
          const isCurrent = step.current === id;
          const isSettled = step.settled.includes(id);
          return (
            <g key={id}>
              <circle
                cx={x}
                cy={y}
                r={18}
                fill={
                  isCurrent
                    ? "#ffd43b"
                    : isSettled
                    ? "#d3f9d8"
                    : "var(--ifm-background-surface-color)"
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
              >
                {id}
              </text>
            </g>
          );
        })}
      </svg>

      <p style={{ textAlign: "center", minHeight: "2.5em" }}>{step.label}</p>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            textAlign: "center",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>S̄₁</th>
              {ORDER.map((id) => (
                <th
                  key={id}
                  style={{
                    border: "1px solid var(--ifm-color-emphasis-300)",
                    padding: "0.3rem",
                  }}
                >
                  {id}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  border: "1px solid var(--ifm-color-emphasis-300)",
                  padding: "0.3rem",
                }}
              >
                {"{" +
                  ORDER.filter((id) => !step.settled.includes(id)).join(",") +
                  "}"}
              </td>
              {ORDER.map((id) => (
                <td
                  key={id}
                  style={{
                    border: "1px solid var(--ifm-color-emphasis-300)",
                    padding: "0.3rem",
                    fontWeight: step.current === id ? "bold" : "normal",
                    color: step.current === id ? "#e67700" : undefined,
                  }}
                >
                  {step.values[id]}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

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
