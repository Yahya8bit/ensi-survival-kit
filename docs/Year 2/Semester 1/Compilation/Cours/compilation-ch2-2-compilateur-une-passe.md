---
sidebar_position: 3
title: "Chapitre 2.2 : Compilateur en une seule passe"
sidebar_label: Ch2.2 - Compilateur en une passe
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# II. Compilateur en une seule passe

*Cours Techniques de Compilation 2023-2024 — Hatem Aouadi*

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments) — best-effort reconstruction below, see task summary -->

## Plan

II.1. Présentation générale
II.2. Définition de la syntaxe
II.3. Traduction dirigée par la syntaxe
II.4. Un traducteur pour les expressions
II.5. Analyse lexicale

## II.1. Présentation générale

Un compilateur en une seule passe est un compilateur qui fait le parcours du fichier source une seule fois. L'analyseur lexical fournit un résultat aussi bien à l'analyseur syntaxique, sémantique qu'au traducteur en code intermédiaire. Il fournit ainsi :

- Les unités lexicales à l'analyseur syntaxique
- Les types des identificateurs à l'analyseur sémantique
- Les attributs des unités au traducteur en langage intermédiaire

- Si l'unité est un nombre, alors l'attribut est la valeur de ce nombre.
- Si l'unité est un opérateur arithmétique, alors l'attribut est l'opérateur en question (`+`, `-`, `/`, `*`).
- Si l'unité est `oprel`, alors l'attribut est l'opérateur en question (`PPQ`, `PPE`, `PGQ`, `PGE`, `EGA`, `DIF`).

## II.2. Définition de la syntaxe

Consiste en une grammaire non contextuelle. C'est une grammaire `(V, T, S, R)` où :

- `V` est l'ensemble des symboles non terminaux
- `T` est l'ensemble des terminaux
- `S` est le symbole de départ, ou l'axiome de la grammaire
- `R` est l'ensemble des règles de production de la forme `A → u` où `u ∈ (V + T)*`

Un programme est syntaxiquement correct s'il peut être généré par la grammaire associée au langage de programmation. Si le langage est l'ensemble des instructions d'affectation, alors un élément de l'ensemble est une instruction d'affectation.

**Grammaire possible :**

```
Soit la grammaire non contextuelle G = (V, T, INST, R) où
V = {INST, EXP}
T = {id, :=, +, -, *, /, (, ), ;}
R = { INST → id := EXP;
      EXP → id | nb | EXP + EXP | EXP * EXP | EXP – EXP | EXP / EXP | (EXP) }
```

INST est l'axiome de la grammaire. Un mot est généré en appliquant successivement des règles de production, en partant de l'axiome (le symbole de départ) et nous obtenons le mot (formé des terminaux).

Par exemple le mot suivant est généré par la grammaire :

```
Id := id + (id*nb);
```

Parce que on a :

```
INST → id := EXP;
     → id := EXP + EXP ;
     → id := id + EXP ;
     → id := id + (EXP) ;
     → id := id + (EXP * EXP) ;
     → id := id + (id * EXP) ;
     → id := id + (id * nb) ;
```

Si le langage est formé par l'ensemble des séquences d'instructions non vides où chaque instruction est une instruction d'affectation, alors une grammaire possible est la suivante :

```
LISTE_INST → INST | INST LISTE_INST
INST → id := EXP;
EXP → id | nb | EXP + EXP | EXP * EXP | EXP – EXP | EXP / EXP | (EXP)
```

LISTE_INST est l'axiome de la grammaire. Un mot est généré en appliquant successivement des règles de production, en partant de l'axiome (le symbole de départ), et nous obtenons le mot (formé des terminaux).

Par exemple le mot suivant est généré par la grammaire :

```
Id := id + (id*nb); id := nb;
```

Parce que on a :

```
LISTE_INST → INST LISTE_INST
           → id := EXP; LISTE_INST
           → id := EXP + EXP ; LISTE_INST
           → id := id + EXP ; LISTE_INST
           → id := id + (EXP) ; LISTE_INST
           → id := id + (EXP * EXP) ; LISTE_INST
           → id := id + (id * EXP) ; LISTE_INST
           → id := id + (id * nb) ; LISTE_INST
           → id := id + (id * nb) ; INST
           → id := id + (id * nb) ; id := EXP;
           → id := id + (id * nb) ; id := nb;
```

```
Programme source → [ Producteur ] → Programme en LI → [ Consommateur ]
```

- L'analyseur lexical (AL) joue le rôle de producteur et le traducteur dirigé par la syntaxe (TDS) joue le rôle de consommateur.
- L'AL produit une unité lexicale avec ses attributs et le TDS consomme cette unité et demande l'unité suivante (fait appel à `symbole_suivant()`).

## II.3. Traduction dirigée par la syntaxe

La traduction dirigée par la syntaxe est la combinaison d'un analyseur syntaxique et d'un générateur de code intermédiaire.

```
Analyseur lexical → UL / Données → Traducteur dirigé par la syntaxe
```

2 méthodes différentes existent pour la traduction dirigée par la syntaxe :

