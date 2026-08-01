---
sidebar_position: 2
title: TD2 - Intégration Numérique (avec corrigé)
sidebar_label: TD2 - Intégration numérique
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD2 : Intégration numérique

*ENSI — A.U. 2025-2026 (corrigé A.U. 2020-2021)*

## Exercice 1

Soit `g: [a,b] → ℝ` une fonction de classe `C²([a,b])`. On considère la formule de quadrature :

```
(1)   ∫ₐᵇ g(t) dt = α·g(a) + (b−a)²/2 · g'(b) + E(g)
```

où `α` est un paramètre réel.

1. Déterminer le réel `α` pour que la formule (1) soit exacte pour les polynômes constants.
2. Pour la valeur de `α` trouvée, montrer que la formule de quadrature (1) est exacte pour tout polynôme de degré inférieur ou égal à 1.
3. Déterminer l'ordre de cette formule.

<details>
<summary>Correction</summary>

1. La formule (1) est exacte pour les polynômes constants si `b − a = α`.

2. Pour que la formule de quadrature (1) soit exacte pour tout polynôme de degré ≤ 1, il suffit de montrer que :
   ```
   ∫ₐᵇ t dt = α·a + (b−a)²/2
   ```
   car la formule est déjà exacte pour les constantes. Or `∫ₐᵇ t dt = (b²−a²)/2` et `α·a + (b−a)²/2 = (b−a)a + (b−a)²/2 = (b²−a²)/2`. D'où `E(t) = 0`.

3. On a l'ordre `N ≥ 1`.
   ```
   E(t²) = (b³−a³)/3 − (b−a)a² − (b−a)²/2 · 2b = −(2/3)b³ + termes en bᵏ, k≤2
   ```
   Donc `E(t²) ≠ 0`, **N = 1**.

</details>

## Exercice 2

Soit `g` une fonction de classe `C³` sur `[−1,1]`. On se donne la formule d'intégration numérique :

```
(2)   ∫₋₁¹ t·g(t) dt = α·g(−1) + β·g(1) + E(g)
```

1. Calculer `α` et `β` pour que la formule (2) soit de degré le plus élevé possible.
2. Déterminer l'ordre de cette formule.
3. Montrer qu'il existe `η ∈ [−1,1]` tel que `E(g) = −2/45 · g⁽³⁾(η)`. On pourra considérer le polynôme d'interpolation de Lagrange de la fonction `g` aux points −1, 0, 1.
4. Déduire de la formule (2), une formule de quadrature pour le calcul de `∫ₐᵇ (x − (a+b)/2) f(x) dx`, où `f` est une fonction de classe `C³` sur `[a,b]`.

<details>
<summary>Correction</summary>

1. `E(1) = 0` donc `0 = α + β`. `E(t) = 0` donc `2/3 = −α + β`, d'où `α = −1/3`, `β = 1/3`.

2. `E(t²) = 0` et `E(t³) = −4/15 ≠ 0`. Donc **N = 2**.

3. Le polynôme d'interpolation de Lagrange `p` de la fonction `g` aux points −1, 0, 1 est de degré ≤ 2 donc `E(p) = 0` :
   ```
   E(p) = ∫₋₁¹ t·p(t) dt + (1/3)p(−1) − (1/3)p(1) = 0
   ```
   Donc `∫₋₁¹ t·p(t) dt = −(1/3)p(−1) + (1/3)p(1) = −(1/3)g(−1) + (1/3)g(1)`.

   Donc `E(g) = ∫₋₁¹ t·g(t)dt − ∫₋₁¹ t·p(t)dt = ∫₋₁¹ t(g(t)−p(t)) dt = ∫₋₁¹ t · [g⁽³⁾(ξₜ)/3! · t(t²−1)] dt`, `ξₜ ∈ ]−1,1[`.

   La fonction `t²(t²−1) ≤ 0` sur `[−1,1]`, la formule de la moyenne implique :
   ```
   E(g) = g⁽³⁾(η)/3! · ∫₋₁¹ t²(t²−1) dt = g⁽³⁾(η)/3! · (2/5 − 2/3) = −2/45 · g⁽³⁾(η)
   ```

