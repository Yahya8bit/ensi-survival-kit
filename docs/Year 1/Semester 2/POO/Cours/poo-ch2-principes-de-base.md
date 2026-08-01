---
sidebar_position: 2
title: POO — Principes de Base
sidebar_label: Ch2 — Principes de base
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Programmation Orientée Objet — Principes de base

Plan : pourquoi utiliser les objets ? comment trouver les objets ? comment utiliser ces objets pour structurer les programmes ? paradigme objets & terminologie.

## Pourquoi utiliser les objets ?

### Programmation classique

Un programme est composé de plusieurs procédures (ou fonctions) : qui effectuent un traitement sur des données (procédure), qui retournent une valeur après leur invocation (fonction). Il y a **séparation entre code et données**.

Communication entre modules fonctionnels :
- par passage de paramètres (mode recommandé) : favorise clarté et modularité.
- par variables globales (mauvaise pratique).

Libre accès aux données par n'importe quel module (limite).

Conséquences : difficulté de réutiliser du code déjà écrit et testé ; maintenance coûteuse (instabilité, sécurité, coût).

### Intérêt des objets

Structure d'une application objet ⇒ flots de **messages** entre un certain nombre d'objets, les objets étant « presque » indépendants les uns des autres. Cette indépendance permet la **réutilisation** des objets par de nombreuses applications. Les objets sont plus **stables** que les spécifications qui définissent leurs interactions ⇒ les applications sont plus simples à écrire et à faire évoluer.

- **Extensibilité (maintenance) :** les objets restent plus stables dans le temps → notion de **réification**.
- **Réutilisabilité :** il faut pouvoir réutiliser des structures de données entières, non pas seulement les opérations → **abstraction & encapsulation**.

### Réification

Terme emprunté à la philosophie. Étymologie : *res* = la chose, *facere* = faire.

**Définition en modélisation :** décision que prend le modélisateur de considérer une portion/entité du réel comme un objet, avec ce qu'implique la notion d'objet.

**Principe de réification pragmatique** (Jacques Ferber, 1995) : *« Si l'on parle de quelque chose en lui attribuant des propriétés, ou si cette chose doit être manipulée, alors il faut la représenter sous forme d'objet. »*

En pratique : **réifier** = matérialiser un concept par un objet.
- Un concept abstrait peut être réifié : l'événement « à 10h45 une carte bleue a été introduite ».
- Une relation entre deux objets peut être réifiée : « Ali possède la voiture immatriculée 875 TU 129 » est réifié dans le monde réel par une carte grise.

Réifier un concept permet de le manipuler concrètement. Question ouverte : quels concepts réifier ? Une « bonne » vision objet réifie les « bons » concepts…

**Exemple :** une personne travaille pour une entreprise — cette relation est décrite par des informations (dates de début/fin) → elle est réifiée par un objet `Emploi` reliant `Personne` et `Entreprise`.

### Principe d'abstraction

**Définition :** une abstraction fait ressortir les caractéristiques d'une structure qui la distinguent de tous les autres types de structures du domaine, et procure des frontières conceptuelles rigoureusement définies par rapport au point de vue de l'observateur.

**Exemple :** deux voitures différentes (marque, couleur différentes) partagent le même comportement abstrait — « tourner le volant ⇒ la voiture tourne », « freiner ⇒ la voiture s'arrête ».

Pour être véritablement intéressant, un objet doit permettre un certain degré d'abstraction. Le processus d'abstraction consiste à identifier, pour un ensemble d'éléments : des caractéristiques communes à tous les éléments, des comportements communs à tous les éléments → description générique de l'ensemble considéré : se focaliser sur l'essentiel, cacher les détails.

*« L'objectif de l'abstraction n'est pas d'être vague, mais de créer un nouveau niveau sémantique dans lequel il est possible d'être très précis »* — Edsger Dijkstra (1974). L'abstraction est une **ignorance sélective**.

### Principe d'encapsulation

**Définition :** l'encapsulation est le procédé de séparation des éléments d'une abstraction qui constituent sa structure et son comportement. Elle permet de dissocier l'**interface contractuelle** de la **mise en œuvre** d'une abstraction.

Dans les programmes classiques, les notions de type de données et de fonctions sont séparées (types de données `dataType₁...dataTypeₙ` d'un côté — aspect statique, fonctions `fonction₁...fonctionₘ` de l'autre — aspect dynamique — reliés de façon croisée et peu structurée).

Le principe d'encapsulation consiste à regrouper, dans un même élément informatique appelé **objet**, les aspects statique et dynamique (données et fonctions) spécifiques à une entité :
- les [structures de] données définies dans un objet sont appelées les **attributs** de l'objet ;
- les fonctions [de manipulation] définies dans un objet sont appelées les **méthodes** de l'objet.

