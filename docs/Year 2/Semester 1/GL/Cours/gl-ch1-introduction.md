---
sidebar_position: 1
title: Chapitre 1 - Introduction au Génie Logiciel
sidebar_label: Ch1 - Introduction
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Génie Logiciel — II2-ENSI

*ENSI — I.I.2 — I. Dridi*

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments) — best-effort reconstruction below, see task summary -->

## Le métier de l'ingénieur logiciel

### L'ingénierie

On définit l'ingénierie comme étant le métier qui couvre l'étendue des activités d'un ingénieur, de la naissance du besoin d'un « objet » à la fin de son utilisation.

- Formalismes de représentation
- Utilisation des ressources techniques
- Maîtrise de la technologie
- Résultats de la recherche
- Pragmatisme de l'expérience
- Produits au goût du jour

### Motivations…

- Les applications logicielles sont de plus en plus complexes (besoins fonctionnels, environnements distribués, interopérabilité des langages et des plates-formes hétérogènes)
- Mutation technologique rapide : langages et environnements de développement, O.S.
- Exigences croissantes des clients et évolutions des besoins en cours de projet
- L'équipe de développement (souvent de grande taille) travaille à distance (moins de communication)

### Des objectifs ambitieux…

Face à cette complexité, on veut :

- Livrer des logiciels de bonne qualité en respectant les coûts et les délais
- Préparer et faciliter la maintenance et les extensions du système
- Simplifier le travail de l'équipe de développement (chef de projet, analyste, architecte, concepteur, programmeur, testeur du mainteneur)
- Travailler sur des parties individuelles du système en isolation tout en garantissant leur intégration

*La vie d'un logiciel ne se limite pas à la programmation !*

### Définition du Génie Logiciel

Le génie logiciel est l'ensemble des moyens techniques, industriels et humains qu'il faut réunir pour spécifier, construire, distribuer et maintenir des logiciels qui soient sûrs, conviviaux, évolutifs et économiques, au-delà de la seule activité de programmation.

*L'art et la manière de bien créer un bon logiciel.*

### Quels sont les enjeux du GL ?

1. Maitriser la complexité et le coût d'un développement de logiciel
2. Augmenter la probabilité de réussite d'un projet de développement de logiciel
3. Bien développer le bon logiciel

Bien développer : maitriser coût/délai/qualité. Bon logiciel : celui attendu par les utilisateurs.

### Objectifs du module

- Avoir un aperçu général sur le génie logiciel et comprendre la valeur ajoutée du génie logiciel
- Étudier les processus de développement des logiciels en utilisant des approches semi-formelles
- Appliquer et maitriser les étapes de développement semi-formel (études de cas)
- Apprendre à choisir et à appliquer : processus, approche, technique, outil, …

### Plan du module

1. Introduction au Génie Logiciel
2. Processus Logiciels
3. Analyse & Spécification des logiciels
4. Conception des logiciels
5. Tests des logiciels

### Références

- *Software Engineering*, Ian Sommerville, 10th Edition, 2015 — vidéos : http://iansommerville.com/software-engineering-book/videos/
- *Software Engineering - A Practitioners Approach*, Roger S. Pressman, 8th Edition, 2015

:::note Exercice
- Décrivez brièvement le sujet de votre stage d'été.
- Avant de vous lancer dans la programmation, par quelles étapes êtes-vous passés ?
- Est-ce que votre application est facilement maintenable (extensibilité, correction de bugs) ?
:::

---

# Chapitre 1 : Introduction au génie logiciel

## Plan du cours

1. Le logiciel
   - C'est quoi un logiciel ?
   - Quels sont les différents types des logiciels ?
   - Quelles sont les qualités d'un bon logiciel ?
2. Le génie logiciel (GL)
   - C'est quoi le GL ?
   - Pourquoi le GL ?
   - Quels sont les acteurs qui interviennent dans le GL ?
   - Quels défis devant le GL ?
3. Quiz

## Section 1 — Le logiciel

### 1.1 Définition du logiciel

Un logiciel (software) est un ensemble de :

