---
sidebar_position: 3
title: Chapitre III - Le Microprocesseur Intel 8086
sidebar_label: Ch3 - Microprocesseur 8086
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre III : LE MICROPROCESSEUR INTEL 8086

## Objectifs du cours

Dans ce cours on va présenter le Microprocesseur 8086 de Intel, on va étudier son jeu d'instructions complet, on va apprendre à le programmer en assembleur et finir par étudier les codes machines.

**Pourquoi un cours sur les Microprocesseurs et l'assembleur ?** Parce que c'est la seule façon de comprendre comment fonctionne un ordinateur à l'intérieur. Il devient ainsi beaucoup plus facile de le programmer à l'aide d'autres langages plus évolués comme le Pascal, le C/C++, et les langages visuels.

Le langage assembleur est, en programmation informatique, le langage de plus bas niveau qui représente le langage machine sous une forme lisible par un humain.

**Pourquoi le 8086 d'Intel ?** Parce que la majeure partie des ordinateurs individuels utilisés de nos jours sont des PCs équipés de microprocesseurs Intel compatibles avec le 8086. C'est-à-dire que tout programme écrit pour tourner sur un 8086 peut être exécuté sur un Pentium 4. Ce qui signifie que si on maîtrise la programmation en assembleur du 8086, on a fait un **grand pas** vers la programmation de nos PC actuels que ce soit en assembleur ou à l'aide d'autres langages plus évolués comme le C/C++.

:::warning Attention
Le 8086 est un microprocesseur qui était destiné à fonctionner dans des ordinateurs **monotâches**.

- C'est-à-dire qui ne peuvent exécuter qu'un seul programme à la fois. Il fonctionnait alors en mode **réel**, c.à.d que le programme en cours d'exécution peut accéder à n'importe quelle ressource de la machine y compris n'importe quelle zone mémoire.
- Avec les systèmes d'exploitation récents comme Windows ou Linux, les ordinateurs sont devenus **multitâches** c'est-à-dire que le processeur peut travailler sur plusieurs programmes à la fois.

Il devient alors impératif de « réglementer » les accès à la mémoire afin qu'un programme ne puisse pas aller écrire dans une zone mémoire utilisée par un autre programme. Pour cela, les processeurs actuels fonctionnent en **mode protégé**. Ils interagissent avec le système d'exploitation qui gère les ressources de la machine et évite les conflits entre les programmes qui s'exécutent simultanément.

Pas de panique : dans la plupart des cas, on peut exécuter les programmes destinés au 8086 sur un PC récent sans aucun problème.
:::

## Description physique du 8086

Le microprocesseur Intel 8086 est un microprocesseur 16 bits, apparu en 1978. C'est le premier microprocesseur de la famille Intel 80x86 (8086, 80186, 80286, 80386, 80486, Pentium, ...). Il se présente sous la forme d'un boîtier **DIP** (*Dual In-line Package*) à 40 broches.

## Historique

**Familles Intel :** 4 bits (4004, 4040) → pré-x86 8 bits (8008, 8080, 8085) → x86-16 (8086, 8088, 80186, 80188, 80286) → x86-32/IA-32 (80386, 80486, Pentium, Core, Celeron...) → x86-64/EM64T (Pentium 4, Core 2, Pentium Dual-Core...) → RISC (i860, i960, StrongARM...).

**Tableau chronologique des microarchitectures x86 d'Intel :** Intel 8086/8088/80186/80188 → 286 → 386 → 486 → P5 (Pentium, Pentium MMX) → P6 (Pentium Pro, Pentium II, Pentium III) → NetBurst (Pentium 4, Pentium D) → P6 (Pentium M, Core Solo/Duo) → Core (Core 2) → Nehalem/Sandy Bridge (Core i7/i5/i3).

## Schéma fonctionnel du 8086

:::note Rappel
Une **interruption** est un arrêt temporaire de l'exécution normale d'un programme informatique par le microprocesseur afin d'exécuter un autre programme (appelé service d'interruption).

