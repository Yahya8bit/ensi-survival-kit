---
sidebar_position: 5
title: "Chapitre 4 : Synchronisation et Communication Inter Processus"
sidebar_label: Ch4 - Synchronisation
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 4 : Synchronisation et Communication Inter Processus

*Cours : Systèmes d'exploitation et programmation concurrente — ENSI*

## Plan

- Solutions de synchronisation de processus
  - Hardware : masquage d'interruption, Test and Set (TAS)
  - Software : verrou (Lock), Sémaphores, Moniteurs
- Problèmes classiques de synchronisation : Producteur/Consommateur, lecteurs/rédacteurs, RDV
- Mécanismes de communication inter processus : Pipes, Passage de messages, Sockets

## Introduction

<!-- TODO: unclear in source, verify against original PDF — the introductory example code snippet ("le code suivant" incrementing a shared variable i) did not extract as text -->

Soit le code suivant : que sera la valeur finale de `i` ? L'incrémentation est-elle une opération atomique ?

Des exemples d'exécutions prouvent que l'incrémentation n'est pas atomique.

**Solution** : une ressource partagée (ici la variable `i`) ne doit être utilisée que par un seul processus à la fois => Synchronisation des processus.

## Définitions

- **Ressource critique (RC)** : une ressource qui ne doit être utilisée que par un seul processus à la fois.
- **Section critique (SC)** : partie de code qui cause des conflits d'utilisation de ressources critiques.
- **Processus en exclusion mutuelle** : plusieurs processus qui doivent utiliser simultanément une ressource critique.

### Section critique (SC)

Une bonne solution au problème de section critique doit satisfaire :

- **Attente bornée** : un processus voulant entrer en SC ne doit pas attendre indéfiniment. (N.B. : Aucune hypothèse ne doit être faite sur les vitesses relatives des processus)
- **Exclusion mutuelle** : un seul processus doit être dans la SC.
- **Avancement** : un processus hors SC ne doit pas bloquer un autre processus à entrer en SC.

## Synchronisation de processus

**Définition** — mécanismes de synchronisation : c'est un moyen permettant de distribuer, sur le temps, l'accès à des ressources critiques, par plusieurs processus.

- Solutions matérielles : opérations atomiques de bas niveau
- Solutions logicielles :
  - masquage d'interruption
  - Test and Set lock (TAS ou TSL) — Attente active
  - opérations atomiques de haut niveau : verrou (lock), Sémaphores, Moniteurs

### Masquage d'interruption

- But : empêcher la commutation de processus quand un processus est en SC => masquage d'interruption avant d'entrer en SC.
- C'est dangereux : on donne à l'utilisateur le pouvoir de contrôler les interruptions !!!
- Mais, ça pourrait être utilisé au niveau du noyau.

### TAS : Test And Set

Opération atomique "hardware" utilisée pour écrire 1 dans un emplacement mémoire et retourner son ancienne valeur.

<!-- TODO: unclear in source, verify against original PDF — the "Équivalent en code C" slide for TAS did not extract as text -->

- Si `val` contient 1, TAS retourne 1 et le processus ne peut pas entrer en SC.
- Si `val` contient 0, TAS retourne 0 et le processus peut entrer en SC (les autres trouveront 1 dans `val`).

**Solution au problème de SC pour N processus** — voir PDF pour le schéma / la preuve (vérifier les critères d'une solution SC).

### Solutions logicielles — attente active

Attente active = un processus vérifie continuellement si une condition est vraie afin de pouvoir entrer en SC.

**Première solution pour 2 processus P0 et P1 (incorrecte !)**

<!-- TODO: unclear in source, verify against original PDF — pseudo-code for this first attempt did not extract as text -->

- Exclusion Mutuelle => OK
- Avancement => Non ! => si P0 est plus lent que P1, P1 atteint la boucle "while" avant P0 => P1 ne peut pas entrer en SC bien qu'elle soit libre !!

**Seconde solution pour 2 processus P0 et P1**

Un processus positionne son flag à 1 et attend que le flag de l'autre processus devienne 0 pour entrer en SC. C'est une solution incorrecte !

- Exclusion Mutuelle => OK
- Avancement => Non ! => si P0 et P1 positionnent leurs flags à 1 (commutation de processus juste avant la boucle while) => les deux ne pourront plus entrer en SC.

**Solution 3 : combiner les 2 solutions précédentes == Algorithme de Peterson**

Un processus positionne son flag et donne la chance à l'autre processus d'entrer en SC. Le processus qui exécute l'instruction de la ligne 8 en premier accèdera à sa SC.

*Exercice : prouver que c'est une solution correcte (par l'absurde).*

