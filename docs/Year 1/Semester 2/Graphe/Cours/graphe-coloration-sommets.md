---
sidebar_position: 5
title: Coloration des Sommets d'un Graphe (support complémentaire)
sidebar_label: Coloration des sommets
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Coloration des sommets d'un graphe

*Support complémentaire — Cours Graphes & Applications*

## Objectifs

À l'issue de ce chapitre, on doit être capable de :
- Identifier des problèmes dont les solutions sont données via une coloration de graphes.
- Modéliser des situations réelles par des graphes.
- Colorier un graphe.
- Appliquer les algorithmes glouton et Welsh & Powell pour la coloration.
- Encadrer le nombre chromatique pour en déduire, dans certains cas, la solution optimale : minoration par l'ordre d'un sous-graphe complet, majoration par le théorème de Brooks et/ou les résultats des algorithmes.

## Activité introductive : planification des examens

5 étudiants doivent passer des examens : Étudiant 1 (Histoire, Français), Étudiant 2 (Français, Anglais), Étudiant 3 (Histoire, Anglais), Étudiant 4 (Biologie, Anglais), Étudiant 5 (Français, Biologie, Anglais). Peut-on planifier des épreuves en même temps ?

**Modélisation.** Chaque sommet correspond à une matière ; une arête relie deux sommets si un étudiant doit passer l'examen des deux matières correspondantes (ces matières ne peuvent donc pas être planifiées en même temps).

