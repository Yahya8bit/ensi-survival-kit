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

On considère $x,y \in \mathbb{R}^4$ donnés par $x = [-2, 0, 1, 2]$ et $y = [4, 0, 0, 4]$. Parmi les polynômes suivants, lequel est le polynôme d'interpolation $P$ aux points x, y (justifiez votre réponse) ?

1. $P_1(x) = x^4 - \frac{2}{3}x^3 - 3x^2 + \frac{8}{3}x$
2. $P_2(x) = \frac{4}{3}x^2 - \frac{4}{3}$
3. $P_3(x) = \frac{1}{3}x^3 + x^2 - \frac{4}{3}x$

<details>
<summary>Correction</summary>

On ne demande pas ici de calculer le polynôme mais de l'identifier, via la caractérisation équivalente (liée à l'unicité) du polynôme d'interpolation de Lagrange :

$$
P \text{ pol. d'interp. de Lagrange associé à } x,y \iff (\deg(P) \le 3,\ P(-2)=4,\ P(0)=0,\ P(1)=0,\ P(2)=4)
$$

Il suffit de trouver le polynôme qui satisfait toutes ces propriétés (existence et unicité garanties par le théorème du cours). $P_1$ est de degré 4 → éliminé. $P_2$ a un terme constant non nul, donc $P_2(0) \neq 0$ → éliminé. Reste $P_3$, on vérifie qu'il convient : c'est donc lui.

</details>

## Exercice 2 (Construction... Malin ou bourrin ?)

Calculer les polynômes d'interpolation de Lagrange aux points suivants :

**a.** $x = [-1, 2, 3]$ et $y = [4, 4, 8]$

<details>
<summary>Correction</summary>

On calcule la base de Lagrange associée à x :

$$
\begin{aligned}
L_0(X) &= \frac{1}{12} (X-2)(X-3) \\
L_1(X) &= -\frac{1}{3} (X+1)(X-3) \\
L_2(X) &= \frac{1}{4} (X+1)(X-2)
\end{aligned}
$$

et alors $P_a(X) = 4L_0(X) + 4L_1(X) + 8L_2(X)$.

**IMPORTANT** : il n'est pas demandé/nécessaire/souhaitable de développer les polynômes de la base de Lagrange ni même de développer $P_a$ — vous allez ajouter des erreurs et le résultat final sera faux.

</details>

**b.** $x = [-2, -1, 0, 1]$ et $y = [0, -2, -4, 0]$

<details>
<summary>Correction</summary>

On voit que le polynôme a 2 racines : −2 et 1. Il peut donc être factorisé par $(X+2)(X-1)$, c'est-à-dire qu'il existe un polynôme $Q$ tel que $P_b(X) = Q(X)(X+2)(X-1)$. Comme $\deg(P_b) \le 3$, nécessairement $Q$ est de degré ≤ 1 : $Q(X) = aX + b$.

On cherche $a$ et $b$ en utilisant les autres valeurs : $P_b(-1) = -2$, $P_b(0) = -4$, ce qui équivaut à :

$$
\begin{cases}
-2(-a+b) = -2 \\
-2b = -4
\end{cases}
$$

ce qui donne $b=2$, $a=1$, soit $P_b(X) = (X+2)^2(X-1)$. On vérifie a posteriori que $P_b$ convient bien.

</details>

**c.** $x = [-1, 0, 1, 2]$ et $y = [6, 2, 0, 0]$

<details>
<summary>Correction</summary>

Même méthode, en remarquant que 1 et 2 sont racines de $P_c$. On obtient par le même raisonnement :

$$
P_c(X) = -(X-2)(X-1) \cdot (aX+b)
$$

qui se résout en $P_c(X) = -(X-2)(X-1)(X+3)$.

**Remarque** : on peut évidemment calculer $P_b$ et $P_c$ en calculant les polynômes de degré 3 de la base de Lagrange, mais il n'est pas nécessaire de calculer TOUS les polynômes de la base : seuls les polynômes où $P$ ne s'annule pas sont utiles.

</details>

**d.** $x = [-1, 0, 1]$ et $y = [1, 0, 1]$

<details>
<summary>Correction</summary>

Un simple coup d'œil permet de constater que $X^2$ convient, par unicité, on sait donc que $P_d(X) = X^2$.

</details>

**e.** $x = [-3, -1, 2, 10]$ et $y = [-3, -1, 2, 10]$

<details>
<summary>Correction</summary>

Encore plus simple que précédemment, ici $P_e(X) = X$.

</details>

## Exercice 3 (Utilisation de la caractérisation)

Soit $P$ un polynôme. Montrer que son polynôme d'interpolation aux nœuds $x_i \in \mathbb{R}, 0 \le i \le n$ est le reste de la division euclidienne de $P$ par le polynôme $\pi_n(x) = (x-x_0)(x-x_1)\ldots(x-x_n)$.

<details>
<summary>Correction</summary>

On doit démontrer que le reste de la division euclidienne de $P$ par $\pi_n$ (appelons-le $R$) est LE polynôme d'interpolation de $P$ aux nœuds $x_i$, $i=1\ldots n$, c'est-à-dire, en utilisant la caractérisation :

$$
\deg(R) \le n, \qquad \forall i=1\ldots n,\ R(x_i) = P(x_i)
$$

Rappelons comment est défini $R$ : $\deg(R) < \deg(\pi_n) = n+1$, et il existe un polynôme $Q$ tel que $P(X) = Q(X)\pi_n(X) + R(X)$ — c'est la définition du reste de la division euclidienne de $P$ par $\pi_n$.

On sait donc que $\deg(R) \le n$. Maintenant, on évalue $P(x_i)$ pour tout $i$ :

$$
P(x_i) = Q(x_i)\pi_n(x_i) + R(x_i)
$$

Or, la définition de $\pi_n$ dit que pour tout $i$, $\pi_n(x_i) = 0$. On a donc bien $P(x_i) = R(x_i)$ pour tout $i$ et la preuve est finie !

</details>

## Exercice 4 (Construction...)

Calculer le polynôme $P$ de degré inférieur ou égal à 4 tel que :

**1.** $P(-2)=11, P(-1)=1, P(0)=1, P(1)=5, P(2)=31$

<details>
<summary>Correction</summary>

À moins d'avoir envie de calculer l'inverse d'une matrice de Vandermonde de taille 5 ou de calculer les 5 polynômes de la base de Lagrange associée à ces nœuds, le mieux est ici d'utiliser la **base de Newton**. En faisant le tableau des différences divisées, on obtient :

$$
P(X) = 11 - 10(X+2) + 5(X+2)(X+1) + (X+2)(X+1)X + \frac{1}{2}(X+2)(X+1)X(X-1)
$$

</details>

**2.** En remarquant que le polynôme cherché admet une racine simple en 0 et une racine double en 1, calculer le polynôme $P$ de degré ≤ 4 tel que : $P(-1)=4, P'(-1)=-4, P(0)=0, P(1)=0, P'(1)=0$.

<details>
<summary>Correction</summary>

Cet exercice est un peu différent puisqu'il ne s'agit pas d'interpolation de Lagrange classique : on impose aussi des valeurs aux **dérivées** de $P$ aux nœuds d'interpolation.

Deux méthodes sont envisageables : la méthode « bourrin » (chercher $P$ sous forme indéterminée et écrire les 5 équations vérifiées par ses coefficients — système linéaire de taille 5) et la méthode « malin ».

On remarque que le polynôme cherché a le bon goût d'avoir une racine simple : 0, et une racine double : 1 (c'est-à-dire que $P$ ET $P'$ s'annulent en 1). On peut donc le factoriser par $X(X-1)^2$ et le chercher (puisqu'il est de degré ≤ 4) sous la forme :

$$
P(X) = X(X-1)^2(aX+b)
$$

Il ne reste plus qu'à chercher $a$ et $b$ en utilisant les valeurs de $P$ et $P'$ en −1. On obtient après calcul :

$$
\begin{cases}
a - b = 1 \\
3a + 2b = -1
\end{cases}
$$

ce qui donne $a = 4/5$, $b = -1/5$, et donc finalement $P(X) = \frac{1}{5}X(X-1)^2(4X-1)$.

</details>

## Exercice 5

**1°)** En utilisant la méthode de Newton pour $f(x) = 1/(1+x)$, aux points $x_0=0, x_1=1, x_2=2$ :

