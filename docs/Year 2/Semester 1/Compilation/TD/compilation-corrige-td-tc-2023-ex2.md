---
sidebar_position: 5
title: "TD Techniques de Compilation — Exercice 2 (Corrigé, 2023)"
sidebar_label: TD Ex2 (Corrigé 2023)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Exercice 2 (Corrigé)

*Correction : Leila Ben Ayed — ENSI, Tunisie*

## Énoncé

Soit la grammaire suivante qui génère des instructions d'affectation ou conditionnelles :

```
I → si B alors I sinon I | id := E;
B → E opr E | non B | B et B | B ou B
E → nb | id | E opa E | (E)
```

(`opa` pour "les opérateurs arithmétiques `+`, `*`, `/`, `-`", `opr` pour les opérateurs relationnels `>`, `<`, `=`)

1) Définir toutes les unités lexicales de la grammaire fournie.

2) Donner le résultat de l'analyseur lexical pour le mot suivant :

```
si b>10 alors si a>b alors a :=b sinon b:=0; sinon a :=0;
```

3) Analyser syntaxiquement le mot suivant : `si b>10 alors si a>b alors a :=b; sinon b:=0; sinon a :=0 ;`. Donner une dérivation et l'arbre d'analyse.

4) Donner un analyseur sémantique en augmentant la grammaire par des règles sémantiques.

5) Traduire, en code pour machine abstraite à pile, le mot traité en 3).

6) Donner un traducteur en code pour machine abstraite à pile (un schéma de traduction ou bien une Définition Dirigée par la Syntaxe). Donner un code C pour le traducteur.

<details>
<summary>Correction</summary>

### 1) Unités lexicales

```
UL = {si, alors, sinon, id, :=, ;, opr, non, et, ou, nb, opa, (, )}
```

### 2) Résultat de l'analyse lexicale

Pour `si b>10 alors si a>b alors a :=b; sinon b:= 0; sinon a :=0 ;` :

| # | lexème | Unité lexicale |
| --- | --- | --- |
| 1 | si | Si |
| 2 | b | Id |
| 3 | > | Opr |
| 4 | 10 | Nb |
| 5 | alors | Alors |
| 6 | si | Si |
| 7 | a | id |
| 8 | > | Opr |
| 9 | b | Id |
| 10 | alors | Alors |
| 11 | a | Id |
| 12 | := | := |
| 13 | b | Id |
| 14 | ; | ; |
| 15 | sinon | sinon |
| 16 | b | Id |
| 17 | := | := |
| 18 | 0 | Nb |
| 19 | ; | ; |
| 20 | sinon | Sinon |
| 21 | a | Id |
| 22 | := | := |
| 23 | 0 | Nb |
| 24 | ; | ; |

### 3) Analyse syntaxique — dérivation et arbre

Nous dérivons la séquence d'unités lexicales correspondante :

```
I ⇒ si B alors I sinon I
  ⇒ si E opr E alors I sinon I
  ⇒ si id opr E alors I sinon I
  ⇒ si id opr nb alors I sinon I
  ⇒ si id opr nb alors si B alors I sinon I sinon I
  ⇒ si id opr nb alors si E opr E alors I sinon I sinon I
  ⇒ si id opr nb alors si id opr E alors I sinon I sinon I
  ⇒ si id opr nb alors si id opr id alors I sinon I sinon I
  ⇒ si id opr nb alors si id opr id alors id := E; sinon I sinon I
  ⇒ si id opr nb alors si id opr id alors id := id; sinon I sinon I
  ⇒ si id opr nb alors si id opr id alors id := id; sinon id:= E; sinon I
  ⇒ si id opr nb alors si id opr id alors id := E; sinon id := nb; sinon I
  ⇒ si id opr nb alors si id opr id alors id := E; sinon id := nb; sinon id := E;
  ⇒ si id opr nb alors si id opr id alors id := E; sinon id := nb; sinon id := nb;
```

