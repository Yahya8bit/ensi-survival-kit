---
sidebar_position: 9
title: "Cartes SOM (Self-Organising Map)"
sidebar_label: Cartes SOM
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Cartes SOM — Self-Organising Map

*Apprentissage non supervisé — Clustering*

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments, and several diagrams — origine biologique, structure de la carte, "interprétation de l'algorithme", "différentes topologies de voisinage" — are images not extracted as text) -->

## Origine biologique

Chaque partie est dédiée à faire gérer nos actions.

## La carte de Kohonen

Réseau de neurones à compétition : un seul neurone de sortie est activé pour une entrée donnée.

Algorithme de classification développé par Teuvo Kohonen dès 1982. Mise en correspondance de l'espace d'entrée avec l'espace du réseau → auto-organisation.

## Présentation générale

- Les cartes de Kohonen ou SOM sont un outil puissant pour explorer et organiser des données complexes de manière non supervisée.
- Une carte de Kohonen est une grille bidimensionnelle (généralement) de nœuds (ou neurones) organisée de manière topologique.
- Les données proches dans l'espace d'entrée vont avoir des représentations proches dans l'espace de sortie et vont être classées dans le même cluster.

## Principe

Le modèle SOM permet le regroupement des informations en classes tout en respectant la topologie de l'espace des observations :

- Des observations voisines dans l'espace des données appartiennent après classement à la même classe ou à des classes voisines.
- Compression de données multidimensionnelles tout en préservant leurs caractéristiques.

### Principe en 2D

- « $n$ » cellules d'entrée ($e_1, e_2, ..., e_n$)
- Une carte de « $m$ » cellules de sorties ($x_1, ..., x_m$)
- Connexions latérales (coefficients fixes) entre les neurones de sortie : un neurone est connecté à ses 4 plus proches voisins.
- Connexions de coefficient $w_{ij}$ entre une cellule d'entrée $e_i$ et un neurone de sortie $x_j$.

## Description du modèle

Deux espaces indépendants :

- L'espace des données, généralement de grande dimension.
- L'espace des représentations (la carte), de dimension réduite ; les nœuds de la carte sont disposés géométriquement selon une topologie fixée a priori.

Trouver la projection entre les deux espaces : la projection doit conserver la topologie des données.

Un nœud dans la carte possède :

- des coordonnées fixes sur la carte,
- des coordonnées adaptables $W$ dans l'espace d'entrée original.

## Fonctionnement

Pour une entrée, un seul neurone sur la carte est sélectionné (valeur 1). On encourage le vainqueur : « the winner takes all ». Ce neurone correspond le plus possible à l'entrée : minimisation d'une distance.

*Remarque : en pratique, on normalise les entrées.*

## Algorithme d'apprentissage

- Initialiser aléatoirement les coefficients $w_{ij}$
- Répéter
  - Prendre une entrée $e = (e_1, ..., e_i, ..., e_n)$
  - Calculer la distance $d_j$ de chaque neurone $x_j$ par rapport à $e$
  - Sélectionner le neurone $x_k$ le plus proche de $e$ : $d_k = \min(d_j)$
  - Modifier les coefficients pour le neurone sélectionné et ses plus proches voisins (4 pour une carte 2D) — pour $i$ de 1 à $n$ (pour chaque poids) :
    - $w_{ik} = w_{ik} + \mu \times (e_i - w_{ik})$
    - $w_{il} = w_{il} + \beta \times (e_i - w_{il})$ où $x_l$ est un voisin de $x_k$
- Fin Répéter (nombre max d'itérations)

## Algorithme d'utilisation pour une entrée

La sortie $s_k$ du neurone $x_k$, pour une entrée $e$, est donnée par :

$$s_k = 1 \text{ si } d_k = \min(d_i), \qquad s_k = 0 \text{ si } i \neq k$$

## Exemple

On cherche à classer des images à 2 niveaux de gris de dimension 2x3 pixels. On désire construire une carte de Kohonen ayant comme entrée un carré 2x3 de valeurs booléennes et en sortie un carré 2x2.

<!-- TODO: unclear in source, verify against original PDF (the 4 input example matrices "Entrée 1..4" and the initial weight matrix W are formatted as garbled inline text/OCR artifacts in the source and could not be faithfully reconstructed as clean matrices here) -->

Pour l'Entrée 1 (`1 1 0 1 0 0` selon le carré 2x3), les distances calculées vers chacun des 4 neurones de sortie sont, dans le déroulé de l'exemple source :

$$d_1 = 2{,}22 \qquad d_2 = 2{,}10 \qquad d_3 \approx 1{,}?? \qquad d_4 = 2{,}43$$

<!-- TODO: unclear in source, verify against original PDF — the value of d3 in the source text is rendered as "ð.ðð" (an OCR/font-encoding artifact), the exact numeric value is unreadable in the extracted text -->

Neurone gagnant : $X_3$ ($k = 3$, avec $\mu = 0{,}75$). Neurones voisins : $X_1$ et $X_4$ ($l = 1, 4$, avec $\beta = 0{,}3$), mis à jour avec :

$$w_{ik} = w_{ik} + \mu \times (e_i - w_{ik})$$
$$w_{il} = w_{il} + \beta \times (e_i - w_{il}) \text{ où } x_l \text{ est un voisin de } x_k$$

### Suite de l'exercice

- Avec la matrice des poids obtenus, calculer la distance euclidienne entre l'entrée 2 et chacun des quatre neurones de sortie.
- Mettre à jour les poids des connexions entre l'entrée 2 et le neurone élu et les neurones voisins avec les mêmes coefficients.
- Avec la matrice des poids obtenus, calculer la distance euclidienne entre l'entrée 3 et chacun des quatre neurones de sortie.
- Mettre à jour les poids des connexions entre l'entrée 3 et le neurone élu et les neurones voisins avec les mêmes coefficients.
- …
- Avec la matrice des poids obtenus, calculer la distance euclidienne entre l'entrée $n$ et chacun des quatre neurones de sortie. Conclusion.

## Avantages vs inconvénients

**Avantages** :
- Visualisation des données
- Clustering non supervisé
- Facile <!-- TODO: unclear in source, source content is cut off here (advantages/disadvantages list is incomplete in the extracted text), verify against original PDF for the remaining bullet points -->

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/ia-carte-som.pdf" />

</TabItem>
</Tabs>
