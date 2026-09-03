---
sidebar_position: 3
title: "Série de révision : Techniques de Compilation (2017, corrigée)"
sidebar_label: TD Révision 2017 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Série Révision Techniques de Compilation

*ENSI 2017 — Dr. Hassen Gharbi*

<!-- TODO: this document is a scanned/handwritten PDF (CamScanner). The typed statement (Exercices 1-6) below is transcribed with high confidence from the printed pages. The correction, however, is entirely handwritten and in places difficult to read with certainty — each <details> block below is a best-effort transcription of the handwriting; verify against the original PDF images (pages 3-8) where flagged. -->

## Récursivité à gauche, Ambiguïté

### Exercice 1

Indiquer, pour chaque grammaire, si elle est récursive à gauche ou non. Si oui, alors transformez la grammaire correspondante en une grammaire non récursive à gauche.

1. `S → S + S | a | b`

2. `S → (L) | a`
   `L → L, S | S`

3. `E → E a | b`

<details>
<summary>Correction</summary>

**Rappel du cours (transcrit depuis la page manuscrite) :**

- Analyse prédictive non récursive (pile) ~ Analyse syntaxique descendante non récursive ⇒ éliminer la récursivité à gauche si elle existe, éliminer l'ambiguïté si elle existe, pour traiter la grammaire avec LL(1). Pour LL(1), chaque entrée de la table d'analyse doit contenir une seule règle de production.

- **Récursivité à gauche** : la grammaire admet une (ou plusieurs) règle de la forme `A → Aα`.
- **Ambiguïté** : la grammaire admet une (ou plusieurs) règle de la forme `A → αβ1 | αβ2`.

**Élimination de la récursivité à gauche** (règle générale) :

```
A → Aα1 | Aα2 | … | Aαn | β1 | … | βn
⇒ A  → β1 A' | … | βn A'
   A' → α1 A' | … | αn A' | ε
```

**1)** `S → S+S | a | b`
⇒ `S → aS' | bS'`
   `S' → +SS' | ε`

**2)** `S → (L) | a`, `L → L,S | S`
⇒ `S → (L) | a`
   `L → SL'`
   `L' → ,SL' | ε`

**3)** `E → Ea | b`
⇒ `E → bE'`
   `E' → aE' | ε`

**Élimination de l'ambiguïté** (règle générale) :

```
A → αβ1 | αβ2 | … | αβn | α1 | … | αm
⇒ A  → αA' | α1 | … | αm
   A' → β1 | β2 | … | βn
```

**4)** (exemple donné dans les notes, `E → Ea | Eb`) : cette règle est en fait récursive à gauche et non ambiguë au sens de la définition ci-dessus (les deux membres droits commencent tous les deux par `E`, la récursivité à gauche prime) ; en éliminant la récursivité :
`E → EE'` ⇒ `E → E''E'`, `E' → a|b` (récursivité éliminée, non ambigüe) → `E' → a|b`.

<!-- TODO: this last transcription (point 4, bottom of page 3 of the scan) is genuinely hard to read in the handwriting and may not correspond to a numbered exercise from the printed statement — treat as a worked side-note by the corrector rather than an answer to a specific numbered question; verify against the original scan. -->

</details>

## Premier, Suivant

### Exercice 2

Soit la grammaire `G` définie par les règles de production suivantes (`S` est l'axiome de `G`) :

```
S → ABS | d
A → B | a
B → ε | c
```

Calculer les ensembles **Premier** des symboles non-terminaux `S`, `A`, `B`.
Calculer les ensembles **Suivant** des symboles non-terminaux `S`, `A`, `B`.

<details>
<summary>Correction</summary>

**Rappel du calcul de Premier (transcrit des notes manuscrites) :**

- Si `a` est un terminal ⇒ `Prem(a) = {a}`.
- Si `A → ε` ⇒ `ε ∈ Prem(A)`.
- Si `A → X1 X2 … Xn` : si `X1` n'est pas nullable, alors `Prem(A) = Prem(X1)`. Si `X1` est nullable (`X1 → ε`), alors `Prem(A) = Prem(X1) ∪ Prem(X2)`, et ainsi de suite. `ε ∈ Prem(A)` si `X1, X2, …, Xn` sont tous nullables.

**Calcul :**

```
Premier(A) = {a, c, ε}     (A → B|a, B nullable donc Prem(A) = Prem(B) ∪ {a})
Premier(B) = {ε, c}
```

`Premier(S)` : `S → ABS | d`. `A` est nullable, `B` est nullable, `S` n'est pas nullable (car `S → d` n'engendre pas `ε`), donc :

