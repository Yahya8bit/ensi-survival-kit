---
sidebar_position: 1
title: Chapitre I - Rappel et conventions syntaxiques
sidebar_label: Ch1 - Rappels syntaxiques
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# CHAPITRE I – Rappel et conventions syntaxiques

## 1. Définition

L'origine du mot *algorithme* découle du nom latinisé du mathématicien perse du 9ème siècle « Abu Ja'far Mohammed Ibn Mûsâ Al-Khowâ-rismî ».

Le terme algorithme admet, depuis longtemps, plusieurs définitions qui convergent. Froidevaux et al. définissent ce concept comme étant [Froidevaux et al., 1993] :

:::info Définition
« La composition d'un **ensemble fini d'étapes**, chaque étape étant formée d'un nombre **fini d'opérations** dont chacune est :

- Définie de façon **rigoureuse et non ambigüe** ;
- **Effective**, c'est-à-dire pouvant être réalisée par une machine. »
:::

Tout algorithme est donc caractérisé par [Courtin et al., 1994] :

- Un ensemble d'opérations à exécuter.
- Un ordre d'exécution de ces différentes opérations dicté par la logique d'enchaînement et conditionné par les structures mises en œuvre.
- Un début et une fin.

Le domaine qui étudie les *algorithmes* est désigné par : « algorithmique ».

## 2. Structure d'un algorithme

```pascal
Algorithme <nom de l'algorithme>
CONST
    <nom_de_la_constante = valeur>
TYPE
    <liste des structures>
VAR
    <nom-variable> : <type-variable>
FONC
    <liste des fonctions>
PROC
    <liste des procédures>
DEBUT
    <corps de l'algorithme : ensemble des instructions – une instruction par ligne>
FIN
```

**Exemple :** calculer la moyenne des notes d'un élève dans une matière donnée, à partir de 3 notes N1, N2, N3.

```pascal
Algorithme Moyenne
CONST
    c1=2
    c2=3
    c3=4
VAR
    Moyenne, N1, N2, N3 : réel
DEBUT
    Ecrire("Donnez les trois notes dans l'ordre")
    Lire (N1,N2,N3)
    Moyenne ← (N1*c1+N2*c2+N3*c3)/(c1+c2+c3)
    Ecrire ("La moyenne est : ", Moyenne)
FIN
```

## 3. Types de données

Dès que l'on a besoin de stocker une information au cours d'un algorithme, on utilise une **variable**.

### a. Types de base

**i. Booléen**

Valeurs : Vrai, Faux.

Opérations : relationnelles (Faux &lt; Vrai), logiques : négation (`non`), conjonction (`et`), disjonction (`ou`)

| A | B | Non A | A et B | A ou B |
|---|---|-------|--------|--------|
| V | V | F | V | V |
| V | F | F | F | V |
| F | V | V | F | V |
| F | F | V | F | F |

**ii. Caractère**

Valeurs : ensemble fini de symboles totalement ordonnés. Un code ASCII est associé à chaque caractère.

Opérations : relationnelles (`'a'<'b'` ; `'a'>'A'`), `ORD`, `CHR`

**iii. Entier**

Valeurs : sous-ensemble de ℤ (représentation en machine des entiers relatifs).

Opérations : relationnelles (`=`, `<`, `>`, `≤`, `≥`, `<>`), arithmétiques (`+`, `-`, `*`, `/`), `DIV` (division entière), `MOD` (reste), `PUISSANCE`.

**iv. Réel**

Valeurs : sous-ensemble de ℝ.

Opérations : relationnelles, arithmétiques, puissance, autres (`cos`, `sin`…).

### b. Type scalaire énuméré

Permet de représenter un ensemble ordonné et fini de valeurs désignées par des identificateurs.

```pascal
Type nom_type = (val1,…, valk)
```

**Exemple :**

```pascal
Type t_couleur = (blanc, bleu, rouge)
Var
    cl : t_couleur
cl ← blanc
```

Opérations : relationnelles, `Ord()` (rang dans le domaine), `Succ()` (successeur), `Pred()` (prédécesseur), `Inc(v,n)` (incrémenter v de n).

