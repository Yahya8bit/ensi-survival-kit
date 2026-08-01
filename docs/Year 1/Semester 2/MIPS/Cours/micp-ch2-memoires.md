---
sidebar_position: 2
title: Chapitre II - Les Mémoires
sidebar_label: Ch2 - Les Mémoires
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre II : LES MEMOIRES

*Cours Architecture & Microprocesseur — ENSI — Dr. Ing. Montassar EZZINE — II1 — 2025/2026*

## Mémoires ROM et RAM

On distingue deux types de mémoires :

- **les mémoires vives** (RAM : *Random Access Memory*) ou mémoires volatiles : Elles perdent leur contenu en cas de coupure d'alimentation. Elles sont utilisées pour stocker temporairement des données et des programmes. Elles peuvent être lues et écrites par le microprocesseur.
- **les mémoires mortes** (ROM : *Read Only Memory*) ou mémoires non volatiles : Elles conservent leur contenu en cas de coupure d'alimentation. Elles ne peuvent être que lues par le microprocesseur (pas de possibilité d'écriture). On les utilise pour stocker des données et des programmes de manière définitive.

Les mémoires sont caractérisées par **leur capacité** : nombre total de cases mémoire contenues dans un même boîtier.

:::note Remarque
Une mémoire est un élément de stockage d'information :

- Les bits stockés sont organisés en forme de matrice : la dimension de la mémoire est donnée par le nombre de lignes fois la largeur de la ligne.
- Chaque ligne de la mémoire est appelée **un mot**. Elle est identifiée par une adresse (numéro de la ligne).
- Le nombre de lignes est toujours une **puissance de deux**.
- Deux opérations sont possibles, toujours sur un mot complet : la lecture (*read*) et l'écriture (*write*).
:::

### Mémoire RAM : Aperçu

Une mémoire RAM est organisée en matrice de cellules accessibles individuellement : des lignes de sélection de rangée (adresses A3-A5) et des lignes de sélection de colonne (adresses A0-A2) permettent d'adresser une cellule précise, avec des lignes d'entrée/sortie de données et un fil Read/Write partagé.

- Le terme **« accès aléatoire »**, qualifiant ce type de mémoire, signifie que l'on peut accéder à chaque case mémoire sans respecter un ordre préétabli mais au hasard des besoins et des choix.
- **La cellule élémentaire d'une mémoire électronique** est essentiellement constituée d'une bascule dotée d'un réseau combinatoire extérieur tel qu'il permette l'enregistrement et la lecture des données (entrée `DIN`, signaux `R` (Read) / `W` (Write), sortie `DOUT`).

:::note Remarques
- Un interrupteur peut être utilisé comme élément de mémoire : le levier de cet interrupteur peut se trouver dans deux positions distinctes, orienté vers le haut ou vers le bas.
- Grâce à cette convention, le dispositif devient une cellule de mémoire à deux états, ou binaire.
- La cellule de mémoire, en général, est donc un circuit ou une partie de circuit qui peut emmagasiner un seul bit d'information : 0 ou 1.
- La bascule est l'équivalent électronique de l'interrupteur dont nous venons de parler.
:::

### Mémoire ROM : Aperçu

Une mémoire morte à 16 bits est structurée en quatre mots de quatre bits chacun. Chaque cellule de mémoire est formée **par une diode** et **par un interrupteur** qui est soit ouvert, soit fermé — le tout piloté par un décodeur de rangée (adresses A0-A1) via des buffers d'entrée/sortie.

**Exemple de lecture (adresse `11` en binaire) :**

Le décodeur fait correspondre à `11` (base 2) la valeur `3` (base 10). La sortie 3 est donc à 1. On obtient donc en sortie D3 = 0 (interrupteur I3 ouvert), D2 = 1 (interrupteur I2 fermé), D1 = 1 (interrupteur I1 fermé) et enfin D0 = 1 car I0 est fermé.

Les interrupteurs fermés pour les autres rangées n'ont pas d'influence car les diodes qui leur sont associées sont toutes bloquées. *(Résultat : la donnée lue en ligne 3 est `0 1 1 1`.)*

## Mémoire CACHE

Elle est très rapide, mais aussi très chère. Il s'agit souvent de **SRAM**.

**Hiérarchie mémoire** (du plus rapide/cher/petit au plus lent/bon marché/grand) :

