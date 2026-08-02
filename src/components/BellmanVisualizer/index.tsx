import React, { useState } from 'react';

// ponytail: one hardcoded worked example (EXP3 from the course PDF — the A..G
// graph with a negative edge B->F, used specifically because Dijkstra can't
// handle it) — the naive Bellman relaxation itself IS run generically over
// EDGES, synchronous per iteration (uses only the previous iteration's values,
// matching the "version naïve" pseudocode above this component in the doc).

type NodeId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

const NODES: Record<NodeId, { x: number; y: number }> = {
  A: { x: 60, y: 320 },
  C: { x: 150, y: 430 },
  B: { x: 230, y: 220 },
  F: { x: 430, y: 430 },
  D: { x: 340, y: 120 },
  E: { x: 440, y: 230 },
  G: { x: 540, y: 120 },
};

// display order matches the course table's rank order (A,C,B,F,D,E,G)
const ORDER: NodeId[] = ['A', 'C', 'B', 'F', 'D', 'E', 'G'];
const START: NodeId = 'A';

const EDGES: [NodeId, NodeId, number][] = [
  ['A', 'B', 7],
  ['A', 'C', 1],
  ['B', 'D', 4],
  ['B', 'E', 2],
  ['B', 'F', -3],
  ['C', 'B', 5],
  ['C', 'E', 2],
  ['C', 'F', 7],
  ['F', 'D', 5],
  ['F', 'E', 3],
  ['E', 'G', 10],
  ['D', 'G', 4],
];

function edgeKey(a: NodeId, b: NodeId): string {
  return `${a}-${b}`;
}

type Value = number | '∞';

interface Step {
  label: string;
  k: number;
  values: Record<NodeId, Value>;
  changed: NodeId[];
  criticalEdges: Set<string>;
  done: boolean;
}

function buildSteps(): Step[] {
  const steps: Step[] = [];
  let values: Record<NodeId, Value> = Object.fromEntries(ORDER.map((n) => [n, n === START ? 0 : '∞'])) as Record<
    NodeId,
    Value
  >;
  let via: Record<NodeId, NodeId | null> = Object.fromEntries(ORDER.map((n) => [n, null])) as Record<
    NodeId,
    NodeId | null
  >;

  steps.push({
    label: `Initialisation : π₀(${START})=0, π₀(i)=+∞ pour tout autre sommet.`,
    k: 0,
    values: { ...values },
    changed: [START],
    criticalEdges: new Set(),
    done: false,
  });

  const n = ORDER.length;
  for (let k = 1; k <= n; k++) {
    const next: Record<NodeId, Value> = { ...values };
    const nextVia: Record<NodeId, NodeId | null> = { ...via };
    const changed: NodeId[] = [];

    for (const i of ORDER) {
      if (i === START) continue;
      let best: Value = values[i];
      let bestFrom = via[i];
      for (const [j, to, w] of EDGES) {
        if (to !== i) continue;
        const pj = values[j];
        if (pj === '∞') continue;
        const candidate = pj + w;
        if (best === '∞' || candidate < best) {
          best = candidate;
          bestFrom = j;
        }
      }
      if (best !== values[i]) {
        next[i] = best;
        nextVia[i] = bestFrom;
        changed.push(i);
      }
    }

    const stable = changed.length === 0;
    steps.push({
      label: stable
        ? `Itération ${k} : aucune valeur ne change → convergence, FIN.`
        : `Itération ${k} : mise à jour de ${changed.map((c) => `π(${c})=${next[c]}${nextVia[c] ? nextVia[c] : ''}`).join(', ')}.`,
      k,
      values: { ...next },
      changed,
      criticalEdges: new Set(),
      done: stable,
    });

    values = next;
    via = nextVia;
    if (stable) break;
  }

  // backtrack the shortest path from the last node in ORDER (G) to START
  const criticalEdges = new Set<string>();
  let cur: NodeId | null = ORDER[ORDER.length - 1];
  while (cur && via[cur]) {
    const prev = via[cur];
    criticalEdges.add(edgeKey(prev!, cur));
    cur = prev;
  }

  steps.push({
    label: `PCC de ${START} à ${ORDER[ORDER.length - 1]} : longueur ${values[ORDER[ORDER.length - 1]]}.`,
    k: -1,
    values: { ...values },
    changed: [],
    criticalEdges,
    done: true,
  });

  return steps;
}

const STEPS = buildSteps();

