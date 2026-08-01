---
sidebar_position: 3
title: TD3 - Résolution numérique des équations non linéaires (avec corrigé)
sidebar_label: TD3 - Équations non linéaires
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD3 : Résolution numérique des équations non linéaires

*ENSI — A.U. 2025-2026*

## Exercice 1

On considère l'équation non linéaire suivante :

```
(E)   f(x) = x³ + x − 1
```

1. Montrer que `f(x) = 0` admet une seule solution réelle `α` dans l'intervalle `[0,1]`.
2. Dans chacun des cas suivants, étudier sur `[0,1]` la convergence de la suite `(xₙ)ₙ∈ℕ` définie par `xₙ₊₁ = gᵢ(xₙ)` :
   - a. `g₁(x) = x³ + 2x − 1`
   - b. `g₂(x) = 1 − x³`
   - c. `g₃(x) = 1/(1+x²)`
   - d. `g₄(x) = (1−x)^{1/3}`

<details>
<summary>Correction</summary>

**1.** `f(x) ∈ C^∞(ℝ)`, donc `f'(x) = 3x²+1 > 0, ∀x ∈ ℝ`. `f` réalise donc une bijection de `ℝ` dans `ℝ`. Alors `∃! α ∈ ℝ | f(α)=0`. Or `f(0)=−1` et `f(1)=1`, donc `f(0)f(1) < 0`, d'où `α ∈ [0,1]`.

**2.a.** `g₁(x)=x³+2x−1`, `x ∈ [0,1]`. `g₁ ∈ C^∞([0,1])`. `g₁'(x)=3x²+2>0 ∀x∈[0,1]`, `g₁''(x)=6x≥0 ∀x∈[0,1]`. `g₁` est croissante de `−1` à `2` sur `[0,1]`, avec `g₁'` croissante de `2` à `5`.

On a `|g₁'(x)| > 1 ∀x∈[0,1]`, en particulier pour `x=α` on a `|g₁'(α)|>1`, donc la suite `(uₙ)ₙ∈ℕ` **diverge**.

**2.b.** `g₂(x)=1−x³`. `g₂∈C^∞([0,1])`. `g₂'(x)=−3x²≤0 ∀x∈[0,1]`, `g₂''(x)=−6x≤0 ∀x∈[0,1]`.

`g₂'(x)=−1 ⟺ 3x²=1 ⟺ x=±1/√3`, donc `x=1/√3 ∈ [0,1]`.

On a `g₂([0,1]) ⊆ [0,1]` (stable). Or `f(0)=−1<0` et `f(1/√3)=1/(3√3)+1/√3−1<0`, donc `f(0)f(1/√3)>0`, d'où `α ∈ [1/√3, 1]`, et donc `(xₙ)` **diverge** car `|g₂'(x)|>1 ∀x∈[1/√3,1]` en particulier pour `α`.

**2.c.** `g₃(x)=1/(1+x²)`. `g₃∈C^∞([0,1])`. `g₃'(x)=−2x/(1+x²)²`, `g₃''(x)=(−2+6x²)/(1+x²)³`.

On a `|g₃'(x)|<1` (max `≈0.694` en valeur absolue), d'où `g₃([0,1]) ⊆ [0,1]`. D'après le théorème du point fixe, `∀x₀∈[0,1]`, `xₙ₊₁=g₃(xₙ)=1/(1+xₙ²)` est **convergente**.

**2.d.** `g₄(x)=(1−x)^{1/3}`. `g₄(x)∈C^∞([0,1[)`. `g₄'(x)=−(1/3)(1−x)^{−2/3}<0 ∀x∈[0,1[`, `g₄''(x)=−(2/9)(1−x)^{−5/3}<0 ∀x∈[0,1[`.

`g₄'(x)=−1 ⟹ x=1−1/√27 ≈ 0.8075`.

On a `f(0)=−1<0`, `f(1−1/√27)>0`, d'où `α ∈ ]0, 1−1/√27[`.

On a `g₄∈C¹([0, 1−1/√27−ε]), ε>0`. Sur cet intervalle on a `|g₄'(x)|<1`, par conséquent d'après le théorème du cours, `∃ Vₐ ⊂ [0, 1−1/√27−ε]` contenant `α`, sur lequel on a, pour tout choix `x₀∈Vₐ`, la suite `(xₙ)ₙ∈ℕ` définie par `x₀, xₙ₊₁=(1−xₙ)^{1/3}` **converge vers α**.

*(Indication : on peut choisir `Vₐ = [0.5, 0.8]`.)*

</details>

## Exercice 2

