---
sidebar_position: 5
title: "Examen — 03/01/2012"
sidebar_label: Examen 2011/2012
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Examen — Analyse et Conception Orientées Objets (2011/2012)

*Université de La Manouba — École Nationale des Sciences de l'Informatique — Examen Principal du 1er Semestre — Niveau : II2 — Date : mardi 3 janvier 2012 — Durée : 2h — Documents non autorisés — Nombre de pages : 13 pages (3 p. énoncé + 10 p. réponses) — Enseignants : Y. Jamoussi, I. Ben Hamouda, I. Fliss, S. Mtibaa, G. Ziada*

*NB : Répondez directement sur les feuilles de réponses. Ne répondez pas à l'aveuglette. La précision, la consistance et la clarté seront appréciées.*

## Énoncé

### Problème

L'objectif de ce problème est d'analyser et de concevoir en partie, une version simplifiée du jeu de société Monopoly qui se joue de 2 à 6 joueurs. Dans ce jeu, les joueurs se déplacent sur un plateau contenant 40 cases organisées cycliquement (lorsqu'on atteint la dernière case, on continue sur la première) comme l'illustre la figure ci-dessous. Les 40 cases représentent : 22 terrains à bâtir, 4 gares, 2 compagnies, une case « prison », une case « allez en prison », une case « luxe », une case « impôt sur le revenu », une case « parc gratuit », une case « taxe de luxe », une case « départ », des cases « chance » et des cases « caisse de communauté ». Monopoly est le jeu où l'on vend, achète ou loue des propriétés de manière profitable, afin que les joueurs puissent s'enrichir. Le joueur qui ne parvient pas à faire face aux dépenses qui lui incombent fait faillite, ses propriétés deviennent libres et il quitte ainsi le jeu. Le but du jeu est d'être le dernier joueur n'ayant pas fait faillite.

Ce jeu comporte 28 cases dites de « Propriété » relativement aux terrains, aux gares et aux compagnies. Chaque propriété peut faire l'objet d'un achat (si elle n'est pas déjà acquise par un autre joueur), d'une vente ou d'un paiement / encaissement de loyer.

Les 28 propriétés sont divisées en 10 « groupes » :

- Les terrains d'une même couleur forment un groupe de propriétés. Il existe donc huit groupes différents de propriétés (puisqu'il y a huit couleurs).
- Les 4 gares forment le 9ème groupe.
- Les 2 compagnies forment le 10ème groupe.

Dans ce jeu, chaque joueur est caractérisé par son nom et son capital d'argent. Il occupe une case parmi les 40 cases du plateau. Il possède un pion, portant son nom, qui marque sa position dans le plateau. Les différents joueurs démarrent le jeu à la position case de "départ", et le capital initial de chacun d'entre eux est de 20.000 euros.

Le système détient les Titres de Propriété et un nombre illimité de constructions (maisons et hôtels). Il paye les salaires et les primes, encaisse l'argent des impôts, des taxes et des achats de terrain et des constructions. Le système ne peut jamais "faire faillite" (on supposera qu'il détient une quantité infinie d'argent).

À son tour, chaque joueur lance 2 dés puis avance son pion sur le plateau de jeu, d'autant de cases que l'indique le total des dés et ce dans le sens des aiguilles d'une montre. Chaque fois que le joueur passe lors de son avancement par la case "Départ", le système lui verse un salaire de 20.000 euros. Si le joueur obtient un double avec les dés, il se déplace normalement. Il effectue l'opération de sa case d'arrivée, puis relance les dés et se déplace à nouveau. Il effectuera alors une nouvelle opération. Par ailleurs, s'il obtient un double trois fois de suite, il doit se rendre immédiatement en Prison. Son tour de jeu est alors terminé.

Plusieurs pions peuvent se trouver sur une même case au même moment. La case sur laquelle le joueur va s'arrêter indique ce que ce dernier doit ou peut faire. En fonction de la case de destination, il se produit l'une des actions suivantes :

- Si la case de destination est un terrain qui n'a pas de propriétaire, le joueur peut l'acheter s'il le souhaite et s'il dispose du capital nécessaire pour son achat.
- Si la case de destination est un terrain à la possession d'un autre propriétaire, il doit lui payer un loyer.
- Si la case de destination est un terrain dont il est le propriétaire, rien ne se passe.
- Si la case de destination est une case de type "CHANCE" ou "CAISSE DE COMMUNAUTE", il doit tirer une carte de la pile correspondante et applique l'une des trois actions suivantes : se rendre en prison ou se déplacer sur une autre case ; faire un paiement (taxes, impôt) ; percevoir une récompense sous forme d'une somme d'argent.
- Si la case de destination est une case de type "IMPÔT" ou "TAXE", il doit payer le montant indiqué sur ces cases.
- Si la case de destination est une case de type "ALLEZ EN PRISON", il doit s'y rendre.

Lorsqu'un joueur possède tous les terrains d'un groupe de couleur, il a le droit d'acheter des maisons pour ce groupe (au plus 4 maisons par terrain), ce qui augmente la valeur du loyer. Le prix d'une Maison est indiqué sur le Titre de Propriété correspondant. À tout moment, durant son tour de jeu, le joueur peut acheter et construire autant de Maisons que sa fortune le lui permet (il n'y a aucune contrainte sur la façon de construire les maisons).

Pour pouvoir acheter un Hôtel, un joueur doit posséder 4 Maisons sur chaque terrain d'un même groupe. Si un joueur désire construire un Hôtel, il demande au système de lui échanger les 4 Maisons du terrain de son choix contre un Hôtel, et il s'acquitte du prix indiqué pour un Hôtel sur le Titre de Propriété, puis il place son Hôtel sur ce terrain. Il ne peut construire qu'un seul Hôtel par terrain.

Lors de son tour de jeu, un joueur qu'il soit endetté (n'ayant pas un capital suffisant pour payer ses dépenses : impôts, taxes et loyers) ou non peut selon son choix revendre au prix d'achat, des constructions, des terrains nus, des Gares ou des Compagnies de Distribution au système.

Par ailleurs, l'arrivée d'un joueur en Prison met fin à son tour de jeu. Il ne franchit pas la case "Départ" et ne reçoit pas 20.000 euros jusqu'à ce qu'il quitte la prison. Le joueur pourra sortir de Prison :

- S'il fait un double avec les dés durant l'un des trois tours qui suit son arrivée en Prison ; il se déplace alors du nombre de cases indiqué par les dés, puis relance les dés comme tout joueur ayant obtenu un double et il rejoue encore une fois.
- Après avoir lancé les dés au cours du troisième tour : il doit alors — s'il n'a pas fait de double — payer une amende de 5.000 euros. Puis, il se déplace du nombre de cases indiqué par les dés et il continue à jouer.

Pendant qu'un joueur est en Prison, il peut percevoir des loyers. S'il n'est pas "envoyé" en Prison mais qu'il parvient sur cette case dans le cours normal du jeu, son séjour est considéré comme une "simple visite". Le joueur n'encourra alors aucune pénalité et il peut se déplacer normalement au tour suivant.

Lors de l'analyse du jeu Monopoly, un développeur a proposé le diagramme de classes UML incomplet suivant :

<!-- TODO: unclear in source, verify against original PDF page 3 — le diagramme de classes UML fourni par l'énoncé (schéma) n'est pas repris dans le texte extrait. -->

**Travail à faire**

L'objectif de ce problème et d'analyser et concevoir en partie le jeu simplifié de « Monopoly » grâce aux diagrammes UML vus en cours. Pour cela, répondez directement aux questions qui sont posées dans les feuilles de réponses.

## Corrigé

### Partie 1 : Expression des besoins (7pts)

#### Question 1.1

**1)** Nous nous proposons de décrire le jeu simplifié de « Monopoly » par uniquement l'acteur « joueur » et les trois cas d'utilisation « Jouer son tour », « Vendre », « Acheter ». Complétez les relations pouvant exister entre ces trois cas et entre le joueur et les cas.

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 1 — le schéma des relations (diagramme) n'est pas repris dans le texte OCR. -->