Exemples : `ord(bleu)=1`, `succ(bleu)=rouge`, `pred(bleu)=blanc`.

### c. Type intervalle

Permet de restreindre le groupe de valeurs d'un type scalaire discret (entier, booléen, caractère ou type énuméré).

```pascal
Type nom_intervalle = borne_inf…borne_sup
```

avec `borne_inf < borne_sup`. Les opérations autorisées sont celles du type des variables contenues dans l'intervalle.

**Exemple :**

```pascal
Type T_chiffre = 0..9
     T_majuscule = 'A'..'Z'
```

## 4. Opérations de base

Dans un schéma séquentiel, on distingue deux types d'instructions :

- Des instructions simples, élémentaires permettant de faire un traitement ;
- Des instructions permettant de commander le déroulement de l'exécution, appelées **structures de contrôle**.

### a. Affectation

Le rôle de cette instruction est de placer une valeur dans une variable.

```pascal
<nom variable> ← <expression>
```

`<expression>` : constante | variable | expression. La variable et l'expression doivent être de même type ou de types compatibles.

```pascal
Test()
var
    i,j : entier
Debut
    i ← 10
    j ← 20
    i ← 2*j
Fin
```

### b. Lecture

L'utilisateur introduit des valeurs qui seront affectées à des variables. L'utilisateur doit respecter le type des éléments à introduire.

```pascal
Lire (<liste variables>)
```

```pascal
Var
    i : entier
    r : réel
Debut
    Lire(i,j)
Fin
```

### c. Ecriture

Permet aussi bien l'affichage d'un texte que l'affichage des valeurs d'une liste de variables.

```pascal
Ecrire (<texte>)
```

```pascal
Var
    i, j : entier
Debut
    Ecrire ("Bonjour")
    lire (i, j)
    i ← i*j
    Ecrire (i)
Fin
```

:::note Remarque
On peut regrouper dans la syntaxe de l'instruction `Ecrire`, la liste des variables et le texte : `Ecrire ("La valeur de i est", i, " la valeur de j est ", j)`
:::

## 5. Algorithmique et programmation

La mise en œuvre d'un algorithme consiste en l'écriture des opérations qui le composent dans un langage de programmation et constitue la brique de base d'un programme informatique.

Un algorithme exprime les instructions permettant de résoudre un problème donné indépendamment des langages de programmation. Lors du passage de l'algorithmique à la programmation, le travail revient à résoudre des problèmes de syntaxe, ou de types d'instructions propres à ce langage.

Afin d'écrire un algorithme, on se base généralement sur une série de conventions désignée par « **pseudo-code** », comparable à un langage de programmation dont on aurait évacué la plupart des problèmes de syntaxe. Puisqu'il est purement conventionnel, ce pseudo-code peut varier légèrement d'une référence à une autre.

Pour être compréhensible, un algorithme doit être présenté de manière lisible ; il ne doit pas être trop long, ce qui nécessite parfois de le décomposer en modules. Certaines formes de programmation telles que les branchements sont à éviter ; par contre la récursivité permet une expression concise des algorithmes et facilite leur analyse.

## 6. Structures conditionnelles

### a. Schéma conditionnel à simple choix (Si – Alors – Fsi)

```pascal
Si <condition> alors
    <Traitement>
Fsi
```

Si `<condition>` est vraie alors on exécute le bloc `<traitement>` et on continue en séquence à l'instruction qui suit `<Fsi>`. Si `<condition>` est fausse, on continue en séquence avec l'instruction qui suit immédiatement `<Fsi>`.

### b. Schéma conditionnel à double choix (Si – Alors – Sinon – Fsi)

```pascal
Si <condition> alors
    <Traitement 1>
Sinon
    <Traitement 2>
Fsi
```

Si `<condition>` est vraie, on exécute `<traitement 1>` puis on continue après `<Fsi>`. Si `<condition>` est fausse, on exécute `<traitement 2>` puis on continue après `<Fsi>`.

### c. Schéma conditionnel à choix multiple

```pascal
Selon <v>
    <v1> : <Traitement 1>
    <v2> : <Traitement 2>
    <vn> : <Traitement n>
Sinon : <Traitement>
Fin selon
```

