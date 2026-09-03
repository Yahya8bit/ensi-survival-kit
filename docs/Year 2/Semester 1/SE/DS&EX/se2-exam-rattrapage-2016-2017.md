---
sidebar_position: 13
title: "Examen de Rattrapage SE&PC — 03/05/2017 (Corrigé partiel)"
sidebar_label: Rattrapage 2016/2017
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Examen de Rattrapage — Systèmes d'exploitation & Programmation Concurrente

*École Nationale des Sciences de l'Informatique — A.U. : 2016/2017 — Classes : II2 — Date : 3/05/2017 — Durée : 2h00 — Documents, calculatrices, et Smartphones non autorisés — Enseignants : F. Najjar, N. Chakchouk, M. S. Ouerghi, & M. Nasri*

*Note : prière de lire attentivement l'énoncé, de respecter les notations du texte ! On demande des réponses concises mais claires et précises.*

<!-- TODO: unclear in source, verify against original PDF — the extracted "Proposition de Correction" for this exam only restates the 10 QCM questions (Exercice 1) verbatim, without marking which answer letter(s) are correct; no answer key was present in the extracted text. No correction at all was found for Exercices 2, 3, and 4. This doc therefore presents the statement in full and flags the QCM answers and Exercices 2-4 as unavailable, rather than guessing at correct options. -->

## Exercice 1 : QCM (5 points – 0,5×10)

Répondez (sur la feuille d'examen) aux questions à choix multiples en sélectionnant une ou plusieurs réponses. Les questions font référence aux systèmes d'exploitation de la famille UNIX et considèrent les options par défaut des appels système. *Note : une réponse incomplète est comptée zéro.*

**1)** Un processus zombie est un processus qui :

a) a perdu son père (n'a plus de père).
b) a terminé son exécution en erreur.
c) a terminé son exécution et attend la prise en compte de cette fin par son père.
d) a perdu son père et a été adopté par le processus init.
e) ne fait pas appel à `wait()`.

**2)** Si chaque processus père attend la fin de tous ses fils avant de se terminer, il n'y aurait aucun processus :

a) zombie dans le système.
b) qui bloque son père.
c) adopté par le processus init.
d) bloqué par son père.
e) aucune de ces réponses.

**3)** Quels sont les éléments partagés par l'ensemble des threads d'un processus ? Ils partagent :

a) l'espace d'adressage.
b) la table de descripteurs de fichiers.
c) le compteur ordinal.
d) la pile d'exécution.
e) aucun des éléments ci-dessus.

**4)** On veut faire communiquer deux threads utilisateur d'un même processus via un tube anonyme (pipe). Le tube anonyme doit être créé :

a) avant la création du premier thread.
b) après la création du premier thread et avant la création du second thread.
c) après la création du second thread.
d) dans chacun des deux threads.
e) aucune de ces réponses car les threads ne pourront pas communiquer en utilisant les fonctions « read » et « write ».

**5)** On veut faire communiquer deux threads utilisateur d'un même processus via un tube nommé. À quel niveau doit-on ouvrir le tube nommé ? Le tube nommé doit être ouvert :

a) avant la création du premier thread.
b) dans le premier thread.
c) dans le second thread.
d) dans chacun des deux threads.
e) aucune de ces réponses car les threads ne pourront pas ouvrir le tube.

**6)** Supposons l'entier n initialisé à 0, le nombre de processus créés par l'instruction ci-dessous est :

```c
while (pid = fork())
    if (n >= 5) break;
    else n = n + 1;
```

a) 4.
b) 5.
c) 6.
d) >10.
e) aucune des réponses ci-dessus.

**7)** Un dispositif matériel, qui permet au système d'exploitation la protection des processus en exécution, est :

a) Multi-cores
b) le mode d'accès
c) le mode d'exécution
d) le PSW
e) aucune des réponses ci-dessus.

**8)** Considérez les deux processus concurrents A et B suivants :

```c
Semaphore S = 2;

Process A() { P(S); P(S); a; b; V(S); }
Process B() { P(S); c; d; V(S); V(S); }
```

Les différents ordres d'exécution possibles des instructions atomiques a, b, c et d des processus A et B sont :

a) a b c d
b) c d a b
c) a c b d
d) c d c d
e) a b a b

**9)** L'exclusion mutuelle permet de s'assurer que :

a) une seule partition n'est active à la fois sur un disque
b) un seul thread n'accède à une ressource précise à la fois
c) le multiplexage spatial sur la mémoire est respecté
d) un cœur de processeur n'exécute qu'un processus à la fois
e) toutes les réponses précédentes sont correctes

**10)** Lorsqu'un processus actif tente d'accéder à une page située dans l'espace d'échange, quelle est l'unité responsable du chargement de cette page en mémoire ?

a) la MMU
b) le système d'exploitation
c) le processus
d) le système de fichiers
e) le chargeur

<!-- TODO: no answer key was found for this QCM in the correction PDF — the correction restates the same 10 questions without marking correct options -->

