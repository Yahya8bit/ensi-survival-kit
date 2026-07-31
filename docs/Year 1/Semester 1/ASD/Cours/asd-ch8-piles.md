---
sidebar_position: 9
title: Chapitre VIII - Les Piles
sidebar_label: Ch8 - Les Piles
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# CHAPITRE VIII - LES PILES

## 1. Définition

La pile est une structure de données abstraite linéaire (chaque élément a un successeur et un prédécesseur sauf le premier et le dernier) dont le seul et unique élément accessible est le sommet de la pile. Elle est appelée aussi **LIFO** (*Last in First Out*) c-à-d dernier-entré-premier-sorti. Les opérations d'insertion/suppression ne se font qu'au sommet.

**Exemple d'utilisation de la pile**

L'appel en cascade de plusieurs sous-programmes est géré par une pile. Si le programme A appelle B qui appelle C qui appelle D, la pile des programmes en attente évoluera comme suit :

| Temps | T0 | T1 | T2 | T3 | T4 | T5 | T6 |
|---|---|---|---|---|---|---|---|
| Pile (sommet en haut) | — | A | A, B | A, B, C | A, B | A | — |

- T0 : lancement du programme A
- T1 : appel du programme B par A
- T2 : appel du programme C par B
- T3 : appel du programme D par C
- T4 : poursuite du programme C (quand D est terminé)
- T5 : poursuite du programme B (quand C est terminé)
- T6 : poursuite du programme A (quand B est terminé)

## 2. Type abstrait « Pile »

Les opérations sur les piles sont : créer une pile ; tester si une pile est vide ; accéder au sommet d'une pile ; empiler un élément ; retirer l'élément qui se trouve au sommet (dépiler).

La signature du type est donc :

```
Sorte : Pile
Utilise booléen, Elément

Opérations :
Pile-Vide : → Pile
Empiler   : Pile x Element → Pile
Dépiler   : Pile → Pile
Sommet    : Pile → Element
Est-vide  : Pile → Booléen
```

**Pré-conditions :**

```
Dépiler (P) est défini ssi Est-vide (P) = faux
Sommet (P) est défini ssi Est-vide (P) = faux
```

**Axiomes :** *(P est une Pile, et e est un Element)*

```
Dépiler (Empiler (P,e))=P
Sommet (Empiler (P,e))=e
Est-vide (Pile-Vide)=vrai
Est-vide (Empiler (P,e))=faux
```

Pour implémenter les piles on peut utiliser les représentations étudiées pour les listes.

## 3. Représentation des Piles

### a. Représentation contigüe

P est représenté par un tableau contenant les éléments de la pile et un indice indiquant la position du sommet.

**Avantages et inconvénients :** manipulation très facile de la pile et non coûteuse en temps ; mais nécessité de majorer le nombre d'éléments de la pile !

### b. Représentation chainée

Les éléments de la pile sont chaînés entre eux, et le sommet d'une pile non vide est le premier de la liste ; la pile vide est représentée par `Nil`.

*(Exercice, résolu en TD/cours magistral) :* Développer les opérations `empiler` et `depiler`.

## 4. Exercice

Pour passer d'un nombre en base 10 à un nombre en base N, on peut appliquer la méthode suivante :

Soit K le nombre en base 10 à convertir en base N.

1. Effectuer la division entière de K par N. Soit D le résultat de cette division et R son reste ;
2. Si D > 0, revenir à l'étape 1 en remplaçant K par D.
3. Sinon, l'écriture en base N de K est égale à la concaténation de tous les restes obtenus en commençant par le dernier.

Ecrire une procédure qui, étant donnés les deux nombres strictement positifs K et N, permet de convertir K en base N et d'afficher le résultat. Utiliser une pile comme structure intermédiaire.

</TabItem>
<TabItem value="pdf" label="PDF">

*Le PDF ci-dessous est le fascicule complet (chapitres VIII à XI).*

<iframe src="/pdfs/asd-chapitres8-11.pdf" width="100%" height="800px" style={{border: '1px solid var(--ifm-color-emphasis-300)'}} />

</TabItem>
</Tabs>
