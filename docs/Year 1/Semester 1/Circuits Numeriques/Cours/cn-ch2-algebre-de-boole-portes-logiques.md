---
sidebar_position: 1
title: "Chapitre 2 : Algèbre de Boole et fonctions Logiques"
sidebar_label: Ch2 - Algèbre de Boole et portes logiques
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 2 : Algèbre de Boole et fonctions Logiques

*Module : Circuits Numériques et éléments d'architecture — Dr. Nizar Sghaier, ENSI, II1-2022*

## 1. Introduction

Inventée par le mathématicien Georges BOOLE (1815-1864), l'algèbre de BOOLE définit les règles de calcul pour les opérations possibles sur des nombres binaires (à 2 états).

Une variable BOOLEENNE ne peut prendre que 2 états : VRAI (TRUE) ou FAUX (FALSE).

On parle de logique booléenne (ou de logique binaire), lorsqu'on associe des valeurs numériques aux états :
- VRAI est équivalent à « 1 », qu'on appelle souvent : niveau 1.
- FAUX est équivalent à « 0 », qu'on appelle souvent : niveau 0.

Il n'existe que 3 opérations élémentaires dans la logique booléenne :
- opération NON (NOT) : cette opération revient à fournir le complément de la valeur d'entrée (on parle également d'inversion)

$$\text{Si } A = 1 \text{ alors } S = 0 \qquad \text{Si } A = 0 \text{ alors } S = 1$$

## 2. Opérateurs logiques

### Opération OU (OR)

Opération OU (OR) : cette opération revient à fournir la somme logique des valeurs d'entrée (on parle également d'union) :

$$S = A + B \Rightarrow \text{on prononce : } S = A \text{ OU } B \text{ (et non pas : } S = A \text{ plus } B\text{)}$$

Définition : $S = 1$ si au moins une des entrées est égale à 1, sinon $S = 0$.

Correspondance électrique : mise en parallèle.

### Opération ET (AND)

Opération ET (AND) : cette opération revient à fournir le produit logique des valeurs d'entrée (on parle également d'intersection) :

$$S = A \cdot B \Rightarrow \text{on prononce : } S = A \text{ ET } B$$

Définition : $S = 1$ si toutes les entrées sont égales à 1, sinon $S = 0$.

Correspondance électrique : mise en série.

## 3. Lois et règles

Les opérations ET et OU sont **commutatives** :

$$A + B = B + A \qquad A \cdot B = B \cdot A$$

Les opérations ET et OU sont **associatives** :

$$A + (B + C) = (A + B) + C \qquad A \cdot (B \cdot C) = (A \cdot B) \cdot C$$

L'opération ET est **distributive** :

$$A \cdot (B + C) = (A \cdot B) + (A \cdot C)$$

L'opération OU est également **distributive** ! :

$$A + (B \cdot C) = (A + B) \cdot (A + C)$$

:::warning Attention
Comme vous le savez, la distributivité de la somme n'est vraie qu'en algèbre binaire !!!
:::

