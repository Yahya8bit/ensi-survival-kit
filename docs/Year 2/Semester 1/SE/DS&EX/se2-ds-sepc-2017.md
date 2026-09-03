---
sidebar_position: 3
title: "Devoir Surveillé SE&PC — 14/11/2017 (Corrigé)"
sidebar_label: DS 2017 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Devoir Surveillé — Systèmes d'Exploitation & Programmation Concurrente

*École Nationale des Sciences de l'Informatique — Classes : II2 — Date : 14/11/2017 — Durée : 2h00 — Documents non autorisés — Enseignants : F. Najjar, N. Chakchouk, M. Nasri & A. Channouf*

*Note : on demande des réponses brèves mais claires, précises et concises.*

## Exercice 0 : Questions de cours (3 points – 1,25+1+0,75)

**1)** Que signifient les termes suivants :

a) Mode d'exécution
b) Commutation de contexte
c) PCB

<details>
<summary>Correction</summary>

a) **Mode d'exécution** (0,5 pt) : un dispositif matériel qui permet au système d'exploitation la protection des processus en exécution. Mode d'exécution `<user, système>`.

b) **Commutation de contexte** (0,5 pt) : invoque au moins trois étapes. Par exemple, en présumant que l'on veut commuter l'utilisation du processeur du processus P1 vers le processus P2, cela se traduira par :

- Sauvegarder le contexte du processus P1 quelque part en mémoire (usuellement sur la pile de P1).
- Retrouver le contexte de P2 en mémoire (usuellement sur la pile de P2).
- Restaurer le contexte de P2 dans le processeur, la dernière étape de la restauration consistant à reprendre l'exécution de P2 à son point de dernière exécution.

c) **PCB** (0,25 pt) : Process Control Bloc, c'est le contexte de processus.

</details>

**2)** Lequel (lesquels) des algorithmes d'ordonnancement, vu en cours, ne génère(nt) pas le problème de famine ? Justifiez brièvement.

<details>
<summary>Correction</summary>

Algorithme avec critère d'équité ; FCFS et Round Robin. (1 pt)

</details>

**3)** Quelle est la différence fondamentale entre une synchronisation par moniteur et celle avec variables conditionnelles ?

<details>
<summary>Correction</summary>

Les moniteurs sont utilisés par les processus et l'exclusion mutuelle est offerte implicitement par l'API ; alors que les variables conditionnelles sont utilisées par les threads et l'exclusion mutuelle est assurée explicitement par le développeur. (0,75 pt)

</details>

## Exercice 1 : Fork (4 points – 1,5(2×0,75)+2,5)

*Indication : les deux parties suivantes sont indépendantes.*

### Partie I

Soit le programme suivant. On suppose que la primitive `fork()` ne retourne pas d'erreur.

```c
#include <unistd.h>

int main(void) {
    if (fork() && fork())
        fork();
    exit(EXIT_SUCCESS);
}
```

**1)** Donner l'arborescence des processus créés. En déduire le nombre total de processus (en comptant le processus père) créés après le lancement de ce programme.

<details>
<summary>Correction</summary>

`A && B` est évaluée à 0 (FAUX) si A==0. Sinon, si B est aussi évaluée à 1 alors `A && B` est évaluée à 1. (1 pt)

</details>

**2)** Quelle arborescence obtient-on si l'on remplace `if (fork() && fork())` par `if (!fork() && !fork())` ?

<details>
<summary>Correction</summary>

(1 pt) — *(la correction ne détaille pas explicitement la nouvelle arborescence au-delà du principe d'inversion logique ci-dessus)*

<!-- TODO: unclear in source, verify against original PDF — the correction's explicit answer/tree diagram for this sub-question (with !fork()) was not present in the extracted text beyond the point value -->

</details>

### Partie II

Écrire un programme qui crée N processus fils. Chacun d'entre eux devra afficher N fois d'affilée son numéro d'ordre entre 0 et N-1 ainsi que son PID.

<details>
<summary>Correction (2 pts)</summary>

```c
#define N 5
#include <unistd.h>
#include <stdlib.h>

int main() {
    int i, j;
    for (i = 0; i < N; i++) {
        switch (fork()) {
            case -1:
                printf("erreur de creation dans fork ….\n");
                exit(1);
            case 0:
                for (j = 0; j < N - 1; j++)
                    printf("%d je suis de pid %d\n", j, getpid());
                exit(0); // Afin de ne pas boucler n fois !
            default:
                wait();
        }
    }
    exit(0);
}
```

</details>

## Exercice 2 : Ordonnancement (6 points – 3+3)

**1)** On considère les processus suivants, définis par leur date d'arrivée, leur durée (réelle ou estimée en ms) et leur priorité (la plus petite valeur implique la plus haute priorité) :

