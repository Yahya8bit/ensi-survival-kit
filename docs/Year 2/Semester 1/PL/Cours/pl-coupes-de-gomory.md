---
sidebar_position: 6
title: "PLNE : Les coupes de Gomory"
sidebar_label: Coupes de Gomory
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# PLNE : Les coupes de Gomory

*ENSI — N. Elloumi — RO : Programmation linéaire*

## I. Principe de la méthode

<!-- TODO: page 2 is a geometric figure (a lattice-point grid with "Contrainte 1", "Contrainte 2", "Coupe 1", "Coupe 2" lines and the optimal point of the continuous relaxation marked) illustrating that successive Gomory cuts shrink the feasible polyhedron toward the integer hull without excluding any integer point — genuine plotted figure, described here rather than re-rendered; see PDF tab. -->

Le principe consiste à ajouter progressivement des contraintes linéaires (« coupes ») qui excluent la solution optimale non entière de la relaxation continue, sans jamais exclure de point entier admissible, jusqu'à obtenir une solution optimale entière.

## II. Méthode des coupes de Gomory

**Programme linéaire en nombres entiers** :

$$
PE
\left\{
\begin{aligned}
&Max\ Z = {}^t\!c\,x \\
&\text{Sous contraintes} \\
&Ax \le b \\
&x \in \mathbb{N}^n
\end{aligned}
\right.
$$

**La relaxation continue de PE** :

$$
RC_{PE}
\left\{
\begin{aligned}
&Max\ Z = {}^t\!c\,x \\
&\text{Sous contraintes} \\
&Ax \le b \\
&x \ge 0;\ x \in \mathbb{R}^n
\end{aligned}
\right.
$$

Soit $B$ la base associée à la solution optimale de $RC_{PE}$ :

$$b = Ax = Bx_B + Nx_N \;\Rightarrow\; x_B = B^{-1}(b - Nx_N) = B^{-1}b$$

Soit $x_{B_i} = (x_B)_i = (B^{-1}b)_i$ non entier.

On pose $e_i^t = (0, ..., 1, ..., 0)$ (1 en $i^{\text{ème}}$ position).

Nous pouvons écrire $x_{B_i} = e_i^t\,B^{-1}(b - Nx_N)$

Ainsi $x_{B_i} = e_i^t\,B^{-1}b - e_i^t\,B^{-1}N\,x_N = \bar{b}_i - \alpha^i x_N$ (c-à-d $\alpha^i = e_i^t\,B^{-1}N$ : ligne $i$ de $B^{-1}N$)

En réordonnant : $x_{B_i} + \alpha^i x_N = \bar{b}_i$, soit

$$x_{B_i} + \sum_j \alpha_j^i x_{N_j} = \bar{b}_i \qquad (1)$$

**Définition : Partie entière et partie fractionnaire**

- $E(a)$ = plus grand entier $\le a$
- $Frac(a) = a - E(a) > 0$

De (1) on a :

$$x_{B_i} + \sum_j \left[E(\alpha_j^i) + Frac(\alpha_j^i)\right]x_{N_j} = E(\bar{b}_i) + Frac(\bar{b}_i)$$

$$x_{B_i} + \sum_j E(\alpha_j^i)\,x_{N_j} + \sum_j Frac(\alpha_j^i)\,x_{N_j} = E(\bar{b}_i) + Frac(\bar{b}_i) \qquad (2)$$

Comme $Frac(\alpha_j^i) \ge 0$ et $x_{N_j} \ge 0$ :

$$x_{B_i} + \sum_j E(\alpha_j^i)\,x_{N_j} \le E(\bar{b}_i) + Frac(\bar{b}_i)$$

Comme $x_{B_i}$ est un entier et $x_{N_j}$ aussi, donc :

$$x_{B_i} + \sum_j E(\alpha_j^i)\,x_{N_j} \le E(\bar{b}_i) \qquad (3)$$

De $(3) - (2)$ on déduit : $-\sum_j Frac(\alpha_j^i)\,x_{N_j} \le -Frac(\bar{b}_i)$

$$\sum_j Frac(\alpha_j^i)\,x_{N_j} \ge Frac(\bar{b}_i) \qquad (4)$$

**(4) est une Coupe de Gomory.**

## III. Application

$$
(PE)
\left\{
\begin{aligned}
&Max\ Z = 7x_1 + 9x_2 \\
&\text{Sous contraintes} \\
&-x_1 + 3x_2 \le 6 \\
&7x_1 + x_2 \le 35 \\
&x_1, x_2 \in \mathbb{N}
\end{aligned}
\right.
\quad\xrightarrow{\text{La Relaxation continue}}\quad
(RC)
\left\{
\begin{aligned}
&Max\ Z = 7x_1 + 9x_2 \\
&\text{Sous contraintes} \\
&-x_1 + 3x_2 \le 6 \\
&7x_1 + x_2 \le 35 \\
&x_1, x_2 \ge 0
\end{aligned}
\right.
$$

**Résolution du programme de la relaxation continue (RC)**

Forme standard de (RC) :

$$
\left\{
\begin{aligned}
&Max\ Z = 7x_1 + 9x_2 \\
&\text{Sous contraintes} \\
&-x_1 + 3x_2 + y_1 = 6 \\
&7x_1 + x_2 + y_2 = 35 \\
&x_1, x_2 \ge 0 \text{ et } y_1, y_2 \ge 0
\end{aligned}
\right.
\qquad
SIE:\; x_B = \begin{pmatrix} y_1 \\ y_2 \end{pmatrix} = \begin{pmatrix} 6 \\ 35 \end{pmatrix} \;\text{et}\; x_N = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}
$$

**Tableau optimal de la relaxation continue $T_1$**

|       |      | $x_1$ | $x_2$ | $y_1$ | $y_2$ |
|-------|------|-------|-------|-------|-------|
| $Z$   | 63   | 0     | 0     | -28/11| -15/11|
| $x_2$ | 7/2  | 0     | 1     | 7/22  | 1/22  |
| $x_1$ | 9/2  | 1     | 0     | 1/22  | 3/22  |

Solution non entière : $x_1 = \dfrac{9}{2}$, $x_2 = \dfrac{7}{2}$ et $Z = 63$

**La coupe 1** : $Frac\left(\dfrac{7}{2}\right) \le Frac\left(\dfrac{7}{22}\right)y_1 + Frac\left(\dfrac{1}{22}\right)y_2$

$$\frac{1}{2} \le \frac{7}{22}y_1 + \frac{1}{22}y_2$$

Soit : $\dfrac{1}{2} \le \dfrac{7}{22}y_1 + \dfrac{1}{22}y_2 \;\Leftrightarrow\; -\dfrac{7}{22}y_1 - \dfrac{1}{22}y_2 \le -\dfrac{1}{2}$

On considère une variable d'écart $e_1$ : $-\dfrac{7}{22}y_1 - \dfrac{1}{22}y_2 + e_1 = -\dfrac{1}{2}$

Puis on rajoute cette contrainte au tableau optimal $T_1$. On obtient $T_2$ :

|       |      | $x_1$ | $x_2$ | $y_1$  | $y_2$  | $e_1$ |
|-------|------|-------|-------|--------|--------|-------|
| $Z$   | 63   | 0     | 0     | -28/11 | -15/11 | 0     |
| $x_2$ | 7/2  | 0     | 1     | 7/22   | 1/22   | 0     |
| $x_1$ | 9/2  | 1     | 0     | 1/22   | 3/22   | 0     |
| $e_1$ | -1/2 | 0     | 0     | -7/22  | -1/22  | 1     |

Après application de l'algorithme dual de simplexe sur $e_1$, **tableau optimal obtenu $T_3$** :

|       |      | $x_1$ | $x_2$ | $y_1$ | $y_2$ | $e_1$ |
|-------|------|-------|-------|-------|-------|-------|
| $Z$   | 59   | 0     | 0     | 0     | -1    | -8    |
| $x_2$ | 3    | 0     | 1     | 0     | 0     | 1     |
| $x_1$ | 32/7 | 1     | 0     | 0     | 1/7   | -1/7  |
| $y_1$ | 11/7 | 0     | 0     | 1     | 1/7   | -22/7 |

Solution non entière : $x_1 = \dfrac{32}{7}$, $x_2 = 3$ et $Z = 59$

**La coupe 2** : $Frac\left(\dfrac{32}{7}\right) \le Frac\left(\dfrac{1}{7}\right)y_2 + Frac\left(\dfrac{-1}{7}\right)e_1$

$$\frac{4}{7} \le \frac{1}{7}y_2 + \frac{6}{7}e_1$$

Soit : $\dfrac{4}{7} \le \dfrac{1}{7}y_2 + \dfrac{6}{7}e_1 \;\Leftrightarrow\; -\dfrac{1}{7}y_2 - \dfrac{6}{7}e_1 \le -\dfrac{4}{7}$

On considère une variable d'écart $e_2$ : $-\dfrac{1}{7}y_2 - \dfrac{6}{7}e_1 + e_2 = -\dfrac{4}{7}$

Puis on rajoute cette contrainte au tableau optimal $T_3$. On obtient $T_4$ :

|       |      | $x_1$ | $x_2$ | $y_1$ | $y_2$ | $e_1$ | $e_2$ |
|-------|------|-------|-------|-------|-------|-------|-------|
| $Z$   | 59   | 0     | 0     | 0     | -1    | -8    | 0     |
| $x_2$ | 3    | 0     | 1     | 0     | 0     | 1     | 0     |
| $x_1$ | 32/7 | 1     | 0     | 0     | 1/7   | -1/7  | 0     |
| $y_1$ | 11/7 | 0     | 0     | 1     | 1/7   | -22/7 | 0     |
| $e_2$ | -4/7 | 0     | 0     | 0     | -1/7  | -6/7  | 1     |

Après application de l'algorithme dual de simplexe sur $e_2$, **tableau optimal obtenu $T_5$** :

|       |    | $x_1$ | $x_2$ | $y_1$ | $y_2$ | $e_1$ | $e_2$ |
|-------|----|-------|-------|-------|-------|-------|-------|
| $Z$   | 55 | 0     | 0     | 0     | 0     | -2    | 0     |
| $x_2$ | 3  | 0     | 1     | 0     | 0     | 1     | 1     |
| $x_1$ | 4  | 1     | 0     | 0     | 0     | -1    | 1     |
| $y_1$ | 1  | 0     | 0     | 1     | 0     | -4    | -7    |
| $y_2$ | 4  | 0     | 0     | 0     | 1     | 6     | -7    |

**Solution optimale entière du PLNE** : $x_1 = 4$, $x_2 = 3$ et $Z = 55$

### Interprétation géométrique

**1ère coupe** : Selon la forme standard on a :

$$
\begin{cases}
-x_1 + 3x_2 + y_1 = 6 \\
7x_1 + x_2 + y_2 = 35
\end{cases}
\;\Rightarrow\;
\begin{cases}
y_1 = 6 + x_1 - 3x_2 \\
y_2 = 35 - 7x_1 - x_2
\end{cases}
$$

La coupe 1 : $\dfrac{1}{2} \le \dfrac{7}{22}y_1 + \dfrac{1}{22}y_2$ ce qui donne $x_2 \le 3$.

**2ème coupe** : Selon le tableau $T_3$ on a :

$$
\begin{cases}
x_2 + e_1 = 3 \\
x_1 + \dfrac{1}{7}y_2 - \dfrac{1}{7}e_1 = \dfrac{32}{7}
\end{cases}
\;\Rightarrow\;
\begin{cases}
e_1 = 3 - x_2 \\
y_2 = 5 - x_1 - x_2
\end{cases}
$$

La coupe 2 : $\dfrac{4}{7} \le \dfrac{1}{7}y_1 + \dfrac{6}{7}e_1$ ce qui donne $x_1 + x_2 \le 7$.

<!-- TODO: page 13's second-coupe substitution uses y2 = 5 - x1 - x2 but the coupe inequality shown right below it references y1 (not y2, which was eliminated one step earlier) — transcribed exactly as displayed on the slide; verify against the original if reproducing this derivation. -->

<!-- TODO: page 14 is a geometric figure showing the feasible polyhedron with "Contrainte 1", "Contrainte 2", "Coupe 1", "Coupe 2" and both the continuous-relaxation optimum and the final PLNE optimum marked — genuine plotted figure, described here rather than re-rendered; see PDF tab. -->

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/pl-coupes-de-gomory.pdf" />

</TabItem>
</Tabs>
