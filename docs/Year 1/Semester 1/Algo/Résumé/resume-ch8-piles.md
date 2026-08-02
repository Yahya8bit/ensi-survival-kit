---
sidebar_position: 5
title: "Résumé Ch8 : Les piles"
sidebar_label: Résumé Ch8 - Piles
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Résumé Ch8 : Pile (LIFO)

*Notes manuscrites personnelles (résumé/aide-mémoire), non un support de cours officiel. Voir l'onglet PDF pour l'original si un passage semble ambigu.*

## 1. Opérations autorisées

- `Est_Vide(P)` : tester si une pile est vide ou non
- `Empiler(P,e)` : insérer au sommet un élément
- `Dépiler(P,e)` : retirer l'élément qui se trouve au sommet
- `Sommet(P,e)` : retourner l'élément qui vient d'être inséré

## 2. Pré-conditions

- `Dépiler(l)` défini ssi `Est_vide(l)=faux`
- `Sommet(l)` défini ssi `Est_vide(l)=faux`

## 3. Représentation des piles

**a. Représentation contiguë :**
```
Pile = Struct
    taille : entier
    Tab : tableau[1..Max] d'élt.
Finstruct.
```

**b. Représentation chaînée :**
```
Cellule = struct
    val : Elt
    Suiv : ^cellule
Finstruct
Pile = ^cellule
```

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/asd-resume-pseudocode.pdf" />

</TabItem>
</Tabs>
