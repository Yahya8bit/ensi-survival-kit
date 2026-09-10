---
sidebar_position: 4
title: Analyse — Modèle dynamique
sidebar_label: Modèle dynamique
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Modélisation dynamique

*II2-ENSI*

:::info Vous allez apprendre

- à choisir entre diagrammes de séquence, de communication, d'états-transitions et d'activités ;
- à lire l'ordre, les gardes et le parallélisme dans une interaction ;
- à modéliser le cycle de vie d'un objet, puis le déroulement d'un cas d'utilisation.

:::

## Perspectives d'un système

- **Statique** (ce que le système EST)
- **Fonctionnel** (ce que le système FAIT)
- **Dynamique** (comment le système EVOLUE)

## Aspects dynamiques du système

- Jusqu'ici, le système est décrit statiquement : → Le diagramme de classes
  - Décrit les messages (méthodes ou opérations) que les instances des classes peuvent recevoir mais ne décrit pas l'émission de ces messages
  - Ne montre pas le lien entre ces échanges de messages et les processus généraux que l'application doit réaliser
- Il faut maintenant décrire comment le système évolue dans le temps

## Modélisation dynamique — Objectifs

- Introduire les diagrammes d'interaction
- Introduire les diagrammes de comportement

## Diagrammes d'interactions

- Les diagrammes de séquences et les diagrammes de communication (ou collaboration) d'instances sont deux types de diagrammes d'interaction. Les diagrammes d'interaction représentent une interaction, c'est-à-dire un ensemble d'objets et leurs relations, y compris les messages qu'ils peuvent échanger. Ils présentent une vue dynamique d'un système.
- Les diagrammes de séquence sont des diagrammes d'interaction qui mettent l'accent sur le classement chronologique des messages, alors que les diagrammes de communication d'instances sont des diagrammes d'interaction qui mettent l'accent sur l'organisation structurelle des éléments qui envoient et reçoivent des messages.
- Les diagrammes de séquence et les diagrammes de communication d'instances sont isomorphes, c'est-à-dire que l'un peut être transformé en l'autre.

## Diagramme d'interactions

Expression des Besoins (Cas d'utilisation) → Description de l'interaction du système avec les acteurs extérieurs → Diagramme d'interaction.

- **Modèle conceptuel** (Analyse dynamique) : Description de l'interaction moyennant les objets (de l'analyse) du système → Diagramme d'Interaction
- **Modèle logique** (Conception dynamique) : Description de l'interaction moyennant les objets (de la conception) du système

## Diagrammes de séquences

Dérivés des scénarios de OMT :

- Montrent des exemples de coopération entre objets dans la réalisation de processus de l'application
- Illustrent la dynamique d'enchaînement des traitements à travers les messages échangés entre objets
- le temps est représenté comme une dimension explicite (en général de haut en bas)
- Les éléments constitutifs d'un scénario sont :
  - Un ensemble d'objets (et/ou d'acteurs)
  - Un message initiateur du scénario
  - La chronologie des messages échangés subséquemment
  - Les contraintes de temps (aspects temps réel)

## Présentation

- Diagramme de séquence : montre la séquence dans le temps des interactions entre les objets du système au sein d'un scénario.
  - Objet passif : activation dépend d'un fil externe
  - Objet actif : possède son propre fil d'exécution
- Un diagramme de séquence a deux dimensions :
  - **dimension verticale** : le temps ; l'ordre d'envoi d'un message est déterminé par sa position sur l'axe vertical du diagramme ; le temps s'écoule "de haut en bas" de cet axe.
  - **dimension horizontale** : les objets (et les acteurs) ; l'ordre de disposition des objets sur l'axe horizontal est sans importance.

```mermaid
sequenceDiagram
    participant c1 as :c1
    participant c5 as :c5
    participant c3 as :c3
```

*(objets sur l'axe horizontal, temps sur l'axe vertical)*

## Syntaxe graphique

Objets et messages : `Nom Objet:NomClasse`, `Nom Objet1:NomClasse1` (Objets = Instances de classes)

`nom message (paramètres)` : Message nom message émis par `Nom Objet` vers `Nom Objet1`.

## Ligne de vie et activation

- La « ligne de vie » représente l'existence de l'objet à un instant particulier :
  - Commence avec la création de l'objet
  - Se termine avec la destruction de l'objet
- L'activation est la période durant laquelle l'objet exécute une action lui-même ou via une autre procédure

## Notation

```mermaid
sequenceDiagram
    participant Client
    participant objet1 as objet1:Classe1
    participant objet2 as objet2:Classe2
    participant objet3 as objet3:Classe3
    Client->>objet1: op()
    objet1->>objet2: m1()
    objet1->>objet3: m2()
    objet3->>objet3: m3()
```

- Objet existant avant et après l'activation du scénario (objet2:Classe2)
- Objet créé dans le scénario (objet3:Classe3)
- Activité de l'objet / Ligne de vie

## Messages simples

- Communication entre objets
  - Des paramètres
  - Un retour
- Cas particuliers :
  - La récursivité
  - Les messages entraînant la construction d'un objet
  - Les destructions d'objets

## Messages synchrone vs asynchrone

