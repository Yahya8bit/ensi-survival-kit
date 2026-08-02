---
sidebar_position: 3
title: Série 4 - Flot à Valeur Maximale et Applications
sidebar_label: Série 4 - Flots
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Série 4 : Flot à valeur maximale et applications

*ENSI-II1 — 2023-2024*

## Exercice 1

On considère le réseau de transport $G(X,U,C)$, où les arcs sont munis de capacités et pour lequel un flot initial est donné. Sur chaque arc $u\in U$, le premier nombre est le flot initial $f_u$, le second est la capacité $c_u$ ($0\le f_u\le c_u$).

Réseau (notation `(flot,capacité)`) : `s→A(15,25)`, `s→B(5,25)`, `s→C(0,25)`, `A→D(15,25)`, `B→D(0,10)`, `B→E(5,15)`, `C→E(0,5)`, `C→H(0,5)`, `D→E(5,5)`, `D→F(5,30)`, `D→G(5,10)`, `E→H(10,15)`, `F→G(0,10)`, `F→P(5,20)`, `G→P(5,40)`, `G→H(0,15)`, `H→P(10,40)`.

1. Les valeurs de $f_u$ figurant sur les arcs forment-elles un flot ? Quelle est sa valeur ?
2. Ce flot est-il complet ? Sinon, le modifier pour le rendre complet.
3. Ce flot est-il maximal ? Sinon, déterminer un flot de $s$ à $p$ de valeur maximale.
4. Donner une coupe minimale du réseau et calculer sa capacité.

## Exercice 2

Une entreprise employant quatre ouvriers `x₁,x₂,x₃,x₄` doit effectuer quatre travaux `y₁,y₂,y₃,y₄`. Le tableau ci-dessous donne les affectations possibles :

| L'ouvrier | est qualifié pour |
|---|---|
| x₁ | y₁, y₂ |
| x₂ | y₁, y₃ |
| x₃ | y₃, y₄ |
| x₄ | y₄ |

L'entreprise peut-elle réaliser les quatre travaux ? Dans l'affirmative, comment doit-elle affecter les ouvriers aux postes de travail ?

*(Indication : modéliser par un graphe biparti `{x₁,x₂,x₃,x₄}` / `{y₁,y₂,y₃,y₄}`, et se ramener à un problème de flot maximal en ajoutant une source et un puits reliés par des arcs de capacité 1.)*

## Exercice 3

Une agence matrimoniale a pour clients un ensemble `H` d'hommes et un ensemble `F` de femmes. Après présentation des dossiers, il est apparu que certains mariages étaient tout à fait « envisageables » et d'autres non. L'agence souhaite réaliser le maximum de mariages. Résoudre le problème avec les données suivantes :

| | Mariages envisageables |
|---|---|
| Achille | Cléopâtre & Iphigénie |
| César | Cléopâtre & Fanny |
| Rodrigue | Juliette & Chimène |
| Roméo | Juliette & Chimène |
| Marius | Juliette & Fanny |

## Exercice 4

Un courtier en céréales se propose d'approvisionner par voie maritime ses trois magasins `X, Y, Z` à partir de trois ports `A, B, C`, en utilisant les services d'une compagnie de transports. Les liaisons assurées et le tonnage des bateaux disponibles :

**Tab1 (capacités des liaisons) :**

| | X | Y | Z |
|---|---|---|---|
| A | 6 | 6 | 6 |
| B | 6 | 6 | - |
| C | - | 6 | 6 |

Les vendeurs situés en `A, B, C` peuvent respectivement fournir 5, 8 et 12 tonnes de maïs par semaine. Les magasins `X, Y, Z` peuvent en débiter 8, 13 et 4 tonnes.

1. Modéliser ce problème par un graphe.
2. Dans un premier temps, le courtier décide d'acheminer la quantité donnée par le **Tab2** :

   | | X | Y | Z |
   |---|---|---|---|
   | A | 4 | 0 | 1 |
   | B | 0 | 6 | - |
   | C | - | 6 | 3 |

   Ce flot est-il complet (justifier) ? S'il ne l'est pas, le rendre complet.
3. Déterminer le plan optimal du transport afin de satisfaire au mieux les demandes des magasins `X, Y, Z`, sachant que le magasin `X` est prioritaire.

## Exercice supplémentaire

En trois dépôts `A, B, C`, on dispose respectivement de 20, 35 et 10 tonnes de marchandises. On a des demandes de 25, 20 et 20 tonnes aux destinations `D, E, F`. Il existe des possibilités de transport à l'aide de camions, rapportées dans le tableau suivant :

| | D | E | F |
|---|---|---|---|
| A | 15 | 10 | 0 |
| B | 15 | 5 | 5 |
| C | 5 | 0 | 10 |

Déterminer un plan de transport permettant de transporter des origines aux destinations une quantité maximale.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/graphe-td4-flots.pdf" />

</TabItem>
</Tabs>
