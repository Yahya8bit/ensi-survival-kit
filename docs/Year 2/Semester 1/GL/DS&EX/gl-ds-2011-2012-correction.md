---
sidebar_position: 2
title: Devoir Surveillé 2011/2012 (Corrigé)
sidebar_label: DS 2011/2012 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Devoir Surveillé — Génie Logiciel (Corrigé)

*Université de la Manouba — ENSI — Niveau : II2 — Date : samedi 17 mars 2012 — Durée : 2H — Documents non autorisés — Barème probable : 7 - 13 — Enseignants : N. Bellamine, L. Jemni Ben Ayad, H. Benali, N. Ben Yahia, R. Dahmen, S. Trabelsi*

*Répondez directement sur les feuilles de réponses. La précision, la consistance et la clarté seront appréciées.*

<!-- TODO: unclear in source, verify against original PDF — this document is an answer sheet (feuille de réponses) with handwritten checkmarks (X) and blank justification lines rather than a fully-written correction; several sub-questions (diagrams, free-text justifications) have no recoverable text content in the source extraction and are marked below. -->

## Étude de cas : Laboratoire de recherche scientifique

Un laboratoire de recherche scientifique est une structure composée d'un ensemble de membres : un directeur de laboratoire, des chercheurs et des agents (secrétaires, ingénieurs, techniciens). Un chercheur peut être un docteur (qui joue le rôle d'encadrant d'autres jeunes chercheurs), un doctorant, ou un stagiaire de master. Ces chercheurs sont souvent structurés sous forme d'équipes qui peuvent se partager des diverses ressources (équipements, locaux, documents, …). En plus d'un travail individuel, les chercheurs se rencontrent et collaborent : parmi les activités quotidiennes d'un chercheur nous relevons principalement :

- organisation de réunion avec des collègues,
- discussion de problématiques de recherche avec les collègues,
- publication d'articles scientifiques où typiquement un ou plusieurs chercheurs travaillent ensemble pour organiser leurs idées, les rédiger et devenir co-auteurs pour une publication commune,
- co-encadrement scientifique d'étudiants chercheurs,
- élaboration et gestion de projets nationaux et internationaux.

Chaque année, au troisième trimestre, le directeur d'un laboratoire de recherche exprime les demandes de moyens (pour l'acquisition de livres, fournitures, budgets pour les missions, …) pour l'année à venir auprès de leur direction scientifique. Nous supposons que cette activité sera effectuée via un système dédié, que nous désignons par « ALLOC ». Une demande porte sur les moyens humains et sur les moyens financiers. Il convient seulement de prévoir une interface permettant de récupérer les informations après saisie. Après intégration des données saisies dans le système, celles-ci doivent pouvoir être consultées par les personnes qui sont chargées de leur exploitation. Chaque demande est étudiée par la direction scientifique à laquelle le laboratoire est rattaché. Après cette étude et compte tenu des moyens disponibles, les directions scientifiques procèdent à l'attribution des moyens humains et financiers pour chaque structure de recherche (unités ou laboratoire). Ces attributions sont en fait à considérer comme des propositions tant que l'arbitrage de la direction générale n'a pas été rendu. Chaque année des cadrages sont fixés par la direction générale pour chaque direction scientifique et chaque type de moyens. Ces cadrages sont saisis par le coordonnateur. Après arbitrage par la direction générale, les cadrages peuvent éventuellement être ajustés.

Les propositions d'allocation de moyens des directions scientifiques font ensuite l'objet d'une consolidation générale par un coordonnateur afin de soumettre ces propositions à l'arbitrage de la direction générale. Un certain nombre de moyens ne peuvent être attribués que si le directeur général a donné son accord. Ce dernier doit être enregistré dans le système par le coordonnateur. Les moyens arbitrés doivent être communiqués aux unités à l'aide de courriers produits automatiquement et chaque directeur scientifique notifie à ses laboratoires les décisions d'allocation de moyens pour l'année à venir.

## Partie 1 : Questions de réflexion (3,5 pts)

*Choisir LA bonne réponse tout en la justifiant (toute réponse non justifiée ne sera pas notée) — 0,5/question × 7 : 0,25 réponse + 0,25 bonne justification, 0 s'il n'y a pas de justification (quelle que soit la réponse).*

