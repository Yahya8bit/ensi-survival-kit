---
sidebar_position: 5
title: "Chapitre 4 : Les arbres équilibrés"
sidebar_label: Ch4 - Arbres équilibrés
hide_title: true
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 4 : Arbres équilibrés

_Conception et analyse d'algorithmes_

Un arbre binaire de recherche permet de retrouver une clé en suivant une seule branche. Cette promesse n'est utile que si la branche reste courte : un arbre qui se déforme en liste perd le bénéfice de la recherche. Ce chapitre étudie deux façons de conserver cette hauteur sous contrôle : les arbres AVL et les arbres Rouge-Noir.

:::info Vous allez apprendre

- pourquoi la hauteur d'un ABR gouverne le coût de ses opérations ;
- l'invariant d'équilibre des arbres AVL et les rotations qui le restaurent ;
- comment l'insertion et la suppression diffèrent dans un AVL ;
- les propriétés des arbres Rouge-Noir et la borne de hauteur qu'elles impliquent.

:::

## Vocabulaire et limite des ABR

Un arbre organise des nœuds reliés par des relations père-fils. La racine est le seul nœud sans père ; une feuille n'a pas de fils. Un nœud est un descendant d'un autre s'il apparaît dans l'un de ses sous-arbres, et un ancêtre s'il se trouve sur le chemin qui remonte vers la racine.

:::info Convention de hauteur

Le support numérote le niveau de la racine par $0$ et appelle **hauteur** le nombre de niveaux, ou de nœuds, de la branche la plus longue. Cette convention est conservée dans tout le chapitre : ne mélangez pas hauteur, profondeur et niveau.

Pour un arbre binaire complet, il y a $2^p$ nœuds au niveau $p$ ; le support note $2^{h-1}$ le nombre de feuilles, où $h$ est la hauteur.

:::

### Arbre binaire de recherche

:::info Définition

Un arbre binaire est un **arbre binaire de recherche** (ABR) si, pour tout nœud $r$, toute clé $x$ de son sous-arbre gauche et toute clé $y$ de son sous-arbre droit vérifient :

$$
x < r < y.
$$

Chaque nœud possède donc au plus deux fils.

:::

Pour chercher une valeur, on compare la clé courante à la clé recherchée et l'on descend à gauche ou à droite. L'ordre de recherche est ce qui rend cette décision possible ; le nombre de comparaisons dépend de la hauteur de l'arbre.

:::warning Un ABR n'est pas forcément équilibré

Une suite d'insertions peut produire une chaîne de nœuds. Dans ce pire cas, la hauteur et le coût de recherche sont en $O(n)$, comme pour une liste. Un arbre équilibré vise au contraire une hauteur en $O(\log n)$.

:::

L'équilibrage ajoute des invariants à l'ordre de recherche. Les AVL imposent un écart de hauteur local très strict ; les arbres Rouge-Noir utilisent des couleurs pour garantir une hauteur logarithmique avec des corrections d'insertion différentes.

## Arbres AVL

Un arbre AVL est un ABR dont chaque nœud respecte une contrainte sur la hauteur de ses deux sous-arbres.

:::info Définition et invariant AVL

Pour un nœud, le **facteur d'équilibre** est la différence entre la hauteur du sous-arbre gauche et celle du sous-arbre droit :

$$
fq = h_{\text{gauche}} - h_{\text{droite}}.
$$

Un arbre est AVL si, pour chaque nœud,

$$
\left|h_{\text{gauche}} - h_{\text{droite}}\right| \leq 1,
\qquad fq \in \{-1, 0, 1\}.
$$

:::

:::note Propriété de hauteur

La hauteur d'un AVL est en $O(\log_2 n)$. La recherche suit donc une branche de longueur logarithmique et coûte $O(\log_2 n)$.

:::

Une insertion ou une suppression commence comme dans un ABR. C'est ensuite que l'on vérifie si le facteur d'équilibre est sorti de l'intervalle autorisé.

### Rotations : restaurer l'équilibre sans perdre l'ordre

Lorsqu'un sous-arbre devient déséquilibré, une rotation modifie localement les liens entre quelques nœuds. Elle préserve l'ordre infixe des clés : les clés qui étaient inférieures au nœud pivot restent à gauche, et celles qui lui étaient supérieures restent à droite.

Pour nommer les cas du support, on remonte depuis le nœud inséré $D$ jusqu'au premier nœud déséquilibré $A$. On appelle $B$ l'enfant de $A$ de plus grande hauteur et $C$ l'enfant de $B$ de plus grande hauteur. Dans les quatre cas, $A$, $B$ et $C$ sont ancêtres de $D$.

:::tip Repère : choisir la rotation

