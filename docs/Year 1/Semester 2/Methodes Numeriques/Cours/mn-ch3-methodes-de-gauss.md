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
- une fonction poids $w(x) > 0$ sur un intervalle $]a,b[$ borné ou non,
- une fonction $f$ telle que $f\cdot w$ est intégrable sur $[a,b]$,

on considère la formule de quadrature :

$$
\int_a^b f(x)w(x)dx = \sum_{i=0}^{n} \lambda_i f(x_i) + E(f)
$$

On veut choisir les $\lambda_i$ et les $x_i$ tels que cette formule soit exacte pour un ordre le plus élevé possible (c'est-à-dire $E(f)=0$ pour $f(x)=x^k$, $k=0,1,2,\ldots,m$, $m$ le plus élevé possible).

## Idées et solutions

**Théorème (existence et unicité de la solution).** Il existe un choix et un seul de points $x_i$ et des $\lambda_i$ de sorte que la méthode soit d'ordre $N = 2n+1$.

Les $x_i \in ]a,b[$ et sont les racines du $(n+1)$-ième polynôme orthogonal pour le poids $w$.

$$
\lambda_i = \int_a^b l_i(x)w(x)dx
$$

avec $l_i(x)$ le i-ième polynôme de base de Lagrange.

**Théorème (erreur d'intégration).** Pour $f \in C^{2n+2}_{[a,b]}$, il existe $\xi \in ]a,b[$ tel que :

$$
E(f) = \frac{f^{(2n+2)}(\xi)}{(2n+2)!} \cdot \int_a^b \pi^2_{n+1}(x)w(x)dx
$$

## Exemples de familles de polynômes orthogonaux

| Famille | $]a,b[$ | Poids $w(x)$ |
|---|---|---|
| Polynômes de Laguerre | $]0,+\infty[$ | $e^{-x}$ |
| Polynômes d'Hermite | $\mathbb{R}$ | $e^{-x^2}$ |
| Polynômes de Legendre | $]-1,1[$ | $1$ |
| Polynômes de Tchebychev | $]-1,1[$ | $\frac{1}{\sqrt{1-x^2}}$ |

## Gauss-Legendre

| n+1 | $\pi_{n+1}(x)$ | $x_0,\ldots,x_n$ | $\lambda_0,\ldots,\lambda_n$ | Ordre N |
|---|---|---|---|---|
| 0 | 1 | | | |
| 1 | $x$ | $0$ | $2$ | 1 |
| 2 | $x^2-1$ | $-1/\sqrt{3}, 1/\sqrt{3}$ | $1, 1$ | 3 |
| 3 | $x^3-\frac{3}{5}x$ | $-\sqrt{3/5}, 0, \sqrt{3/5}$ | $5/9, 8/9, 5/9$ | 5 |
| 4 | $x^4-\frac{6}{7}x^2+\frac{3}{35}$ | \| | \| | 7 |
| 5 | $x^5-\frac{10}{9}x^3+\frac{5}{21}x$ | \| | compliqués | 9 |

## Gauss-Tchebychev

Les polynômes de Tchebychev sont deux à deux orthogonaux relativement au poids $w(x) = 1/\sqrt{1-x^2}$.

Les points $(x_i)_{0\le i\le n}$ sont les points d'interpolation de Tchebychev dans $[-1,1]$ :

$$
x_i = \cos\left(\frac{2i+1}{2n+2} \cdot \pi\right), \quad 0 \le i \le n
$$

On peut démontrer que $\lambda_i = \pi/(n+1)$, on obtient donc une méthode d'ordre $2n+1$ s'écrivant :

$$
\int_{-1}^{1} \frac{f(x)\, dx}{\sqrt{1-x^2}} \approx \frac{\pi}{n+1} \cdot \sum_{i=0}^{n} f\left(\cos\left(\frac{2i+1}{2n+2} \cdot \pi\right)\right)
$$

## TD

**Exercice 1.** Calculer par l'une des méthodes de Gauss l'intégrale suivante :

$$
\int_0^1 \frac{x^4}{\sqrt{x(1-x)}}\, dx
$$

**Exercice 2.** Soit $x_1, x_2 \in [-1,1]$ et $\lambda_1, \lambda_2$ deux réels. On considère la méthode d'intégration numérique :

$$
\int_{-1}^{1} f(x)dx = \lambda_1 f(x_1) + \lambda_2 f(x_2) + E(f)
$$

Selon les valeurs de $x_1, x_2$ et $\lambda_1, \lambda_2$, étudier l'ordre de cette méthode.

**Exercice 3.** Utiliser la méthode de Gauss-Legendre pour estimer $\int_0^{2/3} \frac{dx}{1-x}$.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/mn-ch3-methodes-de-gauss.pdf" />

</TabItem>
</Tabs>
