---
sidebar_position: 1
title: "Chapitre 1 : Introduction à la Compilation"
sidebar_label: Ch1 - Introduction
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# I. Introduction à la Compilation

*Cours Techniques de Compilation 2023-2024 — Hatem Aouadi*

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments) — best-effort reconstruction below, see task summary -->

## Plan

I.1. Compilateurs
I.2. Les Grammaires non contextuelles
I.3. Phases de Compilation
I.4. Qualité d'un Compilateur
I.5. Outils pour la construction de Compilateurs

## I.1. Compilateurs

Évolution des langages :

- Langage machine
- Langage assembleur
- Langages évolués : C, PASCAL, ADA (Algorithmiques), PROLOG (Logiques)
- Langages de 4ème génération

Un compilateur est un programme qui lit un programme écrit dans un premier langage (langage source) et le traduit en un programme équivalent écrit dans un autre langage (le langage cible).

```
Compilateur : PSource → PAssembleur
                 ↓
          Messages d'erreur
```

Au cours de ce processus de traduction, un rôle du compilateur est de signaler à son utilisateur la présence d'erreurs dans le programme source.

## I.2. Exemples de grammaires non contextuelles

**1) Une grammaire qui génère l'ensemble des expressions arithmétiques utilisant les opérateurs `+` et `*` et les chiffres `{0,1,...,9}`**

```
G = ({Exp}, {+, *, (, ), 0, 1, …, 9}, Exp, R)
R = { Exp → Exp + Exp
      Exp → Exp * Exp
      Exp → (Exp)
      Exp → 0
      Exp → 1
      Exp → 2
      Exp → 3
      Exp → 4
      Exp → 5
      Exp → 6
      Exp → 7
      Exp → 8
      Exp → 9 }
```

**2) Une grammaire sur les identificateurs (id), les nombres entiers (nb) et les opérateurs booléens (non, et, ou) qui génère l'ensemble des expressions booléennes utilisant les opérateurs relationnels (oprel) et arithmétiques (oparith)**

```
G = (V, T, Expb, R)
V = {Expb, Expr, Expa}
T = {id, nb, oprel, oparith, non, et, ou, (, )}
R = { Expb → Expr
      Expb → non(Expb)
      Expb → Expb et Expb
      Expb → Expb ou Expb
      Expr → Expa oprel Expa   où oprel ∈ {<, >, <=, >=, <>, =}
      Expr → (Expr)
      Expa → Expa oparith Expa   où oparith ∈ {+, *, /, -}
      Expa → (Expa)
      Expa → id
      Expa → nb }
```

**3) Une grammaire qui génère un programme non vide, suivi d'un nom. Chaque programme commence par une séquence de déclarations non vide (Début, ou sans Début), suivie d'une séquence d'instructions non vide (se termine par ;) suivie de Fin. Les types utilisés sont entier et réel. Chaque instruction peut être une instruction d'affectation ou une instruction conditionnelle (Si … alors … [sinon …] FinSi).**

<!-- TODO: unclear in source — this paragraph's word order is heavily scrambled by OCR extraction (bullet fragments reordered); the grammar rules below are transcribed as-is from the source and are the reliable part -->

```
G = (V, T, P, R)
V = {P, S_DCL, DCL, S_INST, INST, Expb, Expr, Expa}
T = {Program, Début, Fin, Var, :, id, :=, ;, Si, Sinon, Fin Si, (, ), oparith, oprel, non, et, ou, entier, réel, alors, nb}
R = { P → Program id S_DCL Début S_INST Fin
      S_DCL → DCL | DCL S_DCL
      DCL → Var L_id : TYPE;
      L_id → id | id, L_id
      TYPE → entier | réel
      S_INST → INST | INST S_INST
      INST → id := Expa;
      INST → Si Expb alors S_INST Fin Si
      INST → Si Expb alors S_INST Sinon S_INST Fin Si
      Expb → Expr | non(Expb) | Expb et Expb | Expb ou Expb
      Expr → Expa oprel Expa
      Expr → (Expr)
      Expa → Expa oparith Expa
      Expa → (Expa)
      Expa → id
      Expa → nb }
```