- **Rotation droite (RD)** : $A$ penche à gauche et $B$, son fils gauche, penche à gauche : $fq(A)=2$ et $fq(B)=1$. Une rotation droite de $A$ place $B$ à la racine du sous-arbre local et $A$ à sa droite.
- **Rotation gauche (RG)** : cas symétrique, avec $fq(A)=-2$ et $fq(B)=-1$. Une rotation gauche de $A$ place $B$, son fils droit, à la racine du sous-arbre local et $A$ à sa gauche.
- **Rotation double droite-gauche (RDG)** : $A$ penche à droite et son fils droit $B$ penche à gauche : $fq(A)=-2$ et $fq(B)=1$. On effectue d'abord une rotation droite de $B$, puis une rotation gauche de $A$ ; $C$ devient la racine locale.
- **Rotation double gauche-droite (RGD)** : $A$ penche à gauche et son fils gauche $B$ penche à droite : $fq(A)=2$ et $fq(B)=-1$. On effectue d'abord une rotation gauche de $B$, puis une rotation droite de $A$ ; $C$ devient la racine locale.

Les déroulés graphiques et les exemples numériques de chaque rotation sont disponibles dans l'onglet PDF.

:::

:::warning Lecture du cas RDG dans le support

Le libellé de la diapositive RDG mentionne un sous-arbre gauche, tandis que son schéma et les facteurs $fq(A)=-2$ et $fq(B)=1$ correspondent au fils droit $B$ de $A$. La description ci-dessus suit ces éléments concordants.

:::

Les deux cas simples correspondent à un déséquilibre vers l'extérieur ; les deux rotations réorientent d'abord le sous-arbre de $B$ lorsqu'il penche vers l'intérieur. Le résultat replace le nœud médian $C$, dans les cas doubles, au sommet du sous-arbre local et rétablit l'invariant AVL.

### Insertion et rééquilibrage

On insère d'abord la clé comme dans un ABR, puis on remonte vers la racine en mettant les facteurs d'équilibre à jour. Si un déséquilibre apparaît, on traite le premier sous-arbre $S$ concerné.

:::note Propriété : une correction suffit après une insertion

L'insertion de $D$ augmente de $1$ la hauteur d'un sous-arbre de $S$, et donc celle de $S$. Le rééquilibrage de $S$ rétablit son équilibre local et diminue cette hauteur d'une unité : $S$ retrouve alors sa hauteur d'avant l'insertion. Un seul rééquilibrage suffit donc après l'insertion d'un nœud dans un AVL.

:::

L'insertion comporte une descente puis une remontée sur une hauteur logarithmique. Elle est donc en $O(\log n)$.

### Suppression et rééquilibrage

La suppression respecte d'abord les règles usuelles d'un ABR :

- une feuille est simplement décrochée ;
- un nœud à un seul fils est remplacé par ce fils ;
- pour un nœud $p$ à deux fils, on recopie la clé $q$ maximale du sous-arbre gauche, ou de façon équivalente la clé minimale du sous-arbre droit, puis on décroche $q$.

Après ce retrait, un déséquilibre peut apparaître. En remontant à partir de $D$, ou du nœud qui l'a remplacé, on prend le premier nœud déséquilibré $A$, puis son enfant le plus haut $B$ et l'enfant le plus haut $C$ de $B$. Ici, $B$ et $C$ ne sont pas des ancêtres de $D$. La même restructuration que pour l'insertion restaure l'équilibre du sous-arbre enraciné en $A$.

:::warning La suppression peut demander plusieurs corrections

Cette restructuration diminue de $1$ la hauteur du sous-arbre enraciné en $A$. Un nœud plus haut peut alors devenir déséquilibré : la vérification se poursuit jusqu'à la racine. Le support indique jusqu'à $O(\log n)$ rotations lors d'un retrait.

:::

| Opération AVL                    | Complexité  |
| -------------------------------- | ----------- |
| Recherche : `FindElement(k)`     | $O(\log n)$ |
| Insertion : `InsertItem(k,x)`    | $O(\log n)$ |
| Suppression : `RemoveElement(k)` | $O(\log n)$ |

Les AVL maintiennent directement l'écart de hauteur. Les arbres Rouge-Noir vont maintenant relâcher cette condition locale et imposer des règles de couleur qui donnent, elles aussi, une hauteur logarithmique.

## Arbres Rouge-Noir

Un arbre Rouge-Noir est un ABR qui ajoute une couleur à chaque nœud. Les couleurs ne servent pas à ordonner les clés : elles contraignent la forme de l'arbre.

:::info Définition : propriétés Rouge-Noir

Un arbre Rouge-Noir satisfait les propriétés suivantes :

1. chaque feuille est noire ou vaut `Nil` ;
2. la racine est noire ;
3. chaque nœud est rouge ou noir ;
4. un parent rouge a deux fils noirs ;
5. tout chemin d'une feuille à la racine contient le même nombre de nœuds noirs, appelé **hauteur noire**.

