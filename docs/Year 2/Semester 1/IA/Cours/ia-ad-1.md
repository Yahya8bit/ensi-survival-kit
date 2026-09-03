---
sidebar_position: 8
title: "Arbre de Décision : ID3 et CART"
sidebar_label: Arbre de Décision - ID3 et CART
hide_title: true
---

# Arbre de décision — Apprentissage supervisé

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments and several diagrams — the initial "chemin pour chaque donnée d'entraînement" tree, the attribute-selection illustration, and the final ID3 tree for the Quinlan 1986 example — are images not extracted as text) -->

## Présentation générale

- L'arbre de décision est une technique d'apprentissage supervisé actif.
- Il fait partie des méthodes d'apprentissage automatique supervisé qui visent à apprendre des relations entre un ensemble de caractéristiques (variables indépendantes) et une variable cible (variable dépendante) à partir de données d'entraînement.
- L'arbre de décision est principalement utilisé pour deux types de tâches : la classification et la régression.

### Exemple

Type de maladie en fonction des symptômes. Classifier l'instance suivante : `<douleur = gorge, Fièvre = non, toux = oui>`

Un arbre de décision est représenté par une séquence de conditions :

> Rhume = (Douleur = gorge et Fièvre = oui) ou (Douleur = aucune) ou (toux = oui et fièvre = oui)

## Arbre de décision : apprentissage

**Première possibilité** : produire un chemin pour chaque donnée d'entraînement.

| A1 | A2 | A3 | Sortie |
|:-:|:-:|:-:|:-:|
| + | + | + | 1 |
| + | - | + | 0 |
| + | - | - | 0 |

<!-- TODO: unclear in source, verify against original PDF (the corresponding decision-path tree diagram for this table is an image, not extracted as text) -->

### Étapes de construction

- **Étape 1 : sélection de l'attribut de division** — trouver l'attribut qui est le meilleur discriminant sur l'ensemble d'entraînement.
- **Étape 2 : division des données** — un nœud enfant est créé pour chacune des valeurs possibles de l'attribut ; les exemples d'entraînement sont ensuite assignés à leurs nœuds correspondants.
- **Étape 3 : récursivité** — les étapes 1 et 2 sont répétées pour chaque sous-ensemble créé à partir de la division précédente. L'algorithme continue à diviser les données jusqu'à ce qu'un critère d'arrêt soit satisfait.

### Comment choisir le meilleur discriminant ?

Exemple — lequel des deux attributs choisir ?

- `Attr1` : `[39+, 31-]` → `[20+, 15-]` et `[19+, 16-]`
- `Attr2` : `[39+, 31-]` → `[39+, 0-]` et `[0+, 31-]`

## L'algorithme ID3

*Quinlan, J. R., Induction of Decision Trees. Mach. Learn. 1, (Mar. 1986), pp. 81-106*

ID3 (Iterative Dichotomiser 3) :

- Utilise l'entropie comme critère de division pour maximiser l'information.
- Conçu principalement pour la classification (prédiction de classes discrètes).
- Peut gérer des attributs nominaux, mais pas des attributs numériques.

### Principe

Algorithme :

1. Calculer l'entropie de chaque attribut pas encore utilisé.
2. Choisir l'attribut de gain d'information maximal.
3. Créer un nœud test (décision) sur cet attribut et les sous-nœuds correspondants.
4. Récurrence sur les nœuds restants.

### Calcul de l'entropie

Soit $S$ un nœud interne. On partitionne $S$ sur les valeurs de la cible en $m$ groupes : $C_1, ..., C_m$. Soit $p_i$ la probabilité qu'un élément de $S$ se retrouve dans $C_i$ ($p_i \approx |C_i|/|S|$).

$$H(S) = -\sum_{i=1}^{m} p_i \times \log_2(p_i)$$

L'entropie est utilisée pour évaluer la dispersion des données ou la variabilité dans un ensemble de données. Elle permet de quantifier l'impureté d'un ensemble de données.

