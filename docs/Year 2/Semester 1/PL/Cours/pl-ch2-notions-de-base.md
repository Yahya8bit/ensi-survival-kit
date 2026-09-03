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

$Max\ Z = {}^t\!c\,x$ représente la fonction bénéfice, coût, …etc. et $Ax \le b$ représente les contraintes (d'égalités et d'inégalités).

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

**Réponse** : Pour une forme canonique, il suffit de rajouter un vecteur $\xi \ge 0$ pour obtenir un problème en forme standard :

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

$\xi$ : s'appelle vecteur des variables d'écart.

Pour la forme standard, il existe une solution initiale évidente, non nécessairement optimale, $(x = 0 \text{ et } \xi = b)$ si $b \ge 0$.

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

- $X_{ad}$ est convexe borné inférieurement
- $X_{Opt}$ est convexe borné inférieurement

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
&A \text{ est une matrice d'ordre } m \times n\ (n \ge m) \\
&b \in \mathbb{R}^m \\
&c \in \mathbb{R}^n \\
&x \in \mathbb{R}^n
\end{aligned}
\right.
$$

$A = [B, N]$ : On partitionne $A$ en deux sous-matrices.

$B$ = une matrice carrée d'ordre $m$ telle que : $B^{-1}$ existe et $B^{-1}b \ge 0$.

$N$ = une matrice d'ordre $m \times (n-m)$.

- $x_B$ : vecteur des variables de base, c'est le vecteur des variables $x_j$ correspondant aux colonnes de $B$.
- $x_N$ : vecteur des variables non de base, c'est le vecteur des variables $x_j$ correspondant aux colonnes de $N$ (sont appelées aussi variables hors base).

De ce fait :

$$Z = {}^t\!c\,x = {}^t\!c_B\,x_B + {}^t\!c_N\,x_N$$

$$b = Ax = Bx_B + Nx_N$$

**La solution définie par** : $x = (x_B = B^{-1}b,\ x_N = 0)$ est appelée solution de base associée à $B$.

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

### Un choix à rejeter

$$A = \begin{pmatrix} 3 & 4 & 1 & 0 \\ 1 & 3 & 0 & 1 \end{pmatrix} \;\Rightarrow\; B = \begin{pmatrix} 4 & 0 \\ 3 & 1 \end{pmatrix} \;\text{et}\; N = \begin{pmatrix} 3 & 1 \\ 1 & 0 \end{pmatrix}$$

$$B^{-1} \exists \;\text{ et }\; B^{-1} = \frac{1}{4}\begin{pmatrix} 1 & 0 \\ -3 & 4 \end{pmatrix} \;\text{mais}\; B^{-1}b = \begin{pmatrix} \dfrac{21}{2} \\ \dfrac{-30}{4} \end{pmatrix}$$

**Remarque** : La Solution Initiale Évidente (**SIE**) admet la matrice identité comme base. Dans le cas de l'exemple, la (SIE) est :

$$x_B = \begin{pmatrix} y_1 \\ y_2 \end{pmatrix} = \begin{pmatrix} 42 \\ 24 \end{pmatrix} \;\text{et}\; x_N = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$

## V. Théorème fondamental de la programmation linéaire

**Définition** : $C$ est un convexe, on dit que $x \in C$ est un point extrémal si $x$ n'est pas combinaison linéaire convexe de $y$ et $z$, pour tout $y$ et $z$ dans $C$.

**Propriétés**

$$(x_0 \text{ extrémal de } C) \Leftrightarrow (x_0 \text{ n'est pas compromis de deux autres points de } C)$$

$$\Leftrightarrow (\nexists\, h \ne 0 \;/\; x_0 \pm h \in C) \Leftrightarrow (C \setminus \{x_0\} \text{ est un convexe})$$

**Lemme** : « Si $C$ est convexe borné inférieurement alors il admet au moins un point extrémal »

**Remarque** : Un point extrémal sera toujours un point frontière mais l'inverse n'est pas toujours vrai.

**Théorème fondamental de la programmation linéaire** : Si le problème de programmation linéaire admet une solution optimale, il en admet au moins une qui est extrémale.

**Preuve** : L'ensemble des solutions optimales $X_{Opt}$ (non vide par hypothèse), il est convexe et borné inférieurement, il admet donc un point extrémal qui est un point extrémal dans $X_{ad}$.

## VI. Caractérisation d'une solution réalisable de base

**Propriété d'une fonction linéaire** : Si une fonction linéaire atteint son maximum (ou son minimum) sur $X_{ad}$, cet optimum a lieu en un point extrémal.

**Première constatation** : Étant donné que dans un programme linéaire la fonction objectif à maximiser ou à minimiser est une fonction linéaire, l'algorithme de simplexe permettra de trouver parmi les solutions optimales, une qui est extrémale.

**Question** : Comment caractériser algébriquement et géométriquement un point extrémal ?

### VI.1 Caractérisation algébrique d'un point extrémal

Soit $A$ une matrice ($m \times n$) et $b$ un vecteur à $m$ composantes.

$$X_{ad} = \{x \in \mathbb{R}^n \;/\; Ax = b;\ x \ge 0\}$$

Une CNS pour que $\hat{x}$ soit un point extrémal de $X_{ad}$ est que $\hat{x}$ soit un point de $X_{ad}$ vérifiant le système $\bar{A}\hat{x} = \bar{b}$, où $\bar{A}$ est une sous-matrice régulière d'ordre $n$ et $\bar{b}$ un sous-vecteur de $\mathbb{R}^n$.

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

**Lemme** : Le polyèdre convexe $X_{ad} = \{x \in \mathbb{R}^n \;/\; Ax = b;\ x \ge 0\}$ possède un nombre fini $N$ de solutions de base réalisables et $N \le C_n^m$.

**Théorème** : L'ensemble des points extrêmes du polyèdre convexe $X_{ad}$ correspond à l'ensemble des solutions de base réalisables.

### VI.3 Caractérisation géométrique d'une SRB

Une SRB est donnée par :

$$x = \begin{pmatrix} x_B = B^{-1}b \ge 0 & (m \text{ variables}) \\ x_N = 0 & (n-m \text{ variables}) \end{pmatrix}$$

$$x \in \big[(n-m \text{ hyperplans}) \cap (m \text{ hyperplans})\big] = \big[\{x_N = 0\} \cap \{x_B = B^{-1}b \ge 0\}\big]$$

Les points $x \in X_{ad}$ satisfaisant des contraintes d'égalités sont situés donc sur des faces de $X_{ad}$.

$$\bigcap (n \text{ faces de } X_{ad}) = \text{un sommet (un point extrême "corner point")}$$
$$\bigcap (n-1 \text{ faces de } X_{ad}) = \text{une arête}$$

L'algorithme de simplexe consistera à se déplacer de point extrême en point extrême en suivant des arêtes de $X_{ad}$ jusqu'à ce que l'on ait atteint l'optimum.

$$X_{ad} \text{ (infinité de solutions admissibles)} \;\longrightarrow\; \text{Les points extrémaux (corner points)} = \text{L'ensemble des solutions réalisables de base } (x_B = B^{-1}b \ge 0;\ x_N = 0)$$

## VII. Solution de base dégénérée

Une solution réalisable de base est dite **dégénérée** si au moins une variable de base est nulle.

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
