---
sidebar_position: 15
title: "Proposition de correction — Examen de Rattrapage SE&PC 10/06/2022"
sidebar_label: Rattrapage 2022 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Examen de Rattrapage — Systèmes d'exploitation & Programmation Concurrente

*École Nationale des Sciences de l'Informatique — A.U. : 2021/2022 — Proposition de correction — 10/06/2022*

<!-- TODO: unclear in source, verify against original PDF — this source PDF (CORR-SEPC_RATT_2022.pdf) contains only the correction/answer document; no separate exam statement PDF was provided in this batch. Questions and answers are transcribed together below (as in the DS 2021 document in this same module), rather than inventing a separate statement document. -->

## Exercice 1 : Questions diverses (7 points – 6×0,5+2+2)

*Note : les questions suivantes sont indépendantes.*

**1)** Qui suis-je ? Donnez le(s) terme(s) technique(s) correspondant à chacune des phrases suivantes :

a) Le PCB est le descripteur de processus, contenant toutes les métadonnées utiles au système.

b) La fonction système (en C) `wait()` bloque le processus père (courant appelant) jusqu'à la terminaison d'exécution de son processus fils, et puis lui libère son entrée PCB de la table des processus. Cette fonction est souvent utilisée conjointement avec `fork`, qui est une fonction de clonage du processus appelant.

c) Un processus Zombi est un processus qui a terminé son exécution et attend la prise en compte de cette fin par son père.

d) Le bit de présence sert à la protection d'accès à une page (présente/absente) en mémoire physique ; la MMU s'en sert pour soit calculer l'@ physique et puis la transférer sur le bus d'@, soit retourner un défaut de page (une interruption particulière qui reprend l'instruction après le chargement de la page demandée).

<!-- TODO: unclear in source, verify against original PDF — questions a-d above are reproduced as answered statements directly from the correction text (the correction gives the definitions inline rather than separately stating a fill-in-the-blank prompt per item); the original phrasing of each "phrase" the student had to identify a term for was not distinctly separated from its answer in the extraction -->

**2)** Que signifie remplacement de page ? Le PCB d'un processus non actif (mais pas encore terminé) peut-il être remplacé ? Justifiez (en une ligne). Enfin, quels sont les algorithmes de remplacement les plus performants ?

<details>
<summary>Correction</summary>

Quand un processus Pi provoque un défaut de page et que la mémoire est saturée, le système choisit une page victime pour la remplacer par la page demandée. Le PCB d'un processus ne peut en aucun cas être remplacé, sinon on ne peut plus y reprendre l'exécution !

LRU (LFU) approximent l'algorithme optimal, permettant moins d'E/S.

</details>

## Exercice 2 : IPC (4 points – 1+3)

**1)** Soit l'ensemble de processus (ou threads) suivant, où les contraintes de précédence sont données par le graphe ci-dessous :

<!-- TODO: unclear in source, verify against original PDF — the precedence graph itself (with nodes P1-P6 organized in 3 levels) did not extract as text/image; only the correction's description of its structure survived (see below) -->

a) De quel(s) type(s) de problème de synchronisation ce graphe représente-t-il ? Expliquez succinctement.

<details>
<summary>Correction</summary>

Problème de coopération (1 point) :

- **Niveau I** : Pb de P/Cs → 1 Producteur (1) et 3 consommateurs (2), (3), et (4)
- **Niveau II** : Pb de Ps/C → 3 Producteurs (2) et (3) et 1 consommateur (5)

<!-- TODO: unclear in source, verify against original PDF — "Niveau II" lists only 2 producer indices ("(2) et (3)") despite saying "3 Producteurs"; reproduced verbatim from the extracted text -->

- **Niveau III** : Pb de Ps/C → 2 Producteurs (5) et (4) et 1 consommateur (6)

</details>