```
Registres
Cache Niveau 1 (L1)
Cache Niveau 2 (L2)
Mémoire centrale (RAM dynamique)
Mémoire de masse (disques durs, mémoires flash)
Archivage / Backup (CD-ROM, DVD, bandes magnétiques)
```

*(Capacité augmente vers le bas ; Prix et Vitesse augmentent vers le haut.)*

La présence de mémoire cache permet **d'accélérer l'exécution d'un programme** (elle accélère les communications entre microprocesseur et mémoire principale). De ce fait, plus la taille de la mémoire cache est grande, plus la taille des programmes accélérés peut être élevée. Il y a cependant une limite au-delà de laquelle l'augmentation de la taille du cache ne sert plus à rien.

```
CPU ⇄ L1 ⇄ L2 ⇄ Mémoire principale
     (mot)  (ligne)
```

La mémoire cache possède plusieurs sens. La première définition, la plus simple à comprendre, est celle utilisée par certains logiciels, par **stockage d'informations sur le disque dur**. La deuxième est un peu plus complexe, car elle intervient dans le fonctionnement des **traitements numériques du processeur**.

### Cas 1 – le cache logiciel

L'exemple le plus concret pour présenter le cache logiciel est l'un des fonctionnements d'un navigateur Internet (comme Internet Explorer...).

- Quand vous parcourez une page Internet pour la première fois, elle est plus longue à s'afficher que si l'on revenait dessus pour la deuxième fois. Pourquoi ? Tout simplement parce qu'une page Internet contient dans 90 % des cas, des images et autres insertions visuelles (flash, scripts, etc.). Lors de votre premier chargement de cette page, le navigateur va anticiper votre navigation en enregistrant un maximum d'information qui juge trop lourd en chargement, sur une partie du disque dur à un endroit bien précis (celui déterminé par votre navigateur).
- Quand vous allez visiter une seconde fois la page (5 min après par exemple), elle s'affichera instantanément, car avant le chargement, le navigateur prend la peine de parcourir le cache pour savoir s'il n'existe pas déjà des informations liées à cette page. Si oui, plutôt que télécharger une autre fois les informations, il restitue ce contenu du cache, lié au chargement de la page.
- L'utilité du cache est simple : elle permet tout simplement d'avoir sous le coude des informations déjà enregistrées, et de les restituer plus vite sur demande.

:::note Remarque
Les taux de transfert d'une image en cache sur le disque dur, est 100 fois plus rapide que le chargement via Internet.
:::

### Cas 2 – le cache du processeur

C'est une petite zone de mémoire très utile pour les traitements numériques du processeur. Elle se distingue en deux parties :

- **le cache interne :** gravé dans le processeur lui-même, appelée « cache L1 »
- **le cache externe :** mémoire supplémentaire disponible sur le support du processeur, appelée « cache L2 »

## Schéma fonctionnel d'une mémoire

Le nombre de lignes d'adresses dépend de la capacité de la mémoire : n lignes d'adresses permettent d'adresser 2<sup>n</sup> cases mémoire.

8 bits d'adresses permettent d'adresser 256 octets, 16 bits d'adresses permettent d'adresser 65536 octets (= 64 Ko), ...

**Exemple :** mémoire RAM 6264, capacité = 8K×8 bits (8Ko) : 13 broches d'adresses A0 à A12, 2<sup>13</sup> = 8192 = 8 Ko.

:::note Remarque
2<sup>10</sup> = 1024 octets adressables, et là, pour des raisons pratiques on dit que 1024 octets = 1 Ko, au lieu de 1.024 Ko.
:::

```
n lignes d'adresses  A0..An-1  →┐                    ┌→ p lignes de données D0..Dp-1 (p=8 en général)
                                 │      RAM ou ROM      │
signal de lecture RD/OE ────────┤                    │
signal d'écriture WR (RAM) ─────┤                    │
validation de boîtier CS ───────┘  (chip select)     
```

## Interfaçage microprocesseur/mémoire

Le microprocesseur et la mémoire partagent : les lignes de données `D0..D7`, les lignes de commande `RD`/`WR`/`CS`, et les lignes d'adresses `A0..An-1`. Sur un schéma en bus, le regroupement de lignes de données est noté avec sa largeur (ex. `8` pour un bus de données 8 bits) et celui des adresses avec `n`.

## Chronogrammes de lecture/écriture en mémoire

Une caractéristique importante des mémoires est **leur temps d'accès** : c'est le temps qui s'écoule entre l'instant où l'adresse de la case mémoire est présentée sur le bus d'adresses et celui où la mémoire place la donnée demandée sur le bus de données. Ce temps varie entre 50 ns et 300 ns.