**Coloration.** Chaque couleur représente une plage horaire. Deux sommets adjacents (mêmes contraintes d'étudiant) doivent recevoir des couleurs distinctes. Sur cet exemple (graphe `H-F-B-A` avec les arêtes `HF, HA, BF, BA, FA`), 3 couleurs suffisent : `{H,B}` = couleur 1, `{F}` = couleur 2, `{A}` = couleur 3.

## Définitions

- **Colorier un graphe `G`** : colorier les sommets de telle façon que deux sommets adjacents aient toujours des couleurs différentes.
- **Nombre chromatique `χ(G)`** : le plus petit nombre de couleurs nécessaires pour colorier le graphe.

## Propriétés

### Coloriage optimal d'un graphe complet

**Propriété.** Le nombre chromatique d'un graphe complet `Kₙ`, `n≥1`, est `χ(Kₙ) = n`.

### Encadrement du nombre chromatique

Soit `G=(V,E)` un graphe non orienté, `|V|=n` :

**Minoration.** Si `G` contient un sous-graphe complet `Kₚ` (`p≤n`), alors `p = χ(Kₚ) ≤ χ(G)`.

**Majoration.**
- `χ(G) ≤ n`.
- Si on arrive à colorier `G` avec une coloration valide de `p` couleurs, alors `χ(G) ≤ p`.
- **Théorème de Brooks.** Si le plus grand degré d'un sommet de `G` est `d`, alors `χ(G) ≤ d+1`.

### Graphe planaire

**Définition.** Un graphe **planaire** peut être représenté sur un plan tel que tout arc (ou arête) ne se croise pas avec un autre. *Exemple : une carte géographique peut être modélisée par un graphe planaire (sommet = région, arête = frontière).*

**Théorème de coloration (Appel & Haken, 1977).** Lorsque `G` est planaire, `χ(G) ≤ 4` (théorème des 4 couleurs).

## Algorithme glouton

Considérons `G=(X,E)` avec `|X|=n`.

**Pseudo-code :**
```
liste ordonnée de sommets X = [x₁,x₂,...,xₙ]
liste ordonnée de couleurs C
Pour i de 1 à n faire
    Sommet = xᵢ
    Couleur = la couleur minimale de C non utilisée par les voisins de Sommet
    Affecter à Sommet la couleur Couleur
fin pour
Afficher le nombre de couleurs utilisées.
```

**Principe.** Avance étape par étape et choisit une solution optimale localement, sans souci d'optimalité globale : à chaque sommet, on assigne la première couleur possible en fonction des voisins déjà coloriés.

**Théorème.** L'algorithme Glouton nécessite `n` étapes (`n` = nombre de sommets). D'après le théorème de Brooks, il utilise au plus `d+1` couleurs (`d` = degré du graphe).

**Exemple (illustration de la non-optimalité).** Sur un graphe à 6 sommets formant un cycle avec une diagonale, en visitant les sommets dans un certain ordre, l'algorithme glouton utilise **4 couleurs** alors qu'un `K₃` (triangle) impose seulement `χ(G)≥3` : on ne peut pas conclure directement à l'optimalité. En changeant simplement l'ordre de visite des deux derniers sommets, le même algorithme trouve une coloration à **3 couleurs seulement** — qui, elle, est optimale (`χ(G)=3`, car il existe un `K₃`).

**Conclusion : l'algorithme Glouton ne donne pas toujours une coloration optimale — le résultat dépend fortement de l'ordre de parcours des sommets.**

## Algorithme de Welsh & Powell

Soit `G=(X,A)`, `X=[x₁,...,xₙ]`, `n=|X|`.

**Procédure :**
1. **Étape 1 :** ordonner les sommets par ordre **décroissant des degrés**, obtenant `v₁,...,vₙ` avec `deg(v₁)≥deg(v₂)≥...≥deg(vₙ)`.
2. **Étape 2 :** affecter une couleur `C₁` au sommet `v₁`, puis attribuer la même couleur au reste des sommets non coloriés et non adjacents à un sommet déjà de cette couleur, de façon cumulative et suivant les degrés décroissants.
3. **Étape 3 :** s'il reste des sommets non coloriés, attribuer une nouvelle couleur au premier sommet non colorié de la liste résiduelle et répéter la procédure.

**Condition d'arrêt :** tous les sommets sont coloriés.

**Pseudo-code :**
```
L : liste ordonnée des sommets de X, ordonnés par ordre décroissant des degrés.
couleur ← 0
Tant que L ≠ ∅ faire
    couleur ← couleur + 1
    s ← L[1]   (premier sommet de L)
    couleur(s) ← couleur
    S_couleur = [s]
    Pour tout v ∈ L faire
        Si v est non-adjacent à S_couleur faire
            couleur(v) = couleur
            S_couleur = S_couleur ∪ v
        fin Si
    fin Pour
    L = L / S_couleur   (retirer les sommets déjà coloriés de L)
fin Tant que
Afficher le nombre de couleurs utilisées.
```

**Exemple.** Graphe à 6 sommets `A,B,C,D,E,F` (chacun de degré 4, sauf 2 de degré 3). Ordre décroissant : `A,B,E,F,C,D`. Itération 1 : `A` et `C` reçoivent `C₁` (non adjacents). Itération 2 : `B` et `D` reçoivent `C₂`. Itération 3 : `E` reçoit `C₃`. Itération 4 : `F` reçoit `C₄`. **4 couleurs suffisent, donc `χ(G) ≤ 4`.**

## Non-optimalité des algorithmes

Les algorithmes Welsh & Powell et Glouton sont efficaces mais **ne sont pas garantis optimaux** dans tous les cas.

**Contre-exemple de Welsh & Powell.** Sur un graphe en forme d'« échelle » à 8 sommets `A,B,C,D,E,F,G,H` (arêtes `AB, BC, CD, DE, EF, BG, GH, HD` — c'est-à-dire un graphe biparti, cycle pair), Welsh & Powell donne une coloration à **3 couleurs**, alors que **2 couleurs suffisent** (le graphe étant biparti, sans cycle impair, `χ(G)=2`). On conclut que la coloration proposée par Welsh & Powell n'est pas toujours optimale : dans certains cas, un nombre plus restreint de couleurs peut être utilisé.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/graphe-coloration-sommets.pdf" />

</TabItem>
</Tabs>
