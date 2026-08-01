---
sidebar_position: 5
title: Chapitre IV - Résolution Numérique des Systèmes Linéaires
sidebar_label: Ch4 - Systèmes linéaires
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre IV : Résolution numérique des systèmes linéaires

*ENSI — II1 — 2022/2023*

## Introduction

On se propose de résoudre les systèmes linéaires `(SL) : Ax = b`, `A ∈ Matₙ(IR)`, `b, X ∈ IRⁿ`.

`(SL)` admet une solution ⟺ `A` est inversible ⟺ `det(A) ≠ 0`. Par la méthode de Cramer, `xₖ = det(Aₖ)/det(A) = Δₖ/Δ`, où `Aₖ` est la matrice obtenue en remplaçant la kᵉ colonne de `A` par `b`.

Le calcul de `det(A)` nécessite de l'ordre de `n·n!` opérations, et la méthode de Cramer de l'ordre de `n²·n!` opérations. Pour `n = 18` : ~200 ans de calcul (à 10⁶ opérations/s) ; pour `n = 50` : ~2,4·10⁵⁴ ans !

D'où la nécessité de développer des méthodes plus économiques. On distingue :
1. **Les méthodes directes**, qui atteignent la solution en un nombre fini d'opérations.
2. **Les méthodes itératives**, qui construisent une suite de vecteurs convergeant vers la solution.

## Partie I : Rappels d'algèbre linéaire

### Norme matricielle

Une **norme matricielle** est une norme sur `Mₙ(C)` compatible avec la multiplication : `‖AB‖ ≤ ‖A‖‖B‖`, en plus des axiomes usuels de norme.

**Exemple — norme de Frobenius** : `‖A‖_F = √(Σᵢⱼ |aᵢⱼ|²) = √(tr(ᵗAA))`.

### Rayon spectral