- $H(S) = 0$ si $S$ est homogène (tous les éléments sont dans la même classe : un $p_i = 1$, le reste à 0).
- $H(S) = \max$ si tous les groupes $C_i$ ont la même taille ($p_1 = \cdots = p_m = 1/m$).

### Calcul du gain d'information

Soit $S$ un nœud interne. On partitionne $S$ sur les valeurs de l'attribut $a$ en $n$ sous-groupes : $S_1, ..., S_n$. Soit $p_i$ la probabilité qu'un élément de $S$ appartienne à $S_i$ ($p_i \approx |S_i|/|S|$).

$$GI(S; a) = H(S) - \sum_{i=1}^{n} p_i \times H(S_i)$$

C'est le gain d'information sur l'attribut $a$.

### Pré-élagage

Les principales conditions d'arrêt couramment utilisées dans l'algorithme ID3 :

1. Tous les exemples dans un nœud sont de la même classe.
2. Aucun attribut restant à diviser.
3. Seuil d'entropie ou de gain d'information minimal.
4. Profondeur maximale de l'arbre.
5. Nombre minimal d'exemples par nœud.

### Exemple (Quinlan 1986)

On calcule par la même procédure tous les gains d'information :

- $GI(S; \text{Humid}) = 0{,}151$
- $GI(S; \text{Vent}) = 0{,}048$
- $GI(S; \text{Pif}) = 0{,}246$
- $GI(S; \text{Temp}) = 0{,}029$

On coupe le nœud racine sur l'attribut « Pif » : le plus grand gain d'information (par rapport à la cible). La procédure continue récursivement sur les sous-nœuds ainsi obtenus, jusqu'à obtenir des nœuds uniformes.

<!-- TODO: unclear in source, verify against original PDF (the final resulting ID3 tree diagram for this example is an image, not extracted as text) -->

### Quelques limites de l'ID3

- Incapacité à gérer les attributs numériques.
- Sensibilité aux données bruitées.
- Impossibilité de gérer les données manquantes.
- Non-optimalité globale.

## L'algorithme CART

Parmi les plus performants et plus répandus. Accepte tout type de variables. Utilise le critère de séparation : **indice de Gini**.

$$IG = 1 - \sum_{i=1}^{n} f_i^2$$

avec $n$ : nombre de classes à prédire, $f_i$ : probabilité d'occurrence des observations de la classe $i$ dans le nœud parent.

Plus l'indice de Gini est bas, plus le nœud est pur. En séparant un nœud en 2 nœuds fils on cherche la plus grande hausse de la pureté. La variable la plus discriminante doit maximiser la formule du gain :

$$\text{Gain} = IG(\text{avant séparation}) - \left[p_1 \times IG(\text{fils}_1) + \dots + p_n \times IG(\text{fils}_n)\right]$$

avec $p_i$ la proportion des observations de fils$_i$ par rapport aux observations du nœud parent.

### Principe

- Les CART utilisent un découpage récursif binaire.
- À chaque nœud de l'arbre, les données restantes sont divisées en deux groupes qui présentent une dissimilitude maximale.
- À chaque nœud, la variable prédictive et les seuils sont choisis pour maximiser la dissimilarité ou minimiser la similarité entre les nœuds (différentes manières statistiques de mesurer la même chose).
- Les seuils sont choisis en fonction des distributions des données d'apprentissage.

### Déroulement de la construction

1. **Étape 1** : rechercher la variable et le seuil qui séparent le mieux la population.
2. **Étape 2** : appliquer la séparation à la population.
3. **Étape 3** : obtenir de nouveaux nœuds.
4. **Étape 4** : répéter jusqu'à génération des feuilles au niveau de chaque branche ou que les conditions d'arrêt sont rencontrées.
5. **Étape 5** : éventuel « élagage » de l'arbre (étape optionnelle pour améliorer la performance de l'arbre).

### Conditions d'arrêt

