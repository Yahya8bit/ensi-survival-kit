---
sidebar_position: 1
title: "TD/TP n°1 : Gestion des Processus sous Unix (avec corrigé)"
sidebar_label: TD1 - Processus
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD/TP n°1 : Gestion des Processus sous Unix

*Module : Systèmes d'exploitation et programmation concurrente — ENSI*

## Exercice 1

Afin de vous familiariser avec les différentes commandes du shell Unix n'hésitez pas à utiliser le `man`.

**1.** Quel est le processus de pid 1 ? Justifier.

<details>
<summary>Correction</summary>

C'est le pid du 1er processus dans l'arborescence système, qui est `init` (ou `system`).

</details>

**2.** Quelle est la différence entre les commandes `ps` et `top` ?

<details>
<summary>Correction</summary>

`top` renvoie la liste des processus en cours en temps réel et de façon dynamique.

</details>

**3.** Que fait la commande `pstree` ?

<details>
<summary>Correction</summary>

Donne l'arborescence des processus en cours.

</details>

**4.** Que fait la commande `strace ls` (resp. processus) ?

<details>
<summary>Correction</summary>

Liste les appels systèmes exécutés par les processus actifs.

</details>

**5.** Comment utiliser la commande `ps` pour obtenir la liste des processus en première colonne et leur état en 2ème colonne ? Quels sont les états possibles ?

<details>
<summary>Correction</summary>

```
$ ps -eo pid,state
```

</details>

**6.** Écrire un programme C qui engendre 6 processus liés à leurs ancêtres de la manière suivante, en affichant l'identité de chaque processus ainsi que celle du parent.

<!-- TODO: unclear in source, verify against original PDF — the "6 processus liés à leurs ancêtres" tree diagram for this question did not extract as text -->

<details>
<summary>Correction</summary>

```c
#include <unistd.h>
int main() {
    if (fork())
        fork() && ( fork() || ( fork() && fork() ) );
    else
        fork();
    return (pid_t) getpid();
}
```

</details>

## Exercice 2

Supposons l'entier `n` initialisé à 0, le nombre de processus créés par l'instruction ci-dessous est :

```c
while (pid = fork())
    if (n >= 5) break;
    else n = n + 1;
```

a) 4
b) 5
c) 6
d) >10
e) aucune des réponses ci-dessus

Dessinez le graphe des processus.

<!-- TODO: unclear in source, verify against original PDF — the correction PDF does not give an explicit choice/graph for exercice 2, only restates the question; verify against original for the expected answer -->

## Exercice 3

**1.** Soit le programme suivant :

```c
#include <unistd.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/wait.h>

int main() {
    int i = 0, pid, j;
    printf("I am the initial process === %d ===with parent %d\n", getpid(), getppid());

    while (fork() != 0 && i < 2)
    // while ((pid = fork()) != -1 && i < 2)  // replace the above line by this one and see question 3
    {
        i = i + 1;
        if (pid) wait(&j);
    }

    // the following instruction permits to count the number of processes since it will be executed by all processes
    printf("+++++ I am %d, my parent is %d\n", getpid(), getppid());
    printf("-----Process %d with parent ==== %d ===terminates with i=%d \n", getpid(), getppid(), i);
    return 0;
}
```

Supposons que les appels à la fonction `fork` ne retournent pas d'erreur.

1) Donnez l'arborescence des processus engendrés par ce programme.

<!-- TODO: unclear in source, verify against original PDF — the process-tree diagram (labels P1/P2/P3/PP) for this question did not extract cleanly as text; the correction PDF shows fragments "P1 P1 PP P2 P2 PP P3 P3 P4 P5 P6" whose exact tree layout is unclear -->

2) Peut-on risquer d'engendrer un/des processus orphelin(s) et/ou zombie(s) ? Si oui, justifiez vos réponses et dites comment peut-on le vérifier.

<details>
<summary>Correction</summary>

Oui, on peut risquer d'avoir des fils orphelins si le processus père termine son exécution avant que l'un de ses fils n'ait terminé la sienne, et on peut avoir un fils zombie s'il termine avant la terminaison du processus père. On peut vérifier ceci en tapant `ps -la` et voir que :

- l'état du fils est devenu "z" s'il s'agit d'un processus zombie
- le processus père (terminé) est retiré de la liste et ses fils auront un autre ppid s'ils sont orphelins.

</details>

3) Modifiez le code de la fonction `main` de manière à :

a) éviter la présence éventuelle d'orphelins et zombies, et
b) créer la nouvelle arborescence suivante, où PP est le processus principal : PP → P1, P2, P3 ; P1 → P4, P5 ; P2 → P6, P7.

<!-- TODO: unclear in source, verify against original PDF — no explicit corrected main() code for question 3.a/3.b was found in the correction PDF; only the "while ((pid=fork())!=-1 && i<2)" hint line above is given -->

## Exercice 4

Combien de processus engendre l'exécution du programme C suivant, et en donner l'arborescence.

```c
#include <unistd.h>
int main(void) {
    fork() && ( fork() || fork() );
    sleep(2);
    return 0;
}
```

<details>
<summary>Correction</summary>

Arborescence (d'après la correction) : PP → P1, P2, P3.

</details>

## Exercice 5

**1)** Lancer le programme ci-dessous avec les arguments `10 20`. Tapez `ps -la` dans un autre terminal avant la fin du père, avant la fin du fils. Quels sont les ppid du père et du fils ? Donnez une explication.

<details>
<summary>Correction</summary>

Le père meurt avant son fils, le fils devient orphelin.

</details>

