---
sidebar_position: 3
title: "TD : Synchronisation Inter Processus (avec corrigé)"
sidebar_label: TD - IPC / Synchronisation
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD : Synchronisation Inter Processus

*École Nationale des Sciences de l'Informatique — Niveau : II-2 — Module : Systèmes d'exploitation et programmation concurrente*

<!-- TODO: unclear in source, verify against original PDF — the correction PDF's exercise numbering (Ex1, Ex2, Ex3, EX5, EX6, Ex7) does not line up one-to-one with the statement's I.1-I.7 numbering. Corrections have been matched to statement exercises by content below (Ex1→I.1, Ex2→I.2, EX5→I.4, EX6→I.5, Ex7→I.6). No correction was found for I.3 or I.7. An extra correction labeled "Ex3" (producteurs/consommateurs, diffusion atomique) does not match any exercise in this statement PDF and is appended at the end, unmatched — it may belong to a different version of this TD. -->

## Partie I : Sémaphores

### Exercice I.1 — Exclusion mutuelle

Soient trois processus concurrents P1, P2 et P3 qui partagent les variables `n` et `out`. Pour contrôler les accès aux variables partagées, un programmeur propose les codes suivants :

<!-- TODO: unclear in source, verify against original PDF — the proposed P1/P2/P3 code listing (using mutex1/mutex2) did not extract as text -->

1) Cette proposition est-elle correcte ? Sinon indiquez au moins une condition de section critique qui n'est pas satisfaite.
2) Proposer une solution correcte.

<details>
<summary>Correction</summary>

Une bonne solution pour la SC doit vérifier :

- un seul processus en SC
- avancement et absence de blocage : un processus hors de sa section critique ne doit pas bloquer un autre processus d'entrer en SC
- attente bornée : pas de famine

**1)** Solution incorrecte : avancement non vérifié. Exemple : P2 en SC, P1 bloqué sur `P(mutex2)` => P1 bloque P3 alors qu'il n'est pas dans sa SC.

**2)** On garde le même code pour P2 et P3. Pour P1 :

```c
p(mutex1); n = n - 1; v(mutex1);
P(mutex2); out = out + 1; v(mutex2);
```

</details>

### Exercice I.2 — Partage d'imprimantes

Un ensemble de N (N > 4) processus partagent 3 imprimantes LP0, LP1, LP2. Pour éviter de mélanger les lignes sorties de chaque processus, le processus Pi doit réserver l'imprimante avant de l'utiliser. Pour connaître l'état de chaque imprimante il y a une variable globale `int LP[3]`. Les codes des deux fonctions `prendre()` et `liberer()` sont comme suit :

<!-- TODO: unclear in source, verify against original PDF — the initial (incomplete) prendre()/liberer() skeleton code did not extract as text; only the completed correction below survived -->

En utilisant 2 sémaphores, complétez `prendre()` et `liberer()` pour synchroniser entre les N processus.

<details>
<summary>Correction</summary>

```c
int LP[3] = {0, 0, 0}; // si LP[i]=0 alors l'imprimante n°i est libre
semaphore impr = 3;
semaphore mutex = 1; // protéger LP des accès multiples

int prendre() {
    int i = 0;
    p(impr); // si toutes les imprimantes sont utilisées, se bloquer
    p(mutex); // protéger LP des accès multiples
    while (i < 3) {
        if (LP[i] == 0) { LP[i] = getpid(); return i; }
        ++i;
    }
    if (i == 3) return -1;
    v(mutex);
}

int liberer(int i) {
    p(mutex);
    LP[i] = 0;
    v(mutex);
    v(impr);
}
```

</details>

### Exercice I.3 — Synchronisation avec des sémaphores

On dispose de 3 processus P1, P2 et P3 qui sont lancés au même instant. Le but est de contrôler l'ordonnancement des actions des processus P1, P2 et P3. Pour cela on dispose d'un langage de spécification comportant les opérations de concaténation séquentielle `.`, de répétitions `*`, de choix exclusif `+` et de mise en parallèle `//`. Les processus P1, P2 et P3 exécutent le code suivant :

```c
Processus Px() /* les codes sont différents pour P1, P2, et P3 */
{
    while (true) { prologuex; Ax; epiloguex; } /* les actions Ax ne sont pas forcément atomiques */
}
```

Donnez pour la spécification suivante :

```
((A1.A2) + (A2.A1))*    soit par exemple : A1.A2. A1.A2. A2.A1 etc.
```

les sémaphores correspondants (à initialiser) et les codes des `prologuex`, `epiloguex` pour chaque processus.

<!-- TODO: no correction for Exercice I.3 was found in the correction PDF — left as an open exercise -->

### Exercice I.4 — Lavomatique

