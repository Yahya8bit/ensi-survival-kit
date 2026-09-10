---
sidebar_position: 1
title: "Chapitre 1 : Introduction aux systèmes d'exploitation"
sidebar_label: Ch1 - Introduction
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Systèmes d'Exploitation et Programmation Concurrente — II2

*ENSI — chiraz.houaidia@ensi-uma.tn*

:::info Vous allez apprendre
- Situer le système d'exploitation entre les applications et le matériel.
- Distinguer les principales interfaces, le noyau et les deux modes d'exécution.
- Suivre le traitement d'une interruption sans le confondre avec une commutation de processus.
- Relier les interruptions périodiques au partage du processeur.
:::

## Approche du cours

- Cours intégré (semestre 3) de 45 Heures (3h/semaine)
- Evaluation : 30% DS + 20% CC (Participation + TPs + TDs) + 50% Examen
- Ressources :
  - A. Silberschatz, & P. Glavin and G. Gagne. *Operating Systems Concepts*, 9th edition, John Wiley & sons, inc. 2012 (ISBN-13: 978-1118063330).
  - A. Tanenbaum, & Herbert Bos, *Modern Operating Systems*, 4th edition, Pearson, ISBN-13: 978-0133591620 (2014)
  - Introduction aux systèmes et aux réseaux (S. Krakowiak, Grenoble) [sardes.inrialpes.fr/~krakowia](http://sardes.inrialpes.fr/~krakowia)
  - Operating Systems and System Programming (B. Pfa, Stanford) [cs140.stanford.edu](http://cs140.stanford.edu/)

### Objectifs

- Mieux comprendre les concepts et les mécanismes de base d'un SE multitâches/multithreads
- Techniques et algorithmes de gestion des ressources (processus, threads, mémoire centrale, …) …etc.
- Maîtriser les éléments de la programmation système → Focaliser sur Unix/Linux et le multithread devient nécessaire
  - Fork, wait, exec, pipe, ….
  - `pthread_create`, `pthread_mutex`, `sem_wait`, …
- Prérequis : Pratique du langage C et shell Unix

### Plan du cours

1. Introduction aux systèmes d'exploitation
   - Principe de base d'un SE
   - Structuration des SEs
2. Gestion des Processus et des Threads
   - Notion de ressource/processus/threads
   - Concurrence dans les SEs
   - Commutation de contexte d'un processus
   - Programmation système sous Unix (Programmation multithreadée POSIX/java threads)
3. Ordonnancement (Scheduling)
   - Notion de files d'attentes
   - Politiques d'ordonnancement et comportement des processus/threads
4. Synchronisation et communication des processus/threads – IPC
   - Les mécanismes de synchronisation
   - Verrous (mutex de Pthread), sémaphores, moniteurs, passage par messages, les signaux Unix, les tubes Unix
5. Gestion de la mémoire (physique + virtuelle)
   - Concepts fondamentaux ; allocation statique/dynamique ; politiques d'allocation
6. Interblocage (deadlock)
   - Notion d'interblocage
   - Solutions à l'interblocage (détection/guérison, prévention, évitement)

## Chapitre 1 — Introduction aux systèmes d'exploitation

*Vous avez dit « Système d'exploitation » ? (exemple : Debian)*

### Motivations — Pourquoi étudier les SEs ?

**Domaine mâture**

- Meilleurs programmes (corrects, performants, complexes, …etc)
- Besoin de comprendre l'interaction entre logiciel et matériel
- Tout utilisateur est concerné → Meilleure maîtrise
- Tout programme est concerné → Améliorer l'efficacité
- Les serveurs de haute performance sont confrontés aux mêmes problèmes (afin de ne pas réinventer la roue)

**Challenges**

- Programmation multithread (multicore)/Programmation Parallèle
- Consommation de ressources (batterie, …)
- Sécurité

### Introduction

- Utilisateur = l'humain devant la machine
  - Suivant le contexte : utilisateur final ou développeur
  - Interagit avec la machine, typiquement via les applications
- Applications = les logiciels avec lesquels veut interagir l'utilisateur final
  - Messagerie, traitement de texte, lecteur de musique, etc.
- Matériel = la machine physique
- Et Donc : Operating System = tout le reste
  - Logiciel d'infrastructure : noyau + pilotes + services, etc.
  - Entre le matériel et les applications

```mermaid
flowchart TB
    U[Utilisateur] <--> A[Application]
    A <--> O[Système d'exploitation]
    O <--> H[Matériel]
```

L'utilisateur agit sur l'application ; l'application demande des services au SE, qui pilote le matériel. Chaque interface est donc conceptuellement à double sens.

### Définition

:::info Définition — système d'exploitation
Un système d'exploitation est le logiciel qui fait fonctionner une machine. Il exploite l'universalité de la machine et la transforme en un système opératoire apte à accomplir des tâches spécifiques.

L'environnement d'un utilisateur se construit par des couches logicielles successives basées sur la couche matérielle ; le passage par un système d'exploitation est nécessaire.
:::

### Rôle de l'OS : les deux fonctions essentielles

**Machine virtuelle**

- cacher la complexité sous une interface « plus jolie »
- fournir certains services de base aux applications
  - IHM, stockage persistant, accès internet, gestion du temps
- permettre la portabilité des programmes
  - une API normalisée facilite la portabilité du **code source**, mais une recompilation ou une réédition de liens peut rester nécessaire
  - un exécutable binaire dépend généralement de l'ISA, de l'ABI et de la plate-forme cible ; l'exécuter sur une plate-forme incompatible demande une couche compatible, par exemple une virtualisation ou une émulation

**Gestionnaire de ressources**

- Partager chaque ressource entre les applications
- Exploiter « au mieux » les ressources disponibles
- Assurer la protection des applications (et du système)

### Interfaces d'un système d'exploitation

**Notion d'interface (service)**

- L'interface est l'ensemble des fonctions accessibles aux utilisateurs du service
- Chaque fonction est définie par son format (syntaxe), sa spécification (sémantique).
- Ces descriptions doivent être précises, complètes (y compris les cas d'erreur), non ambiguës.
- Une interface permet l'accès à un service tel que :
  - Exécution de programmes
    - charger un programme en mémoire, le lancer, l'arrêter
    - choisir quel programme est au premier-plan
  - Exploration et administration des espaces de stockage
    - naviguer dans les fichiers, copier, supprimer
  - Confort et ergonomie
    - presse-papiers, drag-and-drop, corbeille

**Au moins deux interfaces d'un SE**

- Appels systèmes (System call) : Interface programmable
  - Fonctions fournies par le SE aux applications utilisateurs
  - Généralement accédée par des API (Application Programming Interface) afin de comprendre les réponses des appels systèmes.
    - Les 3 plus courantes : Win32 API, POSIX API et JAVA API
    - Exp. en C : `read(FD, &buffer, nbytes)`
- Interface de commandes (textuelle – CLI ou graphique — GUI)
  - CLI : `rm *.ps`
  - GUI : déplacer l'icône du fichier vers la corbeille

*Appels système : exemples — source : Silberschatz, Operating Systems Concepts Essentials (2011), p 59*

### Structure globale

```mermaid
flowchart TB
    A[Applications<br/>compilateur, éditeur, chargeur, débogueur]
    I[Interfaces : appels système/API<br/>et commandes GUI, CLI, batch]
    subgraph S1[Services du SE]
        direction LR
        IPC[IPC]
        P[Gestion de la protection]
        F[Gestion des objets externes<br/>fichiers]
    end
    subgraph S2[Services du SE]
        direction LR
        O[Ordonnancement]
        M[Gestion de la mémoire]
        E[Gestion des E/S]
        SO[Sockets]
    end
    IT[Mécanismes d'interruption]
    H[Machine physique<br/>processeur, mémoire, disque, clavier, écran, modem, souris, imprimante]
    A --- I --- S1 --- S2 --- IT --- H
```

Les interfaces séparent les applications des services du SE. Les mécanismes d'interruption relient ensuite ces services à la machine physique.

### Structure à niveaux

```mermaid
flowchart BT
    H[Matériel<br/>CPU, mémoire, disques, terminaux]
    K[SE Unix<br/>processus, mémoire, système de fichiers, E/S]
    L[Bibliothèque standard<br/>open, close, read, write, fork]
    P[Programmes utilitaires<br/>shell, compilateurs, éditeurs]
    U[Utilisateurs]
    H -->|interface d'appels système| K
    K -->|interface de bibliothèque| L
    L --> P
    P -->|interface utilisateur| U
```

Les programmes utilisateur s'appuient sur la bibliothèque et les appels système pour atteindre les services du noyau ; le noyau accède au matériel. La frontière entre programmes utilisateur et noyau correspond aux deux modes d'exécution présentés plus loin.

### Le noyau du système

:::info Définition — noyau
Le noyau (*kernel*) est la partie du système d'exploitation qui n'est pas une application.
:::

- **Monolithique** : « Tout en un » seul morceau
  - Plus facile à écrire
  - Moins élégant que les micro-noyaux
- **Micronoyaux** : Client/serveur
  - Plus difficile à écrire
  - Plus résistants aux bugs (donc plus sûrs)

**Noyau monolithique**

- Un seul programme
  - Plus facile à écrire
  - Moins élégant
  - Lourd et difficile à débugger
  - Gâchis de mémoire (tout est chargé)

**Micronoyau**

- Noyau réduit au presque minimum (microkernel), le reste chargé en serveurs
  - Structure client/serveur
  - Gère principalement l'ordonnancement et les transferts de messages entre les programmes
  - Les drivers et les applications s'exécutent en mode utilisateur
  - Portable et facilement maintenable
  - Exemples : Mach, Minix, …etc.

### Modes d'utilisation du système

- Deux modes d'exécution :
  - Le mode superviseur (noyau, maître, …), mode privilégié qui autorise notamment l'appel à des instructions interdites en mode utilisateur (manipulation des interruptions).
  - Ce mode assure la protection du système d'exploitation assisté par le matériel
- Un appel système, une exception ou une interruption transfère le contrôle vers le noyau et peut faire passer le processeur en mode superviseur.
- Ce transfert ne constitue pas nécessairement une commutation de processus : celle-ci n'a lieu que si le noyau ou l'ordonnanceur choisit ensuite d'exécuter un autre processus.

### Interruptions, exceptions et appels système

- **Interruption matérielle** : événement asynchrone signalé par le matériel au processeur.
- **Exception ou trap** : événement synchrone provoqué par l'instruction en cours d'exécution (par exemple division par zéro ou instruction invalide).
- **Appel système** : demande volontaire et contrôlée d'un programme au noyau.

### Sources d'interruptions matérielles

- Minuteur système, ou System Timer
  - interruptions périodiques, typiquement 100Hz ou 1000Hz
  - permet à l'OS de percevoir le passage du temps
  - bonus : permet au noyau de reprendre la main sur les applications
- Périphériques d'entrées-sorties
  - clavier, souris, disque, GPU, réseau, etc
- Pannes matérielles
  - température excessive, coupure de courant, etc

### Architecture d'une machine typique

```mermaid
flowchart TB
    C1[CPU1] <--> SB[Bus système]
    C2[CPU2] <--> SB
    C3[CPU3] <--> SB
    M[Mémoire centrale] <--> SB
    B[Pont E/S] <--> SB
    B <--> IB[Bus E/S]
    IB <--> UC[Contrôleur USB]
    IB <--> DC[Contrôleur de disque]
    IB <--> NA[Adaptateur réseau]
    UC <--> U[Bus USB : souris, clavier]
    DC <--> D[Disque]
    NA <--> N[Réseau]
```

Le bus système relie processeurs, mémoire et pont d'E/S ; le pont relie ensuite les contrôleurs de périphériques par le bus d'E/S.

### Applications = CPU en « mode restreint »

:::info Définition — mode restreint
*Restricted mode* = *slave mode* = *user mode* : vue partielle de la machine (un CPU et une mémoire), où certaines instructions et adresses sont interdites. Ce mode permet d'exécuter du code applicatif sans lui donner accès à toutes les ressources de la machine.
:::

Instructions disponibles : opérations AL, accès mémoire, sauts.

```
ADD R1 <- R3, R4
WRITE [R8] <- R5
CALL 123456
```

### Rappel : le cycle de Von Neumann

```
while True do:
    Charger une instruction depuis la « mémoire »
    Décoder ses bits : quelle opération, quelles opérandes, etc
    Exécuter l'opération et enregistrer le résultat
repeat
```

**Le cycle de Von Neumann avec interruptions**

```
while True do:
    Charger une instruction depuis la mémoire
    Décoder ses bits : quelle opération, quelles opérandes, etc
    Exécuter l'opération et enregistrer le résultat
    If interruption demandée then:
        Sauvegarder le contenu des registres
        déterminer l'adresse de la routine de traitement
        passer en mode superviseur
        Sauter à la routine = écrire son adresse dans le compteur ordinal
    endif
repeat
```

Note : à la fin de la routine de traitement, une instruction de retour d'interruption telle que `RETI` restaure le contexte sauvegardé et l'état de privilège antérieur : le processeur revient donc en mode utilisateur **ou** en mode noyau selon le contexte interrompu.

**Mécanisme d'interruptions : déroulement**

```mermaid
sequenceDiagram
    participant P as Programme principal
    participant C as Processeur
    participant I as ISR
    P->>C: requête d'interruption
    C->>C: sauvegarde les registres
    C->>I: charge dans PC l'adresse de l'ISR
    I->>C: RETI
    C->>P: restaure le contexte interrompu
```

Le processeur sauvegarde d'abord l'état interrompu, exécute la routine, puis `RETI` restaure cet état. Ce retour ne choisit pas à lui seul un autre processus.

**Mécanisme d'interruptions : vocabulaire**

- **IRQ = Interrupt Request**
  - un « message » envoyé par un périphérique vers le processeur de façon asynchrone (vs polling, inefficace)
  - chaque IRQ porte un numéro identifiant le périphérique d'origine
- **ISR = Interrupt Service Routine**
  - un fragment de programme (= séquence d'instructions) exécuté à chaque occurrence de l'évènement matériel associé
  - se termine par une instruction de retour d'interruption, telle que `RETI`, qui restaure le contexte interrompu
  - la mise en attente, l'activation, la priorité ou l'imbrication de nouvelles IRQ pendant une ISR dépendent de l'architecture et de la politique du SE
- **Table des Vecteurs d'Interruptions**
  - tableau de pointeurs indiquant l'adresse de chaque ISR
  - le CPU utilise le numéro d'IRQ pour savoir où sauter

**Définition : Noyau ou kernel** — Le noyau c'est (exactement) l'ensemble des ISR de la machine et de toutes les fonctions que celles-ci appellent.

### Démarrage du système (séquence)

```mermaid
sequenceDiagram
    participant B as BIOS
    participant K as Noyau
    participant P as P0
    B->>K: charge le noyau en mémoire
    B->>K: saute à son adresse en RAM
    K->>P: charge le premier processus
    K->>P: lui cède le processeur
    loop interruptions périodiques
        P->>K: interruption du minuteur
        K->>P: retour d'interruption
    end
```

Si P0 entre dans une boucle infinie, les interruptions périodiques permettent néanmoins au noyau de reprendre régulièrement la main. Il peut alors arbitrer le temps processeur entre P0, P1, et les autres processus.

**Prochaine étape** : [gestion des processus](./se2-ch2-processus) — un processus, son contexte et ses états rendent ce partage du processeur possible.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se2-ch1.pdf" />

</TabItem>
</Tabs>
