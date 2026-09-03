---
sidebar_position: 14
title: "Examen SE&PC — 03/01/2018 (Corrigé)"
sidebar_label: Examen 2017/2018 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# EXAMEN — Systèmes d'exploitation & Programmation Concurrente

*École Nationale des Sciences de l'Informatique — A.U. : 2017/2018 — Classes : II2 — Date : 03/01/2018 — Durée : 2h00 — Documents, calculatrices, et Smartphones non autorisés — Enseignants : F. Najjar, N. Chakchouk, M. Nasri, & A. Channouf*

<!-- TODO: unclear in source, verify against original PDF — the correction document's own header says "Proposition de Correction exam SE&PC 3/01/2017" (a different date than the statement's "03/01/2018"), likely a copy-paste artifact from reusing a prior year's correction template; reproduced as-is, the content clearly answers this exam's own questions -->

*Note : prière de lire attentivement l'énoncé, de respecter les notations du texte ! On demande des réponses concises mais claires et précises.*

## Exercice 1 : Questions diverses (6 points – 1,5+3×1+1,5)

**1)** Dans un algorithme d'ordonnancement MLFQ (Multi-Level Feedback Queues) :

a) dire si un processus termine quand il n'y a plus de processus plus prioritaire.
b) dire si les processus scientifiques ("CPU bound") sont affectés toujours de la plus haute priorité. Justifiez votre réponse.

<details>
<summary>Correction</summary>

a) **Faux**, car un processus peut attendre dans une même FA FCFS/RR d'autres processus de même priorité mais de date d'arrivée différente. (0,75 pt)

b) Bien au contraire, ils démarrent avec une priorité qui se retrouve ensuite baissée jusqu'à une faible priorité si le temps CPU est long, avec différents morcellements. (0,75 pt)

</details>

**2)** A quoi sert le bit de présence dans une table des pages ? Et dire qui s'en sert.

<details>
<summary>Correction</summary>

Le bit de présence (BP) sert à la protection d'accès à une page (présente/absente) en mémoire physique ; la MMU s'en sert : si BP=1 alors générer l'@ physique et puis la transférer sur le bus d'@, sinon défaut de page (DP). (1 pt)

</details>

**3)** Pourquoi a-t-on intérêt à diminuer le nombre de défauts de pages ?

<details>
<summary>Correction</summary>

Les défauts de page engendrent des entrées/sorties qui sont plus coûteuses que les communications MC-Processeur ; ainsi on a intérêt à les diminuer, au moins pour les swaps in, et éviter les swaps out au maximum possible. (1 pt)

</details>

**4)** L'adresse logique peut-elle avoir une taille inférieure à l'adresse physique ? Justifiez votre réponse.

<details>
<summary>Correction</summary>

Jamais ! C'est plutôt supérieure ou égale, car chaque processus en exécution doit avoir son image sur le swap (@ logique). (1 pt)

</details>

**5)** Soit un ordinateur avec un processeur multicœurs. Le processeur contient 4 cœurs 64 bits. La taille de la mémoire physique est de 4 Go. La taille d'une case mémoire est de 8 Ko. Il y a une seule mémoire centrale dans le système. La taille du swap est de 6 Go. Décrivez et calculez ce qui suit :

a) L'espace virtuel adressable par le processeur multi-cœurs.
b) Le nombre de cases mémoire.
c) Le nombre total de pages de la mémoire virtuelle pouvant être allouées sur le système.

<details>
<summary>Correction</summary>

a) → 2^(taille_adresse_mémoire) = **2⁶⁴** (0,5 pt)

b) → Taille_mémoire/taille_page = 4 Go/8Ko = 2³²/2¹³ = **2¹⁹** (0,5 pt)

c) → Taille_swap/taille_page = 6 Go/8 Ko = **3×2¹⁸** (0,5 pt)

</details>

## Exercice 2 : Interblocage (3 points – 1,5+1,5)

*Note : les questions suivantes sont indépendantes.*

