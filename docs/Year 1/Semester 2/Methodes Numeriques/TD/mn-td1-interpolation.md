---
sidebar_position: 1
title: TD1 - Interpolation Polynomiale (avec corrigé)
sidebar_label: TD1 - Interpolation
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD1 : Interpolation Polynômiale

*ENSI — A.U. 2025-2026*

## Exercice 1 (Identification)

On considère `x,y ∈ ℝ⁴` donnés par `x = [−2, 0, 1, 2]` et `y = [4, 0, 0, 4]`. Parmi les polynômes suivants, lequel est le polynôme d'interpolation `P` aux points x, y (justifiez votre réponse) ?

1. `P₁(x) = x⁴ − (2/3)x³ − 3x² + (8/3)x`
2. `P₂(x) = (4/3)x² − 4/3`
3. `P₃(x) = (1/3)x³ + x² − (4/3)x`

<details>
<summary>Correction</summary>

On ne demande pas ici de calculer le polynôme mais de l'identifier, via la caractérisation équivalente (liée à l'unicité) du polynôme d'interpolation de Lagrange :

```
P pol. d'interp. de Lagrange associé à x,y
⟺ (deg(P) ≤ 3, P(−2)=4, P(0)=0, P(1)=0, P(2)=4)
```

Il suffit de trouver le polynôme qui satisfait toutes ces propriétés (existence et unicité garanties par le théorème du cours). `P₁` est de degré 4 → éliminé. `P₂` a un terme constant non nul, donc `P₂(0) ≠ 0` → éliminé. Reste `P₃`, on vérifie qu'il convient : c'est donc lui.

</details>

## Exercice 2 (Construction... Malin ou bourrin ?)

Calculer les polynômes d'interpolation de Lagrange aux points suivants :

**a.** `x = [−1, 2, 3]` et `y = [4, 4, 8]`

<details>
<summary>Correction</summary>

On calcule la base de Lagrange associée à x :

```
L₀(X) = 1/12 (X−2)(X−3)
L₁(X) = −1/3 (X+1)(X−3)
L₂(X) = 1/4 (X+1)(X−2)
```

et alors `Pₐ(X) = 4L₀(X) + 4L₁(X) + 8L₂(X)`.

**IMPORTANT** : il n'est pas demandé/nécessaire/souhaitable de développer les polynômes de la base de Lagrange ni même de développer `Pₐ` — vous allez ajouter des erreurs et le résultat final sera faux.

</details>

**b.** `x = [−2, −1, 0, 1]` et `y = [0, −2, −4, 0]`

<details>
<summary>Correction</summary>

On voit que le polynôme a 2 racines : −2 et 1. Il peut donc être factorisé par `(X+2)(X−1)`, c'est-à-dire qu'il existe un polynôme `Q` tel que `P_b(X) = Q(X)(X+2)(X−1)`. Comme `deg(P_b) ≤ 3`, nécessairement `Q` est de degré ≤ 1 : `Q(X) = aX + b`.

On cherche `a` et `b` en utilisant les autres valeurs : `P_b(−1) = −2`, `P_b(0) = −4`, ce qui équivaut à :

```
{ −2(−a+b) = −2
{ −2b = −4
```

ce qui donne `b=2`, `a=1`, soit `P_b(X) = (X+2)²(X−1)`. On vérifie a posteriori que `P_b` convient bien.

</details>

**c.** `x = [−1, 0, 1, 2]` et `y = [6, 2, 0, 0]`

<details>
<summary>Correction</summary>

Même méthode, en remarquant que 1 et 2 sont racines de `P_c`. On obtient par le même raisonnement :

```
P_c(X) = −(X−2)(X−1) · (aX+b)
```

qui se résout en `P_c(X) = −(X−2)(X−1)(X+3)`.

**Remarque** : on peut évidemment calculer `P_b` et `P_c` en calculant les polynômes de degré 3 de la base de Lagrange, mais il n'est pas nécessaire de calculer TOUS les polynômes de la base : seuls les polynômes où `P` ne s'annule pas sont utiles.

</details>

**d.** `x = [−1, 0, 1]` et `y = [1, 0, 1]`