1. **Instructions** (programmes informatiques, codes sources exécutables) : exécutés pour répondre aux besoins du client.
2. **Données** : manipulées et traitées par les programmes.
3. **Documents** : décrivent les programmes et les données (documents d'analyse, de spécification, de conception, rapport d'implémentation, manuel d'utilisation, d'installation, de configuration, de maintenance, les jeux de tests, …)

### 1.2 Typologie des logiciels

**1ère classification** : deux grandes catégories

- **Logiciels génériques** (Generic products) : des systèmes dédiés au grand public qui sont commercialisés et vendus à n'importe quel client qui souhaite les acheter.
- **Logiciels sur mesure** (Customized products) : des systèmes développés pour répondre à des besoins particuliers d'un client.

**2ème classification** :

- **Logiciels systèmes** : les systèmes d'exploitation, ex : Windows, Linux
- **Logiciels temps réels** : réponse aux événements dans un laps de temps limité et strict, ex : système de monitoring de la température
- **Logiciels de gestion** : ex : systèmes d'information, systèmes bancaires
- **Logiciels d'ingénierie** : modélisation et programmation, ex : Eclipse
- **Logiciels embarqués** : intégrés à un dispositif ou une machine, ex : système de freinage automobile, guidage automatique de train
- **Logiciels pour ordinateur personnel** : ex : calculatrice, calendrier, capture
- **Logiciels d'applications Web (Webapps)** : manipulables grâce à un navigateur Web, ex : moteurs de recherche, webmail, wiki, blogs, googleMap
- **Applications mobiles** : ex : OS Android, Windows Mobile
- **Logiciels d'intelligence artificielle** : ex : systèmes de robotique, système expert, reconnaissance des formes, les jeux

**3ème classification** :

- **Le logiciel libre (Open source)** : l'auteur met le code source du logiciel à la disposition de tous les utilisateurs désireux de le réutiliser ou d'y apporter des améliorations. Il se définit par 4 libertés :
  - Liberté 1 : la liberté d'exécuter le programme pour tous les usages.
  - Liberté 2 : la liberté d'étudier le fonctionnement du programme (l'accès au code source est une condition requise).
  - Liberté 3 : la liberté de redistribuer des copies.
  - Liberté 4 : la liberté de modifier le programme et de publier vos améliorations.

  :::note Remarque
  Le logiciel libre n'est pas nécessairement gratuit !
  :::

- **Le logiciel propriétaire** : soumis aux droits de son auteur qui peut interdire ou limiter l'utilisation à l'utilisateur suivant un contrat. Il est distribué uniquement sous forme binaire (sans source). Différents types de logiciels propriétaires :
  - **Les logiciels commercialisés** : des logiciels propriétaires payants.
  - **Les graticiels (freewares)** : des logiciels gratuits. L'auteur du logiciel rend disponible gratuitement son logiciel (exe), le code n'est pas accessible.
  - **Les partagiciels (sharewares)** : des logiciels propriétaires partiellement gratuits. Ceci donne l'occasion aux consommateurs et aux entreprises d'évaluer le logiciel avant de procéder à l'achat, tous en offrant une version d'essai gratuite et très limitée pour promouvoir leurs produits.

### 1.3 Qualités

Les qualités de logiciel peuvent être classifiées en deux types :

- **Externes** : observables par l'utilisateur
- **Internes** : concernent le développement du logiciel

Critères de qualité d'un bon logiciel : Validité, Fiabilité, Robustesse, Extensibilité, Réutilisabilité, Vérifiabilité, Compatibilité, Portabilité, Interopérabilité, Efficacité, Facilité d'emploi, Convivialité, Réparabilité, Intégrité.