$$\bar{\bar{A}} = A \qquad A + A \cdot B = A \rightarrow \text{règle d'absorption}$$

Démonstration : en utilisant l'axiome : $A \cdot 1 = A$

$\Rightarrow A + A.B = (A.1) + (A.B) \Rightarrow$ on doit reconnaître la distributivité inverse du ET

$\Rightarrow (A.1) + (A.B) = A \cdot (1+B) = A$

$$A + \bar{A} \cdot B = A + B \rightarrow \text{règle d'absorption}$$

Démonstration : on doit reconnaître la distributivité du OU

$$A + \bar{A} \cdot B = (A + \bar{A}) \cdot (A + B) = 1 \cdot (A + B) = A + B$$

Montrer que : $(A + B) \cdot (A + C) = A + BC$

## 4. Théorème de DE MORGAN

$A$ et $B$ sont 2 variables binaires :

On a : $\overline{A \cdot B} = \bar{A} + \bar{B}$ ; « le complément du produit est égal à la somme des compléments »

On a : $\overline{A + B} = \bar{A} \cdot \bar{B}$ ; « le complément de la somme est égal au produit des compléments »

Application du théorème de DE MORGAN :

$$\overline{A.B} = \bar{A} + \bar{B}$$
$$\overline{A + \bar{B}} = \bar{A} \cdot B$$
$$A \cdot B = \overline{\overline{A \cdot B}} = \overline{\bar{A} + \bar{B}}$$
$$A + B = \overline{\overline{A + B}} = \overline{\bar{A} \cdot \bar{B}}$$

## 5. Les fonctions binaires élémentaires

### La table de vérité

La table de vérité répertorie toutes les valeurs que peut prendre la fonction, en fonction de toutes les combinaisons possibles des $N$ variables d'entrée.

### Table de vérité, à 1 et 2 variables

1 seule variable => 2 combinaisons => 2 lignes dans la table de vérité :

| A | S |
|---|---|
| 0 |   |
| 1 |   |

2 Variables => 4 combinaisons => 4 lignes dans la table de vérité :

| B | A | S |
|---|---|---|
| 0 | 0 |   |
| 0 | 1 |   |
| 1 | 0 |   |
| 1 | 1 |   |

### Table de vérité, à 3 et plus variables

3 Variables => 8 combinaisons => 8 lignes dans la table de vérité :

| C | B | A | S |
|---|---|---|---|
| 0 | 0 | 0 |   |
| 0 | 0 | 1 |   |
| 0 | 1 | 0 |   |
| 0 | 1 | 1 |   |
| 1 | 0 | 0 |   |
| 1 | 0 | 1 |   |
| 1 | 1 | 0 |   |
| 1 | 1 | 1 |   |

Généralisation : une fonction binaire à $N$ variables peut prendre $2^N$ valeurs distinctes (possibles) donc => $2^N$ lignes dans sa table de vérité.

### Comment construire une table de vérité ?

- On insère autant de colonnes que de variables d'entrée de la fonction.
- On insère autant de lignes que les $2^N$ combinaisons.
- On implémente les variables dans la table, en commençant par la colonne de droite.
- On commence par la combinaison : « tout à 0 », sur la 1ère ligne.

### Fonction : NON (NOT)

Désignation : $S = \bar{A}$, on prononce $S = A$ bar.

Définition : réalise le complément logique de l'entrée (on parle également d'inversion logique).

Table de vérité (1 variable => 2 lignes) :

| A | S |
|---|---|
| 0 | 1 |
| 1 | 0 |

<LogicGateSimulator gate="NOT" />

### Fonction : ET (AND)

Désignation : $S = A.B$, on prononce $S = A$ ET $B$.

Définition : vrai si toutes les entrées sont vraies, sinon : faux.

Table de vérité :

| B | A | S |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

<LogicGateSimulator gate="AND" />

### Fonction : OU (OR)

Désignation : $S = A + B$, on prononce $S = A$ OU $B$.

Définition : vrai si au moins une des entrées est vraie, sinon : faux.

Table de vérité :

| B | A | S |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

<LogicGateSimulator gate="OR" />

### Fonction : NON ET (NAND)

Désignation : $S = \overline{A \cdot B}$, on prononce $S = (A \text{ ET } B)$ bar.

Table de vérité :

| B | A | S |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

<LogicGateSimulator gate="NAND" />

### Fonction : NON OU (NOR)

Désignation : $S = \overline{A + B}$, on prononce $S = (A \text{ OU } B)$ bar.

Table de vérité :

| B | A | S |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

<LogicGateSimulator gate="NOR" />

### Fonction OU Exclusif (XOR)

Désignation : $S = A \oplus B$, on prononce $S = (A \text{ xor } B)$.

Table de vérité — définition : VRAI si un nombre impair d'entrées VRAIE :

| B | A | S |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

$$S = A \oplus B = A \bar{B} + \bar{A} B$$

Application : la fonction est couramment utilisée pour connaître la parité de plusieurs variables binaires.

<LogicGateSimulator gate="XOR" />

### Fonction NON OU Exclusif (XNOR)

Désignation : $S = \overline{A \oplus B}$, on prononce $S = (A \text{ xor } B)$ bar.

Table de vérité — définition : VRAI si un nombre pair d'entrées VRAIE :

| B | A | S |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

<!-- TODO: unclear in source, verify against original PDF page 20 — the boxed formula on this slide is partially garbled in extraction (reads "S = A B + A B"); it should be the XNOR complement of the XOR formula above, i.e. S = A.B + Ā.B̄, but this has not been visually confirmed character-by-character against the source image. -->

### Fonctions complémentées

Toutes les fonctions logiques (ou binaires) peuvent s'exprimer à partir des fonctions élémentaires : NON, ET et OU.

En technologie CMOS il est plus facile de réaliser les fonctions complémentées (NAND et NOR).

À partir de ces fonctions élémentaires, on peut re-construire toutes les autres => en CMOS les portes NAND et NOR (surtout les NAND) sont des portes universelles.

**Fonctions à partir de NAND :**

$$\text{NON : } \bar{A} = \overline{A \cdot A}$$
$$\text{ET : } A.B = \overline{\overline{A.B}}$$
$$\text{OU : } A + B = \overline{\bar{A}.\bar{B}}$$

**Fonctions à partir de NOR :**

$$\text{NON : } \bar{A} = \overline{A + A}$$
$$\text{OU : } A + B = \overline{\overline{A+B}}$$
$$\text{ET : } A.B = \overline{\bar{A}+\bar{B}}$$

### Équivalence des expressions et des représentations graphiques

Toutes les fonctions booléennes peuvent se représenter graphiquement en utilisant les symboles standards. Tout schéma avec des portes logiques peut s'écrire sous la forme d'une fonction logique.

Exemple : $S = A.B + A.C + D.E$ — les deux représentations (schéma et expression) sont équivalentes.

### Symboles généraux

Remarque : on peut trouver, dans certains cas, des symboles plus généraux, par exemple une porte à 3 entrées $A$, $B$, $C$ réalisant directement $S = A.B.C$, permettant une représentation graphique plus compacte.

## 6. Représentation d'une fonction logique

### Formes d'écriture

Il existe 2 façons différentes d'écrire une fonction booléenne :
- Sous forme de somme de produits (SDP)
- Sous forme de produit de sommes (PDS)

Ces 2 formes d'expression sont duales.

Exemple :

$$f(A,B,C) = \bar{A}.\bar{B}.\bar{C} + A.\bar{B}.C + \bar{B}.C \qquad \Rightarrow \text{Somme de produits}$$
$$f(A,B,C) = (\bar{A}+\bar{B}+\bar{C}).(A+B+C).(\bar{A}+C) \qquad \Rightarrow \text{Produit de sommes}$$

<!-- TODO: unclear in source, verify against original PDF page 25 — pdftotext dropped the overline placement on this example's exact terms; the terms shown above follow the layout as extracted but individual bar placements should be double-checked against the slide image. -->

### Lecture : SDP ou PDS

Lors de la construction d'un système numérique, on se donne généralement la table de vérité de la fonction à réaliser :

| C | B | A | f |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 0 |

À partir de la table de vérité, on peut extraire directement l'expression de la fonction sous forme d'une somme de produits ou d'un produit de sommes.

### Lecture SDP

$$f_{sdp} = \bar{C}.B.\bar{A} + C.\bar{B}.\bar{A} + C.\bar{B}.A + C.B.\bar{A}$$

C'est une somme de produits standards car chaque terme contient toutes les variables du domaine de définition de la fonction : ce sont des **mintermes**.

Le principe de lecture sous forme d'une somme de produits (sdp) est d'énumérer les combinaisons d'entrée qui rendent la fonction VRAIE. Dans une somme, si l'un des termes est VRAI alors la somme est VRAIE.

### Lecture PDS

Puisqu'il existe une relation de dualité entre les sommes et les produits (DE MORGAN), on peut exprimer aussi la fonction sous la forme d'un produit de sommes : on énumère les combinaisons d'entrée qui rendent la fonction FAUSSE, en complémentant les variables.

$$f_{pds} = (C+B+A).(C+\bar{B}+A).(\bar{C}+B+A).(\bar{C}+\bar{B}+\bar{A})$$

C'est un produit de sommes standards car chaque terme contient toutes les variables du domaine de définition de la fonction, ce sont des **maxtermes**.

### SDP ⇔ PDS

Les deux formes d'expression sont strictement équivalentes, on peut passer de l'une à l'autre par l'application du théorème de DE MORGAN. Toutefois, le nombre de termes peut être différent... ; c'est le principe de la simplification des fonctions logiques.

Exemple :

| B | A | f |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

Lecture sdp : $f_{sdp} = \bar{B}.\bar{A} + B.A$

Lecture pds : $f_{pds} = (\bar{B}+\bar{A}).(B+A)$

Remarque : on se doit de reconnaître la fonction : XNOR.

Démonstration de l'équivalence :

$$f_{pds} = (\bar{B}+\bar{A}).(B+A) = \bar{B}.B + \bar{B}.A + \bar{A}.B + \bar{A}.A = \bar{B}.A + \bar{A}.B$$

<!-- TODO: unclear in source, verify against original PDF page 29 — the final line of this demonstration ("On obtient bien : fpds = fsdp => CQFD") implies a further simplification step back to fsdp's exact term form that isn't fully legible in pdftotext's extraction; transcribed as far as the extraction allows. -->

### Représentation du XOR

$$f_{sdp} = \bar{B}.A + B.\bar{A} \qquad \text{Schéma à 5 portes}$$
$$f_{pds} = (\bar{B}+\bar{A}).(B+A) \qquad \text{Schéma à 5 portes}$$

Les 2 formes sont équivalentes et minimales.

### De Fsdp (ou Fpds) à la table de vérité

On peut également passer d'une somme de produits (ou d'un produit de sommes) à une table de vérité :

