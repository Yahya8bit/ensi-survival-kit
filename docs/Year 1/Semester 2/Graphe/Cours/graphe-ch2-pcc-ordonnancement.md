---
sidebar_position: 2
title: Chapitre II - Chemins Extrémaux des Graphes Pondérés
sidebar_label: Ch2 - Chemins extrémaux (PCC)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre II : Chemins extrémaux des graphes pondérés

*ENSI — II1 — 2023/2024 — N. Chaouachi*

## Partie 1 : Typologie des problèmes du plus court chemin (PCC)

### Introduction

On considère un graphe `G = (S,A)` orienté et valué. Le problème de la recherche d'un plus court chemin a de nombreuses applications : routage de paquets, diamètre d'un réseau de télécommunications (qualité de service), problèmes de transport, jeux (graphe des états et transitions légales), investissements/ordonnancement, navigation...

### Formulation du problème

Soit `G = (S,A,c)` un graphe orienté et valué (**réseau**), `c : A → IR`, `cᵤ` = valeur/poids/coût de l'arc `u`. Le poids d'un chemin `µ` est `c(µ) = Σᵤ∈µ cᵤ`. Le problème du chemin de valeur minimale de `x` à `y` consiste à trouver `µ*` tel que `c(µ*) = minᵤ c(µ)`, `µ` chemin de `x` à `y`.

### Condition d'existence

