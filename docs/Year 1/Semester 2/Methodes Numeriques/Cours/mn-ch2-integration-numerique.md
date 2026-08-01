---
sidebar_position: 3
title: Chapitre II - Intégration Numérique
sidebar_label: Ch2 - Intégration numérique
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre II : Intégration Numérique

*Méthodes Numériques*

## But

Trouver une approximation de l'intégrale d'une fonction sur un intervalle `[a,b]`.

## Rappel : intégrale de Riemann

Soit `f` une fonction continue sur `[a,b]`. Pour `0 ≤ j ≤ n`, on note `xⱼ = a + (b−a)/n · j` (n+1 points, n intervalles), avec `xⱼ − xⱼ₋₁ = (b−a)/n` le **pas de discrétisation**.

```
∫ₐᵇ f(x) dx = lim_{n→∞} Σⱼ₌₁ⁿ f(xⱼ₋₁) · (b−a)/n
```

**Idée** : on approxime `f` sur `[a,b]` par une fonction constante par morceaux `fₙ`, avec `fₙ(x) = Σⱼ f(xⱼ₋₁)·𝟙_{[xⱼ₋₁,xⱼ]}(x)`. On a `fₙ → f`, d'où la définition.

### Propriétés de l'intégrale de Riemann

- **Linéarité** : `∫ₐᵇ (f(x)+λg(x)) dx = ∫ₐᵇ f(x) dx + λ∫ₐᵇ g(x) dx`, pour `λ ∈ ℝ`, `f,g` continues sur `[a,b]`.
- **Relation de Chasles** : `∫ₐᵇ f(x) dx = ∫ₐᶜ f(x) dx + ∫_c^b f(x) dx`.
- **Inégalité triangulaire** : `|∫ₐᵇ f(x) dx| ≤ ∫ₐᵇ |f(x)| dx`.

## Méthodes des rectangles

### Méthode des rectangles à gauche

On approxime l'intégrale par la somme des aires des rectangles à gauche :

```
Iⁿ_{g,Riemann} = Σⱼ₌₁ⁿ f(xⱼ₋₁) · (b−a)/n = (b−a)/n · (f(x₀)+f(x₁)+...+f(xₙ₋₁))
```

**Théorème.** Soit `f` de classe `C¹` sur `[a,b]`. Alors :

```
|∫ₐᵇ f(x) dx − Iⁿ_{g,Riemann}(f)| ≤ (b−a)²/(2n) · sup_{x∈[a,b]} |f'(x)|
```

**Démonstration (esquisse).** On écrit la différence comme une somme d'intégrales `∫_{xⱼ₋₁}^{xⱼ} (f(x) − f(xⱼ₋₁)) dx`, on majore `|f(x)−f(xⱼ₋₁)|` par le théorème des accroissements finis (TAF) par `sup|f'|·|x−xⱼ₋₁|`, puis on intègre `|x−xⱼ₋₁|` sur chaque sous-intervalle (`= ½((b−a)/n)²`), et on somme sur les `n` intervalles.

### Méthode des rectangles à droite

```
Iⁿ_{d,Riemann} = Σⱼ₌₁ⁿ f(xⱼ) · (b−a)/n
```

Même majoration d'erreur :

```
|∫ₐᵇ f(x) dx − Iⁿ_{d,Riemann}| ≤ (b−a)²/(2n) · sup_{x∈[a,b]} |f'(x)|
```

### Ordre d'une méthode

**Définition.** Soit `n ≥ 1`, `[a,b]` un intervalle, `f` de classe `C^∞`. Une méthode d'intégration numérique donnant une approximation `Iₙ(f)` de `∫ₐᵇ f(x)dx` est **d'ordre p ∈ ℕ*** si p est le plus grand entier tel que :

```
|∫ₐᵇ f(t)dt − Iₙ(f)| ≤ C · ((b−a)/n)^p
```

où C est une constante (pouvant dépendre de f, a, b).

D'après le théorème précédent, les méthodes des rectangles (à gauche et à droite) sont **d'ordre 1**.

## Méthode du point milieu

Au lieu du point à gauche ou à droite, on prend le **point milieu** `x_{j-1/2} = a + (j−½)(b−a)/n` :

```
Iⁿ_{milieu}(f) = Σⱼ₌₁ⁿ f(x_{j-1/2}) · (b−a)/n
```

**Théorème.** Soit `f ∈ C²([a,b])` et `n ≥ 1`. Alors :

```
|∫ₐᵇ f(x)dx − Iⁿ_{milieu}(f)| ≤ (b−a)/24 · sup_{x∈[a,b]} |f''(x)| · ((b−a)/n)²
```

**Démonstration (esquisse).** On applique la formule de Taylor-Lagrange à `f` autour de `x_{j-1/2}` : `f(x) − f(x_{j-1/2}) = f'(x_{j-1/2})(x−x_{j-1/2}) + ½f''(η)(x−x_{j-1/2})²`. Le terme linéaire s'intègre à zéro par symétrie sur `[xⱼ₋₁,xⱼ]`, et on majore le terme quadratique. On obtient finalement une erreur en `C·((b−a)/n)²`.

