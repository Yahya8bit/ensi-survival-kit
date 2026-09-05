---
sidebar_position: 4
title: "Chapitre 3.2 : Algorithme de Glouton"
sidebar_label: Ch3.2 - Algorithme de Glouton
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 3 : Paradigmes de programmation — 3.2 Algorithme de Glouton

*Conception et analyse d'algorithmes — 30/12/2020*

## Algorithme de Glouton

- Un algorithme de glouton est un algorithme qui résout des problèmes d'optimisation (optimise une fonction objectif) ; il cherche à construire une solution pas à pas (de manière incrémentale, selon le choix qui semble localement le meilleur).
- Pas de retour en arrière : à chaque étape de décision dans l'algorithme, le choix qui semble le meilleur à ce moment sera effectué.
- Progression descendante : choix puis résolution d'un problème plus petit.
- Il fait un choix localement optimal, dans l'espoir que ce choix mènera à une solution optimale globale.
- Il est utilisé comme méthode de résolution (heuristique) d'un problème.
- Avec certains types de problèmes d'optimisation, cet algorithme donne des solutions exactes.

### Algorithme Glouton (méthode par construction)

Il permet de construire une solution pas à pas :

- sans jamais revenir sur ses décisions,
- à chaque étape, on sélectionne la solution qui semble la meilleure localement (heuristique),
- en espérant obtenir une solution optimale.

**Principe de l'algorithme** :

- démarrer avec une solution initiale vide ;
- à chaque itération, une variable sera choisie à laquelle est attribuée une valeur du domaine ;
- le critère d'arrêt est l'affectation d'une valeur à toutes les variables du problème.

**Éléments de l'algorithme** :

- Tableau des candidats $T$ (tableau des pièces disponibles),
- poids des candidats $T[i].poids$ (valeurs des pièces),
- ensemble de solution $S$ (pièces utilisées),
- fonction $SOLUTION(S)$ ($\sum_{s \in S} s.poids = n$),
- fonction $REALISABLE(S)$ ($\sum_{s \in S} s.poids \leq n$).

1. Trier le tableau des candidats par ordre de poids décroissant.
2. Tester tous les candidats $T[i]$ exactement une fois :
   - si $T[i]$ peut être ajouté à $S$, le garder ;
   - si $T[i]$ ne peut pas être ajouté à $S$, le jeter ;
   - et ne jamais re-tester un candidat déjà testé.

**Schéma général et complexité** :

```
Glouton(A, n)
Début
    Trier A par ordre de poids décroissant     // O(n log n)
    S ← ∅
    Pour i = 1 jusqu'à n faire
        x ← SELECTION(A)                        // O(f(n))
        Si REALISABLE(S, x) alors                // O(g(n))
            S ← S ∪ {x}
        Fin Si
    Fin Pour
Fin
```

$T(n) = O(n\log n + n \cdot f(n) + n \cdot g(n))$

- $SELECTION(A)$ : choisit un élément de $A$.
- $REALISABLE(S,x)$ : détermine si l'ajout de $x$ à la solution forme une sous-structure optimale.

## Application : problème du sac à dos

