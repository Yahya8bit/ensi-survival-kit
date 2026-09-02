---
sidebar_position: 4
title: "DS-AAC-2017-2 (fichier probablement mal classé)"
sidebar_label: DS-AAC-2017-2 (à vérifier)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning Fichier probablement mal classé dans le dossier ACOO
Le contenu de ce PDF (`DS-AAC-2017-2.pdf`) n'est **pas** un devoir surveillé d'ACOO (Analyse et Conception Orientée Objet). Son en-tête indique explicitement la matière **« Conception et Analyse des algorithmes »** (algorithmique et complexité — recherche en tableau, division pour régner sur les polynômes, NP-complétude), pour la classe II2, année 2017/2018. Il ne contient aucun contenu UML/objet.

« AAC » dans le nom du fichier semble donc désigner cette matière d'algorithmique (« Analyse et Algorithmique de la Complexité » ou un intitulé proche — à confirmer), pas une ancienne appellation d'ACOO. Le fichier est transcrit ci-dessous tel quel par souci de fidélité à la source, mais **son classement dans le dossier ACOO est probablement une erreur** ; il faudrait le déplacer vers le dossier de la matière d'algorithmique correspondante après vérification.
:::

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Conception et Analyse des algorithmes — Devoir surveillé (2017/2018)

*Université de La Manouba — Ecole Nationale des Sciences de l'Informatique — Classe : II2 — 16 novembre 2017 — Documents non autorisés — Durée : 2 heures — Enseignants : W. Chaker, A. Habacha Chaibi, W. Sadfi — Nbre de pages : 2*

<!-- TODO: unclear in source, verify against original PDF (slide/exam text extraction reorders some fragments, especially mathematical notation and the graph description in Exercice 3) — best-effort reconstruction below, see task summary -->

## Exercice 1

On dispose d'un tableau de type constant `T[1..n]` (`n ∈ N*`) contenant tous les entiers de l'intervalle `1..n+1`, sauf un. On veut déterminer quel est l'entier absent de `T`.

1. Construire un algorithme qui résout le problème en temps linéaire, sans utiliser de tableau auxiliaire.
2. Le tableau est maintenant de type variable. On cherche simultanément à déterminer la valeur manquante et à trier le tableau. On peut supposer qu'une cellule supplémentaire de `T` est disponible à la position `n+1`. Construire une solution itérative qui résout le problème en temps linéaire.
3. Le tableau `T[1..n]` est à présent supposé trié. Construire une solution Diviser pour Régner basée sur la recherche dichotomique. Fournir le modèle de division ainsi que l'algorithme. Quelle est sa complexité au pire ?

## Exercice 2

Soient `P` et `Q` deux polynômes de degré `<= 2n`, que l'on représentera à l'aide des tableaux de leurs coefficients.

On considère les polynômes `P1`, `P2`, `Q1`, `Q2` tels que :

`P = P1 + Xⁿ.P2`

`Q = Q1 + Xⁿ.Q2`

1. Donner la complexité de l'algorithme naïf de multiplication de deux polynômes.
2. Exprimer `PQ` à l'aide de `P1`, `P2`, `Q1`, `Q2`. Quelle serait la complexité d'un algorithme diviser pour régner sur la base de cette équation ?
3. Exprimer `P1Q2 + P2Q1` à l'aide de `(P1 + P2)`, `(Q1 + Q2)`, `P1Q1` et `P2Q2`.
4. Soit `R1 = P1Q1`, `R2 = (P1 + P2)(Q1 + Q2)` et `R3 = P2Q2`. Exprimer `PQ` à l'aide des seuls `R1`, `R2`, `R3` et `X`.
5. En déduire la complexité du calcul de multiplication de deux polynômes.

## Exercice 3

Considérons les deux problèmes de décision suivants :

**Not-All-Equal 3-SAT (NAE-3SAT)**

- **Entrée** : une formule logique en forme normale conjonctive avec `n` variables booléennes `x1, …, xn` et `m` clauses `C1, …, Cm` formées par exactement 3 littéraux.
- **Question** : peut-on assigner des valeurs aux `xi` de manière que chaque clause contienne au moins un littéral vrai et un littéral faux ?

**Partition sans triangle (PST)**

- **Entrée** : graphe non-orienté `G = (V, E)` ; `V` étant l'ensemble des sommets et `E` l'ensemble des arêtes.
- **Question** : peut-on séparer `E` en deux sous-ensembles `E1` et `E2` de manière que les graphes `G1 = (V, E1)` et `G2 = (V, E2)` ne contiennent aucun triangle (c'est-à-dire trois arêtes `(i,j)`, `(j,k)` et `(k,i)`) ?

1. Trouvez une assignation qui prouve que la formule `φ` suivante est NAE-3SAT :

   `φ = (x1 ∨ x2 ∨ x3) ∧ (x1 ∨ x2 ∨ x3)`

   <!-- TODO: unclear in source, verify against original PDF page 1 — the formula φ was extracted as garbled text ("xxxxxx 1 ∨ 2 ∨ 3") with unclear negations on the literals; reproduced above without negation marks pending verification against the original page image -->

2. Trouvez une partition qui prouve que le graphe `G` suivant est PST :

   `G = ({1;2;3;4;5}, {(1,4);(1,3);(2,3);(1,5);(3,4);(4,5)})`

   <!-- TODO: unclear in source, verify against original PDF page 2 — the edge set of G was extracted as garbled/reordered text; reproduced above as a best-effort reconstruction, and the accompanying graph illustration (5 numbered vertices) is a diagram not captured by OCR — verify both against the original page image -->

3. Montrez que NAE-3SAT et PST appartiennent à NP.
4. Montrez que `3-SAT ≤p NAE-3SAT` (`3-SAT α NAE-3SAT`). (Indice : à chaque clause `l1 ∨ l2 ∨ l3` associez deux NAE-clauses `(l1 ∨ l2 ∨ x)` et `(x ∨ l3 ∨ y)` où `y` est une variable qui doit être assignée à faux).
5. Montrez que `PST ≤p NAE-3SAT` (`PST α NAE-3SAT`). (Indice : créez une variable booléenne `xij` pour chaque arête `(i,j)` du graphe et un ensemble de clauses pour chaque triangle).
6. Que peut-on conclure quant à la NP-complétude de NAE-3SAT et de PST ?

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/acoo-ds-aac-2017-2.pdf" />

</TabItem>
</Tabs>
