---
sidebar_position: 4
title: "TD Techniques de Compilation (Corrigé, 2023)"
sidebar_label: TD (Corrigé 2023)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD Techniques de Compilation

*Correction : Leila Ben Ayed — ENSI, Tunisie*

<!-- TODO: the source PDF renders the grammar's non-terminal names with a non-standard math/italic font that the text extraction turned into garbled Unicode symbols (e.g. "ð", "ð´") in the statement. The correction pages re-state the same grammar with plain Latin letters (Z, A, R, E, T), which is used consistently below for both the statement and the correction. Verify against the original PDF if in doubt. -->

## Exercice 1

Considérons la grammaire `G` suivante :

```
G = (V, T, Z, R)
V = {Z, A, R, E, T}
T = {let, in, a, +, ;, (, ), id}
R = { Z → let A in E,
      A → a = E; A | ε,
      R → T | R + T,
      E → R | ε,
      T → id | (E) }
```

1) Éliminer la récursivité à gauche et factoriser (éliminer l'ambiguïté) si nécessaire.

2) Calculer les ensembles premier et suivant pour chaque non terminal de la grammaire `G`.

3) Construire la table d'analyse pour la grammaire obtenue en 1).

4) Est-ce que la grammaire obtenue en 1) est ambiguë ? Justifier la réponse.

5) Analyser le mot `w : let in id=id` en utilisant la table d'analyse obtenue en 3).

6) Montrer que le mot `let a=t1; in (b1 + t)` est généré par la grammaire obtenue en 1) en donnant une dérivation et en construisant un arbre syntaxique (arbre d'analyse).

7) Donner un analyseur syntaxique prédictif descendant récursif pour la grammaire obtenue en 1).

8) Donner un automate fini et un pseudo-code pour un analyseur lexical associé aux unités lexicales de la grammaire `G` (les terminaux de la grammaire).

<details>
<summary>Correction</summary>

### 1) Élimination de la récursivité à gauche et de l'ambiguïté

```
G' = (V', T, Z, R')
R' = { Z → let A in E,
       A → a = E; A | ε,
       R → T R',
       R' → +T R' | ε,
       E → R | ε,
       T → id | (E) }
V' = {Z, A, R, R', E, T}
T  = {let, in, a, =, ;, +, id, (, )}
```

### 2) Calcul des Premier et Suivant

```
Premier(Z) = {let}
Premier(A) = {a, ε}
Premier(R) = Premier(T) = {id, (}
Premier(R') = {+, ε}
Premier(E) = Premier(R) ∪ {ε} = {id, (, ε}

Suivant(Z) = {$}
Suivant(E) = Suivant(Z) ∪ {;, )} = {$, ;, )}
Suivant(A) = {in}
Suivant(R) = Suivant(E) = {$, ;, )} = Suivant(R')
Suivant(T) = Premier(R') - {ε} ∪ Suivant(R) = {+, $, ;, )}
```

### 3) Table d'analyse

| Non terminal | let | in | a | ; | = | + | ( | ) | id | $ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Z | Z → let A in E | | | | | | | | | |
| A | | sync | A → a = E; A | | | | | | | |
| A (nullable) | | A → ε | | | | | | | | |
| R | | sync | | sync | | | R → T R' | sync | R → T R' | sync |
| R' | | | | R' → ε | | R' → + T R' | | R' → ε | | R' → ε |
| E | | E → ε | | E → ε | | | E → R | E → ε | E → R | |
| T | | sync | | sync | | | T → (E) | sync | T → id | sync |

### 4) Ambiguïté

La nouvelle grammaire n'est pas ambiguë car aucune entrée dans la table d'analyse n'est définie de façon multiple.

### 5) Analyse du mot `w : let in id=id`