Dans un lavomatique, on cherche une solution pour permettre de répartir les machines à laver équitablement entre les clients. Considérez le programme suivant : pour obtenir une machine, chaque client doit utiliser la fonction `allouer()`. Après usage de la machine, il doit utiliser `liberer()`.

<!-- TODO: unclear in source, verify against original PDF — the initial (buggy) allouer()/liberer() code shown before the fix did not extract as text; only the corrected version below survived -->

1) Ce programme présente une condition de compétition, laquelle ? Pourquoi ?
2) Comment corriger cette solution ?

<details>
<summary>Correction (DS 11/2007)</summary>

1) Deux processus peuvent obtenir la même machine. Exemple : commutation avant `dispo[i]=0;`
2) Solution : ajouter un verrou (sémaphore) avant `for` ou dans la boucle `for`.

```c
#define NMACHINES 5

Semaphore nlibre = 5;
int dispo[NMACHINES] = (1, 1, 1, 1, 1);
Semaphore mutex = 1;

Allouer() {
    int i;
    P(nlibre);
    for (i = 0; i < NMACHINES; i++)
        p(mutex);
        if (dispo[i] != 0) {
            dispo[i] = 0;
            v(mutex);
            return i;
        }
}

liberer(int machine) {
    P(mutex);
    dispo[machine] = 1;
    v(mutex);
    V(nlibre);
}
```

<!-- TODO: unclear in source, verify against original PDF — the correction's Allouer() has "for (...) p(mutex);" on separate lines with no braces around the loop body, which as transcribed doesn't compile correctly (the if-block would only run once, outside the loop); reproduced verbatim from the OCR'd source rather than silently restructured -->

</details>

### Exercice I.5 — Le pont

Un pont supporte une charge maximale de 15 tonnes. Ce pont est traversé par des camions dont le poids est de 15 tonnes ainsi que par des voitures dont le poids est de 5 tonnes. On vous demande de gérer l'accès au pont de sorte que :

- La charge maximale du pont soit respectée.
- La priorité doit être donnée aux voitures : lorsqu'une voiture et un camion demandent l'accès au pont, la voiture doit être choisie en priorité, sous réserve, bien sûr, que la capacité maximale du pont soit respectée.

1) Dire à quel type de problèmes classiques appartient ce problème ?
2) Proposez un schéma de synchronisation des processus camion et voiture en utilisant les sémaphores.

<details>
<summary>Correction</summary>

1) Problème des lecteurs/rédacteurs avec priorité des lecteurs. Rédacteur = 1 seul camion ; lecteurs = 3 voitures.

2)

```c
semaphore voit = 3;
semaphore cam = 1;
semaphore mutexvoit = 1;
semaphore mutexprio = 1; // pour la priorité des voitures par rapport aux camions
int nbvoit = 0; // nécessaire pour pouvoir réveiller un camion si le nombre de voitures devient 0

processus voiture() {
    p(voit); // s'il y a déjà 3 voitures, se bloquer
    p(mutexvoit); // protège la variable nbvoitures
    nbvoit++;
    if (nbvoit == 1) // la première voiture arrive : elle peut trouver un camion ou non
    {
        p(cam); // bloquer les camions (s'il n'y a pas encore de camions) ou se bloquer
    }
    v(mutexvoit);
    Traverser_pont();
    p(mutexvoit);
    nbvoit--;
    if (nbvoit == 0) v(cam);
    v(mutexvoit);
    v(voit);
}

processus camion() {
    p(mutexprio); // priorité des voitures : les camions traversent deux barrières (2 sémaphores)
    p(cam);
    Traverser_pont();
    v(cam);
    v(mutexprio);
}
```

</details>

### Exercice I.6

Soient les 3 processus suivants :

<!-- TODO: unclear in source, verify against original PDF — the "3 processus suivants" code/diagram for this exercise did not extract as text -->

Proposez un schéma de synchronisation de ces trois processus en utilisant des sémaphores dans chacun des cas suivants :

1) Les actions Ai ne doivent jamais être simultanées.
2) Les actions Ai ne doivent jamais être simultanées et doivent se dérouler toujours dans l'ordre A1 A2 A3 A1 A2 A3...
3) Les actions Ai ne doivent jamais être simultanées et doivent se dérouler toujours dans l'ordre A1 (A2 ou A3) A1 (A2 ou A3)...

N.B. Déclarez clairement vos sémaphores et bien précisez leurs valeurs initiales.

<details>
<summary>Correction (DS 11/2005)</summary>

**1)**

```c
semaphore mutex = 1;

processus pi() // i = 1, 2, 3
debut
    cycle
        p(mutex)
        Ai
        v(mutex)
    fincycle
```

**2)**

