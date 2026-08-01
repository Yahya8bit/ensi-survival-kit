---
sidebar_position: 4
title: Méthodes de Gauss
sidebar_label: Méthodes de Gauss
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Méthodes de Gauss

*Méthodes Numériques*

## Introduction et position du problème

Les méthodes de Gauss concernent le calcul numérique d'intégrale faisant intervenir un **poids**. Elles constituent une application directe de la théorie des polynômes orthogonaux.

**Position du problème.** Étant donné :
- une fonction poids `w(x) > 0` sur un intervalle `]a,b[` borné ou non,
- une fonction `f` telle que `f·w` est intégrable sur `[a,b]`,

on considère la formule de quadrature :

```
∫ₐᵇ f(x)w(x)dx = Σᵢ₌₀ⁿ λᵢf(xᵢ) + E(f)
```

On veut choisir les `λᵢ` et les `xᵢ` tels que cette formule soit exacte pour un ordre le plus élevé possible (c'est-à-dire `E(f)=0` pour `f(x)=xᵏ`, `k=0,1,2,...,m`, `m` le plus élevé possible).

## Idées et solutions

**Théorème (existence et unicité de la solution).** Il existe un choix et un seul de points `xᵢ` et des `λᵢ` de sorte que la méthode soit d'ordre `N = 2n+1`.

Les `xᵢ ∈ ]a,b[` et sont les racines du `(n+1)`-ième polynôme orthogonal pour le poids `w`.

```
λᵢ = ∫ₐᵇ lᵢ(x)w(x)dx
```

avec `lᵢ(x)` le i-ième polynôme de base de Lagrange.

**Théorème (erreur d'intégration).** Pour `f ∈ C^{2n+2}_{[a,b]}`, il existe `ξ ∈ ]a,b[` tel que :

```
E(f) = f⁽²ⁿ⁺²⁾(ξ)/(2n+2)! · ∫ₐᵇ π²ₙ₊₁(x)w(x)dx
```

## Exemples de familles de polynômes orthogonaux

| Famille | `]a,b[` | Poids `w(x)` |
|---|---|---|
| Polynômes de Laguerre | `]0,+∞[` | `e^{-x}` |
| Polynômes d'Hermite | `ℝ` | `e^{-x²}` |
| Polynômes de Legendre | `]-1,1[` | `1` |
| Polynômes de Tchebychev | `]-1,1[` | `1/√(1-x²)` |

## Gauss-Legendre

| n+1 | `πₙ₊₁(x)` | `x₀,...,xₙ` | `λ₀,...,λₙ` | Ordre N |
|---|---|---|---|---|
| 0 | 1 | | | |
| 1 | `x` | `0` | `2` | 1 |
| 2 | `x²−1` | `−1/√3, 1/√3` | `1, 1` | 3 |
| 3 | `x³−(3/5)x` | `−√(3/5), 0, √(3/5)` | `5/9, 8/9, 5/9` | 5 |
| 4 | `x⁴−(6/7)x²+3/35` | \| | \| | 7 |
| 5 | `x⁵−(10/9)x³+(5/21)x` | \| | compliqués | 9 |

## Gauss-Tchebychev

Les polynômes de Tchebychev sont deux à deux orthogonaux relativement au poids `w(x) = 1/√(1−x²)`.

Les points `(xᵢ)₀≤ᵢ≤ₙ` sont les points d'interpolation de Tchebychev dans `[−1,1]` :

```
xᵢ = cos((2i+1)/(2n+2) · π),   0 ≤ i ≤ n
```

On peut démontrer que `λᵢ = π/(n+1)`, on obtient donc une méthode d'ordre `2n+1` s'écrivant :

```
∫₋₁¹ f(x) dx/√(1−x²) ≈ π/(n+1) · Σᵢ₌₀ⁿ f(cos((2i+1)/(2n+2) · π))
```

## TD

**Exercice 1.** Calculer par l'une des méthodes de Gauss l'intégrale suivante :

```
∫₀¹ x⁴/√(x(1−x)) dx
```

**Exercice 2.** Soit `x₁, x₂ ∈ [−1,1]` et `λ₁, λ₂` deux réels. On considère la méthode d'intégration numérique :

```
∫₋₁¹ f(x)dx = λ₁f(x₁) + λ₂f(x₂) + E(f)
```

Selon les valeurs de `x₁, x₂` et `λ₁, λ₂`, étudier l'ordre de cette méthode.

**Exercice 3.** Utiliser la méthode de Gauss-Legendre pour estimer `∫₀^{2/3} dx/(1−x)`.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/mn-ch3-methodes-de-gauss.pdf" />

</TabItem>
</Tabs>