- **Message synchrone** : Suite à l'envoi de son message, l'expéditeur (objet passif ou actif) perd le contrôle mais demeure en activation (invocation d'opération). Il demeure bloqué jusqu'à ce que le destinataire ait fini de traiter le message. Il retrouve ensuite le contrôle avec la réponse à son message (pouvant être représentée par une flèche pointillée).
- **Message simple** : L'expéditeur envoie un message au destinataire sans attendre de réponse (signal).
  - Si l'expéditeur est un objet passif : l'expéditeur perd le contrôle et termine son activation après l'envoi du message
  - Si l'expéditeur est un objet actif : l'envoi d'un message simple équivaut à l'envoi d'un message asynchrone.

## Catégorie de messages

Un objet actif initie et contrôle le flux d'activités. Graphiquement, la ligne pointillée verticale d'un objet actif est remplacée par un double trait vertical.

```mermaid
sequenceDiagram
    participant actif as o1:Obj (actif)
    participant passif as o2:Obj (passif)
    actif->>passif: 1: foo()
    passif-->>actif: retour
```

Dans le document source, la double ligne de vie de `o1` signale l'objet actif. `o2` est passif : son rectangle d'activation ne dure que pendant le traitement de `foo()`.

## Mode d'interaction procédural (i.e. synchrone)

- Au plus un objet détient le contrôle à la fois.
- Un objet obtient le contrôle quand il reçoit un message (i.e. on invoque une de ses méthodes). Ce moment détermine le début de son activation.
- Un objet rend le contrôle à son destinateur lorsqu'il lui renvoie sa réponse. Ce moment détermine la fin de son activation.
- Lorsqu'un objet en activation a le contrôle, il peut :
  - faire des calculs,
  - ou envoyer des messages : dans ce cas, l'objet demeure en activation mais cède à son tour le contrôle à son destinataire. Il ne peut rien faire jusqu'à ce qu'il reçoive la réponse de son destinataire (message synchrone ou dit « bloquant »).

## Mode d'interaction procédural

- Les objets sont dits « passifs », car on doit leur envoyer un message pour déclencher leur activation.
- Un seul fil d'exécution.
- Dans ce mode, seul un acteur peut envoyer un message ou faire des calculs sans l'intervention de qui que ce soit. Son activation est constante…
- L'identité des objets en activation est gérée dans une pile :
  - Dessus de la pile = objet en activation qui possède le contrôle
  - On empile l'identité d'un objet qui débute une activation.
  - On dépile l'identité d'un objet qui termine une activation.
- Les messages sont numérotés de façon à refléter l'imbrication des envois de messages.
  - Le message 2.2 est envoyé après que la réponse au message 2.1 ait été reçue
  - Il faut attendre la réponse au message 2.2.3 avant de pouvoir répondre au message 2.2.

## Exemple : mode d'interaction procédural

```mermaid
sequenceDiagram
    participant um as unMembre:EmprunteurDeLivre
    participant mb as mb:MembreBiblio
    participant exemplaire as exemplaire:Exemplaire
    participant livre as leLivre:Livre
    um->>mb: emprunter(exemplaire)
    mb->>mb: 1: okPourEmprunter
    mb->>exemplaire: 2: emprunter
    exemplaire->>livre: 2.1: estEmprunté
```

La numérotation reflète la pile d'appels : `2.1` est envoyé pendant le traitement de `2`.

## Autres notations pour des interactions avancées

On peut alors avoir besoin de :

- Interactions concurrentes
- Conditions (gardes) sur les messages
- Ligne de vie à branches multiples
- Itérations
- Contraintes temporelles (temps réel)

## Mode d'interaction concurrent (i.e. asynchrone)

- Certains objets disposent d'un propre fil d'exécution. Ils ont leur propre contrôle et leur activation est constante. Ces objets sont dits « actifs », car ils peuvent faire des calculs et envoyer des messages sans l'intervention de qui que ce soit.
- Les objets actifs peuvent envoyer deux types de messages :
  - **synchrones** : ils attendent la réponse de leur destinataire avant de poursuivre…
  - **asynchrones** : ils poursuivent leurs activités sans attendre la réponse à leur message… Celle-ci leur sera signalée.
- N.b. En mode procédural, tous les messages sont synchrones…

## Mode d'interaction concurrent

Il existe différentes façons de créer de nouveaux fils de contrôle (threads) :

1. À la réception d'un message, un objet peut découpler le fil d'exécution en envoyant plusieurs messages simultanément (fork).

```mermaid
sequenceDiagram
    participant o as o:Obj
    o->>o: 1.a: foo()
    o->>o: 1.b: bar()
```

Branchement : lorsque les messages n'ont pas de gardes mutuellement exclusives, on en déduit qu'ils sont concurrents : le traitement de `foo()` et celui de `bar()` peuvent être lancés en parallèle.

## Mode d'interaction concurrent

2. Un acteur peut spontanément décider d'envoyer un message et crée ainsi un nouveau fil d'exécution.
3. Un objet actif peut également découpler le fil d'exécution en envoyant un message asynchrone.
   - L'objet continue sans attendre le message de retour.
   - Il octroie ainsi un fil d'exécution indépendant à l'objet destinataire.

```mermaid
sequenceDiagram
    participant o1 as o1:Obj
    participant o2 as o2:Obj
    o1->>o2: 1: foo()
    o2->>o1: 2: bar()
```

## Exemples de scénarios

**Appel téléphonique**

- Scénario : le numéro appelé est occupé
  - L'appelant décroche le téléphone
  - L'appelant commence à composer le numéro
  - L'appelant termine de composer le numéro
  - La tonalité "occupée" commence à sonner
  - L'appelant raccroche le téléphone
- Scénario : le numéro appelé n'est pas occupé
  - L'appelant décroche le téléphone
  - L'appelant commence à taper le numéro
  - L'appelant termine de taper le numéro
  - Le téléphone commence à sonner
  - L'appelé décroche
  - La conversation se déroule
  - L'appelé raccroche le téléphone

## Exemple mode d'interaction concurrent (asynchrone)

```mermaid
sequenceDiagram
    participant appelant
    participant centrale as centrale téléphonique
    participant appele as appelé
    appelant->>centrale: 1: décrocher()
    centrale->>appelant: 2: envoyer_signal()
    appelant->>centrale: 3: composer_numéro()
    centrale->>appele: 4: chercher_destinataire()
    centrale->>appele: 5B: activer_sonnerie()
    centrale->>appelant: 5A: entendre_sonnerie()
    appele->>centrale: 6: décrocher()
    centrale->>appele: 7B: arrêter_sonnerie()
    centrale->>appelant: 7A: arrêter_signal_sonnerie()
```

## Messages avec garde

- Permet d'exprimer les alternatives de comportement.
- Message envoyé seulement si la garde est vraie.
- Les gardes doivent être mutuellement exclusives pour signifier que l'envoi est conditionnel (et non concurrent).

```mermaid
sequenceDiagram
    participant o as o:Obj
    o->>o: 1.a: [i=0] foo()
    o->>o: 1.b: [i=1] bar()
```

```mermaid
sequenceDiagram
    participant o as o:Obj
    o->>o: 1.1: [i=0] foo()
    o->>o: 1.2: [i=1] bar()
```

*(Différence ?)*

## Ligne de vie à branches multiples

Si deux messages, dont l'envoi est conditionnel à l'évaluation d'une garde, sont destinés à un même objet, on doit pouvoir exprimer le comportement de l'objet dans chaque cas…

```mermaid
sequenceDiagram
    participant o1 as o1:Obj1
    participant o2 as o2:Obj2
    o1->>o2: 3.1.a: [i=0] foo()
    o1->>o2: 3.1.b: [i=1] bar()
```

## Exemple : représentation de conditions

```mermaid
sequenceDiagram
    participant Client
    participant objet1 as objet1:Classe1
    participant objet2 as objet2:Classe2
    Client->>objet1: op()
    objet1->>objet2: [x<0] m1(x)
    objet1->>objet2: [x>0] m2(x)
```

Branchement conditionnel.

## Itération

On ajoute une clause d'itération (introduite par un `*`) à côté du message pour spécifier le nombre d'itérations ou l'invariant de l'itération :

- `*[i:=1..10]` : Le message est envoyé 10 fois
- `*[x<10]` : Le message est envoyé de façon répétée jusqu'à ce que x soit plus grand ou égal à 10.
- `*[item not found]` : Le message est envoyé de façon répétée jusqu'à ce que l'item soit trouvé….

Ne pas répéter la clause d'itération chez le destinataire (elle est implicite)… à moins de vouloir une boucle imbriquée.

## Exemple : Itération

```mermaid
sequenceDiagram
    participant a as a:ObjA
    participant b as b:ObjB
    participant c as c:ObjC
    a->>b: 3.1:*[i:=1..2] a()
    b->>c: 3.1.1: b()
```

## Autre représentation : fragments d'interaction

Un fragment combiné représente des articulations d'interactions. Il est défini par un opérateur et des opérandes. L'opérateur conditionne la signification du fragment combiné. Les fragments combinés peuvent faire intervenir l'ensemble des entités participant au scénario ou juste un sous-ensemble.

Les principaux opérateurs en UML 2 :

- Opérateur "Alternative" (`alt`)
- Opérateur "Option" (`opt`)
- Opérateur "Break"
- Opérateur "Parallel" (`par`)
- Opérateur "Loop"

## Les fragments d'interaction — opérateur `alt`

L'opérateur "alt" désigne un choix, une alternative. Il représente des comportements possibles : c'est en quelque sorte l'équivalent du SI...ALORS...SINON : donc, une seule des branches alternatives sera réalisée dans un scénario donné.

- La condition d'exécution d'une des branches alternatives (l'équivalent du SI) peut être explicite ou implicite.
- L'utilisation de l'opérateur `else` permet d'indiquer que la branche est exécutée si la condition du `alt` est fausse.

L'exemple montre un opérateur "alt" : soit l'utilisateur rentre un code correct et dans ce cas le diagramme de séquence relatif à la vérification du code est appelé, soit l'utilisateur rentre un code erroné, trois fois, et sa carte est gardée.

## Les fragments d'interaction — opérateur `opt`

L'opérateur "opt" désigne un fragment combiné optionnel comme son nom l'indique : c'est-à-dire qu'il représente un comportement qui peut se produire... ou pas. Un fragment optionnel est équivalent à un fragment "alt" qui ne posséderait pas d'opérande `else` (qui n'aurait qu'une seule branche).

L'exemple montre un opérateur "opt" : l'utilisateur, s'il est mécontent, peut se défouler sur le distributeur de billets.

## Les fragments d'interaction — opérateur `break`

L'exemple montre un opérateur "break" : l'utilisateur, lorsque le distributeur lui demande son code, peut choisir de rentrer son code ou de consulter l'aide. S'il choisit de consulter l'aide, le flot d'interaction relatif à la saisie du code est interrompu.

L'opérateur "break" est utilisé pour représenter des scénarii d'exception. Les interactions de ce fragment seront exécutées à la place des interactions décrites en dessous. Il y a donc une notion d'interruption du flot "normal" des interactions.

## Les fragments d'interaction — opérateur `break` (suite)

L'équivalent de ce diagramme de séquence sans l'opérateur `break` correspond aux deux diagrammes de séquence suivants :

Sans `break`, il faut représenter séparément le scénario normal de saisie du code et le scénario « consulter l'aide ». Le fragment permet de conserver ces deux possibilités dans un seul diagramme, en indiquant explicitement que la seconde interrompt le flot normal.

## Les fragments d'interaction — opérateur `par`

L'opérateur "par" est utilisé pour représenter des interactions ayant lieu en parallèle. Les interactions des différents opérandes peuvent se mélanger, s'intercaler, dans la mesure où l'ordre imposé dans chaque opérande est respecté.

L'exemple montre qu'un développeur ayant accès à Internet peut consulter en parallèle, soit le site [http://www.developpez.com](http://www.developpez.com) soit le site [http://www.developpez.net/forums/](http://www.developpez.net/forums/) sans préférence d'ordre.

## Les fragments d'interaction — opérateur `Loop`

L'opérateur "Loop" (boucle) est utilisé pour décrire un ensemble d'interactions qui s'exécutent en boucle. En général, une contrainte appelée garde indique le nombre de répétitions (minimum et maximum) ou bien une condition booléenne à respecter.

L'exemple montre un exemple pour l'opérateur "loop" : le diagramme de séquence indique que lorsque l'utilisateur se trompe trois fois de code, la carte est gardée et le distributeur se remet en mode d'attente d'une carte.

## Les fragments d'interaction — les références

- Une référence (interaction occurrence) peut être vue comme un pointeur ou un raccourci vers un autre diagramme de séquence existant.
- Cela équivaut à copier le contenu du diagramme de séquence pointé en lieu et place de la référence.
- Cela permet de factoriser des parties de comportement utilisées dans plusieurs scénarios.

## Les fragments d'interaction — exemple

Cas d'utilisation principal : Jouer une partie de démineur

- Dans la boucle (`loop`) de jeu, il y a trois possibilités (`alt`) : perte, gain ou cas normal. Les cas de perte ou de gain arrêtent la partie (`break`). Sinon, le joueur passe son temps à découvrir ou (`alt`) marquer des cases.
- Ensuite, le joueur pourra (`opt`) entrer son nom dans les meilleurs scores s'il (`[]`) a le meilleur temps en fonction du niveau choisi.
- On peut ajouter la configuration du jeu comme étape optionnelle (`opt`) avant de commencer à jouer.

## Contraintes temporelles

**Lecture du scénario et chronologie**

- Un scénario se lit de haut en bas dans le sens chronologique d'échange des messages.
- Des contraintes temporelles peuvent être ajoutées au scénario.

```mermaid
sequenceDiagram
    participant o1 as Nom Objet1
    participant o2 as Nom classe2
    o1->>o2: demande (a)
    o2-->>o1: réponse (b) — {b-a < 5 sec.}
```

`{d'-d < 1 sec.}`

## Le diagramme de séquence système

- Le diagramme de séquence système (DSS) décrit les interactions entre les acteurs et le système selon un point de vue temporel (l'accent est mis sur la chronologie des envois/réceptions de messages entre les acteurs et le système).
- Le DSS permet la description de la dynamique du système vu de l'extérieur où le système est vu comme une « boîte noire ».
- Le système est donc vu de l'extérieur (par les acteurs) sans préjuger de comment il sera réalisé. La « boîte noire » sera ouverte (décrite) seulement en conception.

## Le diagramme de séquence système

- Le DSS est typiquement utilisé pour représenter le fonctionnement d'un cas d'utilisation sous la forme d'une séquence de messages échangés entre les acteurs et le système. Il représente la synthèse des scénarios liés aux cas d'utilisation.
- Un scénario : une suite spécifique d'événements (d'actions et d'interactions) entre les acteurs et le système (les DSS sont toujours lus du haut vers le bas, pour illustrer l'ordre dans lequel les messages sont envoyés entre les acteurs et le système).

```mermaid
sequenceDiagram
    participant acteur
    participant systeme as système
    acteur->>systeme: E1
    acteur->>systeme: E2
    systeme-->>acteur: R1
```

## Le diagramme de séquence système — les principaux concepts

- Les acteurs et le système : on retrouve dans le diagramme une ligne de vie associée à chaque acteur et au système, ils interagissent avec le système et à chaque cas d'utilisation est associée une ligne de vie « lifeline » verticale du temps.
- Ligne de vie : une entité (acteur/système) est représentée graphiquement en plaçant un rectangle au-dessus de la ligne de vie.
- Barre d'activation : illustre la période de contrôle pendant laquelle l'objet effectue une action. Sur les diagrammes de séquence, il peut être un point de contrôle.
- On peut aussi inscrire des commentaires sur le diagramme. Ces commentaires peuvent être reliés à toute entité du diagramme.

## Le diagramme de séquence système — les principaux concepts

- Les messages : sont représentés par des flèches directionnelles. Au-dessus des flèches directionnelles figure un texte informant du message envoyé entre les entités. Ils peuvent être :
  - **Synchrone** : l'acteur appelant attend le message de retour avant de continuer son exécution (équivalent d'une conversation téléphonique)
  - **Asynchrone** : l'objet appelant n'attend pas le message de retour (équivalent à un échange de courriels)
- Il est possible de montrer une entité qui s'envoie un message à elle-même à l'aide d'un message réflexif.
- Sur les diagrammes de séquence, les messages peuvent être dirigés de droite à gauche ou de gauche à droite.

## Les diagrammes de séquences — buts

1. décrire les cas d'utilisation (scénarios) / diagramme de séquence système
2. décrire les interactions entre objets : diagramme de séquence

```mermaid
sequenceDiagram
    participant client as Client
    participant billetterie as :Billetterie
    client->>billetterie: Exprimer demande {res., retrait}
    billetterie->>client: [retrait] Identifiez-vous
    client->>billetterie: Numéro client
    billetterie->>billetterie: [numéro OK] Traiter commande
    billetterie->>client: payer
    client->>billetterie: Payer par carte
    billetterie-->>client: billets
```

La même diapositive développe ensuite cette boîte noire en interactions entre `:Menu`, `:Loggin` et `:Imprimante` : c'est la différence entre le DSS du cas d'utilisation et le diagramme de séquence de conception.

## Diagrammes de communication

**But** : Diagramme illustrant les interactions entre les objets d'un système en mettant l'accent sur l'organisation structurelle des objets participants (et non pas sur l'ordre temporel des messages envoyés/reçus).

**Collaboration** =

1. Ensemble d'objets qui interagissent ensemble pour réaliser une tâche commune
2. Ensemble de liens (pertinents) existant entre ces objets

## Diagrammes de communication — introduction

- Les diagrammes de communication fournissent un second point de vue des aspects dynamiques. En effet un diagramme de communication correspond à une synthèse de l'ensemble des diagrammes objets et des diagrammes de séquences.
- Comme dans les diagrammes objets, les objets sont représentés par des rectangles, connectés par des lignes qui représentent des liens.
- **Remarque** : les relations entre les diagrammes de classes sont appelées des associations alors que les relations entre les objets sont appelées des liens. Dans les deux cas ils représentent des échanges de messages.
- Contrairement aux diagrammes d'objets, les nombres, les noms d'opérations ainsi que les flèches sont placés sur les liens pour indiquer un flot spécifique de message.

## Diagrammes de communication

- Les scénarios et diagrammes de collaboration :
  - Montrent des exemples de coopération des objets dans la réalisation de processus de l'application
- Les scénarios :
  - Illustrent la dynamique d'enchaînement des traitements d'une application en introduisant la dimension temporelle
- Les diagrammes de collaboration :
  - Dimension temporelle représentée par numéros de séquence : définition d'un ordre partiel sur les opérations
  - Représentation des objets et de leurs relations
  - Utilisent les attributs et opérations

## Utilisation des diagrammes de collaboration

- Ils peuvent être attachés à :
  - Une classe
  - Une opération
  - Un use-case
- Ils s'appliquent :
  - En spécification
  - En conception (illustration de design patterns)

## Éléments constitutifs

- Un contexte contenant les éléments mis en jeu durant l'opération :
  - Un acteur
  - Un ensemble d'objets, d'attributs et de paramètres
  - Des relations entre ces objets
  - Des interactions
  - Des messages
- Un message initiateur du diagramme provenant d'un :
  - Acteur de l'application,
  - Objet de l'application.
- Les numéros de séquence des messages échangés entre les objets de cet ensemble suite au message initiateur

## Représentation d'une collaboration (niveau instance)

```mermaid
flowchart LR
    Pierre ---|père| Fred
    Marie ---|mère| Fred
    Fred -->|"1: cashRequest($25)"| Marie
    Marie -->|"2: cashReceived($25)"| Fred
```

**Équivalent au diagramme de séquence** :

```mermaid
sequenceDiagram
    participant Fred
    participant Marie
    Fred->>Marie: cashRequest($25)
    Marie-->>Fred: cashReceived($25)
```

## Exemple (1)

- Les messages :
  - Opérations
  - Réception d'événements
- Le séquencement :
  - Les séquences consécutives
  - Les séquences imbriquées

```mermaid
flowchart LR
    Acteur["acteur"] -->|"afficher()"| Carre[":Carré"]
    Carre -->|"1 *(i=1..4): afficher()"| Segment[":Segment"]
    Segment -->|"1.1: position()"| Origine["origine:Point"]
    Segment -->|"1.2: position()"| Destination["destination:Point"]
```

## Exemple (2) : création et destruction dynamiques d'objets

```mermaid
flowchart LR
    Doyen[": Doyen"] -->|"1: n := obtenirNom()"| ProfAgrege[":ProfAgrégé {new}"]
    Doyen -->|"2: new ProfAgrégé(n)"| ProfAgrege
    Doyen -->|"3: destroy()"| ProfAdjoint[":ProfAdjoint {destroyed}"]
```

**Exemple** — Comme les diagrammes de séquence : interactions entre objets du système avec un accent particulier sur la structure spatiale statique des objets (contexte des objets). Les messages sont numérotés pour indiquer l'ordre des envois. Message : Asynchrone, Synchrone, etc.

```mermaid
flowchart LR
    Ascenseur[": ascenseur"] -->|"1 : monter"| Cabine[": cabine"]
    Cabine -->|"2 : allumer"| Lumiere[": lumière"]
    Cabine -->|"3 : fermer"| Porte[": porte"]
```

## Encore un exemple

```mermaid
flowchart LR
    Acteur["acteur"] -->|"monter_étage(n)"| Ascenseur[":Ascenseur"]
    Ascenseur -->|"1.1: monter(n)"| Cabine[":Cabine"]
    Cabine -->|"1.1.1.a: allumer()"| Lumiere[":Lumière"]
    Cabine -->|"1.1.1.b: fermer()"| Porte[":Porte"]
    Ascenseur -->|"1.2: actionner()"| Moteur[":Moteur"]
```

## Diagrammes de communication — buts

1. Décrire l'interaction des objets entre eux
2. Illustrer les scénarios des use cases
3. Valider les choix d'analyse et de conception (prototypage)
4. Aider à élaborer des diagrammes de classes de conception

```mermaid
flowchart LR
    Client[": Client"] -->|"1 : retraitBillets()"| x["x : ClasseA"]
    x -->|"1 : message"| y["y : ClasseB"]
    Menu[": Menu [validation]"] -->|"2 : afficher()"| x
    x -->|"2 : message"| z["z : ClasseB"]
    x -->|"3 : indentifier(numClient)"| Loggin[": Loggin [Interrogation]"]
    Loggin -->|"4.1 : accepter(numClient)"| x
    Loggin -->|"4.2 : refuser(numClient)"| x
```

Le diagramme de droite applique les mêmes conventions à la billetterie : le client envoie `1: retraitBillets()` à `:Menu`, `:Menu` envoie `2: afficher()` à `:Loggin`, puis le client fournit `3: identifier(numClient)` ; `:Loggin` répond par `4.1: accepter(numClient)` ou `4.2: refuser(numClient)`.

## Diagrammes de communication — conventions

- `x : ClasseA [x] 1: message → y : ClasseB` — message soumis à la condition x
- `x : ClasseA 1.a : message1 → y : ClasseB` ; `x : ClasseA 1.b : message2 → z : ClasseC` — message1 et message2 en parallèle
- `x : ClasseA 1.1 : message1 → y : ClasseB` ; `x : ClasseA 1.2 : message2 → z : ClasseC` — choix entre message1.1 et message1.2
- `x : ClasseA [* 1..n] 1: message → y : ClasseB` — message envoyé n fois
- `x : ClasseA // 1: message → y : ClasseB` — message envoyé en parallèle à plusieurs instances de la classe B
- `x : ClasseA a := message → y : ClasseB` — a récupère la valeur renvoyée par l'exécution du message

## Diagramme d'états-transitions

**But** : Permet de décrire le comportement d'un objet (instance d'une classe) en fonction des événements et des messages reçus.

