---
sidebar_position: 2
title: "TD : Unconstrained Nonlinear Programming 1"
sidebar_label: TD1 - Optimisation Non Linéaire
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD : Unconstrained nonlinear programming 1

*Université de Manouba — École Nationale des Sciences de l'Informatique — Linear and Nonlinear Programming II.2 — A.U. 2023-2024 — Novembre 2023*

<!-- TODO: this document is genuinely distinct from "TD-1-PLNL.pdf" (a Linear Programming simplex/dual exercise series kept as its own standalone doc, pl-td1-plnl.md) despite both being labeled "TD1" in the task brief — this one is titled "Unconstrained nonlinear programming 1" and covers 1D optimality conditions, convexity, Newton-Raphson, and golden-section search, so it is not a duplicate. Source is bilingual (French exposition, English exercise statements) — preserved as-is, not translated. -->

## 1 Les conditions d'optimalité en dimension 1

### 1.1 Vocabulaires

Soit $f : [a,b] \to \mathbb{R}$ une fonction dérivable. Soit $\bar x \in ]a,b[$. On dit que $\bar x$ est un **point critique** de $f$ lorsque $f'(\bar x) = 0$. L'ensemble des points critiques de $f$ est

$$C(f) = \{x \in ]a,b[ : f'(x) = 0\}$$

**Exercice 1.** Déterminer l'ensemble des points critiques des fonctions suivantes :

1. $f_0(x) = x^3 - 3x + 1$
2. $f_1(x) = x^3 + \frac{3}{2}x^2 - 2x + 1$
3. $f_2(x) = \cos(x) - \frac{1}{2}x + 1$
4. $f_3(x) = -\sqrt{3x} - 3\sqrt{1+x} + (1+x)^{3/2}$

On considère le problème d'optimisation

$$(P) \qquad \min_{x\in[a,b]} f(x).$$

On dit que $\bar x$ est une **solution globale** de $(P)$ lorsque $f(\bar x) \le f(x),\ \forall x \in [a,b]$. Par exemple, si $f$ est croissante alors $\bar x = a$ est une solution globale de $(P)$.

On dit que $\bar x$ est une **solution locale** de $(P)$ lorsqu'il existe $h > 0$ tels que $]\bar x-h, \bar x+h[ \subset [a,b]$ et $f(\bar x) \le f(x),\ \forall x \in ]\bar x-h, \bar x+h[$.

Remarquons que si $f$ est maximale en $\bar x$ alors $-f$ est minimale en $\bar x$, par suite, tous les problèmes de maximisation peuvent se ramener à des problèmes de minimisation.

### 1.2 Condition nécessaire d'optimalité d'ordre 1

Si $f$ est localement minimale (ou maximale) en $\bar x$ alors $f'(\bar x) = 0$.

Par exemple $f(x) = x^2$ est minimale en 0. On a bien $f'(0)=0$. C'est une condition nécessaire qui n'est pas suffisante : $f(x)=x^3$ satisfait $f'(0)=0$ mais $f(x)=x^3$ n'est pas localement optimale en 0.

Cette condition réduit le domaine de recherche des solutions locales de $(P)$ à l'ensemble des points critiques de $f$. Est-ce qu'on peut réduire encore le domaine de recherche de la solution optimale ?

### 1.3 Condition nécessaire d'optimalité d'ordre 2

Supposons ici que $f$ est deux fois dérivable.

Si $f$ est localement minimale en $\bar x$ alors $f'(\bar x)=0$ et $f''(\bar x)\ge0$.

Par exemple $f(x)=x^2$ est minimale en 0. On a bien $f'(0)=0$ et $f''(0)\ge0$.

C'est une condition nécessaire qui n'est pas suffisante : $f(x)=x^3$ satisfait $f'(0)=0$ et $f''(0)\ge0$ mais $f(x)=x^3$ n'est pas localement minimale en 0.

Cette condition réduit encore le domaine de recherche des solutions locales de $(P)$ à l'ensemble des points critiques de $f$, où la dérivée seconde est positive.

Remarquons que si $f$ est localement maximale en $\bar x$ alors $f'(\bar x)=0$ et $f''(\bar x)\le0$.

**Exercice 2.** Pour chacune des fonctions de l'exercice 1, sélectionner les points critiques qui satisfont la condition nécessaire d'optimalité d'ordre 2.

### 1.4 Condition suffisante d'optimalité d'ordre 2

Si $f'(\bar x)=0$ et $f''(\bar x)>0$ alors $f$ est localement minimale en $\bar x$.

Par exemple pour $f(x)=x^2$, $f'(0)=0$ et $f''(0)>0$. $\bar x=0$ satisfait la condition suffisante d'optimalité d'ordre 2. C'est une condition suffisante qui n'est pas nécessaire. On peut avoir un candidat optimal qui satisfait $f'(\bar x)=0$ et $f''(\bar x)=0$, par exemple, pour $f(x)=x^4$, on a $f'(0)=0$ et $f''(0)=0$, par suite $\bar x=0$ ne satisfait pas la condition suffisante d'optimalité d'ordre 2 alors que $f(x)=x^4$ est globalement minimale en $\bar x=0$.

**Exercice 3.** Pour chacune des fonctions de l'exercice 1, sélectionner les points critiques qui satisfont la condition suffisante d'optimalité d'ordre 2.

### 1.5 Cas d'une fonction convexe

On dit qu'une fonction $f : [a,b] \to \mathbb{R}$ est **convexe** lorsque

$$f(tx_1+(1-t)x_2) \le tf(x_1)+(1-t)f(x_2),\ \forall t\in[0,1],\ \forall x_1,x_2\in[a,b]$$

$f$ est dite **strictement convexe** lorsque l'inégalité précédente est réalisée de façon stricte $\forall t\in]0,1[$, $\forall x_1,x_2\in]a,b[$. Géométriquement, la courbe d'une fonction convexe est située au-dessous de toute corde reliant deux de ces points.

1. Si $f''$ est positive sur $[a,b]$ alors $f$ est convexe sur $[a,b]$.
2. Si $f''$ est positive et ne s'annule pas sur un intervalle de mesure non nulle alors $f$ est strictement convexe sur $[a,b]$. Par exemple $f(x)=x^2$ est strictement convexe sur $\mathbb{R}$. $f(x)=x$ est convexe mais elle n'est pas strictement convexe.
3. Si $f$ est convexe alors toute solution locale de $(P)$ est une solution globale.
4. Si $f$ est convexe alors la condition nécessaire d'optimalité d'ordre 1 est une condition suffisante.
5. Si $f$ est strictement convexe alors $(P)$ admet au maximum une solution unique.

**Exercice 4.** Pour chacune des fonctions de l'exercice 1, préciser les domaines de convexité et optimiser la fonction sur ses domaines de convexité.

**Exercice 5.** Soit $f(x) = x^4 + e^{-x}$. On considère le problème d'optimisation

$$(P) \qquad \min_{x\in\mathbb{R}} f(x).$$

1. Montrer que $(P)$ admet une unique solution $\bar x$.
2. Donner un encadrement de $\bar x$.
3. Construire une suite récurrente $x_n$ qui permet de s'approcher de $\bar x$ au fur et à mesure que $n$ augmente.

**Exercice 6.** A metal box (without a top) is to be constructed from a square sheet of metal that is 20 cm on a side by cutting square pieces of the same size from the corners of the sheet and then folding up the sides. Find the dimensions of the box with the largest volume that can be constructed in this manner.

**Exercice 7.** A rectangular field adjacent to a river is to be enclosed. Fencing along the river costs 5\$ per meter, and the fencing for the other sides costs 3\$ per meter. The area of the field is to be 1200 square meters. Find the dimensions of the field that is the least expensive to enclose.

## 2 Méthodes numériques

### 2.1 Newton-Raphson Méthode

Cette méthode permet de résoudre numériquement une équation de la forme $g(x)=0$, où $g$ est une fonction dérivable. On part d'un point $x_0$. La tangente $y = g'(x_0)(x-x_0)+g(x_0)$ à la courbe de $g$ en $x_0$ coupe l'axe des abscisses en $x_1$. Soit $x_1 = x_0 - \dfrac{g(x_0)}{g'(x_0)}$, ainsi la suite récurrente qui décrit la méthode de Newton-Raphson s'écrit : $x_{n+1} = x_n - \dfrac{g(x_n)}{g'(x_n)}$. Si $x_0$ est suffisamment proche de la solution dès le départ, cette suite converge vers une solution de $g(x)=0$.

