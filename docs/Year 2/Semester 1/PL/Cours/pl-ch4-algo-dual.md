---
sidebar_position: 5
title: "Chapitre 4 : Algorithme dual de simplexe"
sidebar_label: Ch4 - Algorithme dual
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 4 : Algorithme dual de simplexe

*ENSI — N. Elloumi — RO : Programmation linéaire*

## I. Définition d'un programme dual de Simplexe

**Programme Primal** — On considère un problème sous forme canonique :

$$
\left\{
\begin{aligned}
&Max\ Z = {}^t\!c\,x \\
&\text{Sous contraintes} \\
&Ax \le b \\
&x \ge 0;\ x \in \mathbb{R}^n
\end{aligned}
\right.
\qquad
A \text{ est une matrice } m \times n,\quad b \in \mathbb{R}^m,\quad x,c \in \mathbb{R}^n
$$

À ce programme on associe le programme dual :

$$
\left\{
\begin{aligned}
&Min\ w = {}^t\!b\,u \\
&\text{Sous contraintes} \\
&{}^t\!A\,u \ge c \\
&u \ge 0;\ u \in \mathbb{R}^m
\end{aligned}
\right.
\qquad
{}^t\!A \text{ est une matrice } n \times m,\quad u,b \in \mathbb{R}^m,\quad c \in \mathbb{R}^n
$$

**Remarque** : Le dual du programme dual est le primal.

**Exemple**

$$
(PL)
\left\{
\begin{aligned}
&Max\ Z = -2x_1 - x_3 \\
&\text{Sous contraintes} \\
&-x_1 - x_2 + x_3 \le -5 \\
&-x_1 + 2x_2 - 4x_3 \le -8 \\
&x_i \ge 0
\end{aligned}
\right.
\quad\xrightarrow{\text{Son programme dual}}\quad
(D)
\left\{
\begin{aligned}
&Min\ w = -5u_1 - 8u_2 \\
&\text{Sous contraintes} \\
&-u_1 - u_2 \ge -2 \\
&-u_1 + 2u_2 \ge 0 \\
&u_1 - 4u_2 \ge -1 \\
&u_i \ge 0
\end{aligned}
\right.
$$

**Exercice**

Une personne a la possibilité de vendre 500 cartes postales et 20 guides touristiques sous forme de deux types de lots : lot1 [un guide - 20 cartes postales pour des bénéfices de 6 euros] lot2 [un guide et 50 cartes postales pour des bénéfices de 10 euros].

1. Formuler un modèle donnant un plan qui maximise les bénéfices.
2. Écrire le programme dual et donner la signification des variables duales.

## Problème primal et problème dual

$$
\left\{
\begin{aligned}
&Min\ Z = {}^t\!c\,x \\
&\text{Ss contraintes} \\
&Ax \ge b \\
&x \ge 0
\end{aligned}
\right.
\qquad\Longleftrightarrow\qquad
\left\{
\begin{aligned}
&Max\ Z = {}^t\!b\,y \\
&\text{Ss contraintes} \\
&{}^t\!A\,y \le c \\
&y \ge 0
\end{aligned}
\right.
$$

$$
\left\{
\begin{aligned}
&Min\ Z = {}^t\!c\,x \\
&\text{Ss contraintes} \\
&Ax = b \\
&x \ge 0
\end{aligned}
\right.
\qquad\Longleftrightarrow\qquad
\left\{
\begin{aligned}
&Max\ Z = {}^t\!b\,y \\
&\text{Ss contraintes} \\
&{}^t\!A\,y \le c
\end{aligned}
\right.
$$

**Passage détaillé** (mise sous forme standard puis dualisation) :

$$
\left\{
\begin{aligned}
&Min\ {}^t\!c\,x \\
&SC\ Ax \ge b \\
&x \ge 0
\end{aligned}
\right.
\;\xrightarrow{\text{Forme standard}}\;
\left\{
\begin{aligned}
&Min\ {}^t\!c\,x - {}^t\!0\,s \\
&SC\ Ax - Is = b \\
&x \ge 0,\ s \ge 0
\end{aligned}
\right.
$$

$$
\left\{
\begin{aligned}
&Max\ {}^t\!b\,y \\
&SC\ \begin{bmatrix} {}^t\!A \\ -{}^t\!I \end{bmatrix} y \le \begin{bmatrix} c \\ 0 \end{bmatrix}
\end{aligned}
\right.
\;\xleftarrow{\text{Le dual}}\;
\left\{
\begin{aligned}
&Max\ {}^t\!b\,y \\
&SC\ {}^t\!A\,y \le c \\
&-{}^t\!I\,y \le 0
\end{aligned}
\right.
\;\xleftarrow{}\;
\left\{
\begin{aligned}
&Max\ {}^t\!b\,y \\
&SC\ {}^t\!A\,y \le c \\
&y \ge 0
\end{aligned}
\right.
$$

**Remarque : Le dual du dual est un primal.**

## II. Théorème de dualité faible

**Théorème** : Pour toute solution réalisable $x$ du programme primal et $u$ solution réalisable du programme dual on a ${}^t\!c\,x \le {}^t\!b\,u$.

**Preuve**

Primal (forme standard) : $Max\ Z = {}^t\!c\,x$ ; $Ax + \xi = b$ ; $x \ge 0, \xi \ge 0$.

Dual (forme standard) : $Min\ w = {}^t\!b\,u$ ; ${}^t\!A\,u - J = c$ ; $u \ge 0, J \ge 0$.

$${}^t\!c\,x = {}^t\!\left({}^t\!A\,u - J\right)x = {}^t\!u\,Ax - {}^t\!J\,x = {}^t\!u(b-\xi) - {}^t\!J\,x \le {}^t\!u\,b$$

## III. Théorème de dualité forte

**Théorème** : Si le programme primal a comme solution optimale $x_B = B^{-1}b \ge 0$, alors $\bar{u} = {}^t\!\left(c_B^t\,B^{-1}\right)$ est une solution optimale du dual et $Min\ w = Max\ Z$.

**Preuve** :

1) $\bar{u}$ vérifie les contraintes du programme dual. CNS : $\begin{pmatrix} {}^t\!B \\ {}^t\!N \end{pmatrix}\bar{u} \ge \begin{pmatrix} c_B \\ c_N \end{pmatrix} \Leftrightarrow \begin{pmatrix} {}^t\!B\,{}^t\!\left({}^t\!c_B B^{-1}\right) \ge c_B \\ \left(-{}^t\!c_N + {}^t\!c_B B^{-1}N\right) \ge 0 \end{pmatrix}$

$\bar{u}$ est admissible SSI $\left({}^t\!c_N - {}^t\!c_B B^{-1}N\right) \le 0$

2) $\bar{u}$ est optimal pour le programme dual :

$${}^t\!b\,\bar{u} = {}^t\!b\,{}^t\!\left(c_B^t B^{-1}\right) = {}^t\!\left(B^{-1}b\right)c_B = {}^t\!x_B\,c_B = {}^t\!x\,c = \text{valeur max du primal}$$

**Dualité faible** : ${}^t\!c\,x \le {}^t\!b\,u \;\Rightarrow\; Min\ w = Max\ Z$

## IV. Tableau de simplexe Primal-Dual

$$
\left\{
\begin{aligned}
&Max\ Z = {}^t\!c_B\,x_B + {}^t\!c_N\,x_N + {}^t\!0\,Y \\
&\text{Sous contraintes} \\
&b = Bx_B + Nx_N + IY \qquad Y : \text{vecteur des variables additionnelles} \\
&x_B \ge 0;\ x_N \ge 0;\ Y \ge 0
\end{aligned}
\right.
$$

$$\Rightarrow x_B = B^{-1}b - B^{-1}Nx_N - B^{-1}Y$$

$$\Rightarrow Z = {}^t\!c_B B^{-1}b + \left({}^t\!c_N - {}^t\!c_B B^{-1}N\right)x_N - {}^t\!c_B B^{-1}Y$$

Ce qui donne :

$$Z = {}^t\!c_B B^{-1}b + \left({}^t\!c_N - {}^t\!c_B B^{-1}N\right)x_N - {}^t\!c_B B^{-1}Y$$
$$B^{-1}b = I\,x_B + B^{-1}N\,x_N + B^{-1}Y$$

|       | $x_B$          | $x_N$                              | $Y$              |
|-------|----------------|-------------------------------------|------------------|
| $Z$   | ${}^t\!c_B B^{-1}b$ | $0$ | $\left({}^t\!c_N - {}^t\!c_B B^{-1}N\right)$ | ${}^t\!c_B B^{-1}$ |
| $x_B$ | $B^{-1}b$      | $I$ | $B^{-1}N$ | $B^{-1}$ |

|                     | Simplexe | Dual Simplexe |
|---------------------|----------|----------------|
| SRB Non optimale    | $x_B = B^{-1}b \ge 0$ ; $\left({}^t\!c_N - {}^t\!c_B B^{-1}N\right)$ qcq | $\left({}^t\!c_N - {}^t\!c_B B^{-1}N\right) \le 0$ ; $x_B = B^{-1}b$ qcq |
| Solution optimale   | $x_B = B^{-1}b \ge 0$ ; $\left({}^t\!c_N - {}^t\!c_B B^{-1}N\right) \le 0$ | $\left({}^t\!c_N - {}^t\!c_B B^{-1}N\right) \le 0$ ; $x_B = B^{-1}b \ge 0$ |

## V. Algorithme dual de simplexe : Principe

Pour un problème de maximisation, l'algorithme de simplexe considère une suite de solutions de base réalisable.

Soit $B$ l'une des bases associée à une SRB. Les contraintes du programme dual sont respectées ssi : $\left({}^t\!c_N - {}^t\!c_B B^{-1}N\right) \le 0$

En même temps aucune condition sur $x_B = B^{-1}b\;(\ge 0 \text{ ou } \le 0)$.

D'après le théorème de la dualité forte, si $B$ est optimale pour le dual elle est optimale pour le primal et $Min\ w = Max\ Z$.

Envisager un algorithme qui partait d'une solution $u = {}^t\!\left(c_B^t B^{-1}\right)$ admissible pour le dual (mais $x_B = B^{-1}b$ qcq n'est pas admissible pour le primal).

En effectuant une suite de pivotages en maintenant admissible pour le programme dual les solutions ($u$). On s'arrête dès que $x_B = B^{-1}b$ devient admissible pour le primal (c-à-d $x_B = B^{-1}b \ge 0$).

### Algorithme

**Ligne de pivot** : On choisit la ligne $i_0$ telle que $\left(B^{-1}b\right)_{i_0} < 0$ (la plus négative). La variable $x_{i_0}$ quitte la base.

**Colonne de pivot** : $x_{j_0}$ entre dans la base, associée à la colonne $j_0$ telle que :

(i) $a_{i_0j_0} < 0$

(ii) $\dfrac{\bar{c}_{j_0}}{a_{i_0j_0}} = \displaystyle\min_{a_{i_0j} < 0}\left(\dfrac{\bar{c}_j}{a_{i_0j}}\right)$

Ce changement de base garantit :

(i) la fonction $w$ diminue
(ii) les coûts réduits restent toujours positifs ou nuls.

**Le pivotage** : de la même manière que l'algorithme de simplexe.

### Exemple

**Remarque** : Dans le tableau simplexe qu'on optimise par la méthode duale de simplexe, si à une itération on a $\left(B^{-1}b\right)_{i_0} < 0$ et $a_{i_0j} \ge 0\ \forall j$, alors le programme primal n'est pas réalisable.

**Exemple** :

$$
(PL)
\left\{
\begin{aligned}
&Min\ Z = 2x_1 + 6x_2 \\
&\text{Sous contraintes} \\
&x_1 + 4x_2 \ge 4 \\
&x_1 + 2x_2 \ge 3 \\
&x_i \ge 0
\end{aligned}
\right.
$$

<!-- TODO: page 12's small graph plots the feasible region with points (0,0), (0,1), and (2, 1/2) marked — a genuine coordinate-plane figure in the source, described here rather than re-rendered; see PDF tab. -->

## VI. Théorème des écarts complémentaires

**Programme Primal**

$$
(P)
\left\{
\begin{aligned}
&Max\ Z = {}^t\!c\,x \\
&\text{Sous contraintes} \\
&Ax \le b \\
&x \ge 0;\ x \in \mathbb{R}^n
\end{aligned}
\right.
\qquad
\text{Son dual : }
(D)
\left\{
\begin{aligned}
&Min\ w = {}^t\!b\,u \\
&\text{Sous contraintes} \\
&{}^t\!A\,u \ge c \\
&u \ge 0;\ u \in \mathbb{R}^m
\end{aligned}
\right.
$$

**Théorème** : Soit $x$ et $u$ des solutions admissibles du primal et du dual (resp.). Les vecteurs $x$ et $u$ sont des solutions optimales des deux problèmes respectifs si et seulement si :

$$u_i\left({}^t\!A_i\,x - b_i\right) = 0 \quad \forall i$$
$$\left(c_j - {}^t\!u\,A_j\right)x_j = 0 \quad \forall j$$

**Preuve**

*Dualité faible* :

$$Ax \le b \;\Rightarrow\; F = {}^t\!u(b - Ax) \ge 0$$
$$ {}^t\!A\,u \ge c\ (\text{de même } A^t u \ge {}^t\!c) \;\Rightarrow\; G = (A^t u - {}^t\!c)x \ge 0$$
$$\Rightarrow F + G = {}^t\!u\,b - {}^t\!c\,x \ge 0$$

*Dualité forte* : À l'optimalité on a ${}^t\!u\,b = {}^t\!c\,x \Rightarrow \begin{cases} F+G = 0 \\ F \ge 0,\ G \ge 0 \end{cases} \Rightarrow F = G = 0$

$$F = 0 \;\Rightarrow\; u_i\left({}^t\!A_i\,x - b_i\right) = 0 \quad \forall i = 1...m$$
$$G = 0 \;\Rightarrow\; \left(c_j - {}^t\!u\,A_j\right)x_j = 0 \quad \forall j = 1...n$$

**Exemple**

$$
(PL)
\left\{
\begin{aligned}
&Min\ z = 13x_1 + 10x_2 + 6x_3 \\
&\text{S.C} \\
&5x_1 + x_2 + 3x_3 = 8 \\
&3x_1 + x_2 = 3 \\
&x_i \ge 0
\end{aligned}
\right.
\quad\xrightarrow{\text{Son programme dual}}\quad
(D)
\left\{
\begin{aligned}
&Max\ w = 8u_1 + 3u_2 \\
&\text{S.C} \\
&5u_1 + 3u_2 \le 13 \\
&u_1 + u_2 \le 10 \\
&3u_1 \le 6
\end{aligned}
\right.
$$

Étant donné que la solution optimale du primal $x^* = (1, 0, 1)$, montrer, à l'aide du théorème des écarts, que $u^* = (2, 1)$ est la solution optimale du programme dual.

**Exercice**

$$
(P)
\left\{
\begin{aligned}
&Max\ Z = 3u_1 + 4u_2 \\
&\text{S.C} \\
&2u_1 + u_2 \le 2 \\
&u_1 + 2u_2 \le 6 \\
&3u_1 + 9u_2 \le 1 \\
&u_i \ge 0
\end{aligned}
\right.
$$

1. Résoudre graphiquement ce problème.
2. Écrire le dual de ce problème et utiliser la théorie des écarts complémentaires pour déterminer une solution optimale du dual.

## VII. Problème de transport

<!-- TODO: page 17 shows a bipartite transport-network diagram (source ["Tunis" 1, "Bizerte" 2] each with an arrow, labeled with a cost, to each of ["Gabès" 1, "Sousse" 2, "Sfax" 3]) — a genuine network diagram in the source, described in prose rather than re-rendered as Mermaid, since faithfully preserving the exact edge-cost labeling as a diagram risks transcription error; see PDF tab for the figure. -->

**Quantités disponibles** : Tunis (nœud 1) : 550 ; Bizerte (nœud 2) : 350.
**Quantités demandées** : Gabès (nœud 1) : 400 ; Sousse (nœud 2) : 300 ; Sfax (nœud 3) : 200.

Coûts de transport (par arc, lus sur le schéma source) : Tunis→Gabès = 5, Tunis→Sousse = 6, Tunis→Sfax = 3, Bizerte→Gabès = 3, Bizerte→Sousse = 5, Bizerte→Sfax = 4.

**Problème Primal**

$$
(P)
\left\{
\begin{aligned}
&\text{Minimiser } Z = 5x_{11} + 6x_{12} + 3x_{13} + 3x_{21} + 5x_{22} + 4x_{23} \\
&\text{S.C} \\
&x_{11} + x_{12} + x_{13} \le 550 \\
&x_{21} + x_{22} + x_{23} \le 350 \\
&x_{11} + x_{21} \ge 400 \\
&x_{12} + x_{22} \ge 300 \\
&x_{13} + x_{23} \ge 200 \\
&x_{ij} \ge 0
\end{aligned}
\right.
$$

**Problème Dual**

$$
(D)
\left\{
\begin{aligned}
&\text{Maximiser } W = -550u_1 - 350u_2 + 400u_3 + 300u_4 + 200u_5 \\
&\text{S.C} \\
&-u_1 + u_3 \le 5 \\
&-u_1 + u_4 \le 6 \\
&-u_1 + u_5 \le 3 \\
&-u_2 + u_3 \le 3 \\
&-u_2 + u_4 \le 5 \\
&-u_2 - u_5 \le 4 \\
&u_i \ge 0
\end{aligned}
\right.
$$

<!-- TODO: the last constraint on page 19 reads "-u2 - u5 ≤ 4" in the source slide (verified against the PDF page image), which breaks the pattern of every other listed constraint (all use "-u1/-u2 + u_k"); it may be a typo in the source for "-u2 + u5 ≤ 4" but is transcribed exactly as shown rather than silently corrected — verify against the original if this is used for computation. -->

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/pl-ch4-algo-dual.pdf" />

</TabItem>
</Tabs>
