---
sidebar_position: 2
title: TD2 : Processus Logiciels (avec corrigé)
sidebar_label: TD2 - Processus Logiciels
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD2 : Processus Logiciels

*ENSI — Matière : Génie Logiciel — Classes : II.2 — A-U : 2023-2024*

## Exercice 1

**1.** À cause de l'ambiguïté de ses besoins, le client exige l'acceptation des modifications à n'importe quel moment du développement. Afin de répondre positivement au client, quel est le modèle de processus le plus adéquat que le chef d'équipe doit choisir pour ce projet ?

a) Incrémental
b) Cycle en V
c) SCRUM
d) KANBAN

**2.** Une entreprise souhaite réaliser un logiciel d'enseignement à distance. Un cahier des charges précis est donné. UML devra être utilisé comme langage de modélisation. Quel est le modèle de processus le plus adéquat que le chef d'équipe doit choisir pour ce projet ?

a) SCRUM
b) Cycle en V
c) Cascade
d) PU

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF — le corrigé du Q1 et Q2 (choix de réponse a/b/c/d) n'apparaît pas explicitement dans l'extraction du corrigé, qui ne fait que répéter l'énoncé des questions. Le corrigé développé de l'exercice 3 est en revanche disponible ci-dessous. -->

</details>

## Exercice 2

L'entreprise TradAdvance désire implanter des notions d'agilité dans son processus traditionnel de développement de logiciels. Vous êtes engagé(e) comme consultant(e) afin de les aider à comprendre les concepts fondamentaux des méthodes agiles. Dans le cadre des méthodes agiles, répondez à chacune des questions suivantes :

**1.** Quelle est la meilleure « unité de mesure » de la progression d'un projet ?

<details>
<summary>Correction</summary>

Le code qui fonctionne.

</details>

**2.** À quelle fréquence faut-il faire une nouvelle planification ?

<details>
<summary>Correction</summary>

Les itérations doivent être courtes (exemple pour SCRUM entre 2 et 4 semaines) ; à l'issue de chaque itération on peut revoir la planification selon l'avancement.

</details>

**3.** Faut-il faire participer le client tout au long du développement ?

<details>
<summary>Correction</summary>

Oui, le client est un **partenaire**.

</details>

**4.** Quelle est la taille optimale d'une équipe agile ?

<details>
<summary>Correction</summary>

Minimiser le nombre de développeurs, maximiser les compétences au sein de l'équipe.

</details>

## Exercice 3

Dans cet exercice, nous souhaitons aider les étudiants suivants à faire leurs choix méthodologiques pour réaliser leurs projets de fin d'études (PFE) :

1. Le projet de **Mohamed** consiste à développer un site web moyennant les outils MEAN Stack (une pile logicielle qui comporte les technologies MongoDB, Express.js, Angular et Node.js). Cet étudiant a une vision complète sur les besoins fonctionnels et les besoins techniques. Il doit développer son projet selon une approche itérative et incrémentale.
2. **Ahlem** doit valider d'abord la spécification, après elle doit livrer les fonctions essentielles de son projet. Le reste du logiciel sera produit composant par composant.
3. **Sami** est intégré dans une équipe de six personnes qui développe un jeu vidéo innovant pour un client qui a tendance à changer souvent d'avis. L'équipe a expliqué à l'étudiant qu'il faudra satisfaire le client et prendre en considération ses réclamations à tout moment. Chaque deux semaines, une version intermédiaire du jeu devra être réalisée.
4. **Malek** est intégré dans une équipe qui réalise un projet complexe dans le domaine du transport intelligent en se basant sur les diagrammes UML. À chaque bloc de temps, il doit livrer une version intermédiaire.
5. Le chef de projet de **Dorra** lui a fourni un cahier des charges précis et lui a expliqué qu'à priori tous les besoins sont clairs, sauf que le client a l'air d'avoir des doutes concernant quelques fonctionnalités. Dorra a été prévenue qu'elle doit préparer, à chaque activité du cycle de développement de son logiciel, les jeux de tests nécessaires pour corriger les anomalies engendrées.

**Travail à faire**

1. Parmi les cinq étudiants, indiquez qui peut passer directement à l'implémentation (pour lui, suivre un processus de développement est inutile). Justifiez.
2. Pour les autres étudiants, proposez pour chacun le meilleur processus de développement qu'il a intérêt à suivre. Justifiez.
3. Indiquez les projets des étudiants où l'usage de la technique de prototypage est bénéfique. Expliquez.
4. Dressez un tableau comparatif des différents processus choisis dans la question 2 selon deux critères à définir.
5. Pour chaque projet, donnez un exemple de risque que l'étudiant doit détecter et résoudre afin de mener à bien son PFE.
6. Donnez quatre conseils pratiques à ces étudiants qui peuvent les guider afin de (1) bien développer leurs logiciels et (2) faciliter la phase de maintenance.

<details>
<summary>Correction</summary>

**1. Qui peut passer directement à l'implémentation ?**

Réponse : aucun étudiant.

Justification : passer directement à l'implémentation sans suivre un processus de développement est une approche artisanale de développement qui peut engendrer beaucoup de risques : difficulté de communication avec le client (quand ? pourquoi ? le rôle du client ?), avec les autres membres de l'équipe de développement (ce que fait chacun ? à quel niveau ? définition d'objectifs communs, jargon commun, approche commune, priorités des tâches) ; la gestion du projet devient compliquée voire absente (un processus de développement nous apporte un guide méthodologique et nous rappelle à identifier et gérer les risques liés par exemple à la planification, la qualité, etc.).

**2. Meilleur processus pour chaque étudiant**

(Ces réponses ne sont pas les seules acceptables ; cela dépendra de la justification.)

- **Mohamed** : vision complète sur les besoins fonctionnels et techniques, approche itérative et incrémentale → **Incrémental**.
- **Ahlem** : doit valider d'abord la spécification, puis livrer les fonctions essentielles de son projet. Le reste du logiciel sera produit composant par composant → **Incrémental** après validation de la spécification, si le projet est décomposable en incréments suffisamment découplés, sinon **SCRUM**.
- **Sami** : jeu vidéo innovant pour un client qui change souvent d'avis, versions intermédiaires toutes les deux semaines → **SCRUM**.
- **Malek** : projet complexe basé sur les diagrammes UML, livraison de versions intermédiaires à chaque bloc de temps → **PU**.
- **Dorra** : cahier des charges précis, mais le client a des doutes sur certaines fonctionnalités ; jeux de tests à chaque activité → **Modèle en V**.

**3. Projets où le prototypage est bénéfique**

Ahlem et Dorra.

**5. Exemples de risques**

- Mohamed : les problèmes d'intégration surtout pour les derniers incréments.
- Ahlem : risque de ne pas pouvoir valider toutes les spécifications de façon claire et dans les délais.
- Sami : risque de ne pas pouvoir avancer convenablement s'il ne réussit pas à bien maîtriser son client qui change d'avis fréquemment.
- Malek : risque de donner une priorité à la documentation et ses mises à jour au détriment de l'avancement dans le développement.
- Dorra : clarification des doutes du client concernant quelques fonctionnalités.

**6. Quatre conseils pratiques**

- Planifier et respecter les délais.
- Choisir les critères de qualité les plus importants selon le logiciel à développer et s'assurer de les respecter.
- Valider et vérifier.
- Documenter.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/gl-corrige-td2.pdf" />

</TabItem>
</Tabs>
