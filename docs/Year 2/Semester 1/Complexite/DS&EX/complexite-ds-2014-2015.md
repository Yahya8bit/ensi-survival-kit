---
sidebar_position: 1
title: "Devoir Surveillé — 13/11/2014 (Corrigé)"
sidebar_label: DS 2014/2015 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Devoir Surveillé — Conception et Analyse des Algorithmes

*École Nationale des Sciences de l'Informatique — Université de la Manouba — A.U. : 2014/2015 — Classe : II2 — Date : 13 novembre 2014 — Durée : 2 heures — Documents non autorisés — Enseignants : Abid M.A., Chaker W., Dougui N.H.*

<!-- TODO: the source PDF ("DS + corr.pdf") bundles 12 pages: pages 1-8 are this DS's statement and handwritten correction (transcribed in full below), but pages 9-12 are a typed correction for a different, unrelated exercise set (a "DecProc" NP-hardness problem via reduction from Independent Set) whose own statement is not present anywhere in the shared folder. That correction does not match this exam's Exercice 2/3 (which are about algorithm complexity and NAE-k-SAT/Coupure Maximale) and is not transcribed here — flagged for the maintainer in case the matching statement turns up elsewhere. -->

## Exercice 1 (3 pts)

Répondre par « Vrai », « Faux » ou « On sait pas » et justifier brièvement :

1. Dans la classe P, l'acronyme P vient de « Polynomial », et dans la classe NP, l'acronyme NP vient de « Non Polynomial ».
2. S'il existe une machine de Turing Non Déterministe capable de reconnaître un langage $L$, alors $L$ appartient à NP.
3. Si $A \in NP$ et $B \in NP$ alors $(A \cup B) \in NP$.
4. Si $A$ est NP-complet, alors tout algorithme déterministe qui résout $A$ est de complexité exponentielle.
5. Si $A \in NP$ et $A$ se transforme polynomialement en $B$, alors $B \in NP$.
6. S'il existe un problème NP-complet qui appartient à P, alors P=NP.

<details>
<summary>Correction</summary>

1. **Faux**. NP vient de « Non deterministic polynomial ».
2. **Faux**. Le langage doit être reconnu par une MTND **en temps polynomial**.
3. **Vrai**. $A \in NP \iff$ si $x \in A$ avec une MTND$_A$ en temps polynomial. Si $B \in NP$ alors $\exists$ une MTND$_B$ qui répond « est-ce que $x \in B$ » en temps polynomial. Pour répondre si $x \in A \cup B$, il suffit d'exécuter la machine MTND$_A$, puis la machine MTND$_B$.
4. **On ne sait pas**. Exponentielle = polynomiale ? Pour le savoir, il faut répondre à la question P=NP ?
5. **Faux**. On a $A \in NP$ et $A \preceq_P B$ (contre-exemple : un problème non calculable est plus difficile qu'$A$ et il n'est pas dans NP ($\notin NP$)). *Remarque : les problèmes non calculables sont plus difficiles que les problèmes dans NP.*
6. **Vrai**, démonstration dans le cours.

</details>

## Exercice 2 (7 pts)

1. Calculez la complexité au pire cas des algorithmes suivants (1.5 pts par algo) :

```
Algo A                              Algo B
S = 0 ;                             S = n ;
for (i=n ; i>1 ; i=i/2)             while (S > 0) {
    for (j=(n-i) ; j<n ; j=j+1)         if (S mod 2 == 0)
        S = S+j                             then S = S/2 ;
                                             else S = S-1 ;
                                     }

Algo C
i = n ;
j = 1 ;
while (i > j) {
    i = i-1 ;
    j = 2*j ;
}
```