```mermaid
stateDiagram-v2
    [*] --> Disponible
    Disponible --> Verrouillé : verrouiller
    Verrouillé --> Disponible : déverrouiller
    Verrouillé --> Disponible : délai écoulé
    Verrouillé --> Vendu : achète
    Disponible --> Vendu : attribué_sur_abonnement
```

*Diagramme d'état d'un billet de spectacle à vendre sur Internet*

## Principaux concepts

- État : `Nom_état`
- Transition : `événement / action`
- Marqueur d'état initial

## Principaux concepts — Transition

- Une transition (sortante) définit la réponse d'un objet, dans un état donné, à un événement donné.
- Les transitions sont étiquetées par un événement et (optionnellement) par une action :
  - **Événement** : Tout ce qui survient et peut affecter un objet. Élément déclencheur de la transition.
  - **Action** : Opération réalisée lorsqu'une transition est tirée.

```mermaid
stateDiagram-v2
    SurLesRayons: Sur les rayons
    SurLesRayons --> Emprunté : emprunter() / livre.emprunté(self)
    Emprunté --> SurLesRayons : retourner() / livre.retourné(self)
```

*Diagramme d'état pour la classe Exemplaire_de_livre*

## Principaux concepts — État

- Décrit un moment pendant la vie d'un objet.
- Un objet ne se trouve que dans un seul état à la fois.
- Tous les objets d'une classe qui se trouvent dans un même état réagissent de façon identique aux événements.
- Les objets qui se trouvent dans un état donné, à un moment donné, partagent l'une et/ou l'autre des caractéristiques suivantes :
  - Ils ont des valeurs d'attributs similaires.
  - Ils attendent un événement particulier.
  - Ils exécutent une activité particulière.
