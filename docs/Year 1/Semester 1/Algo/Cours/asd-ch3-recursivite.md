---
sidebar_position: 3
title: Chapitre III - La Récursivité
sidebar_label: Ch3 - Récursivité
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# CHAPITRE III – LA RECURSIVITE

## 1. Définition et exemples

La récursivité est la possibilité de faire figurer dans la définition d'un objet une référence à l'objet lui-même. Une notation est récursive si elle est partiellement définie à partir d'elle-même.

Il existe deux types de récursivités :

- **La récursivité des objets** : la définition d'un objet est récursive si l'objet apparaît dans cette définition.
  Exemple : une chaîne de caractères est soit la chaîne vide soit un caractère suivi d'une chaîne de caractères.
- **La récursivité des traitements** : un sous-programme est dit récursif s'il fait appel à lui-même pour traiter un problème. Dans ce cas, le problème en question est réduit à un problème plus simple mais de même nature.

Un problème se prête bien à la récursivité lorsqu'il peut se décomposer en sous-problèmes de même type.

**Exemple :** la fonction Factorielle

```
n != n*(n-1)     0 != 1
```

## 2. Propriétés des algorithmes récursifs

Tout module récursif doit contenir une clause conditionnelle telle que l'évaluation puisse dans certains cas se faire sans récursivité.

```pascal
Module A( )
Debut
    Si B alors C
    Sinon f(A( ))
    Fsi
Fin
```

- `B` : est la condition d'arrêt.
- `C` : cas particulier de la récursivité
- `F(A( ))` : une fonction de `A( )` qui doit permettre le changement de la valeur de la condition `B`.

## 3. Pile d'exécution

La Pile d'exécution (*call stack*) d'un programme en cours d'exécution est un emplacement mémoire destiné à mémoriser les paramètres, les variables locales ainsi que l'adresse de retour de chaque module en cours d'exécution. Elle fonctionne selon le principe LIFO (*Last-In-First-Out*) : dernier entré premier sorti.

:::warning Attention
Comme la pile a une taille fixe, une mauvaise utilisation de la récursivité peut entraîner un débordement (*stack overflow*).
:::

Considérons l'exemple de module récursif suivant :

```pascal
Procedure Affiche(n : entier)
Debut
Si n>0
    Affiche (n-1)
    ecrire(n)
Fsi
Fin
```

- 1er appel de `Affiche` avec le paramètre n = 3 ; n > 0 donc appel de `Affiche` avec le paramètre n = 2
- 2e appel de `Affiche` avec le paramètre n = 2 ; n > 0 donc appel de `Affiche` avec le paramètre n = 1
- 3e appel de `Affiche` avec le paramètre n = 1 ; n > 0 donc appel de `Affiche` avec le paramètre n = 0
- 4e appel de `Affiche` avec le paramètre n = 0 ; n = 0 donc on exécute l'instruction `ecrire(n)` => affichage : 0
- on "dépile" (3e appel, n = 1) : on exécute `ecrire(n)` => affichage : 1
- on "dépile" (2e appel, n = 2) : on exécute `ecrire(n)` => affichage : 2
- on "dépile" (1er appel, n = 3) : on exécute `ecrire(n)` => affichage : 3

## 4. Exercices d'application

- Ecrire la version récursive de la fonction Factorielle.
- Ecrire une fonction récursive qui, étant donné un entier X positif et Y un entier >=0, permet de calculer X<sup>Y</sup>.

## 5. Problème des tours de Hanoï

Les tours de Hanoï est un jeu de réflexion inventé par le mathématicien français Edouard LUCAS. Ce jeu consiste à transférer n disques de diamètres différents d'une tour de départ A vers une tour d'arrivée C en utilisant une tour intermédiaire B, et ceci en un minimum de coups, tout en respectant les règles suivantes :

- Un seul disque à la fois peut être déplacé ;
- Un disque doit toujours reposer sur un autre disque plus grand que lui ou sur un emplacement vide.

*Cette dernière règle est respectée dans la configuration de départ.*

Essayez de jouer ce jeu pour 1, 2, 3 disques. Combien de déplacement avez-vous fait ?

Si vous passez à 4 disques ; que remarquez-vous ?

Essayez d'écrire un algorithme récursif permettant de résoudre le problème avec N disques.

</TabItem>
<TabItem value="pdf" label="PDF">

*Le PDF ci-dessous est le fascicule complet (chapitres I à III).*

<PdfViewer file="/pdfs/asd-chapitres123.pdf" />

</TabItem>
</Tabs>
