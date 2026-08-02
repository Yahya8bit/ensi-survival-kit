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

**Définition 1 (réseau de transport).** On appelle **réseau de transport** un graphe $G=(S,A,c)$ orienté, valué positivement, sans boucle, ayant une **entrée (racine) $e$** (nœud sans précédent) et une **sortie (puits) $s$** (nœud sans suivant). $c(u)$ est la **capacité** de l'arc $u$.

**Définition 2 (flot compatible).** Un **flot compatible (réalisable)** $f$ sur un réseau $G=(S,A,c)$ est une application $f : A \to IR$ vérifiant :
1. **Contraintes de capacité :** $0 \le f_{ij} \le c_{ij}$, $\forall(i,j)\in A$ ($f_{ij}$ = flux sur l'arc $(i,j)$).
2. **Contraintes de conservation (loi de Kirchhoff) :** $\forall i\in S\setminus\{e,s\}$, $\sum_{j\in\Gamma^+(i)} f_{ij} = \sum_{k\in\Gamma^-(i)} f_{ki}$ (flot entrant = flot sortant en tout sommet intermédiaire).
3. **Valeur totale du flot :** $v = v(f_{e,s}) = \sum_{j\in\Gamma^+(e)} f_{ej} = \sum_{i\in\Gamma^-(s)} f_{is}$.

**Exemple.** Sur un réseau $e\to1\to3\to s$, $e\to2\to4\to s$ etc., le **flot nul** ($v(f)=0$) est toujours compatible. Un flot avec valeurs non nulles respectant les contraintes ci-dessus (ex. $v(f)=5$) est un exemple de flot compatible non trivial.

## 2. Le problème du flot maximal

**Intro.** On cherche à trouver le trafic maximal entre $e$ et $s$ sur un réseau routier de capacités données.

**Formulation.**
$$
\begin{aligned}
&\max\left(v = \sum_{i\in\Gamma^-(s)} f_{is} = \sum_{j\in\Gamma^+(e)} f_{ej}\right) \\
&\text{s/c :} \\
&\quad \sum_{i\in\Gamma^-(j)} f_{ij} - \sum_{i\in\Gamma^+(k)} f_{ki} = 0, \quad \forall i \neq e,s \\
&\quad 0 \le f_{ij} \le c_{ij}
\end{aligned}
$$
Les inconnues sont les $f_{ij}$ (flux sur chaque arc) et la valeur $v$ du flot.

### 2.1 Flot complet

Une première idée pour optimiser (maximiser) le flot est de **saturer** successivement les chemins de `e` à `s`. On obtient un flot dit **complet**, qui n'est pas (en général) maximal, mais fournit une excellente solution de départ pour l'algorithme de Ford-Fulkerson.

**Définition 3 (arc saturé).** Un arc $u=(i,j)\in A$ est dit **saturé** si $f_{ij} = c_{ij}$.

**Définition 4 (flot complet).** Un **flot complet** est un flot compatible pour lequel **tout chemin allant de $e$ à $s$ contient au moins un arc saturé**.

**Rendre le flot complet (recherche des chemins améliorants).** À partir d'un flot $f$ donné, existe-t-il un chemin $\mu$ de $e$ à $s$ le long duquel aucun arc n'est saturé ? Si oui, on augmente le flot d'une valeur $\delta = \min_{u\in\mu}(c(u)-f(u))$.

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

**Exemple.** Sur un réseau $e\to\{A,B,C\}\to\{D,E,F\}\to s$, on trouve les 6 chemins améliorants successifs : $e\to A\to D\to s$ ($\delta=15$), $e\to A\to E\to s$ ($\delta=5$), $e\to B\to D\to s$ ($\delta=10$), $e\to B\to E\to s$ ($\delta=5$), $e\to B\to F\to s$ ($\delta=5$), $e\to C\to F\to s$ ($\delta=10$). On obtient un **flot complet de valeur 50**.

### 2.2 Algorithme de Ford & Fulkerson (1956)

**Définition 5 (chaîne améliorante).** Une **chaîne améliorante** (augmentant le flot) est une chaîne $\mu$ d'origine $e$, d'extrémité $s$, telle que :
- pour chaque **arc avant** $a\in\mu^+$ (emprunté dans le sens du parcours) : $f(a) < c(a)$ ;
- pour chaque **arc arrière** $a\in\mu^-$ (emprunté en sens inverse) : $f(a) > 0$.

Pour déterminer les chaînes améliorantes, on utilise une exploration en largeur : on marque $e$, puis à partir d'un sommet $i$ marqué, on marque tout sommet $j$ tel que l'arc $(i,j)$ est non saturé ($f(i,j)<c(i,j)$) **ou** l'arc $(j,i)$ a un flot non nul ($f(j,i)>0$). Il existe une chaîne améliorante ssi on peut marquer $s$.

**Mise à jour du flot.** Le long de la chaîne trouvée, on augmente le flot d'une valeur $\theta = \min(\theta_1,\theta_2)$ où $\theta_1 = \min_{a\in\mu^+}(c(a)-f(a))$ et $\theta_2 = \min_{a\in\mu^-}(f(a))$ :
$$
\begin{aligned}
\text{pour tout } a\in\mu^+ &: f(a) := f(a) + \theta \\
\text{pour tout } a\in\mu^- &: f(a) := f(a) - \theta
\end{aligned}
$$

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

**Théorème 1 (CNS de flot maximal).** Une condition nécessaire et suffisante pour qu'un flot soit maximal est **qu'il n'existe aucune chaîne améliorant le flot entre $e$ et $s$**.

**Exemple (repris du flot complet de valeur 50).** On trouve une chaîne améliorante $\mu: e\to B\to D\leftarrow A\to E\to s$ (chaîne non orientée, empruntant un arc arrière sur $(A,D)$), avec $\theta=\min\{\theta_1,\theta_2\}=5$. Après mise à jour, on ne peut plus marquer $s$ : **le flot est maximal, de valeur $v_{\max}(f) = 55$.**

## 2.3 Flot maximal et coupe minimale

**Définition 6 (coupe).** Une **coupe** d'un graphe valué $G=(S,A,c)$ ayant une seule entrée $e$ et un seul puits $s$ est une partition des sommets $(N,\bar{N})$ telle que $S=N\cup\bar{N}$, $N\cap\bar{N}=\emptyset$, $e\in N$, $s\in\bar{N}$. La **capacité de la coupe** est $c(N,\bar{N}) = \sum_{i\in N,j\in\bar{N}} c_{ij}$.

**Théorème 2.** Pour tout flot réalisable $f$ et toute coupe $(N,\bar{N})$ : $v(f) \le c(N,\bar{N})$.

*(Preuve : par les contraintes de conservation appliquées sur $N$, on obtient $f(N,\bar{N}) - f(\bar{N},N) = v(f)$, et comme $f(\bar{N},N)\ge0$ et $f(N,\bar{N})\le c(N,\bar{N})$, on a $v(f) \le c(N,\bar{N})$.)*

**Coupe de capacité minimale.** Une **coupe min** $(N_0,\bar{N}_0)$ vérifie $c(N_0,\bar{N}_0) \le c(N,\bar{N})$ pour toute coupe $(N,\bar{N})$.

**Construction d'une coupe min.** Une fois qu'il n'existe plus de chaîne augmentant le flot (fin de l'algorithme de Ford-Fulkerson), soit $f_{\max}$ le flot maximal. On construit la coupe $(N_0,\bar{N}_0)$ où $N_0$ = tous les sommets **marqués** ($e\in N_0$) et $\bar{N}_0$ = tous les sommets **non marqués** ($s\in\bar{N}_0$). On montre alors que tous les arcs de $N_0$ vers $\bar{N}_0$ sont saturés et tous les arcs de $\bar{N}_0$ vers $N_0$ ont un flot nul.