L'**accès direct à la mémoire** ou **DMA** est un procédé informatique où des données circulant de ou vers un périphérique (port de communication, disque dur) sont transférées directement par un contrôleur adapté vers la mémoire principale de la machine, sans intervention du microprocesseur si ce n'est pour lancer et conclure le transfert. La conclusion du transfert ou la disponibilité du périphérique peuvent être signalées par interruption.
:::

Broches principales : alimentation (VCC, GND), horloge (CLK), contrôle du microprocesseur (RESET, READY, MN/MX, TEST), interruptions (INTA, NMI, INTR), DMA (HOLD, HLDA), bus d'adresses/données (AD0-AD15, A16-A19), signaux de contrôle (WR, RD, M/IO, ALE, BHE, DEN, DT/R), signaux d'état (S0-S7).

## Description et utilisation des signaux du 8086

- **CLK :** entrée du signal d'horloge qui cadence le fonctionnement du microprocesseur. Ce signal provient d'un générateur d'horloge : le **8284**.

  *(Une horloge à quartz utilise un oscillateur à quartz pour définir le temps.)*

- **RESET :** entrée de remise à zéro du microprocesseur. Lorsque cette entrée est mise à l'état haut pendant au moins 4 périodes d'horloge, le microprocesseur est réinitialisé : il va exécuter l'instruction se trouvant à l'adresse `FFFF0H` (adresse de *bootstrap*). Le signal de RESET est fourni par le générateur d'horloge.

  *(Le boot (ou bootstrap), l'amorce, ou encore l'amorçage, est la procédure de démarrage d'un ordinateur, qui comporte notamment le chargement du programme initial.)*

- **READY :** entrée de synchronisation avec la mémoire. Ce signal provient également du générateur d'horloge.
- **TEST :** entrée de mise en attente du microprocesseur d'un événement extérieur.
- **INTA :** indique que le microprocesseur accepte l'interruption.
- **HOLD et HLDA :** signaux de demande d'accord d'accès direct à la mémoire (DMA).
- **NMI et INTR :** entrées de demande d'interruption.
  - INTR : interruption normale.
  - NMI (*Non Maskable Interrupt*) : interruption prioritaire.
- **S0 à S7 :** signaux d'état indiquant le type d'opération en cours sur le bus.
- **A16/S3 à A19/S6 :** 4 bits de poids fort du bus d'adresses, multiplexés avec 4 bits d'état.
- **AD0 à AD15 :** 16 bits de poids faible du bus d'adresses, multiplexés avec 16 bits de données. Le bus A/D est multiplexé (multiplexage temporel) d'où la nécessité d'un démultiplexage pour obtenir séparément les bus d'adresses et de données :
  - **16 bits de données** (microprocesseur 16 bits) ;
  - **20 bits d'adresses**, d'où 2<sup>20</sup> = 1 Mo d'espace mémoire adressable par le 8086.
- **MN/MX :** entrée de choix du mode de fonctionnement du microprocesseur :
  - mode minimum (MN/MX = 1) : le 8086 fonctionne de manière autonome, il génère lui-même le bus de commande (RD, WR, ...) ;
  - mode maximum (MN/MX = 0) : ces signaux de commande sont produits par un contrôleur de bus, le **8288**. Ce mode permet de réaliser des systèmes multiprocesseurs.

### Chronogramme du bus A/D

Le démultiplexage des signaux AD0 à AD15 (ou A16/S3 à A19/S6) se fait en **mémorisant l'adresse** lorsque celle-ci est présente sur le bus A/D, à l'aide d'un **verrou** (*latch*), ensemble de bascules D. La commande de mémorisation de l'adresse est générée par le microprocesseur : signal **ALE** (*Address Latch Enable*).

Un cycle de bus se décompose en 4 temps d'horloge T1-T4 : en T1, l'adresse est présentée sur le bus AD ; à partir de T2, la donnée circule sur le même bus ; ALE s'active brièvement en T1 pour verrouiller l'adresse ; RD (lecture) ou WR (écriture) s'active pendant les temps suivants.

### Circuit de démultiplexage A/D

**Fonctionnement :**

- si ALE = 1, le verrou est transparent (Q = D) ;
- si ALE = 0, mémorisation de la dernière valeur de D sur les sorties Q ;
- les signaux de lecture (RD) ou d'écriture (WR) ne sont générés par le microprocesseur que lorsque les données sont présentes sur le bus A/D.

*Exemples de bascules D :* circuits 8282, 74373, 74573.

- **RD :** signal de lecture d'une donnée.
- **WR :** signal d'écriture d'une donnée.
- **M/IO :** (*Memory/Input-Output*) indique si le 8086 adresse la mémoire (M/IO = 1) ou les entrées/sorties (M/IO = 0).
- **DEN :** (*Data Enable*) indique que des données sont en train de circuler sur le bus A/D (équivalent de ALE pour les données).
- **DT/R :** (*Data Transmit/Receive*) indique le sens de transfert des données :
  - DT/R = 1 : données émises par le microprocesseur (écriture) ;
  - DT/R = 0 : données reçues par le microprocesseur (lecture).

Les signaux DEN et DT/R sont utilisés pour la commande de **tampons de bus** (*buffers*).

*Exemples de tampons de bus :* circuits transmetteurs bidirectionnels 8286 ou 74245.

:::note Remarques
- Dans le domaine de l'électronique numérique, un tampon est simplement un circuit non inverseur à une entrée et une sortie. L'état logique de la sortie est égal à celui de l'entrée.
- On appelle **sortance** d'un circuit intégré numérique le nombre d'entrées de circuits de même technologie que l'on peut raccorder à une même sortie. Cette sortance est en pratique de l'ordre de 10, même si certaines technologies, comme les circuits CMOS, affichent des valeurs bien supérieures.
- Des étages tampons sont très souvent utilisés dans les circuits à microprocesseur. En effet, les bus d'adresses et de données du microprocesseur sont reliés aux mémoires, aux ports d'entrée et de sortie, et aux différents périphériques du système, ce qui multiplie le nombre d'entrées pilotées.
:::

- **BHE :** (*Bus High Enable*) signal de lecture de l'octet de poids fort du bus de données. Le 8086 possède un bus d'adresses sur 20 bits, d'où la capacité d'adressage de 1 Mo ou 512 Kmots de 16 bits (bus de données sur 16 bits).

  *(1 Mo = 1024 Ko = 1024 × 8 Kbits = 512 × 16 Kbits = 512 Kmots.)*

  Le méga-octet adressable est divisé en deux banques de 512 Ko chacune : la **banque inférieure** (ou paire) et la **banque supérieure** (ou impaire).

Ces deux banques sont sélectionnées par :

- **A0** pour la banque paire qui contient les octets de poids faible ;
- **BHE** pour la banque impaire qui contient les octets de poids fort.

Seuls les bits A1 à A19 servent à désigner une case mémoire dans chaque banque de 512 Ko. Le microprocesseur peut ainsi lire et écrire des données sur 8 bits ou sur 16 bits :

| BHE | A0 | Octets transférés |
|---|---|---|
| 0 | 0 | Les deux octets (mot complet) |
| 0 | 1 | Octet fort (adresse impaire) |
| 1 | 0 | Octet faible (adresse paire) |
| 1 | 1 | Aucun octet |

:::note Remarque
Le 8086 ne peut lire une donnée sur 16 bits en une seule fois, uniquement si l'octet de poids fort de cette donnée est rangé à une adresse impaire et l'octet de poids faible à une adresse paire (alignement sur les adresses paires), sinon la lecture de cette donnée doit se faire en deux opérations successives, d'où une augmentation du temps d'exécution du transfert dû à un mauvais alignement des données.
:::

### Réalisation des deux banques avec plusieurs boîtiers mémoire

Chaque banque (paire et impaire) est réalisée avec deux boîtiers mémoire `64K × 8`, sélectionnés par un décodeur 74138 recevant A17-A19 (pour la banque paire, activé par A0) ou A17-A19 (pour la banque impaire, activé par BHE).

### Création du bus système du 8086

Le bus système complet se construit à partir du 8086, d'un générateur d'horloge **8284** (fournissant CLK, RESET, READY), de trois bascules **8282** pour démultiplexer et verrouiller les bus d'adresses (BHE/A19-A16, A15-A8, A7-A0), et de deux transmetteurs **8286** pour les bus de données (D15-D8, D7-D0), le tout piloté par ALE, DEN, DT/R.

## Organisation interne du 8086

Le 8086 est constitué de deux unités fonctionnant en parallèle :

- **l'unité d'exécution** (EU : *Execution Unit*) ;
- **l'unité d'interface de bus** (BIU : *Bus Interface Unit*).

**Rôle des deux unités :**

- l'unité d'interface de bus (BIU) recherche les instructions en mémoire et les range dans une **file d'attente** ;
- l'unité d'exécution (EU) exécute les instructions contenues dans la file d'attente.

Les deux unités fonctionnent simultanément, d'où une accélération du processus d'exécution d'un programme.

La BIU contient les registres de segments (DS, SS, CS, ES), le pointeur d'instruction IP, la logique de génération d'adresses/contrôle de bus, et la file d'attente des instructions (6 octets). L'EU contient les registres généraux (AX, BX, CX, DX = AH/AL, BH/BL, CH/CL, DH/DL sur 16 bits), les pointeurs et index (SI, DI, SP, BP), l'UAL, les indicateurs, et des registres temporaires — connectés à la BIU par un bus de données interne 16 bits.

## Les registres du 8086

Le microprocesseur 8086 contient **14 registres** répartis en 4 groupes :

### Registres généraux (4 registres sur 16 bits)

```
AX = (AH,AL)
BX = (BH,BL)
CX = (CH,CL)
DX = (DH,DL)
```

Ils peuvent être également considérés comme 8 registres sur 8 bits. Ils servent à contenir temporairement des données. Ce sont des registres généraux mais ils peuvent être utilisés pour des opérations particulières.

*Exemple :* AX = accumulateur, CX = compteur.

### Registres de pointeurs et d'index (4 registres sur 16 bits)

**Pointeurs :**

- **SP** (*Stack Pointer*) : pointeur de pile (la pile est une zone de sauvegarde de données en cours d'exécution d'un programme) ;
- **BP** (*Base Pointer*) : pointeur de base, utilisé pour adresser des données sur la pile.

**Index :**

- **SI** : *Source Index* ;
- **DI** : *Destination Index*.

Ils sont utilisés pour les transferts de chaînes d'octets entre deux zones mémoire. Les pointeurs et les index contiennent des adresses de cases mémoire.

### Pointeur d'instruction et indicateurs (flags) (2 registres sur 16 bits)

**Pointeur d'instruction (IP)** contient l'adresse de la prochaine instruction à exécuter.

**Flags** (registre 16 bits) : bits 15-12 réservés, puis `O D I T S Z _ A _ P _ C` (bits 11 à 0).

- **CF :** indicateur de retenue (*carry*) ;
- **PF :** indicateur de parité ;
- **AF :** indicateur de retenue auxiliaire ;
- **ZF :** indicateur de zéro ;
- **SF :** indicateur de signe ;
- **TF :** indicateur d'exécution pas à pas (*trap*) ;
- **IF :** indicateur d'autorisation d'interruption ;
- **DF :** indicateur de décrémentation ;
- **OF :** indicateur de dépassement (*overflow*).

### Registres de segments (4 registres sur 16 bits)

- **CS** (*Code Segment*) : registre de segment de code ;
- **DS** (*Data Segment*) : registre de segment de données ;
- **SS** (*Stack Segment*) : registre de segment de pile ;
- **ES** (*Extra Segment*) : registre de segment supplémentaire pour les données.

Les registres de segments, associés aux pointeurs et aux index, permettent au microprocesseur 8086 d'adresser l'ensemble de la mémoire.

## Gestion de la mémoire par le 8086

L'espace mémoire adressable par le 8086 est de 2<sup>20</sup> = 1 048 576 octets = 1 Mo (20 bits d'adresses). Cet espace est divisé en **segments**. Un segment est une zone mémoire de 64 Ko (65 536 octets) définie par son adresse de départ qui doit être un multiple de 16.

