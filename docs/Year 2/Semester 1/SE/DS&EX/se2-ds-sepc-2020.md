---
sidebar_position: 2
title: "Notes de correction du DS 2020"
sidebar_label: DS 2020 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Notes de correction du DS 2020

*Systèmes d'exploitation & Programmation concurrente — ENSI*

<!-- TODO: unclear in source, verify against original PDF — this source PDF (DS_SEPC_2020.pdf) is a "Notes de correction" document that embeds both statements and answers inline; it starts directly at "Exercice 2" (no Exercice 1 text was present in the extracted content), and its own numbering repeats "Exercice 3" twice (once for "Gestion de processus", once for "Synchronisation par sémaphores") — reproduced verbatim as in the source rather than renumbered. -->

## Exercice 2 : Exclusion mutuelle (3 points)

Considérons deux processus concurrents P1 et P2 qui utilisent un vecteur `blocked` de deux booléens et un entier `turn`. A l'initialisation, on a : `blocked[0]=FAUX ; blocked[1]=FAUX ; turn = 0`.

```
Processus Pi() // (i=0 ou 1)
{
    While (true) {
        blocked[i] = VRAI;
        while (turn != i) {
            While (blocked[1-i]);
            turn = i;
        }
        // section critique
        blocked[i] = FAUX;
        // section non critique
    }
}
```

**1.** Rappeler les conditions qu'une bonne solution au problème de l'exclusion mutuelle doit satisfaire.

<details>
<summary>Correction</summary>

1. Exclusion mutuelle
2. Avancement
3. Attente bornée

</details>

**2.** Montrer que cette solution au problème de l'exclusion mutuelle est incorrecte.

<details>
<summary>Correction</summary>

Supposons que le processus P(0) se "plante" dans sa section critique ; `blocked[0]` reste à VRAI. Dans le processus P(1), la boucle "TantQue `blocked[0]` faire ;" fait alors attendre indéfiniment ce processus.

</details>

## Exercice 3 : Gestion de processus (5 points)

Soit le programme C suivant :

```c
void main() {
    int i = 5;
    if (fork() == 0) {
        i = i * 2;
        fork();
    }
    i++;
}
```

**1.** Donner l'arborescence des processus engendrés par ce programme.

<details>
<summary>Correction</summary>

P → F1 → F11

</details>

**2.** Doit-on protéger la variable "i" des accès multiples en écriture ? Expliquer.

<details>
<summary>Correction</summary>

Non, car chaque processus créé aura sa variable `i` à part (copie séparée en mémoire après le `fork`).

</details>

**3.** Préciser la valeur finale de la variable `i` pour chaque processus.

<details>
<summary>Correction</summary>

Pour P : i=6 ; pour F1 : i=11 ; pour F11 : i=6

</details>

**4.** Ce programme peut engendrer un/des processus orphelin(s) et/ou zombie(s). En général, dans quel cas peut-on avoir des processus orphelins et dans quel cas peut-on avoir des processus zombies ?

<details>
<summary>Correction</summary>

Processus orphelin lorsque son père se termine avant lui. Processus zombie lorsqu'il se termine avant son père et que ce dernier n'a pas encore reçu son code retour.

</details>

**5.** Corriger ce programme de manière à éviter la présence de processus orphelins et zombies.

<details>
<summary>Correction</summary>

On ajoute `sleep()` et `wait()` au code.

<!-- TODO: unclear in source, verify against original PDF — the correction states the fix in prose ("On ajoute sleep() et wait() au code") without giving the corrected code listing itself; that listing was not present in the extracted correction text -->

</details>

## Exercice 3 : Synchronisation par sémaphores (8 points)

Par application du protocole sanitaire, un magasin s'est retrouvé obligé de ne pas accepter plus que N clients en même temps. S'il y a déjà N clients dans le magasin, les nouveaux arrivés doivent attendre. Lorsqu'un client accède au magasin, il fera ses achats pendant une durée limitée puis il quitte. On peut assimiler les clients à des processus concurrents et les droits d'accès (au magasin) à des ressources partagées.

**1.** Proposez une solution de synchronisation des processus "clients" en utilisant les sémaphores.

<details>
<summary>Correction</summary>

```c
semaphore S = N;

Processus client() {
    P(S)
    // accès magasin
    V(S)
}
```

</details>

**2.** Supposons maintenant que les clients arrivent en familles de M personnes chacune `(M<N,` M peut prendre une valeur aléatoire entre 1 et 3) et qu'une famille ne peut accéder au magasin que si tous ses membres sont autorisés à y accéder. On peut assimiler les familles à des processus concurrents et les droits d'accès (au magasin) à des ressources partagées.

**a)** Un programmeur a proposé la solution suivante pour la synchronisation des processus "familles". Montrez, à l'aide d'un exemple, que cette solution est incorrecte.

```c
semaphore S = N;
processus famille() {
    M = random(1, 3); // M aura une valeur entre 1 et 3
    for (int i = 0; i < M; i++) P(S); // la famille accède au magasin
    for (int i = 0; i < M; i++) V(S);
}
```

<details>
<summary>Correction</summary>

Exemple : il peut y avoir commutation de processus au niveau des `P(S)` → plusieurs familles peuvent acquérir chacune un nombre de droits inférieur au nombre de ses membres. Si la somme de ces droits d'accès est supérieure ou égale à N, aucune famille ne pourra accéder au magasin.

</details>

**b)** On se propose maintenant d'écrire une solution correcte pour synchroniser les processus familles. Donner les variables partagées et les sémaphores à utiliser ainsi que leurs valeurs initiales, puis proposer une solution complète.

<details>
<summary>Correction</summary>

```c
#define N 10
int dispo = N;
sem stop = 0;  // blocage si dispo < M
sem mutex = 1; // protège l'accès à la variable dispo

processus famille() {
    M = random(1, 3);
    p(mutex);
    while (dispo < M) // en cas de réveil (après p(stop)), revoir s'il y a suffisamment de places
    {
        v(mutex); // permettre aux autres processus d'utiliser la variable dispo
        p(stop);  // se bloquer
        p(mutex); // compétition sur mutex pour pouvoir retester si dispo<M ou non
    }
    dispo = dispo - M;
    v(mutex);
    // accéder au magasin
    p(mutex)
    dispo += M;
    v(mutex);
    v(stop);
}
```

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se2-ds-sepc-2020.pdf" />

</TabItem>
</Tabs>
