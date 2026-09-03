---
sidebar_position: 1
title: "Proposition de correction — DS SE&PC 10/11/2021"
sidebar_label: DS 2021 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Devoir Surveillé — Systèmes d'Exploitation & Programmation Concurrente

*École Nationale des Sciences de l'Informatique — A.U. : 2021/2022 — Proposition de correction DS SE&PC — 10/11/2021*

<!-- TODO: unclear in source, verify against original PDF — this source PDF (DS_SEPC_2021.pdf) contains only the "Proposition de correction" document; it interleaves each question with its answer rather than presenting a separate statement, so questions and corrections are transcribed together below (answers under "Réponse"/"R:" inline as given, matching the source's own layout) instead of being split into a statement + <details> correction, to avoid inventing a separate statement document that doesn't exist in this source file. -->

## Exercice 1 : Terminologie OS (4 points – 2+2)

**1)** Donnez le(s) terme(s) technique(s) correspondant à chacune des phrases suivantes :

a) Etat d'un processus qui n'est pas en cours d'exécution mais éligible à être ordonnancé.

<details>
<summary>Réponse</summary>

Prêt / Eligible / Ready (0,5 pt)

</details>

b) Fonction système de clonage du processus (Unix) courant.

<details>
<summary>Réponse</summary>

`fork()` (0,5 pt)

</details>

c) Section de code qui doit s'exécuter de manière atomique afin d'éviter les conditions de vitesse.

<details>
<summary>Réponse</summary>

Section critique (0,5 pt)

</details>

d) Un problème où un processus, de faible priorité, demande l'accès à une ressource partagée sans pouvoir y accéder ! Il se voit perpétuellement différé (infiniment) l'exécution de sa demande.

<details>
<summary>Réponse</summary>

Famine (0,5 pt)

</details>

**2)** Donnez une définition technique de chaque terme suivant :

a) Commutation de contexte

<details>
<summary>Réponse</summary>

Prise en compte d'une interruption : sauvegarde du PCB du processus en cours ; sélection du processus suivant ; chargement en CPU du nouveau PCB. (0,5 pt)

</details>

b) Mutex

<details>
<summary>Réponse</summary>

Mutex, acronyme de Mutual Exclusion : moyen système de synchronisation au problème d'exclusion mutuelle entre threads. (0,5 pt)

</details>

c) PCB

<details>
<summary>Réponse</summary>

PCB – Process control bloc, ou descripteur de processus. (0,5 pt)

</details>

d) Thread

<details>
<summary>Réponse</summary>

Thread est une unité d'exécution. (0,5 pt)

</details>

## Exercice 2 : Fork (4 points – 1,5+0,5+1+1)

On considère le code C du programme `DSfork.c` suivant :

```c
#include <stdio.h>
#include <unistd.h>

int main() {
    if (fork() && (!fork())) {
        if (fork() || fork())
            fork();
    }
    printf("3--");

    while (wait(NULL) > 0)
        ;
    return 0;
}
```

**1)** Dessinez l'arborescence des processus créés après le lancement de ce programme. Justifiez succinctement.

<details>
<summary>Réponse</summary>

Ligne 6 : `if (fork() && (!fork()))`

- si le 1er paramètre vaut 0 (c-à-d valeur de retour chez le fils F1) alors brancher à la ligne 10
- sinon le 1er paramètre vaut true (c-à-d valeur de retour chez le père est différente de 0) alors continuer à évaluer le 2ème paramètre → création d'un 2ème fils (F2 avec une valeur de retour = 0), ainsi le 2ème paramètre vaut true seulement pour F2 qui rentre dans le 2ème `if` (ligne 7)

Ligne 7 : `if (fork() || fork())`

- Si le 1er paramètre vaut true (chez le père F2) alors passer à la ligne 8 → création de F4 (P-F2-F4)
- Sinon le 1er paramètre vaut 0 (c-à-d valeur de retour chez le fils F3 créé par le 1er fork) alors continuer à évaluer le 2ème paramètre → création du fils F5 (P-F2-F3-F5) qui quitte alors F3 (valeur de retour à true), entre à la ligne 8 et donc exécute `fork()` → F6 (P-F2-F3-F6)

Arborescence : P → F1 ; P → F2 → F4 ; P → F2 → F3 → F5 ; P → F2 → F3 → F6 (0,5+0,5 pt selon barème)

(1,5 pt)

</details>

**2)** Déduire le nombre total de processus (en comptant le processus père).

<details>
<summary>Réponse</summary>

7 processus au total (0,5 pt)

</details>

**3)** Déduire l'output de ce programme et justifiez le nombre des `3--` affichés.

