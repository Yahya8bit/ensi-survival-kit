---
sidebar_position: 1
title: Chapitre I - Présentation Générale des Systèmes d'Exploitation
sidebar_label: Ch1 - Introduction aux SE
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Introduction aux Systèmes d'Exploitation et Mise en Œuvre sous Unix

*Dr. Hanen Idoudi — hanen.idoudi@gmail.com*

## Objectifs généraux

- Connaître les principes de base, les rôles et les composants d'un SE.
- Maîtriser l'environnement Unix : Interface Shell, Programmation C, Primitives du système de fichiers.

## Plan (aperçu du cours)

**I. Présentation générale des systèmes d'exploitation** — Définition et objectifs, Évolution, Fonctions, Structure, Caractéristiques des SE modernes.

**II. Environnement UNIX** — Historique, Caractéristiques générales, Système de fichiers, Shell et programmation Shell, Filtres : grep, sed, awk, find, sort.

**III. Programmer en C sous GNU/LINUX** — Environnement d'exécution (GCC et make), Interaction avec l'environnement d'exécution, Gestion des erreurs, Écrire et utiliser des Bibliothèques.

**IV. Le système de gestion de fichiers** — Organisation, Primitives d'accès élémentaires aux fichiers, Sécurité et Protection, Le système de fichiers d'UNIX (E/S de base, répertoire, inode).

## Bibliographie

- *« La communication sous Unix »*, Jean-Marie Rifflet, Édition Eyrolles.
- *« Systèmes d'exploitation, conception et mise en œuvre »*, A. Tanenbaum, InterEditions.

# CHAPITRE I — Présentation générale des systèmes d'exploitation

## Introduction

- Un système d'exploitation est le logiciel qui fait fonctionner une machine.
- C'est le logiciel qui exploite l'universalité de la machine et qui la transforme en un système opératoire apte à accomplir des tâches spécifiques.
- L'environnement d'un utilisateur se construit par des couches logicielles successives basées sur la couche « HARDWARE ».
- Le passage par un système d'exploitation est nécessaire.

**Structure générale d'un système informatique** (de bas en haut) :

```
Matériel
  ↓
Logiciel de base : Gestion (Mémoire, Processeur, Fichiers, Périphériques, Communication)
  ↓
Outils (Editeurs, Compilateurs, Editeurs de liens, Chargeur, Metteur au point, Interpréteur de commandes)
  ↓
Logiciel d'Application : Programmes (Applications, Atelier de Développement, Base de données, Navigateur)
  ↓
Utilisateurs
```

*(Le « Programmeur » interagit avec les outils, le « Programmeur Système » avec la gestion des périphériques et de la communication.)*

## Définitions, objectifs, généralités des SE

En anglais : « *Operating System (OS)* ».

**Qu'est-ce que c'est ?** « Programme assurant la gestion de l'ordinateur et de ses périphériques » *(www.dicofr.com)*

**À quoi ça sert ?**

- à simplifier la vie des utilisateurs et des programmeurs
- à gérer les ressources de la machine d'une manière efficace

### Abstraction

**Abstraction :** Cacher la complexité des machines afin d'utiliser la machine sans savoir ce qui est derrière.

Abstraction du terme « Machine » :

- **machine réelle** = Unité centrale + périphériques
- **machine abstraite** = machine réelle + système d'exploitation
- **machine utilisable** = machine abstraite + applications

## Évolution des systèmes d'exploitation

- Exploitation porte ouverte : 1945-1955
- Traitement par lots (*batch*) : 1955-1965
- Multiprogrammation et traitement par lots : 1965-1980
- Multiprogrammation et partage de temps : 1965-1980
- Systèmes d'exploitation d'ordinateurs personnels
- Exploitation en réseau
- Exploitation en distribué
- Systèmes multiprocesseurs
- Système d'exploitation temps réel

### Processus

:::info Définition
Un **processus** est une instance d'un programme en cours d'exécution → aspect **dynamique** d'un programme.
:::

### Traitement par lots (*Batch processing*)

