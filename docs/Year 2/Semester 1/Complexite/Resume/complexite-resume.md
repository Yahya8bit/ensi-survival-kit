---
sidebar_position: 1
title: "Résumé — Complexité & Algorithmique Avancée"
sidebar_label: Résumé
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Résumé — Complexité & Algorithmique Avancée

*Notes de résumé manuscrites d'un étudiant, condensant l'ensemble du cours (Complexité des algorithmes, Complexité des problèmes, Branch & Bound, Glouton, Programmation Dynamique) — non un document officiel du professeur. Reproduites ici sous forme condensée fidèle au style « résumé » de la source ; les abréviations personnelles de l'auteur (« lge » → langage, « tjs » → toujours, « pb » → problème, etc.) ont été développées pour la lisibilité, sans changer le contenu.*

<!-- TODO: unclear in source, verify against original PDF — dense, fast handwriting throughout; a handful of short fragments (e.g. isolated exponents/indices in the reduction diagrams on page 7, some cell values in the assembly-line scheduling recurrence on page 14) were reconstructed from context and should be checked against the original scan if used for study. -->

## Complexité — définitions de base

Un algorithme se mesure selon :

- **Nombre d'opérations** (temps de calcul),
- **Quantité de mémoire** (occupation mémoire).

**Complexité** : quantité minimale de ressources nécessaires à sa résolution.

## Machine de Turing (1936 — Alan Matheson Turing)

**Définition** : une M.T. déterministe $M = (Q,\Gamma,\Sigma,\delta,q_0,F)$ où :

- $Q$ : ensemble fini d'états,
- $\Gamma$ : un alphabet,
- $\Sigma \subseteq \Gamma$ : alphabet d'entrée,
- $F \subseteq Q$ : ensemble d'états d'acceptation,
- $\delta : D \subseteq Q \times \Gamma \to Q \times \Gamma \times \{L,R\}$ : fonction de transition,
- $q_0$ : état initial,
- un symbole spécial $B$ appelé caractère blanc,
- $L$ et $R$ représentent les 2 directions de déplacement de la tête de lecture,
- une configuration est un élément de $Q \times \Gamma^* \times \mathbb{N}$ ($\Gamma^*$ : ensemble de mots).

Une M.T. peut : s'arrêter (accepter, ou se bloquer si $\delta$ n'est pas définie), ou ne jamais s'arrêter → **M.T. non déterministe (M.T.N.D.)**.

## Décidabilité — Calculabilité (1900, David Hilbert)

- Un langage est **accepté** par une M.T. s'il existe une M.T. qui accepte, dans un temps fini, tous les mots du langage.
- Un langage est **décidé** par une M.T. s'il existe une M.T. qui accepte le langage et qui s'arrête toujours.
- Un langage est **récursif** s'il est décidé par une M.T.
- Un algorithme est un ensemble fini d'instructions décrivant le déroulement des opérations pour résoudre un problème, et ce déroulement doit toujours se terminer dans un temps fini.
- Un problème est **décidable** s'il existe une M.T. qui s'arrête toujours ; sinon il est dit **indécidable**.

**Exemples de problèmes indécidables** :

- le **problème de l'arrêt** : il n'existe aucun programme capable de reconnaître si un autre programme termine son exécution ;
- le **problème de correspondance de Post (PCP)**.

