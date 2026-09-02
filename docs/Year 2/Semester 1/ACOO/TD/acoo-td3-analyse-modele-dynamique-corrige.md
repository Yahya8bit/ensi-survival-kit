---
sidebar_position: 3
title: TD3 : Analyse — Modélisation dynamique UML (avec corrigé)
sidebar_label: TD3 - Modélisation dynamique
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Série N°3 : Analyse — Modélisation dynamique UML

*ENSI — Matière : ACOO*

## Diagramme de séquences — Questions de réflexion

**1.** Que représente une ligne de vie dans un diagramme de séquence ?

<details>
<summary>Correction</summary>

Le temps qui s'écoule, de haut en bas.

</details>

**2.** Dans un diagramme de séquence, un objet peut-il envoyer un message à lui-même ? Si oui, comment cela est-il exprimé ?

<details>
<summary>Correction</summary>

Oui, il le peut. La flèche d'envoi de message part de l'objet et revient plus bas sur sa ligne de vie.

</details>

**3.** Quel rapport pouvons-nous établir entre les diagrammes de séquence et les diagrammes de cas d'utilisation et les diagrammes de classes ?

<details>
<summary>Correction</summary>

Chaque diagramme de séquence est un scénario précis d'un cas d'utilisation et décrit la dynamique des appels entre instances de classes, définies dans le diagramme de classes.

</details>

**4.** Les deux diagrammes de séquence suivants sont-ils équivalents ? Justifiez votre réponse.

```
o:Obj
1.a: [i=0] foo()
1.b: [i=1] bar()
```

```
o:Obj
1.1: [i=0] foo()
1.2: [i=1] bar()
```

<details>
<summary>Correction</summary>