1. Tous les exemples dans un nœud sont de la même classe (nœud feuille).
2. Aucun attribut restant à diviser.
3. Gain d'information minimal.
4. Profondeur maximale de l'arbre.
5. Nombre minimal d'exemples par nœud.

### Exemple — banque

Une banque dispose des informations suivantes sur un ensemble de clients :

- `M` : moyenne des montants sur le compte client.
- `A` : tranche d'âge du client.
- `E` : valeur oui si le client a un niveau d'études supérieures.
- `I` : classe oui correspond à un client qui effectue une consultation de ses comptes bancaires en utilisant Internet.

La racine peut être `M`, `A` ou `E` ? Indice de Gini avant séparation, au niveau de la racine, sur 8 clients (I=oui : 3 clients, I=non : 5 clients) :

$$IG(\text{avant séparation}) = 1 - \left(\left(\frac{3}{8}\right)^2 + \left(\frac{5}{8}\right)^2\right) = 0{,}46875$$

Il faut étudier le gain pour chaque attribut (`M`, `A` et `E`) et choisir celui qui maximise le gain au niveau de la racine, ou celui qui minimise l'impureté.

#### Gain de la variable M

3 modalités de `M` (faible, moyen, élevé) — il faut chercher le meilleur split parmi :

**1ère possibilité : (faible+moyen, élevé)**
- M=moyen+faible : 6 clients (I=oui : 3, I=non : 3) → $IG_{f1} = 1 - ((3/6)^2 + (3/6)^2) = 0{,}5$
- M=élevé : 2 clients (I=oui : 0, I=non : 2) → $IG_{f2} = 1 - ((0/2)^2 + (2/2)^2) = 0$
- Gain $= 0{,}46875 - ((6/8) \times 0{,}5 + (2/8) \times 0) = 0{,}09$

**2ème possibilité : (faible+élevé, moyen)**
- M=faible+élevé : 5 clients (I=oui : 1, I=non : 4) → $IG_{f1} = 1 - ((1/5)^2 + (4/5)^2) = 0{,}32$
- M=moyen : 3 clients (I=oui : 2, I=non : 1) → $IG_{f2} = 1 - ((1/3)^2 + (2/3)^2) = 0{,}444$
- Gain $= 0{,}46875 - ((5/8) \times 0{,}32 + (3/8) \times 0{,}444) = 0{,}10$

**3ème possibilité : (moyen+élevé, faible)**
- M=moyen+élevé : 5 clients (I=oui : 2, I=non : 3) → $IG_{f1} = 1 - ((2/5)^2 + (3/5)^2) = 0{,}48$
- M=faible : 3 clients (I=oui : 1, I=non : 2) → $IG_{f2} = 1 - ((1/3)^2 + (2/3)^2) = 0{,}444$
- Gain $= 0{,}46875 - ((5/8) \times 0{,}48 + (2/8)^{*} \times 0{,}444) = 0{,}00225$

<!-- TODO: unclear in source, verify against original PDF — the 3rd possibility's gain formula in the source uses "(2/8)" as the weight for IG_f2 even though the faible group has 3 clients (which would give 3/8); transcribed exactly as it appears in the source rather than silently corrected -->

Pour la variable `M`, le meilleur split est la **2ème possibilité** (faible+élevé, moyen), avec un gain de $0{,}10$.

#### Gain de la variable A (tranche d'âge)

3 modalités (jeune, moyen, âgé) :

**1ère possibilité : (jeune+moyen, âgé)**
- A=jeune+moyen : 5 clients (I=oui : 3, I=non : 2) → $IG_{f1} = 1 - ((3/5)^2 + (2/5)^2) = 0{,}48$
- A=âgé : 3 clients (I=oui : 0, I=non : 3) → $IG_{f2} = 1 - ((0/3)^2 + (3/3)^2) = 0$
- Gain $= 0{,}46875 - ((5/8) \times 0{,}48 + (3/8) \times 0) = 0{,}16875$

