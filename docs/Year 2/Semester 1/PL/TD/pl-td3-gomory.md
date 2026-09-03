---
sidebar_position: 5
title: "Série : Programmation linéaire en nombres entiers (Coupes de Gomory)"
sidebar_label: TD - Coupes de Gomory (avec corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Série : Programmation linéaire en nombres entiers (Coupes de Gomory)

*ENSI — Recherche opérationnelle — 2019/2020*

<!-- TODO: the source PDF for this file (pl-td3-gomory.pdf, Drive-side name "RO - TD3 Gomory.pdf") already bundles the exercise statements AND a handwritten correction together, so no separate correction doc was created for it — see the correction inline below each exercise. Several fraction cells in the handwritten simplex/dual-simplex tableaux (pages 4-6, 10-11) are transcribed as best-effort reconstructions from the handwriting; flagged individually where uncertain. -->

## Exercice 1

On considère le PLNE suivant :

$$
(PLNE)
\left\{
\begin{aligned}
&Min[Z(x_1,x_2) = x_1-2x_2] \\
&-4x_1+6x_2 \le 9 \\
&x_1+x_2 \le 4 \\
&x_i \in \mathbb{N} \quad \text{pour } i=1,2
\end{aligned}
\right.
$$

1) Résoudre le PLNE à l'aide de la méthode des coupes de Gomory
2) Représenter graphiquement :
   a- le domaine des solutions réalisables du PLNE et de sa relaxation continue PL.
   b- les coupes de Gomory.
   c- Les solutions optimales de PLNE et PL.

<details>
<summary>Correction</summary>

**1) Résolution du problème relaxé par la méthode du simplexe**

Forme standard :

$$
(FS)
\left\{
\begin{aligned}
&Min\ (x_1-2x_2) \\
&-4x_1+6x_2+x_3=9 \\
&x_1+x_2+x_4=4 \\
&x_i \ge 0,\ i \in [1,4]
\end{aligned}
\right.
\qquad m=2,\ n=4,\ x_3,x_4 \text{ VB} ;\ x_1,x_2 \text{ VHB}
$$

$$M = \begin{pmatrix}-4&6&1&0\\1&1&0&1\end{pmatrix},\quad B=I_2,\quad N=\begin{pmatrix}-4&6\\1&1\end{pmatrix}$$

$B^{-1}N=N$ et $B^{-1}b=b=\begin{pmatrix}9\\4\end{pmatrix}$ ; $w_N^t = c_B^t B^{-1}N - c_N^t$, $c^t=(1,-2,0,0) \Rightarrow w_N^t = -c_N^t = (-1,2) \not\le 0$.

**Tableau initial** :

|       | $x_1$ | $x_2$ |  | |
|-------|-------|-------|--|--|
|       | -4    | (6)   | 9 | $x_3$ |
|       | 1     | 1     | 4 | $x_4$ |
|       | -1    | (2)   | 0 | |

$\Delta = 2 \Rightarrow x_2$ la variable entrante. $\lambda = \min\left\{\dfrac96,\dfrac41\right\} = \min\left\{\dfrac32,4\right\}=\dfrac32$ d'où $i=1 \Rightarrow x_3$ variable sortante.

**1ère itération** :

|       | $x_1$ |  $x_3$  |    | |
|-------|-------|---------|----|--|
|       | -2/3  | 1/6     | 3/2 | $x_2$ |
|       | 5/3   | -1/6    | 5/2 | $x_4$ |
|       | (1/3) | -1/3    | -3  | |

$\Delta=1 \Rightarrow x_1$ la variable entrante. $\lambda = \min\left\{\dfrac{5/2}{5/3}\right\} = \dfrac32$ d'où $i=2 \Rightarrow x_4$ variable sortante.

**2ème itération (tableau optimal)** :

|       | $x_4$ | $x_3$ |     | |
|-------|-------|-------|-----|--|
|       | 2/5   | 1/10  | 5/2 | $x_2$ |
|       | 3/5   | -1/10 | 3/2 | $x_1$ |
|       | -1/5  | -3/10 | -7/2| |

La solution optimale de la (FS) est $\left(\dfrac32,\dfrac52,0,0\right)$ n'est pas entière.

**2) Génération de la 1ère coupe de Gomory**

