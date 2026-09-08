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

# Chapitre 3 : Paradigmes de programmation — 3.2 Algorithmes gloutons

_Conception et analyse d'algorithmes — 30/12/2020_

Une stratégie gloutonne avance par décisions irrévocables : elle choisit à
chaque étape le candidat qui paraît le meilleur localement, puis poursuit sur
le problème restant. Cette simplicité peut produire une solution optimale,
mais seulement lorsqu'un argument de correction le justifie.

:::info Vous allez apprendre

- ce qui caractérise une stratégie gloutonne et son coût général ;
- comment une règle de sélection s'applique au problème du sac à dos ;
- pourquoi une intuition locale ne suffit pas à établir l'optimalité ;
- des applications au voyageur de commerce, à l'ordonnancement, au rendu de
  monnaie et aux arbres recouvrants minimaux.
  :::

## Principe de la stratégie gloutonne

:::info Définition

Un algorithme glouton résout un problème d'optimisation en construisant une
solution pas à pas. À chaque décision, il retient le choix qui semble
localement le meilleur, sans revenir sur une décision précédente.
:::

La stratégie part d'une solution vide. À chaque itération, elle sélectionne
un candidat, vérifie que son ajout est réalisable, puis le conserve ou le
rejette définitivement. L'espoir d'obtenir un optimum global n'est pas une
preuve : selon le problème, la même mécanique peut fournir une solution exacte
ou seulement une heuristique.

<details>
<summary>Pseudocode complet</summary>

```text title="Schéma glouton général"
Glouton(A, n)
Début
    Trier A selon le critère de sélection glouton
    S ← ∅
    Pour i = 1 jusqu'à n faire
        x ← SELECTION(A)
        Si REALISABLE(S, x) alors
            S ← S ∪ {x}
        Fin Si
    Fin Pour
Fin
```

</details>

Dans ce schéma, $SELECTION(A)$ coûte $O(f(n))$ et
$REALISABLE(S, x)$ coûte $O(g(n))$. Le support donne donc :

$$T(n) = O(n\log n + n f(n) + n g(n)).$$

Cette expression sépare le tri initial de la règle de sélection et du test de
faisabilité. Les applications suivantes changent précisément ces deux derniers
éléments.

## Sac à dos : une règle locale à examiner

Le problème du sac à dos à variables binaires consiste à choisir, parmi $n$
objets, un sous-ensemble qui maximise le gain sans dépasser une capacité
donnée. Chaque objet $i$ possède un gain $c_i$ et un poids $w_i$ :

$$
\max \sum_{i=1}^{n} c_i x_i
\quad \text{t.q.} \quad
\sum_{i=1}^{n} w_i x_i \leq c,
\quad x_i \in \{0,1\},
\quad i \in \{1,\ldots,n\}.
$$

Une heuristique gloutonne trie les objets selon un critère, par exemple le
gain, le poids ou le rapport gain/poids, puis ajoute un objet tant que la
capacité le permet. Le problème binaire est présenté dans le support comme un
problème d'optimisation combinatoire NP-complet : cette heuristique ne devient
pas exacte parce que son critère semble naturel.

### Variante « tout ou rien »

:::tip Exemple

Pour la capacité $c_{max}=16$ kg, le support donne les objets suivants :

| Objet | 1   | 2   | 3   | 4   | 5   |
| ----- | --- | --- | --- | --- | --- |
| $c_i$ | 3   | 10  | 3   | 7   | 6   |
| $w_i$ | 2   | 6   | 5   | 8   | 3   |

Le tri décroissant par gain produit une solution de gain $20$ D et de poids
$16$ kg. Le tri décroissant par rapport $c_i/w_i$ produit ici une solution de
gain $22$ D et de poids $16$ kg.
:::

Les deux résultats proviennent de la même règle de faisabilité, mais de deux
ordres de sélection différents. Ils illustrent l'effet du critère choisi ; ils
ne constituent pas une preuve qu'un de ces critères résout exactement toute
instance binaire.

### Variante fractionnaire

Dans la variante fractionnaire, une fraction d'objet est autorisée :
$x_i \in [0,1]$. Le support utilise les données suivantes pour comparer les
ordres de sélection :

| Objet | 1   | 2   | 3   |
| ----- | --- | --- | --- |
| $c_i$ | 10  | 20  | 30  |
| $w_i$ | 30  | 100 | 120 |

Pour les capacités $50$, $40$ et $30$, le support compare trois ordres :

| Critère de sélection        | $50$ | $40$ | $30$ |
| --------------------------- | ---- | ---- | ---- |
| Objet le plus léger         | 210  | 170  | 130  |
| Objet de plus grande valeur | 220  | 170  | 120  |
| Rapport $c_i/w_i$ maximal   | 220  | 180  | 140  |

