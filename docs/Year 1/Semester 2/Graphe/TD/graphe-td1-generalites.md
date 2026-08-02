---
sidebar_position: 1
title: TD1 - Généralités sur les graphes
sidebar_label: TD1 - Généralités
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD1 : Généralités sur les graphes

## Exercice 1

Soit $G = (X,U)$ un graphe, et soit $m = |U|$.

1. Montrez que : $\sum_{x\in X} d(x) = 2m$.
2. Montrer que dans un graphe non orienté : le nombre de sommets de degré impair est toujours pair.
3. Dans un groupe de vingt enfants, est-il possible que sept d'entre eux aient chacun exactement trois amis, neuf d'entre eux en aient exactement quatre, et quatre d'entre eux exactement cinq ?

## Exercice 2

Soit $GR$ le graphe à 8 sommets dont la représentation par liste de successeurs est la suivante :

| Sommet | A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|---|
| Successeurs | F | A,C,E,F,G | E | H | A,B | H | C,D,E | D |

1. Tracer le graphe $GR$.
2. $GR$ est-il fortement connexe ? Sinon, déterminer ses composantes fortement connexes.

## Exercice 3

On a construit des ponts entre les îles d'un archipel de sorte à pouvoir aller (directement ou indirectement) de toute île à une autre. De plus, de chaque île part un nombre pair de ponts. On a remarqué que, lorsqu'un pont est inaccessible pour cause de travaux, on peut encore aller de toute île à une autre.

1. Traduire ce problème en termes de théorie des graphes.
2. Prouver le résultat !

## Exercice 4

Une grande ville a mis en place un système de location de bicyclettes en libre service. Un abonné peut ainsi louer une bicyclette dans une station puis la déposer dans n'importe quelle station de son choix.

La ville comporte sept stations de location nommées `A, B, C, D, E, F` et `G`. Les stations sont reliées entre elles par des pistes cyclables indiquées sur le graphe (voir PDF pour le schéma).

1. Justifier que le graphe est connexe.
2. Recopier et compléter le tableau suivant :

   | Sommet i | A | B | C | D | E | F | G |
   |---|---|---|---|---|---|---|---|
   | Degré (i) | | | | | | | |

3. Un cycliste très prudent souhaite visiter cette ville en n'empruntant que des pistes cyclables. Il décide d'effectuer un parcours empruntant une fois et une seule toutes les pistes cyclables.
   - a) Démontrer que son souhait est réalisable, puis donner un exemple de trajet possible.
   - b) À la fin de ce parcours, dire pourquoi il est impossible que le cycliste rende sa bicyclette dans la station de départ.
   - c) Montrer qu'il est possible de construire un tel itinéraire en ajoutant une seule piste qui n'existe pas déjà, et que l'on précisera.

4. Désignons par $M$ la matrice d'adjacence associée à ce graphe (les sommets sont pris dans l'ordre alphabétique), et on se donne les deux matrices $N$ et $T$ suivantes :

   ```
   N = [[4,9,8,5,5,9,2],[9,6,10,7,10,6,4],[8,10,8,5,10,9,4],[5,7,5,2,8,4,5],[5,10,10,8,6,11,2],[9,6,9,4,11,4,6],[2,4,4,5,2,6,0]]

   T = [[4,9,8,4,5,9,1],[9,6,10,6,10,6,4],[8,10,8,4,10,9,4],[5,7,5,2,8,4,5],[5,8,10,8,6,11,0],[9,6,9,4,11,4,6],[1,4,4,5,0,6,0]]
   ```

   - a) L'une des deux matrices $N$ et $T$ est la matrice $M^3$. Sans calcul, indiquer laquelle, en justifiant.
   - b) Déterminer le nombre de chaînes de longueur 3 (en nombre d'arcs) entre $A$ et $D$. Citer alors toutes ces chaînes.
   - c) Déterminer le nombre de chaînes de longueur 3 reliant le sommet $D$ à chacun des sept sommets du graphe.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/graphe-td1-generalites.pdf" />

</TabItem>
</Tabs>
