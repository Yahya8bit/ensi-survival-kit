---
sidebar_position: 3
title: TD3 - Résolution numérique des équations non linéaires (avec corrigé)
sidebar_label: TD3 - Équations non linéaires
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD3 : Résolution numérique des équations non linéaires

*ENSI — A.U. 2025-2026*

## Exercice 1

On considère l'équation non linéaire suivante :

$$
(E) \qquad f(x) = x^3 + x - 1
$$

1. Montrer que $f(x) = 0$ admet une seule solution réelle $\alpha$ dans l'intervalle $[0,1]$.
2. Dans chacun des cas suivants, étudier sur $[0,1]$ la convergence de la suite $(x_n)_{n\in\mathbb{N}}$ définie par $x_{n+1} = g_i(x_n)$ :
   - a. $g_1(x) = x^3 + 2x - 1$
   - b. $g_2(x) = 1 - x^3$
   - c. $g_3(x) = \dfrac{1}{1+x^2}$
   - d. $g_4(x) = (1-x)^{1/3}$

<details>
<summary>Correction</summary>

**1.** $f(x) \in C^\infty(\mathbb{R})$, donc $f'(x) = 3x^2+1 > 0,\ \forall x \in \mathbb{R}$. $f$ réalise donc une bijection de $\mathbb{R}$ dans $\mathbb{R}$. Alors $\exists! \alpha \in \mathbb{R} \mid f(\alpha)=0$. Or $f(0)=-1$ et $f(1)=1$, donc $f(0)f(1) < 0$, d'où $\alpha \in [0,1]$.

**2.a.** $g_1(x)=x^3+2x-1$, $x \in [0,1]$. $g_1 \in C^\infty([0,1])$. $g_1'(x)=3x^2+2>0\ \forall x\in[0,1]$, $g_1''(x)=6x\ge0\ \forall x\in[0,1]$. $g_1$ est croissante de $-1$ à $2$ sur $[0,1]$, avec $g_1'$ croissante de $2$ à $5$.

On a $|g_1'(x)| > 1\ \forall x\in[0,1]$, en particulier pour $x=\alpha$ on a $|g_1'(\alpha)|>1$, donc la suite $(u_n)_{n\in\mathbb{N}}$ **diverge**.

**2.b.** $g_2(x)=1-x^3$. $g_2\in C^\infty([0,1])$. $g_2'(x)=-3x^2\le0\ \forall x\in[0,1]$, $g_2''(x)=-6x\le0\ \forall x\in[0,1]$.

$g_2'(x)=-1 \iff 3x^2=1 \iff x=\pm\dfrac{1}{\sqrt3}$, donc $x=\dfrac{1}{\sqrt3} \in [0,1]$.

On a $g_2([0,1]) \subseteq [0,1]$ (stable). Or $f(0)=-1<0$ et $f\!\left(\dfrac{1}{\sqrt3}\right)=\dfrac{1}{3\sqrt3}+\dfrac{1}{\sqrt3}-1<0$, donc $f(0)f\!\left(\dfrac{1}{\sqrt3}\right)>0$, d'où $\alpha \in \left[\dfrac{1}{\sqrt3}, 1\right]$, et donc $(x_n)$ **diverge** car $|g_2'(x)|>1\ \forall x\in\left[\frac{1}{\sqrt3},1\right]$ en particulier pour $\alpha$.

**2.c.** $g_3(x)=\dfrac{1}{1+x^2}$. $g_3\in C^\infty([0,1])$. $g_3'(x)=\dfrac{-2x}{(1+x^2)^2}$, $g_3''(x)=\dfrac{-2+6x^2}{(1+x^2)^3}$.

On a $|g_3'(x)|<1$ (max $\approx0.694$ en valeur absolue), d'où $g_3([0,1]) \subseteq [0,1]$. D'après le théorème du point fixe, $\forall x_0\in[0,1]$, $x_{n+1}=g_3(x_n)=\dfrac{1}{1+x_n^2}$ est **convergente**.