- Un utilisateur donne plusieurs commandes (« Jobs ») dans une file d'exécution de programmes.
- Entièrement séquentielle.
- *Exemple :* pour faire plusieurs calculs pendant la nuit.
- *Exemple :* `autoexec.bat`

### Systèmes Multi-tâches (*Multitasking*)

- Assurer l'exécution de **plusieurs programmes** en **même temps** (c.à.d. plusieurs processus).
- Chaque processus a besoin du processeur : situation concurrente → solution : « *scheduling* ».

### Systèmes Multi-utilisateurs (« *time-sharing* »)

- Permettre à **différentes personnes** de travailler avec **un ordinateur** en **même temps**.
- Connexion : via le terminal de l'ordinateur lui-même, ou à distance (telnet, ssh, ftp, ...).
- Donner l'impression à chaque utilisateur qu'il est seul.
- Exige une gestion des droits : de fichiers (pour éviter la destruction des fichiers etc.), de processus.
- **Login**, avec 3 **types** : Administrateur (« root »), Groupes, Utilisateurs — pour gérer les droits.

### Systèmes Multi-processeurs

- Système avec plusieurs processeurs : parallèle, vrai multi-tâche ; doit assurer qu'il y a l'exécution d'autant de processus que processeurs en même temps.
- Contrairement : système avec un seul processeur → quasi-parallèle, arrêter et reprendre les différents processus. Gestion avec le « *scheduler* » (ordonnancement des processus).

### Systèmes Temps réels

- Doit garantir des temps de réactions bornés pour des signaux extérieurs urgents.
- Sert pour le pilotage et le contrôle de certaines applications critiques (p.ex. centrale électrique).

### Systèmes distribués

- Doit permettre l'exécution d'un **seul programme** sur **plusieurs machines**.
- Distribuer les processus et les remettre ensemble.
- Pour gros calculs.

## Mode de fonctionnement des OS

**Mode interactif** = dialogue homme machine, éventuellement à distance.

- **Mode temps partagé :** les utilisateurs utilisent toutes les fonctionnalités de l'ordinateur, comme s'ils les avaient pour eux tous seuls. *Exemple :* jeux, navigateur Internet...
- **Mode transactionnel :** commandes exécutées rapidement mais saisie lentement. Les utilisateurs exécutent un nombre limité de programmes. Requêtes courtes mais très nombreuses. *Exemple :* réservation de billets de train.

**Mode différé** = traitement par lot/batch.

- L'utilisateur fournit un travail et récupère le résultat quelques heures après.
- Éventuellement à distance ; pas d'interaction avec l'utilisateur.
- Le travail exige généralement des ressources importantes : temps CPU, espace mémoire, E/S.
- *Exemple :* traitement des déclarations des compagnies d'assurances.

**Mode temps réel** = contrôle de procédés industriels.

- L'ordinateur prend des mesures au moyen de capteurs externes, pour surveiller un procédé, et lui envoie en retour des commandes pour en assurer la bonne marche.
- Les délais de réponse sont imposés par le système et doivent être respectés pour assurer le bon fonctionnement.

## Fonctions d'un SE — Modèle en couches

```
Programme d'Application
Gestion des fichiers
Gestion des périphériques (entrées/sorties)
Gestion des processus
Gestion de la mémoire
Noyau du Système d'exploitation
   Pilote | Pilote | Pilote
Matériel
```

## Rôles du SE

| | Problème | Solution |
|---|---|---|
| **Gestion des ressources** | Les programmes devraient gérer l'ensemble des composants matériel d'un ordinateur | OS = couche logicielle enrobant et gérant tout le matériel. Gestion des ressources matérielles & logicielles : mémoire, processeurs, prog, données, communications. Ceci comprend l'allocation, le partage et la protection. |
| **Adaptation d'interface** | Chaque composant matériel est complexe à exploiter | OS réalise une « machine virtuelle ». Offre aux utilisateurs une interface plus commode à utiliser que celle du matériel : dissimule les détails de mise en œuvre (+ haut niveau d'abstraction) ; dissimule les limitations physiques (taille de mémoire, nbre de processeurs) et le partage des ressources entre plusieurs utilisateurs. |

