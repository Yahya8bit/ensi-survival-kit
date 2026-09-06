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

_Conception et analyse d'algorithmes — Nour Houda Dougui, École Nationale des Sciences de l'Informatique (2013-2014)_

Deux algorithmes qui donnent le même résultat ne demandent pas forcément les
mêmes ressources. Ce chapitre donne les outils pour comparer leur temps
d'exécution et leur mémoire, puis pour analyser les boucles et les appels
récursifs qui reviennent dans la suite du cours.

:::info Vous allez apprendre

- choisir une taille pertinente pour une instance et un modèle de coût ;
- distinguer meilleur cas, cas moyen et pire cas ;
- compter le coût de structures itératives et récursives ;
- lire les notations $O$ et $\Theta$ ainsi que les principales classes de complexité ;
- résoudre les récurrences issues de l'approche diviser pour régner.
:::

## Pourquoi mesurer la complexité ?

Un algorithme est un ensemble d'actions qui transforme des entrées en
résultats, termine sur toutes les données possibles du problème et fournit une
solution correcte. Lorsqu'il existe plusieurs algorithmes corrects, la
complexité aide à choisir celui dont le temps et l'espace restent maîtrisables
quand les données grandissent.

Le nombre d'ordres possibles d'une liste de $n$ éléments est $n!$. Même en
appliquant une opération simple à chaque ordre possible, le calcul est limité à
des listes de 17 éléments en une seconde avec le meilleur calculateur évoqué
dans le support : $17! = 3{,}55 \times 10^{14}$. La croissance de la taille de
l'entrée devient donc vite plus importante qu'une amélioration locale de la
machine.

:::info Définition
La **complexité algorithmique** étudie l'efficacité comparée des algorithmes.
Elle mesure notamment :

- la taille approximative occupée par les données en mémoire, appelée
  **complexité spatiale** ;
- le temps nécessaire à l'exécution, appelé **complexité temporelle**.
:::

Par exemple, une matrice creuse peut être représentée par un tableau à deux
dimensions ou par une liste chaînée qui ne conserve que les éléments non nuls,
avec leurs numéros de ligne et de colonne. Le choix de représentation fait donc
partie de l'analyse.

## Poser le modèle de calcul

Avant de compter, il faut préciser ce que représente la taille de l'entrée et
ce qui est considéré comme une opération. Ces choix donnent un modèle commun
pour comparer des algorithmes sur le même problème.

### Taille des données

La taille retenue est la dimension la plus significative de l'instance :

- pour des nombres, les nombres eux-mêmes ;
- pour des mots, leur longueur ;
- pour des listes et des tableaux, le nombre de cases ou d'éléments ;
- pour une matrice $m \times n$, $\max(m,n)$, $m \cdot n$ ou $m+n$ selon le
  problème.

Le choix d'une structure de données n'est donc pas neutre : il modifie les
opérations disponibles et leur coût.

### Coût des opérations

Toutes les opérations n'ont pas la même durée : une addition est plus rapide
qu'une élévation à la puissance, et une comparaison entre deux valeurs est plus
rapide qu'un accès à une donnée dans un fichier. Pour construire une analyse
simple, on peut supposer un coût uniforme : chaque opération élémentaire coûte
alors une constante indépendante de la taille des données.

### Meilleur, moyen et pire cas

Soit $A$ un algorithme appliqué à une donnée $d \in D$, et $T(A,d)$ son temps
d'exécution. Les trois mesures suivantes décrivent des comportements
différents :

:::info Définition

$$
\begin{aligned}
T_{Max}(A,D) &= \max\{T(A,d) \mid d \in D\}, \\
T_{Min}(A,D) &= \min\{T(A,d) \mid d \in D\}, \\
T_{Moy}(A,D) &= \sum_{d \in D} p(d) \cdot T(A,d).
\end{aligned}
$$

où $p(d)$ est la probabilité d'obtenir la donnée $d$.
:::

:::note Proposition

$$
T_{Min}(A,D) \leq T_{Moy}(A,D) \leq T_{Max}(A,D).
$$

:::

Une recherche dans un tableau illustre ces trois mesures : l'élément peut être
trouvé immédiatement, à la dernière position ou à une position dont la loi est
donnée par $p$. Dans ce cours, l'analyse porte principalement sur le pire cas,
car il donne une borne garantie.

## Compter les opérations

On note $T(n)$ le nombre d'opérations élémentaires pour une entrée de taille
$n$. La règle utile est de décomposer le programme selon sa structure : une
séquence additionne les coûts, un embranchement retient le chemin le plus
coûteux et une boucle additionne les coûts de ses passages.

