---
sidebar_position: 1
title: Chapitre I - Architecture et Fonctionnement d'un Microprocesseur
sidebar_label: Ch1 - Architecture et Fonctionnement
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Cours : Architecture & Microprocesseur

**École Nationale des Sciences de l'Informatique**
Responsable du Module : Dr. Ing. Montassar EZZINE
Public visé : Première année Ingénieur II1 — Année universitaire : 2025/2026

## Contenu du Cours

- **Chapitre I** : Architecture et fonctionnement d'un microprocesseur
- **Chapitre II** : Les mémoires
- **Chapitre III** : Le microprocesseur 8086
- **Chapitre IV** : Programmation assembleur
- **Chapitre V** : Les interruptions

# Chapitre I : Architecture et fonctionnement d'un microprocesseur

## Partie 1 : Architecture de Base

### Introduction

L'informatique, contraction d'information et automatique, est la science du traitement de l'information. Apparue au milieu du 20ème siècle, elle a connu une évolution extrêmement rapide.

À sa motivation initiale qui était de faciliter et d'accélérer le calcul, se sont ajoutées de nombreuses fonctionnalités, comme l'automatisation, le contrôle et la commande de processus, la communication ou le partage de l'information.

Le cours d'architecture des systèmes à microprocesseurs expose les principes de base du traitement programmé de l'information. La mise en œuvre de ces systèmes s'appuie sur deux modes de réalisation distincts, le matériel et le logiciel.

- Le **matériel** (*hardware*) correspond à l'aspect concret du système : unité centrale, mémoire, organes d'entrées-sorties, etc.
- Le **logiciel** (*software*) correspond à un ensemble d'instructions, appelé programme, qui sont contenues dans les différentes mémoires du système et qui définissent les actions effectuées par le matériel.

### Préliminaires

- Ordinateur et informations
- Principe de fonctionnement d'un ordinateur
- Périphérique informatique
- Schéma synoptique d'un ordinateur
- Schéma général d'un ordinateur

### Ordinateur et informations

Un ordinateur est une machine de traitement de l'information. Il est capable de :

- Acquérir des informations.
- Conserver des informations.
- Effectuer des traitements sur des informations.
- Restituer (récupérer) des informations.

### Principe de fonctionnement d'un ordinateur

Un ordinateur se compose de :

**I. Une mémoire centrale :**

Elle contient 2 types d'informations :

- **Les instructions :** qui sont stockées sous forme de code machine. *Exemple : `add 10000001`*
- **Les données :** qui sont stockées selon d'autres codes. *Exemple : code ASCII.*

**II. Une unité centrale de traitement** (*Central Processing Unit* CPU) comportant 2 unités :

- **Unité arithmétique et logique (UAL) :** effectue les opérations arithmétiques (`+`, `-`, `*`, `/`) et logiques (`AND`, `OR`, `XOR`…).
- **Unité de commande (UC) :** elle dirige le fonctionnement de toutes les autres unités en leur fournissant les signaux nécessaires à l'exécution des instructions d'un programme.

**III. Les contrôleurs d'entrées / sorties :**

Permettent le transfert des informations entre l'unité centrale et les unités périphériques. *Exemple : Contrôleur de Bus, Contrôleur du clavier, Contrôleur de disque dur…*

**IV. Les Unités périphériques :**

- Les unités qui permettent à l'ordinateur d'échanger des informations avec l'extérieur (clavier, écran, modem, imprimante…).
- Les mémoires auxiliaires (CD-ROM, Disque dur…).

### Périphérique informatique

Un **périphérique informatique** est un dispositif connecté à un système informatique (ordinateur ou console de jeux) qui ajoute à ce dernier des fonctionnalités.

On classe généralement les périphériques en deux types : les périphériques d'entrée et les périphériques de sortie.

- **Les périphériques d'entrée** servent à fournir des informations (ou données) au système informatique : clavier (frappe de texte), souris (pointage), scanneur (numérisation de documents papier), micro, webcam, etc.
- **Les périphériques de sortie** servent à faire sortir des informations du système informatique : écran, imprimante, haut-parleur, etc.
- On peut également rencontrer **des périphériques d'entrée-sortie** qui opèrent dans les deux sens : un lecteur de CD-ROM ou une clé USB, par exemple, permettent de stocker des données (sortie). Une autre catégorie peut être ajoutée à ce dernier type, il s'agit des périphériques multifonctions (**MFD** pour *Multi-Functional Device*) comme un disque externe ou encore une imprimante qui fait aussi office de scanneur…

### Schéma synoptique d'un ordinateur

```
Clavier   ─┐                              ┌─→ Ecran
Souris    ─┼─→ [ Microprocesseur ]        ├─→ Imprimante
Microphone─┘   [ Mémoire Centrale ]  ─────┤
               [ Contrôleurs d'E/S ]      └─→ Baffles
                       ↕
                   Stockage
```