<details>
<summary>Correction</summary>

Un simple coup d'œil permet de constater que `X²` convient, par unicité, on sait donc que `P_d(X) = X²`.

</details>

**e.** `x = [−3, −1, 2, 10]` et `y = [−3, −1, 2, 10]`

<details>
<summary>Correction</summary>

Encore plus simple que précédemment, ici `P_e(X) = X`.

</details>

## Exercice 3 (Utilisation de la caractérisation)

Soit `P` un polynôme. Montrer que son polynôme d'interpolation aux nœuds `xᵢ ∈ ℝ, 0 ≤ i ≤ n` est le reste de la division euclidienne de `P` par le polynôme `πₙ(x) = (x−x₀)(x−x₁)...(x−xₙ)`.

<details>
<summary>Correction</summary>

On doit démontrer que le reste de la division euclidienne de `P` par `πₙ` (appelons-le `R`) est LE polynôme d'interpolation de `P` aux nœuds `xᵢ`, `i=1...n`, c'est-à-dire, en utilisant la caractérisation :

```
deg(R) ≤ n,    ∀i=1...n, R(xᵢ) = P(xᵢ)
```

Rappelons comment est défini `R` : `deg(R) < deg(πₙ) = n+1`, et il existe un polynôme `Q` tel que `P(X) = Q(X)πₙ(X) + R(X)` — c'est la définition du reste de la division euclidienne de `P` par `πₙ`.

On sait donc que `deg(R) ≤ n`. Maintenant, on évalue `P(xᵢ)` pour tout `i` :

```
P(xᵢ) = Q(xᵢ)πₙ(xᵢ) + R(xᵢ)
```

Or, la définition de `πₙ` dit que pour tout `i`, `πₙ(xᵢ) = 0`. On a donc bien `P(xᵢ) = R(xᵢ)` pour tout `i` et la preuve est finie !

</details>

## Exercice 4 (Construction...)

Calculer le polynôme `P` de degré inférieur ou égal à 4 tel que :

**1.** `P(−2)=11, P(−1)=1, P(0)=1, P(1)=5, P(2)=31`

<details>
<summary>Correction</summary>

À moins d'avoir envie de calculer l'inverse d'une matrice de Vandermonde de taille 5 ou de calculer les 5 polynômes de la base de Lagrange associée à ces nœuds, le mieux est ici d'utiliser la **base de Newton**. En faisant le tableau des différences divisées, on obtient :

```
P(X) = 11 − 10(X+2) + 5(X+2)(X+1) + (X+2)(X+1)X + ½(X+2)(X+1)X(X−1)
```

</details>

**2.** En remarquant que le polynôme cherché admet une racine simple en 0 et une racine double en 1, calculer le polynôme `P` de degré ≤ 4 tel que : `P(−1)=4, P'(−1)=−4, P(0)=0, P(1)=0, P'(1)=0`.

<details>
<summary>Correction</summary>

Cet exercice est un peu différent puisqu'il ne s'agit pas d'interpolation de Lagrange classique : on impose aussi des valeurs aux **dérivées** de `P` aux nœuds d'interpolation.

Deux méthodes sont envisageables : la méthode « bourrin » (chercher `P` sous forme indéterminée et écrire les 5 équations vérifiées par ses coefficients — système linéaire de taille 5) et la méthode « malin ».

On remarque que le polynôme cherché a le bon goût d'avoir une racine simple : 0, et une racine double : 1 (c'est-à-dire que `P` ET `P'` s'annulent en 1). On peut donc le factoriser par `X(X−1)²` et le chercher (puisqu'il est de degré ≤ 4) sous la forme :

```
P(X) = X(X−1)²(aX+b)
```