- Le problème KP est un problème d'optimisation combinatoire NP-complet avec de nombreuses applications.
- Il est intéressant d'avoir des algorithmes polynomiaux, faciles à mettre en œuvre, et permettant de calculer une solution approchée, comme la méthode gloutonne.
- Le problème du sac à dos (remplissage d'un sac à dos) : le sac a une capacité $c$ et il existe un ensemble d'objets ayant chacun un poids et une valeur.
- Les objets mis dans le sac à dos doivent maximiser la valeur totale, sans dépasser le poids maximum.

### Formulation

Le problème classique du sac à dos à variables binaires, noté KP, consiste à choisir un sous-ensemble d'éléments parmi $n$ éléments donnés à mettre dans un sac de capacité $c$. Chaque élément dispose d'un profit $v_i$ et d'un poids $w_i$, pour $i=1,\ldots,n$. L'objectif est de maximiser le profit généré par le sous-ensemble d'éléments choisis sans dépasser la capacité $c$. Soit $x_i$ une variable de décision binaire avec $x_i = 1$ si l'objet $i$ est sélectionné, $0$ sinon :

$$\max\ \sum_{i=1}^{n} v_i x_i \quad \text{t.q.} \quad \sum_{i=1}^{n} w_i x_i \leq c,\quad x_i \in \{0,1\},\ i \in \{1,\ldots,n\}$$

### Heuristique gloutonne

- Trier les objets par ordre décroissant selon un critère donné (ex : valeur, poids, ou bien le rapport valeur/poids) ;
- sélectionner un objet (de plus grand rapport) jusqu'à atteindre la capacité maximale du sac à dos, selon :
  1. l'ordre des éléments (le meilleur rapport profit par poids en priorité),
  2. la capacité du sac (le poids cumulé des éléments introduits ne doit pas dépasser la capacité $c$).

```
Entrée : une instance du KP.
Sortie : Solution réalisable X = (x1,...,xn).

ĉ ← c
Pour i de 1 à n faire
    Si wi ≤ ĉ alors
        xi ← 1
        ĉ ← ĉ − wi
    Sinon
        xi ← 0
    Fin Si
Fin Pour
```

### Exercice : sac à dos (variante « tout ou rien »)

| Objet | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- |
| $w_i$ | 3 | 10 | 3 | 7 | 6 |
| $v_i$ | 2 | 6 | 5 | 8 | 3 |

Capacité $c_{max} = 16$ kg.

**Tri par valeur décroissante** : $L = \{2, 4, 5, 3, 1\}$

$$S=\emptyset \to \{2\} \ (w{=}10{\le}16) \to \{2,4\}\ (w{=}10{+}8{=}18\not\le16,\text{ rejeté... }) $$

<!-- TODO: unclear in source, verify against original PDF — the handwritten worked example on this slide uses obfuscated variable labels (e.g. "I", "L", ";") for the objects instead of their numeric indices, and the OCR text does not cleanly map back to a specific object numbering. The stated final results were: sort by value → solution cost 20 D, weight 16 kg; sort by value/weight ratio → solution {N,I,;,J} cost 22 D, weight 16 kg. -->

Trier les variables selon l'ordre décroissant du rapport $v_i/w_i$ : par ce critère, la solution obtenue est de coût 22 D pour un poids de 16 kg (contre 20 D en triant par valeur seule) — le tri par rapport valeur/poids donne ici un meilleur résultat.

### Exercice : sac à dos (variante « fractionnaire »)

La solution peut prendre une fraction d'un objet (au lieu d'un choix binaire).

1. Appliquer la méthode gloutonne pour résoudre le problème du sac à dos.
2. Appliquer l'algorithme sur les données suivantes :

| Objet | 1 | 2 | 3 |
| --- | --- | --- | --- |
| $v_i$ | 10 | 20 | 30 |
| $w_i$ | 30 | 100 | 120 |

Un ensemble d'objets $i \to (v_i, w_i)$. Le poids des objets sélectionnés ne dépasse pas $c_{max}$ kg. But : maximiser le gain des objets mis dans le sac. $X = \{x_i\}$ avec $i=1,\ldots,n$, $x_i \in [0,1]$.

```
S ← ∅
x ← ARGMAX(vi/wi)          // l'objet dont le rapport v/w est max parmi les objets restants
Ajouter(S, x) : wi · α ≤ cmax, avec α ∈ [0,1] // faisable ?
```

**Exemple** ($c_{max} = 50$) : selon l'ordre de tri choisi (rapport V/P maximal, objet le plus léger, objet de plus grande valeur), on obtient des valeurs totales différentes (210, 170, 130 / 220, 170, 120 / 220, 180, 140 selon la combinaison), illustrant que l'ordre de tri influence le résultat glouton même en variante fractionnaire.

**Schéma glouton** :

```
Trier(A,W,C)                          // trier selon ordre décroissant du rapport vi/wi
X ← ∅                                 // Initialiser la solution xi à 0
i ← 1
Tant que (cmax > 0) et (i ≤ n) faire   // Ajouter la solution
    Si W[i] ≥ cmax alors
        X[i] ← 1
    Sinon
        X[i] ← cmax/W[i]
    Fin Si
    cmax ← cmax − W[i]
    i++
Fin Tant que
```

