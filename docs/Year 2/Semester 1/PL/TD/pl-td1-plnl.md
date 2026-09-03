---
sidebar_position: 1
title: "Série : Programmation Linéaire — Algorithme de Simplexe"
sidebar_label: TD1 - Série PL (Simplexe)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Série : Programmation Linéaire — Algorithme de Simplexe

*ENSI — Classe I.I.2 : Programmation linéaire et non linéaire — A.U. 2023/2024*

<!-- TODO: the source PDF's own filename is "TD-1-PLNL.pdf" though its actual title (page 1) is "Série: Programmation linéaire 'Algorithme de Simplexe'" — a pure Linear Programming (simplex/dual) exercise series, not a Non-Linear Programming TD despite the filename. Kept as a standalone document rather than merged with "TD1 Optimisation Non Linéaire" (a genuinely different, non-linear-optimization TD) — see that doc's own note. -->

<!-- TODO: "correction série 1 PLNL.pdf" was checked against this statement's exercise numbering/content and matches (same 15-exercise "Série 1" simplex/dual series) — merged in below as <details><summary>Correction</summary> blocks per exercise, following the repo's TD+correction pattern. The correction PDF only covers exercises 1, 2, 3, 4, 5, 6, 7, 11, 13 and 15 (handwritten, page-numbered 1-14 with a stray "Exercice 11"/"Exercice 13"/"Exercice 15" numbering matching this statement) — exercises 8, 9, 10, 12, 14 have no correction in the source and are left without a <details> block. -->

*Correction : notes manuscrites — "Série n°1"*

## Exercice 1

Un atelier peut fabriquer trois types d'articles :

- Article $A_1$ à la cadence de 35 pièces à l'heure
- Article $A_2$ à la cadence de 45 pièces à l'heure
- Article $A_3$ à la cadence de 20 pièces à l'heure

Cette fabrication utilise une machine-outil unique, disponible 200 heures par mois. Le bénéfice unitaire pour l'article $A_1$ est de 60 dinars, pour $A_2$ est de 40 dinars et pour $A_3$ est de 80 dinars.

Ces articles sont vendus en totalité à des grossistes. On a observé qu'on ne pouvait écouler, par mois, plus de 4900 pièces de types $A_1$, ni plus de 5400 pièces du type $A_2$, ni plus de 2000 pièces du type $A_3$. D'autre part, chaque pièce doit être vérifiée avant sa commercialisation. Une équipe de trois techniciens est chargée de cette mission. Chaque technicien travaille 170 heures par mois. La vérification d'une pièce du type $A_1$ prend 4 minutes, du type $A_2$ prend 3 minutes et du type $A_3$ prend 2 minutes.

1) Formuler un modèle donnant un plan de production qui maximise le profit de l'entreprise.
2) Mettre le modèle obtenu sous forme standard.

<details>
<summary>Correction</summary>

**1)** Type : maximisation.

Variables : $x_1$ : production d'articles de type $A_1$ ; $x_2$ : idem pour $A_2$ ; $x_3$ : idem pour $A_3$.

Fonction économique : $Z(x) = 60x_1+40x_2+80x_3$.

Contraintes :

- Écoulement maximal des différents types d'articles : $x_1\le4900$ (type $A_1$), $x_2\le5400$ (type $A_2$), $x_3\le2000$ (type $A_3$).
- Disponibilité de la machine (en heures) : $\dfrac1{35}x_1+\dfrac1{45}x_2+\dfrac1{20}x_3\le200$.
- Disponibilité des techniciens (en minutes) : $4x_1+3x_2+2x_3\le30600$.

D'où le modèle :

$$
\left\{
\begin{aligned}
&Max[Z(x)=60x_1+40x_2+80x_3] \\
&x_1\le4900 \\
&x_2\le5400 \\
&x_3\le2000 \\
&\frac1{35}x_1+\frac1{45}x_2+\frac1{20}x_3\le200 \\
&4x_1+3x_2+2x_3\le30600 \\
&x_i\ge0,\ i\in[1,3]
\end{aligned}
\right.
$$

**2)** La forme standard du modèle est :

