---
sidebar_position: 4
title: "Chapitre 3 : Algorithme de simplexe"
sidebar_label: Ch3 - Algorithme de simplexe
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 3 : Algorithme de simplexe

*ENSI — N. Elloumi — RO : Programmation linéaire*

## I. Principe de l'algorithme

Pour un problème de maximisation, l'algorithme de simplexe génère une suite de solutions réalisables, qui améliorent d'une façon monotone croissante la fonction $Z = {}^t\!c\,x$.

À une itération donnée, on considère la solution $x = \begin{pmatrix} x_B = B^{-1}b \\ x_N = 0 \end{pmatrix}$ associée à la base $B$.

Dans ce cas :

$$b = Ax = Bx_B + Nx_N \;\Rightarrow\; x_B = B^{-1}b - B^{-1}Nx_N$$

$$\Rightarrow Z = {}^t\!c\,x = {}^t\!c_B\,x_B + {}^t\!c_N\,x_N = {}^t\!c_B\,B^{-1}b + \left({}^t\!c_N - {}^t\!c_B\,B^{-1}N\right)x_N$$

$$\Rightarrow Z = {}^t\!c_B\,B^{-1}b + \left({}^t\!c_N - {}^t\!c_B\,B^{-1}N\right)x_N$$

$${}^t\bar{c}_N = {}^t\!c_N - {}^t\!c_B\,B^{-1}N \;:\; \text{vecteur des coûts réduits des VNB}$$

Une variable de base possédant un coût réduit positif, si elle devenait non nulle augmenterait la fonction objectif.

$$Z = {}^t\!c_B\,B^{-1}b + \big(\bar{c}_1 \;\cdots\; \bar{c}_j > 0 \;\cdots\; \bar{c}_{n-m}\big)\begin{pmatrix} x_N^1 \\ \vdots \\ x_N^j = 0 \\ \vdots \\ x_N^{n-m} \end{pmatrix}$$

**Questions** :

1. Sans violer les contraintes, quelle valeur donner à $x_N^j$ qui annule une des variables de base ?
2. Comment effectuer le changement de base ?

## II. Critère d'optimalité

Une solution réalisable de base correspondante à une base $B$ est optimale, si les coûts réduits des variables non de base sont tous négatifs.

$$\bar{c}_j = \left({}^t\!c_N - {}^t\!c_B\,B^{-1}N\right)_j \le 0 \quad \text{pour} \quad 1 \le j \le n-m$$

## III. Méthode du tableau de simplexe

*George Dantzig, 1949*

À une itération donnée, on considère la solution $x = \begin{pmatrix} x_B = B^{-1}b \\ x_N = 0 \end{pmatrix}$.