| Pile | Entrée | Action |
| --- | --- | --- |
| `$Z` | `let in id = id $` | `Z → let A in E` |
| `$E in A` | `let in id = id $` | |
| `$E in A` | `in id = id $` | |
| `$E in` | `in id = id $` | `A → ε` |
| `$E in` | `id = id $` | |
| `$E` | `id = id $` | |
| `$R` | `id = id $` | `E → R` |
| `$R'T` | `id = id $` | `R → T R'` |
| `$R'id` | `id = id $` | `T → id` |
| `$R'` | `= id $` | dépiler `id`, décaler |
| `$R'` | `id $` | sauter `=` (erreur) |
| `$R'` | `$` | sauter `id` (erreur) |
| `$` | `$` | `R' → ε` |
| `$` | `$` | accepter |

### 6) Dérivation et arbre syntaxique pour `let a=t1; in (b1 + t)`

Il faut d'abord transformer ce mot en séquence d'unités lexicales (résultat de l'analyse lexicale) : `let a = id ; in ( id + id )`.

```
Z  ⇒ let A in E
   ⇒ let a = E; A in E
   ⇒ let a = R; A in E
   ⇒ let a = T; A in E
   ⇒ let a = TR'; A in E
   ⇒ let a = id R'; A in E
   ⇒ let a = id ε; A in E
   ⇒ let a = id ; A in E
   ⇒ let a = id ; ε in E
   ⇒ let a = id ; in E
   ⇒ let a = id ; in R
   ⇒ let a = id ; in T R'
   ⇒ let a = id ; in (E) R'
   ⇒ let a = id ; in (R) R'
   ⇒ let a = id ; in (TR') R'
   ⇒ let a = id ; in (id R') R'
   ⇒ let a = id ; in (id +TR') R'
   ⇒ let a = id ; in (id +idR') R'
   ⇒ let a = id ; in (id +id ε) R'
   ⇒ let a = id ; in (id +id ) ε
   ⇒ let a = id ; in (id +id )
```

Arbre syntaxique :

```
Z
├── let
├── A
│   ├── a
│   ├── =
│   ├── E
│   │   └── R
│   │       ├── T
│   │       │   └── id
│   │       └── R'
│   │           └── ε
│   ├── ;
│   └── A
│       └── ε
├── in
└── E
    └── R
        ├── T
        │   └── ( E )
        │       └── R
        │           ├── T
        │           │   └── id
        │           └── R'
        │               ├── +
        │               ├── T
        │               │   └── id
        │               └── R'
        │                   └── ε
        └── R'
            └── ε
```

### 7) Analyseur syntaxique prédictif descendant récursif

Nous utilisons la grammaire non récursive à gauche et non ambiguë obtenue en 1), puis nous associons une procédure à chaque non terminal. Nous avons 6 non terminaux, donc 6 procédures, auxquelles nous ajoutons la procédure `accepter` qui assure la communication entre l'analyseur lexical et l'analyseur syntaxique (mode producteur/consommateur). Ainsi, le syntaxique peut demander au lexical d'avancer jusqu'à un symbole en cas d'erreur afin de pouvoir poursuivre l'analyse syntaxique en l'occurrence d'une erreur.

```
Z → let A in E
A → a = E; A | ε
R → T R'
R' → +T R' | ε
E → R | ε
T → id | (E)
```

<!-- TODO: unclear in source — the printed statement of this exercise (page 6 of the transcription) ends with "A faire !" pointing students to the mini-projet compiler's analyzer as a worked example, but no explicit pseudo-code for the 6 procedures is given in this document; not silently invented here. -->

### 8) Automate fini et analyseur lexical

```
Début → (0) --lettre--> (1) --lettre,chiffre--> (1)
                          (1) --autre--> ((2))* return(UnilexId())
        (0) --';'--> ...
```

<!-- TODO: unclear in source — the automaton diagram at the end of the correction (last lines: "l, c / bl, tab, \n / l / 1 autre / 2 / * return(UnilexId()) / Début / 0 / ;") is cut off in the extracted text and the pseudo-code for AnalLex() is marked "A compléter !" in the source itself, pointing to the mini-projet compiler's analyzer as a worked example — not reconstructed here to avoid inventing content the source does not provide. -->

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/compilation-corrige-td-tc-2023.pdf" />

</TabItem>
</Tabs>
