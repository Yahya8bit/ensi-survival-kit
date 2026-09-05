---
sidebar_position: 2
title: "Chapitre 2 : Complexité des problèmes"
sidebar_label: Ch2 - Complexité des problèmes
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 2 : Complexité des problèmes

*Conception et analyse d'algorithmes*

## Introduction

- Problèmes décidables : la solution algorithmique existe.
- Est-ce que cette solution est efficace ?
- Est-ce qu'elle utilise une quantité de ressources « raisonnable » (temps et espace) ?

### Principaux facteurs

1. Machine (matériel et logiciel), à une constante près.
2. Données :
   - Taille : paramètre principal $n$, à une constante près
   - Type : pas d'influence
   - Valeurs : meilleur, moyenne et pire des cas
   - Organisation : —

La complexité en temps est calculée en fonction de la taille des données $n$ quand $n$ est grand ($n \to \infty$), à un facteur près, au pire des cas.

### Exemple : temps estimé en secondes

| Taille des données | $O(\log n)$ | $O(n)$ | $O(n^2)$ | $O(2^n)$ |
| --- | --- | --- | --- | --- |
| 10 | $3 \times 10^{-6}$ | $10^{-5}$ | $10^{-4}$ | $10^{-3}$ |
| 100 | $7 \times 10^{-6}$ | $10^{-4}$ | $10^{-2}$ | $10^{14}$ siècles |
| 1000 | $10^{-5}$ | $10^{-3}$ | 1 sec | astronomique |
| 10000 | $13 \times 10^{-6}$ | $10^{-2}$ | 1,7 min | ... |
| 100000 | $17 \times 10^{-6}$ | $10^{-1}$ | 2,8 heures | ... |

## Complexité d'une machine de Turing déterministe

