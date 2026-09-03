---
sidebar_position: 6
title: "Devoir Surveillé SE&PC — 14/11/2013 (Corrigé)"
sidebar_label: DS 2013/2014 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Devoir Surveillé — Systèmes d'exploitation Programmation Concurrente

*École Nationale des Sciences de l'Informatique — A.U. : 2013/2014 — Classes : II2 — Date : 14/11/2013 — Durée : 2h00 — Documents non autorisés — Enseignants : F. Najjar, M. S. Ouerghi, N. Chakchouk, Z. Bouyahia, S. Mtibaa, & M. Nasri*

*Note : on demande des réponses brèves mais claires, précises et concises.*

## Questions de Cours (4 × 1 point)

**1)** Que signifient les acronymes PCB, PSW ? A quoi servent-ils ?

<!-- TODO: no correction text was found for question 1 in the extracted content -->

**2)** D'où vient le terme MUTEX ? Quelle est la différence avec une synchronisation conditionnelle ?

<!-- TODO: unclear in source, verify against original PDF — the OCR of this question contains a garbled fragment "conditionufg5nelle" for "conditionnelle"; no correction text was found for this question either -->

**3)** Rappelez les rôles des deux primitives `wait(etat)` et `pthread_join(tid, etat)`. Sont-elles nécessaires en présence de `fork()` et/ou `pthread_create()` ? Justifiez.

<details>
<summary>Correction</summary>

Les primitives `wait()` comme `pthread_join()` servent à l'attente de processus créés respectivement par `fork()` ou `pthread_create()`. Ces deux primitives ne sont pas toujours nécessaires pour l'accomplissement des processus (la situation des orphelins est toujours possible).

</details>

**4)** QCM : Répondre par Vrai ou Faux aux propositions suivantes. Pour chaque réponse par Faux, donnez une justification brève (une ou deux phrases). Un processus Unix …

i. doit avoir le shell comme processus ancêtre.

<details>
<summary>Correction</summary>

**Faux.** Il peut avoir `init` comme processus père.

</details>

ii. peut avoir un espace mémoire partagé avec un autre processus Unix.

<details>
<summary>Correction</summary>

**Vrai.** Il faut passer par des IPC (pipe, shm, msg déclaré globalement).

</details>

iii. termine ses processus fils quand il `exit`.

<details>
<summary>Correction</summary>

**Faux.** Les processus fils peuvent continuer leur exécution après terminaison du processus père (cas des processus orphelins).

</details>

iv. utilise le même espace d'adresse que son processus père.

<details>
<summary>Correction</summary>

**Faux.** Les threads partagent le même espace d'adresses que le processus qui les englobe. Mais les processus ont des espaces d'adresses différents, même s'il y a un lien de parenté entre eux.

</details>

## Programmation concurrente (16 points)

### Exercice 1 : Processus unix (4 points – 1×4)

Soit le programme suivant :

```c
#include <unistd.h>
#include <stdio.h>

int main() {
    int i = 0;
    while (fork() != 0 && i < 2)
        i = i + 1;
    printf(" Processus %d termine avec i=%d \n", getpid(), i);
    return 0;
}
```

Supposez que les appels à la fonction `fork` ne retournent pas d'erreur.

**1)** Donnez l'arborescence des processus engendrés par ce programme.

<details>
<summary>Correction</summary>

Création de 3 processus (de pid respectif 1533, 1534 et 1535) appartenant au même père (de pid=1532) :

```
1532
 ├── 1533
 ├── 1534
 └── 1535
```

</details>

**2)** Donnez la valeur de `i` affichée par chacun des processus.

<details>
<summary>Correction</summary>

- 1532 (i=2)
- 1533 (i=0)
- 1534 (i=1)
- 1535 (i=2)

</details>

**3)** Peut-on risquer d'engendrer un/des processus orphelin(s) et/ou zombie(s) ? Si oui, justifiez vos réponses et dites comment peut-on le vérifier.

<details>
<summary>Correction</summary>

Oui, du fait qu'aucun appel à `wait()` n'a été réalisé, et pour le vérifier on peut lancer le programme précédent en y incluant un `sleep()` avec une durée aléatoire après l'incrémentation de `i`.

</details>

**4)** Modifiez le code de la fonction `main` de manière à :

- éviter la présence éventuelle d'orphelins et zombies, et
- créer la nouvelle arborescence suivante, où PP est le processus principal

<!-- TODO: unclear in source, verify against original PDF — the target process tree diagram referenced by this question did not extract as text -->