### Gestion des données et des fichiers

**Gestion des périphériques d'E/S & des équipements de communications**

- Confiée aux pilotes/drivers.
- Lire/écrire dans les ports d'E/S.
- Pilotes spécifiques & génériques en même temps : spécifique au dispositif d'E/S (exp : reconnaissance du modem en tant que port de communication) ; générique pour une classe de dispositif (utilisation du port de communication du modem).

**Gestion des fichiers**

- Conservation (permanence) des données.
- Organisation des données sous forme d'arbre (Fichier, Répertoire).
- Protection (sécurité), partage et intégrité des données.
- Correspondance entre l'organisation logique (arborescence vue par l'utilisateur) et physique des données.
- Réalisation des fonctions d'accès aux fichiers.
- **Système de fichiers** = structure logique d'accueil des données permettant la gestion d'une partie de l'espace disque (notion de partitions).

### Gestion de la mémoire

**Fonctions :**

- Répartition de la mémoire aux différents processus actifs.
- Placement des processus dans la zone qui leur est allouée.
- Localisation des données pour chaque processus.
- Maintien de l'intégrité des différents espaces réservés (y compris celle utilisée par les dispositifs d'E/S).
- Utilisation de la mémoire auxiliaire comme support annexe de la mémoire centrale.

### Gestion des processus

- **Processus** : programme en cours d'exécution dans la mémoire. Décrit par un **contexte** = l'ensemble des infos dynamiques représentant l'état d'exécution d'un processus (compteur ordinal, zone de données, bloc de contrôle du processus …).

- Au cours de son exécution le processus passe par divers états :
  - **Éligible** : prêt à l'exécution.
  - **Élu** : en exécution sur le processeur.
  - **Attente** : bloqué sur l'accès à une ressource non disponible ou en attente de l'occurrence d'un évènement.

  **Multiprogrammation simple :** chargement → éligible ⇄ élu (sélectionné) ⇄ attente (demande d'E/S / fin d'E/S) → terminaison (normale ou non).

  **Temps partagé :** identique, mais le passage d'élu à éligible peut aussi être déclenché par une **interruption d'horloge** (fin de tranche de temps).

**Propriétés**

- **Efficacité :** le processeur doit travailler à 100%.
- **Équitabilité :** s'assurer que chaque processus reçoit sa part de temps conformément aux allocations.
- **Multitâche :**
  - *Coopératif :* multitâche simple où chaque processus doit explicitement permettre à une autre tâche de s'exécuter.
  - *Préemptif :* l'OS se charge de partager de façon équilibrée le temps de calcul entre les différents programmes actifs.
  - *Mode interactif :* Temps de réponse — minimiser le temps de réponse des utilisateurs.
  - *Traitement par lot :* Temps d'exécution — minimiser l'attente des utilisateurs ; Débit — minimiser le temps total de traitement d'un ensemble de processus.

- **2 modes de fonctionnement :**
  - **Mode noyau :** accès à l'ensemble du système.
  - **Mode utilisateur :** accès restreint.

  Pour accéder aux services du système d'exploitation, un programme utilisateur doit effectuer un **appel système** qui consiste en : basculer en mode noyau, invoquer le système d'exploitation, revenir en mode utilisateur, retourner le contrôle au programme utilisateur. *Exemple :* lecture ou écriture sur le disque dur.

### Gestion du dialogue H/M

- Interface du système d'exploitation.
- Abstraction du matériel.

**Interface du système d'exploitation**

Les interactions entre l'utilisateur et la machine se réalisent grâce aux interfaces de l'OS :

- **Interface programmatique ou API** (*Application Program Interface*)
- **Interface de commande**

**API**

- L'accès aux ressources logicielles et matérielles contrôlées par l'OS se fait par des **appels systèmes** (*System Calls*).
- Les appels systèmes se font comme des appels de procédure avec ou sans paramètres.
- Accessible à l'utilisateur à partir des langages de programmation.
- *Exemple d'appel système en langage C :* `read(dest,buf, n)` / `write(dest,buf, n)` — les fonctions `read` et `write` contrôlent les paramètres fournis puis font des appels `READ(…)` et `WRITE(…)` au système.

