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

_Conception et analyse d'algorithmes_

Un problème paraît parfois trop grand pour être résolu d'un seul bloc. L'idée
de Diviser pour Régner est de le **diviser**, de **résoudre** récursivement les
sous-problèmes obtenus, puis de **combiner** leurs solutions. Ce chapitre
montre comment cette stratégie conduit à une récurrence et comment l'utiliser
sur des exemples de tri.

:::info Vous allez apprendre

- le principe du paradigme Diviser pour Régner (DpR) et ses trois étapes ;
- comment poser une équation de récurrence pour un algorithme DpR ;
- comment lire le résultat de récurrence donné dans le support ;
- les applications au tri par fusion, à QuickSort et à l'exponentiation rapide.
  :::

## Paradigmes algorithmiques

:::info Définition

- **Diviser pour Régner** : divise un problème en sous-problèmes indépendants
  qui ne se chevauchent pas, résout chacun d'eux, puis combine leurs solutions
  pour former une solution au problème initial.
- **Algorithme glouton** : construit une solution de manière incrémentale en
  optimisant localement un critère.
- **Branch & Bound** : séparation et évaluation.
- **Programmation dynamique** : divise un problème en sous-problèmes non
  indépendants qui se chevauchent, et conserve des solutions de sous-problèmes
  de plus en plus grands.
  :::

Nous étudions ici le premier paradigme. La différence importante avec la
programmation dynamique est l'indépendance des sous-problèmes : une même
solution intermédiaire n'a pas à être réutilisée par plusieurs branches.

## Stratégie Diviser pour Régner

Diviser pour Régner (_Divide-and-Conquer_) est une méthode de conception
d'algorithmes utilisée, entre autres, pour la recherche dichotomique, le tri,
le produit de polynômes, la transformation de Fourier rapide,
l'exponentiation rapide et la multiplication de matrices.

:::info Définition

L'approche sépare un problème en plusieurs sous-problèmes similaires au
problème initial, les résout récursivement, puis combine les sous-solutions
pour construire la solution initiale. Elle comporte trois étapes :

1. **Diviser** : décomposer le problème en sous-problèmes similaires.
2. **Régner** : résoudre les sous-problèmes de façon récursive.
3. **Combiner** : réunir leurs solutions en une solution générale.
   :::

Cette description donne la méthode. Pour comparer les algorithmes qui
l'emploient, il faut ensuite compter le travail effectué à chaque appel
récursif.

## Poser la récurrence

Soit $T(n)$ le temps d'exécution d'un algorithme DpR sur une instance de taille
$n$. Lorsque l'instance est suffisamment petite, $n \leq n_0$, la résolution
est directe et coûte $O(1)$. Sinon, le problème est partagé en $a$
sous-problèmes de taille $n/c$, avec $a \geq 1$ et $c > 1$ :

$$
T(n) =
\begin{cases}
O(1) & \text{si } n \leq n_0, \\
aT(n/c) + D(n) + C(n) & \text{sinon.}
\end{cases}
$$

Ici, $D(n)$ mesure la division, $aT(n/c)$ la résolution récursive des
$a$ sous-problèmes et $C(n)$ leur combinaison. En regroupant la division et
la combinaison, on obtient :

$$T(n) = aT(n/c) + f(n),$$

où $f(n) = D(n) + C(n)$. La forme de $f(n)$ détermine donc le résultat de
l'analyse.

## Théorème : forme particulière des récurrences DpR

:::note Théorème

Le support donne le résultat suivant pour la forme particulière, avec
$a \geq 1$, $c > 1$, $k \geq 0$, $b$ constante et $n_0$ une puissance de
$c$ :

$$
T(n) = aT(n/c) + b n^k \qquad \text{pour tout } n > n_0.
$$

Alors :

- si $a > c^k$, $T(n) = \Theta(n^{\log_c a})$ ;
- si $a = c^k$, $T(n) = \Theta(n^k \log(n))$ ;
- si $a < c^k$, $T(n) = \Theta(n^k)$.
  :::

:::warning Attention

Savoir seulement que $f(n) \in O(n^k)$ donne une borne supérieure sur le
coût de division et de combinaison. Cela ne permet pas, à lui seul, de
remplacer $f(n)$ par $\Theta(n^k)$ ni par $b n^k$. Les trois conclusions
ci-dessus s'appliquent à la forme particulière explicitement écrite dans le
support ; une autre récurrence demande une justification adaptée.
:::