- **Validité** ou conformité ou adéquation : aptitude d'un produit logiciel à remplir exactement les fonctions définies par le cahier des charges.
- **Fiabilité** : aptitude d'un logiciel à assurer de manière continue le service attendu, sans erreurs.
- **Robustesse** : aptitude d'un logiciel à fonctionner même dans des conditions anormales sans dysfonctionnements.
- **Extensibilité** ou évolutivité : facilité avec laquelle un logiciel se prête à sa maintenance.
- **Réutilisabilité** : aptitude d'un logiciel à être réutilisable en tout ou en partie (composants logiciels), dans de nouvelles applications.
- **Vérifiabilité** : facilité de préparation des procédures de test.
- **Compatibilité** : aptitude d'un logiciel de communiquer avec une autre application.
- **Portabilité** : facilité avec laquelle un logiciel peut être transféré sous différents environnements matériels et logiciels.
- **Interopérabilité** : facilité avec laquelle un logiciel peut coopérer et être combiné avec d'autres logiciels en passant par des standards.
- **Efficacité** ou Performance : utilisation optimale des ressources disponibles (mémoire, CPU...).
- **Utilisabilité** ou Facilité d'emploi : facilité d'utilisation et d'apprentissage.
- **Convivialité** ou Ergonomie : qualité d'un logiciel que les utilisateurs trouvent agréable et facile à utiliser.
- **Réparabilité** : correction facile des erreurs.
- **Intégrité** : aptitude d'un logiciel à protéger son code et ses données contre des accès non autorisés.

:::note Remarque
L'importance de ces critères de qualité variera selon la nature du projet de développement. Il est difficile d'optimiser tous ces critères car ils peuvent être parfois contradictoires — le choix de compromis doit s'effectuer en fonction du contexte. Les critères de qualité sont sujets à la loi de la diminution des gains (compromis) !
:::

## Section 2 — Le génie logiciel

### 2.1 La crise du logiciel

Prise de conscience dans les années 70, appelée la crise du logiciel :

- Coût de construction du logiciel plus important que celui de la construction du matériel
- Baisse significative de la qualité des logiciels

Cette crise du logiciel était principalement due à :

- **L'inadéquation** : le non respect des spécifications (trop de modifications)
- **Dépassement des délais** : logiciels souvent livrés en retard
- **Dépassement des coûts** : dépassement du budget prévu
- **La non fiabilité** : logiciels souvent en panne
- **Difficulté de maintenance** : complexe et coûteuse, trop de liens de communications et trop d'interrelations entre modules

**Inadéquation** — 1979, USA, Government Accounting Office, enquête sur un certain nombre de projets :

- 47% délivré, jamais utilisé
- 29% payé, non fourni
- 19% utilisé puis modifié ou abandonné
- 3% utilisé après quelques retouches
- 2% utilisé tel quel

**Dépassement des délais & coûts** — enquête dans les années 70 sur 100 programmes :

- délais dépassés de 52%
- budgets logiciels dépassés de 72%
- budgets matériels dépassés de 15%

Exemples de projets : l'OS-360 d'IBM fut livré en retard, nécessitait plus de mémoire que prévu, son coût dépassait les estimations et il comportait de nombreuses erreurs (années 60, Fred Brooks). Le développement d'un compilateur PL1 chez Control Data n'a jamais abouti (années 70).

**Non fiabilité** — enquête dans les années 70 sur 100 programmes : qualité insuffisante, 30 à 85 erreurs par k instructions.

Exemples de projets non fiables : sonde Mariner I vers Vénus perdue suite à une erreur d'un programme Fortran (1962). L'explosion de la fusée Ariane 5 (4 juin 1996) : due à un programme destiné à recalibrer les gyroscopes, un cas de figure initialement envisagé pour Ariane 3 mais depuis longtemps exclu des procédures de tir — l'erreur a été provoquée par un programme qui ne servait à rien. C'est l'une des erreurs informatiques les plus coûteuses de l'histoire.

**Difficulté de maintenance** — coût de la maintenance : 40% à 75% du budget global. Coût d'une modification : 1x à la définition, 1.5-6x au développement, 60-100x après installation.

Pour répondre à cette crise, on a essayé d'appliquer les méthodes connues de l'ingénieur au domaine du logiciel, pour établir des méthodes fiables. Il s'agit de se donner un cadre rigoureux pour :

- Guider le développement du logiciel, de sa conception à sa livraison.
- Contrôler les coûts, évaluer les risques et respecter les délais.
- Établir des critères d'évaluation de la qualité d'un logiciel.

*La naissance du Génie Logiciel.*

### 2.2 Définition

