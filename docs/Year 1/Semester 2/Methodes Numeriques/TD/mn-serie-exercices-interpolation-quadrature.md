---
sidebar_position: 5
title: Série d'exercices - Interpolation et Quadrature (avec corrigé)
sidebar_label: Série - Interpolation & Quadrature
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Série d'exercices : Interpolation et Quadrature de Gauss

*ENSI — Algorithmique de l'Analyse Numérique*

## Partie A — Quadrature avec poids sur un intervalle infini

**Exercice 1**

On souhaite calculer numériquement l'intégrale suivante :

$$
I = \int_0^{+\infty} \frac{dx}{1+x^6}
$$

1. Montrer en majorant $\dfrac{1}{1+x^6}$ par $\dfrac{1}{x^6}$ que l'on peut déterminer un nombre $a \ge 0$ tel que :
   $$
   \int_a^{+\infty} \frac{dx}{1+x^6} \le \frac{1}{5}\cdot10^{-5}
   $$
2. Pour calculer $J = \displaystyle\int_0^a \frac{dx}{1+x^6}$, on utilise la méthode des trapèzes composée. Exprimer en fonction de $M = \sup_{x\in[0,a]} |f''(x)|$ où $f(x)=\dfrac{1}{1+x^6}$, le nombre $N+1$ de points d'intégration nécessaires pour calculer cette intégrale avec une erreur inférieure à $\dfrac{1}{5}\cdot10^{-5}$.
3. Trouver $M$ et en déduire $N$.
4. Donner sommairement le principe d'une méthode de Gauss pour calculer $I = \displaystyle\int_0^{+\infty} \dfrac{dx}{1+x^6}$.

<details>
<summary>Correction</summary>

**1.** $\displaystyle\int_a^{+\infty} \frac{dx}{1+x^6} \le \int_a^{+\infty} \frac{dx}{x^6} = \left[\frac{x^{-5}}{-5}\right]_a^{+\infty} = \frac{1}{5}a^{-5}$.

Pour que $\displaystyle\int_a^{+\infty} \frac{dx}{1+x^6} \le \frac{1}{5}\cdot10^{-5}$, il suffit que $\dfrac{1}{5}a^{-5} \le \dfrac{1}{5}\cdot10^{-5}$, soit $a \ge 10$. Le plus petit $a$ positif est $a = 10$.

