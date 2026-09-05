---
sidebar_position: 1
title: "Chapitre 1 : Complexité des algorithmes"
sidebar_label: Ch1 - Complexité des algorithmes
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 1 : Complexité des algorithmes

*Conception et analyse d'algorithmes — Nour Houda Dougui, École Nationale des Sciences de l'Informatique (2013-2014)*

<!-- TODO: unclear in source, verify against original PDF — this is a Beamer slide deck; incremental \pause reveals meant each slide's content is repeated multiple times in the extracted text. De-duplicated here to the final (most complete) build of each slide. A few slides ("Exemple 1", "Exemple 2", "Exemple 3") appear to contain only diagrams/graphs with no extractable text and are omitted. The final exercise (Tours de Hanoï) is cut off mid-statement in the source extraction. -->

## Plan

1. Complexité des algorithmes
2. Complexité des problèmes
3. Paradigmes de programmation
4. Les arbres équilibrés

## Introduction

Un algorithme est un ensemble d'actions visant un objectif : résoudre un problème donné. Il :

- agit sur des données initiales (entrées),
- produit des résultats (sorties) ou des effets,
- doit se terminer sur toutes les données possibles du problème,
- et doit fournir une solution correcte dans chaque cas.

Programmation d'un algorithme :

- expression dans un langage de programmation,
- utilisation d'une machine donnée (processeur, mémoire),
- un seul algorithme, plusieurs programmes (variantes),
- styles de programmation (itérative, récursive...).

### Motivation du calcul de complexité

Pour un problème donné, il existe souvent plusieurs algorithmes. Y a-t-il un intérêt à choisir ? Et si oui, comment choisir ?

Le nombre d'ordres possibles d'une liste de $n$ éléments est $n!$. Si on applique une opération simple à toutes les listes ordonnées possibles à $n$ éléments, avec le meilleur calculateur existant, au cours d'une seconde, on est limité aux listes de 17 éléments ($17! = 3{,}55 \times 10^{14}$).

## Définition de la complexité algorithmique

C'est l'étude de l'efficacité comparée des algorithmes. On mesure :

- la taille approximative des données en mémoire, appelée **complexité spatiale**,
- le temps que prendra l'exécution de l'algorithme (**complexité temporelle**).

Exemple : représentation d'une matrice creuse — représentation par un tableau à deux dimensions, ou liste chaînée contenant les éléments non nuls de la matrice + l'information sur le numéro de ligne et le numéro de colonne ?

Une bonne maîtrise de la complexité $\leftrightarrow$ des applications qui tournent en un temps prévisible et sur un espace mémoire contrôlé.

## Calcul de la complexité

### Taille des données

La complexité d'un algorithme dépend de plusieurs facteurs :

- **La taille des données à traiter** : un algorithme opérant sur une dizaine d'éléments ne prend pas autant de temps que le même opérant sur un millier de données — il faut évaluer la taille des données nécessaire à l'algorithme.

En pratique, on choisit comme taille la ou les dimensions les plus significatives, par exemple selon que le problème est modélisé par :

- des nombres : ces nombres,
- des mots : leur longueur,
- des listes, tableaux : nombre de cases, d'éléments,
- des matrices $m \times n$ : $\max(m,n), m \cdot n, m + n$.

Le choix de telle ou telle structure de données n'est pas anodin quant à l'efficacité d'un algorithme.

### Type des opérations

Toutes les opérations effectuées par un algorithme ne nécessitent pas la même durée :

- une addition est plus rapide qu'une élévation à la puissance,
- une comparaison entre deux valeurs est plus rapide qu'un accès à une donnée dans un fichier...

Pour simplifier, on peut faire l'hypothèse que toutes les opérations ont un coût uniforme (même si cela manque souvent de réalisme). Ce coût est alors constant car il ne dépend plus de rien.

### Complexité au pire, au mieux et en moyenne

Soit $A$ un algorithme appliqué sur des données $d \in D$ et soit $T(A,d)$ le temps d'exécution de $A$ en fonction de la donnée $d$. Il existe trois types de mesure de complexité pour un algorithme :

- la mesure du pire des cas : $T_{Max}(A,D) = \max\{T(A,d), d \in D\}$
- la mesure du meilleur des cas : $T_{Min}(A,D) = \min\{T(A,d), d \in D\}$
- la mesure de la moyenne : $T_{Moy}(A,D) = \sum p(d) \cdot T(A,d)$ avec $p(d)$ la probabilité d'avoir la donnée $d$

