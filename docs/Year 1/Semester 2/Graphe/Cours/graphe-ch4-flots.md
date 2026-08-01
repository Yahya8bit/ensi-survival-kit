---
sidebar_position: 4
title: Chapitre IV - Flots dans les Réseaux de Transport
sidebar_label: Ch4 - Flots et Applications
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre IV : Flots dans les réseaux de transport

*ENSI-II1 — 2024/2025 — Nadia Chaouachi*

## Introduction

Le problème des flots dans les réseaux concerne la circulation de matière sur les arcs d'un graphe. Un arc représente : un tronçon de route, une liaison entre entrepôts/ports/aéroports, une connexion entre ordinateurs, une connexion électrique entre villes...

**Applications :** trafic routier/aérien/maritime, réseaux de transport de marchandises, écoulement de liquides dans des tuyaux, courant dans les réseaux électriques, transport de données dans les réseaux de communication, ordonnancement de projets...

## 1. Définitions

**Définition 1 (réseau de transport).** On appelle **réseau de transport** un graphe `G=(S,A,c)` orienté, valué positivement, sans boucle, ayant une **entrée (racine) `e`** (nœud sans précédent) et une **sortie (puits) `s`** (nœud sans suivant). `c(u)` est la **capacité** de l'arc `u`.

**Définition 2 (flot compatible).** Un **flot compatible (réalisable)** `f` sur un réseau `G=(S,A,c)` est une application `f : A → IR` vérifiant :
1. **Contraintes de capacité :** `0 ≤ fᵢⱼ ≤ cᵢⱼ`, `∀(i,j)∈A` (`fᵢⱼ` = flux sur l'arc `(i,j)`).
2. **Contraintes de conservation (loi de Kirchhoff) :** `∀i∈S\{e,s}`, `Σⱼ∈Γ⁺(i) fᵢⱼ = Σₖ∈Γ⁻(i) fₖᵢ` (flot entrant = flot sortant en tout sommet intermédiaire).
3. **Valeur totale du flot :** `v = v(f_{e,s}) = Σⱼ∈Γ⁺(e) fₑⱼ = Σᵢ∈Γ⁻(s) fᵢₛ`.

**Exemple.** Sur un réseau `e→1→3→s`, `e→2→4→s` etc., le **flot nul** (`v(f)=0`) est toujours compatible. Un flot avec valeurs non nulles respectant les contraintes ci-dessus (ex. `v(f)=5`) est un exemple de flot compatible non trivial.

## 2. Le problème du flot maximal

**Intro.** On cherche à trouver le trafic maximal entre `e` et `s` sur un réseau routier de capacités données.

**Formulation.**
```
max(v = Σᵢ∈Γ⁻(s) fᵢₛ = Σⱼ∈Γ⁺(e) fₑⱼ)
s/c :
  Σᵢ∈Γ⁻(j) fᵢⱼ - Σᵢ∈Γ⁺(k) fₖᵢ = 0,  ∀i ≠ e,s
  0 ≤ fᵢⱼ ≤ cᵢⱼ
```
Les inconnues sont les `fᵢⱼ` (flux sur chaque arc) et la valeur `v` du flot.

### 2.1 Flot complet

Une première idée pour optimiser (maximiser) le flot est de **saturer** successivement les chemins de `e` à `s`. On obtient un flot dit **complet**, qui n'est pas (en général) maximal, mais fournit une excellente solution de départ pour l'algorithme de Ford-Fulkerson.

**Définition 3 (arc saturé).** Un arc `u=(i,j)∈A` est dit **saturé** si `fᵢⱼ = cᵢⱼ`.

**Définition 4 (flot complet).** Un **flot complet** est un flot compatible pour lequel **tout chemin allant de `e` à `s` contient au moins un arc saturé**.

**Rendre le flot complet (recherche des chemins améliorants).** À partir d'un flot `f` donné, existe-t-il un chemin `µ` de `e` à `s` le long duquel aucun arc n'est saturé ? Si oui, on augmente le flot d'une valeur `δ = min_{u∈µ}(c(u)-f(u))`.

**Algorithme de recherche d'un flot complet :**
```
On part d'un flot initial f (par ex. f=0), et on l'améliore pas à pas par
marquage :
1. Marquer e par (+).
2. À partir d'un sommet i marqué, marquer par (+) tout successeur j de i
   tel que fᵢⱼ < cᵢⱼ.
3. Si s est marqué, augmenter la valeur du flot de δ = min_{u∈µ}(c(u)-f(u))
   et retourner à 2, jusqu'à ce qu'on ne puisse plus atteindre s depuis e.
```

**Exemple.** Sur un réseau `e→{A,B,C}→{D,E,F}→s`, on trouve les 6 chemins améliorants successifs : `e→A→D→s` (δ=15), `e→A→E→s` (δ=5), `e→B→D→s` (δ=10), `e→B→E→s` (δ=5), `e→B→F→s` (δ=5), `e→C→F→s` (δ=10). On obtient un **flot complet de valeur 50**.

### 2.2 Algorithme de Ford & Fulkerson (1956)

**Définition 5 (chaîne améliorante).** Une **chaîne améliorante** (augmentant le flot) est une chaîne `µ` d'origine `e`, d'extrémité `s`, telle que :
- pour chaque **arc avant** `a∈µ⁺` (emprunté dans le sens du parcours) : `f(a) < c(a)` ;
- pour chaque **arc arrière** `a∈µ⁻` (emprunté en sens inverse) : `f(a) > 0`.

Pour déterminer les chaînes améliorantes, on utilise une exploration en largeur : on marque `e`, puis à partir d'un sommet `i` marqué, on marque tout sommet `j` tel que l'arc `(i,j)` est non saturé (`f(i,j)<c(i,j)`) **ou** l'arc `(j,i)` a un flot non nul (`f(j,i)>0`). Il existe une chaîne améliorante ssi on peut marquer `s`.

**Mise à jour du flot.** Le long de la chaîne trouvée, on augmente le flot d'une valeur `θ = min(θ₁,θ₂)` où `θ₁ = min_{a∈µ⁺}(c(a)-f(a))` et `θ₂ = min_{a∈µ⁻}(f(a))` :
```
pour tout a∈µ⁺ : f(a) := f(a) + θ
pour tout a∈µ⁻ : f(a) := f(a) - θ
```

**Algorithme complet :**
```
1- Soit f un flot initial réalisable (en général, le flot nul).
2- Étape 1 : rendre le flot complet (saturer tous les chemins possibles) —
   marquage identique à l'algorithme de flot complet.
3- Étape 2 : rechercher des chaînes augmentant le flot (arcs avant non
   saturés OU arcs arrière de flot non nul), augmenter le flot de
   θ=min(θ₁,θ₂) le long de chaque chaîne trouvée, jusqu'à ce qu'on ne
   puisse plus marquer s depuis e.
```

**Théorème 1 (CNS de flot maximal).** Une condition nécessaire et suffisante pour qu'un flot soit maximal est **qu'il n'existe aucune chaîne améliorant le flot entre `e` et `s`**.

**Exemple (repris du flot complet de valeur 50).** On trouve une chaîne améliorante `µ: e→B→D←A→E→s` (chaîne non orientée, empruntant un arc arrière sur `(A,D)`), avec `θ=min{θ₁,θ₂}=5`. Après mise à jour, on ne peut plus marquer `s` : **le flot est maximal, de valeur `v_max(f) = 55`.**

## 2.3 Flot maximal et coupe minimale

**Définition 6 (coupe).** Une **coupe** d'un graphe valué `G=(S,A,c)` ayant une seule entrée `e` et un seul puits `s` est une partition des sommets `(N,N̄)` telle que `S=N∪N̄`, `N∩N̄=∅`, `e∈N`, `s∈N̄`. La **capacité de la coupe** est `c(N,N̄) = Σᵢ∈N,ⱼ∈N̄ cᵢⱼ`.

**Théorème 2.** Pour tout flot réalisable `f` et toute coupe `(N,N̄)` : `v(f) ≤ c(N,N̄)`.

*(Preuve : par les contraintes de conservation appliquées sur `N`, on obtient `f(N,N̄) - f(N̄,N) = v(f)`, et comme `f(N̄,N)≥0` et `f(N,N̄)≤c(N,N̄)`, on a `v(f) ≤ c(N,N̄)`.)*

**Coupe de capacité minimale.** Une **coupe min** `(N₀,N̄₀)` vérifie `c(N₀,N̄₀) ≤ c(N,N̄)` pour toute coupe `(N,N̄)`.

**Construction d'une coupe min.** Une fois qu'il n'existe plus de chaîne augmentant le flot (fin de l'algorithme de Ford-Fulkerson), soit `f_max` le flot maximal. On construit la coupe `(N₀,N̄₀)` où `N₀` = tous les sommets **marqués** (`e∈N₀`) et `N̄₀` = tous les sommets **non marqués** (`s∈N̄₀`). On montre alors que tous les arcs de `N₀` vers `N̄₀` sont saturés et tous les arcs de `N̄₀` vers `N₀` ont un flot nul.