b) Donnez une solution utilisant seulement trois sémaphores pour synchroniser ces processus (ou threads) de manière à respecter les contraintes de précédence (on ne demande pas de code C, mais un pseudo-code pour chaque processus (ou thread) avec les appels aux primitives P (ou sem-wait) et V (ou sem-post) nécessaires à la synchronisation ; vous préciserez la valeur initiale de chaque sémaphore proposé dont vous expliquez le rôle/type.

<details>
<summary>Correction</summary>

`Semaphore S1 = S2 = S3 = 0;` // sémaphores de blocage (0,5 point)

| Processus | Pseudo-code |
|---|---|
| P1 (0,5 pt) | `……….; V(S1); V(S1); V(S1);` |
| P2 (0,25 pt) | `P(S1); ……….; V(S2);` |
| P3 (0,25 pt) | `P(S1); ……….; V(S2);` |
| P4 (0,5 pt) | `P(S1); ……….; V(S3);` |
| P5 (0,5 pt) | `P(S2); P(S2); ……….; V(S3);` |
| P6 (0,5 pt) | `P(S3); P(S3); ……….;` |

<!-- TODO: unclear in source, verify against original PDF — this pseudo-code table was reconstructed from a badly interleaved OCR fragment (the raw text lists "P1 ... P2 ... P3 ... P4 ... P5 ... P6" headers followed by a jumbled sequence of "V(S1);", "P(S1);", "V(S2);", "P(S2); P(S2);", "V(S3);", "P(S3); P(S3);" lines without clear column boundaries); the reconstruction above assigns each fragment to the process it most plausibly belongs to based on the precedence description in question (a) (P1 signals 3 successors via S1; P2/P3 each wait on S1 then signal S2; P4 waits on S1 then signals S3; P5 waits twice on S2 then signals S3; P6 waits twice on S3) — verify against the original PDF page before relying on this for an exact answer -->

</details>

## Exercice 3 : Gestion de Mémoire (9 points – 2+7)

*Note : les questions suivantes sont indépendantes.*

**1)** Complétez la table suivante, en remplissant les cases en pointillés et/ou contenant "??" par les valeurs correspondantes : (2 pts – 0,5pt/ligne)

<details>
<summary>Correction</summary>

*(Ind. PTE = Pointer Table Entry)*

| # bits dans une @ virtuelle | Taille d'une page | Taille mémoire virtuelle | # PTEs |
|---|---|---|---|
| 16 bits | 1 KB (2¹⁶/2⁶) | 64 KB (2¹⁶) | 64 |
| 32 bits | 4 KB | 4 GB (2³²) | 2³²/2¹² = 2²⁰ |
| 48 bits | 8 KB (2⁴⁸/2³⁵) | 256 TB (2⁴⁸) | 2³⁵ |
| 64 bits | 4 KB | 16 EB (2⁶⁴) | 2⁶⁴/2¹² = 2⁵² |

</details>

**2) a)** Quelle est la taille d'une page (en hexadécimal) ? (1 pt)

<details>
<summary>Correction</summary>

Taille(case) = taille(page) = 32Ko = 2¹⁵ → 15 bits pour représenter une page ; ainsi 15/4 = 3 chiffres hexa (0-F) et le reste, le chiffre en hexa le plus à gauche, ne contient que 3 bits (0-7). Conséquemment, la plus grande valeur `0x7FFF+1 = 0x8000` ne dépasse pas 7 (3 bits) → **`0x8000`**

</details>

**b)** Donner les adresses virtuelles correspondantes aux adresses physiques `0x7C30` et `0x160DC`. Expliquez.

<details>
<summary>Correction</summary>

- `0x7C30` → @physique = `<case 0, dépl. 0x7C30>`. D'après la table des pages, on balaie la table jusqu'à retrouver le contenu case = 0 → page 7. Donc @virtuelle = `<page 7, 0x7C30>`. (1 pt)
- `0x160DC` → 1 0110 0000 1110 1100 → @physique `<case 2, 0x60DC>` ; d'après la table des pages, @virtuelle `<page 2, 0x60DC>`. (1 pt)

</details>

**3)** On souhaite appliquer l'algorithme de remplacement de seconde chance dans un cache capable de contenir 5 pages ; on suppose que le gestionnaire de mémoire accède successivement aux pages suivantes :

```
1, 7, 8, 2, 3, 1, 6, 1, 2, 7, 3, 5, 6
```

Initialement, le cache est vide.

**a)** Déroulez l'algorithme de remplacement de seconde chance sur cette séquence de pages et indiquez le nombre de défauts de pages ainsi que le nombre d'entrées-sorties. (2 pts)

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF — the per-cache-line trace table (C1-C5 across the 13 accesses, with reference bits) extracted as fragmented cell content that could not be reliably reconstructed into a clean table; only the final results below are reproduced with confidence -->

**b)** Total de défauts de pages : **9** → 9 ≤ #E/S ≤ 13 (5 chargements + 2×4 remplacements) (1 pt)

**c)** Quel est le nombre de défauts de page minimal sur cet exemple ? Justifiez sans dérouler l'algorithme optimal.

Total de défauts de pages (optimal) : **7**, qui n'est autre que le nombre de pages référencées dans la séquence (1-3, 5-8). (1 pt)

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se2-exam-rattrapage-2022-correction.pdf" />

</TabItem>
</Tabs>
