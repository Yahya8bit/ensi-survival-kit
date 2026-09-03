---
sidebar_position: 5
title: "Devoir Surveillé SE&PC — 20/11/2015 (avec corrigé)"
sidebar_label: DS 2015 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Devoir Surveillé — Systèmes d'exploitation Programmation Concurrente

*École Nationale des Sciences de l'Informatique — A.U. : 2015/2016 — Classes : II2 — Date : 20/11/2015 — Durée : 2h00 — Documents non autorisés — Enseignants : F. Najjar, M. S. Ouerghi, N. Chakchouk*

*Note : on demande des réponses brèves mais claires, précises et concises.*

## Exercice 1 : Questions de cours (4,5 points – 1,5+1+1+1)

**1)** Donnez le(s) terme(s) technique(s) correspondant à chacune des phrases suivantes :

a) L'un des rôles importants d'un système d'exploitation est de masquer la mise en œuvre des services (ou fonctions systèmes).
b) Section de code qui doit s'exécuter de manière atomique afin d'éviter les conditions de vitesse.
c) Fonction système de clonage du processus (Unix) courant.
d) Etat d'un processus qui n'est pas en cours d'exécution mais éligible à être ordonnancé.
e) L'intervalle de temps entre le lancement d'un processus et sa fin.
f) Un dispositif matériel qui permet au système d'exploitation la protection des processus en exécution.

<details>
<summary>Correction</summary>

a) **Abstraction**
b) **Section critique**
c) **Fork** (ou Fork/Exec)
d) **Prêt** (Ready)
e) **Temps de réponse**
f) **Mode d'exécution**

</details>

**2)** Donnez la définition d'un interblocage et précisez la différence avec un blocage.

<details>
<summary>Correction</summary>

Le blocage d'un processus correspond à l'attente d'éléments dont il a besoin et qui ne sont pas disponibles (attente de la réalisation d'une demande d'E/S, attente du signalement d'un évènement, …). Un ensemble de processus est en interblocage si et seulement si tout processus de l'ensemble est en attente d'un évènement qui ne peut être réalisé que par un autre processus de l'ensemble.

</details>

**3)** Expliquez ce qu'est la famine.

<details>
<summary>Correction</summary>

La famine est le fait qu'un processus demande d'accès à une ressource ou de passer un certain point de synchronisation, et se voit perpétuellement différé l'exécution de sa demande.

</details>

**4)** Combien de files d'attente sont nécessaires pour implémenter un moniteur ?

<details>
<summary>Correction</summary>

Il faut une file d'attente pour mémoriser les demandes d'accès au moniteur (une par fonction du moniteur), et une file d'attente pour chaque variable de condition. Il faut éventuellement une file d'attente des processus suspendus dans le moniteur suite à l'opération `signal(x)`. Si cette dernière file est gérée, elle est plus prioritaire que la file d'attente du moniteur.

</details>

**5)** *Optionnelle (2 points)* : Écrire un programme C qui engendre 6 processus liés à leur ancêtre de la manière suivante :

<!-- TODO: unclear in source, verify against original PDF — the tree diagram for this optional question did not extract as text -->

<details>
<summary>Correction</summary>

```c
#include <unistd.h>
int main() {
    if (fork())
        (fork() || ((fork()) && fork())) && fork();
    else
        fork();
    return 0;
}
```

<!-- TODO: unclear in source, verify against original PDF — the extracted correction's parenthesization ("(fork() || ( fork()) && fork() )) && fork()") is ambiguous/likely OCR-mangled; reproduced as closely as possible to the raw extraction with balanced parentheses added for compilability -->

</details>

## Exercice 2 : Synchronisation par pthread_join (3,5 points)

La manipulation des matrices et des vecteurs est un champ particulièrement propice pour la programmation concurrente (ou parallèle).

On vous demande d'écrire un programme multithreadé (Pthread) qui calcule la somme de tous les éléments d'une matrice M(m,n) et l'affiche, en utilisant n threads concurrents qui calculent partiellement et retournent (par `pthread_exit`) la somme sur une colonne passée en paramètre.