- La partie fractionnaire de $\dfrac52$ est égale à $\dfrac12$.
- La partie fractionnaire de $\dfrac32$ (associée à $x_1$) est égale à $\dfrac12$.

La nouvelle contrainte (associée à la ligne de $x_2$) : $\left(\dfrac25-\lfloor\dfrac25\rfloor\right)x_4+\left(\dfrac1{10}-\lfloor\dfrac1{10}\rfloor\right)x_3 \ge \dfrac52-\lfloor\dfrac52\rfloor$

$$\Rightarrow \frac25x_4+\frac1{10}x_3 \ge \frac12$$

Résolution par la méthode dual-simplexe. On repart de la forme standard :

$$
(FS_1)
\left\{
\begin{aligned}
&Min[Z(x_1,x_2)=x_1-2x_2] \\
&-4x_1+6x_2+x_3=9 \\
&x_1+x_2+x_4=4 \\
&-\frac25x_4-\frac1{10}x_3+x_5=-\frac12 \\
&x_i\ge0,\ i\in[0,5]
\end{aligned}
\right.
$$

$x_5$ variable d'écart à ajouter.

**Tableau (avec la coupe)** :

|       | $x_4$ | $x_3$  |      | |
|-------|-------|--------|------|--|
|       | 2/5   | 1/10   | 5/2  | $x_2$ |
|       | 3/5   | -1/10  | 3/2  | $x_1$ |
|       | -2/5  | -1/10  | (-1/2) | $x_5$ |
|       | -1/5  | -3/10  | -7/2 | |

$i=3 \Rightarrow x_5$ variable sortante. $\alpha = \min\left\{\dfrac{-1/5}{-2/5},\dfrac{-3/10}{-1/10}\right\} = \min\{1/2,3\} = 1/2$, d'où $j=1 \Rightarrow x_4$ variable entrante.

**1ère itération (dual-simplexe)** :

|       | $x_5$ | $x_3$ |     | |
|-------|-------|-------|-----|--|
|       | 1     | 0     | 2   | $x_2$ |
|       | 3/2   | -1/4  | 3/4 | $x_1$ |
|       | -5/2  | 1/4   | 5/4 | $x_4$ |
|       | -1/2  | -1/4  | -13/4 | |

La solution optimale n'est pas entière.

**3) Génération de la 2ème coupe de Gomory**

- La partie fractionnaire de $\dfrac34$ (ligne $x_1$) est égale à $\dfrac34$.
- La partie fractionnaire de $\dfrac54$ (ligne $x_4$) est égale à $\dfrac14$.

Donc on va générer la nouvelle contrainte à partir de la 2ème ligne du tableau, on aura :

$$\left(\frac32-\lfloor\frac32\rfloor\right)x_5+\left(-\frac14-\lfloor-\frac14\rfloor\right)x_3 \ge \frac34-\lfloor\frac34\rfloor$$

$$\Rightarrow \frac12x_5+\frac34x_3 \ge \frac34$$

Résolution par la méthode dual-simplexe :