Soit la fonction `f: ℝ → ℝ` définie par :

```
f(x) = 1 − 3e^{−x}
```

1. Montrer que `f` admet un unique zéro sur `[1,2]` noté `x̄`.
2. Calculer `x̄`.
3. L'équation `f(x)=0` est équivalente à `x = x + βf(x)`, `∀β≠0`. Soit `g(x) = x + βf(x)`
   - a. Trouver `β` pour que la suite définie par `xₙ₊₁ = g(xₙ)` converge sur un intervalle `[a,b]` de `[1,2]`.
   - b. Que peut-on dire de la vitesse de convergence de la suite ?

<details>
<summary>Correction</summary>

**1.** La fonction `f` est continue et dérivable sur `ℝ`, on calcule `f'(x) = 3e^{−x} > 0` pour tout `x`. `f(1) < 0` et `f(2) > 0`. D'après le corollaire du TVI, il existe un unique `x̄` tel que `f(x̄)=0`.

**2.** En résolvant `1 − 3e^{−x̄} = 0` on trouve `x̄ = ln(3)`.

**3.a.** On calcule `g'(x) = 1 + 3λe^{−x}, ∀x∈ℝ` (avec `β=λ`).

Pour que la méthode converge on a besoin de garantir `|g'(x)| < 1` pour tout `x ∈ [1,2]`. Il est alors nécessaire de prendre d'une part `λ<0` pour avoir `g'(x)<1`, et d'autre part `λ > −(2/3)e` pour assurer `g'(x)>−1`. Au final, la méthode de point fixe converge si :
```
λ ∈ ]−2e/3, 0[
```

**3.b.** Le choix optimal (en terme de vitesse de convergence) pour `λ` est celui pour lequel `g'(x̄)=0`, en résolvant l'équation on trouve `λ = −e^{x̄}/3`. On a alors `g⁽²⁾(x̄) ≠ 0`, d'où **la méthode est d'ordre 2**.

</details>

## Exercice 3

Soit l'équation :

```
(1)   x = e^{−x}, x ∈ [0, +∞[
```

1. On considère la méthode itérative suivante :
   ```
   x₀ ∈ [0,+∞[ donné,
   xₙ₊₁ = g(xₙ) = e^{−xₙ}, ∀n≥0.
   ```
   - a. Montrer que cette méthode est convergente si `x₀` est bien choisie.
   - b. Montrer que le point fixe de `g` appartient à `[1/10, 1]`.
   - c. Donner le nombre d'itérations qui assure que l'erreur est inférieure à `10⁻³`.
   - d. Donner dans ce cas l'ordre de convergence.
2. Appliquer la méthode de Newton à l'équation (1) et montrer que la convergence est quadratique.

<details>
<summary>Correction</summary>

**1.a.** Posons `g(x)=e^{−x}`. Clairement `0` n'est pas solution de l'équation. Pour `x ∈ ]0,+∞[`, `g'(x)=−e^{−x}`, donc `|g'(x)|<1` ce qui implique que `g` est contractante sur `]0,+∞[`. Comme `]0,+∞[` est un ouvert, le théorème du point fixe ne s'applique pas directement. Il faut trouver un fermé `[a,b] ⊂ ]0,+∞[` tel que `g([a,b]) ⊂ [a,b]`.

**1.b.** Prenons `a=1/10` et `b=1`. On a `g(1/10)=e^{−1/10}≤1` et `g(1)=e^{−1}≥1/10`. On a bien `g([1/10,1]) ⊂ [1/10,1]` par continuité de `g` sur `[1/10,1]`. Comme `|g'(x)|<1` sur le fermé `[1/10,1]` de `]0,+∞[`, on peut appliquer le théorème du point fixe. Il existe `l ∈ [1/10,1]` tel que `l=g(l)`.

**1.c.** On sait que `|xₙ−α| ≤ kⁿ/(1−k) · |x₁−x₀| ≤ 10⁻³` avec `k = sup_{x∈[1/10,1]} |g'(x)| = 0.9`.

Ce qui implique `n ≥ ln((10⁻³(1−k))/|x₁−x₀|) · 1/ln(k)`, on prend `x₀=1/10` et `x₁=e^{−1/10}`.

Pour approcher `α` à `10⁻³` il nous faut au moins `E(ln((10⁻³(1−k))/|x₁−x₀|) · 1/ln(k)) + 1` itérations.

**1.d.** Comme `g'(c)=−e^{−c}≠0`, la méthode est convergente à **l'ordre 1**.