| Processus | Date d'arrivée | Temps estimé | Priorité |
|---|---|---|---|
| P1 | 0 | 10 | 3 |
| P2 | 2 | 1 | 1 |
| P3 | 3 | 2 | 3 |
| P4 | 4 | 1 | 4 |
| P5 | 6 | 5 | 2 |

a) En négligeant le temps de commutation, donnez le diagramme de Gantt résultant de l'exécution de l'ordonnancement des processus par :

1. priorité non préemptive
2. priorité préemptive

Indiquez pour chaque date les processus en exécution, le contenu de la file d'attente des prêts.

b) Pour chaque processus, indiquez le temps de réponse et le temps d'attente, et puis le temps de réponse moyen pour chaque algorithme d'ordonnancement.

<details>
<summary>Correction</summary>

**a) Priorité non préemptive**

*(Diagramme de Gantt — 1 pt : 0,25 commutation + 4×0,125 + 0,25 FA)*

<!-- TODO: unclear in source, verify against original PDF — the priority non-preemptive Gantt chart's time-axis layout did not extract cleanly as text; only the resulting TT/TA table below survived -->

| Processus | TT | TA |
|---|---|---|
| P1 | 10 | 0 |
| P2 | 9 | 8 |
| P3 | 15 | 13 |
| P4 | 15 | 14 |
| P5 | 10 | 15 |
| **Moyenne** | **11,8** | |

**b) Priorité préemptive**

*(Diagramme de Gantt — 1 pt : 0,25 commutation + 4×0,125 + 0,25 FA)*

<!-- TODO: unclear in source, verify against original PDF — the priority preemptive Gantt chart's time-axis layout (fragments "P1 P2 P5 P3 P4 0 3 4 5 6 10 11 16 18 19" and a second overlapping trace "0 2 3 4 6 11 13 18 19") did not extract cleanly as a single coherent chart; only the resulting TT/TA table below survived -->

| Processus | TT | TA |
|---|---|---|
| P1 | 18 | 8 |
| P2 | 1 | 0 |
| P3 | 10 | 8 |
| P4 | 15 | 14 |
| P5 | 5 | 0 |
| **Moyenne** | **9,8** | |

</details>

**2)** Dans cette question, indépendante de la première, on s'intéresse à l'algorithme d'ordonnancement multi-niveaux (MLFQ – Multi-Level Feedback Queues) avec les trois files d'attente (ou queues) suivantes :

- la queue Q0, de plus haute priorité (priorité=0), est ordonnancée en RR (avec un quantum q=8),
- la queue Q1 (priorité=1) est ordonnancée en RR (q=16)
- la queue Q2, de plus faible priorité (priorité=2), est ordonnancée en FCFS.

Un nouveau processus arrivé est inséré, tout d'abord, dans la queue la plus prioritaire. À chaque changement de contexte, l'ordonnanceur examine chaque queue successivement par ordre de priorité et donne la main au premier processus rencontré. Chaque fois qu'un processus épuise son quantum, il est rétrogradé vers la queue suivante de plus basse priorité.

*Figure 1. MLFQ scheduling*

| Processus | Date d'arrivée | Temps estimé (ms) |
|---|---|---|
| P1 | 0 | 17 |
| P2 | 12 | 25 |
| P3 | 28 | 8 |
| P4 | 36 | 32 |
| P5 | 46 | 18 |

a) En considérant les données ci-dessus, et négligeant le temps de commutation, donnez le diagramme de GANTT montrant l'exécution de l'algorithme d'ordonnancement MLFQ. En déduire le nombre de commutations de contexte.

b) En donnez les temps de traitement et d'attente de chaque processus ?

c) *(optionnelle +1 pt)* Quel est l'intérêt de ce type d'ordonnancement multi-niveaux ?

<details>
<summary>Correction</summary>

*(Diagramme de Gantt MLFQ — 1,75 pt : 0,25 commutation + 12×0,125 + 0,25 FA)*

<!-- TODO: unclear in source, verify against original PDF — the MLFQ Gantt chart across Q0/Q1/Q2 (with the timeline 0,8,12,20,25,28,36,44,46,54,65,81,91,92,100 and process labels P01/P02/.../P22) did not extract as a clean chart -->

Nombre de commutations : **14** (0,125 pt)

| Processus | TT | TA |
|---|---|---|
| P1 | 25 | 8 |
| P2 | 80 | 55 |
| P3 | 8 | 0 |
| P4 | 64 | 32 |
| P5 | 45 | 27 |
| **Moyenne** | **44,4** | |

**c)** Dans le scheduling multi-niveaux, la file d'attente des processus prêts n'est pas unique : elle est divisée en plusieurs files (queues) devant contenir chacune un type de processus donné. L'intérêt de cette méthode est que les processus (du système et des utilisateurs, par exemple) n'ont pas les mêmes besoins (mémoire et temps processeur) et doivent donc être ordonnancés différemment.

