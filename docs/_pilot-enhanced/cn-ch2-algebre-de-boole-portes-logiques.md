---
sidebar_position: 1
title: "Chapitre 2 : Algèbre de Boole et fonctions Logiques"
sidebar_label: Ch2 - Algèbre de Boole et portes logiques
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!--
PILOT NOTE: this enhanced version covers §1-5 (Introduction through the
elementary gate functions) — a representative excerpt of the full
919-line chapter, not the whole thing. The chapter continues with logic
function representations (SDP/PDS), simplification, Karnaugh maps, and
8 exercises, which this pilot doesn't touch. See the original file for
the rest.
-->

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 2 : Algèbre de Boole et fonctions Logiques

*Module : Circuits Numériques et éléments d'architecture — Dr. Nizar Sghaier, ENSI, II1-2022*

:::info You will learn

- Les 3 opérations élémentaires de la logique booléenne (NON, ET, OU)
- Les lois de l'algèbre de Boole, dont les deux règles d'absorption (avec preuve)
- Le théorème de De Morgan
- Les tables de vérité et portes logiques élémentaires (NOT, AND, OR, NAND)
:::

## 1. Introduction

Inventée par le mathématicien Georges Boole (1815-1864), l'algèbre de Boole définit les règles de calcul pour les opérations possibles sur des nombres binaires (à 2 états).

Une variable booléenne ne peut prendre que 2 états : VRAI (TRUE) ou FAUX (FALSE). On parle de logique booléenne (ou binaire) lorsqu'on associe des valeurs numériques aux états : VRAI ↔ « 1 » (niveau 1), FAUX ↔ « 0 » (niveau 0).

Il n'existe que 3 opérations élémentaires en logique booléenne :

:::info Definition
**NON (NOT)** : fournit le complément de la valeur d'entrée (inversion).

$$\text{Si } A = 1 \text{ alors } S = 0 \qquad \text{Si } A = 0 \text{ alors } S = 1$$
:::

## 2. Opérateurs logiques

:::info Definition
**OU (OR)** : fournit la somme logique des entrées (union).

$$S = A + B \qquad (\text{on prononce « } S = A \text{ OU } B \text{ », pas « plus »})$$

$S = 1$ si au moins une des entrées est égale à 1, sinon $S = 0$. Correspondance électrique : mise en parallèle.
:::

:::info Definition
**ET (AND)** : fournit le produit logique des entrées (intersection).

$$S = A \cdot B \qquad (\text{on prononce « } S = A \text{ ET } B \text{ »})$$

$S = 1$ si toutes les entrées sont égales à 1, sinon $S = 0$. Correspondance électrique : mise en série.
:::

## 3. Lois et règles

Les opérations ET et OU sont **commutatives** et **associatives** :

$$A + B = B + A \qquad A \cdot B = B \cdot A$$
$$A + (B + C) = (A + B) + C \qquad A \cdot (B \cdot C) = (A \cdot B) \cdot C$$

L'opération ET est **distributive**, et — moins intuitivement — l'opération OU l'est **aussi** :

$$A \cdot (B + C) = (A \cdot B) + (A \cdot C)$$
$$A + (B \cdot C) = (A + B) \cdot (A + C)$$

:::warning Attention
La distributivité de la somme sur le produit n'est vraie qu'en algèbre binaire !!!
:::

$$\bar{\bar{A}} = A$$

### Théorème (règle d'absorption, forme 1)

:::note Théorème
$$A + A \cdot B = A$$
:::

<details>
<summary>Proof</summary>

En utilisant l'axiome $A \cdot 1 = A$ :

$$A + A.B = (A.1) + (A.B) = A \cdot (1+B) = A$$

(la deuxième égalité est la distributivité inverse du ET.)

</details>

### Théorème (règle d'absorption, forme 2)

:::note Théorème
$$A + \bar{A} \cdot B = A + B$$
:::

<details>
<summary>Proof</summary>

En reconnaissant la distributivité du OU :

$$A + \bar{A} \cdot B = (A + \bar{A}) \cdot (A + B) = 1 \cdot (A + B) = A + B$$

</details>

**Exercice** : montrer que $(A + B) \cdot (A + C) = A + BC$.

## 4. Théorème de De Morgan

:::note Théorème
Pour deux variables binaires $A$ et $B$ :

$$\overline{A \cdot B} = \bar{A} + \bar{B}$$
*(le complément du produit est égal à la somme des compléments)*

$$\overline{A + B} = \bar{A} \cdot \bar{B}$$
*(le complément de la somme est égal au produit des compléments)*
:::

Application directe du théorème :

$$\overline{A + \bar{B}} = \bar{A} \cdot B \qquad A \cdot B = \overline{\overline{A \cdot B}} = \overline{\bar{A} + \bar{B}} \qquad A + B = \overline{\overline{A + B}} = \overline{\bar{A} \cdot \bar{B}}$$

## 5. Les fonctions binaires élémentaires

### La table de vérité

La table de vérité répertorie toutes les valeurs que peut prendre la fonction, pour toutes les combinaisons possibles des $N$ variables d'entrée. Une fonction à $N$ variables a $2^N$ combinaisons possibles, donc $2^N$ lignes dans sa table de vérité — 1 variable → 2 lignes, 2 variables → 4 lignes, 3 variables → 8 lignes, et ainsi de suite.

**Pour construire une table de vérité :** une colonne par variable d'entrée, $2^N$ lignes, variables implémentées en commençant par la colonne de droite, en commençant par la combinaison « tout à 0 » sur la première ligne.

### Fonction NON (NOT)

Désignation : $S = \bar{A}$ (« $A$ bar ») — réalise le complément logique de l'entrée.

| A | S |
| --- | --- |
| 0 | 1 |
| 1 | 0 |

<LogicGateSimulator gate="NOT" />

*(Le schéma ci-dessus n'est pas un remplaçant provisoire — pour ce chapitre, la porte logique interactive fait partie intégrante de la définition de la fonction, au même titre que la table de vérité qu'elle accompagne.)*

### Fonction ET (AND)

Désignation : $S = A.B$ — vrai si toutes les entrées sont vraies, sinon faux.

| B | A | S |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

<LogicGateSimulator gate="AND" />

### Fonction OU (OR)

Désignation : $S = A + B$ — vrai si au moins une des entrées est vraie, sinon faux.

| B | A | S |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

<LogicGateSimulator gate="OR" />

### Fonction NON ET (NAND)

Désignation : $S = \overline{A \cdot B}$ (« $(A$ ET $B)$ bar »).

| B | A | S |
| --- | --- | --- |
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

<LogicGateSimulator gate="NAND" />

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/cn-ch2-algebre-de-boole-portes-logiques.pdf" />

</TabItem>
</Tabs>
