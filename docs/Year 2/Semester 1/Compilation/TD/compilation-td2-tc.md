---
sidebar_position: 2
title: "TD2 : Techniques de Compilation"
sidebar_label: TD2
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD2 : Techniques de Compilation

*ENSI — Techniques de Compilation — 2023-2024*

<!-- TODO: the source PDF renders the grammar's non-terminal names in Exercice 1 with a non-standard math/italic font that the text extraction turned into garbled Unicode symbols (e.g. "ð", "ð´"). The Latin-letter names below (Z, A, R, E, T) are reconstructed by cross-referencing the same grammar as it appears, already decoded, in the companion correction document "TD Techniques de Compilation" (Leila Ben Ayed). Verify against the original PDF page if in doubt. -->

## Exercice 1

Soit la grammaire `G(V, T, Z, R)`, avec `V = {Z, A, R, E, T}`, `T = {let, in, a, +, ;, (, ), id}`. `Z` est l'axiome et `R` (les règles de production) est défini par :

```
Z → let A in E
A → a = E ; A | ε
R → T | R + T
E → R | ε
T → id | ( E )
```

1) Éliminer la récursivité à gauche et factoriser (éliminer l'ambiguïté) si nécessaire.

2) Calculer les ensembles Premier et Suivant pour chaque non terminal dans cette grammaire.

3) Construire la table d'analyse de cette grammaire.

4) La nouvelle grammaire est-elle ambiguë ? Justifier votre réponse.

5) Donner les étapes d'analyse du mot `m : let in id=id`.

NB. Ajouter la synchronisation dans la table d'analyse pour le traitement des erreurs syntaxiques.

## Exercice 2

Soit la grammaire suivante qui génère des expressions conditionnelles :

```
I → si B alors I sinon I | si B alors I | id := E
B → E opr E | non B | B et B | B ou B
E → nb | id | E opa E | (E)
```

(`opa` pour "les opérateurs arithmétiques `+`, `*`, `/`, `-`", `opr` pour les opérateurs relationnels `>`, `<`, `=`)

1) Définir toutes les unités lexicales de la grammaire fournie.

2) Donner le résultat de l'analyse lexicale pour le mot suivant :

```
si b>10 alors si a>b alors a :=b sinon a :=0
```

3) Analyser le mot `si b>10 alors si a>b alors a :=b sinon a :=0`. Donner une dérivation et l'arbre d'analyse.

4) Donner un analyseur sémantique en augmentant la grammaire par des règles sémantiques.

5) Traduire, en code pour machine abstraite à pile, le mot traité en 3).

6) Donner un traducteur en code pour machine abstraite à pile.

<!-- TODO: no separate correction was found for this TD alongside the statement in the source Drive folder — only the statement PDF is transcribed here. -->

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/compilation-td2-tc.pdf" />

</TabItem>
</Tabs>