**Conclusion : la méthode du point milieu est d'ordre 2** — supérieure aux méthodes des rectangles simples (ordre 1), pour un coût de calcul similaire.

## Formule de Newton-Cotes

Les formules de Newton-Cotes sont des méthodes d'intégration numérique basées sur l'**interpolation polynomiale**. On considère `n` sous-intervalles `[xⱼ₋₁,xⱼ]` uniformément répartis sur `[a,b]`. Sur chaque sous-intervalle, on remplace `f` par son polynôme d'interpolation de Lagrange en `(k+1)` points uniformément répartis.

Le polynôme d'interpolation de Lagrange de `f` aux points `D₁ = {x_{m,j} = xⱼ₋₁ + (xⱼ−xⱼ₋₁)/m · k, 0≤k≤m}` est :

```
P_{k,j}(x) = Σₘ₌₀ᵏ f(x_{m,j}) L_{m,j}(x)
```

où `L_{m,j}` sont les polynômes de la base de Lagrange associée à ces `k+1` points. Sur chaque intervalle :

```
∫_{xⱼ₋₁}^{xⱼ} f(x) dx ≈ Σₘ₌₀ᵏ f(x_{m,j}) · ℓ_{m,j}     avec   ℓ_{m,j} = ∫_{xⱼ₋₁}^{xⱼ} L_{m,j}(x) dx
```

D'où la **formule de Newton-Cotes** globale :

```
Iⁿ_{k,Newton-Cotes}(f) = Σⱼ₌₁ⁿ Σₘ₌₀ᵏ f(x_{m,j}) · ℓ_{m,j}
```

### Ordre des méthodes de Newton-Cotes

**Théorème.** Soit `k ≥ 1` et `f` de classe `C^{k+1}` sur `[a,b]`. On a l'estimation :

```
|∫ₐᵇ f(x)dx − Iⁿ_{k,Newton-Cotes}(f)| ≤ Kₖ(b−a) · sup_{η∈[a,b]} |f^{(k+1)}(η)| / (k+1)! · ((b−a)/n)^{k+1}
```

où `Kₖ = ∫₀¹ ∏ₘ₌₀ᵏ |y − m/k| dy` **ne dépend que du nombre de points d'interpolation** (et pas de f, a, b). Une méthode basée sur les formules de Newton-Cotes est donc **d'ordre k+1**, où `k+1` est le nombre de points d'interpolation dans chaque sous-intervalle.

**Théorème (admis).** Pour `p ≥ 1` et `f` de classe `C^{2p+2}` sur `[a,b]`, les méthodes de Newton-Cotes basées sur un polynôme de **degré pair 2p sont d'ordre 2p+2** (un ordre de plus que ce que la formule générale suggérerait — gain gratuit pour les degrés pairs).

## Méthode des trapèzes (k=1, Newton-Cotes à 2 points)

On choisit 2 points dans `[xⱼ₋₁,xⱼ]` : `x₀ⱼ = xⱼ₋₁` et `x₁ⱼ = xⱼ`. Le polynôme d'interpolation est de degré 1 (une fonction affine sur chaque sous-intervalle). On calcule les coefficients de quadrature :

```
ℓ₀ⱼ = ℓ₁ⱼ = (b−a)/(2n)
```

D'où l'approximation sur chaque sous-intervalle :

```
∫_{xⱼ₋₁}^{xⱼ} f(x)dx ≈ (xⱼ−xⱼ₋₁)/2 · (f(xⱼ₋₁)+f(xⱼ))
```

**Formule des trapèzes globale :**

```
Iⁿ_{1,Newton-Cotes}(f) = (b−a)/(2n) · Σⱼ₌₁ⁿ (f(xⱼ₋₁)+f(xⱼ))
```

:::note Remarque
La méthode des trapèzes est la **moyenne** des méthodes des rectangles à gauche et à droite :
`Iⁿ_{1,Newton-Cotes}(f) = ½(Iⁿ_{g,Riemann}(f) + Iⁿ_{d,Riemann}(f))`
:::

### Erreur de la méthode des trapèzes

```
|∫ₐᵇ f(x)dx − Iⁿ_{1,Newton-Cotes}| ≤ (b−a)/12 · sup_{η∈[a,b]} |f''(η)| · ((b−a)/n)²
```