:::note Règles de calcul pour un programme itératif

- **Séquence** : pour `Traitement1 ; Traitement2`,
  $T(n) = T_1(n) + T_2(n)$.
- **Embranchement** : pour `si condition alors Traitement1 sinon Traitement2`,
  $T(n) = T_c(n) + \max(T_1(n), T_2(n))$.
- **Boucle** : pour `tant que condition faire Traitement`,
  $T(n) = (k+1) \times T_c(n) + \sum_{i=1}^{k} T_i(n)$.
:::

### Exemple : une étape du tri par sélection

Le comptage devient concret lorsque le coût de chaque instruction est visible.

:::tip Exemple

```text title="Extrait du tri par sélection"
min ← i                                      // 1 affectation
pour j de i+1 à n faire                      // 1 aff. + 1 comp. + (1 aff. + 1 comp.) par passage
    si A[j] < A[min] alors                   // 1 comparaison par passage
        min ← j                              // 1 affectation si le test est vrai
```

- Dans le pire cas, quand le tableau est trié par ordre inverse :
  $4 \times (n-i) + 3$.
- Dans le meilleur cas, quand le tableau est trié, l'instruction `min ← j`
  n'est jamais exécutée : $3 \times (n-i+1)$.
- Si la moitié des $(n-i)$ tests sont vrais, le coût moyen est
  $\dfrac{4(n-i)}{2} + \dfrac{3(n-i)}{2} + 3$.
:::

Les appels récursifs se comptent avec la même idée, mais leur coût dépend à son
tour de la taille des sous-problèmes.

### Fonctions récursives

Pour la fonction récursive suivante, le traitement local coûte $C(n)$ et les
deux appels récursifs coûtent chacun $T(n/2)$ :

```text title="Fonction récursive"
fonction FunctionRecursive(n)
(1) si (n > 1) alors
(2)     Traitement(n)                       coût C(n)
(3)     FunctionRecursive(n/2)              coût T(n/2)
(4)     FunctionRecursive(n/2)              coût T(n/2)
```

On obtient donc l'équation récursive :

$$
T(n) = 2 \times T(n/2) + C(n).
$$

Cette forme prépare l'étude asymptotique : plutôt que de retenir un nombre
précis d'opérations, on cherche la vitesse de croissance qui domine quand $n$
devient grand.

## Estimation asymptotique

Les temps d'exécution exacts dépendent de la machine. Les notations de Landau
décrivent une croissance à une constante multiplicative près.

:::info Définition
On dit que $T$ est asymptotiquement majorée par $f$ quand $n \to \infty$, et
on note $T(n) = O(f(n))$, si :

$$
\exists\, c\, \exists\, n_0 \text{ tels que } \forall n > n_0,\quad
T(n) \leq c \times f(n).
$$

:::

:::info Définition
On note $T(n) = \Theta(f(n))$ lorsque $T(n) = O(f(n))$ et
$f(n) = O(T(n))$, c'est-à-dire si :

$$
\exists\, c_1, c_2, n_0 \text{ tels que } \forall n > n_0,\quad
c_1 \times f(n) \leq T(n) \leq c_2 \times f(n).
$$

:::

Les termes de plus haut degré gouvernent ces bornes. Ainsi :

- $n^3 + 2n^2 + 4n + 2 = O(n^3)$, car si $n \geq 1$ alors
  $n^3 + 2n^2 + 4n + 2 \leq 8 \times n^3$ ;
- $n\log(n) + 12n + 888 = O(n\log(n))$ ;
- $1000n^{10} - n^7 + \dfrac{2^n}{1000} = O(2^n)$.

### Principales classes de complexité

Les classes suivantes donnent un repère rapide pour comparer la croissance :

- **$O(1)$**, temps constant : le temps d'exécution est indépendant de la
  taille des données.
- **$O(\log n)$**, temps logarithmique : l'algorithme réduit un gros problème
  à des problèmes plus petits et la résolution d'un seul sous-problème suffit.
  La recherche dichotomique dans une liste triée en est un exemple.
- **$O(n)$**, temps linéaire : un traitement en temps constant est effectué
  sur chaque donnée, comme dans une recherche séquentielle.
- **$O(n\log n)$** : le problème est scindé en sous-problèmes indépendants,
  puis leurs solutions sont réunies, comme avec le tri-fusion.
