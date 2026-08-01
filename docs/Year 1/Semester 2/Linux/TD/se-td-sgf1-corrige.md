---
sidebar_position: 1
title: TD SGF (avec corrigé)
sidebar_label: TD SGF
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD : SGF

*Introduction aux Systèmes d'Exploitation — M. Sellami*

## Exercice 1

1. Soit un disque dur avec les caractéristiques suivantes :
   - Composé de 6 plateaux
   - Chaque face d'un plateau contient 10 pistes
   - Chaque piste contient 15 secteurs
   - Chaque bloc physique égal à 3 secteurs
   - Chaque secteur égal 512 octets

   Calculer la taille du disque dur en termes de nombre de faces, nombre de cylindres, nombre de pistes, nombre de secteurs, nombre de blocs physiques et taille en octets.

   <details>
   <summary>Correction</summary>

   | faces (têtes) | cylindres | pistes | secteurs | blocs physiques | octets |
   |---|---|---|---|---|---|
   | 12 | 10 | 10\*12 | 12\*10\*15 = 1800 | 1800/3 = 600 | 1800\*512 |

   </details>

2. Considérons un SGF utilisant une méthode d'allocation chaînée indexée à base d'une table FAT. Chaque entrée de la table FAT a une taille de 24 bits. Pour un disque de 32 Go, quelle est la taille minimale d'allocation de fichier dans ce système ? Justifiez votre réponse.

   <details>
   <summary>Correction</summary>

   Un disque de 32 Go a 2³⁵ octets de stockage. Si chaque entrée de la FAT a 24 bits, on peut avoir au plus 2²⁴ unités d'allocation (une par entrée FAT), donc chaque unité d'allocation doit être de 2³⁵ / 2²⁴ = 2¹¹ octets = **2 Ko**.

   </details>

3. Peut-on mettre en place les liens symboliques dans le système de fichiers FAT ? Pourquoi ?

   <details>
   <summary>Correction</summary>

   Oui. Il suffit d'attribuer un bit dans le répertoire pour indiquer que cette entrée est un nom symbolique. Le nom complet (chemin cible) est alors stocké comme contenu du « fichier » qui sert de lien symbolique. Le système d'exploitation doit être modifié pour reconnaître qu'il s'agit d'un lien symbolique et effectuer une recherche supplémentaire pour accéder au fichier réel.

   </details>

## Exercice 2

Prenons l'exemple d'un système de fichiers très simple pour un petit disque. Chaque secteur tient sur deux entiers, et tous les blocs de données, blocs indirects et i-nœuds sont de taille 1 secteur (chacun contient 2 entiers). Tous les fichiers stockés sur le disque sont interprétés comme des répertoires (il n'y a pas de « fichiers de données »).

Structures de données :
- **i-nœud** = 1 pointeur sur un bloc de données + 1 pointeur sur un bloc indirect
- **bloc indirect** = 2 pointeurs vers des blocs de données

Un répertoire contient zéro ou plusieurs paires d'entiers : le premier entier de chaque paire est un nom de fichier, le second est l'i-nœud du fichier. La valeur `99` signifie un pointeur nul. Un répertoire vide a un bloc disque avec le contenu `99 99`. L'i-nœud du répertoire racine `/` est `0`.

### Table des i-nœuds (état initial)

| i-nœud | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|---|
| bloc données | 10 | 6 | | 8 | | | 3 | |
| bloc indirect | 6 | 99 | | 99 | | | 99 | |

### Bloc disque (état initial)

| bloc | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | 32 3 | | 96 1 | | | 1 99 | 99 99 | 99 | | 57 6 | | |

**a. Combien d'entrées au maximum un répertoire peut contenir ?** (chaque entrée est une paire d'entiers)

<details>
<summary>Correction</summary>

3 (1 entrée dans le bloc de données direct + 2 entrées dans les deux blocs de données référencés par le bloc indirect).

</details>

**b. Donner tous les répertoires stockés sur le disque (avec les chemins complets), ainsi que les noms des fichiers stockés dans chaque répertoire.**

