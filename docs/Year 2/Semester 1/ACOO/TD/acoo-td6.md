---
sidebar_position: 6
title: "TD6 : Patrons de conception (avec corrigé)"
sidebar_label: TD6 - Patrons de conception
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Série N°6 : Patrons de conception

*ENSI — Matière : ACOO*

## Exercice 1

Toutes les fabriques de chocolat modernes ont des bouilleurs assistés par ordinateur. La tâche du bouilleur consiste à contenir un mélange de chocolat et de lait, à le porter à ébullition puis à le transmettre à la phase suivante où il est transformé en plaquettes de chocolat. Voici la classe contrôleur du bouilleur industriel de Bonchoco, SA. Si vous étudiez le code, vous constatez qu'ils ont essayé très soigneusement d'éviter les catastrophes, par exemple de vider deux mille litres de mélange qui n'a pas bouilli, de remplir un bouilleur déjà plein ou de faire bouillir un bouilleur vide.

Bonchoco a fait un travail honorable en essayant d'éviter les problèmes ; pourtant, vous soupçonnez probablement qu'en lâchant deux instances de `BouilleurChocolat` dans la nature, on s'expose à des catastrophes.

**Travail à faire :** aidez Bonchoco à améliorer sa classe `BouilleurChocolat` en la transformant en singleton.

<details>
<summary>Correction</summary>

`BouilleurChocolat` est transformé en singleton : constructeur privé, attribut de classe statique `instance` (référence unique vers l'objet), et méthode de classe statique (par exemple `getInstance()`) qui crée l'unique instance lors du premier appel puis la retourne à chaque appel suivant, garantissant qu'une seule instance de `BouilleurChocolat` existe dans l'application.

<!-- TODO: unclear in source, verify against original PDF (Exercice 1) — the corrected class diagram itself is an image; no further textual detail beyond the singleton pattern's standard structure was extracted -->

</details>

## Exercice 2

Une expression arithmétique peut se représenter de manière arborescente. Par exemple, l'expression `(2+3)*4` peut se représenter comme le résultat de l'opération `*` appliquée à `4` et au résultat d'une seconde opération `+` appliquée à `2` et à `3`. `4` et `+(2,3)` sont dits opérandes de l'expression qui a `*` comme opérateur. Selon ce principe, une autre notation pour cette expression arithmétique est `*(+(2,3), 4)`, aussi appelée notation « polonaise » et notamment utilisée sur les calculatrices HP. Cette notation peut se représenter avec un arbre comme suit. Il est à noter qu'il devient ainsi possible de se passer tout à fait de parenthèses : il n'y a aucune ambiguïté lorsqu'on utilise la notation `*+234`.

Il y a deux types d'expressions : les expressions binaires comme `+(2,3)` et les expressions unaires qui utilisent des opérations ne prenant qu'un seul argument, comme par exemple l'opérateur de changement de signe dans l'expression. Ces deux types d'expression sont caractérisées par un opérateur et disposent d'une opération `calculerValeur()`. Le terme est un concept plus général qu'une expression : il peut être soit une valeur constante (1, 2, 3 ou 4) soit une expression comme `+(2,3)`. Dans tous les cas, un terme doit disposer d'une opération `calculerValeur()`. Un autre type de terme peut être une variable qui, en plus d'une valeur comme pour les constantes, dispose d'un nom.

**Travail à faire :** utilisez le pattern composite pour produire un diagramme de classes adéquat pour la représentation des expressions arithmétiques.

<details>
<summary>Correction</summary>

Application du patron **Composite** : une classe abstraite `Terme` (rôle *Component*) déclare l'opération `calculerValeur()`. `Constante` et `Variable` (avec un attribut `nom` en plus de la valeur) sont des feuilles (*Leaf*) qui héritent de `Terme`. `Expression` (rôle *Composite*) hérite aussi de `Terme`, se compose récursivement de `Terme` (ses opérandes), et se spécialise en `ExpressionBinaire` (2 opérandes) et `ExpressionUnaire` (1 opérande), chacune caractérisée par un `opérateur` et implémentant `calculerValeur()` en combinant récursivement la valeur de ses opérandes.

</details>

## Exercice 3

Un calculateur permet d'effectuer des calculs. Etant donné que n'importe qui peut demander à un calculateur d'effectuer des calculs, la classe `Synchronisateur` a été construite pour réguler les calculs.

Les personnes qui souhaitent demander la réalisation d'un calcul doivent passer par le synchronisateur (via l'opération `calculer()`). Celui-ci distribue les calculs aux différents calculateurs avec lesquels il est lié (c'est lui qui appelle l'opération `calculer()` sur les calculateurs). Un calculateur connaît le synchronisateur auquel il est relié grâce à la propriété `sync` de type `Synchronisateur`. Sa valeur doit être déterminée lors de la création des objets de type `Calculateur`.

Nous souhaitons maintenant définir une classe représentant une barre de progression. Cette barre affiche l'état d'avancement du calcul (en pourcentage).

Une barre de progression reçoit des messages d'un calculateur qui l'informe que l'état d'avancement du calcul a changé. Définissez cette classe.

Tout comme le synchronisateur, une barre de progression doit se déclarer auprès d'un calculateur. De plus, le calculateur doit offrir une opération permettant de connaître le pourcentage d'avancement du calcul.

**Travail à faire :** appliquez le patron de conception Observer pour représenter la dépendance entre les classes `Calculateur` et `BarreProgression`.

<details>
<summary>Correction</summary>

La classe `Observer` du patron de conception correspond à une abstraction de la classe `BarreProgression`, dont cette dernière hérite. C'est elle qui doit contenir la méthode par laquelle la barre de progression est informée des avancements du calculateur.

La classe `Subject` du patron de conception correspond à une abstraction de la classe `Calculateur`, dont cette dernière hérite. Dans notre cas, cette classe contient l'équivalent de l'opération `attach(in obs: Observer)`, qui est ici l'opération `declarerBarre(in barre: Progression)`, ainsi que l'opération de notification à tous les observateurs (`notify()`).

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/acoo-corrige-td6.pdf" />

</TabItem>
</Tabs>