**2ème possibilité : (jeune+âgé, moyen)**
- A=jeune+âgé : 4 clients (I=oui : 1, I=non : 3) → $IG_{f1} = 1 - ((1/4)^2 + (3/4)^2) = 0{,}375$
- A=moyen : 4 clients (I=oui : 2, I=non : 2) → $IG_{f2} = 1 - ((2/4)^2 + (2/4)^2) = 0{,}5$
- Gain $= 0{,}46875 - ((4/8) \times 0{,}375 + (4/8) \times 0{,}5) = 0{,}03$

**3ème possibilité : (moyen+âgé, jeune)**
- A=moyen+âgé : 7 clients (I=oui : 2, I=non : 5) → $IG_{f1} = 0{,}375$
- A=jeune : 1 client (I=oui : 1, I=non : 0) → $IG_{f2} = 0$
- Gain $= 0{,}46875 - ((7/8) \times 0{,}375 + (1/8) \times 0) = 0{,}11175$

<!-- TODO: unclear in source — this 3rd possibility's stated group sizes (7 clients: 2 oui/5 non) and the IG_f1 value 0,375 do not match the formula 1-((2/5)²+(7/5)²) shown in the source (which is not a valid probability formula, since 7/5 > 1); transcribed exactly as it appears in the source, verify against original PDF -->

La **1ère possibilité** (jeune+moyen, âgé) est la meilleure, avec un gain de $0{,}16875$.

#### Gain de la variable E (binaire)

- E=oui : 5 clients (I=oui : 3, I=non : 2) → $IG_{f1} = 1 - ((3/5)^2 + (2/5)^2) = 0{,}48$
- E=non : 3 clients (I=oui : 0, I=non : 3) → $IG_{f2} = 1 - ((0/3)^2 + (3/3)^2) = 0$
- Gain $= 0{,}46875 - ((5/8) \times 0{,}48 + (3/8) \times 0) = 0{,}14375$

#### Synthèse pour le choix de la racine

- E (binaire) : $0{,}14$
- A (jeune+moyen, âgé) : $0{,}16875$
- M (faible+élevé, moyen) : $0{,}10$

On choisit alors **A** comme racine, et on continue le travail sur la portion de données correspondant à la branche « non-âgé » (M ou E ?).

<!-- TODO: unclear in source, verify against original PDF (the subsequent recursive split on the "non-âgé" subset, including the continuous-variable-threshold search illustrated with "167,5", is described through images/partial fragments not extracted as text) -->

## La régression dans les arbres

Puisque la régression implique une variable cible $Y$ qui est numérique et continue, il n'y a plus de présence de classe et donc on ne peut pas utiliser l'indice de Gini pour faire le split. On utilise plutôt :

- La variance, ou
- L'écart type

où $\text{Var}(Y_l)$, $\text{Var}(Y_r)$ sont les variances pour les nœuds enfants correspondant au fils gauche et au fils droit ; $p_l$ et $p_r$ sont les probabilités d'occurrence du fils $l$ ou $r$ dans la variable cible. On choisit, pour chaque split, l'attribut (variable indépendante) qui minimise cette formule. On peut remplacer la variance par l'écart type et suivre le même processus.

### Étapes de construction (écart-type)

1. L'écart-type de la variable cible est calculé.
2. Pour chaque variable indépendante, calculer l'écart-type de chaque modalité par rapport à la variable cible. L'écart-type obtenu est ensuite multiplié par la probabilité d'occurrence de chaque modalité dans la variable cible. Le résultat est ensuite déduit de l'écart-type pour obtenir la réduction de l'écart-type.
3. La variable indépendante ayant la plus grande réduction de l'écart-type est choisie pour le nœud de décision.
4. Répéter à partir de l'étape 1, relativement à ce qui reste des données, jusqu'à atteindre une condition d'arrêt.

### Exemple (écart type)

On calcule l'écart type de $y$ : $24{,}51$. Puis on choisit la variable indépendante qui minimise cet écart.

