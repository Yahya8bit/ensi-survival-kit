import React, { useEffect, useRef, useState } from "react";

// ponytail: DFA only (no NFA-to-DFA conversion, no regex parsing) — that's a
// deliberate v1 boundary, add when a doc actually needs it.

export interface DFADefinition {
  states: string[];
  alphabet: string[];
  transitions: Record<string, Record<string, string>>; // state -> symbol -> state
  start: string;
  accepting: string[];
}

const DEFAULT_DFA: DFADefinition = {
  states: ["q0", "q1"],
  alphabet: ["0", "1"],
  transitions: {
    q0: { "0": "q1", "1": "q0" },
    q1: { "0": "q0", "1": "q1" },
  },
  start: "q0",
  accepting: ["q0"],
};

const NODES: Record<string, { x: number; y: number }> = {
  q0: { x: 120, y: 100 },
  q1: { x: 320, y: 100 },
  q2: { x: 520, y: 100 },
  q3: { x: 320, y: 250 },
};

function layoutFor(states: string[]): Record<string, { x: number; y: number }> {
  // ponytail: reuse the hand-picked 4-slot layout when it fits, otherwise
  // fall back to a simple circle — good enough for the 2-4 state examples
  // this component targets (no graph-layout library).
  if (states.every((s) => NODES[s])) return NODES;
  const layout: Record<string, { x: number; y: number }> = {};
  const r = 150;
  states.forEach((s, i) => {
    const angle = (2 * Math.PI * i) / states.length - Math.PI / 2;
    layout[s] = { x: 320 + r * Math.cos(angle), y: 175 + r * Math.sin(angle) };
  });
  return layout;
}

const STEP_DELAY_MS = 600;

const BUTTON_STYLE: React.CSSProperties = {
  padding: "0.4rem 0.9rem",
  borderRadius: 4,
  border: "1px solid var(--ifm-color-emphasis-300)",
  background: "var(--ifm-background-surface-color)",
  cursor: "pointer",
};

const INPUT_STYLE: React.CSSProperties = {
  padding: "0.4rem 0.6rem",
  borderRadius: 4,
  border: "1px solid var(--ifm-color-emphasis-300)",
  background: "var(--ifm-background-color)",
  color: "var(--ifm-font-color-base)",
  fontFamily: "var(--ifm-font-family-monospace)",
};

interface Props {
  dfa?: DFADefinition;
  defaultInput?: string;
}