- Un état est généralement décrit par un nom.
- En UML, il existe différents types d'état : simple, concurrent, composite, etc.

## Événement

### Principaux concepts — types d'événements

Un événement peut être paramétré…

| Type d'événement | Description | Syntaxe |
| --- | --- | --- |
| Appel | Réception d'un message synchrone (pour lequel l'émetteur attend une réponse). Invocation d'une opération. | `op(p1:type, p2:type, …)` |
| Changement | Changement de valeur d'une condition booléenne. Satisfaction soudaine de cette condition. Condition fausse qui devient vraie. | `when(exp)` |
| Signal | Réception d'un message asynchrone. | `sname(p1:type, p2:type, …)` |
| Temps | Temps absolu atteint ou passage d'un certain intervalle de temps. Peut signaler le temps écoulé depuis l'entrée dans un état donné. | `after(time)` |

## Garde

### Gardes

- Une transition peut être conditionnelle à l'évaluation d'une garde.
- Si la garde est vraie, la transition est tirée.
- Si la garde est fausse, la transition n'a pas lieu.
- Notation : `événement [garde]`

```mermaid
stateDiagram-v2
    PeutEtreEmprunte: Peut être emprunté
    NePeutEtreEmprunte: Ne peut être emprunté
    PeutEtreEmprunte --> NePeutEtreEmprunte : est_emprunté(e) [dernier exemplaire]
    PeutEtreEmprunte --> PeutEtreEmprunte : est_emprunté(e) [pas dernier exemplaire]
    NePeutEtreEmprunte --> PeutEtreEmprunte : est_retourné(e)
    NePeutEtreEmprunte --> NePeutEtreEmprunte : est_retourné(e)
```

