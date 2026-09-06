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

:::info You will learn

- Le principe du paradigme Diviser pour Régner (DpR) et ses trois étapes
- Comment poser et résoudre l'équation de récurrence d'un algorithme DpR
- Deux algorithmes DpR complets : tri par fusion et tri rapide (QuickSort)
- Un exercice guidé sur l'exponentiation rapide
:::

## Paradigmes algorithmiques

:::info Definition

- **Diviser pour Régner** : divise un problème en sous-problèmes indépendants (qui ne se chevauchent pas), résout chaque sous-problème, et combine les solutions des sous-problèmes pour former une solution du problème initial.
- **Algorithme Glouton** : construit une solution de manière incrémentale, en optimisant un critère de manière locale.
- **Branch & Bound** : séparation et évaluation.
- **Programmation Dynamique** : divise un problème en sous-problèmes qui sont non indépendants (qui se chevauchent), et cherche (et sauvegarde) des solutions de sous-problèmes de plus en plus grands.
:::

Ce chapitre couvre le premier de ces quatre paradigmes ; les trois autres suivent dans les chapitres 3.2 à 3.4.

## Approche Diviser pour Régner

Diviser pour régner (Divide-and-Conquer) est une méthode de conception d'algorithmes qui a mené à la création d'algorithmes efficaces pour de nombreux problèmes : la recherche dichotomique, le tri (fusion, rapide), le produit de polynômes (Karatsuba), la transformation de Fourier rapide, l'exponentiation rapide, ou encore la multiplication de matrices.

:::info Definition
L'approche diviser pour régner sépare un problème en plusieurs sous-problèmes similaires au problème initial, résout les sous-problèmes de façon récursive, puis combine ces sous-solutions pour construire la solution du problème initial. Elle repose sur 3 étapes :

- **Étape 1 — Diviser** : diviser le problème en sous-problèmes similaires au problème initial,
- **Étape 2 — Régner** : régner sur les sous-problèmes en les résolvant de façon récursive,
- **Étape 3 — Combiner** : combiner les solutions des sous-problèmes en une solution générale du problème initial.
:::

### Poser la récurrence

Un algorithme DpR est récursif, donc sa complexité en temps se décrit par une équation de récurrence. Soit $T(n)$ le temps d'exécution sur une instance de taille $n$ :

$$T(n) = \begin{cases} O(1) & \text{si } n \leq n_0 \\ aT(n/c) + D(n) + C(n) & \text{sinon} \end{cases}$$

où $D(n)$ est le temps de division, $aT(n/c)$ le temps des $a$ sous-problèmes de taille $n/c$, et $C(n)$ le temps de combinaison ($a \geq 1$, $c > 1$).

En regroupant $D(n) + C(n)$ en une seule fonction $f(n)$ :

$$T(n) = aT(n/c) + f(n)$$

## Théorème (résolution de récurrences DpR)

:::note Théorème
Si $f(n) \in O(n^k)$ pour un certain $k$, alors pour tout $n > n_0$ (une puissance de $c$) :

$$T(n) = aT(n/c) + \Theta(n^k)$$

et :

- si $a > c^k$ alors $T(n) = \Theta(n^{\log_c a})$
- si $a = c^k$ alors $T(n) = \Theta(n^k \log n)$
- si $a < c^k$ alors $T(n) = \Theta(n^k)$
:::

:::warning
Ce théorème ne s'applique que si tu peux effectivement borner $f(n)$ par un $O(n^k)$ — s'il n'existe pas un tel $k$, ces trois cas ne couvrent pas la récurrence et il faut une autre méthode (arbre de récursion, substitution).
:::

## Exemple : tri par fusion

- **Diviser** : la séquence de $n$ éléments en deux sous-séquences de $n/2$ éléments.
- **Régner** : trier les 2 sous-séquences récursivement, jusqu'à une longueur 1.
- **Combiner** : fusionner les 2 sous-séquences triées.

```text title="Tri-fusion"
Tri-fusion(T, p, q)
si p < q alors
    r ← (p+q) div 2
    Tri-fusion(T, p, r)
    Tri-fusion(T, r+1, q)
    fusionner(T, p, q, r)
fin si
```