2. Étant donné un tableau trié d'entiers $A[s..f]$ et deux entiers (« bornes ») $a \leq b$, on cherche s'il existe un élément $A[i]$ du tableau tel que $a \leq A[i] \leq b$ (s'il y en a plusieurs, en trouver un).

   Exemple : soit le tableau $A[1..5] = [3, 7, 8, 43, 556]$ et les bornes $a=40$, $b=50$. Dans ce cas-là, la valeur encadrée existe : c'est $A[4]=43$.

   a. Donner (en pseudocode) un algorithme « diviser-pour-régner » qui résout ce problème. L'expliquer brièvement. (1.5 pts)
   b. Calculer la complexité de l'algorithme proposé à la question précédente. (1 pt)

<details>
<summary>Correction</summary>

**Algo A** :

$$S=0 \Rightarrow \Theta(1),\quad \text{boucle externe } (i=n;i>1;i=i/2) \Rightarrow \Theta(\log n),\quad \text{boucle interne (sur } j) \Rightarrow \Theta(n)\ \text{car } n + \tfrac{n}{2} + \tfrac{n}{4} + \cdots + 1 = \sum_{k=0}^{\log(n)} 2^k = \Theta(n)$$

$$T(n) = \Theta(1) + \Theta(\log n) + \Theta(n) = \Theta(n)$$

**Algo B** :

$S=n \Rightarrow \Theta(1)$. Boucle `while (S>0)` $\Rightarrow \Theta(\log n)$ au mieux, si à chaque itération $S$ est pair, le nombre total de passages dans la boucle `while` est $\log(n)$. Au pire des cas, chaque nombre pair est précédé par un nombre impair, donc le nombre total de passages est $2\log(n) = \Theta(\log n)$.

$$T(n) = \Theta(\log n)$$

Exemples de déroulement : $S=11 \to 10 \to 5 \to 4 \to 2 \to 1 \to 0$ ; $S=9 \to 4 \to 2 \to 1 \to 0$ ; $S=15 \to 14 \to 7 \to 6 \to 3 \to 2 \to 1 \to 0$ — au pire des cas, on peut avoir un nombre égal d'itérations paires et impaires, soit $2\log(n) = \Theta(\log n)$.

**Algo C** :

$$i=n,\ j=1 \Rightarrow \Theta(1)$$

`while (i>j) { i=i-1 ; j=2*j ; }` $\Rightarrow \Theta(\log n)$ : le pas pour le compteur $i$ étant beaucoup plus long que pour le compteur $j$, le pire cas arrive quand $j$ atteint $n$ avant que $i$ ne dépasse $j$ (l'arrêt de la boucle). Dans ce cas, le nombre de passages est $\Theta(\log n)$.

**2. Recherche dichotomique dans un intervalle $[a,b]$** :

```
int find(int a, int b, Array of int A, int s, int f)
si (s == f) alors                                             // cas d'arrêt, Θ(1)
    si (A[s] > a et A[s] ≤ b) alors
        retourner (A[s]) ;
    sinon
        retourner (NULL)
    Fsi
sinon
    m ← (s+f)/2                                                // Θ(1)
    si (A[m] > a et A[m] ≤ b) alors                            // Θ(1), un seul passage
        retourner (A[m]) ;
    sinon
        si A[m] < a alors
            retourner (find(a,b,A,m+1,f))                      // T(n/2)
        sinon
            retourner (find(a,b,A,s,m-1))                      // T(n/2)
        Fsi
    Fsi
Fsi
```

**b. Complexité** : $T(n) = T(n/2) + c$. Méthode générale ($a=1,b=2,k=0 \Rightarrow a=b^k$) : $T(n) = \Theta(\log(n))$.

</details>

## Exercice 3 (10 pts)

**Définition 1 : le problème NAE-$k$-SAT**

- Donnée : un ensemble de variables $P = \{x_1,\ldots,x_n\}$ et un ensemble de $m$ clauses $A_i = l_{i,1} \vee \cdots \vee l_{i,k}$ où, pour tout $i,j$, $l_{i,j}$ est soit $x_p$ soit $\neg x_p$ pour l'un des $x_p$ de $P$.
- Problème : existe-t-il une interprétation $I$ des variables $x_p$ de $P$, telle que chaque clause contienne au moins un littéral vrai et au moins un littéral faux (c'est-à-dire, pour tout $i$, il y a un $j_1$ et un $j_2$ avec $[l_{i,j_1}]_I=1$ et $[l_{i,j_2}]_I=0$) ?

**Théorème** : le problème NAE-$k$-SAT est NP-Complet $\forall k \geq 3$.

1. Soient les instances suivantes, vérifier s'il s'agit d'instances positives ou négatives de NAE-3-SAT (1 pt) :
   a. $P_1 = \{x_1,x_2\}$ et $F_1 = (x_1 \vee x_1 \vee \neg x_2) \wedge (\neg x_1 \vee \neg x_1 \vee x_2) \wedge (\neg x_1 \vee x_2 \vee \neg x_2)$
   b. $P_2 = \{x_1,x_2,x_3\}$ et $F_2 = (x_1 \vee x_2 \vee \neg x_3) \wedge (\neg x_1 \vee x_3 \vee x_2) \wedge (\neg x_1 \vee x_2 \vee \neg x_2)$
2. Soient les instances suivantes, vérifier s'il s'agit d'instances positives ou négatives de NAE-4-SAT (1 pt) :
   a. $P_3 = \{x_1,x_2,x_3\}$ et $F_3 = (\neg x_1 \vee x_1 \vee \neg x_2 \vee \neg x_3) \wedge (x_1 \vee x_2 \vee x_2 \vee x_3) \wedge (\neg x_1 \vee x_2 \vee \neg x_2 \vee \neg x_3) \wedge (x_1 \vee \neg x_2 \vee \neg x_2 \vee x_3)$
   b. $P_4 = \{x_1,x_2,x_3,x_4\}$ et $F_4 = (x_1 \vee x_2 \vee \neg x_3 \vee \neg x_4) \wedge (\neg x_1 \vee x_3 \vee x_2 \vee x_3) \wedge (\neg x_1 \vee x_2 \vee \neg x_2 \vee x_4)$
3. Trouver une transformation polynomiale de NAE-4-SAT vers NAE-3-SAT. (3 pts)

**Définition 2 : le problème de COUPURE MAXIMALE**

- Donnée : un graphe $G=(V,E)$ non-orienté et un entier $k$.
- Problème : existe-t-il une partition $V = V_1 \cup V_2$ telle que le nombre d'arêtes entre $V_1$ et $V_2$ soit au moins $k$ ?

*Exemple : $G=(V,E)$ et $k=5$, solution $V_1=\{1,3,5\}$, $V_2=\{2,4\}$.*

4. Montrer que le problème COUPURE MAXIMALE est NP-Complet (sachant que NAE-3-SAT est NP-Complet). (5 pts)

**Indications** :

- Considérer une formule $F \in$ NAE-3-SAT telle que $\forall A_i$ et $A_j$ deux clauses distinctes ($i \neq j$) de $F$, elles ont au plus une variable en commun. I.e. si par exemple on a deux clauses de la forme $A_i = (u \vee v \vee w)$ et $A_j = (u \vee v \vee z)$, alors on les transforme en $(u \vee t_1 \vee t_2) \wedge (u \vee w \vee \neg t_1) \wedge (u \vee z \vee \neg t_2)$.
- Toute variable $x_i \in P$ correspond à 2 sommets $x_i$ et $\neg x_i$.
- Créer une arête entre $x_i$ et $\neg x_i$.
- À chaque clause correspond un triangle.
- $k = 2m+n$ où $m$ est le nombre de clauses, et $n$ est le nombre de variables propositionnelles ($n=|P|$).

<details>
<summary>Correction</summary>

**1.a)** $F_1 \notin$ NAE-3-SAT car pour toute affectation testée ($x_1{=}F,x_2{=}F$ / $x_1{=}F,x_2{=}V$ / $x_1{=}V,x_2{=}F$ / $x_1{=}V,x_2{=}V$), l'une des clauses $C_1$, $C_2$ ou $C_3$ ne vérifie pas la condition NAE.

**1.b)** $F_2 \in$ NAE-3-SAT, car $x_1=x_2=x_3=F$ vérifie les conditions (une seule affectation testée suffit à l'établir).

**2.a)** $F_3 \notin$ NAE-4-SAT : pour toutes les affectations testées ($x_1,x_2,x_3 \in \{F,V\}^3$), au moins une clause ($C_1$, $C_2$, $C_3$ ou $C_4$) n'est pas satisfaisable au sens NAE.

**2.b)** $F_4 \in$ NAE-4-SAT car $x_1=x_2=x_3=x_4=V$ vérifie les contraintes.