Il ne reste plus qu'à chercher `a` et `b` en utilisant les valeurs de `P` et `P'` en −1. On obtient après calcul :

```
{ a − b = 1
{ 3a + 2b = −1
```

ce qui donne `a = 4/5`, `b = −1/5`, et donc finalement `P(X) = (1/5)X(X−1)²(4X−1)`.

</details>

## Exercice 5

**1°)** En utilisant la méthode de Newton pour `f(x) = 1/(1+x)`, aux points `x₀=0, x₁=1, x₂=2` :

<details>
<summary>Correction</summary>

Table des différences divisées (base de Newton) :

```
     0     1     2
1    1    1/2   1/3
x         -1/2  -1/3
x(x-1)          1/6
```

`P₂(x) = 1 − ½x + (1/6)x(x−1)`

Vérification : `P₂(0)=1`, `P₂(1)=1/2`, `P₂(2)=1/3` — OK !

</details>

**2°)** En rajoutant le point `x₃ = 3` :

<details>
<summary>Correction</summary>

On récupère le tableau du 1°) et on rajoute une ligne et une colonne :

```
     0     1     2     3
1    1    1/2   1/3   1/4
x         -1/2  -1/3  -1/4
x(x-1)          1/6   1/8
x(x-1)(x-2)           -1/24
```

`P₃(x) = 1 − ½x + (1/6)x(x−1) − (1/24)x(x−1)(x−2)`

Vérification : `P₃(0)=1, P₃(1)=1/2, P₃(2)=1/3, P₃(3)=1/4` — OK !

</details>

## Exercice 6 (Examen 2016) — *Exercice optionnel, pour aller plus loin*

Soient `x₀ = 0 < x₁ < ... < xₙ` et des réels donnés `yᵢ`, `0 ≤ i ≤ n`. On considère le polynôme d'interpolation satisfaisant `P(x₀)=y₀`, `P(−xᵢ)=P(xᵢ)=yᵢ` pour `1 ≤ i ≤ n`.

**1.** Montrer que le polynôme `P` est pair.

<details>
<summary>Correction</summary>

Cette question est un peu moins classique que le reste du TD. On note `x₋ᵢ = −xᵢ`. On a donc `2n+1` nœuds : `x₋ᵢ, xᵢ` pour `i=1...n` et 0. Le polynôme cherché est donc de degré ≤ 2n.

`P` n'est pas forcément de degré `2n`. De plus, être de degré pair n'entraîne pas que `P` soit pair (par exemple `X²+X+1` n'est ni pair ni impair). Pour être pair, `P` doit être une **somme de polynômes pairs**.

Cas `n=1` : trois points `0, x₁, −x₁`. Base de Lagrange :

```
L₀(X) = −1/x₁² (X−x₁)(X+x₁) = −1/x₁² (X²−x₁²)
L₁(X) = 1/(2x₁²) X(X+x₁)
L₋₁(X) = 1/(2x₁²) X(X−x₁)
```

`P(X) = y₀L₀(X) + y₁(L₁(X)+L₋₁(X))`. On constate que `L₀` est pair, et `L₁(X)+L₋₁(X) = X²/x₁²` est pair (car `y₋₁=y₁`). `P` est donc somme de deux polynômes pairs : il est pair.

**Cas général `n ≥ 1`** : par un calcul similaire en 3 étapes (calcul de `L₀`, calcul de `Lₖ` et `L₋ₖ` pour chaque `k`, puis assemblage), on montre que `L₀(X) = ∏ᵢ (X²−xᵢ²)/(−xᵢ²)` est pair, et que `Lₖ(X)+L₋ₖ(X)` est également pair pour tout `k`. `P` étant somme de polynômes pairs, il est pair.

</details>

**2.** En déduire, avec un minimum de calculs, le polynôme d'interpolation vérifiant `P(−1)=2, P(0)=4, P(1)=2`.

<details>
<summary>Correction</summary>

En utilisant le résultat de la question précédente (cas à 3 points, `x₁=1`, `y₀=4`, `y₁=2`) :

```
P(X) = −y₀/x₁² (X²−x₁²) + y₁/x₁² X² = −4(X²−1) + 2X² = −2X² + 4
```

On vérifie bien que `P` est pair et qu'il convient.

</details>

## Exercice 7

Le polynôme de Lagrange est de degré 4 : `P₄(x) = Σₖ₌₀⁴ f(xₖ)Lₖ(x)`, avec les 5 nœuds équirépartis `x₀=−2, x₁=−1, x₂=0, x₃=1, x₄=2`.

<details>
<summary>Correction</summary>

```
L₀(x) = (1/24)x(x+1)(x−1)(x−2)
L₁(x) = −(1/8)x(x+2)(x−1)(x−2)
L₂(x) = (1/4)(x+2)(x+1)(x−1)(x−2)
L₃(x) = −(1/6)x(x+2)(x+1)(x−2)
L₄(x) = (1/24)x(x+2)(x+1)(x−1)
```

On obtient finalement `P₄(x) = (1/10)x⁴ − (3/5)x² + 1`.

**Calcul de l'erreur théorique**, donnée par `E(x) = f(x) − Pₙ(x) = γₙ₊₁(x)/(n+1)! · f⁽ⁿ⁺¹⁾(ξₓ)`, majorée par `|E(x)| ≤ |γₙ₊₁(x)|/(n+1)! · Mₙ₊₁` où `γₙ₊₁(x) = ∏ₖ(x−xₖ)` et `Mₙ₊₁ = maxₜ|f⁽ⁿ⁺¹⁾(t)|`.

Ici, `γ₅(x) = x(x²−1)(x²−4)`. Un calcul (assez long) donne `f⁽⁵⁾(x) = −240x(3−10x²+3x⁴)/(1+x²)⁶`, d'où `M₅ = 100`. Finalement :

```
|E(x)| ≤ |x(x²−1)(x²−4)| · 100/5! = |x(x²−1)(x²−4)| · 5/6
```

</details>

## Exercice 8

**1°)** `E(f) = Pₙ(x) − f(x)`, avec `sin⁽ⁿ⁺¹⁾(ξ) ≤ 1` :

<details>
<summary>Correction</summary>

```
|Pₙ(x)−f(x)| ≤ |πₙ₊₁(x)| |sin⁽ⁿ⁺¹⁾(ξ)| / (n+1)! ≤ |πₙ₊₁(x)| / (n+1)!
```

Comme `πₙ₊₁(x) = (x−x₀)(x−x₁)...(x−xₙ)`, chaque terme est majoré par `(b−a)`, donc `|πₙ₊₁(x)| ≤ (b−a)^{n+1}`, ce qui donne `|Pₙ(x)−f(x)| ≤ (b−a)^{n+1}/(n+1)!`.

</details>

**2°)** En utilisant la formule de Stirling `n! ~ (n/e)ⁿ√(2πn)`, montrer que le majorant tend vers 0.

<details>
<summary>Correction</summary>

Puisque `n!/((n/e)ⁿ√(2πn)) → k > 0`, il existe toujours un réel positif `C` tel que :

```
(b−a)^{n+1}/(n+1)! ≤ C · ((b−a)/(n+1))^{n+1} · e^{n+1}/√(2π(n+1))
```

d'où `sup_{[a,b]} |Pₙ(x)−sin(x)| →_{n→∞} 0`.

</details>

## Exercice 9 (Convergence uniforme)

On considère `a=x₀<x₁<...<xₙ=b` et le polynôme d'interpolation `Pₙ` tel que `Pₙ(xᵢ)=eˣⁱ` pour tout `i`. Montrer que `Pₙ` converge uniformément vers `eˣ` sur `[a,b]`.

<details>
<summary>Correction</summary>

Pas besoin ici de connaître quoi que ce soit sur la convergence uniforme en général. On demande juste de montrer que `sup_{x∈[a,b]} |Pₙ(x)−eˣ| →_{n→∞} 0`.

On utilise la seule formule du cours donnant une estimation entre un polynôme d'interpolation et sa fonction : `∀x∈[a,b], |Pₙ(x)−f(x)| ≤ ‖f⁽ⁿ⁺¹⁾‖_{∞,[a,b]}/(n+1)! · |π_{x₀,...,xₙ}(x)|`, où `π_{x₀,...,xₙ}(X) = ∏ᵢ(X−xᵢ)`.

Pour la fonction exponentielle, on connaît les dérivées successives : c'est elle-même. Donc `‖f⁽ⁿ⁺¹⁾‖_{∞,[a,b]} = e^b`. On a de plus (estimation générale, même si souvent très mauvaise) `sup_{x∈[a,b]} |Π_{x₀,...,xₙ}(x)| ≤ (b−a)^{n+1}`.

Finalement :

```
sup_{x∈[a,b]} |Pₙ(x)−f(x)| ≤ e^b · (b−a)^{n+1}/(n+1)! →_{n→∞} 0
```

</details>

## Exercice 10

Soient les trois points `(0,0)`, `(1,1)`, `(2,8)` de la fonction `f(x) = x³`.

**a.** Obtenir le système linéaire de dimension 3 permettant de calculer la spline cubique naturelle passant par ces trois points.

<details>
<summary>Correction</summary>

On a 4 conditions (ce qui suggère un polynôme de degré 3). Puisque `p(x) = a₀+a₁x+a₂x²+a₃x³` et `p'(x) = a₁+2a₂x+3a₃x²`, les 4 conditions se traduisent par... *(voir spline naturelle, système général ci-dessous)*.

Le polynôme sur chaque intervalle s'écrit `pᵢ(x) = fᵢ + f'ᵢ(x−xᵢ) + f''ᵢ/2!·(x−xᵢ)² + f'''ᵢ/3!·(x−xᵢ)³`. Puisqu'on veut la spline naturelle, on doit avoir `f''₀=f''₂=0`. Par la suite, on doit avoir :

```
h₀/(h₀+h₁) f''₀ + 2f''₁ + h₁/(h₀+h₁) f''₂ = 6f[x₀,x₁,x₂]
```

et comme `hᵢ = h = 1` :

```
½f''₀ + 2f''₁ + ½f''₂ = 6f[x₀,x₁,x₂]
```

Pour 3 points, on obtient un système 3×3. La table de différences divisées est :

```
0  0
      1
1  1        3
      7
2  8
```

Le système linéaire correspondant :

```
f''₀ = 0
½f''₀ + 2f''₁ + ½f''₂ = 6×3 = 18
f''₂ = 0
```

soit `[[1,0,0],[½,2,½],[0,0,1]] · [f''₀,f''₁,f''₂]ᵀ = [0,18,0]ᵀ`, d'où `f''₀=f''₂=0` et `f''₁=9`.

</details>

**b.** À l'aide de la spline trouvée, donner une approximation de `f(½)` et comparer au résultat exact `1/8`.

<details>
<summary>Correction</summary>

Pour interpoler en `x=½`, on utilise l'équation de la spline dans le 1ᵉʳ intervalle `(x₀,x₁)` :

```
p₀(x) = f₀ + f'₀(x−x₀) + f''₀/2!·(x−x₀)² + f'''₀/3!·(x−x₀)³
```

Or : `f₀=f(x₀)=0`, `f'₀ = f[x₀,x₁] − h₀f''₀/3 − h₀f''₁/6 = 1 − 0 − 9/6 = −½`, `f'''₀ = (f''₁−f''₀)/h₀ = 9−0 = 9`.

On obtient donc `p₀(x) = 0 − ½(x−0) + 0 + (9/6)(x−0)³ = −½x + (3/2)x³`, de sorte que `p₀(1/2) = −0.0625`.

On remarque que `f(1/2) = (1/2)³ = 1/8 = 0.125` : l'erreur de la spline naturelle est ici significative, car l'intervalle est court et les données peu nombreuses.

</details>

**c.** Expliquer l'erreur obtenue en interpolant une fonction cubique par des polynômes de degré 3.

<details>
<summary>Correction</summary>

Pour la spline naturelle, on impose `f''₀=0` et `f''₂=0`, qui sont respectivement des approximations de la dérivée seconde de la fonction `f(x)` en `x=0` et `x=2`. Cette dernière condition est **incompatible avec la fonction f(x)=x³**, puisque `f''(x)=6x` et qu'on devrait donc imposer `f''₂=12` (et non 0). D'où l'erreur observée : la contrainte « naturelle » (dérivée seconde nulle aux bords) ne correspond pas à la vraie courbure de `x³` aux extrémités.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<p><strong>Sujet</strong></p>
<PdfViewer file="/pdfs/mn-td1-interpolation.pdf" />

<p><strong>Correction</strong></p>
<PdfViewer file="/pdfs/mn-td1-interpolation-correction.pdf" />

</TabItem>
</Tabs>