Puisque la condition nécessaire d'optimalité d'ordre 1 ramène le problème d'optimisation à une équation de la forme $g(x)=0$ avec $g=f'$ alors on peut appliquer la méthode de Newton-Raphson pour aller, à partir d'un point $x_0$, vers la solution suivant la suite récurrente

$$x_{n+1} = x_n - \frac{f'(x_n)}{f''(x_n)}.$$

**Exercice 8.** On revient à l'exercice 6.

1. Écrire avec $\mathcal{R}$ les fonctions $f$, $f'$, $f''$.
2. En partant de $x_0=0$, calculer les termes $x_1,...,x_6$ de la méthode de Newton-Raphson.
3. Regrouper les valeurs de $x_i, f(x_i)$ dans un data.frame de $\mathcal{R}$.
4. Tracer avec $\mathcal{R}$ la courbe de $f$ sur l'intervalle $[-2,2]$ subdivisé par un pas de 0.01.
5. Tracer sur la même courbe les points $(x_i, f(x_i))$ (point par point) avec une couleur différente.

**Exercice 9.** Reprendre les mêmes questions de l'exercice 8 pour les cas suivants :

1. $f(x) = x(\log(x)-1) - \sin(x)$, starting from $x_0=1$.
2. $f(x) = x^2 + \dfrac{1}{x^3}$, starting from $x_0=-2$.
3. $f(x) = (2x-5)^4 - (x^2-1)^3$, starting from $x_0=-2$.

### 2.2 The golden section search method

Cette méthode permet de localiser le minimum d'une fonction sur un intervalle $[a,b]$. On choisit deux points $x_1$ et $x_2$ de $[a,b]$ avec $x_1<x_2$ et on compare $f(x_1)$ et $f(x_2)$.

Si $f(x_1)<f(x_2)$ alors on suppose que le minimum est dans la région qui contient $x_1$. On supprime la région $]x_2,b]$. Dans l'itération suivante, on minimise $f$ sur l'intervalle $[a,x_2]$.

