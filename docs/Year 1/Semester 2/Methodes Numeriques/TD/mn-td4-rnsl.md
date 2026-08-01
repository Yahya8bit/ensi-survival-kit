---
sidebar_position: 4
title: TD4 - Résolution Numérique des Systèmes Linéaires
sidebar_label: TD4 - Systèmes linéaires
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD4 : Résolution numérique des systèmes linéaires

*ENSI-II1 — Série d'exercices n°3 — 2022/2023*

## Exercice 1

Résoudre le système linéaire `Ax = b` avec :

```
A = [[4,2,2],[2,5,3],[2,3,11]]     b = [1,-2,0]ᵀ
```

1. Par la méthode de Gauss sans stratégie du pivot.
2. Expliquer comment utiliser la méthode de Gauss avec stratégie du pivot total (sans résoudre).
3. Peut-on résoudre le système par la factorisation de Cholesky ? Si oui, résoudre le système par cette méthode.

## Exercice 2

Soit le système linéaire `Ax = b`, avec :

```
A = [[1, 1/2, 1/2], [1/2, 1, 1/2], [1/2, 1/2, 1]]
```

1. La matrice `A` est-elle définie positive ?
2. a) `A` admet-elle une décomposition LU ? Si oui, trouver cette décomposition.
   b) En déduire la décomposition de Cholesky de `A`.
   c) Comment résoudre le système `Ax=b` ?
3. a) Montrer que la méthode de relaxation converge pour tout `ω ∈ ]0,2[`.
   b) Écrire la matrice `J` de la méthode de Jacobi correspondante. La méthode de Jacobi converge-t-elle ? Justifier.
   c) Écrire la matrice `L₁` de la méthode de Gauss-Seidel correspondante. Calculer `ρ(L₁)`.
   d) La méthode de Gauss-Seidel converge-t-elle plus vite que celle de Jacobi ? Justifier.

## Exercice 3

Soit `(S) : Ax = b`, avec :

```
A = [[2,0,1],[0,2,0],[1,0,2]]     b = [3,2,3]ᵀ
```

1. On considère l'algorithme du gradient à pas constant `α` appliqué à `(S)`.
   - a) Pour quelles valeurs de `α`, l'algorithme converge-t-il ?
   - b) Existe-t-il une valeur optimale de `α` pour laquelle la convergence de la méthode du gradient à pas fixe est la plus rapide ? Si oui, calculer cette valeur. On la notera `α₀`.
   - c) Déterminer la suite `(xₖ)ₖ` générée par l'algorithme lorsque `x₀ = (0,0,0)ᵀ` et `α = 1/2`.
   - d) Faire 3 itérations de l'algorithme du gradient à pas constant.
2. a) Vérifier que la méthode du gradient à pas optimal appliquée à `(S)` converge.
   b) On note `eₖ` l'erreur à la k-ème itération de la méthode du gradient à pas optimal. En admettant que :
      ```
      ‖eₖ‖ = (cond₂(A)-1)/(cond₂(A)+1) · ‖eₖ₋₁‖
      ```
      trouver le nombre minimum d'itérations nécessaire pour que l'erreur vérifie `‖eₖ‖ ≤ 10⁻³`.

## Exercice 4

Pour `a` un paramètre réel, on considère le système linéaire `(S) : Ax = b`, où :

```
A = [[1,0,-a],[-a,1,1],[a,0,1]]     b ∈ ℝ³
```

1. Pour quelles valeurs de `a`, la matrice `A` admet-elle une factorisation LU ?
2. Calculer cette factorisation lorsqu'elle est possible.
3. Utiliser la question précédente pour résoudre `(S)` pour `b = (1-a, 2-a, 1+a)ᵀ`.
4. On considère la décomposition classique de `A` sous la forme `A = D-L-U` où `D=I`, `L = [[0,0,0],[a,0,0],[-a,0,0]]` et `U = [[0,0,a],[0,1,-1],[0,0,1]]`, `I` étant la matrice identité d'ordre 3.
   - a) Calculer `J` la matrice de Jacobi pour résoudre le système linéaire `(S)`.
   - b) Pour quelles valeurs de `a`, la méthode de Jacobi converge-t-elle pour résoudre `(S)` ?
   - c) Soit `L₁` la matrice de Gauss-Seidel pour résoudre `(S)`. Montrer que : `det(λ(D-L)-U) = 0` ssi `λ` est une valeur propre de `L₁`.
   - d) On pose `C_λ = λ(D-L)-U`, `λ ∈ ℂ`. Déterminer `det(C_λ)`.
   - e) En déduire le rayon spectral `ρ(L₁)`. Pour quelles valeurs de `a` la méthode de Gauss-Seidel converge-t-elle pour résoudre `(S)` ?
   - f) Donner une relation entre les rayons spectraux `ρ(J)` et `ρ(L₁)`.
   - g) En cas de convergence, dire laquelle des deux méthodes est la plus rapide.

## Exercice 5 (supplémentaire) — Diagonale dominante et convergence

**Théorème (relaxation).** Soit `A` à diagonale strictement dominante. Si `0 < ω ≤ 1`, alors la méthode de relaxation est convergente.

