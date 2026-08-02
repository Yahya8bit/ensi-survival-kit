import React, { useState } from 'react';

// ponytail: one hardcoded worked example (the 6-sommets a-f graph from the course
// PDF, same topology as graphe-ch3-acm.md's static SVG) — the algorithm itself IS
// run generically (classic Prim with a key[] array) so the step list stays correct
// if the example graph ever changes.

type NodeId = 'a' | 'b' | 'c' | 'd' | 'e' | 'f';

const NODES: Record<NodeId, { x: number; y: number }> = {
  a: { x: 280, y: 190 },
  b: { x: 280, y: 40 },
  c: { x: 410, y: 115 },
  d: { x: 355, y: 320 },
  e: { x: 205, y: 320 },
  f: { x: 150, y: 115 },
};

const ORDER: NodeId[] = ['a', 'b', 'c', 'd', 'e', 'f'];

const RAW_EDGES: [NodeId, NodeId, number][] = [
  ['b', 'f', 6],
  ['b', 'c', 4],
  ['b', 'a', 1],
  ['c', 'a', 5],
  ['c', 'd', 2],
  ['f', 'a', 5],
  ['f', 'e', 3],
  ['a', 'e', 5],
  ['a', 'd', 3],
  ['e', 'd', 6],
];

const START: NodeId = 'b';

function edgeKey(a: NodeId, b: NodeId): string {
  return [a, b].sort().join('-');
}

const ADJ = new Map<NodeId, [NodeId, number][]>(ORDER.map((n) => [n, []]));
for (const [a, b, w] of RAW_EDGES) {
  ADJ.get(a)!.push([b, w]);
  ADJ.get(b)!.push([a, w]);
}

type EdgeStatus = 'pending' | 'accepted' | 'other';

interface Step {
  label: string;
  current: string | null;
  edgeStatus: Record<string, EdgeStatus>;
  inTree: Set<NodeId>;
  mstWeight: number;
  done: boolean;
}

function buildSteps(): Step[] {
  const inTree = new Set<NodeId>();
  const key = new Map<NodeId, number>(ORDER.map((n) => [n, Infinity]));
  const via = new Map<NodeId, NodeId | null>(ORDER.map((n) => [n, null]));
  const edgeStatus: Record<string, EdgeStatus> = {};
  RAW_EDGES.forEach(([a, b]) => (edgeStatus[edgeKey(a, b)] = 'pending'));

  const steps: Step[] = [
    {
      label: `Sommet initial : ${START}. ${START} constitue l'ACM initial.`,
      current: null,
      edgeStatus: { ...edgeStatus },
      inTree: new Set([]),
      mstWeight: 0,
      done: false,
    },
  ];

  inTree.add(START);
  key.set(START, 0);
  let mstWeight = 0;

  while (inTree.size < ORDER.length) {
    // relax edges out of the node just added
    const last = [...inTree].pop()!;
    for (const [nb, w] of ADJ.get(last)!) {
      if (!inTree.has(nb) && w < key.get(nb)!) {
        key.set(nb, w);
        via.set(nb, last);
      }
    }

    // pick the outside node with the smallest key (ties broken alphabetically)
    let pick: NodeId | null = null;
    for (const n of ORDER) {
      if (inTree.has(n)) continue;
      if (pick === null || key.get(n)! < key.get(pick)!) pick = n;
    }
    if (pick === null || key.get(pick) === Infinity) break;

    const from = via.get(pick)!;
    const k = edgeKey(from, pick);
    edgeStatus[k] = 'accepted';
    mstWeight += key.get(pick)!;
    inTree.add(pick);

    steps.push({
      label: `Arête (${from},${pick}) de poids ${key.get(pick)} : plus faible poids parmi les arêtes incidentes à l'arbre → sélectionnée.${
        inTree.size === ORDER.length ? ` ACM complet : poids total = ${mstWeight}.` : ''
      }`,
      current: k,
      edgeStatus: { ...edgeStatus },
      inTree: new Set(inTree),
      mstWeight,
      done: inTree.size === ORDER.length,
    });
  }

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

export default function PrimVisualizer(): JSX.Element {
  const [i, setI] = useState(0);
  const step = STEPS[i];

  return (
    <div>
      <svg viewBox="0 0 500 380" style={{ width: '100%', maxWidth: 460, display: 'block', margin: '0 auto' }}>
        {RAW_EDGES.map(([a, b, w], idx) => {
          const key = edgeKey(a, b);
          const status = step.edgeStatus[key];
          const isCurrent = step.current === key;
          const pa = NODES[a];
          const pb = NODES[b];
          const stroke = status === 'accepted' ? '#2f9e44' : 'var(--ifm-color-emphasis-500)';
          const t = 0.32 + ((idx * 37) % 40) / 100;
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
          const inTree = step.inTree.has(id);
          return (
            <g key={id}>
              <circle
                cx={x}
                cy={y}
                r={18}
                fill={inTree ? '#2f9e44' : 'var(--ifm-background-surface-color)'}
                stroke="var(--ifm-color-emphasis-600)"
                strokeWidth={2}
              />
              <text
                x={x}
                y={y + 5}
                fontSize="14"
                textAnchor="middle"
                fontWeight="bold"
                fill={inTree ? 'white' : 'var(--ifm-font-color-base)'}>
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
