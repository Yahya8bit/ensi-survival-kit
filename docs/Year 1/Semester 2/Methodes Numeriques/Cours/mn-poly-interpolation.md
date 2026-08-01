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

Soit `n ≥ 0` un entier. Étant donné `n+1` points distincts `x₀, x₁, ..., xₙ` et `n+1` valeurs `y₀, y₁, ..., yₙ`, on cherche un polynôme `p` de degré `n` tel que :

```
p(xⱼ) = yⱼ    pour 0 ≤ j ≤ n
```

Ce polynôme, noté `Πₙ`, est le **polynôme d'interpolation** aux points `xⱼ`.

Si `f ∈ C⁰(I)` et `x₀,...,xₙ ∈ I`, en prenant `yⱼ = f(xⱼ)`, le polynôme `Πₙf` est appelé **l'interpolant de f** aux points `x₀,...,xₙ`.

## Base de Lagrange

On considère les polynômes `φₖ`, `k = 0,...,n`, de degré `n`, tels que :

```
φₖ(xⱼ) = δⱼₖ   (δⱼₖ = 1 si j=k, 0 sinon)
```

Explicitement :

```
φₖ(x) = ∏_{j=0, j≠k}^{n} (x − xⱼ) / (xₖ − xⱼ)
```

Le polynôme d'interpolation `Πₙ` des valeurs `yⱼ` s'écrit alors dans cette base :

```
Πₙ(x) = Σ_{k=0}^{n} yₖ φₖ(x)
```

car il vérifie bien `Πₙ(xⱼ) = Σₖ yₖ φₖ(xⱼ) = yⱼ`. Pour une fonction : `Πₙf(x) = Σₖ f(xₖ) φₖ(x)`.

**Exemple** (n=2, x₀=−1, x₁=0, x₂=1) :

```
φ₀(x) = ½x(x−1)
φ₁(x) = −(x+1)(x−1)
φ₂(x) = ½x(x+1)
```

### Unicité

Le polynôme `Πₙ` est le **seul** polynôme de degré ≤ n interpolant les données `yᵢ` aux nœuds `xᵢ`. En effet, si `Qₙ` est un autre polynôme d'interpolation, `Qₙ(x) − Πₙ(x)` est de degré ≤ n et s'annule en `n+1` points distincts, donc `Qₙ = Πₙ`.

## Erreur d'interpolation