**2)** Lancer le programme ci-dessous avec les arguments `10 0`. Tapez `ps -la` dans un autre terminal avant la fin du père. Que constatez-vous ?

<details>
<summary>Correction</summary>

Le fils meurt avant son père, le père est en sommeil, il ne lit pas le code de retour de son fils. Le fils devient zombie.

</details>

```c
/*************************************************/
#include<unistd.h> /* necessaire pour les fonctions exec */
#include <sys/types.h>
#include <unistd.h>
#include <stdio.h>
int main(int argc, char * argv[]) {
    pid_t pid;
    int attente_fils, attente_pere;
    if (argc != 3)
        perror("usage: ex1 n m\n");
    attente_pere = atoi(argv[1]);
    attente_fils = atoi(argv[2]);
    switch (pid = fork()) {
        case -1:
            perror("fork error");
            break;
        case 0:
            sleep(attente_fils);
            printf("fils attente finie\n");
            break;
        default:
            sleep(attente_pere);
            printf("pere attente finie\n");
            break;
    }
    return 0;
}
/*************************************************/
```

## Exercice 6

Écrire un programme modulaire qui va créer un deuxième processus. Le père va afficher les majuscules à l'écran et le fils les minuscules. Ici, le travail effectué par les 2 processus est trop court et il n'y a pas entrelacement des exécutions. Pensez à mettre un `\n` à la fin de chaque écriture afin de vider le buffer !

<details>
<summary>Correction</summary>

```c
#include <stdio.h>
#include <unistd.h>
int main() {
    pid_t pid;
    char c;
    pid = fork();
    if (pid == -1)
        perror("fork failed \n");
    else if (pid == 0) {
        for (c = 'a'; c <= 'z'; c++) { putchar(c); putchar('\n'); }
    } else {
        for (c = 'A'; c <= 'Z'; c++) { putchar(c); putchar('\n'); }
    }
}
```

<!-- TODO: unclear in source, verify against original PDF — the correction's C snippet contains a stray extra "});}" fragment after the fils branch that looks like an OCR/typo artifact; transcribed as the cleaned-up version above, verify against the original PDF page -->

</details>

## Exercice 7

Écrire un programme modulaire qui va créer un deuxième processus. Le père et le fils comptent de 0 à 100000 et l'affichent à l'écran. Le père place un P devant son comptage et le fils un F. Analysez le travail de l'ordonnanceur.

<details>
<summary>Correction</summary>

```c
#include <stdio.h>
#include <unistd.h>
int main() {
    pid_t pid;
    pid = fork();
    int i;
    if (pid == -1)
        perror("fork failed \n");
    else if (pid == 0) {
        for (i = 0; i <= 100000; i++) printf("F++++++%d", i);
    } else {
        for (i = 0; i <= 100000; i++) printf("P-----%d", i);
    }
}
```

</details>

## Annexe

Préciser le nombre et l'arborescence des processus créés par les programmes suivants :

<!-- TODO: unclear in source, verify against original PDF — the three annex "Code 1", "Code 2", "Code 3" C source listings themselves were not present in either extracted PDF text; only the corrections below survive -->

<details>
<summary>Correction — Code 1</summary>

8 processus sont créés :

- L'exécution du programme crée un processus parent P1.
- A la lecture de la 1ère instruction `fork()`, P1 se duplique et crée alors P2.
- Les deux processus continuent l'exécution à partir de la ligne incluse.
- A la lecture de la seconde instruction `fork()`, P1 se duplique et crée P3 tandis que P2 crée P4.
- Les quatre processus continuent l'exécution à partir de la ligne incluse.
- A la lecture de la 3ème instruction `fork()`, P1 se duplique et crée P5, P2 crée P6, P3 crée P7 et P4 crée P8.

</details>

<details>
<summary>Correction — Code 2</summary>

3 processus sont créés :

- L'exécution du programme crée un processus P1.
- A la lecture de la 1ère instruction `fork()`, P1 se duplique et crée alors P2. P1 est le processus parent, P2 est le processus enfant.
- Les deux processus continuent l'exécution à partir de la ligne incluse.
- Le résultat de l'appel précédent est supérieur à 0 pour P1, ce dernier rentre donc dans la suite des instructions conditionnée et exécute l'instruction `fork()`.
- P1 se duplique et crée donc P3.
- En revanche, le résultat de l'appel précédent est égal à 0 pour P2 qui ne rentre donc pas dans la suite des instructions conditionnée.

</details>

<details>
<summary>Correction — Code 3</summary>

4 processus sont créés :

- L'exécution du programme crée un processus P1 qui initialise la variable `cpt` à 0.
- P1 rentre dans la boucle `while()` et se duplique lors de l'appel à `fork()`. Il crée alors P2.
- Le résultat de l'appel précédent est supérieur à 0 pour P1, ce dernier rentre donc dans la suite des instructions conditionnée par `if` et incrémente son compteur `cpt` qui passe à 1.
- En revanche, le résultat de l'appel précédent est égal à 0 pour P2 qui rentre donc dans la suite des instructions conditionnée par `else` et affecte `cpt` à 3. Dès lors P2 sort de la boucle et n'exécutera plus d'instructions.
- Seul P1 ré-exécute la séquence d'instructions de la boucle `while()` et le même schéma se reproduit : à chaque entrée dans la boucle P1 se duplique tandis que le processus dupliqué n'exécute aucune instruction.
- P1 aura ainsi exécuté 3 fois l'instruction `fork()` jusqu'à ce que sa variable `cpt` atteigne 3.
- Il aura donc engendré P2, P3 et P4.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se2-td1-processus-correction.pdf" />

</TabItem>
</Tabs>
