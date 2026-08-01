---
sidebar_position: 5
title: Série d'exercices - Interpolation et Quadrature (avec corrigé)
sidebar_label: Série - Interpolation & Quadrature
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Série d'exercices : Interpolation et Quadrature de Gauss

*ENSI — Algorithmique de l'Analyse Numérique*

## Partie A — Quadrature avec poids sur un intervalle infini

**Exercice 1**

On souhaite calculer numériquement l'intégrale suivante :

```
I = ∫₀^{+∞} dx/(1+x⁶)
```

1. Montrer en majorant `1/(1+x⁶)` par `1/x⁶` que l'on peut déterminer un nombre `a ≥ 0` tel que :
   ```
   ∫ₐ^{+∞} dx/(1+x⁶) ≤ (1/5)·10⁻⁵
   ```
2. Pour calculer `J = ∫₀ᵃ dx/(1+x⁶)`, on utilise la méthode des trapèzes composée. Exprimer en fonction de `M = sup_{x∈[0,a]} |f''(x)|` où `f(x)=1/(1+x⁶)`, le nombre `N+1` de points d'intégration nécessaires pour calculer cette intégrale avec une erreur inférieure à `(1/5)·10⁻⁵`.
3. Trouver `M` et en déduire `N`.
4. Donner sommairement le principe d'une méthode de Gauss pour calculer `I = ∫₀^{+∞} dx/(1+x⁶)`.

<details>
<summary>Correction</summary>

**1.** `∫ₐ^{+∞} dx/(1+x⁶) ≤ ∫ₐ^{+∞} dx/x⁶ = [x⁻⁵/(−5)]ₐ^{+∞} = (1/5)a⁻⁵`.

Pour que `∫ₐ^{+∞} dx/(1+x⁶) ≤ (1/5)·10⁻⁵`, il suffit que `(1/5)a⁻⁵ ≤ (1/5)·10⁻⁵`, soit `a ≥ 10`. Le plus petit `a` positif est `a = 10`.

**2.** Formule des trapèzes composée :
```
J = ∫₀ᵃ dx/(1+x⁶) = h/2 · [f(0) + 2·Σᵢ₌₁^{N-1} f(ia/N) + f(a)] − a³/(12N²) f''(ξ),   ξ ∈ ]0,a[
```
On pose `Eₙ(f) = −a³/(12N²) f''(ξ)`, d'où `|Eₙ(f)| ≤ a³M/(12N²)`. On calcule `N` tel que :
```
a³M/(12N²) ≤ (1/5)·10⁻⁵  ⟹  N ≥ E(√(5a³M/(12·10⁻⁵))) + 1
```

**3.** `f''(x) = (−30x⁴+42x¹⁰)/(1+x⁶)³`. Pour `x ∈ [0,a]`, `|f''(x)| ≤ 42 = M`. Pour `a=10`, `N = E(√((3/2)·10⁹)) + 1`.

**4.** Méthode de **Gauss-Laguerre** à `(N+1)` points : poids `w(x)=e^{−x}`.
```
∫₀^{+∞} g(x)e^{−x}dx = Σₖ₌₀ᴺ λₖg(xₖ) + E(g)
```
où `xₖ` sont les racines de `L_{N+1}`. Ici, on écrit :
```
I = ∫₀^{+∞} dx/(1+x⁶) = ∫₀^{+∞} eˣ/(1+x⁶) · e^{−x} dx = Σₖ₌₀ᴺ λₖ · e^{xₖ}/(1+xₖ⁶) + E(g)
```

</details>

## Partie B — Interpolation de Lagrange

**Exercice 1**

1. Soit `g` une fonction de classe `C³` sur `[−1,1]`.
   - a. Soit `P` le polynôme d'interpolation de `g` aux points `x₀=−1, x₁=0, x₂=1`. Quel est le degré de `P` ? Rappeler l'expression de l'erreur d'interpolation.
   - b. Montrer que les fonctions `g₁(t)=t·e^{t²−1}` et `g₂(t)=sin(π/2 · t)` ont le même polynôme d'interpolation aux points `x₀=−1, x₁=0, x₂=1`. Déterminer ce polynôme.
2. Soit la formule de quadrature suivante :
   ```
   ∫₋₁¹ t·g(t)dt = a₁g(−1) + a₂g(1) + E(g)
   ```
   - a. Déterminer les coefficients `a₁` et `a₂` pour que la formule de quadrature soit d'ordre le plus élevé possible.
   - b. Déterminer l'ordre exact de cette formule.
   - c. Montrer qu'il existe `μ ∈ ]−1,1[` tel que `E(g) = −2/45 · g⁽³⁾(μ)`.

<details>
<summary>Correction</summary>

**1.a.** `P` est de degré 2. Erreur d'interpolation : `|E(f)| ≤ |πₙ(x)|/(n+1)! · max_{[a,b]} |f⁽ⁿ⁺¹⁾(x)|`.

Table des différences divisées aux points `−1, 0, 1` :
```
   -1     0     1
1        1     1
        1     0
1(1)          -1/2
```
`(n+1)π(x)(x±1) → P₂(x) = −1+1+x = x`

**1.b.** `g₁(−1) = g₂(−1) = −1`, `g₁(0)=g₂(0)=0`, `g₁(1)=g₂(1)=1`. Donc `g₁` et `g₂` ont le même polynôme d'interpolation aux points `−1,0,1` : **`P(x) = x`**.

