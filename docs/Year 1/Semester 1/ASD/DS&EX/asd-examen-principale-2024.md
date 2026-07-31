---
sidebar_position: 4
title: Examen Principale 2024-2025
sidebar_label: Examen Principale 2024-2025
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# EXAMEN DE LA SESSION PRINCIPALE — Algorithmique et Structures de Données

**École Nationale des Sciences de l'Informatique — Université de la Manouba**
A.U. 2024/2025 — Réf : ID.104 — Version : 01

| | |
|---|---|
| **Niveau** | II1 |
| **Date** | 20/12/2024 |
| **Durée** | 2 heures |
| **Nombre de pages** | 4 |
| **Documents** | Non autorisés |
| **Calculatrice** | Non Autorisée |
| **Annexe** | Non |
| **Barème à titre indicatif** | (9+11) |
| **Enseignantes** | D. DHOUIB, I. AMDOUNI, N. DRIDI, M. BEN SASSI, R. CHEBIL |

:::warning
Dans toute l'épreuve, l'utilisation de toute structure de données intermédiaire est **interdite** sauf indication contraire.

L'utilisation des opérations de base vues dans le cours sur les **piles** et les **files** est permise.
:::

Pour la manipulation des chaînes de caractères, vous pouvez utiliser les fonctions prédéfinies vues dans le cours, l'opérateur `=` pour comparer deux chaînes de caractères et l'opérateur `+` pour la concaténation.

## Exercice 1 (9 points)

On s'intéresse dans cet exercice à la chaîne de fabrication d'un article A dans une industrie. Pour fabriquer l'article A, nous avons besoin de plusieurs pièces qui doivent être montées (rassemblées) dans un ordre bien déterminé. Chaque pièce est représentée par deux chaînes de caractères : sa référence et son numéro de série (unique).

### Partie I

Chaque jour les pièces disponibles pour le fonctionnement de la chaîne de fabrication sont représentées par une **liste chaînée** (tête `L`, chaque nœud contenant une pièce, se terminant par `Nil`). On commencera dans un premier temps par le développement des opérations sur cette liste chaînée.

1. Donner les structures de données nécessaires pour représenter la liste chaînée de pièces. **(0.5 pt)**
2. Écrire un module permettant de supprimer la première occurrence d'une pièce de référence donnée de la liste chaînée de pièces. La pièce supprimée doit être donnée en résultat. **(1.5 pt)**

Les pièces nécessaires à la fabrication de l'article A sont représentées par un tableau intitulé `TABREF` comportant les références des pièces nécessaires comme suit :

```
ART4567  YU8754  2ERTYH  B8750N  KITE654  AKL7045
```

On suppose que l'article A en question nécessite au maximum 30 pièces de références distincts. Il convient de noter que ces références sont **ordonnées dans le tableau selon le besoin de montage** de l'article A : la pièce de référence `ART4567` sera la première à monter, puis `YU8754`… et la dernière sera la pièce de référence `AKL7045`. Comme la fabrication est automatisée, on placera les pièces nécessaires à la fabrication d'un article A dans une pile intitulée `PILEMONTAGE` selon l'ordre de leur montage.

3. Donner les structures de données permettant de représenter le tableau de références et la pile **chaînée** de pièces. **(0.5 pt)**
4. Écrire un module qui étant donné le `TABREF`, sa taille N et la liste des pièces disponibles, prépare la pile de montage `PILEMONTAGE` de A. Toute pièce de la liste ajoutée à la pile doit être supprimée de la liste. *On suppose que les pièces nécessaires existent toujours dans la liste.* **(1.5 pt)**
5. Certaines pièces sont parfois optionnelles pour le montage de l'article A, le chef peut décider de les enlever de la pile. Écrire un module qui étant donnée la pile de montage et la référence d'une pièce optionnelle, l'enlève de la pile. *L'utilisation d'une structure intermédiaire adéquate est permise.* **(1.5 pt)**

### Partie II

Un article fabriqué est représenté par son numéro (entier long unique). Les articles fabriqués pendant toute une journée sont placés dans une **file** par ordre de fabrication. Nous n'avons pas d'hypothèse sur leur nombre.