4. Le changement de variable `x = (b−a)/2 · t + (a+b)/2` donne :
   ```
   J = ∫ₐᵇ (x − (a+b)/2) f(x) dx
     = ∫₋₁¹ ((b−a)/2 · t) f((b−a)/2 · t + (a+b)/2) · (b−a)/2 dt
     = ((b−a)/2)² · (−(1/3)f(a) + (1/3)f(b)) − (2/45)((b−a)/2)⁵ f⁽³⁾(ξ)
   ```
   où `ξ = (b−a)/2 · η + (a+b)/2 ∈ [a,b]`.

</details>

## Exercice 3

On considère l'intégrale :

```
I = ∫₁² 1/x dx
```

1. Calculer la valeur exacte de `I`.
2. Évaluer numériquement cette intégrale par la méthode des trapèzes avec `k = 3` sous-intervalles.
3. Pourquoi la valeur numérique obtenue en (2.) est-elle supérieure à `ln(2)` ? Est-ce vrai quel que soit `k` ? Justifier votre réponse.
4. Quel nombre de sous-intervalles `k` faut-il choisir pour avoir une erreur inférieure à `10⁻⁴` ?

<details>
<summary>Correction</summary>

1. Une primitive de `1/x` est `F(x) = ln(x)`. La valeur exacte est alors `I = [ln(x)]₁² = ln(2)`.

2. La méthode des trapèzes composite à `m+1` points pour calculer l'intégrale d'une fonction `f` sur `[a,b]` s'écrit :
   ```
   ∫ₐᵇ f(t)dt ≈ h · (½f(a) + Σᵢ₌₁^{m-1} f(a+ih) + ½f(b))    avec h = (b−a)/m
   ```
   Ici on a `f(x)=1/x`, `a=1, b=2, m=3` d'où `h=1/3` et on obtient :
   ```
   I ≈ (1/3)(½f(1) + f(1+1/3) + f(1+2/3) + ½f(2)) = (1/3)(1/2 + 3/4 + 3/5 + 1/4) = 21/30 = 0.7
   ```

3. La valeur numérique obtenue est supérieure à `ln(2)` car la fonction `f(x)=1/x` est **convexe**. On peut se convaincre à l'aide d'un dessin que les trapèzes sont au-dessus de la courbe `y=1/x`, l'aire sous les trapèzes sera donc supérieure à l'aire sous la courbe. Cela reste vrai quel que soit le pas `h` choisi car la fonction est convexe, ce qui signifie qu'une corde définie par deux points de la courbe `y=1/x` sera toujours au-dessus de la courbe, et par le raisonnement précédant l'aire sous les trapèzes sera toujours supérieure à l'aire exacte.

4. L'erreur est majorée par :
   ```
   |Eₘ| ≤ (b−a)³/(12m²) · sup_{ξ∈]a,b[} |f''(ξ)|
   ```
   Ici `f(x)=1/x`, `f'(x)=−1/x²` et `f''(x)=2/x³`, ainsi :
   ```
   |Eₘ| ≤ 1/(12m²) · max_{ξ∈[1,2]} 2/ξ³ = 1/(6m²)
   ```
   Pour que `|Eₘ| < 10⁻⁴` il suffit que `1/(6m²) < 10⁻⁴`, i.e. `m > 10²/√6 ≈ 40.8`. **À partir de 41 sous-intervalles**, l'erreur de quadrature est inférieure à `10⁻⁴`.

</details>

## Exercice 4

On cherche à déterminer une valeur approchée de `I = ∫₋₁¹ f(t) dt` sous la forme :

```
J = α₀·f(−1/2) + α₁·f(0) + α₂·f(1/2)
```

