---
sidebar_position: 2
title: Chapitre 2 - Processus Logiciels
sidebar_label: Ch2 - Processus Logiciels
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 2 : Processus Logiciels

*Cours « Génie Logiciel » Niveau II2 — AU: 2023/2024*

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments) — best-effort reconstruction below, see task summary -->

## Plan

1. Introduction
2. Définitions
3. Activités du cycle de vie
4. Modèles de processus
   - Modèles Classiques
   - Modèles Agiles
   - Modèles orientés objet

## 1. Introduction

- Dans la réalisation d'un programme simple, fait par une personne, on suit généralement un ensemble d'étapes : l'analyse du problème, l'écriture de l'algorithme, le codage, la mise au point.
- Un processus de développement plus élaboré et plus rigoureux doit être mis en place pour le cas de systèmes de taille importante et développés par plusieurs personnes.
- Pour obtenir un logiciel de qualité, il faut en maîtriser le processus de développement.

## 2. Définitions

- **Processus** : ensemble d'activités coordonnées et contrôlées dont le but est de créer un produit.
- L'ordre et la manière d'enchaîner les étapes d'un développement est le processus de développement.
- Un processus décrit 2 choses importantes :
  - Les activités (étapes) (= quoi ?)
  - L'enchaînement des activités (= quand ?)
- **Cycle de développement logiciel** : est aussi appelé processus de développement logiciel : processus qui conduit à la production d'un logiciel.
  - Il commence avec la décision de développer un logiciel et se termine avec la livraison du logiciel et son installation.
  - Le cycle de développement est la partie du cycle de vie d'un logiciel consacrée au développement à proprement parler.

### Approche traditionnelle

Enchaînement : Pré-Analyse (Pourquoi ?) → Analyse (Quoi ?) → Conception (Comment ?) → Implémentation → Test → Maintenance.

- Pré-analyse : Non ⇒ Abandon ; Oui ⇒ Cahier des charges du Projet.
- Cahier des Charges → Découpage en modules → Développement → Code → Logiciel opérationnel.

Cycle de développement du logiciel = `{ Avant-projet, Développement }` ; Cycle de vie du logiciel = `{ Avant-projet, Développement, Exploitation, Maintenance & Retrait }`, encadrés par la Planification/Pilotage/Suivi et la Gestion de qualité.

## 3. Activités du cycle de vie

Initiation du projet → Étude préalable → Analyse → Conception → Implémentation → Tests → Installation → Maintenance & Assistance → retrait, avec en transverse : Vérification et Validation (V&V), Gestion des configurations, Documentation, Évaluation.

### Activités d'un processus

Les activités d'un processus sont souvent décrites en termes de :

- Entrées de l'activité (matière première)
- Sorties de l'activité (résultat)
- Intervenants et rôles (qui ?)
- Description de l'activité (quoi ? — quel est le problème à traiter ?)
- Standards, guides, « best practices » à appliquer (comment ?)

### Étude préalable

L'objectif est de répondre essentiellement aux questions suivantes :

- Pourquoi a-t-on besoin du logiciel ?
- Y a-t-il de meilleures alternatives ?
- Y a-t-il un marché pour le logiciel ?
- Quels moyens faut-il mettre en œuvre ?

Les tâches effectuées :

- Dresser un état de l'existant et analyser ses forces et faiblesses ;
- Identifier les besoins de l'utilisateur ;
- Formuler des solutions potentielles et étudier la faisabilité.

Document produit : cahier des charges du projet.

### Analyse des besoins

- **Objectif** : répondre à la question quoi ? Ce que le logiciel devra faire ?
- **Entrée** : cahier des charges du projet.
- **Tâches** : analyse des besoins de l'utilisateur ; spécification du logiciel à réaliser.
- **Sortie** : cahier des charges du logiciel ; document d'analyse et de spécification (spécifications globales du système & spécifications des sous-systèmes).

### Conception