**Théorème 3 (Ford-Fulkerson, max-flow min-cut).** `(N₀,N̄₀)` est une coupe de capacité minimale, et **la capacité minimale d'une coupe est égale à la valeur du flot maximal** : `C(N₀,N̄₀) = V(f_max) ≤ C(N,N̄)` pour toute coupe.

## 3. Application : couplage maximum dans un graphe biparti

**Définition 8 (graphe biparti).** Un graphe `G=(S,A)` est **biparti** si `S` peut être partitionné en `L` et `R` tels que si `(i,j)∈A` alors (`i∈L` et `j∈R`) ou (`j∈L` et `i∈R`).

**Définition 9 (couplage).** Un **couplage** est un sous-ensemble d'arêtes `M⊂A` deux à deux non adjacentes, tel que pour tout sommet `i` de `S`, au plus une arête de `M` est incidente à `i`. Un **couplage maximum** est un couplage de cardinalité maximale.

**Application** : affectation de personnes à des tâches (une personne par tâche) — graphe d'affectation biparti, sommets = individus, arêtes = affectations possibles.

**Algorithme de Ford & Fulkerson et couplage maximum.**
1. On construit un graphe orienté `G'=(S',A')` : `S'=S∪{s,t}` ; `A'` = arcs correspondant aux arêtes de `A` orientées de `L` vers `R`, plus `n` nouveaux arcs `(s,j), j∈L` et `(j,t), j∈R`.
2. On affecte une capacité unitaire à tout arc de `A'`.
3. On utilise Ford-Fulkerson pour trouver un flot maximal entre `s` et `t`.