Exemple : recherche d'un élément dans un tableau.

On a la propriété suivante entre ces mesures de complexité :

$$T_{Min}(A,D) \leq T_{Moy}(A,D) \leq T_{Max}(A,D)$$

On s'intéresse à la complexité d'un algorithme dans le pire cas.

### Calcul de complexité des algorithmes itératifs

Dans un programme strictement itératif, les boucles sont disjointes ou emboîtées : il n'y a pas de récursivité. Notation : $T(n)$ le nombre d'opérations élémentaires.

- **Séquence** (Traitement1 ; Traitement2) : $T(n) = T_1(n) + T_2(n)$ (somme des coûts)
- **Embranchement** (si condition alors Traitement1 sinon Traitement2) : $T(n) = T_c(n) + \max(T_1(n), T_2(n))$ (max des coûts)
- **Boucle** (tant que condition faire Traitement) : $T(n) = (k+1) \times T_c(n) + \sum_{i=1}^{k} T_i(n)$ (somme des coûts des passages)

### Calcul de complexité des algorithmes récursifs

Pour une fonction récursive :

```
fonction FunctionRecursive(n)
(1) si (n > 1) alors
(2)     Traitement(n)                       coût C(n)
(3)     FunctionRecursive(n/2)               coût T(n/2)
(4)     FunctionRecursive(n/2)               coût T(n/2)
```

Équation récursive : $T(n) = 2 \times T(n/2) + C(n)$

### Exemple (extrait du tri par sélection)

```
min ← i                                      // 1 affectation
pour j de i+1 à n faire                      // 1 aff. + 1 comp. + (1 aff. + 1 comp.) par passage
    si A[j] < A[min] alors                   // (1 comparaison) par passage
        min ← j                              // (si test vrai : 1 affectation) par passage
```

- Dans le pire cas, quand la table est triée par ordre inverse : $4 \times (n-i) + 3$
- Dans le meilleur cas, quand le tableau est trié, on n'exécute jamais l'instruction `min ← j` : $3 \times (n-i+1)$
- Supposons que, sur les $(n-i)$ tests, la moitié est évaluée à vrai. En moyenne : $\dfrac{4(n-i)}{2} + \dfrac{3(n-i)}{2} + 3$

## Estimation asymptotique

En complexité, on ne veut pas évaluer précisément les temps d'exécution (d'autant que ça dépend de la machine). On se contente de trouver des approximations.

On dit que $T$ est asymptotiquement majorée (quand $n \to \infty$) par $f$, et on utilise la notation de Landau $O(f(n))$ :

$$T(n) = O(f(n)) \text{ si } \exists\, c\, \exists\, n_0 \text{ tels que } \forall n > n_0,\ T(n) \leq c \times f(n)$$

On dit que $T$ est du même ordre de grandeur que $f$, et on note $\Theta(f(n))$, quand $T(n) = O(f(n))$ et $f(n) = O(T(n))$ :

$$T(n) = \Theta(f(n)) \text{ si } \exists\, c_1, c_2, n_0 \text{ tels que } \forall n > n_0,\ c_1 \times f(n) \leq T(n) \leq c_2 \times f(n)$$

### Exemples

- $f(n) = n^3 + 2n^2 + 4n + 2 = O(n^3)$ (si $n \geq 1$ alors $f(n) \leq 8 \times n^3$)
- $f(n) = n\log(n) + 12n + 888 = O(n\log(n))$
- $f(n) = 1000n^{10} - n^7 + \dfrac{2^n}{1000} = O(2^n)$

## Les principales classes de complexité

