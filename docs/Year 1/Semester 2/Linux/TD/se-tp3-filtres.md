---
sidebar_position: 3
title: TP3 - Les filtres avec correction
sidebar_label: TP3 - Les filtres
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TP 3 — Les filtres

*ENSI-II2 — Environnement Unix — H. Idoudi*

## Exercice 1

Essayer et expliquer les commandes suivantes :

```bash
ls -l | grep '^……..rw'
ls -l | grep '^d'
grep '^[^:]*::' /etc/passwd
```

<details>
<summary>Correction</summary>

- `ls -l | grep '^……..rw'` : imprime les fichiers qui peuvent être lus ou écrits par tous les utilisateurs (permissions "autres" contenant `rw`).
- `ls -l | grep '^d'` : imprime les lignes décrivant un répertoire.
- `grep '^[^:]*::' /etc/passwd` : trouve les utilisateurs qui n'ont pas de mot de passe (2ᵉ champ vide).

</details>

## Exercice 2

Écrire un programme Shell permettant de calculer le nombre d'apparitions de chaque mot d'un fichier donné en argument.

<details>
<summary>Correction</summary>

```bash
if test $# -eq 1
then
    if test -f $1
    then
        tr -s ' ' '\012' < $1 > fic
        for i in `cat $1`
        do
            x=`grep -w $i fic | wc -l`
            echo $i "existe" $x "fois" >> result
        done
        sort -u result
        rm result
    else
        echo "$1 n est pas un fichier"
    fi
else
    echo "nombre d'arguments invalide "
fi
```

</details>

## Exercice 3

Écrire un script Shell qui permet d'afficher les fichiers d'un répertoire qui sont plus récents qu'un fichier donné en argument.

<details>
<summary>Correction</summary>

```bash
find $1 -newer $2 -type f > hh 2>/dev/null
if [ -s hh ]
then
    cat hh
else
    echo "non "
fi
```

</details>

## Exercice 4

Écrire un script Shell qui permet de construire un vérificateur d'orthographe utilisant un dictionnaire se trouvant dans un fichier.

<details>
<summary>Correction</summary>

```bash
if test $# -eq 1
then
    if test -f $1
    then
        for i in `cat $1`
        do
            x=`grep -w $i $2 | wc -l`
            if test $x -eq 0
            then
                echo "le mot $i ne figure pas ds le dictionnaire !"
            fi
        done
    else
        echo "$1 n est pas un fichier"
    fi
else
    echo "nombre d'arguments invalide "
fi
```

</details>

## Exercice 5

Écrire un script Shell qui permet d'afficher la nième ligne d'un fichier.

<details>
<summary>Correction</summary>

```bash
if [ $# -ne 2 ]
then
    echo "nombre d'arguments invalide "
else
    if test ! -f $1
    then
        echo "Erreur : le fichier $1 n existe pas"
    else
        head -$2 $1 | tail -1
    fi
fi
```

</details>

## Exercice 6

Écrire un script Shell qui permet de rechercher tous les mots qui contiennent au moins trois lettres majuscules successives.

<details>
<summary>Correction</summary>

```bash
tr -s ' ' '\012' < $1 | grep '[A-Z][A-Z][A-Z]'
```

</details>

## Exercice 7

Écrire un script Shell qui permet d'afficher la date en anglais sous la forme : `Sep the 20th 2004`.

<details>
<summary>Correction</summary>

```bash
# on suppose que la commande date donne un affichage en français de la forme :
# nom_jour num_jour mois année
jour=`date | cut -f2 -d" "`
mois=`date | cut -f3 -d" "`
an=`date | cut -f4 -d" "`
case $mois in
    "janvier") mois="Jan";;
    "décembre") mois="Dec";;
    # ... autres mois ...
esac
echo $mois the $jour"th" $an
```

</details>

## Exercice 8

Écrire une commande qui permet de chercher les lignes qui commencent et se terminent par le même caractère.

<details>
<summary>Correction</summary>

```bash
grep '^\(.\) .* \1$' f1
```

</details>

## Exercice 9

Écrire une commande qui permet de chercher les lignes qui commencent et se terminent par le même mot.

<details>
<summary>Correction</summary>

```bash
grep '^\([^" "]*\) .* \1$' f1
```

</details>

## Exercice 10

Utiliser la commande `find` pour supprimer, dans le sous-arbre commençant au répertoire de travail, tous les fichiers `core` ou se terminant par `.o`, dont la taille est supérieure à deux blocs.

<details>
<summary>Correction</summary>

```bash
find . \( -name core -o -name "*.o" \) -size +2 -exec rm {} \;
```

</details>

## Exercice 11

Utiliser `grep` pour chercher tous les mots palindromes (mots qui se lisent de la même façon de gauche à droite ou à l'envers) d'un fichier donné en argument.

<details>
<summary>Correction (méthode 1)</summary>

```bash
#!/bin/bash
if test $# -eq 1
then
    if test -f $1
    then
        for i in `cat $1`
        do
            l=`echo $i | wc -c | cut -d' ' -f1`
            j=`expr $l - 1`
            inverse=""
            while [ $j -ge 1 ]
            do
                x=`echo $i | cut -c $j`
                inverse=$inverse$x
                j=`expr $j - 1`
            done
            if [ $i = $inverse ]
            then
                echo $i est palindrome
            fi
        done
    else
        echo "$1 n est pas un fichier"
    fi
else
    echo "nombre d'arguments invalide "
fi
```

Méthode alternative (arrête dès qu'une paire de caractères diffère) :
```bash
for j in `cat $1`
do
    l=`echo $j | wc -c | cut -d' ' -f1`
    m=`expr $l / 2`
    i=1
    while [ $i -le $m ]
    do
        nb=`expr $l - $i`
        chaine=`echo $j | cut -c $i-$nb`
        x=`echo $chaine | grep '^\(.\).*\1$' | wc -l`
        if [ $x -eq 0 ]
        then
            echo $j non palindrome
            break
        fi
        i=`expr $i + 1`
    done
    if [ $i -gt $m ]
    then
        echo $j palindrome
    fi
done
```

</details>

## Exercice 12

Comment chercher tous les fichiers dont les noms commencent par un « a » majuscule ou minuscule, suivi éventuellement de quelques lettres ou chiffres, et se terminent par un chiffre entre 3 et 6 ?

<details>
<summary>Correction</summary>

`-name` permet de spécifier le nom recherché avec les expressions régulières du shell (pas celles de `grep`) : `*` = un ou plusieurs caractères, `?` = un caractère quelconque, `[...]` = un caractère au choix parmi une série.

```bash
find . -name '[aA]*[3-6]' -print
```

</details>

## Exercices 13 à 16

Comment indiquer qu'un fichier a été modifié il y a plus de / exactement / moins de 30 jours ? Plus récemment qu'un autre fichier donné ? Que le fichier recherché est un répertoire ? Qu'il a une taille supérieure à une taille donnée ? *(voir cours — options `-mtime`, `-newer`, `-type d`, `-size` de `find`)*

</TabItem>
<TabItem value="pdf" label="PDF">

<p><strong>Sujet</strong></p>
<PdfViewer file="/pdfs/se-tp3-filtres.pdf" />

<p><strong>Correction</strong></p>
<PdfViewer file="/pdfs/se-tp3-filtres-correction.pdf" />

</TabItem>
</Tabs>