:::

La recherche suit le même principe que dans un ABR. La borne de hauteur établie plus loin donne un coût de recherche en $O(\log_2 n)$.

### Insertion dans un arbre Rouge-Noir

Un nouveau nœud est d'abord coloré en rouge. Une violation peut alors apparaître entre ce nœud et son parent rouge. Le support note $X$ le nœud courant, $P$ son parent, $GP$ son grand-parent et $O$ son oncle.

:::note Cas de correction présentés dans le support

- **Cas 0** : si $P$ est la racine, on la colore en noir. C'est le seul cas où la hauteur noire augmente.
- **Cas 1** : si l'oncle $O$ de $X$ est rouge, on colore $O$ et $P$ en noir, puis $GP$ en rouge.
- **Cas 2** : $X$ et $P$ sont fils gauches de $GP$, l'oncle $O$ est noir et $X$, $P$ sont rouges. On colore $P$ en noir, $GP$ en rouge, puis on effectue une rotation droite sur $GP$.
- **Cas 3** : cas symétrique : $X$ et $P$ sont fils droits de $GP$, l'oncle est noir et $X$, $P$ sont rouges. On colore $P$ en noir, $GP$ en rouge, puis on effectue une rotation gauche sur $GP$.

:::

Les schémas des cas et les exemples d'insertion `41, 38, 31, 12, 19, 8` sont conservés dans le PDF. Le support signale que les insertions et suppressions comportent de nombreux cas ; il ne détaille ici que les cas d'insertion ci-dessus.

### Hauteur noire et hauteur logarithmique

:::info Définition : hauteur noire

La hauteur noire d'un nœud $x$, notée $hn(x)$, est le nombre de nœuds noirs sur tout chemin de $x$ à une feuille, en excluant $x$. La cinquième propriété garantit que ce nombre est unique.

:::

:::note Théorème : les arbres Rouge-Noir sont équilibrés

Dans un arbre Rouge-Noir à $n$ nœuds et de racine $x$, le support établit :

$$
n \geq 2^{hn(x)}
$$

et

$$
hn(x) \geq \frac{h(x)-1}{2}.
$$

On obtient ainsi $h \leq 2\log_2(n)+1$, donc $h = O(\log n)$.

:::

Le PDF écrit localement son cas de base Rouge-Noir avec $h=0$ ; ci-dessous, le raisonnement est réécrit selon la convention du chapitre, où un arbre réduit à sa racine a $h=1$.

<details>
  <summary>Démonstration</summary>

On raisonne par récurrence sur la hauteur $h$ d'un arbre Rouge-Noir de racine $x$. Montrons que :

$$
n \geq 2^{hn(x)}.
$$

Pour $h=1$, l'arbre contient un nœud, $hn(x)=0$, et l'inégalité est vérifiée. Pour l'étape inductive, si $hn(x)=0$, on a immédiatement $n \geq 1 = 2^0$. Sinon, la racine possède deux enfants ; chacun est la racine d'un sous-arbre de hauteur $h-1$ et dont la hauteur noire vaut au moins $hn(x)-1$. L'hypothèse de récurrence appliquée aux deux sous-arbres donne :

$$
n \geq 2\bigl(2^{hn(x)-1}\bigr)+1
\geq 2^{hn(x)}.
$$

Enfin, le support relie la hauteur noire à la hauteur totale par $hn(x) \geq \dfrac{h(x)-1}{2}$. En combinant cette relation avec la borne précédente, on a :

$$
n \geq 2^{hn(x)} \geq 2^{\frac{h-1}{2}}.
$$

Ainsi, $h \leq 2\log_2(n)+1$, ce qui donne $h=O(\log n)$.

</details>

| Opération Rouge-Noir       | Complexité indiquée |
| -------------------------- | ------------------- |
| Recherche                  | $O(\log_2 n)$       |
| Insertion                  | $O(\log n)$         |
| Coloration rouge           | $O(1)$              |
| Correction d'une violation | $O(\log n)$         |
| Recoloration               | $O(1)$              |
| Rotation                   | $O(1)$              |

## Exercices

Le support propose des exercices de recherche, d'insertion et de suppression dans des AVL, ainsi que des constructions d'arbres Rouge-Noir. Les arbres de départ et les corrections attendues sont visibles dans l'onglet PDF ; utilisez-les pour identifier le premier nœud déséquilibré et justifier la rotation choisie.

## Étapes suivantes

- [Revoir la complexité des algorithmes](./complexite-ch1-complexite-algorithmes) pour relier hauteur et coût asymptotique.
- [Revoir les algorithmes gloutons](./complexite-ch3-2-glouton) pour comparer une stratégie de construction de solution à une structure de données équilibrée.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/complexite-ch4-arbres-equilibres.pdf" />

</TabItem>
</Tabs>