**2.** Pour appliquer la méthode de Newton à l'équation (1), on pose `h(x)=x−e^{−x}`. Comme `h'(x)=1+e^{−x}≠0` sur `]0,+∞[`, la méthode de Newton pour l'équation `h(x)=0` s'écrit :
```
x₀ ∈ [1/10, 1] donné,
xₙ₊₁ = xₙ − (xₙ−e^{−xₙ})/(1+e^{−xₙ}),  ∀n≥0.
```

**Ordre de convergence.** La fonction `h(x)=x−e^{−x}` est `C²`. Soit `α` la racine de `h`. Cette méthode se met sous la forme `xₙ₊₁ = φ(xₙ)`, où `φ(x) = x − h(x)/h'(x)`. On a :
```
φ'(x) = h(x)h''(x)/(h'(x))²
```
et donc `φ'(α) = h(α)h''(α)/(h'(α))² = 0`, car `h(α)=0`.

De l'expression de la dérivée seconde :
```
φ''(x) = [(h'(x))³h''(x) + h(x)h⁽³⁾(x)(h'(x))² − 2h(x)h'(x)(h''(x))²] / (h'(x))⁴
```
il vient `φ''(α) = h''(α)/h'(α) = −e^{−α}/(1+e^{−α}) ≠ 0`.

Par suite, d'après l'exercice 1 (du cours), **la convergence de la méthode de Newton est quadratique** pour l'équation `x=e^{−x}, x∈[0,+∞[`.

</details>

## Exercice 4 (supplémentaire)

On souhaite résoudre l'équation `f(x) = 0` avec `f(x) = x·ln(x+1) − 2`, pour `x ∈ [0,8]`.

1. Montrer que cette fonction admet une seule racine dans l'intervalle `[0,8]`.
2. Soit la méthode itérative :
   ```
   x₀ donné,
   xₙ₊₁ = g(xₙ) = 2/ln(1+xₙ)
   ```
   - a. Étudier la convergence de cette méthode.
   - b. Donner le nombre d'itérations nécessaires pour avoir une solution à `10⁻⁶` près.

<details>
<summary>Correction</summary>

**1°)** `f'(x) = ln(1+x) + x/(1+x) > 0` pour `x ∈ ]0,8]` : `f` est strictement croissante. `f(0) = -2 < 0` et `f(8) = 8ln9-2 ≈ 15.6 > 0`, donc `f(0)f(8) < 0` : d'après le théorème des valeurs intermédiaires, il existe un unique `α ∈ [0,8]` tel que `f(α) = 0`.

**2°a)** `g(x) = 2/ln(1+x)`, `g'(x) = -2/((1+x)ln(1+x)²)`.

`g'' (x) = (2/((1+x)ln(1+x))³) · [ln(1+x) + 2] ≥ 0` sur `]0,8]` : `g'` est croissante (donc `g'` négative et croissante vers 0, `｜g'｜` décroissante).

Il est clair que la méthode diverge sur l'intervalle `]0,8]` en entier (car `｜g'(x)｜` peut être `>1` près de 0), mais qu'elle **converge** sur un sous-intervalle bien choisi `[a,b] ⊂ [1,2]`, où `maxₓ∈[a,b] ｜g'(x)｜ = ｜g'(a)｜ < 1`.

Pour étudier la convergence, il faut procéder en deux étapes :
1. Bien encadrer la solution : par la méthode de dichotomie, on a `f(1)·f(2) < 0`.
2. Sur l'intervalle `[1,2]` : `max_{[1,2]} ｜g'(x)｜ = ｜g'(1)｜ = 2/(2ln2)² ≈ 0.195 < 1`.

Sur cet intervalle, la méthode itérative est **convergente**.

**2°b)** On a `｜xₙ-α｜ ≤ Lⁿ/(1-L) · ｜x₁-x₀｜`, avec `L = max_{[a,b]} ｜g'(x)｜` et `x₁ = g(x₀)`.

```
｜xₙ-α｜ ≤ 10⁻⁶
⟺ Lⁿ/(1-L) · ｜x₁-x₀｜ ≤ 10⁻⁶
⟺ n·lnL ≤ ln(10⁻⁶(1-L)/｜x₁-x₀｜)
⟺ n ≥ [ln(10⁻⁶(1-L)) - ln｜x₁-x₀｜] / lnL
```

On choisit `n = E([ln(10⁻⁶(1-L))-ln｜x₁-x₀｜]/lnL) + 1`.

**Application numérique.** `L = 2/(2ln2)`. Pour `x₀=1` : `x₁ = g(1) = 2/ln2`.

