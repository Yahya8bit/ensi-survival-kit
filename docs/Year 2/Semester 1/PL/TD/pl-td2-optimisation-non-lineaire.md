---
sidebar_position: 3
title: "TD : Unconstrained Nonlinear Programming 2"
sidebar_label: TD2 - Optimisation Non Linéaire
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD : Unconstrained nonlinear programming 2

*Université de Manouba — École Nationale des Sciences de l'Informatique — Linear and Nonlinear Programming II.2 — A.U. 2023-2024, Sem. 1 — Novembre 2023*

*(Source bilingue : exposé en français, certains énoncés d'exercices en anglais — conservé tel quel, sans traduction.)*

## 1 Vecteur Gradient et Matrice Hessienne

**Exercice 1.** On considère la fonction $f$ définie par : $\forall (x,y)\in\mathbb{R}^2 : f(x,y) = x^2+y^2$

1. Calculer $\nabla f(0,0)$ et $\nabla^2 f(0,0)$.
2. Montrer que $\nabla^2 f(0,0)$ est définie positive.

**Exercice 2.** On considère la fonction $f$ définie par : $\forall(x,y)\in\mathbb{R}^2 : f(x,y) = x^2+y^4$.

Montrer que $\nabla^2f(0,0)$ n'est pas définie positive.

## 2 Les conditions d'optimalité en dimension n

Let $f:\Omega\to\mathbb{R}$ be a differentiable function at a point $\bar x\in\Omega$, where $\Omega$ is an open set of $\mathbb{R}^n$.

### 2.1 First Order Necessary Condition

If $f(\bar x) = \min_{x\in\Omega} f(x)$ then $\nabla f(\bar x) = 0$.

### 2.2 Second Order Necessary Condition

If $f(\bar x) = \min_{x\in\Omega} f(x)$ then $\nabla f(\bar x) = 0$ and $\nabla^2 f(\bar x)$ is non negative.

### 2.3 Second Order Sufficient Condition

Si $\nabla f(\bar x) = 0$ et $\nabla^2 f(\bar x)$ est définie positive alors $f$ est localement minimale en $\bar x$.

### 2.4 Cas d'une fonction convexe

On suppose que $\Omega$ est convexe. On dit qu'une fonction $f:\Omega\to\mathbb{R}$ est convexe lorsque

$$f(tx_1+(1-t)x_2) \le tf(x_1)+(1-t)f(x_2),\ \forall t\in[0,1],\ \forall x_1,x_2\in\Omega$$

1. Si $\nabla^2f(x)$ est positive sur $\Omega$ alors $f$ est convexe sur $\Omega$.
2. Si $f$ est convexe alors toute solution locale de $(P)$ est une solution globale.
3. Si $f$ est convexe alors la condition nécessaire d'optimalité d'ordre 1 est une condition suffisante.

**Exercice 3.** On considère le problème d'optimisation :

$$
(P_2)
\left\{
\begin{aligned}
&\min\ f(x,y) = 10-2x^2+x^4-6y+y^2 \\
&(x,y)\in\mathbb{R}^2
\end{aligned}
\right.
$$

1. Comment classer $(P_2)$ ?
2. Calculer $\nabla f(0,3)$ et $\nabla^2 f(0,3)$.
3. Déterminer l'ensemble des points qui satisfont la condition d'optimalité de premier ordre.
4. Appliquer la condition suffisante d'optimalité du second ordre pour extraire les solutions locales de $(P_2)$.

**Exercice 4.** On considère le problème d'optimisation :

$$
(P_1)
\left\{
\begin{aligned}
&\min\ f(x,y) = 3x-x^3-2y^2+y^4 \\
&(x,y)\in\mathbb{R}^2
\end{aligned}
\right.
$$

1. Déterminer l'ensemble des points qui satisfont la condition d'optimalité de premier ordre. Comment s'appelle l'ensemble de ces points ?
2. Appliquer la condition suffisante d'optimalité du second ordre pour extraire les solutions locales de $(P_1)$.
3. Soit $(P_2)$ le problème d'optimisation :

$$
(P_2)
\left\{
\begin{aligned}
&\max\ f(x,y) = 3x-x^3-2y^2+y^4 \\
&(x,y)\in\mathbb{R}^2
\end{aligned}
\right.
$$

  (a) Comment se ramener à un problème de minimisation ?
  (b) Déterminer les solutions locales de $(P_2)$.

## 3 Méthode de gradient à pas fixe

La suite récurrente $x_n$ qui décrit la méthode de gradient à pas fixe consiste à choisir un point de départ $x_0$ et générer les autres termes de la suite par la relation $x_{n+1} = x_n+td_n$ où $t$ est une petite valeur fixée et $d_n = -\nabla f(x_n)$.

## 4 Méthode de gradient à pas optimal

La suite récurrente $x_n$ qui décrit la méthode de gradient à pas optimal consiste à choisir un point de départ $x_0$ et générer les autres termes de la suite par la relation $x_{n+1} = x_n+t_nd_n$ où $d_n=-\nabla f(x_n)$ et $t_n$ est la valeur de $t$ qui minimise $\varphi(t)=f(x_n+td_n)$. On pourra appliquer la méthode de Golden pour déterminer $t_n$.

**Exercice 5.** Let $f(x) = x^4+4x+5$

1. Prove that $f$ has a unique minimiser $\bar x$.
2. Starting from $x_0=1$, compute $x_1,x_2,x_3$ according to the Gradient Method with fixed pitch $t=0.1$ and $t=0.01$.
3. Starting from $x_0=1$, compute $x_1,x_2,x_3$ according to the Gradient Method of Steepest Descent.
4. Write a program with R to compute $x_1,...,x_{10}$ in both 2 and 3.

**Exercice 6.** Soit $f(x,y) = x^2+2y^2-2x-6y+10$

1. Vérifier par deux méthodes que $f$ atteint un minimum en un unique point $\bar x$.
2. En partant de $x_0=(0,0)$, calculer $x_1,x_2,x_3$ suivant la méthode de Gradient Method of Steepest Descent.
3. What is the absolute error if we approximate $\bar x$ by $x_3$.
4. Write a program with R to compute $x_1,...,x_{10}$.

**Exercice 7.** Soit $(x_1,y_1),...,(x_n,y_n)$ une série de données. La régression linéaire de ces données au sens des moindres carrés est la droite $y=\bar ax+\bar b$ qui minimise

$$\varphi(a,b) = \sum_{i=1}^n (y_i-ax_i-b)^2$$

1. Écrire le problème d'optimisation sans contraintes et appliquer les conditions d'optimalité pour déterminer $\bar a$ et $\bar b$ en fonction des données $(x_1,y_1),...,(x_n,y_n)$.
2. On considère la série des données suivantes : $(-2,-1), (-1,1), (0,3), (1,4), (2,3)$

   Trouver l'équation de la régression linéaire de ces données au sens des moindres carrés.

<details>
<summary>Correction</summary>

<!-- TODO: this correction is transcribed from a separate handwritten source file ("Exo 7 et 8 serie 2.pdf") that was checked against this TD's Exercice 7 and Exercice 8 and matches their content exactly (same least-squares derivation and same quadratic-problem numbers) — merged in here per the repo's TD+correction pattern; see that file's PdfViewer tab below for the original scan. -->

**1)** Le problème d'optimisation sans contraintes :

$$
\left\{
\begin{aligned}
&Min\ \left[\varphi(a,b) = \sum_{i=1}^n(y_i-ax_i-b)^2\right] \\
&(a,b)\in\mathbb{R}^2
\end{aligned}
\right.
$$

Calculons $\nabla\varphi(a,b)$ et $\nabla^2\varphi(a,b)$.

$$\nabla\varphi(a,b) = \left(\frac{\partial\varphi}{\partial a},\frac{\partial\varphi}{\partial b}\right)^T \text{ avec }
\begin{cases}
\dfrac{\partial\varphi}{\partial a} = \sum_{i=1}^n -2x_i(y_i-ax_i-b) \\
\dfrac{\partial\varphi}{\partial b} = \sum_{i=1}^n -2(y_i-ax_i-b)
\end{cases}$$

$$\Rightarrow \nabla\varphi(a,b) = \begin{pmatrix}-2\sum_{i=1}^n x_i(y_i-ax_i-b) \\ -2\sum_{i=1}^n(y_i-ax_i-b)\end{pmatrix}$$

$$\nabla^2\varphi(a,b) = \begin{pmatrix}\dfrac{\partial^2\varphi}{\partial a^2} & \dfrac{\partial^2\varphi}{\partial a\partial b} \\ \dfrac{\partial^2\varphi}{\partial b\partial a} & \dfrac{\partial^2\varphi}{\partial b^2}\end{pmatrix}
\qquad \frac{\partial^2\varphi}{\partial a^2}=\sum_{i=1}^n 2x_i^2 \quad \frac{\partial^2\varphi}{\partial a\partial b}=\frac{\partial^2\varphi}{\partial b\partial a}=\sum_{i=1}^n 2x_i \quad \frac{\partial^2\varphi}{\partial b^2}=\sum_{i=1}^n 2 = 2n$$

$$\Rightarrow \nabla^2\varphi(a,b) = 2\begin{pmatrix}\sum x_i^2 & \sum x_i \\ \sum x_i & n\end{pmatrix} = 2A^TA \qquad \text{avec } A^T=\begin{pmatrix}x_1&x_2&\cdots&x_n\\1&1&\cdots&1\end{pmatrix}$$

Soit $v\in\mathbb{R}^2$, on a : $v^T\nabla^2\varphi(a,b)v = v^t\times2A^TAv = 2v^TA^TAv = 2(Av)^TAv = 2\|Av\|^2 \ge 0$, d'où $\varphi$ est convexe.

Par conséquent la condition nécessaire d'optimalité est une condition suffisante. Il faut donc chercher $(\bar a,\bar b)$ où $\nabla\varphi(a,b)=0_{\mathbb{R}^2}$. Le minimum de $\varphi$ est donc atteint par $(\bar a,\bar b)$ solution du système suivant :

$$
(S)
\left\{
\begin{aligned}
&\sum_{i=1}^n x_i(y_i-a x_i-b) = 0 \qquad (1) \\
&\sum_{i=1}^n (y_i-a x_i-b) = 0 \qquad (2)
\end{aligned}
\right.
$$

On note $\bar x = \dfrac1n\sum_{i=1}^n x_i$ et $\bar y = \dfrac1n\sum_{i=1}^n y_i$.

$(2) \Leftrightarrow \sum(y_i-\bar ax_i-\bar b)=0 \Leftrightarrow \sum y_i - \bar a\sum x_i - \bar b\sum 1 = 0 \Leftrightarrow \sum y_i - a\sum x_i - n\bar b = 0 \Leftrightarrow n\bar y - a\bar x n - n\bar b = 0$

$$\Rightarrow \boxed{\bar b = \bar y - \bar a\bar x}$$

En reportant dans $(S)$ :

$$\sum_{i=1}^n x_i\big(y_i-\bar y-\bar a(x_i-\bar x)\big)=0 \quad (3) \qquad \sum_{i=1}^n \big(y_i-\bar y-\bar a(x_i-\bar x)\big)=0 \quad (4)$$

Si on multiplie (4) par $\bar x$ et qu'on la soustrait à (3), on obtient :

$$\sum_{i=1}^n x_i\big(y_i-\bar y-\bar a(x_i-\bar x)\big) - \bar x\sum_{i=1}^n\big(y_i-\bar y-\bar a(x_i-\bar x)\big) = 0$$

$$\Leftrightarrow \sum_{i=1}^n(x_i-\bar x)\big(y_i-\bar y-\bar a(x_i-\bar x)\big)=0 \Leftrightarrow \sum_{i=1}^n(x_i-\bar x)(y_i-\bar y) - \bar a\sum_{i=1}^n(x_i-\bar x)^2 = 0$$

$$\Rightarrow \boxed{\bar a = \frac{\sum_{i=1}^n(x_i-\bar x)(y_i-\bar y)}{\sum_{i=1}^n(x_i-\bar x)^2}}$$

D'où l'équation de la régression linéaire est donnée par :

$$y = \frac{\sum_{i=1}^n(x_i-\bar x)(y_i-\bar y)}{\sum_{i=1}^n(x_i-\bar x)^2}\left(x-\frac1n\sum_{i=1}^n x_i\right) + \frac1n\sum_{i=1}^n y_i$$

**2)** $\bar x = \dfrac15\sum_{i=1}^5 x_i = \dfrac15(-2-1+0+1+2) = 0$

$\bar y = \dfrac15\sum_{i=1}^5 y_i = \dfrac15(-1+1+3+4+3) = 10$

<!-- TODO: source page 4 writes $\bar y$ = 10 for the average of (-1,1,3,4,3)/5 = 10/5 = 2 — the arithmetic on the page shows the sum "-1+1+3+4+3" divided by 5 boxed as "=10", which is inconsistent (the sum is 10, so the average should be 2, not 10); transcribed exactly as written on the source page rather than silently corrected, since the boxed "10" is used as $\bar y$ in the rest of the derivation below. Verify against the original page image. -->

$$\bar a = \frac{\sum_{i=1}^5 x_i(y_i-10)}{\sum_{i=1}^5 x_i^2}$$

$$= \frac{x_1(y_1-10)+x_2(y_2-10)+x_3(y_3-10)+x_4(y_4-10)+x_5(y_5-10)}{x_1^2+x_2^2+x_3^2+x_4^2+x_5^2}$$

$$= \frac{-2(-1-10)+(-1)(1-10)+0(3-10)+1(4-10)+2(3-10)}{(-2)^2+(-1)^2+0^2+1^2+2^2}$$

$$= \frac{-2\times(-11)+9-6-14}{4+1+1+4} = \frac{11}{10} = 1,1 = \bar a$$

$$\bar b = \bar y-\bar a\bar x = 10-\bar a\times0 = 10 = \bar b$$

D'où l'équation de la régression linéaire est : $\boxed{y = 1,1x+10}$

</details>

**Exercice 8. The Quadratic Problem** : Let us now see what the method of steepest descent does with a quadratic function of the form :

$$f(x) = \frac12\langle Ax,x\rangle - \langle b,x\rangle,$$

where $A$ is a symmetric positive definite matrix, $b\in\mathbb{R}^n$. Consider the quadratic optimization problem :

$$(QP) \qquad \min_{x\in\mathbb{R}^n} f(x).$$

Our goal is to use the gradient method of steepest descent to build a sequence $x_n$ converging to $\bar x$. $x_0$ is arbitrarily chosen.

1. Prove that $x_n$ is defined by

$$
\begin{cases}
d_n = b-Ax_n \\
t_n = \dfrac{\|d_n\|^2}{\langle Ad_n,d_n\rangle} \\
x_{n+1} = x_n+t_nd_n
\end{cases}
$$

2. Perform three iterations starting from $x_0=\begin{pmatrix}1\\1\end{pmatrix}$ if $A=\begin{pmatrix}2&0\\0&1\end{pmatrix}$ ; $b=\begin{pmatrix}-1\\2\end{pmatrix}$

3. Consider a linear system of the form $Ax=b$. If $\bar x$ minimizes $\|Ax-b\|^2$ then $\bar x$ is an approximate solution of the linear system $Ax=b$.

   (a) Deduce a numerical method to solve $Ax=b$.
   (b) Test this method with the system $Ax=b$, $A=\begin{pmatrix}2&1\\0&1\end{pmatrix}$ ; $b=\begin{pmatrix}1\\2\end{pmatrix}$

<details>
<summary>Correction</summary>

<!-- TODO: this correction is transcribed from a separate handwritten source file ("Exo 7 et 8 serie 2.pdf") that was checked against this TD's Exercice 8 and matches its content (same A, b, and x0) — merged in here per the repo's TD+correction pattern; see that file's PdfViewer tab below for the original scan. Part 3(b)'s numeric test with the second system (A=[[2,1],[0,1]], b=[1,2]) is not present in the source correction and is left unanswered here rather than guessed. -->

**1)** Voir cours.

**2)** $x_0=\begin{pmatrix}1\\1\end{pmatrix}$, $b=\begin{pmatrix}-1\\2\end{pmatrix}$, $A=\begin{pmatrix}2&0\\0&1\end{pmatrix}$

$$d_0 = \begin{pmatrix}-1\\2\end{pmatrix}-\begin{pmatrix}2&0\\0&1\end{pmatrix}\begin{pmatrix}1\\1\end{pmatrix} = \begin{pmatrix}-3\\1\end{pmatrix}$$

$$t_0 = \frac{(-3)^2+(1)^2}{(-3,1)\begin{pmatrix}2&0\\0&1\end{pmatrix}\begin{pmatrix}-3\\1\end{pmatrix}} = \frac{10}{19}$$

$$x_1 = x_0+t_0d_0 = \begin{pmatrix}1\\1\end{pmatrix}+\frac{10}{19}\begin{pmatrix}-3\\1\end{pmatrix} = \begin{pmatrix}-0,5789\\1,5263\end{pmatrix}$$

| $n$ | $x_1$ | $x_2$ |
|-----|-------|-------|
| 0 | 1 | 1 |
| 1 | -0,5789 | 1,5263 |
| 2 | -0,4314 | 1,9569 |
| 3 | -0,5034 | 1,9796 |

Sachant que la solution exacte du problème est $\bar x = \begin{pmatrix}-1/2\\2\end{pmatrix}$.

**3)** $\left\{\min f(x)=\|Ax-b\|^2,\ x\in\mathbb{R}^n\right\}$

Calculons le gradient de $f$. $f(x)=\|Ax-b\|^2=\langle Ax-b,Ax-b\rangle$.

$$f(x+h) = \langle A(x+h)-b,A(x+h)-b\rangle = \langle Ax-b,Ax-b\rangle+2\langle Ax-b,Ah\rangle+\langle Ah,Ah\rangle$$

$$= f(x)+2\langle {}^t\!A(Ax-b),h\rangle + \underbrace{\langle {}^t\!AAh,h\rangle}_{\to0\text{ as }h\to0}$$

Donc $\nabla f(x) = 2\,{}^t\!A(Ax-b)$.

Si $\bar x$ réalise un minimum de $f$ alors $\bar x$ est un point critique qui vérifie $\nabla f(\bar x)=0 \Leftrightarrow A\bar x=b$.

Dans ce cas la méthode steepest descent peut générer une suite $(x_n)_n$ qui converge vers $\bar x$ :

$$
\begin{cases}
x_0 \text{ donné} \\
d_n = b-Ax_n \\
t_n = \dfrac{{}^t\!d_n\,d_n}{{}^t\!d_n\,A\,d_n} \\
x_{n+1} = x_n+t_nd_n
\end{cases}
\qquad
\text{Test d'arrêt : } \|x_{n+1}-x_n\|<\varepsilon=10^{-10}
$$

**(a)** La solution exacte de $A\bar x=b$ est $\bar x=\begin{pmatrix}-1/2\\2\end{pmatrix}$. Application de l'algorithme steepest descent :

| $n$ | $x_1$ | $x_2$ |
|-----|-------|-------|
| 0 | 1 | 1 |
| 1 | -0,4286 | 1,7143 |
| 2 | -0,3383 | 1,8929 |
| 3 | -0,4923 | 1,9694 |
| 4 | -0,4828 | 1,9885 |
| 5 | -0,4992 | 1,9967 |
| 6 | -0,4982 | 1,9978 |
| 7 | -0,4999 | 1,9996 |
| 8 | -0,4998 | 1,9999 |
| 9 | -0,5000 | 2,0000 |
| 10 | -0,5000 | 2,0000 |

Test d'arrêt : $|x_{n+1}-x_n|<10^{-10}$.

</details>

## 5 Méthode de gradients conjugués

On reprend le problème d'optimisation quadratique $(QP)$.

$$(QP) \qquad \min_{x\in\mathbb{R}^n} f(x) = \frac12\langle Ax,x\rangle-\langle b,x\rangle.$$

Partant d'un point $x_0$, la méthode de gradient conjugué est décrite par la relation de récurrence :

$$x_{k+1} = x_k+\alpha_kd_k$$

La suite de directions $d_k$ est donnée par la relation de récurrence :

$$d_0 = -\nabla f(x_0), \qquad d_k = -\nabla f(x_k)+\beta_kd_{k-1}$$

$\beta_k$ est déterminée de sorte que $d_k$ et $d_{k-1},...,d_0$ sont $A$-conjugués : $\langle d_k,Ad_i\rangle=0,\ i=0,...,k-1$. $\alpha_k$ minimise $\varphi(\alpha) = f(x_k+\alpha d_k)$.

1. Calculer $\alpha_0$ et $\beta_1$.
2. Pour $k\ge1$, on montre que $\beta_k = \dfrac{\langle\nabla f(x_k),Ad_{k-1}\rangle}{\langle Ad_{k-1},d_{k-1}\rangle}$ et $\alpha_k = -\dfrac{\langle\nabla f(x_k),d_k\rangle}{\langle Ad_k,d_k\rangle}$.

   Soit $f(x) = x_1-x_2+2x_1^2+2x_1x_2+x_2^2$. Montrer que la méthode de gradients conjugués converge en deux itérations.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/pl-td2-optimisation-non-lineaire.pdf" />

<PdfViewer file="/pdfs/pl-exo7-8-serie2.pdf" />

</TabItem>
</Tabs>
