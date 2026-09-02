---
sidebar_position: 3
title: Chapitre 3 - Analyse des besoins
sidebar_label: Ch3 - Analyse des besoins
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 3 : Analyse des besoins

*Cours « Génie Logiciel » Niveau II2 — AU: 2023/2024*

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments) — best-effort reconstruction below, see task summary -->

## Plan

**Partie I : Expression des besoins**
1. Problématique
2. Les Besoins
3. Expression des Besoins
4. Exemple d'un standard

**Partie II : Spécification**
1. La Modélisation
2. Styles de spécifications
3. Approches (fonctionnelles, objets)

## Partie I : Expression des besoins

### 1. Problématique

Beaucoup de systèmes existants sont mal utilisés voire même jamais utilisés car ils ne correspondent pas aux besoins du client !

- « Ce n'est pas ce que je voulais… »
- « Ça ne sert à rien... »
- « Comment je fais ça ? »
- « Ce n'est pas le bon résultat ! »
- « Je vous avais dit que je voulais ça ! »

Positionnement : Avant-projet (Étude préalable → première définition du problème) puis Développement (Expression des besoins → Analyse des besoins → Spécification).

**Difficultés de communiquer** :

- Difficulté d'être précis, cohérent, complet, …
- Le client n'exprime pas toujours ses besoins clairement, et ne sait pas toujours ce qu'il veut.
- L'informaticien ne comprend pas le client (et vice versa !)
- Ce que le client demande n'est pas forcément ce dont il a besoin.
- Le client exprime souvent la solution à laquelle il pense et non son besoin réel (que vous ne connaîtrez peut-être jamais).
- Le client ne connaît pas toujours l'informatique : il ne sait pas ce qui est possible et ce qui ne l'est pas.
- Ce que le client veut n'est pas ce qu'il voulait.

**Différences de culture** :

- Les utilisateurs ne sont pas des informaticiens…
- Les informaticiens ne connaissent pas le domaine …

**Complexité du problème** : problème non formalisé ou innovant (non classique).

**Évolutivité** : le client peut changer toujours ses besoins.

### 2. Les Besoins

- **Besoin** (« requirement ») = exigence de ce que le système devrait satisfaire.
- Synonyme : exigences, caractéristiques, requis.
- Les besoins décrivent les exigences telles qu'elles soient compréhensibles par les clients du système, qui n'ont pas forcément de connaissances techniques détaillées.

**Exemple 1 : Système de contrôle d'un ascenseur**

- B1. Le programme doit planifier les activités de l'ascenseur de façon efficace et raisonnable.
- B2. Le programme doit illuminer l'indicateur du panneau d'arrivée correspondant à l'étage où l'ascenseur arrive.
- B3. Au dernier (resp. premier) étage, le panneau d'appel ne contient qu'un seul bouton, soit celui pour descendre (resp. monter).

**Exemple 2 : Système de surveillance des patients dans une unité de soins intensifs**

- B1. Le système sera installé dans l'unité de soins intensifs de l'hôpital. Cette unité comporte 8 lits destinés à recevoir des patients dont l'état est critique et dont les signes vitaux doivent être surveillés 24/24.
- B2. Les signes vitaux à surveiller sont l'électrocardiogramme, le rythme respiratoire et la pression artérielle.
- B3. La surveillance consiste à saisir les signes vitaux, à les afficher sur des moniteurs aux lits et au poste des infirmières, à les comparer avec une banque de référence et à émettre éventuellement des alarmes.
- B4. Le système doit produire des rapports sur chaque patient.
- B5. Des capteurs en place devront être utilisés.
- B6. Le système devra être opérationnel dans un an.

Il est essentiel de dissocier dans la description d'un système les deux points de vue :

- externe (celui des utilisateurs non informaticiens, des décideurs, …)
- interne (celui des concepteurs, des développeurs, des personnels techniques, …)

Trois types de besoins : besoins fonctionnels, besoins non fonctionnels, besoins du domaine.

- **Besoins fonctionnels** (exigences fonctionnelles) : à quoi sert le système ? Ce que doit faire le système, les fonctions utiles ; description des services (fonctions) ; « Comment souhaite-on pouvoir utiliser le système ? » ; description des données manipulées.
- **Besoins non fonctionnels** : une restriction ou une contrainte qui pèse sur un service du système (spécifications techniques) ; description des contraintes ; chercher des critères mesurables ; pour chaque fonction et pour le système global, il est possible d'exprimer différents types de contraintes : performance, sûreté, confidentialité, portabilité, etc.
- **Besoins du domaine** : requis qui proviennent du domaine d'application du système et qui reflètent les caractéristiques de ce domaine.