Exemple : $f = \bar{A}.B + A.C$. Le domaine de définition est $\{A,B,C\}$ => il faut transformer l'expression pour n'utiliser que des mintermes :

$$f = \bar{A}.B.\bar{C} + \bar{A}.B.C + A.C.\bar{B} + A.C.B$$

| C | B | A | f |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 0 |

## 7. Simplification des expressions logiques

### Simplification

La simplification de l'écriture d'une fonction logique permet de la « réaliser » en utilisant plus ou moins de portes élémentaires (ET, OU, NON, etc.).

Moins de portes : moins de fils, moins de transistors, moins de courant, moins de consommation, moins de surface, plus rapide.

Donc ASSURÉMENT GAGNANT !!!

Il est donc important de réduire, simplifier, les fonctions logiques. La simplification d'une fonction consiste à réduire le nombre de termes ou, d'une façon générale, à réduire le nombre de variables dans les termes (maxtermes ou mintermes).

La simplification d'une fonction consiste à appliquer les règles de base de l'algèbre de boole et/ou le théorème de DE MORGAN.

### Simplification : exemple

| C | B | A | f |
|---|---|---|---|
| 0 | 0 | 0 | 1 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 |

$$f_{sdp} = \bar{A}.\bar{B}.\bar{C} + \bar{A}.B.\bar{C} + \bar{A}.B.C + A.B.\bar{C} + A.B.C$$

Or, $F_{sdp}$ peut se simplifier :

$$f_{sdp} = \bar{A}.\bar{B}.\bar{C} + \bar{A}.B.\bar{C} + \bar{A}.B.C + A.B.\bar{C} + A.B.C$$
$$f_{sdp} = \bar{A}.\bar{B}.\bar{C} + \bar{A}.B.(\bar{C}+C) + A.B.(\bar{C}+C)$$
$$f_{sdp} = \bar{A}.\bar{B}.\bar{C} + \bar{A}.B + A.B$$
$$f_{sdp} = \bar{A}.\bar{B}.\bar{C} + B.(\bar{A}+A)$$
$$f_{sdp} = \bar{A}.\bar{B}.\bar{C} + B$$
$$f_{sdp} = B + \bar{A}.\bar{C}$$

### Simplification difficile !

Malheureusement, appliquer les règles de l'algèbre de Boole sur des expressions très compliquées (plus de 4 ou 5 variables), peut devenir difficile, voire impossible, et on n'est pas sûr d'arriver toujours à la meilleure simplification.

Pour pallier ce problème on va utiliser la technique de réduction par les tableaux de KARNAUGH.

### Tableau de KARNAUGH