Soit $X = (x_1,\ldots,x_n)$ une solution optimale. Premier choix glouton : l'objet $A[1]$, ayant le rapport $v_i/w_i$ le plus grand.

**Propriétés** :

- il existe toujours une solution optimale qui contient le premier choix glouton ;
- toute solution optimale contient une sous-structure optimale ;
- il existe trois cas possibles :
  - $X = (1,1,\ldots,1)$ si $c_{max} \geq \sum_{i=1}^{n} w_i$,
  - $X = (1,1,\ldots,\alpha_k,0,\ldots,0)$ si $c_{max} \geq \sum_{i=1}^{k-1} w_i + \alpha_k w_k$, avec $0 \leq \alpha_k \leq 1$,
  - $X = (\alpha_1,0,\ldots,0)$ si $c_{max} = \alpha_1 \cdot w_1$, avec $0 \leq \alpha_1 \leq 1$.
- soit $S$ une solution optimale pour $c_{max}$, alors $S - \{x_i\}$ est aussi une solution optimale pour $c_{max} - w_i \cdot x_i$.

### Exercice : problème du voyageur de commerce

1. Écrire un algorithme glouton qui permet de résoudre le problème en fixant une ville de départ.
2. Écrire un algorithme glouton qui permet de résoudre le problème sans fixer une ville de départ.
3. Appliquer les deux algorithmes sur les données suivantes (graphe à 5 sommets, distances données).

**Correction** — Données : soit un graphe $G = (X,E,V)$ complet et pondéré avec $V$ la valeur associée à chaque arête et $X$ l'ensemble de $n$ villes. Problème : trouver le tour, sans sous-tours, de valeur minimum.

**Algorithme 1** : $A$ = ensemble de villes ; $v_0$ = ville de départ ; à chaque étape, choisir la ville la plus proche de la ville courante non encore visitée.

**Algorithme 2** : $A$ = ensemble de villes ; choisir la ville qui a la distance minimale parmi les restantes ; s'assurer que le degré de chaque sommet $\leq 2$ pour n'avoir qu'un seul cycle de taille $n=|V|$ (en écartant tout cycle intermédiaire).

**Algorithme a** (Kruskal-like sur les arêtes) : classer les arêtes dans l'ordre croissant de leur valeur ; choisir les arêtes dans cet ordre à condition qu'on ne forme pas de sous-tour, ni de sommet de degré > 2. Sur l'exemple : tour $(1{-}4{-}2{-}3{-}5)$, longueur totale $132$.

**Algorithme b** (plus proche voisin) : choisir un sommet quelconque ; à chaque itération prendre le sommet le plus proche. Sur l'exemple : tour $(1{-}3{-}2{-}4{-}5)$, longueur totale $129$.

**Algorithme c** (insertion la moins coûteuse) : prendre un tri-cycle $Y=(1,2,3)$. Déterminer le sommet de $X \setminus Y$ le plus proche de $Y$ (insérer le sommet qui crée le plus petit détour) : $d_{k*} = \min_{i \in X, j \in Y \setminus X} d_{ij}$. Insérer $k$ au mieux dans $Y$ : $\min_{(i,j) \in Y} (d_{ik} + d_{kj} - d_{ij})$. Sur l'exemple, comparaison des insertions $(1{-}4{-}2)$, $(1{-}4{-}3)$, $(2{-}4{-}3)$, aboutissant au tour optimal $(1{-}4{-}5{-}2{-}3)$, longueur $40+29+15+5+34=123$.

### Exercice : problème d'ordonnancement de production

Soit $m$ machines parallèles identiques, $t_j$ le temps de traitement du job $J_j$ avec $j=1,\ldots,n$.

**Problème** : affecter les $n$ jobs aux $m$ machines de manière à minimiser le makespan.

**Schéma glouton (LPT)** :

1. Classer les jobs dans l'ordre LPT ($t_j$ décroissant).
2. Affecter les jobs dans cet ordre à la machine la moins chargée.

Sur l'exemple donné (8 jobs, 3 machines), le makespan obtenu par le tri LPT (12) est meilleur que celui obtenu sans tri préalable (13).