</details>

**2)** Imaginez les différentes variantes possibles de scénarios relatifs aux différents cas d'utilisation. Donnez, en langage naturel, une description sommaire pour chaque scénario. N'oubliez pas de prendre en considération l'entrée et la sortie de prison.

<details>
<summary>Correction</summary>

**Cas d'utilisation « Jouer son tour »**

- À son tour, chaque joueur lance 2 dés puis avance son pion sur le plateau de jeu, d'autant de cases que l'indique le total des dés et ce dans le sens des aiguilles d'une montre. Si le joueur obtient un double avec les dés, il se déplace normalement. Il effectue l'opération de sa case d'arrivée (payer loyer, tirer carte de chance, payer impôt, …), puis relance les dés et se déplace à nouveau. Il effectuera alors une nouvelle opération. S'il obtient un double trois fois de suite ou sa case de destination est « allez en prison », il doit se rendre immédiatement en Prison. Son tour de jeu est alors terminé. Il ne franchit pas la case "Départ" et ne reçoit pas 20.000 euros jusqu'à ce qu'il quitte la prison.
- À son tour, un joueur lance les 2 dés puis avance son pion sur le plateau de jeu, la case de destination est « prison ». Son séjour est considéré comme une "simple visite". Le joueur n'encourra alors aucune pénalité et il peut se déplacer normalement au tour suivant.
- À son tour, un joueur emprisonné (envoyé en prison), pourra sortir de Prison, s'il fait un double avec les dés durant l'un des trois tours qui suit son arrivée en Prison ; il se déplace alors du nombre de cases indiqué par les dés, puis relance les dés comme tout joueur ayant obtenu un double et il rejoue encore une fois.
- À son tour, un joueur emprisonné qui n'a pas fait un double avec les dés durant l'un des trois tours qui suit son arrivée en Prison, lance les dés au cours du troisième tour et paye une amende de 5.000 euros. Puis, il se déplace du nombre de cases indiqué par les dés et il continue à jouer.