**Correction de la solution de Peterson**

L'algorithme de Peterson peut être généralisé à N processus => Algorithme du Bakery.

- Exclusion mutuelle : supposons que P0 et P1 sont tous les deux en SC => on aura `turn=1` et `turn=0` => absurde.
- Attente finie :
  - Supposons que P0 n'entre jamais en SC : P0 voit toujours `flag[1]=1` et `turn=1` => absurde car P1 remet son flag à 0 lorsqu'il sort de la SC.
  - Supposons que P1 a fini sa SC et P0 attend => on aura `flag[1]=0` et `flag[1]=1` => impossible.
  - De même, lorsqu'un processus atteint l'instruction while et que l'autre n'a pas positionné son flag, le premier entre en SC.

**Conclusion — solutions à attente active**

L'attente active est inefficace : le processeur est immobilisé seulement pour attendre => il faut libérer le processeur explicitement => Solution : blocage.

Solutions de blocage : les verrous (Blocage ou échec/réessayer), Sémaphores, Moniteurs, Send/Receive.

## Solutions logicielles — les verrous (lock)

Objectif : assurer l'exclusion mutuelle – MUTEX. Cas des threads : l'un obtient le verrou, les autres seront bloqués ou en échec.

<!-- TODO: unclear in source, verify against original PDF — the lock example/state diagram (slides numbered 1-8) and the "exemple" code slide did not extract as text -->

**Fonctions Pthread (verrous)**

| Appel Thread | Description |
|---|---|
| `pthread_mutex_init` | Créer un verrou (mutex) |
| `pthread_mutex_destroy` | Détruire un verrou existant |
| `pthread_mutex_lock` | Obtenir un verrou ou se bloquer |
| `pthread_mutex_trylock` | Obtenir un verrou ou échec |
| `pthread_mutex_unlock` | Libérer un verrou |

### Les verrous — interblocage

**Exemple 1** : *(schéma non extrait — voir PDF)*. Solution : conception sans deadlock — imposer un ordre (acyclique) sur les verrous, qui doivent nécessairement être demandés en respectant cet ordre.

**Exemple 2** : Soient trois threads A, B, et C, tels que A est de forte priorité, B de priorité moyenne, et C de faible priorité, ainsi qu'un verrou `m`. On suppose que :

1. C s'exécute et verrouille `m`
2. B se réveille et préempte C
3. A tente de verrouiller `m` et se bloque
4. B reprend la main => Tant que B ne se bloque pas, C ne peut pas s'exécuter et libérer le verrou nécessaire à la poursuite de A
5. A et B sont bloqués

Solution (rarement implantée) : modifier la priorité de C pour le rendre aussi prioritaire que A jusqu'à ce qu'il ait libéré le verrou.

## Les sémaphores

Principe hérité des chemins de fer : éviter les collisions en assurant l'accès exclusif à un croisement ferré.

- Sémaphore levé : le processus peut continuer
- Sémaphore baissé : le processus doit attendre jusqu'à ce qu'un autre processus le lève

Un sémaphore S est une structure de donnée munie de 3 opérations atomiques sur une variable entière : initialisation, P et V.

**Déclaration — Notation d'Andrews**

```
Sem S1, S2, S3 = 0, S4 = 1;
Sem ingred[3] = ([3] 1);
```

- **Initialisation**
- **P(S) — semwait(S)** : décrémenter S et se bloquer si `S<0`
- **V(S) — semsignal(S)** : incrémenter S et réveiller un processus si `S<=0` (vers FA des processus prêts selon la discipline FIFO)