**Interface de commande**

- Permet de lancer des commandes qui sont des programmes utilisant l'interface programmatique.
- **Interface texte** : Interpréteur de commande/langage de commande, jusque dans les années 80. *Exemple :* DOS/Shells Unix. *Exemple de commande :* `cp Fsource Fdest` — copie le fichier source dans le fichier dest, fait appel aux fonctions `read` & `write`.
- **Interface graphique** : Espace multi-fenêtré, à partir des années 80. *Exemple :* Windows. *Exemple de commande :* copie d'un fichier avec l'explorateur, lancement d'une commande via le menu démarrer.

**Exemple abstraction des mémoires de masse**

- L'OS offre à l'utilisateur une vision homogène et structurée des données stockées sur les différentes mémoires de masse : disques (dur, souple, optiques), bandes magnétiques, mémoire flash, …
- L'OS fait abstraction des propriétés de la mémoire de masse : définition d'une unité de stockage logique (le fichier), correspondance fichiers/périphériques physiques, abstraction par programmation en couches.

```
Fichier & répertoires
        ↓
Système de fichiers
        ↓
Périphérique par blocs/caractère
```

## Structure d'un système d'exploitation

Pas de structure standard s'appliquant à tout OS, mais identification des principaux composants de base :

- **Noyau** : allocation des processeurs, traitement des interruptions, gestion des horloges, gestion des processus, gestion des E/S et des communications.
- **Gérant de mémoire** : gestion de la mémoire.
- **Système Gestion de Fichier (SGF)** : gestion des fichiers.

### Systèmes monolithiques

- OS traditionnel : les composants de base existent, mais pas sous forme de modules identifiés et séparables. Composants étroitement intégrés dans une structure unique = « **noyau** ».
- Toutes les procédures peuvent accéder à toutes les autres et à toutes les données.
  - ➕ augmentation des performances en accélérant les communications internes.
  - ➖ évolution et adaptation de l'OS compliquée.

Les applications spécialisées n'ont pas nécessairement besoin de toutes les fonctions : *Exemple :* commande des procédés en temps réel → on utilise gestion processus + réseau & E/S ; on utilise pas ou très peu : gestion fichiers + mémoire.

### Machines virtuelles

Virtualiser directement en logiciel les composants matériels :

- **Processeur réel → « Processeur virtuel »** → exécution des instructions.
- **Mémoire réelle → « Mémoire virtuelle »**
- **E/S réelles → « E/S virtuelles »** : disque — peut correspondre à une partition du disque de la machine réelle ou à un espace mémoire dédié.

Le **moniteur de machine virtuelle** (MMV) offre sur un seul ordinateur plusieurs machines virtuelles (MV) fournissant à chaque utilisateur l'illusion de disposer d'un ordinateur complet.

*Exemple :* Windows NT : pour des raisons de compatibilité, offrir des MV MS/DOS et Windows 3.1 (ancien OS pour architecture Intel x86), avec un CPU virtuel Intel x86, sans SGF propre, mais avec espace d'adressage privé et pilotes.

- L'émulation MS-DOS se trouve dans la partie basse de la mémoire d'adressage virtuelle de la VDM (*Virtual DOS machine*).
- L'application MS-DOS en mode 16 bits (données+instructions) se situe au-dessus, avec au moins 620Ko non partagée avec les autres VDM.
- Le code au-delà des 16Mo comprend les pilotes de périphériques virtuels + code d'émulation des applications MS-DOS en 32 bits.
- L'unité d'exécution est un bloc de code dépendant du processeur qui intercepte les instructions provoquant des appels systèmes (déroutement) et des erreurs, puis exécute le code de traitement correspondant (exemple : pilotes de périphériques virtuels).
- **Pilotes virtuels** = couche placée entre les applications MS-DOS et le matériel : interceptent les E/S MS-DOS, appellent les fonctions de l'exécutif NT ou de l'API win32 pour les effectuer réellement. *(Périphérique de clavier, souris, imprimante, communication, …)*

