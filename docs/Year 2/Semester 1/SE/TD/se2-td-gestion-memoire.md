---
sidebar_position: 4
title: "TD (archive d'examens) : Gestion de la Mémoire Centrale/virtuelle (avec corrigé)"
sidebar_label: TD - Gestion Mémoire
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD (archive d'examens) : Gestion de la Mémoire Centrale/virtuelle

*École Nationale des Sciences de l'Informatique — II2 — A.U. : 2021/2022 — Systèmes d'exploitation & Programmation concurrente*

<!-- TODO: unclear in source, verify against original PDF — this TD is a compilation of past exam questions; the correction PDF (CORR-TD-GestionMémoire.pdf) only covers Exercices 1, 2, 3, 4 and 6 (partially) — no corrections were found for the "Exercice de réchauffement", Exercice 5, and Exercice 7, and Exercice 6's correction is missing question 5's per-access answers beyond a-f summary. Left as open exercises / flagged below where the correction is incomplete. -->

## Exercice de réchauffement

**1)** (QC. Exam 2011) Un SE utilise une mémoire segmentée paginée avec des adresses virtuelles de 19 bits : quelle est l'adresse physique correspondante à l'adresse virtuelle 234122 ? Justifier.

Structure de l'adresse virtuelle : Segment | Page | Déplacement dans la page

<!-- TODO: unclear in source, verify against original PDF — the "Table des segments" / "Table de pages segment1" / "Table de pages segment3" data tables for this question did not extract cleanly (rows interleaved as raw numbers); reproduced best-effort below, verify against original -->

Table des segments (partielle, reconstruction best-effort) :

| Segment | Valeur |
|---|---|
| 0 | 21345 |
| 1 | 64231 |
| 2 | 15218 |
| 3 | 34562 |
| 4 | 12180 |
| 5 | 26069 |
| 6 | 51298 |
| 7 | 14168 |

Choix proposés :

- 547466
- Il y aurait un défaut de page ;
- 236170 ;
- 65535 ;
- Aucune n'est correcte.

<!-- TODO: no correction was found for this question in the correction PDF -->

**2)** (QC. Exam 2017) Complétez la table suivante, en remplissant les cases en pointillés et/ou contenant "??" par les valeurs correspondantes :

| # bits dans une @ virtuelle | Taille d'une page | Taille mémoire virtuelle | # PTEs |
|---|---|---|---|
| ………………. | 1 KB | 2?? = 64 KB | ………………. |
| ………………. | ………………. | 2³² = ??? GB | 2²⁰ |
| ………………. | 8KB | 2?? = 256 TB | ………………. |
| 64 bits | ………………. | ………………. | 2⁵² |

<!-- TODO: no correction was found for this table in the correction PDF -->

## Exercice 1 : Remplacement Horloge (exam. 2018)

On s'intéresse à l'algorithme de remplacement horloge (ou encore appelé de seconde chance), qui est une amélioration de FIFO avec un bit de référence R, décrit comme suit :

- Le bit R est mis à 1 au premier chargement dans la mémoire ou encore à chaque référencement.
- Lors du remplacement de page, on sélectionne la page la plus ancienne :
  - Si R=0, cette page est choisie comme victime.
  - Si R=1 alors R est remis à 0 et cette page est déplacée en fin de la liste (elle devient jeune comme si elle venait d'être chargée), et la recherche continue jusqu'à trouver une page ayant le bit R à 0, qui sera retirée.

On souhaite appliquer cet algorithme de remplacement dans un cache capable de contenir 5 pages, et on suppose que le gestionnaire de mémoire accède successivement aux pages suivantes :

```
7, 1, 8, 2, 3, 1, 6, 1, 2, 7, 3, 5, 6
```

Initialement, le cache est vide.

1) Déroulez l'algorithme de remplacement FIFO sur cette séquence de pages. En déduire le nombre de défauts de pages.
2) Déroulez l'algorithme de remplacement horloge sur cette séquence de pages et indiquez la valeur du bit de référence. En déduire le nombre de défauts de pages et comparer avec FIFO.
3) Quel est le nombre de défauts de page minimal sur cet exemple ainsi que le nombre d'entrées-sorties ? Justifiez sans dérouler l'algorithme optimal.

<details>
<summary>Correction</summary>

Total de défauts de pages (optimal) : **7**, qui n'est autre que le nombre de pages référencées dans la séquence (1-3, 5-8).

<!-- TODO: unclear in source, verify against original PDF — the correction summarizes only the final "optimal" answer to question 3; the detailed FIFO/horloge step-by-step derivations for questions 1 and 2 did not extract as text -->

</details>

## Exercice 2 : Translation d'adresses (exam. 2011)