**2.d.** $g_4(x)=(1-x)^{1/3}$. $g_4(x)\in C^\infty([0,1[)$. $g_4'(x)=-\dfrac{1}{3}(1-x)^{-2/3}<0\ \forall x\in[0,1[$, $g_4''(x)=-\dfrac{2}{9}(1-x)^{-5/3}<0\ \forall x\in[0,1[$.

$g_4'(x)=-1 \implies x=1-\dfrac{1}{\sqrt{27}} \approx 0.8075$.

On a $f(0)=-1<0$, $f\!\left(1-\dfrac{1}{\sqrt{27}}\right)>0$, d'où $\alpha \in \left]0,\ 1-\dfrac{1}{\sqrt{27}}\right[$.

On a $g_4\in C^1\!\left(\left[0,\ 1-\frac{1}{\sqrt{27}}-\varepsilon\right]\right)$, $\varepsilon>0$. Sur cet intervalle on a $|g_4'(x)|<1$, par conséquent d'après le théorème du cours, $\exists\, V_\alpha \subset \left[0, 1-\frac{1}{\sqrt{27}}-\varepsilon\right]$ contenant $\alpha$, sur lequel on a, pour tout choix $x_0\in V_\alpha$, la suite $(x_n)_{n\in\mathbb{N}}$ définie par $x_0,\ x_{n+1}=(1-x_n)^{1/3}$ **converge vers $\alpha$**.

*(Indication : on peut choisir $V_\alpha = [0.5, 0.8]$.)*

</details>

## Exercice 2

Soit la fonction $f: \mathbb{R} \to \mathbb{R}$ définie par :

$$
f(x) = 1 - 3e^{-x}
$$

1. Montrer que $f$ admet un unique zéro sur $[1,2]$ noté $\bar{x}$.
2. Calculer $\bar{x}$.
3. L'équation $f(x)=0$ est équivalente à $x = x + \beta f(x)$, $\forall \beta\ne0$. Soit $g(x) = x + \beta f(x)$
   - a. Trouver $\beta$ pour que la suite définie par $x_{n+1} = g(x_n)$ converge sur un intervalle $[a,b]$ de $[1,2]$.
   - b. Que peut-on dire de la vitesse de convergence de la suite ?

<details>
<summary>Correction</summary>

**1.** La fonction $f$ est continue et dérivable sur $\mathbb{R}$, on calcule $f'(x) = 3e^{-x} > 0$ pour tout $x$. $f(1) < 0$ et $f(2) > 0$. D'après le corollaire du TVI, il existe un unique $\bar{x}$ tel que $f(\bar{x})=0$.

**2.** En résolvant $1 - 3e^{-\bar{x}} = 0$ on trouve $\bar{x} = \ln(3)$.

**3.a.** On calcule $g'(x) = 1 + 3\lambda e^{-x},\ \forall x\in\mathbb{R}$ (avec $\beta=\lambda$).

Pour que la méthode converge on a besoin de garantir $|g'(x)| < 1$ pour tout $x \in [1,2]$. Il est alors nécessaire de prendre d'une part $\lambda<0$ pour avoir $g'(x)<1$, et d'autre part $\lambda > -\dfrac{2}{3}e$ pour assurer $g'(x)>-1$. Au final, la méthode de point fixe converge si :
$$
\lambda \in \left]-\frac{2e}{3}, 0\right[
$$

**3.b.** Le choix optimal (en terme de vitesse de convergence) pour $\lambda$ est celui pour lequel $g'(\bar{x})=0$, en résolvant l'équation on trouve $\lambda = -\dfrac{e^{\bar{x}}}{3}$. On a alors $g^{(2)}(\bar{x}) \ne 0$, d'où **la méthode est d'ordre 2**.

</details>

## Exercice 3

Soit l'équation :

$$
(1) \qquad x = e^{-x}, \quad x \in [0, +\infty[
$$

1. On considère la méthode itérative suivante :
   $$
   x_0 \in [0,+\infty[ \text{ donné}, \qquad x_{n+1} = g(x_n) = e^{-x_n}, \ \forall n\ge0.
   $$
   - a. Montrer que cette méthode est convergente si $x_0$ est bien choisie.
   - b. Montrer que le point fixe de $g$ appartient à $\left[\dfrac{1}{10}, 1\right]$.
   - c. Donner le nombre d'itérations qui assure que l'erreur est inférieure à $10^{-3}$.
   - d. Donner dans ce cas l'ordre de convergence.
2. Appliquer la méthode de Newton à l'équation (1) et montrer que la convergence est quadratique.

<details>
<summary>Correction</summary>

**1.a.** Posons $g(x)=e^{-x}$. Clairement $0$ n'est pas solution de l'équation. Pour $x \in\, ]0,+\infty[$, $g'(x)=-e^{-x}$, donc $|g'(x)|<1$ ce qui implique que $g$ est contractante sur $]0,+\infty[$. Comme $]0,+\infty[$ est un ouvert, le théorème du point fixe ne s'applique pas directement. Il faut trouver un fermé $[a,b] \subset\, ]0,+\infty[$ tel que $g([a,b]) \subset [a,b]$.

**1.b.** Prenons $a=\dfrac{1}{10}$ et $b=1$. On a $g\!\left(\dfrac{1}{10}\right)=e^{-1/10}\le1$ et $g(1)=e^{-1}\ge\dfrac{1}{10}$. On a bien $g\!\left(\left[\frac{1}{10},1\right]\right) \subset \left[\frac{1}{10},1\right]$ par continuité de $g$ sur $\left[\frac{1}{10},1\right]$. Comme $|g'(x)|<1$ sur le fermé $\left[\frac{1}{10},1\right]$ de $]0,+\infty[$, on peut appliquer le théorème du point fixe. Il existe $l \in \left[\frac{1}{10},1\right]$ tel que $l=g(l)$.

**1.c.** On sait que $|x_n-\alpha| \le \dfrac{k^n}{1-k} \cdot |x_1-x_0| \le 10^{-3}$ avec $k = \sup_{x\in[1/10,1]} |g'(x)| = 0.9$.

Ce qui implique $n \ge \ln\!\left(\dfrac{10^{-3}(1-k)}{|x_1-x_0|}\right) \cdot \dfrac{1}{\ln(k)}$, on prend $x_0=\dfrac{1}{10}$ et $x_1=e^{-1/10}$.

Pour approcher $\alpha$ à $10^{-3}$ il nous faut au moins $E\!\left(\ln\!\left(\dfrac{10^{-3}(1-k)}{|x_1-x_0|}\right) \cdot \dfrac{1}{\ln(k)}\right) + 1$ itérations.

**1.d.** Comme $g'(c)=-e^{-c}\ne0$, la méthode est convergente à **l'ordre 1**.

**2.** Pour appliquer la méthode de Newton à l'équation (1), on pose $h(x)=x-e^{-x}$. Comme $h'(x)=1+e^{-x}\ne0$ sur $]0,+\infty[$, la méthode de Newton pour l'équation $h(x)=0$ s'écrit :
$$
x_0 \in \left[\frac{1}{10}, 1\right] \text{ donné}, \qquad x_{n+1} = x_n - \frac{x_n-e^{-x_n}}{1+e^{-x_n}}, \ \forall n\ge0.
$$

**Ordre de convergence.** La fonction $h(x)=x-e^{-x}$ est $C^2$. Soit $\alpha$ la racine de $h$. Cette méthode se met sous la forme $x_{n+1} = \varphi(x_n)$, où $\varphi(x) = x - \dfrac{h(x)}{h'(x)}$. On a :
$$
\varphi'(x) = \frac{h(x)h''(x)}{(h'(x))^2}
$$
et donc $\varphi'(\alpha) = \dfrac{h(\alpha)h''(\alpha)}{(h'(\alpha))^2} = 0$, car $h(\alpha)=0$.

De l'expression de la dérivée seconde :
$$
\varphi''(x) = \frac{(h'(x))^3h''(x) + h(x)h^{(3)}(x)(h'(x))^2 - 2h(x)h'(x)(h''(x))^2}{(h'(x))^4}
$$
il vient $\varphi''(\alpha) = \dfrac{h''(\alpha)}{h'(\alpha)} = \dfrac{-e^{-\alpha}}{1+e^{-\alpha}} \ne 0$.

Par suite, d'après l'exercice 1 (du cours), **la convergence de la méthode de Newton est quadratique** pour l'équation $x=e^{-x},\ x\in[0,+\infty[$.

</details>

## Exercice 4 (supplémentaire)

On souhaite résoudre l'équation $f(x) = 0$ avec $f(x) = x\cdot\ln(x+1) - 2$, pour $x \in [0,8]$.

1. Montrer que cette fonction admet une seule racine dans l'intervalle $[0,8]$.
2. Soit la méthode itérative :
   $$
   x_0 \text{ donné}, \qquad x_{n+1} = g(x_n) = \frac{2}{\ln(1+x_n)}
   $$
   - a. Étudier la convergence de cette méthode.
   - b. Donner le nombre d'itérations nécessaires pour avoir une solution à $10^{-6}$ près.

<details>
<summary>Correction</summary>

**1°)** $f'(x) = \ln(1+x) + \dfrac{x}{1+x} > 0$ pour $x \in\, ]0,8]$ : $f$ est strictement croissante. $f(0) = -2 < 0$ et $f(8) = 8\ln9-2 \approx 15.6 > 0$, donc $f(0)f(8) < 0$ : d'après le théorème des valeurs intermédiaires, il existe un unique $\alpha \in [0,8]$ tel que $f(\alpha) = 0$.

**2°a)** $g(x) = \dfrac{2}{\ln(1+x)}$, $g'(x) = \dfrac{-2}{(1+x)\ln(1+x)^2}$.

$g''(x) = \dfrac{2}{((1+x)\ln(1+x))^3} \cdot [\ln(1+x) + 2] \ge 0$ sur $]0,8]$ : $g'$ est croissante (donc $g'$ négative et croissante vers 0, $|g'|$ décroissante).