**Chronogramme de lecture en mémoire :** horloge → adresse stable sur le bus → commande de lecture autorisée → donnée stable disponible sur le bus après le temps d'accès.

- Le **temps d'accès**, correspondant à l'intervalle de temps entre la demande de lecture/écriture et la disponibilité de la donnée.

:::note Remarque
Si le temps d'accès d'une mémoire est supérieur à une période d'horloge (mémoire lente), le microprocesseur peut accorder à la mémoire un temps supplémentaire (une ou plusieurs périodes d'horloge), à la demande de celle-ci. Ce temps supplémentaire est appelé **temps d'attente** (*wait time : TW*).
:::

**Chronogramme d'écriture en mémoire :** l'adresse est placée sur le bus, puis après un **pallier de sécurité**, la donnée est placée sur le bus de données et l'écriture est autorisée.

## Connexion de plusieurs boîtiers mémoire sur le bus d'un microprocesseur

Les boîtiers mémoire possèdent une broche notée `CS` : *Chip Select*.

- Lorsque cette broche est active, le circuit peut être lu ou écrit.
- Lorsqu'elle est inactive, le circuit est exclu du service. Ses broches de données D0 à D7 passent à l'état de **haute impédance** : tout se passe comme si la mémoire était déconnectée du bus de données du microprocesseur, d'où la possibilité de connecter plusieurs boîtiers mémoire sur un même bus.

:::note Remarque
En électronique, la haute impédance (aussi connue comme *hi-Z*, *tri-state* (troisième état), ou *flottant*) est l'état d'une broche de sortie qui n'est pas commandée par la composante. Dans les composants digitaux, cela signifie que le signal n'est ni mis à un niveau logique haut, ni à un niveau logique bas (d'où le nom de troisième état). Un tel signal peut être vu comme un circuit ouvert (ou comme un fil « flottant ») car en le connectant à un composant à basse impédance il ne va pas l'affecter. La majorité des broches des circuits intégrés sont en fait des sorties *tri-state* qui sont connectées en interne à des entrées. C'est la base du fonctionnement des bus informatiques.
:::

Un seul signal CS doit être actif à un instant donné pour éviter les conflits entre les différents boîtiers.

### Exemple : connexion de trois boîtiers mémoire de 8 Ko chacun

Connexion de trois boîtiers mémoire d'une capacité de 8 Ko chacun (13 lignes d'adresses A0-A12) sur un bus d'adresses de 16 bits : les lignes A13, A14, A15 servent de signaux de sélection de boîtier (via des inverseurs vers `CS`), tandis que le bus de données D0-D7 et les commandes `RD`/`WR` sont partagés entre les trois mémoires.

Dans un même boîtier, une case mémoire est désignée par les bits d'adresses A0 à A12 (plage `0000H` à `1FFFH`).

- Pour atteindre la **mémoire N°1**, il faut mettre à 1 le bit A13 et à 0 les bits A14 et A15. Plage d'adresses : `2000H` à `3FFFH`.
- Pour la **mémoire N°2**, on doit avoir A13 = 0, A14 = 1 et A15 = 0. Plage d'adresses : `4000H` à `5FFFH`.
- Pour la **mémoire N°3**, on doit avoir A13 = 0, A14 = 0 et A15 = 1. Plage d'adresses : `8000H` à `9FFFH`.

On en déduit la **cartographie (mapping)** de la mémoire visible par le microprocesseur : la mémoire réelle implantée (mémoire n°1, n°2, n°3) occupe des zones distinctes et discontinues dans l'espace d'adressage total `0000H`–`FFFFH`.

## Décodage d'adresses

Les trois bits A13, A14 et A15 fournissent en fait 8 combinaisons, d'où la possibilité de connecter jusqu'à 8 boîtiers mémoire de 8 Ko (2<sup>13</sup> cases mémoire adressables) sur le bus.

La mémoire totale implantée devient donc de 8 × 8 Ko = **64 Ko** : valeur maximale possible avec 16 bits d'adresses.

Pour cela, il faut utiliser un circuit de décodage d'adresses : un **décodeur 3 vers 8** (ex : 74138), qui prend en entrée A15, A14, A13 (notées A, B, C) et produit 8 sorties `Y0`-`Y7`, chacune reliée au `CS` d'un boîtier mémoire.