</details>

## Exercice 3 : Synchronisation (7 points – 1+2,5+2,5+1)

Supposons disposer d'un nombre fini, `MAX_RES`, d'exemplaires de ressources d'un seul type. Les processus peuvent demander un certain nombre, `count`, d'exemplaires parmi les ressources disponibles (`count <= MAX_RES`) pour les utiliser en exclusivité ; et puis une fois terminé, ils doivent les retourner. Si, lors d'une demande d'allocation, le nombre d'exemplaires demandés n'est pas disponible, le processus doit attendre qu'un nombre suffisant d'exemplaires aient été libérés.

L'extrait de code C suivant est utilisé afin de gérer l'allocation et la libération d'un nombre donné d'exemplaires de ressource disponible.

```c
// The maximum number of resources
#define MAX_RES 10
// the number of available resources
int available_res = MAX_RES;

// Allocate_Res decreases available resources by count resources
int Allocate_Res(int count) {
    if (available_res < count)
        return -1;
    else {
        available_res -= count;
        return 0;
    }
}

/* Free_Res increases available resources by count */
int Free_Res(int count) {
    available_res += count;
    return 0;
}
```

**1)** Dire si ces fonctions peuvent être appelées par plusieurs processus concurrents. Identifier la section critique et dire ce qu'on peut risquer.

<details>
<summary>Correction</summary>

`available_res` est une variable partagée accédée en écriture (`available_res++`/`available_res--`) → risque d'incohérence de résultat. (1 pt)

</details>

**2)** Proposez une solution de synchronisation par variables conditionnelles (pthread) qui réalise cela en modifiant les fonctions d'allocation (`Alloc_Res`) et de libération (`Free_Res`). Peut-on réveiller tous les processus en attente dans la fonction `Free_Res` ? Justifiez.

*Indications : déclarez clairement vos variables globales et précisez leurs initialisations.*

<details>
<summary>Correction (2,5 pt)</summary>

```c
#define MAX_RES 10
// the number of available resources
int available_res = MAX_RES;

// **************** 0,5 pt ****************
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;

// Allocate_Res decreases available resources by count resources
int Allocate_Res(int count) {
    // **************** 1,25 pt ****************
    pthread_mutex_lock(&mutex);
    while (available_res < count)
        pthread_cond_wait(&cond, &mutex);
    available_res -= count;
    pthread_mutex_unlock(&mutex);
}

/* Free_Res increases available resources by count */
int Free_Res(int count) {
    // **************** 0,75 pt ****************
    pthread_mutex_lock(&mutex);
    available_res += count;
    pthread_mutex_lock(&mutex);
    pthread_cond_broadcast(&cond);
}
```

<!-- TODO: unclear in source, verify against original PDF — the correction's Free_Res() calls pthread_mutex_lock(&mutex) twice and never calls pthread_mutex_unlock(&mutex); this looks like an OCR/typo artifact for what should likely be lock-then-unlock, but is transcribed here exactly as it appears in the source rather than silently corrected -->

</details>

**3)** Donnez le code qui doit être exécuté par les processus pour réaliser l'équivalent des fonctions `Alloc_Res` et `Free_Res`. On introduira tous les sémaphores et variables nécessaires, en précisant leur valeur initiale. Pourquoi ne peut-on pas pratiquer le réveil en cascade avec des sémaphores ?

<details>
<summary>Correction (2,5 pt)</summary>

```c
#define MAX_RES 10
// the number of available resources
int available_res = MAX_RES;

// **************** 0,5 pt ****************
Sem mutex = 1; // Protection de available_res
Sem stop = 0;  // blocage si #res non dispo.

Processus i {
    int count = ……..; // à entrer/récupérer

    // Allouer :  **************** 1 pt ****************
    P(mutex);
    while (available_res < count) {
        V(mutex);
        P(stop);
        P(mutex);
    }
    available_res -= count;
    V(mutex);
}

// Utiliser Ressources

// Libérer : **************** 1 pt ****************
P(mutex);
available_res += count;
V(mutex);
V(stop);
```

</details>

**4)** Peut-on risquer une famine pour la solution proposée en 2) ? Justifiez. Si oui, proposez une solution textuelle (sans écrire de code) afin de l'éviter.

<details>
<summary>Correction (1 pt)</summary>

Risque de famine. Exemple : `available_res = 10` ; 1) P1(8) 2) P2(4) ; P3(5) ; P4(3). P1 actif et P2 ; P3 ; P4 bloqués. Quand P1 termine, il réveille P2 ; P3 ; P4 ; il y a arrivée de P5(7) ; …

Solution possible : trier les processus par demande en ordre croissant.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se2-ds-sepc-2017.pdf" />

</TabItem>
</Tabs>
