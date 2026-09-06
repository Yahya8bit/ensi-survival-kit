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

_Conception et analyse d'algorithmes_

Au chapitre précédent, la complexité décrivait le coût d'un algorithme donné.
Ici, la question change : parmi tous les algorithmes possibles, quelle est la
difficulté du problème lui-même ? Les machines de Turing et les réductions
polynomiales fournissent un langage commun pour comparer ces problèmes.

:::info Vous allez apprendre

- distinguer un problème de décision, une instance et l'algorithme qui la traite ;
- définir le temps de calcul d'une machine de Turing déterministe ou non déterministe ;
- reconnaître les classes $P$, $NP$, $NP$-dur et $NP$-complet ;
- utiliser une transformation polynomiale pour comparer deux problèmes ;
- relier les classes de temps aux classes d'espace du support.

:::

## Du coût d'un algorithme à la difficulté d'un problème

Un **problème** pose une question générale. Une **instance** est une donnée
particulière fournie en entrée, de taille $n$ ; lorsqu'elle est représentée par
un mot $x$, on prend $n=|x|$. Un **algorithme** donne une procédure pour
répondre à cette question sur les instances qu'il accepte. La complexité d'un
algorithme mesure les ressources consommées par cette procédure; la complexité
d'un problème compare ce qui reste possible quand on choisit le meilleur
algorithme connu dans un modèle de calcul fixé.

Le support se limite d'abord aux problèmes décidables : une solution
algorithmique existe. Il reste à savoir si elle utilise une quantité de temps
ou d'espace raisonnable.

:::info Repères pour l'analyse en temps

La complexité est étudiée en fonction de la taille $n$ des données lorsque
$n \to \infty$, à un facteur constant près et, dans ce chapitre, au pire cas.
La machine utilisée ne change l'estimation qu'à une constante près. Les
valeurs des données déterminent les cas meilleur, moyen et pire, tandis que
leur taille est le paramètre principal.

Pour un entier positif $N$ encodé en binaire, cette taille est
$\lfloor \log_2 N \rfloor + 1$, et non la valeur $N$. Cette dernière ne sert
de taille que sous une convention explicite, comme l'encodage unaire.

:::

Le tableau du support donne un ordre de grandeur parlant pour le temps
d'exécution estimé en secondes.

| Taille des données | $O(\log n)$         | $O(n)$    | $O(n^2)$   | $O(2^n)$          |
| ------------------ | ------------------- | --------- | ---------- | ----------------- |
| 10                 | $3 \times 10^{-6}$  | $10^{-5}$ | $10^{-4}$  | $10^{-3}$         |
| 100                | $7 \times 10^{-6}$  | $10^{-4}$ | $10^{-2}$  | $10^{14}$ siècles |
| 1 000              | $10^{-5}$           | $10^{-3}$ | 1 sec      | astronomique      |
| 10 000             | $13 \times 10^{-6}$ | $10^{-2}$ | 1,7 min    | ...               |
| 100 000            | $17 \times 10^{-6}$ | $10^{-1}$ | 2,8 heures | ...               |

Pour comparer des problèmes sans dépendre d'un langage de programmation, le
support utilise maintenant les machines de Turing.

## Mesurer le temps sur une machine de Turing

### Machine déterministe

:::info Définition

Soit $M$ une machine de Turing déterministe. Sa complexité en temps est la
fonction :