<details>
<summary>Correction</summary>

Table des différences divisées (base de Newton) :

```
     0     1     2
1    1    1/2   1/3
x         -1/2  -1/3
x(x-1)          1/6
```

$P_2(x) = 1 - \frac{1}{2}x + \frac{1}{6}x(x-1)$

Vérification : $P_2(0)=1$, $P_2(1)=1/2$, $P_2(2)=1/3$ — OK !

</details>

**2°)** En rajoutant le point $x_3 = 3$ :

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

$P_3(x) = 1 - \frac{1}{2}x + \frac{1}{6}x(x-1) - \frac{1}{24}x(x-1)(x-2)$

Vérification : $P_3(0)=1, P_3(1)=1/2, P_3(2)=1/3, P_3(3)=1/4$ — OK !

</details>

## Exercice 6 (Examen 2016) — *Exercice optionnel, pour aller plus loin*

Soient $x_0 = 0 < x_1 < \ldots < x_n$ et des réels donnés $y_i$, $0 \le i \le n$. On considère le polynôme d'interpolation satisfaisant $P(x_0)=y_0$, $P(-x_i)=P(x_i)=y_i$ pour $1 \le i \le n$.

**1.** Montrer que le polynôme $P$ est pair.

<details>
<summary>Correction</summary>

