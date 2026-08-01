---
sidebar_position: 14
title: Chapitre XI - Les Arbres Binaires de Recherche
sidebar_label: Ch11 - Arbres Binaires de Recherche
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# CHAPITRE XI - LES ARBRES BINAIRES DE RECHERCHE

## 1. Définition

Un arbre binaire de recherche est un arbre binaire tel que pour tout nœud v de l'arbre :

- Les éléments de tous les nœuds du sous-arbre gauche de v sont inférieurs ou égaux à l'élément contenu dans v.
- Les éléments de tous les nœuds du sous-arbre droit de v sont supérieurs à l'élément contenu dans v.

Il en résulte de cette définition que le parcours symétrique (infixé) d'un arbre binaire de recherche produit la suite des éléments triée en ordre croissant.

**Avantages :** recherche et tri efficaces.

## 2. Recherche d'un élément dans un arbre binaire de recherche

Pour rechercher une occurrence d'un élément dans un arbre binaire de recherche, on compare cet élément au contenu de la racine :

- S'il y a égalité, l'élément est trouvé et la recherche s'arrête ;
- Si l'élément est plus petit (resp. plus grand) que celui de la racine, on poursuit la recherche dans le sous-arbre gauche (resp. droit) ; si ce sous-arbre est vide, il y a échec.

## 3. Adjonction d'un élément

### a. Adjonction aux feuilles

**Principe**

On compare l'élément au contenu de la racine pour savoir si l'ajout doit être fait dans le sous-arbre gauche ou dans le sous-arbre droit. On fait un appel récursif jusqu'à arriver à un arbre vide. On insère à cet emplacement l'élément à ajouter.

*(Procédures développées en TD/cours magistral.)*

### b. Adjonction à la racine

**Principe**

L'adjonction à la racine peut être utile si les recherches portent sur les éléments **récemment ajoutés**.

Pour ajouter un élément X à la racine d'un arbre binaire de recherche, il faut d'abord couper l'arbre binaire de recherche en deux arbres binaires de recherche G et D contenant respectivement tous les éléments inférieurs ou égaux à X, et tous les éléments supérieurs à X, puis former l'arbre dont la racine contient X et qui a pour sous-arbre gauche (resp. droit) l'arbre G (resp. D). On obtient bien un arbre binaire de recherche.

L'étape de coupure est la plus délicate ; il est important de remarquer qu'il n'est pas nécessaire de parcourir tous les nœuds de l'arbre initial A pour former G et D. Ce sont les nœuds situés sur le chemin C suivi lors de la recherche de X qui déterminent la coupure : en effet si un nœud de C contient un élément plus petit que X, il vient se placer sur le bord droit de G et par la propriété des arbres binaires de recherche, il entraîne avec lui dans G tout son sous-arbre gauche. Si un nœud de C contient un élément plus grand que X, il vient se placer sur le bord gauche de D, et par la propriété des arbres binaires de recherche, il entraîne avec lui dans D tout son sous-arbre droit.

## 4. Suppression d'un élément

Pour supprimer un élément, il faut tout d'abord déterminer sa place, puis effectuer la suppression proprement dite, qui s'accompagne éventuellement d'une réorganisation des éléments.

**Principe :**

- Si le nœud à supprimer est sans fils : la suppression est immédiate ;
- Si le nœud possède un seul fils : il suffit de le remplacer par ce fils ;
- Si le nœud possède deux fils : il y a deux solutions
  - Remplacer l'élément à supprimer par l'élément immédiatement inférieur (le plus grand élément de son sous-arbre gauche)
  - Remplacer l'élément à supprimer par l'élément immédiatement supérieur (le plus petit élément de son sous-arbre droit)

:::note Remarque
Ces deux solutions sont équivalentes lorsque tous les éléments de l'arbre binaire de recherche sont distincts.
:::

On utilisera dans ce qui suit la première solution.

La procédure `supprimearb` utilise la procédure `supmax` de suppression du maximum dans un arbre binaire de recherche.

La procédure `supmax` supprime le nœud contenant l'élément maximal dans un arbre binaire de recherche A non vide ; elle donne pour résultats l'élément maximal et l'arbre binaire de recherche A privé du nœud contenant cet élément.

</TabItem>
<TabItem value="pdf" label="PDF">

*Le PDF ci-dessous est le fascicule complet (chapitres VIII à XI).*

<PdfViewer file="/pdfs/asd-chapitres8-11.pdf" />

</TabItem>
</Tabs>