**3.** NAE-4-SAT $\leq_P$ NAE-3-SAT :

Soit $\phi \in$ CNF avec clauses de longueur 4. Pour chaque clause de $\phi$ à 4 littéraux $l_1 \vee l_2 \vee l_3 \vee l_4$, on obtient 2 clauses à 3 littéraux dans $\phi'$ en introduisant une variable auxiliaire $y_i$ : $\phi = (l_1 \vee l_2 \vee l_3 \vee l_4) \to \phi' = (l_1 \vee l_2 \vee y_1) \wedge (l_3 \vee l_4 \vee \neg y_1)$, avec $n+1$ variables de décision et $2m$ clauses. Cette transformation est en temps polynomial ($n$ = nombre de variables, $m$ = nombre de clauses).

- $\phi \in$ NAE-4-SAT $\Rightarrow \phi' \in$ NAE-3-SAT : si $\phi \in$ NAE-4-SAT alors un littéral est vrai et un autre est faux par clause. Deux cas de figure sont possibles : soit les 2 littéraux se retrouvent dans la même clause (auquel cas cette clause de $\phi'$ est déjà valide et il suffit de choisir la bonne affectation pour $y_1$), soit ils sont dans des clauses différentes (dans ce cas, on donne à la variable auxiliaire $y_1$ la valeur faux dans la clause contenant le littéral vrai) $\Rightarrow \phi' \in$ NAE-3-SAT. *Le principe étant clair, on n'a pas besoin d'écrire l'algorithme dans le certificat.*
- $\phi' \in$ NAE-3-SAT $\Rightarrow \phi \in$ NAE-4-SAT : il suffit de « développer » $\phi'$ pour retrouver $\phi$.