*Diagramme d'état d'un livre* — La transition réflexive marque que `est_retourné(e)` est bien un événement attendu et compris dans cet état.

## Gardes

- Garde :
  - expression conditionnelle
  - évaluée uniquement quand l'événement est déclenché
  - peut contenir des attributs de l'objet ou des paramètres de l'événement associé
- Lorsqu'un même événement est associé à plusieurs transitions, une garde (condition) peut être ajoutée pour préciser le contexte et déterminer la transition à effectuer.
- Les gardes associées à un même événement sur les transitions sortantes d'un état donné doivent être mutuellement exclusives.

## Action

### Principaux concepts — types d'actions

Les actions peuvent prendre des arguments… les paramètres effectifs des événements par exemple…

| Type d'action | Description | Syntaxe |
| --- | --- | --- |
| Affectation | Assigne une valeur à une variable. | `target:=expression` |
| Appel | Invocation (synchrone) d'une opération d'un objet. Peut retourner une valeur. | `opname(arg1, arg2, …)` / `object.opname(arg1, arg2, …)` |
| Envoi | Envoi d'un message (signal) asynchrone. | `sname(arg1, arg2, …)` |
| Création | Création d'un nouvel objet. | `new Cname(arg1, arg2, …)` |
| Destruction | Destruction d'un objet. | `object.destroy()` |
| Retour | Spécification d'une valeur retournée. | `return value` |
| Divers | Action décrite dans un autre langage… | `[description]` |
| Séquence | Séquence d'action | `action1; action2; …` |

