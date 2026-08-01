---
sidebar_position: 1
title: Examen Principale SE 2012 (avec correction)
sidebar_label: Examen Principale 2012
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Examen de la Session Principale — Int. SE & Mise en œuvre UNIX (2011/2012)

*Université de La Manouba — Ecole Nationale des Sciences de l'Informatique — Classe : II1 — Date : 17/5/2012 — Documents non autorisés*

## Exercice 1 (4 pts) — Comparaisons d'implantation de fichiers

On considère les quatre représentations suivantes de la localisation d'un fichier :

a. Un couple `<numéro du premier bloc, nombre de blocs>`
b. Un couple `<numéro du premier bloc, numéro du dernier bloc>` avec chaînage des blocs entre eux.
c. Un ensemble de 24 couples `<numéro de bloc, nombre de blocs>`
d. Un ensemble de 13 numéros de blocs :
   - 10 numéros de blocs contenant des données,
   - 1 numéro de bloc contenant des numéros de blocs contenant des données,
   - 1 numéro de bloc contenant des numéros de blocs contenant des numéros de blocs contenant des données,
   - 1 numéro de bloc contenant des numéros de blocs contenant des numéros de blocs contenant des numéros de blocs contenant des données.

Donner pour chacune de ces représentations, celles des propositions suivantes qui sont vérifiées, en justifiant brièvement votre réponse.

1. La taille totale du fichier doit être connue lors de sa création.
2. Aucune information de taille n'est nécessaire lors de la création.
3. Il est possible que le fichier ne puisse être créé alors que l'espace libre est supérieur à la taille du fichier.
4. L'accès aléatoire à un bloc quelconque du fichier demande un seul accès disque.
5. L'accès aléatoire à un bloc quelconque du fichier demande au plus 4 accès disque.
6. L'allocation d'espace peut se faire par blocs individuels.

<details>
<summary>Correction</summary>

| | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| **a** | X | | X | X | X | |
| **b** | | X | | | | X |
| **c** | | | X | X | X | |
| **d** | | X | | | X | X |

</details>

## Exercice 2 (5 pts) — SGF

On considère un petit disque de 64 secteurs décrit en **Annexe**. Ce disque accueille un SGF similaire au FFS (Fast File System) d'UNIX. Les 16 premiers secteurs du disque sont réservés pour la table des i-nœuds.

Chaque secteur contient quatre mots de 4 octets. Un i-nœud remplit un secteur et contient 2 pointeurs directs, 1 pointeur indirect, et 1 double-pointeur indirect. Un i-nœud est un entier de 4 octets. Dans un répertoire, un nom de fichier est un tableau de 4 octets. Un identificateur de bloc est un entier de 4 octets. Le répertoire racine est 0.

1. Quelle est la taille (en secteurs) du fichier décrit par l'i-nœud 1 ?

   <details>
   <summary>Correction</summary>

   1 secteur

   </details>

2. Quelle est la taille (en secteurs) du fichier décrit par l'i-nœud 4 ?

   <details>
   <summary>Correction</summary>

   3 secteurs

   </details>

3. Quelle est la liste des noms de fichiers pour le répertoire racine ?

   <details>
   <summary>Correction</summary>

   HELP, ME, MARY, HAD

   </details>

4. Quel est l'i-nœud du fichier `/MARY/ABLE` ?

   <details>
   <summary>Correction</summary>

   10

   </details>

5. Pour le système de fichiers sur ce disque, que dois-je faire si j'ai bien lu l'intégralité du fichier `/ME/WAS` ?

   <details>
   <summary>Correction</summary>

   APT 7, ABLE 10, MARY 2, MOVE 8

   </details>

6. Ce système de fichiers peut-il supporter les liens symboliques ? Pourquoi ?

   <details>
   <summary>Correction</summary>

   C'est possible, mais seulement pour les chemins dont les noms ne dépassent pas la taille limite que le SGF prend en charge.

   </details>

### Annexe — table des i-nœuds et blocs du disque

| Secteur | Contenu |
|---|---|
| 0-15 | table des i-nœuds |
| 16 | `'ZED '` 10, `'ZIPP'` 3, ... |
| 17 | `'ABLE'` 13, `'WAS '` 19, ... |
| 18 | 43, 21, 19, -1 |
| 19 | `'MARY'` 13, `'HAD '` 24, 10 |
| ... | (voir version PDF pour la table complète des 64 secteurs) |

