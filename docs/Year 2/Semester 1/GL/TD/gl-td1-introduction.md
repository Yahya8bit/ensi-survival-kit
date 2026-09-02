---
sidebar_position: 1
title: TD1 : Introduction au génie logiciel (avec corrigé)
sidebar_label: TD1 - Introduction
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD1 : Introduction au Génie Logiciel

*ENSI — Matière : Génie Logiciel I — Classes : II.2 — A-U : 2023-2024*

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments in the correction) — best-effort reconstruction below, see task summary -->

## Exercice 1 : Questions de réflexion

**1.** Quels sont les enjeux du génie logiciel ?

<details>
<summary>Correction</summary>

Développer un logiciel de qualité en respectant les contraintes de coût et de délais.

</details>

**2.** Corrigez les phrases incorrectes :

**a.** Le code source d'un logiciel propriétaire est disponible.

<details>
<summary>Correction</summary>

Le code source d'un logiciel propriétaire est **non** disponible.

</details>

**b.** L'inadéquation d'un logiciel signifie que son développement a dépassé le budget prévu.

<details>
<summary>Correction</summary>

L'inadéquation d'un logiciel correspond au non-respect des spécifications du cahier des charges ou des besoins des utilisateurs.

</details>

**c.** La non fiabilité signifie que le logiciel est souvent en panne.

<details>
<summary>Correction</summary>

Non : le logiciel doit fonctionner sans erreur tout d'abord. Ensuite, pour qu'il soit caractérisé de fiable, il faut qu'il ait l'aptitude à fonctionner dans des conditions anormales sans dysfonctionnements et sans erreurs.

</details>

**d.** Le génie logiciel s'appuie uniquement sur les méthodes qui définissent les techniques à utiliser pour son développement.

<details>
<summary>Correction</summary>