D'après la norme **IEEE 610.12** : « Le Génie Logiciel est l'application d'une approche systématique, disciplinée et quantifiable au développement, à l'exploitation et à la maintenance du logiciel ». C'est-à-dire, l'application de l'ingénierie au logiciel.

Discipline (= méthodes, techniques et outils) :

- basée sur le savoir (théorique)
- le savoir-faire (pragmatique)
- et le faire savoir (communication)
- pour produire (développement)
- de façon industrielle (taille, diffusion)
- des logiciels (= les produits) de qualité au meilleur prix

:::tip Analogie
Développer un logiciel c'est comme cuisiner :
- **Processus** = étapes de préparation d'un repas
- **Paradigme** = style de cuisine
- **Principes** = « Une sauce réussie est onctueuse. »
- **Techniques** = techniques culinaires pour faire les sauces, réussir les mayonnaises, etc.
- **Méthodes** = les recettes
- **Méthodologie** = livre de cuisine
- **Outils** = casseroles, bols, mixette, etc.
:::

Le génie logiciel est défini comme l'ensemble des processus, méthodes ou techniques et outils permettant la construction de systèmes informatiques répondant à des critères de qualité préalablement définis.

- **Processus** — Quoi ? Définissent les activités à mener. Exemples d'activités : spécification, conception, codage, installation, test, documentation.
- **Méthodes** — Comment ? Définissent les techniques à utiliser, s'appuient sur des processus. Exemples : méthode fonctionnelle, l'approche orientée objets, la méthode Merise.
- **Outils** — Avec quoi ? Assistent la mise en œuvre des méthodes, s'appuient sur des méthodes. Exemples : outils de modélisation, compilateurs et environnements de programmation, outils d'analyse de programmes et code, outils de tests, outils de documentation.

### 2.3 Objectifs du GL

Le génie logiciel vise à garantir que :

- La spécification répond aux besoins réels de ses clients ;
- Le logiciel respecte sa spécification ;
- Le logiciel est de bonne qualité ;
- Les coûts alloués de sa réalisation sont respectés ;
- Les délais de sa réalisation sont respectés.

Objectifs du génie logiciel : processus de développement / cycle de vie, plan de développement (planification), GL qualitatif, GL quantitatif — un besoin de coordination, communication et coopération.

### 2.4 Éthique du GL

Le comportement éthique implique non seulement le respect de la loi, mais aussi le respect d'un ensemble de principes moraux. Le génie logiciel implique des responsabilités plus larges que simplement la demande et l'application des compétences techniques. Les ingénieurs logiciel doivent se comporter d'une façon honnête et éthiquement responsable s'ils doivent être respectés comme des professionnels.

Les organisations ACM/IEEE ont accordé et signé un code d'éthique de développement des logiciels, huit principes liés au comportement et aux décisions prises par des ingénieurs logiciel professionnels. Exemples :

1. **Intérêt public** : les ingénieurs logiciel agiront en respect de l'intérêt public.
2. **Client et employeur** : les ingénieurs logiciel agiront d'une façon qui est dans les intérêts supérieurs de leur client et employeur, compatible avec l'intérêt public.
3. **Produit** : les ingénieurs logiciel assureront que leurs produits et les modifications liées respectent les normes professionnelles.
4. **Jugement** : les ingénieurs logiciel maintiendront l'intégrité et l'indépendance dans leur jugement professionnel.

### 2.5 Les acteurs du GL

Élément clef : la communication. Une personne peut assumer plusieurs rôles ; plusieurs personnes peuvent assumer un même rôle.

**Les acteurs :**

- **Maître d'ouvrage** : représentant du client, promoteur du projet (il fixe les objectifs).
- **Maître d'œuvre** : coordinateur (il est responsable des résultats).
- **Sous-traitants / contractants** : réalisent une partie du projet correspondant à leur compétence, chargés de la réalisation de sous-ensembles.

**La maîtrise d'ouvrage (MOA)** : c'est l'entité porteuse du besoin, définissant l'objectif du projet, son calendrier et le budget consacré à ce projet. Le résultat attendu du projet est la réalisation d'un produit, appelé ouvrage. Elle regroupe : le maître d'ouvrage, les experts du métier, les utilisateurs, les groupes de validation.