Un couplage de `G` correspond à un flot de `G'` : les arcs saturés de `L` à `R` correspondent aux arêtes d'un couplage maximal. La cardinalité du couplage maximal = valeur du flot maximal dans `G'`.

## 4. Flot à coût minimum

**Position du problème.** `G=(S,A,c,γ)` : graphe connexe où chaque arc `a` a une capacité `c(a)` et un coût unitaire de transport `γ(a)`. Le coût total du flot est `C_T = Σₐ∈A γ(a)f(a)`. On cherche à trouver un flot `f` de coût `C_T` **minimum** (pour une valeur `v` donnée, ou pour le flot maximal).

### 4.1 Graphe d'écart

**Définition 7.** Le **graphe d'écart** associé à un flot `f` est `Gᵉ(f)=(S,Aᵉ(f))`, où pour tout arc `a=(i,j)∈A` on associe au plus 2 arcs de `Aᵉ(f)` :
- `a⁺=(i,j)` si `f(i,j) < c(i,j)`, de **capacité résiduelle** `c(a⁺) = c(a)-f(a)` et **coût résiduel** `γ(a⁺) = γ(a)`.
- `a⁻=(j,i)` si `f(i,j) > 0`, de capacité résiduelle `c(a⁻) = f(a)` et coût résiduel `γ(a⁻) = -γ(a)`.

### 4.2 Algorithme de Busacker et Gowen

**Principe.** On cherche un flot de `e` à `s` de valeur `v` fixée et à coût minimal. Chaque arc `a` de `G` a une capacité `c(a)` et un coût unitaire `γ(a)`. On suppose qu'il n'y a pas de circuit de coût négatif et que `v` est inférieur à la valeur max du flot entre `e` et `s`.

L'algorithme permet de déterminer la famille complète des flots de `e` à `s` de coût min, pour toute valeur `v(f)=1,2,...,v`. En particulier, il permet de déterminer **un flot max à coût min**.

**Algorithme :**
```
1- Initialisation : flot initial f ≡ 0
2- À l'itération k, soit fᵏ le flot de valeur v(fᵏ)=vₖ, à coût minimum.
   Soit Gᵉ(fᵏ) le graphe d'écart associé, avec capacités et coûts résiduels.
3- Chercher un chemin de coût minimum (relativement à γ) entre e et s
   sur Gᵉ(fᵏ). Soit µₖ ce chemin, et ε = min_{a∈µₖ} c(a) sa capacité.
   Si un tel chemin n'existe pas : FIN.
   Sinon, on ajoute i∈{1,...,ε} unités de flot au flot fᵏ, obtenant une
   suite de flots de valeurs vₖ+1,...,vₖ+ε à coût minimum.
   Si vₖ+ε ≥ v → FIN, le problème est résolu.
   Sinon aller à 4.
4- Le flot fᵏ⁺¹ est le flot à coût min de valeur vₖ+ε défini en 3.
   k := k+1, retour à 2.
```

Pour trouver le chemin de coût minimum sur le graphe d'écart (qui peut contenir des coûts négatifs), on utilise l'**algorithme de Bellman** (amélioré). À chaque itération, l'algorithme trouve un plus court chemin, met à jour le flot le long de ce chemin (en ajoutant le flot sur les arcs avant, en retranchant sur les arcs arrière), jusqu'à ce qu'il n'existe plus de chemin améliorant : **le flot est alors maximal à coût minimum**.

**Exemple.** Sur un réseau `A→{B,C}→{D,E}→...`, en itérant l'algorithme de Busacker et Gowen (4 itérations successives via l'algorithme de Bellman amélioré sur le graphe d'écart), on obtient un flot maximal `v_max(f)=11` à coût minimum `c(f_max)=59`.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/graphe-ch4-flots.pdf" />

</TabItem>
</Tabs>
