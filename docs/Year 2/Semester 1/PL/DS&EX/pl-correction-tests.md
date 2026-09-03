---
sidebar_position: 3
title: "Les exercices des tests (avec corrigé)"
sidebar_label: Exercices des tests (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Les exercices des tests

*ENSI — Recherche opérationnelle — modélisation (ordonnancement, affectation, recouvrement, production)*

<!-- TODO: the source file is titled generically ("correction tests.pdf") in Drive; its actual content is a 4-exercise modeling problem set covering scheduling with disjunctive constraints, an assignment problem, a set-covering problem, and a production-mix problem, with the printed statement (pages 1-2) and handwritten correction (pages 3-8) bundled in the same PDF — retitled here to reflect the actual content rather than keeping the generic source filename. -->

## Exercice 1

Soient trois produits fabriqués à l'aide de 4 machines différentes de la manière suivante :

**Produit A** : machine 1 $\xrightarrow{a_1}$ machine 3 $\xrightarrow{a_3}$ machine 4 $(a_4)$

**Produit B** : machine 1 $\xrightarrow{b_1}$ machine 2 $\xrightarrow{b_2}$ machine 4 $(b_4)$

**Produit C** : machine 2 $\xrightarrow{c_2}$ machine 3 $(c_3)$

On a affaire à des contraintes disjonctives. On note $x_{Aj}$ la date de début d'usinage de A sur la machine $j$. On définit de la même manière les variables $x_{Bj}$ et $x_{Cj}$. On note $a_i$ la fin de l'usinage de A sur la machine $i$, et, de même, on définit $b_i$ et $c_i$. On souhaite minimiser le temps de fabrication des trois produits.

**Question** : modéliser ce problème à l'aide d'un programme linéaire.

<details>
<summary>Correction</summary>

On obtient les contraintes suivantes :

**Produit A** : $\begin{cases}x_{A1}+a_1\le x_{A3}\\x_{A3}+a_3\le x_{A4}\end{cases}$

**Produit B** : $\begin{cases}x_{B1}+b_1\le x_{B2}\\x_{B2}+b_2\le x_{B4}\end{cases}$

**Produit C** : $x_{C2}+c_2\le x_{C3}$

Pour la machine 1, on a : $\begin{cases}x_{A1}+a_1\le x_{B1}\\ \text{ou}\\x_{B1}+b_1\le x_{A1}\end{cases}$

On introduit alors la variable $\delta_1\in\{0,1\}$ et $M$ une valeur très grande ($M=+\infty$). On récrit alors :

$$\begin{cases}x_{A1}+a_1-x_{B1}\le\delta_1M\\ \text{et}\\x_{B1}+b_1-x_{A1}\le(1-\delta_1)M\end{cases}$$

De manière identique, on introduit les variables $\delta_2$, $\delta_3$ et $\delta_4$ pour les machines 2, 3 et 4.

La fonction objective du problème est : $Z_{min} = max\{x_{A4}+a_4,\ x_{B4}+b_4,\ x_{C3}+c_3\}$

On introduit la variable $u$ : $x_{A4}+a_4\le u$, $x_{B4}+b_4\le u$, $x_{C3}+c_3\le u$.

Et dans ce cas $Z_{min}=u$.

</details>

## Exercice 2

Une compagnie de taxi dispose de quatre véhicules libres et doit transporter quatre clients. Le but de la compagnie est d'assigner un taxi par client en minimisant la somme des distances parcourues. Les distances respectives (en kilomètres) entre les taxis et les voyageurs sont données par le tableau suivant :

|        | Client 1 | Client 2 | Client 3 | Client 4 |
|--------|----------|----------|----------|----------|
| Taxi 1 | 6        | 4        | 5        | 4        |
| Taxi 2 | 3        | 5        | 6        | 4        |
| Taxi 3 | 4        | 4        | 6        | 3        |
| Taxi 4 | 5        | 6        | 7        | 5        |

1- Il s'agit de quel type de problème ?
2- Formuler / modéliser le problème sous forme d'un programme linéaire.

<details>
<summary>Correction</summary>

**1)** Il s'agit d'un problème d'affectation.

**2)** On considère les variables suivantes : $x_{ij}=\begin{cases}1 & \text{si le taxi } i \text{ affecté au client } j \\ 0 & \text{sinon}\end{cases}$

Soit $d_{ij}$ : la distance entre le taxi $i$ et le client $j$.

$$\text{Minimiser } Z = \sum_{i=1}^4\sum_{j=1}^4 d_{ij}x_{ij}$$

**Sous-contraintes** :

$$\sum_{i=1}^4 x_{ij}=1 \quad \text{pour } j=1,2,3,4 \qquad (\text{1 taxi par client})$$
$$\sum_{j=1}^4 x_{ij}=1 \quad \text{pour } i=1,2,3,4 \qquad (\text{1 client par taxi})$$

</details>

## Exercice 3

Une région est divisée en six zones (zones 1,...,6). La commune souhaite construire des centres de loisir dans certaines de ces zones. Et elle désire monter un nombre minimum de centres de telle manière que, pour chaque zone, il existe au moins un centre qui se trouve à au plus 15 minutes (en voiture) de cette zone. Le temps nécessaire pour aller d'une zone à l'autre est donné dans la table suivante :

