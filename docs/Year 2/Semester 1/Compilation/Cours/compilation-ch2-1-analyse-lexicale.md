---
sidebar_position: 2
title: "Chapitre 2.1 : Analyse lexicale"
sidebar_label: Ch2.1 - Analyse lexicale
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# II. Analyse lexicale

*Cours Techniques de Compilation 2023-2024 — Hatem Aouadi*

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments) — best-effort reconstruction below, see task summary -->

## Plan

II.1. Présentation générale
II.2. Automates finis et expressions régulières
II.3. Spécification des unités lexicales
II.4. Reconnaissance des unités lexicales
II.5. Conception d'un générateur d'un analyseur lexical

## II.1. Présentation générale

L'analyseur lexical constitue la première phase d'un compilateur. Sa tâche principale est de lire les caractères d'entrée et de produire comme résultat une suite d'unités lexicales que l'analyseur syntaxique va utiliser.

```
Programme Source → [ Analyseur lexical ] → Obtenir prochaine unité lexicale → Analyseur syntaxique
                        ↑ Lire caractère
                        ↓ Rendre caractère
                    Table des symboles
                        ↑
              Passer unité lexicale et ses attributs
```

**Remarque.** L'AL est un sous-programme de l'AS. À la réception de « la prochaine unité », l'AL lit les caractères d'entrée jusqu'à ce qu'il puisse identifier la prochaine unité lexicale.

- **Unité lexicale** : produite pour un ensemble de chaînes de caractères.
- **Modèle d'une unité lexicale** : règle qui décrit une unité lexicale (expression régulière).
- **Lexème** : une suite de caractères du PS (programme source) qui concorde avec le modèle d'une unité lexicale.

| Unité Lexicale | Lexèmes | Description formelle des modèles |
| --- | --- | --- |
| const | const | const |
| if | if | if |
| oprel | `<` `<=` `=` `<>` `>` `>=` | `(<+<=+=+<>+>+>=)` |
| id | Pi, compte, D2 | `lettre(lettre+chiffre)*` |
| nb | 3, 6.780, 6.0 | `chiffre+ + chiffre+.chiffre+` |

## II.2. Automates finis et expressions régulières

Un analyseur lexical est basé sur les systèmes de transition (ou bien les automates finis).

### Diagramme de transition pour la reconnaissance de `>=`

```
Début → (0) --'>'--> (1) --'='--> ((2)) return(oprel, PGE)
                       (1) --autre--> ((3))* return(oprel, PGQ)
```

Ce diagramme fonctionne comme suit : son état de départ est l'état 0. Dans l'état 0, on lit le prochain caractère de l'entrée. On suit l'arc `>` depuis l'état 0 vers l'état 1 si le caractère d'entrée est `>`. Sinon, on n'a réussi à reconnaître ni `>` ni `>=`. En atteignant l'état 1, on lit le prochain caractère d'entrée. L'arc étiqueté `=` entre l'état 1 et l'état 2 doit être suivi si le caractère d'entrée est `=`, et le diagramme reconnaît `>=` (PGE). Autrement, l'arc étiqueté `autre` conduit à l'état 3 : le diagramme reconnaît ainsi `>` (PGQ) et recule d'un caractère dans l'entrée. On utilise une `*` pour signaler les états dans lesquels ce recul dans l'entrée doit être fait.

### Diagramme de transition pour la reconnaissance des opérateurs de relation

```
Début → (0) --'<'--> (1) --'='--> ((2)) return(oprel, PPE)
                       (1) --'>'--> ((3)) return(oprel, DIF)
                       (1) --autre--> ((4))* return(oprel, PPQ)
        (0) --'='--> ((5)) return(oprel, EGA)
        (0) --'>'--> (6) --'='--> ((7)) return(oprel, PGE)
                       (6) --autre--> ((8))* return(oprel, PGQ)
```

### Diagramme de transition pour la reconnaissance des identificateurs et des mots clés

```
Début → (0) --lettre--> (1) --lettre,chiffre--> (1)
                          (1) --autre--> ((2))* return(UnilexId(), RangerId())
```

L'action spécifiée par le symbole `*` permet de reculer d'une position sur le fichier source après la consommation d'un symbole autre qu'une lettre ou un chiffre.

### Les fonctions `RangerId()` et `UnilexId()`

- La fonction `RangerId()` examine le lexème dans la table des symboles. Si on trouve le lexème comme entrée existante, `RangerId()` rend un pointeur vers cette entrée. Si on ne le trouve pas, `RangerId()` place le lexème dans la table des symboles en tant que nouvelle entrée, avec un pointeur vers cette entrée.
- La fonction `UnilexId()` recherche le lexème dans la table des symboles. Si le lexème trouvé est un mot clé, l'unité lexicale correspondante est retournée ; autrement, l'unité lexicale `id` est retournée.

