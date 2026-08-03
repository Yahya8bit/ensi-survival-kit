import React, { useState } from "react";

export type GateType = "AND" | "OR" | "NOT" | "XOR" | "NAND" | "NOR";

interface GateMeta {
  unary: boolean;
  // x where the (unnegated) body shape ends — AND/NAND/XOR share the D-shape
  // tip, OR/NOR/XOR share the curved-back tip.
  bodyTipX: number;
  bubble: boolean;
  doubleBack: boolean; // XOR's extra curved line behind the OR body
}

const GATE_META: Record<GateType, GateMeta> = {
  AND: { unary: false, bodyTipX: 130, bubble: false, doubleBack: false },
  OR: { unary: false, bodyTipX: 120, bubble: false, doubleBack: false },
  NOT: { unary: true, bodyTipX: 130, bubble: true, doubleBack: false },
  XOR: { unary: false, bodyTipX: 120, bubble: false, doubleBack: true },
  NAND: { unary: false, bodyTipX: 130, bubble: true, doubleBack: false },
  NOR: { unary: false, bodyTipX: 120, bubble: true, doubleBack: false },
};

const BUBBLE_R = 8;

function computeOutput(gate: GateType, a: boolean, b: boolean): boolean {
  switch (gate) {
    case "AND":
      return a && b;
    case "OR":
      return a || b;
    case "NOT":
      return !a;
    case "XOR":
      return a !== b;
    case "NAND":
      return !(a && b);
    case "NOR":
      return !(a || b);
  }
}

// ponytail: shared shape helper — AND/NAND reuse the D-shape body, OR/NOR/XOR
// reuse the curved-back body, NAND/NOR/NOT just add a bubble on top. Adding a
// new gate later is picking one of these two bodies (or a new one) rather
// than hand-drawing a whole new symbol.
function GateShape({ gate }: { gate: GateType }): JSX.Element {
  const meta = GATE_META[gate];
  const stroke = "var(--ifm-font-color-base)";
  const fill = "var(--ifm-background-surface-color)";

  return (
    <>
      {gate === "NOT" ? (
        <path
          d="M60,20 L60,100 L130,60 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={2}
          strokeLinejoin="round"
        />
      ) : meta.bodyTipX === 130 ? (
        // AND / NAND: rectangle + D-curve (D-shape)
        <path
          d="M60,20 L90,20 A40,40 0 0 1 90,100 L60,100 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={2}
        />
      ) : (
        // OR / NOR / XOR: curved-back, pointed-front body
        <path
          d="M60,20 Q95,20 120,60 Q95,100 60,100 Q78,60 60,20 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={2}
        />
      )}
      {meta.doubleBack && (
        <path
          d="M50,20 Q68,60 50,100"
          fill="none"
          stroke={stroke}
          strokeWidth={2}
        />
      )}
      {meta.bubble && (
        <circle
          cx={meta.bodyTipX + BUBBLE_R}
          cy={60}
          r={BUBBLE_R}
          fill={fill}
          stroke={stroke}
          strokeWidth={2}
        />
      )}
    </>
  );
}

const inputToggleStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  cursor: "pointer",
  userSelect: "none",
};

function wireColor(on: boolean): string {
  return on ? "var(--ifm-color-primary)" : "var(--ifm-color-emphasis-400)";
}

interface Props {
  gate?: GateType;
}

