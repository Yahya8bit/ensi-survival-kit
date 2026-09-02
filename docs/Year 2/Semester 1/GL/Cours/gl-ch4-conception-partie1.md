---
sidebar_position: 4
title: Chapitre 4 - La Conception (Partie 1 - Principes)
sidebar_label: Ch4 - Conception (P1)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 4 : La Conception — Partie 1 : Principes de la conception

*Cours « Génie Logiciel » Niveau II2*

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments) — best-effort reconstruction below, see task summary -->

## Plan

- Introduction
- Présentation de la conception
- Principes de la conception
  - Principes classiques
  - Principes SOLID (à appliquer)
  - Principes STUPID (à éviter)
- Conception architecturale *(voir Partie 2)*
  - Définitions
  - Choix d'une architecture
  - Styles architecturaux

## 1. Introduction — de l'analyse à la conception

- Difficulté de la conception : la conception ne se contente pas d'identifier le problème mais doit lui apporter une solution valide.
- Processus créatif.
- Activité itérative/incrémentale qui transforme progressivement les besoins vers un produit final.
- Étape cruciale du développement logiciel : pont entre l'analyse des besoins et l'implémentation.

Analyse (Quoi-Faire ?) → Conception (Comment-Faire ?)

## 2. Présentation de la conception

### Définitions

- La conception est un processus de résolution de problèmes dont l'objectif est d'identifier la meilleure façon :
  - d'implémenter les besoins fonctionnels d'un système...
  - tout en respectant les contraintes imposées par les besoins non fonctionnels...
  - et en adhérant à des principes de base menant à un logiciel de qualité.
- La conception propose une solution au problème spécifié lors de l'analyse : architecture de l'application (architecture logicielle et architecture physique), description détaillée des modules, des interfaces utilisateurs, des données.
- Activité Intellectuelle : créativité, expérience. Pas de recettes toutes faites, mais il existe des méthodes (principes & bonnes pratiques) pouvant être de bons conseils.
- Résultat de la phase de conception = conception ou « design ».
- Une bonne conception contribue à la qualité du logiciel : fiabilité, correction, évolutivité, etc.

### La conception = série de décisions

Lors de la résolution d'un problème, tout concepteur fera face à une série de problèmes :

1. Ce sont des sous-problèmes devant être résolus.
2. Chacun de ces problèmes peut être solutionné de différentes façons ⇒ ce sont des options de conception.
3. Le concepteur doit donc prendre des décisions de conception afin de résoudre chacun de ces sous-problèmes en tenant compte : des exigences ; du design courant ; de la technologie disponible ; des principes de bon design ; de l'expérience passée.
4. Il faudra être en mesure de toujours choisir la meilleure alternative.

L'espace engendré par l'ensemble des solutions possibles pour un design s'appelle l'**espace de design**. Exemple : client-server (monolithic / fat-client / thin-client) × avec ou sans couche interface utilisateur séparée pour le client × programmé en Java / Visual Basic / C++.

But : décomposition et raffinement progressif du système en modules de plus en plus détaillés.

### Étapes de la conception

La conception passe par deux étapes :

- **Conception architecturale** = conception de haut niveau = conception globale
  - Première étape qui consiste à définir les fonctions des éléments d'un système et leurs relations fonctionnelles.
  - Objectif : structuration et organisation générale du système à concevoir.
  - Contient la description des éléments principaux du système, les relations entre eux, les contraintes à respecter, les motifs et la logique de cette décomposition.
  - La division du système en sous-systèmes et composantes ; comment ceux-ci seront interconnectés ; comment vont-ils interagir ; leurs interfaces ; qu'est-ce qu'ils contiennent (conception des modules) ; SD, opérations et associations.
- **Conception détaillée** = conception de bas niveau
  - Étape qui consiste à détailler les résultats de l'analyse fonctionnelle, jusqu'à un niveau suffisant pour en permettre finalement le codage dans un langage de programmation choisi.
  - Définition d'un design logiciel respectant le plan de la conception architecturale.
  - Objectif : détailler les éléments produits dans la conception architecturale et préparer au mieux l'implémentation : description précise de chaque module ; algorithmes mis en œuvre ; traitements effectués en cas d'erreur ; conception des données ; conception des algorithmes (étude de leur efficacité) ; conception de protocoles (les messages et règles utilisés dans la conversation).