<details>
<summary>Correction</summary>

```c
#include <unistd.h>
#include <stdio.h>

int main() {
    int i;
    for (i = 0; i < 3; i++) { fork(); wait(); }
    printf("process %d a pour père %d \n", getpid(), getppid());
    return 0;
}
```

</details>

### Exercice 2 : Multithread (2 points – 1×2)

Considérez le code C ci-dessous. (On suppose que toutes les fonctions retournent normalement — sans erreur.)

```c
#include <stdio.h>
#include <pthread.h>
#define NTHREADS 20
static int count = 0;

void *thread(void *vargp) {
    count++;
    printf("%d\n", count);
}

int main() {
    int i;
    pthread_t tid;
    for (i = 0; i < NTHREADS; i++) {
        pthread_create(&tid, NULL, thread, NULL);
    }
    exit(0);
}
```

**1)** Quelles garanties maximales pouvez-vous faire à propos de l'output de ce programme ? Indiquez les numéros des propositions (valides) qui s'appliquent parmi les suivantes :

(a) 20 nombres seront affichés.
(b) Les nombres se situent dans l'intervalle 1 à 20, inclusif.
(c) Il n'y aura pas de nombres répétés dans l'affichage.
(d) Les nombres seront imprimés dans l'ordre ascendant.
(e) Rien

<details>
<summary>Correction</summary>

Réponse : (a), (b) — *pas* (d) (le corrigé source liste "(a), (b), et (d)" mais ceci contredit l'analyse habituelle de ce classique exercice : sans mutex, l'ordre d'impression n'est pas garanti)

<!-- TODO: unclear in source, verify against original PDF — the correction as extracted literally states "Réponse (1) (a), (b), et (d)"; this is reproduced verbatim above despite (d) ("ordre ascendant garanti") seeming inconsistent with an unsynchronized multithreaded counter — flagging rather than silently dropping (d), verify against original PDF -->

</details>

**2)** En utilisant des mutex, modifiez le code pour garantir que l'output du programme soit `1 2 … 20`, c'est-à-dire que les nombres 1 à 20 soient affichés séquentiellement dans l'ordre ascendant.

<details>
<summary>Correction</summary>

```c
#include <stdio.h>
#include <pthread.h>
#define NTHREADS 20

pthread_mutex_t mutex;
void *thread(void *vargp) {
    static int cnt = 0;
    pthread_mutex_lock(&mutex);
    cnt++;
    printf("%d\n", cnt);
    pthread_mutex_unlock(&mutex);
}

int main() {
    int i;
    pthread_t tid;
    pthread_mutex_init(&mutex, NULL);
    for (i = 0; i < NTHREADS; i++) {
        pthread_create(&tid, NULL, thread, NULL);
    }
    pthread_exit(NULL);
    pthread_mutex_destroy(&mutex); /* Optionnelle */
}
```

</details>

### Exercice 3 : Readers/Writers Multithread (5 points – 1+4)

En s'inspirant du problème des lecteurs/rédacteurs vu en cours, on souhaite disposer de verrous similaires aux « Mutex », mais permettant d'établir facilement une synchronisation de type « lecteurs/rédacteurs » sans tenir compte de la priorité au sein des applications. L'idée est donc de fournir un type `rwlock_t` et les quatre primitives associées (`rwl_readlock()`, `rwl_readunlock()`, `rwl_writelock()`, `rwl_writeunlock()`) qui permettent à un processus lecteur (resp. rédacteur) d'encadrer la zone de code critique où il accèdera aux données partagées en lecture (resp. écriture).

Rappelons que la lecture est inclusive (possibilité d'avoir plusieurs lecteurs en même temps) et que la rédaction est exclusive (un seul rédacteur à la fois et jamais de lecteurs).

**1)** Écrire la structure `rwlock_t` qui devrait contenir le nombre de lecteurs arrivés (`nbLec`), le nombre des rédacteurs arrivés (`nbRed`) ainsi que les variables nécessaires à une synchronisation par variables conditionnelles.

**2)** Écrire le code des quatre primitives associées à la gestion des verrous en lecture-écriture.

<!-- TODO: unclear in source, verify against original PDF — the extracted text says "Solution Exercice 3 : (1) et (2)" but the actual code/struct solution content did not extract (likely an image/screenshot in the original PDF) -->

### Exercice 4 : Sémaphores (5 points – 1×5)

On souhaite écrire un code C qui génère deux threads concurrents où :