export default function AutomatonSimulator({
  dfa = DEFAULT_DFA,
  defaultInput = "1011",
}: Props): JSX.Element {
  const [input, setInput] = useState(defaultInput);
  const [pos, setPos] = useState(0); // how many symbols consumed
  const [current, setCurrent] = useState(dfa.start);
  const [invalidChar, setInvalidChar] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  const layout = layoutFor(dfa.states);
  const done = pos >= input.length;
  const isAccepted = done && dfa.accepting.includes(current);

  function reset() {
    setRunning(false);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setPos(0);
    setCurrent(dfa.start);
    setInvalidChar(null);
  }

  function step() {
    if (pos >= input.length) return;
    const symbol = input[pos];
    const next = dfa.transitions[current]?.[symbol];
    if (!next) {
      setInvalidChar(symbol);
      setRunning(false);
      return;
    }
    setCurrent(next);
    setPos((p) => p + 1);
  }

  function run() {
    reset();
    setRunning(true);
  }

  useEffect(() => {
    if (!running) return;
    if (pos >= input.length) {
      setRunning(false);
      return;
    }
    timerRef.current = window.setTimeout(() => {
      step();
    }, STEP_DELAY_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, pos, current]);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, dfa]);

  return (
    <div>
      <svg
        viewBox="0 0 620 320"
        style={{
          width: "100%",
          maxWidth: 620,
          display: "block",
          margin: "0 auto",
        }}
      >
        <defs>
          <marker
            id="as-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L7,3 L0,6 Z" fill="var(--ifm-color-emphasis-600)" />
          </marker>
        </defs>

        {/* transitions */}
        {dfa.states.map((s) =>
          Object.entries(dfa.transitions[s] ?? {}).map(([symbol, target]) => {
            const a = layout[s];
            const b = layout[target];
            const isActiveEdge =
              !done && current === s && input[pos] === symbol && !invalidChar;
            if (s === target) {
              // self-loop drawn above the node
              return (
                <g key={`${s}-${symbol}`}>
                  <path
                    d={`M ${a.x - 15} ${a.y - 20} C ${a.x - 25} ${a.y - 60}, ${
                      a.x + 25
                    } ${a.y - 60}, ${a.x + 15} ${a.y - 20}`}
                    fill="none"
                    stroke={
                      isActiveEdge ? "#e67700" : "var(--ifm-color-emphasis-600)"
                    }
                    strokeWidth={isActiveEdge ? 3 : 1.5}
                    markerEnd="url(#as-arrow)"
                  />
                  <text
                    x={a.x}
                    y={a.y - 55}
                    fontSize="13"
                    textAnchor="middle"
                    fill={
                      isActiveEdge ? "#e67700" : "var(--ifm-font-color-base)"
                    }
                  >
                    {symbol}
                  </text>
                </g>
              );
            }
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const len = Math.hypot(dx, dy);
            const r = 22;
            const x1 = a.x + (dx / len) * r;
            const y1 = a.y + (dy / len) * r;
            const x2 = b.x - (dx / len) * r;
            const y2 = b.y - (dy / len) * r;
            return (
              <g key={`${s}-${symbol}`}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={
                    isActiveEdge ? "#e67700" : "var(--ifm-color-emphasis-600)"
                  }
                  strokeWidth={isActiveEdge ? 3 : 1.5}
                  markerEnd="url(#as-arrow)"
                />
                <text
                  x={(x1 + x2) / 2}
                  y={(y1 + y2) / 2 - 6}
                  fontSize="13"
                  textAnchor="middle"
                  fill={isActiveEdge ? "#e67700" : "var(--ifm-font-color-base)"}
                >
                  {symbol}
                </text>
              </g>
            );
          })
        )}

        {/* start arrow */}
        {(() => {
          const s = layout[dfa.start];
          return (
            <line
              x1={s.x - 70}
              y1={s.y}
              x2={s.x - 24}
              y2={s.y}
              stroke="var(--ifm-color-emphasis-600)"
              strokeWidth={1.5}
              markerEnd="url(#as-arrow)"
            />
          );
        })()}

        {/* states */}
        {dfa.states.map((s) => {
          const { x, y } = layout[s];
          const isCurrent = s === current;
          const isAccept = dfa.accepting.includes(s);
          return (
            <g key={s}>
              <circle
                cx={x}
                cy={y}
                r={22}
                fill={
                  isCurrent
                    ? done
                      ? isAccepted
                        ? "#d3f9d8"
                        : "#ffc9c9"
                      : "#ffd43b"
                    : "var(--ifm-background-surface-color)"
                }
                stroke="var(--ifm-color-emphasis-600)"
                strokeWidth={2}
              />
              {isAccept && (
                <circle
                  cx={x}
                  cy={y}
                  r={17}
                  fill="none"
                  stroke="var(--ifm-color-emphasis-600)"
                  strokeWidth={1.5}
                />
              )}
              <text
                x={x}
                y={y + 5}
                fontSize="13"
                textAnchor="middle"
                fontWeight="bold"
              >
                {s}
              </text>
            </g>
          );
        })}
      </svg>

      <div style={{ textAlign: "center", margin: "0.5rem 0" }}>
        {dfa.alphabet.map((sym, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              width: "1.6rem",
              height: "1.6rem",
              lineHeight: "1.6rem",
              margin: "0 0.1rem",
              borderRadius: 4,
              fontFamily: "var(--ifm-font-family-monospace)",
            }}
          />
        ))}
        <div
          style={{
            fontFamily: "var(--ifm-font-family-monospace)",
            fontSize: "1.1rem",
          }}
        >
          {input.split("").map((ch, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                width: "1.4rem",
                padding: "0.15rem 0",
                borderRadius: 4,
                background: i === pos - 1 ? "#e67700" : "transparent",
                color: i === pos - 1 ? "white" : "inherit",
                fontWeight: i === pos ? "bold" : "normal",
                textDecoration: i === pos && !done ? "underline" : "none",
              }}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", minHeight: "1.5em" }}>
        {invalidChar && (
          <strong style={{ color: "#e03131" }}>
            Aucune transition pour '{invalidChar}' depuis {current} — REJETÉ
          </strong>
        )}
        {!invalidChar && done && (
          <strong style={{ color: isAccepted ? "#2f9e44" : "#e03131" }}>
            {isAccepted ? "✓ ACCEPTÉ" : "✗ REJETÉ"} (état final : {current})
          </strong>
        )}
        {!invalidChar && !done && <span>État courant : {current}</span>}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          margin: "0.75rem 0",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={INPUT_STYLE}
          placeholder={`chaîne sur {${dfa.alphabet.join(",")}}`}
        />
        <button
          type="button"
          style={BUTTON_STYLE}
          onClick={step}
          disabled={running || done || !!invalidChar}
        >
          Step
        </button>
        <button
          type="button"
          style={BUTTON_STYLE}
          onClick={run}
          disabled={running || input.length === 0}
        >
          Run
        </button>
        <button type="button" style={BUTTON_STYLE} onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