Dans une table de vérité, la simplification d'une fonction consiste à supprimer une variable (exp : $A.\bar{B} + A.B = A$).

Cela consiste donc à regrouper les « 1 » de la table 2 par 2 (suppression d'1 variable), 4 par 4 (suppression de 2 variables), 8 par 8, etc.

Pour faciliter ces regroupements, on utilise une représentation différente : les tableaux de KARNAUGH.

Le tableau de Karnaugh est une représentation (comme son nom l'indique), en 2 dimensions, c'est-à-dire en lignes / colonnes. On distribuera les variables sur les lignes et les colonnes, de façon à ce qu'il n'y ait qu'une seule variable qui change quand on passe d'une case du tableau à une des cases adjacentes.

### Construction tableau à 1, 2 et 3 variables

Tableau à 1 variable => 2 cases ; tableau à 2 variables => 4 cases ; tableau à 3 variables => 8 cases (représentations identiques, disposées en grille).

### Construction tableau : généralisation

Si une fonction est définie à l'aide de $N$ variables, la table de vérité comportera $2^N$ lignes, le tableau de Karnaugh correspondant comportera $2^N$ cases.

### Exemple tableau de Karnaugh

Soit la fonction :

$$f_{sdp} = \bar{A}.\bar{B}.\bar{C} + \bar{A}.B.\bar{C} + A.\bar{B}.\bar{C} + A.B.\bar{C} + A.B.C$$

|      | A=0 | A=1 |
|------|-----|-----|
| C=0, B=0 | 1 | 1 |
| C=0, B=1 | 1 | 1 |
| C=1, B=0 | 0 | 0 |
| C=1, B=1 | 0 | 1 |

<!-- TODO: unclear in source, verify against original PDF page 38 — pdftotext's extraction of this specific 2x4 grid layout is ambiguous about which row is C=0 vs C=1; transcribed the grid values in the order they appeared, following through to the stated result below. -->

$$f_{sdp} = \bar{C} + A.B$$

On remplit le tableau de Karnaugh avec les « 1 » de la fonction et on le complète avec des « 0 ». On peut voir sur cet exemple que l'on peut faire un groupement de 4 cases adjacentes => cela nous amènera à supprimer 2 variables dans l'expression de la fonction.

### Groupements dans un tableau de Karnaugh

Nous l'avons déjà dit : la simplification revient à supprimer un maximum de variables dans l'expression de la fonction, c'est pour cela (faire des groupements) que le tableau de Karnaugh est très utile :

- un groupement de 2 cases revient à supprimer 1 variable,
- un groupement de 4 cases revient à supprimer 2 variables,
- un groupement de 8 cases revient à supprimer 3 variables,
- un groupement de 16 cases revient à supprimer 4 variables,
- un groupement de $2^K$ cases revient à supprimer $K$ variables.

Si une fonction est définie avec $N$ variables, et que l'on fait un groupement de $2^K$ cases, alors la simplification fera que la fonction s'exprimera en fonction de $N-K$ variables.

Vous l'aurez compris, simplifier au maximum revient à chercher à faire des groupements de taille maximale.

### Groupements dans un tableau de Karnaugh (suite)

- Les groupements se font obligatoirement avec des cases adjacentes, donc pas en diagonale.
- La taille des groupements est en puissance de 2 (1 variable binaire = 2 états).
- Pour faire tous les groupements possibles dans le tableau de Karnaugh, il faut considérer le tableau qui se replie sur lui-même, en horizontal comme en vertical — il faut systématiquement penser à ces 2 symétries cylindriques, on peut même parler, en généralisant, de symétrie sphérique.

**Récapitulatif :** dans l'objectif d'arriver à la simplification optimale (la meilleure), il faut suivre la règle suivante : **faire un nombre minimal de groupements de taille maximale.**

### Exemple de groupements

Soit la fonction $f$, définie à partir de 3 variables ($A$, $B$ et $C$) :

$$f_{sdp} = \bar{A}.\bar{B}.\bar{C} + \bar{A}.B.\bar{C} + A.B.\bar{C} + A.B.C + A.\bar{B}.\bar{C}$$

Dans ce cas la taille maximale est : 4 cases => expression du groupement en fonction de 1 variable (rappelez-vous du : $N-K$). Pour lire un groupement (donner son expression) : on liste les variables qui ne changent pas d'état dans le groupement => ici c'est la variable $B$, qui ne change pas dans le groupement => $gr(4) = B$.

Il reste des « 1 » (et tant que) il faut à nouveau chercher à faire un groupement de taille maximale => 4 cases : NON => 2 cases : OUI (grâce à la symétrie horizontale) => 1 groupement de 2 cases => expression en fonction de 2 variables (toujours le $N-K$) => $gr(2) = A.\bar{C}$.

Au final : $F = B + A.\bar{C}$.

### Exemple (suite) — grouper les « 0 »

Une autre idée : grouper les « 0 » => cela revient à exprimer le complément de la fonction.

$$Gr(2)_1 = A.B \qquad Gr(2)_2 = \bar{B}.\bar{C}$$

D'où l'expression de : $\bar{f} = \bar{B} + A.B.C$

<!-- TODO: unclear in source, verify against original PDF page 42 — extraction of this line is garbled ("f  B  A  B  C"); reconstructed from the surrounding demonstration below, but the exact original notation of this specific intermediate line should be checked against the slide image. -->

Donc : $f = \overline{\bar{B} + A.B.C} = B.\overline{A.B.C} = B.(\bar{A}+\bar{B}+\bar{C}) = B.\bar{A} + B.\bar{C} \; (B.\bar{B}=0)$

$$f = \bar{A}.C + B.\bar{C}$$

On trouve bien évidemment le même résultat, ce qui montre que cette idée peut se révéler efficace dans certains cas, avec peu de « 0 ».

### Exemple (suite) — retrouver la Fpds

On peut aussi retrouver avec les regroupements de « 0 » la $F_{pds}$ :

$$Gr(2)_1 = A.B \qquad Gr(2)_2 = C.\bar{B}$$

$$f_{pds} = (\bar{A}+\bar{B}).(\bar{C}+B) = \bar{A}.\bar{C} + \bar{A}.B + \bar{B}.\bar{C}$$

### Autre exemple

Pas de groupement possible pour une case isolée => cette case s'exprime en fonction de toutes les variables : $Gr(1) = \bar{A}.B.C$.

$$Gr(2)_1 = B.\bar{C} \qquad Gr(2)_2 = A.\bar{B}$$

$$f = A.\bar{B} + B.\bar{C} + \bar{A}.B.C$$

### Chevauchement des groupements

Les groupements peuvent se chevaucher. Dans cet exemple à 4 variables ($A,B,C,D$), un groupement de 4 cases se chevauche avec un groupement de 2 cases.

Nous pouvons donc exprimer la fonction $f$ :

$$f = A.\bar{C} + \bar{A}.C + A.\bar{B}.D$$

<!-- TODO: unclear in source, verify against original PDF page 45 — pdftotext's extraction of this 4-variable expression is ambiguous about bar placement ("f  AC  AC  A B  D"); transcribed with the most plausible bar placement consistent with the stated "chevauchement" example, but not visually confirmed term-by-term. -->

### Cas indéterminés

Lorsque certaines combinaisons sont indifférentes, ou lorsque ces cas ne peuvent se produire, les valeurs correspondantes de la fonction sont ni « 0 », ni « 1 », elles sont notées : **X**.

| C | B | A | f |
|---|---|---|---|
| 0 | 0 | 0 | 1 |
| 0 | 0 | 1 | X |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | X |

$$f = B + \bar{C}$$

Remarque : les valeurs indifférentes peuvent être considérées comme des « 0 » ou des « 1 » (mais pas les 2 !!!), selon les possibilités de groupements (le plus grand possible). Dès lors qu'une valeur X aura été utilisée dans un groupement (de « 1 » pour une $F_{sdp}$, de « 0 » pour une $F_{pds}$), alors la valeur X est définitivement transformée dans tout le tableau.

### Fonction à plusieurs variables (plusieurs sorties)

Lorsque le cahier des charges (besoin du client !) donne un système contenant plusieurs sorties, définies avec les mêmes entrées, alors on ajoute autant de colonnes à droite que de variables de sorties supplémentaires à la table de vérité, et on créera autant de tableaux de Karnaugh que de variables de sortie.

| C | B | A | S1 | S2 |
|---|---|---|----|----|
| 0 | 0 | 0 | 0  | 0  |
| 0 | 0 | 1 | 0  | 0  |
| 0 | 1 | 0 | 1  | 1  |
| 0 | 1 | 1 | 1  | 1  |
| 1 | 0 | 0 | 1  | 1  |
| 1 | 0 | 1 | 1  | 1  |
| 1 | 1 | 0 | 0  | 0  |
| 1 | 1 | 1 | 0  | 1  |

$$S_1 = \bar{B}.C + B.\bar{C}$$

Dans cet exemple il y avait une autre possibilité de groupements pour $S_2$ :

$$S_2 = \bar{B}.C + A.\bar{C}$$

## 8. Exercices & Corrections

### Exercice 1

1. Simplifier les expressions suivantes :

$$S_1 = (A+B).(\bar{A}+\bar{B}) \qquad S_4 = (A+C+D).(B+C+D)$$
$$S_2 = A.B + \bar{A}.\bar{B} + \bar{A}.B \qquad S_5 = (A.\bar{B}+A.B+A.C)(\bar{A}.\bar{B}+A.B+A.\bar{C})$$
$$S_3 = (A+\bar{B}).(A+B) + C.(\bar{A}+B) \qquad S_6 = (A+\bar{B}+C).(A+\bar{C}).(\bar{A}+\bar{B})$$

2. Calculer les compléments de $S_1$, $S_5$ et $S_6$ et les simplifier.
3. Donner les équations des fonctions $S_1$, $S_5$ et $S_6$ en n'utilisant que des portes NAND à 2 entrées puis en n'utilisant que des portes NOR à 2 entrées. Tracer les logigrammes de $S_1$, $S_5$ et $S_6$, et préciser le nombre de portes nécessaires dans chaque cas et en déduire la meilleure solution.

<details>
<summary>Correction Exercice 1</summary>

**1)**
$$S_1 = A.\bar{B} + \bar{A}.B = A \oplus B \qquad S_2 = \bar{A} + B \qquad S_3 = A + C$$
$$S_4 = A.B + C + D \qquad S_5 = A(B+\bar{C}) \qquad S_6 = \bar{B}(A+\bar{C})$$

**2)**
$$\overline{S_1} = A.B + \bar{A}.\bar{B} = \overline{A \oplus B} \qquad \overline{S_5} = \bar{A} + \bar{B}.C \qquad \overline{S_6} = B + \bar{A}.C$$