### Schéma général d'un ordinateur

```
┌─────────────────────┐            ┌──────────────────────┐
│      Processeur      │            │   Mémoire Principale  │
│  ┌────────────────┐   │  codes    │      (M.P.)            │
│  │ Unité de        │◄──┼──instr.──┤  ┌─────────────────┐   │
│  │ commande        │   │           │  │   Programme      │   │
│  └───────┬────────┘   │           │  └─────────────────┘   │
│          ▼             │  données  │  ┌─────────────────┐   │
│  ┌────────────────┐   │◄──binaires┼─►│    Données        │   │
│  │ Unité de        │   │           │  └─────────────────┘   │
│  │ traitement (UAL)│   │           └──────────────────────┘
│  └───────┬────────┘   │
└──────────┼─────────────┘
           ▼ informations codées en binaire
   ┌─────────────────┐
   │ Unité d'entrées/  │
   │ sorties           │
   └───┬───────────┬───┘
       ▼           ▼
   CLAVIER       ECRAN
```

## Modèle de Von Neumann

Pour traiter une information, un microprocesseur seul ne suffit pas, il faut l'insérer au sein d'un système minimum de traitement programmé de l'information.

John Von Neumann est à l'origine d'un modèle de machine universelle de traitement programmé de l'information (1946). Cette architecture sert de base à la plupart des systèmes à microprocesseur actuels. Elle est composée des éléments suivants :

- une unité centrale
- une mémoire principale
- des interfaces d'entrées/sorties

Les différents organes du système sont reliés par des voies de communication appelées **bus**.

```
┌───────────────┐   ┌──────────────────┐   ┌─────────────┐
│ Unité centrale │   │ Mémoire Principale│   │ Interface E/S│
└───────┬────────┘   └─────────┬────────┘   └──────┬──────┘
        │                       │                     │
        ▼                       ▼                     ▼
════════════════════════ bus ═══════════════════════════════
```

## L'unité centrale

Elle est composée par **le microprocesseur** qui est chargé :

- *d'interpréter et d'exécuter* les instructions d'un programme,
- *de lire ou de sauvegarder* les résultats dans la mémoire,
- *de communiquer* avec les unités d'échange.

Toutes les activités du microprocesseur sont cadencées par une horloge.

On caractérise le microprocesseur par :

- sa fréquence d'horloge en MHz ou GHz.
- le nombre d'instructions par secondes qu'il est capable d'exécuter en MIPS (unité de mesure utilisée en informatique).
- la taille des données qu'il est capable de traiter en bits.

## La mémoire principale

Elle contient les instructions du ou des programmes en cours d'exécution et les données associées à ce programme.

Physiquement, elle se décompose souvent en :

- une **mémoire morte** (**ROM** = *Read Only Memory*) chargée de stocker le programme. C'est une mémoire à lecture seule.
- une **mémoire vive** (**RAM** = *Random Access Memory*) chargée de stocker les données intermédiaires ou les résultats de calculs. On peut lire ou écrire des données dedans ; ces données sont perdues à la mise hors tension.

## Les interfaces d'entrées/sorties

**Rappel :** Elles permettent d'assurer la communication entre le microprocesseur et les périphériques (clavier, moniteur ou afficheur, imprimante, modem, etc.).

- Si nous observons un ordinateur, nous remarquons qu'il possède des endroits nous permettant de connecter des périphériques comme le moniteur, le clavier, la souris, les hauts parleurs, l'imprimante, les clés USB, les mémoires, l'alimentation etc. Ce sont ces endroits-là que nous appelons interface.
- Les cartes électroniques connectées verticalement à la carte mère et assurant la communication entre les périphériques et la carte mère, sont appelées cartes d'interfaces d'entrée-sortie.
- L'interface (connecteur), appelée aussi unité d'échange d'entrée-sortie ou **port d'entrée-sortie** est un sous-ensemble matériel, logiciel et des spécifications permettant à l'UC d'échanger des informations avec le monde extérieur.

Ce connecteur comporte un ensemble de broches permettant le transfert des signaux soit en série soit en parallèle.

- Du côté de l'ordinateur, l'interface est reliée au « bus système »…
- Du côté du périphérique, l'interface est en liaison avec le contrôleur…

## Les Bus

Un **bus** est un ensemble de fils qui assure la transmission du même type d'information.

On retrouve trois types de bus véhiculant des informations en parallèle dans un système de traitement programmé de l'information :