Premier diagramme (numérotation `1.a` / `1.b`, branches d'une même alternative) : `Si (i=0) alors foo() Sinon si (i=1) alors bar() Fin si Fin si`.

Second diagramme (numérotation séquentielle `1.1` / `1.2`, deux alternatives indépendantes) : `Si (i=0) alors foo() Fin si` puis `Si (i=1) alors bar() Fin si`.

Les deux diagrammes ne sont donc pas équivalents : le premier exprime un choix exclusif entre `foo()` et `bar()`, le second teste les deux conditions indépendamment l'une de l'autre.

</details>

**5.** Les deux diagrammes de séquence suivants sont-ils équivalents ? Justifiez votre réponse.

<details>
<summary>Correction</summary>

Non, les deux diagrammes ne sont pas équivalents. Dans le premier, c'est une séquence de 3 boucles successives avec la même condition (`op1, op1, op1, op2…`), dans le second, ce sont les 3 opérations dans la même boucle (`op1, op2, op3, op1…`).

<!-- TODO: unclear in source, verify against original PDF (question 5) — the two sequence diagrams themselves are images and were not extracted as text/shapes -->

</details>

## Exercice n°1

Le déroulement normal du cas d'utilisation de retrait d'argent auprès d'un distributeur automatique de billets est le suivant :

- le client introduit sa carte bancaire ;
- la machine vérifie alors la validité de la carte et demande le code au client ;
- si le code est correct, elle envoie une demande d'autorisation de prélèvement au système d'autorisation de la banque. Ce dernier renvoie le solde autorisé à prélever ;
- le distributeur propose alors plusieurs montants à prélever ;
- le client saisit le montant à retirer après contrôle du montant par rapport au solde autorisé, le distributeur demande au client s'il désire un ticket ;
- après la réponse du client, la carte est éjectée et récupérée par le client ;
- les billets sont alors délivrés (ainsi que le ticket) ;
- le client récupère enfin les billets et son ticket ;
- la transaction est finalement enregistrée auprès du système informatique de la banque.

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF (Exercice n°1) — the corresponding sequence diagram is an image and was not extracted as text/shapes -->

</details>

## Exercice n°2

On considère un robot, muni de deux bras qui possèdent chacun une pince pour attraper des pièces. Le robot peut déplacer une pièce vers une nouvelle zone. Si la nouvelle zone est non vide, un message d'erreur est affiché. Sinon le robot déplace l'objet. Pour cela, le robot commence par chercher la pièce demandée. Quand il trouve ce qu'il cherche, un de ses bras ramasse la pièce. Dans ce cas, la pince correspondante à ce bras est ouverte puis fermée. Finalement le robot déplace l'objet vers sa nouvelle destination. Son bras le dépose et sa pince est ouverte puis fermée.

**Travail à faire :**

1. Donnez le diagramme de classes du robot.
2. Proposez un diagramme de séquence pour modéliser la situation où un utilisateur demande au robot de déplacer une pièce de la zone A vers la zone B.

<details>
<summary>Correction</summary>

**Diagramme de classes** — classes `Robot`, `Bras` (1..2), `Pince` (1..1), avec les opérations : `Robot.chercherPièce()`, `Bras.ramasserObjet()`, `Robot.déplacerPièce()`, `Bras.déposerObjet()`, `Pince.fermer()`, `Robot.vérifierZoneVide()`, `Pince.ouvrir()`, `Robot.afficherMsgErreur()`.

**Diagramme de séquence** (scénario) : l'utilisateur demande à `Robot` de déplacer une pièce de la zone A vers la zone B → `Robot` vérifie `zoneVide()` :

- `[Zone non vide]` : `Robot` affiche `msgErreur()`.
- `[zone vide]` : `Robot.chercherPiece()` → `Bras.ramasserObjet()` → `Pince.ouvrir()` → `Pince.fermer()` (objet ramassé) → `Robot.déplacerPiece()` → `Bras.déposerObjet()` → `Pince.ouvrir()` → `Pince.fermer()` (objet déplacé).

<!-- TODO: unclear in source, verify against original PDF (Exercice n°2) — the source diagram text is heavily OCR-garbled (e.g. "Tamasser objeto", "mag erreur O"); the scenario above is reconstructed from the readable fragments, verify against the original page -->

</details>

## Exercice n°3

On souhaite gérer les différents objets qui participent à l'activité d'un fleuriste. Le client demande au vendeur des renseignements sur les compositions florales. Le vendeur lui fournit toutes les informations nécessaires. Le client commande alors la composition de son choix et le vendeur émet le bon de fabrication qu'il transmet à son ouvrier fleuriste. Celui-ci récupère auprès du bon de fabrication les informations concernant la composition choisie. Il crée ensuite la composition demandée. Une fois la composition terminée, l'ouvrier fleuriste archive le bon de fabrication (qui est ainsi détruit), et remet ensuite la composition au vendeur. Le vendeur édite ensuite la facture correspondante. La facture est remise au client pour règlement dès que le bouquet est réalisé. Une fois la facture réglée, le client récupère sa composition et quitte le magasin.

**Travail à faire :** Modélisez la situation précédente à l'aide d'un diagramme de séquences.

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF (Exercice n°3) — no correction diagram/text for this exercise was extractable from the source PDF -->

</details>

## Exercice n°4

On considère un robot, muni de deux bras qui possèdent chacun une pince pour attraper des pièces. Le robot peut déplacer une pièce vers une nouvelle zone. Si la nouvelle zone est non vide, un message d'erreur est affiché. Sinon le robot déplace l'objet. Pour cela, le robot commence par chercher la pièce demandée. Quand il trouve ce qu'il cherche, un de ses bras ramasse la pièce. Dans ce cas, la pince correspondante à ce bras est ouverte puis fermée. Finalement le robot déplace l'objet vers sa nouvelle destination. Son bras le dépose et sa pince est ouverte puis fermée.

**Travail à faire :** proposez un diagramme de communication à instances (diagramme de collaboration) pour modéliser la situation où un utilisateur demande au robot de déplacer une pièce de la zone A vers la zone B dans le cas où la zone destination est vide.

<details>
<summary>Correction</summary>

Séquence des messages du diagramme de collaboration (`utilisateur` → `Robot` → `Bras`/`Pince`) :

1. demander de déplacer une pièce de la zone A vers la zone B
2. vérifier zone vide()
3. chercher pièce()
4. ramasser objet
5. ouvrir()
6. fermer()
7. objet ramassé()
8. déplacer pièce()
9. déposer objet()
10. ouvrir()
11. fermer()
12. ok
13. objet déposé()
14. objet déplacé()

<!-- TODO: unclear in source, verify against original PDF (Exercice n°4) — the message ordering above is reconstructed from OCR-garbled numbering ("8: déplacer pièce() 3: chercher_pièce", "9: déposer_objet()" etc. printed out of visual order); verify the exact sequence against the original diagram image -->

</details>

## Exercice n°5

Considérons une montre à cadran numérique simplifiée :

1. Le mode courant est le mode « Affichage ».
2. Quand on appuie une fois sur le bouton mode, la montre passe en « modification heure ». Chaque pression sur le bouton avance incrémente l'heure d'une unité.
3. Quand on appuie une nouvelle fois sur le bouton mode, la montre passe en « modification minute ». Chaque pression sur le bouton avance incrémente les minutes d'une unité.
4. Quand on appuie une nouvelle fois sur le bouton mode, la montre repasse en mode « Affichage ».

**Travail à faire :** proposez un diagramme d'états-transitions modélisant cette montre.

<details>
<summary>Correction</summary>

États : `Affichage`, `Modification heure`, `Modification minute`.

Transitions :

- `Affichage` --appui sur le bouton mode--> `Modification heure`
- `Modification heure` --appui sur le bouton avance : /heure++--> `Modification heure` (boucle)
- `Modification heure` --appui sur le bouton mode--> `Modification minute`
- `Modification minute` --appui sur le bouton avance : /Minute++--> `Modification minute` (boucle)
- `Modification minute` --appui sur le bouton mode--> `Affichage`

</details>

## Exercice n°6

Dans une machine à laver les voitures, la voiture passe par une phase de nettoyage (lavage et lustrage). Le lavage prend 2min. Le lustrage 4 min. Puis le séchage qui prend 2min. Lorsque la machine est en phase de nettoyage, le client peut faire un arrêt d'urgence pour reprendre le nettoyage après. Il dispose de 2 min sinon la machine s'arrête complètement. Le séchage prend 2mn. Si le client fait un arrêt d'urgence la machine s'arrête complètement.

**Travail à faire :** modélisez le fonctionnement de la machine à laver des voitures à l'aide d'un diagramme d'états-transitions.

<details>
<summary>Correction</summary>

États : `nettoyage` (sous-états `lavage`, `lustrage`), `attente` (après arrêt d'urgence en cours de nettoyage), `séchage`.

Transitions :

- Début → `lavage`
- `lavage` --after(2 min)--> `lustrage`
- `lustrage` --after(4 min)--> `séchage`
- `séchage` --after(2 min)--> fin
- `nettoyage` --arrêt d'urgence--> `attente`
- `attente` --reprise--> `nettoyage`
- `attente` --after(2 min)--> fin (arrêt complet)
- `séchage` --arrêt d'urgence--> fin (arrêt complet)

<!-- TODO: unclear in source, verify against original PDF (Exercice n°6) — exact transition/guard wiring reconstructed from OCR-garbled diagram text ("Le début after 2 min) reprise nettoyage lavage attente arrêt d'urgence..."); verify against the original diagram image -->

</details>

## Exercice n°7

Voici la recette pour faire une bonne mousse au chocolat :

- Commencer par casser le chocolat en morceaux, puis le faire fondre et en parallèle casser les œufs en séparant les blancs des jaunes.
- Quand le chocolat est fondu, ajouter les jaunes d'œufs.
- Puis, battre les blancs en neige jusqu'à ce qu'ils soient bien fermes.
- Les incorporer délicatement à la préparation chocolat sans les briser.
- Verser dans des ramequins individuels.
- Mettre au moins 3 heures au réfrigérateur avant de servir.

**Travail à faire :** établir le diagramme d'activités pour modéliser la recette.

<details>
<summary>Correction</summary>

Deux flots parallèles (fork) :

- Flot 1 : `Casser le chocolat en morceaux` → `Faire fondre le chocolat` → `Ajouter les jaunes d'œufs`
- Flot 2 : `Casser les œufs en séparant les blancs des jaunes` → `Battre les blancs en neige` --[non fermes]--> (boucle) ; --[bien fermes]--> continue

Jointure (join) des deux flots → `Incorporer les blancs délicatement à la préparation chocolat sans les briser` → `Verser dans des ramequins individuels` → `Mettre au moins 3 heures au réfrigérateur avant de servir`.

</details>

## Exercice n°8

Décrivez avec un diagramme d'activités avec colonnes la connexion d'un client à un serveur telnet. On considère trois acteurs : le client, le démon telnet (i.e. le serveur logiciel) et la machine serveur. Initialement le client et le démon se connectent au même temps. Une fois la connexion établie, le démon demande un mot de passe au client, ce dernier dispose de trois tentatives pour saisir son mot de passe avant que la connexion ne soit rompue. Les tentatives infructueuses sont enregistrées dans un fichier sur le serveur. Une fois l'identification faite, un terminal est ouvert et l'utilisateur peut alors saisir des commandes qui sont interprétées en parallèle par le démon et puis exécutées sur le serveur. La commande `exit` déconnecte le client du serveur. Pour toute autre commande, le démon affiche le résultat correspondant.

<details>
<summary>Correction</summary>

Trois couloirs (`Client`, `Démon`, `Serveur`) :

- `Client` : `Connecter` (en parallèle avec `Démon.Connecter`) → `Saisir Mot de passe` → (si `[Valide]`) `Ouvrir terminal` → `Saisir commande`.
- `Démon` : `Connecter` → `Demander Mot de passe` → `Verifier Mot de passe` — boucle `[tentative < 3]` / `[invalide]` → `Enregistrer tentative` (sur le serveur) ; après `[tentative = 3]` → `Déconnecter`. Une fois validé → `Ouvrir terminal` → `Interpréter commande` — `[commande = exit]` → `Déconnecter` ; `[commande <> exit]` → `Afficher résultat`.
- `Serveur` : `Exécuter commande`.

<!-- TODO: unclear in source, verify against original PDF (Exercice n°8) — swimlane placement of each activity ("Enregistrer tentative", "Exécuter commande", etc.) reconstructed from OCR-garbled layout text; verify the exact column assignment against the original diagram image -->

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/acoo-td3-analyse-modele-dynamique-corrige.pdf" />

</TabItem>
</Tabs>