<details>
<summary>Correction</summary>

| répertoire (chemin) | i-nœud | bloc indirect | blocs de données | contenu (sous-répertoires) |
|---|---|---|---|---|
| `/` | 0 | 6 | 10, 1 | `/32`, `/57` |
| `/32` | 3 | n/a | 8 | n/a |
| `/57` | 6 | n/a | 3 | `/57/96` |
| `/57/96` | 1 | n/a | 7 | n/a |

</details>

**c. Modifier les structures de données ci-dessus afin d'ajouter un répertoire vide appelé `87` dans le répertoire `/`.**

<details>
<summary>Correction</summary>

| répertoire (chemin) | i-nœud | bloc indirect | blocs de données | contenu (sous-répertoires) |
|---|---|---|---|---|
| `/87` | 9 | n/a | 14 | n/a |
| `/` | 0 | 6 | 10, 1, 13 | `/32`, `/57`, `/87` |

Table des i-nœuds mise à jour :

| i-nœud | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| bloc données | 10 | 6 | | 8 | | | 3 | | | 14 |
| bloc indirect | 6 | 99 | | 99 | | | 99 | | | 99 |

Blocs disque mis à jour (bloc 6 réécrit avec la nouvelle entrée `/87`, nouveau bloc 13 alloué pour le second niveau du bloc indirect de `/`) :

| bloc | 6 | 13 |
|---|---|---|
| | 1 99, 99 99 | 87 9, 99 99 |

</details>

## Exercice 3

Le système de fichiers « FastFile » utilise une table d'i-nœuds pour organiser les fichiers sur le disque. Chaque i-nœud est constitué d'un identificateur d'utilisateur (2 octets), trois dates (4 octets chacune), les bits de protection (2 octets), le nombre de liens (2 octets), un type de fichier (2 octets) et la taille (4 octets). En outre, l'i-nœud contient 13 index directs, 1 index vers une table à un niveau (simple indirection), 1 index vers une table à deux niveaux (double indirection), et 1 index vers une table à trois niveaux (triple indirection). Le système de fichiers stocke aussi les 436 premiers octets de chaque fichier directement dans l'i-nœud.

1. Supposons qu'un secteur de disque fasse 512 octets et que toute table auxiliaire tienne sur un secteur. Quelle est la taille maximale d'un fichier dans ce système ?

   <details>
   <summary>Correction</summary>

   Il faut d'abord déterminer la taille d'un index (2 ou 4 octets). Avec un schéma d'indexation à 3 niveaux, un index à 2 octets ne fonctionnerait pas (adressage insuffisant pour un grand nombre de secteurs). On utilise donc un index à **4 octets**, ce qui donne 128 entrées par secteur (512/4).

   Taille maximale :
   ```
   436 + 13*512 + 1*128*512 + 1*128*128*512 + 1*128*128*128*512
   = 1 082 203 060 octets ≈ 1 Go
   ```

   </details>

2. Est-il bénéfique que les 436 premiers octets du fichier soient inclus dans l'i-nœud ?

   <details>
   <summary>Correction</summary>

   Oui. La plupart des fichiers sont de petite taille. Si la taille du fichier est de 436 octets ou moins, l'ensemble du fichier peut être lu et écrit en une seule opération disque, sans accès indépendant à un bloc de données séparé de l'i-nœud.

   </details>

## Exercice 4

Peut-on mettre en place les liens physiques (durs) dans le système DOS ? Pourquoi ?

<details>
<summary>Correction</summary>

Non. Dans DOS, le nom du fichier est fusionné avec les structures de données du fichier (répertoire = `{nom + descripteur}`). Contrairement à UNIX, où l'espace de noms se trouve dans une structure de répertoire distincte des structures de données du fichier (répertoire = `{nom + i-nœud}`), ce qui permet à plusieurs noms de pointer vers le même i-nœud (lien physique).

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se-td-sgf1-corrige.pdf" />

</TabItem>
</Tabs>