$$
T_M(n) = \max\{m \mid x \in \Sigma^*,\ |x| = n,\ M
\text{ s'exécute sur } x \text{ en } m \text{ étapes}\}.
$$

:::

Cette borne prend donc l'instance de taille $n$ qui demande le plus grand
nombre d'étapes à $M$.

### Machine non déterministe

:::info Définition

Pour une machine de Turing non déterministe $M$ et un mot $w$, le temps de
calcul $TC_M(w)$ est :

- la longueur de la plus courte exécution qui accepte $w$ si $w \in L(M)$ ;
- $1$ sinon.

La complexité en temps de $M$ est alors :

$$
T_M(n) = \max\{m \mid x \in \Sigma^*,\ |x| = n,\ m = TC_M(x)\}.
$$

:::

:::info Définition : notation asymptotique $O$

Une fonction $g(n)$ est en $O(f(n))$, noté $g = O(f)$, s'il existe des
constantes $c$ et $n_0$ telles que, pour tout $n > n_0$ :

$$
0 \leq g(n) \leq c \cdot f(n).
$$

:::

:::note Proposition

Si la fonction $f$ est calculée par une machine de Turing non déterministe
$M$ avec la complexité $T_M(n)$, alors il existe une machine de Turing non
déterministe calculant $f$ avec la complexité $O(C \cdot T_M(n))$, où $C$ est
une constante.

:::

Le support utilise ensuite les fonctions polynomiales comme frontière de
classification, ce qui mène directement aux classes $P$ et $NP$.

## Calcul polynomial et classes $P$ et $NP$

:::info Définition

Une machine de Turing $M$ est polynomiale en temps s'il existe un polynôme
$p(n)$ tel que :

$$
T_M(n) \leq p(n) \qquad \text{pour tout } n \geq 0.
$$

:::

:::info Définition : classe $P$

La classe $P$ est la classe des langages décidés par une machine de Turing
déterministe polynomiale.

:::

:::info Définition : classe $NP$

La classe $NP$ est la classe des langages acceptés par une machine de Turing
non déterministe polynomiale.

:::

:::note Théorème

Soit $L \in NP$. Il existe une machine de Turing déterministe $M$ et un
polynôme $p(n)$ tels que $M$ décide $L$ avec la complexité :

$$
T_M(n) = O\left(2^{p(n)}\right).
$$

:::

:::tip Exercice

Pour le langage $L = \{a^n b^n,\ n \geq 0\}$, écrire une machine de Turing et
calculer son nombre de déplacements afin d'estimer $T_M(n)$.

:::

## Problèmes de décision

Pour passer d'une notion de calcul à une comparaison de problèmes, on formule
la question avec une réponse booléenne.

:::info Définition

Un problème est un **problème de décision** si, pour toute entrée, son unique
sortie possible est booléenne.

La plupart des problèmes d'optimisation peuvent être convertis en problèmes de
décision en ajoutant une borne $k$ :

- « existe-t-il une solution de valeur au plus $k$ ? » pour une minimisation ;
- « existe-t-il une solution de valeur au moins $k$ ? » pour une maximisation.

:::

:::tip Exemple : voyageur de commerce

Étant donné un ensemble de villes
$V = \{v_1, \ldots, v_m\}$, une fonction de distance $d(v_i, v_j)$ et un
nombre $k$, la version décisionnelle demande s'il existe un tour de toutes les
villes de longueur au plus $k$.

:::

Un circuit hamiltonien est aussi formulé comme une question d'existence : pour
un graphe donné, existe-t-il un parcours fermé qui passe une seule fois par
tous les sommets ? Cette forme binaire permet de relier les problèmes entre
eux.

## Transformations polynomiales

Une réduction ne donne pas nécessairement la réponse au problème de départ.
Elle transforme ses instances en instances d'un autre problème, sans changer
la réponse oui/non, et suffisamment vite pour préserver la comparaison de
complexité.

:::info Définition

Soient $L_1 \subseteq \Sigma_1^*$ et $L_2 \subseteq \Sigma_2^*$. Une
transformation polynomiale de $L_1$ vers $L_2$, notée $L_1 \alpha L_2$, est une
fonction $f : \Sigma_1^* \to \Sigma_2^*$ telle que :

1. $f$ est calculable en temps polynomial ;
2. $f(x) \in L_2$ si et seulement si $x \in L_1$.

Le support appelle aussi cette transformation une projection ou une réduction.

:::

:::note Lemmes

Si $L_1 \alpha L_2$, alors :

1. si $L_2 \in P$, alors $L_1 \in P$ ;
2. si $L_1 \notin P$, alors $L_2 \notin P$.

La transformation est transitive : si $L_1 \alpha L_2$ et $L_2 \alpha L_3$,
alors $L_1 \alpha L_3$.

:::

<details>
  <summary>Démonstration</summary>

Si $L_2 \in P$, on calcule d'abord $f(x)$ en temps polynomial, puis on décide
$f(x)$ avec l'algorithme polynomial de $L_2$. La composition reste
polynomiale; comme $f(x) \in L_2$ si et seulement si $x \in L_1$, elle décide
$L_1$. La seconde propriété est sa contraposée.

Pour la transitivité, la transformation de $L_1$ vers $L_3$ est la composition
des transformations de $L_1$ vers $L_2$ et de $L_2$ vers $L_3$. La composition
de deux calculs polynomiaux est polynomiale et conserve l'équivalence des
réponses.

</details>

:::info Définition : équivalence polynomiale

Deux langages $L_1$ et $L_2$ sont équivalents polynomialement, noté
$L_1 \equiv_P L_2$, si et seulement si $L_1 \alpha L_2$ et $L_2 \alpha L_1$.

Une classe d'équivalence polynomiale $C_1$ est inférieure à une classe
d'équivalence $C_2$, notée $C_1 \preceq_p C_2$, lorsque tout langage de $C_1$
se transforme polynomialement vers tout langage de $C_2$.

:::

:::note Propriétés

La classe $P$ est une classe d'équivalence polynomiale. Pour tout $L_1 \in P$
et tout $L_2 \in NP$, le support énonce $L_1 \alpha L_2$; ainsi
$P \preceq_p c$ pour toute classe d'équivalence $c$ de $NP$.

:::

:::tip Exemple : $CH \alpha TSP$

Pour une instance $G = (S, A)$ de circuit hamiltonien, la transformation
produit le graphe complet pondéré $G' = (V, E)$ avec :

$$
V = S, \qquad
d(v_i, v_j) =
\begin{cases}
1 & \text{si } (v_i, v_j) \in A, \\
2 & \text{sinon},
\end{cases}
\qquad b = |V| = n.
$$

Le support demande de montrer que $f(x) \in TSP$ si et seulement si
$x \in CH$, puis d'estimer le temps de cette transformation.

:::

## Dureté et complétude

Les réductions servent maintenant à exprimer qu'un problème concentre la
difficulté d'une classe entière.

:::info Définition : $NP$-dur

Un langage $L$ est $NP$-dur s'il existe $L' \in NPC$ tel que $L' \alpha L$.

Le support cite comme exemple le problème d'équivalence d'automates à états
finis non déterministes.

:::

:::info Définition : $NP$-complet

Un langage $L$ est $NP$-complet, noté $NPC$, si :

1. $L \in NP$ ;
2. pour tout $L' \in NP$, on a $L' \alpha L$.

Le support donne aussi la caractérisation équivalente : il existe
$L' \in NPC$ tel que $L' \alpha L$.

:::

:::note Théorème de Cook

$$
SAT \in NPC.
$$

:::

Le théorème introduit SAT comme point de départ des réductions vers de nombreux
problèmes de décision.

<details>
  <summary>Démonstration</summary>

Le support détaille l'appartenance de $SAT$ à $NP$ : choisir une interprétation
$I$ de manière non déterministe, puis vérifier que

$$
[A_i]_I = V \qquad \text{pour tout } 1 \leq i \leq m.
$$

Pour $n$ variables, $m$ clauses et au plus $k$ littéraux par clause, il pose
$p = \max(n,m,k)$ et donne un coût $O(p^3)$, donc polynomial. Le second point
du théorème est la réduction de tout $L' \in NP$ vers $SAT$.

</details>

## SAT et problèmes de référence

### Satisfiabilité booléenne

:::info Définition

SAT demande si une formule propositionnelle $F = F(a,b,c,d)$ possède une
affectation qui lui donne la valeur $\top$. Les valeurs booléennes sont
$\top$ et $\bot$. Une formule sans telle affectation est insatisfiable.

Pour une formule en forme normale conjonctive :

$$
F = C_1 \wedge C_2 \wedge \cdots \wedge C_k,
$$

chaque clause $C_i$ est une disjonction de littéraux
$l_1 \vee l_2 \vee \cdots \vee l_p$, et chaque littéral est une variable
propositionnelle ou sa négation.

:::

:::tip Exemple

Le support considère :

$$
F = (a \vee \neg c \vee d) \wedge (\neg a \vee \neg b)
\wedge (\neg a \vee \neg c) \wedge (b \vee \neg d)
\wedge (b \vee c \vee d).
$$

L'interprétation $I = \{a=\text{faux}, b=\text{vrai}, c=\text{vrai},
d=\text{vrai}\}$ rend chaque clause vraie. C'est donc un modèle de $F$, et
$F$ est cohérente.

:::

Une instance de SAT est une formule; un certificat peut être une affectation.
Pour

$$
I = (a \vee b \vee c) \wedge (\neg a \vee b) \wedge \neg c,
$$

le support donne le certificat
$S = \{a=\text{Vrai}, b=\text{Vrai}, c=\text{Faux}\}$.

### 3-SAT

:::info Définition

Une formule en 3-CNF s'écrit :

$$
F = C_1 \wedge C_2 \wedge \cdots \wedge C_k,
$$

avec $k$ clauses contenant chacune trois littéraux distincts. La question est
de savoir s'il existe une interprétation $I$ telle que :

$$
[A_i]_I = V \qquad \text{pour tout } 1 \leq i \leq n.
$$

:::

### Quelques problèmes de graphes

Le support présente plusieurs problèmes de décision qui serviront aux
réductions.

- **Circuit hamiltonien (CH)** : pour $G = (S,A)$ avec $|S|=n$, existe-t-il un
  parcours fermé qui passe une seule fois par tous les sommets ?
- **Voyageur de commerce (TS)** : pour un graphe complet pondéré et une borne
  $b$, existe-t-il un parcours fermé visitant chaque ville une seule fois, de
  longueur au plus $b$ ?
- **Clique** : pour $G = (S,A)$ et $k \leq |S|$, $G$ contient-il une clique de
  taille au moins $k$ ?
- **Couverture par sommets** : existe-t-il $S' \subseteq S$ de taille au plus
  $k$ tel que toute arête de $A$ ait une extrémité dans $S'$ ?
- **Coloration** : pour $G = (S,A)$ et $k \leq |S|$, existe-t-il une coloration
  des sommets avec $k$ couleurs où deux sommets adjacents ont des couleurs
  différentes ?
- **Plus long cycle (PLC)** : pour $G = (S,A)$ et $k$, le graphe possède-t-il
  un cycle de longueur au moins $k$ ?
- **Somme de sous-ensemble** : pour $S \subseteq \mathbb{N}$ et
  $t \in \mathbb{N}$, existe-t-il $S' \subseteq S$ tel que
  $\sum_{s' \in S'} s' = t$ ?

:::warning

Le sens d'une réduction compte : $L_1 \alpha L_2$ montre que résoudre $L_2$
permet de résoudre $L_1$. Il ne permet pas de conclure que les deux problèmes
ont la même difficulté sans une réduction dans l'autre sens.

:::

## Exercices de réductions

Les exercices suivants sont le lieu où l'on utilise la définition complète
d'une transformation : construire $f$, montrer qu'elle est polynomiale, puis
établir l'équivalence des réponses.

### Circuits hamiltoniens et voyageur de commerce

:::tip Exercice

Prouver :

$$
TSP \alpha CH \qquad \text{et} \qquad CH \alpha TSP.
$$

:::

### Clique et couverture par sommets

:::tip Exercice

Prouver :

$$
Clique \alpha \text{Couverture par sommets}.
$$

:::

### De 3-SAT à la couverture par sommets

:::tip Exercice

Prouver :

$$
3SAT \alpha \text{Couverture par sommets}.
$$

Le support indique la construction suivante : associer deux sommets à toute
variable, un triangle étiqueté par les trois littéraux à toute clause, puis
utiliser le fait qu'une arête est couverte par un sommet et un triangle par
deux sommets. Pour $n$ variables et $m$ clauses, le graphe a
$2n + 3m$ sommets et la taille indiquée de la couverture est :

$$
k = 2m + n.
$$

:::

### De SAT à 3-SAT

:::tip Exercice

Prouver que $3SAT \in NPC$, sachant que $SAT \in NPC$.

:::

<details>
  <summary>Démonstration</summary>

Le support commence par remarquer que $3SAT$ est un cas particulier de $SAT$,
donc $3SAT \in NP$. Il transforme ensuite chaque clause $A_i$ de SAT en clauses
à trois littéraux.

Pour $k_i = 3$, on garde $A'_i = A_i$. Pour une clause de deux littéraux :

$$
A_i = x_1 \vee x_2
\quad \Longrightarrow \quad
A'_i = (x_1 \vee x_2 \vee y_1)
\wedge (x_1 \vee x_2 \vee \neg y_1).
$$

Pour une clause d'un littéral :

$$
\begin{aligned}
A_i = x_1 \quad \Longrightarrow \quad A'_i ={}&
(x_1 \vee y_1 \vee y_2) \wedge (x_1 \vee y_1 \vee \neg y_2) \\
&\wedge (x_1 \vee \neg y_1 \vee y_2)
\wedge (x_1 \vee \neg y_1 \vee \neg y_2).
\end{aligned}
$$

Pour $k_i > 3$ et $A_i = (x_1 \vee \cdots \vee x_p)$, le support construit :

$$
\begin{aligned}
&(x_1 \vee x_2 \vee y_1) \wedge (\neg y_1 \vee x_3 \vee y_2)
\wedge (\neg y_2 \vee x_4 \vee y_3) \wedge \cdots \\
&\qquad \wedge (\neg y_{p-3} \vee x_{p-1} \vee x_p).
\end{aligned}
$$

Cette construction introduit $p-3$ nouvelles variables et $p-2$ clauses de
trois littéraux. Il reste à établir que la formule initiale est satisfiable si
et seulement si la formule obtenue l'est, et que $f$ est polynomiale.

</details>

:::tip Exercices complémentaires

- Prouver que la couverture par sommets est dans $NPC$ à partir de
  $3SAT \in NPC$.
- Prouver que $TS \in NP$, $Clique \in NP$ et $HC \in NP$.

:::

## Complexité en espace

Le temps n'est pas la seule ressource. Le support termine en comptant les
cases visitées par une machine de Turing offline.

:::info Définition

Soit $M$ une machine de Turing offline déterministe. Sa complexité en espace
est :

$$
E_M(n) = \max\{m \mid |x| = n,\ m \text{ est le nombre de cases visitées lors
de l'exécution de } M \text{ sur } x\}.
$$

:::

:::info Définition

Pour une machine de Turing offline déterministe $M$, l'espace de calcul sur un
mot $w$ est donné par le nombre de cases visitées pour la plus courte exécution
de $M$ sur $w$ qui accepte $w$.

Pour une machine de Turing offline non déterministe $M$ :

$$
E_M(n) = \max\{EC_N(x) \mid |x| = n\}.
$$

:::

:::info Définition

Une machine de Turing $M$ est polynomiale en espace s'il existe un polynôme
$P(n)$ tel que :

$$
E_M(n) \leq P(n) \qquad \text{pour tout } n.
$$

La classe $PSPACE$ (notée « P-space » dans le support) est celle des langages
décidés par une machine de Turing déterministe polynomiale en espace. La classe
$NPSPACE$ (notée « NP-space » dans le support) est celle des langages acceptés
par une machine de Turing non déterministe polynomiale en espace.

:::

:::note Théorème

$$
PSPACE = NPSPACE
\qquad \text{et} \qquad
P \subseteq NP \subseteq PSPACE.
$$

:::

:::note Précision sur le support

Les inclusions ci-dessus sont établies, mais le PDF suggère une inclusion
stricte vers l'espace polynomial. On ne sait pas actuellement si $P=NP$ ni si
$NP=PSPACE$ ; ces séparations ne doivent donc pas être présentées comme
démontrées. L'égalité $PSPACE=NPSPACE$ est établie par le théorème de Savitch.

:::

<details>
  <summary>Démonstration</summary>

Pour $L \in NPSPACE$, le support considère une machine de Turing
déterministe $M'$ qui reconnaît $L$ et écrit :

$$
E_{M'}(n) \leq 3p(n) = p'(n).
$$

Il en déduit $L \in PSPACE$, donc
$NPSPACE \subseteq PSPACE$. L'inclusion réciproque donne :

$$
PSPACE = NPSPACE.
$$

Enfin, si $L \in NP$, il existe une machine de Turing non déterministe
polynomiale en temps telle que :

$$
E_M(n) \leq T_M(n) \leq P(n).
$$

Le support conclut alors que $L \in NPSPACE = PSPACE$.

</details>

:::tip Exercice

Étant donné $3SAT \in NPC$, montrer que $Clique \in NPC$.

:::

## Étapes suivantes

- [Complexité des algorithmes](./complexite-ch1-complexite-algorithmes) pose les
  outils de comptage utilisés pour analyser un algorithme donné.
- [Diviser pour régner](./complexite-ch3-1-diviser-pour-regner) applique les
  récurrences à une stratégie algorithmique concrète.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/complexite-ch2-complexite-problemes.pdf" />

</TabItem>
</Tabs>