**Définition** — soit $M$ une machine de Turing déterministe. La complexité en temps de $M$ est la fonction $T_M(n) = \max\{m,\ x \in \Sigma^* /|x|=n \text{ et } M \text{ s'exécute sur } x \text{ en } m \text{ étapes}\}$.

## Complexité d'une machine de Turing non déterministe

**Définition** — le temps de calcul d'une machine de Turing non déterministe pour un mot $w$, noté $TC_M(w)$, est donné par :

- la longueur de la plus courte exécution acceptant le mot si $w \in L(M)$,
- 1 sinon.

**Définition** — soit $M$ une machine de Turing non déterministe. La complexité en temps de $M$ est la fonction $T_M(n) = \max\{m,\ x \in \Sigma^* /|x|=n \text{ et } m = TC_M(x)\}$.

### Notation asymptotique $O$

Une fonction $g(n)$ est dite en $O(f(n))$ : $g = O(f)$ s'il existe une constante $c$, $n_0$ / pour tout $n > n_0$, $0 \leq g(n) \leq c \cdot f(n)$.

**Proposition** — si la fonction $f$ est calculée par une machine de Turing non déterministe $M$ avec la complexité $T_M(n)$, alors il existe une machine de Turing non déterministe calculant $f$ avec la complexité $O(C \cdot T_M(n))$ où $C$ est une constante.

## Complexité polynomiale en temps d'une machine de Turing

**Définition** — une machine de Turing $M$ est dite polynomiale en temps s'il existe un polynôme $p(n)$ tel que $T_M(n) \leq p(n)$ pour tout $n \geq 0$.

**Définition (Classe P)** — la classe P est la classe des langages décidés par une machine de Turing déterministe polynomiale.

**Définition (Classe NP)** — la classe NP est la classe des langages acceptés par une machine de Turing non déterministe polynomiale.

**Théorème** — soit $L \in NP$. Il existe une MTD $M$ et un polynôme $p(n)$ / $M$ décide $L$ avec la complexité $T_M(n) = O(2^{p(n)})$.

### Exercice : MT

$L = \{a^n b^n c^n,\ n \geq 0\}$

- Écrire la MT de $L$.
- Calculer le nombre de déplacements pour estimer $T_M(n)$.

## Problèmes de décision

- Un problème est dit de décision si pour tout input, l'unique output possible est de type booléen.
- La plupart des problèmes d'optimisation peuvent être convertis en problèmes de décision.
- Il suffit d'ajouter une borne $k$ sur la valeur à optimiser et de changer la question :
  - existe-t-il une solution dont la valeur est au plus $k$ (en cas de minimisation) ;
  - existe-t-il une solution dont la valeur est au moins $k$ (en cas de maximisation).

### Exemples

**Circuit hamiltonien** — étant donné un graphe $G$, existe-t-il un chemin de longueur au plus $k$ ?

**Voyageur de commerce (TSP)** — étant donné un ensemble de villes $V = \{v_1,\ldots,v_n\}$, une fonction distance $d(v_i,v_j)$ entre les villes, et soit un nombre $k$. Existe-t-il un tour de toutes les villes dont la longueur est au plus $k$ ?

## Transformation polynomiale

**Définition** — soient $L_1 \subseteq \Sigma_1^*$ et $L_2 \subseteq \Sigma_2^*$. Une transformation polynomiale de $L_1$ vers $L_2$, notée $L_1 \propto L_2$, est une fonction $f$ définie par $f : \Sigma_1^* \to \Sigma_2^*$ telle que :

1. $f$ est calculable en un temps polynomial,
2. $f(x) \in L_2$ ssi $x \in L_1$.

Autre nom : transformation polynomiale = projection = réduction.

### Propriétés des transformations polynomiales

**Lemme 1** — si $L_1 \propto L_2$ alors :

1. si $L_2 \in P$ alors $L_1 \in P$,
2. si $L_1 \notin P$ alors $L_2 \notin P$.

**Lemme 2 (transitivité)** — si $L_1 \propto L_2$ et $L_2 \propto L_3$ alors $L_1 \propto L_3$.

**Définition** — une classe d'équivalence polynomiale $C_1$ est inférieure à une classe d'équivalence $C_2$, notée $C_1 \preceq_p C_2$, s'il existe une transformation polynomiale de tout langage de $C_1$ vers tout langage de $C_2$ (i.e. $\forall L_1 \in C_1$ et $\forall L_2 \in C_2$ on a $L_1 \propto L_2$).

**Définition (équivalence polynomiale)** — deux langages $L_1$ et $L_2$ sont équivalents polynomialement, notée $\equiv_P$ : $L_1 \equiv_P L_2$ ssi $L_1 \propto L_2$ et $L_2 \propto L_1$.

**Lemme 3** — la classe P est une classe d'équivalence polynomiale.

**Lemme 4** — pour tout $L_1 \in P$ et $\forall L_2 \in NP$ on a $L_1 \propto L_2$, donc $P \preceq_p c$ pour toute classe d'équivalence $c$ de NP.

**Définition** — $L$ est NP-dur si $\exists\, L' \in NPC$ tel que $L' \propto L$.

Exemple : le problème d'équivalence d'automates à état fini non déterministes est NP-dur.

**Définition (NP-complet)** — $L$ est dit NP-complet (NPC) si :

1. $L \in NP$,
2. $\forall L' \in NP$ on a $L' \propto L$ (équivalent : $\exists\, L' \in NPC$ tel que $L' \propto L$).

### Premier problème NP-complet — théorème de Cook

$SAT \in NPC$

Pour montrer que $SAT \in NP$ :

a. soit une interprétation $I$ choisie de façon non déterministe ;
b. vérifier que $[A_i]_I = V\ \forall\, 1 \leq i \leq m$.

Démonstration :

1. $SAT \in NP$,
2. $\forall L' \in NP$ alors $L' \propto SAT$.

Algorithme ND : $p = \max(n,m,k) \Rightarrow O(p^3)$ polynomial : $SAT \in NP$.

## SAT

- Un problème fondamental en théorie de la complexité,
- satisfiabilité booléenne des formules de la logique propositionnelle,
- c'est le premier problème NP-découvert (théorème de Cook, 1971),
- solveur SAT (exemple : logictools.org).

### Description du problème

- Valeurs booléennes Vrai et Faux : $\top, \bot$
- Variables booléennes : par exemple $a, b, c, d$
- Formule : $F = F(a,b,c,d)$
- Si affectation possible telle que $\text{eval}(F) = \top$, $F$ est SATisfiable, sinon inSATisfiable.

### Nature de la formule

$$F = (a \vee \neg b \vee c) \wedge (\neg a \vee \neg c) \wedge (\neg b \vee \neg d) \wedge (a \vee \neg d) \wedge (a \vee c \vee d)$$

- $F$ est sous forme normale conjonctive (CNF) : $F = C_1 \wedge C_2 \wedge \cdots \wedge C_m$
- chaque $C_i$ est une clause : disjonction de littéraux $l_1 \vee l_2 \vee \cdots \vee l_k$
- chaque littéral $l_i$ est de la forme variable propositionnelle ou sa négation ($v$ ou $\neg v$)
- affectation qui rend $F$ satisfiable (chaque clause s'évalue à Vrai)
- interprétation : assignation d'une valeur de vérité à chaque variable, ex. $I: \{a=\text{faux}, b=\text{vrai}, c=\text{vrai}, d=\text{vrai}\}$
- modèle d'une formule $F$ : interprétation pour laquelle $F$ a la valeur Vrai
- formule $F$ cohérente : $F$ admet au moins un modèle

### Exemple

Instance de SAT : $I = (a \vee b \vee c) \wedge (\neg a \vee b) \wedge \neg c$. Certificat : $S = \{a=\text{Vrai}, b=\text{Vrai}, c=\text{Faux}\}$.

### Exemples de problèmes NP

SAT, 3-SAT, Clique, Stable (Independent Set), 2-SAT, HC (Hamiltonien Cycle), 2-coloriage, k-coloriage, Coloriage, TS.

## 3-SAT : description d'un problème

Soit $F = C_1 \wedge C_2 \wedge \cdots \wedge C_k$ une formule en 3-CNF, avec $k$ clauses, contenant chacune 3 littéraux distincts. Pour chaque clause on crée 3 sommets, un pour chaque littéral dans la clause.

**Problème** : existe-t-il une interprétation $I$ / $[A_i]_I = V\ \forall\, 1 \leq i \leq k$ ?

## Circuit hamiltonien : description d'un problème

**Données** : soit un graphe $G = (S,A)$ et $|S| = n$ sommets.

**Problème** : existe-t-il un parcours fermé qui passe par tous les sommets une seule fois ? Trouver une permutation $s_1,\ldots,s_n$ telle que $(s_i, s_{i+1}) \in A\ \forall\, 1 \leq i \leq n-1$ et $(s_n, s_1) \in A$.

## Voyageur de commerce (TS) : description d'un problème

**Données** : soit un graphe $G = (V,E)$ complet et pondéré, avec $V$ l'ensemble de villes, $d(v_i,v_j)$ la distance entre ville $i$ et ville $j$, et un entier $k$.

**Problème** : existe-t-il un parcours fermé qui passe par toutes les villes une seule fois dont la longueur $\leq k$ ? Trouver une permutation $v_{i_1},\ldots,v_{i_n}$ telle que $\sum_{j=1}^{n-1} d(v_{i_j}, v_{i_{j+1}}) + d(v_{i_n}, v_{i_1}) \leq k$.

### Exemple de transformation : CH $\propto$ TSP

Montrer que $CH \propto TSP$. Trouver l'algorithme de transformation et estimer son temps : $f(x) \in TSP$ ssi $x \in HC$.

Définition de $F$ : $V = S$, $n = |V|$, $d(v_i,v_j) = 1$ si $(v_i,v_j) \in A$, $2$ sinon.

## Cliques maximales : description d'un problème

**Données** : graphe $G = (S,A)$ et un entier $k \leq |S|$.

**Problème** : $G$ contient-il une clique de taille $k$ ? Existe-t-il un sous-graphe complet dont le nombre de sommets $\geq k$ ? $\exists\, S' \subseteq S$ tel que $|S'| \geq k\ \forall\, s_1 \in S'$ et $s_2 \in S'$ on a $(s_1,s_2) \in A$.

## Couverture par sommets (Vertex Cover) : description d'un problème

**Données** : graphe $G = (S,A)$ et un entier $k \leq |S|$.

**Problème** : existe-t-il une couverture par sommets de $G$ de taille $k$ ? $\exists\, S' \subseteq S$ tel que $|S'| \leq k\ \forall\, (s_1,s_2) \in A$ on a $s_1 \in S'$ ou $s_2 \in S'$.

## Coloration de graphe : description d'un problème

**Données** : un graphe $G = (S,A)$ et un entier $k \leq |S|$.

**Problème** : existe-t-il une coloration des sommets de $G$ avec $k$ couleurs, telle que deux sommets adjacents soient coloriés avec deux couleurs différentes ?

### Exemple de transformation polynomiale : Coloration de graphe $\propto$ SAT

- Données (Coloration) : un graphe $G$ non orienté et un entier $k$. Problème : coloration d'un graphe avec au moins $k$ couleurs.
- Données (SAT) : les formules propositionnelles au format CNF. Problème : trouver les formules CNF cohérentes.

## Le plus long cycle (PLC) : description d'un problème

**Données** : soit un graphe $G = (S,A)$ et un entier $k$.

**Problème** : déterminer si $G$ possède un cycle de longueur $\geq k$.

### Exercice : CH $\propto$ PLC

Montrer que $CH \propto PLC$.

## Somme de sous-ensemble : description d'un problème

**Données** : $S \subseteq \mathbb{N}$ et $t \in \mathbb{N}$.

**Problème** : existe-t-il $S' \subseteq S$ / $\sum_{s' \in S'} s' = t$ ? Exemple : $S = \{1,3,5,45,65,98,45658,45458,1235,785,659\}$, $t = 1590$.

## Exercices de réduction

### Exercice 1

Prouver que $SAT \propto$ Circuit Hamiltonien et Circuit Hamiltonien $\propto SAT$.

### Exercice 2

Prouver que Clique Maximale $\propto$ Couverture de Sommet.

**Correction** :

- Données (Clique) : graphe $G_1 = (S_1,A_1)$, $|S_1|=n$, et un entier $k_1 \leq |S_1|$. Problème : $G$ contient-il une clique de taille $k_1$ ? Existe-t-il un sous-graphe complet dont le nombre de sommets $\geq k_1$ ? $\exists\, S_1' \subseteq S_1$ tel que $|S_1'| \geq k_1\ \forall\, (s_1,s_2) \in A_1$ on a $s_1 \in S_1'$ et $s_2 \in S_1'$.
- Données (Couverture) : graphe $G_2 = (S_2,A_2)$ et un entier $k_2 \leq |S_2|$. Problème : existe-t-il une couverture par sommets de $G$ de taille $k_2$ ?

Montrer que $f$ est calculable en un temps polynomial (algorithme de transformation), puis les deux sens de l'équivalence :

- « $\Rightarrow$ » : soit $f(x) \in CS$, montrer que $x \in$ Clique.
- « $\Leftarrow$ » : soit $x \in$ Clique, montrer que $f(x) \in CS$.

### Exercice 3

Prouver que $3SAT \propto$ Couverture de Sommet.

**Indications** :

1. Toute variable propositionnelle se voit associer 2 sommets (variable et sa négation). Exemple : $p \to p$ et $\neg p$.
2. Toute clause est représentée par un triangle étiqueté par les 3 littéraux de la clause.
3. Une arête est couverte par 1 sommet, et un triangle est couvert par 2 sommets.

**Exemple** : $F = (p_1 \vee p_2 \vee p_3) \wedge (\neg p_1 \vee \neg p_2 \vee p_4) \wedge (p_2 \vee p_3 \vee p_4)$, avec $p_1{=}V, p_2{=}V, p_4{=}V$ et $p_3{=}F$. Avec $n$ variables et $m$ clauses, l'algorithme de transformation est polynomial $\cong O(n^2)$, car la taille du graphe est $2n+3m$, d'où pour parcourir les sommets on a $[2n+3m]^2 \cong O(n^2)$.

La taille de la couverture $CS$ : $k = 2m+n$ (nombre de sommets couverts). On prend comme couverture : tous les sommets, plus un triangle non recouvert.

### Exercice 4

Prouver que $3SAT \in NPC$, sachant que $SAT \in NPC$.

**Correction** : $3SAT$ est un cas particulier de $SAT \in NP$ (avec $k=3$).

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/complexite-ch2-complexite-problemes.pdf" />

</TabItem>
</Tabs>