- **Objectif** : répondre à la question comment ? Ébauche de plusieurs variantes de solutions, comparaison et choix de celle qui offre le meilleur rapport entre coûts et avantages.
- À la fin de cette étape, on doit disposer d'un modèle de solution complet, cohérent, maintenable et testable.
- Se compose de deux phases : conception globale ou architecturale, conception détaillée.

#### Conception globale

- Processus durant lequel on doit IMAGINER, PROPOSER une architecture pour satisfaire les spécifications (objectifs et contraintes).
- Décomposition en modules, mise en évidence des frontières entre ces modules, structuration de l'ensemble.
- Recherche de plusieurs solutions, comparaison et choix entre les différentes alternatives de conception.
- À la fin de cette étape on doit disposer d'un modèle : COMPLET, COHÉRENT, MAINTENABLE, TESTABLE.
- Entrée : documents de spécification.
- Tâches : trouver une solution pour réaliser le logiciel ; définir l'architecture du logiciel (composants, interfaces entre les composants).
- Sortie : architecture du logiciel à réaliser ; document de conception globale.

#### Conception détaillée

- Étape qui achève la conception globale, sur le plan ALGORITHMIQUE et STRUCTURATION de DONNÉES, jusqu'à un niveau satisfaisant pour permettre le CODAGE.
- Principales activités : description précise des traitements, des données et des interfaces de chaque module ; résolution des algorithmes.
- Entrée : document de conception globale.
- Tâches : raffiner la décomposition jusqu'à aboutir à des composants élémentaires ; détailler chaque composant élémentaire.
- Sortie : description détaillée de chaque composant (interface, algorithmes) ; document de conception détaillée.

### Implémentation

- **Entrée** : document de conception détaillée.
- **Tâches** : transformation des descriptions des composants en code, écrit dans un langage de programmation.
- **Sortie** : composants logiciels compilés/interprétés.

### Tests

Durant cette phase, les composants du logiciel sont évalués et intégrés ainsi que le logiciel lui-même. Phase généralement subdivisée en trois phases :

- **Tests unitaires** : tests individuels des composants.
- **Tests d'intégration** : assemblage progressif des composants, tests des composants assemblés.
- **Tests du système** : test en vraie grandeur du système complet.

Sortie : rapports de tests.

### Installation

- **Entrée** : logiciel assemblé.
- **Tâches** : installer le logiciel chez le client, dans son environnement d'exploitation ; effectuer les tests de réception en utilisant un dossier de validation ; rendre le logiciel opérationnel sur le site du client.
- **Sortie** : logiciel installé ; fourniture des documents suivants : manuel d'installation, manuel d'exploitation.

### Vérification et Validation (V&V)

- V&V englobe tous les processus qui permettent de s'assurer que le logiciel correspond bien à son cahier des charges et répond bien aux besoins de l'utilisateur.
- **Vérification** : le fait d'établir la cohérence : « Est-ce que nous construisons bien le produit ? » Vérification de toutes les étapes de développement et les éléments fournis (code, rapports, manuels, documentation, jeux de tests, etc.).
- **Validation** : le fait d'établir l'utilité : « Est-ce que nous construisons le bon produit ? » Vérification du respect des spécifications du logiciel et des besoins du client.
- Tester est l'activité de V&V la plus utilisée.

### Documentation

C'est l'enregistrement de tout ce qui pourrait être connu à propos d'un système :

- Matérialise l'avancement des travaux ;
- Enregistre toute trace de toute prise de décision ;
- Support de communication entre les différents acteurs ;
- Tâche consommatrice de ressources, à planifier.

Quelques documents courants : cahier des charges, calendrier du projet, plan de test du logiciel, plan d'assurance qualité, manuel utilisateur, code source, rapport des tests.

### Gestion de la configuration

- La documentation du développement et le logiciel lui-même sont constitués d'un grand nombre d'éléments qui évoluent tout au long du cycle de vie (code, tests, documentation, etc.).
- Le but de la gestion de la configuration est de maîtriser cette évolution.
- Il vaut mieux utiliser un outil de gestion de la configuration : identifier et archiver les éléments de la configuration ; tracer et archiver les changements dans la configuration ; identifier et archiver les versions de la configuration ; gérer le travail concurrent à plusieurs développeurs sur les éléments de la configuration.

