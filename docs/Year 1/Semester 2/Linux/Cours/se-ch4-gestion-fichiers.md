---
sidebar_position: 5
title: SE Chapitre IV - Systèmes de gestion de fichiers
sidebar_label: Ch4 - Systèmes de gestion de fichiers
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre IV : Systèmes de gestion de fichiers

*Systèmes d'Exploitation — Maher Sellami (2011-2012)*

## Rôle du SGF

Le **Système de Gestion de Fichiers (SGF)** est le composant du système d'exploitation chargé de gérer le stockage, l'organisation, l'accès et la protection des données sur les mémoires secondaires (disques). Il masque à l'utilisateur les détails physiques du support et offre une vue logique (fichiers, répertoires).

Deux niveaux d'organisation :

- **Organisation logique** : vue offerte à l'utilisateur/au programmeur (fichier = suite d'enregistrements, nommage, répertoires)
- **Organisation physique** : implantation réelle des données sur le disque (blocs, secteurs, méthodes d'allocation)

## Le fichier logique

Un fichier est une collection d'informations nommée, structurée en **enregistrements** (records), eux-mêmes composés de **champs**.

```pascal
type
  Enregistrement = record
    Matricule : integer;
    Nom       : string[20];
    Note      : real;
  end;
var
  f : file of Enregistrement;
```

```c
typedef struct {
    int matricule;
    char nom[20];
    float note;
} Enregistrement;

FILE *f = fopen("etudiants.dat", "rb");
```

### Modes d'accès

- **Accès séquentiel** : les enregistrements sont lus/écrits dans l'ordre physique, du début à la fin (bande magnétique, fichiers texte).
- **Accès direct (aléatoire)** : chaque enregistrement est accessible directement par sa position ou sa clé, sans parcourir les précédents (nécessite un support à accès direct — disque).

### Organisation par clé

- **Clé unique** : un champ identifie de façon unique chaque enregistrement (ex. matricule).
- **Clé multiple / secondaire** : plusieurs champs peuvent servir de critère de recherche (nécessite des index secondaires).

### Techniques d'adressage direct

- **Adressage dispersé (hachage)** : une fonction de hachage transforme la clé en adresse physique. Rapide, mais collisions possibles (résolues par chaînage ou sondage).
- **Adressage indexé** : une table d'index associe chaque clé à l'adresse de l'enregistrement correspondant.

## Organisation physique sur disque

### Méthodes d'allocation d'espace

| Méthode | Principe | Avantages | Inconvénients |
|---|---|---|---|
| **Allocation contiguë** | le fichier occupe une suite de blocs consécutifs | accès séquentiel et direct rapides | fragmentation externe, croissance difficile |
| **Allocation par zones (extents)** | le fichier est découpé en plusieurs zones contiguës, chaînées entre elles | limite la fragmentation, croissance possible | accès un peu plus coûteux |
| **Allocation par blocs chaînés (liste chaînée)** | chaque bloc contient un pointeur vers le suivant | pas de fragmentation externe, croissance facile | accès direct lent (parcours obligatoire), perte d'espace pour les pointeurs |
| **Table d'allocation de fichiers (FAT)** | une table unique en mémoire répertorie le bloc suivant pour chaque bloc du disque | accès direct plus rapide que le chaînage pur (table en mémoire) | table volumineuse pour les gros disques |
| **Allocation indexée** | chaque fichier possède un bloc d'index listant tous ses blocs de données | accès direct efficace, pas de fragmentation externe | espace perdu pour les blocs d'index |

### Allocation indexée Unix/Linux : les inodes

Chaque fichier est décrit par un **inode**, contenant ses métadonnées (type, permissions, propriétaire, dates, taille, nombre de liens) et des pointeurs vers ses blocs de données :

- **Pointeurs directs** (typiquement 12) : pointent directement vers des blocs de données — accès rapide pour les petits fichiers.
- **Pointeur indirect simple** : pointe vers un bloc qui contient lui-même des pointeurs vers des blocs de données.
- **Pointeur indirect double** : pointe vers un bloc de pointeurs vers des blocs indirects simples.
- **Pointeur indirect triple** : un niveau supplémentaire, pour les très gros fichiers.

Ce schéma permet un accès rapide aux petits fichiers (pointeurs directs) tout en supportant des fichiers de très grande taille (indirections successives).

### Gestion de l'espace libre

- **Vecteur (table) de bits** : un bit par bloc (0 = libre, 1 = occupé) ; simple, compact, permet de trouver facilement des blocs contigus.
- **Liste chaînée des blocs libres** : chaque bloc libre pointe vers le suivant ; pas d'espace dédié mais parcours coûteux pour trouver plusieurs blocs contigus.

## Structuration du disque dur

### Formatage

- **Formatage physique (bas niveau)** : organise la surface du disque en pistes et secteurs (fait en usine de nos jours).
- **Formatage logique** : crée la structure du système de fichiers (superbloc, table d'inodes/FAT, zone de données) sur une partition.

### Partitionnement

Un disque est divisé en **partitions**, chacune pouvant contenir un système de fichiers distinct.

- **MBR (Master Boot Record)** : premier secteur du disque, contient le code d'amorçage et la table des partitions (jusqu'à 4 partitions primaires).
- Sous Linux, une partition étendue peut contenir plusieurs partitions logiques.

### Organisation Linux vs DOS/Windows

- **Linux** : une seule arborescence unifiée, chaque partition est *montée* sur un point de montage (répertoire) de cette arborescence (ex. `/`, `/home`, `/var`).
- **DOS/Windows** : chaque partition possède sa propre lettre de lecteur (`C:`, `D:`...), pas d'arborescence unique.

## Démarrage de l'ordinateur

1. **BIOS/UEFI** : test matériel (POST), puis recherche d'un périphérique amorçable.
2. **MBR / bootstrap** : le code du secteur d'amorçage est chargé en mémoire et exécuté.
3. Le **chargeur d'amorçage** (bootloader, ex. GRUB) charge le noyau du système d'exploitation.
4. Le noyau s'initialise, monte le système de fichiers racine, puis lance le premier processus (`init` / `systemd`).

## Montage et démontage

```bash
mount /dev/sda1 /mnt/data     # monte la partition sur le point de montage
umount /mnt/data              # démonte
mount                         # liste les systèmes de fichiers montés
cat /etc/fstab                # table des montages automatiques au démarrage
```

## Réalisation des fonctions d'accès élémentaires (appels système Unix)

```c
#include <fcntl.h>
#include <unistd.h>

int fd = open("fichier.txt", O_RDWR | O_CREAT, 0644);
ssize_t n = read(fd, buffer, taille);
ssize_t m = write(fd, buffer, taille);
off_t pos = lseek(fd, 0, SEEK_SET);   /* repositionne le curseur */
int fd2 = dup(fd);                     /* duplique un descripteur */
dup2(fd, 1);                            /* redirige la sortie standard */
close(fd);
```

### Parcours de répertoires

```c
#include <dirent.h>

DIR *d = opendir(".");
struct dirent *entry;
while ((entry = readdir(d)) != NULL)
    printf("%s\n", entry->d_name);
closedir(d);
```

### Informations sur un fichier : `stat`

```c
#include <sys/stat.h>

struct stat info;
stat("fichier.txt", &info);
/* info.st_size, info.st_mode, info.st_uid, info.st_mtime, ... */
```

## Sécurité et protection des fichiers

### Permissions

Chaque fichier possède des droits pour le **propriétaire**, le **groupe** et les **autres** : lecture (r), écriture (w), exécution (x). Voir `chmod`/`chown`/`umask` (chapitre précédent).

### Redondance et tolérance aux pannes : RAID

| Niveau | Principe | Tolérance aux pannes |
|---|---|---|
| **RAID 0** | *striping* (répartition des données sans redondance) | aucune — améliore uniquement la performance |
| **RAID 1** | *mirroring* (duplication intégrale sur 2 disques) | tolère la perte d'un disque |
| **RAID 5** | striping avec parité répartie sur tous les disques | tolère la perte d'un disque |
| **RAID 6** | comme RAID 5 avec double parité | tolère la perte de deux disques |

### Sauvegarde

- **Sauvegarde complète** : copie intégrale des données à chaque fois — simple mais coûteuse en temps/espace.
- **Sauvegarde incrémentale** : ne copie que les données modifiées depuis la dernière sauvegarde — rapide et compacte, mais restauration plus complexe (nécessite la chaîne complète des incréments).

</TabItem>
<TabItem value="pdf" label="PDF">

<iframe src="/pdfs/se-ch4-gestion-fichiers.pdf" width="100%" height="800px" style={{border: '1px solid var(--ifm-color-emphasis-300)'}} />

</TabItem>
</Tabs>
