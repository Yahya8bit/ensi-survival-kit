---
sidebar_position: 2
title: TP2 - Environnement Unix (Shell) avec correction
sidebar_label: TP2 - Shell
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TP 2 — Environnement Unix

*ENSI-II2 — H. Idoudi*

## Exercice 1

Écrire un script Shell qui permet de vérifier si un utilisateur est connecté.

<details>
<summary>Correction</summary>

```bash
if [ $# -eq 1 ]
then
    for i in `users`
    do
        if [ $i = $1 ]
        then
            echo "Utilisateur $1 connecté"
            exit
        fi
    done
    echo "Utilisateur $1 non connecté"
else
    echo "nombre de paramètres incorrect."
fi
```

</details>

## Exercice 2

Écrire un script Shell qui prend en paramètre le nom d'un élément de l'arborescence du système de fichiers. Il vérifie l'existence de cet élément puis affiche son nom s'il s'agit d'un fichier ou liste son contenu s'il s'agit d'un répertoire.

## Exercice 3

Créer la commande `crefic` obéissant à la syntaxe suivante :

```
$crefic nom quantité
```

Son rôle est de créer un ensemble de fichiers `nom1`, `nom2`, …, `nomN`. La création de chaque fichier doit être validée de façon interactive par l'utilisateur.

<details>
<summary>Correction</summary>

```bash
if [ $# -eq 2 ]
then
    x=1
    while [ $x -le $2 ]
    do
        nom="$1$x"
        echo "Voulez vous créer le fichier $nom :"
        echo 'saisir o/n'
        read reponse
        if [ $reponse = o -o $reponse = O ]
        then
            touch $nom
        fi
        x=`expr $x + 1`
    done
else
    echo "nombre de paramètres incorrect."
fi
```

</details>

## Exercice 4

Écrire un script Shell qui affiche le nombre d'utilisateurs connectés au système ainsi que leurs identités.

<details>
<summary>Correction</summary>

```bash
if [ $# -gt 0 ]
then
    echo "Trop de parametres."
else
    echo "Le nombre d'utilisateurs connectés est : "
    users | sort -u | wc -l
    echo "Les utilisateurs connectés sont : "
    users | sort -u
fi
```

</details>

## Exercice 5

Écrire un script Shell qui permet de vérifier si une variable a une valeur numérique.

<details>
<summary>Correction</summary>

```bash
if [ $# -eq 1 ]
then
    expr $1 + 1 > result 2> /dev/null
    if [ -s result ]
    then
        echo "numérique"
    else
        echo "pas numérique"
    fi
else
    echo "nombres de paramètres incorrect"
fi
```

</details>

## Exercice 6

Écrire un script Shell qui affiche la liste des sous-répertoires d'un répertoire passé en argument et indique une erreur si l'argument n'est pas un répertoire.

<details>
<summary>Correction</summary>

```bash
if [ $# -lt 1 ]
then
    echo " La liste des sous-répertoires du répertoire courant est :"
    for i in `ls`
    do
        if test -d $i
        then
            echo "- $i \n"
        fi
    done
elif [ $# -eq 1 ]
then
    if test -d $1
    then
        echo " La liste des sous-répertoires du répertoire $1 est :"
        for i in `ls $1`
        do
            if test -d $i
            then
                echo "- $i \n"
            fi
        done
    else
        echo "$1 n'est pas un répertoire."
    fi
else
    echo "nombre d'arguments > 1"
fi
```

</details>

## Exercice 7

Écrire un script Shell qui permet la recherche d'un fichier dans l'arborescence du répertoire donné en argument (par défaut le répertoire courant).

<details>
<summary>Correction</summary>

```bash
if [ $# -eq 1 ]
then
    # Appel récursif
    ./$0 $1 `pwd`
elif [ $# -eq 2 ]
then
    if test -d $2
    then
        for i in `ls $2`
        do
            if test $1 = $i
            then
                echo " $i est dans le repertoire $2"
            fi
        done
        for i in `ls $2`
        do
            if test -d $i
            then
                ./$0 $1 $i xx
            fi
        done
        if [ $# -eq 2 ]
        then
            echo "élément non trouvé"
        fi
    else
        echo "argument 2 doit être un répertoire."
    fi
else
    echo " nombre d'arguments incorrect"
fi
```

</details>

## Exercice 8

Écrire un script Shell qui affiche le nombre d'éléments de chaque répertoire passé en argument (on peut passer plusieurs répertoires en arguments).

<details>
<summary>Correction</summary>

```bash
if [ $# -lt 1 ]
then
    x=`ls | wc -l`
    echo "Le nombre d'éléments du répertoire courant est : $x"
else
    for i in $@
    do
        if test -d $i
        then
            x=`ls $i | wc -l`
            echo "Le nombre d'éléments de $i est : $x"
        else
            echo "$i n'est pas un répertoire"
        fi
    done
fi
```

</details>

## Exercice 9