<details>
<summary>Détail des deux procédures (TriFusion, Fusionner)</summary>

```text title="TriFusion"
Procédure TriFusion(Var T:Tab; deb, fin: entier)
si deb < fin alors
    milieu ← (deb+fin) div 2
    TriFusion(T, deb, milieu)              // Diviser → [0,...,milieu]
    TriFusion(T, milieu+1, fin)            // Régner → [milieu+1,...,fin-1]
    Fusion(T, deb, milieu+1, fin)          // Combiner
FinSi
Fin TriFusion
```

```text title="Fusionner"
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

</details>

**Complexité** : soit $H(n)$ le nombre de comparaisons. La fusion recombine deux tableaux de taille $n/2$ en $n-1$ opérations, donc :

$$H(0) = 0,\quad H(1) = 0,\quad H(n) \cong 2H(n/2) + (n-1)$$

Ici $n_0=1$, $a=c=2$, $D(n)=O(1)$, $C(n)=O(n)$ :

$$T(n) = \begin{cases} O(1) & \text{si } n = 1 \\ 2T(n/2) + O(n) & \text{sinon} \end{cases} \implies T(n) = O(n\log_2 n)$$

Tu retrouves ici exactement le cas $a = c^k$ du théorème ci-dessus ($a=2$, $c=2$, $k=1$, donc $a=c^k$).

## Exemple : tri rapide (QuickSort)

**Principe** : choisir un élément du tableau $T$ comme pivot, mettre les éléments plus grands à sa droite et les autres à sa gauche, puis répéter récursivement de chaque côté.

1. **Diviser** : sélectionner un pivot $x$ dans $S$, puis répartir les autres éléments en trois séquences : $L$ (plus petits que $x$), $E$ (égaux à $x$), $G$ (plus grands que $x$).
2. **Régner** : trier récursivement $L$ et $G$.
3. **Combiner** : concaténer $L$, puis $E$, puis $G$.

<details>
<summary>Implémentation par pointeurs (pivot en place)</summary>

- Deux pointeurs : $k$ initialisé à 1, $l$ initialisé à taille($L$).
- Bouger $k$ vers la droite jusqu'à un élément > pivot.
- Bouger $l$ vers la gauche jusqu'à un élément ≤ pivot.
- Échanger $L[k]$ et $L[l]$ et répéter tant que $k < l$.
- Échanger pivot et $L[l]$.

</details>

**Analyse (meilleur des cas)** — soit $S_i(n)$ la somme des tailles d'entrée des nœuds à la profondeur $i$ de l'arbre QuickSort. Si le pivot divise systématiquement la séquence en deux moitiés égales :

$$S_0(n) = n,\quad S_1(n) = n-1,\quad S_i(n) = n - 2^i + 1,\ \ldots$$

L'arbre a une hauteur $O(\log n)$, d'où une complexité $O(n \log n)$ dans le meilleur des cas.

:::tip Example
Avec un pivot aléatoire (QuickSort aléatoire), le temps d'exécution **attendu** reste $O(n \log n)$ — la hauteur attendue de l'arbre reste $O(\log n)$ même sans garantie de pivot médian.
:::

## Exercice guidé : exponentiation rapide

L'exponentiation rapide s'applique aussi à des « multiplications » plus générales, comme la multiplication de matrices :

$$x^0 = 1,\quad \text{si } n \text{ pair alors } x^n = (x^{n/2})^2,\quad \text{sinon } x^n = x \times (x^{(n-1)/2})^2$$

**À faire** : calculer la complexité de cet algorithme récursif — tu devrais retrouver un cas de récurrence directement couvert par le théorème plus haut.

## Exercices

1. **Matrice carrée.** Soient $A$ et $B$ deux matrices carrées ($n \times n$). Écrire un algorithme qui calcule $C = A \times B$, puis calculer sa complexité (additions + multiplications).
2. **Recherche.** Soit un tableau $T$ d'entiers. Écrire et calculer la complexité d'une recherche séquentielle, puis d'une recherche dichotomique (en supposant $T$ trié).

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/complexite-ch3-1-diviser-pour-regner.pdf" />

</TabItem>
</Tabs>