Le tri par fusion fournit maintenant une instance concrète : le travail de
combinaison est linéaire, tandis que les deux appels récursifs travaillent sur
des moitiés du tableau.

## Exemple : tri par fusion

Pour une séquence de $n$ éléments :

- **Diviser** : former deux sous-séquences de $n/2$ éléments ;
- **Régner** : trier récursivement ces deux sous-séquences, jusqu'aux
  séquences de longueur $1$ ;
- **Combiner** : fusionner les deux sous-séquences triées.

```text title="Tri-fusion"
Tri-fusion(T, p, q)
si p < q alors
    r ← (p+q) div 2
    Tri-fusion(T, p, r)
    Tri-fusion(T, r+1, q)
    Fusionner(T, p, r+1, q)
fin si
```

<details>
<summary>Pseudocode complet</summary>

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

```text title="Fusionner - version pédagogique corrigée"
Procédure Fusionner(T, deb_gauche, deb_droit, fin)
gauche ← copie de T[deb_gauche .. deb_droit-1]
droite ← copie de T[deb_droit .. fin]
i ← 0 ; j ← 0 ; k ← deb_gauche

Tant que i < taille(gauche) et j < taille(droite) faire
    si gauche[i] ≤ droite[j] alors
        T[k] ← gauche[i] ; i ← i + 1
    sinon
        T[k] ← droite[j] ; j ← j + 1
    fin si
    k ← k + 1
fin tant que

Tant que i < taille(gauche) faire
    T[k] ← gauche[i] ; i ← i + 1 ; k ← k + 1
fin tant que

Tant que j < taille(droite) faire
    T[k] ← droite[j] ; j ← j + 1 ; k ← k + 1
fin tant que
Fin Fusionner
```

</details>

:::note Précision sur le support

Le pseudocode de fusion du support ressemble à une insertion locale : ses
décalages successifs ne suffisent pas à établir un coût linéaire. La version
ci-dessus est une version pédagogique corrigée, et non une transcription
littérale du support.

:::

:::tip Exemple

La fusion de deux tableaux triés de taille $n/2$ demande $n-1$ comparaisons
au plus. Le déroulé visuel des découpes et des fusions est disponible dans
l'onglet PDF.
:::

Soit $H(n)$ le nombre de comparaisons effectuées par l'algorithme :

$$H(0) = 0,\quad H(1) = 0,\quad H(n) \cong 2H(n/2) + (n-1).$$

Pendant la fusion, les indices $i$ et $j$ ne reculent jamais. À chaque
itération, un élément est copié dans le résultat et l'un des deux indices
avance ; lorsque l'un des sous-tableaux est épuisé, les éléments restants de
l'autre sont copiés une fois. La fusion de $n$ éléments coûte donc
$\Theta(n)$.

Pour le temps d'exécution, $n_0 = 1$, $a = c = 2$, $D(n) = \Theta(1)$ et
$C(n) = \Theta(n)$ :

$$
T(n) =
\begin{cases}
\Theta(1) & \text{si } n = 1, \\
2T(n/2) + \Theta(n) & \text{sinon,}
\end{cases}
\qquad \text{donc} \qquad T(n) = \Theta(n\log_2 n).
$$

Le terme de combinaison est ici linéaire. C'est ce qui place le tri par
fusion dans le cas $a = c^k$, avec $a = 2$, $c = 2$ et $k = 1$.

## Exemple : tri rapide (QuickSort)

QuickSort choisit un élément comme pivot, partitionne le segment complet
$T[g..d]$ autour de lui, puis trie récursivement les deux segments produits.
Le PDF présente aussi cette idée sous forme de trois séquences : éléments plus
petits, égaux et plus grands que le pivot.

1. **Diviser** : choisir le pivot et partitionner $T[g..d]$ en place.
2. **Régner** : trier récursivement les segments situés de part et d'autre du
   pivot.
3. **Combiner** : aucun traitement supplémentaire n'est nécessaire : le pivot
   est déjà entre les deux segments.

<details>
<summary>Partitionnement en place</summary>