- **$O(1)$** temps constant : temps d'exécution indépendant de la taille des données à traiter.
- **$O(\log n)$** temps logarithmique : on rencontre une telle complexité lorsque l'algorithme casse un gros problème en plusieurs petits, de sorte que la résolution d'un seul de ces problèmes conduit à la solution du problème initial. Exemple : recherche dichotomique dans une liste triée.
- **$O(n)$** temps linéaire : cette complexité est généralement obtenue lorsqu'un traitement en temps constant est effectué sur chaque donnée en entrée. Exemple : recherche d'un élément dans une liste.
- **$O(n\log n)$** : l'algorithme scinde le problème en plusieurs sous-problèmes plus petits qui sont résolus de manière indépendante. La résolution de l'ensemble de ces problèmes plus petits apporte la solution du problème initial. Exemple : tri fusion.
- **$O(n^2)$** temps quadratique ou polynomial : apparaît notamment lorsque l'algorithme envisage toutes les paires de données parmi les $n$ entrées. Exemple : deux boucles imbriquées. Remarque : $O(n^3)$ temps cubique.
- **$O(2^n)$** temps exponentiel : souvent le résultat de recherche brutale d'une solution.

**À retenir** — en pratique : un algorithme à complexité exponentielle est inutilisable ; pour $n$ pas trop grand, les algorithmes polynomiaux sont encore efficaces.

### Exemple 4 : Tri par dénombrement [Seward 1954]

Si on sait que les valeurs sont comprises entre 0 et max (avec max pas trop grand), on peut trier les valeurs en comptant tout d'abord le nombre de 0, le nombre de 1, le nombre de 2 ... le nombre de max en entrée. Ensuite, il suffit de parcourir le tableau à nouveau en indiquant la bonne quantité de chaque valeur.

1. Écrire cet algorithme. On utilisera un tableau annexe `count` où `count[i]` indique le nombre de `i` dans le tableau initial.
2. Calculer la complexité de cet algorithme.
3. Discuter cette complexité par rapport à la borne théorique inférieure.

## Fonctions récursives : paradigme Diviser pour Régner

La stratégie Diviser pour Régner consiste à scinder un problème en sous-problèmes de même nature sur des instances plus petites, à résoudre ces sous-problèmes, puis à combiner les résultats obtenus pour apporter une solution au problème posé. Il s'agit donc d'une démarche essentiellement récursive qui donne lieu à trois étapes à chaque niveau de récursivité :

- **Diviser** : le problème est scindé en un certain nombre de sous-problèmes ;
- **Régner** : résoudre les sous-problèmes récursivement ou, si la taille d'un sous-problème est assez réduite, le résoudre directement ;
- **Combiner** : réorganiser les solutions des sous-problèmes en une solution complète du problème initial.

### Exemple : l'algorithme tri-fusion

L'algorithme de tri-fusion repose sur la décomposition suivante :

- **Diviser** : on scinde la séquence de longueur $l$ en 2 séquences de taille $l/2$ ;
- **Régner** : on résout chacune des deux sous-séquences en utilisant récursivement le tri-fusion si elle n'est pas réduite à un élément, et en ne faisant rien sinon ;
- **Combiner** : fusionner les deux sous-séquences triées en une séquence triée.

Équation récursive : $T(n) = 2 \times T(n/2) + n$ et $T(1) = 0$

## Équations récursives (approche diviser pour régner)

Cas général :

$$T(n) = a \times T(n/b) + f(n) \text{ et } T(1) = c$$

Trois méthodes de résolution : par substitution, par développement itératif, méthode générale.

### Méthode par substitution

Principe : on vérifie une intuition.

- Hypothèse : $T(n) = g(n)$ (intuition)
- Conclusion : $g(n) = a \times g(n/b) + f(n)$ et $g(1) = c$, à démontrer en fixant les constantes.

**Exemple** : $T(n) = 1 + T(n/2)$ et $T(1) = 1$

Intuition : $T(n) = O(\log_2 n)$.

Hypothèse : $T(n) = a \times \log_2(n) + c$, donc $T(n/2) = a \times \log_2(n) - a + c$.

En substituant : $T(n) = 1 + T(n/2) = 1 + a \times \log_2(n) - a + c$, donc $1 - a + c = c$ et $a = 1$, et puisque $T(1) = 1$ donc $c = 1$.

Conclusion : $T(n) = \log_2(n) + 1$.

### Méthode par développement itératif

**Exemple : tri-fusion** — $T(n) = 2 \times T(n/2) + n$ et $T(1) = 0$

$$T(n) = 2 \times T(n/2) + n = 4 \times T(n/4) + 2n = 8 \times T(n/8) + 3n = \cdots = n \times T(1) + n\log(n) = n\log(n)$$

### Exercice : MaxMin

Écrire un algorithme pour le calcul du Max et du Min d'un ensemble $E$.