Exemple de programme généré :

```
Program test
Var a, b : entier;
Début
  a:= 10;
  Si a>= 10 alors a:= 20; Fin Si
Fin
```

### Vérification de la grammaire

Vérifier que la grammaire précédente génère le programme suivant :

```
Program id
Var id, id : entier;
Début
  id:= nb;
  Si id oprel nb alors id:= nb; Fin Si
Fin
```

en le comparant à :

```
Program test
Var a, b : entier;
Début
  a:= 10;
  Si a>= 10 alors a:= 20; Fin Si
Fin
```

Le programme est transformé en une séquence de terminaux :

```
Program id Var id, id : entier ; Début id:= nb ; Si id oprel nb alors id:= nb ; Fin Si Fin
```

En parcourant les feuilles de l'arbre de gauche à droite, on trouve le programme à analyser. Donc ce programme est **syntaxiquement correct**.

Arbre syntaxique correspondant (`P`) :

```
P
├── Program
├── id
├── S_DCL
│   └── DCL
│       ├── Var
│       ├── L_id
│       │   ├── id
│       │   └── L_id → id
│       ├── :
│       └── TYPE → entier
├── Début
├── S_INST
│   ├── INST
│   │   └── id := Expa ;
│   │       └── Expa → nb
│   └── S_INST
│       └── INST
│           └── Si Expb alors S_INST Fin Si
│               ├── Expb → Expr
│               │   └── Expr → Expa oprel Expa
│               │       ├── Expa → id
│               │       └── Expa → nb
│               └── S_INST
│                   └── INST
│                       └── id := Expa ;
│                           └── Expa → nb
└── Fin
```

## I.3. Phases de Compilation

On distingue deux parties :

- **Analyse** : partitionne le programme source en ses constituants et en crée une représentation intermédiaire.
- **Synthèse** : construit le programme cible à partir de la représentation intermédiaire.

L'analyse utilise les constituants d'une grammaire non contextuelle qui génère des programmes du langage utilisé.

```
PSource → [ Analyse ] → [ Synthèse ] → PCible
```

### Les phases

- Analyse lexicale
- Analyse Syntaxique
- Analyse sémantique
- Génération de code intermédiaire
- Optimisation de code
- Génération de code machine

En parallèle : gestion de la table des symboles (table des identificateurs, mots réservés et constantes) et gestion des erreurs.

Les compilateurs comportent une **partie frontale** (analyse : Psource → PLI, indépendante de la machine cible) et une **partie terminale** (PASS : génération de code intermédiaire → générateur de code machine). Si on change de machine, on peut ne modifier que la partie terminale.

### Interface avec l'analyseur lexical

L'AL (analyseur lexical) communique avec l'AS (analyseur syntaxique) en lisant/rendant des caractères :

- Lire caractère
- Rendre caractère
- Passer unité lexicale et ses attributs à l'entrée

- Pour l'AS, l'AL retourne l'UL (unité lexicale).
- Pour l'Asem (analyseur sémantique), il retourne le type, la portée, …
- Pour le traducteur, il retourne la valeur du nombre, l'opérateur utilisé, …

Si C est une variable caractère et le prog source est dans l'entrée standard, alors l'instruction `C = getchar();` affecte le prochain caractère d'entrée à C, et l'instruction `ungetc(C, stdin);` rend à l'entrée standard `stdin` la valeur de C.

Implantation des interactions avec l'analyseur lexical : `AnalLex()` (l'analyseur lexical) utilise `getchar()` pour lire un caractère, retourne une unité lexicale à l'appelant, et positionne la variable globale `ValLex` à la valeur de l'unité lexicale ; il utilise `ungetc(C, stdin)` pour rendre un caractère.

### Phase 1 : Analyse linéaire (ou lexicale)

Le flot de caractères formant le programme source est lu de gauche à droite et groupé en unités lexicales, qui sont une suite de caractères ayant une signification collective. Ces unités lexicales sont les terminaux de la grammaire.