### Modèle en couches

- Structurer le système en différentes couches de 0 à n.
- La couche i s'appuie sur les services de la couche i-1 et exploite la notion d'abstraction.
- *Exemple 1 :* **THE** (Dijkstra 1968) — 1er système multi-couches, 6 couches : `allocation du processeur → contrôleur des segments mémoire → allocation de la console → gestion des entrées-sorties → programmes utilisateur → opérateur`.

**Niveaux de privilèges** que l'on retrouve sur tous les systèmes non rudimentaires :

- **mode privilégié/noyau/système/superviseur :** une couche dans ce mode peut accéder aux données et au matériel du système, en utilisant un jeu d'instructions étendu.
- **mode utilisateur/esclave :** une couche dans ce mode a un accès limité au système, ne peut utiliser qu'un jeu réduit d'instructions.

### Systèmes client/serveur

Les limites des OS monolithiques ont conduit à définir une nouvelle architecture d'OS.

- Le « **micro-noyau** » concentre les fonctions élémentaires : gestion élémentaire des processus, gestion élémentaire de la mémoire, gestion des communications (transport des messages entre serveurs & entre client/serveur).
- Les autres composants sont réalisés par des **serveurs inter-communicants** utilisant les fonctions du micro-noyau : gestion des processus, gestion de la mémoire virtuelle, gestion des fichiers, gestion du réseau, …

Avantages :

- Modularité adaptée à la construction des systèmes répartis.
- Améliore la fiabilité : chaque serveur s'exécutant séparément dans un processus → une erreur éventuelle due à la modification ne se propage pas et ne plante pas l'ensemble du système.

*(Exemple d'architecture : S1 = serveur de processus, S2 = serveur de fichiers, S3 = serveur de mémoire, S4 = serveur de réseau, tous au-dessus d'un micro-noyau assurant la gestion de processus légers, la gestion élémentaire de mémoire, et la communication par portes et messages.)*

## Principaux systèmes d'exploitation

| Famille | Exemples |
|---|---|
| **Apple** | Mac OS Classic (Système 5/6/7, Mac OS 8/9) ; Dérivés de NeXTSTEP (NeXTSTEP, Rhapsody, Darwin, Mac OS X, iOS) |
| **Dérivés de BeOS** | BlueEyedOS, Haiku, ZETA |
| **Cisco Systems** | Cisco IOS |
| **DOS** | DR-DOS, FreeDOS, MS-DOS, PC-DOS |
| **IBM** | AIX, MVS, OS/2, OS/360, OS/390, z/OS, OS/400 |
| **Microsoft Windows** | Basé sur DOS (MS-DOS, 1.x-Me) ; Branche NT (NT, 2000, XP, 2003, Vista, 2008, 7, 8) |
| **POSIX / UNIX** | BSD (FreeBSD, NetBSD, OpenBSD…), GNU (Debian GNU/Hurd, Arch Hurd), Linux (Arch, Debian, Fedora, Gentoo, Mandriva, Red Hat, Slackware, SUSE, Ubuntu…), autres dérivés (AIX, HP-UX, IRIX, Minix, QNX, Solaris, System V, Tru64, UnixWare…) |
| **Dérivés de AmigaOS** | MorphOS, AROS |
| **D'importance historique** | CP/M, CTSS, GCOS, Genera, ITS, Multics, Plan 9, QDOS, RSTS, TENEX, TOPS-20, TOS, VMS |
| **Autres systèmes** | eyeOS, FreeDOS, Inferno, MenuetOS, ReactOS, UNICOS, VxWorks |
| **Système d'exploitation mobile** | Android, Bada, BlackBerry OS, iOS, OpenMoko, Palm OS, HP webOS, Symbian OS, Windows CE, Windows Mobile |

</TabItem>
<TabItem value="pdf" label="PDF">

<iframe src="/pdfs/se-ch1-introduction.pdf" width="100%" height="800px" style={{border: '1px solid var(--ifm-color-emphasis-300)'}} />

</TabItem>
</Tabs>
