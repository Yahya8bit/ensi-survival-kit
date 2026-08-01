---
sidebar_position: 3
title: Chapitre III - Arbre Couvrant de Poids Minimal
sidebar_label: Ch3 - Arbre couvrant (ACM)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre III : Arbre couvrant de poids minimal

*ENSI/II.1 — 2022/2023*

## Définitions

- **Arbre** : graphe connexe sans cycle.
- **Forêt** : graphe dont chaque composante connexe est un arbre.

**Théorème (caractérisations équivalentes).** Soit `T(S_T,A_T)` un graphe d'ordre `n≥2` ; les propriétés suivantes sont équivalentes pour caractériser un arbre :
1. `T` est connexe et sans cycle ;
2. `T` est sans cycle et admet `n-1` arcs ;
3. `T` est connexe et admet `n-1` arcs ;
4. `T` est sans cycle, et en ajoutant un arc, on crée un cycle (et un seul) ;
5. `T` est connexe, et si on supprime un arc quelconque, il n'est plus connexe ;
6. Tout couple de sommets est relié par une chaîne et une seule.

## Arbre couvrant de poids minimal (ACM)

`G = (S,A,c)` : non orienté, connexe et valué (`c : A → IR`). Étant donné un graphe partiel `G'=(S,A')` de `G` avec `A'⊆A`, on appelle **poids de `G'`** le nombre `c(G') = Σᵤ∈A' c(u)`.

**Définition.** Un **arbre couvrant** de `G` est un graphe partiel, connexe et acyclique, `T(S_T,A_T)` de `G` où `S_T=S` et `A_T⊆A`.

**Proposition.** Un graphe admet un arbre couvrant ssi il est connexe.

Le problème de l'**arbre couvrant de poids minimum (ACM)** est de chercher un arbre `T*` de `G` tel que `c(T*) = min{c(T) / T=(S,A_T) est un arbre couvrant de G}`.

Le problème admet toujours une solution car l'ensemble des arbres couvrants est fini et admet au moins un élément de coût minimum.

:::note Remarques
- Un ACM est **unique** ssi les poids des arêtes sont deux à deux distincts.
- On suppose `G` connexe (sinon, on résout le problème sur chaque composante connexe).
:::

**Propriété (existence d'un ACM).** Tout graphe non orienté, valué et connexe admet un ou plusieurs ACM.

**Application directe :** la diffusion d'information sur un réseau (câblage optimal d'un réseau de rues d'une ville, connexion à moindre coût de tous les points d'un réseau).

## Construction d'un ACM

On construit un ACM `T(S_T,A_T)` de manière incrémentale. Au début, `A_T` est vide. À chaque étape, on choisit une nouvelle arête `(x,y)` telle que `A_T∪{(x,y)}` est toujours un sous-ensemble d'un ACM pour `G`. Le problème : comment connecter à moindre coût des sommets non encore reliés à `A_T` ?

### Historique

- **Boruvka (1926) ⟹ Kruskal (1956)** : plusieurs parties de l'ACM sont construites en parallèle.
- **Jarnik (1930) ⟹ Prim (1957)** : à partir d'un seul sommet, l'ACM est construit en le faisant grossir.
- Ce sont des **algorithmes gloutons** avec maintien d'un invariant (à chaque instant, le sous-ensemble d'arêtes choisies est une partie de l'ACM) : à chaque étape, une nouvelle « meilleure » arête est choisie.

## Algorithme de Kruskal (1956)

**Principe :** construction concurrente d'arbres de poids minimum. Au départ, chaque sommet est un arbre. Les arêtes du graphe sont triées par ordre de poids croissant. Tant qu'il reste au moins deux arbres : on choisit la prochaine arête ; si elle joint deux arbres, ils sont fusionnés (sinon elle est rejetée, car elle formerait un cycle).