<details>
<summary>Réponse</summary>

Output : `3--3--3--3--3--3--3--` (7 fois, un par processus) (1 pt)

</details>

**4)** Est-ce que ce programme peut produire des processus zombis ? Justifiez.

<details>
<summary>Réponse</summary>

Pas de zombis, car il y a `wait` ! (1 pt)

</details>

## Exercice 3 : CPU scheduling (6 points – 4+2)

Considérons un système d'exploitation (OS) qui ordonnance les processus selon l'algorithme tourniquet (Round Robin – RR). On suppose que cet OS gère :

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

**1)** Remplir les diagrammes de Gantt (Annexe) montrant l'allocation des deux processeurs, du disque et l'évolution des états des files d'attente (celle des processus prêts et celle des processus en attente du disque).

<details>
<summary>Réponse — Diagramme de Gantt</summary>

| t | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| CPU1 | A | A | A | A | C | C | C | C | C | B | B | | | | | |
| CPU2 | | | B | B | B | A | A | | | | | | | | | |
| FA prêts | | | | | | | | | | | B | | | C | | |
| Disque | | | | | | | | A | A | B | B | B | B | | | |
| FA disque | | | | | | | | | | | | | B | | | |

(2 pt / ligne CPU1&CPU2 + 0,5 pt FA prêts + 1 pt Disque + 0,5 pt FA disque)

<!-- TODO: unclear in source, verify against original PDF — the Gantt chart table above was reconstructed from the correction's raw extracted rows ("CPU1 A A A A C C C C C B B", "CPU2 B B B A A", "FAprêts B C", "Disque A A B B B B", "FAdisque B" over timeline 0-15); the exact column alignment (which time unit each letter falls under) is a best-effort reconstruction — verify against the original PDF page -->

</details>

**2)** En déduire le temps de traitement et le temps d'attente de chacun de ces processus et puis calculez le temps de traitement moyen. Conclure.

<details>
<summary>Réponse</summary>

| Processus | TT (TFin − TArrivé) | TA (TT − Testimé) |
|---|---|---|
| A | 8 | 0 |
| B | 10 | 1 |
| C | 6,5 | 0,5 |
| **Moy.** | **7,33** | |

</details>

## Exercice 4 : IPC (6 points – 1+5)

Soit un polynôme P(x) de degré k-1. P(x) pourrait être retrouvé par interpolation de Lagrange à partir de K points de sa courbe représentative. Soit P(0) le secret permettant d'ouvrir la caisse d'une banque. Ce secret sera partagé en privé sur les N employés (N>=K) de cette banque de telle façon que K parmi eux peuvent reconstruire P(x) par interpolation de Lagrange et retrouver le secret P(0). Dans la pratique, lorsque K employés introduisent leurs secrets partiels (dans un tableau partagé à K cases par exemple), le programme de la caisse peut les combiner, retrouver P(0) et ouvrir la caisse. Les employés peuvent ensuite continuer leurs travaux quotidiens. On suppose que les employés et la caisse sont représentés par les processus, dont les squelettes des pseudo-codes sont comme suit :

```
Processus employe() {
    if (caisse fermée) {
        // saisir codepartiel()
        Attendre l'ouverture de la caisse
    }
    // Continuer son travail
}

Processus caisse() {
    Attendre la saisie de K codes
    Ouvrir la caisse
}
```

**1)** De quel type de problème de synchronisation classique s'agit-il ? Justifiez votre réponse.

<details>
<summary>Réponse</summary>

RDV ou Barrière.

</details>

**2)** Proposer une solution à base de sémaphores en déclarant les variables et sémaphores nécessaires et en complétant les pseudo-codes des processus caisse et employé.

<details>
<summary>Réponse</summary>

```c
Semaphore sem_RDV = 0, open = 0, mutex = 1; // (1 pt – 0,25/variable)
int count = 0; // compte les employés ayant saisi leurs secrets partiels

Processus employe() {
    P(mutex);                          // (0,5 pt)
    if (count < K) {
        // saisir codepartiel()
        count++;                       // (0,5 pt)
        if (count == K) V(open);       // (1 pt)
        V(mutex);                      // (0,25 pt)
        P(sem_RDV);                    // (0,5 pt)
    } else
        V(mutex);                      // (0,25 pt)
    // continuer son travail
}

Processus caisse() {
    P(open);                           // (1 pt)
    // ouvrir la caisse
    for (int i = 0; i < K; i++)        // (0,5 pt)
        V(sem_RDV);                    // (0,5 pt)
}
```

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se2-ds-sepc-2021.pdf" />

</TabItem>
</Tabs>
