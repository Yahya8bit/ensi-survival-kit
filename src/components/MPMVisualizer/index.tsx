import React, { useState } from 'react';

// ponytail: one hardcoded worked example (the house-construction MPM graph from
// the course PDF, same topology as graphe-ch2-pcc-ordonnancement.md's static SVG)
// — the earliest-date computation and critical-path backtrack ARE generic (plain
// topological-order DP over EDGES), so the steps stay correct if the example changes.

type NodeId = 'dp' | 'A' | 'B' | 'D' | 'C' | 'G' | 'E' | 'F' | 'H' | 'I' | 'J' | 'fp';

const NODES: Record<NodeId, { x: number; y: number }> = {
  dp: { x: 40, y: 210 },
  A: { x: 150, y: 210 },
  B: { x: 300, y: 90 },
  D: { x: 300, y: 210 },
  C: { x: 450, y: 90 },
  G: { x: 600, y: 90 },
  E: { x: 600, y: 210 },
  F: { x: 450, y: 330 },
  H: { x: 600, y: 330 },
  I: { x: 750, y: 330 },
  J: { x: 830, y: 210 },
  fp: { x: 930, y: 210 },
};

const ORDER: NodeId[] = ['dp', 'A', 'B', 'D', 'C', 'G', 'E', 'F', 'H', 'I', 'J', 'fp'];

// (from, to, duration of "from") — a topologically-sorted edge list is enough,
// no need for a real toposort since the course graph is already given in order.
const EDGES: [NodeId, NodeId, number][] = [
  ['dp', 'A', 0],
  ['A', 'B', 7],
  ['A', 'D', 7],
  ['B', 'C', 3],
  ['D', 'C', 8],
  ['D', 'E', 8],
  ['D', 'F', 8],
  ['C', 'G', 1],
  ['C', 'E', 1],
  ['C', 'F', 1],
  ['G', 'J', 1],
  ['E', 'J', 2],
  ['F', 'H', 1],
  ['H', 'I', 2],
  ['I', 'J', 2],
  ['J', 'fp', 1],
];

function edgeKey(a: NodeId, b: NodeId): string {
  return `${a}-${b}`;
}

interface Step {
  label: string;
  computed: Set<NodeId>;
  current: NodeId | null;
  t: Map<NodeId, number>;
  criticalEdges: Set<string>;
  done: boolean;
}

function buildSteps(): Step[] {
  const t = new Map<NodeId, number>();
  const via = new Map<NodeId, NodeId | null>();
  const computed = new Set<NodeId>();
  const steps: Step[] = [];

  for (const node of ORDER) {
    const incoming = EDGES.filter(([, to]) => to === node);
    let best = 0;
    let bestFrom: NodeId | null = null;
    if (incoming.length === 0) {
      best = 0; // dp
    } else {
      for (const [from, , d] of incoming) {
        const candidate = t.get(from)! + d;
        if (candidate > best) {
          best = candidate;
          bestFrom = from;
        }
      }
    }
    t.set(node, best);
    via.set(node, bestFrom);
    computed.add(node);

    const label =
      incoming.length === 0
        ? `t(${node}) = 0 (début du projet).`
        : `t(${node}) = max(${incoming.map(([from, , d]) => `t(${from})+${d}`).join(', ')}) = ${best}` +
          (bestFrom ? ` (via ${bestFrom}).` : '.');

    steps.push({
      label,
      computed: new Set(computed),
      current: node,
      t: new Map(t),
      criticalEdges: new Set(),
      done: false,
    });
  }

  // backtrack the critical path from fp to dp
  const criticalEdges = new Set<string>();
  let cur: NodeId | null = 'fp';
  while (cur && via.get(cur)) {
    const prev = via.get(cur)!;
    criticalEdges.add(edgeKey(prev, cur));
    cur = prev;
  }

  steps.push({
    label: `Chemin critique (rétro-lecture depuis fp) : durée minimale du projet = ${t.get('fp')}.`,
    computed: new Set(computed),
    current: null,
    t: new Map(t),
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

export default function MPMVisualizer(): JSX.Element {
  const [i, setI] = useState(0);
  const step = STEPS[i];

  return (
    <div>
      <svg viewBox="0 0 970 400" style={{ width: '100%', maxWidth: 760, display: 'block', margin: '0 auto' }}>
        {EDGES.map(([a, b, w]) => {
          const key = edgeKey(a, b);
          const isCritical = step.criticalEdges.has(key);
          const pa = NODES[a];
          const pb = NODES[b];
          const dx = pb.x - pa.x;
          const dy = pb.y - pa.y;
          const len = Math.hypot(dx, dy);
          const ux = dx / len;
          const uy = dy / len;
          const r = a === 'dp' || b === 'fp' ? 26 : 22;
          const r2 = b === 'fp' ? 26 : 22;
          const x1 = pa.x + ux * r;
          const y1 = pa.y + uy * r;
          const x2 = pb.x - ux * r2;
          const y2 = pb.y - uy * r2;
          const stroke = isCritical ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-500)';
          const lx = (x1 + x2) / 2 - uy * 10;
          const ly = (y1 + y2) / 2 + ux * 10 - 4;
          return (
            <g key={key}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={stroke}
                strokeWidth={isCritical ? 3 : 1.5}
                markerEnd={isCritical ? 'url(#mpm-arrow-hl)' : 'url(#mpm-arrow)'}
              />
              <text x={lx} y={ly} fontSize="12" textAnchor="middle" fill="var(--ifm-font-color-base)">
                {w}
              </text>
            </g>
          );
        })}
        <defs>
          <marker id="mpm-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" fill="var(--ifm-color-emphasis-500)" />
          </marker>
          <marker id="mpm-arrow-hl" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" fill="var(--ifm-color-primary)" />
          </marker>
        </defs>
        {ORDER.map((id) => {
          const { x, y } = NODES[id];
          const isComputed = step.computed.has(id);
          const isCurrent = step.current === id;
          const r = id === 'dp' || id === 'fp' ? 26 : 22;
          return (
            <g key={id}>
              <circle
                cx={x}
                cy={y}
                r={r}
                fill={isCurrent ? 'var(--ifm-color-primary)' : isComputed ? 'var(--ifm-color-emphasis-100)' : 'var(--ifm-background-color)'}
                stroke="var(--ifm-color-emphasis-600)"
                strokeWidth={1.5}
                opacity={isComputed ? 1 : 0.4}
              />
              <text
                x={x}
                y={y - 2}
                fontSize="13"
                textAnchor="middle"
                fontWeight="bold"
                fill={isCurrent ? 'white' : 'var(--ifm-font-color-base)'}>
                {id}
              </text>
              {isComputed && (
                <text
                  x={x}
                  y={y + 13}
                  fontSize="11"
                  textAnchor="middle"
                  fill={isCurrent ? 'white' : 'var(--ifm-color-primary)'}>
                  t={step.t.get(id)}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <p style={{ textAlign: 'center', minHeight: '3em' }}>{step.label}</p>

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