6. Donner les structures adéquates à la représentation de la file d'articles. **(0.5 pt)**
7. Avant de les commercialiser, tous ces articles passent par une étape de vérification de conformité grâce à une fonction `conforme(num : long): booléen` qu'on suppose donnée.

   Écrire le module `Vérifier` permettant d'effectuer cette tâche sur tous les articles. *A la fin du module, la file de départ doit contenir uniquement les articles conformes dans l'ordre de fabrication. L'utilisation d'une structure intermédiaire adéquate est permise.* **(1 pt)**

8. Écrire une fonction qui étant donnée la file d'articles fabriqués et vérifiés, retourne leur nombre **sans utiliser de structure intermédiaire**. *La file de départ doit rester intacte après le traitement.* **(2 pts)**

## Exercice 2 (11 points)

Le code morse a été inventé par Samuel Morse, peintre et physicien Américain. C'est un code permettant de transmettre un texte à l'aide de séries d'impulsions courtes et longues. Il a été longtemps utilisé pour effectuer des liaisons longue distance.

En informatique, une impulsion longue est représentée par un tiret `-` et une impulsion courte par un point `.`. Chaque caractère de l'alphabet est présenté par un code morse (table des codes A-Z, cf. version PDF).

### Partie I

On représente les lettres majuscules de l'alphabet selon le code morse, **dans l'ordre alphabétique**, par une liste chainée des codes morse (tête `L` → `A .-` → `B -...` → … → `Z --..` → `Nil`).

1. Donner les structures de données nécessaires à la représentation de la liste des codes morse. **(0.5 pt)**
2. Écrire la procédure `AjouterCode` permettant d'ajouter la lettre `car` avec son code `cde` à la liste des codes morse. **(2 pt)**
3. Écrire la procédure **récursive** `RechercherCar` permettant de chercher le caractère `car` dans la liste des codes morse, et donner en résultat le code équivalent. *Si `car` n'existe pas, la chaîne vide est donnée en résultat.* **(1 pt)**
4. Écrire la procédure `CoderMorse` permettant de donner en résultat le code morse de la chaîne de caractères `Ch`. Les codes morse de deux caractères successifs sont séparés par un espace, tandis que les codes morses de deux mots successifs sont séparés par deux espaces (blancs). Les codes des caractères non trouvés dans la liste sont remplacés par des `?`. *La chaîne `Ch` est une phrase dans laquelle les mots sont séparés par un seul espace.* **(1.5 pt)**
5. Écrire la procédure `DecoderMorse` permettant de donner en résultat la chaîne de caractères codée dans la chaîne morse `ChMorse`. `ChMorse` est construite selon les conventions citées dans la question 4. Les caractères correspondant aux codes non trouvés dans la liste sont remplacés par des `?`. **(2 pt)**

### Partie II

On souhaite représenter la liste des codes morse présentée dans la partie précédente par un **arbre binaire** où la racine comporte le caractère ` ` (espace), l'orientation vers un fils gauche signifie un `.` et l'orientation vers un fils droit signifie un `-`.

6. Donner les structures de données nécessaires à la représentation de l'arbre des codes morses. **(0.5 pt)**
7. Écrire la procédure `AjouterLettre` qui étant donnée une lettre ainsi que son code morse, ajoute la lettre à l'arbre des codes. *On suppose que l'ajout de la lettre est possible en tant que feuille de l'arbre existant des codes Morse.* **(1.5 pt)**
8. Écrire une procédure **récursive** `ChercherCode` permettant de chercher une lettre donnée dans l'arbre et de donner en résultat son équivalent en code morse s'il existe et la chaîne vide sinon. *Cette procédure donnera également un booléen en résultat qui sera à vrai si la lettre a été trouvée et faux sinon.* **(1 pt)**
9. Écrire une fonction `NbCar` qui permet de calculer le nombre de caractères représentés dans l'arbre. **(1 pt)**

*Bon Travail*

</TabItem>
<TabItem value="pdf" label="PDF">

<iframe src="/pdfs/asd-examen-principale-2024.pdf" width="100%" height="800px" style={{border: '1px solid var(--ifm-color-emphasis-300)'}} />

</TabItem>
</Tabs>