1. Trouver les coefficients `α₀, α₁, α₂` pour que la formule soit exacte pour les polynômes de degré inférieur ou égal à 2. Quel est son ordre ?
2. Déduire une approximation de `I = ∫ₐᵇ f(t) dt` faisant intervenir `f((3a+b)/4)`, `f((a+b)/2)` et `f((a+3b)/4)`.
3. Donner une valeur approchée de `I = ∫₀¹ sin(πt) / (t(1−t))^{3/2} dt`.
4. Même question que 3) en utilisant une formule de Gauss appropriée à 3 points. Quel est son ordre ? Conclure.

<details>
<summary>Correction</summary>

1. La formule de quadrature est : `∫₋₁¹ f(t) dt ≈ (4/3)f(−1/2) − (2/3)f(0) + (4/3)f(1/2)`, d'ordre **N = 3**.

2. On utilise un changement de variable affine pour se ramener à une intégrale de −1 à 1 : `t = (b−a)/2 · x + (b+a)/2`.
   ```
   ∫ₐᵇ f(t)dt = (b−a)/2 · ∫₋₁¹ f((b−a)/2 · x + (b+a)/2) dx
   ```

3. Application : `I = ∫₀¹ sinπt/(t(1−t))^{3/2} dt`, avec les points `0, 1/4, 1/2, 3/4, 1`. On obtient :
   ```
   I ≈ (1/3)[2f(1/4) − f(1/2) + 8f(3/4)]  ≈ 8.945723 (à vérifier)
   ```

4. Formule de Gauss appropriée à 3 points : `I = ∫₀¹ sinπt / (t(1−t))^{3/2} dt`. Changement de variable vers `[−1,1]` : `x = 2t−1`, donne `I = 16∫₋₁¹ sin(π/2(x+1))/(1−x²) · dx/√(1−x²)`.

   Formule de Tchebychev à 3 points :
   ```
   I ≅ (16π/3)[f(−√3/2) + f(0) + f(√3/2)]     avec f(x) = sin(π/2(x+1))/(1−x²)
   ```
   Ordre N=5 : on utilise aussi 3 points mais un ordre plus grand, on obtient une meilleure précision.

</details>

## Exercice 5

Soit `0 < α ≤ 1` un nombre réel donné et soit `ω₀, ω₁, ω₂` trois nombres réels. Considérons la formule de quadrature :

```
∫₋₁¹ f(t) dt = ω₀·f(−α) + ω₁·f(0) + ω₂·f(α)
```

1. Calculer `α, ω₀, ω₁, ω₂` pour que l'ordre de la formule soit égal à 5.
2. Quelle est cette formule ? Justifier.
3. À l'aide d'un changement de variable affine, en déduire une formule de quadrature pour l'intégrale `∫_{xᵢ}^{xᵢ₊₁} f(x) dx`.
4. Soit `h = (b−a)/n` et `xᵢ = a+ih` pour `i=0,...,n`. On subdivise l'intervalle `[a,b]` en `n` sous-intervalles `[xᵢ,xᵢ₊₁]` de largeur `h`. En déduire la formule de quadrature composée pour le calcul approché de `∫ₐᵇ f(t) dt`.
5. Écrire l'algorithme associé à cette formule de quadrature.

<details>
<summary>Correction</summary>

1. En imposant l'exactitude pour `pₖ(x)=xᵏ`, `k=0,...,6` (table des moments `∫₋₁¹ pₖ(x)dx`), on obtient par symétrie `ω₂=ω₀`, puis en résolvant :
   ```
   ω₁ = 2 − 2ω₀,   ω₀ = ω₂ = 1/(3α²),   ω₁ = 2 − 2/(3α²)
   ```
   L'exactitude sur `x⁴` impose `α = √(3/5)`, d'où `ω₀ = ω₂ = 5/9` et `ω₁ = 8/9`.

