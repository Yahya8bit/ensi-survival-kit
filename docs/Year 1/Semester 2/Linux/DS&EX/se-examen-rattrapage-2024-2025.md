---
sidebar_position: 3
title: Examen de Rattrapage SE & Env. Unix 2024/2025
sidebar_label: Rattrapage 2024/2025
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Examen de Rattrapage — Introduction au Système d'Exploitation et Env. Unix (2024/2025)

*École Nationale des Sciences de l'Informatique — Université de la Manouba — Niveau : II1 — Date : 02/06/2025 — Durée : 2H — Documents non autorisés — Calculatrice non autorisée*

*Enseignant(e)s : M. Essafi, I. Amdouni, M. Zaghdoud, H. Gharsallaoui, M. Ben Sassi*

## Exercice 1 : Les filtres (5 x 1 = 5 pts)

Dans tout l'exercice, utilisez les commandes (avec les arguments) vues dans le cours.

1. La commande `ps` permet de lister la liste des processus. Les différentes colonnes peuvent être séparées par plusieurs espaces, par exemple :

   ```
   guest-mm2x7k@support21:~$ ps
     PID TTY          TIME CMD
    5425 pts/2    00:00:00 bash
    5469 pts/2    00:00:00 ps
   guest-mm2x7k@support21:~$
   ```

   En utilisant les filtres, donner les commandes pour :

   a. Afficher la liste des identifiants (et seulement les identifiants) de processus en cours d'exécution sur votre ordinateur.

   b. La liste précédente est longue. Pour s'assurer que l'on ne s'est pas trompé de colonne, on souhaite n'afficher que la première ligne. Ajouter un dernier filtre pour cela.

   c. La commande `ps -lax` affiche plusieurs informations y compris l'identifiant du processus parent : la colonne PPID (5ᵉ colonne). Donner la liste de ces PPID triée par ordre décroissant.

2. Nous disposons d'un fichier `Liste.csv`, avec des colonnes séparées par un espace et dont chaque ligne a la structure suivante :

   ```
   Nom Prenom disponibilité Ville groupe
   ```

   a. Écrire une commande qui compte le nombre de lignes commençant par `B` et se terminant par `.` dans le fichier `liste.csv`.

   b. Afficher le prénom et le groupe des étudiants.

## Exercice 2 : Sed et AWK (1x3 + 3 = 6 pts)

1. Donnez le résultat de ces commandes :

   a. `echo "bonjour la lune et la terre" | sed 's/la [^ ]*/le monde/'`

   b. `echo "aa bb aa" | sed 's|aa|zz|g'`

   c. `echo abcd123 | sed -r 's/([a-z]*)([0-9]*)/\2\1/'`

2. La question suivante porte sur le fichier **mesure** suivant (colonnes séparées par `|`) :

   | nom de la mesure | lieu de la mesure | date de la mesure | valeur brute | correction 1 | correction 2 | correction 3 | valeur corrigée |
   |---|---|---|---|---|---|---|---|
   | Marcel | brest | 18/12/1998 | 12.5 | 1.34 | 1.23 | -1.5 | 13.47 |
   | Polo | loctudy | 21/05/1997 | 11.5 | 1.24 | 1.12 | -1.2 | 12.66 |

   Le champ *valeur corrigée* est la somme algébrique de la valeur brute et des 3 corrections.

   Vous vous êtes trompé dans le signe de la correction 1. Pour la correction 2, vous avez réalisé qu'il manquait 0,1. Corrigez le fichier en tenant compte de ces deux erreurs, en mettant à jour les valeurs corrigées. Ensuite, affichez la somme totale et la moyenne des valeurs corrigées. Enregistrez ces résultats dans un fichier.

## Exercice 3 : Script (4x1 + 3 = 7 pts)

1. Que fait ce script ? (1 point)

   ```bash
   for i in $*
   do
       if [[ $i == -* ]]
       then
           echo $i
       fi
   done
   ```

2. Soit le fichier `data2.txt` composé de blocs d'informations par personne, de la forme suivante :

   ```
   Date  Affiliation  Nom  Prenom  Tél
   ```

   Écrire un script Shell appelé `adresses.sh` qui prend en paramètre le fichier `data2.txt` et qui permet de :

   - Afficher les lignes contenant un numéro de téléphone avec une extension, c'est-à-dire une lettre `x` ou `X` suivie de quatre chiffres.
   - Afficher les lignes qui commencent par trois chiffres suivis d'un tiret (par exemple : `123-...`).
   - Afficher les lignes qui commencent par un `S` majuscule.

   Donner l'ensemble du script complet, en n'oubliant pas les vérifications nécessaires.

## Exercice 4 : Makefile (2 pts)

Nous disposons d'un ensemble de fichiers permettant de calculer les racines d'un polynôme du second degré à coefficients réels :

- `complex.h` et `complex.c` qui contiennent respectivement les déclarations et les définitions des fonctions manipulant des nombres complexes ;
- `solve.h` et `solve.c` qui contiennent respectivement les déclarations et les définitions des fonctions qui permettent de résoudre une équation du second degré ;
- `my_prog.c` qui contient la fonction principale.

Écrire un fichier Makefile qui permet d'automatiser la compilation et de générer l'exécutable `prog` à partir de ces fichiers.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se-examen-rattrapage-2024-2025.pdf" />

</TabItem>
</Tabs>
