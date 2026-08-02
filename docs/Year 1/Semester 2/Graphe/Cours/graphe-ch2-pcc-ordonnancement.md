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

On considère un graphe $G = (S,A)$ orienté et valué. Le problème de la recherche d'un plus court chemin a de nombreuses applications : routage de paquets, diamètre d'un réseau de télécommunications (qualité de service), problèmes de transport, jeux (graphe des états et transitions légales), investissements/ordonnancement, navigation...

### Formulation du problème

Soit $G = (S,A,c)$ un graphe orienté et valué (**réseau**), $c : A \to IR$, $c_u$ = valeur/poids/coût de l'arc $u$. Le poids d'un chemin $\mu$ est $c(\mu) = \sum_{u\in\mu} c_u$. Le problème du chemin de valeur minimale de $x$ à $y$ consiste à trouver $\mu^*$ tel que $c(\mu^*) = \min_\mu c(\mu)$, $\mu$ chemin de $x$ à $y$.

### Condition d'existence

Si $\mu$ est un chemin non élémentaire de $i$ à $j$ contenant un circuit $w$ de coût $c(w) < 0$, alors $c(\mu) = c(\mu') + c(w)$ ($\mu'$ = restriction de $\mu$ n'empruntant pas $w$) : il n'existe pas de chemin minimal, car on peut faire décroître le coût indéfiniment en reparcourant $w$.

**Condition nécessaire d'existence de chemins minimaux :** $G$ ne doit pas contenir de circuit de coût négatif (**circuit absorbant**).

**Propriété (existence d'un PCC).** Il existe un PCC entre $s$ et $i$ ssi (a) $i$ est atteignable depuis $s$, et (b) il n'existe pas de circuit absorbant dans le graphe.

**Propriété fondamentale des PCC (principe d'optimalité de Bellman).** Si $\mu : s_0\to s_1\to\ldots\to s_k$ est un PCC entre $s_0$ et $s_k$, alors tout sous-chemin $s_i\to\ldots\to s_j$ ($0\le i<j\le k$) de $\mu$ est un PCC de $s_i$ à $s_j$.

### Les trois grands types de problèmes de PCC

1. **PCC à origine unique** : tous les PCC depuis un sommet de départ $s$.
2. **PCC à destination unique** : tous les PCC menant à un sommet d'arrivée $t$.
3. **PCC entre toutes les paires de sommets** de $G$.

Algorithmes de Dijkstra et de Bellman → PCC à origine unique. Algorithme de Floyd → PCC entre tous les sommets.

## Algorithmes de recherche de plus court chemin (origine unique)

**Cadre :** graphes orientés $G=(S,A,c)$ valués avec $c : A \to IR$ (sans circuit négatif). **Conventions :** $\pi^*(x)$ = valeur d'un chemin minimal de $s$ à $x$ ; $\pi(x) = +\infty$ s'il n'existe pas de chemin de $s$ à $x$.

### Algorithme de Moore-Dijkstra

$G(S,A,c)$ graphe orienté d'ordre $n$, valué par des **coûts positifs** ($c : A \to IR_+$). L'algorithme résout le PCC d'un sommet (numéroté 1) à tous les autres, en $(n-1)$ itérations. À chaque itération, l'ensemble des sommets est partitionné en deux sous-ensembles $S_1$ et $\bar{S}_1$ ($1 \in S_1$). On calcule les PCC de proche en proche par ajustements successifs. $\pi(i)$ = longueur d'un PCC de $1$ à $i$.

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

**Complexité : $O(n^2)$** (dans le cas dense, avec un tableau des successeurs).

**Exemple.** Recherche des PCC depuis le sommet $C$, sur un graphe à 7 sommets `A,B,C,D,E,F,G`. Après application de l'algorithme, on obtient l'arborescence des plus courts chemins depuis $C$ : $\pi^*(C)=0$, $\pi^*(D)=5$, $\pi^*(E)=8$, $\pi^*(F)=10$, $\pi^*(B)=18$, $\pi^*(A)=19$, $\pi^*(G)=12$.

<DijkstraVisualizer />

**Exemple 2 (Dijkstra sur graphe simple).** Sur un réseau $1\to\{2,3,4\}$, $4\to\{2,5\}$, $3\to 5$, $2\to 5$ (arcs valués), on obtient le PCC de 1 à 5 : $\mu: 1\to4\to2\to5$, de valeur $\pi^*(5)=6$.

<div style={{textAlign: 'center', overflowX: 'auto'}}>
<svg viewBox="0 0 480 300" width="100%" style={{maxWidth: '440px'}} xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="ex2-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L7,3 L0,6 Z" fill="var(--ifm-color-emphasis-600)" />
    </marker>
    <marker id="ex2-arrow-hl" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L7,3 L0,6 Z" fill="var(--ifm-color-primary)" />
    </marker>
  </defs>
  <g strokeWidth="1.5" fill="none">
    <line x1="80.3" y1="141.5" x2="229.7" y2="78.5" stroke="var(--ifm-color-emphasis-600)" markerEnd="url(#ex2-arrow)" />
    <line x1="82" y1="150" x2="228" y2="150" stroke="var(--ifm-color-emphasis-600)" markerEnd="url(#ex2-arrow)" />
    <line x1="79.9" y1="159.4" x2="230.1" y2="230.6" stroke="var(--ifm-color-primary)" strokeWidth="2.5" markerEnd="url(#ex2-arrow-hl)" />
    <line x1="250" y1="218" x2="250" y2="92" stroke="var(--ifm-color-primary)" strokeWidth="2.5" markerEnd="url(#ex2-arrow-hl)" />
    <line x1="269.9" y1="230.6" x2="420.1" y2="159.4" stroke="var(--ifm-color-emphasis-600)" markerEnd="url(#ex2-arrow)" />
    <line x1="272" y1="150" x2="418" y2="150" stroke="var(--ifm-color-emphasis-600)" markerEnd="url(#ex2-arrow)" />
    <line x1="270.3" y1="78.5" x2="419.7" y2="141.5" stroke="var(--ifm-color-primary)" strokeWidth="2.5" markerEnd="url(#ex2-arrow-hl)" />
  </g>
  <g>
    <circle cx="60" cy="150" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="250" cy="70" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="250" cy="150" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="250" cy="240" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="440" cy="150" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
  </g>
  <g fontSize="14" fontWeight="bold" fill="var(--ifm-font-color-base)" textAnchor="middle">
    <text x="60" y="155">1</text>
    <text x="250" y="75">2</text>
    <text x="250" y="155">3</text>
    <text x="250" y="245">4</text>
    <text x="440" y="155">5</text>
  </g>
  <g fontSize="12" fill="var(--ifm-color-primary)" textAnchor="middle">
    <text x="240" y="285">chemin μ : 1→4→2→5 (valeur 6)</text>
  </g>
</svg>
</div>

## Algorithme de Bellman

$G(S,A,c)$ : graphe d'ordre $n$, valué par des **longueurs de signes quelconques** ($c : A \to IR$). Permet la recherche du PCC d'un sommet $1$ à tous les autres, **ou la détection d'un circuit absorbant**. À la kᵉ itération, il calcule la longueur du PCC de $1$ à $i$ contenant au plus $k$ arcs. S'il n'existe pas de circuit absorbant, un chemin de $1$ à $i$ contiendrait au plus $(n-1)$ arcs.

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
$$
\begin{aligned}
&\pi_k(1) := 0 \\
&\forall i\neq 1 : \pi_k(i) := \min_{(j,i)\in U} (\pi_{k-1}(i), \pi_{k-1}(j)+c_{ji}, \pi_k(j)+c_{ji})
\end{aligned}
$$
Cet algorithme converge **plus rapidement si les sommets sont visités par ordre de rang croissant** (rang défini comme dans le chapitre 1 : $rg(1)=0$, $rg(i)$ = nombre d'arcs du plus long chemin de $1$ à $i$).

**Détection d'un circuit absorbant.** Si à l'itération $k=n$, il existe un sommet $i$ tel que $\pi_k(i) \neq \pi_{k-1}(i)$, cela signale la présence d'un circuit absorbant dans le graphe.

**Exemple.** Recherche du PCC de $A$ à $G$ sur un graphe comportant un **arc de poids négatif** ($B\to F$, poids $-3$) — c'est précisément ce genre de graphe que Dijkstra ne peut pas traiter correctement, d'où le recours à Bellman. Rang des sommets : $rg(A)=0$, $rg(C)=1$, $rg(B)=2$, $rg(F)=3$, $rg(D)=rg(E)=4$, $rg(G)=5$.

<BellmanVisualizer />

## Partie 2 : Problèmes dérivés — PCC entre toute paire de sommets

### Algorithme de Floyd-Warshall

$G(S,A,c)$ : graphe d'ordre $n$, valué par des longueurs de signes quelconques. Recherche du PCC entre toute paire de sommets, ou détection d'un circuit absorbant.

On définit $L = (l_{ij})$ avec $l_{ij} = l_{ij}$ si $(i,j)\in U$, $0$ si $i=j$, $+\infty$ sinon. On cherche $L^* = (l^*_{ij})$, où $l^*_{ij} = c_{\mu^*}$ ($\mu^*$ = PCC de $i$ à $j$), $+\infty$ si un tel chemin n'existe pas.

On calcule $L^*$ en exactement $n$ itérations, via les matrices intermédiaires $L^{(k)}$ :
$$
\begin{aligned}
L^{(0)} &= L \\
\forall k\ge1 : l^{(k)}_{ij} &= \min\{l^{(k-1)}_{ij},\, l^{(k-1)}_{ik} + l^{(k-1)}_{kj}\}
\end{aligned}
$$
$l^{(k)}_{ij}$ = longueur du PCC de $i$ à $j$ ne pouvant avoir que des sommets intermédiaires dans $\{1,\ldots,k\}$.

**Reconstruction du chemin — matrice des prédécesseurs P.** $P^{(0)} = (p^0_{ij})$, $p^0_{ij} = 0$ si $l_{ij}=+\infty$, $i$ sinon. À chaque itération $k$ : si $l^k_{ij} = l^{(k-1)}_{ik} + l^{(k-1)}_{kj}$ alors $p^k_{ij} = p^{(k-1)}_{kj}$.

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
**Complexité : $O(n^3)$.**

**Obtention des plus courts chemins.** Pour obtenir le PCC de $i$ à $j$, on utilise la iᵉ ligne de la dernière matrice $P^*$. Exemple : pour retrouver le PCC de $4$ à $1$, on consulte $P^{(4)}$ : $P_{41}=3 \Rightarrow 3$ est le prédécesseur de $1$ dans $\mu$, $P_{43}=4 \Rightarrow 4$ est le prédécesseur de $3$. D'où $\mu : 4 \to 3 \to 1$.

**Exemple.** Graphe à 4 sommets, avec un arc de poids négatif ($3\to1$, poids $-2$) :

<FloydWarshallVisualizer />

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
- à chaque tâche $i$ on associe un sommet du graphe ;
- on définit l'arc $(i,j)$ si la tâche $i$ précède la tâche $j$ ;
- $c_{ij}$ représente la durée d'exécution de la tâche $i$ ;
- on rajoute deux sommets fictifs : $dp$ (début du projet, relié aux sommets sans précédents) et $fp$ (fin du projet, relié aux sommets sans suivants).

Le graphe ainsi construit doit être **sans circuit**.

### Calcul des dates au plus tôt et au plus tard

**Dates au plus tôt** (parcours des sommets par rang croissant) :
$$
\begin{aligned}
t_{dp} &= 0 \\
t_j &= \max(t_i + d_i) \; / \; i \in \Gamma^-(j)
\end{aligned}
$$
$t_j$ représente la longueur du plus long chemin de $dp$ à $j$. $t_{fp}$ est le temps minimum pour réaliser le projet = longueur du plus long chemin de $dp$ à $fp$.

**Dates au plus tard** (parcours des sommets par rang décroissant) :
$$
\begin{aligned}
T_{fp} &= t_{fp} \\
T_j &= \min(T_i - d_j) \; / \; i \in \Gamma^+(j)
\end{aligned}
$$

### Marge et chemin critique

- **Marge** de la tâche $i$ : $m_i = T_i - t_i$.
- **Tâches critiques** : celles dont la marge est nulle.
- **Chemin critique** : tout chemin de $dp$ à $fp$ passant par les sommets critiques et de longueur égale à la durée min du projet.

**Remarques :**
- La contrainte « $i$ précède $j$ » s'écrit $t_j \ge t_i+d_i$, i.e. $t_j-t_i \ge d_i$.
- Un retard sur une tâche critique augmente d'autant la durée minimale du projet.

**Exemple (construction d'une maison).** Tâches A (gros-œuvre, 7j), B (charpente, 3j, préc. A), C (toiture, 1j, préc. B), D (installation sanitaire/électrique, 8j, préc. A), E (façade, 2j, préc. D,C), F (fenêtres, 1j, préc. D,C), G (aménagement jardin, 1j, préc. D,C), H (plafonnage, 2j, préc. F), I (peinture, 2j, préc. H), J (emménagement, 1j, préc. E,G,I). Le graphe potentiel-tâches donne une **durée minimale de 21 unités de temps**, avec chemin critique $dp\to A\to D\to F\to H\to I\to J\to fp$.

<MPMVisualizer />

### Traduction des contraintes non purement d'antériorité

- « $j$ ne doit pas commencer avant la moitié du temps de réalisation de $i$ » → arc $(i,j)$ de valeur $d_i/2$.
- « $j$ ne doit commencer qu'après un temps $t$ de la fin de $i$ » → arc $(i,j)$ de valeur $d_i+t$.
- « $j$ ne doit commencer qu'après la date $b_j$ » → arc $(dp,j)$ de durée $b_j$.
- « $j$ doit commencer avant la date $c_j$ » → arc $(dp,j)$ de durée $-c_j$.
- « $j$ doit suivre immédiatement $i$ » → circuit entre $i$ et $j$ : arc $(i,j)$ de valeur $d_i$ et arc $(j,i)$ de valeur $-d_i$.

:::note Attention
L'ajout de ces contraintes peut introduire des **circuits** dans le graphe : un circuit à coût négatif donne la longueur du plus long chemin = durée minimale des travaux ; un circuit à coût positif (absorbant) signifie qu'il **n'y a pas de solution** (contraintes incompatibles).
:::

### Le graphe potentiel-étapes (PERT — Program Evaluation and Review Technic)

Représentation alternative : chaque tâche est un **arc** de longueur $d_i$ ; les sommets représentent les **étapes** du projet (début/fin de chaque tâche). Si une tâche $j$ succède à une tâche $i$, l'extrémité initiale de $j$ coïncide avec l'extrémité terminale de $i$. On rajoute deux étapes fictives $dp$ et $fp$. On obtient ainsi un **graphe sans circuit**.

**Règles de construction :**
1. Toute tâche a une étape de début et une étape de fin : une tâche suivante ne peut démarrer que si la précédente est terminée.
2. Deux tâches qui se succèdent immédiatement sont représentées par des flèches qui se suivent.
3. Deux tâches simultanées (mêmes origine) sont représentées par deux flèches partant du même sommet.
4. Deux tâches convergentes (précédant une même tâche) convergent vers le même sommet.
5. Si une tâche $C$ succède à $A$ et $B$, et qu'une tâche $D$ succède seulement à $A$ (et non à $B$), il faut introduire une **tâche fictive de durée nulle** pour éviter de créer une fausse dépendance.

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