Si `µ` est un chemin non élémentaire de `i` à `j` contenant un circuit `w` de coût `c(w) < 0`, alors `c(µ) = c(µ') + c(w)` (`µ'` = restriction de `µ` n'empruntant pas `w`) : il n'existe pas de chemin minimal, car on peut faire décroître le coût indéfiniment en reparcourant `w`.

**Condition nécessaire d'existence de chemins minimaux :** `G` ne doit pas contenir de circuit de coût négatif (**circuit absorbant**).

**Propriété (existence d'un PCC).** Il existe un PCC entre `s` et `i` ssi (a) `i` est atteignable depuis `s`, et (b) il n'existe pas de circuit absorbant dans le graphe.

**Propriété fondamentale des PCC (principe d'optimalité de Bellman).** Si `µ : s₀→s₁→...→sₖ` est un PCC entre `s₀` et `sₖ`, alors tout sous-chemin `sᵢ→...→sⱼ` (`0≤i<j≤k`) de `µ` est un PCC de `sᵢ` à `sⱼ`.

### Les trois grands types de problèmes de PCC

1. **PCC à origine unique** : tous les PCC depuis un sommet de départ `s`.
2. **PCC à destination unique** : tous les PCC menant à un sommet d'arrivée `t`.
3. **PCC entre toutes les paires de sommets** de `G`.

Algorithmes de Dijkstra et de Bellman → PCC à origine unique. Algorithme de Floyd → PCC entre tous les sommets.

## Algorithmes de recherche de plus court chemin (origine unique)

**Cadre :** graphes orientés `G=(S,A,c)` valués avec `c : A → IR` (sans circuit négatif). **Conventions :** `π*(x)` = valeur d'un chemin minimal de `s` à `x` ; `π(x) = +∞` s'il n'existe pas de chemin de `s` à `x`.

### Algorithme de Moore-Dijkstra

`G(S,A,c)` graphe orienté d'ordre `n`, valué par des **coûts positifs** (`c : A → IR₊`). L'algorithme résout le PCC d'un sommet (numéroté 1) à tous les autres, en `(n-1)` itérations. À chaque itération, l'ensemble des sommets est partitionné en deux sous-ensembles `S₁` et `S̄₁` (`1 ∈ S₁`). On calcule les PCC de proche en proche par ajustements successifs. `π(i)` = longueur d'un PCC de `1` à `i`.

**Algorithme :**
```
1- Initialisation : k := 0, S̄₁ = {2,...,n}, π₀(1) = 0
    ∀i ∈ S̄₁ : π₀(i) = c₁ᵢ si (1,i)∈A, sinon +∞

2- Sélectionner j ∈ S̄₁ / πₖ(j) = min{πₖ(i), i∈S̄₁}
    S̄₁ := S̄₁\{j} ; si S̄₁=∅ → FIN ; sinon aller à 3

3- ∀i ∈ S̄₁ /(j,i)∈A :
    πₖ₊₁(i) = min(πₖ(i), πₖ(j)+cⱼᵢ)
    k := k+1, retour à 2
```

**Complexité : O(n²)** (dans le cas dense, avec un tableau des successeurs).

**Exemple.** Recherche des PCC depuis le sommet `C`, sur un graphe à 7 sommets `A,B,C,D,E,F,G`. Après application de l'algorithme, on obtient l'arborescence des plus courts chemins depuis `C` : `π*(C)=0`, `π*(D)=5`, `π*(E)=8`, `π*(F)=10`, `π*(B)=18`, `π*(A)=19`, `π*(G)=12`.

**Exemple 2 (Dijkstra sur graphe simple).** Sur un réseau `1→{2,3,4}`, `4→{2,5}`, `3→5`, `2→5` (arcs valués), on obtient le PCC de 1 à 5 : `µ: 1→4→2→5`, de valeur `π*(5)=6`.

## Algorithme de Bellman

`G(S,A,c)` : graphe d'ordre `n`, valué par des **longueurs de signes quelconques** (`c : A → IR`). Permet la recherche du PCC d'un sommet `1` à tous les autres, **ou la détection d'un circuit absorbant**. À la kᵉ itération, il calcule la longueur du PCC de `1` à `i` contenant au plus `k` arcs. S'il n'existe pas de circuit absorbant, un chemin de `1` à `i` contiendrait au plus `(n-1)` arcs.

**Algorithme (version naïve) :**
```
1- Initialisation : π₀(1) := 0, ∀i∈S\{1} : π₀(i) := +∞, k := 1
2- πₖ(1) := 0
   ∀i≠1 : πₖ(i) := min_{(j,i)∈U} (πₖ₋₁(i), πₖ₋₁(j)+cⱼᵢ)
3- Si πₖ(i) = πₖ₋₁(i) ∀i → FIN
   Sinon : si k ≤ n-1, k:=k+1 et aller à 2
           si k = n → il existe un circuit absorbant
```

**Algorithme amélioré :** on utilise les résultats déjà calculés à l'itération courante :
```
πₖ(1) := 0
∀i≠1 : πₖ(i) := min_{(j,i)∈U} (πₖ₋₁(i), πₖ₋₁(j)+cⱼᵢ, πₖ(j)+cⱼᵢ)
```
Cet algorithme converge **plus rapidement si les sommets sont visités par ordre de rang croissant** (rang défini comme dans le chapitre 1 : `rg(1)=0`, `rg(i)` = nombre d'arcs du plus long chemin de `1` à `i`).

**Détection d'un circuit absorbant.** Si à l'itération `k=n`, il existe un sommet `i` tel que `πₖ(i) ≠ πₖ₋₁(i)`, cela signale la présence d'un circuit absorbant dans le graphe.

## Partie 2 : Problèmes dérivés — PCC entre toute paire de sommets

### Algorithme de Floyd-Warshall

`G(S,A,c)` : graphe d'ordre `n`, valué par des longueurs de signes quelconques. Recherche du PCC entre toute paire de sommets, ou détection d'un circuit absorbant.

On définit `L = (lᵢⱼ)` avec `lᵢⱼ = lᵢⱼ` si `(i,j)∈U`, `0` si `i=j`, `+∞` sinon. On cherche `L* = (l*ᵢⱼ)`, où `l*ᵢⱼ = c_{µ*}` (`µ*` = PCC de `i` à `j`), `+∞` si un tel chemin n'existe pas.

On calcule `L*` en exactement `n` itérations, via les matrices intermédiaires `L^(k)` :
```
L^(0) = L
∀k≥1 : l^(k)ᵢⱼ = min{l^(k-1)ᵢⱼ, l^(k-1)ᵢₖ + l^(k-1)ₖⱼ}
```
`l^(k)ᵢⱼ` = longueur du PCC de `i` à `j` ne pouvant avoir que des sommets intermédiaires dans `{1,...,k}`.

**Reconstruction du chemin — matrice des prédécesseurs P.** `P^(0) = (p⁰ᵢⱼ)`, `p⁰ᵢⱼ = 0` si `lᵢⱼ=+∞`, `i` sinon. À chaque itération `k` : si `l^k_ij = l^(k-1)_ik + l^(k-1)_kj` alors `p^k_ij = p^(k-1)_kj`.

**Algorithme :**
```
pour k=1 à n
  pour i=1 à n sauf k
    si l_ik + l_ki < 0 : FIN (présence d'un circuit négatif)
    si l_ik ≠ ∞ alors
      pour j=1 à n sauf i
        si l_ik + l_kj < l_ij
          l_ij ← l_ik + l_kj ; p_ij ← p_kj
```
**Complexité : O(n³).**

**Obtention des plus courts chemins.** Pour obtenir le PCC de `i` à `j`, on utilise la iᵉ ligne de la dernière matrice `P*`. Exemple : pour retrouver le PCC de `4` à `1`, on consulte `P^(4)` : `P₄₁=3 ⟹ 3` est le prédécesseur de `1` dans `µ`, `P₄₃=4 ⟹ 4` est le prédécesseur de `3`. D'où `µ : 4 → 3 → 1`.

## Partie 3 : Application du PCC — Le problème central de l'ordonnancement (PERT-MPM)

### Introduction

La réalisation de projets complexes (construction, installation de chaîne de production ou de système d'information...) requiert une planification préalable et un contrôle au cours de l'exécution : ce sont des **problèmes d'ordonnancement**. On cherche un ordre d'exécution des tâches de manière à optimiser un certain critère → **calendrier d'exécution**.

Résoudre un problème d'ordonnancement = trouver l'ordre et le calendrier suivant lequel devront être exécutées les différentes tâches afin d'optimiser un projet donné, en tenant compte de contraintes de type :
- **Potentiel** : contraintes d'antériorité (ou postériorité), localisation temporelle.
- **Disjonctif** : non réalisation simultanée de 2 tâches.
- **Cumulatif** : moyens disponibles (hommes, machines, budgets...).

### Le problème central de l'ordonnancement

Les seules contraintes considérées ici sont les **contraintes d'antériorité**. On cherche à réaliser un ensemble de tâches appelé **projet** ; chaque tâche est caractérisée par sa durée et par les contraintes qui la lient aux autres tâches. **Objectif : finir le projet le plus tôt possible.**

### Le graphe potentiel-tâches (MPM — Méthode des Potentiels Metra)

À partir d'un projet donné, on construit le graphe suivant :
- à chaque tâche `i` on associe un sommet du graphe ;
- on définit l'arc `(i,j)` si la tâche `i` précède la tâche `j` ;
- `cᵢⱼ` représente la durée d'exécution de la tâche `i` ;
- on rajoute deux sommets fictifs : `dp` (début du projet, relié aux sommets sans précédents) et `fp` (fin du projet, relié aux sommets sans suivants).

Le graphe ainsi construit doit être **sans circuit**.

### Calcul des dates au plus tôt et au plus tard

**Dates au plus tôt** (parcours des sommets par rang croissant) :
```
t_dp = 0
tⱼ = max(tᵢ + dᵢ) / i ∈ Γ⁻(j)
```
`tⱼ` représente la longueur du plus long chemin de `dp` à `j`. `t_fp` est le temps minimum pour réaliser le projet = longueur du plus long chemin de `dp` à `fp`.

**Dates au plus tard** (parcours des sommets par rang décroissant) :
```
T_fp = t_fp
Tⱼ = min(Tᵢ - dⱼ) / i ∈ Γ⁺(j)
```

### Marge et chemin critique

- **Marge** de la tâche `i` : `mᵢ = Tᵢ - tᵢ`.
- **Tâches critiques** : celles dont la marge est nulle.
- **Chemin critique** : tout chemin de `dp` à `fp` passant par les sommets critiques et de longueur égale à la durée min du projet.

**Remarques :**
- La contrainte « `i` précède `j` » s'écrit `tⱼ ≥ tᵢ+dᵢ`, i.e. `tⱼ-tᵢ ≥ dᵢ`.
- Un retard sur une tâche critique augmente d'autant la durée minimale du projet.

**Exemple (construction d'une maison).** Tâches A (gros-œuvre, 7j), B (charpente, 3j, préc. A), C (toiture, 1j, préc. B), D (installation sanitaire/électrique, 8j, préc. A), E (façade, 2j, préc. D,C), F (fenêtres, 1j, préc. D,C), G (aménagement jardin, 1j, préc. D,C), H (plafonnage, 2j, préc. F), I (peinture, 2j, préc. H), J (emménagement, 1j, préc. E,G,I). Le graphe potentiel-tâches donne une **durée minimale de 21 unités de temps**, avec chemin critique `dp→A→D→F→H→I→J→fp`.

### Traduction des contraintes non purement d'antériorité

- « `j` ne doit pas commencer avant la moitié du temps de réalisation de `i` » → arc `(i,j)` de valeur `dᵢ/2`.
- « `j` ne doit commencer qu'après un temps `t` de la fin de `i` » → arc `(i,j)` de valeur `dᵢ+t`.
- « `j` ne doit commencer qu'après la date `bⱼ` » → arc `(dp,j)` de durée `bⱼ`.
- « `j` doit commencer avant la date `cⱼ` » → arc `(dp,j)` de durée `-cⱼ`.
- « `j` doit suivre immédiatement `i` » → circuit entre `i` et `j` : arc `(i,j)` de valeur `dᵢ` et arc `(j,i)` de valeur `-dᵢ`.

:::note Attention
L'ajout de ces contraintes peut introduire des **circuits** dans le graphe : un circuit à coût négatif donne la longueur du plus long chemin = durée minimale des travaux ; un circuit à coût positif (absorbant) signifie qu'il **n'y a pas de solution** (contraintes incompatibles).
:::

### Le graphe potentiel-étapes (PERT — Program Evaluation and Review Technic)

Représentation alternative : chaque tâche est un **arc** de longueur `dᵢ` ; les sommets représentent les **étapes** du projet (début/fin de chaque tâche). Si une tâche `j` succède à une tâche `i`, l'extrémité initiale de `j` coïncide avec l'extrémité terminale de `i`. On rajoute deux étapes fictives `dp` et `fp`. On obtient ainsi un **graphe sans circuit**.

**Règles de construction :**
1. Toute tâche a une étape de début et une étape de fin : une tâche suivante ne peut démarrer que si la précédente est terminée.
2. Deux tâches qui se succèdent immédiatement sont représentées par des flèches qui se suivent.
3. Deux tâches simultanées (mêmes origine) sont représentées par deux flèches partant du même sommet.
4. Deux tâches convergentes (précédant une même tâche) convergent vers le même sommet.
5. Si une tâche `C` succède à `A` et `B`, et qu'une tâche `D` succède seulement à `A` (et non à `B`), il faut introduire une **tâche fictive de durée nulle** pour éviter de créer une fausse dépendance.

Les dates au plus tôt/tard d'une tâche sont calculées comme pour le graphe potentiel-tâches. La durée minimale du projet est la longueur du plus long chemin entre le début et la fin du projet.

### Le diagramme de Gantt

**Principe.** On représente dans un tableau, en ligne les différentes tâches et en colonne les unités de temps (mois, semaines, jours...). La durée d'exécution d'une tâche est matérialisée par un trait au sein du diagramme.

**Réalisation :**
1. Déterminer les tâches et leur durée.
2. Définir les relations d'antériorité entre tâches.
3. Représenter d'abord les tâches sans antériorité, puis celles dont les tâches antérieures ont déjà été représentées, et ainsi de suite.
4. Représenter par un trait parallèle en pointillé la progression réelle du travail.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/graphe-ch2-pcc-ordonnancement.pdf" />

</TabItem>
</Tabs>