**La méthode des trapèzes est donc d'ordre 2** — comme la méthode du point milieu, mais avec une constante d'erreur (1/12) deux fois plus grande que celle du point milieu (1/24). **En pratique, on préfère donc la méthode du point milieu à celle des trapèzes**, l'estimation d'erreur étant plus favorable.

## Méthode de Simpson (k=2, Newton-Cotes à 3 points)

On considère 3 points dans `[xⱼ₋₁,xⱼ]` : `x₀ⱼ=xⱼ₋₁`, `x₁ⱼ=x_{j-1/2}` (point milieu), `x₂ⱼ=xⱼ`. Le polynôme d'interpolation est de degré 2 (une parabole sur chaque sous-intervalle). Le calcul des coefficients de quadrature donne :

```
ℓ₀ⱼ = ℓ₂ⱼ = (b−a)/(6n)      ℓ₁ⱼ = 4(b−a)/(6n)
```

D'où sur chaque sous-intervalle :

```
∫_{xⱼ₋₁}^{xⱼ} f(x)dx ≈ (b−a)/(6n) · (f(xⱼ₋₁) + 4f(x_{j-1/2}) + f(xⱼ))
```

**Formule de Simpson globale :**

```
Iⁿ_{2,Newton-Cotes}(f) = (b−a)/(6n) · Σⱼ₌₁ⁿ (f(xⱼ₋₁) + 4f(x_{j-1/2}) + f(xⱼ))
```

:::note Remarque
`Iⁿ_{2,Newton-Cotes}(f) = 1/6 · (Iⁿ_{g,Riemann}(f) + 4·Iⁿ_{milieu}(f) + Iⁿ_{d,Riemann}(f))`
:::

### Erreur de la méthode de Simpson

```
|∫ₐᵇ f(x)dx − Iⁿ_{2,Newton-Cotes}| ≤ (b−a)/90 · sup_{η∈[a,b]} |f⁽³⁾(η)| · ((b−a)/n)³
```

Comme la méthode de Simpson est basée sur un polynôme de degré 2 (**pair**), elle est, d'après le théorème admis, **d'ordre 2+2 = 4** (et non 3, gain gratuit du degré pair).

## Exemple comparatif

Pour `I = ∫₀¹ x·ln(1+x) dx = 2ln2 − 1 ≈ 0.38629436111`, l'erreur absolue commise en fonction du nombre de sous-intervalles `n`, pour les 3 méthodes :

| n | Rectangles (ordre 1) | Trapèzes (ordre 2) | Simpson (ordre 4) |
|---|---|---|---|
| 5 | 0.0710 | 0.00167 | 0.957×10⁻⁶ |
| 10 | 0.0351 | 0.000416 | 0.0605×10⁻⁶ |
| 25 | 0.0139 | 0.0000667 | 0.00155×10⁻⁶ |
| 50 | 0.00695 | 0.0000167 | 0.000972×10⁻⁶ |

On voit l'intérêt des méthodes d'ordre élevé : la méthode de Simpson avec seulement 5 sous-intervalles donne déjà une erreur de l'ordre de `10⁻⁶`, largement meilleure que les rectangles ou les trapèzes avec beaucoup plus de sous-intervalles.

## Méthodes d'ordres supérieurs

Pour obtenir des méthodes d'ordres supérieurs, il faut calculer des coefficients de quadrature `ℓ_{m,j}` de plus en plus complexes, avec `k+1` points d'interpolation par sous-intervalle.

En notant `h = (b−a)/n` et `f_{m,j} = f(x_{m,j})` :

| Méthode | Ordre | Degré du polynôme | Approximation sur `[xⱼ₋₁,xⱼ]` |
|---|---|---|---|
| Trapèze (2 points) | 2 | 1 | `h/2 (f₀,ⱼ + f₁,ⱼ)` |
| Simpson (3 points) | 4 | 2 | `h/6 (f₀,ⱼ + 4f₁,ⱼ + f₂,ⱼ)` |
| 4 points | 4 | 3 | `h/8 (f₀,ⱼ + 3f₁,ⱼ + 3f₂,ⱼ + f₃,ⱼ)` |
| 5 points | 6 | 4 | `h/90 (7f₀,ⱼ + 32f₁,ⱼ + 12f₂,ⱼ + 32f₃,ⱼ + 7f₄,ⱼ)` |
| 7 points | 8 | 6 | `h/840 (41f₀,ⱼ + 216f₁,ⱼ + 27f₂,ⱼ + 272f₃,ⱼ + 27f₄,ⱼ + 216f₅,ⱼ + 41f₆,ⱼ)` |

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/mn-ch2-integration-numerique.pdf" />

</TabItem>
</Tabs>
