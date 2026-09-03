---
sidebar_position: 3
title: "Chapitre 2 (Partie 2) : Les Threads"
sidebar_label: Ch2.2 - Threads
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Gestion des processus et des Threads — Partie 2 : Les Threads

*ENSI — II2*

## Motivations

Inconvénients des processus classiques (processus lourds) :

- leur création nécessite des appels systèmes coûteux en temps,
- le changement de contexte entre processus est une opération lente, en particulier pour de nombreux transferts en mémoire,
- 90% de ce temps est consacré à la gestion de la mémoire,
- le coût des mécanismes de protection associés au processus,
- l'interaction, la synchronisation ou la communication entre processus nécessite l'utilisation de mécanismes de communication spéciaux (tube communicant appelé "pipe", socket, …),
- le partage de mémoire entre processus s'effectue par ajout de mécanismes lourds (bibliothèque de partage de mémoire).

## Notion de Thread

Thread / processus léger / activité / fil d'exécution — définitions :

- Abstraction du SE pour l'allocation du processeur – unité d'exécution
- Sous-processus (procédure/fonction) lié/appartient à un processus lourd (s'exécutant indépendamment du `main`)
- Processus classique (`fork` unix) ne comporte qu'un seul thread → Processus monothreadé (`main` en C)
- Les threads permettent de dérouler plusieurs suites d'instructions, en parallèle (sur plusieurs CPUs ou cores), à l'intérieur du même processus → Processus multithreadé

**Multi-threading :**

- avoir plusieurs fils d'exécution dans un même processus
- En quelque sorte, plusieurs petits processus "légers" au sein d'un processus "hôte", "lourd", qui sont les unités à scheduler
- Programmation plus complexe : activités concurrentes, pouvant se dérouler dans un ordre quelconque

Exemples :

- serveurs (http, nfs, …) : un thread pour chaque client qui se connecte
- explorateur de fichiers sous Windows (un thread par fenêtre)
- Éditeur de texte, outils de courrier, navigateur web multi-onglets, …

## Intérêt du multi-threading

**Un serveur programmé sans threads (monothreadé)**

Algorithme :

1. Attendre une requête
2. Analyser la requête
3. Servir la requête
4. Renvoyer réponse au client

Problème : si « servir la requête » se bloque (par ex. dans un appel système de lecture depuis un périphérique lent), tout le serveur est bloqué.

**Un serveur programmé avec des threads**

Algorithme :

- Thread principal
  - Attendre une requête
  - Analyser la requête
  - Allouer un thread « fils » au service
- Un thread fils (requête R1)
  - Servir requête R1 (peut bloquer ici)
  - Renvoyer réponse au client
- Un thread fils (requête R2)
  - Servir requête R2 (peut bloquer ici)
  - Renvoyer réponse au client

## Propriétés d'un Thread

Un processus léger est caractérisé par :

- Un numéro d'identification (thread ID), unique et affecté à la création du processus léger.
- Des registres, pointeur de pile, pointeur d'instruction (compteur ordinal)…
- Un masque de signaux permettant de spécifier quels sont les signaux à intercepter.
- Une priorité utilisée au moment de déterminer quel processus léger peut s'exécuter.
- Des données privées dont l'accès ne peut être réalisé qu'à l'aide d'une clé.

## États d'un Thread

- **Prêt** : le thread est prêt à être exécuté. Cas d'un thread nouvellement créé, d'un thread débloqué, …
- **En exécution** : le thread est en cours d'exécution sur le processeur. Plusieurs threads peuvent être en exécution dans le cas d'une machine multi-processeur.
- **Bloqué** : le thread est en attente sur une synchronisation ou sur la fin d'une opération (entrée/sortie par exemple).
- **Terminé** : le thread a terminé son exécution ou a été annulé. Les ressources du thread vont être libérées et le thread disparaîtra.

<!-- TODO: unclear in source, verify against original PDF — the states are illustrated by a state-transition diagram across several slides that did not extract as text -->

## Types des Threads

### User-Level Thread

- tous les processus légers d'un processus lourd se partagent la même entité noyau pour leur exécution
- ça peut être réalisé sous forme de bibliothèque sans modification du noyau du système d'exploitation
- l'application gère les threads (librairie) => Le noyau ignore l'existence de threads

**Avantages**

- La gestion et la commutation des processus légers sont rapides car elles ne nécessitent pas d'appel au noyau (coûteux en temps).
- La mise en œuvre de cette implantation est possible sur tout système d'exploitation.

**Inconvénients**

- Quand un fil d'exécution fait un appel système bloquant, tous les fils du même processus lourd se bloquent.
- Les processus légers d'un même processus lourd ne peuvent pas exploiter plusieurs processeurs physiques, car l'entité noyau associée est placée sur un processeur physique donné.
- Les processus légers sont invisibles du noyau.
- La gestion de l'ordonnancement des processus légers est laissée à la charge de l'utilisateur.

### Kernel-Level Thread

- chaque processus léger est pris en charge par une entité noyau
- Les processus légers sont totalement implantés dans le noyau du système d'exploitation

**Avantages**

- Les blocages des processus légers se font dans le noyau par le biais d'un blocage de l'entité noyau.
- Les machines multiprocesseurs conviennent mieux à cette implantation, car le système d'exploitation peut placer des entités noyau différentes sur différents processeurs physiques.
- L'ordonnancement des processus légers est laissé à la charge du noyau.

**Inconvénients**

- La gestion des processus légers est réalisée par des appels systèmes coûteux en temps : la commutation de fil ou la synchronisation implique un changement de contexte et des vérifications par le noyau de la validité des paramètres.
- Les entités noyau occupent de la place mémoire, or la mémoire disponible dans le noyau n'est pas illimitée. Cet aspect limite le nombre de processus légers disponibles pour l'ensemble du système.

### Approche Mixte (hybride-combinée)

- Plusieurs processus légers en niveau utilisateur ont à leur disposition plusieurs entités noyau.
- Lorsqu'une entité noyau est bloquée en attente d'une synchronisation ou d'une entrée/sortie, le noyau informe la bibliothèque de niveau utilisateur. Un autre processus léger est engendré pour maintenir le nombre de processus légers en cours d'exécution.

**Avantages**

- L'implantation en niveau utilisateur garantit des temps de commutation et de synchronisation très courts et favorise l'extension du système (scalability).
- La présence de plusieurs entités noyau permet d'éviter les blocages des autres fils quand un fil se bloque.
- La multiplicité des entités noyau rend efficace l'exploitation des multiprocesseurs.
- La latence d'un processus bloqué au niveau du noyau est très courte, car une autre entité noyau est réactivée.

**Inconvénients**

- Complexité de la mise en œuvre de cette implantation.
- Cela nécessite une gestion rigoureuse dans la création et la destruction des entités noyau.

## Principales fonctions de manipulation

<!-- TODO: unclear in source, verify against original PDF page for "Principales fonctions de manipulation" and Exemples 1/2/3 — slides contain a table/code screenshot (likely pthread_create/pthread_join/pthread_exit signatures and example programs) that did not extract as text -->

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se2-ch2-threads.pdf" />

</TabItem>
</Tabs>