```c
semaphore mutex1 = 1, mutex2 = 0, mutex3 = 0;

P1
debut
    cycle
        p(mutex1)
        Ai
        v(mutex2)
    fincycle

P3
debut
    cycle
        p(mutex3)
        Ai
        v(mutex1)
    fincycle
```

<!-- TODO: unclear in source, verify against original PDF — the P2 block of this answer (2) was not present in the extracted text, only P1 and P3 -->

**3)**

```c
semaphore mutex1 = 1, mutex23 = 1;

P1
debut
    cycle
        p(mutex1)
        Ai
        v(mutex23)
    fincycle

P2
debut
    cycle
        p(mutex23)
        Ai
        v(mutex1)
    fincycle

P3
debut
    cycle
        p(mutex23)
        Ai
        v(mutex1)
    fincycle
```

<!-- TODO: unclear in source, verify against original PDF — the extracted text for this last block was garbled ("P2P3debut debut cycle cycle p(mutex23) ..."); reconstructed above as P2 and P3 both waiting on mutex23 and signalling mutex1, matching the stated ordering A1(A2 ou A3); verify against original PDF -->

</details>

### Exercice I.7 — Stade d'athlétisme

Un stade d'athlétisme peut recevoir les athlètes de trois (3) clubs A, B et C qui viennent s'y entraîner. Pour organiser les entraînements, on impose la règle suivante : à un instant donné, le stade peut recevoir un nombre quelconque d'athlètes mais de deux clubs au maximum. Par exemple, 5 athlètes du club B et 3 athlètes du Club C peuvent s'entraîner en même temps, mais si un athlète du club A veut accéder au stade, il doit attendre jusqu'à ce que tous les athlètes aient quitté le stade, soit du club B soit du club C.

1) On vous demande de proposer un schéma de synchronisation des processus : Processus A, Processus B et Processus C correspondant respectivement à des athlètes des clubs A, B et C, et ce en utilisant des sémaphores. Déclarez clairement vos variables et précisez leurs initialisations.
2) La solution proposée dans 1) présente-t-elle un risque de famine ? Justifier votre réponse.

<!-- TODO: no correction for Exercice I.7 was found in the correction PDF — left as an open exercise -->

## Exercice non identifié — Producteurs/consommateurs (diffusion atomique)

<!-- TODO: unclear in source, verify against original PDF — this correction (labeled "Ex3" in the correction PDF) does not match any exercise statement present in TD-IPC.pdf; it may belong to a different/older version of this TD. Reproduced here for completeness, unmatched to a statement. -->

<details>
<summary>Correction — Ex3 (prod/cons, diffusion atomique)</summary>

```c
#define M 100 // taille du tampon d'objets
#define n 50  // nombre de consommateurs
objet tampon[M]; // on suppose que pour chaque objet, il y a une variable nbcons=n (nombre de consommateurs)
semaphore mutex = 1; // protéger l'accès au tampon
semaphore plein[n] = {0}; // 1 semaphore par consommateur
semaphore vide = M; // indique le nombre de cases vides

Producteur() {
    objet obj;
    int k, j = 0;
    while (1) {
        obj = produire_objet();
        p(vide); // s'il n'y a pas de case vide, se bloquer
        p(mutex); // protéger l'accès au tampon
        tampon[j] = obj; // remplir les cases dans l'ordre, recommencer si on arrive à la fin
        v(mutex);
        j = (j + 1) mod M;
        for (k = 0; k < n; k++)
            v(plein[k]); // avertir tous les consommateurs
    }
}

consommateurCk(int k) {
    int i = 0; // pour sauvegarder l'indice de l'objet à consommer la prochaine fois
    // la consommation se fait dans l'ordre, recommencer si on arrive à la fin
    while (1) {
        p(plein[k]); // s'il n'y a pas de case à consommer concernant k, se bloquer
        p(mutex);
        tampon[i].nbcons--;
        if (tampon[i].nbcons == 0) v(vide); // si tous les consommateurs ont consommé l'objet, déclarer l'existence d'une case vide
        v(mutex);
        i = (i + 1) mod M; // on calcule le prochain indice de l'objet à consommer
        // Ainsi, un consommateur ne peut pas consommer le même objet plusieurs fois, même s'il recommence à partir de la première case
        // (alors que certains ne l'ont pas encore consommé) car il sera bloqué au niveau de son sémaphore plein[k].
    }
}
```

<!-- TODO: unclear in source, verify against original PDF — the correction's Producteur() shows "p(mutex)" appearing twice in a row before "tampon[j]=obj" (once, then "j=(j+1)mod M" appears after a second p(mutex) call in the raw OCR); transcribed above with a single p(mutex)/v(mutex) pair based on best-effort reconstruction of the surrounding logic — verify against the original PDF page -->

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se2-td-ipc-correction.pdf" />

</TabItem>
</Tabs>
