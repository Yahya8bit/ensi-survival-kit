---
sidebar_position: 12
title: Chapitre X - Les Arbres Binaires
sidebar_label: Ch10 - Arbres Binaires
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# CHAPITRE X - LES ARBRES BINAIRES

## 1. Définition

Une **arborescence** désigne la représentation d'une structure hiérarchique à plusieurs niveaux, rappelant la structure d'un arbre. Une structure arborescente est un ensemble d'informations homogènes organisées en niveaux : chaque information d'un niveau peut être reliée à plusieurs informations du niveau supérieur.

En informatique, l'organisation des fichiers sur un support de stockage est structurée en arborescence, chaque répertoire ou dossier étant une branche pouvant comporter des feuilles (fichiers) et des nœuds de départ d'autres branches (sous-dossiers). À la base d'une arborescence se trouve un répertoire appelé racine. Ce répertoire peut contenir des fichiers et des répertoires, qui eux-mêmes peuvent contenir la même chose. C'est aussi sous forme d'arbre que sont organisés les fichiers dans des systèmes d'exploitation tels qu'UNIX. Les programmes traités par un compilateur sont représentés sous forme d'arbre.

Une propriété intrinsèque de la structure d'arbre est la **récursivité**. Les définitions des caractéristiques des arbres, aussi bien que les algorithmes qui les manipulent s'écrivent très naturellement de manière récursive.

## 2. Terminologie

Dans ce qui suit nous utiliserons un vocabulaire inspiré des arbres généalogiques.

