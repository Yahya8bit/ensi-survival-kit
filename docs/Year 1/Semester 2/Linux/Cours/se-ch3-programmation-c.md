---
sidebar_position: 4
title: SE Chapitre III - Programmer en C/C++ sous GNU/Linux
sidebar_label: Ch3 - Programmer en C/C++ sous GNU/Linux
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre III : Programmer en C/C++ sous GNU/Linux

*Systèmes d'Exploitation — Maher Sellami*

## Compilation et édition de liens

La construction d'un exécutable passe par plusieurs étapes : **préprocesseur** → **compilation** (source → assembleur → objet) → **édition de liens** (assemblage des fichiers objets et des bibliothèques).

```bash
gcc -c fichier.c -o fichier.o    # compile sans éditer les liens
gcc fichier.o -o programme        # édite les liens
gcc fichier.c -o programme        # tout en une étape
```

### Options usuelles de GCC

| Option | Rôle |
|---|---|
| `-c` | compile sans édition de liens (produit un `.o`) |
| `-o fichier` | nomme le fichier de sortie |
| `-I chemin` | ajoute un chemin de recherche des fichiers d'en-tête |
| `-D NOM=valeur` | définit une macro du préprocesseur |
| `-O0`, `-O1`, `-O2`, `-O3` | niveau d'optimisation |
| `-l nom` | lie la bibliothèque `libnom` |
| `-L chemin` | ajoute un chemin de recherche des bibliothèques |
| `-Wall` | active tous les avertissements usuels |
| `-g` | inclut les informations de débogage |

## GNU Make et les Makefiles

`make` automatise la compilation en ne recompilant que ce qui a changé, à partir d'un fichier `Makefile` décrivant cibles, dépendances et règles.

```makefile
CC = gcc
CFLAGS = -Wall -g

programme: main.o util.o
	$(CC) main.o util.o -o programme

main.o: main.c util.h
	$(CC) $(CFLAGS) -c main.c

util.o: util.c util.h
	$(CC) $(CFLAGS) -c util.c

clean:
	rm -f *.o programme
```

Syntaxe générale :

```makefile
cible: prérequis
	commande   # indentée par une TABULATION, pas des espaces
```

Une cible est reconstruite si elle n'existe pas, ou si l'un de ses prérequis est plus récent qu'elle.

## Le débogueur GDB

```bash
gcc -g programme.c -o programme   # compiler avec les symboles de debug
gdb ./programme
```

Commandes GDB principales :

| Commande | Rôle |
|---|---|
| `run` (`r`) | lance le programme |
| `break ligne` (`b`) | pose un point d'arrêt |
| `next` (`n`) | exécute la ligne suivante (sans entrer dans les fonctions) |
| `step` (`s`) | exécute la ligne suivante (entre dans les fonctions) |
| `finish` | termine la fonction courante |
| `until` | exécute jusqu'à sortir de la boucle courante |
| `print var` (`p`) | affiche la valeur d'une variable |
| `where` / `bt` | affiche la pile d'appels |
| `continue` (`c`) | reprend l'exécution jusqu'au prochain point d'arrêt |
| `quit` | quitte GDB |

## Arguments de la ligne de commande

```c
int main(int argc, char *argv[]) {
    /* argc : nombre d'arguments (dont le nom du programme)
       argv[0] : nom du programme
       argv[1..argc-1] : arguments */
    for (int i = 0; i < argc; i++)
        printf("argv[%d] = %s\n", i, argv[i]);
    return 0;
}
```

## Gestion des erreurs

```c
#include <errno.h>
#include <stdio.h>
#include <string.h>

FILE *f = fopen("inexistant.txt", "r");
if (f == NULL) {
    perror("fopen");                 /* affiche le message d'erreur système */
    fprintf(stderr, "errno = %d (%s)\n", errno, strerror(errno));
}
```

`perror()` affiche un message correspondant à `errno` ; `strerror(errno)` renvoie ce message sous forme de chaîne.

```c
#include <assert.h>

assert(ptr != NULL);   /* interrompt le programme si la condition est fausse (mode debug) */
```

## Bibliothèques

### Bibliothèques statiques

```bash
gcc -c a.c b.c                 # produit a.o b.o
ar rcs libmalib.a a.o b.o      # crée l'archive libmalib.a
gcc main.c -L. -lmalib -o programme
```

Le code de la bibliothèque est copié dans l'exécutable final (exécutable plus gros, autonome).

### Bibliothèques dynamiques (partagées)

```bash
gcc -fPIC -c a.c b.c                       # code indépendant de la position
gcc -shared -o libmalib.so a.o b.o
gcc main.c -L. -lmalib -o programme
export LD_LIBRARY_PATH=.:$LD_LIBRARY_PATH   # pour que l'exécutable la trouve
./programme
```

La bibliothèque est chargée dynamiquement à l'exécution (exécutable plus léger, bibliothèque partagée entre plusieurs programmes).

## Analyse des options : `getopt_long`

```c
#include <getopt.h>

struct option long_options[] = {
    {"verbose", no_argument,       0, 'v'},
    {"output",  required_argument, 0, 'o'},
    {0, 0, 0, 0}
};

int opt;
while ((opt = getopt_long(argc, argv, "vo:", long_options, NULL)) != -1) {
    switch (opt) {
        case 'v': verbose = 1; break;
        case 'o': output_file = optarg; break;
        default: usage(); exit(1);
    }
}
```

## Variables d'environnement en C

```c
#include <stdlib.h>

char *val = getenv("HOME");        /* lit une variable d'environnement */
setenv("MAVAR", "valeur", 1);      /* définit (1 = écrase si déjà présente) */
putenv("MAVAR=valeur");            /* définit via une chaîne "NOM=valeur" */
unsetenv("MAVAR");                 /* supprime */

extern char **environ;             /* tableau de toutes les variables d'environnement */
for (int i = 0; environ[i] != NULL; i++)
    printf("%s\n", environ[i]);
```

## Documentation : man et info

```bash
man 2 open        # section 2 : appels système
man 3 printf      # section 3 : fonctions de bibliothèque C
man -k mot_clé    # recherche par mot-clé
info gcc          # documentation détaillée (format info)
```

Sections du manuel : 1 (commandes utilisateur), 2 (appels système), 3 (bibliothèque C), 4 (fichiers spéciaux), 5 (formats de fichiers), 6 (jeux), 7 (divers), 8 (administration système).

</TabItem>
<TabItem value="pdf" label="PDF">

<iframe src="/pdfs/se-ch3-programmation-c.pdf" width="100%" height="800px" style={{border: '1px solid var(--ifm-color-emphasis-300)'}} />

</TabItem>
</Tabs>