*(Théorème : existence d'un problème indécidable — Alonzo Church, 1936, Thèse de Church.)*

**Théorème d'incomplétude (Kurt Gödel)** : pour tout système formel $S$ contenant le langage arithmétique, il existe une proposition $G$ indémontrable dans $S$.

**Thèse de Church-Turing** : un langage est calculable si ce langage est récursif, i.e. décidé par une M.T.

## Complexité algorithmique

- **Complexité temporelle pire cas d'une M.T.** : nombre max de déplacements de la tête de lecture/écriture pour résoudre une instance de taille max $n$. La taille de l'instance est la longueur de la séquence binaire codant cette instance comme une entrée de la M.T.
- **Complexité spatiale pire cas** : longueur de bande nécessaire à la machine pour résoudre une instance de taille $n$.

## Problème de décision

- Un problème → une question. Exemple : « trouvez un facteur non trivial d'un entier ».
- Résoudre un problème → décrire un algorithme (M.T.).
- Un problème de décision (d'où le nom « reconnaissance ») consiste à chercher, dans un ensemble fini, s'il existe un élément vérifiant une certaine propriété.
- Un problème de décision peut être formulé par un énoncé et une réponse (oui/non).

**Forme générale d'un problème de décision** : une description de l'instance du problème, et l'expression d'une question oui/non portant sur cette instance.

### Exemples

- **Voyageur de Commerce (TSP)** — données : un graphe complet d'ordre $n$ valué par des entiers positifs et un entier $k$. Question : existe-t-il, dans le graphe, un cycle hamiltonien de longueur $\leq k$ ?
- **Clique** — données : $G$ graphe et entier positif $k$. Question : $G$ contient-il un sous-graphe complet à $k$ sommets ?
- **Recouvrement (Set Cover)** — données : un ensemble $X$ et une famille $\mathcal{F}$ de sous-ensembles de $X$. Question : existe-t-il une sous-famille $\mathcal{F}' \subseteq \mathcal{F}$ telle que tout élément de $X$ appartient à exactement un élément de $\mathcal{F}'$ ?

### Lien entre problème de décision et langage

- Fonction de codage $C$ : traduction d'une instance en un mot sur un alphabet.
- Une M.T. $M$ résout le problème de décision $\pi$, selon le codage $C$, si $M$ s'arrête sur toute entrée $x$ et si l'ensemble des mots acceptés par $M$ est égal à l'ensemble $L[\pi,C]$ des mots qui résultent du codage d'instances de $Y_\pi$.
- Langage accepté par une M.T. : $\Sigma$ = ensemble des symboles pouvant être écrits par l'utilisateur sur le ruban ; $\Sigma^*$ = ensemble des mots ; $L_M = \{x \in \Sigma^* : M \text{ accepte } x\}$. Résoudre le problème $\iff x \in L_M$ ?

### Codage des nombres entiers positifs

- **binaire efficace** : $i = \sum i_k 2^k$, $i_k \in \{0,1\}$ — la longueur $l_1(i)$ du code de $i$ est de l'ordre de $\log(i)$ ;
- **binaire inefficace** : $i$ est codé par une séquence de 1 de longueur $i$ — la longueur $l_2(i)$ du code de $i$ est de l'ordre de $2^{l_1(i)} = i$.

**Codage d'un graphe** : liste des sommets / des arcs, listes de voisins, ou matrice d'adjacence.

### Notations

Soit $D_\pi$ = ensemble des instances possibles d'un problème de décision $\pi$. $Y_\pi$ = sous-ensemble de $D_\pi$ tel que la réponse est Oui ; $N_\pi$ = idem pour Non.

## Classes de complexité

**Complexité en temps d'une M.T. s'arrêtant toujours** :

$$T_M(n) = \max\{m\ /\ \exists\, x \in \Sigma^*,\ |x|=n\ \text{et l'exécution de}\ M\ \text{sur}\ x\ \text{comporte}\ m\ \text{étapes}\}$$

**La classe P** : classe des langages décidés par une M.T. polynomiale, i.e. il existe un polynôme $p(n)$ tel que $T_M \leq p(n)\ \forall\, n \geq 0$.

Le temps de calcul d'une M.T.N.D. sur un mot $w$ : la longueur de la plus courte exécution acceptant le mot si $w$ est accepté, $+\infty$ si $w$ n'est pas accepté.

**Complexité en temps d'une M.T.N.D.** :

$$T_{MND}(n) = \max\{m\ /\ \exists\, x \in \Sigma^*,\ |x|=n\ \text{et le temps de calcul de}\ M\ \text{sur}\ x\ \text{est}\ m\}$$

**La classe NP (Non déterministe Polynomiale)** : classe des langages acceptés par une M.T.N.D. polynomiale.

**Exemple : Circuit Hamiltonien.** Un circuit hamiltonien est un chemin de $G$ passant par tous les sommets une et une seule fois et revenant à son point de départ. Un graphe biparti d'ordre impair n'a pas de circuit hamiltonien.

**Théorème** : soit $L \in NP$, il existe une M.T.D. $M$ et un polynôme $p(n)$ tels que $M$ décide $L$ et est de complexité en temps bornée par $2^{p(n)}$ (simule les $2^{p(n)}$ exécutions de la M.T.N.D.).

**Pour prouver qu'un problème est dans NP** :

1. proposer un codage de la solution (certificat) ;
2. proposer un algorithme vérifiant la solution au vu des données et du certificat ;
3. montrer que cet algorithme a une complexité polynomiale.

**Exemples de certificats** :

- Voyageur de commerce : indication d'un circuit de longueur inférieure à $k$.
- Clique : indication de $k$ sommets du graphe d'entrée constituant une clique.
- Recouvrement : indication d'une sous-famille vérifiant la propriété demandée.

**Remarque** : pour un grand nombre de problèmes de NP, on ne sait pas s'ils sont polynomiaux ou non — on ne sait pas produire une solution polynomiale, et on ne sait pas démontrer qu'il n'en existe pas. Que faire : comparer la difficulté du problème NP considéré à celle d'un autre problème NP, réduire un problème à un autre.

## Réduction des problèmes

**Transformation polynomiale (réduction)** : soient les langages $L_1$ et $L_2$. Une transformation polynomiale de $L_1$ vers $L_2$, notée $L_1 \propto L_2$ (ou $L_1 \leq_P L_2$), est une fonction $f$ qui satisfait les conditions suivantes :

- elle est calculable en temps polynomial,
- $f(x) \in L_2 \iff x \in L_1$.

**Propriétés de $\propto$** :

- si $L_1 \propto L_2$ alors : si $L_2 \in P$ alors $L_1 \in P$ ; si $L_1 \notin P$ alors $L_2 \notin P$ ; si $L_1 \in NP$ alors $L_2 \in NP$ ;
- si $L_1 \propto L_2$ et $L_2 \propto L_3$ alors $L_1 \propto L_3$ (transitivité).

**Problèmes polynomialement équivalents** : deux langages $L_1, L_2$ sont polynomialement équivalents ($L_1 \equiv_P L_2$) ssi $L_1 \propto L_2$ et $L_2 \propto L_1$.

**Classe d'équivalence polynomiale** : soit $H$ une classe dont les membres sont dans $P$ s'il n'en existe aucun ; possibilité de construire une classe d'équivalence de proche en proche.

### Structure de NP

**Définition** : une classe d'équivalence $C_1$ est inférieure à $C_2$, notée $C_1 \leq C_2$, si $\forall\, L_1 \in C_1$ et $L_2 \in C_2 : L_1 \propto L_2$.

- $P \subseteq NP$ (P est la plus petite classe de NP).
- $\forall\, L_1 \in P,\ \forall\, L_2 \in NP,\ L_1 \propto L_2$.
- Plus grande classe de NP : NP-complets (« noyau dur »).

## NP-complétude

**Définition** : $L$ est NP-complet si :

1. $L \in NP$,
2. $\forall\, L_1 \in NP,\ L_1 \propto L$.

**Remarque** : si $L$ vérifie 2) et non pas 1), $L$ est un problème NP-Dur.

**Théorème** : soit $L$ un langage NP-complet. $L \in P$ ssi $P = NP$. (Un problème NPC n'a de solution polynomiale que ssi $P=NP$.)

**Propriétés de $\propto$ (suite)** :

- si $L_1 \propto L_2$ alors : si $L_2 \in P$ alors $L_1 \in P$ ; si $L_1 \notin P$ alors $L_2 \notin P$ ; si $L_1 \in NP$ alors $L_2 \in NP$ ;
- si $L_1 \propto L_2$ et $L_2 \propto L_3$ alors $L_1 \propto L_3$ (transitive).

## Problème de satisfiabilité (SAT)

- Données : un ensemble de variables booléennes $\{x_1,\ldots,x_n\}$, un ensemble de clauses $C_i = \{y_{i,1} \vee \cdots \vee y_{i,k}\}$ où $y_{i,j}$ égale à l'une des $x_i$ ou $\neg x_i$, $F = C_1 \wedge \cdots \wedge C_m$.
- Résultat : décider si $F$ est satisfiable (vraie) par une affectation de valeurs V/F aux variables.

Résolu par **Stephen Cook (1971)** : **SAT est NP-complet**.

### Pb $k$-SAT

- Données : ensemble de variables booléennes $\{x_1,\ldots,x_n\}$, ensemble de clauses $C_i = \{y_{i,1} \vee \cdots \vee y_{i,k}\}$ où $y_{i,j}$ égale l'une des $x_i$ ou $\neg x_i$, et $|C_i|=k$. $F = C_1 \wedge \cdots \wedge C_m$.
- Résultat : décider la satisfiabilité de $F$.

### Pb NAE-SAT (Not All Equal SAT)

- Données : mêmes données que SAT.
- Résultat : décider s'il existe une affectation telle que $\forall i, \exists j, l$ tels que $y_{i,j}=V$ et $y_{i,l}=F$.

### Pb Max $k$-SAT

- Données : ensemble de variables booléennes, ensemble de clauses de taille $\leq k$, $F = C_1 \wedge \cdots \wedge C_m$, entier $l$.
- Résultat : décider s'il existe une affectation telle qu'au moins $l$ clauses de $F$ soient vraies.

## Problèmes de graphes NP-complets

Soit $G=(X,E)$ d'ordre $n$ :

- $G$ **complet** si $\forall\, x_1,x_2 \in X : (x_1,x_2) \in E$.
- $S \subseteq X$ est un **stable** de $G$ si $\forall\, x_1,x_2 \in S : (x_1,x_2) \notin E$.
- $T \subseteq X$ est un **transversal** de $G$ si $\forall\, e=(x_1,x_2) \in E : x_1 \in T$ ou $x_2 \in T$.
- $\overline{G}(X,\overline{E})$ est le graphe complémentaire de $G$ : $(x_1,x_2) \in E \iff (x_1,x_2) \notin \overline{E}$.
- $S$ une clique de $G$ $\iff$ $S$ est un sous-graphe complet de $G$.
- $S$ une clique de $G(X,E)$ $\iff$ $S$ est stable de $\overline{G}$.
- une **coloration** des sommets de $G(X,E)$ est une application $C : X \to \mathbb{N}$ telle que $C(v) \neq C(w)\ \forall\, \{v,w\} \in E$.
- une **$k$-coloration** est une coloration utilisant $k$ couleurs.
- le **nombre chromatique** $\chi(G)$ est défini par $\chi(G) = \min\{k\ /\ G\ \text{est}\ k\text{-colorable}\}$.

### Catalogue de problèmes NP-complets

- **Stable (Independent Set)** — données : graphe $G(X,E)$ non orienté, entier $k$. Résultat : décider s'il existe un stable $S \subseteq X$ tel que $|S| \geq k$.
- **Clique** — données : $G(X,E)$ non orienté, entier $k$. Résultat : décider s'il existe une clique $C \subseteq X$ telle que $|C| \geq k$.
- **Couverture de sommets (Vertex Cover)** — données : $G(X,E)$ non orienté, entier $k$. Résultat : décider s'il existe un transversal $T \subseteq X$ tel que $|T| \leq k$.
- **Coupure maximale (Max Cut)** — données : $G(X,E)$ non orienté, entier $k$. Résultat : décider s'il existe une partition $X = X_1 \cup X_2$ telle que $|\{(x_1,x_2) \in E\ /\ x_1 \in X_1\ \text{et}\ x_2 \in X_2\}| \geq k$.
- **Circuit Hamiltonien (HC)** — données : $G(X,E)$ non orienté. Résultat : existe-t-il un circuit hamiltonien dans $G$ ?
- **Circuit le plus long** — données : $G(X,E)$ non orienté, entier $k$. Résultat : existe-t-il un circuit de longueur $\geq k$ ?
- **Voyageur de commerce (TSP)** — données : un couple $(n,M)$ où $M$ est une matrice carrée d'ordre $n$ de réels, et un réel $k$. Résultat : existe-t-il une permutation $\pi$ de $[1,n]$ telle que $\sum_{1 \leq i \leq n-1} M_{\pi(i),\pi(i+1)} + M_{\pi(n),\pi(1)} \leq k$ ?
- **$k$-coloration ($k$-Color)** — données : graphe $G(X,E)$ non orienté, entier $k$. Résultat : existe-t-il une $k$-coloration de $G$ ?
- **Sac à dos (Knapsack)** — données : ensemble de poids $a_i$, $i=1..n$, ensemble de valeurs $v_i$, $i=1..n$, un poids limite $A$ et un entier $V$. Résultat : existe-t-il une suite $c_i \in \{0,1\}$ telle que $\sum_{i=1}^n c_i a_i \leq A$ et $\sum_{i=1}^n c_i v_i \geq V$ ?
- **Somme de sous-ensemble (Subset Sum)** — données : $E \subseteq \mathbb{N}$ fini, un but $t \in \mathbb{N}$. Résultat : existe-t-il $E' \subseteq E$ tel que $\sum_{x \in E'} x = t$ ?
- **Partition** — données : un ensemble fini $A$ d'entiers. Résultat : existe-t-il $A' \subseteq A$ tel que $\sum_{x \in A'} x = \sum_{x \in A-A'} x$ ?
- **Rangement optimal (Bin Packing)** — données : $N$ objets de poids $s_i$, une capacité $B$ et un entier $k$. Résultat : est-il possible de ranger les $N$ objets dans $k$ boîtes de capacité $B$ ?
- **Programmation entière 0-1** — données : une matrice entière $A(m,n)$, un vecteur entier $b$ d'ordre $m$. Résultat : existe-t-il un vecteur $x$ d'ordre $n$ dont les éléments sont pris dans $\{0,1\}$ tel que $Ax \leq b$ ?

## Exemples de réductions

**3-SAT $\in$ NP** : soit $I$ une instance de 3-SAT, taille $I = O(n+p)$. Certificat : valeur de chaque $x_i$, $i=1..n$. Vérification en $O(p)$.

**3-SAT est NP-Dur** : réduction à partir de SAT. Soit $I_1$ une instance de SAT, $n$ variables $x_i$, $p$ clauses $C_j$, $j=1..p$, de longueur $l(C_j)$. Taille $(I_1) = O(n+\sum l(C_j))$.

**Clique $\equiv_P$ Stable $\equiv_P$ Couverture de sommets** :

- Entrée : graphe $G=(V,E)$ et $k \leq |V|$.
- Clique (CLQ) : existe-t-il $C \subseteq V$, $|C| \geq k$, tel que $\forall\, u,v \in C : (u,v) \in E$ ?
- Stable (IS) : existe-t-il $C \subseteq V$, $|C| \geq k$, tel que $\forall\, u,v \in C : (u,v) \notin E$ ?
- Couverture de sommets (VC) : existe-t-il $C \subseteq V$, $|C| \leq k$, tel que $\forall\, (u,v) \in E : u \in C$ ou $v \in C$ ?

**Théorème** : $CLQ \equiv_P IS \equiv_P VC$. Idée : ce sont des reformulations : $CLQ \propto IS \propto VC$ et $3SAT \propto IS$ et $3SAT \in NPC \Rightarrow CLQ \propto IS \propto VC \Rightarrow CLQ \equiv_P IS \equiv_P VC$.

**$CLQ \propto IS$** : instance de CLQ $(G=(V,E), k)$ → instance de IS $(G^c=(V,E^c), k)$ où $G^c$ est le graphe complémentaire. $f$ calculable en temps polynomial (évident). $(G,k) \in CLQ \iff (G^c,k) \in IS$ (un ensemble de sommets forme une clique dans $G$ ssi ils forment un ensemble indépendant dans $G^c$).

**$IS \propto VC$** : instance de IS $(G=(V,E),k)$ → instance de VC $(G=(V,E), |V|-k)$. $f$ calculable en temps polynomial (évident). $(G,k) \in IS \iff (G,|V|-k) \in VC$ :

- (i) si $V'$ est un IS de taille $k$, alors pour toute arête de $E$, au moins une extrémité est dans $V-V'$ ; donc $V-V'$ est une VC de taille $|V|-k$ ;
- (ii) si $V'$ est une VC de taille $|V|-k$, alors $V-V'$ est un IS de taille $k$.

**$3\text{-}SAT \propto IS$** : instance de 3-SAT (variables $x_1,\ldots,x_n$, $m$ clauses $C_j = l_{j,1} \vee l_{j,2} \vee l_{j,3}$) → instance de IS : $G=(V,E)$ où chaque littéral correspond à un sommet ; arête entre 2 sommets de la même clause, ou si les littéraux d'un sommet sont la négation l'un de l'autre ; entier $k=m$ (nombre de clauses).

## Complexité d'algorithmes récursifs — exemples

### Recherche binaire (par intervalle)

```
Trouve ← faux
Tant que (¬trouve) et (min ≤ max) faire       c2
    centre ← (min+max)/2                       c3
    si A[centre] = c alors                      c4
        trouve ← vrai
        indice ← centre
    sinon
        si A[centre] < c alors                  c7
            min ← centre+1                      c8
        sinon
            max ← centre-1                      c9
si (trouve) alors                                c10
    retourner (indice)
sinon
    retourner (null)
```

**Meilleur des cas** : $k=1$, $T(n) = c_1 + 2c_2 + c_3 + c_4 + c_5 + c_6 + c_{10} = cte = \Theta(1)$.

**Autre des cas** : $k = \log_2(n)$ ($n$ : taille du tableau).

$$T(n) = c_1 + (\log_2(n)+1)c_2 + \log_2(n)(c_3+c_4) + (\log_2(n)-1)c_7 + (\log_2(n)-1)(c_8+c_9) + c_{10} = \Theta(\log_2(n))$$

### Exercice : complexité de $a^n$ (multiplication de matrices, principe de Strassen)

$C = A \times B$, $c_{ij} = \sum_{k=1}^{n} a_{ik} b_{kj}$, méthode naïve en $\Theta(n^3)$.

Découpage par blocs $2\times 2$ : $\begin{pmatrix}R & S\\T & U\end{pmatrix} = \begin{pmatrix}A & B\\C & D\end{pmatrix}\begin{pmatrix}E & F\\G & H\end{pmatrix}$, avec $R=AE+BG$, $S=AF+BH$, $T=CE+DG$, $U=CF+DH$.

$T(n) = 8T(n/2) + \Theta(n^2) = \Theta(n^{\log_2(8)}) = \Theta(n^3)$ (pas d'amélioration : 8 sous-produits).

**Optimisation de Strassen** : $T(n) = 7T(n/2) + \Theta(n^2) = \Theta(n^{\log_2(7)}) = \Theta(n^{2,81})$.

**Dernière optimisation (état de l'art)** : $O(n^{2,376})$.

**Méthode de Strassen** — 7 produits :

$$S = P_1+P_2,\quad T = P_3+P_4,\quad R = P_5+P_4-P_2+P_6,\quad U = P_5+P_1-P_3-P_7$$

$$P_1=AF-AH=A(F-H),\quad P_2=AH+BH=(A+B)H,\quad P_3=CE+DE=(C+D)E$$
$$P_4=DG-DE=D(G-E),\quad P_5=AE+AH+DE+DH=(A+D)(E+H)$$
$$P_6=BG+BH-DG-DH=(B-D)(G+H),\quad P_7=AE+AF-CE-CF=(A-C)(E+F)$$

## Branch & Bound

Les méthodes Branch & Bound sont des méthodes qu'on utilise pour résoudre des problèmes explorant des arborescences combinatoires. Un problème d'optimisation combinatoire est défini par :

$$S,\quad f: S \to \mathbb{R}$$

(ensemble, fonction objectif) — il s'agit de déterminer $\hat{s} \in S$ tel que $f(\hat{s}) = \min_{s \in S} f(s)$ (ou max).

Les problèmes d'optimisation combinatoire sont en général NP-complets. Les programmes linéaires à variables entières peuvent se traduire : $Ax \leq B$, $x_i \in \mathbb{N}$, $Cx = Z$ (min ou max).

Les méthodes B&B donnent des solutions **exactes** en essayant de diminuer considérablement le nombre de combinaisons à explorer, sans toutefois donner des algorithmes qui soient complètement polynomiaux.

**Exemple : répartition des tâches**

| | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| 1 | 8 | 7 | 6 | 5 |
| 2 | 11 | 7 | 16 | 6 |
| 3 | 7 | 8 | 6 | 8 |
| 4 | 11 | 6 | 9 | 9 |

Nombre de possibilités : $A_4^4 = 4! = 24$.

Coût min ; ordre d'assignation $O_1{-}t_4,\ O_2{-}t_3,\ O_3{-}t_1,\ O_4{-}t_2$, coût $= 19$ (arbre de séparation-évaluation construit en élaguant les branches dont la borne dépasse la meilleure solution connue).

### Description de la méthode Branch & Bound

On ne peut présenter qu'un cadre général de ces procédures, car on est toujours confronté aux problèmes suivants :

- quel sommet choisir pour séparer,
- quelle séparation faire.

Ces 2 points dépendent de la structure du problème et comment poser l'arborescence.

- Comment évaluer.

Soit le problème d'optimisation combinatoire : $\hat{s} \in S$, $f(\hat{s}) = \min_{s \in S} f(s)$.

- $S' \subset S$, $g(S') \leq f(s)\ \forall\, s \in S'$ ($g$ est une **fonction d'évaluation**, un algo peut la calculer).
- Si $g(S') = f(\hat{s})$, $\hat{s} \in S'$, alors $\hat{s}$ est la solution réalisable.
- Un sous-ensemble $S'$ de $S$ est dit **stérile** (stérilisable) s'il existe une solution $\hat{s}$ telle que $f(\hat{s}) \leq g(S')$ (au moins aussi bonne que toutes les solutions de $S'$).
- $S'$ est **séparé** en $S'_1, S'_2, \ldots, S'_n \subseteq S$ si $S'_1 \cup \cdots \cup S'_n = S'$.

**Schéma général** :

$\hat{s}$ : meilleure solution connue ; $V = f(\hat{s})$ ; $F$ = famille des sous-ensembles de $S$ non stériles.

```
Algorithme B&B
ŝ ← ⊥, V ← +∞ (ou -∞ si max)
F = {S}
Tant que (F ≠ ∅) faire
    choisir un S' ∈ F
    si (S' n'est pas évalué) alors
        évaluer(S')
    sinon
        séparer(S')
fin tq

procédure évaluer(S')
    calculer(g(S'))
    si g(S') ≥ V alors
        stériliser : F = F \ {S'}
    sinon
        si (g(S') < V et solution réalisable) alors
            ŝ ← s'∈S'  tel que f(s')=g(S')
            V ← g(S')
            F ← F \ {S'}
        finsi

procédure séparer(S')
    Sép S' en S'1, S'2, ..., S'k
    F ← F ∪ {S'1,...,S'k} \ {S'}
```

Un algorithme particulier ne peut être écrit que lorsqu'on aura spécifié les procédures évaluer et séparer, et la fonction de choix. Les 2 premiers points vont dépendre de la structure du problème et le choix en est un peu particulier.

- La première stratégie : on va au min pour avoir les solutions le plus rapidement.
- Ou le max, pour éliminer les branches le plus rapidement.

**Exercice : voyageur de commerce** — exemple de développement de l'arbre B&B sur un graphe à sommets $A,B,C,D,E$ (bornes calculées par élimination successive des arêtes non retenues, valeurs $22{,}5$ puis $23$ selon les choix intermédiaires).

## Algorithmes gloutons

**Principe** : un choix fait à un état donné n'est pas remis en cause ultérieurement. C'est une approche très simpliste qui, généralement, ne peut pas donner une solution exacte — mais pour certains problèmes, l'algorithme glouton donne une solution exacte (schéma : à chaque étape, on prend « le meilleur »).

**Comment savoir si un problème peut être résolu par un algo glouton — formellement** : il vérifie la propriété de **matroïde**.

Un matroïde est un couple $M=(E,I)$ où :

1. $E$ ensemble fini non vide,
2. $I$ est une famille non vide de sous-ensembles de $E$, appelés sous-ensembles indépendants de $E$, tels que si $H \in I$ et $F \subset H$ alors $F \in I$ ($I$ est dit héréditaire),
3. si $F \in I$ et $H \in I$, $|F| < |H|$, alors il existe un élément $x \in H-F$ tel que $F \cup \{x\} \in I$ (propriété d'échange).

**Informellement** :

1. **choix glouton**,
2. **sous-structure optimale**.

1) La solution optimale globale peut être atteinte en effectuant des choix locaux optimaux.

2) Si une solution optimale du problème contient la solution optimale des sous-problèmes → ⊕ → approche glouton (choix glouton) ou sous-problèmes superposés → programmation dynamique.

**Exemple : problème du sac à dos**

1. Variante tout ou rien,
2. Variante fractionnaire.

$w_{max} = 50$ kg. Objets : $w_1{=}10$kg, $v_1{=}60$ (6/kg) ; $w_2{=}20$kg, $v_2{=}100$ (5/kg) ; $w_3{=}30$kg, $v_3{=}120$ (4/kg) — valeurs monétaires (dinars).

- **Fractionnaire** (trier par $v_i/w_i$ décroissant) : $20 w_3 + 20 w_2 + 10 w_1$, valeur totale 240.
- **Tout ou rien** : $30 w_3 + 20 w_2$, valeur totale 220.

**Exemple : choix d'activités**

$S=\{a_1,\ldots,a_n\}$, dates $d_i$ (début), $f_i$ (fin). $a_i$ et $a_j$ ne sont pas concurrentes si $f_i \leq d_j$ ou $f_j \leq d_i$. Maximiser le nombre d'activités non concurrentes.

**Idée** : trier les dates de fin, $f_1 \leq f_2 \leq \cdots \leq f_n$ (tri en $\Theta(n\log n)$).

```
Choix_activité_glouton(S,F,D)
    n ← longueur(S)
    A ← {a1}
    j ← 1
    pour i = 2 à n faire
        si di ≥ fj alors
            A ← A ∪ {ai}
            j ← i
    retourner (A)
```

$S$ : tableau des activités, $F$ : tableau des horaires de fin, $D$ : tableau des horaires de début, $A$ : activités sélectionnées, $j$ : dernière activité sélectionnée.

## Programmation Dynamique

### Exemple : multiplication en chaîne de matrices

$A_1 (10 \times 100)$, $A_2 (100 \times 5)$, $A_3 (5 \times 50)$ :

- $A_1(A_2 A_3)$ : $75\,000$ opérations,
- $(A_1 A_2)A_3$ : $7\,500$ opérations.

L'ordre du parenthésage compte. Soit $A_1 \cdots A_n$ avec $A_i$ de dimension $p_{i-1} \times p_i$, $A_{ij} = A_i \times \cdots \times A_j$. $A_{1n} = A_{1k} \times A_{(k+1)n}$ : sous-structure optimale.

**Récurrence** : $m_{ij} = \begin{cases} 0 & i=j \\ \min_{i \leq k \lt j}(m_{ik}+m_{k+1,j}+p_{i-1}p_k p_j) & i \lt j \end{cases}$

a) sous-structure optimale, b) récurrence.