- Le premier affiche les nombres de 2 à 100 par paquet de 5
- Le second affiche les nombres impairs de 1 à 99 par paquet de 5
- Les deux threads travaillent en alternance de paquet. Le processus se termine lorsque les deux threads ont terminé leurs travaux.

Exemples possibles d'exécution :

```
Exemple 1 : 1 3 5 7 9  2 4 6 8 10  11 13 15 17 19 …
Exemple 2 : 2 4 6 8 10  1 3 5 7 9  12 14 16 18 20…
```

**Question** : Proposez une solution multithreadée avec sémaphore et mutex qui répond à cette synchronisation entre les pairs et impairs. Pour cela, vous êtes amenés à :

- Déclarer les variables nécessaires
- Écrire les procédures `pair()` et `impair()`
- Écrire le programme principal (`main`)

<details>
<summary>Correction</summary>

```c
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

pthread_mutex_t mutex;
pthread_cond_t condnbpair;
pthread_cond_t condnbimpair;

int pair = 2;
int impair = 1;

void *nbimpair() {
    int i, j;
    pthread_cond_signal(&condnbpair);
    for (i = 0; i < 10; i++) {
        pthread_mutex_lock(&mutex);
        pthread_cond_wait(&condnbimpair, &mutex);
        for (j = 1; j < 6; j++) { printf(" %d ", impair); impair = impair + 2; }
        puts("");
        pthread_cond_signal(&condnbpair);
        pthread_mutex_unlock(&mutex);
        /* Do some "work" so threads can alternate on mutex lock */
    }
    sleep(4);
    pthread_exit(NULL);
}

void *nbpair() {
    int i, j;
    pthread_cond_signal(&condnbimpair);
    for (i = 0; i < 10; i++) {
        pthread_mutex_lock(&mutex);
        pthread_cond_wait(&condnbpair, &mutex);
        for (j = 1; j < 6; j++) { printf(" %d ", pair); pair = pair + 2; }
        puts("");
        pthread_cond_signal(&condnbimpair);
        pthread_mutex_unlock(&mutex);
        /* Do some "work" so threads can alternate on mutex lock */
    }
    //sleep(3);
    pthread_exit(NULL);
}

/*******************************************************************/
int main(int argc, char *argv[]) {
    int i;
    pthread_t threads[2];

    /* Initialize mutex objects */
    pthread_mutex_init(&mutex, NULL);
    pthread_cond_init(&condnbpair, NULL);
    pthread_cond_init(&condnbimpair, NULL);

    pthread_cond_signal(&condnbpair);

    /* create threads */
    pthread_create(&threads[0], NULL, nbpair, NULL);
    pthread_create(&threads[1], NULL, nbimpair, NULL);

    /* Wait for all threads to complete */
    for (i = 0; i < 2; i++) {
        pthread_join(threads[i], NULL);
    }
    printf("Main(): Waited on %d threads. Done.\n", 2);

    /* Clean up and exit */
    pthread_mutex_destroy(&mutex);
    pthread_cond_destroy(&condnbpair);
    pthread_cond_destroy(&condnbimpair);
    pthread_exit(NULL);
}
```

</details>

### Annexe : prototypes de quelques fonctions manipulant les Posix threads

**Thread :**

```c
int pthread_create(pthread_t *tid, const pthread_attr_t *attr, void* (*routine)(void*), void *arg);
void pthread_exit(void* status);
int pthread_join(pthread_t thread, void **status);
pthread_t pthread_self(void);
```

**Verrou :**

```c
int pthread_mutex_init(pthread_mutex_t *mutex, const pthread_mutex_attr *attr);
int pthread_mutex_destroy(pthread_mutex_t *mutex);
int pthread_mutex_lock(pthread_mutex *mutex);
int pthread_mutex_unlock(pthread_mutex *mutex);
```

**Sémaphore :**

```c
int sem_init(sem_t *sem, int pshared, unsigned int valeur);
int sem_wait(sem_t *sem);
int sem_post(sem_t *sem);
int sem_destroy(sem_t *sem);
```

**Condition :**

```c
int pthread_cond_init(pthread_cond_t *cond, pthread_cond_attr *attr);
int pthread_cond_wait(pthread_cond_t *cond, pthread_mutex_t *mutex);
int pthread_cond_signal(pthread_cond_t *cond);
int pthread_cond_broadcast(pthread_cond_t *cond);
int pthread_cond_destroy(pthread_cond_t *cond);
```

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se2-ds-2014-corrige.pdf" />

</TabItem>
</Tabs>