## Exercice 2 : Questions diverses (6 points – 1+1+4)

*Les questions suivantes sont indépendantes.*

**1)** L'adresse logique peut-elle avoir une taille inférieure à l'adresse physique ? Justifiez votre réponse.

**2)** On suppose un système d'adressage sur 32 bits utilisant une mémoire virtuelle dont la taille d'une page est de 2Ko. Donnez l'adresse virtuelle en hexadécimal `<#page, déplacement>` de l'adresse virtuelle linéaire `0x00030F40`.

**3)** On reprend le problème des lecteurs/rédacteurs, vu dans le cours, où on a une lecture inclusive et une rédaction exclusive aux données partagées, sous sa version multithread. On suppose que la priorité est accordée aux rédacteurs et les variables partagées sont données comme suit :

```c
int readerCount = 0;
int writerCount = 0;
int writer = 0;
pthread_mutex_t mutex = MUTEX_INITIALIZER;
pthread_cond_t cond = COND_INITIALIZER;
```

Donnez le code correspondant aux différentes fonctions ci-dessous :

- `void startRead(void)`
- `void endRead(void)`
- `void startWrite(void)`
- `void endWrite(void)`

<!-- TODO: no correction was found for this exercise — left as an open exercise -->

## Exercice 3 : Algorithmes de remplacement de page (4 points – 2+1+1)

On s'intéresse à l'algorithme de remplacement de seconde chance (ou encore de l'horloge), qui est une amélioration de FIFO avec un bit R (référence) de seconde chance, décrit comme suit :

- Le bit R est mis à 1 au premier chargement dans la mémoire, ou encore à chaque référencement.
- Lors du remplacement de page, on sélectionne la page en queue de la liste (c-à-d la plus vieille — FIFO) :
  - Si R vaut 0, la page est vieille ET non utilisée récemment, et donc cette page est choisie comme victime.
  - Si R vaut 1, la page est vieille MAIS TOUJOURS utilisée ; alors R est remis à 0 et cette page est déplacée en tête de la liste (elle devient jeune), et la recherche continue.

On souhaite appliquer cet algorithme de remplacement dans un cache capable de contenir 5 pages ; on suppose que le gestionnaire de mémoire accède successivement aux pages suivantes :

```
1, 7, 8, 2, 3, 1, 6, 1, 2, 7, 3, 5, 6
```

Initialement, le cache est vide.

**1)** Déroulez l'algorithme de remplacement de seconde chance sur cette séquence de pages et indiquez la valeur du bit de référence.

**2)** En déduire le nombre de défauts de pages ainsi que le nombre d'entrées-sorties.

**3)** Quel est le nombre de défauts de page minimal sur cet exemple ? Justifiez sans dérouler l'algorithme optimal.

<!-- TODO: no correction was found for this exercise — note this is the same page-access sequence used (with the answer "9 défauts de page, optimal = 7") in the DS_SEPC_16_11_2018cor.pdf and Exam 16-17 documents in this same module; the answer is likely identical here, but is left unstated rather than copied across without confirmation that this exam's variant (with explicit R-bit tracking) yields the same count -->

## Exercice 4 : Ordonnancement (5 points – 2+1+1+1)

On considère les cinq processus suivants pour lesquels nous indiquons la date d'arrivée dans l'ordonnanceur et la durée estimée :

| Processus | Arrivée | Durée estimée |
|---|---|---|
| P1 | 0 | 7 CPU + 3 E/S + 8 CPU |
| P2 | 1 | 4 CPU |
| P3 | 1 | 2 CPU + 5 E/S + 3 CPU + 4 E/S + 5 CPU |
| P4 | 2 | 2 CPU |
| P5 | 3 | 1 CPU + 4 E/S + 4 CPU |

On se place dans le contexte d'une exécution plus longue (long-term scheduling) de ces mêmes cinq processus, comme indiqué ci-dessus (P1 : 7 CPU + 3 E/S + 8 CPU ; P3 : 2 CPU + 5 E/S + 3 CPU + 4 E/S + 5 CPU ; P5 : 1 CPU + 4 E/S + 4 CPU).

**1)** Donnez le diagramme de Gantt pour l'algorithme d'ordonnancement avec préemption de type Shortest-time Remaining First, en supposant que le temps de commutation est négligeable.

**2)** En déduire les temps de traitement et d'attente pour chaque processus.

**3)** Si le temps de commutation est maintenant de 0,5 unités de temps, sans reprendre l'algorithme SRTF, dire quel est le temps total de traitement de chaque processus. Justifiez.

**4)** Quel algorithme, parmi tous ceux que vous avez vus en cours, vous semblerait le mieux adapté dans ce contexte ? Justifiez votre réponse.

<!-- TODO: no correction was found for this exercise — left as an open exercise -->

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se2-exam-rattrapage-2016-2017.pdf" />

</TabItem>
</Tabs>
