---
sidebar_position: 4
title: "Devoir Surveillé SE&PC — 16/11/2018 (Corrigé)"
sidebar_label: DS 2018 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Devoir Surveillé — Systèmes d'Exploitation & Programmation Concurrente

*École Nationale des Sciences de l'Informatique — A.U. : 2018/2019 — Classes : II2 — Date : 16/11/2018 — Durée : 2h00 — Documents non autorisés — Enseignants : F. Najjar, N. Chakchouk, H. Elhedhili & Y. Kadri*

*Note : on demande des réponses brèves mais claires, précises et concises (Correction sur 21 ! 1 point en plus pour exercice 3 ordonnancement)*

## Exercice 0 : Question de cours (1 point)

Dans un contexte de concurrence interprocessus, dire en quoi consiste le problème de famine (starvation). Précisez la différence avec l'interblocage (deadlock).

<details>
<summary>Correction</summary>

Le problème de famine apparaît quand des processus (faible priorité) attendent infiniment une ressource partagée sans pouvoir y accéder ! Alors que l'interblocage bloque tous les processus concernés et ceux-ci ne peuvent jamais avancer.

</details>

## Exercice 1 : Fork (3 points – 1+1+1)

On considère le code C suivant :

```c
#include <unistd.h>
#include <stdio.h>
#include <sys/types.h>

int main() {
    int i;
    for (i = 0; i < 4; i++)
        if (fork()) break;
    printf("Mon nom est <%c>", 'A' + i);
    return (EXIT_SUCCESS);
}
```

**1)** Donnez l'arborescence des processus engendrés par ce programme.

<details>
<summary>Correction</summary>

Arborescence linéaire selon les valeurs de `i` au moment où chaque `fork` "casse" la boucle :

```
i=0 → P1 → i=1 → P11 → i=2 → P111 → i=3 → P1111 → i=4 → P11111
```

(1 pt)

</details>

**2)** *(question 2 dans l'énoncé — voir arborescence ci-dessus, reprise/complétée par la question 1 dans le corrigé)*

**3)** Quel affichage possible peut engendrer l'exécution de ce programme ?

<details>
<summary>Correction</summary>

```
Mon nom est <A>
Mon nom est <B>
Mon nom est <C>
Mon nom est <D>
Mon nom est <E>
```

(1 pt)

</details>

**4)** Modifiez ce programme de façon à ce que les processus fassent leur affichage par ordre alphabétique inversé du nom.

<details>
<summary>Correction (1 pt)</summary>

```c
#include <unistd.h>
#include <stdio.h>
#include <sys/types.h>

int main() {
    int i;
    for (i = 0; i < 4; i++)
        if (fork()) break;
    wait(NULL);
    printf("Mon nom est <%c>", 'A' + i);
    return (EXIT_SUCCESS);
}
```

</details>

## Exercice 2 : Concurrence et synchronisation (4 points – 0,75+0,75+1+1,5)

Soient les deux processus PA et PB partageant une variable `k` initialisée comme suit :

```c
public int k = 1;
```

**Processus PA**

```c
int main() {
    int i;
    1. i = k;
    2. i = i + 1;
    3. k = i;
    4. printf("PA avec k=%d\n", k);
    ...
}
```

**Processus PB**

```c
int main() {
    int j;
    1. j = k;
    2. j = j + 4;
    3. k = j;
    4. printf("PB avec k =%d\n", k);
    ...
}
```

**1)** Rappelez (en général) quand peut-on avoir des résultats corrects d'exécution concurrente (entrelacée) de deux processus ?

<details>
<summary>Correction</summary>

Les résultats corrects de PA//PB sont compris dans soit les résultats de PA;PB, ou PB;PA, c'est-à-dire PA avec k=2, PB avec k=6 (2,6) ou encore PB avec k=5, PA avec k=6 (5,6). Conséquemment, k=6. (0,75 pt)

</details>

