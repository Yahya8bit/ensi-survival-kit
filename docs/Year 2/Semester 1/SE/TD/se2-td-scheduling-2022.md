---
sidebar_position: 5
title: "TD n°3 : Ordonnancement des Processus"
sidebar_label: TD3 - Ordonnancement
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD n°3 : Ordonnancement des Processus

*Module : Systèmes d'exploitation et programmation concurrente — ENSI (2022)*

*Aucune correction n'a été fournie pour ce TD.*

## Exercice 1

Considérons les trois processus suivants :

<!-- TODO: unclear in source, verify against original PDF — the table describing the three processes (arrival/CPU/E-S times) referenced by "considérons les trois processus suivants" did not extract as text -->

1. Donnez le diagramme de GANTT correspondant à l'algorithme d'ordonnancement du processeur :
   a. Selon la politique RR avec un quantum Q=2
   b. Et l'ordre des services des requêtes d'E/S pour le disque se fait selon la politique FIFO
2. Refaire la question 1) en tenant compte de la priorité des processus dans le RR.
3. En déduire les temps de réponse ainsi que les temps d'attente de chaque processus.

## Exercice 2

**1)** Supposez que plusieurs processus sont à l'état prêt et que le processus élu exécute le programme suivant :

```c
int main() {
    for (int i = 0; i <= 100; i = min(100, i++));
    return 0;
}
```

a) Que se passe-t-il pour les processus qui sont à l'état prêt, si l'ordonnanceur d'exécution est non préemptif ?
b) Que se passe-t-il pour les processus qui sont à l'état prêt, si l'ordonnanceur d'exécution est préemptif ?

**2)** A l'instant t, deux processus utilisateur P1 et P2 existent dans un système monoprocesseur. Le processus P1 est composé de deux threads. Le processus P2 est composé de trois threads. Les temps nécessaires à leurs exécutions sont résumés dans le tableau suivant :

<!-- TODO: unclear in source, verify against original PDF — the execution-time table for threads T11/T12/T21/T22/T23 did not extract as text -->

Supposez que le processeur est libre. Donnez les diagrammes de Gantt montrant l'allocation du processeur, pour chacun des cas suivants :

a) Les threads sont supportés par le noyau (threads noyau). Le noyau ordonnance l'exécution des threads selon l'algorithme du tourniquet (Round Robin) avec un quantum de 2 unités. La file d'attente des threads prêts, à l'instant t, est : → T23 T12 T22 T21 T11 → (T11 est en tête de file).

Les threads sont implémentés entièrement au niveau utilisateur. Le noyau ordonnance l'exécution des processus selon l'algorithme du tourniquet avec un quantum de 2 unités.

b) Les threads sont ordonnancés au niveau utilisateur selon l'algorithme du tourniquet avec un quantum de 1 unité.

Supposez que le processeur est libre et que les processus sont passés à l'état prêt dans l'ordre suivant :

- P1 puis P2
- Dans P1 : T11 puis T12
- Dans P2 : T21 puis T22 puis T23

Dans tous les cas, le temps de commutation est supposé nul.

c) Calculez, pour chaque cas, le temps de virement (temps de séjour), relatif à l'instant t, de chaque processus. Comparez puis commentez les résultats.

## Exercice 3 (DS 11/2021)

Considérons un système d'exploitation (OS) qui ordonnance les processus selon l'algorithme tourniquet (Round Robin — RR). On suppose que cet OS gère :