`S1=3` indique le nombre de processus qui peuvent exécuter `P(S)` et continuer (sans se bloquer). Lorsque S1 devient négatif, cela indique le nombre de processus bloqués qui attendent d'être débloqués => chaque signal débloque un seul processus quand `S<=0`.

### Utilisation des sémaphores

- Réalisation des sections critiques
- Synchronisation conditionnelle : il existe une relation de précédence `P1<P0`

<!-- TODO: unclear in source, verify against original PDF — "Réalisation des sections critiques : exemple" code slide did not extract as text -->

**Exercices** (voir PDF pour les fichiers sources cités) :

- Exercice 1 & 2 : exécuter (plusieurs fois) les programmes `IncrementWithoutSyn.c`, `IncrementWithMutex.c`, `IncrementWithSemaphore.c` et interpréter les résultats.
- Soit `fsquare` et `fdouble` 2 fonctions qui permettent de calculer le carré et le double d'une variable globale `i` respectivement. Écrire un programme utilisant les sémaphores, permettant d'exécuter `fsquare` avant `fdouble`.
  - Quelle est la valeur initiale du sémaphore ? ..................
  - La fonction `fdouble` doit débuter par ..................
  - La fonction `fsquare` doit finir par ...................

**Sémaphores — principales fonctions**

| Fonction | Rôle |
|---|---|
| `int sem_init(sem_t *s, int pshared, unsigned int value);` | Initialisation du sémaphore. Value : valeur initiale. Pshared = 0 : partagé entre les threads d'un même processus. Pshared != 0 : partagé entre processus. |
| `int sem_wait(sem_t *s);` | Attendre (se bloquer) que la valeur de s soit positive (>0) puis la décrémenter |
| `int sem_trywait(sem_t *s);` | Décrémenter s si s>0 sinon erreur (pas de blocage) |
| `int sem_timedwait(sem_t *sem, const struct timespec *abs_timeout);` | Décrémente s si s>0 sinon attendre (se bloquer) pendant abs_timeout |
| `int sem_post(sem_t *s);` | Incrémenter s et réveiller un thread (ou un processus) |
| `int sem_destroy(sem_t *sem);` | Supprimer un sémaphore |

### Blocage Vs attente active — problème d'interblocage (attente circulaire)

Exemple : P0 et P1 sont bloqués et attendent l'un l'autre indéfiniment.

```
Processus P0        Processus P1
P(S1); // 1          P(S2); // 2
P(S2); // 3          P(S1); // 4
```

Quel est le plus coûteux ? Coût de blocage contre le coût de manipulation des FA + coût de commutation de contexte ? L'attente active est meilleure pour les sections critiques de courte durée (surtout en multiprocesseurs).

## Problèmes classiques de synchronisation

- Problème du Rendez-vous (RDV) et/ou Barrière
- Problème des producteurs/consommateurs
- Problème des Lecteurs/Rédacteurs
- Problème du dîner des philosophes

### Problème du RDV

**Analyse** : Soit n processus qui ne doivent commencer l'exécution de leur phase 2 que si tous les processus ont terminé la phase 1.

- Si un processus termine la phase 1, il doit se bloquer en attendant que tous les autres terminent la phase 1 : besoin d'un compteur (variable globale qui doit être protégée) des processus qui ont terminé la phase 1.
- Le dernier processus qui termine la phase 1 doit réveiller l'un des autres ou tous les autres processus.
- Il serait plus adéquat que le réveil soit en cascade => je réveille l'un des processus bloqués qui réveillera, à son tour, l'un des processus bloqués.

<!-- TODO: unclear in source, verify against original PDF — the two "squelette d'une solution" pseudo-code slides did not extract as text -->

N.B : la variable `count` doit être protégée des accès concurrents (par lock ou sémaphore...).

*Exercice : tester la solution complète `RdvNprocesses.c`. Exercice : RDV pour 2 processus P1 et P2.*

**Solutions** :

- Solution 1 : cas n=2
- Solution 2 : en utilisant des sémaphores privées — lorsqu'un processus termine sa phase 1, il ouvre sa barrière pour l'autre.