**Table de vérité du décodeur d'adresses :**

| C | B | A | Y0 | Y1 | Y2 | Y3 | Y4 | Y5 | Y6 | Y7 |
|---|---|---|----|----|----|----|----|----|----|----|
| 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| 0 | 0 | 1 | 1 | 0 | 1 | 1 | 1 | 1 | 1 | 1 |
| 0 | 1 | 0 | 1 | 1 | 0 | 1 | 1 | 1 | 1 | 1 |
| 0 | 1 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | 1 | 1 |
| 1 | 0 | 0 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | 1 |
| 1 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |

*(Sortie active à l'état bas — 0 — pour sélectionner le boîtier correspondant.)*

**Le mapping de la mémoire :**

| Mémoire | Plage d'adresses |
|---|---|
| N° 0 | `0000H` – `1FFFH` |
| N° 1 | `2000H` – `3FFFH` |
| N° 2 | `4000H` – `5FFFH` |
| N° 3 | `6000H` – `7FFFH` |
| N° 4 | `8000H` – `9FFFH` |
| N° 5 | `A000H` – `BFFFH` |
| N° 6 | `C000H` – `DFFFH` |
| N° 7 | `E000H` – `FFFFH` |

## Classification des mémoires

```
                mémoires à semiconducteurs
                    /                \
          mémoires mortes         mémoires vives
         /    |     |    \             |     \
      ROM   PROM  EPROM EEPROM      DRAM     SRAM
```

### Mémoires vives

- **SRAM** (*Static Random Access Memory*) : mémoire statique à accès aléatoire, à base de bascules à semi-conducteurs à deux états (bascules RS). L'information est conservée tant que la tension d'alimentation est présente.
  - *Avantage :* très rapide, simple d'utilisation.
  - *Inconvénient :* compliquée à réaliser.
- **DRAM** (*Dynamic RAM*) : il faut recharger (rafraîchir) périodiquement les cellules de mémoire pour conserver les données.
  - *Avantage :* intégration élevée, faible coût.
  - *Inconvénient :* nécessite un rafraîchissement périodique à cause du courant de fuite des condensateurs.
  - *Application :* réalisation de la mémoire vive des ordinateurs.

### Mémoires mortes

- **ROM** (*Read Only Memory*) : mémoire à lecture seule. Son contenu est programmé une fois pour toutes par le constructeur.
  - *Avantage :* faible coût.
  - *Inconvénient :* nécessite une production en très grande quantité.
- **PROM** (*Programmable Read Only Memory*) : ROM programmable une seule fois par l'utilisateur en faisant sauter des fusibles. Nécessite un programmateur spécialisé : application d'une tension de programmation (21 ou 25 V) pendant 20 ms.

  :::note Remarque
  Une seule programmation est possible : elle est faite en brûlant des fusibles (un équipement particulier, le programmateur, est nécessaire). Par défaut, tous les bits sont initialement à 1 et l'on brûle les fusibles des bits qu'on doit programmer à 0.
  :::

- **EPROM** (*Erasable PROM*) : ROM programmable électriquement avec un programmateur et effaçable par exposition à un rayonnement ultraviolet (UV EPROM) pendant 30 minutes. *(Reconnaissable par sa fenêtre en quartz.)*
  - *Avantage :* reprogrammable par l'utilisateur.
- **EEPROM** (*Electrically Erasable PROM*) : ROM programmable et effaçable électriquement. Les EEPROM contiennent des données qui peuvent être modifiées de temps en temps.
  - *Avantage :* programmation sans extraction de la carte et sans programmateur.
  - *Inconvénient :* coût élevé.
- **FLASH** : le contenu est effacé électriquement et plus rapidement que sur les EEPROM. Le seul désavantage des mémoires Flash est que l'effacement n'est possible que dans sa totalité ou par secteurs, mais pas byte à byte (8 bits = 1 octet = 1 byte).

  :::note Remarque
  Trois opérations sont possibles dans une mémoire Flash :
  - **programmation :** initialement, tous les bits sont à 1. Pour programmer un bit à 0, il faut lui appliquer une tension. Une fois programmée, la mémoire peut garder son contenu pendant 100 ans, sans besoin d'alimentation électrique.
  - **lecture :** similaire à la lecture d'une RAM statique.
  - **effacement :** la mémoire Flash doit être effacée avant d'être reprogrammée.
  :::

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/micp-ch2-memoires.pdf" />

</TabItem>
</Tabs>