La règle retenue trie les objets par rapport $c_i/w_i$ décroissant et remplit
la capacité en autorisant une dernière fraction d'objet.

<details>
<summary>Pseudocode complet</summary>

```text title="Sac à dos fractionnaire - version pédagogique corrigée"
SacADosFractionnaire(A, M)
Pour chaque objet i faire
    rapport[i] ← cᵢ / wᵢ
    xᵢ ← 0
Fin Pour
Trier A par rapport décroissant
capacité_restante ← M

Pour chaque objet i de A faire
    Si wᵢ ≤ capacité_restante alors
        xᵢ ← 1
        capacité_restante ← capacité_restante − wᵢ
    Sinon
        xᵢ ← capacité_restante / wᵢ
        capacité_restante ← 0
        arrêter
    Fin Si
Fin Pour
```

</details>

:::note Précision sur le support

Le pseudocode du support inverse les cas « objet entier » et « fraction »,
puis soustrait le poids entier même après une prise fractionnaire. La version
ci-dessus est une version pédagogique corrigée, et non une transcription
littérale du PDF.

:::

:::warning Portée de la règle

Le tri par rapport $c_i/w_i$ est justifié ici parce que le dernier objet peut
être fractionné : les propriétés énoncées ci-dessous soutiennent alors le choix
glouton. Cette conclusion ne s'étend pas au sac à dos tout ou rien, où
$x_i\in\{0,1\}$.

:::

:::note Propriétés indiquées par le support

Le premier choix glouton est l'objet $A[1]$, de rapport $c_i/w_i$ maximal. Le
support énonce qu'il existe une solution optimale contenant ce choix et que
toute solution optimale contient une sous-structure optimale.
:::

<details>
<summary>Détails des propriétés</summary>

Le support distingue les trois formes suivantes pour une solution optimale :

- $S=(1,1,\ldots,1)$ si $P_{\max} \geq \sum_{i=1}^{n} W[i]$ ;
- $S=(1,1,\ldots,\alpha_k,0,\ldots,0)$ si
  $P_{\max} \geq \sum_{i=1}^{k-1} S[i]\cdot W[i] + \alpha_k\cdot W[k]$,
  avec $0 \leq \alpha_k \leq 1$ ;
- $S=(\alpha_1,0,\ldots,0)$ si $P_{\max}=\alpha_1\cdot W[1]$, avec
  $0 \leq \alpha_1 \leq 1$.

Le support ajoute que, si $S$ est optimale pour $P_{\max}$, alors
$S-\{x_i\}$ est aussi optimale pour $P_{\max}-W[i]$, avec
$C_i=x_i\cdot W[i]$.

</details>

## Autres applications du support

Les mêmes décisions locales réapparaissent dans plusieurs exercices. Leur
objectif change, mais la règle de sélection doit toujours être distinguée du
test qui empêche une solution non réalisable.

### Voyageur de commerce

Pour un graphe complet pondéré, le support demande de trouver un tour de
valeur minimale sans sous-tour. Il présente notamment :

- le **plus proche voisin**, qui choisit à chaque étape la ville non visitée
  la plus proche de la ville courante ;
- une sélection d'arêtes par valeurs croissantes, en refusant les sous-tours
  et les sommets de degré strictement supérieur à $2$ ;
- l'**insertion la moins coûteuse**, qui ajoute un sommet en minimisant le
  détour créé dans un tri-cycle.

Sur l'instance du PDF, les tours obtenus ont respectivement les longueurs
$132$ et $129$ pour les deux premières approches. L'insertion la moins
coûteuse conduit au tour indiqué comme optimal :

$$40+29+15+5+34=123.$$

### Ordonnancement de production

Soient $m$ machines parallèles identiques et $t_j$ le temps de traitement du
job $J_j$, avec $j=1,\ldots,n$. Le but est d'affecter les jobs aux machines en
minimisant le _makespan_.

:::tip Exemple

La règle LPT classe les jobs par $t_j$ décroissant, puis affecte chaque job à
la machine la moins chargée. Sur l'exemple du support, le tri LPT donne un
makespan de $12$, contre $13$ sans tri préalable.
:::

## Limite : rendu de monnaie

Pour rendre un montant $M$, un système de pièces
$P=(p_1 \leq \cdots \leq p_k)$, avec $p_1=1$, cherche à minimiser
$\sum_i n_i$ sous la contrainte :

$$\sum_i n_i p_i=M.$$