## Transition réflexive sur un état

Une transition peut avoir le même état comme source et comme cible : c'est une **transition réflexive** (ou auto-transition). Elle est utile lorsqu'une action doit être exécutée tout en revenant au même état.

```mermaid
stateDiagram-v2
    Arret --> EnMarche : bouton « on » pressé
    EnMarche --> Arret : bouton « off » pressé
    EnMarche --> EnMarche : tic horloge / émettre bip()
```

La transition réflexive quitte puis ré-entre dans l'état : les actions `exit` puis `entry`, si elles existent, sont donc exécutées.

## Actions d'un état

Une action d'état est un traitement interne atomique associé à un état. Son déclenchement peut être l'entrée, la sortie ou la survenue d'un événement.

Un état peut ainsi comporter :

- une action d'entrée, exécutée à chaque entrée ;
- une action de sortie, exécutée à chaque sortie ;
- des actions internes sur événements.

```text
NomÉtat
───────────────
entry / actionEntrée
exit / actionSortie
événement1 / action1
événementN / actionN
```

Les actions d'entrée et de sortie factorisent les traitements communs. Une transition interne, elle, n'a pas les mêmes effets qu'une transition réflexive : elle ne déclenche pas les actions d'entrée et de sortie.

## Actions d'entrée et de sortie