**NB.**

1. Le diagramme de transition ne change pas si on doit reconnaître de nouveaux mots clés et de nouvelles unités lexicales ; on met simplement à jour la table des symboles avec les nouvelles chaînes.
2. En pratique, la table des symboles peut être répartie sur deux tables : table des mots clés et table des identificateurs de variables.

## II.3. Spécification des unités lexicales

### Expressions régulières

Les expressions régulières sont une notation importante pour spécifier des modèles d'unités lexicales.

**Exemples.** Soit `L` l'ensemble `{A, B, …, Z, a, b, …, z}` et `C` l'ensemble `{0, 1, …, 9}` :

1. `L+C` (ou `L ∪ C`) est l'ensemble des lettres et des chiffres.
2. `LC` est l'ensemble des chaînes formées d'une lettre suivie d'un chiffre.
3. `L4` est l'ensemble des chaînes de quatre lettres.
4. `L*` est l'ensemble de toutes les lettres, y compris `ε`, la chaîne vide.
5. `L(L+C)*` est l'ensemble de toutes les chaînes de lettres et de chiffres commençant par une lettre.
6. `C+` est l'ensemble de toutes les chaînes d'au moins un chiffre (représentations décimales des entiers naturels).

### Définitions régulières

Soit `Σ` un alphabet de symboles de base ; une définition régulière est une suite de définitions de la forme :

```
d1 → r1
d2 → r2
…
dn → rn
```

Où chaque `di` est un nom distinct et chaque `ri` est une expression régulière sur les symboles de `Σ ∪ {d1, d2, …, di-1}`.

**Exemples :**

```
Lettre → A|B|…|Z|a|b|…|z
chiffre → 0|1|…|9
id → Lettre(Lettre + Chiffre)*
```

## II.4. Reconnaissance des unités lexicales

Nous utilisons les diagrammes de transition pour reconnaître des unités lexicales.

**Exemple.** Considérons le fragment de grammaire suivant :

```
Instr → si expr alors instr
      | si expr alors instr sinon instr
      | id opaff id pv
      | id opaff nb pv
expr → terme oprel terme
      | terme
terme → id | nb
```

Où `si`, `alors`, `sinon`, `oprel`, `id` et `nb` engendrent les ensembles de chaînes données par les définitions régulières suivantes :

```
si → si
alors → alors
sinon → sinon
opaff → :=
pv → ;
oprel → < | <= | = | <> | > | >=
id → lettre(lettre|chiffre)*
nb → chiffre+
```

Le mot en entrée dans le fichier source est le suivant :

```
si a1 >= b alors a1 := 10;
```

L'analyseur lexical retourne la séquence suivante d'unités lexicales avec leurs attributs :

```
si0  id1  oprel PGE  id2  alors0  id1  opaff  nb10  pv;
```

Mots clés : `si`, `alors`.

Table des identificateurs :

| N° | lexème | type |
| --- | --- | --- |
| 1 | a1 | … |
| 2 | b | … |
| 3 | … | … |

### Élimination des blancs

On suppose que les lexèmes sont séparés par une chaîne non vide de blancs, tabulations et fins de lignes. Notre analyseur lexical doit éliminer ces espaces en comparant avec la définition régulière suivante :

```
Délim → blanc | tabulation | fin de ligne
bl → délim+
```

Si l'analyseur lexical trouve une correspondance avec `bl`, il continue à rechercher l'unité lexicale qui suit le blanc et la retourne à l'analyseur syntaxique. Il ne retourne pas à l'analyseur syntaxique l'unité `bl`.

### Système de transition associé à un analyseur lexical

<!-- TODO: unclear in source — the two transition-diagram slides (états 0-14, avec actions Init(Val)/Add(Val,c)/conv(val)) are heavily garbled by OCR extraction of the diagram's node/edge layout; states and actions below are a best-effort reconstruction, verify against the original PDF pages -->

```
Début → (0) --bl,tab,\n--> (0)
        (0) --lettre--> (1) --lettre,chiffre--> (1)
                          (1) --autre--> ((2))* return(UnilexId(), RangerId())
        (0) --chiffre--> (3) --chiffre--> (3)
                          (3) --autre--> ((4))* return(nb, val)
        (0) --'<'--> (6) --'='--> ((7)) return(oprel, PPE)
                      (6) --'>'--> ((8)) return(oprel, DIF)
                      (6) --autre--> ((9))* return(oprel, PPQ)
        (0) --'='--> ((10)) return(oprel, EGA)
        (0) --'>'--> (11) --'='--> ((12)) return(oprel, PGE)
                      (11) --autre--> ((13))* return(oprel, PGQ)
        (0) --EOF--> ((14)) return(EOF, 0)
```