**3)**
$$S_1 = \overline{\overline{A.\bar{B}}.\overline{\bar{A}.B}} = \overline{\bar{A}+\bar{B}} + \overline{A+\bar{B}} \qquad S_5 = A.\overline{B.C} = \overline{\bar{A}} + \overline{B+\bar{C}} \qquad S_6 = \overline{B.A.C} = \overline{\bar{B}} + \overline{\bar{A}+\bar{C}}$$

<!-- TODO: unclear in source, verify against original PDF page 51 — the NAND/NOR-only re-derivations for S1, S5, S6 shown on this slide use dense nested-bar notation that pdftotext extracted with ambiguous grouping; the boxed number-of-gates table below was extracted cleanly and is trustworthy, but the formula lines above should be re-checked against the slide image before being treated as exact. -->

Nombre de portes nécessaires :

| | NAND à 2 entrées | NOR à 2 entrées |
|---|---|---|
| S1 | 5 | 5 |
| S5 | 4 | 4 |
| S6 | 5 | 3 |

*(Logigrammes : voir schéma complet à la page 51 du PDF — circuit à 6 sorties avec portes NAND et NOR en cascade, trop dense pour une retranscription fidèle en dehors du PDF.)*

</details>

### Exercice 2

1. Simplifier algébriquement les expressions suivantes :