**4.** COUPURE MAXIMALE $\in$ NP-Complet :

- COUPURE MAXIMALE $\in$ NP,
- NAE-3-SAT $\leq_P$ COUPURE MAXIMALE.

**COUPURE MAXIMALE $\in$ NP** — certificat : choix aléatoire d'une partition de $V$ en 2 ensembles $V_1$ et $V_2$ (choisir aléatoirement un nombre $m < n$, choisir aléatoirement $m$ sommets du graphe et les ajouter à $V_1$, ajouter les sommets restants à $V_2$ — $\Theta(n)$). Vérification :

```
S = 0
Pour (vi ∈ V1) faire
    Pour (vj ∈ V2) faire
        si (vi,vj) ∈ E alors           // Θ(m²)
            S = S+1
        finsi
    Fin pour
Fin pour
si (S ≥ k) alors
    retourner (Vrai)
sinon
    retourner (Faux)
fsi
```

**NAE-3-SAT $\leq_P$ COUPURE MAXIMALE** — montrer que $\phi \in$ CNF avec clauses de longueur 3 $\longrightarrow \langle G,k \rangle$ :

Sans perte de généralité, on peut considérer une formule qui ne contient uniquement que des clauses qui ont au plus une variable en commun et qui ne contiennent pas une variable et sa variable complémentaire. Exemple : $\phi = (x_1 \vee x_2 \vee \neg x_3) \wedge (\neg x_1 \vee x_2 \vee x_3)$.

Construction de $G$ : pour chaque clause, un triangle. Toute variable $x_i \in P$ correspond à 2 sommets $x_i$ et $\neg x_i$, reliés par une arête. Le nombre total d'arêtes est $3m+n$ ($m$ triangles à 3 arêtes chacun, plus $n$ arêtes de variable/négation). $k = 2m+n$, nombre d'arêtes pour la coupure, en temps polynomial ($n$ : nombre de variables, $m$ : nombre de clauses) $\to G(2n, n+3m)$.

- $\phi \in$ NAE-3-SAT $\Rightarrow \langle G,k \rangle \in$ COUPURE MAXIMALE : dans chaque clause, il existe un littéral évalué à vrai et un autre évalué à faux. Dans $G$, on considère $V_1$ l'ensemble des sommets évalués à vrai et $V_2$ l'ensemble des sommets évalués à faux. $V_1$ et $V_2$ sont séparés par $2m+n$ arêtes : en effet, $x_i$ et $\neg x_i$ n'appartiennent pas au même ensemble ($n$ arêtes) ; de plus, dans chaque clause, on a soit 2 variables vraies et une fausse, soit 2 fausses et une vraie ; dans chaque triangle, 2 sommets appartiennent à un ensemble et le troisième appartient à l'autre, donc ils sont séparés par 2 arêtes par clause ($2m$ arêtes restantes).
- $\langle G,k \rangle \in$ COUPURE MAXIMALE $\Rightarrow \phi \in$ NAE-3-SAT : toute coupure de $G$ a au plus $2m+n$ arêtes, car une coupure ne peut contenir que 2 arêtes au plus par triangle, ce qui correspond à une clause. Par conséquent, une coupure de valeur $2m+n$ fournit immédiatement une affectation NAE-3-SAT valide.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/complexite-ds-2014-2015.pdf" />

</TabItem>
</Tabs>