`<v>` : identificateur d'une variable de type scalaire. `<vi>` : une valeur ou une liste composée d'une suite de valeurs (ex : `2, 5, 8`) ou d'une fourchette (ex : `0..9`). Les valeurs contenues dans les `<vi>` doivent être de même type que `<v>`.

Lorsque `<v> = <vi>` on exécute le traitement correspondant puis on passe à l'instruction qui suit `Finselon`. Le bloc `<sinon>` est facultatif.

:::note Remarque
L'instruction `selon` peut être ramenée à un enchaînement de « Si » imbriquées.
:::

**Exemple d'utilisation :**

```pascal
Exp( )
Var
    k, x : entier
Debut
    x ← 0
    lire(k)
    Selon k
        5 : x ← x+6
        6..10 : x ← x+18
        11, 12, 13 : x ← x-5
    Sinon
        x ← 1
    Fin selon
Fin
```

## 7. Structures itératives

Les structures itératives permettent de répéter l'exécution d'une même séquence d'instructions un nombre fini de fois. On distingue :

- **L'itération** : quand on connait le nombre de fois que l'on va répéter une instruction.
- **La répétition conditionnelle** : quand la poursuite d'une répétition dépend d'une condition à résultat booléen.

### a. Boucle « Pour »

```pascal
Pour <compteur> de <valeur initiale> à <valeur finale> pas <incrément> faire
    <Traitement>
Fpour
```

```pascal
var
    i, j, n : entier
Debut
    n ← 5
    j ← 1
    Pour i de j à n pas (2) faire
        Ecrire(i)
    Fpour
Fin
```

:::warning Remarques
- Il est interdit de modifier `<compteur>`, `<valeur initiale>`, `<valeur finale>` et `<incrément>`.
- `<valeur initiale> <= <valeur finale>` ssi `<incrément> > 0`
- `<valeur initiale> >= <valeur finale>` ssi `<incrément> < 0`
- `<incrément>` ne doit jamais être nul.
- Lorsque la valeur de `<incrément>` n'est pas précisée elle est considérée comme étant égale à 1.
- L'instruction `Pour` est utilisée lorsque le nombre d'itérations est connu.
:::

### b. Boucle « Tant que »

```pascal
Tant que <condition> faire
    <Traitement>
Fin tant que
```

`<Traitement>` : un ensemble d'instructions telles qu'il existe au moins une instruction modifiant la condition.

**Exercice**

Ecrire un algorithme permettant de saisir une suite d'entiers positifs ou nuls se terminant par une valeur négative, de faire la somme de ces entiers et de l'afficher.

### c. Boucle « Répéter »

```pascal
Répéter
    <Traitement>
Jusqu'à <condition>
```

:::note Remarque
Cette instruction ne peut être utilisée que si on est sûrs que le traitement est exécuté **au moins une fois**. La boucle précédente peut être remplacée par :

```pascal
Tant que non <condition> faire
    <Traitement>
FTQ
```
:::

## 8. La construction modulaire d'algorithmes

Lors de la conception d'un programme résolvant un problème général, il est nécessaire de décomposer le problème en différents sous-problèmes moins complexes à résoudre. Ces sous-problèmes peuvent être résolus grâce à des modules ou sous-programmes.

L'utilisation des sous-programmes présente de nombreux avantages :

- La possibilité de réutilisation ;
- La facilité de la résolution de problèmes en ne s'intéressant qu'à l'écriture d'un module à la fois ;
- La factorisation du code : ne pas répéter plusieurs fois une même séquence d'instructions.

En algorithmique, il existe deux types de sous-programmes : les **procédures** et les **fonctions**.

Lors de la conception d'un programme deux aspects apparaissent : la **définition** de la procédure ou de la fonction, et son **appel** dans le programme. Le (sous-)programme qui utilise un sous-programme est désigné par (sous-)programme **appelant**.

### a. Procédures

**i. Déclaration**

```pascal
Procédure <Nom procédure> (<Liste-paramètres>)
var
    <variables-locales>
Début
    <Traitement>
Fin
```

Une variable définie dans un sous-programme est appelée **variable locale**. La portée d'une variable locale est uniquement le sous-programme qui la déclare.