export default function LogicGateSimulator({
  gate = "AND",
}: Props): JSX.Element {
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  const meta = GATE_META[gate];
  const b = meta.unary ? false : inputB;
  const output = computeOutput(gate, inputA, b);

  const outputWireStartX = meta.bubble
    ? meta.bodyTipX + BUBBLE_R * 2
    : meta.bodyTipX;
  const inputYs = meta.unary ? [60] : [35, 85];

  const rows: { a: boolean; b: boolean | null; out: boolean }[] = meta.unary
    ? [
        { a: false, b: null, out: computeOutput(gate, false, false) },
        { a: true, b: null, out: computeOutput(gate, true, false) },
      ]
    : [
        { a: false, b: false, out: computeOutput(gate, false, false) },
        { a: false, b: true, out: computeOutput(gate, false, true) },
        { a: true, b: false, out: computeOutput(gate, true, false) },
        { a: true, b: true, out: computeOutput(gate, true, true) },
      ];

  const isActiveRow = (row: { a: boolean; b: boolean | null }) =>
    row.a === inputA && (meta.unary || row.b === inputB);

  const cardClass = "not-prose my-4 rounded-lg border p-4";
  const cardStyle: React.CSSProperties = {
    border: "1px solid var(--ifm-color-emphasis-300)",
    background: "var(--ifm-background-surface-color)",
  };

  return (
    <div className={cardClass} style={cardStyle}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <svg
          viewBox="0 0 200 120"
          style={{ width: "100%", maxWidth: 260, display: "block" }}
        >
          {/* input wires */}
          {inputYs.map((y, i) => {
            const on = i === 0 ? inputA : inputB;
            return (
              <line
                key={y}
                x1={10}
                y1={y}
                x2={60}
                y2={y}
                stroke={wireColor(on)}
                strokeWidth={3}
              />
            );
          })}
          {/* output wire */}
          <line
            x1={outputWireStartX}
            y1={60}
            x2={190}
            y2={60}
            stroke={wireColor(output)}
            strokeWidth={3}
          />
          <GateShape gate={gate} />
          <text
            x={4}
            y={inputYs[0] - 8}
            fontSize={12}
            fill="var(--ifm-font-color-base)"
          >
            A
          </text>
          {!meta.unary && (
            <text
              x={4}
              y={inputYs[1] - 8}
              fontSize={12}
              fill="var(--ifm-font-color-base)"
            >
              B
            </text>
          )}
          <text
            x={70}
            y={16}
            fontSize={13}
            fontWeight="bold"
            fill="var(--ifm-font-color-base)"
            textAnchor="middle"
          >
            {gate}
          </text>
        </svg>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <label style={inputToggleStyle}>
            <input
              type="checkbox"
              checked={inputA}
              onChange={(e) => setInputA(e.target.checked)}
            />
            <span>Entrée A = {inputA ? 1 : 0}</span>
          </label>
          {!meta.unary && (
            <label style={inputToggleStyle}>
              <input
                type="checkbox"
                checked={inputB}
                onChange={(e) => setInputB(e.target.checked)}
              />
              <span>Entrée B = {inputB ? 1 : 0}</span>
            </label>
          )}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "0.25rem",
              padding: "0.35rem 0.75rem",
              borderRadius: 6,
              border: "1px solid var(--ifm-color-emphasis-300)",
              background: output
                ? "var(--ifm-color-primary)"
                : "var(--ifm-background-color)",
              color: output ? "white" : "var(--ifm-font-color-base)",
              fontWeight: "bold",
              width: "fit-content",
            }}
          >
            Sortie = {output ? 1 : 0}
          </div>
        </div>
      </div>

      <table
        style={{
          marginTop: "1.25rem",
          borderCollapse: "collapse",
          fontSize: "0.9rem",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "0.3rem 0.75rem",
                borderBottom: "1px solid var(--ifm-color-emphasis-300)",
              }}
            >
              A
            </th>
            {!meta.unary && (
              <th
                style={{
                  padding: "0.3rem 0.75rem",
                  borderBottom: "1px solid var(--ifm-color-emphasis-300)",
                }}
              >
                B
              </th>
            )}
            <th
              style={{
                padding: "0.3rem 0.75rem",
                borderBottom: "1px solid var(--ifm-color-emphasis-300)",
              }}
            >
              {gate}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const active = isActiveRow(row);
            return (
              <tr
                key={i}
                style={{
                  fontWeight: active ? "bold" : "normal",
                  background: active
                    ? "var(--ifm-color-emphasis-100)"
                    : "transparent",
                }}
              >
                <td style={{ padding: "0.3rem 0.75rem", textAlign: "center" }}>
                  {row.a ? 1 : 0}
                </td>
                {!meta.unary && (
                  <td
                    style={{ padding: "0.3rem 0.75rem", textAlign: "center" }}
                  >
                    {row.b ? 1 : 0}
                  </td>
                )}
                <td style={{ padding: "0.3rem 0.75rem", textAlign: "center" }}>
                  {row.out ? 1 : 0}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