const CONTROL_STYLE: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.75rem',
  margin: '0.75rem 0',
};

const BUTTON_STYLE: React.CSSProperties = {
  padding: '0.4rem 0.9rem',
  borderRadius: 4,
  border: '1px solid var(--ifm-color-emphasis-300)',
  background: 'var(--ifm-background-surface-color)',
  cursor: 'pointer',
};

export default function BellmanVisualizer(): JSX.Element {
  const [i, setI] = useState(0);
  const step = STEPS[i];

  return (
    <div>
      <svg viewBox="0 0 600 480" style={{ width: '100%', maxWidth: 560, display: 'block', margin: '0 auto' }}>
        <defs>
          <marker id="bv-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" fill="var(--ifm-color-emphasis-500)" />
          </marker>
          <marker id="bv-arrow-hl" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" fill="var(--ifm-color-primary)" />
          </marker>
        </defs>
        {EDGES.map(([a, b, w]) => {
          const key = edgeKey(a, b);
          const isCritical = step.criticalEdges.has(key);
          const pa = NODES[a];
          const pb = NODES[b];
          const dx = pb.x - pa.x;
          const dy = pb.y - pa.y;
          const len = Math.hypot(dx, dy);
          const r = 20;
          const x1 = pa.x + (dx / len) * r;
          const y1 = pa.y + (dy / len) * r;
          const x2 = pb.x - (dx / len) * r;
          const y2 = pb.y - (dy / len) * r;
          const stroke = isCritical ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-500)';
          return (
            <g key={key}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={stroke}
                strokeWidth={isCritical ? 3 : 1.5}
                markerEnd={isCritical ? 'url(#bv-arrow-hl)' : 'url(#bv-arrow)'}
              />
              <text
                x={(x1 + x2) / 2}
                y={(y1 + y2) / 2 - 6}
                fontSize="12"
                textAnchor="middle"
                fill={isCritical ? stroke : 'var(--ifm-font-color-base)'}
                fontWeight={isCritical ? 'bold' : 'normal'}>
                {w}
              </text>
            </g>
          );
        })}
        {ORDER.map((id) => {
          const { x, y } = NODES[id];
          const isChanged = step.changed.includes(id);
          const onPath = step.criticalEdges.size > 0 && [...step.criticalEdges].some((k) => k.startsWith(`${id}-`) || k.endsWith(`-${id}`));
          return (
            <g key={id}>
              <circle
                cx={x}
                cy={y}
                r={20}
                fill={isChanged ? '#ffd43b' : onPath ? 'var(--ifm-color-primary)' : 'var(--ifm-background-surface-color)'}
                stroke="var(--ifm-color-emphasis-600)"
                strokeWidth={2}
              />
              <text x={x} y={y + 5} fontSize="14" textAnchor="middle" fontWeight="bold" fill={onPath && !isChanged ? 'white' : 'var(--ifm-font-color-base)'}>
                {id}
              </text>
            </g>
          );
        })}
      </svg>

      <p style={{ textAlign: 'center', minHeight: '2.5em' }}>{step.label}</p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid var(--ifm-color-emphasis-300)', padding: '0.3rem' }}>k</th>
              {ORDER.map((id) => (
                <th key={id} style={{ border: '1px solid var(--ifm-color-emphasis-300)', padding: '0.3rem' }}>
                  {id}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid var(--ifm-color-emphasis-300)', padding: '0.3rem' }}>
                {step.k >= 0 ? step.k : ''}
              </td>
              {ORDER.map((id) => (
                <td
                  key={id}
                  style={{
                    border: '1px solid var(--ifm-color-emphasis-300)',
                    padding: '0.3rem',
                    fontWeight: step.changed.includes(id) ? 'bold' : 'normal',
                    color: step.changed.includes(id) ? '#e67700' : undefined,
                  }}>
                  {step.values[id]}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div style={CONTROL_STYLE}>
        <button type="button" style={BUTTON_STYLE} onClick={() => setI((n) => Math.max(0, n - 1))} disabled={i === 0}>
          ‹ Précédent
        </button>
        <span>
          Étape {i + 1} / {STEPS.length}
        </span>
        <button
          type="button"
          style={BUTTON_STYLE}
          onClick={() => setI((n) => Math.min(STEPS.length - 1, n + 1))}
          disabled={i === STEPS.length - 1}>
          Suivant ›
        </button>
      </div>
    </div>
  );
}