**Exemple** ($A_1\ldots A_6$) : $A_1(30\times35)$, $A_2(35\times15)$, $A_3(15\times5)$, $A_4(5\times10)$, $A_5(10\times20)$, $A_6(20\times25)$. Table de parenthésage optimal calculée (valeurs $m_{13}=7\,875$, $m_{23}=2\,625$, $m_{46}=1\,000$, $m_{56}=3\,500$, etc.).

```
MCM(A, s, i, j)
    si i > j alors
        X ← MCM(A, s, i, s[i,j])
        Y ← MCM(A, s, s[i,j]+1, j)
        retourner (X * Y)

Calcul_Parenthese_Min()
    pour i = 1 à n faire
        m[i,i] ← 0
    pour l = 2 à n faire
        pour i = 1 à n-l+1 faire
            j ← i+l-1
            m[i,j] ← ∞
            pour k = i à j-1 faire
                q ← m[i,k] + m[k+1,j] + p[i-1]p[k]p[j]
                si q ≤ m[i,j] alors
                    m[i,j] ← q
                    s[i,j] ← k
    retourner m
```

On remarque que leurs calculs qui se font dans une branche sont refaits dans une autre branche → on calcule du bas vers le haut (tableau de sous-solutions $m_{i,i+1}, m_{i,i+2}, \ldots$ construit par diagonales croissantes).

### Exemple : ordonnancement sur chaîne d'assemblage (assembly-line scheduling)

Problème : déterminer les postes à sélectionner sur la chaîne 1 et 2 pour minimiser le délai de fabrication de la pièce. On a $2^n$ chemins possibles. On note $b_{i,j}$ le temps min de l'entrée jusqu'au poste $S_{i,j}$ à partir du départ.

$$b_{opt} = \min(b_{1,n}+S_1,\ b_{2,n}+S_2)$$

$$b_{1,j} = \begin{cases} e_1+a_{1,1} & \text{si } j=1 \\ \min(b_{1,j-1},\ b_{2,j-1}+t_{2,j-1})+a_{1,j} & \text{si } j>1 \end{cases} \qquad b_{2,j} = \begin{cases} e_2+a_{2,1} & \text{si } j=1 \\ \min(b_{2,j-1},\ b_{1,j-1}+t_{1,j-1})+a_{2,j} & \text{si } j>1 \end{cases}$$

Sous-structure optimale : on calcule du bas vers le haut, $n$ opérations ($3$ additions $+$ $1$ comparaison par étape), soit une complexité de l'ordre de $\Theta(n)$.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/complexite-resume.pdf" />

</TabItem>
</Tabs>