Version avec accumulation de la valeur du lexème (`Init(Val)`, `Add(Val, c)`, `conv(val)`) : à l'entrée dans l'état 0, `Init(Val)` initialise le tampon ; à chaque transition sur une lettre ou un chiffre, `Add(Val, c)` accumule le caractère ; à la sortie de l'état numérique, `return(nb, conv(val))` retourne la valeur convertie.

### Code C d'un analyseur lexical

<!-- TODO: unclear in source — this C pseudo-code slide is heavily reordered by the PowerPoint text extraction (case labels and their bodies are interleaved out of order); transcribed as literally as possible below, verify against the original PDF -->

```c
Unilex AnalLex() /* Unilex est une chaine si Analex retourne uniquement l'unité lexicale */
                 /* Unilex est un entier si Analex retourne l'unité lexicale et chaque unité est définie comme une constante */
                 /* Unilex est un enregistrement si Analex retourne l'unité lexicale et un attribut */
{
  While(1) {
    Switch(etat) {
      case 0:
        Init(Chaine);
        car = carsuivant();
        if (car == ' ' || car == '\t' || car == '\n') { etat = 0; debutlex++; }
        else if (car == '<') etat = 5;
        else if (car == '=') etat = 9;
        else if (car == '>') etat = 10;
        else if (isletter(car)) { Ajouter(car, chaine); etat = 1; }
        else if (isdigit(car)) { Ajouter(car, chaine); etat = 3; }
        else if (car == EOF) etat = 13;
        else Erreur();
        break;
      case 1:
        car = carsuiv();
        if (isletter(car) || isdigit(car)) ajouter(car, chaine);
        else etat = 2;
        break;
      case 2:
        Reculer(1);
        RangerId();
        return(UniLexId());
      case 3:
        car = carsuiv();
        if (isdigit(car)) ajouter(car, chaine);
        else etat = 4;
        break;
      case 4:
        Reculer(1);
        Return(NB);
      case 6:
        Return(Oprel);
      /* …………… */
      case 13:
        Return(EOF);
    }
  }
}
```

Variante retournant un enregistrement dans une variable globale `symbole` à deux champs (`UL`, `Att`) :

```c
Unilex AnalLex()
{
  While(1) {
    Switch(etat) {
      case 0:
        Init(Chaine);
        car = carsuivant();
        if (car == ' ' || car == '\t' || car == '\n') { etat = 0; debutlex++; }
        else if (car == '<') etat = 5;
        else if (car == '=') etat = 9;
        else if (car == '>') etat = 10;
        else if (isletter(car)) etat = 1;
        else if (isdigit(car)) etat = 3;
        else if (car == EOF) etat = 13;
        else Erreur();
        break;
      case 1:
        car = carsuiv();
        if (isletter(car) || isdigit(car)) ajouter(car, chaine);
        else etat = 2;
        break;
      case 2:
        Reculer(1);
        symbole.att = RangerId();
        symbole.UL = UniLexId();
        Return(Symbole);
      /* …………. */
      case 3:
        car = carsuiv();
        if (isdigit(car)) ajouter(car, chaine);
        else etat = 4;
        break;
      case 4:
        Reculer(1);
        symbole.UL = NB;
        symbole.Att = toupper(chaine));
        Return(symbole);
      case 6:
        symbole.UL = Oprel;
        symbole.att = PPE;
        Return(symbole);
      /* …………… */
      case 13:
        symbole.UL = EOF;
        symbole.att = 0;
        Return(symbole);
    }
  }
}
/* On peut retourner des symboles numériques. */
```

### Code C d'un analyseur lexical qui élimine les espaces et collecte les nombres

```c
#include <stdio.h>
#include <ctype.h>
Int NumLigne = 1;
Int Vallex = RIEN;

Int AnalLex() {
  int T;
  While(1) {
    T = getchar();
    if (T == ' ' || T == '\t') ;
    else if (T == '\n') NumLigne++;
    else if (isdigit(T)) {
      Vallex = T - '0';
      T = getchar();
      While (isdigit(T)) {
        ValLex = ValLex*10 + T - '0';
        T = getchar();
      }
      ungetc(T, stdin);
      return NB;
    }
    else { ValLex = RIEN; Return T; }
  }
}
```

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/compilation-ch2-1-analyse-lexicale.pdf" />

</TabItem>
</Tabs>
