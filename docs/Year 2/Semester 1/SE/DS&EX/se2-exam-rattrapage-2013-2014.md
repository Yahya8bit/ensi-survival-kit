---
sidebar_position: 12
title: "Examen de Rattrapage SE&PC — 17/06/2014 (Corrigé)"
sidebar_label: Rattrapage 2013/2014 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Examen de Rattrapage — Systèmes d'exploitation Programmation Concurrente

*École Nationale des Sciences de l'Informatique — A.U. : 2013/2014 — Classes : II2 — Date : 17/06/2014 — Durée : 2h00 — Documents non autorisés*

## Exercice 1 : Pipes (3 points – 3×1)

**1.** Comment utilise-t-on un pipe anonyme ? Illustrer avec un exemple de code C.

**2.** Comment utilise-t-on un pipe nommé ? Illustrer avec un exemple de code C.

**3.** Peut-on utiliser un pipe dans un système distribué ? Expliquez succinctement.

<details>
<summary>Correction</summary>

**1.** Exemple du cours (pipe anonyme entre un père et son fils, via `pipe()` et `fork()`).

**2.** Exemple du cours (pipe nommé/FIFO créé via `mkfifo()`, ouvert par des processus sans lien de parenté).

**3.** *(pas de réponse explicite dans le corrigé extrait)*

<!-- TODO: unclear in source, verify against original PDF — the correction for this exercise simply says "Exemple du cours" for questions 1 and 2 (referring the student to lecture material rather than reproducing the code), and gives no answer at all for question 3; the actual code examples and the distributed-systems answer were not present in the extracted text -->

</details>

## Exercice 2 : Ordonnancement (5 points, 3+1+1)

Soit un système avec 4 processus dont les dates d'arrivée sont indiquées par le tableau ci-dessous.

Le processus P2 fait un appel à une E/S après chaque 5 ms de calcul, et pour chaque appel, il utilise cette E/S pendant une durée de 100 ms. De même, le processus P4 fait un appel à une E/S après chaque 10 ms de calcul, et pour chaque appel, il utilise cette E/S pendant une durée de 100 ms. Quant aux processus P1 et P3, ils n'utilisent aucune E/S, ils ont besoin uniquement du CPU pour les durées indiquées ci-dessous.

On suppose qu'il existe 2 niveaux de priorité (1 et 2), avec 2 la priorité la plus élevée (plus prioritaire). On assume que, pour chaque niveau de priorité, la politique d'ordonnancement adoptée est le Round Robin avec un quantum égal à 100 ms.

| Processus | Date d'arrivée | Temps CPU Total | Utilisation/Appel E/S | Durée E/S | Priorité |
|---|---|---|---|---|---|
| P1 | 0 | 200 ms | Aucune | Aucune | 1 |
| P2 | 1 | 20 ms | Toutes les 5 ms | 100 ms | 2 |
| P3 | 2 | 300 ms | Aucune | Aucune | 1 |
| P4 | 4 | 50 ms | Toutes les 10 ms | 100 ms | 2 |

**Questions :**

1. Donnez les diagrammes de GANTT montrant l'exécution de ces différents processus.
2. Pour chacun de ces processus, donnez dans un tableau : (a) le temps total de traitement ; (b) le temps total d'attente.
3. En déduire le temps moyen de traitement et le temps moyen d'attente.

<details>
<summary>Correction</summary>

**1)** Diagramme de Gantt (transitions) :

```
P1 P2 P4 P3 P2 P1 P4 P3 P2 P3 P4 P2 P4 P4
0  100 105 115 215 220 320 330 430 435 535 545 605 610 705 715 805 905 915 1015
```

320 => Fin P1 ; 535 => Fin P3 ; 805 => Fin P2 ; 1015 => Fin P4.

<!-- TODO: unclear in source, verify against original PDF — the timeline row above lists 14 process labels against 19 numeric transition points, an apparent mismatch in the raw OCR; reproduced verbatim as extracted rather than resolved by guesswork -->

**2)**

(a) Le temps total de traitement :

- P1 : (320−0) = 320 ms
- P2 : (805−1) = 804 ms
- P3 : (535−2) = 533 ms
- P4 : (1015−4) = 1011 ms

(b) Le temps total d'attente :

- P1 : (320−200) = 120 ms
- P2 : (804−(20+4×100)) = 384 ms
- P3 : (533−300) = 233 ms
- P4 : (1011−(50+5×100)) = 461 ms

**3)** Temps moyen de traitement : (320+804+533+1011)/4 = **667 ms**. Temps moyen d'attente : (120+384+233+461)/4 = **299,5 ms**.

</details>

## Exercice 3 : Mémoire Virtuelle (6 points, 1+1+4)

Soit une mémoire virtuelle, telle que la longueur des adresses virtuelles est égale à 16 bits, et la longueur des adresses physiques est égale à 14 bits. De plus on suppose que la taille d'une page est égale à 512 octets. (Rappelons que l'unité d'adressage mémoire, comme convenu dans le cours, est de 1 octet.)

**1-** Quels sont les champs qui forment une adresse virtuelle ? Donnez la longueur en bits de chacun de ces champs.

**2-** Quels sont les champs qui forment une adresse physique ? Donnez la longueur en bits de chacun de ces champs.

Pour cet exercice, on vous donne la table de pages ci-dessous, où VPN (Virtual Page Number) indique le numéro de page, et PPN (Physical Page Number) indique le numéro de case.

