---
sidebar_position: 5
title: "Chapitre 4 : Les arbres équilibrés"
sidebar_label: Ch4 - Arbres équilibrés
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 4 : Arbres équilibrés

*Conception et analyse d'algorithmes*

<!-- TODO: this chapter's source slides contain many small hand-drawn/rendered tree diagrams illustrating step-by-step rotations (AVL insertion/deletion walkthroughs, Rouge-Noir insertion cases). Per the conversion guidelines, a diagram is only redrawn here when it can be read unambiguously from the source; these worked examples chain many small trees together and are best verified against the PDF viewer tab rather than redrawn from OCR coordinates. The definitions, algorithms and complexity results below are transcribed in full. -->

## Plan

1. Les arbres ABR
2. Les arbres AVL (recherche, insertion, suppression)
3. Les arbres Rouge-Noir

## Définitions et terminologie

- Un arbre est un ensemble organisé de nœuds dans lequel chaque nœud a un père et un seul, sauf un nœud que l'on appelle la racine.
- Si le nœud $p$ est le père du nœud $f$, on dit que $f$ est un fils de $p$ ; si le nœud $p$ n'a pas de fils, on dit que c'est une feuille.
- Chaque nœud porte une étiquette ou valeur ou clé. On a l'habitude, lorsqu'on dessine un arbre, de le représenter avec la tête en bas : la racine est tout en haut, et les nœuds fils sont représentés en-dessous du nœud père.
- Terminologie inspirée des liens de parenté :
  - les descendants d'un nœud $p$ sont les nœuds qui apparaissent dans ses sous-arbres,
  - un ancêtre d'un nœud $p$ est soit son père, soit un ancêtre de son père,
  - le chemin qui relie un nœud à la racine est constitué de tous ses ancêtres,
  - un frère d'un nœud $p$ est un fils du père de $p$, et qui n'est pas $p$.
- Les nœuds d'un arbre se répartissent par niveaux : le premier niveau (niveau 0) contient la racine seulement, le deuxième niveau contient les deux fils de la racine, ..., les nœuds du niveau $k$ sont les fils des nœuds du niveau $k-1$, ...
- La hauteur d'un arbre est le nombre de niveaux de ses nœuds — c'est aussi le nombre de nœuds qui jalonnent la branche la plus longue.

### Arbres binaires : hauteur, nombre de nœuds et nombre de feuilles

Un arbre binaire est **complet** si toutes ses branches ont la même longueur et tous ses nœuds qui ne sont pas des feuilles ont deux fils. Soit $A$ un arbre binaire complet : le nombre de nœuds de $A$ au niveau 0 est 1, au niveau 1 est 2, ..., et le nombre de nœuds au niveau $p$ est $2^p$. En particulier, le nombre de feuilles est $2^h$, où $h$ est la hauteur.

## Arbres binaires de recherche (ABR)

**Définition** : un arbre binaire est de recherche si, pour $r$ un nœud de l'arbre, $x$ un nœud du sous-arbre gauche de $r$, et $y$ un nœud du sous-arbre droit de $r$, on a $x < r < y$.

- Chaque nœud a au plus 2 fils.
- Ordonné : fils gauche < nœud < fils droit — optimise la recherche (équivalent à la recherche dichotomique).
- Le nombre de comparaisons dans un ABR = la hauteur de l'arbre. Au pire des cas (arbre dégénéré en une liste), la hauteur est en $O(n)$ ; pour un arbre équilibré, elle est en $O(\log n)$.

### ABR : recherche d'une valeur

La recherche d'une valeur dans un ABR consiste à parcourir une branche en partant de la racine, en descendant chaque fois sur le fils gauche ou sur le fils droit suivant que la valeur portée par le nœud est plus grande ou plus petite que la valeur cherchée. La recherche s'arrête dès que la valeur est rencontrée, ou que la valeur recherchée n'existe pas (on a atteint l'extrémité d'une branche).

## Arbres AVL

- Arbres de recherche équilibrés.
- Principe : pour chaque nœud, les hauteurs du sous-arbre gauche et du sous-arbre droit diffèrent au plus de 1.
- Modèle proposé par G.M. Adelson-Velsky et E.M. Landis.
- Notion de **facteur d'équilibre** d'un nœud : différence entre les hauteurs du sous-arbre gauche et du sous-arbre droit.
- Un arbre est AVL si tous les nœuds ont un facteur d'équilibre dans $\{-1, 0, 1\}$.

Complexité de la recherche dans un AVL : $O(\log_2 n)$ — la hauteur d'un AVL est en $O(\log_2 n)$.

### Problématique de l'ajout

En ajoutant un élément, l'arbre (ou un de ses sous-arbres) peut devenir déséquilibré.

**Principe** :

- on fait l'ajout normal, puis
- on remonte en mettant les facteurs d'équilibre à jour jusqu'à rencontrer un arbre déséquilibré ;
- si on ne rencontre aucun arbre déséquilibré, c'est terminé ;
- sinon, on rééquilibre le premier arbre qui devient déséquilibré lors de la remontée.