**a)** Considérons une vue d'un système disposant de 5 processus (P0-P4) et 3 classes de ressources (R1-R3). Le graphe d'allocation de ressources associé à ce système est donné comme suit :

<!-- TODO: unclear in source, verify against original PDF — the resource-allocation graph itself (page 1 of the exam) did not extract as text/image; only the resulting matrices in the correction below survived -->

1. En donnez les matrices d'allocation et de demandes des ressources. (0,5 pt)
2. Est-ce que ce système est dans un état sécurisant ? Si oui, donnez les séquences d'exécution possibles des processus, sinon en donnez les processus en deadlock. En précisant quel algorithme vous avez appliqué. (1 pt)

<details>
<summary>Correction</summary>

**1)**

| Processus | Allocation (R1 R2 R3) | Demande (R1 R2 R3) |
|---|---|---|
| P0 | 1 0 0 | 0 0 0 |
| P1 | 0 2 0 | 0 2 2 |
| P2 | 0 3 3 | 0 0 0 |
| P3 | 1 2 1 | 0 1 0 |
| P4 | 0 0 2 | 0 0 1 |

Disponible : `<0, 0, 0>` — Existant : `<2, 7, 6>`

**2)** Ce n'est pas un état en deadlock. Il existe plusieurs séquences qui mènent à l'état sain, par ex. :

- P0, P2, P1, P3, P4
- P2, P0, P3, P1, P4
- P2, P1, P4, P3, P0
- P2, P4, P1, P3, P0

</details>

**b)** Les threads `thread_p1`, `thread_p2`, et `thread_p3` d'un même processus s'exécutent en parallèle. Dites si ce processus cause nécessairement un interblocage, ne peut causer un interblocage, ou peut parfois causer un interblocage. Donnez, le cas échéant, un ordonnancement des actions qui mène à un interblocage et un qui parvient à compléter sans interblocage. Un ordonnancement est représenté par la séquence des énoncés (chacun identifié par un `tid_lettre`) exécutés. (1,5 pts)

```c
void *thread_p1(void *arg) {
A:  pthread_mutex_lock(&m2);
B:  pthread_mutex_lock(&m3);
C:  /* do something */
D:  pthread_mutex_unlock(&m3);
E:  pthread_mutex_lock(&m4);
F:  /* do something */
G:  pthread_mutex_unlock(&m4);
H:  pthread_mutex_unlock(&m2);
    return NULL;
}

void *thread_p2(void *arg) {
A:  pthread_mutex_lock(&m4);
B:  pthread_mutex_lock(&m5);
C:  pthread_mutex_lock(&m1);
D:  /* do something */
E:  pthread_mutex_unlock(&m1);
F:  pthread_mutex_unlock(&m5);
G:  pthread_mutex_unlock(&m4);
    return NULL;
}

void *thread_p3(void *arg) {
A:  pthread_mutex_lock(&m1);
B:  pthread_mutex_lock(&m2);
C:  /* do something */
D:  pthread_mutex_unlock(&m2);
E:  pthread_mutex_unlock(&m1);
    return NULL;
}
```

<details>
<summary>Correction</summary>

Il existe beaucoup d'ordonnancements qui ne causeront pas d'interblocage, comme l'exemple trivial `thread_p1 ; thread_p2 ; thread_p3`, soit `tid1.A … tid1.H ; tid2.A … tid2.G ; tid3.A … tid3.E`. (0,75 pt)

Un interblocage se produira si on a, par exemple, la séquence : `tid1.A(m2) ; tid2.A(m4) ; tid2.B(m5) ; tid3.A(m1) ; tid3.B(blocage thread_p3 sur m2) ; tid2.C (blocage de thread_p2 sur m1) ; tid1.B … tid1.E (blocage de thread_p1 sur m4)` → interblocage. D'autres séquences sont possibles là où on a alloué (en possession) un mutex et où on en demande d'autres ! (0,75 pt)

</details>

## Exercice 3 : Synchronisation par pipe (4 points)