#### 2.1 Besoins fonctionnels

- Ils décrivent les fonctionnalités ou les services à offrir par le système.
- Ils dépendent des utilisateurs prévus.
- Les requis fonctionnels de l'utilisateur peuvent être des énoncés de haut niveau de ce que le système devrait faire, mais les requis fonctionnels du système devraient décrire en détails les services du système.

Exemples :

- L'usager devra pouvoir faire une recherche dans soit l'ensemble initial des bases de données, soit choisir un sous-ensemble de celles-ci.
- Le système fournira des visualisateurs appropriés pour que les usagers puissent lire les documents archivés sur le système.

Ils doivent être :

- **complets** : ils doivent inclure les descriptions de toutes les facilités requises.
- **cohérents** : il ne doit pas y avoir de conflits ou de contradictions dans les descriptions des facilités du système.

Exemple des besoins conflictuels pour un Système d'astronefs :

- Afin de minimiser le poids, le nombre de puces dans le système devrait être minimisé.
- Afin de minimiser la consommation d'énergie, des puces à faible consommation devraient être utilisées.
- Toutefois, l'usage de puces à faible consommation d'énergie peut vouloir dire que davantage de puces devront être utilisées.
- → Il faut trouver un compromis.

#### 2.2 Besoins non fonctionnels