**1.** Les modèles de processus sont qualifiés d'« agile » parce qu'ils :

A) éliminent la nécessité d'une documentation lourde
B) mettent l'accent sur la maniabilité et l'adaptabilité
C) évitent la perte de temps de développement dans la planification des activités
D) se basent de manière intensive sur la création de prototypes

<details>
<summary>Correction</summary>

**Réponse : B**

</details>

**2.** Le point de vue agile de la communication et de la collaboration avec les clients est applicable à toutes les pratiques du génie logiciel.

A) Vrai&nbsp;&nbsp;&nbsp;B) Faux

<details>
<summary>Correction</summary>

**Réponse : A**

</details>

**3.** Les ingénieurs en génie logiciel collaborent avec les clients afin de définir, lequel des énoncés suivants ?

A) des scénarios d'utilisation « visibles » par les clients
B) les éléments importants du logiciel
C) les entrées et les sorties du système
D) toutes ces réponses

<details>
<summary>Correction</summary>

**Réponse : D**

</details>

**4.** Les modèles d'analyse peuvent décrire le logiciel en termes de :

A) architecture, interface, composant
B) coût, risque, planning
C) donnée, fonction, comportement
D) aucune de ces réponses

<details>
<summary>Correction</summary>

**Réponse : C**

</details>

**5.** Les équipes utilisant des processus logiciels agiles ne créent jamais de modèles.

A) Vrai&nbsp;&nbsp;&nbsp;B) Faux

<details>
<summary>Correction</summary>

**Réponse : B**

</details>

**6.** Les diagrammes d'activité UML de la phase d'analyse sont utiles dans la modélisation des éléments relatifs :

A) au comportement d'une opération
B) aux classes
C) aux flux
D) aux scénarios

<details>
<summary>Correction</summary>

**Réponse : D**

</details>

**7.** Lequel de ce qui suit n'appartient pas à un modèle d'analyse orientée objet ?

A) des éléments de comportement
B) des éléments relatifs à une classe
C) les éléments relatifs aux données
D) des éléments basés sur les scénarios

<details>
<summary>Correction</summary>

**Réponse : C**

</details>

### Cycle de vie d'un logiciel

**1.** Les diagrammes de séquence peuvent être utilisés dans plusieurs étapes du processus de développement d'un logiciel. Préciser comment les diagrammes de séquences sont utilisés dans chacune de ces étapes. (0,5pt)

<details>
<summary>Correction</summary>

- Diagramme de séquences système pendant la phase de spécification : acteurs + système comme boîte noire (0,25)
- Diagramme de séquences de la phase de conception : interactions entre les objets, instances des classes du diagramme de classes du système — en option, diagramme de séquences pour les cas de test (0,25)

</details>

**2.** Expliquer la différence entre le modèle en V et la méthode Scrum en vous basant sur deux critères de comparaison clairs et précis à définir. (1,5pt = 0,25pt/case)

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page — tableau comparatif (critères de comparaison / modèle en V / méthode Scrum) laissé vierge dans la feuille de réponses source. -->

</details>

**3.** Considérons le cycle de vie en V. Que signifient les flèches horizontales ? (0,5pt)

<details>
<summary>Correction</summary>

Les docs de tests.

</details>

**4.** Considérons la méthode Scrum, rappeler les différents rôles et les artéfacts produits pour une telle méthode. Expliquer par un schéma le cycle de développement de cette méthode. (1pt)

<details>
<summary>Correction</summary>

- Les rôles (0,25)
- Les artéfacts (0,25)
- Le cycle de développement — schéma (0,5)

<!-- TODO: unclear in source, verify against original PDF page — contenu détaillé (rôles, artéfacts) et schéma du cycle Scrum non présents dans l'extraction (réponses manuscrites/diagramme). -->

</details>

## Partie 2 : Problème (13 pts : 3 – 2 – 2,5 – 3 – 2,5)

**Question 1 (3pts).** Traduire TOUT l'énoncé de description du cas en élaborant un diagramme de classes.