La gestion de la configuration rassemble l'ensemble des règles et des moyens destinés à gérer et garantir la cohérence de la configuration (i.e. des différents logiciels, sous-ensembles logiciels, modules, composants et documents) à travers les évolutions.

- Seules les versions de références sont prises en compte.
- Respect des relations entre documents et éléments logiciels.

Le processus de gestion de configuration :

- Activités : définir les composants de la configuration et toutes leurs relations ; suivre les évolutions dans le temps de la configuration ; archiver les états livrés successifs ; s'assurer que chacun des états livrés est cohérent et complet.
- 4 fonctions principales.

### Maintenance

La maintenance du logiciel désigne les modifications apportées à un logiciel, après sa mise en œuvre, pour en corriger les fautes, en améliorer l'efficacité ou d'autres caractéristiques, ou adapter celui-ci à un environnement modifié (ISO/IEC 14764).

Tâches : effectuer des dépannages pour des corrections mineures ; réappliquer le cycle de développement pour des modifications plus importantes ; distribuer les mises à jour ; fournir l'assistance technique et un support de consultation ; maintenir un journal des demandes d'assistance et de support.

Types de maintenance :

- **Maintenance corrective** : modification d'un logiciel afin de corriger les défauts rencontrés.
- **Maintenance adaptative** : modification d'un logiciel pour qu'il reste utilisable dans un environnement qui change ou a changé.
- **Maintenance évolutive** : mise à jour du logiciel à la suite de modification des spécifications d'un point de vue fonctionnel ou performance.
- **Maintenance préventive** : modification d'un logiciel pour en déceler et corriger les défauts latents avant qu'ils ne se manifestent.

### Gestion de projets

- La gestion de projets : l'arbre qui cache une forêt de concepts et de notions bien précises. C'est un métier :
  - Il existe une certaine culture à assimiler, des règles à suivre, du vocabulaire à connaître.
  - Il faut maîtriser les techniques de gestion de projets et les connaissances du métier de l'informatique.
- **Projet** = opération ponctuelle ayant un début et une fin, nécessitant la mise en œuvre de ressources humaines et matérielles pour sa réalisation.

Processus clés (Contenu, Délais, Coûts, Qualité) : Initiation → Planification → Réalisation → Contrôle → Clôture, avec l'Intégration au centre. Processus supports : RH, Communication, Risques, Approvisionnement. Un tableau de bord stratégique accompagne l'ensemble.

#### Avant le développement

Initiation du projet : préparation de la gestion de projet :

- Représenter les activités à entreprendre dans un modèle.
- Prévoir les ressources nécessaires au projet.
- Identifier les procédures et les normes spécifiques au projet et les mesures à mettre en place pour contrôler leur application.
- Planifier la gestion de projet.

#### Lors du développement

1. **Affinement et modification de la planification du projet** : la planification du projet définit les tâches, le calendrier, les ressources, l'allocation de ces ressources aux tâches et les procédures du projet.
2. **Pilotage et suivi du projet** : enregistrer les faits sur l'avancement du projet et le comparer à la planification ; entreprendre, si nécessaire, des mesures correctives.
3. **Gestion de la qualité** : l'ensemble des activités de gestion déployées pour garantir que le processus de développement engendre un produit de qualité.
   - Définir un programme pour mesurer la qualité ;
   - Planifier le programme de qualité ;
   - Piloter et contrôler l'application du programme de qualité ;
   - Recommander des améliorations pour les programmes de qualité futurs.

   :::note Remarque
   La gestion de la qualité du logiciel et les activités de vérification et de validation sont parfois regroupées sous le nom « assurance de qualité du logiciel ».
   :::

#### Clôture du projet

