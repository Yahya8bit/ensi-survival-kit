---
sidebar_position: 4
title: "Résumé Ch7 : Les listes"
sidebar_label: Résumé Ch7 - Listes
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Résumé Ch7 : Les listes

*Notes manuscrites personnelles (résumé/aide-mémoire), non un support de cours officiel. Voir l'onglet PDF pour l'original si un passage semble ambigu.*

## Représentation chaînée

```
noeud = struct
    Val : Element
    Suiv : ^noeud
Finstruct
ListCh = ^noeud
```

*Remarque : la liste vide est représentée par le pointeur `Nil`. Si `l ≠ liste vide`, alors `l` contient l'adresse de la tête de la liste.*

**Usage d'un pointeur :**
- Déclaration : `<pointeur_nom> : ListCh`
- Liaison : `<pointeur_nom>^.Suiv ← @cible`

**Liste circulaire :** dans la dernière place de la liste, on remplace le pointeur `Nil` par un pointeur vers la tête de la liste → utile pour les files.

## Liste doublement chaînée

*Principe : chaque place de cette liste contient un pointeur vers la place suivante et un pointeur vers la place précédente.*

```
LD = struct
    First : ^Noeud
    Last : ^Noeud
Finstruct

Noeud = struct
    Pred : ^Noeud
    Suiv : ^Noeud
Finstruct.
```

<!-- TODO: unclear in source — the "Noeud" struct on this page shows only Pred/Suiv fields, with no explicit Val field visible in the handwritten notes. Transcribed exactly as written rather than adding a field that isn't there; likely an omission by the note-taker (a value field would normally also be present), but not corrected here per fidelity rules. -->

*Remarque : la première case est précédée par `Nil`.*

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/asd-resume-pseudocode.pdf" />

</TabItem>
</Tabs>