**Processus de conception** : Spécification des besoins → Conception de l'architecture (Architecture, Spécification) → Conception de l'interface (Interface, Spécification) → Conception du composant (Struct. Don., Algo., S.D. & Algo.).

### L'activité de conception

Étape décisive pour : la fiabilité, l'efficacité, la maintenabilité, la réutilisabilité.

Spécifications des besoins + Principes fondamentaux du Génie Logiciel → CONCEPTION → Modélisation (Architecture du système, Interface Utilisateur, Composants (modules), données).

**Principales activités** :

- La conception des structures des données : conçoit et spécifie en détail les structures de données.
- La conception de l'architecture du système : définit les sous-systèmes — identifie les sous-systèmes qui composeront le système global, établit une description des services supportés par chaque sous-système.
- La conception de l'interface : identifier et documenter les interactions entre sous-systèmes.
- La conception des composants : découpe les sous-systèmes en plusieurs composants — conçoit et spécifie en détail les algorithmes pour réaliser les différents services offerts.

## 3. Principes de la conception

### Principes de base

- La conception ne doit pas réinventer la roue. Le temps est précieux → exploiter des solutions existantes.
- La conception doit être uniforme et intégrable : règles de style et de format préalablement définies pour toute l'équipe ; définition minutieuse des interfaces entre les composants.
- La conception doit avoir une structure facilitant l'évolution : traçabilité entre les besoins et les éléments de la conception ; application des principes du génie logiciel (modularité, abstraction, etc.).
- La conception n'est pas le codage et vice versa : distinguer les niveaux d'abstraction conceptuel/code source.
- La conception doit miser sur la qualité : divers concepts et mesures sont disponibles.
- La conception doit être revue pour minimiser les erreurs sémantiques : faire attention aux omissions, ambiguïtés et inconsistances.

### Quelques principes de conception (qualités logicielles en jeu)

1. Modularité
2. Abstraction
3. Encapsulation
4. Anticipation des changements
5. Réutilisabilité
6. Réutilisation
7. Forte cohésion
8. Faible couplage

#### Modularité

- Objectif : déterminer la structure modulaire du système à développer. Une unité de conception est : unité de codage et tests, unité d'intégration et d'archivage, unité de réutilisation, unité de maintenance.
- Répondre aux questions : quels sont les modules ? Quelles relations lient les modules entre eux ?
- Principe : séparer le système en composants logiques (modules).
- Avantages : réduction de complexité ; les modules peuvent être conçus et construits séparément, réutilisés ; système modifié en changeant un nombre limité de modules.

**Module : définition** — un module est un composant d'une application, contenant des définitions de données et/ou de types de données et/ou de fonctions et constituant un tout cohérent. Par exemple, des méthodes, des classes, des paquetages sont des modules en Java. On peut définir un module comme un fournisseur de ressources ou/et de services. Quand on décompose un système en modules il faut décrire précisément les relations entre ces modules (fonction, procédure, classe, paquet, composant : JavaBean, EJB, ActiveX, COM, DCOM, …).

**Relations entre modules** — deux types de relations sont utiles pour décrire la structure d'un système :

- Relation « UTILISE » : Mi UTILISE Mj si Mi requiert la présence de Mj car Mj lui fournit des ressources ou des services. Exemple : appel de procédure. UML : association, liens de dépendance…
- Relation « CONTIENT » : Mi CONTIENT Mk si Mi est réalisé en assemblant un ou plusieurs modules dont le module Mk. Exemple : regroupement en paquetages UML, déclaration d'une classe à l'intérieur d'une autre classe (aussi agrégation/composition).

Identifier les modules en assurant : forte cohésion à l'intérieur du module, faible couplage entre les modules.

#### Abstraction

- Maintenir le niveau d'abstraction aussi élevé que possible.
- La complexité d'un design est réduite lorsqu'un maximum de détails se trouve masqué.
- Une abstraction de qualité utilise toujours le principe de masquage de l'information.
- Une abstraction permet de saisir l'essence d'un système sans avoir à en connaître les détails de son implémentation.
- En orienté objet, les classes sont des abstractions de données contenant des abstractions de procédures.
- Attribuer une visibilité privée aux variables permet d'accroître la qualité de l'abstraction.
- Réduire le nombre de méthodes publiques accroît la qualité de l'abstraction.
- Une meilleure abstraction est obtenue en définissant des méthodes ayant peu de paramètres.
- La création de super-classes et d'interfaces accroît considérablement la qualité de l'abstraction.