$$
\left\{
\begin{aligned}
&Min[Z(x_1,x_2)=x_1-2x_2] \\
&-4x_1+6x_2+x_3=9 \\
&x_1+x_2+x_4=4 \\
&-\frac25x_4-\frac1{10}x_3+x_5=-\frac12 \\
&-\frac12x_5-\frac34x_3+x_6=-\frac34 \\
&x_i\ge0,\ i\in[0,6]
\end{aligned}
\right.
$$

$x_6$ variable d'écart à ajouter nul.

|       | $x_5$ | $x_3$ |       | |
|-------|-------|-------|-------|--|
|       | 1     | 0     | 2     | $x_2$ |
|       | 3/2   | -1/4  | 3/4   | $x_1$ |
|       | -5/2  | 1/4   | 5/4   | $x_4$ |
|       | -1/2  | -3/4  | (-3/4)| $x_6$ |
|       | -1/2  | -1/4  | -13/4 | |

$i=4 \Rightarrow x_6$ variable sortante. $\alpha = \min\left\{\dfrac{-1/2}{-1/2},\dfrac{-1/4}{-3/4}\right\} = \min\{1,1/3\} = 1/3$, d'où $j=2 \Rightarrow x_3$ variable entrante.

**2ème itération** :

|       | $x_5$ | $x_6$ |     | |
|-------|-------|-------|-----|--|
|       | 9/4   | -1/4  | 9/4 | $x_1$ |
|       | 2     | 1     | 2   | $x_2$ |
|       | -5/4  | 1/4   | 15/4| $x_4$ |
|       | -5/4  | -3/4  | 16/5| |

La solution optimale de $(P_1)$ (relaxation avec les deux coupes) est $\left(\dfrac94,\dfrac{15}4\right)$.

*(Cette section est un exercice distinct sur le même modèle — voir Exercice 2, dont la correction reprend une variable renommée $P_1$ ; le calcul de coupe qui suit s'applique à la contrainte $8x_1+12x_2\le60$ dérivée ci-dessous.)*

**II — Représentation graphique**

$\Delta_1: -4x_1+6x_2=9$ ; $(1,-3/4)$ et $(-3,-1/2)$.
$\Delta_2: x_1+x_2=4$ ; $(2,2)$ et $(1,3)$.
$\Delta_0: x_1-2x_2=0$ ; $(0,0)$ et $(2,1)$.

<!-- TODO: page 7 is a hand-drawn graph of the PLNE/PL feasible regions with Δ1, Δ2, Δ0, and Δ1 (coupe) plotted, the integer lattice points marked, and the optima of PLNE and PL indicated — genuine plotted figure, described in prose here rather than re-rendered; see PDF tab. -->

La partie grise : domaine réalisable du PL. L'ensemble des nœuds : domaine réalisable du PLNE.

D'après (FS) on a $x_4 = 4-x_1-x_2$ et $x_3 = 9+4x_1-6x_2$.

On remplace $x_4$ et $x_3$ par leurs expressions dans la 1ère coupe, on obtient :

$$\frac25(4-x_1-x_2)+\frac1{10}(9+4x_1-6x_2) \ge \frac12$$

$$\Rightarrow x_2 \le 2 \qquad \Delta_3: x_2=2$$

D'après $(FS_1)$ on a : $x_5 = -\dfrac12+\dfrac25x_4+\dfrac1{10}x_3$, avec $x_4=4-x_1-x_2$, $x_3=9+4x_1-6x_2$.

On remplace $x_5$ et $x_3$ par leurs expressions dans la 2ème coupe, on obtient :

$$\frac12\left(-\frac12+\frac25x_4+\frac1{10}x_3\right)+\frac34(9+4x_1-6x_2) \ge \frac34$$

$$\Rightarrow -\frac14+\frac15(4-x_1-x_2)+\left(\frac1{20}+\frac34\right)(9+4x_1-6x_2) \ge \frac34$$

$$\Rightarrow 3x_1-5x_2 \ge -7 \qquad \Delta_4: 3x_1-5x_2=-7$$

</details>

## Exercice 2

On considère le programme linéaire en variables entières suivant :

$$
(P)
\left\{
\begin{aligned}
&Max[Z(x_1,x_2)=5x_1+8x_2] \\
&x_1+x_2 \le 6 \\
&5x_1+9x_2 \le 45 \\
&x_i\in\mathbb{N} \quad \text{pour } i=1,2
\end{aligned}
\right.
$$

1) Résoudre par la méthode de simplexe la relaxation continue du programme (P).
2) Calculer la coupe de Gomory associée à la variable $x_2$ du tableau optimal obtenu à la première question.
3) Tracer sur le même graphe la coupe de Gomory obtenue et le domaine réalisable de la relaxation continue. Montrer que la solution obtenue est entière.

<details>
<summary>Correction</summary>

**1)**

