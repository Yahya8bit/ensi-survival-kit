---
sidebar_position: 3
title: "Chapitre 3.1 : Diviser pour Régner"
sidebar_label: Ch3.1 - Diviser pour Régner
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 3 : Paradigmes de programmation — 3.1 Diviser pour Régner

*Conception et analyse d'algorithmes*

## Plan du chapitre 3

1. Diviser pour Régner
2. Algorithme Glouton
3. Méthode Branch and Bound
4. Programmation Dynamique

## Paradigmes algorithmiques

- **Diviser pour Régner** : divise un problème en sous-problèmes indépendants (qui ne se chevauchent pas), résout chaque sous-problème, et combine les solutions des sous-problèmes pour former une solution du problème initial.
- **Algorithme Glouton** : construit une solution de manière incrémentale, en optimisant un critère de manière locale.
- **Branch & Bound** : séparation et évaluation.
- **Programmation Dynamique** : divise un problème en sous-problèmes qui sont non indépendants (qui se chevauchent), et cherche (et sauvegarde) des solutions de sous-problèmes de plus en plus grands.

## Approche Diviser pour Régner

Diviser pour régner (Divide-and-Conquer) :

- est une stratégie militaire ;
- est une méthode de conception d'algorithmes qui a mené à la création d'algorithmes efficaces pour de nombreux problèmes :
  - la recherche d'un élément dans un tableau trié (recherche dichotomique),
  - le tri (tri par fusion, tri rapide),
  - le produit de polynômes (algorithme de Karatsuba),
  - la transformation de Fourier discrète (transformation de Fourier rapide),
  - l'exponentiation rapide,
  - la multiplication naïve de matrices (matrices carrées de taille $n$), etc.

### Introduction

Construire un algorithme pour résoudre le problème avec la complexité optimale en temps, converger vers la complexité minimale. L'approche DpR est une approche classique permettant l'optimisation du temps dans le cas d'un problème polynomial.

### Principe de Diviser pour Régner

L'approche diviser pour régner sépare le problème en plusieurs sous-problèmes similaires au problème initial, résout les sous-problèmes de façon récursive, puis combine ces sous-solutions pour construire la solution du problème initial (algorithme récursif).

### Schéma général d'un algorithme DpR

Cette approche est basée sur 3 étapes :

- **Étape 1 — Diviser** : diviser le problème (les données du problème) en sous-problèmes similaires au problème initial,
- **Étape 2 — Régner** : régner sur les sous-problèmes en les résolvant de façon récursive,
- **Étape 3 — Combiner** : combiner les solutions des sous-problèmes en une solution générale du problème initial.

Elle permet d'obtenir des algorithmes de meilleure complexité.

### Analyse des algorithmes DpR

Un algo récursif : la complexité en temps est décrite par une équation de récurrence.

$T(n)$ : complexité du problème initial, temps d'exécution du problème de taille $n$.

La récurrence est fondée sur les 3 étapes diviser, régner et combiner :

1. Si la taille du problème est suffisamment réduite, $n \leq n_0$ pour une certaine constante $n_0$, la résolution est directe et consomme un temps constant $O(1)$.
2. Sinon, on divise le problème en $a$ sous-problèmes chacun de taille $1/c$ de la taille du problème initial. Le temps d'exécution total se décompose alors en trois parties :
   - $D(n)$ : le temps nécessaire à la division du problème en sous-problèmes,
   - $aT(n/c)$ : le temps de résolution des $a$ sous-problèmes,
   - $C(n)$ : le temps nécessaire pour construire la solution finale à partir des solutions aux sous-problèmes.

**Formule de récurrence** :

$$T(n) = \begin{cases} O(1) & \text{si } n \leq n_0 \\ aT(n/c) + D(n) + C(n) & \text{sinon} \end{cases}$$
(Diviser = $D(n)$, Régner = $aT(n/c)$, Combiner = $C(n)$)

### Théorème et forme générale

- **Diviser** : on découpe le problème en sous-problèmes de taille $n/c$, qui sont de même nature, avec $a \geq 1$ et $c > 1$.
- **Régner** : les sous-problèmes sont résolus récursivement.
- **Combiner** : on utilise les solutions aux sous-problèmes pour reconstruire la solution au problème initial en temps $D(n)$, avec $D \geq 0$.

On a : $T(1) = \Theta(1)$, $T(n) \cong aT(n/c) + D(n)$.

Soit $T(n)$ une fonction définie par l'équation de récurrence. La complexité en temps d'exécution d'un algorithme DpR sur une instance de taille $n$ peut s'écrire :

$$T(n) = aT(n/c) + f(n)$$

où $f(n)$ est le temps nécessaire pour Diviser et Combiner. Si on peut montrer que $f(n) \in O(n^k)$ pour un certain $k$, alors :

$$T(n) = aT(n/c) + \Theta(n^k)\ \forall\, n > n_0$$

où $n_0$ est une puissance de $c$. Alors :

- si $a > c^k$ alors $T(n) = \Theta(n^{\log_c a})$
- si $a = c^k$ alors $T(n) = \Theta(n^k \log(n))$
- si $a < c^k$ alors $T(n) = \Theta(n^k)$

### Exemple : tri par fusion

- **Diviser** : la séquence de $n$ éléments à trier en deux sous-séquences de $n/2$ éléments.
- **Régner** : en triant les 2 sous-séquences récursivement ; la récursivité prend fin quand la séquence triée a une longueur 1.
- **Combiner** : en fusionnant les 2 sous-séquences triées pour produire le résultat final.

```
Tri-fusion(T, p, q)
si p < q alors
    r ← (p+q) div 2
    Tri-fusion(T, p, r)
    Tri-fusion(T, r+1, q)
    fusionner(T, p, q, r)
fin si
```