**2.a.** `∫₋₁¹ t dt = [t²/2]₋₁¹ = 0 = a₁+a₂`, `∫₋₁¹ t² dt = [t³/3]₋₁¹ = 2/3 = −a₁+a₂`. On résout : `a₁ = −1/3`, `a₂ = 1/3`.

**2.b.** `∫₋₁¹ t³ dt = 0 = a₁+a₂` ✓. `∫₋₁¹ t⁴ dt = [t⁵/5]₋₁¹ = 2/5 ≠ −a₁+a₂ = 2/3`. Donc **l'ordre de la méthode est 2**.

**2.c.** `E(g) = ∫f(t)dt − ∫P(t)dt = ∫₋₁¹ [t²(t²−1)/6] g⁽³⁾(ξₜ) dt`, où `t²(t²−1) ≤ 0` sur `[−1,1]`. Par la formule de la moyenne :
```
E(g) = g⁽³⁾(μ)/6 · ∫₋₁¹ t²(t²−1)dt = g⁽³⁾(μ)/6 · (1/5 − 1/3 + [autres termes]) = −2/45 · g⁽³⁾(μ)
```

</details>

## Partie C — Symétrie du polynôme d'interpolation

**Exercice 1**

1. Montrer que les fonctions `g₁(x) = sin(π/2 · x)` et `g₂(x) = x` ont le même polynôme d'interpolation aux points `x₀=−1, x₁=0, x₂=1`, **sans le calculer**.
2. Donner ce polynôme.
3. On veut à présent interpoler la fonction `g₁` aux points `−1/2, −1, 0, 1` et `1/2` par un polynôme qu'on notera `Q`. Déduire de 2) ce polynôme d'interpolation. Que remarquez-vous ?
4. Énoncez une propriété générale sur les polynômes d'interpolation basée sur les résultats de 2) et 3).

<details>
<summary>Correction</summary>

**1.** `g₁(xᵢ) = g₂(xᵢ)` pour `i=0,1,2` (à savoir `g₁(−1)=−1, g₁(0)=0, g₁(1)=1`, identique pour `g₂`).

**2.** `g₂(x)=x` est un polynôme de degré ≤ 2 tel que `g₂(xᵢ)=g₁(xᵢ)`, donc `g₂` est le polynôme d'interpolation de `g₁` en `xᵢ`, `i=0,1,2`.

**3.** `Q(x) = g₁(x) + (x−x₀)(x−x₁)(x−x₂)·g₁[x₀,x₁,x₂,x₃] + (x−x₀)(x−x₁)(x−x₂)(x−x₃)·g₁[x₀,x₁,x₂,x₃,x₄]`, avec `x₃=−1/2` et `x₄=1/2`.
```
Q(x) = g₁(x) + (x−1)x(x+1)·((4−4√2)/3) + 0
     = ((4−4√2)/3)x³ − ((1−4√2)/3)x
```

**4.** Le polynôme d'interpolation d'une fonction **impaire**, en des points symétriques par rapport à 0, est **impair**.

</details>

## Partie D — Application aux exercices d'examen (2020-2021)

**Exercice 4 (Examen 2019)**

On cherche à déterminer une valeur approchée de `I = ∫₋₁¹ f(t)dt` sous la forme `J = α₀f(−1/2) + α₁f(0) + α₂f(1/2)`.

1. La formule de quadrature est : `∫₋₁¹ f(t)dt ≈ (4/3)f(−1/2) − (4/3)f(0) + (4/3)f(1/2)`, `N=3`.
2. En utilisant un changement de variable affine pour se ramener à une intégrale de `−1` à `1` : `t = ((b−a)/2)x + (b+a)/2`.
3. Application : `I = ∫₀¹ sinπt/(t(1−t))^{3/2} dt ≈ 8.945723` *(à vérifier)*.
4. Formule de Gauss appropriée à 3 points : `I = ∫₀¹ sinπt/(t(1−t))^{3/2} dt`. Changement de variable vers `[−1,1]` : `x=2t−1`, donne `I = 16∫₋₁¹ sin(π/2(x+1))/(1−x²) · dx/√(1−x²)`. Formule de Tchebychev à 3 points : `I ≅ (16π/3)[f(−√3/2)+f(0)+f(√3/2)]`, ordre N=5 : on utilise aussi 3 points et un ordre plus grand, on obtient une meilleure précision.

**Exercice 5**

Soit `α = √(3/5)`, `ω₁=ω₃=5/9` et `ω₂=8/9` — la **formule de Gauss-Legendre à 3 points**, exacte pour les polynômes de degré au plus 5. En choisissant `α=1`, on retrouve la **formule de Simpson**.

**Exercice 6 (Examen 2018/2019)**

Formule à `n+1=2` points. Les nœuds sont les racines de `L₂(x)=−x²−4x+2` : `x₀=√2−2, x₁=−√2+2`. `λ₀=(2+√2)/4, λ₁=(2−√2)/4`.

`E(f) = (∫₀^{+∞} L₂(x)²e^{−x}dx) · f⁽⁴⁾(ξ)/4!`, `ξ∈]1,+∞[`. `L₂(x)²=x⁴+8x³+12x²−16x+4`. Par intégration par parties, `E(f)=(84/24)f⁽⁴⁾(ξ)`.

`I = ∫₀^{+∞} eˣ/(1+x³)·e^{−x}dx ≅ 0.594`.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/mn-serie-exercices-interpolation-quadrature.pdf" />

</TabItem>
</Tabs>