$$
(P_1)
\left\{
\begin{aligned}
&Max[Z(x_1,x_2)=5x_1+8x_2] \\
&x_1+x_2+x_3=6 \\
&5x_1+9x_2+x_4=45 \\
&x_i \ge0,\ i\in[1,4]
\end{aligned}
\right.
\qquad m=2,\ n=4,\ x_3,x_4 \text{ VB} ;\ x_1,x_2 \text{ VHB}
$$

$$M=\begin{pmatrix}1&1&1&0\\5&9&0&1\end{pmatrix},\quad B=I_2,\quad N=\begin{pmatrix}1&1\\5&9\end{pmatrix}$$

$B^{-1}N=N$, $B^{-1}b=b$ ; $w_N^t=c_N^t-c_B^tB^{-1}N = c_N^t=(5,8)\not\le0$.

**Tableau initial** :

|       | $x_1$ | $x_2$ |    | |
|-------|-------|-------|----|--|
|       | 1     | (1)   | 6  | $x_3$ |
|       | 5     | 9     | 45 | $x_4$ |
|       | 5     | (8)   | 0  | |

$\Delta=2 \Rightarrow x_2$ variable entrante. $\lambda=\min\left\{\dfrac61,\dfrac{45}9\right\}=\min\{6,5\}=5$ d'où $i=2 \Rightarrow x_4$ variable sortante.

**1ère itération** :

|        | $x_1$ | $x_4$   |    | |
|--------|-------|---------|----|--|
|        | 4/9   | -1/9    | 1  | $x_3$ |
|        | 5/9   | 1/9     | 5  | $x_2$ |
|        | (5/9) | -8/9    | 40 | |

$\Delta=1 \Rightarrow x_1$ variable entrante. $\lambda=\min\left\{\dfrac9{4/9},5\right\}=\dfrac94$ d'où $i=1 \Rightarrow x_3$ variable sortante.

**2ème itération (tableau optimal)** :

|        | $x_3$ | $x_4$   |     | |
|--------|-------|---------|-----|--|
|        | 9/4   | -1/4    | 9/4 | $x_1$ |
|        | -5/4  | 1/4     | 15/4| $x_2$ |
|        | -5/4  | -3/4    | 165/4| |

La solution optimale de $(P_1)$ est $\left(\dfrac94,\dfrac{15}4\right)$.

**2) Coupe de Gomory associée à $x_2$**

$$\left(-\frac54-\left\lfloor-\frac54\right\rfloor\right)x_3+\left(\frac14-\left\lfloor\frac14\right\rfloor\right)x_4 \ge \frac{15}4-\left\lfloor\frac{15}4\right\rfloor$$

$$\Rightarrow \frac34x_3+\frac14x_4 \ge \frac34$$

**3)** D'après $(P_1)$ on a $x_3=6-x_1-x_2$, $x_4=45-5x_1-9x_2$. On remplace $x_3$ et $x_4$ par leurs expressions en fonction de $x_1$ et $x_2$, on obtient :

$$\frac34(6-x_1-x_2)+\frac14(45-5x_1-9x_2) \ge \frac34$$

$$\Rightarrow 8x_1+12x_2 \le 60$$

$\Delta_1: x_1+x_2=6$ ; $(3,3)$ et $(4,2)$. $\Delta_2: 5x_1+9x_2=45$ ; $(0,5)$ et $(9,0)$. $\Delta_3$ (coupe de Gomory) : $8x_1+12x_2=60$ ; $(0,5)$ et $\left(\dfrac{15}2,0\right)$. $\Delta_0: 5x_1+8x_2=0$ ; $(0,0)$ et $(-8,5)$.

<!-- TODO: page 13 is a hand-drawn graph of the feasible triangle for the relaxation with Δ1, Δ2, Δ3 (coupe de Gomory) plotted and the integer lattice points marked, showing the new optimum at (0,5) — genuine plotted figure, described in prose here rather than re-rendered; see PDF tab. -->

Tous les points extrêmes sont des entiers, donc la résolution de $(P_1)$ avec l'ajout de la coupe de Gomory donne une solution entière $(0,5)$.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/pl-td3-gomory.pdf" />

</TabItem>
</Tabs>
