---
sidebar_position: 1
title: Examen Session Principale 2015/2016
sidebar_label: Examen 2015/2016
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Examen Session Principale — Algorithmique de graphes & Optimisation (2015-2016)

*ENSI — Niveau II.1 — Date : 10/05/2016 — Documents non autorisés — Durée : 2h*

## Exercice 1 (5 points)

On veut construire un réseau à coût minimum pour relier 12 commutateurs $A$ à $L$, disposés en grille (`A,B,C,D` / `E,F,G,H` / `I,J,K,L`). Les coûts de câblage sont donnés par le graphe $G$ (arêtes horizontales, verticales et diagonales valuées de 1 à 8). Suite à une décision politique, **les liaisons câblées `GH` et `AE` sont imposées**. Déterminer alors un câblage à coût minimal respectant ces contraintes.

Vous préciserez :
- l'algorithme utilisé,
- l'adaptation de cet algorithme au cas précis de l'exercice (arêtes imposées),
- et enfin son application étape par étape.

*(Indication : il s'agit d'un problème d'arbre couvrant de poids minimal avec arêtes imposées. On adapte l'algorithme de Kruskal en insérant d'office les arêtes `GH` et `AE` dans $A_T$ avant de démarrer le tri par poids croissant des arêtes restantes, tout en veillant à ne jamais former de cycle.)*

## Exercice 2 (5 points)

Un projet informatique a été découpé en 8 sous-programmes `A,B,C,D,E,F,G,H`. Les contraintes de précédence et les durées de développement sont données dans le tableau suivant :

| sous-programme | A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|---|
| durée | 6 | 5 | 7 | 4 | 14 | 4 | 7 | 7 |
| sous-programme précédent | - | - | A,B | C | B | D,E | A | D,G |

1. Modélisez ce projet par un graphe (potentiel-tâches).
2. Déterminez la durée minimale du projet, les dates au plus tôt, les dates au plus tard des différents sous-programmes. Quels sont les sous-programmes critiques ?
3. Le développeur en charge du sous-programme $G$ est indisponible ; celui en charge du sous-programme $C$ prend alors son travail à la suite du sien. Quelle sera alors la durée minimale du projet ? Les sous-programmes critiques sont-ils les mêmes ?

## Exercice 3 (10 points)

Le graphe ci-dessous représente le réseau routier permettant d'aller de la ville $E$ à la ville $S$. Le long de chaque route est indiquée la capacité maximale en nombre de véhicules sur un week-end (en milliers) : `E→a[5]`, `E→b[10]`, `E→c[8]`, `a→d[7]`, `a→e[8]`, `b→d[10]`, `b→e[2]`, `b→c[1]`, `c→e[2]`, `c→f[4]`, `d→g[7]`, `d→e[4]`, `e→g[4]`, `e→S[6]`, `e→f[2]`, `f→S[6]`, `g→S[10]`.

Mr Ali, responsable du trafic routier, indique que le nombre de véhicules transitant de $E$ vers $S$ ne peut dépasser 15 milliers. Il indique que ce chiffre peut être atteint en orientant le trafic selon une répartition proposée (donnée sur une seconde figure, avec les valeurs `[flot réalisé, capacité]`), et justifie sa décision en montrant que sur chaque « route » de $E$ vers $S$, au moins une partie du parcours est saturée.

1. Que pensez-vous du diagnostic de Mr Ali ? Si on devait améliorer le réseau routier, que préconiseriez-vous de faire ? Et comment ?

   *(Indication : le fait que chaque chemin contienne un arc saturé prouve seulement que le flot est **complet**, pas nécessairement **maximal**. Il faut rechercher une chaîne améliorante empruntant un arc arrière pour vérifier s'il existe un meilleur flot — cf. algorithme de Ford-Fulkerson, étape 2.)*

2. Sur chaque tronçon de route, il y a un droit de péage égal au centième de sa capacité (valeurs multipliées par 10 sur un graphe donné en annexe). Déterminer le flot de valeur 4000 et à coût minimum (algorithme de Busacker et Gowen).
3. Il n'a pas été tenu compte du nombre maximal de véhicules pouvant traverser les agglomérations. Pour la ville $e$, il est impossible d'envisager un nombre de véhicules supérieur à 7 milliers. Afin de résoudre ce nouveau problème, on modifie la représentation du réseau routier : on dédouble chaque ville pour laquelle une contrainte est imposée. Pour une ville $i$ de capacité maximale $c_i$, on crée deux sommets $i_1$ et $i_2$ : tous les arcs ayant pour extrémité $i$ ont pour extrémité $i_1$, ceux ayant pour origine $i$ ont pour origine $i_2$, et on ajoute un arc $(i_1,i_2)$ de capacité $c_i$.
   a) Représenter le graphe qui résulte de cette procédure.
   b) Déterminer alors le nombre maximal de véhicules pouvant aller de $E$ à $S$.
4. Suite à une campagne de sécurité routière, la préfecture envisage d'implanter le long des routes des radars de manière à ce que tous les véhicules circulant de $E$ vers $S$ soient susceptibles d'être contrôlés au moins une fois. Déterminer le nombre minimal de radars à placer ainsi que leurs emplacements, en modélisant le problème par un problème de **flot maximal** après que des capacités adéquates aient été associées aux arcs du graphe.

   *(Indication : c'est un problème de « coupe minimale » — d'après le théorème de Ford-Fulkerson, une coupe de capacité minimale correspond à l'ensemble minimal d'arcs — donc d'emplacements de radars — dont la suppression déconnecterait totalement $E$ de $S$ ; sa capacité est égale à la valeur du flot maximal calculé en 3.b.)*

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/graphe-examen-2015-2016.pdf" />

</TabItem>
</Tabs>
