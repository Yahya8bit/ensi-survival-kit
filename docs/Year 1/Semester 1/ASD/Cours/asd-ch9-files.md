---
sidebar_position: 11
title: Chapitre IX - Les Files
sidebar_label: Ch9 - Les Files
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# CHAPITRE IX - LES FILES

## 1. Définition

Une file est une liste d'éléments caractérisée par deux extrémités (une tête et une queue). Dans le cas d'une file, les insertions se font à la queue et les suppressions et accès se font à la tête. Par analogie avec les files d'attente on dit que l'élément présent depuis le plus longtemps est le premier. Les files d'attente sont aussi appelées **FIFO** (*First In First Out*) c-à-d premier entré premier sorti.

## 2. Type abstrait de données « File »

Les opérations sur les files sont : tester si la file est vide ; accéder au premier élément de la file ; ajouter un élément dans la file ; retirer le premier élément de la file.

La signature du type File est donc :

```
Sorte : File
Utilise booléen, Elément

Opérations :
File-Vide : → File
Enfiler   : File x Elément → File   # ajouter
Défiler   : File → File             # retirer
Premier   : File → Elément
Est-vide  : File → Booléen
```

**Pré-conditions :**

```
Defiler (F) est défini ssi est-vide (F) = faux
Premier (F) est défini ssi est-vide (F) = faux
```

**Axiomes :**

Les axiomes différent de ceux de la pile en ce qui concerne les opérations `Premier` et `Retirer`. Pour tout F de sorte File et e de sorte Elément, on a :

```
Est-vide(F)= vrai  => Premier(Enfiler(F,e))=e
Est-vide(F)= faux  => Premier(Enfiler(F,e))= Premier(F)

Est-vide(F)= vrai  => Defiler(Enfiler(F,e))=File-vide
Est-vide(F)= faux  => Defiler(Enfiler(F,e))= Enfiler(Defiler(F),e)

Est-vide(File-vide)=vrai
Est-vide(Enfiler(F,e))=faux
```

On peut représenter les files de manière contigüe ou de manière chaînée.

## 3. Représentation des files

### a. Représentation contigüe

*(Exercice, résolu en TD/cours magistral) :* Développer les opérations `enfiler` et `defiler`.

### b. Représentation chaînée

*(Exercice, résolu en TD/cours magistral) :* Développer les opérations `enfiler` et `defiler`.

## 4. Exercice

Ecrire un algorithme qui permet de fusionner deux files F1 et F2 à éléments ordonnés dans une file F3 ordonnée.

</TabItem>
<TabItem value="pdf" label="PDF">

*Le PDF ci-dessous est le fascicule complet (chapitres VIII à XI).*

<iframe src="/pdfs/asd-chapitres8-11.pdf" width="100%" height="800px" style={{border: '1px solid var(--ifm-color-emphasis-300)'}} />

</TabItem>
</Tabs>