- **un bus de données :** bidirectionnel qui assure le transfert des informations entre le microprocesseur et son environnement, et inversement. Son nombre de lignes est égal à la capacité de traitement du microprocesseur. *(Exemple : bus de 4 bits)*
- **un bus d'adresses :** unidirectionnel qui permet la sélection des informations à traiter dans un espace mémoire ou espace adressable qui peut avoir 2<sup>n</sup> emplacements, avec n le nombre de conducteurs du bus d'adresses. *(Exemple : un boîtier mémoire 16\*4 ; avec 16 = 2<sup>4</sup> : 16 le nombre de cases mémoires, 4 les lignes d'adresses.)*
- **un bus de commande :** constitué par quelques conducteurs qui assurent la synchronisation des flux d'informations sur les bus des données et des adresses.

## Décodage d'adresses

La multiplication des périphériques autour du microprocesseur oblige la présence d'un **décodeur d'adresse** chargé d'aiguiller les données présentes sur le bus de données.

En effet, le microprocesseur peut communiquer avec les différentes mémoires et les différents boîtiers d'interface. Ceux-ci sont tous reliés sur le même bus de données et, afin d'éviter des conflits, un seul composant doit être sélectionné à la fois.

Lorsqu'on réalise un système microprogrammé, on attribue donc à chaque périphérique une zone d'adresse et une fonction « décodage d'adresse » est donc nécessaire afin de fournir les signaux de sélection de chacun des composants.

```
                     ┌──────────────────┐
                     │ Décodeur d'adresses│
                     └─────────┬──────────┘
Bus d'adresses ══════════════════════════════════
                     Bus de commande
                     ┌───┬────────────┬───┐
┌───────────────┐   ┌▼───────────┐  ┌▼──────────┐
│ Unité centrale │   │  Mémoire    │  │ Interface  │
│                │   │  Principale │  │    E/S     │
└───────┬────────┘   └──────┬──────┘  └─────┬──────┘
Bus de données ═══════════════════════════════════
```

## Partie 2 : Fonctionnement d'un microprocesseur

### Structure d'un calculateur

L'élément de base d'un calculateur est constitué par :

**La mémoire centrale** contient :

- le programme à exécuter : suite d'instructions élémentaires ;
- les données à traiter.

```
                  ┌─ unité centrale de traitement (UCT) ─┐
horloge ──────►[unité de contrôle]     [registres]
                       │                    ↕
                       ▼               [unité arithmétique
                [ordres/commandes]      et logique (UAL)]◄──────┐
                                              ↕                  │
                                       [unité de transfert]◄──►[unité
                                              ↕                d'entrées/
                                       [mémoire centrale]      sorties]◄──► monde extérieur
```

**L'unité centrale de traitement** (UCT, CPU : *Central Processing Unit*) est constituée :

- *d'une unité arithmétique et logique* (UAL, ALU : *Arithmetic and Logic Unit*) : c'est l'organe de calcul du calculateur ;
- *de registres* : zones de stockage des données de travail de l'UAL (opérandes, résultats intermédiaires) ;
- *d'une unité de contrôle* (UC, CU : *Control Unit*) : elle envoie les ordres (ou commandes) à tous les autres éléments du calculateur afin d'exécuter un programme.

**L'unité d'entrées/sorties (E/S)** est un intermédiaire entre le calculateur et le monde extérieur.

**L'unité de transfert** est le support matériel de la circulation des données. *Dans un micro-ordinateur ce sont des cartes comme la carte son, la carte vidéo, etc.*

- Soulage le processeur central dans les tâches de gestion du transfert de l'information.

Les échanges d'ordres et de données dans le calculateur sont synchronisés par une horloge qui délivre des impulsions (signal d'horloge) à des intervalles de temps fixes.

:::info Définition
Un **microprocesseur** consiste en une unité centrale de traitement (UAL + registres + unité de contrôle) entièrement contenue dans un seul circuit intégré. Un calculateur construit autour d'un microprocesseur est un micro-calculateur ou un micro-ordinateur.
:::

### Organisation de la mémoire centrale

La mémoire peut être vue comme un ensemble de cellules ou cases contenant chacune une information ou une instruction ou une donnée.

Chaque case mémoire est repérée par un numéro d'ordre unique : **son adresse.**

Une case mémoire peut être lue ou écrite par le microprocesseur (cas des *mémoires vives*) ou bien seulement lue (cas des *mémoires mortes*).

