---
sidebar_position: 11
title: "Chapitre III : Optimisation Non Linéaire Sans Contraintes"
sidebar_label: NL sans contraintes
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre III : Optimisation Non Linéaire Sans Contraintes

*ENSI — RO : Programmation linéaire — notes manuscrites*

<!-- TODO: this is a handwritten (scanned) chapter. Transcribed faithfully below; a handful of individual symbols in dense derivations are flagged inline where legibility was uncertain — verify against the original PDF page images if you need to re-derive every step. -->

## I. Introduction

Le problème étudié ici est le suivant : rechercher le minimum (resp. le maximum) d'une fonction réelle $f$ à $n$ variables $x_1, x_2, ..., x_n$. Chaque $-\infty \le x_i \le +\infty$ (traduire le cas sans contraintes).

**Remarque** : si les $(x_i)_{1 \le i \le n}$ vérifient des conditions supplémentaires du type $g_j(x) \le 0$, $j=1...m$ (des contraintes), on peut sous certaines conditions se ramener à des problèmes d'optimisation sans contraintes.

On considère le problème :

$$
(P)
\left\{
\begin{aligned}
&\text{minimiser } f(x) \\
&\text{s.c.} \\
&g_i(x) \le 0 \qquad i = 1,2,...,m \\
&x \in \mathbb{R}^n
\end{aligned}
\right.
$$

Soit $h : \mathbb{R} \to \mathbb{R}$ qui vérifie $\begin{cases} h(y) = 0 & \text{si } y \le 0 \\ h(y) = +\infty & \text{si } y > 0 \end{cases}$

On considère le problème sans contraintes :

$$
(PP)
\left\{
\begin{aligned}
&\text{minimiser } \varphi(x) = f(x) + H(x) \quad \text{(problème pénalisé)} \\
&x \in \mathbb{R}^n
\end{aligned}
\right.
$$

où $H$, appelée fonction de pénalisation, est définie par : $\forall x \in \mathbb{R}^n$, $H(x) = \sum_{i=1}^m h(g_i(x))$.

Si l'ensemble des solutions admissibles de $(P)$ est $Ad = \{x \mid g_i(x) \le 0\}$ $\Rightarrow x \in Ad \Rightarrow H(x) \ne 0$ et par la suite $\forall x \in Ad$, $\varphi(x) = f(x)$.

Donc résoudre $(P) \equiv$ à résoudre $(PP)$.

### Position du problème général

Soit $f : \mathbb{R}^n \to \mathbb{R}$, $x \mapsto f(x) = f(x_1, x_2, ..., x_n)$.

On cherche à résoudre :

$$
\left\{
\begin{aligned}
&Min\ f(x) \\
&x \in \mathbb{R}^n
\end{aligned}
\right.
$$

Il s'agit donc de trouver un point $x^*$ de $\mathbb{R}^n$ tel que :

- $\forall x \in \mathbb{R}^n\ f(x^*) \le f(x)$ : c-à-d un **minimum global** de $f$ sur $\mathbb{R}^n$.
- $\forall x \in \mathbb{R}^n\ f(x^*) < f(x)$ : c-à-d un **minimum global unique** de $f$ sur $\mathbb{R}^n$.
- $\exists\ V(x^*) \subset \mathbb{R}^n\ /\ \forall x \in V(x^*)\ f(x^*) \le f(x)$ : c-à-d un **minimum local** de $f$ sur $V(x^*)$.

<!-- TODO: page 2's illustration (a curve labeled with a local max, a global max, a local min, and a global min) is a genuine sketch of the four notions above, described in prose here rather than re-rendered; see PDF tab. -->

**Remarque** : Pour beaucoup de P.O.S.C (problèmes d'optimisation sans contraintes), les principales méthodes de résolution connues ne permettent pas la détermination d'un minimum global. Il faut donc se contenter d'optimums locaux.

## I. Conditions d'optimalité

La première étape de la résolution d'un problème d'optimisation consiste à étudier l'existence de la solution et à établir les CNS de l'optimalité.

### I.1 Conditions nécessaires d'optimalité locale

Supposons que : $f$ est continue ; les dérivées partielles $\dfrac{\partial f}{\partial x_i}$ et $\dfrac{\partial^2 f}{\partial x_i \partial x_j}$ sont continues $\forall x \in \mathbb{R}^n$.

**Théorème** : Une condition nécessaire pour que $x^*$ soit un minimum (local ou global) de $f$ est :

(a) Le gradient $\nabla f(x^*) = 0$ (condition de stationnarité)

(b) le hessien $\nabla^2 f(x^*) := \left[\dfrac{\partial^2 f}{\partial x_i \partial x_j}\right]$ (une matrice réelle symétrique) soit semi-définie positive.

**Définition 1** : Si $f : \mathbb{R}^n \to \mathbb{R}$ est une fonction à $n$ variables $x_1,...,x_n$, $\nabla f(x)$ est le gradient de $f$ au point $x$, c-à-d :

$$\nabla f(x) = \begin{pmatrix} \partial f/\partial x_1(x) \\ \partial f/\partial x_2(x) \\ \vdots \\ \partial f/\partial x_n(x) \end{pmatrix} \quad \text{— dérivée partielle évaluée au point } x.$$

**Définition 2** : Si $f : \mathbb{R}^n \to \mathbb{R}$ est une fonction à $n$ variables $x_1,...,x_n$, $\nabla^2 f(x)$ désigne le Hessien de $f$ en $x$, c-à-d $\nabla^2 f(x)$ est la matrice carrée réelle d'ordre $n$ (symétrique) dont le terme $(i,j)$ est : $\dfrac{\partial^2 f}{\partial x_i \partial x_j}(x)$ : dérivée partielle seconde évaluée en $x$.

**Définition 3** : $\nabla^2 f(x)$ est une matrice **semi-définie positive** si $\forall v \in \mathbb{R}^n$, $v^t\,\nabla^2 f(x)\,v \ge 0$.

### Démonstration du théorème

Soit $x^*$ un minimum local de $f$. Le développement de Taylor au voisinage de $x^*$ donne :

$$(DT) \quad f(x) = f(x^*) + \nabla f(x^*)(x-x^*) + \frac{1}{2}(x-x^*)^t \nabla^2 f(x^*)(x-x^*) + \lVert x-x^*\rVert^2\,\theta(x-x^*)$$

avec $\theta(x-x^*) \to 0$ quand $x \to x^*$.

- Si $\nabla f(x^*) \ne 0 \Rightarrow$ on choisit $x = x^* - \theta\,\nabla f(x^*)$ et on remplace dans (DT). Pour $\theta > 0$ assez petit on aura $f(x) < f(x^*)$ ce qui contredit le fait que $x^*$ est le minimum $\Rightarrow$ nécessairement $\nabla f(x^*) = 0$.

  $\Rightarrow$ (DT) devient : $f(x) = f(x^*) + \frac{1}{2}(x-x^*)^t \nabla^2 f(x^*)(x-x^*) + \lVert x-x^*\rVert^2\,\theta(x-x^*)$

- Si $\nabla^2 f(x^*)$ n'est pas semi-définie positive c-à-d $\exists\ d \in \mathbb{R}^n$ ($d \ne 0$) $/\ d^t \nabla^2 f(x^*)\,d < 0$. On choisit $x = x^* + \theta d$ et on remplace dans (DT), pour $\theta$ assez petit on aura $f(x) < f(x^*)$ ce qui contredit l'optimalité de $x^*$

  $\Rightarrow$ nécessairement il faut que $\nabla^2 f(x^*)$ soit semi-définie positive.

**Remarque** : La condition de stationnarité ($\nabla f(x^*) = 0$) n'est pas condition suffisante. En effet, sur une courbe avec un point d'inflexion en $x^*$ : $x^*$ est 1 point stationnaire mais il n'est pas optimal.

### Contre-exemple

Soit $f : \mathbb{R}^2 \to \mathbb{R}$, $(x,y) \mapsto x^2 - 3y^3$.

$$\nabla f(x) = \begin{pmatrix} \partial f/\partial x \\ \partial f/\partial y \end{pmatrix} = \begin{pmatrix} 2x \\ -9y^2 \end{pmatrix} \;\Rightarrow\; \nabla f(0,0) = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$

$$\nabla^2 f(x) = \begin{pmatrix} \partial^2f/\partial x^2 & \partial^2f/\partial x\partial y \\ \partial^2f/\partial x\partial y & \partial^2f/\partial y^2 \end{pmatrix} = \begin{pmatrix} 2 & 0 \\ 0 & -18y \end{pmatrix} \;\Rightarrow\; \nabla^2 f(0,0) = \begin{pmatrix} 2 & 0 \\ 0 & 0 \end{pmatrix}$$

$(v_1,v_2)\,\nabla^2 f(0,0)\begin{pmatrix}v_1\\v_1\end{pmatrix} = 2v_1^2 \ge 0$.

Par contre $f$ peut prendre une valeur négative dans un voisinage de $(0,0)$.

### I.2 Conditions suffisantes d'optimalité locale

**Théorème** : Une condition suffisante pour que $x^*$ soit un optimum local de $f$ sur $\mathbb{R}^n$ est :

(a) $\nabla f(x^*) = 0$ (stationnarité)

(b) $\nabla^2 f(x^*)$ est une matrice définie positive (i.e. $\forall y \in \mathbb{R}^n$, $y\ne0$, $y^t \nabla^2f(x^*)\,y > 0$).

**Démonstration** : Développement de Taylor au voisinage de $x^*$ :

$$f(x) = f(x^*) + \frac{1}{2}(x-x^*)^t\nabla^2f(x^*)(x-x^*) + \lVert x-x^*\rVert^2\theta(x-x^*)$$

$\forall$ le déplacement $d \in \mathbb{R}^n$ ($\lVert d\rVert=1$) on a ($x = x^* + \theta d$) :

$$f(x^*+\theta d) = f(x^*) + \frac{\theta^2}{2}d^t\nabla^2f(x^*)d + \theta^2\,\theta(\theta), \qquad \theta(\theta) \xrightarrow[\theta\to0]{} 0$$

Or la condition (b) donne $d^t\nabla^2f(x^*)d > 0$, donc pour $\theta$ suffisamment petit on aura $f(x^*+\theta d) > f(x^*)$, ce qui montre que $x^*$ est un minimum local de $f$.

### I.3 Cas des fonctions convexes : CNS d'optimalité globale

**Définition** : On dit qu'un problème de programmation mathématique est convexe s'il consiste à minimiser une fonction convexe (resp. maximiser une fonction concave) sur un domaine convexe.

$$
(P)
\left\{
\begin{aligned}
&min\ f \text{ convexe} \\
&SC \\
&\text{les } g_i \text{ sont convexes} \\
&S \subset \mathbb{R}^n \text{ est convexe}
\end{aligned}
\right.
$$

**Théorème** : Pour un programme convexe, tout optimum local est un optimum global.

**Théorème** : Si $f$ est une fonction convexe continûment différentiable, une CNS pour $x^*$ soit un optimum global de $f$ sur $\mathbb{R}^n$ est que $\nabla f(x^*) = 0$.

**Remarques**

1. Les conditions d'optimalité $\nabla f(x^*) = 0$ et $\nabla^2 f(x^*)$ est SDP sont les conditions les plus générales pour des fonctions continûment différentiables dans $\mathbb{R}^n$.

2. Lorsque la fonction à minimiser est convexe, on arrive loin à se passer de la différentiabilité en tout point en utilisant la notion de sous-gradient.

   **Définition (Sous-gradient)** : On appelle sous-gradient de $f$ au point $x_0$ tout vecteur $\gamma = (\gamma_1,\gamma_2,...,\gamma_n) \in \mathbb{R}^n$ vérifiant $f(x) \ge f(x_0) + \gamma^t(x-x_0)$.

3. Il existe beaucoup de fonctions qui ne sont même pas continues. Le problème d'optimisation sans contraintes de telles fonctions dans $\mathbb{R}^n$ est encore très loin d'être résolu de façon satisfaisante.

## II. Méthodes Numériques pour l'optimisation sans contraintes

On suppose que $f$ est continue et différentiable. La 1ère condition d'optimalité est : $\nabla f(x^*) = 0 \Leftrightarrow \dfrac{\partial f}{\partial x_i}(x) = 0\ \forall i=1...n$.

On peut résoudre ce système à l'aide de la méthode de Newton : (1) pour assurer la convergence il faut choisir le point de départ proche de $x^*$. (2) nécessite l'évaluation de la dérivée seconde en chaque point.

Pour ce genre de problèmes d'optimisation, les méthodes les plus utilisées ce sont les méthodes itératives. C-à-d on engendre une suite de points $x_0, x_1, ..., x_k$ qui converge vers un optimum local de $f$. À chaque étape $x_{k+1}$ est calculé par $x_{k+1} = x_k + \lambda_k d_k$ où $d_k$ est une direction de déplacement qui peut être :

- soit le gradient de $f$ en $x_k$ : $d_k = -\nabla f(x_k)$ (descente),
- soit calculée à partir du gradient,
- soit choisie de façon plus ou moins arbitraire à condition que ce soit une direction de descente c-à-d $\nabla f(x_k).d_k < 0$.

### II.1 Méthode du gradient

Il s'agit d'une famille de méthodes qui procèdent de la façon suivante :

1. On part d'un point initial $x_0$.
2. On calcule $\nabla f(x_0)$.
3. Comme $\nabla f(x_0)$ indique la direction de plus grande augmentation de $f$, on se déplace d'une quantité $\lambda_0 > 0$ dans la direction opposée au gradient :

$$x_1 = x_0 - \lambda_0 \frac{\nabla f(x_0)}{\lVert \nabla f(x_0)\rVert}$$

4. Cette procédure est répétée à partir de la relation de récurrence :

$$x_{k+1} = x_k - \lambda_k \frac{\nabla f(x_k)}{\lVert \nabla f(x_k)\rVert} \qquad \forall k,\ \lambda_k > 0$$

**a) Méthode de gradient à pas déterminé** : Dans les méthodes de gradient à pas déterminé on choisit à priori les valeurs de déplacement $\lambda_k$.

**La convergence** :

- **Méthode 1** : Méthode à pas constant. $\lambda_k = \lambda = $ constante.
- **Méthode 2** : Méthode de la série divergente (Polyak, 1966). $\lambda_k = \dfrac{1}{k}$, ici $\lambda_k \xrightarrow[k\to+\infty]{} 0$ et $\sum_{k=0}^{+\infty}\lambda_k = +\infty$.
- **Méthode 3** : Méthode de la série convergente (Shor 1968, Coffin 1977). $\lambda_k = \lambda_0\alpha^k$, $0<\alpha<1$.
- **Méthode 4** : Méthode de relaxation (Held, Wolfe, Crowder 1974). $\lambda_k = \rho\,\dfrac{f(x_k)-\bar f}{\lVert \gamma_k\rVert}$ où $\bar f$ = estimation de la valeur optimale $f(x_0)$ ; $\rho$ : coefficient de relaxation strictement positif ($0<\rho\le2$) ; $\gamma_k$ : le sous-gradient de $f$ au point $x_k$.

### II.2 Interprétation géométrique du gradient — Courbes de niveau

Les courbes de niveau d'une fonction $f$ sont les lieux où $f$ est constante, il y en a une par valeur prise : $Niv_c = \{M\in\mathbb{R}^n \mid f(M)=c\}$.

**Exemple** : pour $f:(x,y)\mapsto x^2+y^2$, et $c$ positif, la courbe de niveau $c$ est le cercle de rayon $\sqrt c$ centré en l'origine.

**Courbe de niveau et gradient** : Là où le gradient est non nul, il est perpendiculaire à la courbe de niveau. Autrement dit, la tangente à la courbe de niveau est perpendiculaire au gradient.

**Plan tangent au graphe (cas $\mathbb{R}^2$)** : on rappelle que l'équation de la tangente au graphe au pt $(a,f(a))$ est $y = f(a) + (x-a)f'(a)$. Si $f$ est à 2 variables, l'équation du plan tangent au pt $(a,b,f(a,b))$ est $z = f(a,b) + (x-a)\dfrac{\partial f}{\partial x}(a,b) + (y-a)\dfrac{\partial f}{\partial y}(a,b)$.

**Théorème (Interprétation géométrique du Gradient)** : Soient $x_0 \in A \subset \mathbb{R}^n$ et $f: A \to \mathbb{R}$ une fonction continûment différentiable en $x_0$ telle que $\nabla f(x_0) \ne 0$. Le gradient de $f$ en $x_0$ est nécessairement orthogonal au plan tangent en $x_0$ à la courbe de niveau qui passe par ce point.

**Illustration** (supposons $A \subset \mathbb{R}^2$, $f:A\to\mathbb{R}$) : soit $f(x) = f(x_0) = k$. Prenons un point $x_a = x_0 + \Delta x\ /\ f(x_a) = f(x_0+\Delta x) = f(x_0) = k$ (un pt se trouvant sur la courbe). C-à-d un déplacement $\Delta x$ qui conduit, à partir de $x_0$, à un point $x_a\ /\ f(x_a) = f(x_0) = k$.

La formule de Taylor à l'ordre 1 : $f(x_a) = f(x_0+\Delta x) = f(x_0) + \nabla f(x_0)\,\Delta x + O(\Delta x)$

$$\Rightarrow 0 = \nabla f(x_0)\cdot\frac{\Delta x}{\lVert \Delta x\rVert} + \frac{O(\Delta x)}{\lVert \Delta x\rVert}$$

$$\Rightarrow \lim_{\Delta x\to0} \nabla f(x_0)\cdot\frac{\Delta x}{\lVert \Delta x\rVert} + \frac{O(\Delta x)}{\lVert \Delta x\rVert} = \nabla f(x_0)\cdot u = 0$$

où $\dfrac{\Delta x}{\lVert \Delta x\rVert}\xrightarrow[\Delta x\to0]{} u$ : vecteur unité qui est tangent à la courbe au pt $x_0$.

**Exemple** : $f:\mathbb{R}^2\to\mathbb{R}$, $x \mapsto x_1^2+x_2$. Soit $X=(0,0)$. La courbe qui passe par $X$ a pour équation $x_1^2+x_2 = f(X) = 0$ soit $x_2 = -x_1^2$. La tangente en $X=(0,0)$ est la droite de pente $-2x_1 = 0$. D'un autre côté $\nabla f(X) = (2x_1,1) \Rightarrow \nabla f(0,0)=(0,1)$.

**Théorème** : La dérivée directionnelle est maximale lorsque $\vec v$ a la même direction et le même sens que $\nabla f(x_0,y_0)$. De plus, le taux de variation maximal de $f(x,y)$ en $(x_0,y_0)$ est $\lVert \nabla f(x_0,y_0)\rVert$.

*Démo* : La dérivée directionnelle s'écrit : $f_{\vec u}(x_0,y_0) = \nabla f(x_0,y_0)\cdot\vec u = \lVert \nabla f(x_0,y_0)\rVert\,\lVert \vec u\rVert\cos\theta = \lVert \nabla f(x_0,y_0)\rVert\cos\theta$ (comme $\lVert \vec v\rVert=1$, $\theta$ = angle entre les 2 vecteurs).

Pour que cette dérivée directionnelle soit maximale il faut que $\cos\theta=1$, soit $\theta=0$.

Si $\theta=\pi/2$, alors $f_{\vec u}(x_0,y_0)=0$. Si on se déplace à une direction $\perp$ au gradient on aura pas de variation.

### II.3 Méthode de la plus forte pente (steepest descent) — Méthode du gradient à pas optimal

Dans cette méthode $\lambda_k$ est choisi de façon à minimiser la fonction $g(\lambda) = f(x_k - \lambda\nabla f(x_k))$ par $\lambda \ge 0$. Il s'agit d'une minimisation unidimensionnelle.

**Algorithme de la plus forte pente** :

1. Choisir un point de départ $x_0$, $k=0$.
2. À l'itération $k$, $d_k = -\nabla f(x_k)$.
3. Rechercher $\lambda_k$ tel que $f(x_k+\lambda_k d_k) = \min_{\lambda\ge0} f(x_k+\lambda d_k)$.
4. Faire $x_{k+1} = x_k + \lambda_k d_k$.
5. **Test d'arrêt** :
   - $\max_{1\le i\le n}\left|\dfrac{\partial f}{\partial x_i}\right| < \varepsilon$ ($\varepsilon$ donné) (ici on assure que $\nabla f(\bar x)=0$)
   - $\lVert \nabla f\rVert^2 = \sum_{i=1}^n\left(\dfrac{\partial f}{\partial x_i}\right)^2 < \varepsilon$ ($\varepsilon$ donné)
   - $|f(x_{k+1})-f(x_k)| < \varepsilon$ ($\varepsilon$ donné) — à partir d'un certain rang $f(x_k)$ se rapproche de sa limite, c-à-d atteint le min.

**Remarque** : à titre de précaution, on peut fixer à priori le nombre d'itérations maximal.

### Détermination de $\lambda_k$

À l'itération $k$ on a : $x_{k+1} = x_k + \Delta x_k = x_k + \lambda_k \hat S_k$, avec $\hat S_k = -\dfrac{\nabla f(x_k)}{\lVert \nabla f(x_k)\rVert}$ est le vecteur unité $\Delta x_k$ dans la direction de $\Delta x_k$.

Pour calculer $x_{k+1}$, il faut déterminer $\lambda_k$ tel que $f(x_k+\lambda_k\hat S_k) = \min_{\lambda\ge0} f(x_k+\lambda\hat S_k)$.

Supposons que $f$ soit une fonction quadratique qui s'écrit $f(x) = f(x_k)+\nabla f(x_k)^t(x-x_k)+\frac12(x-x_k)^t H(x-x_k)$ (selon la formule de Taylor).

En remplaçant $x-x_k$ par $\lambda\hat S_k$ nous aurons :

$$f(x) \approx f(x_k) + \nabla f(x_k)^t\lambda\hat S_k + \frac12\lambda\hat S_k^t\,H\,\lambda\hat S_k$$

$$g(\lambda) = f(x_k+\lambda\hat S_k), \qquad \frac{dg(\lambda)}{d\lambda} = 0 = \nabla f(x_k)^t\hat S_k + \lambda\hat S_k^t H\hat S_k$$

$\Rightarrow$ la relation que vérifie $\lambda$ est : $\lambda_k = -\dfrac{\nabla f(x_k)^t\hat S_k}{\hat S_k^t H \hat S_k}$

**Remarque** : Dans la méthode de la plus forte pente, deux directions de déplacement consécutifs sont orthogonales. En effet : $g(\lambda)=f(x_k+\lambda\hat S_k)$, $\dfrac{dg(\lambda)}{d\lambda} = \hat S_k^t\nabla f(x_k+\lambda_k\hat S_k)=0 \Leftrightarrow \hat S_k^t\left(-\dfrac{\nabla f(x_{k+1})}{\lVert \nabla f(x_{k+1})\rVert}\right)=0 \Leftrightarrow \hat S_k^t\hat S_{k+1}=0$.

<!-- TODO: page 16 has a hand-drawn illustration of nested elliptical level curves with a zig-zag steepest-descent path from x0 toward the minimum — genuine sketch, described in prose here rather than re-rendered; see PDF tab. -->

**Convergence de la méthode de la plus forte pente. Théorème** : Si $f$ est continûment différentiable avec la propriété [$f$ est coercive : $f(x) \to +\infty$ quand $\lVert x\rVert \to +\infty$], alors, pour tout point de départ $x_0$, la méthode de la plus forte pente converge vers un point stationnaire de $f$.

**Remarque** : Le principal défaut de la méthode de la plus forte pente est que la vitesse de la convergence varie d'une fonction à une autre et la convergence peut être très lente pour certains types de fonctions.

**Exemple ①** : Déterminer la direction de la méthode de la plus forte pente au point $x=(1,1)$ de la fct objective $f(x) = x_1^2+2x_2^2$.

**Exemple ②** : Minimiser $f(x) = x_1^2+25x_2^2$ en utilisant la méthode de la plus forte pente. Choisir $x_0 = [2,2]$.

1. Trouver la solution exacte de ce problème : $\nabla f(x) = \begin{pmatrix}2x_1\\50x_2\end{pmatrix} = \begin{pmatrix}0\\0\end{pmatrix}$ soit $\begin{cases}x_1=0\\x_2=0\end{cases}$

$H = \begin{pmatrix}2&0\\0&50\end{pmatrix}$, $H$ est SDP ; $v=\begin{pmatrix}v_1\\v_2\end{pmatrix}$, $v^tHv = (v_1\ v_2)\begin{pmatrix}2v_1\\50v_2\end{pmatrix} = 2v_1^2+50v_2^2 \ge 0$. Donc $(H)$ admet un minimum en $(0,0)$.

2. Suivi de l'algorithme, valeurs intermédiaires :

| itération $k$ | $\lambda_k$ | $x_1$ | $x_2$ | $\partial f/\partial x_1(x_k)$ | $\partial f/\partial x_2(x_k)$ | $f(x_k)$ |
|---|---|---|---|---|---|---|
| 0 | —     | 2     | 2      | 4     | 100    | 104   |
| 1 | 2,003 | 1,92  | -0,003 | 3,84  | -0,15  | 3,19  |
| 2 | 1,85  | 0,07  | 0,07   | 0,14  | 3,5    | 0,13  |
| 3 | 0,07  | 0,07  | -0,000 | ...   | ...    | ...   |

### II.4 Méthode de plus forte pente « accélérée »

Pour améliorer la méthode de plus forte pente quand elle est appliquée à des fonctions mal conditionnées, le procédé d'accélération suivant a été proposé.

À chaque itération $k$, on effectue (à partir de $x_k$) $p$ étapes de la méthode de plus forte pente ce qui donne un point $y_k$. Le point $x_{k+1}$ est alors déterminé par minimisation unidimensionnelle dans la direction $d_k = y_k - x_k$ à partir de $x_k$.

<!-- TODO: page 18's hand-drawn illustration of the accelerated steepest descent path (x0 → several small steps d0, d1, d2 → y toward the minimum in an elongated ellipse) is a genuine sketch, summarized in prose rather than re-rendered; see PDF tab. -->

**Remarque** : $f(x) = x_1^2+25x_2^2 = x_1^2+(5x_2)^2 = x_1^2+y_1^2$. Si les variables de la fonction objectif possèdent les $n$ coefficients égaux, $\hat S_k$ pointe directement sur le minimum.

## III. Méthode du second ordre

**But** : amélioration de la convergence des méthodes de gradient.

**Principe** : en un minimum local $\bar x$ : $\nabla f(\bar x)=0$. Le développement en série de Taylor de $f$ au voisinage de $\bar x$ s'écrit : $f(x) \approx f(\bar x) + \frac12(x-\bar x)^t\nabla^2f(\bar x)(x-\bar x)$.

Si $\bar x$ satisfait les conditions suffisantes de l'optimalité, alors $\nabla^2f(\bar x)$ est défini positif. On dit que la fonction $f$ se comporte, au voisinage de $\bar x$, comme une fonction quadratique strictement convexe. Dans ce cas une méthode générale d'optimisation doit au moins converger rapidement sur les fonctions quadratiques.

### III.1 Méthode des directions conjuguées (Méthode du gradient conjugué)

- C'est une méthode itérative.
- Appliquée à une fonction quadratique de $n$ variables, conduit à l'optimum en $n$ étapes au plus.

Considérons une fonction quadratique typique : $q(x) = \frac12 x^tAx + b^tx + c$

où : $A$ est une matrice carrée $n\times n$ définie positive et symétrique ; $b$ un vecteur $(b_1,...,b_n) \in \mathbb{R}^n$ ; $c$ est une constante.

**Principe de la méthode du gradient conjugué**

Soit $x_0$ un pt initial. À partir de $x_0$, la méthode consiste à minimiser $q(x)$ successivement suivant $n$ directions linéairement indépendantes $d_0, d_1, ..., d_{n-1}$. Ces directions possèdent la propriété d'être mutuellement conjuguées par rapport à la forme quadratique $q(x)$ : c-à-d $\forall\ 0\le i\le n-1,\ 0\le j\le n-1,\ i\ne j \Rightarrow d_i^tAd_j = 0$.

$x_{k+1}$ est déterminé à partir de $x_k$ par : $x_{k+1} = x_k + \lambda_k d_k$, où $\lambda_k$ est la valeur de $\lambda / g(x_k+\lambda d_k)$ est minimale.

Il faut prouver que le point $x_n$ obtenu à la $n^{ième}$ itération est nécessairement l'optimum du problème : $x_n = x_0 + \sum_{j=0}^{n-1}\lambda_j d_j \Leftrightarrow$ à dire que $\nabla q(x_n) = Ax_n+b = 0$.

Comme $\lambda_k$ minimise $q$ dans la direction $d_k$ :

$$\Rightarrow d_k^t\nabla q(x_{k+1}) = d_k^t(Ax_{k+1}+b) = 0$$
$$\Rightarrow d_k^t\left(A(x_k+\lambda_kd_k)\right)+d_k^tb = 0$$
$$\Rightarrow \lambda_k = -\frac{d_k^t(Ax_k+b)}{d_k^tAd_k} \ne 0 \text{ car } A \text{ est définie positive.}$$

Comme $x_k = x_0+\sum_{j=0}^{k-1}\lambda_jd_j \Rightarrow d_k^tAx_k = d_k^tAx_0+\sum_{j=0}^{k-1}\lambda_j\,d_k^tAd_j = d_k^tAx_0$

$$\Rightarrow \lambda_k = -\frac{d_k^t(Ax_0+b)}{d_k^tAd_k}$$

**Propriété** : Pour $1\le k\le n$, le point $x_k = x_0+\sum_{j=0}^{k-1}\lambda_jd_j$ est l'optimum de $q(x)$ sur la variété $V_k$ engendrée par $(d_0,d_1,...,d_{k-1})$. En particulier $x_n = x_0+\sum_{j=0}^{n-1}\lambda_jd_j$ est l'optimum de $q(x)$ sur $\mathbb{R}^n$.

*Démonstration* : $d_i^tAx_k = d_i^tAx_0+\sum_{j=0}^{k-1}\lambda_jd_i^tAd_j = d_i^tAx_0+\lambda_id_i^tAd_i$ (remplaçant $\lambda_i$) $= d_i^tAx_0-d_i^tAx_0+d_i^tb = d_i^tb$

$\Rightarrow d_i^t(Ax_k+b)=0 \Rightarrow \nabla q(x_k)=(Ax_k+b)\perp V_k \Rightarrow x_k$ est un optimum de $q$ sur $V_k$.

En particulier si $V_n = \mathbb{R}^n$, $k=n$, $x_n$ est l'optimum de $q$ sur $\mathbb{R}^n$.

**Exemple** : On considère le problème d'optimisation :

$$
\left\{
\begin{aligned}
&\text{minimiser } f(x) = x_1^2+x_2^2-4 \\
&x \in \mathbb{R}^2
\end{aligned}
\right.
$$

Posons $x_0 = [4,4]$.

$$\nabla f(x) = [2x_1, 2x_2], \qquad H(x) = \nabla^2f(x) = \begin{pmatrix}2&0\\0&2\end{pmatrix}$$

$f(x) = \frac12 x^tAx+b^tx+c$ avec $A=H(x)$, $b=0$, $c=-4$.

Considérons une direction de départ $\hat d_0 = \dfrac{d_0}{\lVert d_0\rVert}$. $\hat d_0 = [1/2, \sqrt3/2]$ ; $\hat d_0^t\hat d_0 = [1/2,\sqrt3/2]\begin{bmatrix}1/2\\\sqrt3/2\end{bmatrix} = \frac14+\frac34 = 1$.

Calcul de $x_1$ : $x_1 = x_0+\lambda_0\hat d_0$ avec $\lambda_0 = -\dfrac{\nabla f(x_0)^t\hat d_0}{\hat d_0^tA\hat d_0} = -\dfrac{[8,8]\begin{bmatrix}1/2\\\sqrt3/2\end{bmatrix}}{[8,8]\begin{bmatrix}2&0\\0&2\end{bmatrix}\begin{bmatrix}1/2\\\sqrt3/2\end{bmatrix}} = -5,46$

$\Rightarrow \lambda_0\hat d_0 = -5,46\begin{pmatrix}1/2\\\sqrt3/2\end{pmatrix} = \begin{bmatrix}-2,73\\-4,74\end{bmatrix}$

$\Rightarrow x_1 = x_0+\lambda_0\hat d_0 = \begin{bmatrix}1,27\\-0,74\end{bmatrix}$

La prochaine direction $\hat d_1$ qui minimise $f$ est choisie de sorte que $\hat d_1^tH\hat d_0=0$ et $\hat d_1\cdot\hat d_1=1$.

Ce qui donne : $[\hat d_1^1,\hat d_1^2]\begin{bmatrix}2&0\\0&2\end{bmatrix}\begin{bmatrix}1/2\\\sqrt3/2\end{bmatrix}=0 \Leftrightarrow \hat d_1^1+\sqrt3\,\hat d_1^2=0$

$$\begin{cases}\hat d_1^1+\sqrt3\,\hat d_1^2=0\\(\hat d_1^1)^2+(\hat d_1^2)^2=1\end{cases} \Leftrightarrow \hat d_1 = \begin{bmatrix}-\sqrt3/2\\1/2\end{bmatrix}$$

$\Rightarrow x_2 = x_1+\lambda_1\hat d_1$ avec $\lambda_1 = -\dfrac{\nabla f(x_1)\hat d_1}{\hat d_1^tA\hat d_1} = \dfrac{[2,54,\,-1,48]\begin{bmatrix}-\sqrt3/2\\1/2\end{bmatrix}}{[-\sqrt3/2,\,1/2]\begin{bmatrix}2&0\\0&2\end{bmatrix}\begin{bmatrix}-\sqrt3/2\\1/2\end{bmatrix}} = 1,47$

$\Rightarrow x_2 = \begin{bmatrix}1,27\\-0,74\end{bmatrix}+1,47\begin{bmatrix}-\sqrt3/2\\1/2\end{bmatrix} = \begin{bmatrix}0\\0\end{bmatrix}$ **solution optimale**.

<!-- TODO: page 24's hand-drawn illustration (a circle with x0, x1 marked and vectors -λ0 d̂0) is a genuine sketch of the two-step path to the optimum, described in prose here rather than re-rendered; see PDF tab. -->

### III.2 La méthode du gradient conjugué pour les fonctions quadratiques

Supposons que $q(x) = \frac12x^tAx+b^tx+c$.

**Idée de la méthode**

- Construire progressivement des directions $d_0, d_1, ..., d_k$ mutuellement conjuguées par rapport à la matrice $A$.
- À l'itération $k$, la direction de déplacement est obtenue par combinaison linéaire du gradient ($-\nabla q(x_k)$) et des $d_0,d_1,...,d_{k-1}$. Les coefficients sont choisis de sorte que $d_k$ soit conjuguée par rapport à $d_0,d_1,...,d_{k-1}$.

### Algorithme du gradient conjugué pour les fonctions quadratiques

(i) $x_0$ le point de départ ; $g_0 = \nabla q(x_0) = Ax_0+b$. Poser $d_0=-g_0$, $k=0$.

(ii) À l'itération $k$, on est au point $x_k$. $x_{k+1} = x_k+\lambda_kd_k$ avec :

(1) $\lambda_k = -\dfrac{g_k^td_k}{d_k^tAd_k} \equiv \lambda_k = +\dfrac{g_k^tg_k}{d_k^tAd_k} \ne 0$

(2) $d_{k+1} = -g_{k+1}+\beta_kd_k$ avec $\beta_k = \dfrac{g_{k+1}^tAd_k}{d_k^tAd_k} \equiv \beta_k = \dfrac{g_{k+1}^t[g_{k+1}-g_k]}{g_k^tg_k} = \dfrac{g_{k+1}^tg_{k+1}}{g_k^tg_k}$

**Vérifions que les directions $d_0, d_1, ..., d_{k+1}$ engendrées par l'algorithme sont mutuellement conjuguées.**

On a : $d_{k+1}^tAd_k = [-g_{k+1}+\beta_kd_k]^tAd_k = -g_{k+1}^tAd_k+\beta_kd_k^tAd_k = -g_{k+1}^tAd_k+g_{k+1}^tAd_k = 0$.

Vérifions que $d_{k+1}^tAd_i = 0\ \forall\ 0\le i\le k-1$ :

$d_{k+1}^tAd_i = [-g_{k+1}^t+\beta_kd_k^t]Ad_i = -g_{k+1}^tAd_i+\beta_k\dfrac{d_k^tAd_i}{0}$

or $x_{i+1} = x_i+\lambda_id_i \Rightarrow \lambda_iAd_i = Ax_{i+1}-Ax_i \Rightarrow Ad_i = \dfrac{1}{\lambda_i}[g_{i+1}-g_i]$, et $g_{i+1}=-d_{i+1}+\beta_id_i$, ($g_{i+2}=-d_i+\beta_{i-1}g_{i-1}$) $\Rightarrow Ad_i$ s'écrit comme CL de $d_0,d_1,...,d_{i-1}$.

Et comme $x_{k+1}$ est l'optimum de $q(x)$ sur l'espace engendré par $(d_0,d_1,...,d_k) \Rightarrow \nabla q(x_{k+1}) = g_{k+1} \perp$ à cet espace $\Rightarrow g_{k+1}^tAd_i=0$.

**Montrons que** $\lambda_k = \dfrac{g_k^tg_k}{d_k^tAd_k}$ : on a $d_k=-g_k+\beta_{k-1}d_{k-1}$

$$\Rightarrow \lambda_k = -\frac{g_k^t[-g_k+\beta_{k-1}d_{k-1}]}{d_k^tAd_k} = \frac{g_k^tg_k}{d_k^tAd_k} - \underbrace{\beta_{k-1}\frac{g_k^td_{k-1}}{d_k^tAd_k}}_{=0}$$

**Montrons que** $\beta_k = \dfrac{g_{k+1}^t[g_{k+1}-g_k]}{g_k^tg_k}$ : $g_{k+1}-g_k = A(x_{k+1}-x_k) = \lambda_kAd_k \Rightarrow g_{k+1}^tAd_k = \dfrac{1}{\lambda_k}g_{k+1}^t[g_{k+1}-g_k]$

$$\Rightarrow \beta_k = \frac{1}{\lambda_k}\frac{g_{k+1}^t[g_{k+1}-g_k]}{d_k^tAd_k} = \frac{g_{k+1}^t[g_{k+1}-g_k]}{g_k^tg_k}$$

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/pl-optimisation-non-lineaire-sans-contraintes.pdf" />

</TabItem>
</Tabs>
