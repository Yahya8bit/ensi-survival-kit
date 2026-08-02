---
sidebar_position: 7
title: "Résumé Ch10 : Les arbres binaires"
sidebar_label: Résumé Ch10 - Arbres binaires
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Résumé Ch10 : Les arbres binaires

*Notes manuscrites personnelles (résumé/aide-mémoire), non un support de cours officiel. Voir l'onglet PDF pour l'original si un passage semble ambigu, en particulier la partie « implémentations itératives DFS » (écriture dense).*

## 1. Vocabulaire

- **Racine :** noeud de niveau zéro (n'a pas de père).
- **Noeud :** racine (ou sommet) de tout sous-arbre. Chaque noeud a 0 ou plusieurs fils.
- **Feuille :** un noeud qui n'a pas de fils.
- **Fils :** $x$ est fils de $y$ si $x$ est la racine d'un sous-arbre de $y$.
- **Père :** $x$ est le père de $y$ si $y$ est un fils de $x$.
- **Frère :** deux noeuds sont frères s'ils ont le même père.
- **Ascendants :** $A$ est ascendant de $B$ si $A$ est le père de $B$ ou un ascendant du père de $B$.
- **Descendants :** $X$ est descendant de $Y$ si $X$ est un fils de $Y$ ou un descendant d'un fils de $Y$.
- **Branche :** tout chemin de la racine à une feuille de l'arbre.
- **Hauteur (ou profondeur, ou niveau) d'un noeud :** pour $x$ un noeud d'un arbre $B$,
  $$
  h(x) = \begin{cases} 0 & \text{si } x \text{ est la racine de } B \\ 1+h(y) & \text{si } y \text{ est le père de } x \end{cases}
  $$

## 2. Arbre binaire (type)

- Soit vide, noté $\varnothing$
- Soit sous forme $B = \langle o, B_1, B_2 \rangle$, où :
  - $B_1$ : sous-arbre gauche de la racine de $B$
  - $B_2$ : sous-arbre droit de $B$
  - $o$ : un noeud, appelé racine

## 3. Opérations sur un arbre binaire

- `Arbre-vide : → Arbre` : crée un arbre vide.
- `<-,-,-> : Noeud × Arbre × Arbre → Arbre` : crée un nouvel arbre binaire avec le noeud comme racine et les deux arbres comme sous-arbres gauche et droit.
- `g : Arbre → Arbre` : prend un arbre et rend le sous-arbre gauche de cet arbre.
- `d : Arbre → Arbre` : idem pour le sous-arbre droit.
- `Contenu : Noeud → Elément` : prend un noeud et retourne l'élément contenu dans ce noeud.

**4. Conditions :**
- `racine(Bx)` défini ssi $B_x \ne$ Arbre_vide.
- `g(Bx)` défini ssi $B_x \ne$ Arbre_vide.
- `d(Bx)` défini ssi $B_x \ne$ Arbre_vide.

**5. Résumé :**
$$
\text{racine}(\langle o,B_1,B_2\rangle) = o \qquad g(\langle o,B_1,B_2\rangle) = B_1 \qquad d(\langle o,B_1,B_2\rangle) = B_2
$$

**6. Mesures :**
$$
\begin{cases} \text{taille(arbre\_vide)} = 0 \\ \text{taille}(\langle o,B_1,B_2\rangle) = 1+\text{taille}(B_1)+\text{taille}(B_2) \end{cases}
$$
*(la taille d'un arbre est le nombre de ses noeuds)*

Hauteur ou profondeur d'un arbre $B$ : $h(B) = \max\{h(x) \mid x \text{ noeud de } B\}$.

**7. Arbres binaires particuliers :**
- **Dégénéré ou filiforme :** tous ses noeuds ont au maximum un seul fils.
- **Complet :** contient $2^h$ noeuds au niveau $h$ (1 au niveau 0 ; 2 au niveau 1 ; ...).
- **Parfait :** tous les niveaux sont remplis sauf le dernier, et dans ce cas les feuilles du dernier niveau sont groupées à gauche.

## 8. Représentation chaînée d'un arbre

```
Noeud = Struct
    Val : Elément
    g,d : ^Noeud
Finstruct
Type Arbre = ^Noeud
```

- `A = nil` ⟺ `A = arbre_vide`
- `A^.val` ⟺ `contenu(racine(A))`
- `A^.g` ⟺ `g(A)` , `A^.d` ⟺ `d(A)`

## 9. Représentation contiguë

*Contrainte : le nombre de noeuds de l'arbre est limité et ne doit pas dépasser une valeur `Max`.*

**Représentation indicée :** à chaque noeud de l'arbre on associe une valeur ainsi que les indices des deux fils gauche et droite.

*Convention : indice `0` = absence de noeud (nil).*

```
Noeud = struct
    Val : Elément
    g,d : 0..Max
Finstruct
Type ArbTab = tableau[1..Max] de Noeud
Arbre = struct
    Rac : 0..Max
    T : ArbTab
Finstruct
```

- `A.Rac=0` ⟺ `A = arbre_vide`.
- `A.Rac=r` et `r>0` ⟺ arbre non vide.
- `A.T[r] = racine(A)`, `A.T[r].val = contenu(racine(A))`.
- `A.T[r].g` et `A.T[r].d` sont les indices de `g(A)` et `d(A)`.

**Représentation séquentielle** *(pour un arbre presque complet, sans passer par des indices explicites)* :

Convention — si un noeud est numéroté $x$ :
- fils gauche : $2x$
- fils droit : $2x+1$

## 10. Parcours d'un arbre binaire

**Parcours en largeur (BFS) :** on essaie toujours de visiter le noeud le plus proche de la racine qui n'a pas encore été visité — on va d'abord visiter la racine, puis tous les noeuds à la profondeur 1, puis 2, etc.

**Implémentation itérative (BFS) :**
```
F : File     q : Arbre
A : Arbre
Enfiler(F,A)
Tant que Non vide(F) faire
    Défiler(F,q)
    Ecrire(q^.val)
    si (g(q) ≠ nil) alors
        Enfiler(F, g(q))
    Fsi
    si (d(q) ≠ nil) alors
        Enfiler(F, d(q))
    Finsi
FinTq.
```

**Parcours en profondeur (DFS) — main gauche :** ce chemin part à gauche de la racine et va toujours le plus profond possible à gauche. Il existe 3 ordres classiques d'exploration :

1. **Ordre préfixe :** père, fils gauche, fils droit.
2. **Ordre infixe :** fils gauche, noeud (entre ses deux enfants), fils droit.
3. **Ordre postfixe :** fils gauche, fils droit, père.

### Implémentation du parcours préfixe

**Version récursive :**
```
Proc P.Pref(Don A: Arbre)
Début
    Si (A <> Arbre_vide) alors
        Ecrire(A^.val)
        P.Pref(g(A))
        P.Pref(d(A))
    Finsi
Fin.
```

**Version itérative 1 (par pile explicite) :**
```
Cellule = struct
    Val : Arbre
    Suiv : ^cellule
Finstruct
Pile = ^cellule

Procédure P.Prefixe(Don A: Arbre)
Var
    l : Pile
Début
    Pile-vide(l)
    Tq (A<>Nil) ou (non Est_vide(l)) faire
        Tq (A<>Nil) faire
            Ecrire(A^.val)
            Empiler(l,A)
            A ← g(A)
        FTq
        Dépiler(l,A)
        A ← d(A)
    FTq
Fin
```

**Version itérative 2 :**
```
Proc P.Prefixe(Don A: Arbre)
Var
    l : Pile
    q : Arbre
Début
    q ← A ; Pile-vide(l)
    Tq (q<>Nil) faire
        Ecrire(q^.val)
        si (d(q)<>Nil) Alors Empiler(l,d(q)) Fsi
        si (g(q)<>Nil) alors q ← g(q)
        Sinon Dépiler(l,q) Fsi
    FTq.
Fin
```

**Version itérative 3 :**
```
Empiler(l,A)
Tq (non Est_vide(l)) faire
    Dépiler(l,q)
    si (q<>Nil) alors
        Ecrire(q^.val)
        Empiler(l,d(q))
        si (g(q)<>Nil) Alors q ← g(q)
        sinon Dépiler(l,q) Fsi
    Fsi
FTq
Fin.
```

<!-- TODO: unclear in source, verify against original scanned notebook (page 7) — these three iterative-implementation variants are transcribed as faithfully as legible, but the handwriting on this page is dense and the exact control flow (especially version 3, and where each `Fsi`/`FTq` closes) should be double-checked against the PDF before treating this as an authoritative reference for exam prep. -->

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/asd-resume-pseudocode.pdf" />

</TabItem>
</Tabs>
