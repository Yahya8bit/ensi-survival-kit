---
sidebar_position: 1
title: "Résumé Ch1 : Rappels syntaxiques"
sidebar_label: Résumé Ch1 - Syntaxe
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Résumé Ch1 : Structure générale d'un algorithme

*Notes manuscrites personnelles (résumé/aide-mémoire), non un support de cours officiel. Voir l'onglet PDF pour l'original si un passage semble ambigu.*

## Structure d'un algorithme

```
Algorithme <nom de l'algorithme>
CONST
    nom_de_la_const = valeur
TYPE
    Tab ou struct
VAR
    nom_var : Type_var.
FONC
    nom_des_FONC
PROC
    nom_des_Proc
DEBUT
    <Corps>
FIN.
```

**Boucle Pour :**
```
Pour <compteur> de <initial> à <finale> pas <pas> faire
    <Trait>
FinPour
```

**Boucle Selon :**
```
Selon <N>
    <N1> : <Trait>
    <N2> : <Trait>
      ⋮
    <Nn> : <Trait>
    Sinon : <Trait>
FinSelon
```

**Type Tableau :**
```
<NomType> = tableau [a1..a2] de <Type de base>
```

**Type intervalle :**
```
type nom_intervalle = borne_inf..borne_sup
```

## Les enregistrements

```
<Nom_type> = Struct
    <champ1> : <Type1>
      ⋮
    <champn> : <Typen>
FinStruct.
```

- Accès : `<id_var>:<NomTypeStruct>` puis `<id_var>.<nom_champ>`
- Tableau de struct : `Tab : Tableau[1..Max] de <nom_TypeStruct>`

## Procédures

```
Procédure <Nom procédure>(<par1>:<Type1>, ...)
Var
    <variables locales>
Début
    <Traitement>
Fin
```

Appel : `<nom_procédure>(<par1>, <par2>, ..., <parn>)`

*Remarque : `Var <parn>:<Type n>` (passage par variable) sert à changer le contenu de `<parn>` dans la procédure appelante.*

## Fonctions

```
Fonction <Nom_Fct>(<par1>:<Type1>, ...) : <Type retour>
Var
    <variables locales>
Début
    <Traitement>
    <Nom fonction> ← <variable>     (ou : retourner(...))
Fin
```

Appel : `var ← Nom_Fct(<par1>, <par2>, ...)` — les paramètres passés à l'appel sont les **paramètres effectifs**, ceux de la déclaration les **paramètres formels**.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/asd-resume-pseudocode.pdf" />

</TabItem>
</Tabs>