Le maître d'ouvrage est le propriétaire de l'application qui est réalisée. Il est le donneur d'ordre et met en place les financements nécessaires. Rôle :

- Assurer la conduite générale du projet (coût, temps, …)
- Veiller au respect des objectifs généraux du projet
- Produire l'expression des besoins
- Gérer les enveloppes financières
- Valider les documents relatifs au projet ainsi que les maquettes et les prototypes

**Les utilisateurs** ne participent pas au management de projet mais ils sont finalement les vrais juges de la qualité des produits livrés. Plusieurs niveaux d'utilisateurs :

- L'utilisateur final utilise l'application quotidiennement. Il apporte les besoins d'ergonomie et d'organisation de son poste de travail.
- Le responsable du service utilisateur donne son avis sur les choix organisationnels.
- L'utilisateur de niveau hiérarchique supérieur définit les objectifs stratégiques.

**La maîtrise d'œuvre (MOE)** : entité responsable de la réalisation de l'application pour la maîtrise d'ouvrage. Elle regroupe : le maître d'œuvre, l'équipe projet (qui peut regrouper de nombreuses compétences si le projet est complexe).

Le maître d'œuvre est la personne ou l'entité choisie par le maître d'ouvrage pour la réalisation d'un projet dans les conditions de délais, de qualité ainsi que de coûts fixés conformément à un contrat. Tâches :

- Garantir la qualité des produits finis
- Affecter les moyens sur le projet
- Assurer le suivi contractuel avec le maître d'ouvrage

**Les sous-traitants** : pour la réalisation de certaines tâches du projet, le maître d'œuvre peut faire appel à une ou plusieurs entreprises externes lorsqu'il ne possède pas en interne les ressources nécessaires (chaque entreprise est appelée sous-traitant ou prestataire). Chaque sous-traitant réalise un sous-ensemble du projet directement avec le maître d'œuvre mais n'a aucune responsabilité directe avec le maître d'ouvrage.

**Des équipes de développement diversifiées** : utilisateur, architecte solution, chef de projet, développeur, testeur.

Le chef de projet désigne la personne retenue par le maître d'œuvre chargée du bon déroulement du projet. Il est responsable de la mise en œuvre du projet en respectant (dans le cadre d'un contrat avec la maîtrise d'œuvre) les délais, les coûts, les exigences de qualité. Il doit gérer au mieux les ressources humaines et matérielles qui sont affectées sur le projet.

**Les qualités d'un chef de projet** — « la perle rare » : imagination, raisonnement, savoir-faire, expertise, curiosité, sensibilité, écoute, ouverture d'esprit, communication, relationnel, motivation, influence, solidarité, responsabilité, synthèse, efficacité, délégation, direction, mobilisation, autonomie, confiance, créativité, méthodologie, initiative, capacité à défendre une idée, capacité d'interpellation.

L'équipe de développement englobe :

- **L'analyste** : rédige les spécifications fonctionnelles et non fonctionnelles de l'application.
- **L'architecte** : propose les architectures logicielle et matérielle et identifie les besoins en composants et frameworks.
- **Le concepteur** : propose la conception détaillée.
- **Le développeur** : implémente les services décrits dans les spécifications fonctionnelles, en tenant compte de plusieurs facteurs (architecture applicative, frameworks techniques et règles de développement).
- **Le testeur** : prépare les jeux de test et évalue le système avec et/ou sans exécution du code.
- **Le qualiticien** : définit et met en application les dispositions d'assurance qualité formalisées dans le plan d'assurance qualité, et définit les actions correctives si les dispositions ne sont pas appliquées.

### 2.6 Les défis devant le GL

- Hétérogénéité des plateformes
- Délivrance (respecter les termes et la qualité à la fois)
- Confiance des usagers
- Responsabilité professionnelle et éthique (surtout la confidentialité)
- Développement par et pour la réutilisation
- Évolution technologique
- Changements sociaux et économiques

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/gl-ch1-introduction.pdf" />

</TabItem>
</Tabs>