**Cas d'utilisation « Acheter »**

- Lors de son tour de jeu, le joueur s'arrête sur une case terrain qui n'a pas de propriétaire et il dispose du capital nécessaire pour son achat, il l'achète s'il le souhaite.
- Lorsqu'un joueur possède tous les terrains d'un groupe de couleur, il a le droit d'acheter des maisons pour ce groupe (au plus 4 maisons par terrain). À tout moment, durant son tour de jeu, le joueur peut acheter et construire autant de Maisons que sa fortune le lui permet.
- Si le joueur possède 4 Maisons sur chaque terrain d'un même groupe et il désire construire un Hôtel, il demande au système de lui échanger les 4 Maisons du terrain de son choix contre un Hôtel, et il s'acquitte du prix indiqué pour un Hôtel sur le Titre de Propriété, puis il place son Hôtel sur ce terrain.

**Cas d'utilisation « Vendre »**

- Lors de son tour de jeu, le joueur peut selon son choix revendre au prix d'achat, des constructions, des terrains nus, des Gares ou des Compagnies de Distribution au système.

</details>

**3)** Proposez un diagramme de séquence système pour décrire le scénario nominal du cas d'utilisation « Jouer son tour ».

<details>
<summary>Correction</summary>

Il faudrait montrer l'interaction entre l'acteur (le joueur) et le système en boîte noire ; il suffit de décrire un scénario dans lequel le joueur n'est pas envoyé en prison.

</details>

#### Question 1.2

**4)** Proposez un diagramme d'activités qui illustre la dynamique du jeu « Monopoly ».

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 2 — le diagramme d'activités du corrigé (schéma) n'est pas repris dans le texte OCR. -->

</details>

### Partie 2 : Analyse (7 pts)

#### Question 2.1

Le diagramme de classes proposé par le développeur est incomplet.

**1)** Ajouter les cardinalités manquantes.

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 3 — les cardinalités ajoutées sur le schéma ne sont pas reprises dans le texte OCR. -->

</details>

**2)** On se propose de promouvoir dans la mesure du possible les associations en compositions ou en des agrégations. Cochez LA bonne réponse pour chaque proposition en justifiant brièvement votre réponse. N'oubliez pas d'encercler éventuellement la classe qui a la responsabilité de subordination :

<details>
<summary>Correction</summary>

- **Jeu-Plateau** : Composition. Justification : appartenance totale + cycles de vie dépendants.
- **Plateau-Case** : Agrégation. Justification : les cases appartiennent au plateau et peuvent aussi appartenir aux groupes (tel est le cas des cases propriétés).
- **Case-Joueur** : Agrégation. Justification : le joueur appartient à la case et au jeu : appartenance faible.
- **Jeu-Groupe** : Composition. Justification : appartenance totale + cycles de vie dépendants.
- **Jeu-Joueur** : Agrégation. Justification : le joueur appartient à la case et au jeu : appartenance faible.
- **Joueur-Propriété** : Association simple. Justification : il n'y a pas la notion d'appartenance.
- **Propriété-Groupe** : Agrégation. Justification : les cases propriétés appartiennent au plateau et appartiennent aussi aux groupes.

</details>

**3)** L'analyste a oublié la modélisation de l'abstraction « Dé ». Rajoutez-la en indiquant les relations avec les autres classes.

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 3 — le schéma corrigé n'est pas repris dans le texte OCR. -->

</details>

**4)** Dites si le diagramme de classes proposé par l'analyste permet-il de représenter chacun de ces trois énoncés :

(a) un joueur est en simple visite de la prison ou emprisonné

(b) partant d'une « Propriété » donnée, il est possible de connaître que les Propriétés complétant ce groupe appartiennent à un même joueur

(c) le nombre de constructions dans un terrain.

Si oui justifiez sinon proposez une solution.

<details>
<summary>Correction</summary>

(a) Non : ajouter un attribut à la classe joueur qui précise l'état du joueur (simple visite, emprisonné, normal).

(b) Oui : nous pouvons parvenir à cette information grâce à la navigation : `Joueur -> Propriété -> Groupe -> (Propriété)* -> Joueur`.