$$
\left\{
\begin{aligned}
&Max\ Z = {}^t\!c\,x \\
&\text{Sous contraintes} \\
&Ax = b \\
&x \ge 0;\ x \in \mathbb{R}^n
\end{aligned}
\right.
\;\Leftrightarrow\;
\left\{
\begin{aligned}
&Max\ Z \;/\; Z = {}^t\!c_B\,B^{-1}b + \left({}^t\!c_N - {}^t\!c_B\,B^{-1}N\right)x_N \\
&\text{Sous contraintes} \\
&B^{-1}b = x_B + B^{-1}Nx_N \\
&x_B \ge 0;\ x_N \ge 0
\end{aligned}
\right.
$$

|       | $x_B$          | $x_N$ |                                      |
|-------|----------------|-------|--------------------------------------|
| $Z$   | ${}^t\!c_B B^{-1}b$ | $0$   | ${}^t\!c_N - {}^t\!c_B B^{-1}N$      |
| $x_B$ | $B^{-1}b$      | $I$   | $B^{-1}N$                            |

En général :

|       | $x_1$   | ... | $x_{j_0}$   | ... | ... |
|-------|---------|-----|-------------|-----|-----|
| $Z$   | $z_0$   | $\bar{c}_1$ | ... | $\bar{c}_{j_0}$ | ... | ... |
| $x_{B1}$ (v$_{B1}$) | $a_{11}$ | ... | $a_{1j_0}$ | ... | ... |
| $\vdots$ | $\vdots$ | | $\vdots$ | | |
| $x_{Bi_0}$ (v$_{Bi_0}$) | $a_{i_01}$ | ... | $a_{i_0j_0}$ | ... | ... |
| $\vdots$ | $\vdots$ | | $\vdots$ | | |
| $x_{Bm}$ (v$_{Bm}$) | $a_{m1}$ | ... | $a_{mj_0}$ | ... | ... |

Soit le coût réduit $\bar{c}_{j_0} > 0$ (on prend en général le plus positif).

- La colonne $j_0$ est la **colonne de pivot**.
- La variable $x_{j_0}$ est la **variable entrant dans la base**.

Quelle est la plus grande valeur $\theta$ qu'on peut donner à $x_{j_0}$ sans violer les contraintes ?

On a $x_{Bi} = v_{Bi} - a_{ij_0}\theta$. Pour que $x_{Bi}$ reste $\ge 0$, choisir :

$$\theta = \min_{a_{ij_0} > 0} \left(\frac{v_{Bi}}{a_{ij_0}}\right) \qquad \forall i,\ 1 \le i \le m$$

Supposons que la ligne $i_0$ donne le minimum : $\dfrac{v_{Bi_0}}{a_{i_0j_0}} = \min\left(\dfrac{v_{Bi}}{a_{ij_0}}\right)$

- La ligne $i_0$ est la **ligne de pivot**.
- La variable $x_{Bi_0}$ est la **variable sortante de la base**.
- $a_{i_0j_0}$ s'appelle **le pivot**.

### Mise à jour du tableau de simplexe lors d'un changement de base

Chaque ligne du tableau s'écrit : $v_{Bi} = \sum_{j \ne 0} a_{ij}x_j$

Soit $j_0$ la colonne du pivot et $i_0$ la ligne du pivot. En divisant la ligne du pivot par le pivot on obtient :

$$\frac{v_{Bi_0}}{a_{i_0j_0}} = \sum_{j \ne 0} \frac{a_{i_0j}}{a_{i_0j_0}}x_j = \sum_{\substack{j \ne 0 \\ j \ne j_0}} \frac{a_{i_0j}}{a_{i_0j_0}}x_j + x_{j_0} \qquad \text{équa (1)}$$

Soit $v_{Bi} = \sum_{j \ne 0} a_{ij}x_j = \sum_{\substack{j \ne 0 \\ j \ne j_0}} a_{ij}x_j + a_{ij_0}x_{j_0}$

Ce qui donne : $\left(v_{Bi} - a_{ij_0}\dfrac{v_{Bi_0}}{a_{i_0j_0}}\right) = \sum_{\substack{j \ne 0 \\ j \ne j_0}}\left(a_{ij} - a_{ij_0}\dfrac{a_{i_0j}}{a_{i_0j_0}}\right)x_j$

En rajoutant un terme nul au membre de droite, on obtient :

$$\left(v_{Bi} - a_{ij_0}\frac{v_{Bi_0}}{a_{i_0j_0}}\right) = \sum_{\substack{j \ne 0 \\ j \ne j_0}}\left(a_{ij} - a_{ij_0}\frac{a_{i_0j}}{a_{i_0j_0}}\right)x_j + \left(a_{ij_0} - a_{ij_0}\frac{a_{i_0j_0}}{a_{i_0j_0}}\right)x_{j_0}$$

$$\left(v_{Bi} - a_{ij_0}\frac{v_{Bi_0}}{a_{i_0j_0}}\right) = \sum_{j \ne 0}\left(a_{ij} - a_{ij_0}\frac{a_{i_0j}}{a_{i_0j_0}}\right)x_j \qquad \text{équa (2)}$$

L'équation (1) donne les coefficients de la ligne $i_0$ du tableau de la nouvelle base :

$$a'_{i_0j} = \frac{a_{i_0j}}{a_{i_0j_0}} \qquad \text{(La ligne du pivot divisée par le pivot)}$$

L'équation (2) donne les coefficients des autres lignes :

$$a'_{ij} = a_{ij} - a_{ij_0}\frac{a_{i_0j}}{a_{i_0j_0}} \qquad \Rightarrow \qquad a'_{ij} = a_{ij} - a_{ij_0}\,a'_{i_0j}$$

## IV. Exemple

$$
(PL)
\left\{
\begin{aligned}
&Max\ Z = 5x_1 + 8x_2 \\
&\text{Sous contraintes} \\
&x_1 + x_2 \le 2 \\
&4x_1 + 2x_2 \le 7 \\
&-x_1 + 2x_2 \le 1 \\
&x_1 \ge 0;\ x_2 \ge 0
\end{aligned}
\right.
\quad\xrightarrow{\text{La Forme standard}}\quad
(PL)
\left\{
\begin{aligned}
&Max\ Z = 5x_1 + 8x_2 \\
&\text{Sous contraintes} \\
&x_1 + x_2 + y_1 = 2 \\
&4x_1 + 2x_2 + y_2 = 7 \\
&-x_1 + 2x_2 + y_3 = 1 \\
&x_i \ge 0;\ y_i \ge 0
\end{aligned}
\right.
$$

**Solution de départ** : La solution initiale évidente :

$$x_B = \begin{pmatrix} y_1 \\ y_2 \\ y_3 \end{pmatrix} = \begin{pmatrix} 2 \\ 7 \\ 1 \end{pmatrix} \;\text{et}\; x_N = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$

**Tableau initial** :

|       | $x_1$ | $x_2$ | $y_1$ | $y_2$ | $y_3$ |
|-------|-------|-------|-------|-------|-------|
| $Z$   | 0     | 5     | 8     | 0     | 0     | 0     |
| $y_1$ | 2     | 1     | 1     | 1     | 0     | 0     |
| $y_2$ | 7     | 4     | 2     | 0     | 1     | 0     |
| $y_3$ | 1     | -1    | 2     | 0     | 0     | 1     |

$8 > 5 \Rightarrow x_2$ entre dans la base. $\min\left(\dfrac{2}{1}, \dfrac{7}{2}, \dfrac{1}{2}\right) = \dfrac{1}{2} \Rightarrow y_3$ quitte la base (ligne de pivot = ligne $y_3$, colonne de pivot = $x_2$, pivot = 2).

**Tableau après 1ère itération** :

|       |       | $x_1$ | $x_2$ | $y_1$ | $y_2$ | $y_3$ |
|-------|-------|-------|-------|-------|-------|-------|
| $Z$   | 4     | 9     | 0     | 0     | 0     | -4    |
| $y_1$ | 3/2   | 3/2   | 0     | 1     | 0     | -1/2  |
| $y_2$ | 6     | 5     | 0     | 0     | 1     | -1    |
| $x_2$ | 1/2   | -1/2  | 1     | 0     | 0     | 1/2   |

$\bar{c}_1 = 9 \Rightarrow x_1$ entre dans la base. $\min\left(\dfrac{3/2}{3/2}, \dfrac{6}{5}\right) = 1 \Rightarrow y_1$ quitte la base (colonne de pivot = $x_1$, pivot dans la ligne $y_1$).

**Tableau après 2ème itération (optimal)** :

|       |    | $x_1$ | $x_2$ | $y_1$  | $y_2$ | $y_3$ |
|-------|----|-------|-------|--------|-------|-------|
| $Z$   | 13 | 0     | 0     | -6     | 0     | -1    |
| $x_1$ | 1  | 1     | 0     | 2/3    | 0     | -1/3  |
| $y_2$ | 1  | 0     | 0     | -10/3  | 1     | 2/3   |
| $x_2$ | 1  | 0     | 1     | 1/3    | 0     | 1/3   |

Tous les coûts réduits sont $\le 0$ : la solution obtenue est optimale.

$$x = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 1 \\ 1 \end{pmatrix} \;\text{et}\; Z_{max} = 13$$

On constate que la variable d'écart $y_2$ est non nulle. On dit que la contrainte $4x_1 + 2x_2 \le 7$ n'est pas saturée.

**Question** : Déterminer le cheminement de l'algorithme de simplexe.

## Remarque : Cas d'une solution non bornée

Si $j_0$ est une colonne de pivot dont le coût réduit est $\bar{c}_{j_0} < 0$ et tel que $a_{ij_0} < 0\ \forall i \Rightarrow$ la solution du programme linéaire est infinie.

En effet, comme $(x_B)_i = v_{Bi} - a_{ij_0}\theta$ ; avec $a_{ij_0} < 0$ on peut considérer une valeur $\theta$ aussi grande que l'on veut sans qu'aucune des variables de base ne devienne $< 0$.

Dans ce cas : $Z = {}^t\!c_B\,B^{-1}b + \bar{c}_{j_0}\theta$ prend une valeur infinie.

<!-- TODO: source slide 15 title reads "coût réduit est c̄j0 < 0" while the body inequality shown is "c̄j0 < 0" paired with the unbounded-ray condition aij0 < 0 — transcribed exactly as it appears on the slide (page 15), flagged here since the sign convention differs from the earlier ">0 entering variable" rule and is worth double-checking against the lecturer's intent. -->

## V. Solution initiale : Méthode des deux phases

Si le problème n'admet pas une solution initiale évidente : écrire la forme standard avec des $b_i \ge 0$. Considérons la forme auxiliaire :

$$
(PL)
\left\{
\begin{aligned}
&Max\ Z = {}^t\!c\,x \\
&\text{Sous contraintes} \\
&Ax = b \\
&x_i \ge 0;\ x \in \mathbb{R}^n
\end{aligned}
\right.
\qquad
(AU)
\left\{
\begin{aligned}
&Min\ w = \sum_{i=1}^m \psi_i \\
&\text{S-C} \\
&Z = {}^t\!c\,x \\
&b = Ax + \psi \\
&x_i \ge 0;\ \psi_i \ge 0
\end{aligned}
\right.
$$

$\psi$ = vecteur des variables artificielles.

Pour le programme auxiliaire considérer la SIE : $x = \begin{pmatrix} x_B = \psi \\ x_N = x \end{pmatrix}$

### Méthode des deux phases

**Phase I** : Appliquer l'algorithme de simplexe pour le programme auxiliaire. Si le minimum de $w$ est $0$ alors le problème initial admet une solution si toutes les variables artificielles $\psi_i$ sont non de base (si certaines sont de base et elles sont nulles).

**Phase II** : Éliminer la fonction $w$ ainsi que les variables artificielles $\psi_i$ du tableau de simplexe et appliquer, si nécessaire, l'algorithme de simplexe une deuxième fois sur le tableau restant.

## Méthode de pénalité ou méthode M

Écrire la forme standard avec les $b_i \ge 0$. Rajouter une variable artificielle pour chaque contrainte qui cause un problème pour la SIE (c-à-d pour les contraintes $=$ et $\ge$). Soit $M>0$ très grand ($M = 10^6$), on obtient le problème suivant :

$$
(PL)
\left\{
\begin{aligned}
&Max\ Z = {}^t\!c\,x - M\psi_1 - M\psi_2 - ... \\
&\text{Sous contraintes} \\
&Ax + \psi = b \\
&x_i \ge 0;\ \psi_i \ge 0
\end{aligned}
\right.
$$

Appliquer l'algorithme de simplexe, deux cas sont possibles :

- **Cas 1** : une variable artificielle au moins reste dans la base avec une valeur $>0$, alors le problème n'a pas de solution.
- **Cas 2** : Toutes les variables artificielles sont non de base (si certaines sont de base et elles sont nulles), alors la solution est optimale.

## Exemples

**Méthode des deux phases**

$$
(PL)
\left\{
\begin{aligned}
&Max\ Z = -2x_1 - x_2 \\
&\text{Sous contraintes} \\
&3x_1 + x_2 = 3 \\
&4x_1 + 3x_2 \ge 6 \\
&x_1 + 2x_2 \le 3 \\
&x_1 \ge 0;\ x_2 \ge 0
\end{aligned}
\right.
\quad\xrightarrow{\text{Solution Optimale}}\quad
\left\{
\begin{aligned}
&x_1 = \frac{3}{5} \\
&x_2 = \frac{6}{5}
\end{aligned}
\right.
$$

**Méthode M**

$$
(PL)
\left\{
\begin{aligned}
&Max\ Z = -2x_1 - x_2 \\
&\text{Sous contraintes} \\
&3x_1 + x_2 = 2 \\
&4x_1 + 3x_2 \ge 6 \\
&x_1 + 2x_2 \le 3 \\
&x_1 \ge 0;\ x_2 \ge 0
\end{aligned}
\right.
$$

Prouver que ce programme est impossible.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/pl-ch3-algo-simplexe.pdf" />

</TabItem>
</Tabs>
