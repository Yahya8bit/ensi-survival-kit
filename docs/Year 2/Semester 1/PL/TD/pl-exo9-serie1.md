---
sidebar_position: 6
title: "Exercice 9 (Série n°1) : Méthode de Newton-Raphson"
sidebar_label: Exo9 - Série 1 (Newton-Raphson)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Exercice 9 (Série n°1) : Méthode de Newton-Raphson

*ENSI — RO : Optimisation Non Linéaire — notes manuscrites*

<!-- TODO: this exercise's numbering ("Exercice 9 (Série N°1)") does not exactly match Exercice 9 of either "TD-1-PLNL.pdf" (pl-td1-plnl.md, a simplex series unrelated in content) or "TD1 Optimisation Non Linéaire" (pl-td1-optimisation-non-lineaire.md, whose Exercice 9 is a different function starting from x0=1) — kept as its own standalone supplementary document rather than merged into either, since no exact match was found. -->

$$
\left\{
\begin{aligned}
&\min\ f(x) = x^2+\frac1{x^3} \\
&x\in\mathbb{R}
\end{aligned}
\right.
\qquad \text{Sol } x^* = 1,0845
$$

$$f'(x) = 2x-\frac3{x^4} \qquad f''(x) = \frac{2x^5+12}{x^5}$$

<!-- TODO: the hand-drawn curve of f'(x) on the source page (showing a local hump for x<-1 and a vertical asymptote near x=1) is a genuine plotted figure, described in prose here rather than re-rendered; see PDF tab. -->

## Méthode de Newton-Raphson

$$
\begin{cases}
x_0 \text{ donné} \\
x_{n+1} = x_n - \dfrac{f'(x_n)}{f''(x_n)}
\end{cases}
$$

Selon le théorème de la convergence de la méthode de Newton-Raphson, si on choisit $x_0=-2$ la méthode diverge.

On choisit $x_0=0,5$.

| $n$ | $x_n$ |
|-----|--------|
| 0   | 0,5    |
| 1   | 1,471  |
| 2   | 1,2802 |
| 3   | 1,1549 |
| 4   | 1,1033 |
| 5   | 1,0884 |
| 6   | 1,0854 |
| 7   | 1,0847 |
| 8   | 1,0845 |

$|x_{n+1}-x_n| < 10^{-6}$

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/pl-exo9-serie1.pdf" />

</TabItem>
</Tabs>