```
n = E([ln((1-2/(2ln2))10⁻⁶) - ln｜2/ln2 - 1｜] / ln(2/(2ln2))) + 1
```

Ce qui donne, après calcul numérique, **environ 357 itérations**.

</details>

## Exercice 5 (supplémentaire)

On considère l'équation `(E) : x² = -ln x`.

1. Montrer que `(E)` admet une racine unique `α ∈ [3/5, 1/√2]`.
2. On désire appliquer la méthode du point fixe pour la détermination d'une valeur approchée de `α`. Pour cela, on transforme `(E)` en une équation du type `x = g(x)`, avec `g(x) = e^{-x²}` ou `g(x) = √(-ln x)`.
   - a. Étudier dans chacun des cas la convergence de la méthode du point fixe.
   - b. Lorsque la méthode converge, déterminer son ordre.
   - c. En partant de `x₀ = 3/5`, déterminer le nombre d'itérations nécessaires pour que l'erreur soit inférieure à `10⁻⁴`.
   - d. Écrire la méthode de Newton pour résoudre `(E)`. En partant de `x₀ = 3/5`, déterminer `α` à `10⁻⁴` près. Conclure.

<details>
<summary>Correction</summary>

**1°)** Posons `f(u) = u² + ln u`, pour `u ∈ [3/5, 1/√2]`. `f'(u) = 2u + 1/u > 0` sur cet intervalle : `f` est strictement croissante.

`f(3/5) ≈ -0.15 < 0` et `f(1/√2) ≈ 0.15 > 0`, donc `f(3/5)·f(1/√2) < 0` : `f(u) = 0` admet une unique solution `α` dans `[3/5, 1/√2]`. Or `f(u) = 0 ⟺ u² = -ln u`, donc `(E)` admet une unique racine `α` sur cet intervalle.

**2°a) Cas `g₁(x) = √(-ln x)`.** L'étude de `g₁'` montre que `｜g₁'(x)｜ > 1` sur `[3/5, 1/√2]` (pente forte au voisinage de la racine) : **la méthode diverge**.

**Cas `g(x) = e^{-x²}`.** `g'(x) = -2xe^{-x²}`. Sur `[3/5, 1/√2]`, `｜g'(x)｜ < 1` (valeurs extrêmes `g'(3/5) ≈ -0.878`, `g'(1/√2) ≈ -0.858`) : **la méthode converge**.

**2°b)** `g'(α) = -2αe^{-α²} ≠ 0` (car `α ≠ 0`) : la méthode `x_{n+1}=g(x_n)` est donc d'**ordre 1**.

**2°c)** On a `｜xₙ-α｜ ≤ Lⁿ/(1-L)·｜x₁-x₀｜ ≤ 10⁻⁴`, avec `L = max_{[3/5,1/√2]} ｜g'(x)｜ ≈ 0.878` et `x₀ = 3/5`, `x₁ = g(x₀) = e^{-(3/5)²} ≈ 0.6376`.

```
n ≥ [ln(10⁻⁴(1-L)) - ln｜x₁-x₀｜] / lnL
```

Ce qui donne, après calcul numérique, **environ 66 itérations**.

**2°d) Méthode de Newton.**

```
uₙ₊₁ = uₙ - f(uₙ)/f'(uₙ) = uₙ - (uₙ²+ln uₙ)/(2uₙ+1/uₙ) = uₙ - (uₙ³+uₙ ln uₙ)/(2uₙ²+1)
```

En partant de `u₀ = 3/5 = 0.6` :

```
u₀ = 0.6
u₁ = 0.6526
u₂ = 0.6529
u₃ = 0.6529
```

La méthode de Newton **converge dès la 3ᵉ itération** à `10⁻⁴` près, alors que la méthode du point fixe avec `g(x)=e^{-x²}` en nécessite environ 66 : cela illustre la **convergence quadratique** de Newton contre la convergence linéaire (ordre 1) du point fixe.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<p><strong>Sujet (Exercices 1-3)</strong></p>
<PdfViewer file="/pdfs/mn-td3-equations-non-lineaires.pdf" />

<p><strong>Correction (Exercices 1-3)</strong></p>
<PdfViewer file="/pdfs/mn-td3-equations-non-lineaires-correction.pdf" />

<p><strong>Exercice 4 (sujet + correction)</strong></p>
<PdfViewer file="/pdfs/mn-td3-exo-supp1.pdf" />

<p><strong>Exercice 5 (correction)</strong></p>
<PdfViewer file="/pdfs/mn-td3-exo-supp2.pdf" />

</TabItem>
</Tabs>