**Théorème 3 (Ford-Fulkerson, max-flow min-cut).** $(N_0,\bar{N}_0)$ est une coupe de capacité minimale, et **la capacité minimale d'une coupe est égale à la valeur du flot maximal** : $C(N_0,\bar{N}_0) = V(f_{\max}) \le C(N,\bar{N})$ pour toute coupe.

## 3. Application : couplage maximum dans un graphe biparti

**Définition 8 (graphe biparti).** Un graphe $G=(S,A)$ est **biparti** si $S$ peut être partitionné en $L$ et $R$ tels que si $(i,j)\in A$ alors ($i\in L$ et $j\in R$) ou ($j\in L$ et $i\in R$).

**Définition 9 (couplage).** Un **couplage** est un sous-ensemble d'arêtes $M\subset A$ deux à deux non adjacentes, tel que pour tout sommet $i$ de $S$, au plus une arête de $M$ est incidente à $i$. Un **couplage maximum** est un couplage de cardinalité maximale.

**Application** : affectation de personnes à des tâches (une personne par tâche) — graphe d'affectation biparti, sommets = individus, arêtes = affectations possibles.

**Algorithme de Ford & Fulkerson et couplage maximum.**
1. On construit un graphe orienté $G'=(S',A')$ : $S'=S\cup\{s,t\}$ ; $A'$ = arcs correspondant aux arêtes de $A$ orientées de $L$ vers $R$, plus $n$ nouveaux arcs $(s,j), j\in L$ et $(j,t), j\in R$.
2. On affecte une capacité unitaire à tout arc de $A'$.
3. On utilise Ford-Fulkerson pour trouver un flot maximal entre $s$ et $t$.

