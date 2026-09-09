---
sidebar_position: 3
title: "Chapitre 2 : Notions de Base de la Programmation Linéaire"
sidebar_label: Ch2 - Notions de base
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 2 : Notions de Base de la Programmation Linéaire

*ENSI — N. Elloumi — RO : Programmation linéaire*

## I. Définition d'un programme linéaire

Un problème de programmation linéaire se note de la manière suivante :

$$
\left\{
\begin{aligned}
&Max\ Z = {}^t\!c\,x \\
&\text{Sous contraintes} \\
&Ax \le b \\
&x \ge 0;\ x \in \mathbb{R}^n
\end{aligned}
\right.
$$

$Max\ Z = {}^t\!c\,x$ représente la fonction bénéfice, coût, …etc. Dans la forme canonique affichée ici, $Ax \le b$ représente les contraintes d'inégalité. La forme standard utilise des égalités $Ax=b$ ; plus généralement, un PL peut contenir des égalités et des inégalités linéaires.

$A$ est une matrice d'ordre $m \times n$, $b$ est un vecteur à $m$ composantes et $c$ un vecteur à $n$ composantes.

## II. Position du problème

Résoudre un problème de programmation linéaire, revient à chercher un vecteur $x = (x_1, x_2, ..., x_n)$ satisfaisant $Ax \le b$ et rendant maximum (resp. minimum) la fonction $Z = {}^t\!c\,x$.

**Remarque** : Maximiser $(Z) \Leftrightarrow -[\text{Minimiser}(-Z)]$

**Intérêt** : Un algorithme de maximisation, sans le modifier, peut être employé pour minimiser une fonction et inversement.

### Différentes formes des programmes linéaires

**Forme Canonique**

$$
\left\{
\begin{aligned}
&Max\ Z = {}^t\!c\,x \\
&\text{Sous contraintes} \\
&Ax \le b \\
&x \ge 0;\ x \in \mathbb{R}^n
\end{aligned}
\right.
$$

**Forme Standard**

$$
\left\{
\begin{aligned}
&Max\ Z = {}^t\!c\,x \\
&\text{Sous contraintes} \\
&Ax = b \\
&x \ge 0;\ x \in \mathbb{R}^n
\end{aligned}
\right.
$$

**Question** : Comment passer d'une forme canonique à une forme standard ?

**Réponse** : Pour une contrainte $a_i^T x \le b_i$, on ajoute une variable d'écart $\xi_i \ge 0$ : $a_i^T x + \xi_i = b_i$. Pour une contrainte $a_i^T x \ge b_i$, on soustrait une variable d'excès $s_i \ge 0$ : $a_i^T x - s_i = b_i$. Les contraintes d'égalité sont déjà sous forme standard.

Dans le cas canonique $Ax \le b$, l'ajout du vecteur $\xi \ge 0$ donne :

$$
\left\{
\begin{aligned}
&Max\ Z = {}^t\!c\,x \\
&\text{Sous contraintes} \\
&Ax + \xi = b \\
&x \ge 0,\ x \in \mathbb{R}^n;\ \xi \ge 0,\ \xi \in \mathbb{R}^m
\end{aligned}
\right.
$$

$\xi$ est le vecteur des variables d'écart. Les variables d'écart ou d'excès ont un coefficient nul dans la fonction objectif.

Pour la forme standard, il existe une solution initiale évidente, non nécessairement optimale, $(x = 0 \text{ et } \xi = b)$ si $b \ge 0$.

::::note Initialisation

La mise sous forme standard ne fournit pas toujours une base réalisable évidente, notamment en présence de contraintes $\ge$. La construction d'une base initiale dans ce cas sera traitée avec les méthodes du chapitre suivant.

::::

**Exemple**

$$
\left\{
\begin{aligned}
&Max\ Z = 2x_1 + \frac{3}{2}x_2 \\
&\text{Sous contraintes} \\
&x_1 \le 400 \\
&x_2 \le 700 \\
&x_1 + x_2 \le 800 \\
&2x_1 + x_2 \le 1000 \\
&x_1 \ge 0;\ x_2 \ge 0
\end{aligned}
\right.
\quad\xrightarrow{\text{Forme Standard}}\quad
\left\{
\begin{aligned}
&Max\ Z = 2x_1 + \frac{3}{2}x_2 \\
&\text{Sous contraintes} \\
&x_1 + y_1 = 400 \\
&x_2 + y_2 = 700 \\
&x_1 + x_2 + y_3 = 800 \\
&2x_1 + x_2 + y_4 = 1000 \\
&x_i \ge 0;\ y_i \ge 0
\end{aligned}
\right.
$$

**SIE : Solution Initiale Évidente** :

$$
x = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}
\qquad
y = \begin{pmatrix} y_1 \\ y_2 \\ y_3 \\ y_4 \end{pmatrix} = \begin{pmatrix} 400 \\ 700 \\ 800 \\ 1000 \end{pmatrix}
$$

## III. Solutions réalisables

**Solution réalisable (ou admissible)** : Si $x$ satisfait les contraintes, on dit que c'est une solution réalisable.

**Ensemble des solutions réalisables** :

$$X_{ad} = \{x \in \mathbb{R}^n \;/\; Ax \le b;\ x \ge 0\}$$

**Ensemble des solutions optimales** (pour un problème de maximisation) :

$$X_{Opt} = \{x_0 \in \mathbb{R}^n \;/\; {}^t\!c\,x_0 \ge {}^t\!c\,x;\ \forall x \in X_{ad}\}$$

**Propriétés**

- $X_{ad}$ est convexe ; il peut être vide ou non borné.
- Lorsque $X_{Opt}$ est non vide, il est convexe ; il peut lui aussi être non borné.

## IV. Solution de base, variables de base et variables non de base

On considère le problème linéaire (PL) sous forme standard :

$$
(PL)
\left\{
\begin{aligned}
&Max\ Z = {}^t\!c\,x \\
&\text{Sous contraintes} \\
&Ax = b \\
&x \ge 0;\ x \in \mathbb{R}^n
\end{aligned}
\right.
\qquad
\text{Avec}
\left\{
\begin{aligned}
&A \text{ est une matrice d'ordre } m \times n\ (n \ge m) \text{ et } \operatorname{rang}(A)=m \\
&b \in \mathbb{R}^m \\
&c \in \mathbb{R}^n \\
&x \in \mathbb{R}^n
\end{aligned}
\right.
$$

$A = [B, N]$ : après un éventuel réordonnancement des colonnes, on partitionne $A$ en deux sous-matrices.

Une **base** est un choix de $m$ colonnes linéairement indépendantes de $A$. La sous-matrice correspondante $B$ est donc carrée d'ordre $m$ et inversible. Les autres colonnes forment $N$, de taille $m \times (n-m)$.

- $x_B$ : vecteur des variables de base, c'est le vecteur des variables $x_j$ correspondant aux colonnes de $B$.
- $x_N$ : vecteur des variables non de base, c'est le vecteur des variables $x_j$ correspondant aux colonnes de $N$ (sont appelées aussi variables hors base).

De ce fait :

$$Z = {}^t\!c\,x = {}^t\!c_B\,x_B + {}^t\!c_N\,x_N$$

$$b = Ax = Bx_B + Nx_N$$

Pour construire la solution de base associée à $B$, on pose $x_N=0$. Le système $Bx_B+Nx_N=b$ donne alors $x_B=B^{-1}b$ :

$$x = (x_B=B^{-1}b,\ x_N=0).$$

Cette solution est une **solution de base**. Elle est une **solution réalisable de base** (SRB) si et seulement si $x_B=B^{-1}b\ge0$.

### Exemple

$$
(PL)
\left\{
\begin{aligned}
&Max\ Z = 100x_1 + 200x_2 \\
&\text{Sous contraintes} \\
&3x_1 + 4x_2 \le 42 \\
&x_1 + 3x_2 \le 24 \\
&x_1 \ge 0;\ x_2 \ge 0
\end{aligned}
\right.
\quad\xrightarrow{\text{Forme Standard}}\quad
\left\{
\begin{aligned}
&Max\ Z = 100x_1 + 200x_2 \\
&\text{Sous contraintes} \\
&3x_1 + 4x_2 + y_1 = 42 \\
&x_1 + 3x_2 + y_2 = 24 \\
&x_1 \ge 0;\ x_2 \ge 0 \\
&y_1 \ge 0;\ y_2 \ge 0
\end{aligned}
\right.
$$

$y = (y_1, y_2)$ : vecteur des variables d'écart.

**Écriture matricielle** :

$$
\left\{
\begin{aligned}
&Max\ Z = (100, 200, 0, 0)\begin{pmatrix} x_1 \\ x_2 \\ y_1 \\ y_2 \end{pmatrix} \\
&\text{S-C} \\
&\begin{pmatrix} 3 & 4 & 1 & 0 \\ 1 & 3 & 0 & 1 \end{pmatrix}\begin{pmatrix} x_1 \\ x_2 \\ y_1 \\ y_2 \end{pmatrix} = \begin{pmatrix} 42 \\ 24 \end{pmatrix} \\
&\text{les } x_i \text{ et les } y_j \text{ sont } \ge 0
\end{aligned}
\right.
\quad\Leftrightarrow\quad
\left\{
\begin{aligned}
&Max\ Z = {}^t\!c\,X \\
&\text{Sous contraintes} \\
&AX = b \\
&X \ge 0
\end{aligned}
\right.
$$

$A = [B, N]$ : On partitionne $A$ en deux sous-matrices.

$$A = \begin{pmatrix} 3 & 4 & 1 & 0 \\ 1 & 3 & 0 & 1 \end{pmatrix} \;\Rightarrow\; B = \begin{pmatrix} 3 & 0 \\ 1 & 1 \end{pmatrix} \;\text{et}\; N = \begin{pmatrix} 4 & 1 \\ 3 & 0 \end{pmatrix}$$

$$B^{-1} \exists \;\text{ et }\; B^{-1} = \begin{pmatrix} \dfrac{1}{3} & 0 \\ -\dfrac{1}{3} & 1 \end{pmatrix} \;\text{et}\; B^{-1}b = \begin{pmatrix} 14 \\ 10 \end{pmatrix}$$

**Dans ce cas** :

$$x_B = \begin{pmatrix} x_1 \\ y_2 \end{pmatrix} \;\text{et}\; x_N = \begin{pmatrix} x_2 \\ y_1 \end{pmatrix}$$

**Ce choix donne la solution de base** : $x_B = \begin{pmatrix} 14 \\ 10 \end{pmatrix}$ et $x_N = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$

### Une solution de base non réalisable

$$A = \begin{pmatrix} 3 & 4 & 1 & 0 \\ 1 & 3 & 0 & 1 \end{pmatrix} \;\Rightarrow\; B = \begin{pmatrix} 4 & 0 \\ 3 & 1 \end{pmatrix} \;\text{et}\; N = \begin{pmatrix} 3 & 1 \\ 1 & 0 \end{pmatrix}$$

$$B^{-1} \exists \;\text{ et }\; B^{-1} = \frac{1}{4}\begin{pmatrix} 1 & 0 \\ -3 & 4 \end{pmatrix} \;\text{mais}\; B^{-1}b = \begin{pmatrix} \dfrac{21}{2} \\ \dfrac{-30}{4} \end{pmatrix}$$

Cette matrice $B$ est bien une base, mais la solution de base associée n'est pas réalisable car sa seconde variable de base vaut $-\frac{30}{4}<0$.

**Remarque** : La Solution Initiale Évidente (**SIE**) admet la matrice identité comme base. Dans le cas de l'exemple, la (SIE) est :

$$x_B = \begin{pmatrix} y_1 \\ y_2 \end{pmatrix} = \begin{pmatrix} 42 \\ 24 \end{pmatrix} \;\text{et}\; x_N = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$

## V. Théorème fondamental de la programmation linéaire

**Définition** : Soit $C$ un convexe. Un point $x\in C$ est **extrémal** s'il ne peut pas s'écrire $x=\lambda y+(1-\lambda)z$, avec $y,z\in C$, $y\ne z$ et $0<\lambda<1$.

Un point extrémal est un point frontière, mais la réciproque est fausse en général.

::::note Théorème fondamental de la programmation linéaire

Si un PL possède un optimum fini qui est atteint, alors il existe au moins une solution optimale extrémale. Dans la forme standard $Ax=b$, $x\ge0$, avec $\operatorname{rang}(A)=m$, ces points extrémaux correspondent aux SRB.

La justification est polyédrale : l'ensemble des solutions réalisables est un polyèdre et l'ensemble de ses solutions optimales est une face non vide ; cette face contient une solution extrémale dans le cadre standard considéré ici.

::::

## VI. Caractérisation d'une solution réalisable de base

La recherche d'un optimum fini atteint peut donc se ramener à la recherche d'une solution extrémale, c'est-à-dire d'une SRB dans la forme standard de rang plein considérée ici.

**Question** : Comment caractériser algébriquement et géométriquement un point extrémal ?

### VI.1 Caractérisation algébrique d'un point extrémal

Considérons un polyèdre $X=\{x\in\mathbb{R}^n\;/\;Lx\le h\}$. Un point réalisable $\hat{x}$ est extrémal si et seulement s'il existe $n$ contraintes actives en $\hat{x}$ dont les vecteurs normaux sont linéairement indépendants. Une contrainte $L_i x\le h_i$ est active lorsque $L_i\hat{x}=h_i$.

**Exemple** : Considérant l'ensemble des solutions admissibles d'un programme linéaire :

$$X_{ad} = \{x \in \mathbb{R}^2 \;/\; x_1 + x_2 \le 1;\ x_1 \ge 0,\ x_2 \ge 0\} = \{x \in \mathbb{R}^2 \;/\; Lx \le h\}$$

$$L = \begin{pmatrix} 1 & 1 \\ -1 & 0 \\ 0 & -1 \end{pmatrix} \;\text{et}\; h = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$$

Les points extrêmes sont solutions des systèmes ($2 \times 2$) suivants :

$$\begin{pmatrix} 1 & 1 \\ 0 & -1 \end{pmatrix}\begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \;\Rightarrow\; \text{Solution } S_1 = \begin{pmatrix} x_1 = 1 \\ x_2 = 0 \end{pmatrix}$$

$$\begin{pmatrix} 1 & 1 \\ -1 & 0 \end{pmatrix}\begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \;\Rightarrow\; \text{Solution } S_2 = \begin{pmatrix} x_1 = 0 \\ x_2 = 1 \end{pmatrix}$$

$$\begin{pmatrix} -1 & 0 \\ 0 & -1 \end{pmatrix}\begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix} \;\Rightarrow\; \text{Solution } S_3 = \begin{pmatrix} x_1 = 0 \\ x_2 = 0 \end{pmatrix}$$

<!-- TODO: page 18's small triangular sketch (X_ad with S1, S2, S3 marked) is a geometric figure in the source, not reproduced here — see PDF tab for the figure. -->

### VI.2 Propriétés d'une Solution Réalisable de Base (SRB)

**Remarque** : L'intersection d'un nombre fini de demi-espaces fermés est un polyèdre.

**Propriété** : Sous les hypothèses de la forme standard, notamment $\operatorname{rang}(A)=m$, le polyèdre convexe $X_{ad}=\{x\in\mathbb{R}^n\;/\;Ax=b;\ x\ge0\}$ possède un nombre fini $N$ de SRB, avec $N\le C_n^m$.

**Théorème** : Sous ces mêmes hypothèses, l'ensemble des points extrêmes de $X_{ad}$ correspond exactement à l'ensemble des SRB.

### VI.3 Caractérisation géométrique d'une SRB

Une SRB est donnée par :

$$x = \begin{pmatrix} x_B = B^{-1}b \ge 0 & (m \text{ variables}) \\ x_N = 0 & (n-m \text{ variables}) \end{pmatrix}.$$

Elle satisfait les $m$ égalités indépendantes $Ax=b$ et les $n-m$ contraintes de non-négativité actives $x_N=0$ ; elle est donc un sommet de $X_{ad}$.

L'algorithme du simplexe, étudié au chapitre suivant, passe de base en base le long des arêtes lorsque cela est possible. En cas de dégénérescence, un pivot peut changer la base sans changer le sommet ; une règle anti-cyclage appropriée est alors nécessaire pour garantir l'arrêt.

$$X_{ad} \text{ (infinité de solutions admissibles)} \;\longrightarrow\; \text{Les points extrémaux (corner points)} = \text{L'ensemble des solutions réalisables de base } (x_B = B^{-1}b \ge 0;\ x_N = 0)$$

## VII. Solution de base dégénérée

Une solution réalisable de base est dite **dégénérée** si au moins une variable de base est nulle.

Ainsi, plusieurs bases peuvent représenter le même sommet lorsqu'une variable de base vaut zéro.

**Remarque** : S'il existe une base dégénérée, alors on peut rencontrer un éventuel cyclage de l'algorithme : on retrouve une base déjà rencontrée et on boucle indéfiniment. Pour traiter les cas de dégénérescence, on peut appliquer la règle de Bland (1977) qui assure l'arrêt de l'algorithme en un nombre fini d'itérations.

**Règle de Bland** : Lorsque plusieurs variables sont susceptibles d'entrer ou de sortir de la base, on choisit toujours celle qui a l'indice le plus petit.

## Exercices

**Exercice 1**

On considère le programme linéaire suivant :

1. Écrire la forme standard de ce programme.
2. Admet-il une SIE ?

$$
(PL)
\left\{
\begin{aligned}
&Max\ Z = 3x_1 + 4x_2 + x_3 \\
&\text{Sous contraintes} \\
&x_1 + 2x_2 + 2x_3 \le \frac{8}{3} \\
&x_1 + 2x_2 + 3x_3 \ge \frac{7}{3} \\
&x_i \ge 0
\end{aligned}
\right.
$$

**Exercice 2**

On considère le programme linéaire suivant : Montrer que la solution $x = (0, 2, 1, 0)$ est une solution de base réalisable du programme linéaire (PL).

$$
(PL)
\left\{
\begin{aligned}
&Max\ Z = x_1 + 2x_2 + 4x_3 + x_4 \\
&\text{Sous contraintes} \\
&x_1 + x_2 - x_3 + x_4 = 1 \\
&-x_1 + 2x_3 + x_4 = 2 \\
&x_i \ge 0
\end{aligned}
\right.
$$

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/pl-ch2-notions-de-base.pdf" />

</TabItem>
</Tabs>