Arbre d'analyse :

```
I
├── si
├── B
│   └── E opr E
│       ├── id
│       └── nb
├── alors
├── I
│   ├── si
│   ├── B
│   │   └── E opr E
│   │       ├── id
│   │       └── id
│   ├── alors
│   ├── I
│   │   └── id := E ;
│   │       └── id
│   ├── sinon
│   └── I
│       └── id := E ;
│           └── nb
├── sinon
└── I
    └── id := E ;
        └── nb
```

### 4) Analyseur sémantique — grammaire augmentée par des règles sémantiques

```
I → si B alors I1 sinon I2
    {I.type := si B.type = booleen alors si I1.type = vide alors I2.type sinon erreur_de_type sinon erreur_de_type}

I → id {var := symbole.Att} := E;
    {I.type := si compatible(var.type, E.type) alors vide sinon erreur_de_type}

B → E1 opr E2
    {B.type := si E1.type != erreur_de_type et E2.type != erreur_de_type alors booléen sinon erreur_de_type}
    /* ici nous supposons qu'on peut tout comparer, pas uniquement des numériques.
       Une variable non déclarée a pour type erreur_de_type */

B → non B1 {B.type := B1.type}
B → B1 et B2 {B.type := si B1.type = booléen et B2.type = booléen alors booléen sinon erreur_de_type}
B → B1 ou B2 {B.type := si B1.type = booléen et B2.type = booléen alors booléen sinon erreur_de_type}

E → nb {E.type := entier}
E → id {var := symbole.Att} {E.type := var.type}
E → E1 opa E2
    {E.type := si E1.type = E2.type = entier alors entier
               sinon si (E1.type = entier et E2.type = réel) ou (E1.type = réel et E2.type = entier) ou (E1.type = E2.type = réel)
               alors réel
               sinon erreur_de_type}
E → (E)
```

### 5) Traduction en code pour machine abstraite à pile

Pour `si b>10 alors si a>b alors a :=b; sinon b:=0; sinon a :=0 ;` :

```
Valeur_d b
Empiler 10
Comparer si Sup
Aller si faux sinon
  Valeur_d a
  Valeur_d b
  Comparer si sup
  Aller si faux sinon1
    Valeur_g a
    Valeur_d b
    :=
  Aller à sortie1
  Etiq sinon1
    Valeur_g b
    Empiler 0
    :=
  Etiq sortie1
Aller à Sortie
Etiq sinon
  Valeur_g a
  Empiler 0
  :=
Etiq sortie
```

<!-- TODO: unclear in source — the exact ordering/nesting of the stack-machine instructions above is reconstructed from a heavily reordered OCR extraction of the slide; the individual instructions themselves (Valeur_d, Comparer si Sup, Aller si faux, Valeur_g, :=, Etiq, Aller à) are transcribed faithfully but their precise line order should be verified against the original PDF. -->

### 6) Traducteur (schéma de traduction / DDS)

```
I → si {sortie := créer_étiquette; sinon := créer_étiquette}
    B {Emettre(aller si faux sinon)}
    alors I1 {Emettre(aller à sortie)}
    sinon {Emettre(etiq sinon)}
    I2 {Emettre(etiq_sortie)}

I → id {var := symbole.Att; Emettre(valeur_g var)} := E; {Emettre(:=)}

B → E1 opr {var = symbole.Att} E2 {Emettre(var)}
B → non B1 {Emettre(non)}
B → B1 et B2 {Emettre(et)}
B → B1 ou B2 {Emettre(ou)}

E → nb {var = symbole.Att; Emettre(empiler var)}
E → id {var = symbole.Att; Emettre(valeur_d var)}
E → E1 opa {var := symbole.Att} E2
E → (E)
```

Le code C du traducteur est à compléter par l'étudiant (voir le support numérique du cours TC pour un exemple).

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/compilation-corrige-td-tc-2023-ex2.pdf" />

</TabItem>
</Tabs>