On considère la structure d'adresse virtuelle suivante :

```
# segment (2 bits) | # page (8 bits) | Déplacement page (12 bits)
```

On considère les contenus des tables de segments et de pages comme suit :

<!-- TODO: unclear in source, verify against original PDF — the "Table des segments" (base/longueur/protection per segment 0-3) and the "Mémoire Physique" address/#case table did not extract in a clean tabular form -->

Donnez l'adresse physique (en hexa) correspondante à chacune des opérations et adresses virtuelles suivantes :

(a) Read 0x002070
(b) Write 0x201016
(c) Read 0x204014
(d) Read 0x101C84
(e) Read 0x003FD4
(f) Write 0x002424

<details>
<summary>Correction</summary>

a. **Read 0x002070** : Seg 0, page 02, déplacement = 070 → @Physique `<case 3, 0x070>`, et comme la taille d'une page est de 4Ko (0x1000), on a : 3\*0x1000 + 0x070 = **0x003070**

b. **Write 0x201016** : Seg. 2, page 01, déplacement=016 → **0x00B016**

c. **Read 0x101C84** : Seg.1 → **Violation de la protection Read**

d. **Read 0x003FD4** : Seg. 0, page 3, déplacement=FD4 → **0x011FD4**

e. **Write 0x002424** : Seg. 0 → **Violation de la protection Write**

<!-- TODO: unclear in source, verify against original PDF — the correction as extracted only explicitly answers (a),(b), then labels the next two answers "c." and "d." for what are actually questions (d) and (e) from the statement, and question (c) "Read 0x204014" has no corresponding answer in the extracted correction text; the lettering above follows the correction PDF's own labels verbatim (its "c" = statement's "d", its "d" = statement's "e"), so statement question (c) appears unanswered — verify against original PDF -->

</details>

## Exercice 3 : (exam. 01/2010)

Dans un système de pagination simple, avec une mémoire physique de 10 MO, une mémoire auxiliaire de 320 MO, et des pages de 2 KO. Sachant que lorsqu'un processus est créé par le système, il lui attribue 16 pages et 4 cases.

1) Quelles doivent être :
   a) La taille d'une adresse mémoire (adresse logique) ?
   b) La taille de la table des pages d'un processus (en nombre d'éléments) ? Justifiez.
2) Donnez le détail d'un élément de la table des pages. Justifiez chaque champ précisé.
3) Comment se fait la transformation d'une adresse logique en une adresse physique ? Expliquez cela à travers un schéma.
4) Pour quelles raisons peut-il y avoir remplacement de pages ? Expliquez une méthode de choix d'une page victime.

<details>
<summary>Correction</summary>

1) Mémoire physique de 10 MO → 10\*2²⁰ → représentation sur 24 bits → @physique sur 24 bits. Mémoire auxiliaire de 320 MO → 320\*2²⁰ → représentation sur 29 bits → @virtuelle sur 29 bits. Taille(page) = 2KO → Déplacement sur 11 bits. Taille(table des pages) = 2²⁹/2¹¹ éléments = **2¹⁸**

2) On doit avoir au minimum dans une table des pages : #page, #case, bit de présence et bit de modification.

3) La MMU se charge de la conversion d'@ virtuelle en @ physique. Si bit de présence = 1 alors extraire le #case correspondant, sinon Défaut de Page (DP).

4) L'algorithme de remplacement de pages est appelé quand il n'y a plus de place libre en MC, et la victime est choisie selon plusieurs critères, dont par exemple la date de chargement, date de référencement/modification, ….

</details>

## Exercice 4 : (examen 06/2009)

1) Un système d'exploitation fournit aux processus un espace d'adressage virtuel de 2³² mots. L'ordinateur dispose de 2¹⁸ mots de mémoire RAM. La gestion mémoire est paginée avec des pages de taille 4096. De combien d'entrées dispose la table des pages de chaque processus ?

2) On considère une mémoire segmentée ; et un processus, dont la table de segments est la suivante :

| # Segment | Base | Longueur |
|---|---|---|
| 0 | 219 | 600 |
| 1 | 2300 | 14 |
| 2 | 90 | 100 |
| 3 | 1327 | 580 |
| 4 | 1966 | 69 |

Donnez l'adresse physique de chacune des adresses logiques suivantes :

a. `<0,430>`
b. `<2,500>`
c. `<3,400>`
d. `<4, 121>`

3) On considère une mémoire contenant 3 cases et une mémoire virtuelle constituée de 5 pages (numérotées de 0 à 4). Les pages sont appelées comme suit :

```
0-L, 1-E, 2-L, 3-L, 4-E, 1-E, 2-L, 4-L, 0-E, 1-L
```

