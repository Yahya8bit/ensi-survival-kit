---
sidebar_position: 7
title: Chapitre VI - Les Types Abstraits de Données
sidebar_label: Ch6 - Types Abstraits (TAD)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# CHAPITRE VI - LES TYPES ABSTRAITS DE DONNEES

## 1. Présentation du concept de TAD

La conception d'un algorithme de complexité moyenne ou élevée se fait en plusieurs étapes pendant lesquelles on effectue des raffinements successifs de la solution proposée.

La première version d'un tel algorithme est en général indépendante de son implémentation. En particulier, la représentation des données n'est pas fixée. A ce premier niveau, les données sont donc décrites par une notation particulière, un ensemble d'opérations ainsi que leurs propriétés et sont manipulées de façon abstraite, c'est-à-dire non liée à la représentation. C'est exactement ça le concept de **Type Abstrait de Données** que nous désignerons dans la suite par **TAD**.

Dans les étapes ultérieures, les différentes représentations du TAD donneront plusieurs implémentations de l'algorithme en question. Si les types de données qu'on connaît ne représentent pas d'une manière cohérente la réalité, on peut définir des types adaptés à notre contexte, on les appelle TAD.

Pour expliquer davantage ce que c'est qu'un Type Abstrait de Données, nous pouvons considérer par exemple le type `int` dans le langage C. Pour utiliser des données de ce type, le langage C offre des conventions de manipulation couvrant l'écriture des constantes, la liste des opérations permises (`+`, `-`, `*`, …) ainsi que leurs propriétés. Il est donc tout à fait possible de manipuler des données de ce type sans savoir comment ils sont représentés en interne (nombre de bits, bit de signe…). C'est ça le concept de TAD qu'on utilise couramment sans le savoir [Froidevaux et al., 1993].

**Avantages du concept**

Les avantages de ce concept consistent en le fait qu'il facilite la conception, puisqu'on n'a pas à prendre en compte la programmation ; elle est faite une fois pour toutes quelle que soit la représentation choisie ultérieurement pour le type abstrait. Dans les chapitres suivants nous allons appliquer cette démarche.

## 2. Signature d'un TAD

Un Type Abstrait de Données est défini par une signature représentant sa syntaxe et les propriétés représentant la sémantique. La syntaxe d'un type abstrait de données est décrite par le concept de signature. La signature englobe les noms des opérations ainsi que les types des arguments mais ne définit pas les propriétés de celles-ci.

La signature d'un TAD est la donnée de :

- Noms de certains ensembles utilisés par le type (booléen, entier,…) : ces noms sont appelés **sortes** (c'est l'équivalent de types en programmation).
- Noms d'un certain nombre d'opérations et de leurs profils. Le profil précise l'ensemble de valeurs des arguments et des résultats.

**Exemple de signature**

```
Sortes Vecteur, Element, Entier
Opérations
Ième        : Vecteur x Entier          → Element
Change–ième : Vecteur x Entier x Element → Vecteur
Bornesup    : Vecteur                    → Entier
Borneinf    : Vecteur                    → Entier
```

Dans le premier exemple, nous utilisons les entiers pour numéroter les éléments du vecteur mais il serait peu pratique de donner la signature et les propriétés des entiers quand on définit les vecteurs. D'ailleurs la signature donnée précédemment est incomplète car rien n'est dit sur les calculs permis sur les entiers et les éléments. On se donne donc la possibilité de réutiliser des types déjà définis dans la définition d'un nouveau type. Donc l'exemple précédent aurait dû être écrit comme suit :

```
Sorte Vecteur
Utilise Element, Entier
Opérations
Ième        : Vecteur x Entier          → Element
Change–ième : Vecteur x Entier x Element → Vecteur
Bornesup    : Vecteur                    → Entier
Borneinf    : Vecteur                    → Entier
```

La signature du type vecteur est l'union des signatures des types utilisés, enrichie des nouveaux noms de sortes et d'opérations. Dans ce cas, on peut utiliser par exemple l'addition sur les entiers…