- **$O(n^2)$**, temps quadratique ou polynomial : cette classe apparaît
  notamment lorsqu'on examine toutes les paires parmi $n$ données. Le temps
  $O(n^3)$ est cubique.
- **$O(2^n)$**, temps exponentiel : il résulte souvent d'une recherche brutale
  d'une solution.

:::warning
En pratique, un algorithme à complexité exponentielle devient inutilisable. Les
algorithmes polynomiaux restent efficaces seulement lorsque $n$ n'est pas trop
grand.
:::

### Exercice : tri par dénombrement

Lorsque les valeurs sont comprises entre 0 et `max`, avec `max` pas trop grand,
on peut compter le nombre de `0`, de `1`, de `2`, jusqu'à `max`, puis parcourir
le tableau pour écrire chaque valeur selon son nombre d'occurrences.

1. Écrire cet algorithme en utilisant un tableau annexe `count`, où `count[i]`
   indique le nombre de `i` dans le tableau initial.
2. Calculer la complexité de cet algorithme.
3. Discuter cette complexité par rapport à la borne théorique inférieure.

## Récurrences et diviser pour régner

La stratégie diviser pour régner scinde un problème en sous-problèmes de même
nature, résout ces sous-problèmes sur des instances plus petites, puis combine
leurs résultats. À chaque niveau de récursivité, on distingue :

- **Diviser** : scinder le problème en sous-problèmes ;
- **Régner** : les résoudre récursivement ou directement lorsqu'ils sont assez
  petits ;
- **Combiner** : réorganiser leurs solutions en une solution complète.

### Exemple : tri-fusion

:::tip Exemple
Pour une séquence de longueur $l$, le tri-fusion :

- la divise en deux séquences de taille $l/2$ ;
- trie récursivement chaque sous-séquence si elle n'est pas réduite à un
  élément ;
- fusionne les deux sous-séquences triées.

Sa récurrence est :

$$
T(n) = 2 \times T(n/2) + n, \qquad T(1) = 0.
$$

:::

La récurrence résume les appels récursifs et le travail de combinaison. Dans le
cas général, on écrit :

:::info Définition

$$
T(n) = a \times T(n/b) + f(n), \qquad T(1) = c.
$$

Ici, $a$ est le nombre de sous-problèmes, $n/b$ leur taille et $f(n)$ le coût
hors appels récursifs.
:::

Trois méthodes permettent de résoudre ces équations : la substitution, le
développement itératif et une méthode générale.

### Méthode par substitution

Cette méthode part d'une intuition $T(n) = g(n)$, puis vérifie que la fonction
proposée satisfait la récurrence et la condition initiale après avoir fixé les
constantes.

Pour $T(n) = 1 + T(n/2)$ avec $T(1) = 1$, l'intuition est
$T(n) = O(\log_2 n)$.

<details>
  <summary>Démonstration</summary>

On pose $T(n) = a \times \log_2(n) + c$. Alors :

$$
T(n/2) = a \times \log_2(n) - a + c.
$$

En substituant dans la récurrence :

$$
T(n) = 1 + T(n/2) = 1 + a \times \log_2(n) - a + c.
$$

On obtient $1 - a + c = c$, donc $a = 1$. Comme $T(1) = 1$, on a aussi
$c = 1$. Ainsi :

$$
T(n) = \log_2(n) + 1.
$$

</details>

### Méthode par développement itératif

Pour le tri-fusion, on développe la récurrence jusqu'au cas de base. Le calcul
montre pourquoi le coût de combinaison $n$ est payé sur $\log(n)$ niveaux.

<details>
  <summary>Démonstration</summary>

Avec $T(n) = 2 \times T(n/2) + n$ et $T(1) = 0$ :

$$
\begin{aligned}
T(n) &= 2 \times T(n/2) + n \\
     &= 4 \times T(n/4) + 2n \\
     &= 8 \times T(n/8) + 3n \\
     &= \cdots \\
     &= n \times T(1) + n\log(n) \\
     &= n\log(n).
\end{aligned}
$$

</details>

### Exercice : MaxMin

On cherche le maximum et le minimum d'un ensemble $E$.

- Première idée : deux itérations indépendantes, soit $2n$ comparaisons.
- Deuxième idée : partager $E$ en deux sous-ensembles $E_1$ et $E_2$, chercher
  récursivement leurs extrema, puis fusionner les résultats.