- **Racine :** nœud de niveau zéro (n'a pas de père).
- **Nœud :** racine (ou sommet) de tout sous-arbre. Chaque nœud a 0 ou plusieurs fils.
- **Feuille :** un nœud qui n'a pas de fils.
- **Fils :** x est le fils de y si x est la racine du sous-arbre y.
- **Père :** x est le père de y si y est le fils de x.
- **Frère :** deux nœuds sont frères s'ils ont le même père.
- **Ascendants :** A est ascendant de B si A est le père de B ou un ascendant de B.
- **Descendants :** X est descendant de Y si X est le fils de Y ou un descendant d'un fils de Y.
- **Branche :** tout chemin de la racine à une feuille de l'arbre.
- **Hauteur d'un nœud** (ou profondeur ou niveau) est définie récursivement comme suit : étant donné x un nœud d'un arbre B,

```
h(x) = 0        si x est la racine de B
h(x) = 1+h(y)   si y est le père de x
```

**Avantages de l'utilisation des structures arborescentes :**

- Adaptation à la représentation naturelle des informations homogènes organisées ;
- Grande commodité et rapidité de manipulation des informations grâce à la notion de récursivité.

## 3. Définition du TAD

Le type arbre binaire est soit vide (noté ∅), soit de la forme `B=<o,B1,B2>`, où B1 et B2 sont des arbres binaires disjoints et 'o' est un nœud appelé racine. B1 est le sous-arbre gauche de la racine de B et B2 est sous-arbre droit.

```
Sorte arbre
Utilise : Nœud, Element

Opérations
Arbre-vide : → Arbre
<-,-,->    : Nœud x Arbre x Arbre → Arbre
Racine     : Arbre → Nœud
g          : Arbre → Arbre
d          : Arbre → Arbre
contenu    : Nœud → Element
```

**Préconditions**

```
racine(B1) est défini Ssi B1 <> Arbre-vide
g(B1) est défini Ssi B1 <> Arbre-vide
d(B1) est défini Ssi B1 <> Arbre-vide
```

**Axiomes**

```
racine(<o,B1,B2>)=o
g(<o,B1,B2>)=B1
d(<o,B1,B2>)=B2
```

## 4. Mesures sur les arbres

- La **taille** d'un arbre est le nombre de ses nœuds ; on définit récursivement l'opération taille par :

  ```
  taille(arbre-vide)=0
  taille(<o,B1,B2>)=1+taille(B1)+taille(B2)
  ```

- La **hauteur d'un nœud** (on dit aussi profondeur ou niveau) est définie récursivement de la façon suivante, étant donné x un nœud de B,

  ```
  h(x)=0 si x est racine de B
  h(x)=1+h(y) si y est le père de x
  ```

- La **hauteur ou profondeur d'un arbre B** est :

  ```
  h(B)=max {h(x) ; x nœud de B}
  ```

## 5. Arbres binaires particuliers

- Un arbre binaire est **dégénéré** ou **filiforme** si tous ses nœuds ont au maximum un seul fils.
- Un arbre binaire est **complet** s'il contient un nœud au niveau 0, 2 nœuds au niveau 1, 4 nœuds au niveau 2. D'une façon générale 2<sup>h</sup> nœuds au niveau h. *(chaque nœud est complètement rempli)*
- Un arbre binaire **parfait** est tel que tous les niveaux sauf éventuellement le dernier sont remplis, et dans ce cas les feuilles du dernier niveau sont groupées à gauche.

## 6. Représentation des arbres binaires

### a. Représentation chaînée

```pascal
Nœud = structure
    val : Element
    g ,d : ^Nœud
Fin

Type Arbre = ^Noeud
A : Arbre

(* A=Nil ⇔ Arbre vide , A^.val ⇔ contenu(Racine(A)) , A^.g ⇔ g(A), A^.d ⇔ d(A) *)
```

### b. Représentation contigüe

Avec cette représentation le nombre de nœuds de l'arbre est limité et ne doit pas dépasser une valeur `Max`.

**i. Représentation indexée**

A chaque nœud de l'arbre on associe une valeur ainsi que les indices des deux fils gauche et droit. On prendra la convention suivante : arbre vide ⇔ indice = 0.

```pascal
Nœud = struct
    Val : Element
    g,d : 0..Max
fin struct

Type ArbTab= tableau [1..Max] de Nœud

Arbre = struct
    Rac : 0..Max
    T : ArbTab
Fin struct
```

**Exemple :**

Un exemple d'arbre binaire serait représenté par une variable A de type Arbre, dont la racine `A.Rac` contient l'indice 3 et le champ T contient le tableau suivant :

| Indice | V | G | D |
|---|---|---|---|
| 1 | d | 0 | 10 |
| 2 | a | 5 | 6 |
| 3 | g | 0 | 0 |
| 4 | b | 2 | 0 |
| 5 | c | 13 | 11 |
| 6 | f | 0 | 0 |
| 8 | m | 0 | 0 |
| 9 | e | 8 | 4 |
| 10 | l | 9 | 0 |
| 13 | k | 0 | 0 |

**Traduction des opérations définies dans le TAD**

- `A.Rac=0 ⇔ A= arbre-vide`
- Si `A.Rac=r` et `r>0` alors l'arbre n'est pas vide. `A.T[Rac]=racine(A)`, `A.T[Rac].val=contenu(racine(A))` et `A.T[Rac].G` et `A.T[Rac].D` sont les indices de `g(A)` et `d(A)`.

:::note Remarque
Dans cette représentation indexée, l'indice associé à chaque nœud est arbitraire ; la suppression/ajout d'un nœud ne présente donc pas de difficultés dans la limite des places réservées pour le tableau. On garde donc un des avantages de l'allocation dynamique.
:::

**ii. Représentation séquentielle**

Cette représentation se base sur la convention suivante : si un nœud est numéroté par i, son fils gauche se trouve à l'indice 2i et son fils droit se trouve à l'indice 2i+1. Dans cette représentation le passage d'un nœud à un autre se traduit par un simple calcul d'indice dans le tableau :

```
2<=i<=Max        => le père du nœud d'indice i est à l'indice i div 2
1<=i<=Max div 2  => le fils gauche du nœud d'indice i est en 2i
                     le fils droit du nœud d'indice i est en 2i+1
```

:::warning Remarque
Cette représentation nous impose, dans le cas d'arbres binaires quelconques, de laisser des cases vides dans le tableau pour marquer la place des nœuds non présents. Ceci nous fait perdre l'avantage de compacité du tableau.
:::

## 7. Parcours d'un arbre binaire

Parcourir un arbre revient à visiter tous ses nœuds. Une des opérations les plus fréquentes mises en œuvre par les algorithmes qui manipulent les arbres consiste à parcourir ceux-ci. Il existe plusieurs ordres dans lesquels les nœuds peuvent être visités, et chacun a des propriétés utiles qui peuvent être exploitées par les algorithmes basés sur les arbres binaires.

### a. Parcours en largeur

Ce parcours essaie toujours de visiter le nœud le plus proche de la racine qui n'a pas été visité. En suivant ce parcours, on va d'abord visiter la racine, puis les nœuds à la profondeur 1, puis 2… D'où le nom parcours en largeur.

### b. Parcours en profondeur main gauche

Ce parcours consiste à tourner autour de l'arbre en suivant le chemin indiqué sur l'exemple. Ce chemin part à gauche de la racine, et va toujours le plus à gauche possible en suivant l'arbre.

Si on essaie d'écrire un algorithme récursif qui reflète ce parcours, on va visiter 3 fois chaque nœud. Appelons Traitement1 (resp. Traitement 2 et Traitement 3) la suite d'actions exécutées lorsqu'un nœud est rencontré pour la première (resp. deuxième et troisième) fois. L'algorithme est le suivant :

```pascal
Procedure Parcours_P (DON A : Arbre)
Debut
    Si (A <> Arbre_vide) alors
        Traitement 1 (A)     (* première visite *)
        Parcours_P(g(A))
        Traitement 2 (A)     (* 2ème visite *)
        Parcours_P(d(A))
        Traitement 3         (* 3ème visite *)
    Fsi
Fin
```

On remarque ici que la complexité est assez élevée puisque chaque nœud est visité 3 fois. Souvent on n'a pas 3 traitements différents à exécuter : par exemple si on veut écrire les valeurs des nœuds de l'arbre en appliquant cet algorithme on va les écrire 3 fois et c'est inutile.

D'où l'intérêt de l'existence de trois ordres classiques d'exploration de l'arbre :

- **Ordre préfixé** : père, fils gauche, fils droit
- **Ordre infixé** : fils gauche, père, fils droit
- **Ordre postfixé** : fils gauche, fils droit, père

### c. Exercices

1. Ecrire une procédure récursive qui permet d'afficher les valeurs des nœuds d'un arbre binaire selon l'ordre préfixé : chaque valeur est affichée une et une seule fois.
2. Ecrire une version itérative de la procédure précédente.

</TabItem>
<TabItem value="pdf" label="PDF">

*Le PDF ci-dessous est le fascicule complet (chapitres VIII à XI).*

<iframe src="/pdfs/asd-chapitres8-11.pdf" width="100%" height="800px" style={{border: '1px solid var(--ifm-color-emphasis-300)'}} />

</TabItem>
</Tabs>