- Ils définissent les propriétés et les contraintes à respecter par le système (p. ex. fiabilité, temps de réponse et besoins d'espace mémoire).
- Ils peuvent concerner le processus de développement (p. ex. l'usage d'un système AGL particulier, d'un langage de programmation particulier, d'une méthode de développement particulière).
- Ils peuvent être plus critiques que les requis fonctionnels : s'ils ne sont pas respectés, le système est inutile.

Classifications des besoins non fonctionnels :

- **Requis de produit** : qui spécifie que le produit livré doit se comporter d'une certaine façon (p. ex. vitesse d'exécution, fiabilité, etc.).
- **Requis organisationnel** : qui spécifie que le processus de développement doit respecter certaines caractéristiques (p. ex. normes, requis d'implémentation, etc.).
- **Requis externe** : qui provient de facteurs qui sont externes au produit et à son processus de développement (p. ex. requis de compatibilité, requis législatif).

Les besoins non fonctionnels se répartissent : sur le processus (coûts, livraison, implémentation), sur le produit (utilisabilité, performance, efficacité, fiabilité, portabilité, taille), et externes (interopérabilité, standards, légaux).

**Buts vs Besoins vérifiables** :

- Un but est une intention générale de l'usager.
- Les buts aident les développeurs parce qu'ils font ressortir les intentions des usagers du système.
- MAIS les besoins non fonctionnels doivent être vérifiables : l'expression d'un BNF doit énoncer une unité de mesure pour le vérifier et le tester objectivement.

Exemple :

- Un but de système : « Le système devra être facile à utiliser par des contrôleurs expérimentés et doit être organisé de telle sorte que les erreurs d'usagers soient minimisées. »
- Un requis non fonctionnel vérifiable : « Les contrôleurs expérimentés devraient pouvoir utiliser toutes les fonctions du système au bout de deux heures d'entraînement. Après cet entraînement, le nombre moyen d'erreurs fait par ces utilisateurs expérimentés ne devrait pas dépasser deux par jour. »

Mesures des requis (propriété → mesure) : Vitesse (transactions traitées par seconde, temps de réponse, temps de réécriture d'écran) ; Taille (kilo-octets, nombre de puces électroniques) ; Facilité d'usage (temps d'entraînement, nombre de pages d'aide) ; Fiabilité (temps moyen avant échec, probabilité de non disponibilité, taux d'échecs, disponibilité) ; Robustesse (temps de redémarrage après échec, pourcentage d'événements causant des échecs, probabilité de corruption de données lors d'échec) ; Portabilité (pourcentage d'énoncés dépendants du système cible, nombre de systèmes cibles).

#### 2.3 Les besoins du domaine

- Ils sont dérivés du domaine d'application ; ils décrivent les caractéristiques et les fonctions du système qui reflètent le domaine.
- Ils peuvent être des nouveaux requis fonctionnels ou des contraintes.
- Si les requis de domaine ne sont pas respectés, le système peut ne pas être utilisable.

Exemple : requis du domaine du système de bibliothèque — il doit y avoir une interface usager standard à toutes les bases de données, basée sur la norme Z39.50. En raison des restrictions de copyright, certains documents devront être effacés immédiatement sur réception ; selon les requis de l'usager, ces documents seront soit imprimés localement sur le serveur du système pour être envoyés manuellement à l'usager, soit acheminés vers une imprimante réseau.

Exemple : requis du domaine du système de protection de train — la décélération d'un train sera calculée comme suit : Dtrain = Dcontrol + Dgradient, où Dgradient est 9.81 m/s² compensé selon le gradient/alpha, et où les valeurs de 9.81 m/s²/alpha sont connues pour différents types de trains.

**Problèmes avec les besoins du domaine** :

- Manque de clarté : la précision est difficile à obtenir.
- Confusion dans les requis : les requis fonctionnels et non fonctionnels tendent à se mêler.
- Amalgamation de requis : plusieurs requis différents peuvent être exprimés ensemble.
- Compréhension : les requis sont exprimés dans la langue d'application du domaine, souvent non comprise par les développeurs du système.
- Implicite : les spécialistes du domaine comprennent le domaine si bien qu'ils ne pensent pas à rendre les requis de domaine explicites.

### 3. Analyse des besoins

- Le but est de définir ce que le système (à développer) doit faire (le quoi) sans se préoccuper de la façon dont il doit le faire (le comment).
- Le résultat de l'analyse des besoins est le document d'analyse et de spécifications.

Le processus d'analyse des besoins comporte deux volets :

- **A. Expression des besoins** : Détermination des besoins → Validation & négociation → Gestion des besoins → Cahier des Charges.
- **B. Spécification des besoins** : Modélisation et spécification → Validation → Document d'analyse & spécification.

1. **Expression des besoins**. Participants : analyste, client et utilisateurs. Document : cahier des charges. Rédigé par : le client en collaboration avec l'analyste. En langue naturelle. Découpage : en paragraphes exprimant clairement les buts, les besoins et les contraintes.
2. **Spécification et modélisation des besoins**. Participants : analyste. Document : dossier d'analyse et de spécification. Rédigé par : l'analyste. Notation graphique ou textuelle rigoureuse. Découpage : modèles statique, fonctionnel et comportemental.

**Détermination des besoins** — Méthodes : entrevue avec clients ; questionnaires ; observation ; étude de l'existant (documents/logiciels) ; brainstorming ; prototypage, etc.

**Validation** :

1. Vérifier que la description des besoins est complète et cohérente.
2. Éliminer les besoins (non pertinents, irréalisables, conflictuels, …). Numéroter les besoins et construire une matrice : identification des paires de besoins conflictuels (discussion/négociation avec le client) ou se recoupant (reformulation).

**Négociation** : évaluation du risque associé aux besoins et évaluation de leur priorité. Quels sont les besoins susceptibles de causer des problèmes pendant le développement ? Risques techniques, risques de performance, de sécurité, d'intégrité de la BD, risques de volatilité (besoins qui changent durant le développement).

**Gestion des besoins** :

1. Identification et classification des besoins : numérotation (séquentielle avec ou sans catégories).
2. Hiérarchisation des besoins : un besoin peut se composer d'un ou plusieurs besoins plus spécifiques, moins abstraits.

Exemple : B1. Le programme doit planifier les activités de l'ascenseur de façon efficace et raisonnable. B1.1. Si l'ascenseur ne contient pas de passager, il devrait demeurer au rez-de-chaussée en attendant la prochaine requête. B1.2. L'ascenseur ne devrait pas modifier le sens de son déplacement s'il contient des passagers qui n'ont pas encore atteint leur destination. B1.3 ….

**Le Cahier des Charges (CC)** — un CC doit :

- Spécifier uniquement les comportements externes (le quoi non le comment) du système.
- Spécifier les contraintes de réalisation.
- Être facile à mettre à jour.
- Servir de référence à la maintenance.

Un CC doit comporter :

- **I. Fondements du projet** : (1) But du projet — a. Problème de l'utilisateur ou contexte du projet, b. Objectifs du projet ; (2) Personnes et organismes impliqués dans les enjeux du projet ; (3) Utilisateurs du produit.
- **II. Exigences fonctionnelles** : les exigences formulées dans un CC peuvent être regroupées suivant différents critères : même catégorie de réponses du système, même catégorie d'utilisateurs du système, même type de fonctions du système, … Dans la pratique, on procède à une combinaison de plusieurs critères.
- **III. Exigences non fonctionnelles** : (1) Environnement de fonctionnement du système actuel et applications « partenaires » (décrire l'environnement physique et technologique dans lequel le produit sera installé) ; (2) De combien de temps l'équipe de développement dispose-t-elle pour le projet ; (3) Quel est le budget affecté au projet ; (4) Contraintes sur le produit (ses qualités) et sur le développement (langage de programmation particulier).
- **IV. Annexes**
- **V. Références**

**Caractéristiques d'un cahier des charges** : non ambiguë, complet, vérifiable, cohérent, compréhensible par le client, réalisable, modifiable, indépendant de la conception, concis, organisé.

**Cahier des charges (conseils à suivre)** :

- Langue naturelle… mais technique : faire des phrases courtes ; éviter les termes ambigus ou subjectifs ; parler en termes de rôle plutôt que de personnes ; utilisation de références précises.
- Utiliser un format standard pour le CC.
- Utiliser le langage de façon cohérente. Utiliser « doit … » pour les requis obligatoires et « peut … » pour les requis désirables.
- Organiser les besoins (hiérarchiser les besoins…).

### 4. Exemple d'un standard — Standard IEEE/ANSI 830-1993

Table des matières, listes des figures et tableaux.

**1. Introduction**

- 1.1. Objectif : décrire le but du présent projet et l'audience visée.
- 1.2. Portée du produit : identifier le produit à livrer ; expliquer ce que le produit fera ; décrire les usages du produit, ses avantages, les bénéfices attendus et/ou les problèmes qu'il résoudra.
- 1.3. Définitions, acronymes et abréviations (glossaire).
- 1.4. Références (mentionnées dans ce document).
- 1.5. Aperçu du document : ce que contient le reste du document.

**2. Description générale du produit**

- 2.1. Perspective du produit : décrire la relation du produit avec son environnement ; mettre le produit en perspective par rapport à d'autres produits similaires ; mentionner si le produit est autonome ou s'il fait partie d'un système plus large ; joindre toutes les figures et diagrammes.
- 2.2. Vue d'ensemble des fonctionnalités : décrire brièvement les fonctions essentielles du produit ; si possible, produire des représentations graphiques qui résument ces fonctions ; en particulier, définir les interfaces suivantes : interfaces utilisateurs, avec le matériel, avec les autres produits logiciels et interfaces de communication.
- 2.3. Caractéristiques des utilisateurs : définir les caractéristiques des utilisateurs auxquels le produit est destiné (niveau de connaissance, expérience, expertise technique, existence de sous-catégorie d'usagers).
- 2.4. Contraintes d'ordre général : décrire les facteurs qui limitent les options de l'équipe de développement (matériel, considérations de sécurité, contraintes au niveau du langage de programmation, facteurs organisationnels).
- 2.5. Hypothèses et dépendances : identifier tout facteur ou hypothèse implicite qui, si changé, peut modifier les exigences.

**3. Description détaillée** — cette partie décrit toutes les exigences du produit à un niveau de détail suffisant pour permettre au concepteur de satisfaire ces exigences et au testeur de démontrer que les exigences sont respectées. Elle doit documenter et mentionner les interfaces externes, les performances requises, les bases de données requises, les attributs et autres propriétés du produit, les contraintes sur la conception, toutes les figures et diagrammes de ces aspects.

**4. Annexes**

**5. Index**

## Partie II : Spécification des besoins

- La spécification aura pour but de décrire avec rigueur :
  - Les données du système (vue statique).
  - Les fonctions du système (vue fonctionnelle).
  - Les changements d'états et le contrôle du système (vue comportementale).

**Les styles de spécifications** :

- Nature des aspects décrits :
  - Spécification statique : on décrit ce qui ne change pas dans le système, format des données, propriétés des fonctions. Ex : modèle E-A, DFD, …
  - Spécification dynamique : on décrit ce qui change dans le système : les états, les réactions aux événements. Ex : réseaux de Pétri, ...
- Le degré de formalisation :
  - Spécification informelle : basée sur le langage naturel (selon un plan type, le glossaire, présentation formatée…).
  - Spécification semi-formelle : basée sur un langage structuré graphique et textuel (dont la sémantique est faible). Exemple : SA, SADT, USE-CASES, ...
  - Spécification formelle : basée sur un langage formel dont le vocabulaire, la syntaxe et la sémantique sont formels : spécifications algébriques, spécifications basées sur des modèles mathématiques.

### 1. La modélisation

**Qu'est-ce qu'un modèle ?**

- Un modèle est une représentation théorique d'une réalité restreinte de la nature.
- Il a pour utilité de décrire, d'interpréter et de prévoir des événements dans le cadre de cette réalité (exemple : le modèle atomique permet de décrire des phénomènes chimiques, mais pas la gravité).
- Pourquoi modéliser ? Les modèles permettent de mieux comprendre le système que l'on développe (maîtriser sa complexité).

**Les quatre principes de modélisation** :

1. Le choix des modèles à créer a une forte influence sur la manière d'aborder un problème et sur la nature de sa solution.
2. Tous les modèles peuvent avoir différents niveaux de précision.
3. Les meilleurs modèles ne perdent pas le sens de la réalité.
4. Parce qu'aucun modèle n'est suffisant à lui seul, il est préférable de décomposer un système important en un ensemble de petits modèles presque indépendants.

### 2. Les styles de spécification

Le degré de formalisation :

- **Informel** : basée sur le langage naturel.
- **Semi-formel** : basée sur un langage structuré (graphique et/ou textuel) dont la sémantique est faible.
- **Formel** : basée sur un langage formel dont le vocabulaire, la syntaxe et la sémantique sont formels. Spécifications algébriques, axiomatique, …

#### 2.1 Spécification informelle

Malheureusement, ces spécifications sont sujettes à des mécompréhensions :

- **Ambiguïté** : un même mot ne fait pas toujours référence au même concept chez deux locuteurs différents ou dans deux contextes différents.
- **Flexibilité excessive** : un même concept peut être expliqué de plusieurs façons différentes, ce qui complique la recherche d'information.

Exemple : « La vérification de la validité de la carte consiste à vérifier que la carte introduite par un utilisateur provient d'une banque reconnue, qu'elle est à jour, et qu'elle contient des informations appropriées ainsi que des détails sur les dates et les montants des précédents retraits. »

#### 2.2 Spécification semi-formelle

Se base sur une notation graphique :

- Introduit un aspect formel mais généralement annoté par du texte informel (pour cette raison, on dit semi-formelle).
- Ces notations sont particulièrement pratiques pour fournir une vue d'ensemble, statique ou dynamique, d'un système ou d'un sous-système.
- Cependant, leur sémantique doit être précisée.

On fixe :

- des patrons,
- des modèles de fiches,
- et des formulations,

dont le sens est explicité de la façon la moins ambiguë possible dans une partie initiale de la spécification. La suite de la spécification (raffinement) doit s'appuyer sur ces constructions.

- Avantage : compromis lisibilité-formalisme ; support de communication.
- Inconvénient : sémantique faible.

#### 2.3 Spécification formelle

Une spécification d'un logiciel est formelle si elle est exprimée avec un langage qui possède :

- un vocabulaire et une syntaxe formellement définis ;
- une sémantique basée sur les mathématiques.

- Avantages : améliorer la qualité du logiciel ; rigueur et précision des spécifications ; automatisation (vérification, génération de code, etc.).
- Inconvénients : nécessite une certaine qualification du client, des utilisateurs et des développeurs ; ne facilite pas la communication avec les utilisateurs.

### 3. Les approches de spécification

Toute approche de spécification aura pour but de décrire avec rigueur :

- les composants ou les éléments du système (vue structurelle) ;
- les fonctions du système (vue fonctionnelle) ;
- les changements d'états du système (vue comportementale).

Axes de modélisation d'un système : Structurel (ce que le système EST — statique), Fonctionnel (ce que le système FAIT), Comportemental (comment le système EVOLUE).

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/gl-ch3.pdf" />

</TabItem>
</Tabs>