(c) Non : ajouter un attribut dans la classe terrain : `int nbre_construction`.

</details>

#### Question 2.2

On suppose qu'on a deux joueurs. Le premier joueur s'appelle « Ali ». Il possède la gare du Nord, la gare de Lyon et la propriété Belleville. Il est actuellement à la compagnie des eaux. Le deuxième joueur s'appelle « Zied ». Il possède les compagnies d'électricité et des eaux. Il est actuellement à la case départ. Conformément au diagramme de classes proposé par le développeur, représentez le diagramme d'objets qui illustre cette situation du jeu « Monopoly ».

Remarque concernant les instances des classes « Case » (ou dérivées) et les instances de la classe « Groupe » : représentez que celles qui sont concernées par cette question.

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 4 — le diagramme d'objets du corrigé (schéma) n'est pas repris dans le texte OCR. -->

</details>

#### Question 2.3

Donnez un diagramme d'état-transition qui illustre l'évolution de l'état d'un joueur. L'état éliminé peut être considéré comme l'état final de la classe joueur.

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 5 — le diagramme d'états-transitions du corrigé (schéma) n'est pas repris dans le texte OCR. -->

</details>

### Partie 3 : Conception (6pts)

#### Question 3.1

Afin de faciliter l'implémentation des associations, on se propose de limiter au maximum possible la navigation. Précisez le sens de navigation sur le diagramme de classes en bas de page (Q3.2).

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 6 — le sens de navigation ajouté sur le schéma n'est pas repris dans le texte OCR. -->

</details>

#### Question 3.2

Pour comprendre les règles de gestion gouvernant l'évolution des liens entre les objets, on se propose de décorer les associations par les contraintes `{ordered}`, `{addOnly}`, `{frozen}`, `{notUnique}`.

**1)** Rappelez la signification de chaque contrainte de gestion :

<details>
<summary>Correction</summary>

- **Ordered** : les éléments de la collection représentant le tissage des liens sont ordonnés.
- **AddOnly** : il est possible de tisser de nouveaux liens mais impossible d'en supprimer.
- **Frozen** : le tissage des liens est fixé lors de la création et ne peut pas changer.
- **NotUnique** : il est possible d'avoir plus qu'un lien entre deux objets avec la même association.

</details>

**2)** Décorez, directement sur le diagramme de classes ci-dessous, chacune des associations par les contraintes de gestion appropriées. Vous pouvez tout simplement annoter le bout navigable de chaque association par les symboles O, A, F, N (respectivement pour (O)rdered, (A)ddOnly, (F)rozen et (N)otUnique).

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 7 — les annotations sur le schéma ne sont pas reprises dans le texte OCR. -->

</details>

#### Question 3.3

**1)** Rappelez le contexte et la solution d'usage du patron de conception « Singleton ».

<details>
<summary>Correction</summary>

**Problème à résoudre :** comment garantir l'existence d'une seule instance d'une classe donnée et fournir un point d'accès global à cette instance ?

**Solution :** sauvegarder l'objet singleton dans une variable de classe (statique) et fournir une méthode de classe retournant l'instance unique, en la créant à la première requête. Le constructeur est alors déclaré privé (ou mieux : protégé).

</details>

**2)** Proposez un diagramme de classes de conception de l'application en question en utilisant le maximum possible le patron de conception « Singleton ». N'oubliez pas de préciser le rôle de chaque méthode que vous comptez ajouter au diagramme de classes proposé par l'analyste.

<details>
<summary>Correction</summary>

Le patron de conception Singleton ne peut être appliqué que pour le cas de la classe `Jeu` et la classe `Plateau`. Dans ce cas, il faut ajouter à ces deux classes les méthodes statiques `getInstance` et rendre les constructeurs privés.

</details>

**3)** En vous basant sur le diagramme de classes que vous avez proposé dans la question précédente (n°2), précisez les objets nécessaires au déroulement normal de « jouer son tour ».

<details>
<summary>Correction</summary>

1 instance de `Jeu`, 1 instance de `Plateau`, 1 instance de `Dé`, des instances de `Case` (on pourrait aussi préciser les types de cases à utiliser).

</details>

**4)** Donnez le diagramme de séquence de « jouer son tour » avec les différents objets que vous avez identifiés dans la question précédente (n°3).

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 8 — le diagramme de séquence du corrigé (schéma) n'est pas repris dans le texte OCR. -->

</details>

</TabItem>
<TabItem value="pdf-statement" label="PDF (énoncé)">

<PdfViewer file="/pdfs/acoo-examen-2011-2012-statement.pdf" />

</TabItem>
<TabItem value="pdf-correction" label="PDF (correction)">

<PdfViewer file="/pdfs/acoo-examen-2011-2012-correction.pdf" />

</TabItem>
</Tabs>