**Algorithme :**
```
1. Trier (dans un tableau E) et (ré)numéroter les arêtes de G par ordre croissant
   des coûts (départager arbitrairement en cas d'égalité).
   k = 1, l = 0, A_T = ∅
2. Si e_k ne forme pas de cycle avec les arêtes de A_T :
     A_T = A_T ∪ {e_k}
     l = l + 1
3. Si l = n-1 → FIN
   Sinon k = k+1, retour à 2
```

**Complexité.** Trier les `m` arêtes : `O(m log m)`. À chaque étape, vérification du cycle en `O(1)` (avec une structure union-find). **Complexité totale en `O(m·log(m))`.**

**Exemple (câblage de trottoirs entre 6 immeubles A-F).** Les arêtes triées : `EF(750), CE(790), BE(835), BD(850), BF(920), BC(1160), BA(1320), AF(2640), CF(2880)`. En appliquant Kruskal : on retient `EF, CE, BE, BD` (4 arêtes, sans cycle), puis `BF` et `BC` forment des cycles (rejetées), puis `BA` est retenue (5ᵉ arête = `n-1` pour `n=6` sommets) → **FIN**. **Poids total de l'ACM : 750+790+835+850+1320 = 4545.**

<KruskalVisualizer />

:::note Remarque
L'algorithme de Kruskal se généralise directement pour trouver un arbre couvrant de poids **maximal** : il suffit de trier les arêtes par ordre **décroissant**.
:::

## Algorithme de Prim (1957)

**Principe :** faire grossir un sous-arbre jusqu'au recouvrement du graphe (contrairement à Kruskal, on part toujours d'un sommet donné et l'arbre reste connexe à chaque étape).

- construction incrémentale d'un arbre de poids minimum ;
- au départ, un sommet `sᵢ` est choisi arbitrairement, il constitue l'ACM initial ;
- parmi toutes les arêtes incidentes à `sᵢ`, on choisit celle de plus faible poids `(sᵢ,sⱼ)` → le nouvel arbre est constitué des sommets `sᵢ,sⱼ` et de l'arête `(sᵢ,sⱼ)` ;
- tant qu'il reste des sommets en dehors de l'arbre : parmi l'ensemble des arêtes incidentes aux sommets de l'arbre et ayant une extrémité en dehors de l'arbre, choisir celle dont le poids est le plus faible.

**Algorithme :**
```
1- Initialisation : S_T = {s} (s sommet quelconque de S)
   k := 0, π_k(s) = 0
   ∀i ∈ S̄_T : π_k(i) = c_si si i adjacent à s, +∞ sinon

2- Sélectionner j ∈ S̄_T / π_k(j) = min{π_k(i); i∈S̄_T}
   S_T := S_T ∪ {j} ; si S_T = S → FIN ; sinon aller à 3

3- ∀i ∈ S̄_T adjacent à j :
   k := k+1, π_k(i) = min(π_{k-1}(i), c_ji)
   retour à 2
```

**Complexité.** La complexité est la même que pour l'algorithme de Dijkstra. Initialisation en `O(n)`. `n-1` itérations, recherche du minimum en `O(n)` chaque fois soit `O(n²)`. Actualisation : examen de toutes les arêtes dans les deux sens (`2m`), en temps constant soit `O(m)`. Puisque typiquement `n<m<n²` : **complexité totale en `O(n²)`** (avec une représentation par tableau des successeurs).

**Exemple (même graphe à 6 sommets a,b,c,d,e,f, sommet initial `b`).** Déroulement : `S_T={b}` → sélection de `a` (π=1) → sélection de `d` (π=3) → sélection de `c` (π=2) → sélection de `e` (π=5) → sélection de `f` (π=3) → **FIN**, `S_T = {a,b,c,d,e,f}`. **ACM obtenu :** arêtes `(b,a)`, `(a,d)`, `(d,c)`, `(a,e)`, `(e,f)`, de poids total `C_T = 1+3+2+5+3 = 14`.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/graphe-ch3-acm.pdf" />

</TabItem>
</Tabs>