```
adresse   contenu
0003H  →   12H
0002H  →   C6H
0001H  →   05H
0000H  →   3EH
```
*(largeur des cases mémoire : en général 1 octet (8 bits) = unité d'adressage)*

### Circulation de l'information dans un calculateur

La réalisation matérielle des ordinateurs est généralement basée sur l'architecture de *Von Neumann* déjà présentée :

```
[microprocesseur] ↔ [mémoire] ↔ [E/S] ↔ périphériques
        ↕               ↕          ↕
════════════════════ BUS ═══════════════════
```

- Le microprocesseur échange des informations avec la mémoire et l'unité d'E/S, sous forme de mots binaires, au moyen d'un ensemble de connexions appelé *bus*.
- Un bus permet de transférer des données sous forme *parallèle*, c'est-à-dire en faisant circuler n bits simultanément.
- Les microprocesseurs peuvent être classés selon la longueur maximale des mots binaires qu'ils peuvent échanger avec la mémoire et les E/S : microprocesseurs 8 bits, 16 bits, 32 bits, ...

Le bus, comme déjà vu, peut être décomposé en trois bus distincts :

- *le bus d'adresses* permet au microprocesseur de spécifier l'adresse de la case mémoire à lire ou à écrire ;
- *le bus de données* permet les transferts entre le microprocesseur et la mémoire ou les E/S ;
- *le bus de commande* transmet les ordres de lecture et d'écriture de la mémoire et des E/S.

:::note Remarque
Les bus de données et de commande sont bidirectionnels, le bus d'adresse est **unidirectionnel** : seul le microprocesseur peut délivrer des adresses.
:::

### Description matérielle d'un microprocesseur

Un microprocesseur se présente sous la forme d'un circuit intégré muni d'un nombre généralement important de broches.

*Exemples :*

- Intel 8085, 8086, Zilog Z80 : 40 broches ;
- Motorola 68000 : 64 broches ;
- Intel 80386 : 196 broches.

Schéma fonctionnel (entrées : alimentation, horloge, reset, signaux de commande ; sorties : bus d'adresses `n` bits, bus de données `p` bits, bus de commande).

### Fonctionnement d'un microprocesseur

Un microprocesseur exécute un programme. Le programme est une suite d'instructions stockées dans la mémoire. Une instruction peut être codée sur un ou plusieurs octets.

**Format d'une instruction**

```
[opération à effectuer]  [opérande 1] , [opérande 2]
       ex: ADDITIONNER    case mémoire 1, case mémoire 2
```

**Rangement en mémoire**

Pour exécuter les instructions dans l'ordre établi par le programme, le microprocesseur doit savoir à chaque instant l'adresse de la prochaine instruction à exécuter. Le microprocesseur utilise un registre contenant cette information. Ce registre est appelé **pointeur d'instruction** (*IP : Instruction Pointer*) ou **compteur d'instructions** ou **compteur ordinal**.

:::note Remarque
La valeur initiale du pointeur d'instruction est fixée par le constructeur du microprocesseur. Elle vaut une valeur bien définie à chaque mise sous tension du microprocesseur ou bien lors d'une remise à zéro (*reset*).
:::

Pour savoir quel type d'opération doit être exécuté (addition, soustraction, ...), le microprocesseur lit le premier octet de l'instruction pointée par le pointeur d'instruction (code opératoire) et le range dans un registre appelé **registre d'instruction**. Le code opératoire est décodé par des circuits de décodage contenus dans le microprocesseur. Des signaux de commande pour l'UAL sont produits en fonction de l'opération demandée qui est alors exécutée.

:::note Remarque
Pour exécuter une instruction, l'UAL utilise des registres de travail, exemple **l'accumulateur**, registre temporaire recevant des données intermédiaires.
:::

Pendant que l'instruction est décodée, le pointeur d'instruction est incrémenté de façon à pointer vers l'instruction suivante, puis le processus de lecture et de décodage des instructions recommence. À la suite de chaque instruction, un registre du microprocesseur est actualisé en fonction du dernier résultat : **registre d'état du microprocesseur**. Chacun des bits du registre d'état est un indicateur d'état ou *flag* (drapeau).

### Structure complète d'un microprocesseur simple

Pour fonctionner, un microprocesseur nécessite donc au minimum les éléments suivants :

```
┌────────────────────┬─────────────────────────┐
│  Unité Arithmétique │  registres                │
│  et Logique (UAL)   │  - pointeur d'instruction │
│                      │  - registre d'instruction │
│                      │  - accumulateur           │
│                      │  - indicateurs d'état      │
├──────────────────────┼─────────────────────────┤
│  séquenceur           │  décodeur d'instructions   │
│  [horloge]─[quartz]   │                            │
└────────────────────┴─────────────────────────┘
```

### Applications

**Nommer les systèmes suivants (correction) :**

1. **Ventirad** : ventilateur + radiateur lié au CPU pour refroidissement.
2. **Processeur**.
3. **Socket** : socle placé sur la carte mère où on peut fixer certains microprocesseurs.

</TabItem>
<TabItem value="pdf" label="PDF">

**Partie 1 : Architecture de Base**

<PdfViewer file="/pdfs/micp-ch1-part1.pdf" />

**Partie 2 : Fonctionnement d'un microprocesseur**

<PdfViewer file="/pdfs/micp-ch1-part2.pdf" />

</TabItem>
</Tabs>