Dans une telle adresse, les 4 bits de poids faible sont à zéro. On peut donc représenter l'adresse d'un segment avec seulement ses 16 bits de poids fort, les 4 bits de poids faible étant implicitement à 0.

Pour désigner une case mémoire parmi les 2<sup>16</sup> = 65 536 contenues dans un segment, il suffit d'une valeur sur 16 bits.

Ainsi, une case mémoire est repérée par le 8086 au moyen de deux quantités sur 16 bits :

- l'adresse d'un **segment** ;
- un **déplacement** ou **offset** (appelé aussi adresse effective) dans ce segment.

Cette méthode de gestion de la mémoire est appelée **segmentation de la mémoire**.

La donnée d'un couple (segment, offset) définit une **adresse logique**, notée sous la forme `segment : offset`.

L'adresse d'une case mémoire donnée sous la forme d'une quantité sur 20 bits est appelée **adresse physique** car elle correspond à la valeur envoyée réellement sur le bus d'adresses A0 - A19.

**Correspondance entre adresse logique et adresse physique :**

```
   segment (16 bits) + 0000 (4 bits) = 20 bits
 +           offset (16 bits)
 ────────────────────────────────────────────
   adresse physique (20 bits)
```

Ainsi, l'adresse physique se calcule par l'expression :