### Le rééquilibrage

Principe : la rotation. Selon le facteur d'équilibre de l'arbre et de ses sous-arbres, dans le cas de déséquilibre, on réalise une ou deux rotations : rotation à gauche ou rotation à droite.

Notation : on traverse l'arbre vers la racine à partir du nœud $D$ qui vient d'être inséré, jusqu'à trouver le premier nœud déséquilibré $A$. Soit $B$ l'enfant de $A$ ayant la plus grande hauteur, et $C$ l'enfant de $B$ ayant la plus grande hauteur ($A$, $B$, $C$ sont ancêtres du nœud inséré $D$).

- **Rotation Droite (RD)** : l'arbre de racine $A$ penche à gauche et son sous-arbre gauche de racine $B$ penche à gauche : $fq(A)=2$ et $fq(B)=1$. On applique une rotation droite de $A$. Si le déséquilibre est du côté « extérieur », une seule rotation (simple) suffit.
- **Rotation Gauche (RG)** : l'arbre de racine $A$ penche à droite et son sous-arbre droit de racine $B$ penche à droite : $fq(A)=-2$ et $fq(B)=-1$. On applique une rotation gauche de $A$.
- **Rotation double Droite-Gauche (RDG)** : l'arbre de racine $A$ penche à droite et son sous-arbre gauche de racine $B$ penche à gauche : $fq(A)=-2$ et $fq(B)=1$. On applique une rotation droite de $B$, suivie d'une rotation gauche de $A$.
- **Rotation double Gauche-Droite (RGD)** : l'arbre de racine $A$ penche à gauche et son sous-arbre gauche de racine $B$ penche à droite : $fq(A)=2$ et $fq(B)=-1$. On applique une rotation gauche de $B$, suivie d'une rotation droite de $A$.

**Rééquilibrer un AVL après insertion** :

