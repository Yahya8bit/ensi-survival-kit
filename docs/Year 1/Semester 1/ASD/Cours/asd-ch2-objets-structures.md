---
sidebar_position: 2
title: Chapitre II - Les Objets Structurés
sidebar_label: Ch2 - Objets structurés
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# CHAPITRE II – LES OBJETS STRUCTURÉS

## Partie I - Les tableaux

Un tableau est une structure de données homogène contenant des éléments de même type.

### 1. Tableaux à une dimension

**a. Définition de type**

```pascal
<Nom type> = tableau [bi..bs] de <type de base>
```

`bi..bs` : intervalle sur ℕ qui fixe les indices des éléments du tableau (avec `bi <= bs`). `bi` : borne inférieure, `bs` : borne supérieure. `<type de base>` : le type des éléments du tableau.

**b. Déclaration de variables**

```pascal
<identificateur> : <type tableau>
```

`<type tableau>` : `<Nom type>` ou `tableau [bi..bs] de <type de base>`

**c. Opérations**

Accès aux éléments d'un tableau : `<Nom tableau> [<indice>]`

**Exemple :** `T[1]` désigne l'élément du tableau à la position 1.

Les opérations autorisées sont toutes les opérations autorisées sur le type des éléments (type de base).

```pascal
T : tableau [1..15] de entier
T[5] ← T[20]+3   (* faux *)
T[6] ← '4'       (* faux *)
T[10] ← 2* T[3]  (* correct *)
```

**d. Exercice**

Ecrire un algorithme qui applique le principe de la recherche dichotomique pour chercher un élément x dans un tableau trié de N éléments.

### 2. Tableaux à deux dimensions

**a. Définition de type**

```pascal
<Nom-type>= tableau [<int-ligne>, <int-colonne>] de <type de base>
```

**Exemple :** `MatriceEntier = tableau [1..10, 1..15] de entier`

**b. Déclaration de variables**

```pascal
<identificateur> : <type-tableau>
```

```pascal
MatriceEntier=tableau [1..10,1..15] de entier   (* Nom-type *)
T : MatriceEntier
(* ou *)
T : tableau[1..10, 1..15] de entier
```

**c. Opérations**

Accès aux éléments de la matrice : `<identificateur-tableau> [<indice-ligne>, <indice-colonne>]`

`T[1,15]` : l'élément se trouvant à l'intersection de la ligne 1 et la colonne 15. `T[i,j]` : l'élément se trouvant à l'intersection de la ligne i et la colonne j.

## Partie II - Les chaînes de caractères

### 1. Déclaration, initialisation et accès aux éléments

Le type chaîne permet de décrire des objets formés par une succession de N caractères avec N compris entre 0 et 255. Si N=0 on dit que la chaîne est vide.

Dans la plupart des langages de programmation, il existe des "outils" pour manipuler les chaînes de caractères. Au niveau des algorithmes, nous introduisons quelques fonctions prédéfinies qui correspondent aux "outils" classiquement fournis par les langages. Cette liste partielle peut bien sûr être complétée en fonction de vos besoins.

**Déclaration d'une chaine de caractères**

Une chaine de caractères est composée d'au plus 255 caractères, donc il n'est pas nécessaire (mais il est possible) de faire figurer dans la déclaration le nombre maximum de caractères qu'elle peut contenir.

```pascal
Nom : Chaine [10]   (* la chaine nom peut contenir au maximum 10 caractères *)
Prenom : Chaine     (* la chaine nom peut contenir au maximum 255 caractères *)
```

**Accès à un élément de la chaine**

```pascal
Ch ← 'Bonjour'
Ch[1]='B'  Ch[4]='j'
```

### 2. Lecture et écriture d'une chaîne de caractères

**Lecture**

```pascal
Ch : chaine
Lire (ch)   (* la chaine est manipulée comme une entité *)
```

**Ecriture**

```pascal
Ch : chaine
Ecrire (ch)
```

### 3. Fonctions de base sur les chaînes de caractères

**Fonction longueur (ch : chaîne) : entier**

Retourne la longueur de la chaîne ch, c'est-à-dire le nombre de caractères dont elle est constituée.

```pascal
ch ← 'Bonjour'
Longueur (ch)=7
```