```text title="MaxMin"
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

Si $E$ est partagé en deux parties égales, $T(n)$ est le nombre de
comparaisons pour $|E| = n$ :

$$
T(1) = 0, \qquad T(2) = 1 \text{ (une comparaison suffit)}, \qquad
T(n) = 2T(n/2) + 2.
$$

Montrer par récurrence que, pour $n = 2^p$ avec $p \geq 1$ :

$$
T(n) = \dfrac{3n}{2} - 2.
$$

### Méthode générale

:::note Théorème
Soit $T(n)$ une fonction définie par :

$$
T(n) = a \times T(n/b) + c \times n^k,
$$

où $b \geq 2$, $k \geq 0$, $a > 0$ et $c > 0$. Alors :

- si $a > b^k$, $T(n) = \Theta(n^{\log_b a})$ ;
- si $a = b^k$, $T(n) = \Theta(n^k \times \log n)$ ;
- si $a < b^k$, $T(n) = \Theta(n^k)$.
:::

Les exemples du support écrivent $T(n)=2T(n/2)+O(n^\alpha)$. Cette seule
majoration du travail non récursif ne satisfait pas l'hypothèse
$c\times n^k$ du théorème. Si ce travail est seulement dans $O(n^\alpha)$,
on peut majorer la récurrence par une récurrence de la forme
$\overline{T}(n)=2\overline{T}(n/2)+c\times n^\alpha$, avec $c>0$, puis
appliquer le théorème à ce majorant. On obtient seulement :

- si $\alpha=1/2$, le premier cas ($2>2^{1/2}$) donne $T(n)=O(n)$ ;
- si $\alpha=1$, le deuxième cas ($2=2^1$) donne
  $T(n)=O(n\log n)$ ;
- si $\alpha=2$, le troisième cas ($2<2^2$) donne $T(n)=O(n^2)$.

Pour conclure à une borne exacte dans ces trois cas, il faut aussi une borne
inférieure correspondante : par exemple, que le travail non récursif soit dans
$\Theta(n^\alpha)$, ou exactement de la forme $c\times n^\alpha$ avec
$c>0$. Le théorème s'applique alors directement et donne respectivement
$\Theta(n)$, $\Theta(n\log n)$ et $\Theta(n^2)$. Une borne supérieure en
$O$ ne devient donc pas silencieusement une borne exacte en $\Theta$.

## Exercices sur les récurrences

### Suite de Fibonacci

La récurrence de la version récursive est :

$$
T(n) = T(n-1) + T(n-2) + \alpha.
$$

La majoration suivante conduit à une complexité exponentielle.

<details>
  <summary>Démonstration</summary>

Comme $T$ est croissante :

$$
T(n) \leq 2 \times T(n-1) + \alpha.
$$

En développant :

$$
\begin{aligned}
T(n) &\leq 2 \times (2 \times T(n-2) + \alpha) + \alpha \\
     &\leq 4 \times (2 \times T(n-3) + \alpha) + 2\alpha + \alpha \\
     &\leq \cdots \\
     &\leq 2^n \times \alpha + \cdots + 4\alpha + 2\alpha + \alpha \\
     &= \alpha \times \sum_{i=0}^{n} 2^i \\
     &= \alpha \times (2^{n+1} - 1).
\end{aligned}
$$

Donc $T(n) = O(2^n)$.

</details>

Le support propose ensuite un algorithme de complexité linéaire pour calculer
le terme de rang $n$ :

```text title="Fibo-Simple"
fonction Fibo-Simple(Entier n)
(1) Entier tab[n], i
(2) Début
(3)     tab[0] = 1                              // 1
(4)     tab[1] = 1                              // 1
(5)     pour i = 2 à n                          // n-1
(6)         tab[i] = tab[i-1] + tab[i-2]        // n-1
(7)     Renvoyer tab[n]                         // 1
(8) Fin
```

### Tours de Hanoï

Le problème consiste à déplacer des disques de diamètres différents d'une tour
de départ à une tour d'arrivée en passant par une tour intermédiaire, en un
minimum de coups. Deux règles s'appliquent :

- on ne peut déplacer plus d'un disque à la fois ;
- on ne peut placer un disque que sur un disque plus grand que lui, ou sur un
  emplacement vide.

## Étapes suivantes

- [Complexité des problèmes](./complexite-ch2-complexite-problemes) poursuit
  l'étude avec les problèmes de décision et les classes de complexité.
- [Diviser pour régner](./complexite-ch3-1-diviser-pour-regner) développe la
  stratégie introduite ici et ses récurrences.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/complexite-ch1-complexite-algorithmes.pdf" />

</TabItem>
</Tabs>