Soit `a ∈ ℝ` et soit :

```
A = [[1,a,a],[a,1,a],[a,a,1]]
```

1. Pour quelles valeurs de `a`, `A` est-elle définie positive ?
2. Pour quelles valeurs de `a`, la méthode de Gauss-Seidel est-elle convergente ?
3. Écrire la matrice `J` de la méthode de Jacobi.
4. Pour quelles valeurs de `a`, la méthode de Jacobi converge-t-elle ?
5. Écrire la matrice `ℓ₁` de la méthode de Gauss-Seidel. Calculer `ρ(ℓ₁)`.
6. Pour quelle valeur de `a`, la méthode de Gauss-Seidel converge-t-elle plus vite que celle de Jacobi ?

<details>
<summary>Correction (Exercice 5)</summary>

**1.** `A` est symétrique (donc diagonalisable). `A(a,1) = [[β,α,α],[α,β,α],[α,α,β]]` avec `β=1, α=a` : `det(A(α,β)-λI) = Δ(α,β-λ) = (β-λ-α)²(β-λ+2α)`. Racines : `λ₁ = β-α` (double), `λ₂ = β+2α`. Avec `β=1` : `λ₁ = 1-a`, `λ₂ = 1+2a`.

`A` est définie positive ssi `λ₁, λ₂ > 0`, i.e. `1-a>0` et `1+2a>0`, soit **`a ∈ ]-1/2, 1[`**.

*(Vérification alternative par forme quadratique : `ᵗxAx = x₁²+x₂²+x₃² + a(2x₁x₂+2x₁x₃+2x₂x₃) ≥ 0` pour `a ∈ ]-1/2,1[`, avec égalité ssi `x=0`.)*

**2.** D'après le théorème du cours : si `A` est à diagonale strictement dominante, alors la méthode de Gauss-Seidel converge (`ω=1`). Il faut `1 > ｜a｜+｜a｜`, soit `｜a｜ < 1/2`.

**3.** `J = D⁻¹N`, `D=I₃`, `N=D-A` :
```
J = [[0,-a,-a],[-a,0,-a],[-a,-a,0]] = A(-a,0)
```

**4.** `det(J-λI) = Δ(-a,-λ) = (-λ+a)²(-λ-2a)`. Racines : `λ₁=a` (double), `λ₂=-2a`. `ρ(J) = max{｜a｜, ｜2a｜} = 2｜a｜`.

La méthode de Jacobi converge ssi `ρ(J)<1`, i.e. **`｜a｜ < 1/2`**.

**5.** `ℓ₁ = (D-E)⁻¹F`, avec `D=I₃`, `-E=[[0,0,0],[a,0,0],[a,a,0]]`, `-F=[[0,a,a],[0,0,a],[0,0,0]]`.

`(D-E)⁻¹ = [[1,0,0],[-a,1,0],[a²-a,-a,1]]`, d'où :
```
ℓ₁ = [[0,-a,-a],[0,a²,a²-a],[0,-a(a²-a),-a³+2a²]]
```

Le polynôme caractéristique de `ℓ₁` est `P_ℓ₁(X) = -X[X²+(a³-3a²)X+a³]`. Les racines de `Q(X)=X²+(a³-3a²)X+a³` sont déterminées via `Δ = (a³-3a²)²-4a³` :

- Si `Δ>0` : `ρ(ℓ₁) = max{｜(3a²-a³-√Δ)/2｜, ｜(3a²-a³+√Δ)/2｜}`
- Si `Δ<0` : `ρ(ℓ₁) = ｜(3a²-a³)/2 - i√Δ/2｜`
- Si `Δ=0` : `ρ(ℓ₁) = ｜(3a²-a³)/2｜`

**6.** La méthode de Gauss-Seidel converge pour `a ∈ ]-1/2,1/2[`. En comparant `ρ(ℓ₁)` et `ρ(J)` (cas `Δ=0`, `ρ(ℓ₁)=｜3a²-a³｜/2`, `ρ(J)=2｜a｜`) :
```
ρ(ℓ₁)-ρ(J) = (｜3a²-a³｜-4｜a｜)/2 = (｜a｜/2)(｜3a-a²｜-4)
```
`ρ(ℓ₁) > ρ(J)` ssi `｜3a-a²｜ > 4`. Donc `ρ(ℓ₁) > ρ(J)` sous les conditions `｜3a²-a³｜<2` (Gauss-Seidel convergente), `2｜a｜<1` (Jacobi convergente) et `｜3a-a²｜>4` (impossible dans cette plage). D'où **`ρ(ℓ₁) < ρ(J)` pour `4｜a｜<2`, i.e. `a ∈ ]-1/4, 1/4[`** : la méthode de Gauss-Seidel converge alors plus vite que celle de Jacobi.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<p><strong>Sujet</strong></p>
<PdfViewer file="/pdfs/mn-td4-rnsl.pdf" />

<p><strong>Exercice supplémentaire</strong></p>
<PdfViewer file="/pdfs/mn-td4-rnsl-exo-supp.pdf" />

</TabItem>
</Tabs>
