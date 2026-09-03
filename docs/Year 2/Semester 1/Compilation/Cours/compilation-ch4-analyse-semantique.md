---
sidebar_position: 5
title: "Chapitre 4 : Analyse sémantique et contrôle de type"
sidebar_label: Ch4 - Analyse sémantique
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# IV. Analyse sémantique et contrôle de type

*Cours Techniques de Compilation 2023-2024 — Hatem Aouadi*

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments) — best-effort reconstruction below, see task summary -->

## Plan

IV.1. Présentation Générale
IV.2. Règles sémantiques
IV.3. Expressions de type
IV.4. Spécification d'un contrôleur de type

## IV.1. Présentation Générale

Contrairement à la syntaxe, la sémantique est mal formalisée. Elle s'exprime au moyen de textes décrivant le sens et les règles d'écriture d'instructions. On distingue :

- **La sémantique statique**, contrôlée au moment de la compilation, comme :
  - Le contrôle de type
  - Le contrôle de flot d'exécution
  - Le contrôle d'unicité (un objet doit être déclaré une seule fois)
- **La sémantique dynamique**, contrôlée au moment de l'exécution, comme :
  - Division par 0
  - Boucle infinie
  - Accès à un emplacement mémoire non autorisé

## IV.2. Règles sémantiques

1) On définit l'ensemble des types utilisés : entier, réel, caractère, booléen et `erreur_de_type`. L'enregistrement du type d'un identificateur dans la table des symboles s'effectue par l'analyseur sémantique. Si une variable utilisée n'a pas été déclarée, alors on insère le type associé `erreur_de_type`.

2) On définit quelques règles de compatibilité. Par exemple, on ne peut affecter qu'un entier à un entier ou un entier à un réel.

3) On ne doit pas utiliser une variable non déclarée dans une expression ou une instruction. Autrement, l'expression, respectivement l'instruction, admettra comme type `erreur_de_type`.

## IV.3. Les expressions de type

1) Les types de base sont : booléen, entier, caractère, réel, Erreur de type.

2) Un nom de type est une expression de type.

3) Les constructeurs de type :

**Les tableaux.** Si `T` est une expression de type, alors `Tableau(I, T)` est une expression de type (e.t) qui dénote le type d'un tableau dont les éléments sont de type `T` et l'ensemble des indices est `I`.

Exemple :

```
Var A: array[1..10] of integer
```

L'expression de type associée est : `Tableau(1..10, integer)`.

**Le produit.** Si `T1` et `T2` sont des e.t alors `T1 x T2` est une e.t.

**Les enregistrements.**

```
TYPE Lign = record
  adresse : integer;
  lexème : array[1..15] of char;
end
```

`Lign.type = structure((adresse x integer), (lexème x Tableau(1..15, char)))`

```
Var Table : array[1..100] of Lign;
```

`Table.type = Tableau(1..100, Lign.type)`

Si `T1, T2, …, Tn` sont des e.t alors `Structure(T1, T2, … Tn)` est une e.t qui définit un enregistrement à n champs.

**Les pointeurs.** Si `T` est une expression de type, alors `pointeur(T)` est une expression de type définissant un pointeur vers un objet de type `T`.

**Les fonctions.** `f` définie du domaine `D` vers le codomaine `A` admet comme type `(D.type → A.type)`.

Exemple :

```
fonction f(a, b: char) : ^char;
```

`f.type = (char x char → pointeur(char))`

Si `T1` est une e.t et `T2` est une e.t, alors `(T1 → T2)` est une e.t qui dénote une fonction avec un domaine défini par `T1` et un codomaine défini par `T2`.

## IV.4. Spécification d'un contrôleur de type

```
Prog → DCL;EXP
DCL  → DCL ; DCL
DCL  → id : T {ajouter_type(id.entrée, T.type)}
T → caractère {T.type := caractère}
T → entier {T.type := entier}
T → tableau[nb] de T1 {T.type := tableau(1..nb.val, T1.type)}
T → ^T1 {T.type := pointeur(T1.type)}
E → littéral {E.type := caractère}
E → nb {E.type := entier}
E → id {E.type := chercher_type(id.entrée)}
E → E1 mod E2 {E.type := Si E1.type = entier et E2.type = entier alors entier sinon erreur_de_type}
E → E1[E2] {E.type := si E2.type = entier et E1.type = tableau(s, T) alors T sinon erreur_de_type}
```

Extrait pour un pseudo-code de contrôle (`E(t)`) :

```
E → nb {E.type := entier}
E → id {E.type := chercher_type(id.entrée)}

E(t)
  Si Symbole.UL = nb alors t := entier
  Sinon Si Symbole.UL = id alors t := chercher_type(Symbole.Att)
  ……
```

**Rq.** Il faut enlever la récursivité à gauche et l'ambiguïté si elle existe.

## IV.5. Contrôle de type des instructions

```
I → id := E {I.type := Si compatible(chercher_type(id.entrée), E.type) alors vide sinon erreur_de_type}
I → si E alors I1 {I.type := si E.type = booléen alors I1.type sinon erreur_de_type}
```

Pseudo-code associé :

```
Procédure I (t1)
Début
  Si symbole.UL = id alors
    NUM = symbole.Att
    accepter(id); accepter(:=); E(t);
    Si compatible(table[NUM].type, t) alors t1 = vide
    sinon t1 = erreur_de_type; ecrire(Instruction erronées, lign, col);
  /* cas du si alors …… */
Fin
```

### Exemple

Considérons le langage généré par la grammaire suivante :

```
P → D debut I fin
D → Var id : T; D {ajouter_type(id.entrée, T.type)}
D → Var id : T; {ajouter_type(id.entrée, T.type)}
T → entier {T.type := entier}
T → reel {T.type := reel}
I → id := E; I | id := E; {Si compatible(chercher_type(id.entrée), E.type) alors vide sinon erreur_de_type}
E → id {E.type := chercher_type(id.entrée)}
E → nb {E.type := entier}
E → nbr {E.type := reel}
```

Analysons le programme suivant :

```
Var a : entier;
Var b : reel;
debut
  b := 2.23;
  a := b;
fin
```

Mots clés : `debut`, `var`, `fin`.

Arbre annoté (extraits) :

```
P
├── D
│   ├── Var id : T ;   D
│   │        entier
│   └── Var id : T ;
│            réel
├── debut
├── I
│   ├── id := E ;   I
│   │        nbr → E.t := reel   →   I.t := vide
│   └── id := E ;
│            id → E.t := reel   →   I.t := erreur_de_type
└── fin
```

Table des identificateurs :

| N° | lexème | type |
| --- | --- | --- |
| 1 | a | entier |
| 2 | b | reel |
| 3 | … | … |

`b := 2.23;` est correcte (`I.t := vide`, réel affecté à réel). `a := b;` produit `I.t := erreur_de_type` (affectation d'un réel à un entier, non compatible dans cette grammaire simplifiée).

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/compilation-ch4-analyse-semantique.pdf" />

</TabItem>
</Tabs>