- **Définition dirigée par la syntaxe** : formalisme basé sur une grammaire + des règles sémantiques.
- **Schéma de traduction** : des productions + des fragments de programmes.

### II.3.1. Définition dirigée par la syntaxe (DDS)

Elle utilise une grammaire non contextuelle pour spécifier la structure syntaxique du texte d'entrée. À chaque symbole non terminal de la grammaire, on associe un ensemble d'attributs ; à chaque production, on associe un ensemble de règles sémantiques pour calculer la valeur des attributs associés aux symboles apparaissant dans cette production.

Une DDS est formée par les règles de la grammaire + des règles sémantiques pour calculer les attributs.

### II.3.2. Schéma de traduction

C'est une grammaire non contextuelle étendue par des actions de traduction, qui sont des fragments de programmes.

- Elles sont introduites à l'intérieur de la partie droite des règles de production entre `{}`.
- Au moment de la construction de l'arbre d'analyse, des actions additionnelles sont associées à ces feuilles.
- En parcourant l'arbre de gauche à droite, nous obtenons le résultat de la traduction.

## II.4. Un traducteur pour les expressions

### II.4.1. Traduction des expressions infixées en notation post-fixée

La notation postfixée pour une expression arithmétique `E` est définie récursivement comme suit :

- Si `E` est une variable ou une constante alors la forme postfixée de `E` est `E` elle-même.
- Si `E` est de la forme `E1 op E2` alors la forme postfixée de `E` est `E1'E2'op` où `E1'` et `E2'` sont respectivement les formes postfixées de `E1` et `E2`.
- Si `E` est de la forme `(E1)` alors la forme postfixée de `E` est la forme postfixée de `E1`.

Pour cet exemple, dans une DDS, on associe un attribut `t` à chaque non terminal, dont la valeur est une chaîne qui représente la notation postfixée de l'expression engendrée par ce non terminal dans un arbre syntaxique.

### II.4.2. DDS pour la traduction des expressions infixées en notation post-fixée

| Règles de production | Règles sémantiques |
| --- | --- |
| `Exp → Exp1 + Exp2` | `{Exp.t := Exp1.t \|\| Exp2.t \|\| +}` |
| `Exp → Exp1 * Exp2` | `{Exp.t := Exp1.t \|\| Exp2.t \|\| *}` |
| `Exp → (Exp1)` | `{Exp.t := Exp1.t}` |
| `Exp → 0` | `{Exp.t := 0}` |
| `Exp → 1` | `{Exp.t := 1}` |
| `Exp → 2` | `{Exp.t := 2}` |
| … | … |
| `Exp → 9` | `{Exp.t := 9}` |

**Exemple.** L'AS du mot `(5+9)*2` donne :

```
Exp
├── Exp
│   └── ( Exp )
│       └── Exp + Exp
│           ├── 5
│           └── 9
├── *
└── Exp
    └── 2
```

Lorsque la règle de production `Exp → 5` est appliquée, l'attribut `t` est calculé par l'application de la règle sémantique et `Exp.t` prend la valeur `5`.

`(5+9)*2` est traduite par `5 9 + 2 *` : `Exp.t := 5`, `Exp.t := 9`, `Exp.t := 5 9 +`, `Exp.t := (5 9 +)`, `Exp.t := 2`, `Exp.t := 5 9 + 2 *`.

### II.4.3. Schéma de traduction des expressions

```
Exp → Exp1 + Exp2 {Imprimer(+)}
Exp → Exp1 * Exp2 {Imprimer(*)}
Exp → (Exp1)
Exp → 0 {Imprimer(0)}
Exp → 1 {Imprimer(1)}
Exp → 2 {Imprimer(2)}
Exp → 3 {Imprimer(3)}
Exp → 4 {Imprimer(4)}
Exp → 5 {Imprimer(5)}
Exp → 6 {Imprimer(6)}
Exp → 7 {Imprimer(7)}
Exp → 8 {Imprimer(8)}
Exp → 9 {Imprimer(9)}
```

`(5+9)*2` est traduite par `5 9 + 2 *` :

```
Exp
├── Exp
│   └── ( Exp )
│       └── Exp + Exp   I(+)
│           ├── 5   I(5)
│           └── 9   I(9)
├── *   I(*)
└── Exp
    └── 2   I(2)
```

En exécutant les instructions d'impression de gauche à droite : `I(5) I(9) I(+) I(2) I(*)`. Nous obtenons la forme postfixée : `5 9 + 2 *`.

## II.5. Analyse lexicale

L'analyse lexicale consiste en la conversion du flot de caractères d'entrée en un flot d'unités lexicales, pour les phases suivantes d'analyse (syntaxique, sémantique et traduction dans le cas d'un compilateur en une seule passe) ou bien pour le code intermédiaire. Un analyseur lexical est basé sur les systèmes de transition (ou bien les automates finis).

Diagramme de transition pour la reconnaissance de `>=` :

```
Début → (0) --'>'--> (1) --'='--> ((2)) return(oprel, PGE)
                       (1) --autre--> ((3))* return(oprel, PGQ)
```

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/compilation-ch2-2-compilateur-une-passe.pdf" />

</TabItem>
</Tabs>