- L'AL retourne une UL pour l'AS.
- Pour l'Asem, si l'UL est `id` alors il retourne une entrée dans la table des identificateurs pour l'identificateur trouvé.
- Pour le traducteur, si l'UL est `nb`, alors il retourne sa valeur ; si l'UL est `oprel` alors il retourne l'opérateur en question ; si l'UL est `oparith` alors il retourne l'opérateur en question.
- Quand l'analyseur lexical rencontre un identificateur non mot clé, il le cherche dans la table des id. S'il existe alors il retourne l'entrée associée, sinon il lui crée une entrée et retourne le numéro d'entrée.

**Exemple.** Grammaire :

```
P → id opaff Exp
Exp → id | nb | (Exp) | Exp oparith Exp
```

Les unités lexicales associées au mot `position := initiale + vitesse * 60` sont :

1. L'identificateur `position`
2. Le symbole d'affectation `opaff`
3. L'identificateur `initiale`
4. Le signe d'addition `oparith`
5. L'identificateur `vitesse`
6. Le signe de multiplication `oparith`
7. Le nombre `nb`

Le lexème est la suite de caractères du fichier source qui forme l'unité lexicale. Tableau lexèmes / unités lexicales :

| lexème | Unité lexicale |
| --- | --- |
| position | Id |
| := | Opaff |
| initiale | Id |
| + | Oparith |
| vitesse | Id |
| * | Oparith |
| 60 | nb |

Résultat de l'AL pour l'AS : `id1 opaff id2 oparith id3 oparith nb`

**Exemple avec déclarations.** Grammaire :

```
DCL → Var L_ID : TYPE; | Var L_ID : TYPE; DCL | ε
L_ID → id | id, L_ID
TYPE → entier | réel
```

Pour le mot `Var a, b: entier; var c: réel;`, les unités lexicales retournées par l'AL à l'AS sont :

```
Var id , id : entier ; Var id : réel ;
```

Table des id de variables construite :

| N° | Lexème | Type |
| --- | --- | --- |
| 1 | a | entier |
| 2 | b | entier |
| 3 | c | réel |

Si l'AL retourne un résultat à l'AS et à l'Asem, le résultat pour le mot `Var a, b: entier; var c: réel;` encode aussi le numéro d'entrée de chaque identificateur dans la table (`Var Id1 , Id2 : entier ; Var Id3 : réel ;`).

**Exemple avec traducteur.** Soit le mot `a := c + 34;`.

- Pour l'AS : `id := id oparith nb;`
- Pour l'Asem : `1 := 3 oparith nb;` c'est-à-dire `entier := réel oparith entier`
- Pour le traducteur : `@a := @c + 34;`

Table des id de variables avec adresses :

| N° | Lexème | Type | Adresse |
| --- | --- | --- | --- |
| 1 | a | entier | @a |
| 2 | b | entier | @b |
| 3 | c | réel | @c |

**Exemple complet.** Grammaire :

```
P → DCL L_I
DCL → Var L_ID : TYPE; | Var L_ID : TYPE; DCL | ε
L_ID → id | id, L_ID
TYPE → entier | réel
L_I → id := nb; | id := id; | id := nb; L_I | id := id; L_I
```

Pour le mot `Var a, b: entier; var c: réel; b := 10;`, si l'AL retourne un résultat à l'AS, l'Asem et le traducteur, le résultat encode la déclaration puis l'instruction `b := 10;` avec son identifiant résolu (id2) et sa valeur (nb 10).

### Phase 2 : Analyse hiérarchique (ou syntaxique)

Les unités lexicales sont regroupées hiérarchiquement en structure grammaticale. L'analyse syntaxique consiste à vérifier que la suite d'unités lexicales est générée par la grammaire du langage. Ceci revient à construire un arbre d'analyse (ou syntaxique) dont les feuilles concordent avec la suite d'unités lexicales en les parcourant de gauche à droite.

### Phase 3 : Analyse sémantique