$$S_1 = A.B.C + A.\bar{B}.C + A.B.\bar{C}.D$$
$$S_2 = A + B.C + \bar{A}.(\bar{B}+\bar{C}).(A.D+C)$$
$$S_3 = (A+B+C).(A+B+\bar{C}).(\bar{A}+B+C).(\bar{A}+B+\bar{C})$$

2. Démontrer les égalités suivantes :

a) $A + \bar{A}.B = A + B$

b) $\overline{A.C + B.\bar{C}} = \bar{A}.C + \bar{B}.\bar{C}$

c) $\overline{(A+C).(B+\bar{C})} = (\bar{A}+C).(\bar{B}+\bar{C})$

d) $(A+B).(\bar{A}+C).(B+C) = (A+B).(\bar{A}+C)$

<details>
<summary>Correction Exercice 2</summary>

**1)** $S_1 = A(C+B.D) \qquad S_2 = A + C \qquad S_3 = B$

**2)**

a) $A + \bar{A}.B = A + B$ : dans la somme d'un terme et d'un multiple de son complément, on peut éliminer le complément.

Démonstration : $A + \bar{A}.B = A + A.B + \bar{A}.B = A + B.(A+\bar{A}) = A + B.1 = A + B$

*Remarque : cette formule est à retenir car elle n'est pas intuitive : en effet il faut d'abord compliquer la formule pour la simplifier ensuite.*

b) $\overline{A.C+B.\bar{C}} = \bar{A}.\bar{C} + \bar{A}.C.\bar{B} + \bar{A}.B.\bar{C} = \bar{A}.C + \bar{B}.\bar{C}(\bar{A}+A) = \bar{A}.C + \bar{B}.\bar{C}$

c) $\overline{(A+C).(B+\bar{C})} = \bar{A}.C + \bar{B}.C = \bar{A}.\bar{B} + \bar{A}.C + \bar{B}.C = \bar{A}.\bar{B}.\bar{C} + \bar{B}.C + \bar{A}.\bar{B}.C = \bar{A}.C + \bar{B}.C$

d) $(A+B).(\bar{A}+C).(B+C) = A.C + \bar{A}.B + B.C \qquad (A+B).(\bar{A}+C) = A.C + \bar{A}.B + B.C$

*(Logigramme de la question 3) de l'exercice 1 est illustré page 53 du PDF — schéma à 6 sorties, non retranscrit en SVG pour rester fidèle sans risque d'erreur de câblage ; voir l'onglet PDF.)*

</details>

### Exercice 3

Simplifier les expressions en utilisant les diagrammes de Karnaugh :

a) $X = \overline{\bar{A}.\bar{B}.\bar{C}} + \overline{\bar{A}.B.C} + \overline{A.\bar{B}.\bar{C}} + A.B.C + A.\bar{B}.C$

b) $Y = \overline{(C+D)} + \bar{A}.C.\bar{D} + \bar{A}.\bar{B}.\bar{C} + \bar{A}.\bar{B}.C.D + A.C.\bar{D}$

c) $Z = \bar{A}.\bar{B}.\bar{C}.\bar{D} + \bar{A}.B.\bar{C}.D + \bar{A}.B.C.\bar{D} + \bar{A}.B.C.D + A.B.C.\bar{D} + A.B.C.D$

<details>
<summary>Correction Exercice 3</summary>

a) $X = \bar{B}.\bar{C} + A.C + B.C$

b) $Y = \bar{D} + \bar{A}.\bar{B}.C + A.\bar{B}.\bar{C} = \bar{D} + \bar{B}(A \oplus C)$

c) $Z = A.C + \bar{A}.C.\bar{D}$

</details>

### Exercice 4

Soit la table de vérité suivante :

| a | b | c | d | f(a,b,c,d) |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 1 |
| 0 | 0 | 0 | 1 | 1 |
| 0 | 0 | 1 | 0 | 1 |
| 0 | 0 | 1 | 1 | 1 |
| 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 |
| 0 | 1 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 | 1 |
| 1 | 0 | 0 | 1 | 1 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 0 | 1 | 1 | 1 |
| 1 | 1 | 0 | 0 | 0 |
| 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 1 | 1 |

1. Proposer une expression booléenne (ayant pour table de vérité la table ci-contre) :
   a) sous la première forme canonique,
   b) sous la deuxième forme canonique.
2. Simplifier l'expression booléenne de la question 1.a) au moyen d'un tableau de Karnaugh.