```
Premier(S) = Premier(A) ∪ Premier(B) ∪ {d}
           = {a, c, ε} ∪ {ε, c} ∪ {d}
           = {a, c, d}
```

**Rappel du calcul de Suivant :**

- Pour une règle `A → αBβ` : si `β ≠ ε`, `Suivant(B) := Prem(β) - {ε}` ; si `ε ∈ Prem(β)`, alors `Suivant(B) := Suivant(A)` (union avec ce qui précède).
- Pour une règle `A → αB` (B en fin de partie droite) : `Suivant(B) := Suivant(A)`.
- `$ ∈ Suivant(S)` où `S` est l'axiome de la grammaire.

**Suivant(S) :** `S` est l'axiome ⇒ `$ ∈ Suivant(S)`.

**Suivant(B) :** règle `S → ABS`, `B` suivi de `S` ⇒ `Suivant(B) = Premier(S) ∪ Suivant(A)` (car `Premier(S)` n'est pas nullable ici, donc pas de propagation supplémentaire au-delà) `= {a, c, d}`.

<!-- TODO: the exact justification steps for Suivant(B) in the handwritten page 5/6 are hard to read with full certainty (the note reads roughly "Suivant(B) = `{Premier(S)}`, Suivant(A) = `{a,c,d}`"); the final set `{a, c, d}` is legible, transcribed as-is — verify the derivation against the original scan. -->

**Suivant(A) :** règle `S → ABS`, `A` suivi de `BS` ⇒ `Suivant(A) = Premier(BS)`. Comme `B` est nullable, `Premier(BS) = (Premier(B) - {ε}) ∪ Premier(S) = {c, a, d}`.

```
Suivant(S) = {$}
Suivant(A) = {a, c, d}
Suivant(B) = {a, c, d}
```

</details>

### Exercice 3

Considérons la grammaire `G'` définie par les règles de production suivantes (`S` est l'axiome de `G'`) :

```
S → iEtSeS | c
E → b
```

Calculer les ensembles **Premier** des symboles non-terminaux `S` et `E`.
Calculer les ensembles **Suivant** des symboles non-terminaux `S` et `E`.

<details>
<summary>Correction</summary>

```
Premier(S) = {i, c}
Premier(E) = {b}
Suivant(S) = {e}
Suivant(E) = {t}
```

</details>

## Exercice 4

Considérons la grammaire `G'` définie par les règles de production suivantes (`S` est l'axiome de `G'`) :

```
S → S'$
S' → A | B | ε
A → aAb | ε
B → bBa | ε
```

Calculer les ensembles **Premier** des symboles non-terminaux `S`, `S'`, `A` et `B`.
Calculer les ensembles **Suivant** des symboles non-terminaux `S`, `S'`, `A` et `B`.

<details>
<summary>Correction</summary>

Tous les non-terminaux `S`, `S'`, `A`, `B` sont nullables (chacun admet une dérivation vers `ε`, sauf `S` qui contient `$`).

```
Premier(A) = {a, ε}
Premier(B) = {b, ε}
Premier(S') = Premier(A) ∪ Premier(B) = {a, b, ε}
Premier(S) = Premier(S')
```

```
Suivant(S) = {$}
Suivant(S') = {$}
Suivant(A) = Suivant(S') ∪ {b} = {$, b}
Suivant(B) = {a} ∪ Suivant(S') = {$, a}
```

</details>

## Exercice 5

Soit la grammaire suivante `G` :

```
E → F G
F → xFy | z
G → yG | a
```

Vérifiez si `xⁿyzⁿyᵐa` est la forme générale des mots engendrés par `G`.

<!-- TODO: the handwritten correction for Exercice 5 is not legible in the scanned pages read for this conversion (pages 3-8 cover Exercices 1-6 as transcribed, but no distinct correction block for Exercice 5 was identified) — verify against the original PDF. -->

## Exercice 6

Soit la grammaire `G` suivante :

```
E → F + E | F - E | F
F → -F | (E) | id
```

- `G` est-elle récursive à gauche ?
- `G` a-t-elle une chance d'être LL(1) ? Sinon, donner une grammaire `G'` équivalente qui le soit (peut-être).
- Définir les fonctions PREMIER et SUIVANT et la table d'analyse pour `G'`. Simuler l'analyse prédictive non récursive pour : `-id-id` et `-id-+id`.

<details>
<summary>Correction</summary>

`G` **n'est pas** récursive à gauche.

**Table d'analyse ambiguë avec la grammaire originale (illustration) :**

```
Premier(F + E) = Premier(F) = {-, (, id}
Premier(F - E) = Premier(F) = {-, (, id}
Premier(F)     = {-, (, id}
```

Pour chaque symbole `∈ [Premier(E+F) ∩ Premier(F-E) ∩ Premier(F)]`, la table `M[E, x]` contiendrait 3 règles (`E→F+E`, `E→F-E`, `E→F`) ⇒ **`G` n'est pas LL(1)**.

L'ambiguïté vient du fait qu'on ne peut pas décider, avec un seul symbole de prévision (`First`/`Follow`), laquelle des trois règles choisir : 2 cas devraient être vérifiés pour une table correcte.

`G` est **LL(3)** ; on la transforme (élimination de la récursivité à gauche sur `E`) :

```
E  → F E'
E' → + E | - E | ε
F  → -F | (E) | id
```

**Nullabilité et Premier :**

| Symbole | Nullable | Premier |
| --- | --- | --- |
| `E` | Non | `= Premier(F) = {id, (, -}` |
| `E'` | Nullable | `{+, -, ε}` |
| `F` | Non | `{-, (, id}` |

**Suivant :**

```
Suivant(E) = Suivant(E') ∪ {)} = {$, )}
Suivant(E') = Suivant(E) = {$, )}
Suivant(F) = Premier(E') - {ε} ∪ Suivant(E) = {+, -, ), $}
```

**Table d'analyse :**

| Non terminal | + | - | id | ( | ) | $ |
| --- | --- | --- | --- | --- | --- | --- |
| E | | E→FE' | E→FE' | E→FE' | sync | Sync |
| E' | E'→+E | E'→-E | | | E'→ε | E'→ε |
| F | | F→-F | F→id | F→(E) | Sync | Sync |

**Simulation de l'analyse prédictive non récursive pour `-id-id` :**

| Pile | Entrée | Action |
| --- | --- | --- |
| `$E` | `-id-id$` | `E → FE'` |
| `$E'F` | `-id-id$` | `F → -F` |
| `$E'F-` | `-id-id$` | dépiler `-`, décaler |
| `$E'F` | `id-id$` | `F → id` |
| `$E'id` | `id-id$` | dépiler `id`, décaler |
| `$E'` | `-id$` | `E' → -E` |
| `$E-` | `-id$` | dépiler `-`, décaler |
| `$E` | `id$` | `E → FE'` |
| `$E'F` | `id$` | `F → id` |
| `$E'id` | `id$` | dépiler `id`, décaler |
| `$E'` | `$` | `E' → ε` |
| `$` | `$` | accepter |

**Simulation de l'analyse prédictive non récursive pour `-id-+id`** (illustre la récupération sur erreur, `M[E', +]` après un `-` non consommé attendu produit une entrée absente) :

<!-- TODO: the handwritten trace for "-id-+id" on the last scanned page is only partially legible (columns "$E'F", "$E'id", "$E'" with entries "+id$" repeated); the general mechanism (F→id, then dépiler id et décaler, then E'→ε at end) is clear but the exact intermediate error-recovery step is not — verify against the original scan. -->

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/compilation-td-revision-2017-corrige.pdf" />

</TabItem>
</Tabs>
