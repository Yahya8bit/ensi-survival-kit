---
sidebar_position: 1
title: Chapitre I - Notions et Vocabulaire de la Théorie des Graphes
sidebar_label: Ch1 - Notions et vocabulaire
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Algorithmique de Graphe & Optimisation

*ENSI — I.I.1 — Durée : 45h — Forme : Cours intégré — 2023/2024 — N. Chaouachi*

## Pourquoi la théorie des graphes ?

La théorie des graphes offre pour toutes les disciplines un caractère méthodologique et optimal : un mélange d'analyse et de méthodes mathématiques réunies pour aider un décideur à prendre une décision. Un graphe peut représenter simplement la structure, les connexions, les cheminements possibles d'un ensemble complexe comprenant un grand nombre de situations où interviennent des objets en interaction.

**1. Représentation d'un réseau de communication** : interconnexions routières/ferroviaires/aériennes, plan d'une ville, circuits électroniques, réseaux informatiques, réseaux de télécommunication...

**2. Représentation d'une relation binaire** (algébrique, mécanique, chimique, sociologique...) : règles de jeux (dames, échecs), relations de parenté, ordonnancement de montage/démontage, gestion de projets...

**3. Représentation d'une évolution** : passage d'un état à un autre, chaînes de Markov, processus génétiques, évolution démographique...

### Domaines d'application