**Fonction concat (ch1:chaîne, ch2:chaîne) : chaîne**

Retourne une chaîne de caractères formée par la concaténation de ch1 et de ch2 (ch1 suivi de ch2).

```pascal
ch1 ← 'Bon', ch2 ← 'jour', ch3 ← concat(ch1,ch2)
(* Ch3 contient 'Bonjour' *)
```

**Fonction sous_chaîne (ch:chaîne, i:entier, l:entier) : chaîne**

Retourne une sous-chaîne de longueur l extraite de la chaîne ch, à partir de la position i.

`sousChaîne("informatique", 6, 2)` retourne la chaîne `"ma"`.

**Fonction Pos (ch1:chaîne, ch2:chaîne) : entier**

Retourne la première position de la chaîne ch1 dans la chaîne ch2. Si ch1 n'est pas dans ch2, elle retourne 0.

`Pos ('jour', 'Bonjour')` donne `4`

**Procédure Efface (ch : chaîne, p : entier, n :entier)**

Efface n caractères de ch à partir de la position p.

`Efface ('CD ROM',3 ,4)` → la chaine devient `'CD'`.

**Procédure Insère (ch1 : chaîne, ch2 : chaîne, p : entier)**

Insère la chaîne ch1 dans la chaîne ch2 à partir de la position p. Le caractère numéro p et les suivants sont décalés vers la droite.

```pascal
ch1 ← 'DE', ch2 ← 'ABCFG'
Insère (ch1, ch2, 4)   (* ch2 devient 'ABCDEFG' *)
```

**Procédure Convch (d : reel, ch : chaîne)**

Convertit un nombre en une chaine de caractères et l'affecte à ch.

`Convch (2007, ch)` → ch contient la chaîne `'2007'`

**Procédure Valeur (ch : chaîne, d : reel, erreur : entier)**

Convertit une chaîne ch en une valeur numérique décimale et l'affecte à la variable d. Le paramètre erreur contient 0 si la conversion s'est déroulée sans erreur, sinon il contiendra le numéro du caractère qui a déclenché l'erreur.

```pascal
Ch ← '10.5'
Valeur (ch,d,e)   (* d contient le nombre 10.5 et e contient 0 *)

Ch ← '01/01/2008'
Valeur (ch,d,e)   (* d contient 0 et e contient 3 : le caractère '/' n'est pas un chiffre *)
```

## Partie III - Les enregistrements

### 1. Définition

Un enregistrement ou article est une structure de données composée d'un nombre fixe d'éléments pouvant être de types différents. Il permet de regrouper dans un même type un ensemble d'informations caractérisant un objet donné. Les éléments d'un article sont appelés « champs » et peuvent être à leur tour des structures de données.

### 2. Syntaxe

**a. Déclaration de type**

`<Nom-type>` : identificateur associé à l'article. `<Champ i>` : identificateur du ième champ. `<type i>` : le type du ième champ.

**b. Déclaration des variables**

```pascal
<id-var> : <Nom type article>
```

```pascal
R1,R2 : Rectangle
P1 : Personne
```

**c. Opération d'accès**

```pascal
<id-var>. <nom-champ>
```

```pascal
R1.largeur ← 3
R1.longueur ← 5
P1.nom ← « Mohamed »
P1.age ← 10
```

### 3. Exercice

Ecrire un algorithme qui lit une suite d'informations concernant 30 étudiants et les stocke dans une structure de votre choix.

Chaque étudiant est caractérisé par un numéro de cin, un nom, une date de naissance (jour, mois, année) et un niveau d'études (1, 2 ou 3).

Ecrire un algorithme permettant de :

a. Calculer le pourcentage des étudiants au niveau 1.
b. Afficher la liste des noms des étudiants dont l'année de naissance >=1990.
c. Afficher toutes les informations concernant un étudiant dont le numéro de cin est donné.

</TabItem>
<TabItem value="pdf" label="PDF">

*Le PDF ci-dessous est le fascicule complet (chapitres I à III).*

<iframe src="/pdfs/asd-chapitres123.pdf" width="100%" height="800px" style={{border: '1px solid var(--ifm-color-emphasis-300)'}} />

</TabItem>
</Tabs>
