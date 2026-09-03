---
sidebar_position: 2
title: "Devoir Surveillé : Recherche Opérationnelle 2022/2023 (Corrigé)"
sidebar_label: DS RO 2023 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Devoir Surveillé : Recherche Opérationnelle — 2022/2023 (Corrigé)

*ENSI — 2022/2023 — Session : Devoir Surveillé — Date : 16 Mars 2023*

<!-- TODO: the source filename ("correctoon DS RO 2023.pdf") has a typo ("correctoon" for "correction"), not reproduced in this title — the source PDF itself bundles BOTH the printed statement (pages 1-2) AND the handwritten correction (pages 3-8), so this single doc covers both, following the repo's TD+correction pattern via <details> blocks. -->

| Module | Recherche Opérationnelle | Classe | I.I.2 |
|---|---|---|---|
| Documents | Non autorisés | Nombre de pages | 2 |
| Session | Devoir Surveillé | Date | 16 Mars 2023 |

## Exercice 1

Un exploitant d'une forêt utilise la rivière qui traverse son exploitation pour acheminer son bois jusqu'au lieu de vente. Pour cela il construit des embarcations avec le propre bois qu'il coupe pour ensuite charger le bois restant et descendre la rivière.

La section de forêt qu'il exploite lui permet d'obtenir deux types de bois :

- Un bois de bonne qualité qui servira à la construction ou à la tonnellerie. Cette année, il estime pouvoir vendre ce bois avec une marge de 15 k€ la tonne.
- Un bois de piètre qualité qui servira de bois de chauffage. Cette année, il estime pouvoir vendre ce bois avec une marge de 3 k€ la tonne.

Son équipe d'ouvriers sait construire deux types d'embarcation :

- Une embarcation de qualité, faite pour durer. Pour la construire il faut utiliser 1 tonne de bois de qualité. Elle peut charger 5 tonnes de bois. Une fois la rivière descendue, elle sera revendue avec une marge de 30 k€.
- Une embarcation de piètre qualité, faite pour ne descendre qu'une fois la rivière. Pour la construire il faut utiliser 1 tonne de bois de piètre qualité. Elle peut charger 10 tonnes de bois. Une fois la rivière descendue, elle sera revendue avec une marge 2 k€.

Cette année la section exploitée devrait permettre de couper 25 tonnes de bois de bonne qualité, et 45 tonnes de bois de piètre qualité.

Notons que l'exploitant n'a assez d'ouvriers que pour faire l'équipage de 10 embarcations au maximum.

Sachant que l'exploitant cherche à vendre son bois, donner le programme linéaire de ce problème qui maximise la marge totale.

<details>
<summary>Correction</summary>

**Variables** :

- $x_1$ : nombre de tonnes de bois de bonne qualité
- $x_2$ : nombre de tonnes de bois de qualité inférieure
- $x_3$ : nombre d'embarcations durables (à plusieurs utilisations)
- $x_4$ : nombre d'embarcations à usage unique.

$$
\left\{
\begin{aligned}
&Max\ Z = 15x_1+3x_2+30x_3+2x_4 \\
&\text{s.c.} \\
&x_1+x_3\le25 \\
&x_2+x_4\le45 \\
&x_3+x_4\le10 \\
&x_1+x_2\le5x_3+10x_4 \quad \text{(quantité de bois vendu et limitée par la capacité d'embarcation)} \\
&x_i\ge0
\end{aligned}
\right.
$$

</details>

## Exercice 2

Considérons l'ensemble des contraintes, d'un programme linéaire, suivant :

$$
\left\{
\begin{aligned}
&2x_1+x_2+4x_3=12 \\
&x_1+2x_2+3x_3=10 \\
&x_i\ge0
\end{aligned}
\right.
$$

1) Combien y a-t-il de base ? Quelles sont ces bases ?
2) Déterminer toutes les bases admissibles.

<details>
<summary>Correction</summary>

**1)** $A=\begin{pmatrix}2&1&4\\1&2&3\end{pmatrix}$, $b=\begin{pmatrix}12\\10\end{pmatrix}$.

Le nombre de bases est $C_3^2=3$.

$$B_1=\begin{pmatrix}2&1\\1&2\end{pmatrix} \qquad B_2=\begin{pmatrix}2&4\\1&3\end{pmatrix} \qquad B_3=\begin{pmatrix}1&4\\2&3\end{pmatrix}$$

**2)**

$B_1^{-1}=\dfrac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$, $B_1^{-1}b=\dfrac13\begin{pmatrix}24-10\\-12+20\end{pmatrix}=\dfrac13\begin{pmatrix}14\\8\end{pmatrix}=\begin{pmatrix}14/3\\8/3\end{pmatrix}$. $B_1$ réalisable.

