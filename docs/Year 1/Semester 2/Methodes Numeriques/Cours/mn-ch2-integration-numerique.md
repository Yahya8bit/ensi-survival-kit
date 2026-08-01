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

Trouver une approximation de l'intégrale d'une fonction sur un intervalle $[a,b]$.

## Rappel : intégrale de Riemann

Soit $f$ une fonction continue sur $[a,b]$. Pour $0 \le j \le n$, on note $x_j = a + \frac{b-a}{n} \cdot j$ (n+1 points, n intervalles), avec $x_j - x_{j-1} = \frac{b-a}{n}$ le **pas de discrétisation**.

$$
\int_a^b f(x)\, dx = \lim_{n\to\infty} \sum_{j=1}^{n} f(x_{j-1}) \cdot \frac{b-a}{n}
$$

**Idée** : on approxime $f$ sur $[a,b]$ par une fonction constante par morceaux $f_n$, avec $f_n(x) = \sum_j f(x_{j-1})\cdot \chi_{[x_{j-1},x_j]}(x)$. On a $f_n \to f$, d'où la définition.

### Propriétés de l'intégrale de Riemann

- **Linéarité** : $\int_a^b (f(x)+\lambda g(x))\, dx = \int_a^b f(x)\, dx + \lambda\int_a^b g(x)\, dx$, pour $\lambda \in \mathbb{R}$, $f,g$ continues sur $[a,b]$.
- **Relation de Chasles** : $\int_a^b f(x)\, dx = \int_a^c f(x)\, dx + \int_c^b f(x)\, dx$.
- **Inégalité triangulaire** : $\left|\int_a^b f(x)\, dx\right| \le \int_a^b |f(x)|\, dx$.

## Méthodes des rectangles

### Méthode des rectangles à gauche

On approxime l'intégrale par la somme des aires des rectangles à gauche :

$$
I^n_{g,\text{Riemann}} = \sum_{j=1}^{n} f(x_{j-1}) \cdot \frac{b-a}{n} = \frac{b-a}{n} \cdot (f(x_0)+f(x_1)+\ldots+f(x_{n-1}))
$$

**Théorème.** Soit $f$ de classe $C^1$ sur $[a,b]$. Alors :

$$
\left|\int_a^b f(x)\, dx - I^n_{g,\text{Riemann}}(f)\right| \le \frac{(b-a)^2}{2n} \cdot \sup_{x\in[a,b]} |f'(x)|
$$

**Démonstration (esquisse).** On écrit la différence comme une somme d'intégrales $\int_{x_{j-1}}^{x_j} (f(x) - f(x_{j-1}))\, dx$, on majore $|f(x)-f(x_{j-1})|$ par le théorème des accroissements finis (TAF) par $\sup|f'|\cdot|x-x_{j-1}|$, puis on intègre $|x-x_{j-1}|$ sur chaque sous-intervalle ($= \frac{1}{2}\left(\frac{b-a}{n}\right)^2$), et on somme sur les $n$ intervalles.

### Méthode des rectangles à droite

$$
I^n_{d,\text{Riemann}} = \sum_{j=1}^{n} f(x_j) \cdot \frac{b-a}{n}
$$

Même majoration d'erreur :

$$
\left|\int_a^b f(x)\, dx - I^n_{d,\text{Riemann}}\right| \le \frac{(b-a)^2}{2n} \cdot \sup_{x\in[a,b]} |f'(x)|
$$

### Ordre d'une méthode

**Définition.** Soit $n \ge 1$, $[a,b]$ un intervalle, $f$ de classe $C^\infty$. Une méthode d'intégration numérique donnant une approximation $I_n(f)$ de $\int_a^b f(x)dx$ est **d'ordre $p \in \mathbb{N}^*$** si p est le plus grand entier tel que :

$$
\left|\int_a^b f(t)dt - I_n(f)\right| \le C \cdot \left(\frac{b-a}{n}\right)^p
$$

où C est une constante (pouvant dépendre de f, a, b).

D'après le théorème précédent, les méthodes des rectangles (à gauche et à droite) sont **d'ordre 1**.

## Méthode du point milieu

Au lieu du point à gauche ou à droite, on prend le **point milieu** $x_{j-1/2} = a + (j-\frac{1}{2})\frac{b-a}{n}$ :

$$
I^n_{\text{milieu}}(f) = \sum_{j=1}^{n} f(x_{j-1/2}) \cdot \frac{b-a}{n}
$$

**Théorème.** Soit $f \in C^2([a,b])$ et $n \ge 1$. Alors :

$$
\left|\int_a^b f(x)dx - I^n_{\text{milieu}}(f)\right| \le \frac{b-a}{24} \cdot \sup_{x\in[a,b]} |f''(x)| \cdot \left(\frac{b-a}{n}\right)^2
$$