On appelle **sorte définie** la ou les sortes correspondant aux nouveaux noms de sorte (tel que vecteur) et **sorte prédéfinie** la ou les sortes provenant des types utilisés.

Une opération est **interne** si elle rend un résultat d'une sorte définie (exp : change-ième). Toute valeur d'une sorte définie est le résultat d'une opération interne.

On dira qu'une opération est un **observateur** si elle a au moins un argument d'une sorte définie et si elle rend un résultat d'une sorte prédéfinie.

La signature définie ci-dessus n'est pas suffisante pour définir le TAD « Vecteur » car elle ne donne qu'une simple syntaxe. L'exemple ci-dessous montre plus l'insuffisance de la signature pour la définition du TAD.

```
Sorte R, S, T
Opérations
O : R x T     → S
P : R x T x S → R
Q : R         → T
V : R         → T
```

Pour compléter la définition du TAD, il est impératif d'ajouter la sémantique des opérations définies dans sa signature.

## 3. Description des propriétés d'un TAD

Les propriétés des opérations d'un TAD sont en général décrites sous forme d'**axiomes**.

Par exemple : `BorneInf (v) <= i <= BorneSup (v) => Ième(changer_ième(v,i,e),i)=e`

Où v, i, e sont des variables respectivement de sortes Vecteur, entier et element.

De plus, les opérations énoncées sont parfois des fonctions partielles non définies partout. Le domaine de définition d'une opération partielle est défini par une **précondition**.

La définition d'un type abstrait de données est donc composée d'une signature et d'un ensemble de propriétés (axiome + précondition).

**Terminons l'exemple de sorte Vecteur qui a été proposé précédemment…**

```
Vect : Entier x Entier → Vecteur
    (* retourne un vecteur où aucun élément n'est défini, les entiers c'est les deux bornes *)
Init : Vecteur x Entier → Booléen
    (* il faut aussi savoir si une certaine case du vecteur a été initialisée *)
```

Donc la signature devient :

```
Sorte Vecteur
Utilise Element, Entier, booléen
Opérations
Vect        : Entier x Entier            → Vecteur   (op interne)   (* donne un vecteur où aucun élément n'est défini *)
Init        : Vecteur x Entier           → Booléen   (observateur)  (* permet de savoir si un élément a été associé à un certain indice *)
Ième        : Vecteur x Entier           → Element   (observateur)
Change–ième : Vecteur x Entier x Element → Vecteur   (op interne)
BorneSup    : Vecteur                    → Entier    (observateur)
BorneInf    : Vecteur                    → Entier    (observateur)
```

**Axiomes**

```
Init(vect(i,j),k)=faux
BorneInf(Vect(i,j))=i
BorneSup(Vect(i,j))=j
Init(v,i)=faux et borneInf(v)<=i<=borneSup(v) => Init(change-ième(v,i,e),i)=vrai
BorneInf(v)<=i<=BorneSup(v) et i ≠ j => Init(change-ième(v,i,e),j)= Init(v,j)
BorneInf(v)<=i<=BorneSup(v) et BorneInf(v)<=j<=BorneSup(v) et i ≠ j
    => Ième(Change-ième(v,i,e),j)=Ième(v,j)
BorneInf(v)<=i<=BorneSup(v) => Ième(Change-ième(v,i,e),i)=e
BorneInf(Change-ième(v,i,e))=BorneInf(v)
BorneSup(Change-ième(v,i,e))=BorneSup(v)
```

Avec `v: Vecteur`, `i,j: entier`, `e: Element`.

La définition des propriétés des opérations implique une certaine rigueur et cohérence. Pour ceci deux propriétés doivent être respectées :

- **La Consistance :** les axiomes ne doivent pas être contradictoires.
- **La Complétude :** nombre suffisant d'axiomes pour décrire toutes les propriétés du type abstrait à spécifier.

</TabItem>
<TabItem value="pdf" label="PDF">

*Le PDF ci-dessous est le fascicule complet (chapitres IV à VII).*

<iframe src="/pdfs/asd-chapitres4-7.pdf" width="100%" height="800px" style={{border: '1px solid var(--ifm-color-emphasis-300)'}} />

</TabItem>
</Tabs>