où L désigne lecture et E écriture. Quelles sont les références mémoire qui provoqueront des défauts de page avec l'algorithme de remplacement LRU (le moins récemment utilisé) ? En déduire le nombre d'écritures disque.

<details>
<summary>Correction (Exam Ratt 2009)</summary>

1) Taille(page) = 4Ko → 12 bits pour le déplacement. @ virtuelle sur 32 bits → 20 bits pour représenter les différentes pages. Ainsi, **2²⁰** entrées possibles pour chaque table de pages.

2)

- a) 430 + 219 = **649**
- b) **Violation mémoire (Défaut de Segment)**
- c) 1327 + 400 = **1727**
- d) **Violation de mémoire**

<!-- TODO: unclear in source, verify against original PDF — question 3's LRU page-fault trace/derivation and question 2's justification for (b)/(d) being violations were not present in the extracted correction text -->

</details>

## Exercice 5 : (examen 01/2009)

Considérez un système de mémoire virtuelle ayant les caractéristiques suivantes :

- Taille d'une page et d'une case est égale à 1 Ko.
- Taille de la mémoire physique (principale) est égale à 32 Mo.
- Taille de la mémoire virtuelle = 512 Mo.
- Utilisation combinée des techniques de pagination et de segmentation : l'espace d'adressage virtuel d'un processus est composé de segments contigus. Chaque segment peut contenir entre 1 et 128 pages. La numérotation des pages d'un segment est relative au segment.
- Utilisation de l'algorithme de remplacement de pages LRU (c-à-d la moins récemment utilisée).

1) Calculez le format d'une adresse virtuelle et le format d'une adresse physique (c-à-d réelle), en spécifiant le nombre de bits réservés pour chaque champ.

2) Supposez un processus de 9 Ko de segment de code et 3 Ko de segment de données. Dans l'espace virtuel du processus, le segment de code est suivi du segment de données. Par conséquent, le segment de code débute à l'adresse 0 alors que celui des données débute à l'adresse 9216 relativement au début de l'espace d'adressage virtuel. Calculez l'adresse qu'occupe en mémoire principale une donnée se trouvant à l'adresse 10728, relative au début de l'espace d'adressage. Le segment de données du processus est chargé au complet en mémoire physique dans les cases contiguës 4096, 4097 et 4098.

3) Considérez la séquence de références de pages de code R = {0, 1, 0, 1, 2, 3, 4, 2, 3, 4, 5, 6, 7, 8} faite par le processus décrit en 2). Les opérandes référés par les instructions dans les pages 0, 1 et 2 se trouvent dans la page 0 du segment de données ; les opérandes des instructions des pages 3, 4 et 5 sont dans la page 1 ; les opérandes des instructions des pages 6, 7 et 8 sont dans la page 2. Supposez que toutes les instructions du processus ont des opérandes qui réfèrent en mémoire. Au départ, 4 cases contiguës sont allouées pour le code du processus à l'adresse X et 2 cases contiguës pour les données du processus à l'adresse Y. Il est à noter que les adresses X et Y ne sont pas nécessairement contiguës, et le chargement des pages dans les cases allouées est réalisé à la demande (aucun chargement préalable). De plus, aucune case supplémentaire n'est allouée au processus durant son exécution.

   a) Représentez l'état d'occupation de la mémoire principale à chaque instant ti (c-à-d t0, t1, t2, …) où une nouvelle page est chargée.
   b) Calculez le nombre de défauts de pages générés par l'algorithme de remplacement de pages LRU. Ce nombre est-il optimal ?

4) **Complémentaire** : Reprendre la question 3) en relâchant l'hypothèse de séparation de zone mémoire code (à l'adresse X) de la zone de mémoire de données (à l'adresse Y), et supposez que 6 cases contiguës seront allouées à tout le processus (code + données) à partir de l'adresse X. Conclure.

<!-- TODO: no correction for Exercice 5 was found in the correction PDF — left as an open exercise -->

## Exercice 6 : (examen 06/2008)

Soit une mémoire segmentée et paginée. Chaque adresse virtuelle comporte un numéro de segment sur 2 bits, un numéro de page sur 2 bits et un déplacement dans la page sur 11 bits.

1) Quelle est la taille d'une page ?
2) Combien de pages au total nécessiterait un programme dont les adresses sont décrites comme précédemment ?
3) Est-ce qu'une mémoire centrale de 32768 mots est largement suffisante pour accueillir un tel programme ? Justifier.

Chaque segment est accédé soit en lecture seulement, soit en lecture-écriture, soit en lecture-exécution, soit encore en lecture-écriture-exécution. On dispose de la table des segments comme suit :

