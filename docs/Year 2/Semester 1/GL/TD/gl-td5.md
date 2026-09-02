---
sidebar_position: 5
title: "TD5 : Conception architecturale"
sidebar_label: TD5 - Conception architecturale
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Série N°5 – Conception des logiciels : Conception architecturale

*ENSI — Génie Logiciel — II2*

:::info
Aucun corrigé n'a été trouvé pour ce TD dans les archives disponibles. Seul l'énoncé est transcrit ci-dessous.
:::

## Exercice n°1

Choisissez LA OU LES bonnes alternatives tout en justifiant votre réponse :

**1.** Un style architectural :

a) Est un patron décrivant une architecture logicielle permettant de résoudre un problème particulier.
b) Est équivalent à un patron de conception.
c) Comporte des guides de bonnes pratiques et des règles générales qui ne peuvent pas être traduites directement en code source.

**2.** Le style architectural physique est indépendant des considérations physiques, hors de tout contexte d'exécution (machines, OS et réseaux).

a) Vrai
b) Faux

**3.** Dans le modèle MVC, le modèle gère la synchronisation entre la vue et le contrôleur.

a) Vrai
b) Faux

**4.** Considérons le cas d'une application qui contient une interface utilisateur qui fournit une interface graphique de dessin (avec menus, visualisation, etc.). Cette interface interagit uniquement avec une bibliothèque des figures. Cette bibliothèque fournit des figures complexes construites uniquement à l'aide des primitives. Cette bibliothèque utilise exclusivement les services d'un moteur géométrique. Ce moteur géométrique est responsable des calculs vectoriels, des transformations, de l'intégrité de la figure, etc. Il fournit un type abstrait permettant d'accéder à une description (en lecture seule) de la figure ainsi qu'un ensemble minimal de primitives qui changent la figure, en préservant son intégrité. Le style architectural logique le plus adéquat est :

a) Modèle-Vue-Contrôleur (MVC)
b) Trois tiers
c) Client lourd
d) Modèle en couches

## Exercice n°2

Pour les applications suivantes, choisissez le style architectural logique le plus approprié selon vous en justifiant votre réponse :

a) Logiciel de traitement d'image (Photoshop par exemple)
b) Compilateur (gcc par exemple)
c) Logiciel de traitement de texte (Word par exemple)

## Exercice n°3

La Société Nationale des Chemins de Fer Tunisiens (SNCFT) souhaite concevoir et développer une application de vente des billets et des abonnements. Cette application permet :

- à ses clients d'acheter des billets ou des abonnements ;
- à ses vendeurs aux guichets d'effectuer des ventes groupées des billets ou des abonnements ;
- aux directeurs des gares de consulter les états des billets et d'élaborer des tableaux de bord ;
- le paiement des billets et des abonnements s'effectue par carte bancaire. L'application doit offrir des interfaces personnalisées aux clients, aux vendeurs de guichets et aux directeurs des gares.

Proposez une architecture physique pour cette application.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/gl-td5.pdf" />

</TabItem>
</Tabs>