<!-- TODO: source page 2 shows the boxed value "12/3" for the first component of B1^{-1}b, though the computation right above it reads "24-10=12" wait — the arithmetic on the page literally shows "24-10=12" then boxes "12/3, 8/3" — transcribed exactly as computed on the page (24-10=14 would be the correct arithmetic, but the page's own intermediate line explicitly writes "=12"); flagged rather than silently corrected. Verify against the original page image. -->

$B_2^{-1}=\dfrac12\begin{pmatrix}3&-4\\-1&2\end{pmatrix}$, $B_2^{-1}b=\dfrac12\begin{pmatrix}36-40\\-12+20\end{pmatrix}=\begin{pmatrix}-2\\4\end{pmatrix}$. $B_2$ non réalisable.

$B_3^{-1}=-\dfrac15\begin{pmatrix}3&-4\\-2&1\end{pmatrix}$, $B_3^{-1}b=\dfrac15\begin{pmatrix}36-40\\-24+10\end{pmatrix}=\begin{pmatrix}4/5\\14/5\end{pmatrix}$. $B_3$ réalisable.

</details>

## Exercice 3

Considérons le programme linéaire suivant :

$$
(P)
\left\{
\begin{aligned}
&\text{Maximiser } Z=100x_1+100x_2+150x_3+150x_4 \\
&\text{sous contraintes} \\
&x_1+x_2\le6 \\
&x_3+x_4=4 \\
&x_1\le4 \\
&x_3\le2 \\
&x_2+x_4=3 \\
&x_3\ge0 \text{ et } x_4\ge0
\end{aligned}
\right.
$$

1) Écrire le problème dual (D) de (P).
2) Sachant que la solution optimale de (P) est $x^*=(x_1=4,x_2=1,x_3=2,x_4=2)$, à l'aide du théorème des écarts complémentaires déduire la solution optimale de (D).

<details>
<summary>Correction</summary>

**1)**

$$
(D)
\left\{
\begin{aligned}
&Min\ w = 6u_1+4u_2+4u_3+2u_4+3u_5 \\
&\text{s.c.} \\
&u_1+u_3=100 \\
&u_1+u_5=100 \\
&u_2+u_4\ge150 \\
&u_2+u_5\ge150 \\
&u_2,u_5 \text{ de signe quelconque} \\
&u_1,u_3,u_4\ge0
\end{aligned}
\right.
$$

**2) TEC**

$$4\times(u_1+u_3-100)=0 \qquad 1\times(u_1+u_5-100)=0 \qquad 2\times(u_2+u_4-150)=0 \qquad 2\times(u_2+u_5-150)=0$$

Dans (P) : $x_1+x_2<6$ non saturée $\Rightarrow u_1=0$. $x_3+x_4=4$ saturée $\Rightarrow u_2\ne0$. $x_1=4$ saturée $\Rightarrow u_3\ne0$. $x_3=2$ saturée $\Rightarrow u_4\ne0$. $x_2+x_4=3$ saturée $\Rightarrow u_5\ne0$.

$$
\begin{cases}
u_1+u_3=100 \Rightarrow u_3=100 \\
u_1+u_5=100 \Rightarrow u_5=100 \\
u_2+u_4=150 \\
u_2+u_5=150
\end{cases}
$$

Il nous manque une équation, on peut utiliser $Min\ w = Max\ Z \Leftrightarrow 6u_1+4u_2+4u_3+2u_4+3u_5=1100$.

Comme $u_1=0$, $u_3=100$ et $u_5=100 \Rightarrow 4u_2+2u_4=400$

$$\Rightarrow \begin{cases}u_2+u_4=150\\2u_2+u_4=200\end{cases} \Rightarrow \begin{cases}u_2=50\\u_4=100\end{cases} \text{ et } u_2+u_5=150 \Rightarrow u_5=100$$

$$u^* = \begin{cases}u_1=0\\u_2=50\\u_3=100\\u_4=100\\u_5=100\end{cases}$$

</details>

## Exercice 4

Considérons le programme linéaire $(P_\alpha)$ suivant :

$$
(P_\alpha)
\left\{
\begin{aligned}
&\text{Minimiser } Z=3x_1+4x_2+x_3+x_4 \\
&\text{sous contraintes} \\
&x_1+x_2+x_3-x_4\ge2 \\
&2x_1+2x_2+x_3+x_4\ge\alpha \\
&x_i\ge0,\ i=1,...,4
\end{aligned}
\right.
$$

où $\alpha$ est un paramètre réel.

1) Écrire le problème dual $(D_\alpha)$ de $(P_\alpha)$.
2) Donner les contraintes redondantes.
3) Dessiner l'ensemble des solutions admissibles et localiser les solutions de base réalisables.
4) À l'aide de la méthode de simplexe, résoudre le programme $(D_\alpha)$ suivant les valeurs de $\alpha$.
5) Parmi les solutions réalisables trouvées dans la quatrième question, quelles sont celles qui ne sont jamais solutions optimales ?
6) Pour quelles valeurs de $\alpha$, le programme $(P_\alpha)$ admet une infinité de solutions optimales ?
7) Déduire les solutions de $(P_\alpha)$.

<details>
<summary>Correction</summary>

**1)**

$$
(D_\alpha)
\left\{
\begin{aligned}
&Max\ w = 2u_1+\alpha u_2 \\
&\text{s.c.} \\
&u_1+2u_2\le3 \\
&u_1+2u_2\le4 \\
&u_1+u_2\le1 \\
&-u_1+u_2\le1 \\
&u_i\ge0
\end{aligned}
\right.
$$

**2)** On a $u_1+2u_2\le3 \Rightarrow u_1+2u_2\le4$ (contrainte redondante).

