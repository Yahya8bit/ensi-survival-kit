---
sidebar_position: 6
title: "Chapitre 5 : Traduction en code pour machine abstraite à pile"
sidebar_label: Ch5 - Machine à pile
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# V. Traduction en code pour machine abstraite à pile

*Cours Techniques de Compilation 2023-2024 — Hatem Aouadi*

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments) — best-effort reconstruction below, see task summary -->

## Plan

V.1. Machine abstraite à pile
V.2. Traduction des expressions
V.3. Traduction des instructions

## V.1. Machine abstraite à pile

Le code intermédiaire produit par la partie frontale d'un compilateur à partir de laquelle la partie finale produit le programme cible peut prendre la forme d'un programme pour une machine abstraite à pile. La machine abstraite à pile a une mémoire de données et une mémoire d'instructions séparées, et toutes les opérations arithmétiques sont réalisées sur des valeurs dans la pile.

Les instructions relèvent de l'une des trois classes suivantes :

- Arithmétique entière
- Manipulation de la pile
- Contrôle de flot

### Évolution de la pile

Cliché de la machine à pile après l'exécution des quatre premières instructions de :

```
Empiler 5
Valeurd 2
+
Valeurd 3
*
…
```

<!-- TODO: unclear in source — the stack-trace/memory diagram accompanying this slide (columns "INSTRUCTIONS", "PILE", "DONNEES" with numeric addresses) is heavily garbled by OCR text extraction; only the instruction sequence above is reliably transcribed. Verify the stack contents diagram against the original PDF page. -->

Le code d'une machine abstraite à pile simule l'évaluation d'une expression en utilisant une pile pour une représentation postfixée de l'expression.

**Exemple.** L'évaluation de l'expression postfixée suivante : `1 3 + 5 *` se réalise par les actions suivantes :

1. Empiler 1
2. Empiler 3
3. Additionner : dépiler et empiler le résultat des deux éléments de haut de pile → `4`
4. Empiler 5
5. Multiplier : dépiler et empiler le résultat des deux éléments de haut de pile → `20`

### V.1.2. Valeurs-g et valeurs-d

Dans une instruction d'affectation, nous distinguons deux significations des identificateurs selon qu'ils sont situés du côté gauche ou droit.

**Exemple.** Dans les instructions suivantes :

```
i := 5;
i := i+1;
```

La partie gauche spécifie où une valeur doit être rangée, alors que la partie droite spécifie une valeur entière.