#### Encapsulation

- Associer à un composant une vue externe et une vue interne.
- Vue externe : c'est l'interface, elle définit ce que le composant doit faire.
- Vue interne : c'est l'implémentation, elle définit comment il le fait.
- Exemple : PILE (initialiser, empiler, dépiler).

#### Anticipation des changements

- Un des principaux soucis de l'activité de conception : développer un design qui facilite l'ajustement du système aux changements.
  - Perfectionnement du système imposé par les nouvelles exigences du client.
  - Adaptations imposées par la modification de l'environnement matériel, social, etc.
- Importante qualité logicielle en jeu : maintenabilité.

**« Concevoir pour changer »** — pourquoi ? Quelques conséquences indésirables :

- Un design, même « merveilleux », peut se révéler extrêmement difficile et coûteux à adapter.
- Conséquence : nécessité de refaire un tout nouveau design pour intégrer un changement apparemment mineur…
- En essayant d'accommoder l'architecture aux changements, le concepteur risque de briser l'élégante structure initiale du design.
- Conséquence : application de plus en plus difficile à maintenir et inspirant peu confiance (fiabilité compromise ?).

Types de changements : changement d'algorithmes ; changement de représentations des données ; changement au niveau des périphériques ; changement de l'environnement social ; changements dus au processus de développement.

Comment anticiper les changements :

- Réduire le couplage et accroître la cohésion.
- Créer des abstractions.
- Ne pas introduire de constante numérique ad hoc (pas de hard-coding).
- Permettre un maximum d'options.
- Ne pas restreindre inutilement les options.
- Utiliser du code réutilisable et rendre le code réutilisable.

#### Réutilisabilité

- Accroître la réutilisabilité autant que possible.
- Concevoir le design de façon à ce que les différents aspects du système soient utilisables dans différents contextes.
- Généraliser le design autant que possible.
- Simplifier le design autant que possible.
- Ajouter des options aux différents modules.

#### Réutilisation

- Réutiliser autant de composantes que possible.
- La réutilisation est le principe complémentaire au principe de réutilisabilité.
- Réutiliser les designs existants permet de tirer profit de l'effort investi par les concepteurs de composantes réutilisables.

**Un cercle vicieux s'installe** :

- Les développeurs de logiciels ne conçoivent pas de composantes réutilisables, il n'y a donc rien à réutiliser.
- Pour résoudre ce problème, il faut reconnaître que : ce cercle vicieux a un coût ; investir dans la réutilisabilité est important ; s'assurer de la qualité des composantes réutilisables produites est essentiel (les réutilisateurs potentiels auront confiance en ce produit ; la qualité globale du logiciel est celle de sa composante la plus faible).
- Le développement de logiciel réutilisable mène souvent, en fait, à une simplification du logiciel.

**Développement pour et par la réutilisation** :

- Le développement par la réutilisation logicielle impose un cycle de production-réutilisation perpétuel et une architecture logicielle normalisée.
- Une réutilisation bien orchestrée nécessite la création et le maintien d'une bibliothèque logicielle et un changement de focus : créer une application revient à créer les composants de bibliothèque nécessaires puis à construire l'application à l'aide de ces composants.
- Une telle bibliothèque, facilitant le développement d'application et un framework (cadriciel) d'entreprise, son architecture et sa documentation sont les pierres angulaires de la réutilisation logicielle en entreprise.
- L'architecte doit explorer la bibliothèque pour trouver les composants logiciels appropriés, puis créer les composants manquants, les documenter et les intégrer à la bibliothèque.
- Dans une grande entreprise, ce rôle est rempli par un responsable du développement harmonieux de la bibliothèque et de la conservation de l'intégrité de son architecture (l'architecte en chef).

Aucun logiciel de grande taille n'est développé depuis zéro aujourd'hui. Utilisation de « bouts de code » (structures + fonctions / classes + méthodes), bibliothèques, cadriciels (frameworks).