Si $f(x_1)\ge f(x_2)$ alors on suppose que le minimum est dans la région qui contient $x_2$. On supprime la région $[b,x_1]$. Dans l'itération suivante on minimise $f$ sur $[x_1,b]$.

Suivant le choix des points $x_1$ et $x_2$ cette méthode peut échouer pour détecter le minimum. L'expérience montre que la proportion d'or $r = \dfrac{2}{\sqrt5+1} \approx 0.618$ permet de faire un bon choix de $x_1$ et $x_2$. Souvent rencontrée dans la nature, la proportion d'or confirme que cet univers n'est pas construit par hasard.

Initialement, on pose $x_1 = b - r(b-a)$ et $x_2 = a + r(b-a)$.

Si $f(x_1)<f(x_2)$ alors dans la seconde itération : $a$ garde sa valeur, $b$ prend la valeur de $x_2$, on choisit pour $x_2$ la valeur de $x_1$ et on choisit pour $x_1$ la valeur de $b-r(b-a)$.

Si $f(x_1)\ge f(x_2)$ alors dans la seconde itération : $a$ prend la valeur de $x_1$, $b$ garde sa valeur, on choisit pour $x_1$ la valeur de $x_2$ et on choisit pour $x_2$ la valeur de $a+r(b-a)$.

On répète la comparaison entre $f(x_1)$ et $f(x_2)$ avec les nouvelles valeurs de $x_1$ et $x_2$. La solution est toujours comprise entre $a$ et $b$. $\dfrac{a+b}{2}$ est une valeur approchée de la solution.

**Exercice 10.** On veut tester la méthode de golden en cherchant le minimum de $f(x)=x^2-3x+1$ sur $[0,2]$.

1. Montrer que $f$ est minimale en $\bar x = 1.5$. Calculer la valeur de $f$ en $\bar x=1.5$.
2. Avec une boucle « for », calculer les valeurs de $a, b, |b-a|, \dfrac{a+b}{2}$ dans les 5 premières itérations de la méthode de golden. On donnera le résultat sous forme d'un data.frame.

**Exercice 11.** Calculer $a, b, |b-a|, \dfrac{a+b}{2}$ dans les 4 premières itérations de la méthode de Golden appliquée aux fonctions suivantes :

1. $f(x) = x^3+5x^2+4x+6$ on the interval $[-2,2]$.
2. $f(x) = 3x^2+\dfrac{10}{x}$ on the interval $[0,4]$.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/pl-td1-optimisation-non-lineaire.pdf" />

</TabItem>
</Tabs>