Cette question est un peu moins classique que le reste du TD. On note $x_{-i} = -x_i$. On a donc $2n+1$ nœuds : $x_{-i}, x_i$ pour $i=1\ldots n$ et 0. Le polynôme cherché est donc de degré ≤ 2n.

$P$ n'est pas forcément de degré $2n$. De plus, être de degré pair n'entraîne pas que $P$ soit pair (par exemple $X^2+X+1$ n'est ni pair ni impair). Pour être pair, $P$ doit être une **somme de polynômes pairs**.

Cas $n=1$ : trois points $0, x_1, -x_1$. Base de Lagrange :

$$
\begin{aligned}
L_0(X) &= -\frac{1}{x_1^2} (X-x_1)(X+x_1) = -\frac{1}{x_1^2} (X^2-x_1^2) \\
L_1(X) &= \frac{1}{2x_1^2} X(X+x_1) \\
L_{-1}(X) &= \frac{1}{2x_1^2} X(X-x_1)
\end{aligned}
$$

$P(X) = y_0L_0(X) + y_1(L_1(X)+L_{-1}(X))$. On constate que $L_0$ est pair, et $L_1(X)+L_{-1}(X) = X^2/x_1^2$ est pair (car $y_{-1}=y_1$). $P$ est donc somme de deux polynômes pairs : il est pair.

**Cas général $n \ge 1$** : par un calcul similaire en 3 étapes (calcul de $L_0$, calcul de $L_k$ et $L_{-k}$ pour chaque $k$, puis assemblage), on montre que $L_0(X) = \prod_i \frac{X^2-x_i^2}{-x_i^2}$ est pair, et que $L_k(X)+L_{-k}(X)$ est également pair pour tout $k$. $P$ étant somme de polynômes pairs, il est pair.

</details>

**2.** En déduire, avec un minimum de calculs, le polynôme d'interpolation vérifiant $P(-1)=2, P(0)=4, P(1)=2$.

<details>
<summary>Correction</summary>

En utilisant le résultat de la question précédente (cas à 3 points, $x_1=1$, $y_0=4$, $y_1=2$) :

$$
P(X) = -\frac{y_0}{x_1^2} (X^2-x_1^2) + \frac{y_1}{x_1^2} X^2 = -4(X^2-1) + 2X^2 = -2X^2 + 4
$$

On vérifie bien que $P$ est pair et qu'il convient.

</details>

## Exercice 7

Le polynôme de Lagrange est de degré 4 : $P_4(x) = \sum_{k=0}^{4} f(x_k)L_k(x)$, avec les 5 nœuds équirépartis $x_0=-2, x_1=-1, x_2=0, x_3=1, x_4=2$.

<details>
<summary>Correction</summary>

$$
\begin{aligned}
L_0(x) &= \frac{1}{24}x(x+1)(x-1)(x-2) \\
L_1(x) &= -\frac{1}{8}x(x+2)(x-1)(x-2) \\
L_2(x) &= \frac{1}{4}(x+2)(x+1)(x-1)(x-2) \\
L_3(x) &= -\frac{1}{6}x(x+2)(x+1)(x-2) \\
L_4(x) &= \frac{1}{24}x(x+2)(x+1)(x-1)
\end{aligned}
$$

On obtient finalement $P_4(x) = \frac{1}{10}x^4 - \frac{3}{5}x^2 + 1$.

**Calcul de l'erreur théorique**, donnée par $E(x) = f(x) - P_n(x) = \frac{\gamma_{n+1}(x)}{(n+1)!} \cdot f^{(n+1)}(\xi_x)$, majorée par $|E(x)| \le \frac{|\gamma_{n+1}(x)|}{(n+1)!} \cdot M_{n+1}$ où $\gamma_{n+1}(x) = \prod_k(x-x_k)$ et $M_{n+1} = \max_t|f^{(n+1)}(t)|$.

Ici, $\gamma_5(x) = x(x^2-1)(x^2-4)$. Un calcul (assez long) donne $f^{(5)}(x) = -240x(3-10x^2+3x^4)/(1+x^2)^6$, d'où $M_5 = 100$. Finalement :

$$
|E(x)| \le |x(x^2-1)(x^2-4)| \cdot \frac{100}{5!} = |x(x^2-1)(x^2-4)| \cdot \frac{5}{6}
$$

</details>

## Exercice 8

**1°)** $E(f) = P_n(x) - f(x)$, avec $\sin^{(n+1)}(\xi) \le 1$ :