L'atteinte des objectifs du projet est examinée par le Chef de projets qui s'assure que tout le travail est achevé. Il consiste à finaliser toutes les activités pour l'ensemble de processus ou l'une de ses phases, afin de clore formellement le projet ou la phase. Ce processus fournit également le transfert des livrables acceptés, le passage en revue les leçons apprises du projet (retour d'expérience), la clôture des ressources pour le désengagement, la libération des ressources de l'équipe de projet pour poursuivre à un autre projet ou effort.

Sur la base de cette revue, le chef de projets doit déclarer le projet clos (le Plan de management de projet et le Plan de management de la qualité serviront de référence). Les livrables acceptés constitueront la base de référence pour l'acceptation du projet par toutes les parties prenantes concernées.

## Cycle de vie de logiciels : Définitions

- **Cycle de vie d'un logiciel** : processus qui démarre par la détection d'un besoin de développement d'un logiciel et qui se termine par la mise hors service du logiciel.
- Il existe différents modèles de cycles de vie.
- Il n'existe pas de cycle de vie idéal :
  - Diversité des besoins et des contraintes de qualité.
  - Différences de contexte et d'expertise aussi bien des organisations que des personnes.

## 4. Modèles de processus

### Aperçu des modèles de cycles de vie

- **Modèles classiques**
  - Modèles linéaires : modèle en cascade, modèle en V.
  - Modèles itératifs : modèle par prototypage, modèle de développement incrémental.
- **Modèles agiles** : SCRUM, KANBAN, DEVOPS.
- **Modèles orientés objet** : Processus unifié, 2TUP.

### Modèles linéaires

Problème commun : l'effet tunnel où l'on ne voit tourner quelque chose qu'à la fin ⇒ détection d'erreurs tardive.

#### Modèle de la cascade

Présente le développement logiciel comme une suite de phases qui s'enchaînent dans un déroulement linéaire, avec une activité de V&V en fin de chaque étape : Analyse → Conception → Codage → Tests unitaires → Intégration et Tests → Installation. [Royce70]

- Chaque étape doit être achevée avant que ne débute la suivante.
- Chaque étape permet d'élaborer des produits intermédiaires.
- Chaque fin d'étape est matérialisée par un événement, où s'exerce une activité de contrôle (V&V) afin d'éliminer au plus tôt les anomalies des produits réalisés.
- Le passage à l'étape suivante est conditionné par le résultat de contrôle (acceptation, rejet, ajournement).
- Les retours en arrière sur les étapes précédentes se limitent à un retour sur l'étape immédiatement antérieure.
- Adapté aux projets dont les besoins sont clairs dès le début du projet.

**Bilan** :

- Avantage : facile à comprendre.
- Inconvénients : approche purement séquentielle et « simpliste » ; il est rare que le client puisse fournir toutes les spécifications dès le début du projet ; le client ne reçoit pas de résultats concrets pendant le développement du logiciel (problème de l'effet tunnel).

#### Modèle en V

- Processus linéaire dérivé du modèle de la cascade.
- Les premières étapes du cycle doivent préparer les dernières étapes, essentiellement les activités de vérification et de validation.
- Le développement du logiciel et le développement des tests sont directement corrélés.
- Cette approche permet de vérifier la conformité à ce qui devrait être fait et non ce qui a été fait.

Branche descendante : Étude de faisabilité → Spécification → Conception Globale → Conception Détaillée → Codage. Branche montante : Tests unitaires → Tests d'intégration → Tests système → Installation et test de réception, chaque étape descendante étant reliée par un trait non continu à son étape montante correspondante (V&V).

- Deux sortes de dépendances entre étapes :
  - Traits continus : correspondent à l'enchaînement du modèle de la cascade, les étapes se déroulent séquentiellement en suivant le V de gauche à droite.
  - Traits non continus : une partie des résultats de l'étape de départ est utilisée directement par l'étape d'arrivée. Par exemple : à l'issue de la conception globale, le protocole d'intégration et les jeux de tests d'intégration doivent être complètement décrits.

**Bilan** :

- Avantages : une meilleure spécification (évite d'énoncer une propriété qu'il est impossible de vérifier une fois le logiciel réalisé) ; prévenir les erreurs (l'obligation de concevoir les jeux de tests et de réfléchir sur leurs résultats en cours oblige à une meilleure description et à des retours en cours) ; une meilleure planification du projet (les étapes de la branche droite du V peuvent être mieux préparées et planifiées).
- Inconvénients : le client ne reçoit pas de résultats concrets pendant le développement du logiciel ; les validations des étapes précédentes n'empêchent pas la transmission des insuffisances intermédiaires.
- Adapté aux problèmes sans zones d'ombre : idéal quand les besoins sont bien connus et quand l'analyse et la conception sont claires.

#### Bilan des cycles de vie linéaires

- Avantages : une meilleure solution si l'on maîtrise le type de projet ; documentation abondante.
- Inconvénients : des difficultés surviennent s'il est impossible d'obtenir de l'utilisateur un énoncé complet et cohérent de ses besoins ; il est irréaliste de penser que l'on peut définir dès le départ, complètement et dans le détail, ce que l'on veut réaliser et les résultats intermédiaires attendus ; il n'y a pas de feedback avant la livraison au client ; l'environnement du logiciel peut être tellement mouvant qu'il est difficile de construire le logiciel sur des spécifications figées ; ils ne reflètent pas la façon dont le code est développé ; manque de flexibilité pour gérer les imprévus.

### Cycles de vie itératifs

- Évaluation d'éléments concrets au cours du développement : élimination de l'effet tunnel.
- Basée sur l'évolution de prototypes exécutables, mesurables ; diminution de l'importance des documents de spécification détaillée ; livraisons intermédiaires ⇒ résultats concrets réguliers de l'équipe de développement ; meilleures anticipation et prise en compte des problèmes ; meilleure gestion de la prise en compte de modifications de spécification qui peuvent être intégrées dans une itération future ; intégration progressive de composants.
- En général, chaque itération reproduit le cycle en cascade à une plus petite échelle.
- L'utilisateur est placé devant des situations d'utilisation concrètes. Il est partenaire du projet.
- L'intégration est progressive et permet d'éviter l'effet « big bang » (découverte de nombreux bogues à corriger et déploiement retardé) à l'approche de la date de livraison.
- Les progrès se mesurent par des programmes démontrables et non par des documents ou estimations.
- Le découpage par incréments permet de réduire la complexité du système en la ventilant dans les incréments.

#### Modèle du prototypage

- **Prototype** = une version facile à mettre en œuvre et à modifier du logiciel final, avec sacrifiant la précision de certaines fonctionnalités qui va permettre de vérifier rapidement les contraintes de tout ou une partie de qualité que le logiciel doit avoir.
- Prototypage = technique importante de validation des besoins.
- Technique souvent utilisé pour la validation des spécifications MAIS peut être aussi utilisé à différentes étapes du cycle de vie.
- Selon l'étape, les objectifs du prototype sont différents : pour montrer la faisabilité, valider les interfaces utilisateurs, etc.

Cycle : Analyse préliminaire des besoins → Construction du prototype → Évaluation/expérimentation → (état non satisfaisant → retour à l'analyse et sélection des nouvelles fonctions) ; (état satisfaisant → spécifications définitives). Initialement les spécifications données par le client sont d'ordre général ; raffinement des spécifications, des fonctionnalités et des performances par des prototypes successifs. Quand le client donne son accord, le développement suit souvent un cycle de vie linéaire.

**Bilan** :

- Avantages : pour le client, une approche où domine l'écoute total du client (résultats tangibles rapidement, expression facilitée des besoins, changement d'avis sans conséquences dramatiques) ; pour l'utilisateur, expérimentation rapide et feedback immédiat, formation avant livraison du système final ; pour l'équipe de développement, meilleure clarification des spécifications, amélioration de la communication entre le client et l'analyste, d'une part, l'analyste et le concepteur d'autre part.
- Inconvénients : impatience du client qui croit avoir un logiciel final ; problème relatif à la gestion de projet (planification, estimation des coûts, etc.).

#### Modèle incrémental

- A été proposé dans les années 80.
- Incrément = version.
- Propose un développement du logiciel par morceaux, lesquels sont livrés successivement au client, en venant se greffer à un noyau logiciel.

Cycle : Analyse des besoins → Conception architecturale → (pour chaque incrément : Conception détaillée d'un incrément → Codage d'un incrément → Validation de l'incrément → Intégration) → Validation du système → Système final.

- Un seul sous-ensemble des composants est développé à la fois.
- Un logiciel noyau est tout d'abord développé, puis des incréments sont successivement développés et intégrés.
- Permet d'éviter de tout concevoir, de tout coder et de tout tester.
- Les spécifications du logiciel sont figées et connues, l'étape de conception globale est terminée.
- Certains modèles proposent de développer les différents incréments en parallèle.

**Bilan** :

- Avantages : des livraisons et des mises en service possible après chaque intégration d'incrément ; faire accepter progressivement un logiciel par les utilisateurs ; intégration allégée (les intégrations et leurs tests sont progressifs) ; maintenance allégée (par incrément).
- Inconvénients : risque majeur dès le début du projet de voir remettre en cause le noyau et les incréments précédents (définition globale des incréments et de leurs interactions) ; complexité croissante de l'intégration de nouveaux incréments ; pour chaque version à développer après la 1ère version livrée, il faut arbitrer entre les demandes de correction et les nouvelles fonctionnalités à développer.

### Modèle agile

- **Agilité** = la capacité d'une organisation à créer de la valeur et à ravir son client, tout en favorisant et en s'adaptant -à temps- aux changements de son environnement.
- Les méthodes agiles :
  - Se veulent plus pragmatiques que les méthodes classiques.
  - Impliquent au maximum le client et permettent une grande réactivité à ses demandes.
  - Visent la satisfaction réelle du client en priorité aux termes d'un contrat de développement.

Principes des méthodes « agiles » :

- (priorité) satisfaire le client en fournissant continuellement des versions du logiciel ;
- collaboration journalière entre client et développeur ;
- travailler avec des gens motivés et leur fournir les conditions nécessaires pour accomplir leur tâche ;
- communiquer sous forme de dialogue.

#### Un peu d'historique

- Dans le début des années 1980, une méthode de développement rapide d'application (le RAD) a été proposée. Elle a été reprise en 1991 en France pour l'adapter au système français (RAD2).
- En 1994, en Grande-Bretagne, DSDM, équivalente au RAD2, a été proposée.
- Dans la seconde moitié des années 90, une dizaine de méthodes agiles ont vu le jour (exemples : « Extreme programming » et SCRUM).
- En 2001, 17 grands noms du développement de logiciel se sont réunis aux USA et ont réussi à extraire de leurs concepts respectifs des critères pour définir une nouvelle façon de développer des logiciels.
- À l'issue de cette réunion est né le « Manifeste Agile » (4 valeurs fondamentales et 12 principes de fonctionnement). http://agilemanifesto.org/iso/fr/

#### Valeurs de l'agilité

1. Priorité aux personnes et aux interactions par rapport aux procédures et aux outils.
2. Priorité aux applications fonctionnelles opérationnelles par rapport à une documentation pléthorique.
3. Priorité à la collaboration avec le client par rapport à la négociation de contrats.
4. Priorité à l'acceptation et la réactivité au changement par rapport au suivi d'un plan.

Détails :

1. Ce sont les individus, leur expertise, l'esprit d'équipe (plutôt que les processus et les outils) qui font la valeur du travail accompli : les processus qui définissent ce que doit faire chaque personne brident le potentiel caché derrière chacun ; faire interagir les gens au maximum permet d'améliorer grandement l'efficacité et la qualité du travail fourni.
2. Dans les méthodes Agiles, un seul critère permet de mesurer l'avancement d'un projet : le logiciel qui fonctionne. La documentation n'est qu'un support concret qui aide à produire le logiciel. Les processus lourds génèrent une documentation exhaustive avec tous ses inconvénients : ambiguïté du langage, coût de la rédaction, coût du maintien en accord avec la réalité, etc.
3. Sortir de la guerre client/fournisseur et penser en équipe qui veut atteindre un but commun pour réussir le projet. Le client devient un partenaire qui participe au projet pour donner régulièrement son feedback.
4. Le planning est flexible pour accepter les modifications nécessaires. Le planning strict est à l'origine des conflits client/fournisseur classiques sur les délais de livraison. Pour le client, pouvoir adapter les besoins en cours de projet est un atout concurrentiel.

#### Principes fondateurs

- Notre première priorité est de satisfaire le client en livrant tôt et régulièrement des logiciels utiles. (Toute la création de valeur doit être justifiée par la vue client ; le cercle vertueux livraison/satisfaction est en place et le projet peut continuer.)
- Le changement est accepté, même tardivement dans le développement. Les processus agiles exploitent le changement comme un avantage compétitif pour le client. (La notion de cahier des charges évolutif permet au client de préciser ses idées au cours du projet ; les développeurs doivent accepter ce changement, et le client doit accepter que les développeurs refassent une partie du produit pour plus de qualité.)
- Livrer fréquemment une application fonctionnelle, toutes les deux semaines à deux mois, avec une tendance pour la période la plus courte. (La livraison régulière et fréquente permet de se rendre compte du produit du point technique et fonctionnel, et de réduire le risque d'erreurs.)
- Les gens du métier et les développeurs doivent collaborer quotidiennement au projet. (La collaboration quotidienne permet d'augmenter la productivité en abandonnant la création de documents intermédiaires qui n'ont pas de valeur pour le produit final.)
- Bâtissez le projet autour de personnes motivées. Donnez-leur l'environnement et le soutien dont elles ont besoin, et croyez en leur capacité à faire le travail. (Le facteur humain est la clé du succès.)
- La méthode la plus efficace de transmettre l'information est une conversation en face à face.
- Un logiciel fonctionnel est la meilleure unité de mesure de la progression du projet.
- Les processus agiles promeuvent un rythme de développement soutenable. Commanditaires, développeurs et utilisateurs devraient pouvoir maintenir le rythme indéfiniment.
- Une attention continue à l'excellence technique et à la qualité de la conception améliore l'agilité. (Le développement agile requiert un code propre, un code robuste — testé.)
- La simplicité — l'art de maximiser la quantité de travail à ne pas faire — est essentielle.
- Les meilleures architectures, spécifications et conceptions sont issues d'équipes qui s'auto-organisent.
- À intervalle régulier, l'équipe réfléchit aux moyens de devenir plus efficace, puis accorde et ajuste son comportement dans ce sens.

#### Un Modèle Agile : SCRUM

- N'est pas un acronyme, mais un mécanisme en rugby pour remettre en jeu une balle sortie du jeu.
- Le cœur de Scrum est un sprint : un bloc de temps d'un mois ou moins durant lequel un incrément du produit est réalisé.

**Planification du sprint** :

- Périmètre : analyser et évaluer le backlog de produit, définir le but du sprint.
- Plan : décider comment s'y prendre (conception), créer la liste des tâches à partir des éléments du backlog de produit, estimer les tâches en heures.
- Intrants : capacité de l'équipe, backlog de produit, produit actuel, technos.

**Mêlée quotidienne** :

- Destinée à permettre à l'équipe de développement de synchroniser ses activités et planifier les prochaines 24 heures.
- Tous les jours, 15 minutes, même heure, même endroit.
- Chaque membre de l'équipe de développement décrit : ce qu'il a réalisé depuis la dernière réunion ; ce qu'il réalisera avant la prochaine réunion ; les difficultés qu'il rencontre.

**Revue de sprint** :

- L'équipe Scrum (PO+SM+E) et les intervenants échangent sur ce qui a été fait durant le sprint.
- Inspecter l'incrément du produit et adapter le carnet de produit si nécessaire.
- Pour un sprint d'un mois, cette rencontre est limitée à un bloc de temps de quatre heures. Sprints plus courts : allouer proportionnellement moins de temps.

**Rétrospective du sprint** :

- Inspecter la manière dont le dernier sprint s'est déroulé en ce qui concerne les personnes, les relations, les processus et les outils.
- Identifier et ordonner les éléments majeurs qui se sont bien déroulés et les améliorations potentielles.
- Créer un plan pour améliorer les processus de travail de l'équipe Scrum (PO+SM+E).
- Pour un sprint d'un mois, cette rencontre est limitée à un bloc de trois heures.

**Les trois rôles** (le framework Scrum en détails) :

- **Le Scrum Master** : responsable de veiller à ce que le processus soit bien compris et suivi ; responsable de la mise en œuvre des valeurs et des pratiques de Scrum ; éliminer les obstacles ; s'assurer que l'équipe est entièrement fonctionnelle et productive ; permettre la coopération entre les divers rôles et fonctions ; protéger l'équipe de toute intervention extérieure.
- **Le Product Owner** : responsable de maximiser la valeur du travail que fait l'équipe Scrum ; définir les caractéristiques du produit ; décider de la date de livraison et le contenu ; responsable du retour sur investissement du produit ; prioriser les fonctions conformément à leur valeur business ; ajuster les fonctions et leurs priorités pour chaque sprint ; accepter ou rejeter les résultats.
- **L'équipe** : responsable de la réalisation des travaux ; ne comporte pas de rôles prédéfinis pour ses membres ; il n'y a pas non plus de notion de hiérarchie interne (toutes les décisions sont prises ensemble, personne ne donne d'ordre à l'équipe sur sa façon de procéder) ; l'équipe s'adresse directement au Product Owner ; la composition de l'équipe doit rester stable durant le sprint (au minimum).

:::note Remarque — Taille de l'équipe de développement
Une équipe de développement optimale est assez petite pour demeurer agile et assez grande pour effectuer un travail significatif.

- Moins de trois membres dans l'équipe de développement diminue les interactions et entraîne des gains de productivité moindres.
- Une équipe de développement trop petite risque de rencontrer des contraintes de compétences.
- Plus de neuf membres pour être gérées par un processus empirique. Les grandes équipes de développement exigent trop de coordination génèrent trop de complexité.
- Processus empirique : basé sur l'expérience, des inspections et des adaptations fréquentes, et nécessite une bonne visibilité, une bonne cohésion aux plans.
  :::

**Les 4 artefacts** :

- Le backlog du produit est la liste des fonctionnalités attendues d'un produit.
- Scrum n'impose pas de pratique pour identifier et nommer les éléments du backlog. L'usage le plus courant est de définir un élément comme étant une story ou un cas d'utilisation.
- Dans un backlog de produit, les stories sont rangées (classées) selon l'ordre envisagé pour leur réalisation. Cette notion de priorité prend une grande importance dans le développement itératif.

**Syntaxe de construction des User Stories** :

- En tant que \<Rôle\> (As a \<User role\>)
- Je souhaite pouvoir \<Fonctionnalité\> (I want to \<Functionality\>)
- Afin de \<Bénéfice\> (so that \<value\>) — facultatif

Exemples de User Stories :

- En tant qu'acheteur en ligne, je souhaite pouvoir ajouter des items à mon panier ou supprimer des items afin de pouvoir n'acheter que ce dont je suis vraiment certain.
- En tant que client, je souhaite pouvoir consulter la liste des factures émises.
- En tant que client (du projet), je souhaite pouvoir consulter la liste de mes clients.
- En tant que client, je souhaite pouvoir connaître le montant total des factures impayées.

**Valorisation des User Stories** :

- **FISPE** (permet de classer les user stories selon la criticité métier) : I - Indispensable (Must Have), S - Souhaitable (Should Have), P - Possible (Could Have), E - Éliminé (Want to Have but Won't Have).
- Permet aussi de classer les User Stories par niveau de « complexité » à les réaliser : valeurs possibles 1, 2, 3, 5, 8, 13, 21, … (Nota : 13 vaut de 9 à 20 !).

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/gl-ch2.pdf" />

</TabItem>
</Tabs>