On souhaite disposer d'un processus qui crée un fils et un petit-fils et qui se synchronisent par différents pipes selon le schéma comme suit :

*Figure 1 : Synchronisation par différents pipes*

<!-- TODO: unclear in source, verify against original PDF — the T1/T2/T3 pipe topology diagram (Figure 1/2) did not extract as text/image -->

Le père T1 communique des entiers aléatoires à son fils T2 via B1, puis le fils les multiplie par lui-même et ensuite les communique au fils T3 via B2. Enfin T3 effectue le même traitement que T2 et communique ses résultats au grand-père T1.

Écrire le programme C correspondant en bien spécifiant/commentant chaque déclaration/création et utilisation de pipe spécifique au schéma donné en Figure 1.

<details>
<summary>Correction</summary>

```c
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <time.h>
#define MAX 5

char *B3 = "nom_pf"; // pipe nommé

int main(void) {
    // Descripteurs de pipes
    int B1[2], B2[2], d_ecriture, d_lecture;
    int nb, nb_R; // nb_R = nb*nb

    mkfifo(B3, S_IRUSR | S_IWUSR);
    pipe(B1);

    if (fork()) { // Processus père (W(B1), R(B3))
        close(B1[0]);
        for (int i = 0; i < MAX; i++) {
            nb = rand();
            write(B1[1], &nb, sizeof(nb));
        }
        close(B1[1]);

        int d_lecture = open(B3, O_RDONLY);
        int nb_lu;
        while ((nb_lu = read(d_lecture, &nb_R, sizeof(nb_R))) > 0) {
            write(1, &nb_R, sizeof(nb_R));
        }
        wait(NULL);
    } else { // Je suis le processus fils (R(B1), W(B2))
        pipe(B2);
        if (fork()) {
            close(B1[1]);
            close(B2[0]);
            int nb_lu;
            while ((nb_lu = read(B1[0], &nb, sizeof(nb))) > 0) {
                nb_R = nb * nb;
                write(B2[1], &nb_R, sizeof(nb_R));
            }
            close(B1[0]);
            close(B2[1]);
            wait(NULL);
        } else { /* Je suis le petit-fils (R(B2), W(B3)) */
            close(B2[1]);
            int nb_lu;
            while ((nb_lu = read(B2[0], &nb, sizeof(nb))) > 0) {
                nb_R = nb * nb;
                d_ecriture = open(B3, O_WRONLY);
                write(d_ecriture, &nb_R, sizeof(nb_R));
            }
            close(B2[0]);
            close(d_ecriture);
        }
        exit(0);
    }
}
```

<!-- TODO: unclear in source, verify against original PDF — the raw OCR of this solution has several apparent typos (e.g. "write(B1[1], nb, sizeof(nb))" missing the & on nb, "close(d_lecture)" appearing where "close(d_ecriture)" seems intended, mixed-case "Nb_R"/"nb_R"); this transcription applies the minimal fixes needed for the code to compile/make sense (adding & to scalar args passed to read/write, consistent nb_R casing) while preserving the original structure and comments -- flagged rather than silently passed through with compile errors, since faithful transcription of clearly broken OCR'd code would not serve as a usable reference -->

</details>

## Exercice 4 : Translation d'adresse (3 points – 1,5+1,5)

On considère une machine avec une mémoire physique pouvant contenir (en plus du SE) 12 cases de 4Ko. Deux processus P1 et P2 sont chargés en mémoire. Les tables des pages pour ces deux processus sont données (non reproduites ici — voir PDF), où la ligne état contient des bits décrivant l'état de la page :

- **R** : page accessible en lecture seule ;
- **RW** : page accessible en lecture et écriture ;
- **N** : page invalide et non allouée ;
- **S** : page invalide en zone de swap (sur le disque) — dans ce cas le numéro de case indique le numéro du bloc (sur le disque) contenant la page (en réalité ce numéro de bloc figure dans une autre table).

Toutes les pages au-delà de la 9 ont un bit N.