Certaines actions peuvent être rattachées à un état au lieu d'une transition :

- **Action d'entrée** : Action exécutée chaque fois qu'on entre dans l'état (quelle que soit la transition qui nous y amène…). Notation : `entry /action`
- **Action de sortie** : Action exécutée chaque fois qu'on sort de l'état (quelle que soit la transition qui nous en fait sortir). Notation : `exit/action`

```mermaid
stateDiagram-v2
    SurLesRayons: Sur les rayons
    SurLesRayons: exit/livre.emprunté(self)
    Emprunte: Emprunté
    Emprunte: exit/livre.retourné(self)
    SurLesRayons --> Emprunte : emprunter()
    Emprunte --> SurLesRayons : retourner()
```

*Diagramme d'état d'un exemplaire de livre.* Pour une transition externe, on exécute d'abord l'action de sortie de l'état source, puis l'action portée par la transition, puis l'action d'entrée de l'état cible.

## Activité d'un état et types de transitions

Une activité `do / ...` est réalisée tant que l'objet reste dans l'état ; son achèvement peut déclencher une transition de complétion. Le support distingue :

- une **transition externe**, qui change d'état et exécute les actions de sortie, de transition puis d'entrée ;
- une **transition interne**, qui traite l'événement sans quitter l'état ;
- une **transition de complétion**, automatique à la fin de l'activité de l'état, souvent protégée par une garde.

```text
Saisie mot de passe
────────────────────────────────────────
entry / set echo to star; password.reset()
exit  / set echo normal
digit / handle character
help  / display help()
```