- en partant du nœud inséré $D$, on considère le premier sous-arbre $S$ de l'AVL déséquilibré suite à l'insertion de ce nouveau nœud ;
- le déséquilibre de $S$ est causé par l'insertion de $D$, qui a augmenté de 1 la hauteur d'un sous-arbre de $S$ (et donc la hauteur de $S$), ce qui entraîne souvent le déséquilibre global de l'AVL ;
- le rééquilibrage de $S$ rétablit son équilibre local et réduit sa taille de 1, donc $S$ retrouve sa hauteur initiale (avant l'insertion de $D$) ; on rétablit ainsi l'équilibre global de l'AVL ;
- un seul rééquilibrage est suffisant après l'insertion d'un nouveau nœud dans un arbre AVL.

### Suppression d'un nœud dans un AVL

L'opération dépend du nombre de fils du nœud à supprimer :

- **Cas 1** — le nœud à supprimer n'a pas de fils (feuille) : il suffit de le décrocher de l'arbre, en modifiant le lien du père (s'il existe) vers ce fils ; si le père n'existe pas, l'arbre devient vide.
- **Cas 2** — le nœud à supprimer a un seul fils : il est décroché comme dans le cas 1, et remplacé par son fils unique dans le nœud père (s'il existe) ; sinon l'arbre est réduit au fils unique du nœud supprimé.
- **Cas 3** — le nœud à supprimer $p$ a deux fils : soit $q$ le nœud de son sous-arbre gauche qui a la valeur la plus grande (ou, indifféremment, le nœud du sous-arbre droit de valeur la plus petite). Il suffit de recopier la valeur de $q$ dans le nœud $p$ et de décrocher le nœud $q$ ; puisque $q$ a la valeur la plus grande dans le fils gauche, il n'a pas de fils droit, et peut être décroché comme dans les cas 1 et 2.

Le retrait d'un nœud peut causer un déséquilibre dans un AVL $T$. Soit $A$ le premier nœud déséquilibré rencontré en traversant l'arbre vers la racine à partir de $D$ (ou du nœud qui s'est substitué à $D$). Soit $B$ l'enfant de $A$ ayant la plus grande hauteur, et $C$ l'enfant de $B$ ayant la plus grande hauteur ($B$ et $C$ ne sont pas ancêtres de $D$). On applique la même stratégie de restructuration pour rééquilibrer le sous-arbre enraciné à $A$. Cette restructuration réduit de 1 la hauteur du sous-arbre initialement enraciné à $A$, et pourrait donc déséquilibrer un autre nœud plus haut dans l'arbre — on doit continuer à vérifier l'équilibre jusqu'à ce que la racine de $T$ soit atteinte. On peut donc effectuer jusqu'à $O(\log n)$ rotations lors d'un retrait.

### AVL : complexité

Le ré-équilibrage d'un arbre AVL est une opération locale à un sous-arbre : le nombre d'opérations de rotation à effectuer est constant quelle que soit la hauteur du sous-arbre.

| Opération | Complexité |
| --- | --- |
| Recherche : FindElement(k) | $O(\log n)$ |
| Insertion : InsertItem(k,x) | $O(\log n)$ |
| Suppression : RemoveElement(k) | $O(\log n)$ |

## Les arbres Rouge-Noir

Un arbre Rouge-Noir est un arbre binaire de recherche comportant un champ supplémentaire par nœud : sa couleur, qui peut valoir soit ROUGE, soit NOIR. Un arbre Rouge-Noir doit satisfaire les propriétés suivantes :

1. chaque feuille doit être noire ou « Nil » ;
2. la racine est noire ;
3. chaque nœud est soit rouge, soit noir ;
4. un parent rouge doit avoir deux fils noirs ;
5. chaque chemin d'une feuille à la racine doit toujours comporter le même nombre de nœuds noirs (ce nombre est appelé **hauteur noire**).

### Recherche, insertion et suppression

- **Recherche** : s'effectue exactement comme dans tous les arbres binaires et avec la même efficacité algorithmique ($O(\log_2 n)$) ; c'est une opération préliminaire à l'insertion et à la suppression.
- **Insertion et suppression** : les propriétés des arbres Rouge-Noir doivent être respectées lors des insertions/suppressions, ce qui donne lieu à de nombreux cas possibles — cela contribue à la complexité de l'arbre Rouge-Noir (comparativement à l'arbre AVL).

### Insertion

Un nouveau nœud est toujours ROUGE. Si le parent est rouge, il faut appliquer le bon algorithme pour rétablir les propriétés de l'arbre Rouge-Noir (correction de la violation Rouge-Noir entre $X$ et son parent).

**Notation** : « P » le nœud parent, « GP » le nœud grand-parent, « O » le nœud oncle, « X » le nouveau nœud (nœud courant).

- **Cas 0** — si « P » est la racine de l'arbre, on colorie la racine en noir. C'est le seul cas où la hauteur noire de l'arbre augmente.
- **Cas 1** — si l'oncle « O » de X est rouge, on colorie « O » et le parent « P » de X en noir, et le grand-parent « GP » de X en rouge.
- **Cas 2** — « X » et « P » sont des fils de gauche de « GP ». Si l'oncle « O » de X est noir et « X », « P » sont coloriés en rouge, on colore le parent « P » de X en noir et son grand-parent « GP » en rouge, puis on fait une rotation droite sur « GP ».
- **Cas 3** — « X » et « P » sont des fils de droite de « GP ». Si l'oncle « O » de X est noir et « X », « P » sont coloriés en rouge, on colore le parent « P » de X en noir et son grand-parent « GP » en rouge, puis on fait une rotation gauche sur « GP ».

### Hauteur noire

**Définition** : la hauteur noire ($h_n$) d'un nœud $x$ (notée $h_n(x)$) dans un arbre Rouge-Noir est le nombre unique de nœuds noirs sur tout chemin du nœud $x$ à une feuille de l'arbre, le nœud $x$ exclu.

**Propriété** : $h_n(x) \geq \dfrac{1}{2} h(x)$ où $h(x)$ est la hauteur de $x$.

**Démonstration** (par récurrence sur la hauteur $h$ de l'arbre RN, dans un arbre RN à $n$ nœuds et de racine $x$ : $n \geq 2^{h_n(x)} - 1$) :

- Cas de base : $h=0$ et $n=1$. On a $h_n(x)=0$ et $1 \geq 2^0$.
- Cas inductif : on suppose $n \geq 2^{h_n(x)}-1$ vérifié pour tous les arbres RN de hauteur $\leq h$, et on considère un arbre Rouge-Noir de hauteur $h+1$. Si $h_n(x) = 0$ alors $n \geq 2^0 - 1 = 0$. On suppose $h_n(x) > 0$ : cela signifie que la racine a exactement 2 enfants (sinon, violation de la propriété des arbres RN sur le nombre de nœuds noirs). Ces enfants sont racines d'arbres de hauteur $h$ et de hauteur noire $\geq h_n(x) - 1$, d'où $n \geq (2^{h_n(x)-1}-1) \times 2 + 1 \geq 2^{h_n(x)}-1$.

**Théorème** : les arbres RN sont équilibrés. En effet $n \geq 2^{h_n(x)}-1 \geq 2^{h/2}-1$, d'où $\log(n+1) \geq h/2$, donc $h \leq 2\log_2(n+1)$, i.e. $h = O(\log n)$.

### Complexité

| Opération | Complexité |
| --- | --- |
| Insertion | $O(\log n)$ (maximum : la hauteur de l'arbre Rouge-Noir) |
| Coloration rouge | $O(1)$ |
| Violation (correction) | $O(\log n)$ |
| Re-coloration | $O(1)$ |
| Rotation | $O(1)$ |

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/complexite-ch4-arbres-equilibres.pdf" />

</TabItem>
</Tabs>