Il est clair que la méthode diverge sur l'intervalle $]0,8]$ en entier (car $|g'(x)|$ peut être $>1$ près de 0), mais qu'elle **converge** sur un sous-intervalle bien choisi $[a,b] \subset [1,2]$, où $\max_{x\in[a,b]} |g'(x)| = |g'(a)| < 1$.

Pour étudier la convergence, il faut procéder en deux étapes :
1. Bien encadrer la solution : par la méthode de dichotomie, on a $f(1)\cdot f(2) < 0$.
2. Sur l'intervalle $[1,2]$ : $\max_{[1,2]} |g'(x)| = |g'(1)| = \dfrac{2}{(2\ln2)^2} \approx 0.195 < 1$.

Sur cet intervalle, la méthode itérative est **convergente**.

**2°b)** On a $|x_n-\alpha| \le \dfrac{L^n}{1-L} \cdot |x_1-x_0|$, avec $L = \max_{[a,b]} |g'(x)|$ et $x_1 = g(x_0)$.

$$
\begin{aligned}
|x_n-\alpha| \le 10^{-6}
&\iff \frac{L^n}{1-L} \cdot |x_1-x_0| \le 10^{-6} \\
&\iff n\ln L \le \ln\!\left(\frac{10^{-6}(1-L)}{|x_1-x_0|}\right) \\
&\iff n \ge \frac{\ln(10^{-6}(1-L)) - \ln|x_1-x_0|}{\ln L}
\end{aligned}
$$