Non : le GL doit aussi prévoir et se doter des outils, en plus des méthodes et des techniques. On vise par outils les outils CASE (Computer Aided Software Engineering — outils d'aide au développement logiciel), qui sont classés comme :

i. outils Upper CASE, pour les outils d'analyse et de conception, comme PowerAMC et Rational Rose ;
ii. outils Lower CASE, comme les outils de développement JEE et Netbeans ;
iii. outils complets, comme Visual Studio, qui permettent l'analyse, la conception et le développement.

</details>

**3.** Quelle est la différence entre GL qualitatif et GL quantitatif ?

<details>
<summary>Correction</summary>

Le GL quantitatif est le GL qui estime les durées et les coûts, et le GL qualitatif est celui qui définit les méthodes et les standards pour s'assurer que nous obtenons des logiciels de qualité.

</details>

## Exercice 2

Choisissez la (ou les) bonne(s) alternative(s) tout en justifiant brièvement votre réponse :

**1.** Un logiciel :

a. est un ensemble d'entités assurant le fonctionnement d'un processus informatique.
b. est un ensemble de programmes, données et documents.
c. est un cahier des charges et un produit livrable.
d. possède un cycle de vie et un cycle de développement.
e. doit répondre à tous les critères de qualité (performance, robustesse, réutilisabilité,…).

<details>
<summary>Correction</summary>

- a. Il manque l'exécutable et la documentation.
- b. **OK**
- c. Il manque la documentation et les données.
- d. **OK**
- e. Non, car ils peuvent être contradictoires.

</details>

**2.** Pour le développement de logiciels personnalisés (sur mesure) :

a. La spécification de ce que le logiciel doit faire est détenue par le développeur du logiciel.
b. Les décisions de modification (changement) sur les logiciels sont faites par le développeur.
c. La spécification de ce que le logiciel doit faire est détenue par le client du logiciel.
d. Les décisions de modification (changement) sur les logiciels sont faites par le client du logiciel.
e. Toutes ces réponses.

<details>
<summary>Correction</summary>

a. NON — b. NON — c. **OUI** — d. **OUI** — e. NON

</details>

**3.** Les activités de gestion de projet sont moins importantes que les activités techniques dans le cycle de vie d'un logiciel.

<details>
<summary>Correction</summary>

NON, les deux activités sont très importantes.

</details>

## Exercice 3 : Qualité logicielle

Nous nous proposons d'étudier un ensemble de situations dans lesquelles des équipes de développement de logiciels sont amenées à choisir la stratégie de développement la plus adaptée pour le développement du logiciel demandé. Entre autres, chaque équipe doit également se décider des critères de qualité à prioriser.

**Situation 1** : Une application web pour un système bancaire, qui permet à ses utilisateurs de profiter de tous les services bancaires en ligne sans exception. Le client demande une première version de l'application avec les services qu'il juge les plus urgents, à savoir la consultation du solde et des transactions effectuées dans une période choisie par l'utilisateur et les virements bancaires.

**Situation 2** : Un système de contrôle de trafic aérien avec un cahier des charges bien précis qu'il faut respecter à la lettre.

**Situation 3** : Un logiciel qui permet à ses utilisateurs de visualiser et traiter les images et vidéos numériques quel que soit leur format. Différents scénarios d'utilisation ont été décrits par le client. Un diagramme UML de cas d'utilisation a été élaboré et l'équipe compte continuer à utiliser UML pendant tout le cycle de développement.

**Situation 4** : Une petite application qui va complètement automatiser le travail du chargé de la gestion des réclamations des clients après la vente. Ce dernier est sollicité périodiquement pour faire part de son avis sur la partie des fonctionnalités développées.

**Travail à faire** : en tant que membre de chaque équipe, vous êtes appelé à dégager les critères de qualité logicielle (validité, fiabilité, robustesse, extensibilité, réutilisabilité, vérifiabilité, compatibilité, portabilité, interopérabilité, efficacité, facilité d'emploi, convivialité, réparabilité, intégrité) qu'il faut prioriser pour chaque type de système, tout en justifiant votre réponse. Indiquez également, pour chaque situation, la stratégie/le modèle de développement le plus adapté.

<details>
<summary>Correction</summary>

**Critères de qualité à prioriser**

**Situation 1** (application bancaire) :

- Validité : OUI, il faut respecter le cahier des charges pour être sûr d'avoir fait tous les services.
- Fiabilité : peut-être, si certains clients se connectent à partir de systèmes ou de navigateurs pas communs, mais normalement il n'y a plus de problème.
- Robustesse, réutilisabilité, efficacité : ce sont des critères qui sont recommandés indépendamment de l'application, car les clients peuvent devenir plus nombreux.
- Extensibilité : les services dans l'énoncé sont dits « sans exception », donc il faut prévoir l'extensibilité.
- Vérifiabilité, compatibilité, portabilité, interopérabilité, réparabilité : pas vraiment.
- Facilité d'emploi et convivialité : OUI, car destiné aux clients qui ne sont pas informaticiens.
- Intégrité : OUI, car c'est une application web.

**Situation 2** (contrôle de trafic aérien) : il est possible d'opter pour les critères de vérifiabilité, intégrité, compatibilité, portabilité, efficacité et bien sûr validité et fiabilité. Il faut peut-être éviter les critères d'ergonomie et de facilité, car normalement ce sont des experts qui vont utiliser cette application.

**Situation 3** (traitement d'images/vidéos) : on peut reprendre les critères de facilité d'utilisation, d'ergonomie et d'efficacité, etc.

**Situation 4** (gestion des réclamations) : mêmes critères et justifications que la situation 1 (validité, extensibilité, réutilisabilité, efficacité, facilité d'emploi et convivialité, intégrité).

**Stratégie de développement**

- **Situation 1** : on peut utiliser le modèle incrémental. Aussi, c'est un développement d'une partie qui ne nécessite pas la connaissance de toute l'architecture du logiciel et ça doit être rapide. Donc on peut aller vers les méthodes agiles et donc SCRUM peut être recommandée.
- **Situation 2** : c'est critique et l'erreur doit être bien renseignée, donc la cascade. Il faut toujours rappeler que ce modèle est encore utilisé dans les domaines de l'aérospatiale et de l'aérien étant donné la criticité du domaine (à ne pas encourager pour des développements web ou mobile).
- **Situation 3** : c'est le Processus Unifié (PU), car c'est le cycle qui permet d'utiliser pleinement UML.
- **Situation 4** : implication avec le client, donc on peut opter pour une approche agile qui peut être SCRUM.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/gl-corrige-td1.pdf" />

</TabItem>
</Tabs>