```text title="QuickSort - formulation pédagogique clarifiée"
Procédure QuickSort(T, g, d)
si g < d alors
    p ← Partitionner(T, g, d)
    QuickSort(T, g, p-1)
    QuickSort(T, p+1, d)
fin si

Fonction Partitionner(T, g, d)
pivot ← T[g]
gauche ← g+1
droite ← d

Tant que vrai faire
    Tant que gauche ≤ d et T[gauche] ≤ pivot faire
        gauche ← gauche+1
    fin tant que
    Tant que droite ≥ g+1 et T[droite] > pivot faire
        droite ← droite-1
    fin tant que
    si gauche > droite alors
        sortir
    fin si
    échanger T[gauche] et T[droite]
    gauche ← gauche+1
    droite ← droite-1
fin tant que

échanger T[g] et T[droite]
retourner droite
```

</details>

:::note Précision sur le support

Le support utilise $L$ à la fois pour une séquence déjà partitionnée et pour
le tableau parcouru par les pointeurs. La formulation ci-dessus clarifie les
noms : $T[g..d]$ est le segment complet, et `gauche` et `droite` délimitent
ses régions pendant le partitionnement ; elle n'est pas une transcription
littérale du PDF.

:::

Avant chaque échange, les éléments de $T[g+1..gauche-1]$ sont inférieurs ou
égaux au pivot, ceux de $T[droite+1..d]$ lui sont strictement supérieurs, et
la région entre les deux indices reste à examiner. Les tests de bornes
précèdent chaque accès à $T$. À l'arrêt, après l'échange final, le pivot est en
position $p=\text{droite}$ ; les appels récursifs portent donc sur
$T[g..p-1]$ et $T[p+1..d]$, deux segments strictement plus petits.

L'analyse du support mesure, à chaque profondeur $i$ de l'arbre QuickSort,
$S_i(n)$, la somme des tailles d'entrée des nœuds. Ainsi,
$S_0(n) = n$ car la racine reçoit toute l'entrée, et $S_1(n) = n - 1$ car le
pivot n'est pas propagé.

Dans le meilleur des cas, le pivot partage toujours la séquence en deux
sous-séquences de tailles égales :

$$
\begin{aligned}
S_0(n) &= n, \\
S_1(n) &= n - 1, \\
S_2(n) &= n - 1 + 2 = n - 3, \\
S_3(n) &= n - 1 + 2 + 2^2 = n - 7, \\
S_i(n) &= n - (1 + 2 + 2^2 + \cdots + 2^i - 1) = n - 2^i + 1.
\end{aligned}
$$

L'arbre a alors une hauteur $O(\log n)$, d'où une complexité temporelle de
$O(n \log n)$ dans le meilleur des cas. Le PDF ne développe pas le pire cas
ni une borne de cas moyen pour une règle de pivot déterministe ; ils ne sont
donc pas déduits ici.

:::tip Exemple

Dans la version aléatoire de QuickSort, le pivot est choisi au hasard. Le
support indique un temps d'exécution **attendu** de $O(n \log n)$, un temps de
parcours de l'arbre de $O(n)$ et une hauteur attendue de $O(\log n)$. Une
valeur attendue ne garantit pas ce temps pour chaque exécution.
:::

Les exercices suivants te donnent l'occasion de reconnaître cette même idée
de réduction de taille sur des problèmes différents.

## Exercice guidé : exponentiation rapide

L'exponentiation rapide s'applique aussi à des « multiplications » plus
générales, comme la multiplication de matrices. Pour calculer $x^n$ :

$$
x^0 = 1,\qquad
\text{si } n \text{ est pair, } x^n = (x^{n/2})^2,\qquad
\text{sinon, } x^n = x \times (x^{(n-1)/2})^2.
$$

**À faire :** calculer la complexité de l'algorithme récursif d'exponentiation
rapide en posant sa récurrence.

## Exercices

1. **Matrice carrée.** Soient $A$ et $B$ deux matrices carrées
   ($n \times n$). Écrire un algorithme qui calcule $C = A \times B$, puis
   calculer sa complexité en nombre d'additions et de multiplications.
2. **Recherche.** Soit un tableau $T$ d'entiers. Écrire et calculer la
   complexité d'une recherche séquentielle, puis d'une recherche dichotomique
   en supposant $T$ trié.

## Étapes suivantes

- [Chapitre 3.2 — Algorithme de Glouton](./complexite-ch3-2-glouton)
- [Chapitre 4 — Arbres équilibrés](./complexite-ch4-arbres-equilibres)

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/complexite-ch3-1-diviser-pour-regner.pdf" />

</TabItem>
</Tabs>