On choisit $n = E\!\left(\dfrac{\ln(10^{-6}(1-L))-\ln|x_1-x_0|}{\ln L}\right) + 1$.

**Application numérique.** $L = \dfrac{2}{2\ln2}$. Pour $x_0=1$ : $x_1 = g(1) = \dfrac{2}{\ln2}$.

$$
n = E\!\left(\frac{\ln\!\left(\left(1-\frac{2}{2\ln2}\right)10^{-6}\right) - \ln\left|\frac{2}{\ln2} - 1\right|}{\ln\!\left(\frac{2}{2\ln2}\right)}\right) + 1
$$

Ce qui donne, après calcul numérique, **environ 357 itérations**.

</details>

## Exercice 5 (supplémentaire)

On considère l'équation $(E) : x^2 = -\ln x$.

1. Montrer que $(E)$ admet une racine unique $\alpha \in \left[\dfrac{3}{5}, \dfrac{1}{\sqrt2}\right]$.
2. On désire appliquer la méthode du point fixe pour la détermination d'une valeur approchée de $\alpha$. Pour cela, on transforme $(E)$ en une équation du type $x = g(x)$, avec $g(x) = e^{-x^2}$ ou $g(x) = \sqrt{-\ln x}$.
   - a. Étudier dans chacun des cas la convergence de la méthode du point fixe.
   - b. Lorsque la méthode converge, déterminer son ordre.
   - c. En partant de $x_0 = \dfrac{3}{5}$, déterminer le nombre d'itérations nécessaires pour que l'erreur soit inférieure à $10^{-4}$.
   - d. Écrire la méthode de Newton pour résoudre $(E)$. En partant de $x_0 = \dfrac{3}{5}$, déterminer $\alpha$ à $10^{-4}$ près. Conclure.