**Démonstration (esquisse).** On applique la formule de Taylor-Lagrange à $f$ autour de $x_{j-1/2}$ : $f(x) - f(x_{j-1/2}) = f'(x_{j-1/2})(x-x_{j-1/2}) + \frac{1}{2}f''(\eta)(x-x_{j-1/2})^2$. Le terme linéaire s'intègre à zéro par symétrie sur $[x_{j-1},x_j]$, et on majore le terme quadratique. On obtient finalement une erreur en $C\cdot\left(\frac{b-a}{n}\right)^2$.

**Conclusion : la méthode du point milieu est d'ordre 2** — supérieure aux méthodes des rectangles simples (ordre 1), pour un coût de calcul similaire.

## Formule de Newton-Cotes

Les formules de Newton-Cotes sont des méthodes d'intégration numérique basées sur l'**interpolation polynomiale**. On considère $n$ sous-intervalles $[x_{j-1},x_j]$ uniformément répartis sur $[a,b]$. Sur chaque sous-intervalle, on remplace $f$ par son polynôme d'interpolation de Lagrange en $(k+1)$ points uniformément répartis.

Le polynôme d'interpolation de Lagrange de $f$ aux points $D_1 = \{x_{m,j} = x_{j-1} + \frac{x_j-x_{j-1}}{m} \cdot k,\ 0\le k\le m\}$ est :

$$
P_{k,j}(x) = \sum_{m=0}^{k} f(x_{m,j}) L_{m,j}(x)
$$

où $L_{m,j}$ sont les polynômes de la base de Lagrange associée à ces $k+1$ points. Sur chaque intervalle :

$$
\int_{x_{j-1}}^{x_j} f(x)\, dx \approx \sum_{m=0}^{k} f(x_{m,j}) \cdot \ell_{m,j} \quad \text{avec} \quad \ell_{m,j} = \int_{x_{j-1}}^{x_j} L_{m,j}(x)\, dx
$$

D'où la **formule de Newton-Cotes** globale :

$$
I^n_{k,\text{Newton-Cotes}}(f) = \sum_{j=1}^{n} \sum_{m=0}^{k} f(x_{m,j}) \cdot \ell_{m,j}
$$

### Ordre des méthodes de Newton-Cotes

**Théorème.** Soit $k \ge 1$ et $f$ de classe $C^{k+1}$ sur $[a,b]$. On a l'estimation :

$$
\left|\int_a^b f(x)dx - I^n_{k,\text{Newton-Cotes}}(f)\right| \le K_k(b-a) \cdot \frac{\sup_{\eta\in[a,b]} |f^{(k+1)}(\eta)|}{(k+1)!} \cdot \left(\frac{b-a}{n}\right)^{k+1}
$$

où $K_k = \int_0^1 \prod_{m=0}^{k} |y - m/k|\, dy$ **ne dépend que du nombre de points d'interpolation** (et pas de f, a, b). Une méthode basée sur les formules de Newton-Cotes est donc **d'ordre k+1**, où $k+1$ est le nombre de points d'interpolation dans chaque sous-intervalle.

**Théorème (admis).** Pour $p \ge 1$ et $f$ de classe $C^{2p+2}$ sur $[a,b]$, les méthodes de Newton-Cotes basées sur un polynôme de **degré pair 2p sont d'ordre 2p+2** (un ordre de plus que ce que la formule générale suggérerait — gain gratuit pour les degrés pairs).

## Méthode des trapèzes (k=1, Newton-Cotes à 2 points)

On choisit 2 points dans $[x_{j-1},x_j]$ : $x_{0j} = x_{j-1}$ et $x_{1j} = x_j$. Le polynôme d'interpolation est de degré 1 (une fonction affine sur chaque sous-intervalle). On calcule les coefficients de quadrature :

$$
\ell_{0j} = \ell_{1j} = \frac{b-a}{2n}
$$

D'où l'approximation sur chaque sous-intervalle :

$$
\int_{x_{j-1}}^{x_j} f(x)dx \approx \frac{x_j-x_{j-1}}{2} \cdot (f(x_{j-1})+f(x_j))
$$

**Formule des trapèzes globale :**

$$
I^n_{1,\text{Newton-Cotes}}(f) = \frac{b-a}{2n} \cdot \sum_{j=1}^{n} (f(x_{j-1})+f(x_j))
$$

:::note Remarque
La méthode des trapèzes est la **moyenne** des méthodes des rectangles à gauche et à droite :
$I^n_{1,\text{Newton-Cotes}}(f) = \frac{1}{2}(I^n_{g,\text{Riemann}}(f) + I^n_{d,\text{Riemann}}(f))$
:::

### Erreur de la méthode des trapèzes

$$
\left|\int_a^b f(x)dx - I^n_{1,\text{Newton-Cotes}}\right| \le \frac{b-a}{12} \cdot \sup_{\eta\in[a,b]} |f''(\eta)| \cdot \left(\frac{b-a}{n}\right)^2
$$

