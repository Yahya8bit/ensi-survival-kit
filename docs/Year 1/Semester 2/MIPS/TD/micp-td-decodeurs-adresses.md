---
sidebar_position: 1
title: TD Architecture et Microprocesseur - Décodeurs d'adresses
sidebar_label: TD - Décodeurs d'adresses
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD ARCHITECTURE ET MICROPROCESSEUR

## (Application sur les décodeurs d'adresses)

*Filière II1 — Responsable : Dr Montassar EZZINE*

## Position du problème

Un boîtier mémoire 16×4 est donné par la figure suivante : les entrées d'adresses A3, A2, A1, A0 (2³...2⁰) sont reliées à un **décodeur**, activé par un signal `CS`, qui sélectionne une case parmi 16 (case n°0 à case n°15), chacune sortant sur les 4 lignes de données D3 D2 D1 D0.

Le rôle du décodeur est de sélectionner une case parmi les 16 cases de la mémoire suivant la combinaison d'entrée (mot d'adresse) ; chaque case mémoire comporte 4 cellules, dans chaque cellule, on met une donnée binaire 0 ou 1. Pour notre cas, le boîtier mémoire comporte 16 cases de 4 données (D3D2D1D0).

**Par définition :** le nombre de cases = 2<sup>nombre de lignes d'adresses</sup>, exemple : 4 lignes d'adresse A3A2A1A0, donc nombre de cases = 2<sup>4</sup> = 16.

Ainsi, on peut dire que :

- la case n° 0 a l'adresse suivante `0000`₂ = `0`₁₆
- la case n° 1 a l'adresse suivante `0001`₂ = `1`₁₆
- la case n° 15 a l'adresse suivante `1111`₂ = `F`₁₆

:::note NB
`CS` est active au niveau bas.
:::

## Application 1

On veut réaliser un système de **32×4 bits** de mémoires sachant qu'on dispose de boîtier mémoire vive **16×4 bits**. Pour cela :

1. Dresser la table de vérité correspondante.
2. Donner le schéma de câblage souhaité.

## Application 2

On veut réaliser un système de **16×8 bits** de mémoires sachant qu'on dispose de boîtier mémoire vive **16×4 bits**. Pour cela :

1. Dresser la table de vérité correspondante.
2. Donner le schéma de câblage souhaité.

## Application 3

On dispose d'un microprocesseur µP 8085, un bus d'adresses de 16 bits et un bus de données de 8 bits.

1. Donner la capacité mémoire maximale adressable par le µP.
2. On veut réaliser un système à base de µP 8085 et de **16 Kilooctets d'Eproms**, sachant qu'on dispose d'Eprom de **2Koctets** :
   a. Donner le schéma fonctionnel de l'Eprom de 2Koctets à utiliser. (Elle sera notée EPROM 1)
   b. Déterminer la cartographie de la mémoire visible par le microprocesseur. (On donnera le résultat sous forme de tableau)
   c. Dresser le schéma de câblage du décodeur d'adresse nécessaire pour ce système.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/micp-td-architecture-microprocesseur.pdf" />

</TabItem>
</Tabs>