Indications :

- Les éléments de la matrice sont supposés être entrés aléatoirement (ou par appel à une procédure `init_mat(int M[m][n])` que vous n'êtes pas censés écrire) ;
- La variable somme totale (ST) est déclarée dans la fonction `main`.
- Utiliser les `pthread_join` afin de récupérer les sommes partielles.

<!-- TODO: no correction was found for this exercise in the correction PDF — left as an open exercise -->

## Exercice 3 : Ordonnancement (7 points – 4+2+1)

On suppose disposer d'un ordonnanceur qui admet les caractéristiques suivantes :

- Plus la valeur de priorité est grande, plus la priorité est grande.
- L'ordonnancement est basé sur une priorité préemptive.

Soient trois processus P1, P2, et P3, ayant les codes et caractéristiques comme suit :

**P1 (Priorité=1, prêt à t=0)**

```
begin
1. <code séquence A>   // Exécution en 2 ut
2. P(X);
3. Section critique     // Exécution en 4 ut
4. V(X);
5. <Code séquence B>   // Exécution en 3 ut
end
```

**P2 (Priorité=2, prêt à t=3)**

```
begin
1. <code séquence A>   // Exécution en 2 ut
2. P(X);
3. P(Y);
4. Section critique     // Exécution en 4 ut
5. V(X);
6. V(Y);
7. <Code séquence B>   // Exécution en 3 ut
end
```

**P3 (Priorité=3, prêt à t=10)**

```
begin
1. <code séquence A>   // Exécution en 2 ut
2. P(Y);
3. P(X);
4. Section critique     // Exécution en 4 ut
5. V(Y);
6. V(X);
7. <Code séquence B>   // Exécution en 3 ut
end
```

Où `ut` représente une unité de temps, X, Y sont deux sémaphores d'exclusion mutuelle (init. à 1), et les opérations P et V s'exécutent pendant un temps nul. En plus, le temps de commutation est aussi négligeable.

**1)** Donnez le diagramme de GANTT (voir annexe) correspondant à cet ordonnancement en supposant les notations suivantes :

- "A" signifie que le processus est en train d'exécuter la `<séquence de code A>`
- "B" signifie que le processus est en train d'exécuter la `<séquence de code B>`
- "X" signifie que le processus détient le sémaphore X et qu'il occupe actuellement la section critique.
- "Y" signifie que le processus détient le sémaphore Y et qu'il occupe actuellement la section critique.
- "2" signifie que le processus détient les deux sémaphores et qu'il occupe actuellement la section critique.
- " " (vide) signifie que le processus n'est pas en exécution (pour n'importe quelle raison)

Puis calculez :

a) le temps de réponse de chaque processus et le temps de réponse moyen
b) le temps d'attente de chaque processus et le temps d'attente moyen
c) le rendement de l'Unité Centrale (CPU), défini comme le rapport temps pendant lequel la CPU exécute les processus / temps total de traitement

<!-- TODO: unclear in source, verify against original PDF — the annexe's blank Gantt-chart grids (Diagramme 1 and 2) referenced by this question did not extract as usable data -->

<details>
<summary>Correction</summary>

- Débit (job throughput) : 3 jobs en 27 unités de temps = 1/9 jobs/unité de temps
- Temps de rotation (turnaround) moyen :
  - job 1 : 27 unités de temps
  - job 2 : 21 unités de temps
  - job 3 : 11 unités de temps
  - Moyenne : (27 + 21 + 11) / 3 = 59 / 3 = **19 2/3**

</details>

**2)** Reprendre la question 1) avec les changements suivants :

- P1 a la priorité 1, P2 a la priorité 3 et P3 a la priorité 2
- P1 arrive au temps 0, P2 est prêt au temps 6 et P3 est prêt au temps 3

Conclure.

<details>
<summary>Correction</summary>

- Débit (job throughput) : **0**
- Temps de rotation moyen : **infini !**

