---
sidebar_position: 8
title: "Étude de cas récapitulative : le jeu du démineur"
sidebar_label: Exemple - Démineur
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Étude de cas récapitulative — Analyse — Jeu de démineur

*ENSI — Matière : ACOO*

Le but du jeu est de trouver le plus rapidement possible toutes les cases du plateau contenant des mines sans les toucher. Le jeu est composé d'un plateau rectangulaire, d'un chronomètre et d'un compteur de mines. Le plateau est un quadrillage de cases. Au début du jeu, toutes les cases du plateau sont couvertes, le compteur de mines indiquant le nombre de mines restant à localiser. Le chronomètre compte le nombre de secondes écoulées depuis le début de la partie. Avant de lancer le jeu, le joueur peut configurer les dimensions du plateau, le nombre initial de mines, etc.

Pour jouer une partie de démineur, le joueur commence par découvrir la première case. Le joueur va passer son temps à découvrir ou marquer des cases visant à gagner la partie et entrer dans les meilleurs scores. Quand une case est découverte, son contenu est affiché. Le contenu d'une case peut être : un blanc, une mine ou un nombre indiquant le nombre de mines présentes dans les cases voisines.

Lorsqu'une case est découverte, on rencontre l'une de ces situations :

1. Rien ne se passe, si le contenu de la case est un chiffre.
2. Si le contenu de la case est un blanc alors toutes les cases voisines sont dévoilées, à condition qu'elles ne soient pas signalées par un drapeau. Si l'une de ces cases voisines ne contient rien, le processus de découverte continue automatiquement à partir de cette case.
3. Le jeu est terminé et le joueur a perdu, si le contenu de la case est une mine.

Au cas où une case est toujours couverte, le joueur peut la marquer en respectant les règles suivantes :

- Marquer une case qui n'est ni découverte ni marquée décrémente le compteur de mines restant à localiser et un drapeau apparaît sur la case. Ce drapeau indique que cette case contient potentiellement une mine. Une case marquée d'un drapeau ne peut pas être découverte.
- Marquer une case déjà signalée d'un drapeau permet de la remettre dans son état initial, à savoir couverte et non marquée. Le compteur de mines est alors incrémenté de 1.

Si le joueur trouve toutes les cases du plateau contenant des mines sans les toucher, il gagne la partie et son score est enregistré. Ce score correspond à la durée de la partie décrite par le chronomètre. Si la valeur enregistrée (le score) est inférieure à l'un des dix meilleurs scores, le joueur est appelé à préciser son nom et son score prend sa place dans la liste des dix meilleurs scores. L'application offre aussi au joueur la possibilité de consulter l'aide en ligne.

**Travail à faire :**

1. Donnez le diagramme de cas d'utilisation de l'application « notre_démineur ».
2. Proposez un diagramme de séquence système pour décrire le scénario nominal du cas d'utilisation « Jouer une partie de démineur ».
3. Proposez un diagramme de classes d'analyse pour l'application en question.
4. On se propose de comprendre l'évolution de la classe 'Case'. Donnez le diagramme d'états-transitions de cette classe.
5. Précisez les objets nécessaires au déroulement normal des cas « marquer une case » et « découvrir une case ».
6. Donnez le digramme de séquence de « marquer une case » avec les différents objets que vous avez identifiés dans (5).
7. Donnez le digramme de séquence de « découvrir une case » avec les différents objets que vous avez identifiés dans (5).

<!-- TODO: unclear in source, verify against original PDF — the slide deck's answer section only lists the diagram titles ("Diagramme de cas d'utilisation", "Diagramme de séquence système", "Diagramme de classes", "Diagramme d'états-transitions", "Diagrammes de séquence") as section headers, each followed by a diagram image; no diagram content (actors, use cases, classes, states, messages) was extractable as text, so it is not transcribed here to avoid inventing content — refer to the PDF viewer tab for the actual diagrams -->

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/acoo-exemple.pdf" />

</TabItem>
</Tabs>