$$
\left\{
\begin{aligned}
&Max[Z(x)=60x_1+40x_2+80x_3] \\
&x_1+x_4=4900 \\
&x_2+x_5=5400 \\
&x_3+x_6=2000 \\
&\frac1{35}x_1+\frac1{45}x_2+\frac1{20}x_3+x_7=200 \\
&4x_1+3x_2+2x_3+x_8=30600 \\
&x_i\ge0,\ i\in[1,8]
\end{aligned}
\right.
$$

</details>

## Exercice 2

On désire déterminer la composition, à coût minimal, d'un aliment pour bétail qui est obtenu en mélangeant au plus trois produits bruts : orge, arachide et sésame. L'aliment ainsi conditionné devra comporter au moins 22% de protéines et 3,6% de graisses, pour se conformer aux exigences de la clientèle.

Dans le tableau ci-dessous, on indique les pourcentages de protéines et de graisses contenus, respectivement, dans l'orge, les arachides et le sésame, ainsi que le coût par tonne de chacun des produits bruts :

| produit brut | orge | arachides | sésame |
|---|---|---|---|
| pourcentage de protéines | 12% | 52% | 42% |
| pourcentage de graisses | 2% | 2% | 10% |
| coût par tonne | 25 | 41 | 39 |

Afin de déterminer la composition, à coût minimal, d'une tonne d'aliment conforme aux exigences de la clientèle, donner une formulation du problème posé sous forme d'un programme linéaire.

<details>
<summary>Correction</summary>

Type : minimisation.

Variables : $x_1$, $x_2$ et $x_3$ les fractions d'orge, d'arachide et de sésame dans une tonne.

Contraintes :

- Dans une tonne on doit avoir : $x_1+x_2+x_3=1$
- L'aliment doit contenir au moins 22% de protéines : $12x_1+52x_2+42x_3\ge22$
- L'aliment doit contenir au moins 3,6% de graisses : $2x_1+2x_2+10x_3\ge3,6$

Fonction économique : $Z(x)=25x_1+41x_2+39x_3$.

D'où le (PL) :

$$
\left\{
\begin{aligned}
&Min[Z(x)=25x_1+41x_2+39x_3] \\
&x_1+x_2+x_3=1 \\
&12x_1+52x_2+42x_3\ge22 \\
&2x_1+2x_2+10x_3\ge3,6 \\
&x_i\ge0,\ i\in[1,3]
\end{aligned}
\right.
$$

</details>

## Exercice 3

Une importante entreprise d'appareils électroniques dispose de trois usines à différents endroits au pays. La production annuelle de chaque usine pour un certain type d'appareils est la suivante :

| Usine | Production annuelle |
|---|---|
| U-1 | 15 000 unités |
| U-2 | 12 000 unités |
| U-3 | 23 000 unités |

Ces usines alimentent quatre points de vente dont la demande annuelle est la suivante :

| Points de vente | Demande annuelle |
|---|---|
| A | 10 000 unités |
| B | 5 000 unités |
| C | 20 000 unités |
| D | 15 000 unités |

Les coûts unitaires de transport de chaque usine à chaque point de vente sont indiqués dans le tableau suivant :

|      | A  | B  | C  | D  |
|------|----|----|----|----|
| U-1  | 5  | 6  | 6  | 8  |
| U-2  | 11 | 9  | 4  | 7  |
| U-3  | 12 | 7  | 8  | 5  |

Formuler le modèle de programmation linéaire qui permettrait d'obtenir un plan de transport à coût minimum.

<details>
<summary>Correction</summary>

Type : minimisation.

Variables : $x_{iA}$, $x_{iB}$, $x_{iC}$, $x_{iD}$ : $x_{ij}$ est la quantité d'appareils à envoyer de l'usine $i$ à la destination $j$, $i\in\{1,2,3\}$, $j\in\{A,B,C,D\}$.

Fonction économique : $Z(x) = 5x_{1A}+6x_{1B}+6x_{1C}+8x_{1D}+11x_{2A}+9x_{2B}+4x_{2C}+7x_{2D}+12x_{3A}+7x_{3B}+8x_{3C}+5x_{3D}$

Contraintes :

- Contraintes concernant la demande annuelle de chaque point de vente :
  $x_{1A}+x_{2A}+x_{3A}\ge10000$
  $x_{1B}+x_{2B}+x_{3B}\ge5000$
  $x_{1C}+x_{2C}+x_{3C}\ge20000$
  $x_{1D}+x_{2D}+x_{3D}\ge15000$
- Contraintes sur la production annuelle de chaque usine :
  $x_{1A}+x_{1B}+x_{1C}+x_{1D}\le15000$
  $x_{2A}+x_{2B}+x_{2C}+x_{2D}\le12000$
  $x_{3A}+x_{3B}+x_{3C}+x_{3D}\le23000$

D'où le (PL) :

$$
\left\{
\begin{aligned}
&Min[Z(x)=5x_{1A}+6x_{1B}+6x_{1C}+8x_{1D}+11x_{2A}+9x_{2B}+4x_{2C}+7x_{2D}+12x_{3A}+7x_{3B}+8x_{3C}+5x_{3D}] \\
&x_{1A}+x_{2A}+x_{3A}\ge10000 \\
&x_{1B}+x_{2B}+x_{3B}\ge5000 \\
&x_{1C}+x_{2C}+x_{3C}\ge20000 \\
&x_{1D}+x_{2D}+x_{3D}\ge15000 \\
&x_{1A}+x_{1B}+x_{1C}+x_{1D}\le15000 \\
&x_{2A}+x_{2B}+x_{2C}+x_{2D}\le12000 \\
&x_{3A}+x_{3B}+x_{3C}+x_{3D}\le23000 \\
&x_{iA}\ge0,\ x_{iB}\ge0,\ x_{iC}\ge0,\ x_{iD}\ge0,\ i\in\{1,2,3\}
\end{aligned}
\right.
$$

</details>

## Exercice 4

On considère le programme linéaire suivant :

$$
(PL)
\left\{
\begin{aligned}
&Max\ z = 5x_1 + x_2 + 6x_3 + 24x_4 \\
&\text{Sous-Contraintes:} \\
&4x_1 + 4x_2 + 4x_3 + x_4 \le 24 \\
&8x_1 + 6x_2 + 4x_3 + 3x_4 \le 36 \\
&x_j \ge 0;\ j = 1,...,4
\end{aligned}
\right.
$$

a- Écrire (PL) sous forme standard, les variables d'écart seront nomées $x_5$ et $x_6$.
b- Soit $B = (A_3, A_4)$. Cette base est-elle réalisable ? est-elle optimale ?

<details>
<summary>Correction</summary>

**a-** La forme standard :

$$
(FS)
\left\{
\begin{aligned}
&Max[Z(x)=5x_1+x_2+6x_3+24x_4] \\
&4x_1+4x_2+4x_3+x_4+x_5=24 \\
&8x_1+6x_2+4x_3+3x_4+x_6=36 \\
&x_i\ge0,\ i\in[1,6]
\end{aligned}
\right.
$$

**b-** $A = \left(\begin{smallmatrix}4&4&4&1&1&0\\8&6&4&3&0&1\end{smallmatrix}\right)$ et $b=\begin{pmatrix}24\\36\end{pmatrix}$. Avec $B=(A_3,A_4)=\begin{pmatrix}4&1\\4&3\end{pmatrix} \Rightarrow B^{-1}=\dfrac18\begin{pmatrix}3&-1\\-4&4\end{pmatrix}$.

$B^{-1}b = \dfrac18\begin{pmatrix}3&-1\\-4&4\end{pmatrix}\begin{pmatrix}24\\36\end{pmatrix} = \begin{pmatrix}9/2\\6\end{pmatrix} \ge 0$. Donc $B$ est réalisable.

Pour vérifier l'optimalité il faut calculer $w_N^t$ :

$$w_N^t = c_N^t - c_B^t\,B^{-1}N = (5,1,0,0)-(6,24)\times\frac18\begin{pmatrix}3&-1\\-4&4\end{pmatrix}\begin{pmatrix}4&4&1&0\\8&6&0&1\end{pmatrix}$$

$$= \left(-46,-\frac{55}{2},\frac{39}{4},-\frac{45}{4}\right) \not\le 0$$

Donc $B$ n'est pas optimale.

</details>

## Exercice 5

On considère les programmes linéaires suivants :

$$
(PL)
\left\{
\begin{aligned}
&Max\ z = 2x_1 + x_2 + x_3 \\
&\text{Sous-Contraintes:} \\
&2x_1 + x_2 + x_3 \le 2 \\
&x_1 + x_2 \le 10 \\
&2x_1 + 4x_2 + x_3 \le 8 \\
&x_j \ge 0;\ j = 1,...,3
\end{aligned}
\right.
\qquad
(PL)
\left\{
\begin{aligned}
&max\ z = 3x_1 + 4x_2 + x_3 \\
&\text{Sous-Contraintes :} \\
&x_1 + 2x_2 + 2x_3 \le \frac{8}{3} \\
&x_1 + 2x_2 + 3x_3 \ge \frac{7}{3} \\
&x_j \ge 0;\ j = 1,2,3
\end{aligned}
\right.
$$

a- Écrire (PL) sous forme standard.
b- Ce problème admet-il une solution initiale évidente ? justifier votre réponse.

<details>
<summary>Correction</summary>

**a-** La forme standard de $(PL_1)$ :

$$
Max[Z(x)=2x_1+x_2+x_3] \quad
\begin{aligned}
&2x_1+x_2+x_3+x_4=2 \\
&x_1+x_2+x_5=10 \\
&2x_1+4x_2+x_3+x_6=8 \\
&x_i\ge0,\ i\in[1,6]
\end{aligned}
$$

La forme standard de $(PL_2)$ :

$$
Max[Z(x)=3x_1+4x_2+x_3] \quad
\begin{aligned}
&x_1+2x_2+2x_3+x_4=\frac83 \\
&x_1+2x_2+3x_3-x_5=\frac73 \\
&x_i\ge0,\ i\in[1,5]
\end{aligned}
$$

**b-** Pour $(PL_1)$ : $A_1=\left(\begin{smallmatrix}2&1&1\\1&1&0\\2&4&1\end{smallmatrix}\ \middle|\ \begin{smallmatrix}1&0&0\\0&1&0\\0&0&1\end{smallmatrix}\right)$, $b_1=\begin{pmatrix}2\\10\\8\end{pmatrix}$. $B_1=I_3$ ; $B_1^{-1}\times b_1=b_1\ge0$ ($I_3$ est une base réalisable). D'où l'existence d'une solution initiale évidente.

Pour $(PL_2)$ : $A_2=\left(\begin{smallmatrix}1&2&2&1&0\\1&2&3&0&-1\end{smallmatrix}\right)$, $b_2=\begin{pmatrix}8/3\\7/3\end{pmatrix}$. Il n'existe pas une base réalisable $B_2\ /\ B_2=I_2$. Par conséquent, il n'existe pas de solution initiale évidente.

</details>

## Exercice 6

On considère le programme linéaire suivant :

$$
(PL)
\left\{
\begin{aligned}
&Max\ z = 25x_1 + 15x_2 \\
&\text{Sous-Contraintes:} \\
&2x_1 + 2x_2 \le 240 \\
&3x_1 + x_2 \le 140 \\
&x_j \ge 0;\ j = 1,2
\end{aligned}
\right.
$$

a- Représenter l'ensemble des solutions admissibles.
b- Localiser toutes les solutions de base réalisables.
c- Calculer la valeur de la fonction coût $Z$ en chacun de ces points et donner la solution optimale.
d- Effectuer une résolution graphique de ce problème.

<details>
<summary>Correction</summary>

**a-** $\Delta_1' : 2x_1+2x_2=240$ ; $(60,60)$ et $(50,70)$. $\Delta_2' : 3x_1+x_2=140$ ; $(30,50)$ et $(40,20)$. $\Delta_0 : 25x_1+15x_2=0$.

<!-- TODO: page 7 of the correction is a hand-drawn graph of the feasible domain D_R (a quadrilateral O, A, B, C) with Δ1', Δ2', Δ0, and Δmax plotted — genuine plotted figure, described in prose here rather than re-rendered; see PDF tab. -->

**b-** Les solutions de base réalisables sont les sommets du domaine réalisable $D_R$ : $O$, $A$, $B$ et $C$.

$O(0,0)$ ; $A\left(\dfrac{140}3,0\right)$ ; $B(30,50)$ et $C(0,120)$.

**c-** $Z_O(0,0)=0$, $Z_A\left(\dfrac{140}3,0\right)=\dfrac{3500}3$, $Z_B(30,50)=1900$, $Z_C(0,120)=1800$.

D'où $Z_B > Z_C > Z_A > Z_O \Rightarrow B$ est la solution optimale.

**d-** Graphiquement, $B$ est la solution optimale : $B(30,50)$.

</details>

## Exercice 7

On considère le programme linéaire suivant :

$$
(P.L)
\left\{
\begin{aligned}
&max\ z = 3x_1 + 2x_2 + 5x_3 \\
&\text{Sous Contraintes:} \\
&x_1 + 2x_2 + x_3 + x_4 = 430 \\
&3x_1 + 2x_3 + x_5 = 460 \\
&x_1 + 4x_2 + x_6 = 420 \\
&x_j \ge 0;\ j = 1,...,6
\end{aligned}
\right.
$$

1) Montrer que la solution : $X = (0, 0, 230, 200, 0, 420)$ est une solution de base réalisable du programme linéaire (P.L).
2) Donner le tableau du simplexe correspondant à cette solution de base.
3) Le tableau obtenu est-il optimal ? Justifier votre réponse.

<details>
<summary>Correction</summary>

**1)** $X=(0,0,230,200,0,420)$ : 3 contraintes et 6 variables. $\Rightarrow$ nombre de variables de base : 3 ($x_3,x_4,x_6$), hors base : 3 (les 3 autres nulles).

Soit $B=(A_3,A_4,A_6)=\begin{pmatrix}1&1&0\\2&0&0\\0&0&1\end{pmatrix} \Rightarrow B^{-1}=-\dfrac12\begin{pmatrix}0&-1&0\\-2&1&0\\0&0&-2\end{pmatrix}$

$B^{-1}b = {}^t(230,200,420)$. Donc $X$ est une solution de base réalisable.

**2)**

|       |       | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $x_5$ | $x_6$ |
|-------|-------|-------|-------|-------|-------|-------|-------|
| $Z$   |       | -9/2  | 2     | 0     | 0     | -5/2  | 0     |
| $x_3$ | 230   | 3/2   | 0     | 1     | 0     | 1/2   | 0     |
| $x_4$ | 200   | -1/2  | 2     | 0     | 1     | -1/2  | 0     |
| $x_6$ | 420   | 1     | 4     | 0     | 0     | 0     | 1     |


$B^{-1}N = -\dfrac12\begin{pmatrix}0&-1&0\\-2&1&0\\0&0&-2\end{pmatrix}\begin{pmatrix}1&2&0\\3&0&1\\1&4&0\end{pmatrix} = -\dfrac12\begin{pmatrix}-3&0&-1\\1&-4&1\\-2&-8&0\end{pmatrix}$

$$w_N^t = c_N^t-c_B^tB^{-1}N = (3,2,0) - (5,0,0)\begin{pmatrix}3/2&0&1/2\\-1/2&2&-1/2\\1&4&0\end{pmatrix} = (3,2,0)-\left(\frac{15}2,0,\frac52\right) = \left(-\frac92,2,-\frac52\right)$$

**3)** Le tableau obtenu n'est pas optimal car $w_N \not\le 0$.

</details>

## Exercice 8

On considère le programme linéaire suivant :

$$
(PL)
\left\{
\begin{aligned}
&max\ z = 15x_1 + 40x_2 + 12x_3 \\
&\text{Sous-Contraintes :} \\
&6x_1 + 10x_2 + 2x_3 \le 60 \\
&2x_1 + 10x_2 + 6x_3 \le 140 \\
&x_j \ge 0;\ j = 1,2,3
\end{aligned}
\right.
$$

Résoudre le programme linéaire à l'aide de la méthode des tableaux du simplexe.

## Exercice 9

On considère le programme linéaire suivant :

$$
(PL)
\left\{
\begin{aligned}
&max\ z = -2x_1 - x_2 \\
&\text{Sous-Contraintes :} \\
&3x_1 + x_2 = 3 \\
&4x_1 + 3x_2 \ge 6 \\
&x_1 + 2x_2 \le 3 \\
&x_j \ge 0;\ j = 1,2
\end{aligned}
\right.
$$

1) Résoudre ce programme linéaire à l'aide de la méthode des deux phases.
2) Donner une résolution graphique de (LP) dans le plan $(x_1, x_2)$. Décrire, dans ce plan, le cheminement qui correspond à l'application de la méthode du simplexe.

## Exercice 10

On considère le programme linéaire suivant :

$$
(PL)
\left\{
\begin{aligned}
&max\ z = x_1 + 2x_2 \\
&\text{Sous-Contraintes :} \\
&-2x_1 + x_2 \le 2 \\
&-x_1 + 2x_2 \le 5 \\
&x_1 - 4x_2 \le 4 \\
&x_j \ge 0;\ j = 1,2
\end{aligned}
\right.
$$

1) Tenter de résoudre ce programme linéaire à l'aide de la méthode du simplexe.
2) Faire une résolution graphique.

## Exercice 11

1- Donner le programme dual de chaque programme linéaire.

$$
P_1
\left\{
\begin{aligned}
&Max\ z = 15x_1 + 40x_2 + 12x_3 \\
&\text{Sous-Contraintes:} \\
&6x_1 + 10x_2 + 2x_3 + x_4 = 60 \\
&2x_1 + 10x_2 + 6x_3 + x_5 = 140 \\
&x_j \ge 0;\ j = 1,...,5
\end{aligned}
\right.
\qquad
P_2
\left\{
\begin{aligned}
&Max\ z = 4x_1 + 5x_2 + 9x_3 \\
&\text{Sous-Contraintes:} \\
&x_1 + x_2 + 2x_3 = 16 \\
&7x_1 + 5x_2 + 3x_3 \le 25 \\
&x_j \ge 0;\ j = 1,...,3
\end{aligned}
\right.
$$

2- Prouver que le problème (PL) ni son dual ne possèdent une solution initiale :

$$
(PL)
\left\{
\begin{aligned}
&Min\ z = x_1 - 2x_2 \\
&\text{Sous-Contraintes:} \\
&x_1 - x_2 \ge 2 \\
&-x_1 + x_2 \ge -1 \\
&x_j \ge 0;\ j = 1,2
\end{aligned}
\right.
$$

<details>
<summary>Correction</summary>

**1)** Dual de $P_1$ :

$$
Min\ w = 60u_1+140u_2 \quad \text{s.c.}
\left\{
\begin{aligned}
&6u_1+2u_2\ge15 \\
&10u_1+10u_2\ge40 \\
&2u_1+6u_2\ge12 \\
&u_1\ge0,\ u_2\ge0
\end{aligned}
\right.
$$

Dual de $P_2$ :

$$
Min\ w = 16u_1+25u_2 \quad \text{s.c.}
\left\{
\begin{aligned}
&u_1+7u_2\ge4 \\
&u_1+5u_2\ge5 \\
&2u_1+3u_2\ge9 \\
&u_1 \text{ de signe quelconque} \\
&u_2\ge0
\end{aligned}
\right.
$$

**2)** Le vecteur des coûts réduits de $x_1$ et $x_2$ est $\begin{pmatrix}1\\-2\end{pmatrix}$, donc possède une composante positive d'où ce programme ne présente pas de solution initiale à l'algorithme dual.

$$
(PL)
\left\{
\begin{aligned}
&Min\ Z = x_1-2x_2 \\
&x_1+x_2\le-2 \\
&x_1-x_2\le1 \\
&x_i\ge0
\end{aligned}
\right.
$$

Le vecteur $b=\begin{pmatrix}-2\\1\end{pmatrix}$ de (PL) sous sa forme canonique possède une composante négative, d'où il ne présente pas de solution initiale pour le simplexe (ni pour son dual).

**3) Question supplémentaire** — Donner le dual de :

$$
\left\{
\begin{aligned}
&Max\ Z=2x_1+8x_2+x_3 \\
&x_1+2x_2+x_3=2 \\
&x_1+x_2\le10 \\
&2x_1+2x_2+x_3\ge8 \\
&x_1\ge0,\ x_2 \text{ de signe quelconque},\ x_3\ge0
\end{aligned}
\right.
$$

Le dual :

$$
\left\{
\begin{aligned}
&Min\ w=2u_1+10u_2-8u_3 \\
&u_1+u_2-2u_3\ge2 \\
&2u_1+u_2-2u_3=8 \\
&u_1-u_3\ge1 \\
&u_1 \text{ de signe quelconque},\ u_2\ge0,\ u_3\ge0
\end{aligned}
\right.
$$

</details>

## Exercice 12

Résoudre, à l'aide de l'algorithme dual simplexe, le programme linéaire suivant :

$$
(PL)
\left\{
\begin{aligned}
&Min\ z = x_1 + 2x_2 + 3x_3 \\
&\text{Sous-Contraintes:} \\
&-x_1 + 3x_2 + 5x_3 \ge 6 \\
&5x_1 - x_2 + 2x_3 \ge 4 \\
&x_j \ge 0;\ j = 1,2,3
\end{aligned}
\right.
$$

## Exercice 13

On considère le programme linéaire suivant :

$$
(P.L)
\left\{
\begin{aligned}
&Min\ z = 2x_1 + 3x_2 \\
&Sous-Contraintes: \\
&4x_1 + x_2 \ge 8 \\
&x_1 + 4x_2 \ge 8 \\
&7x_1 + 10x_2 \ge 47 \\
&x_j \ge 0;\ j = 1,2
\end{aligned}
\right.
$$

1- Donner le programme dual de P.L.
2- Donner une solution initiale évidente du programme dual.
3- Résoudre le programme dual à l'aide de la méthode du tableau de simplexe.
4- Donner le tableau optimal du programme primal à l'aide du tableau optimal dual.
5- Résoudre le programme P.L à l'aide de la méthode dual du simplexe.

<details>
<summary>Correction</summary>

**1)** Dual de (PL) :

$$
(D)
\left\{
\begin{aligned}
&Max\ w = 8u_1+8u_2+47u_3 \\
&4u_1+u_2+7u_3\le2 \\
&u_1+4u_2+10u_3\le3 \\
&u_i\ge0
\end{aligned}
\right.
$$

**2) SIE** : on met (D) sous sa forme standard :

$$
Max\ w=8u_1+8u_2+47u_3 \quad
\begin{aligned}
&4u_1+u_2+7u_3+y_1=2 \\
&u_1+4u_2+10u_3+y_2=3 \\
&u_i,y_i\ge0
\end{aligned}
$$

SIE : $x_B=\begin{pmatrix}y_1\\y_2\end{pmatrix}=\begin{pmatrix}2\\3\end{pmatrix}$, $x_N=\begin{pmatrix}u_1\\u_2\\u_3\end{pmatrix}=\begin{pmatrix}0\\0\\0\end{pmatrix}$.

**3)** Le programme (D) présente une solution initiale pour l'algorithme du simplexe : c'est la SIE.

|       |     | $u_1$ | $u_2$ | $u_3$ | $y_1$ | $y_2$ |
|-------|-----|-------|-------|-------|-------|-------|
| $w$   | 0   | 8     | 8     | 47    | 0     | 0     |
| $y_1$ | 2   | 4     | 1     | (7)   | 1     | 0     |
| $y_2$ | 3   | 1     | 4     | 10    | 0     | 1     |

**1ère itération** :

|       |      | $u_1$ | $u_2$ | $u_3$ | $y_1$ | $y_2$ |
|-------|------|-------|-------|-------|-------|-------|
| $w$   | 94/7 | 132/7 | 8/7   | 0     | -47/7 | 0     |
| $u_3$ | 2/7  | 4/7   | 1/7   | 1     | 1/7   | 0     |
| $y_2$ | 1/7  | -33/7 | (18/7)| 0     | -10/7 | 1     |

**Tableau optimal** :

|       |      | $u_1$  | $u_2$ | $u_3$ | $y_1$ | $y_2$ |
|-------|------|--------|-------|-------|-------|-------|
| $w$   | 27/2 | -33/2  | 0     | 0     | -6    | -1/2  |
| $u_3$ | 5/18 | 5/6    | 0     | 1     | 2/9   | -1/18 |
| $u_2$ | 1/18 | -11/6  | 1     | 0     | -5/9  | 7/18  |

$w^* = \dfrac{27}2$, $u^* = \begin{pmatrix}0\\1/18\\5/18\end{pmatrix}$.

**4)** Tableau optimal de (PL) à partir du tableau optimal de (D). On rajoute au tableau de (D) $u_1\ge0$, $y_1\ge0$, $y_2\ge0$, puis on transpose le tableau et on le multiplie par $(-1)$ sauf la valeur de $w$ :

|       |      | $u_1$  | $u_2$ | $u_3$ | $y_1$ | $y_2$ |
|-------|------|--------|-------|-------|-------|-------|
| $w$   | 27/2 | -33/2  | 0     | 0     | -6    | -1/2  |
| $u_3$ | 5/18 | 5/6    | 0     | 1     | 2/9   | -1/18 |
| $u_2$ | 1/18 | -11/6  | 1     | 0     | -5/9  | 7/18  |
| $u_1$ | 0    | -1     | 0     | 0     | 0     | 0     |
| $y_1$ | 0    | 0      | 0     | 0     | -1    | 0     |
| $y_2$ | 0    | 0      | 0     | 0     | 0     | -1    |

On transpose ce tableau et on le multiplie par $(-1)$ :

|       |      | $u_3$  | $u_2$ | $u_1$ | $y_1$ | $y_2$ |
|-------|------|--------|-------|-------|-------|-------|
| $Z$   | 27/2 | -5/18  | -1/18 | 0     | 0     | 0     |
| $y_1$ | 6    | -2/3   | 5/9   | 0     | 1     | 0     |
| $y_2$ | 1/2  | 1/18   | -7/18 | 0     | 0     | 1     |
| $u_1$ | 33/2 | -5/6   | -11/6 | 1     | 0     | 0     |
| $u_2$ | 0    | 0      | -1    | 0     | 0     | 0     |
| $u_3$ | 0    | -1     | 0     | 0     | 0     | 0     |

$\to$ Tableau optimal de (PL) : $Z^*=27/2$, $x^*=\begin{pmatrix}x_1=6\\x_2=1/2\end{pmatrix}$.

**5)** Appliquer l'algorithme dual du simplexe directement à (PL).

</details>

## Exercice 14

On considère le programme linéaire suivant :

$$
(PL)
\left\{
\begin{aligned}
&max\ Z = 6x_1 + 5x_2 \\
&sous-contraintes \\
&x_1 + x_2 \le 8 \\
&-2x_1 + 3x_2 \le 6 \\
&x_1 - x_2 \le 2 \\
&x_i \ge 0;\ i = 1,2
\end{aligned}
\right.
$$

1- Donner une résolution graphique de ce programme linéaire.
2- Soit un modèle de programmation linéaire qui doit être appliqué régulièrement mais dont certains coefficients varient d'une application à l'autre. Prenons le cas où les coefficients de la fonction coût $Z$ varient en fonction d'un facteur extérieur (prix d'une matière première, taux d'intérêt, indice des prix, …etc.).

Ce phénomène peut être modélisé par un paramètre intervenant dans ces coefficients. En introduisant un paramètre $\lambda$ dans la fonction coût $Z$, le programme linéaire (PL) s'écrit :

$$
(PL)
\left\{
\begin{aligned}
&max\ Z = (6-2\lambda)x_1 + (5+\lambda)x_2 \\
&sous-contraintes \\
&x_1 + x_2 \le 8 \\
&-2x_1 + 3x_2 \le 6 \\
&x_1 - x_2 \le 2 \\
&x_i \ge 0;\ i = 1,2
\end{aligned}
\right.
$$

a- Résoudre ce programme linéaire suivant les valeurs de $\lambda$.
b- Parmi les solutions réalisables trouvées dans la première question, quelles sont celles qui ne sont jamais solutions optimales.
c- Pour quelles valeurs de $\lambda$, le programme linéaire (PL) admet une infinité de solutions optimales ?

## Exercice 15

On considère le programme linéaire suivant :

$$
(PL)
\left\{
\begin{aligned}
&max\ Z = 3x_1 + 4x_2 \\
&sous-contraintes \\
&2x_1 + x_2 \le 2 \\
&x_1 + 2x_2 \le 6 \\
&3x_1 + 9x_2 \le 1 \\
&x_i \ge 0;\ i = 1,2
\end{aligned}
\right.
$$

1- Donner une résolution graphique de ce programme linéaire.
2- Écrire le dual de ce problème et utiliser le théorème des écarts complémentaires pour déterminer la solution optimale du dual.

<details>
<summary>Correction</summary>

**1)** <!-- TODO: page 14 is a hand-drawn graph of the feasible region (constraints 2x1+x2≤2, x1+2x2≤6, 3x1+9x2≤1) with the objective direction plotted — genuine plotted figure, described in prose here rather than re-rendered; see PDF tab. --> Solution optimale : $Z^*=1$, $x^*=\begin{pmatrix}1/3\\0\end{pmatrix}$.

**2)** Dual de (PL) :

$$
(D)
\left\{
\begin{aligned}
&Min\ w = 2u_1+6u_2+u_3 \\
&2u_1+u_2+3u_3\ge3 \\
&u_1+2u_2+5u_3\ge4 \\
&u_i\ge0
\end{aligned}
\right.
$$

Théorème des écarts complémentaires (TEC) : $\dfrac13(2u_1+u_2+3u_3-3)=0 \Rightarrow 2u_1+u_2+3u_3=3$, et $0\times(u_1+2u_2+9u_3-4)=0$.

Selon la solution du primal (PL) :

- $2x_1+x_2\le2$ est non saturée $\Rightarrow u_1=0$
- $x_1+2x_2\le6$ est non saturée $\Rightarrow u_2=0$
- $3x_1+9x_2\le1$ est saturée $\Rightarrow u_3\ne0$

D'où $u_1=u_2=0$ et $u_3=1$, soit $u^*=\begin{pmatrix}0\\0\\1\end{pmatrix}$.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/pl-td1-plnl.pdf" />

<PdfViewer file="/pdfs/pl-correction-serie1-plnl.pdf" />

</TabItem>
</Tabs>
