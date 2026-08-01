---
sidebar_position: 3
title: SE Chapitre II (Partie 2) - Shell, filtres et processus
sidebar_label: Ch2 (P2) - Shell & Processus
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre II (Partie 2) : L'environnement Unix/Linux — Shell, filtres et processus

*Systèmes d'Exploitation — Maher Sellami*

## Le Shell

Le **shell** est l'interpréteur de commandes d'Unix/Linux : il lit une ligne de commande, l'interprète, et lance les programmes correspondants. C'est aussi un véritable langage de programmation (variables, structures de contrôle, fonctions).

Principaux shells : `sh` (Bourne Shell), `csh` (C Shell), `ksh` (Korn Shell), `bash` (Bourne Again Shell), `tcsh`, `zsh`.

### Variables et environnement

```bash
NOM=valeur          # affectation (pas d'espace autour du =)
echo $NOM           # lecture
export NOM           # exporte la variable vers les processus fils
unset NOM             # supprime la variable
env                  # liste les variables d'environnement
```

Variables d'environnement usuelles : `PATH`, `HOME`, `USER`, `SHELL`, `PWD`, `PS1`.

### Redirections et tubes (pipes)

```bash
cmd > fichier     # redirige la sortie standard (écrase)
cmd >> fichier    # redirige en ajoutant (append)
cmd < fichier     # redirige l'entrée standard
cmd 2> fichier    # redirige la sortie d'erreur
cmd1 | cmd2       # tube : la sortie de cmd1 devient l'entrée de cmd2
```

### Métacaractères

| Caractère | Signification |
|---|---|
| `*` | n'importe quelle suite de caractères |
| `?` | un caractère quelconque |
| `[abc]` | un caractère parmi a, b, c |
| `~` | répertoire personnel (`$HOME`) |
| `;` | séparateur de commandes |
| `&` | exécution en arrière-plan |
| `&&` | exécute si la commande précédente réussit |
| `\|\|` | exécute si la commande précédente échoue |

### Structures de contrôle (shell script)

```bash
#!/bin/bash

if [ $1 -gt 0 ]; then
    echo "positif"
elif [ $1 -eq 0 ]; then
    echo "nul"
else
    echo "négatif"
fi

for i in 1 2 3; do
    echo $i
done

while [ $x -lt 10 ]; do
    x=$((x+1))
done

case $1 in
    start) echo "démarrage" ;;
    stop)  echo "arrêt" ;;
    *)     echo "usage: $0 {start|stop}" ;;
esac
```

Paramètres spéciaux : `$0` (nom du script), `$1`...`$9` (arguments), `$#` (nombre d'arguments), `$@` (tous les arguments), `$?` (code de retour de la dernière commande), `$$` (PID du shell).

## Filtres (commandes de traitement de texte)

| Commande | Rôle |
|---|---|
| `grep motif fichier` | recherche des lignes correspondant à un motif (expression régulière) |
| `sort fichier` | trie les lignes |
| `uniq` | élimine les doublons consécutifs |
| `wc` | compte lignes / mots / caractères |
| `cut -d: -f1 fichier` | extrait des champs |
| `tr a-z A-Z` | translitère des caractères |
| `head` / `tail` | affiche début / fin d'un fichier |

### `sed` (Stream EDitor)

Éditeur de flux, applique des transformations ligne par ligne sans édition interactive.

```bash
sed 's/ancien/nouveau/' fichier     # remplace la 1ère occurrence par ligne
sed 's/ancien/nouveau/g' fichier    # remplace toutes les occurrences
sed '2,4d' fichier                  # supprime les lignes 2 à 4
sed -n '3p' fichier                 # affiche uniquement la ligne 3
```

### `awk`

Langage de traitement de données structurées en colonnes.

```bash
awk '{print $1, $3}' fichier          # affiche les colonnes 1 et 3
awk -F: '{print $1}' /etc/passwd      # avec séparateur personnalisé
awk '$3 > 100 {print $0}' fichier     # filtre sur condition
awk 'END {print NR}' fichier          # nombre de lignes (NR = record courant)
```

Variables internes : `NR` (numéro d'enregistrement), `NF` (nombre de champs), `FS` (séparateur de champs), `$0` (ligne entière), `$1..$n` (champs).

## Gestion des processus

Un **processus** est un programme en cours d'exécution : code, données, pile, et un contexte (PID, PPID, état, priorité...).

### États d'un processus

- **Élu (Running)** : possède le processeur
- **Prêt (Ready)** : attend le processeur
- **Bloqué (Blocked/Waiting)** : attend un événement (E/S, ressource)
- **Zombie** : terminé mais pas encore récupéré par son père (`wait`)
- **Suspendu (Stopped)** : arrêté par un signal (SIGSTOP)

### Commandes de gestion des processus

```bash
ps          # liste les processus de la session
ps -ef      # liste tous les processus, format complet
ps aux      # format BSD
top         # vue dynamique des processus
kill -9 PID # envoie SIGKILL au processus PID
kill -l     # liste les signaux disponibles
jobs        # liste les tâches du shell courant
fg / bg     # ramène / envoie une tâche au premier/arrière-plan
nice / renice # modifie la priorité d'un processus
```

### Création de processus

- `fork()` : duplique le processus appelant (processus père/fils)
- `exec()` (famille `execl`, `execv`, `execve`...) : remplace l'image mémoire du processus par un nouveau programme
- `wait()` / `waitpid()` : le père attend la fin d'un fils, récupère son code de retour
- `exit()` : termine le processus courant

Schéma classique shell : `fork()` crée un fils, celui-ci fait un `exec()` du programme demandé, le père fait un `wait()`.

### Signaux

Mécanisme de communication asynchrone entre processus.

| Signal | Numéro | Rôle |
|---|---|---|
| `SIGHUP` | 1 | terminal raccroché |
| `SIGINT` | 2 | interruption (Ctrl+C) |
| `SIGKILL` | 9 | terminaison forcée, non interceptable |
| `SIGSEGV` | 11 | violation d'accès mémoire |
| `SIGTERM` | 15 | demande de terminaison propre |
| `SIGCHLD` | 17/20 | un fils s'est terminé |
| `SIGSTOP` | 19 | suspension forcée |

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se-ch2-part2-shell-awk-sed-processus.pdf" />

</TabItem>
</Tabs>