Dans cet exemple, `digit` et `help` sont des transitions internes ; `clear` peut conduire à une transition externe.

## États composites

Un état composite est un état spécialisé composé de sous-états, qui peuvent être **séquentiels** ou **concurrents**. Lorsqu'il est actif, au moins un de ses sous-états l'est aussi.

- Une transition qui entre dans un état composite arrive implicitement dans son état initial.
- Atteindre son état final déclenche implicitement une transition de complétion sortante.
- En entrant dans des composites imbriqués, les actions d'entrée sont exécutées du plus externe au plus interne ; à la sortie, les actions de sortie sont exécutées du plus interne au plus externe.

### Sous-états séquentiels

```mermaid
stateDiagram-v2
    [*] --> Inactif
    Inactif --> Identification : insérer_carte
    Identification --> Inactif : [identification_échouée]
    Identification --> Sélection : [identification_réussie] / initialiser_sélection()
    Sélection --> Confirmation : clic_acheter
    Confirmation --> Sélection : clic_recommencer
    Confirmation --> Vente : clic_confirmer
    Vente --> [*] : achat d'un billet / éjecter_carte()
```

Le diagramme représente le composite « achat d'un billet » : un seul sous-état est actif à la fois.

### Sous-états concurrents

Dans un composite concurrent, plusieurs régions sont actives simultanément. Un `fork` lance les régions et un `join` les synchronise. Par exemple, un cours non terminé peut faire progresser en parallèle le chemin des laboratoires/projet et celui de l'examen final ; la réussite exige alors `note >= 60`.

:::tip

Utilisez un état composite lorsque le détail interne reste pertinent au comportement de l'objet. Utilisez plutôt un diagramme d'activités pour le flot d'une tâche ou d'un cas d'utilisation.

:::

## Référence et historique d'états

Un sous-diagramme peut être référencé pour décomposer un comportement. L'état historique `H` mémorise le dernier sous-état visité d'un composite : une transition vers `H` reprend ce sous-état, plutôt que de revenir à l'état initial.

## Diagrammes d'états-transitions — buts

Les diagrammes d'états-transitions servent à illustrer des cas d'utilisation et à décrire finement le comportement des classes. Ils complètent les diagrammes d'interaction : ils répondent à « dans quel état est cet objet et comment réagit-il ? » plutôt qu'à « quels objets échangent quels messages ? ».

## Diagramme d'activités

Un diagramme d'activités décrit les séquences d'activités qui composent :

- un processus d'affaires ou de production ;
- un cas d'utilisation, au niveau de l'analyse ;
- un algorithme ou une opération, au niveau de la conception.

Il exprime des flots séquentiels et concurrents. C'est une variante de diagramme d'états dans laquelle les états représentent des activités : le passage à l'activité suivante se produit automatiquement dès que l'activité courante est terminée, sans attendre d'événement.

### Notation et éléments de contrôle

Un diagramme d'activités associe des activités avec des transitions séquentielles, alternatives, des itérations et des synchronisations. Il comporte un état initial et un état final ; les *swimlanes* répartissent les activités selon leur responsable.

```mermaid
flowchart TD
    debut((Début)) --> Mesurer[Mesurer la température]
    Mesurer -->|[trop froid]| Chauffer[Chauffer]
    Mesurer -->|[trop chaud]| Refroidir[Refroidir]
    Chauffer --> fin((Fin))
    Refroidir --> fin
```

Les gardes sur les sorties du losange représentent des alternatives. Une barre épaisse joue le rôle de `fork` pour séparer des activités et de `join` pour attendre leur synchronisation.

### Exemple : commander un ordinateur

```mermaid
flowchart TD
    debut((Début)) --> Config[Afficher la configuration courante]
    Config --> Formulaire[Afficher le formulaire de vente]
    Formulaire --> Saisie[Saisir la demande de commande]
    Saisie -->|[temps non expiré]| Details[Saisir les détails de la vente]
    Saisie -->|[temps expiré]| fin((Fin))
    Details -->|[commande incomplète]| Saisie
    Details -->|[ok]| Enregistrer[Enregistrer la commande]
    Enregistrer --> Courriel[Envoyer un courriel de confirmation]
    Courriel --> fin
```

Ce diagramme conserve le niveau du cas d'utilisation : il ne détaille pas les objets internes, contrairement à un diagramme de séquence de conception.

### Construire un diagramme d'activités

1. Délimitez la portée : un cas d'utilisation, une partie de celui-ci, un *workflow* ou une méthode.
2. Ajoutez les états de départ et de terminaison.
3. Ajoutez les activités correspondant aux étapes ou processus principaux.
4. Reliez-les par les transitions séquentielles, conditionnelles, itératives et les synchronisations nécessaires.
5. Identifiez les *swimlanes* puis placez chaque activité chez son responsable.

## Autres diagrammes dynamiques UML

Le support mentionne aussi le diagramme global d'interaction et le diagramme de timing. Le premier organise des interactions avec la structure de contrôle d'un diagramme d'activités ; le second met l'accent sur l'évolution des états ou valeurs au cours du temps.

Pour poursuivre, passez aux [diagrammes de conception architecturale](./acoo-diag-conception-architecturale.md), où les comportements décrits ici sont reliés à la structure de conception.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/acoo-analyse-modele-dynamique.pdf" />

</TabItem>
</Tabs>