Informatique (fiabilité, sûreté de fonctionnement), phénomènes aléatoires (files d'attente), théorie des jeux, programmation dynamique (sac à dos), optimisation combinatoire (voyageur de commerce), applications industrielles (gestion des stocks), théorie de la décision...

La théorie des graphes nécessite l'emploi simultané de trois expertises : **l'expert du problème** (collecte des données), **l'expert des mathématiques** (modélisation), **l'expert de l'informatique** (mise en œuvre des algorithmes de résolution).

Certains problèmes classiques (plus court chemin, minimiser la longueur des connexions, sens unique sans bloquer la circulation) peuvent être résolus efficacement, mais la plupart sont **NP-complets**. *Un graphe est une structure de données puissante pour l'informatique.*

## Plan du cours

- **Chapitre I** — Notions et Vocabulaire de la Théorie des Graphes : définitions de base, cheminement & accessibilité, représentation (matrices, listes), connexités (composantes connexes/fortement connexes, points d'articulation, isthme).
- **Chapitre II** — Chemins extrémaux des graphes pondérés : typologie des problèmes d'optimisation, recherche de tous les plus courts chemins (Floyd, Dantzig), application à l'ordonnancement (PERT-MPM).
- **Chapitre III** — Arbres et Arborescence : arbre de poids minimal, arborescence de poids minimal (Edmonds-Karp).
- **Chapitre IV** — Flots et Applications : flot maximal (Ford-Fulkerson), couplage dans un graphe biparti, flot à coût minimal (Busacker-Gowen).

*Pré-requis : Algorithmique et structures de données & Programmation C.*

**Références** : Charon/Germa/Hudry — *Méthodes d'optimisation combinatoire* (Masson, 1996) ; Gondran/Minoux — *Graphes et algorithmes* (Eyrolles) ; Cormen/Leiserson/Rivest/Stein — *Introduction à l'algorithmique* (Dunod, 2004) ; Lacomme/Prins/Sevaux — *Algorithmes de graphes* (Eyrolles, 2003).

---

# Chapitre 1 : Notions et Vocabulaire de la Théorie des Graphes

*Le but de ce premier chapitre est de présenter les principales notions sur les graphes.*

## 1. Définitions et concepts de base

**Graphe orienté** : couple $G(S,A)$ où $S$ est un ensemble fini de **sommets** (ou nœuds, $|S|=n$) et $A \subset S \times S$ un ensemble fini d'**arcs** ($|A|=m$). L'**ordre** d'un graphe est son nombre de sommets.

Pour un arc $u = (i,j)$, $i$ est l'**extrémité initiale** (ou origine), $j$ l'**extrémité finale** (ou destination).

**Graphe non orienté** : couple $G(S,A)$ où $A \subset S \times S$ est un ensemble d'**arêtes** — on s'intéresse uniquement à l'existence ou non d'une liaison entre deux sommets.

:::note Remarque
Un graphe est une application $G : X \times X \to U$, $(x,y) \mapsto u(x,y)$.
:::

**Graphe valué** $G=(S,A,C)$ : on associe une fonction $C : A \to IR$ appelée **coût** (poids, valeur) des arcs, notée $c(i,j)$ ou $c_{ij}$. Exemples : longueur d'une route, temps de parcours, capacité d'une connexion.

- **Graphe symétrique** : $\forall i,j \in S, (i,j)\in A \Rightarrow (j,i)\in A$.
- **Graphe antisymétrique** : $\forall i,j \in S, (i,j)\in A \Rightarrow (j,i)\notin A$.
- **Graphe complet** : $\forall i,j \in S$, si $(i,j)\notin A$ alors $(j,i)\in A$.

### Successeurs, prédécesseurs, degrés

- $i$ est **successeur** (ou suivant) de $j$ si $(j,i)\in A$ ; l'ensemble des successeurs de $i$ est noté $S(i)$.
- $j$ est **prédécesseur** (ou précédent) de $i$ si $(j,i)\in A$ ; l'ensemble des prédécesseurs de $i$ est noté $P(i)$.

**Degrés** :
- **Degré extérieur** $d^+(i) = |S(i)|$ (nombre de successeurs).
- **Degré intérieur** $d^-(i) = |P(i)|$ (nombre de prédécesseurs).
- **Degré** $d(i) = d^+(i) + d^-(i)$ (nombre d'arcs dont $i$ est origine et/ou destination). Une boucle est comptée **deux fois**.

Un graphe est **régulier** si tous ses sommets ont le même degré.

### Adjacence — Incidence

- Deux **sommets** sont **adjacents** (voisins) s'ils sont joints par un arc dont ils sont les extrémités.
- Deux **arcs** sont **adjacents** s'ils ont au moins une extrémité commune.
- Un arc $(i,i)$ est appelé une **boucle**.

**Incidence** : soit $S_1 \subset S$. Un arc de $A$ est **incident à $S_1$ de l'extérieur** si son extrémité terminale est dans $S_1$ et son extrémité initiale dans $S\setminus S_1$. Il est **incident à $S_1$ de l'intérieur** s'il est incident à $S\setminus S_1$ de l'extérieur.

## Chaîne — Chemin — Cycle — Circuit

- **Chaîne** (graphe orienté) : suite de sommets $(i_1,\ldots,i_n)$ telle que $(i_p,i_{p+1})\in A$ **ou** $(i_{p+1},i_p)\in A$ (on ne tient pas compte du sens).
- **Chemin** (graphe orienté) : suite de sommets $(i_1,\ldots,i_n)$ telle que $(i_p,i_{p+1})\in A$ (on respecte le sens des arcs).
- **Cycle** : une chaîne telle que $i_1 = i_n$.
- **Circuit** : un chemin tel que $i_1 = i_n$.

:::note Remarques
1. Dans un graphe **non orienté**, une chaîne est un chemin et inversement.
2. Dans un graphe **non orienté**, un cycle est un circuit et inversement.
:::

$i$ est **ascendant** de $j$ s'il existe un chemin d'origine $i$ et de destination $j$ ; $j$ est alors un **descendant** de $i$.

## Chaîne eulérienne — Cycle eulérien

Une **chaîne eulérienne** est une chaîne qui contient **toutes** les arêtes du graphe, chaque arête n'étant décrite qu'**une seule fois**. *(On peut passer plusieurs fois par le même sommet, mais pas par la même arête.)*

Un **cycle eulérien** est une chaîne eulérienne **fermée** (sommet de départ = sommet d'arrivée).

**Graphe eulérien** : un graphe que l'on peut dessiner sans jamais lever le crayon et sans passer deux fois par la même arête. *Propriété : un graphe est eulérien ssi il contient une chaîne eulérienne (ou un cycle eulérien).*

### Théorème d'Euler

1. Un graphe **connexe** admet une **chaîne eulérienne** ssi le nombre de sommets de degré impair est **0 ou 2**.
2. Un graphe **connexe** admet un **cycle eulérien** ssi le nombre de sommets de degré impair est **0** (tous les sommets ont un degré pair).

### Algorithme d'Euler — détermination pratique d'une chaîne eulérienne

Soit $G(S,A)$ un graphe connexe avec **seulement deux sommets de degré impair** : $x$ et $y$.

1. On choisit une chaîne d'origine $x$ et d'extrémité $y$, ne contenant jamais deux fois la même arête.
2. On choisit un sommet de la chaîne précédente et, à partir de ce sommet, on adjoint un **cycle** (chaîne fermée ne contenant pas deux fois la même arête) ne contenant pas d'arêtes déjà utilisées.
3. On réitère l'étape 2 sur la chaîne obtenue jusqu'à avoir utilisé toutes les arêtes du graphe.

La chaîne obtenue entre $x$ et $y$ est alors, par construction, eulérienne.

**Exemple.** Graphe à 6 sommets `A,B,C,D,E,F` de degrés `2,3,4,4,2,3` : seuls `B` et `F` ont un degré impair, donc il existe une chaîne eulérienne entre `B` et `F`.
- Étape 1 : la chaîne `B–D–F` convient.
- Étape 2 : on choisit `B` et on adjoint le cycle `B–A–C–B`, d'où `B–A–C–B–D–F`.
- Étape 3 : on choisit `C` et on adjoint le cycle `C–D–E–F–C`, d'où la chaîne eulérienne finale : `B–A–C–D–E–F–C–B–D–F`.

:::note Remarques
1. Il n'y a **pas unicité** de la chaîne eulérienne trouvée.
2. Pour un **cycle eulérien**, on suit la même méthode en partant à l'étape 1 d'un cycle depuis un sommet quelconque du graphe.
:::

**Exemple (cycle eulérien).** Sommets `A,C,E` de degré 2, `B,D,F` de degré 4 : tous pairs, donc il existe un cycle eulérien. Cycle initial `A–B–F–A`, puis en `B` le cycle `B–C–D–B` donne `A–B–C–D–B–F–A`, puis en `F` le cycle `F–D–E–F` donne le cycle eulérien final `A–B–C–D–B–F–D–E–F–A`.

## Chaîne hamiltonienne — Cycle hamiltonien

Contrairement au cas eulérien (arêtes), on s'intéresse ici aux chaînes/cycles contenant **tous les sommets** une fois seulement : chaînes ou cycles **hamiltoniens**.

:::note Attention
Il n'existe **pas** de critère nécessaire et suffisant simple pour l'existence de cycles hamiltoniens (contrairement au cas eulérien), même si de nombreux théorèmes donnent des **conditions suffisantes**.
:::

**Théorème de Dirac (1952).** Soit $G$ un graphe simple avec $n \ge 3$ sommets. Si $\deg(x) \ge n/2$ pour chaque sommet $x$, alors $G$ est hamiltonien.

## Graphes particuliers

**Sous-graphe.** Soit $X \subset S$ et $A_X = \{u=(a,b)\in A \mid a,b\in X\}$. Alors $G_X(X,A_X)$ est le **sous-graphe de $G(S,A)$ induit par $X$** : on l'obtient en enlevant un ou plusieurs sommets de $G$, ainsi que toutes les arêtes incidentes à ces sommets.

**Graphe partiel.** Soit $A' \subset A$. Alors $G'(S,A')$ est un **graphe partiel de $G(S,A)$** : on garde tous les sommets mais on enlève des arcs/arêtes.

## 2. Représentation d'un graphe

- **Représentation sagittale** : le dessin du graphe.

- **Matrice d'adjacence** (matrice incidence sommets-sommets). Pour $G(S,A)$ d'ordre $n$, matrice carrée $B(n,n)=(b_{ij})$ : $b_{ij}=1$ si $(i,j)\in A$, $0$ sinon. **Place mémoire : $n^2$.**

  Si le graphe est **valué**, on utilise une matrice $V$ où $m_{ij}$ est la valuation de l'arc $(i,j)$ si $(i,j)\in A$ (une valeur particulière — souvent $0$ ou $\infty$ — signale l'absence d'arc).

  :::note Remarque
  Pour un graphe **non orienté**, la matrice d'adjacence est **symétrique** : on peut ne mémoriser que la partie triangulaire supérieure.
  :::

- **Matrice d'incidence sommets-arcs.** Pour $G(S,A)$ orienté et **sans boucle**, $n$ sommets, $m$ arcs $A=\{u_k, 1\le k\le m\}$ : matrice $C(n,m)=(c_{ik})$, $c_{ik} = 1$ si $i$ est l'extrémité initiale de $u_k$, $-1$ si $i$ est l'extrémité finale de $u_k$, $0$ sinon. **Place mémoire : $n\times m$.**

- **Matrice d'incidence sommets-arêtes** (graphe non orienté) : $C(n,m)=(c_{ik})$, $c_{ik}=1$ si $i$ est une extrémité de $u_k$, $0$ sinon.

- **Représentation par liste de successeurs** : tableau $\Gamma^+(S)$ de $n$ listes chaînées, indicé par les sommets ; la liste $\Gamma^+(i)$ contient tous les successeurs de $i$ (éventuellement avec la valuation associée à chaque arc).

## 3. Connexité

**Graphe connexe** (ou simplement connexe) : $\forall i,j\in S$, il existe une **chaîne** entre $i$ et $j$. Un graphe orienté est connexe si le graphe non orienté associé est connexe.

**Composante connexe** $C$ d'un graphe $G=(S,A)$ : sous-ensemble **maximal** de sommets tels que deux quelconques d'entre eux soient reliés par une chaîne. Si $i\in C$ : $\forall j\in C$, il existe une chaîne reliant $i$ à $j$ ; $\forall k\in S\setminus C$, il n'existe pas de chaîne reliant $i$ à $k$.

- Les composantes connexes de $G=(S,A)$ forment une **partition** de $S$.
- Un graphe est connexe ssi il a **une seule** composante connexe.
- Le sous-graphe induit par une composante connexe est connexe.
- $C = \{j\in S \mid \text{il existe une chaîne reliant } i \text{ à } j\}$.

**Algorithme de construction de la composante connexe de $i$** :
1. Marquer $+$ le sommet $i$.
2. Marquer $+$ tout sommet adjacent à un sommet marqué $+$, jusqu'à ce qu'on ne puisse plus marquer de sommets.

Les sommets marqués sont ceux de $C(i)$.

**Graphe fortement connexe** : $\forall i,j\in S$, il existe un **chemin** entre $i$ et $j$. *(Implique qu'il existe un chemin de $i$ à $j$ ET un chemin de $j$ à $i$.)*

- **Théorème 1** : un graphe orienté fortement connexe est connexe.
- **Théorème 2** : un graphe est fortement connexe ssi pour tout couple $(i,j)$ il existe un **circuit** passant par $i$ et $j$.

**Composante fortement connexe** $C_f$ : sous-ensemble maximal de sommets tels que deux quelconques soient reliés par un chemin (dans les deux sens). Les composantes fortement connexes de $G$ forment une **partition** de $S$.

**Algorithme de construction de la composante fortement connexe de $i$** :
1. Marquer $+$ **et** $-$ le sommet $i$.
2. Marquer $-$ tout sommet précédent d'un sommet marqué $-$, et marquer $+$ tout sommet suivant un sommet marqué $+$, jusqu'à ce qu'on ne puisse plus marquer de sommets.

Les sommets marqués **à la fois** $+$ et $-$ sont ceux de $C_f(i)$.

## 4. Isthme et point d'articulation

- Une **arête** d'un graphe est un **isthme** si sa suppression augmente le nombre de composantes connexes du graphe. Si le graphe est connexe, une arête est un isthme ssi elle **n'appartient à aucun cycle**.
- Un **sommet** est un **point d'articulation** si sa suppression augmente le nombre de composantes connexes du graphe. Plus généralement, un **ensemble d'articulation** est un ensemble de sommets dont la suppression augmente le nombre de composantes connexes.

:::note Remarque
Si une arête est un isthme, ses extrémités sont des points d'articulation — mais la **réciproque est généralement fausse** (un graphe peut avoir un point d'articulation sans avoir d'isthme, ex. un « papillon » formé de deux triangles partageant un sommet).
:::

## 5. Rang d'un sommet

Dans un graphe **sans circuit**, il existe toujours un sommet n'ayant aucun précédent, appelé sommet $1$.

**Définition.** $r(1) = 0$. $r(i)$ = nombre d'arcs dans un chemin de $1$ à $i$ de **cardinalité maximale**.

**Algorithme de détermination du rang** dans un graphe sans circuit `G(X,A)` :
```
1. Initialisation : S = X, k = 0
2. S_k = {sommets sans précédent dans S}
   ∀i ∈ S_k, r(i) = k
3. S = S \ S_k
   Si S = ∅, FIN. Sinon k = k+1, retour à 2.
```

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/graphe-ch1-notions-vocabulaire.pdf" />

</TabItem>
</Tabs>
