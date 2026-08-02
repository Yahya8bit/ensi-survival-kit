---
sidebar_position: 6
title: "Résumé Ch9 : Les files"
sidebar_label: Résumé Ch9 - Files
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Résumé Ch9 : File (F.I.F.O)

*Notes manuscrites personnelles (résumé/aide-mémoire), non un support de cours officiel. Voir l'onglet PDF pour l'original si un passage semble ambigu.*

## 1. Opérations autorisées

- `Est_vide` : tester si la file est vide
- `Enfiler` : insérer un élément en queue
- `Défiler` : supprimer le premier élément de la file
- `Premier` : accès à la tête

## 2. Pré-conditions

- `Défiler(F)` défini ssi `Est_vide(F)=faux`
- `Premier(F)` défini ssi `Est_vide(F)=faux`

## 3. Représentation des files

**a. Représentation contiguë** *(il faut connaître la tête et la queue)* :
```
File = struct
    FA : tableau[1..Max] d'élt
    t : entier ou 0..Max
    q : entier ou 0..Max
Finstruct.
```

**b. Représentation chaînée :**
```
Cellule = struct
    Val : Element
    Suiv : ^cellule
Finstruct

File = struct
    T,Q : ^cellule
Finstruct.
```

*Ou bien : on peut utiliser une liste circulaire pour représenter une file. Dans ce cas on utilise un seul pointeur.*

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/asd-resume-pseudocode.pdf" />

</TabItem>
</Tabs>