**Relation fondamentale : `OBJET = attributs + méthodes`**

Un intérêt de l'encapsulation est qu'elle permet de définir deux niveaux de perception :
- **Le niveau externe** (perception depuis l'extérieur) : constitué des spécifications des éléments visibles de l'extérieur (« éléments publics »), à savoir les prototypes et déclarations de méthodes et attributs publics. Ce niveau représente l'**interface** de l'objet avec l'extérieur.
- **Le niveau interne** (perception depuis l'intérieur) : constitué des éléments visibles uniquement de l'intérieur de l'objet (« éléments privés »). Ce niveau représente le **corps** de l'objet.

**Exemple (télécommande) :** l'interface (les boutons) vs. la réalisation (le circuit électronique interne). Deux rôles : utilisateur (manipule les éléments de l'abstraction qui constituent l'interface) et implanteur (réalise ce qui est encapsulé).

**Importance de l'encapsulation — interface vs réalisation :** la séparation entre niveau interne et externe donne un cadre plus rigoureux : les objets ne peuvent être utilisés qu'au travers de leur interface (niveau externe) ; de ce fait, les éventuelles modifications apportées à leur structure interne restent invisibles à l'extérieur.

## Comment trouver les objets ?

À partir du **monde réel** : tout ce sur quoi l'attention peut se porter, que l'on peut décrire, dont on peut parler.

**Exemples d'objets :**
- Des objets physiques : une voiture, une maison, un dossier, un plan de travail, un agenda, etc.
- Des objets conceptuels ou conventionnels : un compte bancaire, un contrat, un risque, un projet, etc.
- L'argent, la responsabilité, l'action, etc.

### L'approche objet

Les langages objets sont fondés sur la connaissance d'une seule catégorie d'entité informatique : **l'objet**. Dans un objet, ce sont traditionnellement les **données** qui deviennent prépondérantes. On se pose d'abord la question *« de quoi parle-t-on ? »* et non pas *« que veut-on faire ? »*, comme en programmation procédurale.

L'approche objet consiste à résoudre un problème en termes d'objets qui **collaborent**. Ces objets sont des abstractions des objets réels — le monde est composé d'entités qui « collaborent » (ex. une voiture : moteur, direction, roues, boîte de vitesse, freins, chauffeur, qui interagissent avec un feu de signalisation).

**Objet concret : une pile.** Encapsulation des données (tableau des éléments, indice du sommet — représentation) et des traitements (empiler, dépiler, sommet, ... — interface) dans un objet ; l'environnement n'accède qu'à l'interface, qui elle-même accède à la représentation.

## Comment utiliser ces objets pour structurer les programmes ?

Un programme objet est structuré comme un ensemble d'objets (chacun composé d'attributs et de méthodes) qui échangent des **messages** entre eux.

## Paradigme objets & terminologie

- Classes & Objets
- L'instanciation
- L'envoi de message
- Classification et héritage
- Polymorphisme

### Classes d'objets

Une **classe** est une abstraction d'un concept, ne contenant que les détails nécessaires au système ; elle encapsule les données et les opérations.

**Classe :** une classe regroupe les caractéristiques (les *primitives* = attributs et méthodes) communes à des objets et permettant de créer des objets possédant ces propriétés.

**Méthodes :**
- **Modifieurs** : ont un effet sur l'instance mais ne produisent pas de résultats.
- **Accesseurs** : ont un résultat, généralement pas d'effet.

Une classe représente la structure, le **moule** commun à un ensemble d'objets. Une classe est une **abstraction** d'objets.

**Exemple :** des objets similaires peuvent être décrits par une même classe (même structure de données et méthodes de traitement, valeurs différentes pour chaque objet) — ex. classe `Livre` (titre, auteur), classe `Journal` (titre), classe `Employé` (nom, prénom, statut), classe `Lecteur` (nom, prénom), chacune instanciée par plusieurs objets concrets.

### Objet

Un objet est une **instance** d'une classe.

**Objet :** entité autonome modélisant l'aspect **statique** et **dynamique** d'une partie du monde réel. Un objet peut représenter une réalité physique (une voiture, un bateau…) ou virtuelle (sécurité sociale, un raisonnement…). Chaque objet possède des attributs, des méthodes, une identité.

- **attributs** (données membres) : données caractérisant l'**état** de l'objet.
- **méthodes** (fonctions membres) : opérations définissant le **comportement** de l'objet ; elles lui permettent d'agir sur ces attributs et de réagir aux sollicitations extérieures.
- **identité** : identifiant permettant de le distinguer des autres indépendamment de son état.

**`Objet = État + Comportement + Identité`**

Un objet est une entité qui possède :
- **Une identité** : nom qui permet de distinguer un objet d'un autre objet.
- **Un état** : ensemble de valeurs caractérisant l'objet.
- **Des comportements** : ensemble d'opérations que l'objet peut effectuer (peuvent modifier l'état interne de l'objet).

**Exemple :** `deudeuche : Voiture` avec état `marque = "Citroën"`, `couleur = bleue`, `proprio = "Alfred"`, `vitesse = 50` et comportements `demarrer()`, `tourner()`, `accelerer()`, `ralentir()`, `arreter()`.

### Instanciation

**Instanciation = passage de l'indéfini au défini (par moulage).** À partir d'une classe `voiture` (avec attributs `Immatricule`, `couleur`, `roues`, `puissance`, `vitesse` et méthodes `accélérer`, `freiner`, `tourner`, `reculer`), on obtient des instances (objets) distinctes — ex. `1717 TU 27` (bleue, 4 roues, 2CV, 50 km/h) et `6742 TU 28` (grise, 4 roues, 2CV, 10 km/h).

L'instance (objet, selon le langage — ex. Java) :
- possède les propriétés définies par sa classe ;
- peut effectuer les opérations définies par sa classe.

### L'envoi de messages

Un objet est une entité indépendante dont la structure est connue de lui seul ; il ne peut pas, en principe, agir directement sur un autre objet. Il doit pour se faire utiliser une des méthodes appartenant à l'interface de l'objet.

- **Message** = requête dont la satisfaction est à la charge de l'objet auquel elle est adressée.
- **Envoi de message** = unique moyen de communiquer avec les objets.

**Exemple :** `Send (MaVoiture, « freiner »);` — ou en C++/Java/C# : `MaVoiture.freiner();`

### Communication entre objets

Les objets communiquent entre eux via l'envoi de messages. Un message consiste à demander à l'objet d'effectuer une opération particulière (ex. `alfredDupont : Conducteur` envoie `accélérer` à `deudeuche : Voiture`).

Le message est composé de :
- le nom de l'opération souhaitée (le nom de la méthode) ;
- l'ensemble des informations nécessaires à son bon fonctionnement (les paramètres/arguments de la méthode) ;
- en retour, l'objet peut répondre par une valeur ou par un autre objet.

Le **paradigme d'envoi de messages** (mode de communication) est important pour le choix des langages OO dans les applications modernes, de par la facilité qu'il implique dans la création de systèmes client-serveur.

### Classification — Généralisation & Spécialisation

Idée ancienne : classification des espèces vivantes selon le genre et l'espèce.

**Principe :** factoriser des informations communes dans une catégorie et introduire les spécificités dans des sous-catégories. Les sous-catégories **héritent** des propriétés des catégories parentes (base/dérivée).

**Exemple :** `Être Vivants` → `Animal` / `Plante`, et `Animal` → `Mammifère` / `Oiseau`.

### Polymorphisme

**Polymorphisme** = capacité d'un même symbole (nom de fonction/méthode) à avoir plusieurs significations différentes selon le contexte d'exécution.

*Poly* = multiple, *Morphisme* = structure. Relatif à un traitement en mesure de s'adapter aux données qu'il manipule :
- **Surcharge :** donner plusieurs significations à un même symbole.
- **Généricité :** paramétrer des traitements et des définitions de structures par des types.
- **Liaison dynamique :** établir le lien entre le nom d'une opération et l'algorithme de l'opération lors de l'exécution.

## Exercice — Les tours de Hanoï

Le jeu des tours de Hanoï se présente sous la forme d'un support en bois sur lequel sont plantées trois tiges A, B et C qui symbolisent les tours. Sur ces trois tiges peuvent être enfilés des disques de diamètres différents (8 dans la version originale, mais N de manière générale). Chaque tour peut contenir de 0 à N disques. Dans la configuration initiale, tous les disques sont empilés par ordre de taille décroissante sur la tige A.

Le but du jeu est de transférer tous les disques de la tige A vers la tige C sachant que :
- un seul disque peut être déplacé à la fois ;
- seul le disque en haut d'une tige (tour) peut être déplacé ;
- un disque ne peut jamais être posé sur un disque de taille inférieure à la sienne.

Dans la configuration finale, tous les disques sont donc empilés par ordre de taille décroissante sur la tige C.

**Question :** quelles sont les classes que nous pouvons utiliser pour implémenter ce jeu ?

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/poo-ch2-principes-de-base.pdf" />

</TabItem>
</Tabs>