- 1ère idée : 2 itérations indépendantes : combien de comparaisons ? $2n$ comparaisons.
- 2ème idée : partage de l'ensemble en 2 sous-ensembles $E_1$ et $E_2$, recherche récursive sur chaque sous-ensemble et fusion des résultats : combien de comparaisons ?

```
fonction MaxMin(Ensemble E)
(1)  si |E| = 1 alors
(2)      max ← a               (E = {a})
(3)      min ← a
(4)  sinon si |E| = 2 alors
(5)      max ← max(a,b)        (E = {a,b})
(6)      min ← min(a,b)
(7)  sinon
(8)      (E1,E2) tq E = E1 ∪ E2 et E1 ∩ E2 = ∅
(9)      (max1,min1) ← MaxMin(E1)
(10)     (max2,min2) ← MaxMin(E2)
(11)     max ← max(max1,max2)
(12)     min ← min(min1,min2)
(13) retourner (max,min)
```

Si on partage $E$ en 2 parties égales, $T(n)$ = nombre de comparaisons pour $|E| = n$ :

$$T(1) = 0, \quad T(2) = 1 \text{ (une comparaison suffit)}, \quad T(n) = 2T(n/2) + 2$$

Montrez par récurrence que pour $n = 2^p$ ($p \geq 1$), $T(n) = \dfrac{3n}{2} - 2$.

### Méthode générale

**Théorème** : soit $T(n)$ une fonction définie par l'équation de récurrence suivante, où $b \geq 2$, $k \geq 0$, $a > 0$ et $c > 0$ :

$$T(n) = a \times T(n/b) + c \times n^k$$

La relation entre $a$, $b$ et $k$ détermine la fonction $T(n)$ comme suit :

- si $a > b^k$, alors $T(n) = \Theta(n^{\log_b a})$
- si $a = b^k$, alors $T(n) = \Theta(n^k \times \log n)$
- si $a < b^k$, alors $T(n) = \Theta(n^k)$

**Exemples** : $T(n) = 2T(n/2) + O(n^\alpha)$.

- Si $\alpha = 1/2$, on est dans le cas 1, donc $T(n) = \Theta(n)$,
- Si $\alpha = 1$, on est dans le cas 2, donc $T(n) = \Theta(n\log n)$,
- Si $\alpha = 2$, on est dans le cas 3, donc $T(n) = \Theta(n^2)$.

### Exercice 1 : suite de Fibonacci

Équation récursive : $T(n) = T(n-1) + T(n-2) + \alpha$

$$T(n) \leq 2 \times T(n-1) + \alpha \text{ car } T \text{ est croissante}$$
$$T(n) \leq 2 \times (2 \times T(n-2) + \alpha) + \alpha \leq 4 \times (2 \times T(n-3) + \alpha) + 2\alpha + \alpha \leq \cdots$$
$$T(n) \leq 2^n \times \alpha + \cdots + 4\alpha + 2\alpha + \alpha = \alpha \times \sum_{i=0}^{n} 2^i = \alpha \times (2^{n+1} - 1)$$
$$T(n) = O(2^n)$$

Proposez un algorithme de complexité linéaire au calcul du terme de rang $n$ de la suite de Fibonacci.

```
fonction Fibo-Simple(Entier n)
(1) Entier tab[n], i
(2) Début
(3)     tab[0] = 1                              // 1
(4)     tab[1] = 1                               // 1
(5)     pour i = 2 à n                           // n-1
(6)         tab[i] = tab[i-1] + tab[i-2]         // n-1
(7)     Renvoyer tab[n]                          // 1
(8) Fin
```

### Exercice 2 : Tours de Hanoï

Le problème des tours de Hanoï consiste à déplacer des disques de diamètres différents d'une tour de « départ » à une tour d'« arrivée » en passant par une tour « intermédiaire », et ceci en un minimum de coups, tout en respectant les règles suivantes :

- on ne peut déplacer plus d'un disque à la fois,
- on ne peut placer un disque que sur un autre disque plus grand que lui ou sur un emplacement vide.

<!-- TODO: unclear in source, verify against original PDF page 42+ — the extraction cuts off here; the exercise question itself (write the recursive algorithm, derive T(n)) is not present in the extracted text. -->

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/complexite-ch1-complexite-algorithmes.pdf" />

</TabItem>
</Tabs>