## Exercice 3 (6 = 3+3 pts) — Programmation système

Utiliser les appels système `open`, `read`, `write`, `close` et `stat` pour :

1. Écrire un extrait de code en C permettant de vérifier qu'un fichier passé en argument d'appel est accessible uniquement en lecture et écriture pour le propriétaire.

```c
#include <sys/stat.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    struct stat info;
    if (argc < 2) {
        fprintf(stderr, "usage: %s fichier\n", argv[0]);
        return 1;
    }
    if (stat(argv[1], &info) == -1) {
        perror("stat");
        return 1;
    }
    mode_t perms = info.st_mode & 0777;
    if (perms == (S_IRUSR | S_IWUSR)) {
        printf("Accessible uniquement en lecture/écriture pour le propriétaire.\n");
    } else {
        printf("Ce n'est pas le cas.\n");
    }
    return 0;
}
```

2. Écrire un extrait de code en C permettant de dupliquer le contenu d'un fichier en remplaçant tous ses caractères minuscules en majuscules. La source et la cible sont supposées être des noms de fichier corrects et avec les droits d'accès nécessaires.

```c
#include <fcntl.h>
#include <unistd.h>
#include <ctype.h>

int main(int argc, char *argv[]) {
    int src = open(argv[1], O_RDONLY);
    int dst = open(argv[2], O_WRONLY | O_CREAT | O_TRUNC, 0644);

    char buffer[512];
    ssize_t n;
    while ((n = read(src, buffer, sizeof(buffer))) > 0) {
        for (ssize_t i = 0; i < n; i++)
            buffer[i] = toupper((unsigned char) buffer[i]);
        write(dst, buffer, n);
    }

    close(src);
    close(dst);
    return 0;
}
```

## Exercice 4 (5 = 4+1 pts) — Outils make, gdb, …

1. Donner le fichier Makefile pour construire le programme « commande », correspondant à la situation suivante :
   - Le fichier `commande.c` contient la fonction `main` et inclut les fichiers suivants : `<stdio.h>`, `<string.h>`, `<math.h>`, `"commun.h"`, `"util.h"` et `"fichier.h"`
   - Le fichier `util.c` inclut les fichiers suivants : `<stdio.h>`, `"commun.h"` et `"util.h"`
   - Le fichier `commun.c` inclut les fichiers suivants : `<stdio.h>`, `"commun.h"` et `"fichier.h"`
   - Le fichier `libfichier.a` contient les fonctions déclarées dans le fichier `fichier.h` (fichier bibliothèque)

   N.B. : on utilise le compilateur C du projet GNU, `gcc` ; utiliser les options de compilation pour indiquer qu'il s'agit de source en ANSI C, signaler tous les warnings et les considérer comme des erreurs.

   <details>
   <summary>Correction</summary>

   ```makefile
   commande: commande.o util.o commun.o libfichier.a
   	gcc $(CFLAGS) -o commande commande.o util.o commun.o -lfichier

   commande.o: commande.c commun.h util.h fichier.h
   	gcc $(CFLAGS) -Wall -ansi -pedantic -c commande.c

   util.o: util.c util.h commun.h
   	gcc $(CFLAGS) -Wall -ansi -pedantic -c util.c

   commun.o: commun.c commun.h fichier.h
   	gcc $(CFLAGS) -Wall -ansi -pedantic -c commun.c
   ```

   </details>

2. Modifier le Makefile pour pouvoir déboguer le programme par `gdb`.

   <details>
   <summary>Correction</summary>

   Ajouter `CFLAGS=-g` dans le Makefile, ou l'invoquer directement :
   ```bash
   $ make CFLAGS=-g
   ```

   </details>

</TabItem>
<TabItem value="pdf" label="PDF">

<p><strong>Sujet</strong></p>
<PdfViewer file="/pdfs/se-examen-principale-2012.pdf" />

<p><strong>Correction</strong></p>
<PdfViewer file="/pdfs/se-examen-principale-2012-correction.pdf" />

</TabItem>
</Tabs>