**2)** Les résultats suivants sont-ils possibles ? Corrects ? Justifiez vos réponses.

| | PA | PB |
|---|---|---|
| R1 | avec k=2 | avec k=2 |
| R2 | avec k=2 | avec k=6 |
| R3 | avec k=5 | avec k=2 |

<details>
<summary>Correction</summary>

- **R1 (2,2)** : possible et non correcte. Exécution de PA1;PA2;PA3;PA4;PB1;PB2;PB3;PB4. (2,2) est différent des (2,6) et (5,6). (0,25 pt)
- **R2 (2,6)** : possible et correcte, car équivalente à PA;PB. (0,25 pt)
- **R3 (5,2)** *(lu "5,2" par la correction, correspondant au R3 de l'énoncé)* : non possible et non correcte, car k est incrémentée et donc la 2ème valeur est supérieure ou égale ! (0,25 pt)

</details>

**3)** En donnez, dans chaque cas, un entrelacement d'exécution des deux processus qui génère une réponse qui soit :

a) possible et correcte.
b) possible et non correcte.

<details>
<summary>Correction</summary>

a) PB;PA → (5,6) possible et correcte. (0,5 pt)

b) (5,5), c-à-d PA1;PA2;PA3;PB1;PB2;PB3;PB4;PA4. (6,6), c-à-d PB1;PB2;PB3;PA1;PA2;PA3;PA4;PB4. (0,5 pt)

</details>

**4)** Afin de garantir tout le temps des résultats corrects, que peut-on proposer ? Modifiez le code des processus PA et PB et précisez vos variables partagées (avec initialisation).

<details>
<summary>Correction</summary>

```c
public int k = 1;
public semaphore Mutex = 1;   // 0,5 pt
```

**Processus PA**

```c
int main() {
    int i;
    P(Mutex);                          // 0,5 pt (P et V)
    i = k;
    i = i + 1;
    k = i;
    printf("PA avec k=%d\n", k);
    V(Mutex);
    ...
}
```

**Processus PB**

```c
int main() {
    int j;
    P(Mutex);                          // 0,5 pt (P et V)
    j = k;
    j = j + 4;
    k = j;
    printf("PB avec k =%d\n", k);
    V(Mutex);
    ...
}
```

Remarque : la SC contient un `read` sur k (`i=k`), un `write` sur k (`k=i`) et enfin un `read` sur k (`printf(…k);`). En conséquence, `V(Mutex)` doit être placé après le `printf` pour ne pas avoir (6,6), qui est différent des deux résultats corrects (2,6) et (5,6) !!

</details>

## Exercice 3 : Ordonnancement (6 points – 1+1,5(+0,75 en plus)+2,5(+0,25 en plus)+1)

On considère l'ensemble des processus suivants :

| Processus | Date d'arrivée | Temps estimé (TE) | Priorité |
|---|---|---|---|
| P1 | 7h00 | 10mn | 2 |
| P2 | 7h00 | 15mn | 3 |
| P3 | 7h03 | 8mn | 4 |
| P4 | 7h10 | 18mn | 5 |

**1)** Les algorithmes d'ordonnancement basés sur des priorités peuvent-ils engendrer le problème de famine des processus à faible priorité ? Comment peut-on éviter ce problème ?

<details>
<summary>Correction</summary>

Par vieillissement (« aging ») de l'ordonnancement, pour avoir périodiquement une équité. (1 pt)

</details>

**2)** On suppose qu'on utilise un algorithme d'ordonnancement basé sur la priorité (la plus grande valeur signifie la plus haute priorité). Donnez le diagramme de Gantt pour l'ordonnancement priorité (statique) avec préemption. En déduire le temps de réponse de chaque processus et le temps de réponse moyen.

<details>
<summary>Correction</summary>

Diagramme de Gantt (transitions, en minutes depuis 7h00) : `0—P2—3—P3—10—P4—28—P3—29—P2—41—P1—51` (1,5 pt — 0,25/transition)