### Problème du producteur/consommateur — tampon borné

Cas d'un tampon borné à N cases, exclusion mutuelle au tampon.

- Si toutes les cases sont vides, le consommateur se bloque => utiliser un sémaphore `plein=0`
- Si toutes les cases sont pleines, le producteur se bloque => utiliser un sémaphore `vide=N`

<!-- TODO: unclear in source, verify against original PDF — the pseudo-code slide for the bounded-buffer producer/consumer solution did not extract as text -->

*Exercice : exécuter le programme `ProdCons.c` plusieurs fois et interpréter les résultats. Modifier le programme de telle façon à avoir plusieurs producteurs et plusieurs consommateurs.*

### Problème des lecteurs/rédacteurs

**Énoncé** : plusieurs processus tentent de lire et d'écrire des informations (dans le même fichier par exemple) :

- On accepte que plusieurs lisent ensemble (degré d'accès >= 1)
- On n'autorise qu'un seul processus à modifier (on exclut les lecteurs et les autres rédacteurs) — Exclusion mutuelle => (degré d'accès = 1)
- On suppose que les lecteurs sont prioritaires par rapport aux rédacteurs
- Un rédacteur bloqué doit attendre le dernier des lecteurs pour qu'il puisse entrer en section critique

**Analyse** : Lorsqu'un lecteur veut lire, deux cas se présentent :

- **Cas 1** : il y a déjà des lecteurs, il lit.
- **Cas 2** : il est le premier lecteur qui veut lire, il doit bloquer les rédacteurs ou se bloquer s'il y a un rédacteur en SC => utiliser un même sémaphore global `wrt` (exclusion mutuelle des rédacteurs) => `sem_wait(&wrt)`

Lorsque le dernier lecteur termine la lecture, il doit réveiller l'un des rédacteurs bloqués sur `wrt` => `sem_post(&wrt)`. Lorsqu'un rédacteur termine son écriture, il doit réveiller l'un des lecteurs bloqués sur `wrt` => il faut que les autres rédacteurs soient bloqués sur un autre sémaphore `mutex2` avant de se bloquer sur `wrt`.

**Conception d'une solution** : soit `nblect` le nombre courant de lecteurs.

Processus lecteur :

- Protéger `nblect` par sémaphore
- Lorsque le premier lecteur arrive, il doit bloquer les rédacteurs ou se bloquer (s'il y a déjà un rédacteur) — `wrt` est le sémaphore d'exclusion mutuelle des rédacteurs, `sem_t wrt=1;`
- Après lecture, si je suis le dernier, je réveille l'un des rédacteurs

Processus rédacteur : se bloque s'il y a un autre rédacteur dans la SC => il doit aussi se bloquer s'il y a des lecteurs. Solution : ajouter un autre sémaphore pour donner la priorité aux lecteurs. Un rédacteur qui arrive se bloque si un autre rédacteur est dans la SC (écriture) ou s'il y a encore des lecteurs.

*Exercice : solution au problème des Lecteurs/Rédacteurs avec priorité des rédacteurs par rapport aux lecteurs.*

## Les moniteurs

C'est un mécanisme de synchronisation de haut niveau qui assure les mêmes fonctionnalités que les sémaphores.

- Module logiciel = ensemble de procédures, de séquences d'initialisation et de données locales
- Un seul processus à la fois peut accéder aux données du moniteur => moniteur = type abstrait (objet en OO) mais avec exclusion mutuelle (implicite) et synchronisation
- Les données locales ne sont accessibles que par les procédures du moniteur (pas par des procédures externes)
- Un processus accède au moniteur en invoquant l'une de ses procédures
- Un seul processus peut être dans le moniteur. Les autres processus qui ont invoqué le moniteur sont bloqués (ils seront réveillés) => exclusion mutuelle implicite (automatique)

**Synchronisation dans les moniteurs**

La synchronisation est décrite de façon explicite à l'aide de variables condition du moniteur.

- Variable condition : type spécial de donnée qui sert de FA de processus qui attendent sur cette condition
- N'accepte que trois opérations possibles (structure d'un moniteur — voir PDF)

**Remarques — implantation des moniteurs avec des sémaphores**

Similitudes/différences entre P/C.wait et V/C.signal :

- `Cwait(C)` suspend toujours le processus qui l'appelle ; `P(S)` ne suspend le processus que si `(S<=0)`
- `Csignal(C)` est sans effet s'il n'y a pas de processus bloqués ; `V(S)` incrémente toujours S
- Pour assurer l'exclusion mutuelle : P en entrée et V en sortie
- A chaque variable condition est assigné un sémaphore et un compteur
- `Wait = V(mutex)` et `P(semCond)`

<!-- TODO: unclear in source, verify against original PDF — the worked "Solution Prod/cons avec moniteur", "Solution RDV avec moniteur" et "Solution lecteurs/rédacteurs avec moniteur" slides did not extract as text (marked "À faire en classe" in source) -->

## Partie II — Synchronisation des threads

**Primitives de synchronisation avec Pthread**

- Les verrous (Locks) — déjà fait : assurent l'exclusion mutuelle
- Les sémaphores — déjà fait
- Les variables conditionnelles : assurent l'exclusion mutuelle (mais problème : interblocage) — s'utilisent avec un verrou pour éviter l'interblocage
- Les barrières : une barrière bloque un ensemble de threads jusqu'à ce que tous les autres aient atteint la barrière

### Variables conditionnelles

- Création statique : `pthread_cond_t cond = PTHREAD_COND_INITIALIZER;`
- Création dynamique : `pthread_cond_init(&cond, &attributs);`
- Attente de la condition : `pthread_cond_wait(&cond, &mutex);`
- Signalisation de la condition :
  - `pthread_cond_signal(&cond);` => un thread en attente sur la condition est réveillé
  - ou `pthread_cond_broadcast(&cond);` => tous les threads en attente sur la condition sont réveillés — ils sont alors à nouveau en compétition pour le mutex (pour le réacquérir)
- Destruction d'une variable condition : `pthread_cond_destroy(&cond);`

L'attente est toujours associée à un verrou (mutex). Le verrou mutex est libéré au moment de la mise en attente (blocage).

*Exercice 1 : implémentation du problème producteur/consommateur (tampon borné) avec les variables conditionnelles => solution : `ThreadSynCondprodConsTB.c`.*

*Exercice 2 : faire l'exercice 3 du DS-2017 : gérer l'allocation et la libération d'un nombre donné d'exemplaires de ressource disponible. Solution : `ThreadSynCondEx3DS2017.c`.*

### Les barrières

Une barrière détient un thread jusqu'à ce que tous les autres threads de cette barrière l'atteignent (RDV). Une barrière peut être implémentée en utilisant :

- Un compteur : nombre de threads qui atteignent la barrière
- Une variable mutex pour protéger le compteur
- Une variable condition

Si compteur < nombre total des threads, les threads exécutent `pthread_cond_wait(&cond, &mutex);`. Le dernier thread qui entre dans la barrière réveille tous les autres par `pthread_cond_broadcast(&cond);`.

<!-- TODO: unclear in source, verify against original PDF — the "API Pthread" barrier function-signature slides did not extract as text (likely pthread_barrier_init / pthread_barrier_wait / pthread_barrier_destroy) -->

*Exercice : RDV avec barrière — solution : `RdvNprocessesWithBarrier.c`.*

## Partie III — Communication inter processus

**Plan**

- Communication inter-processus intra-machine
- Communication inter-processus inter-machine
  - Passage de messages
  - Les tubes (pipes) : cas d'UNIX-Linux
  - Les signaux : cas d'UNIX-Linux
  - Sockets, RPC, RMI

### Passage de messages

L'interaction entre processus peut nécessiter :

- **La synchronisation** : renforcer l'exclusion mutuelle
- **La communication** : échange d'information

Le mécanisme de passage de messages permet d'assurer ces deux fonctions en même temps.

**Primitives**

```
Send(destination, message)
Receive(source, message)
```

**Synchronisation** — l'échange de messages entre processus implique une certaine synchronisation : le récepteur ne reçoit un message que si la source l'envoie.

Après appel à `send`, le processus peut :

- Se bloquer jusqu'à la réception du message par le destinataire
- Continuer

Après appel à `receive` :

- Si le message a déjà été envoyé, le processus le reçoit et continue son exécution
- Sinon :
  - Le processus se bloque jusqu'à la réception d'un message
  - Ou le processus abandonne le message et continue

`sender` et `receiver` peuvent être bloquants ou non bloquants — 3 cas possibles :

- **Blocking send, blocking receive** => les deux processus sont bloqués jusqu'à la livraison du message => RDV
- **Nonblocking send, blocking receive**
- **Nonblocking send, nonblocking receive** — c'est la combinaison la plus utile. Exemple : serveur qui envoie des messages à plusieurs clients.

Inconvénients :

- Non blocking send : le programmeur doit déterminer si un message est reçu ou non => (implémenter une réponse)
- Blocking receive : reste bloqué si le message est perdu

**Identification des processus**

- Adressage direct pour les processus coopératifs : `Send(id-dest-process, message)` / `Receive(id-source-process, message)`
- Adressage indirect : les messages sont envoyés vers une boîte à lettre (BAL : mailbox) puis consommés par les processus destinataires : `Send(BAL, message)` / `Receive(BAL, message)`. La BAL peut appartenir à l'un des processus ou au système d'exploitation.
  - Interaction client/serveur : private communications
  - Diffusion d'un message

**Passage de messages — exclusion mutuelle**

Le passage de messages peut renforcer l'exclusion mutuelle. Hypothèse : non-blocking send + blocking receive. Des processus concurrents partagent une BAL qui ne peut contenir qu'un seul message. Un processus qui veut entrer en section critique SC exécute `receive` (si BAL est vide il se bloque, sinon il exécute sa SC).

**Producer/consumer with message passing** : 2 BALs — `mayconsume` et `mayproduce` — représentent le buffer, initialement rempli avec des messages "null".

### Les tubes (pipes) d'Unix-Linux

Unix est un système basé sur le passage de messages : un pipe permet à 2 processus de s'exécuter en même temps, le premier fournissant les données que le second exploite au fur et à mesure de leur production. Un shell Unix : le signe `|`. API : appel système `pipe`.

**Définition et types**

- Un pipe est un canal unidirectionnel en mode flots d'octets — fichier spécial à usage interne pour la communication.
- Un processus, producteur, fournit (écrit) des données dans le pipe ; l'autre processus, consommateur, l'exploite (lit). L'information disparaît (implicitement/explicitement) après lecture.
- Deux types de pipes (SGF) :
  - Les pipes anonymes : entre processus avec lien de parenté.
  - Les pipes nommés (FIFO) : entre processus sans lien de parenté.
- Unix offre 2 primitives d'émission et de réception :
  - `Write(int desc, char *buf, int taille);` : non bloquante
  - `Read(int desc, char *buf, int taille);` : bloquante

*Exercice : un processus père écrit (write) des lettres dans le tube que le fils va lire (read). Voir la solution `pipeanonyme.c`.*

**Pipes anonymes vs pipes nommés**

| Pipes anonymes | Pipes nommés |
|---|---|
| communication entre processus ayant un lien de parenté (`fork()`) | communication entre processus sans lien de parenté |
| fichier particulier / file de messages en mémoire | fichier persistant et portant un nom |
| pointeurs gérés automatiquement | création par la fonction SGF `mknod()`/`mkfifo()`, ouverture par `open()`, un seul descripteur par ouverture de tube |

**Pipes nommés — utilisation (FIFO)**

Pour pouvoir lire ou écrire dedans, il faut que le tube nommé soit ouvert à la fois en lecture et en écriture. Si ce n'est pas le cas, les opérations de lecture/écriture sont bloquantes.

1. Créer le pipe nommé
2. Ouvrir le pipe en lecture et en écriture
3. Lire et écrire dedans
4. Fermer les descripteurs
5. Supprimer le pipe (`rm` fichier sur le shell)

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/se2-ch4-synchronisation.pdf" />

</TabItem>
</Tabs>
