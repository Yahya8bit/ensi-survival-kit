---
sidebar_position: 8
title: Chapitre VII - Les Listes
sidebar_label: Ch7 - Les Listes
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# CHAPITRE VII - LES LISTES

## 1. Définition

Les listes linéaires sont la forme la plus courante d'organisation des données. On les utilise pour organiser des données qui doivent être traitées de manière **séquentielle**. Elles doivent être évolutives, c'est à dire que l'on doit pouvoir **ajouter** et **supprimer** des éléments.

:::info Définition
Une *liste* est une suite finie (éventuellement vide) d'éléments **de même type** repérés selon leur **rang** dans la liste [Froidevaux et al., 1993].
:::

On remarque que l'ordre des éléments est fondamental. Mais attention, il ne s'agit pas d'un ordre sur les valeurs des éléments mais d'un ordre sur les places des éléments dans la liste. Deux visions des listes sont possibles :

- **Vision itérative** qui considère une liste comme étant un ensemble d'éléments où chaque élément pointe vers l'élément suivant. Dans ce cas on se base sur les opérations d'accès et d'insertion.
- **Vision récursive** qui définit une liste par son premier élément : celui-ci pointe vers la liste des éléments suivants. Dans ce cas on se base sur les opérations `Tete` qui rend la première place de la liste et `Fin` qui rend la liste des éléments suivants.

Pour éviter les redondances, on s'intéressera, dans ce chapitre, à plusieurs implémentations des « Listes itératives » et on traitera les « Listes récursives » qui sont équivalentes aux « Piles » dans le chapitre suivant.

## 2. Types abstraits « Liste »

### a. Liste itérative

**Signature**

```
Sorte Liste, Place
Utilise : Entier (rang), Element (valeur)

Opérations :
Liste-vide : → Liste                            interne pour Liste
Acces      : Liste x Entier → Place              observateur pour Liste et interne pour Place
Contenu    : Place → Element                     observateur pour Place
Longueur   : Liste → Entier                      observateur pour Liste
Supprimer  : Liste x Entier → Liste              interne pour Liste
Insérer    : Liste x Entier x Element → Liste    interne pour Liste
Succ       : Place → Place                       interne pour Place
Ième       : Liste x Entier → Element            observateur pour Liste
```

**Axiomes**

```
Longueur (Liste-vide) = 0

Si l ≠ Liste-vide et 1<=k<=Longueur(l) alors
    Longueur(supprimer(l,k)) = Longueur(l)-1

Si 1<=k<=Longueur(l)+1 alors
    Longueur(inserer(l,k,e)) = Longueur(l)+1

l ≠ Liste-vide et 1<=k<=Longueur(l) et 1<=i<k
    => Ième(Supprimer(l,k),i) = Ième(l,i)

l ≠ Liste-vide et 1<=k<Longueur(l) et k<=i<=Longueur(l)-1
    => Ième(Supprimer(l,k),i) = Ième(l,i+1)

1<=k<=Longueur(l)+1 et 1<=i<k
    => ième(insérer(l,k,e),i) = ième(l,i)

1<=k<=Longueur(l)+1 et i=k
    => ième(insérer(l,k,e),i) = e

1<=k<=Longueur(l)+1 et k<i<=Longueur(l)+1
    => ième(insérer(l,k,e),i) = ième(l,i-1)

(* Pour Place *)
l ≠ liste-vide et l<=k<Longueur(l)
    => Succ(accès(l,k)) = accès(l,k+1)
```

Avec `l : Liste ; i,k : Entier et e : Element`

## 3. Représentation des listes

### a. Représentation contigüe

Dans ce cas la liste est représentée par un tableau dont la ième case est la ième place. La longueur de la liste ne doit pas dépasser la longueur du tableau qui est surdimensionné. Donc pour manipuler la liste nous avons besoin de connaître sa longueur parce que les cases du tableau ne sont pas toutes significatives.

**Liste itérative et représentation contigüe**

*(Exercice, résolu en TD/cours magistral) :* Développer les procédures `insérer` et `supprimer`.

**Avantages / Inconvénients / Conclusion** *(section laissée pour discussion en cours — voir la version PDF ci-dessous pour d'éventuelles annotations manuscrites du support original)*

### b. Représentation chainée

Dans cette représentation les éléments de la liste sont chaînés entre eux à l'aide des pointeurs. La liste est déterminée par l'adresse de son 1er élément. La liste est représentée par un article contenant 2 champs `<valeur, ptr>`.

:::note Remarques
- La liste vide est représentée par le pointeur `Nil`.
- Si `l ≠ listevide` alors l contient l'adresse de la tête de la liste.
:::

**Listes itératives et représentation chaînée** *(schémas du support original, voir PDF)*

**Avantages**

- Taille non limitée
- Allocation dynamique (allocation et libération selon les besoins)
- Facilité de la suppression et de l'insertion n'importe où dans la liste

**Inconvénients**

- Accès séquentiel
- Nécessite plus d'espace mémoire pour le chaînage (adresse du suivant)

**Conclusion**

Cette représentation est adaptée aux listes évolutives et/ou aux cas où on ne connait pas le nombre d'éléments de la liste.

## 4. Autres types de listes

### a. Liste circulaire

Dans une liste circulaire on remplace, dans la dernière place de la liste, le pointeur à `Nil` par un pointeur vers la tête de la liste. Ce type de listes est utile pour représenter les files (que nous verrons dans les chapitres suivants).

Si l'on choisit la dernière place de la liste comme point d'entrée, il suffit de parcourir un seul lien pour retrouver la tête de la liste.

### b. Liste doublement chaînée

Dans la représentation classique, le parcours des listes est orienté dans un seul sens : du premier élément vers le dernier. Mais de nombreuses applications nécessitent de parcourir la liste à la fois vers l'avant et vers l'arrière, et dans ce cas on peut faciliter le traitement en rajoutant des pointeurs arrière ou chaînage arrière. On obtient une **liste doublement chaînée**. Chaque place de cette liste contient un pointeur vers la place suivante (successeur) et un pointeur vers la place précédente.

### c. Exercice

On considère la liste doublement chaînée représentée comme suit :

```pascal
LD=struct
    First : ^Nœud
    Last : ^Nœud
Finstruct

Noeud=struct
    Val: Element
    Pred: ^Noeud
    Suiv: ^Noeud
Finstruct
```

1. Donner la procédure d'insertion en tête d'un élément dans une liste doublement chaînée L.
2. Donner la fonction qui permet de supprimer le dernier élément d'une liste doublement chaînée L et de retourner sa valeur. On suppose que la liste n'est pas vide.

</TabItem>
<TabItem value="pdf" label="PDF">

*Le PDF ci-dessous est le fascicule complet (chapitres IV à VII), y compris les schémas et diagrammes du chapitre VII non reproduits dans la version Markdown.*

<iframe src="/pdfs/asd-chapitres4-7.pdf" width="100%" height="800px" style={{border: '1px solid var(--ifm-color-emphasis-300)'}} />

</TabItem>
</Tabs>