### Problème de rendu de monnaie

- Entrée 1 : un montant $M \in \mathbb{N}$ à rendre.
- Entrée 2 : un système de monnaie $P = (p_1 \leq \cdots \leq p_k) \in \mathbb{N}$ (les types de pièces/billets dont on dispose).
- Sortie : trouver les pièces à rendre au client. Pour chaque type $i$ de pièces/billets $1 \leq i \leq k$, $n_i$ est le nombre de pièces/billets de type $i$ (de valeur $p_i$) rendus au client.
- Contrainte : il faut rendre au client la somme des pièces/billets qu'on lui rend $M$, telle que $\sum_i n_i p_i = M$.
- Optimisation : minimiser le nombre $\sum_i n_i$ de pièces/billets rendus.

Considérons un ensemble de $n$ pièces de monnaie de valeurs $p_1 < p_2 < \cdots < p_n$ avec $p_1 = 1$. On suppose que ce système est canonique.

- L'algorithme glouton sélectionne la plus grande valeur $p_n$ et la compare à $M$.
- Si $M < p_n$, la pièce de valeur $p_n$ ne peut pas être utilisée ; on reprend l'algorithme avec le système de pièces $P_{n-1}$.
- Si $M \geq p_n$, la pièce $p_n$ peut être utilisée une première fois (une pièce à comptabiliser, de valeur $p_n$), le montant restant à rendre étant alors $M - p_n$. L'algorithme continue avec le même système de pièces et cette nouvelle somme à rendre.
- L'algorithme est répété jusqu'à obtenir une somme à rendre nulle.

```
Fonction RENDRE-MONNAIE(P, M)
S ← ∅
i ← 1
Tant que M≠0 et i ≤ P.longueur faire
    Si M − P[i] ≥ 0 alors
        M ← M − P[i]
        S ← S ∪ {P[i]}
    FinSi
    i ← i+1
Fin Tant que
Si M = 0 alors
    retourner S
Sinon
    Erreur "pas de solution"
FinSi
Fin
```

**Exemple 1** : $M = 263$ centimes d'euros, $P=\{200, 50, 10, 5, 2, 1\}$.

$$S=\{200\}\ (M{=}63) \to S=\{200,50\}\ (M{=}13) \to S=\{200,50,10\}\ (M{=}3) \to S=\{200,50,10,2\}\ (M{=}1) \to S=\{200,50,10,2,1\}\ (M{=}0)$$

**Exemple 2** : $M=6$ et $(p_1,p_2,p_3) = (1,3,4)$.

- Le résultat obtenu par l'algorithme glouton : $(n_1,n_2,n_3) = (2,0,1)$ (une pièce de 4 et deux pièces de 1).
- La solution optimale : $(n_1,n_2,n_3) = (0,2,0)$ (deux pièces de 3).
- L'algorithme glouton ne donne donc pas toujours une solution optimale !

### Exercice : arbre recouvrant minimal

Soit $G = (X,E,W)$ un graphe connexe non orienté valué tel que :

- $X$ est l'ensemble de sommets avec $|X| = n$,
- $E$ est l'ensemble des arêtes avec $|E| = m$,
- $W$ est une fonction de valuation des arêtes $W: E \to \mathbb{R}$.

Un arbre recouvrant de $G$ est un sous-graphe $A=(X,E_A,W)$ connexe et sans cycle, avec $|E_A|=n-1$. Un arbre recouvrant minimum $ARM(X,E_A)$ de $G$ est un arbre recouvrant qui minimise $\sum_{e \in E_A} w(e)$.

1. Écrire l'algorithme glouton.
2. Prouver l'optimalité de l'algorithme.

**Algorithme glouton** : trier les arêtes par ordre croissant de leur valuation ; sélectionner une arête (si elle ne forme pas de cycle avec les arêtes déjà sélectionnées) jusqu'à construire un arbre recouvrant — c'est le principe de l'**algorithme de Kruskal (1956)**.

