---
sidebar_position: 3
title: "Résumé Ch4 : Allocation dynamique / Pointeurs"
sidebar_label: Résumé Ch4 - Pointeurs
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Résumé Ch4 : Les pointeurs

*Notes manuscrites personnelles (résumé/aide-mémoire), non un support de cours officiel. Voir l'onglet PDF pour l'original si un passage semble ambigu.*

- **Déclaration :** `id_var_pointeur : ^type_de_base`
- **Réservation de la mémoire :** `allouer(id_var_pointeur)`
- **Accès à la variable pointée :** `id_var_pointeur^`
- **Libération de la mémoire :** `Libérer(id_var_pointeur)`

*Remarque : le pointeur particulier `Nil` indique l'absence d'adresse.*

## Pointeurs et tableaux

```
l : ^Tab
allouer(l)
l^[i]        ⟶ ième case
```

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/asd-resume-pseudocode.pdf" />

</TabItem>
</Tabs>