**ii. Appel de procédure**

```pascal
<Nom procédure> (<Liste-paramètres>)
```

**iii. Exemple de procédure**

```pascal
Algo Exp1
Var
    A, B : entier
Procédure AfficheMax(X :entier, Y :entier)
Début
    si (X>Y)
    alors ecrire(X)
    sinon
        ecrire (Y)
    fsi
Fin
Début (Algorithme principal : algorithme appelant)
    Ecrire(« Donnez deux entiers »)
    Lire(A,B)
    AfficheMax(A,B)
Fin
```

### b. Fonctions

**i. Déclaration**

```pascal
Fonction <Nom fonction> (<Liste-paramètres>) : <type>
var
    <variables-locales>
Début
    <Traitement>
    <Nom fonction> ← <variable>
Fin
```

`<variable>` : variable de même type que la fonction ou de type compatible.

**ii. Appel de fonction**

Une fonction est utilisée dans une instruction :

- Dans la partie droite d'une affectation (`y ← f(x)`)
- Dans une expression arithmétique ou logique (`y ← f(x)+2`)
- Comme paramètre d'une procédure ou d'une fonction : `P(f(x))`, `f(f(x))`.

**iii. Exemple de fonction**

```pascal
Algo Max
Var
    A, B, C : entier
Fonction Max(X, Y : entier) : entier
Var
    W : entier
Début
    Si (X>Y) alors
        W ← X
    Sinon
        W ← Y
    Fsi
    Max ← W
Fin
Début (Algorithme principal : algorithme appelant)
    Ecrire (« Donner deux entiers »)
    Lire (A, B)
    C ← Max(A, B)
    Ecrire (« Le maximum est : », C)
Fin
```

### c. Transmission des données

**i. Les types de paramètres**

Lors de l'utilisation des sous-programmes, une transmission de données et de résultats est mise en jeu. On distingue :

- **Les paramètres formels** : utilisés dans la **définition** de la fonction ou procédure. Ce sont des variables qui peuvent prendre plusieurs valeurs.
- **Les paramètres effectifs** : utilisés de façon effective dans un appel de fonction ou de procédure (les valeurs utilisées pour effectuer les calculs).

Le nombre de paramètres effectifs doit être égal au nombre de paramètres formels. Le paramètre effectif doit avoir le même type ou un type compatible avec le paramètre formel correspondant. La correspondance entre paramètres effectifs et formels se fait dans l'ordre de leur apparition dans les deux listes.

**ii. Les modes de passage de paramètres**

Il existe 3 modes de passage de paramètres :

- **Donnée** (`Don`) : le paramètre doit porter une valeur significative avant l'exécution, il est nécessaire aux calculs mais ne sera pas modifié par le sous-programme. C'est le seul mode de passage qui admet l'utilisation d'une constante.
- **Résultat** (`Res`) : le paramètre est destiné à recevoir un résultat. Les instructions du sous-programme lui affectent obligatoirement une valeur ; il n'a pas nécessairement de valeur significative avant l'exécution, mais doit en avoir une après.
- **Donnée-résultat** (`DonRes`) : le paramètre est utilisé dans les calculs et reçoit aussi un résultat. Il doit avoir une valeur significative avant et après exécution.

**Exemples :**

```pascal
Procédure AfficheMax (X :entier, Y :entier)
Utilisation : AfficheMax (A,B)
```

X et Y sont des paramètres données, donc :

```pascal
Procédure AfficheMax (Don X , Y :entier)
```

```pascal
Fonction Max(X, Y : entier) : entier
Utilisation : C ← Max(A, B)
```

X et Y sont des paramètres données, donc :

```pascal
Fonction Max(Don X, Y : entier) : entier
```

Soit la procédure `Permute` qui permute deux entiers X et Y :

```pascal
Procédure Permute (DonRes X, Y :entier)
```

</TabItem>
<TabItem value="pdf" label="PDF">

*Le PDF ci-dessous est le fascicule complet (chapitres I à III).*

<iframe src="/pdfs/asd-chapitres123.pdf" width="100%" height="800px" style={{border: '1px solid var(--ifm-color-emphasis-300)'}} />

</TabItem>
</Tabs>
