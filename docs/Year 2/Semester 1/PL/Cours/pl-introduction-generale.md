---
sidebar_position: 1
title: "PLNL : Introduction générale"
sidebar_label: Introduction générale
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# PLNL : Programmation Linéaire et Non Linéaire

*ENSI — N. Elloumi — Recherche opérationnelle*

**Module :** Programmation Linéaire et Non Linéaire
**Durée :** 45h
**Forme :** Cours intégré
**Classe :** I.I.2 : Ingénieur en Informatique 2ème année

## Objectifs du cours

Ce cours est présenté en deux parties. Dans la première partie on présentera tout d'abord la **Programmation Linéaire (PL)** qui se trouve être à la fois un outil efficace de formulation et de résolution de modèles fréquemment rencontrés et un outil mathématique très riche. Après une introduction de concepts fondamentaux cette première partie sera centrée sur la méthode du simplexe. On insiste sur l'aspect théorique et algorithmique. La seconde partie traitera la **Programmation Linéaire en Nombres Entiers (PLNE)**. Des méthodes de résolution comme la méthode de coupes (*Cutting planes method*), la méthode de recherche arborescente par séparation et évaluation (*Branch-and-Bound*) et la méthode mixte (*Branch-and-Cut*) seront présentées. On s'intéressera à quelques problèmes de réseaux et de graphes.

## Introduction générale

Très tôt (1939) plusieurs problèmes ont intéressé les mathématiciens. Citons :

- L'organisation et la planification de la production
- Les problèmes de transports
- La gestion des approvisionnements et des stocks
- La gestion des projets par les méthodes d'ordonnancement
- Les applications industrielles : Secteurs de l'industrie pétrolière, de l'agro-alimentaire, de la mécanique …etc.
- Fiabilité, Sûreté de fonctionnement et renouvellement des équipements.
- Les problèmes de l'offre et la demande
- La mondialisation et les problèmes de l'économie
- L'accélération du renouvellement des produits.
- Les phénomènes d'attente
- …etc.

## Plan du cours

### PARTIE I : Programmation Linéaire

**I.1 Programmation linéaire en nombres réels**

- Formulation d'un programme linéaire
- Algorithme de simplexe
- Algorithme dual de simplexe
- Programmation linéaire paramétrée et analyse de sensibilité
- Théorème des écarts

**I.2 Programmation linéaire en nombres entiers**

- Formulation d'un programme linéaire en nombres entiers
- Algorithme de résolution
  - méthode de coupes (*Cutting planes method*)
  - méthode de recherche arborescente par séparation et évaluation (*Branch-and-Bound*)
  - méthode mixte (*Branch-and-Cut*)

### PARTIE II : Programmation Non Linéaire (Optimisation Non Linéaire)

- Optimisation unidimensionnelle d'une fonction
  - Méthodes itératives (Newton, Fibonacci, Section dorée,…)
  - Méthodes d'encadrement (sans dérivées)
- Optimisation sans contraintes
  - Notions de bases et propriétés
  - Méthode du gradient
  - Méthodes Newtoniennes et Quasi-Newtoniennes
  - Méthodes des directions conjuguées
- Optimisation avec contraintes
  - Notions fondamentales et Conditions de Kuhn & Tucker
  - Programmation convexe
  - Méthode du gradient réduit de Wolfe
  - Méthode du gradient réduit généralisé
- Méthodes duales
  - Méthode de pénalités Lagrangiennes
  - Méthode de Lagrangien augmenté

## Bibliographie et Netographie

<!-- TODO: unclear in source — the "Bibliographie et Netographie" slide (page 5) is blank in the source PDF itself (no bibliography list was filled in on the slide), verified against the original PDF page image. -->

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/pl-introduction-generale.pdf" />

</TabItem>
</Tabs>