On opère certains contrôles pour s'assurer que l'assemblage des constituants du programme a un sens. Une des opérations principales d'un Asem est le contrôle de type des opérandes d'une opération, le contrôle de la portée des identificateurs au moment de l'appel d'un sous-programme, etc. Dans le contrôle de type, l'analyseur sémantique peut insérer des opérations de conversion pour les expressions d'entier vers réel.

On distingue deux types d'erreurs sémantiques :

- **Sémantique statique**, contrôlée au moment de la compilation, telle que :
  - Variable non déclarée
  - L'incompatibilité de type
  - La portée d'une variable…
- **Sémantique dynamique**, contrôlée au moment de l'exécution, telle que :
  - La division par zéro
  - Les boucles infinies
  - Le débordement mémoire

### Phase 4 : Traduction en code intermédiaire

La séquence d'instructions du programme est traduite en une séquence d'instructions dans un langage intermédiaire. Par exemple : le langage pour machine à pile, le langage C, …

### Table des symboles

La table des symboles contient des informations sur les différents symboles et les attributs associés — par exemple les mots clés (ou réservés) et les identificateurs de variables, en spécifiant l'unité lexicale `id` et leurs attributs : type, adresse, etc. À chaque fois qu'une unité lexicale `id` est trouvée par l'AL, le lexème associé est inséré dans la table des symboles s'il n'a pas été déjà inséré, et l'AL retourne `id` et un pointeur vers une entrée de la table des symboles.

### Exemple récapitulatif

On veut illustrer les phases de compilation sur l'exemple suivant :

```
Position := Initiale + Vitesse * 60;
```

Grammaire :

```
P → id := Exp;
Exp → id | nb | (Exp) | Exp + Exp | Exp * Exp
```

Une contrainte sémantique doit être vérifiée : l'opérateur de multiplication doit être appliqué à deux opérandes de même type (entier, entier) ou (réel, réel). Pour notre exemple, Vitesse est un réel et 60 est un nombre entier, il faut alors convertir 60 d'entier vers réel (60.0).

**Analyse lexicale :** `id1 := id2 + id3 * nb;`

**Analyse syntaxique :**

```
P
└── id := Exp ;
    └── Exp + Exp
        ├── id
        └── Exp * Exp
            ├── id
            └── nb
```

**Analyse sémantique :** comme vitesse est un réel, pour pouvoir utiliser l'opérateur de multiplication, un compilateur peut convertir le nombre entier `nb` en réel.

Table des id de variables :

| N° | Lexème | Type |
| --- | --- | --- |
| 1 | Position | Réel |
| 2 | Initiale | Réel |
| 3 | Vitesse | Réel |

`Var position, Initiale, Vitesse : réel;` — l'analyseur sémantique convertit `60` en `60.0` (entier vers réel).

**Génération de code intermédiaire :**

```
Temp1 := Entier vers réel(60);
Temp2 := Temp1 * id3;
Temp3 := id2 + Temp2;
id1 := Temp3;
```

**Optimisation de code :**

```
Temp1 := id3 * 60.0;
id1 := id2 + Temp1;
```

**Génération de code machine** (Machine à registres) :

```
MOVF id3, R2
MULF #60.0, R2
MOVF id2, R1
ADDF R2, R1
MOVF R1, id1
```

## I.4. Qualité d'un compilateur

- Fournir le maximum d'erreurs en une seule compilation
- Rapidité

Un compilateur repose sur :

- Une grammaire non contextuelle du langage
- Une description des unités lexicales du langage

## I.5. Outils pour la construction de compilateurs

- Assembleur
- Écriture en langage évolué
- Constructeurs automatiques de compilateurs : **LEX** et **YACC**

| Outil | Rôle | Produit |
| --- | --- | --- |
| **Lex** | Générateur automatique d'analyseur lexical | Analyseur lexical écrit en C ou en Pascal |
| **Yacc** | Générateur automatique d'analyseur syntaxique | Analyseur syntaxique écrit en C ou en Pascal |

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/compilation-ch1-introduction.pdf" />

</TabItem>
</Tabs>
