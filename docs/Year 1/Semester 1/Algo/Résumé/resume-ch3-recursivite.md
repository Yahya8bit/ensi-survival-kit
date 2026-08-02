---
sidebar_position: 2
title: "Résumé Ch3 : Récursivité"
sidebar_label: Résumé Ch3 - Récursivité
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Résumé Ch3 : Récursivité

*Notes manuscrites personnelles (résumé/aide-mémoire), non un support de cours officiel. Voir l'onglet PDF pour l'original si un passage semble ambigu.*

## Récursivité directe

```
Module A()
DEBUT
    ...
    A()
    ...
FIN
```

## Récursivité indirecte

```
Module A()               Module B()
DEBUT                    DEBUT
    ...                      ...
    B()                      A()
    ...                      ...
FIN                       FIN.
```

## Structure générale d'un module récursif

```
Module A()
DEBUT
    si <cdtn d'arrêt> alors
        <cas particulier (base de la récursivité)>
    sinon
        retourner(A(...))
    Finsi
Fin.
```

## Fonctions prédéfinies sur les chaînes

- `Pos(chaine, souschaine)` : -1 si n'existe pas
- `Efface(ch, position_départ, longueur)`
- `Longueur(chaine)`
- `Concat(ch1, ch2)`
- `Majuscule(chaine)`, `minuscule(chaine)`
- `Inserer(chaine, souschaine, position)`
- `Souschaine(chaine, position, longueur)`

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/asd-resume-pseudocode.pdf" />

</TabItem>
</Tabs>