- Le terme **Valeur-g** (c'est une adresse) fait référence à la valeur appropriée du côté gauche.
- Le terme **Valeur-d** fait référence à la valeur du côté droit.

### V.1.3. Manipulation de la pile

Les instructions pour accéder à la mémoire de données sont les suivantes :

| Instruction | Sémantique |
| --- | --- |
| `Empiler v` | empile `v` sur la pile |
| `Valeurd l` | empile le contenu de l'emplacement `l` |
| `Valeurg l` | empile l'adresse de l'emplacement mémoire `l` |
| `Dépiler` | supprime le sommet de pile |
| `:=` | la valeur-d au sommet est placée à l'adresse donnée par la valeur-g au sous-sommet ; les deux sont ensuite dépilées |
| `Copier` | empile une copie de la valeur en sommet de pile (duplique le sommet de pile) |

## V.2. Traduction des expressions

L'expression `a+b` se traduit par :

```
Valeurd a
Valeurd b
+
```

**L'affectation :**

```
Jour := (1461*a) div 4 + (153*m + 2) div 5 + j
```

```
(1)  Valeurg jour
(2)  Empiler 1461
(3)  Valeurd a
(4)  *
(5)  Empiler 4
(6)  Div
(7)  Empiler 153
(8)  Valeurd m
(9)  *
(10) Empiler 2
(11) +
(12) Empiler 5
(13) div
(14) +
(15) valeurd j
(16) +
(17) :=
```

<!-- TODO: unclear in source — the "INSTRUCTIONS / DONNEES" stack-trace table showing the memory/stack values at each of the 17 steps above is heavily garbled by OCR text extraction (columns and numeric values are interleaved out of order); only the instruction list is reliably transcribed. Verify the full stack trace against the original PDF page. -->

### V.2.2. Traduction des expressions

**Définition dirigée par la syntaxe :**

```
Exp   → Exp1 + Terme    {Exp.t := Exp1.t || Terme.t || +}
Exp   → Exp1 – Terme    {Exp.t := Exp1.t || Terme.t || -}
Exp   → Terme           {Exp.t := Terme.t}
Terme → Terme1 * Facteur {Terme.t := Terme1.t || Facteur.t || *}
Terme → Terme1 / Facteur {Terme.t := Terme1.t || Facteur.t || /}
Terme → Facteur          {Terme.t := Facteur.t}
Facteur → nb             {Facteur.t := empiler nb.val}
Facteur → (Exp)          {Facteur.t := Exp.t}
Facteur → id             {Facteur.t := Valeurd id.entrée}
```

`Emettre` est une fonction d'impression dans un fichier d'instructions pour une machine abstraite à pile.

**Émission de la traduction (Schéma de traduction) :**

```
Exp   → Exp1 + Terme     {Emettre(+)}
Exp   → Exp1 – Terme     {Emettre(-)}
Exp   → Terme
Terme → Terme1 * Facteur {Emettre(*)}
Terme → Terme1 / Facteur {Emettre(/)}
Terme → Facteur
Facteur → nb              {Emettre(Empiler nb.val)}
Facteur → (Exp)
Facteur → id              {Emettre(Valeurd id.entrée)}
```

```
Exp → Exp1 + Terme
        Code Exp1  Code Terme  +      → Code pour MAP
```

**Exemple.** Le code pour une machine abstraite à pile associé à l'expression suivante :

```
(1461*a)/4 + (153*m+2)/5 + j
```

est donné comme suit :

```
Empiler 1461
Valeurd @a
*
Empiler 4
/
Empiler 153
Valeurd @m
*
Empiler 2
+
Empiler 5
/
+
Valeurd @j
+
```

Arbre de dérivation correspondant (schéma de traduction) :

```
Exp
├── Exp
│   └── Terme
│       └── Terme / Facteur   Emettre(/)
│           ├── Terme
│           │   └── Facteur
│           │       └── ( Exp )
│           │           └── Exp + Terme   Emettre(+)
│           │               ├── Terme
│           │               │   └── Facteur
│           │               │       └── id   Emettre(Valeurd a)
│           │               └── Facteur
│           │                   └── nb   Emettre(Empiler 2)
│           └── Facteur
│               └── nb   Emettre(Empiler 4)
├── +
└── Terme
    └── Facteur
        └── id
```

## V.3. Traduction des instructions

### V.3.1. Affectation

```
Inst → id := Exp {Inst.t := Valeurg id.entrée || Exp.t || :=}
```

**Schéma de traduction :**

```
Inst → id {Emettre(Valeurg, id.entrée)}
       := Exp {Emettre(:=)}
```

```
Valeurg id.entrée
Code Exp
:=
```

Pseudo-code :

```
Inst()
  Si symbole.ul = id alors
    var := Symbole.att
    Emettre(Valeurg, var)
    accepter(id); accepter(:=); Exp(); Emettre(:=)
  Finsi
```

**Exemple.** `a := 2/4` se traduit par :

```
Valeurg @a
Empiler 2
Empiler 4
/
:=
```

Arbre :

```
Inst
├── id   Emettre(Valeurg @a)
├── :=
└── Exp
    └── Terme
        └── Terme / Facteur   Emettre(/)
            ├── Terme
            │   └── Facteur
            │       └── nb   Emettre(Empiler 2)
            └── Facteur
                └── nb   Emettre(Empiler 4)
```

### V.3.2. Conditionnelle

```
Inst → Si Exp alors Inst1
  {Sortie := créer_Etiq();
   Inst.t := Exp.t || allersifaux Sortie || Inst1.t || Etiq Sortie}
```

`Créer_Etiq()` est une fonction qui retourne un numérique utilisé pour l'étiquette concernée. Ce numérique s'incrémente à chaque fois qu'il y a une nouvelle étiquette.

```
Code pour Exp
Allersifaux Sortie
Code pour Inst1
Etiq Sortie
```

**Schéma de traduction :**

```
Inst → Si {Sortie := créer_Etiq(); Emettre(Allersifaux Sortie)}
       Exp
       alors Inst1 {Emettre(Etiq Sortie)}
```

**Exemple.** `Si a>b alors a:=10`

```
Valeurd @a
Valeurd @b
Comparer-si-sup
Allersifaux Sortie
Valeurg a
Empiler 10
:=
Etiq Sortie
```

```
Code a > b
Allersifaux sortie
Code a := 10
Etiq Sortie
```

### V.3.3. Répétitive

```
Inst → Tant que Exp faire Inst1
  {Test := Créer Etiq(); Sortie := CréerEtiq();
   Inst.t := Etiq Test || Exp.t || Allersifaux Sortie || Inst1.t || Allerà Test || Etiq Sortie}
```

```
Etiq Test
Code pour Exp
AllerSifaux Sortie
Code pour Inst1
Allerà Test
Etiq Sortie
```

**Schéma de traduction :**

```
Inst → Tant que {Test := CréerEtiq(); Sortie := CréerEtiq(); Emettre(Etiq Test);}
       Exp {Emettre(Allersifaux Sortie);}
       Faire INST {Emettre(Allerà Test); Emettre(Etiq Sortie)}
```

### V.3.1. Les instructions pour une machine abstraite à pile

| Instruction | Sémantique de l'instruction |
| --- | --- |
| `Empiler V` | Empile `V` sur la pile |
| `Valeurd L` | Empile le contenu de l'emplacement `L` |
| `Valeurg L` | Empile l'adresse de l'emplacement `L` |
| `Dépiler` | Supprime le sommet de la pile |
| `:=` | La valeur au sommet de la pile est placée à l'adresse située au sous-sommet. On dépile ensuite deux fois |
| `Copier` | Empile une copie de la valeur en sommet de pile |
| `*` | Multiplie le contenu de la valeur en sommet de pile à celui du sous-sommet. On dépile deux fois et on empile le résultat de la multiplication |
| `/` | Même chose pour la division |
| `+` | Même chose pour l'addition (et `-` pour la soustraction) |
| `Etiq L` | Définition d'une étiquette qui portera le nom `L` |
| `Aller à L` | La prochaine instruction est celle étiquetée par `L` |
| `Aller-si-faux L` | Enlève le sommet de pile. S'il est égal à 0, branchement à `L` |
| `Aller-si-vrai L` | Enlève le sommet de pile. S'il est différent de 0, branchement à `L` |
| `Halte` | Arrêt de l'exécution |
| `Comparer-si-sup` | Empile 0 en sommet de pile si le contenu du sous-sommet n'est pas supérieur à celui du sommet, et la valeur 1 sinon, tout en dépilant les deux sommets initiaux de la pile |
| `Comparer-si-inf` | Même chose pour inférieur |
| `Comparer-si-égal` | Même chose pour égal |

## V.5.1. L'instruction Selon

```
Selon V Faire
  Cas V1: Inst1
  Cas V2: Inst2
  …
  Cas Vn: Instn
  autre: Instn+1
Fin Selon
```

**Traduction :**

```
Code pour évaluer V dans t
Si t ≠ v1 aller à L1
  Code pour Inst1
Aller à Suite
L1: Si t ≠ v2 aller à L2
  Code pour Inst2
Aller à Suite
L2: …
Ln-1: Si t ≠ vn aller à Ln
  Code pour Instn
Aller à Suite
Ln: Code pour Instn+1
Suite: ….
```

### V.3.2. Traduction de l'instruction Selon

Forme alternative avec sauts directs :

```
Code pour évaluer V dans t
Aller à Test
L1: Code pour Inst1
    aller à Suite
…
Ln: Code pour Instn
    aller à Suite
Ln+1: Code pour Instn+1
      aller à Suite
Test: si t = v1 aller à L1
      si t = v2 aller à L2
      …
      si t = vn aller à Ln
      aller à Ln+1
Suite:
```

Code pile équivalent (comparaison + branchement + dépilement, répété pour chaque cas) :

```
Valeurd V
Copier
Empiler V1
Comparer-si-égal
Aller-si-faux à L1
Dépiler
  Code pour Inst1
  Aller à Suite
Etiquette L1
Copier
Empiler V2
Comparer-si-égal
Aller-si-faux à L2
Dépiler
  Code pour Inst2
  Aller à Suite
…
Etiquette Ln-1
Copier
Empiler Vn
Comparer-si-égal
Aller-si-faux à Ln
Dépiler
  Code pour Instn
  Aller à Suite
Etiquette Ln
Dépiler
  Code pour Instn+1
Etiquette Suite
```

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/compilation-ch5-traduction-machine-a-pile.pdf" />

</TabItem>
</Tabs>