Pour la variable `tutorial` :

| Modalités | Std_exam | Nbr_observations |
|:-:|:-:|:-:|
| all | 6,74 | 6 |
| some | 17,29 | 9 |

$$SD_{tutorial} = (6/15) \times 6{,}74 + (9/15) \times 17{,}39 = 13{,}07$$
$$SDR = 24{,}51 - 13{,}07 = 11{,}44$$

Pour la variable `labs` :

| Modalités | Std_exam | Nbr_observations |
|:-:|:-:|:-:|
| complete | 9,05 | 8 |
| partial | 11,49 | 7 |

$$SD_{Labs} = (8/15) \times 9{,}05 + (7/15) \times 11{,}49 = 10{,}19$$
$$SDR = 24{,}51 - 10{,}19 = 14{,}32$$

L'écart type n'est pas sensible aux outliers. On continue récursivement à développer l'arbre jusqu'à atteindre une des conditions d'arrêt.

<!-- TODO: unclear in source, verify against original PDF — the source has a minor inconsistency between the "SD_tutorial" formula (uses 17,39) and the table value for "some" (17,29); transcribed exactly as it appears -->

### Avantages

- Il s'agit d'un algorithme simple et intuitif, facile à comprendre et à interpréter.
- Il peut traiter des données numériques et catégorielles.
- Il peut traiter les valeurs manquantes en les imputant à l'aide de splits de substitution.
- Il peut traiter les problèmes de classification multi-classes en utilisant une extension appelée multi-class CART.
- Il peut traiter la régression.

### Inconvénients

- Il a tendance à surapprendre les données, en particulier si l'arbre est trop profond.
- Il s'agit d'un algorithme gourmand qui peut ne pas trouver l'arbre optimal.

## Autres algorithmes

### C4.5 (extension de ID3)

- Élagage après la construction de l'arbre : C4.5 utilise une procédure qui permet de transformer en feuilles des sous-arbres qui ne contribuent pas à un meilleur résultat (score « accuracy ») de l'apprentissage.
- Limitation de la profondeur de l'arbre par la taille minimale du nœud (paramètre de construction).
- Chaque attribut peut avoir un poids (coût).
- Traitement de variables continues en cherchant des seuils qui maximisent le gain d'information.
- Traitement de valeurs manquantes.

### C5.0 (extension de C4.5)

- Vitesse et utilisation mémoire.
- Optimisé pour des bases de données de très grande taille. Arbres plus petits.
- Pondération des cas et erreurs de classification.

### CART : Arbres de classification et régression

- CART pose seulement des questions test binaires (arbres binaires). Fonctionne pour des attributs aux valeurs continues (variables quantitatives).
- CART cherche tous les attributs et tous les seuils pour trouver celui qui donne la meilleure homogénéité du découpage.

## Élagage

- Contrôler la complexité du nombre des branches et des feuilles pour réaliser un arbre de décision.
- Minimiser la taille de l'arbre.
- Trouver le nombre optimal de nœuds.
- Deux techniques d'élagage : pré-élagage et post-élagage.

### Pré-élagage

- Arrêter quand il y a une classe majoritaire dans le nœud.
- Utiliser un seuil pour détecter une classe dominante.
- Inconvénient : arrêter la construction de l'arbre peut donner un arbre sous-optimal.

### Post-élagage

- Finir la construction de l'arbre.
- Simplifier l'arbre en remontant des feuilles vers la racine pour trouver où élaguer.
- Utiliser des critères de qualité qui mesurent un compromis entre l'erreur obtenue et la complexité de l'arbre.
- Utiliser un ensemble de validation pour mesurer l'erreur à chaque nœud.

:::note Remarque
Ce document couvre en détail l'algorithme ID3 et l'algorithme CART (avec un exemple chiffré complet). Pour un aperçu synthétique plus général de l'arbre de décision et de CART, voir [L'Arbre de Décision et l'Algorithme CART](./ia-arbre-decision-cart.md).
:::
