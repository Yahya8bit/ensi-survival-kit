import React, { useState } from 'react';

// ponytail: one hardcoded worked example (the 6-immeubles graph from the course PDF),
// not a generic graph engine — the algorithm itself IS run generically (union-find)
// so the step list stays correct if the example graph ever changes.

type NodeId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

const NODES: Record<NodeId, { x: number; y: number }> = {
  A: { x: 280, y: 40 },
  B: { x: 410, y: 115 },
  C: { x: 410, y: 265 },
  D: { x: 280, y: 340 },
  E: { x: 150, y: 265 },
  F: { x: 150, y: 115 },
};

// (immeuble1, immeuble2, distance) — already given sorted ascending in the course example
const RAW_EDGES: [NodeId, NodeId, number][] = [
  ['E', 'F', 750],
  ['C', 'E', 790],
  ['B', 'E', 835],
  ['B', 'D', 850],
  ['B', 'F', 920],
  ['B', 'C', 1160],
  ['B', 'A', 1320],
  ['A', 'F', 2640],
  ['C', 'F', 2880],
];

const ORDER: NodeId[] = ['A', 'B', 'C', 'D', 'E', 'F'];

function edgeKey(a: NodeId, b: NodeId): string {
  return [a, b].sort().join('-');
}

type EdgeStatus = 'pending' | 'accepted' | 'rejected';

interface Step {
  label: string;
  current: string | null; // edge key just decided
  edgeStatus: Record<string, EdgeStatus>;
  components: NodeId[][];
  mstWeight: number;
  done: boolean;
}

function buildSteps(): Step[] {
  const parent = new Map<NodeId, NodeId>(ORDER.map((n) => [n, n]));
  function find(n: NodeId): NodeId {
    while (parent.get(n) !== n) n = parent.get(n)!;
    return n;
  }
  function union(a: NodeId, b: NodeId) {
    parent.set(find(a), find(b));
  }
  function components(): NodeId[][] {
    const groups = new Map<NodeId, NodeId[]>();
    for (const n of ORDER) {
      const root = find(n);
      if (!groups.has(root)) groups.set(root, []);
      groups.get(root)!.push(n);
    }
    return [...groups.values()];
  }

  const edgeStatus: Record<string, EdgeStatus> = {};
  RAW_EDGES.forEach(([a, b]) => (edgeStatus[edgeKey(a, b)] = 'pending'));

  const steps: Step[] = [
    {
      label: `Arêtes triées par poids croissant : ${RAW_EDGES.map(([a, b, w]) => `${a}${b}(${w})`).join(', ')}.`,
      current: null,
      edgeStatus: { ...edgeStatus },
      components: components(),
      mstWeight: 0,
      done: false,
    },
  ];

  let mstWeight = 0;
  let acceptedCount = 0;
  const n = ORDER.length;

  for (const [a, b, w] of RAW_EDGES) {
    if (acceptedCount === n - 1) break; // ACM complète, arêtes restantes non évaluées
    const key = edgeKey(a, b);
    if (find(a) !== find(b)) {
      union(a, b);
      edgeStatus[key] = 'accepted';
      mstWeight += w;
      acceptedCount += 1;
      steps.push({
        label: `${a}${b} (${w}) : sommets dans des composantes différentes → acceptée.${
          acceptedCount === n - 1 ? ` ACM complet (${n - 1} arêtes) : poids total = ${mstWeight}.` : ''
        }`,
        current: key,
        edgeStatus: { ...edgeStatus },
        components: components(),
        mstWeight,
        done: acceptedCount === n - 1,
      });
    } else {
      edgeStatus[key] = 'rejected';
      steps.push({
        label: `${a}${b} (${w}) : ${a} et ${b} déjà dans la même composante → rejetée (formerait un cycle).`,
        current: key,
        edgeStatus: { ...edgeStatus },
        components: components(),
        mstWeight,
        done: false,
      });
    }
  }

  return steps;
}

const STEPS = buildSteps();

const PALETTE = ['#e03131', '#2f9e44', '#1971c2', '#f08c00', '#9c36b5', '#0c8599'];

function colorFor(components: NodeId[][], node: NodeId): string {
  const group = components.find((g) => g.includes(node))!;
  if (group.length === 1) return 'var(--ifm-background-surface-color)';
  const idx = components.filter((g) => g.length > 1).indexOf(group);
  return PALETTE[idx % PALETTE.length];
}

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

export default function KruskalVisualizer(): JSX.Element {
  const [i, setI] = useState(0);
  const step = STEPS[i];

  return (
    <div>
      <svg viewBox="0 0 560 380" style={{ width: '100%', maxWidth: 560, display: 'block', margin: '0 auto' }}>
        {RAW_EDGES.map(([a, b, w], idx) => {
          const key = edgeKey(a, b);
          const status = step.edgeStatus[key];
          const isCurrent = step.current === key;
          const pa = NODES[a];
          const pb = NODES[b];
          const stroke =
            status === 'accepted' ? '#2f9e44' : status === 'rejected' ? '#e03131' : 'var(--ifm-color-emphasis-500)';
          const dash = status === 'rejected' ? '5,4' : undefined;
          // spread labels along their own edge (instead of all sitting at the
          // canvas-center midpoint) so labels of crossing diagonals don't overlap
          const t = 0.28 + ((idx * 37) % 45) / 100;
          const lx = pa.x + (pb.x - pa.x) * t;
          const ly = pa.y + (pb.y - pa.y) * t;
          const labelWidth = String(w).length * 7 + 6;
          return (
            <g key={key}>
              <line
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke={stroke}
                strokeWidth={isCurrent ? 4 : status === 'accepted' ? 3 : 1.5}
                strokeDasharray={dash}
                opacity={status === 'pending' ? 0.5 : 1}
              />
              <rect
                x={lx - labelWidth / 2}
                y={ly - 15}
                width={labelWidth}
                height={16}
                fill="var(--ifm-background-color)"
                opacity={0.9}
              />
              <text
                x={lx}
                y={ly - 3}
                fontSize="12"
                textAnchor="middle"
                fill={isCurrent ? stroke : 'var(--ifm-font-color-base)'}
                fontWeight={isCurrent ? 'bold' : 'normal'}>
                {w}
              </text>
            </g>
          );
        })}
        {ORDER.map((id) => {
          const { x, y } = NODES[id];
          return (
            <g key={id}>
              <circle
                cx={x}
                cy={y}
                r={18}
                fill={colorFor(step.components, id)}
                stroke="var(--ifm-color-emphasis-600)"
                strokeWidth={2}
              />
              <text
                x={x}
                y={y + 5}
                fontSize="14"
                textAnchor="middle"
                fontWeight="bold"
                fill={colorFor(step.components, id) === 'var(--ifm-background-surface-color)' ? 'var(--ifm-font-color-base)' : 'white'}>
                {id}
              </text>
            </g>
          );
        })}
      </svg>

      <p style={{ textAlign: 'center', minHeight: '3em' }}>{step.label}</p>
      <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Poids de l'ACM en cours : {step.mstWeight}
        {step.done ? ' (terminé)' : ''}
      </p>

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