<details>
<summary>Correction</summary>

**1°)** Posons $f(u) = u^2 + \ln u$, pour $u \in \left[\dfrac{3}{5}, \dfrac{1}{\sqrt2}\right]$. $f'(u) = 2u + \dfrac{1}{u} > 0$ sur cet intervalle : $f$ est strictement croissante.

$f\!\left(\dfrac{3}{5}\right) \approx -0.15 < 0$ et $f\!\left(\dfrac{1}{\sqrt2}\right) \approx 0.15 > 0$, donc $f\!\left(\dfrac{3}{5}\right)\cdot f\!\left(\dfrac{1}{\sqrt2}\right) < 0$ : $f(u) = 0$ admet une unique solution $\alpha$ dans $\left[\dfrac{3}{5}, \dfrac{1}{\sqrt2}\right]$. Or $f(u) = 0 \iff u^2 = -\ln u$, donc $(E)$ admet une unique racine $\alpha$ sur cet intervalle.

**2°a) Cas $g_1(x) = \sqrt{-\ln x}$.** L'étude de $g_1'$ montre que $|g_1'(x)| > 1$ sur $\left[\dfrac{3}{5}, \dfrac{1}{\sqrt2}\right]$ (pente forte au voisinage de la racine) : **la méthode diverge**.

**Cas $g(x) = e^{-x^2}$.** $g'(x) = -2xe^{-x^2}$. Sur $\left[\dfrac{3}{5}, \dfrac{1}{\sqrt2}\right]$, $|g'(x)| < 1$ (valeurs extrêmes $g'\!\left(\frac{3}{5}\right) \approx -0.878$, $g'\!\left(\frac{1}{\sqrt2}\right) \approx -0.858$) : **la méthode converge**.

**2°b)** $g'(\alpha) = -2\alpha e^{-\alpha^2} \ne 0$ (car $\alpha \ne 0$) : la méthode $x_{n+1}=g(x_n)$ est donc d'**ordre 1**.

**2°c)** On a $|x_n-\alpha| \le \dfrac{L^n}{1-L}\cdot|x_1-x_0| \le 10^{-4}$, avec $L = \max_{[3/5,1/\sqrt2]} |g'(x)| \approx 0.878$ et $x_0 = \dfrac{3}{5}$, $x_1 = g(x_0) = e^{-(3/5)^2} \approx 0.6376$.

$$
n \ge \frac{\ln(10^{-4}(1-L)) - \ln|x_1-x_0|}{\ln L}
$$

Ce qui donne, après calcul numérique, **environ 66 itérations**.

**2°d) Méthode de Newton.**

$$
u_{n+1} = u_n - \frac{f(u_n)}{f'(u_n)} = u_n - \frac{u_n^2+\ln u_n}{2u_n+\frac{1}{u_n}} = u_n - \frac{u_n^3+u_n \ln u_n}{2u_n^2+1}
$$

En partant de $u_0 = \dfrac{3}{5} = 0.6$ :

$$
u_0 = 0.6 \qquad u_1 = 0.6526 \qquad u_2 = 0.6529 \qquad u_3 = 0.6529
$$

La méthode de Newton **converge dès la 3ᵉ itération** à $10^{-4}$ près, alors que la méthode du point fixe avec $g(x)=e^{-x^2}$ en nécessite environ 66 : cela illustre la **convergence quadratique** de Newton contre la convergence linéaire (ordre 1) du point fixe.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<p><strong>Sujet (Exercices 1-3)</strong></p>
<PdfViewer file="/pdfs/mn-td3-equations-non-lineaires.pdf" />

<p><strong>Correction (Exercices 1-3)</strong></p>
<PdfViewer file="/pdfs/mn-td3-equations-non-lineaires-correction.pdf" />

<p><strong>Exercice 4 (sujet + correction)</strong></p>
<PdfViewer file="/pdfs/mn-td3-exo-supp1.pdf" />

<p><strong>Exercice 5 (correction)</strong></p>
<PdfViewer file="/pdfs/mn-td3-exo-supp2.pdf" />

</TabItem>
</Tabs>
