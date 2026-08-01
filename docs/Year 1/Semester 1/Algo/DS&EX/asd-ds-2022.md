---
sidebar_position: 1
title: DS ASD 2022-2023
sidebar_label: DS 2022-2023
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# DEVOIR SURVEILLÉ — Algorithmique et Structures de Données

**Université de La Manouba — École Nationale des Sciences de l'Informatique**
Année Universitaire 2022-2023

| | |
|---|---|
| **Classe** | II1 |
| **Date** | 10/11/2022 |
| **Durée** | 2H |
| **Enseignants** | D. DHOUIB, I. AMDOUNI, M. BEN SASSI, R. CHEBIL |
| **Documents** | N.A |

## Exercice 1 (5 points)

Le but de cette question est de trier un tableau donné en utilisant la méthode **tri en vague** (*wave sorted*). Un tableau T est dit trié en vague s'il respecte la condition suivante :

```
T[1]>=T[2] <= T[3] >= T[4] <= T[5] …
```

**Exemple :**

Soit le tableau d'entiers `T = {10,5,6,3,2,20,100,80}`

Plusieurs variantes du tableau trié en vague existent comme : `{10,5,6,2,20,3,100,80}` ou `{20,5,10,2,80,6,100,3}`.

Pour faire ce tri, on vous propose les deux étapes suivantes :

a. Faire le tri du tableau par ordre croissant.
b. Faire la permutation des cases adjacentes sur le tableau trié.

**Exemple :**

- Tableau initial `T = {10,5,6,3,2,20,100,80}`
- Après le tri de T dans l'ordre croissant : `{2,3,5,6,10,20,80,100}`
- Après permutation des cases adjacentes de T : `{3,2,6,5,20,10,100,80}`

1. Écrire un module `tri_croissant` qui permet de trier un tableau d'entiers T dans l'ordre croissant en utilisant la méthode de tri à bulles. **(1.5pt)**
2. Déduire une procédure `tri_vague` pour faire le tri en vague d'un tableau d'entiers T. **(2pts)**
3. Écrire une fonction qui retourne 1 si un tableau donné en paramètres est trié en vague, et 0 sinon. **(1.5pt)**

## Exercice 2 (10 points)

On se propose de gérer les comptes bancaires des clients d'une banque avec des tableaux. On dispose de `MAX=100` clients au maximum. Chaque client est caractérisé par : son nom, son numéro de compte bancaire, son gouvernorat de résidence, et son solde.

1. Définir les types de données nécessaires pour faire cette gestion des comptes. **(1pt)**
2. Écrire un module `stats` qui étant donné l'ensemble des comptes bancaires permet d'afficher le nombre de clients par gouvernorat.

   *Indication :* utiliser un tableau d'enregistrements intermédiaire contenant les gouvernorats et le nombre de clients qui appartiennent à chaque gouvernorat. **(2pts)**

3. Une erreur est survenue au niveau de la saisie des comptes clients et le tableau se trouve avec plusieurs clients redondants. On veut alors supprimer toutes ces redondances (ne garder qu'une seule occurrence d'un numéro de client).

   **Exemple :** Si `tabComptes = {client1,client2,client1,client3,client2}`, on veut obtenir `{client1,client2,client3}`.

   Pour ce faire :

   a. Écrire un module `supprimer_decaler` qui permet de supprimer un élément de rang donné du tableau `tabComptes` et décaler les éléments qui le suivent. **(1pt)**
   b. En utilisant le module `supprimer_decaler`, écrire le module récursif `supprimer_client` qui permet de supprimer toutes les occurrences (apparitions) d'un client donné c du tableau `tabComptes`. **(2pts)**
   c. Déduire un module `supprimer_redondance` **récursif** qui permet de supprimer tous les clients redondants du tableau `tabComptes`. **(2pts)**

4. Écrire un algorithme principal permettant de : **(1pt)**

   a. Lire un tableau `tabComptes` de 20 comptes bancaires.
   b. Stocker le contenu du tableau `tabComptes` dans un fichier `fichier_comptes`.

5. On sait qu'un inconvénient de l'utilisation des tableaux statiques consiste en le gaspillage de la mémoire. Proposer une autre représentation des données en question permettant une meilleure gestion de la mémoire. **(1pt)**

## Exercice 3 (5 points)

On s'intéresse dans cet exercice à l'analyse des températures des 30 jours du mois de septembre 2022. Pour une analyse plus fine, 4 prélèvements de température sont effectués chaque jour à des intervalles de temps réguliers.

Pour ce faire, on se propose dans un premier temps de les stocker dans une **liste simplement chaînée** par ordre chronologique (dans l'ordre croissant selon la date et l'heure).

1. Donner les structures nécessaires pour la définition du type `ListeChainee`. **(1pt)**
2. Étant donnée l'organisation décrite ci-dessus, écrire un module `Temp` qui affiche les 4 températures prélevées d'un jour donné du mois. *Le jour est donné sous forme d'un entier.* **(1.5pt)**

Comme le nombre d'éléments de la liste est connu, la représentation en liste chaînée est plus coûteuse qu'une représentation statique. Pour ceci, on se propose de transformer la liste en question en une matrice de façon à représenter les températures de chaque jour sur une ligne séparée de celle-ci.

3. Écrire un module `Transformer` qui transforme la liste de températures en une matrice comme décrit ci-dessus. *On ne demande pas de détruire la liste dans ce module.* **(1pt)**
4. Écrire un module `Max` qui étant donnée la nouvelle matrice, retourne le jour le plus chaud c-à-d ayant la température moyenne la plus élevée. **(1.5pt)**

*Bon travail*

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/asd-ds-2022.pdf" />

</TabItem>
</Tabs>
