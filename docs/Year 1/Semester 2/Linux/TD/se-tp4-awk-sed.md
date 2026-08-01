---
sidebar_position: 4
title: TP4 - AWK et SED avec correction
sidebar_label: TP4 - AWK & SED
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TP 4 — AWK et SED

*ENSI-II2 — Environnement Unix — H. Idoudi*

## Partie I : AWK

### Exercice 1

En utilisant `awk`, écrire des commandes ou des scripts réalisant les traitements suivants :

1. Afficher la nième ligne d'un fichier.
2. Compter le nombre de mots d'un fichier.
3. Afficher les lignes de plus de 80 caractères.
4. Afficher les lignes qui contiennent exactement deux champs.
5. Afficher la liste des champs de chaque ligne dans un ordre inversé.
6. Compter le nombre de lignes qui contiennent la chaîne `"l2ti"`.
7. Afficher toutes les lignes dont le premier champ est différent de celui de la ligne précédente.

<details>
<summary>Correction</summary>

Application directe du cours, les solutions se trouvent toutes dans `man awk`.

</details>

### Exercice 2

Écrire un script qui permet d'afficher tous les mots qui contiennent trois lettres majuscules adjacentes ou plus.

<details>
<summary>Correction</summary>

```bash
if test $# -eq 1
then
    for i in `cat $1`
    do
        echo $i > fd
        sed '/[A-Z][A-Z][A-Z][A-Z]*/ w fgggg' fd > fdq
        cat fgggg
    done
else
    echo appel incorect
fi
```

</details>

### Exercice 3

Écrire un script qui utilise `awk` pour afficher tous les fichiers qui sont accédés uniquement en lecture par les autres utilisateurs.

<details>
<summary>Correction</summary>

```bash
ls -l | awk '$1 ~ /^.......r--$/ {print $3}'
```

</details>

### Exercice 4

Écrire un script qui utilise `awk` pour afficher les dates de connexion des utilisateurs qui sont propriétaires de fichiers portant la permission de lecture pour les autres utilisateurs.

<details>
<summary>Correction</summary>

```bash
ls -lR | awk '$1 ~ /^.......r--/ {print $2}' > f1
for i in `cat f1`
do
    who | awk -v u="$i" '{if ($1==u) print $5}'
done
```

</details>

### Exercice 5

Écrire une commande permettant d'afficher toutes les lignes dont le premier champ est différent de celui de la ligne précédente.

### Exercice 6

Écrire un script `awk` simulant la commande `uniq`, en éliminant les lignes redondantes et vides d'un fichier.

<details>
<summary>Correction</summary>

```awk
awk 'BEGIN {var=""}
{
    if ($0 != var && NF != 0)
        print($0)
    var = $0
}' $1
```

</details>

### Exercice 7

Écrire un programme `awk` qui vérifie que tous les enregistrements (lignes) du fichier donné en argument ont le même nombre de champs que le premier enregistrement. Le fichier utilise le séparateur de champs `:`. Le script doit afficher, pour chaque ligne erronée, son nombre de champs, puis à la fin afficher le nombre total d'enregistrements et le nombre d'enregistrements erronés.

**Exemple d'exécution :**

```bash
$cat test
nom:prenom:ville:telephone:fax
berger:jaques:paris:0639442212:0122339845
ben said:hamadi :71221993::
durond:marcel:marseille

$awk -f count.awk test
Chaque enregistrement doit comporter 5 champs
Enregistrement 4 a 3 champs
Le fichier test possède 4 enregistrements
Le fichier test comporte 1 enregistrement(s) erroné(s)

$awk -f count.awk /etc/passwd
Chaque enregistrement doit comporter 7 champs
Le fichier /etc/passwd possède 45 enregistrements
Tous les enregistrements sont corrects.
```

## Partie II : SED

Donner des commandes permettant de réaliser les traitements suivants :

1. Afficher des lignes contenant trois majuscules successives.
2. Remplacer les mots `Computer` ou `comuter` par `COMPUTER`.
3. Encadrer le premier nombre de chaque ligne avec des `**`.
4. Afficher un fichier à partir de la onzième ligne.
5. Imprimer les lignes commençant par le mot `From`.
6. Supprimer les lignes contenant une chaîne donnée.
7. Supprimer les lignes ne contenant pas une chaîne donnée.
8. Tester les commandes suivantes et noter leurs significations :
   - `sed "s/toto/TOTO/" fichier`
   - `sed "s/toto/TOTO/3" fichier`
   - `sed "s/toto/TOTO/g" fichier`
   - `sed "s/toto/TOTO/w resultat" fichier`
9. Inverser l'ordre de la première et la deuxième colonne d'un fichier.
10. Entourer chaque nombre contenu dans un fichier par deux `a`.
11. N'afficher que les lignes contenant le nombre `55` d'un fichier donné.

<details>
<summary>Correction</summary>

1. ```bash
   sed -n '/[A-Z][A-Z][A-Z][A-Z]*/p' fichier
   ```
2. ```bash
   sed 's/[Cc]omputer/COMPUTER/g' fichier
   ```
3. ```bash
   sed -e 's/\([0-9][0-9]*\)/**\1**/' fichier
   ```
4. ```bash
   sed '1,10d' fichier
   ```
5. ```bash
   sed '/^From/!d' fichier
   ```
6. ```bash
   sed '/toto/d' fichier
   ```
7. ```bash
   sed '/toto/!d' fichier
   ```
8. - `sed "s/toto/TOTO/" fichier` : change la **première** occurrence de `toto` par `TOTO`, sur chaque ligne.
   - `sed "s/toto/TOTO/3" fichier` : change la **troisième** occurrence de `toto` par `TOTO`, sur chaque ligne.
   - `sed "s/toto/TOTO/g" fichier` : change **toutes** les occurrences de `toto` par `TOTO`.
   - `sed "s/toto/TOTO/w resultat" fichier` : en cas de substitution, la ligne changée est aussi écrite dans le fichier `resultat`.
9. ```bash
   sed -e 's/^\([A-Z][A-Za-z]*\), \([A-Z][A-Za-z]*\)/\2 \1/' fichier
   ```
10. ```bash
    sed -e 's/\([0-9][0-9]*\)/aa\1aa/' fichier
    ```
11. ```bash
    sed -n '/55/p' fichier
    ```

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<p><strong>Sujet</strong></p>
<PdfViewer file="/pdfs/se-tp4-awk-sed.pdf" />

<p><strong>Correction</strong></p>
<PdfViewer file="/pdfs/se-tp4-awk-sed-correction.pdf" />

</TabItem>
</Tabs>
