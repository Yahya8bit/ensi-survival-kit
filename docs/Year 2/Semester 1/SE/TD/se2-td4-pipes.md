---
sidebar_position: 2
title: "TD/TP n°4 : Communication interprocessus par Pipes (avec corrigé)"
sidebar_label: TD4 - Pipes
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD/TP n°4 : Communication interprocessus par Pipes

*Module : Systèmes d'exploitation et programmation concurrente — ENSI*

## Exercice 1

Écrire un programme, qui lit des caractères sur l'entrée standard et envoie dans un pipe les lettres et les chiffres à son processus fils. Le processus fils compte les lettres et les chiffres et affiche les résultats à la fin.

N.B. Le processus père attend la terminaison du fils pour s'arrêter.

<details>
<summary>Correction</summary>

```c
#include <sys/types.h>
#include <sys/math.h>
#include <stdio.h>
#include <unistd.h>
#include <ctype.h>

int main(void) {
    pid_t retour;
    int tube[2], lettre = 0, chiffre = 0;
    char k;

    pipe(tube);
    switch (retour = fork()) {
        case -1:
            perror("Création impossible");
            exit(1);
        case 0:
            printf("Processus Fils\n");
            /* le tube est ici fermé en écriture : le dernier descripteur ouvert en écriture sur le tube sera
               dans le processus père. Quand celui-ci fermera ce descripteur, le read effectué par le fils
               renverra 0 */
            close(tube[1]);
            while (read(tube[0], &k, 1) > 0)
                if (isdigit(k)) chiffre++; else lettre++;
            printf("%d chiffres recus\n", chiffre);
            printf("%d lettres recues\n", lettre);
            exit(0);
        default:
            printf("pere: a cree processus %d\n", retour);
            close(tube[0]);
            while (read(0, &k, 1) > 0)
                if (isalnum(k)) write(tube[1], &k, 1);
            /* le tube est ici fermé en écriture : un read sur le tube vide retournera 0 dans le processus fils */
            close(tube[1]);
            wait(0);
            printf("pere: a recu terminaison fils\n");
    }
}
```

</details>

## Exercice 2

Donner l'organisation d'une application de transmission bidirectionnelle d'informations entre un processus père et un de ses fils via des tubes : le père envoie 5 entiers au fils qui les affiche et renvoie ces entiers multipliés par 2. Le père affiche ces doubles. Écrire ensuite le programme C correspondant.

<details>
<summary>Correction</summary>

```c
#include <stdio.h>
#include <unistd.h>
#define NB_ENTIERS 5

void fils(int p1[2], int p2[2]) {
    int i, nombre, nb_lus;
    close(p1[1]); /* fermeture du tube p1 en écriture pour le fils */
    close(p2[0]); /* fermeture du tube p2 en lecture pour le fils */
    nb_lus = read(p1[0], &nombre, sizeof(int)); /* Lecture nombre sur p1 */
    while (nb_lus == sizeof(int)) {
        nombre = nombre * 2; /* calcul du double */
        printf(" Les doubles sont : %d\n ", nombre);
        write(p2[1], &nombre, sizeof(float)); /* Ecriture du double sur p2 */
        nb_lus = read(p1[0], &nombre, sizeof(int)); /* Lecture nombre sur p1 */
    }
    close(p1[0]);
    close(p2[1]);
    exit(0);
}

int main() {
    int i, nombre, p1[2], p2[2];
    pipe(p1);
    pipe(p2);
    if (fork() == 0) /* Création du fils */
        fils(p1, p2);
    else {
        close(p1[0]);
        close(p2[1]);
        for (i = 0; i < NB_ENTIERS; i++) {
            printf(" Entrez un entier \n ");
            scanf(" %d ", &nombre);
            write(p1[1], &nombre, sizeof(int));
        }
        close(p1[1]);
        printf("Les doubles sont : \n ");
        for (i = 0; i < NB_ENTIERS; i++) {
            read(p2[0], &nombre, sizeof(int));
            printf("%d ", nombre);
        }
        printf(" \n ");
        close(p2[0]);
    }
    return 0;
}
```

<!-- TODO: unclear in source, verify against original PDF — the correction contains "close p1[1] ;" without parentheses around p1[1], likely an OCR-mangled "close(p1[1]);"; transcribed here as close(p1[1]); for compilability, flagging the discrepancy -->

</details>

## Exercice 3

On souhaite disposer d'un processus qui crée un fils et un petit-fils et qui se synchronisent par différents pipes selon le schéma suivant :

*Figure 1 : Synchronisation par différents pipes*

<!-- TODO: unclear in source, verify against original PDF — "Figure 1" (the T1/T2/T3 pipe topology diagram, pipes B1/B2) did not extract as an image/text -->

Le père T1 communique des entiers aléatoires à son fils T2 via B1, puis le fils les multiplie par lui-même et ensuite les communique au fils T3 via B2. Enfin T3 effectue le même traitement que T2 et communique ses résultats au grand-père T1.

Écrire le programme C correspondant en bien spécifiant/commentant chaque déclaration/création et utilisation de pipe spécifique au schéma donné en Figure 1.

<!-- TODO: no correction for Exercice 3 was found in the correction PDF (CORR-TD-4-Pipes.pdf) — only Exercices 1 and 2 have worked solutions there; left as an open exercise -->

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se2-td4-pipes-correction.pdf" />

</TabItem>
</Tabs>