**Théorème (erreur d'interpolation).** Soient `x₀,...,xₙ`, `n+1` nœuds distincts dans `I=[a,b]` et `f ∈ Cⁿ⁺¹(I)`. Alors, pour tout `x ∈ I` :

```
Eₙf(x) = f(x) − Πₙf(x) = f⁽ⁿ⁺¹⁾(ξ)/(n+1)! · ωₙ₊₁(x)
```

où `ωₙ₊₁(x) = ∏ᵢ₌₀ⁿ (x − xᵢ)` et `ξ ∈ I` (dépend de x).

### Cas des nœuds équirépartis

```
Eₙ(f) = max_{x∈I} |f(x) − Πₙf(x)| ≤ 1/(4(n+1)) · ((b−a)/n)^(n+1) · max_{x∈I} |f⁽ⁿ⁺¹⁾(x)|
```

**Démonstration (idée).** Le maximum de `|ωₙ₊₁(x)|` est atteint dans l'un des deux intervalles extrêmes `[x₀,x₁]` ou `[xₙ₋₁,xₙ]`. Sur `[x₀,x₁]`, `|(x−x₀)(x−x₁)| ≤ h²/4` où `h = (b−a)/n`. Pour les autres facteurs, `|(x−xᵢ)| ≤ ih`, d'où le produit majoré par `(n!/4)·h^(n+1)`, ce qui donne la formule.

:::note Remarque importante
Le fait que `1/(4(n+1)) · ((b-a)/n)^(n+1) → 0` quand `n → ∞` **n'implique pas** que l'erreur `Eₙ(f)` tende vers zéro, car `max|f⁽ⁿ⁺¹⁾(x)|` peut croître très vite avec n (c'est le phénomène de Runge, ci-dessous).
:::

## Phénomène de Runge

Soit `f(x) = 1/(1+x²)` sur `[−5, 5]`. Si on interpole `f` en des points **équirépartis**, au voisinage des extrémités de l'intervalle, l'interpolant présente des **oscillations importantes** qui s'amplifient avec le degré du polynôme (n=5 puis n=10) — contrairement à l'intuition, augmenter le nombre de points équirépartis **dégrade** l'approximation près des bords.

### Remèdes

1. **Interpolation avec points non équirépartis** (points de Chebyshev).
2. **Interpolation par intervalles** (polynômes par morceaux).

## Interpolation de Chebyshev

Pour chaque entier `n ≥ 1`, pour `i = 0,...,n`, on note `x̂ᵢ = −cos(πi/n) ∈ [−1,1]` les **points de Chebyshev**, et on définit, pour un intervalle arbitraire `[a,b]` :

```
xᵢ = (a+b)/2 + (b−a)/2 · x̂ᵢ ∈ [a,b]
```

Pour une fonction continue `f ∈ C¹([a,b])`, le polynôme d'interpolation `Πₙf` de degré n aux nœuds de Chebyshev **converge uniformément** vers `f` quand `n → ∞`. Sur l'exemple de Runge, les oscillations diminuent nettement lorsqu'on augmente le degré du polynôme aux points de Chebyshev (contrairement aux points équirépartis).

## Interpolation par intervalles (par morceaux)

Soient `x₀ = a < x₁ < ... < xₙ = b` des points divisant `I=[a,b]` en intervalles `Iᵢ=[xᵢ,xᵢ₊₁]` de longueur `H = (b−a)/N`. Sur chaque `Iᵢ` on interpole `f` par un polynôme de degré 1. Le polynôme par morceaux obtenu, noté `Π₁ᴴf`, vaut :

```
Π₁ᴴf(x) = f(xᵢ) + [f(xᵢ₊₁) − f(xᵢ)]/(xᵢ₊₁ − xᵢ) · (x − xᵢ)   pour x ∈ Iᵢ
```

**Théorème 2.** Si `f ∈ C²(I)`, il existe `C > 0` tel que :

```
E₁ᴴ(f) = max_{x∈I} |f(x) − Π₁ᴴf(x)| ≤ H²/8 · max_{x∈I} |f''(x)|
```

Plus généralement, pour un polynôme de degré `n ≥ 1` par sous-intervalle :

```
Eₙᴴ(f) ≤ H^(n+1)/(4(n+1)) · max_{x∈I} |f⁽ⁿ⁺¹⁾(x)|
```

L'erreur `E₁ᴴf` pour l'interpolation linéaire par morceaux se comporte donc comme `C·H²` : ce résultat est confirmé numériquement (les rapports `E₁ᴴ/H²` restent approximativement constants pour différentes valeurs de H).

## Interpolation par fonctions splines

Soient `a=x₀<x₁<...<xₙ=b`. On appelle **spline cubique** interpolant `f` une fonction `s₃` qui satisfait :

1. `s₃|Iᵢ ∈ ℙ₃` pour tout `i = 0,...,n−1` (polynôme de degré 3 sur chaque sous-intervalle),
2. `s₃(xᵢ) = f(xᵢ)` pour tout `i = 0,...,n`,
3. `s₃ ∈ C²([a,b])` (continuité de `s₃`, `s₃'`, `s₃''` aux nœuds internes).

Cela représente `2(n−1) + 2 + 2(n−1) = 4n−2` conditions, pour `4n` inconnues (4 coefficients par intervalle, n intervalles). Il manque donc 2 conditions. Pour la **spline naturelle**, on impose :

```
s₃''(x₀⁺) = 0   et   s₃''(xₙ⁻) = 0
```

La spline cubique naturelle interpole `f` de façon **beaucoup plus lisse** (sans oscillation) que le polynôme d'interpolation global, y compris pour des fonctions présentant de forts pics.

## Approximation au sens des moindres carrés

Lorsque le nombre de données est grand, le polynôme interpolant peut présenter d'importantes oscillations. On cherche alors un polynôme `f̃ₘ` de degré `m < n` qui approche « au mieux » les données, au sens où :

```
Σᵢ |yᵢ − f̃ₘ(xᵢ)|² ≤ Σᵢ |yᵢ − pₘ(xᵢ)|²    ∀pₘ ∈ ℙₘ
```

En écrivant `f̃ₘ(x) = a₀ + a₁x + ... + aₘxᵐ` et en minimisant `Φ(a₀,...,aₘ) = Σᵢ |yᵢ − (a₀+a₁xᵢ+...+aₘxᵢᵐ)|²` via `∂Φ/∂aₖ = 0` pour `0 ≤ k ≤ m`, on obtient le **système d'équations normales** `A·a = y` (matrice `A` de taille `(m+1)×(m+1)`, construite à partir des sommes de puissances de `xᵢ`).

Pour `m=1`, on obtient la **droite de régression** `f̃₁(x) = a₀ + a₁x`.

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
- Si `polyfit(x,y,n)` est appelé avec `m+1 > n+1` points (plus de points que de degrés de liberté), le résultat est le polynôme **aux moindres carrés** de degré `n`, pas un interpolant exact.
- Si `m+1 = n+1`, on retrouve exactement le polynôme d'interpolation.
:::

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/mn-poly-interpolation.pdf" />

</TabItem>
</Tabs>
