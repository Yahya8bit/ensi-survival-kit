---
sidebar_position: 4
title: "Devoir Surveillé — 12/11/2021"
sidebar_label: DS 2021
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Devoir Surveillé — Conception et Analyse des Algorithmes

*Université de La Manouba — École Nationale des Sciences de l'Informatique — A.U. : 2021/2022 — Classe : II2 — Date : 12 novembre 2021 — Durée : 2h — Documents non autorisés — Barème à titre indicatif — Nbre de pages : 4 — Enseignants : A. Habacha Chaibi, W. Sadfi, R. Saidi*

<!-- TODO: this source PDF has no correction attached (statement only, 4 pages) — unlike the other DS&EX docs in this folder. -->

## Exercice 1 (6 pts)

1. Calculer la complexité de l'algorithme 1 suivant :

```
tri_selection(S)
    pour dernier de S.longueur-1 à 1 faire
        imax ← 0
        max ← S.tab[0]
        pour i de 1 à dernier faire
            si S.tab[i] > max alors
                imax ← i
                max ← S.tab[i]
        S.tab[imax] ← S.tab[dernier]
        S.tab[dernier] ← max
```

2. Calculer la complexité de l'algorithme 2 suivant :

*(tri par sélection sur liste chaînée — la copie source porte des annotations manuscrites de complexité par ligne, reproduites ici)*

```
tri_selection(S)
    dernier ← Nil                                             // O(1)
    tant que dernier ≠ S.tête faire
        max ← S.tête.valeur                                   // O(1)
        maxcel ← S.tête                                       // O(1)
        maxpred ← Nil                                         // O(1)
        cel ← maxcel.suivant                                  // O(1)
        queue ← maxcel                                        // O(1)
        tant que cel ≠ dernier faire
            si cel.valeur > max alors                         // O(1)
                max ← cel.valeur
                maxcel ← cel                                  // O(1)
                maxpred ← queue
            queue ← cel                                       // O(1)
            cel ← cel.suivant
        si queue ≠ maxcel alors                                // O(1)
            si maxpred = Nil alors                             // O(1)
                S.tête ← maxcel.suivant                        // O(1)
            sinon
                maxpred.suivant ← maxcel.suivant                // O(1)
            maxcel.suivant ← dernier                            // O(1)
            queue.suivant ← maxcel
```

3. Comparer les deux algorithmes.

## Exercice 2 (6 pts)

On dispose d'un tableau d'entiers relatifs de taille $n$. On cherche à déterminer la somme maximale d'une suite d'entiers consécutifs du tableau. Par exemple, pour le tableau $[-1;\ 9;\ -3;\ 12;\ -5;\ 4]$, la solution est 18 (somme des éléments de $T$ entre les positions 1 et 3 : $[9;\ -3;\ 12]$).

1. Écrire un algorithme itératif qui calcule la somme maximale d'une suite d'entiers consécutifs d'un tableau $T$.
2. Calculer sa complexité.

On se propose d'adopter une stratégie diviser pour régner pour traiter ce problème de manière un peu plus efficace. Admettons être en train de rechercher la somme maximale dans la tranche du tableau comprise entre les indices $d$ (début) et $f$ (fin). Si on divise la tranche en deux, la somme maximale se trouve :

a. soit dans la partie gauche,
b. soit dans la partie droite,
c. soit dans la partie qui se trouve à cheval.

```
a) Partie gauche          b) Partie droite          c) Partie à cheval
 d........m    f            d    m........f          d....m....f
[__|______|________]      [________|______|__]      [____|=====|____]
```

Il suffit donc de calculer ces trois sommes puis de garder le maximum des trois.

Les sommes maximales sur les parties gauche et droite sont obtenues récursivement en réappliquant la même stratégie.

La somme maximale sur la partie à cheval est obtenue en utilisant une fonction prédéfinie `somme_a_cheval` qui prend en entrée un tableau $T$ et les positions $d$ (début) et $f$ (fin) qui déterminent la tranche sur laquelle le calcul va être effectué. Le coût de cette fonction est $f-d$ additions d'éléments du tableau.

3. Écrire un algorithme récursif qui calcule la somme maximale d'une suite d'entiers consécutifs d'un tableau $T$ suivant l'approche diviser pour régner.
4. Écrire la formule de récurrence qui calcule la complexité en nombre d'additions.
5. Déduire la complexité de votre algorithme.

## Exercice 3 (8 pts)

Soient les deux problèmes suivants :

**Problème « Couverture des sommets »** : soient un graphe non orienté $G$ et un entier $k$. $G$ contient-il une couverture des arêtes de cardinalité au plus $k$ ? C'est-à-dire un sous-ensemble $S$ de sommets de $G$ tel que pour toute arête $(e_i,e_j)$ de $G$, $e_i$ ou $e_j$ appartiennent à $S$.

**Problème « Ensemble dominant »** : soient un graphe non orienté $G$ et un entier $k$. $G$ contient-il un ensemble dominant de cardinalité au plus $k$ ? C'est-à-dire un sous-ensemble $C$ de sommets de $G$ tel que tout sommet de $G$ appartient à l'ensemble $C$ ou il est un voisin de premier ou second degrés d'un sommet de $C$.

Deux sommets sont voisins de premier degré s'ils sont reliés par une arête, et ils sont voisins de second degré s'ils sont reliés par 2 arêtes.

1. Soit le graphe $G_1 = (V_1,E_1)$ suivant :

   $$V_1 = \{1,2,3,4,5\}$$
   $$E_1 = \{(1,2);\ (2,3);\ (2,4);\ (2,5);\ (3,4);\ (4,5)\}$$

   Dessiner le graphe $G_1$ et donner une couverture des sommets $S_1$ de cardinalité au plus 2.

Soit le graphe $G' = (V',E')$ construit à partir d'un graphe $G$ de la manière suivante :

- l'ensemble $V'$ des sommets de $G'$ est égal aux sommets de $G$ auquel on ajoute un sommet par arête : $V' = V \cup \{x_i,\ \text{pour tout}\ (e_i,e_j)\ \text{arête de}\ G\}$ ;
- l'ensemble $E'$ des arêtes de $G'$ est construit comme suit : si $x_i$ est un sommet correspondant à l'arête $(e_i,e_j)$ de $G$, alors les arêtes $(x_i,e_i)$ et $(x_i,e_j)$ appartiennent à $E'$.

2. À partir du graphe $G_1$ de la question 1 et de la construction ci-dessus, construire le graphe $G'_1$.
3. Vérifier que la couverture des arêtes $S_1$ du graphe $G_1$ de la question 1 est un ensemble dominant du graphe $G'_1$.
4. Montrer que le problème « Ensemble dominant » est NP.
5. Sachant que le problème « Couverture des sommets » est NP-Complet, montrer que le problème « Ensemble dominant » est NP-Complet.

   *Il faut suivre rigoureusement les différentes étapes vues en cours.*

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/complexite-ds-2021.pdf" />

</TabItem>
</Tabs>