<details>
<summary>Correction</summary>

$$
|P_n(x)-f(x)| \le \frac{|\pi_{n+1}(x)| \, |\sin^{(n+1)}(\xi)|}{(n+1)!} \le \frac{|\pi_{n+1}(x)|}{(n+1)!}
$$

Comme $\pi_{n+1}(x) = (x-x_0)(x-x_1)\ldots(x-x_n)$, chaque terme est majoré par $(b-a)$, donc $|\pi_{n+1}(x)| \le (b-a)^{n+1}$, ce qui donne $|P_n(x)-f(x)| \le \frac{(b-a)^{n+1}}{(n+1)!}$.

</details>

**2°)** En utilisant la formule de Stirling $n! \sim (n/e)^n\sqrt{2\pi n}$, montrer que le majorant tend vers 0.

<details>
<summary>Correction</summary>

Puisque $n!/((n/e)^n\sqrt{2\pi n}) \to k > 0$, il existe toujours un réel positif $C$ tel que :

$$
\frac{(b-a)^{n+1}}{(n+1)!} \le C \cdot \left(\frac{b-a}{n+1}\right)^{n+1} \cdot \frac{e^{n+1}}{\sqrt{2\pi(n+1)}}
$$

d'où $\sup_{[a,b]} |P_n(x)-\sin(x)| \xrightarrow[n\to\infty]{} 0$.

</details>

## Exercice 9 (Convergence uniforme)

On considère $a=x_0<x_1<\ldots<x_n=b$ et le polynôme d'interpolation $P_n$ tel que $P_n(x_i)=e^{x_i}$ pour tout $i$. Montrer que $P_n$ converge uniformément vers $e^x$ sur $[a,b]$.

<details>
<summary>Correction</summary>

Pas besoin ici de connaître quoi que ce soit sur la convergence uniforme en général. On demande juste de montrer que $\sup_{x\in[a,b]} |P_n(x)-e^x| \xrightarrow[n\to\infty]{} 0$.

On utilise la seule formule du cours donnant une estimation entre un polynôme d'interpolation et sa fonction : $\forall x\in[a,b], |P_n(x)-f(x)| \le \frac{\|f^{(n+1)}\|_{\infty,[a,b]}}{(n+1)!} \cdot |\pi_{x_0,\ldots,x_n}(x)|$, où $\pi_{x_0,\ldots,x_n}(X) = \prod_i(X-x_i)$.

Pour la fonction exponentielle, on connaît les dérivées successives : c'est elle-même. Donc $\|f^{(n+1)}\|_{\infty,[a,b]} = e^b$. On a de plus (estimation générale, même si souvent très mauvaise) $\sup_{x\in[a,b]} |\Pi_{x_0,\ldots,x_n}(x)| \le (b-a)^{n+1}$.

Finalement :

$$
\sup_{x\in[a,b]} |P_n(x)-f(x)| \le e^b \cdot \frac{(b-a)^{n+1}}{(n+1)!} \xrightarrow[n\to\infty]{} 0
$$

</details>

## Exercice 10

Soient les trois points $(0,0)$, $(1,1)$, $(2,8)$ de la fonction $f(x) = x^3$.

