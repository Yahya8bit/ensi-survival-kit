---
sidebar_position: 4
title: "TD4 : Conception — Modélisation UML de l'architecture"
sidebar_label: TD4 - Modélisation de l'architecture
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Série N°4 : Conception — Modélisation UML de l'architecture

*ENSI — Matière : ACOO*

## Exercice 1

Soit le système de "Réservation de vols dans une agence de voyage" :

1. Des compagnies aériennes proposent différents vols.
2. Un vol est ouvert à la réservation et fermé sur ordre de la compagnie.
3. Un client peut réserver un ou plusieurs vols, pour des passagers différents.
4. Une réservation concerne un seul vol, et un seul passager.
5. Une réservation peut être annulée ou confirmée.
6. Un vol a un aéroport de départ et un aéroport d'arrivée.
7. Un vol a un jour et une heure de départ et un jour et une heure d'arrivée.
8. Un vol peut comporter des escales dans des aéroports.
9. Une escale a une heure d'arrivée et une heure de départ.
10. Chaque aéroport dessert une ou plusieurs villes.

**TAF :**

- Proposez un diagramme de classes modélisant le système de réservation de vols.
- Proposez un diagramme de packages adéquat pour ce système (regroupez les classes dans des packages, commentez les dépendances éventuelles entre packages).

Le diagramme des classes peut être réorganisé en packages, par exemple en séparant les classes `Client`, `Réservation`, `Passager` dans un package `Réservations`, et les classes `CompagnieAerienne`, `Vol`, `Aéroport`, `InfosEscale`, `Ville` dans un package `Vol`, afin de réduire la dépendance mutuelle et d'augmenter la modularité et l'évolutivité de l'application.

<!-- TODO: unclear in source, verify against original PDF (Exercice 1) — the class diagram attributes/associations (Client, CompagnieAerienne, VolGenerique, Vol, Aéroport, Réservation, Passager, InfosEscale, Ville) and the package diagram are rendered as diagram images in the slides; the extracted text is fragmentary OCR of those images and is not transcribed here as prose to avoid inventing structure — refer to the PDF viewer tab for the diagrams themselves -->

## Exercice 2

1. Un composant de gestion d'un élevage de chevaux fournit une interface pour la gestion des chevaux et une interface pour la gestion des ventes. Par ailleurs, il requiert un composant de base de données.

   Représentez ce composant.

2. Le système d'information d'élevage de chevaux est réalisé par assemblage des composants suivants : les composants `FenêtreGestionChevaux` et `FenêtreGestionVentes` gèrent respectivement à l'écran une fenêtre consacrée à la gestion des chevaux et à la gestion des ventes de chevaux. Le composant `SystèmeBaseDonnées` est un système de base de données.

   Donner le diagramme de composants pour ce système.

3. L'architecture matérielle du système d'information d'élevage de chevaux : elle est basée sur un serveur et trois postes clients passifs. Ces derniers sont connectés au serveur par des liens directs. Le serveur contient plusieurs artefacts :
   - un exécutable (`.exe`), forme physique du composant de gestion de la base de données ;
   - un deuxième exécutable chargé de la gestion des chevaux ;
   - un troisième exécutable chargé de la gestion des ventes ;
   - une bibliothèque partagée (`.dll`) de gestion des machines des différents utilisateurs.

   Donner le diagramme de déploiement combiné composants pour ce système.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/acoo-td4.pdf" />

</TabItem>
</Tabs>