<!-- TODO: unclear in source, verify against original PDF — the page table itself (VPN → PPN → valid bit mapping) referenced by question 3 did not extract as text/data; only the worked translations below (which cite specific VPN/PPN values) survived -->

**3-** En vous basant sur ces informations, translatez les adresses virtuelles suivantes en des adresses physiques correspondantes. Donnez pour chaque adresse un aperçu de votre démarche.

(a) Adresse Virtuelle : `0x2DBC`
(b) Adresse Virtuelle : `0x233E`
(c) Adresse Virtuelle : `0x3AD3`
(d) Adresse Virtuelle : `0x184B`

<details>
<summary>Correction</summary>

**1)** Les champs : Offset et Numéro de page. Offset sur 9 bits, et Numéro de page sur 7 bits.

**2)** Les champs : Offset et Numéro de case. Offset sur 9 bits, et Numéro de case sur 5 bits.

**3)**

(a) `0x2DBC` → `0010 1101 1011 1100` → VPN = `001 0110` = `0x16` → PPN = `0x17` (depuis la table) = `1 0111` → Adresse Physique = `10 1111 1011 1100` = **`0x2FBC`**

(b) `0x233E` → `0010 0011 0011 1110` → VPN = `001 0001` = `0x11` → PPN = `0x15` = `1 0101` → Adresse Physique = `10 1011 0011 1110` = **`0x2B3E`**

(c) `0x3AD3` → `0011 1010 1101 0011` → VPN = `001 1101` = `0x1D` → Pas de mapping valide dans la table de pages (valid=0) → **défaut de page** ; Adresse Physique = Aucune

(d) `0x184B` → `0001 1000 0100 1011` → VPN = `000 1100` = `0x0C` → PPN = `0x1B` = `1 1011` (table) → Adresse Physique = `11 0110 0100 1011` = **`0x364B`**

</details>

## Exercice 4 : Interblocage (3 points)

A l'état initial, le système considéré dispose de l'ensemble de ressources qui suit (R1, R2, R3). Plus tard, la configuration du système indique un état défini par les structures de données suivantes (Allouées, Annonces Maximum, Disponibles pour P1-P4).

<!-- TODO: unclear in source, verify against original PDF — the "Ressources", "Allouées" and "Annonces" tables with per-process R1/R2/R3 values referenced by this exercise did not extract as usable tabular data; only the step-by-step Banker's algorithm trace below survived -->

**Question :** Déroulez l'algorithme du Banquier pour savoir si un interblocage peut se produire. Indiquez sinon la suite fiable des demandes à honorer.

<details>
<summary>Correction</summary>

1. Exécuter P2 => Ressources Disponibles (6/2/3)
2. Exécuter P4 => Ressources Disponibles (6/2/5)
3. Exécuter P3 => Ressources Disponibles (8/3/6)
4. Exécuter P1 => Ressources Disponibles (9/3/6)

Un interblocage ne se produit pas. Une suite fiable possible de demandes à honorer est **P2, P4, P3, P1**.

</details>

## Exercice 5 : Remplacement de pages (3 points)

Soit un processus demandant 5 pages, dont la séquence de référencement est comme suit :

```
2, 3, 2, 1, 5, 2, 4, 5, 3, 2, 5, 2
```

En supposant que le nombre de cases attribuées à ce processus est égal à 3, calculer le nombre de défauts de page total et donner son comportement lorsque l'algorithme de remplacement mis en œuvre est :

(a) L'algorithme optimal (OPT)
(b) FIFO (Premier Arrivé Premier Servi)
(c) LRU (Moins Récemment Utilisé)

<details>
<summary>Correction</summary>

**(a) Optimal**

| Réf. | 2 | 3 | 2 | 1 | 5 | 2 | 4 | 5 | 3 | 2 | 5 | 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Case 0 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 4 | 4 | 4 | 2 | 2 |
| Case 1 | | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 |
| Case 2 | | | | 1 | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 5 |
| Défaut | x | x | | x | x | | x | | | | | |

3 placements + 3 remplacements = **6 défauts de page**

**(b) FIFO**

| Réf. | 2 | 3 | 2 | 1 | 5 | 2 | 4 | 5 | 3 | 2 | 5 | 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Case 0 | 2 | 2 | 2 | 2 | 5 | 5 | 5 | 5 | 3 | 3 | 3 | 3 |
| Case 1 | | 3 | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 2 | 5 | 5 |
| Case 2 | | | | 1 | 1 | 1 | 4 | 4 | 4 | 4 | 4 | 2 |
| Défaut | x | x | | x | x | x | x | | x | x | x | |

3 placements + 6 remplacements = **9 défauts de page**

**(c) LRU**

| Réf. | 2 | 3 | 2 | 1 | 5 | 2 | 4 | 5 | 3 | 2 | 5 | 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Case 0 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 3 | 3 | 3 | 3 |
| Case 1 | | 3 | 3 | 3 | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 5 |
| Case 2 | | | | 1 | 1 | 1 | 4 | 4 | 4 | 2 | 2 | 2 |
| Défaut | x | x | | x | x | | x | | x | x | | |

3 placements + 4 remplacements = **7 défauts de page**

<!-- TODO: unclear in source, verify against original PDF — the exact "Défaut" marker row (which columns get an "x") for each table is a best-effort reconstruction aligning the raw OCR's terse "Défaut x x x ..." fragments with the reported final defaut counts (6, 9, 7 respectively); verify each x's column placement against the original PDF page -->

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se2-exam-rattrapage-2013-2014.pdf" />

</TabItem>
</Tabs>