```
adresse physique = 16 × segment + offset
```

car le fait d'injecter 4 zéros en poids faible du segment revient à effectuer un décalage de 4 positions vers la gauche, c'est-à-dire une multiplication par 2<sup>4</sup>.

### Les 4 segments actifs

À un instant donné, le 8086 a accès à 4 segments dont les adresses se trouvent dans les registres de segment CS, DS, SS et ES.

- Le **segment de code** contient les instructions du programme.
- Le **segment de données** contient les données manipulées par le programme.
- Le **segment de pile** contient la pile de sauvegarde.
- Le **segment supplémentaire** peut aussi contenir des données.

Le registre CS est associé au pointeur d'instruction IP, ainsi la prochaine instruction à exécuter se trouve à l'adresse logique `CS : IP`.

De même, les registres de segments DS et ES peuvent être associés à un registre d'index. *Exemple :* `DS : SI`, `ES : DI`. Le registre de segment de pile peut être associé aux registres de pointeurs : `SS : SP` ou `SS : BP`.

:::note Remarque
Les segments ne sont pas nécessairement distincts les uns des autres, ils peuvent se chevaucher ou se recouvrir complètement.
:::

Le nombre de segments utilisé définit le **modèle mémoire** du programme (par exemple : 3 segments distincts code/données/pile, ou un seul segment partagé code+données+pile).

### Contenu des registres après un RESET du microprocesseur

```
IP = 0000H
CS = FFFFH
DS = 0000H
ES = 0000H
SS = 0000H
```

Puisque CS contient la valeur FFFFH et IP la valeur 0000H, la 1ère instruction exécutée par le 8086 se trouve donc à l'adresse logique `FFFFH : 0000H`, correspondant à l'adresse physique **FFFF0H** (bootstrap). Cette instruction est généralement un saut vers le programme principal qui initialise ensuite les autres registres de segment.

</TabItem>
<TabItem value="pdf" label="PDF">

<iframe src="/pdfs/micp-ch3-microprocesseur-8086.pdf" width="100%" height="800px" style={{border: '1px solid var(--ifm-color-emphasis-300)'}} />

</TabItem>
</Tabs>
