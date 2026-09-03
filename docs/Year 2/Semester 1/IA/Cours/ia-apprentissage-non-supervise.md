---
sidebar_position: 10
title: "Apprentissage Non Supervisé : Clustering"
sidebar_label: Apprentissage Non Supervisé
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Groupement (Clustering) — Apprentissage non supervisé

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments, and several diagrams — les exemples 1, 3, les schémas d'inertie inter/intra, les graphiques d'inertie/silhouette en fin de document — sont des images non extraites en tant que texte) -->

## Un peu de recul…

*« No Free Lunch » Theorem* states that all optimization algorithms perform equally well when their performance is averaged across all possible problems. It implies that there is no single best optimization algorithm. Because of the close relationship between optimization, search, and machine learning, it also implies that there is no single best machine learning algorithm for predictive modeling problems such as classification and regression.

## Introduction

- L'apprentissage non supervisé est une catégorie d'apprentissage automatique où les algorithmes sont utilisés pour découvrir des structures, des modèles ou des tendances dans les données sans avoir de labels ou de réponses correctes connues à l'avance.
- L'une des tâches les plus courantes de l'apprentissage non supervisé consiste à regrouper des données similaires en clusters (Clustering).
- Se baser sur une mesure de similarité (ou distance) pour grouper les données dans des clusters (ou classes).
- **But** : maximiser la similarité intra-classes et minimiser la similarité inter-classes.

### Clustering — deux inconnues

- Les labels des classes sont inconnus.
- Le nombre des classes qu'il faut former est inconnu.

### Exemple

22 régions de France métropolitaine, avec 5 caractéristiques choisies pour représenter les individus (les régions) : densité, criminalité, espérance de vie, pauvreté, enseignement. Comment obtenir les groupements ?

## Similarité

**Problème** : la notion de distance et d'appartenance à un groupe varie selon le domaine.

Exemples de distance (mais pas les seules) : distance de Manhattan, distance de Ward…

Distance euclidienne entre 2 vecteurs $V_1 = [a_1, a_2, ..., a_n]$ et $V_2 = [b_1, b_2, ..., b_n]$ :

$$d(V_1, V_2) = \sqrt{\sum_{i=1}^{n} (a_i - b_i)^2}$$

## But

Critère d'évaluation : $\text{Inertie}_{tot} = I_{inter} + I_{intra}$

- Minimiser la distance intra-clusters
- Maximiser la distance inter-clusters

## Principales méthodes

**Méthodes par partitionnement** : construire $k$ partitions et les corriger jusqu'à obtenir une similarité satisfaisante — k-means, k-medoids, CLARANS.

**Méthodes agglomératives** : créer une décomposition hiérarchique par agglomération de groupes similaires ou dissimilaires — agglomération hiérarchique ascendante, …

**Méthodes par densité** : grouper les objets tant que la densité de voisinage excède une certaine limite — DBSCAN, OPTICS, DENCLUE.

**Méthodes par modèle** : modéliser les données et utiliser le modèle pour classer les points — carte de Kohonen (Self-Organizing Map ou SOM).

## Méthodes par partition

**Principe** : $N$ objets sont classés en $k$ partitions — construire $k$ partitions et les corriger jusqu'à obtenir une similarité satisfaisante (optimisation de la similarité intra-classe).

### Algorithme des K-moyennes (MacQueen, 1967) — ou méthode des centres mobiles

Étapes :

- Fixer le nombre de clusters $k$
- Choisir aléatoirement $k$ données (valeurs, points, vecteurs de caractéristiques, …) comme graines (centres)
- Assigner chaque donnée à la graine la plus proche
- Recalculer les $k$ graines (centroïdes)
- Tant que des données changent de groupe :
  - Réassigner les données
  - Recalculer les $k$ graines

### Exemple 1 (k=2)

Choisir 2 graines → assigner les tuples → recalculer les centroïdes → réassigner les tuples.