- Deux processeurs CPU1 et CPU2, qui exécutent l'algorithme RR avec un quantum de trois unités de temps (Q = 3),
- Le disque en FIFO (par unité d'E/S).

Tous les processus prêts sont placés dans une même file d'attente qui contient les pointeurs vers les entrées de la table des processus. La commutation de contexte est supposée être d'une durée nulle.

On considère l'exécution de trois processus A, B et C comme décrit dans le tableau suivant :

| Processus | Temps d'arrivée | Temps estimé |
|---|---|---|
| A | 0 | 4 unités CPU + 2 unités E/S + 2 unités CPU |
| B | 2 | 3 unités CPU + 4 unités E/S + 2 unités CPU |
| C | 3.5 | 5 unités CPU |

La première ligne signifie que le processus A est arrivé dans le système à l'instant 0, son exécution nécessite dans l'ordre 4 unités de temps CPU, puis 2 unités de temps d'E/S, et enfin 2 unités de temps CPU.

Dans le cas où plusieurs événements surviennent en même temps, on considère les priorités suivantes :

- Le CPU1 a la priorité d'accès à la file des processus prêts par rapport à CPU2.
- A la fin d'un quantum :
  - le processus en cours d'exécution, et non terminé, est suspendu uniquement si la file des processus prêts n'est pas vide.
  - le traitement réalisé est plus prioritaire que celui d'une fin d'E/S qui, à son tour, est plus prioritaire que l'arrivée de nouveaux processus dans le système.

1. Remplir les diagrammes de Gantt (Annexe) montrant l'allocation des deux processeurs, du disque et l'évolution des états des files d'attente (celle des processus prêts et celle des processus en attente du disque).
2. En déduire le temps de traitement et le temps d'attente de chacun de ces processus et puis calculez le temps de traitement moyen. Conclure.

## Exercice 4 (Exam Janvier 2021)

Dans un système d'exploitation multitâche, on définit un quantum comme étant un intervalle de temps pendant lequel s'exécute un processus unique. Dans cet exercice, on prend un quantum égal à 1. On suppose disposer de la table suivante de processus qui ont été admis en mémoire selon l'ordre P1, P2, P3, P4 puis P5.

| Processus | État | Priorité | Nombre de quanta restants |
|---|---|---|---|
| P1 | Prêt | 3 | 2 |
| P2 | Prêt | 2 | 3 |
| P3 | Bloqué sur E/S | 2 | 5 |
| P4 | En cours d'exécution | 3 | 1 |
| P5 | Prêt | 2 | 6 |

Supposons qu'aucun processus ne s'ajoute en mémoire, et que P3 demeure en attente d'E/S éternellement.

1. Donnez les diagrammes de GANTT montrant l'exécution de ces différents processus en utilisant les algorithmes d'ordonnancement :
   a. Tourniquet (Round Robin — RR),
   b. Plus court d'abord (Shortest Job First – SJF)
   c. Priorité avec tourniquet (le plus bas est le plus prioritaire. Les processus de même priorité sont exécutés en tourniquet en commençant par le processus de plus basse identité — pour Pi, l'identité est i).
2. Pour chacun des trois algorithmes précédents, donnez le temps de traitement moyen des quanta restants (on suppose que la date de début de traitement de ces quanta est égale à 0) des différents processus (on ne compte pas le processus 3).

<!-- TODO: unclear in source, verify against original PDF — the statement numbers this second question "1)" again (duplicate numbering with the first), reproduced verbatim as in the source -->

## Exercice 5 (DS 2010)

On considère trois (3) processus P1, P2, P3 dont les durées d'exécution sont respectivement 6, 4 et 8 unités de temps.

On fait les hypothèses suivantes :

- **H1** : Après 1 unité de temps d'exécution, le processus P2 crée un processus fils (qu'on appellera P4) dont la durée d'exécution est de 3 unités de temps.
- **H2** : Le processus P4, après 2 unités de temps d'exécution, crée à son tour un nouveau processus fils P5, dont la durée d'exécution est de 2 unités de temps.
- **H3** : Un processus ayant créé un fils doit se bloquer jusqu'à la terminaison de son processus fils.

1. En supposant que tous les processus sont gérés en utilisant le scheduling « Round-Robin » avec un quantum égal à 2 unités de temps :
   a. Dessinez le diagramme de Gantt.
   b. En déduire les temps d'arrivée des processus P4 et P5 ainsi que les temps de réponse de chaque processus.
2. On relâche maintenant l'hypothèse H3 et on considère qu'un processus ayant créé un fils continue de s'exécuter, mais à sa fin il doit se bloquer en attente de son fils. Reprendre la question 1 pour cette nouvelle hypothèse.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se2-td-scheduling-2022.pdf" />

</TabItem>
</Tabs>