**a)** Indiquez sur un schéma le contenu de chacune des 12 cases de la mémoire physique (c-à-d les pages qu'elles contiennent). Quelles cases sont partagées ? Quelle peut être leur utilité ? Comment interprétez-vous leurs bits d'état ? Quelles cases sont libres ? (1,5 pts)

**b)** Traduire les adresses virtuelles suivantes en adresses physiques (indiquées en hexadécimal) :

a) Pour le processus P1 : `0x44EF`, `0x83CC` et `0x700B` (0,75 pts)
b) Pour le processus P2 : `0x44EF`, `0x83CC` et `0x700B` (0,75 pts)

<details>
<summary>Correction</summary>

**a)**

| Case | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Page | P26 | P17 | P10/P20 | P11/P21 | P12/P22 | — | P14 | P15 | P24 | P25 | P27 | P28 |

Les pages 2, 3, 4 sont partagées par les deux processus P1 et P2 ; comme l'état indique R, c'est-à-dire que c'est la partie code qui est partagée en lecture seule. La case libre est la case 5.

**b)**

Taille(page) = 4Ko (2¹²) → 12 bits pour le déplacement, c-à-d 3 chiffres hexadécimaux.

Pour P1 :

| @virtuelle P1 | 0x44EF | 0x83CC | 0x700B |
|---|---|---|---|
| @Physique P1 | 0x64EF | DP | 0x100B |

Pour P2 :

| @virtuelle P2 | 0x44EF | 0x83CC | 0x700B |
|---|---|---|---|
| @Physique P2 | 0x84EF | 0xB3CC | 0xA00B |

</details>

## Exercice 5 : Algorithmes de remplacement de page (4 points – 1+2+1)

On s'intéresse à l'algorithme de remplacement horloge (ou encore appelé de seconde chance), qui est une amélioration de FIFO avec un bit de référence R, décrit comme suit :

- Le bit R est mis à 1 au premier chargement dans la mémoire, ou encore à chaque référencement.
- Lors du remplacement de page, on sélectionne la page la plus ancienne :
  - Si R=0, cette page est choisie comme victime.
  - Si R=1, alors R est remis à 0 et cette page est déplacée en fin de la liste (elle devient jeune comme si elle venait d'être chargée), et la recherche continue jusqu'à trouver une page ayant le bit R à 0, qui sera retirée.

On souhaite appliquer cet algorithme de remplacement dans un cache capable de contenir 5 pages, et on suppose que le gestionnaire de mémoire accède successivement aux pages suivantes :

```
7, 1, 8, 2, 3, 1, 6, 1, 2, 7, 3, 5, 6
```

Initialement, le cache est vide.

**1)** Déroulez l'algorithme de remplacement FIFO sur cette séquence de pages. En déduire le nombre de défauts de pages. (1 pt)

**2)** Déroulez l'algorithme de remplacement horloge sur cette séquence de pages et indiquez la valeur du bit de référence. En déduire le nombre de défauts de pages et puis le comparer avec FIFO. (1,5 pt)

**3)** Quel est le nombre de défauts de page minimal sur cet exemple, ainsi que le nombre d'entrées-sorties ? Justifiez sans dérouler l'algorithme optimal.

<details>
<summary>Correction</summary>

**1)** FIFO → **8 DP** (défauts de page).

<!-- TODO: unclear in source, verify against original PDF — the per-cache-line FIFO trace table (C1-C5 across the 13 accesses) extracted as fragmented cell content that could not be reliably reconstructed; only the final count (8 DP) is reproduced with confidence -->

**2)** Total de défauts de pages (horloge) : **8** → 8 ≤ #E/S ≤ 11 (5 chargements + 2×3 remplacements)

<!-- TODO: unclear in source, verify against original PDF — same issue as (1): the per-access trace table with R-bit values did not extract cleanly -->

**3)** Total de défauts de pages (optimal) : **7**, qui n'est autre que le nombre de pages référencées dans la séquence (1-3, 5-8).

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se2-exam-sepc-2018-correction.pdf" />

</TabItem>
</Tabs>