**2.** Formule des trapèzes composée :
$$
J = \int_0^a \frac{dx}{1+x^6} = \frac{h}{2} \cdot \left[f(0) + 2\sum_{i=1}^{N-1} f\!\left(\frac{ia}{N}\right) + f(a)\right] - \frac{a^3}{12N^2} f''(\xi), \quad \xi \in\, ]0,a[
$$
On pose $E_N(f) = -\dfrac{a^3}{12N^2} f''(\xi)$, d'où $|E_N(f)| \le \dfrac{a^3M}{12N^2}$. On calcule $N$ tel que :
$$
\frac{a^3M}{12N^2} \le \frac{1}{5}\cdot10^{-5} \implies N \ge E\!\left(\sqrt{\frac{5a^3M}{12\cdot10^{-5}}}\right) + 1
$$

**3.** $f''(x) = \dfrac{-30x^4+42x^{10}}{(1+x^6)^3}$. Pour $x \in [0,a]$, $|f''(x)| \le 42 = M$. Pour $a=10$, $N = E\!\left(\sqrt{\dfrac{3}{2}\cdot10^9}\right) + 1$.

**4.** Méthode de **Gauss-Laguerre** à $(N+1)$ points : poids $w(x)=e^{-x}$.
$$
\int_0^{+\infty} g(x)e^{-x}dx = \sum_{k=0}^{N} \lambda_k g(x_k) + E(g)
$$
où $x_k$ sont les racines de $L_{N+1}$. Ici, on écrit :
$$
I = \int_0^{+\infty} \frac{dx}{1+x^6} = \int_0^{+\infty} \frac{e^x}{1+x^6} \cdot e^{-x}\, dx = \sum_{k=0}^{N} \lambda_k \cdot \frac{e^{x_k}}{1+x_k^6} + E(g)
$$

</details>

## Partie B — Interpolation de Lagrange

**Exercice 1**

1. Soit $g$ une fonction de classe $C^3$ sur $[-1,1]$.
   - a. Soit $P$ le polynôme d'interpolation de $g$ aux points $x_0=-1, x_1=0, x_2=1$. Quel est le degré de $P$ ? Rappeler l'expression de l'erreur d'interpolation.
   - b. Montrer que les fonctions $g_1(t)=t\cdot e^{t^2-1}$ et $g_2(t)=\sin\!\left(\dfrac{\pi}{2} \cdot t\right)$ ont le même polynôme d'interpolation aux points $x_0=-1, x_1=0, x_2=1$. Déterminer ce polynôme.
2. Soit la formule de quadrature suivante :
   $$
   \int_{-1}^1 t\cdot g(t)dt = a_1g(-1) + a_2g(1) + E(g)
   $$
   - a. Déterminer les coefficients $a_1$ et $a_2$ pour que la formule de quadrature soit d'ordre le plus élevé possible.
   - b. Déterminer l'ordre exact de cette formule.
   - c. Montrer qu'il existe $\mu \in\, ]-1,1[$ tel que $E(g) = -\dfrac{2}{45} \cdot g^{(3)}(\mu)$.

<details>
<summary>Correction</summary>

**1.a.** $P$ est de degré 2. Erreur d'interpolation : $|E(f)| \le \dfrac{|\pi_n(x)|}{(n+1)!} \cdot \max_{[a,b]} |f^{(n+1)}(x)|$.

Table des différences divisées aux points $-1, 0, 1$ :
```
<!-- TODO: unclear in source, verify against original PDF — this divided-differences table's exact row/column alignment did not extract unambiguously from the source (values "1", "1(1)", "-1/2" with uncertain column placement). Transcribed verbatim as plain text rather than guessed into a table. -->
   -1     0     1
1        1     1
        1     0
1(1)          -1/2
```
$(n+1)\pi(x)(x\pm1) \to P_2(x) = -1+1+x = x$

**1.b.** $g_1(-1) = g_2(-1) = -1$, $g_1(0)=g_2(0)=0$, $g_1(1)=g_2(1)=1$. Donc $g_1$ et $g_2$ ont le même polynôme d'interpolation aux points $-1,0,1$ : **$P(x) = x$**.

**2.a.** $\displaystyle\int_{-1}^1 t\, dt = \left[\frac{t^2}{2}\right]_{-1}^1 = 0 = a_1+a_2$, $\displaystyle\int_{-1}^1 t^2\, dt = \left[\frac{t^3}{3}\right]_{-1}^1 = \frac{2}{3} = -a_1+a_2$. On résout : $a_1 = -\dfrac{1}{3}$, $a_2 = \dfrac{1}{3}$.

**2.b.** $\displaystyle\int_{-1}^1 t^3\, dt = 0 = a_1+a_2$ ✓. $\displaystyle\int_{-1}^1 t^4\, dt = \left[\frac{t^5}{5}\right]_{-1}^1 = \frac{2}{5} \ne -a_1+a_2 = \frac{2}{3}$. Donc **l'ordre de la méthode est 2**.

**2.c.** $E(g) = \int f(t)dt - \int P(t)dt = \displaystyle\int_{-1}^1 \left[\frac{t^2(t^2-1)}{6}\right] g^{(3)}(\xi_t)\, dt$, où $t^2(t^2-1) \le 0$ sur $[-1,1]$. Par la formule de la moyenne :
$$
E(g) = \frac{g^{(3)}(\mu)}{6} \cdot \int_{-1}^1 t^2(t^2-1)dt = \frac{g^{(3)}(\mu)}{6} \cdot \left(\frac{1}{5} - \frac{1}{3}\right) = -\frac{2}{45} \cdot g^{(3)}(\mu)
$$

</details>

## Partie C — Symétrie du polynôme d'interpolation

**Exercice 1**

1. Montrer que les fonctions $g_1(x) = \sin\!\left(\dfrac{\pi}{2} \cdot x\right)$ et $g_2(x) = x$ ont le même polynôme d'interpolation aux points $x_0=-1, x_1=0, x_2=1$, **sans le calculer**.
2. Donner ce polynôme.
3. On veut à présent interpoler la fonction $g_1$ aux points $-\dfrac{1}{2}, -1, 0, 1$ et $\dfrac{1}{2}$ par un polynôme qu'on notera $Q$. Déduire de 2) ce polynôme d'interpolation. Que remarquez-vous ?
4. Énoncez une propriété générale sur les polynômes d'interpolation basée sur les résultats de 2) et 3).

<details>
<summary>Correction</summary>

**1.** $g_1(x_i) = g_2(x_i)$ pour $i=0,1,2$ (à savoir $g_1(-1)=-1, g_1(0)=0, g_1(1)=1$, identique pour $g_2$).

**2.** $g_2(x)=x$ est un polynôme de degré $\le 2$ tel que $g_2(x_i)=g_1(x_i)$, donc $g_2$ est le polynôme d'interpolation de $g_1$ en $x_i$, $i=0,1,2$.

**3.** $Q(x) = g_1(x) + (x-x_0)(x-x_1)(x-x_2)\cdot g_1[x_0,x_1,x_2,x_3] + (x-x_0)(x-x_1)(x-x_2)(x-x_3)\cdot g_1[x_0,x_1,x_2,x_3,x_4]$, avec $x_3=-\dfrac{1}{2}$ et $x_4=\dfrac{1}{2}$.
$$
\begin{aligned}
Q(x) &= g_1(x) + (x-1)x(x+1)\cdot\frac{4-4\sqrt2}{3} + 0 \\
     &= \frac{4-4\sqrt2}{3}x^3 - \frac{1-4\sqrt2}{3}x
\end{aligned}
$$

**4.** Le polynôme d'interpolation d'une fonction **impaire**, en des points symétriques par rapport à 0, est **impair**.

</details>

## Partie D — Application aux exercices d'examen (2020-2021)

**Exercice 4 (Examen 2019)**

On cherche à déterminer une valeur approchée de $I = \displaystyle\int_{-1}^1 f(t)dt$ sous la forme $J = \alpha_0f\!\left(-\frac{1}{2}\right) + \alpha_1f(0) + \alpha_2f\!\left(\frac{1}{2}\right)$.

1. La formule de quadrature est : $\displaystyle\int_{-1}^1 f(t)dt \approx \frac{4}{3}f\!\left(-\frac{1}{2}\right) - \frac{4}{3}f(0) + \frac{4}{3}f\!\left(\frac{1}{2}\right)$, $N=3$.
2. En utilisant un changement de variable affine pour se ramener à une intégrale de $-1$ à $1$ : $t = \dfrac{b-a}{2}x + \dfrac{b+a}{2}$.
3. Application : $I = \displaystyle\int_0^1 \dfrac{\sin\pi t}{(t(1-t))^{3/2}}\, dt \approx 8.945723$ *(à vérifier)*.
4. Formule de Gauss appropriée à 3 points : $I = \displaystyle\int_0^1 \dfrac{\sin\pi t}{(t(1-t))^{3/2}}\, dt$. Changement de variable vers $[-1,1]$ : $x=2t-1$, donne $I = 16\displaystyle\int_{-1}^1 \dfrac{\sin\left(\frac{\pi}{2}(x+1)\right)}{1-x^2} \cdot \dfrac{dx}{\sqrt{1-x^2}}$. Formule de Tchebychev à 3 points : $I \cong \dfrac{16\pi}{3}\left[f\!\left(-\frac{\sqrt3}{2}\right)+f(0)+f\!\left(\frac{\sqrt3}{2}\right)\right]$, ordre N=5 : on utilise aussi 3 points et un ordre plus grand, on obtient une meilleure précision.

**Exercice 5**

Soit $\alpha = \sqrt{3/5}$, $\omega_1=\omega_3=\dfrac{5}{9}$ et $\omega_2=\dfrac{8}{9}$ — la **formule de Gauss-Legendre à 3 points**, exacte pour les polynômes de degré au plus 5. En choisissant $\alpha=1$, on retrouve la **formule de Simpson**.

**Exercice 6 (Examen 2018/2019)**

Formule à $n+1=2$ points. Les nœuds sont les racines de $L_2(x)=-x^2-4x+2$ : $x_0=\sqrt2-2, x_1=-\sqrt2+2$. $\lambda_0=\dfrac{2+\sqrt2}{4}, \lambda_1=\dfrac{2-\sqrt2}{4}$.

$E(f) = \left(\displaystyle\int_0^{+\infty} L_2(x)^2e^{-x}dx\right) \cdot \dfrac{f^{(4)}(\xi)}{4!}$, $\xi\in\,]1,+\infty[$. $L_2(x)^2=x^4+8x^3+12x^2-16x+4$. Par intégration par parties, $E(f)=\dfrac{84}{24}f^{(4)}(\xi)$.

$I = \displaystyle\int_0^{+\infty} \dfrac{e^x}{1+x^3}\cdot e^{-x}dx \cong 0.594$.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/mn-serie-exercices-interpolation-quadrature.pdf" />

</TabItem>
</Tabs>