Le **rayon spectral** de `A ∈ Mₙ(IR)`, de valeurs propres `λᵢ`, est `ρ(A) = max₁≤ᵢ≤ₙ |λᵢ|`. *(Ce n'est pas une norme.)*

### Norme induite (subordonnée)

Pour une norme vectorielle `‖·‖ᵥ` sur `Cⁿ`, la norme induite est `‖A‖ = max_{x≠0} ‖Ax‖ᵥ/‖x‖ᵥ`. Toute norme subordonnée vérifie `‖Ax‖ᵥ ≤ ‖A‖‖x‖ᵥ` et `‖Iₙ‖ = 1`.

**Exemples** (pour `A = (aᵢⱼ) ∈ Mₙ(IR)`) :

| Norme vectorielle | Norme matricielle induite |
|---|---|
| `‖x‖₁ = Σᵢ｜xᵢ｜` | `‖A‖₁ = max_j Σᵢ｜aᵢⱼ｜` (max des sommes en colonne) |
| `‖x‖₂` (euclidienne) | `‖A‖₂ = √(ρ(ᵗAA)) = ‖ᵗA‖₂` |
| `‖x‖_∞ = maxᵢ｜xᵢ｜` | `‖A‖_∞ = maxᵢ Σⱼ｜aᵢⱼ｜ = ‖ᵗA‖₁` (max des sommes en ligne) |

:::note Attention
La norme `‖A‖ = √(Σᵢⱼ｜aᵢⱼ｜²)` (variante de Frobenius) n'est **pas** subordonnée dès que `n ≥ 2`, car `‖I‖ = √n ≠ 1`.
:::

### Conditionnement d'une matrice

Pour `‖·‖` subordonnée et `A` inversible : `cond(A) = ‖A‖·‖A⁻¹‖`. En pratique : `cond_p(A) = ‖A‖_p·‖A⁻¹‖_p`, `p = 1, 2, ∞`.

**Propriétés** (`A, B` inversibles, `α ≠ 0`) :
1. `cond(A) ≥ 1` et `cond(I) = 1`.
2. `cond(αA) = cond(A)`.
3. `cond(A) = cond(A⁻¹)`.
4. `cond(AB) ≤ cond(A)·cond(B)`.

**Caractérisation pour la norme 2** (`A` symétrique inversible) : `cond₂(A) = λ_max/λ_min`, où `λ_max, λ_min` sont les valeurs propres extrêmes en valeur absolue.

Une matrice est **bien conditionnée** si `cond(A) ≈ 1` : de petites perturbations sur les données induisent de petites perturbations sur la solution (stabilité).

### Majoration de l'erreur relative

- **Perturbation sur b** (`x̃` sol. de `Ax=b`, `x̃+δx̃` sol. de `Ax=(b+δb)`) : `‖δx̃‖/‖x̃‖ ≤ cond(A)·‖δb‖/‖b‖`.
- **Perturbation sur A** (`x̃+δx̃` sol. de `(A+δA)x=b`) : `‖δx̃‖/‖x̃+δx̃‖ ≤ cond(A)·‖δA‖/‖A‖`.
- **Perturbation sur A et b simultanément** (majoration optimale) :
  ```
  ‖δx̃‖/‖x̃‖ ≤ cond(A)/(1 - ‖δA‖‖A⁻¹‖) · (‖δb‖/‖b‖ + ‖δA‖/‖A‖)
  ```

## Partie II : Méthodes directes

### Principe

On cherche `M` inversible telle que `MA` soit triangulaire supérieure `B`, et on résout `BX = c` (`c = Mb`) par la **méthode de remontée** : on calcule `xₙ`, puis `xₙ₋₁`, ..., `x₁`.

### Méthode de Gauss

On construit `A⁽¹⁾ = A`, puis à chaque étape `k`, on choisit un pivot `a⁽ᵏ⁾ᵢₖ ≠ 0`, on permute au besoin (matrice de transposition `P⁽ᵏ⁾ = T⁽ᵏ,ⁱ⁾`), puis on élimine via la matrice élémentaire `E⁽ᵏ⁾` telle que `(E⁽ᵏ⁾)ᵢ,ₖ = -αᵢₖ/αₖₖ` pour `i > k`. On obtient `A⁽ᵏ⁺¹⁾ = E⁽ᵏ⁾P⁽ᵏ⁾A⁽ᵏ⁾`.

**Théorème.** Toute matrice inversible `A` admet une matrice `M` inversible telle que `MA` soit triangulaire supérieure, avec `M = E⁽ⁿ⁻¹⁾P⁽ⁿ⁻¹⁾···E⁽¹⁾P⁽¹⁾`.

**Algorithme de Gauss :**
```
Pour k = 1,...,n-1
  Pour i = k+1,...,n
    l_ik = a_ik^(k) / a_kk^(k)
    Pour j = k+1,...,n
      a_ij^(k+1) = a_ij^(k) - l_ik * a_kj^(k)
```
Les `a_kk^(k)` sont les **pivots** et doivent être non nuls. **Coût : ~2n³/3 opérations.**

#### Stratégie du pivot

Diviser par un pivot "trop petit" cause des erreurs d'arrondi catastrophiques (voir l'exemple classique `10⁻⁶x₁+x₂=1, x₁+x₂=2` : le résultat calculé avec le pivot `10⁻⁶` est faux, alors qu'en permutant les lignes pour prendre le plus grand pivot, le résultat est correct).

- **Stratégie du pivot partiel** : à l'étape `k`, le pivot est `a⁽ᵏ⁾ₚₖ` tel que `｜a⁽ᵏ⁾ₚₖ｜ = maxₖ≤ᵢ≤ₙ ｜a⁽ᵏ⁾ᵢₖ｜` (recherche dans la colonne `k`).
- **Stratégie du pivot total** : le pivot est `a⁽ᵏ⁾ₚ_q` tel que `｜a⁽ᵏ⁾ₚ_q｜ = maxₖ≤ᵢ,ⱼ≤ₙ ｜a⁽ᵏ⁾ᵢⱼ｜` (recherche dans toute la sous-matrice restante, avec permutation de lignes **et** de colonnes).

### Factorisation LU

Si l'on n'effectue aucune permutation, `A⁽ⁿ⁾ = E⁽ⁿ⁻¹⁾···E⁽¹⁾A` est triangulaire supérieure, et `A = LU` avec `U = A⁽ⁿ⁾` et `L = (E⁽ⁿ⁻¹⁾···E⁽¹⁾)⁻¹` triangulaire inférieure à diagonale unité.

**Proposition.** La factorisation LU de `A` (inversible, d'ordre `n`) existe **ssi** tous ses mineurs principaux d'ordre `1,...,n` sont non nuls.

Une fois `L` et `U` calculées, on résout `Ax=b` via deux systèmes triangulaires :
- `Ly = b` par la **méthode de descente** : `y₁ = b₁/l₁₁`, `yᵢ = (bᵢ - Σⱼ<ᵢ lᵢⱼyⱼ)/lᵢᵢ` — coût `n²`.
- `Ux = y` par la **méthode de remontée** : `xₙ = yₙ/uₙₙ`, `xᵢ = (yᵢ - Σⱼ>ᵢ uᵢⱼxⱼ)/uᵢᵢ` — coût `n²`.

**Intérêt majeur** : pour résoudre plusieurs systèmes `Ax=b` avec la même `A`, on ne calcule `L`, `U` qu'une fois.

### Matrice symétrique définie positive

`A` symétrique est **définie positive** ssi `∀x ∈ IRⁿ\{0} : (Ax,x) > 0`.

**Matrice à diagonale strictement dominante** : `｜aᵢᵢ｜ > Σⱼ≠ᵢ｜aᵢⱼ｜` pour tout `i`. *(Remarque : une matrice symétrique réelle à diagonale strictement dominante avec coefficients diagonaux positifs est définie positive.)*

**Proposition.** Si `A` est symétrique définie positive, alors `A = LU`.

### Méthode de Cholesky

**Théorème.** Si `A` est symétrique définie positive, il existe une matrice triangulaire inférieure `B` telle que `A = BᵗB` (unique si les éléments diagonaux de `B` sont imposés positifs).

**Résolution de `Ax=b`** : calculer `A = BᵗB`, puis résoudre `By = b` (descente) puis `ᵗBx = y` (remontée).

**Algorithme (colonne par colonne) :**
```
Pour j = 1 à n
    b_jj = √(a_jj - Σ_{k=1}^{j-1} b_jk²)
    Pour i = j+1 à n
        b_ij = (1/b_jj)(a_ij - Σ_{k=1}^{j-1} b_ik*b_jk)
```
**Coût : ~n³/3 opérations** (deux fois moins que Gauss général, car exploite la symétrie).

### Systèmes tridiagonaux : algorithme de Thomas

Si `A` est tridiagonale (éléments `aᵢ` diagonaux, `eᵢ`/`cᵢ` sous/sur-diagonaux) et que sa factorisation LU existe, `L` et `U` sont **bidiagonales** :
```
α₁ = a₁,   βᵢ = eᵢ/αᵢ₋₁,   αᵢ = aᵢ - βᵢcᵢ₋₁,  i=2,...,n
```
Puis `Ly=b` : `y₁=b₁`, `yᵢ = bᵢ - βᵢyᵢ₋₁`. Et `Ux=y` : `xₙ=yₙ/αₙ`, `xᵢ = (yᵢ-cᵢxᵢ₊₁)/αᵢ`. **Coût : de l'ordre de n opérations** (au lieu de `2n³/3`).

### Résumé — méthodes directes

- La factorisation LU (dite **de Gauss** quand on fixe `diag(L)=1`) existe et est unique ssi les mineurs principaux d'ordre `1` à `n-1` sont non nuls. Coût général : `2n³/3` ; cas tridiagonal : `n`.
- Pour `A` symétrique définie positive : factorisation de **Cholesky** `A=BᵗB`, coût `n³/3`.
- `det(A) = det(L)·det(U) = ∏ᵢ uᵢᵢ` — la factorisation LU permet donc de calculer un déterminant en `O(n³)` au lieu de `O(n!)`.
- **Sous MATLAB** : `[L,U]=lu(A)` (ou `[L,U,P]=lu(A)` avec pivot), `R=chol(A)` (renvoie `R = ᵗB`), `A\b` résout `Ax=b` en choisissant automatiquement l'algorithme adapté (Thomas si tridiagonal creux).

## Partie III : Méthodes itératives

### Principe

Pourquoi des méthodes itératives ? Les méthodes directes, sur un système de grande taille, accumulent des erreurs de calcul proportionnelles au nombre d'opérations, et exploitent des propriétés algébriques exactes difficiles à contrôler numériquement.

On décompose `A = M - N` (`M` inversible) : `Ax=b ⟺ Mx = Nx+b`. Pour `x⁽⁰⁾` donné, on définit :
```
x⁽ᵏ⁺¹⁾ = M⁻¹(Nx⁽ᵏ⁾ + b) = Cx⁽ᵏ⁾ + d,   C = M⁻¹N,  d = M⁻¹b
```
`C` est la **matrice de la méthode itérative**.

**Théorème (convergence).** La suite `(x⁽ᵏ⁾)` converge, pour tout `x⁽⁰⁾`, vers la solution de `(I-C)x=d` **ssi** `ρ(C) < 1`.

**Cas particulier.** Si `A` symétrique définie positive, `A=M-N`, `C=M⁻¹N=I-M⁻¹A`. Si `M+ᵗN` est définie positive, alors `ρ(C)<1`.

**Conclusion pratique** : décomposer `A=M-N` avec `M` inversible et soit `ρ(M⁻¹N)<1` (le plus petit possible), soit (cas SDP) `M+ᵗN` définie positive.

### Décomposition D − L − U

Pour `A`, on définit `D` (diagonale), `L` (`lᵢⱼ=-aᵢⱼ` si `i>j`, triangulaire inférieure stricte, opposée) et `U` (`uᵢⱼ=-aᵢⱼ` si `i<j`, triangulaire supérieure stricte, opposée), de sorte que `A = D - L - U`.

### Méthode de Jacobi

```
D x⁽ᵏ⁺¹⁾ = (L+U) x⁽ᵏ⁾ + b   ⟺   x⁽ᵏ⁺¹⁾ = D⁻¹(L+U) x⁽ᵏ⁾ + D⁻¹b = J x⁽ᵏ⁾ + d_J
```
`D` inversible ssi tous les `aᵢᵢ ≠ 0`. `J = D⁻¹(L+U)` est la **matrice de Jacobi**. Convergence ssi `ρ(J) < 1`.

**Conditions suffisantes de convergence** :
- Si `A` est à **diagonale strictement dominante**, Jacobi converge pour tout `x⁽⁰⁾`.
- Si `A` et `2D-A` sont symétriques définies positives, Jacobi converge.

### Méthode de Gauss-Seidel

```
(D-L) x⁽ᵏ⁺¹⁾ = U x⁽ᵏ⁾ + b   ⟺   x⁽ᵏ⁺¹⁾ = (D-L)⁻¹U x⁽ᵏ⁾ + (D-L)⁻¹b = L₁ x⁽ᵏ⁾ + d
```
`D-L` triangulaire inférieure, inversible ssi `aᵢᵢ ≠ 0` pour tout `i`. On résout à chaque itération le système (sans calculer `(D-L)⁻¹`). `L₁ = (D-L)⁻¹U` est la **matrice de Gauss-Seidel**. Convergence ssi `ρ(L₁) < 1`.

**Conditions suffisantes** :
- Si `A` à diagonale strictement dominante, Gauss-Seidel converge quel que soit `x⁽⁰⁾`.
- Si `A` symétrique définie positive, Gauss-Seidel converge quel que soit `x⁽⁰⁾`.

### Comparaison Jacobi / Gauss-Seidel

**Théorème.** Si `A` est **tridiagonale**, `ρ(L₁) = (ρ(J))²`. Les deux méthodes convergent ou divergent **simultanément**, et quand elles convergent, **Gauss-Seidel converge plus vite**.

### Méthode de relaxation

Pour `ω ≠ 0` :
```
M = D/ω - L,     N = (1-ω)/ω · D + U
```
`M` inversible ssi `aᵢᵢ ≠ 0` pour tout `i`. On résout `(D/ω - L)x⁽ᵏ⁺¹⁾ = ((1-ω)/ω·D+U)x⁽ᵏ⁾ + b`.

- `ω = 1` : méthode de **Gauss-Seidel**.
- `ω > 1` : **sur-relaxation**. `ω < 1` : **sous-relaxation**.

`L_ω = (D/ω-L)⁻¹((1-ω)/ω·D+U)` est la **matrice de relaxation**.

**Condition suffisante (SOR).** Si `A` symétrique définie positive, la relaxation converge pour `ω ∈ ]0,2[`.

**Condition nécessaire.** `ρ(L_ω) ≥ ｜ω-1｜` ; la méthode **diverge** pour tout `ω ∉ [0,2]`.

**Théorème (cas tridiagonal).** Si toutes les valeurs propres de `J` sont réelles et `< 1` en valeur absolue : Jacobi et relaxation convergent ou divergent simultanément, et il existe un paramètre optimal :
```
ω₀ = 2 / (1 + √(1-(ρ(J))²))
```
qui minimise `ρ(L_ω)` : `∀ω ∈ ]0,2[, ρ(L_ω) ≥ ρ(L_ω₀) = ω₀ - 1`.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/mn-ch4-rnsl.pdf" />

</TabItem>
</Tabs>