<!-- TODO: unclear in source, verify against original PDF (this example's illustrations are images, not extracted as text) -->

### Exemple 2

Données : `27 - 51 - 52 - 33 - 45 - 22 - 28 - 44 - 40 - 38 - 20 - 57`, $k = 3$, distance = différence / amplitude maximum. Amplitude maximale $= 57 - 20 = 37$.

**Itération 1** — graines : 27, 51, 52 :

| | 27 | 51 | 52 | 33 | 45 | 22 | 28 | 44 | 40 | 38 | 20 | 57 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Graine 27 | 0.00 | 0.65 | 0.68 | 0.16 | 0.49 | 0.14 | 0.03 | 0.46 | 0.35 | 0.30 | 0.19 | 0.81 |
| Graine 51 | 0.65 | 0.00 | 0.03 | 0.49 | 0.16 | 0.78 | 0.62 | 0.19 | 0.30 | 0.35 | 0.84 | 0.16 |
| Graine 52 | 0.68 | 0.03 | 0.00 | 0.51 | 0.19 | 0.81 | 0.65 | 0.22 | 0.32 | 0.38 | 0.86 | 0.14 |
| Minimum | 0 | 0 | 0 | 0.16 | 0.16 | 0.14 | 0.03 | 0.19 | 0.3 | 0.3 | 0.19 | 0.14 |
| Affectation | 1 | 2 | 3 | 1 | 2 | 1 | 1 | 2 | 2 | 1 | 1 | 3 |

- Cluster 1 : 27 - 33 - 22 - 28 - 38 - 20 → centroïde = 28
- Cluster 2 : 51 - 45 - 44 - 40 → centroïde = 45
- Cluster 3 : 52 - 57 → centroïde = 54,5

**Itération 2** — graines : 28, 45, 54.5 :

| | 27 | 51 | 52 | 33 | 45 | 22 | 28 | 44 | 40 | 38 | 20 | 57 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Graine 28 | 0.03 | 0.62 | 0.65 | 0.14 | 0.46 | 0.16 | 0 | 0.43 | 0.32 | 0.27 | 0.22 | 0.78 |
| Graine 45 | 0.49 | 0.16 | 0.19 | 0.32 | 0 | 0.62 | 0.46 | 0.03 | 0.14 | 0.19 | 0.68 | 0.32 |
| Graine 54.5 | 0.74 | 0.09 | 0.07 | 0.58 | 0.26 | 0.88 | 0.72 | 0.28 | 0.39 | 0.45 | 0.93 | 0.07 |
| Minimum | 0.03 | 0.09 | 0.07 | 0.14 | 0 | 0.16 | 0 | 0.03 | 0.14 | 0.19 | 0.22 | 0.07 |
| Affectation | 1 | 3 | 3 | 1 | 2 | 1 | 1 | 2 | 2 | 2 | 1 | 3 |

- Cluster 1 : 27 - 33 - 22 - 28 - 20 → « jeunes majeurs », centre = 26
- Cluster 2 : 45 - 44 - 40 - 38 → « quadragénaires », centre = 41,75
- Cluster 3 : 51 - 52 - 57 → « quinquagénaires », centre = 53,33

### Exemple 3

On affecte chaque individu au centre le plus proche : $C_1 = \{A\}$, $C_2 = \{B, C, D\}$. On calcule les centres de gravité des groupes qui deviennent les nouveaux centres. Les individus sont réaffectés à de nouveaux groupes après une itération. On répète les étapes jusqu'à (stabilisation des centres) OU (nombre d'itérations = $t$) OU (stabilisation de l'inertie totale de la population).

- Classe 1 = $\{A, B\}$ avec comme centre de classe $c_1 = (1{,}5, 1)$
- Classe 2 = $\{C, D\}$ avec comme centre de classe $c_2 = (4{,}5, 3{,}5)$

<!-- TODO: unclear in source, verify against original PDF (the point-plot illustrations for this example are images, not extracted as text) -->

### Critère d'optimisation

Maximiser l'inertie inter-classe, minimiser l'inertie intra-classe. K-means repose sur la minimisation de la variance intra-classes ($I_{intra}$).

### Avantages et inconvénients

**Avantages** : facilité et efficacité, résultats.

**Inconvénients** :
- Nécessité de spécifier $K$
- Sensibilité à l'initialisation
- Mauvaise prise en compte des « outliers » (points extrêmes en dehors des groupes qui faussent les moyennes et donc les centres)
- Amélioration : utilisation de points centraux (médoïdes)

## Méthode agglomérative hiérarchique — principe général

Étapes :

- Chaque individu représente un groupe
- Trouver les deux groupes les plus proches
- Grouper ces deux groupes en un nouveau groupe
- Itérer jusqu'à $N$ groupes

**Objectif** : minimiser l'inertie intra-classe et maximiser l'inertie inter-classe.

### Algorithme

Principe : chaque point ou cluster est progressivement « absorbé » par le cluster le plus proche.

- **Initialisation** : chaque individu est placé dans son propre cluster ; calcul de la matrice de ressemblance $M$ entre chaque couple de clusters (ici les points ou individus).
- **Répéter** :
  - Sélection dans $M$ des deux clusters les plus proches $C_i$ et $C_j$
  - Fusion de $C_i$ et $C_j$ en un cluster $C_g$ plus général
  - Mise à jour de $M$ en calculant la ressemblance entre $C_g$ et les clusters existants
- **Jusqu'à** la fusion des 2 derniers clusters.

### Proximité et distance

$$d(X_1, X_2) = \sum_i |x_{1i} - x_{2i}|$$

*Attention : normaliser les données avant de calculer la similarité pour éviter que des attributs avec des échelles différentes ne dominent excessivement le calcul de la similarité.*

### Dissemblance entre 2 clusters

- **Plus proche voisin** (single-linkage) : $\min(d(i,j) ; i \in C_1, j \in C_2)$
- **Distance maximum** (complete-linkage) : $\max(d(i,j) ; i \in C_1, j \in C_2)$
- **Distance moyenne** : $\left(\sum_{i,j} d(i,j)\right) / (n_1 \times n_2)$
- **Distance des centres de gravité** : $d(b_1, b_2)$
- **Distance de Ward** : $\sqrt{n_1 n_2 / (n_1 + n_2)} \times d(b_1, b_2)$

Chaque mesure ⇒ variante différente de RHA (regroupement hiérarchique ascendant).

### Exemple d'exécution

Matrice de distances initiale entre A, B, C, D, E, F, G, H :

| | A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|---|
| B | 0.50 | | | | | | |
| C | 0.25 | 0.56 | | | | | |
| D | 5.00 | 4.72 | 4.80 | | | | |
| E | 5.78 | 5.55 | 5.57 | 1.00 | | | |
| F | 4.32 | 4.23 | 4.07 | 2.01 | 2.06 | | |
| G | 4.92 | 4.84 | 4.68 | 2.06 | 1.81 | 0.61 | |
| H | 5.00 | 5.02 | 4.75 | 3.16 | 2.90 | 1.28 | 1.12 |

Regroupements successifs :

1. $\{ABC\}, \{D\}, \{E\}, \{F\}, \{G\}, \{H\}$ (fusion A-C, distance 0.25)
2. $\{ABC\}, \{D\}, \{E\}, \{FG\}, \{H\}$ (fusion F-G, distance 0.61)
3. $\{ABC\}, \{D\}, \{E\}, \{FGH\}$
4. $\{ABC\}, \{DE\}, \{FGH\}$
5. $\{ABC\}, \{DE\}, \{FG\}, \{H\}$
6. $\{ABC\}, \{DEFGH\}$
7. $\{ABCDEFGH\}$

<!-- TODO: unclear in source, verify against original PDF — the exact ordering/numbering of the intermediate dendrogram steps is reconstructed best-effort from a jumbled OCR fragment; check the original slide for the precise sequence -->

## Arbres et partitions

Les arbres finissent tous... par être coupés ! En définissant un niveau de coupure, on construit une partition.

**Dendrogramme** : représentation des fusions successives. La hauteur d'un cluster dans le dendrogramme = similarité entre les 2 clusters avant fusion (sauf exception avec certaines mesures de similarité...).

## Qualité d'une partition

Quand une partition est-elle bonne ?

- Si les individus d'une même classe sont proches
- Si les individus de 2 classes différentes sont éloignés

Et mathématiquement : variabilité intra-classe petite, variabilité inter-classe grande. Deux critères, lequel choisir ?

### Avantages et inconvénients

- Pas de spécification a priori du nombre de clusters (+)
- Représentation hiérarchique (+)
- Sensibilité aux distances et mesures de similarité (-)
- Coût computationnel (-)

## Comment déterminer le K ?

Inertie intra-classe ou encore distorsion : idéalement, $k$ petit et inertie petite.

Méthode du graphique du silhouette : chercher le maximum de la silhouette.

<!-- TODO: unclear in source, verify against original PDF (the "coude"/elbow method plot and the silhouette plot are images, not extracted as text) -->

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/ia-apprentissage-non-supervise.pdf" />

</TabItem>
</Tabs>