**3)** <!-- TODO: page 4 (correction) is a hand-drawn graph of the feasible region for $(D_\alpha)$, a triangle bounded by u1+u2=1, -u1+u2=1 and the axes, with vertices $S_0=(0,0)$, $S_1=(1,0)$ and $S_2=(0,1)$ marked — genuine plotted figure, described in prose here rather than re-rendered; see PDF tab. -->

Solutions de base réalisables : $S_0=\begin{pmatrix}0\\0\end{pmatrix}$, $S_1=\begin{pmatrix}1\\0\end{pmatrix}$, $S_2=\begin{pmatrix}0\\1\end{pmatrix}$.

**4)** Forme standard : $Max\ Z=2u_1+\alpha u_2$ s.c. $u_1+2u_2\le3$, $u_1+u_2\le1$, $-u_1+u_2\le1$, $u_i\ge0$.

**Tableau $T_1$** :

|       |   | $u_1$ | $u_2$ | $y_1$ | $y_2$ | $y_3$ |
|-------|---|-------|-------|-------|-------|-------|
| $w$   | 0 | 2     | $\alpha$ | 0  | 0     | 0     |
| $y_1$ | 3 | 1     | 2     | 1     | 0     | 0     |
| $y_2$ | 1 | 1     | 1     | 0     | 1     | 0     |
| $y_3$ | 1 | -1    | 1     | 0     | 0     | 1     |

Le tableau $T_1$ n'est pas optimal $\forall\alpha$, donc la solution $S_0=\begin{pmatrix}0\\0\end{pmatrix}$ n'est jamais une solution optimale.

On choisit $u_1$ qui entre dans la base à la place de $y_2$ (pivot sur la ligne $y_2$, colonne $u_1$) :

**Tableau $T_2$** :

|       |   | $u_1$ | $u_2$ | $y_1$   | $y_2$ | $y_3$ |
|-------|---|-------|-------|---------|-------|-------|
| $w$   | 2 | 0     | $\alpha-2$ | 0  | -2    | 0     |
| $y_1$ | 2 | 0     | 1     | 1       | -1    | 0     |
| $u_1$ | 1 | 1     | 1     | 0       | 1     | 0     |
| $y_3$ | 2 | 0     | (2)   | 0       | 1     | 1     |

$T_2$ est optimal ssi $\alpha-2\le0$ ($\Leftrightarrow\alpha\le2$). Solution optimale $(1,0)=S_1$. Sinon, si $\alpha>2 \Rightarrow u_2$ entre dans la base à la place de $u_1$ ou $y_3$ ; on choisit $y_3$.

**Tableau $T_3$** :

|       |   | $u_1$ | $u_2$ | $y_1$ | $y_2$              | $y_3$              |
|-------|---|-------|-------|-------|--------------------|--------------------|
| $w$   | $\alpha$ | 0 | 0 | 0     | $-\alpha/2-1$       | $-\alpha/2+1$      |
| $y_1$ | 1 | 0     | 0     | 1     |                     |                    |
| $u_1$ | 0 | 1     | 0     | 0     |                     |                    |
| $u_2$ | 1 | 0     | 1     | 0     |                     |                    |

$T_3$ est optimal pour $\alpha>2$. Solution optimale $S_2=\begin{pmatrix}0\\1\end{pmatrix}$.

**Finalement**, solutions optimales de $(D_\alpha)$ :

$$
\begin{cases}
S_1=\begin{pmatrix}1\\0\end{pmatrix} & \text{si } \alpha\le2 \\
S_2=\begin{pmatrix}0\\1\end{pmatrix} & \text{si } \alpha>2
\end{cases}
$$

**5)** $S_0=\begin{pmatrix}0\\0\end{pmatrix}$ n'est jamais solution optimale.

**6)** Pour $\alpha=2$, dans le tableau $T_2$ on a une infinité de solutions entre $S_2=(0,1)$ et $S_1=(1,0)$.

**7)** Remarque : $u_1+2u_2\le3$ est non saturée $\Rightarrow u_1+2u_2\le4$ non saturée, ce qui montre $x_1=x_2=0$.

Pour $\alpha\le2$, $u^*=\begin{pmatrix}1\\0\end{pmatrix}$. $u_1+u_2\le1$ est saturée $\Rightarrow x_3\ne0$. $-u_1+u_2\le1$ est non saturée $\Rightarrow x_4=0$. D'après $T_2$ : $x^*=(0,0,2,0)$.

Pour $\alpha>2$, $u^*=\begin{pmatrix}0\\1\end{pmatrix}$. $u_1+u_2\le1$ est saturée $\Rightarrow x_3\ne0$. $-u_1+u_2\le1$ est saturée $\Rightarrow x_4\ne0$. D'après $T_3$ : $x^*=\left(0,0,\dfrac\alpha2+1,\dfrac\alpha2-1\right)$.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/pl-ds-ro-2023-correction.pdf" />

</TabItem>
</Tabs>