*(cette configuration de priorités/dates d'arrivée conduit à un interblocage entre les processus rivalisant pour X et Y, empêchant toute terminaison)*

</details>

**3)** Afin d'apporter une solution au problème rencontré dans la question 2), proposer une modification dans le code des processus.

<details>
<summary>Correction</summary>

Respecter le même ordre d'appel des sémaphores mutex dans les deux processus P2 et P3. Ainsi, inverser par exemple l'ordre des appels `P(Y)` et `P(X)` dans P3.

</details>

## Exercice 4 : Synchronisation (5 points – 1+2+3)

Deux villes A et B sont reliées par une seule voie de chemin de fer.

Les règles de circulation sont les suivantes :

- La voie ne doit jamais être empruntée simultanément par deux trains allant en sens inverse.
- La voie peut être empruntée par un ou plusieurs trains allant tous dans le même sens.
- La priorité de parcours est la même pour les deux sens.

On considère deux classes de processus : les trains allant de A vers B : « T-AB » et les trains allant de B vers A : « T-BA ».

**Processus T-AB**

```
Début
    Entree_A();
    Circulation sur la voie de A vers B ;
    Sortie_B();
Fin.
```

**Processus T-BA**

```
Début
    Entree_B();
    Circulation sur la voie de B vers A ;
    Sortie_A();
Fin.
```

**1)** Quelle est la différence entre ce problème et le modèle des lecteurs/rédacteurs ?

<details>
<summary>Correction</summary>

La différence est que, dans le modèle lecteur/rédacteur, on ne peut trouver qu'un seul rédacteur à la fois en train d'occuper la ressource partagée (fichier), alors que dans ce problème la ressource (la voie) peut être occupée par plusieurs processus en même temps, et ceci pour les deux classes T-AB et T-BA.

</details>

**2)** Expliquer pourquoi la solution suivante (avec moniteurs) n'est pas correcte.

```c
Monitor AB;
int nbA, nbB;
condition ca, cb;

void Entree_A() { nbA++; if (nbB > 0) wait(ca); }
void Entree_B() { nbB++; if (nbA > 0) wait(cb); }
void Sortie_B()  { nbA--; if (nbA == 0) signal(cb); }
void Sortie_A()  { nbB--; if (nbB == 0) signal(ca); }

begin
    nbA = 0; nbB = 0;
end AB.
```

<details>
<summary>Correction</summary>

L'erreur dans la solution donnée est qu'en utilisant un seul compteur (`nbA` et `nbB`) pour chaque classe, on n'arrivera pas à différencier le nombre de processus en train d'utiliser la voie de celui qui est en attente. Cette solution peut induire un problème d'interblocage : par exemple, si A1, B1, A2 arrivent successivement, à la sortie de A1, `nbA` sera égal à 1 et donc B1 reste bloqué sur `cb` en attente d'être débloqué, et A2 reste bloqué sur `ca` en attente d'être débloqué par B1.

</details>

**3)** Donnez une correction de la solution erronée.

<details>
<summary>Correction</summary>

```c
Monitor AB
int nbA, nbB, attA, attB;
condition ca, cb;

/*************************/
void Entree_A() {
    if (nbB > 0) { attA++; wait(ca); }
    nbA++;
    if (attA > 0) { attA--; signal(ca); }
}
/*************************/
void Sortie_B() {
    nbA--;
    if (nbA == 0) {
        if (attB > 0) { attB--; signal(cb); }
    }
}
/*************************/
void Entree_B() {
    if (nbA > 0) { attB++; wait(cb); }
    nbB++;
    if (attB > 0) { attB--; signal(cb); }
}
/*************************/
void Sortie_A() {
    nbB--;
    if (nbB == 0) {
        if (attA > 0) { attA--; signal(ca); }
    }
}
/*************************/
begin
    /* Initialisation */
    nbA = 0; nbB = 0; attA = 0; attB = 0;
end.
```

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se2-ds-sepc-2015.pdf" />

</TabItem>
</Tabs>