- Données : graphe $G=(X,E)$ ($|X|=n$, $|E|=m$), pour chaque arête $e$ de $E$ son poids $c(e)$.
- Résultat : arbre ou forêt maximale $A=(X,F)$ de poids minimum.
- Trier et renuméroter les arêtes de $G$ dans l'ordre croissant de leur poids : $c(e_1) \leq c(e_2) \leq \cdots \leq c(e_m)$.
- Poser $F := \emptyset$, $i := 0$.
- Tant que $i < m$ et $|F| < n-1$ faire :
  - si $e_{i+1}$ ne forme pas de cycle avec $F$ alors $F := F \cup \{e_{i+1}\}$ ;
  - $i := i+1$.

**Schéma glouton** :

```
Trier(E)                    // trier les arêtes selon ordre croissant de leur poids
Initialiser(EA)              // EA est un tableau à (n-1) éléments
k ← 0                        // le nombre des arêtes sélectionnées
i ← 1
Tant que (k < n-1 et i ≤ m) faire  // Cycle vérifie que EA ∪ E[i] ne forme pas de cycle
    Si pas de Cycle(EA, E[i]) alors
        EA[k] ← E[i]
        k ← k+1
    Fin Si
    i ← i+1
Fin Tant que
```

**Preuve d'optimalité** :

- Premier choix glouton : l'arête $e = E[1]$, ayant la valuation la plus petite.
- **Propriété 1** : il existe toujours une solution optimale qui contient le premier choix glouton.
  - **Lemme 1** : soit $A$ un arbre recouvrant, $e \notin A$, alors $\exists\, e' \in A$ tel que $(A - e') \cup \{e\}$ est un arbre recouvrant. De plus, $e'$ peut être choisi dans le cycle formé par les arêtes de $A$ et $e$.
  - Soit $A^*$ la solution optimale, $w^* = \min_A w(A)$ où $w(A) = \sum_{e \in A} w(e)$. Si $e \notin A^*$ alors $\exists\, e' \in A^*$ tel que $(A^* - e') \cup \{e\}$ est aussi un arbre recouvrant minimal. En effet, $w((A^*-e') \cup \{e\}) = w(A^*) - w(e') + w(e) = w^* - w(e') + w(e) \geq w^*$, ce qui implique $w(e) = w(e')$, i.e. les deux arêtes possèdent la même valuation.
- **Propriété 2** : toute solution optimale contient une sous-structure optimale. Soit $A^*$ une solution optimale pour $w^*$, alors $A^* - \{e\}$ est aussi une solution optimale pour $w^* - w(e)$.
  - **Lemme 2** : soit $A$ un arbre recouvrant pour $G=(X,E)$ et $e=(x,y) \in A$ tel que $d(y)=1$, alors $A - \{e\}$ est aussi un arbre pour $G=(X-\{y\}, E_y)$.
  - Preuve par l'absurde : en supposant H1 ($A^*$ solution optimale pour $w^*$) et H2 ($A^*-e$ solution non optimale pour $w^*-w(e)$), on montrerait qu'il existe une solution meilleure que $A^*$ pour $w^*$, contredisant H1.

### Exercice 1 (travail à la maison) : problème de choix d'activités

Soit $A=\{a_1,\ldots,a_n\}$ un ensemble de $n$ activités concurrentes (voulant utiliser une même ressource qui ne peut être occupée que par une seule activité à la fois). Chaque activité $a_i$ est caractérisée par $d_i$ : temps de début et $f_i$ : temps de fin. Les activités $a_i$ et $a_j$ sont dites compatibles si les deux intervalles $[d_i,f_i]$ et $[d_j,f_j]$ ne se superposent pas.

**Problème** : choisir le plus grand ensemble en nombre d'activités compatibles. Écrire un algorithme glouton qui permet de résoudre le problème.

### Exercice 2 (travail à la maison) : cavalier d'Euler

Trouver une suite de déplacements d'un cavalier lui permettant de passer par toutes les cases de l'échiquier une et une seule fois, puis de revenir à la case de départ.

- Une case de l'échiquier est représentée par un sommet du graphe.
- Une arête a un poids $0$ si elle relie 2 sommets voisins selon le déplacement d'un cavalier, $\infty$ sinon.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/complexite-ch3-2-glouton.pdf" />

</TabItem>
</Tabs>