**a.** Obtenir le système linéaire de dimension 3 permettant de calculer la spline cubique naturelle passant par ces trois points.

<details>
<summary>Correction</summary>

On a 4 conditions (ce qui suggère un polynôme de degré 3). Puisque $p(x) = a_0+a_1x+a_2x^2+a_3x^3$ et $p'(x) = a_1+2a_2x+3a_3x^2$, les 4 conditions se traduisent par... *(voir spline naturelle, système général ci-dessous)*.

Le polynôme sur chaque intervalle s'écrit $p_i(x) = f_i + f'_i(x-x_i) + \frac{f''_i}{2!}(x-x_i)^2 + \frac{f'''_i}{3!}(x-x_i)^3$. Puisqu'on veut la spline naturelle, on doit avoir $f''_0=f''_2=0$. Par la suite, on doit avoir :

$$
\frac{h_0}{h_0+h_1} f''_0 + 2f''_1 + \frac{h_1}{h_0+h_1} f''_2 = 6f[x_0,x_1,x_2]
$$

et comme $h_i = h = 1$ :

$$
\frac{1}{2}f''_0 + 2f''_1 + \frac{1}{2}f''_2 = 6f[x_0,x_1,x_2]
$$

Pour 3 points, on obtient un système 3×3. La table de différences divisées est :

```
0  0
      1
1  1        3
      7
2  8
```

Le système linéaire correspondant :

$$
\begin{cases}
f''_0 = 0 \\
\frac{1}{2}f''_0 + 2f''_1 + \frac{1}{2}f''_2 = 6\times3 = 18 \\
f''_2 = 0
\end{cases}
$$

soit $\begin{bmatrix}1&0&0\\ \frac{1}{2}&2&\frac{1}{2}\\ 0&0&1\end{bmatrix} \cdot \begin{bmatrix}f''_0\\f''_1\\f''_2\end{bmatrix} = \begin{bmatrix}0\\18\\0\end{bmatrix}$, d'où $f''_0=f''_2=0$ et $f''_1=9$.

</details>

**b.** À l'aide de la spline trouvée, donner une approximation de $f(\frac{1}{2})$ et comparer au résultat exact $1/8$.

<details>
<summary>Correction</summary>

Pour interpoler en $x=\frac{1}{2}$, on utilise l'équation de la spline dans le 1ᵉʳ intervalle $(x_0,x_1)$ :

$$
p_0(x) = f_0 + f'_0(x-x_0) + \frac{f''_0}{2!}(x-x_0)^2 + \frac{f'''_0}{3!}(x-x_0)^3
$$

Or : $f_0=f(x_0)=0$, $f'_0 = f[x_0,x_1] - \frac{h_0f''_0}{3} - \frac{h_0f''_1}{6} = 1 - 0 - 9/6 = -\frac{1}{2}$, $f'''_0 = (f''_1-f''_0)/h_0 = 9-0 = 9$.

On obtient donc $p_0(x) = 0 - \frac{1}{2}(x-0) + 0 + \frac{9}{6}(x-0)^3 = -\frac{1}{2}x + \frac{3}{2}x^3$, de sorte que $p_0(1/2) = -0.0625$.

On remarque que $f(1/2) = (1/2)^3 = 1/8 = 0.125$ : l'erreur de la spline naturelle est ici significative, car l'intervalle est court et les données peu nombreuses.

</details>

**c.** Expliquer l'erreur obtenue en interpolant une fonction cubique par des polynômes de degré 3.

<details>
<summary>Correction</summary>

Pour la spline naturelle, on impose $f''_0=0$ et $f''_2=0$, qui sont respectivement des approximations de la dérivée seconde de la fonction $f(x)$ en $x=0$ et $x=2$. Cette dernière condition est **incompatible avec la fonction f(x)=x³**, puisque $f''(x)=6x$ et qu'on devrait donc imposer $f''_2=12$ (et non 0). D'où l'erreur observée : la contrainte « naturelle » (dérivée seconde nulle aux bords) ne correspond pas à la vraie courbure de $x^3$ aux extrémités.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<p><strong>Sujet</strong></p>
<PdfViewer file="/pdfs/mn-td1-interpolation.pdf" />

<p><strong>Correction</strong></p>
<PdfViewer file="/pdfs/mn-td1-interpolation-correction.pdf" />

</TabItem>
</Tabs>