<details>
<summary>Correction Exercice 4</summary>

a) $f = \bar{a}.\bar{b}.\bar{c}.\bar{d} + \bar{a}.\bar{b}.\bar{c}.d + \bar{a}.\bar{b}.c.\bar{d} + \bar{a}.\bar{b}.c.d + \bar{a}.b.\bar{c}.d + \bar{a}.b.c.d + a.\bar{b}.\bar{c}.\bar{d} + a.\bar{b}.\bar{c}.d + a.\bar{b}.c.\bar{d} + a.\bar{b}.c.d + a.b.c.d$

b) $f = (a+\bar{b}+c+d).(a+\bar{b}+\bar{c}+d).(\bar{a}+\bar{b}+c+d).(\bar{a}+\bar{b}+c+\bar{d}).(\bar{a}+\bar{b}+\bar{c}+d)$

2) $f = \bar{b} + \bar{a}.d + c.d$

</details>

### Exercice 5

Dans une usine de briques, on effectue un contrôle de qualité selon 4 critères : poids $P$, longueur $L$, largeur $l$ et hauteur $h$ (0 incorrect, 1 correct). Cela permet de classer les briques en trois catégories :

- Qualité A : le poids $P$ et deux dimensions au moins sont corrects.
- Qualité B : le poids seul est incorrect ou, le poids étant correct, deux dimensions au moins sont incorrectes.
- Qualité C : le poids $P$ est incorrect ainsi qu'une ou plusieurs dimensions.

1. Écrire les équations des fonctions A, B et C.
2. Simplifier ces fonctions.
3. Dessiner le logigramme à l'aide de 2 circuits intégrés contenant 5 NAND à 3 entrées et de 1 circuit intégré contenant 3 NOR à 2 entrées. On dispose des variables $P$, $L$, $l$, $h$ sous la forme directe seulement.

<details>
<summary>Correction Exercice 5</summary>

**1) Table de vérité :**

| P | L | l | h | A | B | C |
|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| 0 | 0 | 0 | 1 | 0 | 0 | 1 |
| 0 | 0 | 1 | 0 | 0 | 0 | 1 |
| 0 | 0 | 1 | 1 | 0 | 0 | 1 |
| 0 | 1 | 0 | 0 | 0 | 0 | 1 |
| 0 | 1 | 0 | 1 | 0 | 0 | 1 |
| 0 | 1 | 1 | 0 | 0 | 0 | 1 |
| 0 | 1 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 0 | 0 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 1 | 1 | 0 | 0 |
| 1 | 1 | 0 | 0 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 0 | 1 | 0 | 0 |
| 1 | 1 | 1 | 1 | 1 | 0 | 0 |

**2) Simplification (via tableaux de Karnaugh) :**

$$A = P.l.h + P.L.h + P.L.l$$
$$B = P.\bar{l}.\bar{h} + P.\bar{L}.\bar{l} + \bar{P}.L.l.h + \bar{P}.L.\bar{h} + A.C$$
$$C = \bar{P}.L + \bar{P}.l + \bar{P}.h$$

<!-- TODO: unclear in source, verify against original PDF page 60 — the K-map groupings and their derived expressions for A, B, C are reconstructed from pdftotext's layout extraction of dense embedded-image text (bar placement especially on B is uncertain); recommend re-checking each grouped term against the slide image before treating as final. -->

**3)** $A = P.l.h + P.L.h + P.L.l \qquad B = A \oplus C \qquad C = \bar{P}.L + \bar{P}.l + \bar{P}.h = \overline{P.(\overline{L.l.h})} = \overline{P.\overline{(L+l+h)}}$

*(Logigramme à 2×NAND-5×3-entrées + 1×NOR-3×2-entrées : voir page 61 du PDF.)*

</details>

### Exercice 6

On considère le circuit logique de la figure suivante (3 entrées $A$, $B$, $C$ ; NON, ET/OU en cascade produisant $S_1$, $S_2$, puis $S_3$, $S_4$) :

*(Voir le schéma exact page 62 du PDF — trois inverseurs sur A, B, C alimentant deux étages ET/OU produisant S1 et S2, puis un second étage combinant S1, S2 et C pour produire S3 et S4.)*

1. Donner les équations de $S_1$ et $S_2$ à partir du montage.
2. Déduire la table de vérité des fonctions $S_1$ et $S_2$ en fonction des entrées $A$ et $B$.
3. Donner les expressions de $S_3$ et $S_4$ en fonction de $S_1$, $S_2$, $C$, $A$ et $B$.
4. Déduire l'expression de $S_3$ et $S_4$ en fonction de $A$, $B$ et $C$.
5. Trouver l'expression de $S_3$ et $S_4$ à partir de la table de vérité.
6. Simplifier $S_3$ et $S_4$ au moyen du tableau de Karnaugh.

<details>
<summary>Correction Exercice 6</summary>

**1)** $S_1 = \bar{A}.B + A.\bar{B} \qquad S_2 = \bar{A}.\bar{B}$

**2)**

| A | B | S1 | S2 |
|---|---|----|----|
| 0 | 0 | 1  | 0  |
| 0 | 1 | 1  | 1  |
| 1 | 0 | 0  | 0  |
| 1 | 1 | 0  | 0  |

**3)** $S_3 = S_1 \oplus C \qquad S_4 = S_2.(A+B)$