Un couplage de $G$ correspond à un flot de $G'$ : les arcs saturés de $L$ à $R$ correspondent aux arêtes d'un couplage maximal. La cardinalité du couplage maximal = valeur du flot maximal dans $G'$.

## 4. Flot à coût minimum

**Position du problème.** $G=(S,A,c,\gamma)$ : graphe connexe où chaque arc $a$ a une capacité $c(a)$ et un coût unitaire de transport $\gamma(a)$. Le coût total du flot est $C_T = \sum_{a\in A} \gamma(a)f(a)$. On cherche à trouver un flot $f$ de coût $C_T$ **minimum** (pour une valeur $v$ donnée, ou pour le flot maximal).

### 4.1 Graphe d'écart

**Définition 7.** Le **graphe d'écart** associé à un flot $f$ est $G^e(f)=(S,A^e(f))$, où pour tout arc $a=(i,j)\in A$ on associe au plus 2 arcs de $A^e(f)$ :
- $a^+=(i,j)$ si $f(i,j) < c(i,j)$, de **capacité résiduelle** $c(a^+) = c(a)-f(a)$ et **coût résiduel** $\gamma(a^+) = \gamma(a)$.
- $a^-=(j,i)$ si $f(i,j) > 0$, de capacité résiduelle $c(a^-) = f(a)$ et coût résiduel $\gamma(a^-) = -\gamma(a)$.

### 4.2 Algorithme de Busacker et Gowen

**Principe.** On cherche un flot de $e$ à $s$ de valeur $v$ fixée et à coût minimal. Chaque arc $a$ de $G$ a une capacité $c(a)$ et un coût unitaire $\gamma(a)$. On suppose qu'il n'y a pas de circuit de coût négatif et que $v$ est inférieur à la valeur max du flot entre $e$ et $s$.

L'algorithme permet de déterminer la famille complète des flots de $e$ à $s$ de coût min, pour toute valeur $v(f)=1,2,\ldots,v$. En particulier, il permet de déterminer **un flot max à coût min**.

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

**Exemple.** Sur un réseau $A\to\{B,C\}\to\{D,E\}\to\ldots$, en itérant l'algorithme de Busacker et Gowen (4 itérations successives via l'algorithme de Bellman amélioré sur le graphe d'écart), on obtient un flot maximal $v_{\max}(f)=11$ à coût minimum $c(f_{\max})=59$.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/graphe-ch4-flots.pdf" />

</TabItem>
</Tabs>