Le support suppose un système canonique et décrit la règle suivante : choisir
la plus grande pièce qui ne dépasse pas le montant restant, puis recommencer
jusqu'à obtenir zéro. Pour $M=263$ centimes et
$P=\{200,50,10,5,2,1\}$, elle donne :

$$
\{200\} \to \{200,50\} \to \{200,50,10\} \to
\{200,50,10,2\} \to \{200,50,10,2,1\}.
$$

:::warning Une stratégie naturelle peut échouer

Avec $M=6$ et les pièces $(1,3,4)$, le glouton rend une pièce de $4$ et deux
pièces de $1$, soit $(n_1,n_2,n_3)=(2,0,1)$. La solution optimale est
$(n_1,n_2,n_3)=(0,2,0)$ : deux pièces de $3$. Le choix local de la plus grande
pièce ne garantit donc pas l'optimalité pour tout système monétaire.
:::

Ce contre-exemple explique ce que doit apporter une preuve : elle ne vérifie
pas seulement que l'algorithme rend une solution réalisable, mais qu'aucune
solution meilleure n'existe.

## Arbre recouvrant minimal : Kruskal

:::info Définition

Soit $G=(X,E,W)$ un graphe connexe non orienté valué, avec $|X|=n$,
$|E|=m$ et $W:E\to\mathbb{R}$. Un arbre recouvrant est un sous-graphe
$A=(X,E_A,W)$ connexe et sans cycle, donc $|E_A|=n-1$. Un arbre recouvrant
minimal minimise $\sum_{e\in E_A} w(e)$.
:::

La règle de Kruskal trie les arêtes par valuation croissante et ajoute une
arête seulement si elle ne crée pas de cycle. Le test de cycle est la
condition de faisabilité ; c'est lui qui distingue cette sélection d'un simple
tri des arêtes.

<details>
<summary>Pseudocode complet</summary>

```text title="Kruskal"
Trier(E)                         // ordre croissant des poids
Initialiser(EA)                  // EA contient au plus n - 1 arêtes
k ← 0
i ← 1
Tant que (k < n-1 et i ≤ m) faire
    Si pas de Cycle(EA, E[i]) alors
        EA[k] ← E[i]
        k ← k+1
    Fin Si
    i ← i+1
Fin Tant que
```

</details>

:::note Idée de correction

Le premier choix glouton est l'arête $e=E[1]$ de plus petite valuation. Le
support affirme qu'il existe un arbre recouvrant minimal qui contient $e$,
puis que l'optimalité se conserve dans le sous-problème restant.
:::

<details>
<summary>Démonstration</summary>

**Lemme 1.** Si $A$ est un arbre recouvrant et $e\notin A$, il existe
$e'\in A$ tel que $(A-\{e'\})\cup\{e\}$ soit encore un arbre recouvrant ;
$e'$ peut être choisi dans le cycle formé par les arêtes de $A$ et $e$.

Soit $A^*$ une solution optimale, de poids

$$W^* = \min_A W(A), \qquad W(A)=\sum_{e_i\in A}w(e_i).$$

Si $e\notin A^*$, le lemme fournit $e'\in A^*$ pour lequel
$(A^*-\{e'\})\cup\{e\}$ est un arbre recouvrant. Comme $e$ a la plus
petite valuation, son échange ne peut pas augmenter le poids. L'optimalité de
$A^*$ impose alors que l'arbre échangé soit aussi minimal ; le support conclut
$w(e)=w(e')$.

**Lemme 2.** Si $A$ est un arbre recouvrant de $G=(X,E)$ et
$e=(x,y)\in A$ avec $d(y)=1$, alors $A-\{e\}$ est aussi un arbre pour
$G=(X-\{y\},E_y)$.

Le support utilise ensuite une preuve par l'absurde : si le sous-problème
après retrait de $e$ avait une solution meilleure, la réunir à $e$ produirait
une solution meilleure que $A^*$, contradiction.

</details>

## Exercices

1. **Choix d'activités.** Pour des activités concurrentes $a_i$, caractérisées
   par leur début $d_i$ et leur fin $f_i$, choisir le plus grand ensemble
   d'activités compatibles.
2. **Cavalier d'Euler.** Trouver une suite de déplacements permettant à un
   cavalier de passer une fois par chaque case puis de revenir à la case de
   départ. Une case est un sommet ; une arête a un poids $0$ lorsqu'elle relie
   deux mouvements valides du cavalier, et $\infty$ sinon.

## Étapes suivantes

- [Chapitre 4 — Arbres équilibrés](./complexite-ch4-arbres-equilibres)

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/complexite-ch3-2-glouton.pdf" />

</TabItem>
</Tabs>