| Processus | Temps de réponse (TR) |
|---|---|
| P1 | 51mn |
| P2 | 41mn |
| P3 | 26mn |
| P4 | 18mn |

TR moyen = (51+41+26+18)/4 = **40mn** (0,75 pt)

</details>

**3)** On souhaite maintenant que la priorité des processus soit dynamique au cours du temps. Ainsi, pour calculer la priorité d'un processus, on utilise la formule suivante :

```
Priorité = (T_Att + TE_Restant) / TE
```

où :

- `T_Att` correspond au temps d'attente d'un processus depuis sa dernière exécution.
- `TE_Restant = TE − Temps d'exécution courant`.

Avec les hypothèses suivantes :

- Au démarrage, les priorités des processus sont égales à leurs priorités statiques initiales (indiquées dans le tableau).
- Les priorités sont recalculées toutes les 5mn. Pour les autres temps, on prend la priorité précédente.
- Lors des calculs des priorités, on arrondit comme suit : si E(2X)=2E(X) alors E(X), sinon E(X)+1, où E est la fonction partie entière.
- En cas d'égalité des priorités, on choisit le processus qui attend depuis le plus longtemps.

a) Donnez le diagramme de Gantt de l'ordonnancement préemptif des processus par priorité dynamique en précisant l'évolution des priorités des différents processus. En déduire le temps de réponse de chaque processus et le temps de réponse moyen.

<details>
<summary>Correction (2,75 pt — 1,25 tableau (8×0,125+0,25) + 1,5 D. Gantt (13 transitions × 0,115))</summary>

Évolution des priorités (best-effort reconstruction du tableau OCR) :

| Processus | Tcpu | Prio init | t=5 | t=10 | t=15 | t=20 | t=25 | t=30 | t=35 | t=40 | t=45 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P1 | 10 | 2 | 2 | 1 | 1 | 2 | 2 | — | | | |
| P2 | 15 | 3 | 1 | 1 | 2 | 0 | 1 | 1 | 1 | 0 | 0 |
| P3 | 8 | 4 | 1 | 1 | 2 | 3 | 0 | 1 | 1 | 2 | — |
| P4 | 18 | 5 | — | 5 | 1 | 1 | 1 | 2 | 0 | 1 | 0 |

Diagramme de Gantt (transitions) : `0-P2-3-P3-5-P1-10-P4-15-P2-20-P3-25-P1-30-P4-35-P2-40-P3-41-P4-45-P2-47-P4-51`

<!-- TODO: unclear in source, verify against original PDF — the priority-evolution table above is a best-effort reconstruction of a badly OCR'd source table; several cells (marked "--" or "—") were ambiguous or missing in the extraction. The final TR/TR-moyen values for this sub-question were also not present in the extracted correction text. -->

</details>

b) Ce procédé permet-il de résoudre le problème de famine ? Expliquer.

<!-- TODO: no correction text was found for this sub-question -->

## Exercice 4 : Synchronisation du problème H2O (6 points – 1,5+2+1+1,5)

On souhaite pratiquer les problèmes de synchronisation, vus en cours, dans la chimie. Comme exemple classique, on prend une molécule d'eau, qui est formée de 2 atomes d'hydrogène (H2) et un atome d'oxygène (O). On souhaite écrire du code qui profite d'une synchronisation interprocessus à base de sémaphores pour le problème de construction de molécules d'eau (H2O). La solution à proposer doit modéliser la récupération en même temps de deux atomes H (H2) et un atome O afin de créer une molécule H2O.

**1)** Identifiez et donnez les différents processus en synchronisation. A quel(s) type(s) de problème(s) de synchronisation appartient-il ? Expliquez brièvement.

<details>
<summary>Correction (1,5 pt)</summary>

Schéma : `H →` et `H →` convergent avec `O →` pour former `H2O`.

Problème de Producteurs/consommateurs et RDV :