**Algorithme Tri par fusion** :

```
Procédure TriFusion(Var T:Tab; deb, fin: entier)
si deb < fin alors
    milieu ← (deb+fin) div 2
    TriFusion(T, deb, milieu)              // Diviser → [0,...,milieu]
    TriFusion(T, milieu+1, fin)            // Régner → [milieu+1,...,fin-1]
    Fusion(T, deb, milieu+1, fin)          // Combiner
FinSi
Fin TriFusion
```

**Algorithme Fusionner** :

```
Procédure Fusionner(Var T:Tab; deb_gauche, deb_droit, fin: entier)
i ← deb_droit
Tantque (T[i] < T[i-1]) et (i <= fin) Faire
    j ← i
    aux ← T[j]
    Tantque (aux < T[j-1]) et (j > deb_gauche) Faire
        T[j] ← T[j-1]
        j ← j-1
    Fin Tantque
    T[j] ← aux
    i ← i+1
Fin Tantque
Fin Fusionner
```

**Complexité** : pour trier un tableau de taille $n$, on le découpe en deux tableaux de taille $n/2$, et l'étape de fusion permet de recombiner les deux solutions en $n-1$ opérations.

Soit $H(n)$ le nombre de comparaisons effectuées par l'algorithme :

$$H(0) = 0,\quad H(1) = 0,\quad H(n) \cong 2H(n/2) + (n-1)$$

**Analyse tri par fusion** : $n_0=1$, $a=c=2$, $D(n)=O(1)$, $C(n)=O(n)$

$$T(n) = \begin{cases} O(1) & \text{si } n = 1 \\ 2T(n/2) + O(n) & \text{sinon} \end{cases} \implies T(n) = O(n\log_2 n)$$

### Exercice 1 : matrice carrée

Soient $A$ et $B$ deux matrices carrées ($n \times n$).

1. Écrire un algorithme qui calcule $C = A \times B$.
2. Calculer sa complexité : en nombre d'additions + nombre de multiplications.

### Exercice 2 : recherche

Soit un tableau $T$ d'entiers, et on veut chercher un élément $x$ dans $T$.

1. Recherche séquentielle : écrire l'algorithme et déterminer sa complexité.
2. Recherche dichotomique : écrire l'algorithme et déterminer sa complexité, sachant que $T$ est trié.

### Exercice : exponentiation rapide

L'exponentiation rapide peut être utilisée pour des « multiplications » plus compliquées, comme la multiplication de matrices. Le principe de l'algorithme récursif est le suivant, pour le calcul de $x^n$ :

$$x^0 = 1,\quad \text{si } n \text{ pair alors } x^n = (x^{n/2})^2,\quad \text{sinon } x^n = x \times (x^{(n-1)/2})^2$$

Calculer la complexité de l'algorithme récursif de l'exponentiation rapide.

### Exercice 3 : algorithme de tri rapide (QuickSort)

**Principe** : choisir un élément du tableau $T$ comme pivot, puis mettre les éléments plus grands que ce pivot à sa droite et les autres éléments à sa gauche. Par appels récursifs, on ordonne les éléments de chaque côté du pivot.

- Deux pointeurs : $k$ initialisé à 1, $l$ initialisé à taille(L).
- Bouger $k$ vers la droite jusqu'à un élément > pivot.
- Bouger $l$ vers la gauche jusqu'à un élément ≤ pivot.
- Échanger $L[k]$ et $L[l]$ et répéter tant que $k < l$.
- Échanger pivot et $L[l]$.

**Étapes de l'algorithme** :

1. **Diviser** : si la séquence $S$ a plus d'un élément, sélectionner un élément $x$ de $S$ comme pivot. Retirer tous les éléments de $S$ et les diviser en 3 séquences :
   - $L$, contient les éléments de $S$ plus petits que $x$,
   - $E$, contient les éléments de $S$ égaux à $x$,
   - $G$, contient les éléments de $S$ plus grands que $x$.
2. **Régner** : trier récursivement $L$ et $G$.
3. **Combiner** : afin de remettre les éléments de $S$ en ordre : insérer les éléments de $L$, suivis de ceux de $E$, et enfin de ceux de $G$.

**Analyse du temps d'exécution** — un arbre QuickSort $T$ : $S_i(n)$ indique la somme des tailles d'entrée des nœuds à la profondeur $i$ dans $T$.

- $S_0(n)=n$ car la racine de $T$ est associée à l'ensemble des entrées tout entier.
- $S_1(n)=n-1$ car le pivot n'est pas propagé.
- $S_2(n)=n-3$ ou $n-2$ (si l'un des nœuds a une taille d'entrée nulle).

**Meilleur des cas** — QuickSort se comporte de façon optimale si la séquence $S$ est divisée en sous-séquences $L$ et $G$ de tailles égales :

$$S_0(n) = n,\quad S_1(n) = n-1,\quad S_2(n) = n-1+2 = n-3,\quad S_3(n) = n-1+2+2^2 = n-7,\quad \ldots$$
$$S_i(n) = n - (1+2+2^2+\cdots+2^i-1) = n - 2^i + 1,\quad \ldots$$

$T$ a une hauteur $O(\log n)$. Complexité temporelle dans le meilleur des cas : $O(n\log n)$.

**QuickSort aléatoire** — la sélection d'un élément de la séquence au hasard comme pivot. Le temps d'exécution attendu d'un tel tri sur une séquence de taille $n$ est $O(n\log n)$. Le temps de parcours d'un arbre QuickSort est $O(n)$. La hauteur escomptée d'un arbre QuickSort est $O(\log n)$.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/complexite-ch3-1-diviser-pour-regner.pdf" />

</TabItem>
</Tabs>