**Bibliothèques** — une bibliothèque logicielle [library] est un ensemble de fonctions utilitaires regroupées et mises à disposition afin de pouvoir être utilisées sans avoir à les réécrire. Plutôt que de coder une procédure courante dans chaque programme en ayant besoin, on rassemble ces procédures dans des bibliothèques. Si un programme a une fonction à remplir et que celle-ci se trouve en bibliothèque, il l'utilisera directement. Les bibliothèques logicielles ne se distinguent pas des applications exécutables dans la mesure où elles représentent une interface de programmation (API : Application Programming Interface) permettant aux programmeurs de choisir les fonctions. Les API ou/et classes se présentent comme une liste des noms des fonctions disponibles, et avec sur les paramètres à leur fournir, et sur les résultats retournés, avec une documentation. Exemples : la bibliothèque de classes Java, la STL de C++.

**Cadre d'applications : cadriciel (framework)** — un cadriciel [framework] est un espace de travail modulaire. C'est un ensemble de bibliothèques, d'outils et de conventions permettant le développement de programmes. C'est un logiciel réutilisable qui propose une solution générique à un problème généralisable. Il fournit les services que requièrent différentes applications. Un cadriciel fournit un contexte où les composants sont réutilisés. C'est une application logicielle partielle intégrant les connaissances d'un domaine, dotée d'une architecture logicielle et d'un cœur (code) générique, dédiée à la réalisation de nouvelles applications du domaine visé, par paramétrage et extension. Un framework fournit : un ensemble de fonctions facilitant la création de tout ou d'une partie d'un système logiciel ; un guide architectural en divisant le domaine visé en modules.

Types de cadriciels : cadriciel d'exploitation/infrastructure système (outils pour développer des systèmes de communication, des interfaces graphiques) — exemple : Framework .Net, Eclipse, NetBeans, Struts ; cadriciel d'intégration d'applications hétérogènes (middleware) sous la forme d'une interface unique — exemple : Ampoliros avec ses interfaces RPC, SOAP, XML ; cadriciel orientés Système de gestion de contenu — exemple : Joomla, itsEasy, WMaker.

**Bibliothèques vs cadriciels** :

- Une bibliothèque est limitée à l'ensemble des fonctions qu'elle contient ; un cadriciel préconise également une organisation du système, pour inclure l'architecture (eg. MVC, par couches, etc), utilisation par extension.
- Exemples : Jdom est une librairie de fonctions permettant de lecture/parser des fichiers XML — son API contient des fonctions d'insertion de nœuds dans l'arbre de balises... ; Struts est un Framework qui permet de coder toute une application, qui gère la gestion des pages, des Beans, la gestion des formulaires, la gestion des taglibs, des adresses et les langues, gestion des fichiers de ressources par mapping entre les Beans, les librairies graphique (gestion des messages ou la gestion des connexions et etc.).
- Une bibliothèque s'utilise, un Framework s'étend ou se paramètre.
- Avec une bibliothèque, le code d'une nouvelle application invoque le code de la bibliothèque.
- Le code d'un Framework appelle le code de la nouvelle application : Inversion de contrôle (également dit « principe de Hollywood » : le code du Framework préexistant invoque, callback, les parties de code représentant la nouvelle application en un certain nombre d'endroits prédéfinis nommés points d'extensions ou points de paramétrages ou historiquement « Hot spot »).

### 4. Qualité de la conception

- Il n'existe pas de critère définitif permettant de définir une bonne conception.
- Suivant le type de l'application, les besoins non fonctionnels, le critère décisif peut être l'efficacité du code produit, sa compacité ou la maintenabilité du produit, etc.
- Nous retenons la maintenabilité. Une bonne conception facilite la maintenance : le coût des changements à apporter au système est minimal ; la conception est plus facile à comprendre ; l'effet des changements est mieux localisé.
- Une conception de qualité apporte à la fois : une forte cohésion, un faible couplage.

**Caractéristiques d'un bon design** — un bon design = une bonne décomposition en modules qui favorise :

- une forte cohésion : les éléments ne sont pas réunis dans un même module par hasard : ils forment un tout dans le but de réaliser une tâche commune.
- un faible couplage : les modules sont relativement indépendants, ne dépendent pas trop des éléments définis dans d'autres modules.

Une bonne conception devrait favoriser l'indépendance des modules. Pour évaluer l'indépendance des modules, on se base généralement sur : le couplage, la cohésion — concepts qui peuvent d'ailleurs s'influencer l'un et l'autre.

#### Faible couplage