- **Solution 1** : 3 classes de processus dont 1 classe Hydrogène, 1 classe Oxygène et une 3ème classe H2O. En d'autres termes, 3 producteurs (H2+O) et un consommateur (H2O), et RDV entre 3 processus H, H et O.
- **Solution 2** : 2 classes de processus dont 1 classe Hydrogène, 1 classe OxyReady avec combinaison H2O. En d'autres termes, 2 producteurs H et H et un consommateur O, et RDV entre 2 H.

</details>

**2)** En indication, on propose d'utiliser (au moins) les variables globales suivantes :

```c
Semaphore Hyd, Oxy; // obligatoires
// Hyd sert à marquer la présence d'un atome H
// Oxy sert à marquer la présence d'un atome O
```

a) Donnez les valeurs initiales de ces variables. Justifiez.

<details>
<summary>Correction</summary>

`Semaphore Hyd = Oxy = 0;` // Sémaphore de blocage pour RDV et P/C (0,5 pt)

</details>

b) Écrire les différents codes C correspondant à la formation des molécules d'eau.

<details>
<summary>Correction (0,75+0,75 pt)</summary>

```c
Hydrogene() {
    While (True) {
        V(Oxy);  // Producteur de H
        P(Hyd);  // RDV avec un 2nd H
        makeWater(); // H2O
        V(Hyd);
    }
}

OxyReady() {
    While (True) {
        P(Oxy);  // Cons. de H
        P(Oxy);  // Cons. du 2nd H
        V(Hyd);
    }
}
```

<!-- TODO: unclear in source, verify against original PDF — the raw extracted text interleaves the Hydrogene() and OxyReady() bodies (the correction PDF likely lays them out as two side-by-side columns); the split above is a best-effort reconstruction based on the comments ("Producteur de H" for Hydrogene, "Cons. de H" for OxyReady) — verify against original PDF -->

</details>

**3)** Déroulez l'exécution du scénario suivant : deux H arrivent l'un après l'autre puis deux O arrivent en même temps (c-à-d H1(1); H2(2); O1(3); O2(3); … avec Xi(t) signifiant l'atome X (dans {H, O}) de numéro i, arrivé au temps t). Conclure.

<details>
<summary>Correction (1 pt)</summary>

*(en anglais dans le corrigé original)* This is dangerous, since it may lead to starvation. If two H's arrive, then the value of the Oxy semaphore will be 2. If two O's arrive, then they can each decrement Oxy, before either can decrement it twice. So no water is made, even though enough atoms have arrived!!

</details>

**4)** Afin d'éviter le problème de famine, modifiez la solution proposée par le rajout d'un autre sémaphore en précisant son initialisation.

<details>
<summary>Correction (1,5 pt)</summary>

*(en anglais dans le corrigé original)* The fix is to put a lock acquire before the first line in OxyReady, and a lock release after the two V(Hyd)'s. This way, only one oxygen looks for waiting H's at a time — if there aren't enough H's for the first oxygen, there won't be enough for any of the later oxygens either.

```c
Semaphore Hyd = Oxy = 0;  // Sémaphore de blocage pour RDV et P/C
Semaphore Mutex = 1;      // Exclusion mutuelle sur attente de 2 H — 0,5 pt

Hydrogene() {
    While (True) {
        V(Oxy);  // Producteur de H
        P(Hyd);  // RDV avec un 2nd H
        makeWater(); // H2O
        V(Hyd);
    }
}

OxyReady() {
    While (True) {
        P(Mutex);
        P(Oxy);  // Cons. de H
        P(Oxy);  // Cons. du 2nd H
        V(Hyd);
        V(Mutex);
    }
}
```

<!-- TODO: unclear in source, verify against original PDF — same column-interleaving issue as question 2b affects this final code block's exact line placement; reconstructed best-effort, verify against original PDF -->

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se2-ds-sepc-2018-correction.pdf" />

</TabItem>
</Tabs>