2. Si `α = √(3/5)`, `ω₁=ω₃=5/9` et `ω₂=8/9`, alors la formule est exacte pour les polynômes de degré au plus 5 (il s'agit de la **formule de Gauss-Legendre à 3 points**). Remarquons que si on choisit `α=1` on retrouve la formule de Simpson.

3. Soit `x = mt+q`, alors `∫_{xᵢ}^{xᵢ₊₁} f(x)dx = m∫₋₁¹ f(mt+q)dt` avec `xᵢ=−m+q`, `xᵢ₊₁=m+q`, d'où le changement de variable `x = xᵢ + (t+1)(xᵢ₊₁−xᵢ)/2`. On déduit la formule de quadrature (exacte sur l'espace des polynômes de degré au plus 5) :
   ```
   ∫_{xᵢ}^{xᵢ₊₁} f(x)dx ≈ (xᵢ₊₁−xᵢ)/18 · [5f(xᵢ+(1−√(3/5))(xᵢ₊₁−xᵢ)/2) + 8f((xᵢ₊₁+xᵢ)/2) + 5f(xᵢ+(1+√(3/5))(xᵢ₊₁−xᵢ)/2)]
   ```

4. `h=(b−a)/n = xᵢ₊₁−xᵢ` pour `i=0,...,n`. On subdivise `[a,b]` en `n` intervalles `[xᵢ,xᵢ₊₁]` de largeur `h`. On trouve ainsi la formule de quadrature composée :
   ```
   ∫ₐᵇ f(x)dx ≈ (h/18) Σᵢ₌₀^{n-1} [5f(a+(i+1−√(3/5))h) + 8f(a+(i+½)h) + 5f(a+(i+1+√(3/5))h)]
   ```

5. Algorithme du calcul associé à cette formule de quadrature :
   ```
   Require: a; b>a; n>0; f: [a,b] → ℝ
   h ← (b−a)/n
   c₁ ← a + (1−√(3/5))h
   c₂ ← a + ½h
   c₃ ← a + (1+√(3/5))h
   s ← 0
   for i = 0 to n−1 do
       s ← s + 5f(c₁+ih) + 8f(c₂+ih) + 5f(c₃+ih)
   end for
   return (h/18)·s
   ```

</details>

## Exercice 6

1. Donner une formule d'intégration numérique d'ordre 3 pour l'intégrale `∫₀^{+∞} f(x)e^{−x} dx` (où `f` est une fonction réelle telle que `∫₀^{+∞} f(x)e^{−x} dx` est finie).
2. Donner l'erreur sur cette formule.
3. On considère l'intégrale `I = ∫₀^{+∞} 1/(1+x³) dx`. Estimer la valeur de l'intégrale `I` par la méthode de Gauss-Laguerre d'ordre 3.
4. Donner une majoration de l'erreur commise.

<details>
<summary>Correction</summary>

*Extrait de l'examen 2018/2019 : formule à n+1 = 2 points.*

Les nœuds de la formule sont les racines de `L₂(x) = −x²−4x+2`, soit `x₀ = √2−2`, `x₁ = −√2+2`.
```
λ₀ = ∫₀^{+∞} l₀(x)e^{−x} dx    λ₁ = ∫₀^{+∞} l₁(x)e^{−x} dx
```
calculés soit par intégration par parties, soit en utilisant que `x = l₀(x) − l₁(x)` et l'orthogonalité des `Lᵢ`, `i=0,1` :
```
λ₀ = (2+√2)/4     λ₁ = (2−√2)/4
```

2. `E(f) = (∫₀^{+∞} L₂(x)² e^{−x} dx) · f⁽⁴⁾(ξ)/4!`, `ξ ∈ ]1,+∞[`. `L₂(x)² = x⁴+8x³+12x²−16x+4`. Par intégration par parties, `E(f) = (84/24) f⁽⁴⁾(ξ)`.

3. `I = ∫₀^{+∞} eˣ/(1+x³) · e^{−x} dx ≅ 0.594` (avec `f(x) = eˣ/(1+x³)`).

4. Calculer `f'(x), f''(x), ..., f⁽⁴⁾(x)` et remplacer dans la formule 2).

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<p><strong>Sujet</strong></p>
<PdfViewer file="/pdfs/mn-td2-integration-numerique.pdf" />

<p><strong>Correction</strong></p>
<PdfViewer file="/pdfs/mn-td2-integration-numerique-correction.pdf" />

</TabItem>
</Tabs>