|        | Zone 1 | Zone 2 | Zone 3 | Zone 4 | Zone 5 | Zone 6 |
|--------|--------|--------|--------|--------|--------|--------|
| Zone 1 | 0      | 10     | 20     | 30     | 30     | 20     |
| Zone 2 | 10     | 0      | 25     | 35     | 20     | 10     |
| Zone 3 | 20     | 25     | 0      | 15     | 30     | 20     |
| Zone 4 | 30     | 35     | 15     | 0      | 15     | 25     |
| Zone 5 | 30     | 20     | 30     | 15     | 0      | 14     |
| Zone 6 | 20     | 10     | 20     | 25     | 14     | 0      |

1- Il s'agit de quel type de problème ?
2- Formuler le problème qui consiste à déterminer le nombre minimum de centres à construire ainsi que les zones où ceux-ci doivent être construits comme un programme linéaire en nombres entiers.
3- Modifier le programme pour qu'il corresponde à la contrainte suivante : si un centre est construit dans la zone 1, alors un centre doit être construit dans la zone 4.
4- Quelle inégalité permet de modéliser la contrainte suivante : une zone au moins parmi les zones 1, 2 et 3 doit avoir au moins un centre à au plus 15 minutes. Est-il nécessaire de l'ajouter au programme ?

<details>
<summary>Correction</summary>

**1)** Il s'agit d'un problème de recouvrement.

**2)** On considère les variables : $x_i=\begin{cases}1 & \text{si on installe un centre dans la zone } i \\ 0 & \text{sinon}\end{cases}$

Comme un centre dans une zone couvre les zones voisines qui sont à 15 minutes au plus, on traduit les données comme suit (paires de zones à $\le15$ min l'une de l'autre, notées OK dans le tableau source) : zone 1 avec zone 2 et zone 6 ; zone 2 avec zone 1 ; zone 3 avec zone 4 ; zone 4 avec zone 3 et zone 5 ; zone 5 avec zone 4 et zone 6 ; zone 6 avec zone 2 et zone 5.

$$
\left\{
\begin{aligned}
&\text{Minimiser } Z=\sum_{i=1}^6 x_i \\
&\text{s.c.} \\
&x_1+x_2\ge1 \\
&x_1+x_2+x_6\ge1 \\
&x_3+x_4\ge1 \\
&x_3+x_4+x_5\ge1 \\
&x_4+x_5+x_6\ge1 \\
&x_2+x_5+x_6\ge1 \\
&x_i\in\{0,1\}
\end{aligned}
\right.
$$

**3)** $x_1\le x_4$

**4)** $x_1+x_2+x_3\ge1$. On n'a pas besoin de rajouter cette contrainte car on a déjà $x_1+x_2\ge1$.

</details>

## Exercice 4

Un constructeur immobilier a trouvé le terrain pour bâtir 10 petits immeubles. Il construit ses immeubles selon trois plans standards qui offrent trois types d'appartements différents $F_1$, $F_2$ et $F_3$. Le tableau suivant donne le nombre d'appartements suivant le modèle de l'immeuble :

|          | Appartement $F_1$ | Appartement $F_2$ | Appartement $F_3$ |
|----------|---------------------|---------------------|---------------------|
| Modèle 1 | 5                   | 3                   | 3                   |
| Modèle 2 | 5                   | 6                   | 1                   |
| Modèle 3 | 12                  | 1                   | 2                   |

Quel que soit le modèle de l'immeuble, il fait une marge de 15k euros sur les $F_1$, 50k euros sur les $F_2$ et 80k euros sur les $F_3$.

Il a sur son carnet de commandes des demandes pour 150 $F_1$, 35 $F_2$ et 24 $F_3$.

1- Il s'agit de quel type de problème ?
2- Formuler ce problème par un programme linéaire ?

<details>
<summary>Correction</summary>

**1)** Il s'agit d'un modèle de économique pour le problème de construction.

**2)** On considère les variables suivantes :

- $M_1$ : le nombre d'immeubles de modèle 1 à construire.
- $M_2$ : idem de modèle 2.
- $M_3$ : idem de modèle 3.

Les $M_i$ sont des entiers positifs.

**Les contraintes** :

$$3M_1+M_2+2M_3\le24$$
$$3M_1+6M_2+M_3\le35$$
$$5M_1+5M_2+12M_3\le150$$

Sans oublier que $M_1+M_2+M_3=10$.

**Fonction objective** :

- Un immeuble modèle 1 permet de dégager une marge de $5\times15+3\times50+3\times80=465$ k euros
- Un immeuble modèle 2 permet de dégager une marge de $5\times15+6\times50+1\times80=455$ k euros
- Un immeuble modèle 3 permet de dégager une marge de $12\times15+1\times50+2\times80=390$ k euros

$$Z = 465M_1+455M_2+390M_3$$

Comme $M_1+M_2+M_3=10$, $M_3=10-M_1-M_2$, ce qui nous donne le programme :

$$
\left\{
\begin{aligned}
&Max\ Z = 75M_1+65M_2+3900 \\
&\text{s.c.} \\
&M_1-M_2\le4 \\
&2M_1+5M_2\le25 \\
&-7M_1-7M_2\le30 \\
&M_1+M_2\le10 \quad (\text{car } M_3\ge0) \\
&M_i\in\mathbb{N}
\end{aligned}
\right.
$$

**Solution optimale** : $M_1=6$, $M_2=2$, $M_3=2$.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/pl-correction-tests.pdf" />

</TabItem>
</Tabs>