| Segment | Accès | Autres info. |
|---|---|---|
| S0 | Lire seulement | ……… |
| S1 | Lire-exécuter | ……… |
| S2 | Lire-écrire-exécuter | ……… |
| S3 | Lire-écrire | ……… |

4) Expliquer à quoi servent ces protections. A quoi correspondent ces segments d'un processus ?

On dispose également, pour un processus donné, des tables des pages de chaque segment :

<!-- TODO: unclear in source, verify against original PDF — the 4 per-segment page tables (Segment 0-3, page→case mapping, "X" marking absent pages) did not extract in a clean tabular form; reproduced best-effort below -->

| Page | Segment 0 (case) | Segment 1 (case) | Segment 2 (case) | Segment 3 (case) |
|---|---|---|---|---|
| 0 | 9 | X | X | 14 |
| 1 | 3 | 0 | X | 1 |
| 2 | X | 15 | X | 6 |
| 3 | 12 | 8 | X | X |

5) Pour chacun des accès suivants à la mémoire virtuelle, donnez l'adresse physique. Si un défaut de page apparaît, donnez sa nature :

a. Chargement `<S0, P0, 0001>`
b. Chargement `<S3, P3, 2047>`
c. Stockage `<S0, P1, 0004>`
d. Stockage `<S3, P0, 0014>`
e. Saut à l'adresse `<S1, P3, 0100>`
f. Chargement `<S2, P0, 0005>`

<details>
<summary>Correction (Exam Ratt 2008)</summary>

1) Taille(page) = 2¹¹ = 2Ko

2) Chaque segment pointe sur 4 pages. Avec 4 segments (2²), on aura 16 pages en totalité.

3) 32768 = 2¹⁵. Taille_max(prog) = nb_max_pages\*taille(page) = 2⁴\*2¹¹ = 2¹⁵. Donc oui, c'est suffisant, mais pas lorsqu'on charge l'OS avec.

4) Les protections seront utiles pour le remplacement de pages lorsqu'il y a un DP.

- S0 : Segment des constantes (lecture seulement)
- S1 : Segment de code
- S2 : Pile d'exécution
- S3 : Segment de données

5)

- a) @physique = @case 9 + 1 = 9\*(taille_case) + 1 = 9\*2¹¹ + 1
- b) Défaut de page
- c) @physique = @case 3 + 4 = 3\*2¹¹ + 4
- d) @physique = @case 14 + 20 = 14\*2¹¹ + 20
- e) @physique = @case 8 + 256 = 8\*2¹¹ + 256
- f) Défaut de page

N.B. : les déplacements dans les @ virtuelles sont donnés en Hexa, il faut les convertir en décimal dans les @ physiques.

</details>

## Exercice 7 : Remplacement de page (Exam. 01/2007)

L'algorithme de la seconde chance est à la base un algorithme de remplacement FIFO, auquel on ajoute un mécanisme pour éventuellement donner une deuxième chance à la page la plus ancienne. Une variante de l'algorithme de la seconde chance utilise les deux bits de référence (R) et de modification (M). Le bit M (1 pour modifiée, 0 sinon) est associé à chaque demande de page et le bit R (1 pour récemment utilisée, 0 sinon) est manipulé de la façon suivante :

- Mis à 1 au chargement de la page.
- Mis à 1 à chaque nouvel accès de la page.
- Périodiquement mis à 0 par le système.
- Suivant l'implémentation choisie, éventuellement mis à 0 par l'algorithme de la seconde chance.

Les quatre configurations possibles, dans chacune des associations des 2 bits, sont assimilables à des niveaux de priorité (P0 — la plus basse, P1, P2 et P3 — la plus haute). L'algorithme de remplacement choisit la page victime ayant la priorité la plus basse.

1) Si P0 correspond au couple `<0, 0>`, donnez les deux seules associations réalistes (pour un algorithme de remplacement de pages) entre les niveaux (P0, P1, P2 et P3) et les quatre différents couples (dans `<R, M>` ou `<M, R>`).

2) On considère la suite de référence suivante d'un même processus, avec une indication supplémentaire indiquant si la page est modifiée. L (pour une lecture), E (pour une écriture), et "top" indiquant les mises à 0 des bits de référence par le système d'exploitation.

```
(1,L), (2,E), top, (3,L), (4,L), (3,E), (1,L), top, (3,L), (2,E), top, (5,L), (4,L), (3,E)
```

Donnez pour chacune des deux associations possibles la suite des configurations, en supposant que la mémoire est constituée de 3 cases initialement vides. En déduire, dans chaque association, le nombre de défauts de pages et le nombre des écritures disque.

<!-- TODO: no correction for Exercice 7 was found in the correction PDF — left as an open exercise -->

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se2-td-gestion-memoire-correction.pdf" />

</TabItem>
</Tabs>
