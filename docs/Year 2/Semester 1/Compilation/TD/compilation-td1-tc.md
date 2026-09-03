---
sidebar_position: 1
title: "TD1 : Techniques de Compilation"
sidebar_label: TD1
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD1 : Techniques de Compilation

*ENSI — Techniques de Compilation — 2023-2024*

## Problème

Soit la grammaire suivante qui génère des programmes particuliers :

```
P → let id DCL Début L_I Fin.
DCL → Var L_id : booléen ;
L_id → id | id, L_id
L_I → I | I L_I
I → si B alors L_I sinon L_I | si B alors L_I | id := E ;
B → E opr E | non B | B et B | B ou B
E → nb | id | E opa E | (E)
```

(`opa` pour "les opérateurs arithmétiques `+`, `*`, `/`, `-`", `opr` pour les opérateurs relationnels `>`, `<`, `=`)

1) Donner l'ensemble des unités lexicales de la grammaire.

2) Donner le résultat de l'analyse lexicale pour le mot suivant :

```
Let test
Var a : booléen ;
Debut
  si b>10 alors
    si a>b alors a :=b ;
    sinon a :=0 ;
Fin.
```

3) Préparer la grammaire pour pouvoir développer un analyseur syntaxique prédictif descendant récursif.

4) Donner un analyseur syntaxique prédictif descendant récursif (un pseudo-code).

5) Introduire, dans la grammaire, les règles sémantiques nécessaires (définition dirigée par la syntaxe — DDS).

6) Spécifier, par l'arbre, le contrôle effectué sur le code donné en (2) et indiquer l'erreur.

7) Traduire, en code pour machine abstraite à pile, le mot donné en (2) après avoir corrigé l'erreur sémantique. Montrer aussi la table des identificateurs.

8) Donner un traducteur en code pour machine abstraite à pile.

<!-- TODO: no separate correction was found for this TD alongside the statement in the source Drive folder — only the statement PDF is transcribed here. -->

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/compilation-td1-tc.pdf" />

</TabItem>
</Tabs>
