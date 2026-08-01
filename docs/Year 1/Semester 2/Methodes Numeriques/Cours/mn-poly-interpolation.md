---
sidebar_position: 2
title: Support de cours - Interpolation Polynomiale
sidebar_label: Interpolation (support détaillé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Interpolation — Support de cours détaillé

## Exemples et motivations

- **Exemple 1** : la température de l'air varie selon la concentration d'acide carbonique K. Un tableau de valeurs (température vs latitude, pour K = 0.67, 1.5, 2) permet, par interpolation, d'estimer la température à une latitude non tabulée (ex. Lausanne, 46.316°).
- **Exemple 2** : la valeur d'une action en bourse entre juin 1999 et juin 2000 — on cherche à « deviner » son comportement futur à partir des données passées (extrapolation).

## Position du problème

Soit $n \ge 0$ un entier. Étant donné $n+1$ points distincts $x_0, x_1, \ldots, x_n$ et $n+1$ valeurs $y_0, y_1, \ldots, y_n$, on cherche un polynôme $p$ de degré $n$ tel que :

$$
p(x_j) = y_j \quad \text{pour } 0 \le j \le n
$$

Ce polynôme, noté $\Pi_n$, est le **polynôme d'interpolation** aux points $x_j$.

Si $f \in C^0(I)$ et $x_0,\ldots,x_n \in I$, en prenant $y_j = f(x_j)$, le polynôme $\Pi_n f$ est appelé **l'interpolant de f** aux points $x_0,\ldots,x_n$.

## Base de Lagrange

On considère les polynômes $\varphi_k$, $k = 0,\ldots,n$, de degré $n$, tels que :

$$
\varphi_k(x_j) = \delta_{jk} \quad (\delta_{jk} = 1 \text{ si } j=k,\ 0 \text{ sinon})
$$

Explicitement :

$$
\varphi_k(x) = \prod_{j=0,\, j\neq k}^{n} \frac{x - x_j}{x_k - x_j}
$$

Le polynôme d'interpolation $\Pi_n$ des valeurs $y_j$ s'écrit alors dans cette base :

$$
\Pi_n(x) = \sum_{k=0}^{n} y_k \varphi_k(x)
$$

car il vérifie bien $\Pi_n(x_j) = \sum_k y_k \varphi_k(x_j) = y_j$. Pour une fonction : $\Pi_n f(x) = \sum_k f(x_k) \varphi_k(x)$.

**Exemple** (n=2, x₀=−1, x₁=0, x₂=1) :

$$
\begin{aligned}
\varphi_0(x) &= \frac{1}{2}x(x-1) \\
\varphi_1(x) &= -(x+1)(x-1) \\
\varphi_2(x) &= \frac{1}{2}x(x+1)
\end{aligned}
$$

### Unicité

Le polynôme $\Pi_n$ est le **seul** polynôme de degré ≤ n interpolant les données $y_i$ aux nœuds $x_i$. En effet, si $Q_n$ est un autre polynôme d'interpolation, $Q_n(x) - \Pi_n(x)$ est de degré ≤ n et s'annule en $n+1$ points distincts, donc $Q_n = \Pi_n$.

## Erreur d'interpolation

**Théorème (erreur d'interpolation).** Soient $x_0,\ldots,x_n$, $n+1$ nœuds distincts dans $I=[a,b]$ et $f \in C^{n+1}(I)$. Alors, pour tout $x \in I$ :

$$
E_n f(x) = f(x) - \Pi_n f(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \cdot \omega_{n+1}(x)
$$

où $\omega_{n+1}(x) = \prod_{i=0}^{n} (x - x_i)$ et $\xi \in I$ (dépend de x).

### Cas des nœuds équirépartis

$$
E_n(f) = \max_{x \in I} |f(x) - \Pi_n f(x)| \le \frac{1}{4(n+1)} \cdot \left(\frac{b-a}{n}\right)^{n+1} \cdot \max_{x \in I} |f^{(n+1)}(x)|
$$

**Démonstration (idée).** Le maximum de $|\omega_{n+1}(x)|$ est atteint dans l'un des deux intervalles extrêmes $[x_0,x_1]$ ou $[x_{n-1},x_n]$. Sur $[x_0,x_1]$, $|(x-x_0)(x-x_1)| \le h^2/4$ où $h = (b-a)/n$. Pour les autres facteurs, $|(x-x_i)| \le ih$, d'où le produit majoré par $(n!/4)\cdot h^{n+1}$, ce qui donne la formule.

:::note Remarque importante
Le fait que $\frac{1}{4(n+1)} \cdot \left(\frac{b-a}{n}\right)^{n+1} \to 0$ quand $n \to \infty$ **n'implique pas** que l'erreur $E_n(f)$ tende vers zéro, car $\max|f^{(n+1)}(x)|$ peut croître très vite avec n (c'est le phénomène de Runge, ci-dessous).
:::

## Phénomène de Runge

Soit $f(x) = 1/(1+x^2)$ sur $[-5, 5]$. Si on interpole `f` en des points **équirépartis**, au voisinage des extrémités de l'intervalle, l'interpolant présente des **oscillations importantes** qui s'amplifient avec le degré du polynôme (n=5 puis n=10) — contrairement à l'intuition, augmenter le nombre de points équirépartis **dégrade** l'approximation près des bords.

### Remèdes

1. **Interpolation avec points non équirépartis** (points de Chebyshev).
2. **Interpolation par intervalles** (polynômes par morceaux).

## Interpolation de Chebyshev

Pour chaque entier $n \ge 1$, pour $i = 0,\ldots,n$, on note $\hat{x}_i = -\cos(\pi i/n) \in [-1,1]$ les **points de Chebyshev**, et on définit, pour un intervalle arbitraire $[a,b]$ :

$$
x_i = \frac{a+b}{2} + \frac{b-a}{2} \cdot \hat{x}_i \in [a,b]
$$

Pour une fonction continue $f \in C^1([a,b])$, le polynôme d'interpolation $\Pi_n f$ de degré n aux nœuds de Chebyshev **converge uniformément** vers $f$ quand $n \to \infty$. Sur l'exemple de Runge, les oscillations diminuent nettement lorsqu'on augmente le degré du polynôme aux points de Chebyshev (contrairement aux points équirépartis).

## Interpolation par intervalles (par morceaux)

Soient $x_0 = a < x_1 < \ldots < x_n = b$ des points divisant $I=[a,b]$ en intervalles $I_i=[x_i,x_{i+1}]$ de longueur $H = (b-a)/N$. Sur chaque $I_i$ on interpole $f$ par un polynôme de degré 1. Le polynôme par morceaux obtenu, noté $\Pi_1^H f$, vaut :

$$
\Pi_1^H f(x) = f(x_i) + \frac{f(x_{i+1}) - f(x_i)}{x_{i+1} - x_i} \cdot (x - x_i) \quad \text{pour } x \in I_i
$$

**Théorème 2.** Si $f \in C^2(I)$, il existe $C > 0$ tel que :

$$
E_1^H(f) = \max_{x \in I} |f(x) - \Pi_1^H f(x)| \le \frac{H^2}{8} \cdot \max_{x \in I} |f''(x)|
$$

Plus généralement, pour un polynôme de degré $n \ge 1$ par sous-intervalle :

$$
E_n^H(f) \le \frac{H^{n+1}}{4(n+1)} \cdot \max_{x \in I} |f^{(n+1)}(x)|
$$

L'erreur $E_1^H f$ pour l'interpolation linéaire par morceaux se comporte donc comme $C \cdot H^2$ : ce résultat est confirmé numériquement (les rapports $E_1^H/H^2$ restent approximativement constants pour différentes valeurs de H).

## Interpolation par fonctions splines

Soient $a=x_0<x_1<\ldots<x_n=b$. On appelle **spline cubique** interpolant $f$ une fonction $s_3$ qui satisfait :

1. $s_3|_{I_i} \in \mathbb{P}_3$ pour tout $i = 0,\ldots,n-1$ (polynôme de degré 3 sur chaque sous-intervalle),
2. $s_3(x_i) = f(x_i)$ pour tout $i = 0,\ldots,n$,
3. $s_3 \in C^2([a,b])$ (continuité de $s_3$, $s_3'$, $s_3''$ aux nœuds internes).

Cela représente $2(n-1) + 2 + 2(n-1) = 4n-2$ conditions, pour $4n$ inconnues (4 coefficients par intervalle, n intervalles). Il manque donc 2 conditions. Pour la **spline naturelle**, on impose :

$$
s_3''(x_0^+) = 0 \quad \text{et} \quad s_3''(x_n^-) = 0
$$

La spline cubique naturelle interpole `f` de façon **beaucoup plus lisse** (sans oscillation) que le polynôme d'interpolation global, y compris pour des fonctions présentant de forts pics.

## Approximation au sens des moindres carrés

Lorsque le nombre de données est grand, le polynôme interpolant peut présenter d'importantes oscillations. On cherche alors un polynôme $\tilde{f}_m$ de degré $m < n$ qui approche « au mieux » les données, au sens où :

$$
\sum_i |y_i - \tilde{f}_m(x_i)|^2 \le \sum_i |y_i - p_m(x_i)|^2 \quad \forall p_m \in \mathbb{P}_m
$$

En écrivant $\tilde{f}_m(x) = a_0 + a_1 x + \ldots + a_m x^m$ et en minimisant $\Phi(a_0,\ldots,a_m) = \sum_i |y_i - (a_0+a_1 x_i+\ldots+a_m x_i^m)|^2$ via $\partial \Phi/\partial a_k = 0$ pour $0 \le k \le m$, on obtient le **système d'équations normales** $A \cdot a = y$ (matrice $A$ de taille $(m+1)\times(m+1)$, construite à partir des sommes de puissances de $x_i$).

Pour $m=1$, on obtient la **droite de régression** $\tilde{f}_1(x) = a_0 + a_1 x$.

Contrairement au polynôme interpolant (qui oscille fortement quand le nombre de points augmente), le polynôme aux moindres carrés de faible degré donne une représentation lisse et stable des données — mais le choix du degré est crucial : un degré trop élevé réintroduit des oscillations, un degré trop faible ne capture pas la tendance.

## Interpolation numérique avec MATLAB

| Commande | Rôle |
|---|---|
| `p = polyfit(x,y,n)` | calcule les coefficients du polynôme de degré `n` qui interpole (ou approche aux moindres carrés si sur-déterminé) les valeurs `y` aux points `x` |
| `y = polyval(p,x)` | évalue le polynôme de coefficients `p` aux points `x` |
| `s = spline(x,y,x_sample)` | calcule la spline cubique interpolant `(x,y)`, évaluée en `x_sample` |
| `z = roots(p)` | racines du polynôme `p` |
| `p = conv(p1,p2)` | produit de deux polynômes |
| `[q,r] = deconv(p1,p2)` | division euclidienne : `p1 = q·p2 + r` |
| `y = polyder(p)` | dérivée du polynôme |
| `y = polyint(p)` | primitive du polynôme |

**Exemple** : interpoler `y = [3.38, 3.86, 3.85, 3.59, 3.49]` aux points `x = [0, 0.25, 0.5, 0.75, 1]` par un polynôme de degré 4 :

```matlab
x = [0:0.25:1];
y = [3.38 3.86 3.85 3.59 3.49];
p1 = polyfit(x,y,4)
% p1 = 1.8133  -0.1600  -4.5933  3.0500  3.3800
% Π4(x) = 1.8133x^4 - 0.16x^3 - 4.5933x^2 + 3.05x + 3.38
```

:::note À retenir
- Si `polyfit(x,y,n)` est appelé avec $m+1 > n+1$ points (plus de points que de degrés de liberté), le résultat est le polynôme **aux moindres carrés** de degré $n$, pas un interpolant exact.
- Si $m+1 = n+1$, on retrouve exactement le polynôme d'interpolation.
:::

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/mn-poly-interpolation.pdf" />

</TabItem>
</Tabs>