**4)** $S_3 = S_1 \oplus C = S_1.\bar{C} + \bar{S_1}.C = \bar{A}.\bar{B}.C + A.B.C + \bar{A}.B.\bar{C} + A.\bar{B}.\bar{C} \qquad S_4 = S_2.(A+B) = \bar{A}.\bar{B}.(A+B) = \bar{A}.\bar{B}.A + \bar{A}.\bar{B}.B$

**5)**

| C | B | A | S3 | S4 |
|---|---|---|----|----|
| 0 | 0 | 0 | 1  | 0  |
| 0 | 0 | 1 | 0  | 1  |
| 0 | 1 | 0 | 1  | 1  |
| 0 | 1 | 1 | 0  | 1  |
| 1 | 0 | 0 | 1  | 0  |
| 1 | 0 | 1 | 0  | 0  |
| 1 | 1 | 0 | 1  | 1  |
| 1 | 1 | 1 | 0  | 0  |

**6)** $S_3 = \bar{C} \qquad S_4 = \bar{C}.A + \bar{C}.B + B.A$

</details>

### Exercice 7

En utilisant les tableaux de Karnaugh, simplifier les fonctions suivantes ($A$ : LSB) :

$$F_1 = \bar{A}.\bar{B}.\bar{C} + \bar{A}.B.\bar{C} + \bar{A}.B.C + A.B.\bar{C} + A.\bar{B}.\bar{C} + A.\bar{B}.C$$
$$F_{2(A,B,C,D)} = \sum m(0,1,2,3,9,10,11,13,15)$$
$$F_3 = (\bar{B}+A).(D+\bar{C}).(\bar{C}+\bar{B}+\bar{A}).(D+C+B+A)$$
$$F_{4(A,B,C,D)} = \prod M(5,7,13,15)$$

<details>
<summary>Correction Exercice 7</summary>

**$F_1$** : tableau de Karnaugh (C en ligne, BA en colonne) => $F_1 = \bar{C} + \bar{B}A + B\bar{A}$

**$F_2$** — *m : désigne les mintermes. Lecture : $F_2$ = somme des mintermes 0,1,2,...,15. Remplissage : chaque minterme apparu correspond à 1 dans le tableau de Karnaugh.*

$$F_2 = \bar{D}\bar{C} + DA + \bar{C}B$$

**$F_3$** — *cette écriture désigne un produit de sommes. Remplissage du tableau de Karnaugh : soit par retour à la table de vérité, soit directement — variable non-complémentée correspond à 0, variable complémentée correspond à 1, variable non apparue prend 0 et 1. Chaque somme apparue prend 0 dans le tableau, somme non apparue prend 1.*

$$F_3 = D.\bar{B} + \bar{C}.A$$

**$F_4$** — *M : désigne les maxtermes. Lecture : $F_4$ = produit des maxtermes 5, 7, 13 et 15. Remplissage : chaque maxterme apparu correspond à 0 dans le tableau de Karnaugh.*

$$\bar{F_4} = C.A \implies F_4 = \overline{C.A}$$

</details>

### Exercice 8

On souhaite réaliser un jeu de roche-papier-ciseaux numérique. Il y a donc deux joueurs $A$ et $B$ qui disposent chacun d'un interrupteur à trois positions qui encode le choix sur deux bits, selon l'encodage suivant, pour chacun des joueurs ($A_1A_0$) et ($B_1B_0$) :

- `00` : Roche
- `01` : Papier
- `10` : Ciseaux

Le système a deux lumières (sorties) $S_A$ et $S_B$. La roche l'emporte sur le ciseau. Le ciseau l'emporte sur le papier et le papier l'emporte sur la roche.

Donc, par exemple, si $A_1A_0 = 01$ (Papier) et $B_1B_0 = 10$ (Ciseau), c'est le joueur B qui l'emporte et la lampe B s'allume ($S_A = 0$ et $S_B = 1$). En cas d'égalité, aucune lumière ne s'allume.

1. Donner la table de vérité de ce système.
2. Déterminer les équations simplifiées de $S_A$ et $S_B$.
3. Présenter le logigramme du circuit en utilisant exclusivement des portes NAND. Vous pouvez utiliser des portes à deux et à trois entrées.

<details>
<summary>Correction Exercice 8</summary>

**1) Table de vérité** (`-` = combinaison impossible, ni 0 ni 1) :

| A1 | A0 | B1 | B0 | SA | SB |
|----|----|----|----|----|----|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 0 | 1 | 0 | 1 |
| 0 | 0 | 1 | 0 | 1 | 0 |
| 0 | 0 | 1 | 1 | - | - |
| 0 | 1 | 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 0 | 0 | 1 |
| 0 | 1 | 1 | 1 | - | - |
| 1 | 0 | 0 | 0 | 0 | 1 |
| 1 | 0 | 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 | - | - |
| 1 | 1 | 0 | 0 | - | - |
| 1 | 1 | 0 | 1 | - | - |
| 1 | 1 | 1 | 0 | - | - |
| 1 | 1 | 1 | 1 | - | - |

**2) Équations simplifiées :**

$$S_A = B_1.\bar{A_1}.\bar{A_0} + A_0.\bar{B_1}.\bar{B_0} + A_1.B_0$$
$$S_B = B_0.\bar{A_1}.\bar{A_0} + A_1.\bar{B_1}.\bar{B_0} + A_0.B_1$$

**3)** *(Logigramme à portes NAND exclusivement — deux réseaux à 3 portes NAND à 2/3 entrées convergeant vers une porte NAND finale par sortie ; voir schéma détaillé page 74 du PDF.)*

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/cn-ch2-algebre-de-boole-portes-logiques.pdf" />

</TabItem>
</Tabs>
