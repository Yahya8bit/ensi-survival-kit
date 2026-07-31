---
sidebar_position: 4
title: Chapitre IV - Allocation Dynamique de la Mémoire
sidebar_label: Ch4 - Allocation dynamique
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# CHAPITRE IV – ALLOCATION DYNAMIQUE DE LA MEMOIRE

## 1. Présentation du concept

Les variables sont stockées dans une mémoire statique : on peut représenter cette mémoire par des cases numérotées dans l'ordre croissant. Le numéro de la case est appelé « adresse ». Dans ce qui suit, et pour faciliter les choses, on considérera que toute variable utilise une seule case, même si ce n'est pas vraiment conforme à la réalité. En effet, la quantité de mémoire prise par une variable dépend de son type. Il est utile de rappeler, dans ce contexte, que dans une machine 8 bits, les adresses sont codées sur un octet, ce qui nous fait 256 cases numérotées de 0 à 255.

Quand on écrit `x : entier`, on réserve une case pour la variable x dans la mémoire (case numéro 62 dans un schéma donné).

Quand on écrit `x <- 10`, on écrit la valeur 10 dans l'emplacement réservé pour x.

Quand on exécute un programme P, le système d'exploitation se charge d'allouer l'espace mémoire nécessaire pour le stockage de toutes les variables déclarées dans P. Dans le cas où une variable déclarée ne sera pas utilisée ou qu'elle ne sera pas utile pendant toute la période d'exécution du programme, il y a un gaspillage de la mémoire. En effet, il y a deux types d'allocation mémoire : allocation **statique** (gérée automatiquement par le système) et **dynamique** (gérée manuellement par le programmeur).

L'allocation dynamique nous permet d'éviter ce type de gaspillage de mémoire et aussi de gérer les ensembles dynamiques (on verra cela dans le cours listes chaînées) et ce grâce aux **pointeurs**.

## 2. Les pointeurs

Un pointeur est une variable destinée à contenir une adresse mémoire, c'est à dire une valeur identifiant un emplacement en mémoire.

La déclaration d'une variable pointeur réserve uniquement le nombre d'octets nécessaires au codage de l'adresse mémoire de la donnée pointée mais ne réserve pas de la mémoire pour celle-ci (la donnée pointée). Quel que soit le type de la donnée pointée, la taille mémoire du pointeur est toujours la même.

### a. Déclaration d'un pointeur

```pascal
id_var_pointeur : ^ type de base
```

```pascal
px : ^ entier
```

On réserve un emplacement en mémoire pour le pointeur px (case numéro 96 dans un schéma donné).

### b. Réservation de la mémoire

```pascal
allouer (id_var_pointeur)
```

```pascal
px : ^entier
allouer (px)  (* ⇔ z : entier et px <- adresse(z) *)
(* px pointe vers z et z est la variable pointée par px *)
```

A la création deux choses se produisent :

- De la mémoire est réservée pour stocker une donnée du type spécifié (entier pour px).
- La variable concernée (px) contient l'adresse mémoire de cet espace réservé (représenté par une flèche).
- px contient l'adresse de l'espace réservé, nous pourrons alors utiliser cette variable.

### c. Accès à la variable pointée

```pascal
id_var_pointeur ^
```

```pascal
px : ^entier
px^ : (* variable de type entier *)
px^ <- 20
```

### d. Libération de la mémoire

Dès que le ou les pointeurs ne sont plus utiles, l'espace mémoire qui leur est associé doit être libéré. La libération de l'espace mémoire réservé est la procédure "réciproque" de `allouer`. Elle indique au système d'exploitation que cette partie de la mémoire dynamique n'est plus utilisée (il peut désormais en faire ce qu'il veut).

```pascal
Libérer (px)  (* la zone pointée par px est libre de nouveau *)
```

:::warning Remarques
- Pour indiquer l'absence d'adresse dans un pointeur, on utilise le pointeur particulier `Nil`.
- L'affectation `p <- Nil` veut dire que p ne pointe vers aucune variable.
- Il ne faut jamais utiliser l'indirection (`^`) lorsque le pointeur n'a pas été créé, a été déjà libéré, ou contient `Nil`.
:::

```pascal
Var
    p : ^entier
Debut
    (* le contenu de p est indéterminé : une adresse quelconque de la mémoire *)
    P^ <- 10   (* Erreur *)
Fin
```

Il est tout de même interdit de référencer une variable dynamique après sa destruction.

```pascal
Var
    p : ^entier
Debut
    allouer(p)
    P^<-10
    Libérer(p)
    P^ <-20    (* Erreur : affectation d'un entier (20) à une zone indéterminée *)
Fin
```

</TabItem>
<TabItem value="pdf" label="PDF">

*Le PDF ci-dessous est le fascicule complet (chapitres IV à VII).*

<iframe src="/pdfs/asd-chapitres4-7.pdf" width="100%" height="800px" style={{border: '1px solid var(--ifm-color-emphasis-300)'}} />

</TabItem>
</Tabs>