**La méthode des trapèzes est donc d'ordre 2** — comme la méthode du point milieu, mais avec une constante d'erreur (1/12) deux fois plus grande que celle du point milieu (1/24). **En pratique, on préfère donc la méthode du point milieu à celle des trapèzes**, l'estimation d'erreur étant plus favorable.

## Méthode de Simpson (k=2, Newton-Cotes à 3 points)

On considère 3 points dans $[x_{j-1},x_j]$ : $x_{0j}=x_{j-1}$, $x_{1j}=x_{j-1/2}$ (point milieu), $x_{2j}=x_j$. Le polynôme d'interpolation est de degré 2 (une parabole sur chaque sous-intervalle). Le calcul des coefficients de quadrature donne :

$$
\ell_{0j} = \ell_{2j} = \frac{b-a}{6n} \qquad \ell_{1j} = \frac{4(b-a)}{6n}
$$

D'où sur chaque sous-intervalle :

$$
\int_{x_{j-1}}^{x_j} f(x)dx \approx \frac{b-a}{6n} \cdot (f(x_{j-1}) + 4f(x_{j-1/2}) + f(x_j))
$$

**Formule de Simpson globale :**

$$
I^n_{2,\text{Newton-Cotes}}(f) = \frac{b-a}{6n} \cdot \sum_{j=1}^{n} (f(x_{j-1}) + 4f(x_{j-1/2}) + f(x_j))
$$

:::note Remarque
$I^n_{2,\text{Newton-Cotes}}(f) = \frac{1}{6} \cdot (I^n_{g,\text{Riemann}}(f) + 4\cdot I^n_{\text{milieu}}(f) + I^n_{d,\text{Riemann}}(f))$
:::

### Erreur de la méthode de Simpson

$$
\left|\int_a^b f(x)dx - I^n_{2,\text{Newton-Cotes}}\right| \le \frac{b-a}{90} \cdot \sup_{\eta\in[a,b]} |f^{(3)}(\eta)| \cdot \left(\frac{b-a}{n}\right)^3
$$

Comme la méthode de Simpson est basée sur un polynôme de degré 2 (**pair**), elle est, d'après le théorème admis, **d'ordre 2+2 = 4** (et non 3, gain gratuit du degré pair).

## Exemple comparatif

Pour $I = \int_0^1 x\cdot\ln(1+x)\, dx = 2\ln 2 - 1 \approx 0.38629436111$, l'erreur absolue commise en fonction du nombre de sous-intervalles $n$, pour les 3 méthodes :

| n | Rectangles (ordre 1) | Trapèzes (ordre 2) | Simpson (ordre 4) |
|---|---|---|---|
| 5 | 0.0710 | 0.00167 | 0.957×10⁻⁶ |
| 10 | 0.0351 | 0.000416 | 0.0605×10⁻⁶ |
| 25 | 0.0139 | 0.0000667 | 0.00155×10⁻⁶ |
| 50 | 0.00695 | 0.0000167 | 0.000972×10⁻⁶ |

On voit l'intérêt des méthodes d'ordre élevé : la méthode de Simpson avec seulement 5 sous-intervalles donne déjà une erreur de l'ordre de $10^{-6}$, largement meilleure que les rectangles ou les trapèzes avec beaucoup plus de sous-intervalles.

## Méthodes d'ordres supérieurs

Pour obtenir des méthodes d'ordres supérieurs, il faut calculer des coefficients de quadrature $\ell_{m,j}$ de plus en plus complexes, avec $k+1$ points d'interpolation par sous-intervalle.

En notant $h = (b-a)/n$ et $f_{m,j} = f(x_{m,j})$ :

| Méthode | Ordre | Degré du polynôme | Approximation sur $[x_{j-1},x_j]$ |
|---|---|---|---|
| Trapèze (2 points) | 2 | 1 | $\frac{h}{2} (f_{0,j} + f_{1,j})$ |
| Simpson (3 points) | 4 | 2 | $\frac{h}{6} (f_{0,j} + 4f_{1,j} + f_{2,j})$ |
| 4 points | 4 | 3 | $\frac{h}{8} (f_{0,j} + 3f_{1,j} + 3f_{2,j} + f_{3,j})$ |
| 5 points | 6 | 4 | $\frac{h}{90} (7f_{0,j} + 32f_{1,j} + 12f_{2,j} + 32f_{3,j} + 7f_{4,j})$ |
| 7 points | 8 | 6 | $\frac{h}{840} (41f_{0,j} + 216f_{1,j} + 27f_{2,j} + 272f_{3,j} + 27f_{4,j} + 216f_{5,j} + 41f_{6,j})$ |

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/mn-ch2-integration-numerique.pdf" />

</TabItem>
</Tabs>