- Couplage : mesure de l'interdépendance entre deux modules.
- Un ensemble de modules est faiblement couplé si les liens de dépendance (cf. relation « UTILISE ») entre les modules sont peu nombreux.
- Un faible couplage est précurseur… d'un bon découpage du système (les éléments qui dépendent les uns des autres ne sont pas « éparpillés » à travers les modules) ; d'une facilité de maintenance (nombre de révisions réduites : une modification dans un module affecte éventuellement un nombre restreint d'autres modules).

**Types de couplage — approche procédurale** :

- **De contenu** : les modules échangent de l'information en lisant et écrivant directement dans leurs espaces de données (variables) respectifs. Lorsqu'une composante modifie déloyalement les données internes d'une autre composante de façon furtive, secrète…
- **Commun (global)** : les modules échangent de l'information via un ensemble de données (variables) commun.
- **De contrôle** : un module passe un « flag » à l'autre qui s'en sert à des fins de contrôle d'exécution. Exemple : lorsqu'une procédure appelle une autre en utilisant une variable de contrôle ou une commande contrôlant l'exécution de la procédure appelée. Afin d'effectuer un changement, il faut modifier à la fois l'appelé et l'appelant. L'utilisation d'une opération polymorphique constitue la meilleure façon d'éviter le couplage de contrôle. Une autre façon de réduire ce type de couplage consiste à avoir recours à un tableau de correspondance (look-up) : chaque commande est alors associée à une méthode qui sera appelée lorsque cette commande est lancée.
- **De structures de données (d'estampillage)** : il y a couplage de structures de données si un module passe une structure de données par argument à un autre module. Le module appelé n'a pas besoin de tous les éléments contenus dans la structure de données. Pour réduire ce type de couplage : transmettre que des variables simples.
- **De données** : il y a couplage de données si un module passe des données par argument à un autre module. Le module appelé utilise toutes les données passées en arguments. Lorsque les types des arguments sont des données simples, plus il y a d'arguments, plus ce couplage est fort. Il faut réduire ce type de couplage en évitant d'utiliser des arguments non-nécessaires. Il y a souvent un compromis à faire entre couplage de données et couplage d'estampillage : réduire l'un accroît l'autre.

**Couplage en orienté objet** — en orienté objet les modules se traduisent en méthodes ou en classes. Les méthodes peuvent être couplées par invocation d'une autre méthode ou par le partage de variables avec d'autres méthodes. De la même manière, une classe est couplée à une autre classe s'il y a une relation entre elles. On distingue trois types de couplage [Eder et al., 1995] :

- **Couplage entre composants** : lorsqu'une classe utilise en tant qu'attribut une autre classe.
- **Couplage d'héritage** : si une des deux classes est directement ou indirectement une sous-classe de l'autre.
- **Couplage d'interaction** : lorsqu'une classe invoque une ou plusieurs méthodes procéduraux de l'autre. Les types de couplage appliqués aux systèmes orientés objet sont utilisés pour détailler ce type de couplage :
  - Couplage de données : deux classes présentent un couplage de données, si elles échangent des données seulement en paramètres. Ce type de couplage est le plus recommandé.
  - Couplage de structures de données : deux classes présentent un tel couplage si deux de leurs méthodes respectives se passent comme paramètre une structure de données entière alors qu'une partie de cette structure aurait suffi.
  - Couplage de contrôle : une classe communique avec une méthode d'une autre classe à travers le passage de paramètres qui servent à des fins de contrôle d'exécution.
  - Couplage commun : il signifie que plusieurs méthodes partagent un même ensemble de données.
  - Couplage de contenu : c'est le pire des couplages. Il signifie qu'une méthode appartenant à une classe accède directement à l'implantation d'une méthode d'une autre classe ou à ses variables d'instances.

Le fait d'encapsuler les données (les déclarer `private`, avec des méthodes `get` et `set`) réduit considérablement le couplage.

**Mesurer le couplage** : utiliser une métrique de couplage. Exemple : CBO (Coupling Between Object classes) — la mesure de couplage correspondant au nombre de classes dont la classe considérée est dépendante ; calculée pour chaque classe. Deux classes sont considérées comme couplées quand les méthodes déclarées dans une classe utilisent les méthodes ou les variables d'instance définies par l'autre classe. Un couplage excessif entre classes se fait au détriment de la modularité et empêche la réutilisation. Le couplage devrait être minimal pour promouvoir l'encapsulation : plus une classe est couplée à d'autres classes, plus une modification de cette classe influence les autres.

#### Forte cohésion

- Cohésion = mesure de la force des relations qui unissent les éléments fonctionnels à l'intérieur d'un module.
- Un module est fortement cohésif si tous les éléments sont destinés et sont essentiels à la réalisation d'une tâche commune unique.
- Une forte cohésion est précurseur d'un bon découpage du système (les éléments qui ont rapport les uns avec les autres se retrouvent dans un même module), d'une facilité de maintenance (les éléments destinés à une même tâche sont regroupés et on peut facilement les retrouver), d'un faible couplage (les éléments inter-dépendants se trouvant dans le même module, les dépendances inter-modules sont moindres).

**Types de cohésion — approche procédurale** [Yourdon et Constantine, 1979] :

- **Aléatoire** : les éléments du module n'ont rien à voir les uns avec les autres — le module contient plusieurs fonctions sans aucune liaison entre elles. On la voit par exemple dans des modules d'utilitaires composés de procédures difficiles à placer ailleurs.
- **Logique** : les éléments participent à des activités de la même catégorie ; les composants sont groupés parce qu'ils partagent des opérations. Exemple : une application qui traite des fichiers de différents formats (texte, XML, csv) pourrait mettre les méthodes de traitement dans un même module, paramétré selon le type. Ainsi ces composants ont une logique interne complexe.
- **Temporelle** : éléments réunis ensemble car leurs moments d'exécution sont reliés dans le temps. Exemple : un programme « batch » composé de tâches se déroulant chaque jour dans un même intervalle de temps donné.
- **Procédurale** : les éléments du module sont connectés par le même flux de contrôle, mais impliqués dans des activités différentes et potentiellement sans lien, alors que les données transitent d'un élément à l'autre. Exemple : ouvrir/décompresser/décoder/reproduire un fichier vidéo. Cette configuration peut conduire à des duplications de code si l'application traite plusieurs formats.
- **Communicationnelle** : les éléments du module manipulent le même ensemble spécifique de données. Exemple : un module qui valide l'identification d'un utilisateur (récupérer/valider l'identifiant, récupérer/valider le mot de passe, trouver le domaine, trouver les habilitations).
- **Séquentielle** : les éléments manipulant le même ensemble de données doivent être appelées dans un ordre spécifique — la sortie d'une opération sert d'entrée à la suivante. Exemple : extraction → concaténation → tri → écriture de résultats → calcul de statistiques.
- **Fonctionnelle** : tous les éléments réunis contribuent à l'exécution d'une même et unique tâche. Exemple : un module employé regroupant le calcul des heures travaillées, du salaire brut, des déductions, du salaire net, du bonus.

**Résumé — cohésion approche procédurale** : mesure d'interdépendance entre les fonctions d'un même module.

- Forte cohésion : fonctionnelle (la meilleure), séquentielle, communicationnelle.
- Cohésion faible : procédurale, temporelle, logique.
- Aléatoire (la pire).

Un module peut avoir plusieurs types de cohésion. On caractérise un module par sa cohésion la moins désirable.

**Cohésion en orienté objet** — en orienté objet, la distinction entre la cohésion d'une méthode et la cohésion d'une classe est fondamentale [EKS95]. Trois types de cohésion :

- **Cohésion de méthode** : les types de cohésion définis dans l'approche procédurale sont utilisés (aléatoire, logique, temporelle, procédurale, communicationnelle, séquentielle, fonctionnelle).
- **Cohésion de classe** : décrit la liaison des éléments définis à l'intérieur de la classe. Les variables d'instance et les méthodes héritées ne sont pas considérées. Types de cohésion (de la plus faible à la plus forte) :
  - **Séparable** : les objets de la classe représentent différentes abstractions de données qui n'ont pas de lien entre eux (attributs non utilisés par les méthodes, ou méthodes qui n'utilisent aucun attribut et n'appellent aucune autre méthode). La classe est candidate à la division en plusieurs classes. Localisable par analyse syntaxique.
  - **Multi-facette** : les objets de la classe représentent différentes abstractions de données liées entre elles et accessibles par au moins une méthode. Nécessite une analyse sémantique (au moins une méthode accède à une variable d'instance ou invoque une méthode appartenant à un concept sémantique distinct).
  - **Non déléguée** : ni séparable, ni multi-facette, mais au moins une méthode utilise une variable d'instance qui décrit seulement un composant de la classe (à déléguer à une autre classe).
  - **Cachée** : ni séparable, ni multi-facette, ni non déléguée, mais il existe une abstraction de données cachée dans la classe (candidate à devenir une nouvelle classe à part entière).
  - **Modèle** : le degré le plus élevé — la classe représente un seul concept sémantique, aucune méthode ne peut être déléguée, et elle ne renferme pas de classe cachée.
- **Cohésion d'héritage** : se réfère à la cohésion de classe, mais en prenant en considération les éléments hérités (toutes les variables d'instance et méthodes héritées des ancêtres), pas seulement la super-classe directe.

**Mesurer la cohésion** : utiliser une métrique de cohésion. Exemple : LCOM (Lack Of Cohesion in Methods) — métrique orientée objet pour mesurer le manque de cohésion.

$$LCOM = \max(|P| - |Q|, 0)$$

- Ii = ensemble des variables d'instance utilisées par la méthode i
- P = ensemble des paires (Ii,Ij) ayant une intersection vide
- Q = ensemble des paires (Ii,Ij) ayant une intersection non vide

LCOM peut se représenter comme un graphe biparti : un premier ensemble de nœuds correspond aux attributs, un second aux méthodes. Un attribut est lié à une fonction si celle-ci y accède ou en modifie la valeur ; l'ensemble des arcs correspond à Q. P = nb_attributs × nb_méthodes − Q.

<details>
<summary>Exemple de calcul LCOM (classe <code>Node</code>)</summary>

```java
public class Node {
  private int id;
  private float weightN;

  public Node(int id, float weightN) {
    this.id = id;
    this.weightN = weightN;
  }
  public int getid() { return this.id; }
  public float getweightN() { return this.weightN; }
}
```

- I_Node = `{id, weightN}`
- I_getid = `{id}`
- I_getweightN = `{weightN}`
- P = `{(I_getid, I_getweightN)}`
- Q = `{(I_Node, I_getid), (I_Node, I_getweightN)}`
- LCOM = max(1 − 2, 0) = max(−1, 0) = 0

Autre méthode (graphe biparti) : Nb_attributs = 2, Nb_méthodes = 3, Q = 4 ⇒ P = 2×3 − 4 = 2 ⇒ LCOM = max(2 − 4, 0) = max(−2, 0) = 0. La classe `Node` est donc fortement cohésive.

</details>

## Les principes SOLID

Les principes SOLID ont été introduits par Robert C. Martin (Uncle BOB) en 2000, et ont révolutionné le monde de la programmation orientée objet, en changeant la façon dont nous écrivons des logiciels. En effet, l'application des principes SOLID amène à une ligne directrice pour une conception réfléchie et une application facile à comprendre, tester et maintenir.

SOLID =

- **The Single Responsibility Principle** (Responsabilité unique)
- **The Open-Closed Principle** (Ouvert/Fermé)
- **The Liskov Substitution Principle** (Substitution de Liskov)
- **The Interface Segregation Principle** (Séparation des interfaces)
- **The Dependency Inversion Principle** (Inversion des dépendances)

:::tip Détail des principes SOLID (voir aussi TD4)
- **Responsabilité unique** : une classe doit avoir une et une seule raison de changer.
- **Ouvert/Fermé** : le système doit s'ouvrir pour l'extension et rester fermé à la modification.
- **Substitution de Liskov** : les classes dérivées doivent être substituables à leurs classes de base.
- **Ségrégation des interfaces** : nombreuses interfaces spécifiques plutôt qu'une interface générique.
- **Inversion des dépendances** : programmer par rapport à des abstractions plutôt que des implémentations.
:::

<!-- TODO: unclear in source, verify against original PDF page ~78-80 — le détail complet des 5 principes SOLID et des mauvaises pratiques STUPID (Singleton, Tight coupling, Untestability, Premature optimization, Indescriptive naming, Duplication) apparaît développé dans le Chap4_Conception_2024_nv_COURS et dans le TD4 ; se référer à ces documents pour le détail complet. -->

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/gl-ch4-conception-partie1.pdf" />

</TabItem>
</Tabs>
