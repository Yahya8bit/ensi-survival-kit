---
sidebar_position: 2
title: TD2 (Partie 1) - Chemins Extrémaux des Graphes Pondérés
sidebar_label: TD2 (P1) - Chemins extrémaux
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD2 — Partie 1 : Chemins extrémaux des graphes pondérés

## Exercice 1

1. Pour chacun des graphes ci-dessous (`G₁, G₂, G₃, G₄` — chacun à 4 ou 5 sommets `x₁,...,x₅` avec des poids donnés, certains négatifs), étudier la possibilité de trouver un chemin de longueur minimale, de longueur maximale, et citer les algorithmes qui pourraient être utilisés (sans exécution).
2. Appliquer l'algorithme le plus adéquat au graphe $G_4$ pour trouver un chemin de longueur minimale allant du sommet $x_1$ au sommet $x_5$, en précisant les étapes intermédiaires de la résolution. Expliciter ce chemin.

## Exercice 2

Soit $G$ un graphe pondéré, défini par la matrice des distances suivante :

|   | A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|---|
| A | 0 | 6 | ∞ | 2 | ∞ | ∞ | 8 |
| B | ∞ | 0 | ∞ | 1 | ∞ | ∞ | 2 |
| C | ∞ | 4 | 0 | ∞ | ∞ | 1 | ∞ |
| D | ∞ | ∞ | ∞ | 0 | 1 | ∞ | ∞ |
| E | ∞ | 2 | 8 | ∞ | 0 | 9 | ∞ |
| F | ∞ | ∞ | ∞ | ∞ | ∞ | 0 | ∞ |
| G | ∞ | ∞ | 3 | ∞ | ∞ | ∞ | 0 |

1. Reconstituer, à partir de cette matrice de distances, le graphe initial.
2. À l'aide de l'algorithme de Moore-Dijkstra, trouver le plus court chemin de A à B.
3. Comment modifier le graphe pour calculer le plus long chemin d'un sommet à un autre ? Quels algorithmes peut-on utiliser à cette fin ?
4. Sans modifier le graphe, proposer un algorithme pour calculer le plus long chemin d'un sommet à un autre.
5. Peut-on déterminer, dans ce graphe, le plus long chemin de A à F ? Justifier.

## Exercice 3

Anne habite à HomeCity (HC) et travaille à SoCity (SC). Elle effectue l'aller-retour chaque jour en voiture. Ayant énormément de peine à se lever, elle aimerait trouver le chemin lui permettant de repousser le plus tard possible l'heure de son départ tout en arrivant au travail à 8h00. Voici le réseau des routes qu'elle peut emprunter pour se rendre de HC à SC (sommets = carrefours ; arcs = rues à sens unique ; arêtes = rues à double sens ; valeurs = temps de parcours en minutes ; attente de 3 minutes à chaque carrefour sauf HC et SC).

Le réseau : `HC → a (5)`, `HC → c (8)`, `a → b (6)`, `a → d (15)`, `b → e (6)`, `c → b (1)`, `c → g (14)`, `d → e (3)`, `d ↔ f (2)`, `e ↔ f (11)`, `e → g (2)`, `f → SC (8)`, `g → SC (6)`.

1. Déterminer le chemin qu'Anne doit emprunter lui permettant de partir le plus tard de chez elle et d'arriver à l'heure à son travail. À quelle heure doit-elle partir ?
2. Anne voudrait connaître le 2ᵉ plus court chemin de HomeCity à SoCity. Proposer-lui une méthode pour trouver ce chemin.

## Exercice 4

Un paludier à Guérande désire aller vendre sa récolte de sel dans l'une des 4 grandes foires de sa région : Rennes (ville 11), Loudéac (ville 12), Pontivy (ville 13), ou Lorient (ville 14). Il connaît les gains qu'il peut faire dans chacune de ces 4 villes (respectivement 550, 580, 590 et 600 euros), ainsi que les différents itinéraires possibles depuis Guérande (ville 0), en passant par les villes intermédiaires 1 à 10. Mais à chaque village, ville ou pont, il doit s'acquitter d'un droit de passage :

| Ville | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Droit de passage | 10 | 10 | 15 | 5 | 15 | 10 | 3 | 10 | 5 | 20 | 4 | 5 | 20 | 7 |

Le réseau routier : `0→1`, `0→2`, `0→3`, `0→6`, `1→4`, `2→4`, `2→5`, `3→5`, `3→6`, `4→7`, `4→8`, `5→8`, `5→9`, `6→9`, `6→10`, `7→11`, `8→11`, `8→13`, `9→13`, `10→14`.

1. De quel type de problème (vu en théorie des graphes) s'agit-il ?
2. Résolvez ce problème à l'aide d'un algorithme adéquat (en tenant compte des gains et des droits de passage, on cherche à maximiser le gain net).

## Exercice 5

Un village de huit maisons `A,B,C,D,E,F,G,H` est relié par un réseau routier, modélisé par un graphe représenté en machine sous forme de listes de successeurs valuées :

| Sommet | Successeurs (avec valuations) |
|---|---|
| A | B(4), C(8) |
| B | F(10), C(20), D(2), F(80)... |
| C | D(3), F(3), G(3), H(4) |
| D | E(4), H(3) |
| E | H(6) |
| F | G(10), H(7) |
| G | H(6) |
| H | — |

*(voir le PDF pour les valeurs exactes du tableau de listes de successeurs)*

1. Représenter le graphe correspondant dans le plan (sommets disposés en cercle : `B` en haut, `A,C` sur les côtés, `F,D` en dessous, `G,H,E` complétant le cercle).
2. Un médecin de campagne habitant en $G$ veut déterminer, en cas d'urgence médicale, les itinéraires les plus rapides le reliant à chacun des autres lieux du village.
   a) Définir la nature de ce problème.
   b) Adapter et réécrire l'algorithme de Dijkstra pour résoudre ce problème.
   c) Résoudre ce problème.
   d) Déterminer les différents itinéraires à emprunter.
   e) Faire une représentation du graphe partiel correspondant aux itinéraires obtenus.

## Exercice 6

Une compagnie aérienne dessert différentes villes européennes. Le tableau ci-dessous donne les durées de vol entre ces différentes villes :

| | A | B | C | D | E |
|---|---|---|---|---|---|
| A | - | 1h30 | 2h00 | - | 2h15 |
| B | 1h40 | - | - | - | 3h00 |
| C | 2h20 | - | - | 2h55 | - |
| D | - | - | 3h20 | - | 1h05 |
| E | 2h25 | 3h10 | 1h10 | - | - |

1. Comment déterminer le trajet le plus rapide entre deux villes ?
2. Comment modifier la méthode précédente afin de prendre en compte la durée des escales dans les différentes villes ?

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/graphe-td2-partie1-pcc.pdf" />

</TabItem>
</Tabs>
