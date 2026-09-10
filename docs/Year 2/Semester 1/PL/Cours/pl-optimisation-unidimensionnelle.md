---
sidebar_position: 10
title: "Chapitre II : Optimisation Unidimensionnelle"
sidebar_label: Optimisation unidimensionnelle
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre II : Optimisation Unidimensionnelle

*ENSI — RO : Programmation linéaire — notes manuscrites (chapitre d'ouverture de la partie Optimisation Non Linéaire), avec quelques pages issues d'un support imprimé complémentaire.*

<!-- TODO: this is a handwritten (scanned) chapter for most pages, with a few printed pages (17, 17', 17'') inserted mid-chapter covering the golden-section method in more formal/typeset detail. Transcribed faithfully below; a few individual symbols in dense derivations are flagged inline where legibility was uncertain. -->

## Introduction

L'optimisation unidimensionnelle est l'étude des extremums (minimum, maximum) des fonctions à une variable réelle.

Les motivations de s'intéresser à l'optimisation unidimensionnelle sont au moins deux :

1. On y trouve souvent les mêmes difficultés que dans les dimensions supérieures.
2. Les méthodes d'optimisation unidimensionnelle sont utilisées sous forme de procédures de recherche linéaire dans les algorithmes d'optimisation vectorielle.

Dans ce chapitre nous allons présenter deux types de méthodes d'optimisation unidimensionnelle :

1. Les méthodes itératives utilisant les dérivées.
2. Les méthodes d'encadrement n'utilisant pas de dérivées, mais utilisant l'unimodalité.

## Position du problème

Pour déterminer l'optimum d'une fonction $f$ à $n$ variables $x_1, x_2, ..., x_n$, nous rencontrons des méthodes nécessitant la résolution d'un problème d'optimisation à une seule variable de type :

$$
(P)
\left\{
\begin{aligned}
&\text{déterminer } \alpha \ge 0, \text{ minimisant } g(\alpha) = f(x^0 + \alpha.d) \\
&\text{où } x^0 = (x_1^0, ..., x_n^0)^t \text{ le dernier point obtenu.} \\
&d = (d_1, ..., d_n)^t \text{ une direction de déplacement.}
\end{aligned}
\right.
$$

Il s'agit donc de trouver l'optimum de la fonction $f$ en partant de $x^0$ dans la direction $d$.

Généralement la direction $d$ est une direction de descente, c-à-d $\nabla f(x^0).d = \dfrac{\partial g}{\partial \alpha}(\alpha=0) < 0$.

## I. Méthodes itératives

### I.1 Méthode de Newton-Raphson

La fonction $g$ est supposée deux fois continûment différentiable. La méthode de Newton est ici appliquée à l'équation non linéaire $g'(\alpha)=0$, afin de rechercher un point stationnaire $\alpha^*$. Pour identifier ce point comme un minimum, il faut une hypothèse d'optimisation supplémentaire, par exemple $g''(\alpha^*)>0$ localement, ou la convexité/unimodalité de $g$ sur l'intervalle considéré.

**Remarque** : On désigne par la méthode de Newton, c'est celle qui est utilisée par la recherche des racines d'une fonction $f(x) = 0$.

L'idée consiste à considérer la droite tangente à la courbe de la fonction $g'$ aux points $(a, g'(a))$ ou $(b, g'(b))$.

Dans le cas de la figure, on a pris $(a, g'(a))$ comme point de départ, c-à-d $\alpha_0 = a$. La droite tangente $T_1$ à la courbe de $g'$ en $(a, g'(a))$ a pour équation :

$$\frac{y - g'(a)}{x - a} = g''(a)$$

$$\Rightarrow \alpha_1 \in (T_1) \cap \{0\alpha\} \text{ est donné par : } \alpha_1 = a - \frac{g'(a)}{g''(a)}$$

On peut recommencer le procédé précédent en considérant la tangente au point $(\alpha_1, g'(\alpha_1))$ c-à-d $\alpha_2 \in (T_2) \cap \{0\alpha\}$ est donné par :

$$\alpha_2 = \alpha_1 - \frac{g'(\alpha_1)}{g''(\alpha_1)}$$

D'une manière générale, on a : $\alpha_{k+1} = h(\alpha_k)$ avec $h(x) = x - \dfrac{g'(x)}{g''(x)}$.

### Remarques

1. La convergence de la méthode de Newton-Raphson dépend du choix de $\alpha_0$. Une garantie locale usuelle suppose que $\alpha^*$ est une racine simple de $g'$ — en particulier $g''(\alpha^*)\ne0$ —, les conditions de régularité locales habituelles, et un point initial suffisamment proche de $\alpha^*$. Une méthode d'encadrement peut aider à choisir ce point initial.

2. La méthode de N-R est convergente lorsqu'elle est appliquée à une fonction quadratique de la forme : $g(\alpha) = u\alpha^2 + v\alpha + w$ où $u > 0$.

En effet $g'(\alpha) = 2u\alpha + v$, $g''(\alpha) = 2u$.

$\alpha_0$ donné, $\alpha_1 = \alpha_0 - \dfrac{g'(\alpha_0)}{g''(\alpha_0)} = \alpha_0 - \dfrac{2u\alpha_0+v}{2u} = -\dfrac{v}{2u}$

or $\alpha_1 = -\dfrac{v}{2u}$ : il s'agit bien le minimum de $g$.

### Exemple : la non-convergence de la méthode de Newton-Raphson

Considérons la fonction $g(\alpha) = -e^{-\alpha^2}$ qui a pour minimum unique en $\alpha = 0$. La fonction dérivée $g'(\alpha) = 2\alpha\,e^{-\alpha^2}$.

<!-- TODO: page 5's plot of g'(α) is a hand-drawn curve with tangent-line divergence illustrated; genuine plotted figure, described in prose here rather than re-rendered — see PDF tab. -->

Si on considère $\alpha_0$ trop éloigné de 0 (par exemple $\alpha_0 = 1$), la méthode de N-R diverge.

$\alpha_0 = 1$

$g''(\alpha) = (2 - 4\alpha^2)e^{-\alpha^2}$

$$\alpha_1 = \alpha_0 - \frac{g'(\alpha_0)}{g''(\alpha_0)} = \alpha_0 - \frac{2\alpha_0 e^{-\alpha_0^2}}{(2-4\alpha_0^2)e^{-\alpha_0^2}} = \alpha_0 - \frac{\alpha_0}{1-2\alpha_0^2} = 1 - \frac{1}{1-2} = 1+1 = 2$$

$$\alpha_2 = \alpha_1 - \frac{\alpha_1}{1-2\alpha_1^2} = 2 - \frac{2}{1-2\times4} = 2 + \frac{2}{7}$$

C'est donc que la suite $\alpha_k$ s'éloigne de 0 et tend vers $\infty$.

### I.2 Méthode de la sécante

Un obstacle important dans la mise en œuvre pratique de la méthode de Newton, est d'avoir à la fois la dérivée première et seconde en chaque point.

En approximant la dérivée seconde en $\alpha_k$ par : $\dfrac{g'(\alpha_k) - g'(\alpha_{k-1})}{\alpha_k - \alpha_{k-1}}$

La formule de Newton devient :

$$\alpha_{k+1} = \alpha_k - g'(\alpha_k)\,\frac{\alpha_k - \alpha_{k-1}}{g'(\alpha_k) - g'(\alpha_{k-1})}$$

Cette formule est connue sous le nom de : méthode de la sécante. En effet appliquée à la recherche de la racine de $g'(\alpha) = 0$, cette méthode consiste à approximer la fonction $g'(\alpha)$ par la droite passant par les deux points $(\alpha_k, g'(\alpha_k))$ et $(\alpha_{k-1}, g'(\alpha_{k-1}))$.

**Remarque** : La convergence globale de la méthode de la sécante n'est pas assurée. Pour assurer la convergence de cette méthode, il faut que les points de départ $\alpha_0$ et $\alpha_1$ soient choisis suffisamment proches de l'optimum.

### I.3 La méthode de dichotomie avec dérivées

Supposons $\exists\ \alpha^*\ /\ g'(\alpha^*) = 0$. Il s'agit de trouver $\alpha^*$.

**Idée principale de la méthode.** Supposons que :

- $g$ est continûment différentiable
- $g'(0) < 0$ : la direction de déplacement est une direction de descente.
- $\exists\ \bar{\alpha}\ /\ \forall\ \alpha \ge \bar{\alpha}\ \ g'(\alpha) > 0$.

La méthode consiste à déterminer un premier intervalle $[\alpha_{min}, \alpha_{max}]\ /\ g'(\alpha_{min}) < 0$ et $g'(\alpha_{max}) > 0$, puis à réduire progressivement cet intervalle par dichotomie jusqu'à obtention d'un intervalle final d'amplitude $\le \varepsilon$ suffisamment petite. Par continuité de $g'$, ce changement de signe encadre une racine de $g'$, donc un point stationnaire ; pour l'interpréter comme le minimum recherché, on suppose en outre $g$ convexe ou unimodale sur l'intervalle.

Plus précisément, à une itération donnée on calcule $g'(\alpha_1)$ au point $\alpha_1 = \dfrac{\alpha_{min} + \alpha_{max}}{2}$ :

- Si $g'(\alpha_1) > 0 \Rightarrow$ on remplace $\alpha_{max}$ par $\alpha_1$ et on itère.
- Si $g'(\alpha_1) < 0 \Rightarrow$ on remplace $\alpha_{min}$ par $\alpha_1$ et on itère.
- Si $g'(\alpha_1) = 0 \Rightarrow$ on s'arrête : $\alpha_1$ est un point stationnaire.

**Remarque** : Pour déterminer l'intervalle initial $[\alpha_{min}, \alpha_{max}]$, on peut utiliser la stratégie suivante :

1. $h = h_0$ = pas de déplacement fixé ; $\alpha_{min} = 0$
2. Calculer $g'(h)$.
   - Si $g'(h) < 0 \Rightarrow \alpha_{min} = h$ et $h = 2h$ (retourner en (2))
   - Si $g'(h) > 0 \Rightarrow \alpha_{max} = h$. Fin.
   - Si $g'(h) = 0 \Rightarrow h$ est un point stationnaire. Fin.

## II. Méthodes d'encadrement

Nous allons décrire d'autres méthodes, plus générales que les méthodes itératives, dans le sens qu'elles ne nécessitent pas les hypothèses de continuité et de différentiabilité. Les méthodes d'encadrement supposent simplement qu'au moins dans un intervalle $[a, b]$, la fonction $g$ à minimiser soit unimodale.

### II.1 Définition

Soit $g$ une fonction définie sur $[a,b]$ et soit $x^*$ l'argument du minimum sur cet intervalle (soit $x^*\ /\ g(x^*) = \min_{[a,b]} g(y)$). On dit que $g$ est **unimodale** sur $[a,b]$, si elle est strictement monotone décroissante sur $[a, x^*[$ et strictement monotone croissante sur $]x^*, b]$.

« En d'autres termes, si $y$ et $z$ sont de même côté de $x^*$, alors leurs images par $g$ sont aussi de même côté que $g(x^*)$. »

**Remarques**

1. Une fonction unimodale sur $[a,b]$ a la propriété d'avoir un minimum local unique.
2. Il résulte de la définition des fonctions unimodales que si l'on a calculé la valeur de $g$ en quatre points $a, d_1, d_2, b$ de l'intervalle $[a,b]$, il existe toujours un sous-intervalle qui ne contient pas l'optimum et qui peut être ainsi éliminé.

### II.2 La méthode de dichotomie sans dérivées

Cette méthode permet, à chaque pas, de diviser par 2 la longueur de l'intervalle contenant l'optimum. À chaque itération (pas) on garde l'intervalle contenant l'optimum et on élimine l'autre.

Au début on part de l'intervalle $[a\ b] = [x_1, x_5]$

- on calcule $x_3 = c = \dfrac{a+b}{2}$ : point milieu
- $x_2 = d = \dfrac{a+c}{2}$
- $x_4 = e = \dfrac{c+b}{2}$

ce qui permet de diviser l'intervalle $[a,b]$ en 4 sous-intervalles.

On obtient cinq points équidistants de $\Delta = \dfrac{b-a}{4}$.

En utilisant l'unimodalité, il est facile de voir que seuls les cinq cas suivants peuvent se présenter. Posons $a=x_1$, $b=x_5$, $c=x_3$, $d=x_2$ et $e=x_4$, c-à-d on dispose de 5 points $\in [a,b]$ qui sont $x_1, x_2, x_3, x_4$ et $x_5$.

1. $g(x_1) < g(x_2) < g(x_3) < g(x_4) < g(x_5) \Rightarrow$ on élimine $[x_3, x_5]$, car le minimum est forcément entre $x_1$ et $x_2$.
2. $g(x_1) > g(x_2) < g(x_3) < g(x_4) < g(x_5) \Rightarrow$ on élimine $[x_3, x_5]$.
3. $g(x_1) > g(x_2) > g(x_3) < g(x_4) < g(x_5) \Rightarrow$ on élimine $[x_1, x_2]$ et $[x_4, x_5]$.
4. $g(x_1) > g(x_2) > g(x_3) > g(x_4) < g(x_5) \Rightarrow$ on élimine $[x_1, x_3]$.
5. $g(x_1) > g(x_2) > g(x_3) > g(x_4) > g(x_5) \Rightarrow$ on élimine $[x_1, x_3]$.

<!-- TODO: pages 10-11 of the source draw a small number-line sketch for each of the 5 cases above, marking which sub-interval "à éliminer" — genuine illustrative sketches, summarized in prose in the case list above rather than individually re-rendered; see PDF tab. -->

Comme chaque itération revient à enlever deux quarts, on réduit $[a,b]$ de moitié. La réduction initiale utilise 5 évaluations, puis chaque réduction supplémentaire utilise 2 nouvelles évaluations. Ainsi, pour $n=5+2k$ évaluations (donc $n$ impair), l'intervalle initial a été réduit $(n-3)/2$ fois :

$$\frac{[a\,b]_n}{[a\,b]} = \frac{1}{2^{(n-3)/2}}$$

**Remarque** : Le rapport de réduction de l'intervalle de départ en fonction de $n$ (nombre d'évaluations de $g$) est donné par :

$$\frac{b^n - a^n}{b-a} = \frac{1}{2^{(n-3)/2}} \qquad n=5+2k,\ k\ge0$$

avec $[a^n\, b^n]$ est l'intervalle obtenu après $n$ évaluations de $g$.

Les plus petits nombres d'évaluations assurant les précisions suivantes sont :

| Précision garantie | $n$ minimal |
|--------------------|-------------|
| $10^{-2}$          | 17          |
| $10^{-3}$          | 23          |
| $10^{-4}$          | 31          |
| $10^{-6}$          | 43          |

### II.3 Méthode de Fibonacci

La méthode de dichotomie n'est pas optimale, dans le sens que pour un nombre fixé $N$ de calcul de $g$, elle n'aboutit pas à l'intervalle réduit le plus petit possible.

Contrairement à la méthode de dichotomie, la méthode de Fibonacci consiste à calculer la valeur de $g$ en $N$ points choisis de telle sorte que le résultat obtenu pour chaque nouveau point permette d'éliminer un sous-intervalle (aussi grand que possible) de l'intervalle de départ.

Soit $[a, d]$ l'intervalle de départ. Supposons qu'on a évalué la fonction $g$ en $a$, $d$ et en deux autres points $b$ et $c$. Il est possible, en utilisant l'unimodalité, d'éliminer un sous-intervalle soit $[a,b]$ soit $[c,d]$.

Soit $D_1 = d-a$ la longueur du segment initial. Si on veut éliminer $[a,b]$ ou $[c,d]$ sans tenir compte des tests sur la fonction $g$, on doit avoir $c-a = d-b = D_2$, c-à-d les points $b$ et $c$ doivent être symétriques par rapport au milieu de $[a,d]$.

**Explication** : Pour rejoindre les conditions de la méthode de dichotomie, dans la méthode de Fibonacci il faut choisir les deux nouveaux points symétriques par rapport au milieu de l'intervalle (4 points pour Fibonacci contre 5 points pour la dichotomie avec test juge).

<!-- TODO: page 13's diagram illustrating the symmetric points b, c and the elimination of [c,d] with D1/D2 segments marked is a genuine sketch, summarized in prose above rather than re-rendered; see PDF tab. -->

Supposons qu'on va éliminer $[c,d]$. Pour recommencer l'opération, il faut calculer $g$ en un point $e$, qui ne peut être que le point symétrique de $b$ par rapport au milieu de l'intervalle $[a,c]$, de la relation :

$$d-a = (c-a) + (d-c) = (c-a) + (b-a) \;\Rightarrow\; D_1 = D_2 + D_3$$

$\Rightarrow$ Ceci se généralise par $D_k = D_{k+1} + D_{k+2}$.

Soit $D_{N-1}$ la longueur de l'intervalle obtenu au bout de $N$ évaluations de $g$. On définit les nombres $F_0, F_1, ..., F_{N-1}$ par : $D_k = F_{N-k}\,D_{N-1}$. On remarque que si $k = N-1$, $F_1 = 1$.

En écrivant que $\dfrac{D_k}{D_{N-1}} = \dfrac{D_{k+1}}{D_{N-1}} + \dfrac{D_{k+2}}{D_{N-1}}$, on voit que les nombres $F_n$ vérifient les relations de récurrence :

$$\begin{cases} F_n = F_{n-1} + F_{n-2} \\ F_1 = 1 \end{cases} \qquad (n = 3,4,...,N-1)$$

La suite $F_n$ est déterminée dès qu'on choisit $F_2$ et par la suite des $D_k$. Étant donné que $D_{N-1} = \dfrac{D_1}{F_{N-1}}$, pour que $D_{N-1}$ soit petit il faut que $F_{N-1}$ soit grand. On choisit $F_1 = 1$ et $F_2 = 2$.

$(F_n)_{n \ge 3}$ est appelée la suite de Fibonacci qui vérifie la relation de récurrence : $F_n = F_{n-1} + F_{n-2}$, $F_1 = 1$, $F_2 = 2$.

**Remarques**

1. La détermination des premiers points dépend de $N$ : $\dfrac{D_1}{D_2} = \dfrac{F_{N-1}}{F_{N-2}}$. Ne pose pas de problème car $N$ est fixé à l'avance. En effet si $D_1 = 1$ : la largeur de l'intervalle de départ. Pour une précision au plus égale à $10^{-3}$, il faut $\dfrac{D_{N-1}}{D_1} = \dfrac{1}{F_{N-1}} \le 10^{-3}$, ce qui donne $N = 17$.

Selon le calcul de $F_n$ on a la table suivante :

| $n$ | $F_n$ | $n$ | $F_n$ |
|-----|-------|-----|-------|
| 1   | 1     | 11  | 144   |
| 2   | 2     | 12  | 233   |
| 3   | 3     | 13  | 377   |
| 4   | 5     | 14  | 610   |
| 6   | 13    | 15  | 987   |
| 7   | 21    | 16  | 1597  |
| 8   | 34    | 17  | 2584  |
| 9   | 55    | 18  | 4181  |
| 10  | 89    | 19  | 6765  |
|     |       | 20  | 10946 |

<!-- TODO: table on page 15 as handwritten skips n=5 (jumps from n=4, F=5, to n=6, F=13) — transcribed exactly as it appears in the source rather than inserting the missing row, since the value shown for n=6 (13) is itself consistent with a standard Fibonacci sequence continuing 1,2,3,5,8,13,... which suggests the n=5/F=8 row was simply omitted on the page. -->

2. La méthode de Fibonacci peut se généraliser au cas d'une fonction à $n$ variables.

## I.4 La méthode du nombre d'or

Si on ne connaît pas a priori le nombre $N$ (nombre de calculs de $g$) ou si on ne veut pas fixer le nombre $N$, on peut utiliser la méthode du Nombre d'or.

Cette méthode repose sur le même principe que la méthode de Fibonacci, sauf qu'elle consiste à prendre les longueurs des intervalles successifs dans un rapport fixe :

$$\text{c-à-d } \frac{D_1}{D_2} = \frac{D_2}{D_3} = ... = \gamma$$

Comme on a toujours $D_k = D_{k+1} + D_{k+2}$ et si on pose $\dfrac{D_k}{D_{k+1}} = \dfrac{D_{k+1}}{D_{k+2}} = \gamma$, on en déduit que $\dfrac{D_k}{D_{k+1}} = 1 + \dfrac{D_{k+2}}{D_{k+1}}$

Soit $\gamma = 1 + \dfrac{1}{\gamma} \Leftrightarrow \gamma^2 - \gamma - 1 = 0$ dont la racine positive est le nombre d'or : $\gamma = \dfrac{1+\sqrt{5}}{2} = 1.618$.

**Remarques**

1. Pour $N$ assez grand la méthode du nombre d'or rejoint la méthode de Fibonacci. En effet on a : $\lim_{N\to\infty} \dfrac{F_N}{F_{N-1}} = \gamma$

Exemple : $\dfrac{F_{11}}{F_{10}} = \dfrac{144}{89} = 1.617$.

### Méthode de la section dorée

*(section suivante reprise d'un support imprimé complémentaire — définitions et démonstrations formelles)*

Comme indiqué au début de la partie précédente, on cherchera souvent à se restreindre à un intervalle où il n'y a pas plusieurs minima locaux.

**Définition 1.4 (Fonctions unimodales)**. Soit $f$ une fonction continue sur $[a,b]$. On dit que $f$ est unimodale s'il existe $x_* \in ]a,b[$ tel que $f$ soit strictement décroissante sur $[a, x_*]$ et strictement croissante sur $[x_*, b]$. On a donc un minimum local strict en $x_*$ (c'est même l'unique minimum global sur $[a,b]$).

#### 1.2.1 Principe général : réduction du triplet

Tout comme il existe des paires de points admissibles pour la méthode de dichotomie (des points pour lesquels le signe de la fonction est différent) qui assurent d'avoir un zéro entre les deux, il existe des triplets de points qui assurent l'existence d'un minimum local.

**Définition 1.5 (Triplet de points admissibles)**. Soit $f$ une fonction continue sur un intervalle $I$, et trois réels $a < c < b$ de $I$. On dit que le triplet est admissible (pour le problème de minimisation de $f$) si on a $f(a) \ge f(c) \le f(b)$.

Dans ce cas la fonction admet un minimum local sur $]a,b[$ : elle admet un minimum global sur le compact $[a,b]$, et ce minimum ne peut être ni en $a$ ni en $b$, sauf si $f(a) = f(c)$ ou $f(b) = f(c)$, mais dans ce cas il y a bien un minimum local en $c$.

**Définition 1.6 (Algorithme général de réduction d'un triplet)**. Supposons qu'à une étape de l'algorithme on ait un triplet admissible $a < c < b$. L'itération suivante de l'algorithme consiste à se donner un quatrième point $d \in ]a,b[$, avec $d \ne c$. On prend alors pour triplet suivant soit $\{a,c,d\}$ soit $\{c,d,b\}$, de telle sorte que ce soit un triplet admissible. Cela est toujours possible (faire des dessins) :

- si $c<d$ et si $f(c) \le f(d)$, le triplet $(a,c,d)$ est admissible,
- si $c<d$ et si $f(c) \ge f(d)$, le triplet $(c,d,b)$ est admissible,
- si $d<c$ et si $f(d) \le f(c)$, le triplet $(a,d,c)$ est admissible,
- si $d<c$ et si $f(d) \ge f(c)$, le triplet $(d,c,b)$ est admissible.

On obtient donc à chaque itération un nouveau triplet admissible.

On espère donc que pour une méthode donnée de choix du quatrième point à chaque étape, la taille du triplet (la différence entre les deux extrémités) tende au fur et à mesure vers 0.

**Proposition 1.4 (Convergence vers le minimum local)**. Si l'algorithme de la définition fournit une suite de triplets $(a_n,c_n,b_n)$ tels que $b_n-a_n \to 0$, et si la fonction est unimodale sur $[a_0,b_0]$ avec un minimum en $x_*$, alors les suites $(a_n)$, $(c_n)$ et $(b_n)$ convergent vers $x_*$.

*Démonstration.* Il suffit de voir que les suites $a_n$ et $b_n$ sont adjacentes, donc elles convergent vers une limite $\ell$ (et donc $(c_n)$ aussi par encadrement). D'autre part on a toujours $f(c_n) \le f(b_n)$, avec $c_n < b_n$, et donc on ne peut pas avoir $b_n \le x_*$ puisque $f$ est strictement décroissante sur $[a,x_*]$. On a donc $b_n > x_*$ et donc à la limite $\ell \ge x_*$. De même en utilisant $f(a_n) \le f(c_n)$, on obtient l'inégalité inverse et donc $\ell = x_*$. $\square$

**Remarque 1.4**. Pour initialiser l'algorithme, on a besoin d'un premier triplet admissible. On utilisera en particulier cet algorithme dans le chapitre suivant, pour minimiser des fonctions de la forme $h(t) = f(x+td)$ sur $]0,+\infty[$ où on sait seulement que $h$ est strictement décroissante au voisinage de zéro. Il faut alors faire une première étape de recherche du triplet initial, par exemple en prenant $a=0$ et $c=1$, en diminuant d'abord $c$ petit à petit jusqu'à ce qu'on ait $f(c) \le f(a)$, puis en prenant $b \ge c$ et en l'augmentant jusqu'à ce que $f(b) \ge f(c)$.

#### 1.2.2 Présentation de la méthode

La méthode de la section dorée consiste à s'arranger pour que la taille du triplet soit divisée d'un facteur constant à chaque étape. On s'aperçoit alors que cela contraint ce facteur à être $\varphi = \dfrac{1}{2}(1+\sqrt{5})$, le nombre d'or.

**Proposition 1.5 (Réduction constante de la taille du triplet)**. On suppose que l'algorithme de la définition 1.4 fournit une suite de triplets $(a_n,c_n,b_n)$ tels que $b_{n+1}-a_{n+1} = \alpha(b_n-a_n)$ quel que soit le cas, alors on a deux possibilités pour $c_n$ :

- soit $c_n = a_n+\alpha(b_n-a_n)$, dans ce cas le quatrième point est placé en $d_n = a_n+(1-\alpha)(b_n-a_n)$,
- soit $c_n = a_n+(1-\alpha)(b_n-a_n)$, dans ce cas le quatrième point est placé en $d_n = a_n+\alpha(b_n-a_n)$.

De plus le paramètre $\alpha$ vaut $\dfrac{1}{\varphi} = \dfrac{1}{2}(\sqrt{5}-1)$.

*Démonstration.* Supposons par exemple que $c_n < d_n$. À l'étape suivante on a que $(a_{n+1},b_{n+1})$ vaut $(a_n,d_n)$ ou $(c_n,b_n)$. On doit donc avoir $(d_n-a_n) = (b_n-c_n) = \alpha(b_n-a_n)$. On obtient donc la deuxième possibilité de la proposition. Si on avait $c_n>d_n$ on obtiendrait la première possibilité : $c_n = a_n+\alpha(b_n-a_n)$ et $d_n = a_n+(1-\alpha)(b_n-a_n)$.

Si maintenant on suppose toujours que $c_n<d_n$, et qu'on est dans le cas $(a_{n+1},c_{n+1},b_{n+1}) = (a_n,c_n,d_n)$ on doit avoir soit $c_{n+1} = a_{n+1}+\alpha(b_{n+1}-c_{n+1})$, c'est-à-dire $c_n = a_n+\alpha(d_n-a_n)$, soit $c_n = a_n+(1-\alpha)(d_n-a_n)$. Mais ce dernier cas est exclus puisqu'on a d'après ce qui précède $c_n = a_n+(1-\alpha)(b_n-a_n)$ et que $d_n<b_n$. On a donc

$$(1-\alpha)(b_n-a_n) = c_n-a_n = \alpha(d_n-a_n) = \alpha^2(b_n-a_n),$$

ce qui donne $(1-\alpha) = \alpha^2$ dont la solution positive est $\dfrac{1}{2}(\sqrt{5}-1)$. $\square$

En pratique, quitte à changer les noms des variables, et vu qu'on sait exactement où doivent être placés les points intérieurs, on écrira toujours le cas $c_n<d_n$. La méthode de la section dorée peut donc s'écrire comme suit :

**Définition 1.7 (Méthode de la section dorée)**. On se donne une fonction $f$ continue sur $[a_0,b_0]$. On pose $\alpha = \dfrac{1}{2}(\sqrt{5}-1)$ et $c_0 = a_0+(1-\alpha)(b_0-a_0)$ et $d_0 = a_0+\alpha(b_0-a_0)$. On calcule $f(a_0)$, $f(b_0)$, $f(c_0)$, et $f(d_0)$, et on suppose qu'un des triplets $(a_0,c_0,b_0)$ ou $(a_0,d_0,b_0)$ est admissible.

On définit les suites par récurrence :

- si $f(c_n)<f(d_n)$, alors le triplet $(a_n,c_n,d_n)$ est admissible, on pose $(a_{n+1},d_{n+1},b_{n+1}) = (a_n,c_n,d_n)$ et $c_{n+1} = a_{n+1}+(1-\alpha)(b_{n+1}-a_{n+1})$. On a simplement besoin de calculer $f(c_{n+1})$, puisque $f(a_{n+1})$, $f(d_{n+1})$ et $f(b_{n+1})$ sont déjà connues.
- si $f(c_n)\ge f(d_n)$, alors le triplet $(c_n,d_n,b_n)$ est admissible, on pose $(a_{n+1},c_{n+1},b_{n+1}) = (c_n,d_n,b_n)$ et $d_{n+1} = a_{n+1}+\alpha(b_{n+1}-a_{n+1})$. On a simplement besoin de calculer $f(d_{n+1})$, puisque $f(a_{n+1})$, $f(c_{n+1})$ et $f(b_{n+1})$ sont déjà connues.

**Proposition 1.6 (Convergence de la méthode de la section dorée)**. Les suites $(a_n)$, $(b_n)$, $(c_n)$ et $(d_n)$ convergent linéairement avec un taux de convergence $\alpha$ vers une limite $\ell$. Si la fonction $f$ est unimodale sur $[a_0,b_0]$, alors $f$ admet son minimum en $\ell$.

*Démonstration.* Les suites $(a_n)$ et $(b_n)$ sont adjacentes et $b_n-a_n = \alpha^n(b_0-a_0) \to 0$. On a donc $a_n \le \ell \le b_n$. Et

$$\max\{|a_n-\ell|, |b_n-\ell|, |c_n-\ell|, |d_n-\ell|\} \le b_n-a_n = \alpha^n(b_0-a_0),$$

ce qui donne la convergence linéaire vers $\ell$ des quatre suites, avec un taux inférieur ou égal à $\alpha$. On montre que ce taux est exactement $\alpha$ comme dans la preuve de la méthode de dichotomie. Le fait que $f$ admette son minimum en $\ell$ si $f$ est unimodale est une conséquence de la proposition 1.4. $\square$

**Remarque 1.5**. Le taux effectif de convergence linéaire de cette méthode est $\alpha \approx 0.618$. En effet, on n'a besoin d'évaluer $f$ qu'en un seul point à chaque itération. Si on n'a pas directement accès au calcul de la dérivée, et qu'on utilise la méthode de dichotomie présentée précédemment en approximant $f'$ par différences finies, on évalue la fonction $f$ en deux points différents à chaque itération, ce qui fait que le taux de convergence linéaire effectif est $\sqrt{\dfrac{1}{2}} \approx 0.707$. La méthode de la section dorée est donc plus efficace, et tout aussi robuste (on sait qu'elle converge dans tous les cas, et on sait exactement à quelle vitesse). On va voir dans les paragraphes suivants des méthodes pouvant converger bien plus rapidement, mais qui sont moins robustes. Tout comme la méthode de Newton ou la méthode de la sécante pour la recherche de zéro d'une fonction, elles ne convergent pas pour toute condition initiale, mais lorsqu'elles convergent, elles le font de manière superlinéaire.

## III. Étude de la convergence

La plupart des méthodes de résolution des problèmes d'optimisation sont de nature itérative. C-à-d à partir d'un point initial $x_0$, ces méthodes engendrent une suite de points $x_0, x_1, x_2, ..., x_k, ...$ dont on espère qu'elle converge vers l'optimum $\bar{x}$.

Autrement dit, on construit une suite $(x_n)_{n\ge0}$ avec l'espoir que $x_n \xrightarrow[n\to\infty]{} \bar{x}$ vérifiant $f(\bar{x}) = \min_x f(x)$.

Ces procédés de calculs sont appelés algorithmes (à chaque méthode de résolution est associé un algo). Un algorithme peut être vu comme une application $F$ d'un espace $U$ dans lui-même tq : pour $x_0 \in U$, $x_{k+1} = F(x_k)$, $k = 1, 2, ...$

Pour être plus général, on peut définir un modèle dans lequel des algorithmes (ou des classes d'algorithmes) sont représentés par des applications multivoques ; c-à-d des applications de $\mathbb{R}^n$ dans $\mathcal{P}(\mathbb{R}^n)$, qui associent à un point courant l'ensemble de ses itérés suivants possibles.

$$F : \mathbb{R}^n \longrightarrow \mathcal{P}(\mathbb{R}^n), \qquad x \longmapsto \text{un sous-ensemble de } \mathbb{R}^n$$

À l'étape $k$, on choisit un itéré suivant $x_{k+1} \in F(x_k)$. Ceci va nous permettre d'introduire la notion de la convergence globale.

### III.1 La notion de convergence globale

**Définition** : Un algorithme décrit par une application multivoque $F$ est globalement convergent si, pour tout point de départ $x_0$, toute suite produite par la règle $x_{k+1}\in F(x_k)$ converge vers un point satisfaisant une condition nécessaire d'optimalité.

**Exemple** : $x_k$ converge vers un point stationnaire. Pour une fonction différentiable, tout extremum local intérieur est stationnaire ; la réciproque n'est pas vraie en général.

**Remarque** : La notion de la convergence globale exprime la sûreté de fonctionnement de l'algorithme.

À $F$ on peut associer l'ensemble de ses points fixes : $\operatorname{Fix}(F) = \{x \in U \mid x \in F(x)\}$. Pour une application à valeur unique, cette condition devient $F(x)=x$.

Un point fixe $\bar{x}$ est dit attractif s'il admet un voisinage $V(\bar{x})\ /\ \forall x \in V(\bar{x})\ \lim_{k\to\infty} F^k(x) = \bar{x}$.

De la même façon, on dira qu'un sous-ensemble $\bar{U}$ est attractif si $\forall \bar{x} \in \bar{U},\ \exists V(\bar{x}),\ \forall x \in V(\bar{x})\ \lim_{k\to\infty} F^k(x) \in \bar{U}$.

Tout l'art de l'algorithmique consiste, pour résoudre dans un espace $U$ un problème dont l'ensemble de solution est $U^*$, à trouver un algorithme $F$ tq $F(U)$ soit proche de $U^*$ et attractif.

**Remarque : Interprétation géométrique**

Un point stationnaire $\bar{x}$ vérifie $g'(\bar{x}) = 0$ (supposons que $f$ admet un minimum en $\bar{x}$). Donc chercher $\bar{x}\ /\ g'(\bar{x}) = 0$ revient à chercher $\bar{x}\ /\ \bar{x} = \bar{x} - g'(\bar{x}) = G(\bar{x})$.

$\Rightarrow$ Le remplacement de $g'$ par $G$ c'est équivalent à dire qu'on a remplacé la recherche de $\{g'(x) \cap \{0x\}\}$ par la recherche de $\{G(x) \cap \text{la droite } y=x\}$.

$\exists$ plusieurs méthodes d'approximation, c-à-d de façon avec laquelle on détermine $G$ à partir de $g'$. Exemple, la méthode de Newton propose $G(x) = x - \dfrac{g'(x)}{g''(x)}$.

À partir de cette constatation on introduit les résultats qui sont liés aux théorèmes de point fixe.

<!-- TODO: the small boxed theorem in the corner of page 20 (starting "a) G([a,b]) ⊂ [a,b] b) max|G'(x)| ≤ 1 ⇒ ..." concluding G has a unique fixed point x* on [a,b]) is only partially legible in the handwriting; not transcribed in full to avoid guessing its exact statement — see PDF tab page 20 to verify. -->

### III.2 La vitesse de convergence

La vitesse de convergence d'un algorithme mesure la décroissance vers 0 de la distance entre les valeurs engendrées et leur limite.

Par exemple, dans $\mathbb{R}^n$, notons $x^*$ le vecteur vers lequel converge la suite $(x_k)_{k\ge0}$ (engendrée par l'application $F$, c-à-d $x_{k+1} = F(x_k)$ : c'est l'algorithme) et $\lVert .\rVert$ la norme euclidienne :

**Définition** :

- Si $\displaystyle\limsup_{k\to\infty} \dfrac{\lVert x_{k+1}-x^*\rVert}{\lVert x_k-x^*\rVert} = \alpha < 1$, on dit que la convergence est **linéaire** et $\alpha$ est le taux de convergence associé.
- Si $\displaystyle\limsup_{k\to\infty} \dfrac{\lVert x_{k+1}-x^*\rVert}{\lVert x_k-x^*\rVert} = 0$, on dit que la convergence est **superlinéaire**.
- Si $\exists\ \gamma>1$, $\displaystyle\limsup_{k\to\infty} \dfrac{\lVert x_{k+1}-x^*\rVert}{\lVert x_k-x^*\rVert^{\gamma}} = M < +\infty$, la convergence est dite superlinéaire d'ordre $\gamma$. En particulier si $\gamma=2$, on parle de vitesse de convergence **quadratique**.

**Remarques**

1. On peut parler de la vitesse de convergence pure dans un voisinage de la limite $x^*$ recherchée. Loin de $x^*$, il se peut que l'algorithme concerné converge lentement, on pas du tout, bien que théoriquement la vitesse de convergence soit quadratique.

2. Cette définition est très utile pour mesurer la qualité de la limite obtenue par un algorithme. En effet supposons que la convergence asymptotique d'un algorithme soit quadratique dans un voisinage de $x^*$, avec $M=100$. C-à-d $\exists$ un rang $k$ tq $\dfrac{\lVert x_{k+p+1}-x^*\rVert}{\lVert x_{k+p}-x^*\rVert^2} < 100\ \forall p = 0,1,2,...$

Si pour le rang $k$ on a $\lVert x_k-x^*\rVert < 10^{-3}$ (pour assurer qu'on est dans un voisinage de la solution) $\Rightarrow \lVert x_{k+1}-x^*\rVert < 10^{-4}$, $\lVert x_{k+2}-x^*\rVert < 10^{-6}$, $\lVert x_{k+3}-x^*\rVert \le 10^{-10}$...

$\Rightarrow$ l'erreur d'approximation passe donc, en trois itérations, de $10^{-3}$ à $10^{-10}$.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/pl-optimisation-unidimensionnelle.pdf" />

</TabItem>
</Tabs>