*Barème : -0,25 par erreur dans le type des associations ; -0,25 par classe n'appartenant pas au système ; -0,25 par erreur dans les cardinalités ; -0,25 si le nombre de classes est inférieur au nombre minimal de classes.*

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page — diagramme de classes attendu, non reproductible depuis le texte extrait (schéma/image). -->

</details>

**Question 2 (2pts).** Identifiez parmi la liste suivante les acteurs du système « ALLOC ». Il s'agit d'encercler l'acteur et de préciser son type (principal ou secondaire), et de donner une justification dans le cas où le nom n'est pas retenu comme acteur. *(par ligne : correct +0,25, réponse fausse -0,25)*

<details>
<summary>Correction</summary>

| Nom | Type |
|---|---|
| Chercheur (CH) | — |
| Directeur de laboratoire (DL) | Principal |
| Calendrier (Ca) | — |
| Directeur scientifique (DS) | Principal |
| Coordonnateur (Co) | Principal |
| Site web laboratoire (Swl) | — |
| Stagiaire (St) | — |
| Direction générale (DG) | Principal |

</details>

**Question 3 (2,5 pts).** Spécification des besoins :

a. Sélectionner les besoins du système « ALLOC ».
b. Associer à chaque type de besoin une ou plusieurs des 4 propositions suivantes : BF (besoin fonctionnel), BNF (besoin non fonctionnel), MAL (besoin mal exprimé donc non vérifiable), Aucun (besoin inadéquat — ce n'est ni un besoin fonctionnel, ni un besoin non fonctionnel).
c. Reformuler tout besoin mal exprimé afin de le rendre vérifiable.

<details>
<summary>Correction</summary>

Besoins du sous-système ALLOC (0,25 par ligne) :

| Besoin | Retenu | Type |
|---|---|---|
| Le logiciel ALLOC doit être développé de manière à être utilisable par des utilisateurs inexpérimentés | Oui | BF, BNF, MAL |
| Le système doit permettre la récupération rapide des informations après leur saisie | Oui | BF, BNF |
| Le système doit être capable d'éditer les fiches de demande | Oui | BF, BNF |
| Le système doit être ergonomique | Oui | BF, BNF, MAL |
| Le système doit être fiable | Oui | BF, BNF, MAL |
| Le système permet la gestion des documents des chercheurs | Non | — |

<!-- TODO: unclear in source, verify against original PDF page — les colonnes de reformulation des besoins mal exprimés (c.) sont laissées vierges dans la feuille de réponses source. -->

</details>

**Question 4 (3 pts).** Nous nous proposons de considérer les cas d'utilisation de l'application ALLOC en question. Indiquez parmi les actions suivantes celles qui peuvent être retenues comme cas d'utilisation de l'application en question. Encerclez l'action et justifiez brièvement votre réponse. *(correct 0,25, non -0,25)*

1. Saisir la demande de moyens
2. Commander livres
3. Éditer les fiches de demande
4. Envoyer courrier aux unités
5. Proposer les attributions de moyens
6. Notifier les moyens arbitrés
7. Gérer les moyens proposés
8. Rédiger articles scientifiques
9. Faire arbitrage des moyens
10. Gérer cadrage
11. S'authentifier
12. Imprimer fiches de demande

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page — quelles actions sont encerclées/retenues comme cas d'utilisation n'est pas récupérable depuis le texte extrait (annotations manuscrites). -->

</details>

**Question 5.**

a. Représentez le diagramme de cas d'utilisation du système en question comportant uniquement les acteurs et les cas d'utilisation retenus dans les questions précédentes. Votre diagramme devra si nécessaire utiliser les stéréotypes `<<include>>` et/ou `<<extend>>`. (0,5pt)

b. Concernant le cas d'utilisation « proposer les attributions de moyens », imaginez un scénario relatif à ce cas et décrivez-le sous forme d'un diagramme de séquence système. (1pt — loop 0,25, acteur+système 0,25, messages 0,5)

c. Représentez le diagramme d'activité du système d'allocation des moyens. (1pt)

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF pages — diagrammes attendus (cas d'utilisation, séquence système, activité) non reproductibles depuis le texte extrait (schémas/images). -->

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/gl-ds-2011-2012-correction.pdf" />

</TabItem>
</Tabs>
