import React, { useMemo, useState } from 'react';

// ponytail: plain state + derived values, no form lib — six numbers and five formulas
// don't need one.

interface Inputs {
  plateaux: number;
  pistesParFace: number;
  secteursParPiste: number;
  tailleSecteur: number;
  blocSecteurs: number;
}

const DEFAULTS: Inputs = {
  plateaux: 6,
  pistesParFace: 10,
  secteursParPiste: 15,
  tailleSecteur: 512,
  blocSecteurs: 3,
};

const FIELDS: { key: keyof Inputs; label: string }[] = [
  { key: 'plateaux', label: 'Nombre de plateaux' },
  { key: 'pistesParFace', label: 'Nombre de pistes par face' },
  { key: 'secteursParPiste', label: 'Nombre de secteurs par piste' },
  { key: 'tailleSecteur', label: "Taille d'un secteur (octets)" },
  { key: 'blocSecteurs', label: "Taille d'un bloc physique (en secteurs)" },
];

function formatBytes(n: number): string {
  if (!Number.isFinite(n)) return '—';
  const units = ['octets', 'Ko', 'Mo', 'Go', 'To'];
  let value = n;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i += 1;
  }
  const formatted = i === 0 ? value.toString() : value.toFixed(2);
  return `${formatted} ${units[i]}`;
}

const inputClass =
  'w-full rounded border px-2 py-1 text-sm bg-[var(--ifm-background-color)] text-[var(--ifm-font-color-base)] border-[var(--ifm-color-emphasis-300)] focus:outline-none focus:ring-2 focus:ring-[var(--ifm-color-primary)]';

const cardClass =
  'rounded-lg border border-[var(--ifm-color-emphasis-300)] bg-[var(--ifm-background-surface-color)] p-3';

export default function DiskCalculator(): JSX.Element {
  const [values, setValues] = useState<Inputs>(DEFAULTS);

  function setField(key: keyof Inputs, raw: string) {
    const n = Number(raw);
    setValues((prev) => ({ ...prev, [key]: Number.isFinite(n) && n >= 0 ? n : 0 }));
  }

  const { plateaux, pistesParFace, secteursParPiste, tailleSecteur, blocSecteurs } = values;

  const results = useMemo(() => {
    const faces = plateaux * 2;
    const totalPistes = faces * pistesParFace;
    const totalSecteurs = totalPistes * secteursParPiste;
    const capaciteOctets = totalSecteurs * tailleSecteur;
    const tailleBlocOctets = blocSecteurs * tailleSecteur;
    const nbBlocsPhysiques = blocSecteurs > 0 ? totalSecteurs / blocSecteurs : NaN;
    return { faces, totalPistes, totalSecteurs, capaciteOctets, tailleBlocOctets, nbBlocsPhysiques };
  }, [plateaux, pistesParFace, secteursParPiste, tailleSecteur, blocSecteurs]);

  const OUTPUTS: { label: string; value: string; formula: string }[] = [
    { label: 'Nombre de faces', value: results.faces.toString(), formula: 'faces = plateaux × 2' },
    {
      label: 'Nombre total de pistes',
      value: results.totalPistes.toString(),
      formula: 'pistes = faces × pistes_par_face',
    },
    {
      label: 'Nombre total de secteurs',
      value: results.totalSecteurs.toString(),
      formula: 'secteurs = pistes × secteurs_par_piste',
    },
    {
      label: 'Capacité totale du disque',
      value: `${formatBytes(results.capaciteOctets)} (${results.capaciteOctets.toLocaleString('fr-FR')} octets)`,
      formula: 'capacité = secteurs × taille_secteur',
    },
    {
      label: "Taille d'un bloc physique",
      value: `${results.tailleBlocOctets.toLocaleString('fr-FR')} octets`,
      formula: 'taille_bloc = bloc_en_secteurs × taille_secteur',
    },
    {
      label: 'Nombre de blocs physiques',
      value: Number.isInteger(results.nbBlocsPhysiques)
        ? results.nbBlocsPhysiques.toString()
        : `${results.nbBlocsPhysiques.toFixed(2)} (non entier — vérifier la taille de bloc)`,
      formula: 'nb_blocs = secteurs / bloc_en_secteurs',
    },
  ];

  return (
    <div className={`${cardClass} not-prose my-4`}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {FIELDS.map(({ key, label }) => (
          <label key={key} className="flex flex-col gap-1 text-sm">
            <span>{label}</span>
            <input
              type="number"
              min={0}
              className={inputClass}
              value={values[key]}
              onChange={(e) => setField(key, e.target.value)}
            />
          </label>
        ))}
      </div>

      <hr className="my-3 border-[var(--ifm-color-emphasis-300)]" />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {OUTPUTS.map(({ label, value, formula }) => (
          <div key={label} className="rounded border border-[var(--ifm-color-emphasis-200)] p-2">
            <div className="text-xs opacity-70">{label}</div>
            <div className="text-base font-semibold">{value}</div>
            <div className="text-xs opacity-60">{formula}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