Écrire un script Shell qui simule le comportement de la commande `cp`.

<details>
<summary>Correction</summary>

```bash
if [ $# -eq 2 ]
then
    if test ! -f $1
    then
        echo " Le fichier est introuvable ."; exit
    fi
    if test ! -r $1
    then
        echo " Vous n'avez pas le droit de lecture sur le fichier $1."; exit
    fi
    if test -d $2
    then
        if test -w $2
        then
            cat $1 > "$2/$1"
        else
            echo " Vous n'avez le droit de lecture sur le répertoire $2."; exit
        fi
    elif test -f $2
    then
        if test -w $2
        then
            echo " Le fichier existe déjà; voulez vous l'ecraser (o-n) ?"
            read reponse
            until [ $reponse = o -o $reponse = n -o $reponse = O -o $reponse = N ]
            do
                echo 'saisir o/n'
                read reponse
            done
            case $reponse in
                o) cat $1 > $2;exit;;
                O) cat $1 > $2;exit;;
                n) cat $1 >> $2;exit;;
                N) cat $1 >> $2;exit;;
            esac
        else
            echo " Vous n'avez le droit de lecture sur le fichier $2."; exit
        fi
    fi
else
    echo "nombre de paramètres incorrect."
fi
```

</details>

## Exercice 10

Écrire un script Shell qui permet de déterminer le plus long mot d'un fichier donné en argument.

<details>
<summary>Correction</summary>

```bash
x=0
mot=""
if [ $# -eq 1 ]
then
    for i in `cat $1`
    do
        lg=`echo $i | wc -c`
        if [ $lg -gt $x ]
        then
            x=$lg
            mot=$i
        fi
    done
    echo "Le mot le plus long est : $mot "
else
    echo " nombre de paramètres incorrect."
fi
```

</details>

## Exercice 11

Écrire un script Shell appelable soit sans arguments, soit avec trois arguments tel que : appelé sans arguments, le script réalise la lecture à partir du clavier ; disposant alors dans tous les cas de trois chaînes, le script indique si les trois chaînes sont identiques, si deux de ces chaînes sont identiques, ou si elles sont toutes différentes.

<details>
<summary>Correction</summary>

```bash
if [ $# -eq 0 ]
then
    echo -n "chaine 1 : "
    read ch1
    echo -n "chaine 2 : "
    read ch2
    echo -n "chaine 3 : "
    read ch3
elif [ $# -eq 3 ]
then
    ch1=$1; ch2=$2; ch3=$3
else
    echo "nombre de paramètres incorrect"
    exit
fi

if ( test $ch1 = $ch2 -a $ch2 = $ch3 )
then
    echo "les trois chaines sont egales."
elif ( test $ch1 = $ch2 )
then
    echo "chaine 1 et chaine 2 sont égales."
elif ( test $ch1 = $ch3 )
then
    echo "chaine 1 et chaine 3 sont égales."
elif ( test $ch2 = $ch3 )
then
    echo "chaine 2 et chaine 3 sont égales."
else
    echo "toutes les chaines sont différentes."
fi
```

</details>

## Exercice 12

Écrire un script Shell qui permet de donner la date du lendemain. Les arguments sont : `jj mm aa`.

<details>
<summary>Correction</summary>

```bash
if [ $# -eq 3 ]
then
    a=$3; m=$2; j=$1

    # Mois de 31 jours
    if [ $2 -eq 1 -o $2 -eq 3 -o $2 -eq 5 -o $2 -eq 7 -o $2 -eq 8 -o $2 -eq 10 ]
    then
        if [ $1 -eq 31 ]; then j=1; m=`expr $m + 1`; else j=`expr $j + 1`; fi
    # Mois de 30 jours
    elif [ $2 -eq 4 -o $2 -eq 6 -o $2 -eq 9 ]
    then
        if [ $1 -eq 30 ]; then j=1; m=`expr $m + 1`; else j=`expr $j + 1`; fi
    # Décembre
    elif [ $2 -eq 12 ]
    then
        if [ $1 -eq 31 ]; then j=1; m=1; a=`expr $a + 1`; else j=`expr $j + 1`; fi
    # Février
    elif [ $2 -eq 2 ]
    then
        if [ $1 -eq 28 ]
        then
            k=`expr $3 % 4`
            if [ $k -eq 0 ]; then j=`expr $j + 1`; else j=1; m=`expr $m + 1`; fi
        elif [ $1 -eq 29 ]
        then
            j=1; m=`expr $m + 1`
        else
            j=`expr $j + 1`
        fi
    fi

    echo "La date du lendemain est : $j $m $a"
else
    echo " le nombre de paramètres est incorrect."
fi
```

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<p><strong>Sujet</strong></p>
<PdfViewer file="/pdfs/se-tp2-environnement-unix.pdf" />

<p><strong>Correction</strong></p>
<PdfViewer file="/pdfs/se-tp2-environnement-unix-correction.pdf" />

</TabItem>
</Tabs>
