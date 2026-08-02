---
sidebar_position: 8
title: "Résumé Ch11 : Les arbres binaires de recherche (ABR)"
sidebar_label: Résumé Ch11 - ABR
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Résumé Ch11 : Les arbres binaires de recherche (ABR)

*Notes manuscrites personnelles (résumé/aide-mémoire), non un support de cours officiel. Voir l'onglet PDF pour l'original si un passage semble ambigu, en particulier la procédure `Coupe` (écriture dense).*

**Définition :** tel que $\forall$ noeud $v$ :
- les éléments de tous les noeuds du sous-arbre gauche de $v$ sont inférieurs ou égaux à l'élément contenu dans $v$ ;
- les éléments de tous les noeuds du sous-arbre droit de $v$ sont supérieurs à l'élément contenu dans $v$.

→ recherche et tri efficaces.

## 1. Recherche

```
Fct Recherche(Don X: Elt, A: Arbre) : booléen
Début
    Si A=Nil alors Recherche ← faux
    Sinon si X=A^.val alors Recherche ← vrai
    Sinon si X<A^.val alors Recherche ← Recherche(X, g(A))
    Sinon Recherche ← Recherche(X, d(A))
    Finsi
Fin.
```

## 2. Adjonction aux feuilles

*Principe : on compare l'élément au contenu de la racine pour savoir si l'ajout se fait au sous-arbre gauche ou au sous-arbre droit.*

**Récursif :**
```
Procédure Ajoute(Don X: Elt, Don/Res A: Arbre)
Début
    si A=Nil alors
        Créer(A)
        A^.val ← X
        A^.g ← Nil
        A^.d ← Nil
    Sinon
        si X<=A^.val alors Ajoute(X, A^.g)
        sinon Ajoute(X, A^.d)
    Fsi
Fin.
```

## 3. Adjonction à la racine

*Il faut tout d'abord faire la « coupe » (split) avant l'ajout.*

```
Proc Coupe(Don X: Elt, Don/Res A: Arbre, G,D: Arbre)
Début
    si A=Nil alors
        G ← Nil
        D ← Nil
    Sinon
        si A^.val > X alors
            D ← A
            Coupe(X, A^.g, G, D^.g)
        Sinon
            G ← A
            Coupe(X, A^.d, G^.d, D)
        Fsi
    Fnsi
Fin

Proc AjouterRac(Don X: Elt, Don/Res A: Arbre)
Var
    r : Arbre
Début
    Créer(r)
    r^.val ← X
    Coupe(X, A, r^.g, r^.d)
    A ← r
Fin
```

<!-- TODO: unclear in source, verify against original scanned notebook (page 8) — the `Coupe` procedure's recursive calls (`Coupe(X, A^.g, G, D^.g)` and `Coupe(X, A^.d, G^.d, D)`) are transcribed as written, but the "D^.g"/"G^.d" argument forms are unusual for a Don/Res parameter and may reflect compressed handwriting rather than the literal intended call; cross-check against the PDF before relying on this exact form. -->

## 4. Suppression d'un élément

```
Proc Supmax(Res Max: Elt, Don/Res A: Arbre)
Var
    q : Arbre
Début
    Si A^.d = Nil alors
        q ← A
        Max ← A^.val
        A ← A^.g
        Libérer(q)
    Sinon
        Supmax(Max, A^.d)
    Fsi
Fin.
```

```
Proc SupprimerArb(Don X: Elt, Don/Res A: Arbre)
Var
    Max : Elt
Début
    Si A<>Nil alors
        Si X<A^.val alors
            SupprimerArb(X, A^.g)
        Sinon si X>A^.val alors
            SupprimerArb(X, A^.d)
        Sinon
            si A^.d=Nil alors
                A ← A^.g
            Sinon si A^.g=Nil alors
                A ← A^.d
            Sinon
                Supmax(Max, A^.g)
                A^.val ← Max
            Finsi
        Finsi
    Finsi
Fin.
```

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/asd-resume-pseudocode.pdf" />

</TabItem>
</Tabs>
