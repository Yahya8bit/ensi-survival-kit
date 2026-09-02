---
sidebar_position: 2
title: TD2 : Analyse — Modélisation structurelle UML (avec corrigé)
sidebar_label: TD2 - Modélisation structurelle
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Série N°2 : Analyse — Modélisation structurelle UML

*ENSI — Matière : ACOO*

## Exercice n°1

Le jeu des tours de Hanoï se présente sous la forme d'un support en bois sur lequel sont plantées trois tiges A, B et C qui symbolisent les tours. Sur ces trois tiges peuvent être enfilés des disques de diamètres différents (8 dans la version originale, mais N de manière générale). Chaque tour peut contenir de 0 à N disques. Dans la configuration initiale (fig.1), tous les disques sont empilés par ordre de taille décroissante sur la tige A. Le but du jeu est de transférer tous les disques de la tige A vers la tige C sachant que :

- un seul disque peut être déplacé à la fois ;
- seul le disque en haut d'une tige (tour) peut être déplacé ;
- un disque ne peut jamais être posé sur un disque de taille inférieure à la sienne.

Dans la configuration finale (fig.2), tous les disques sont donc empilés par ordre de taille décroissante sur la tige C.

**Travail demandé :**

1. Représentez des diagrammes d'objets modélisant la configuration initiale (S0) et la configuration finale du jeu des tours de Hanoï (Sf).
2. Donnez le diagramme de classes du jeu en question.

<details>
<summary>Correction</summary>

Diagrammes d'objets (S0, Sf) et diagramme de classes attendus, avec une variante utilisant composition et agrégation (diagramme de classes et diagramme d'objets S0/Sf avec composition et agrégation).

<!-- TODO: unclear in source, verify against original PDF (Exercice n°1) — the diagrams themselves are images in the slide deck and were not extracted as text/shapes by OCR -->

</details>

## Exercice n°2

Soient le diagramme de classes et les trois diagrammes d'objets (1), (2) et (3) suivants :

Sachant que a, b, c et d sont des instances (objets) respectivement des classes A, B, C et D ; alpha1 et beta1 sont des liens représentatifs des associations `alpha` et `beta`. Indiquez pour chacun des diagrammes d'objets (1), (2) et (3) s'il est conforme ou pas au diagramme de classes ? Justifiez votre réponse.

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF (Exercice n°2) — the class diagram and the three object diagrams (1), (2), (3) are images; no textual correction for the conformance question was extracted -->

</details>

## Exercice n°3

Soit le diagramme de classes UML suivant : un objet instance de la classe 'B' peut accéder à combien d'objets instances de la classe 'D' et à combien d'objets instances de la classe 'C' ? Justifiez votre réponse.

<details>
<summary>Correction</summary>

**Un objet instance de la classe 'B' peut accéder à combien d'objets instances de la classe 'D' ?**

- Accès direct : B->D : 1 objet D.
- Par héritage : (B est un A et 1 objet A accède à 5 objets D) : 1 B peut accéder à 5 objets D.
- Total : 1 B peut accéder à 6 objets D.

**Un objet instance de la classe 'B' peut accéder à combien d'objets instances de la classe 'C' ?**

- Accès direct : B->C : 0 objet C, car B ne peut pas accéder à C (navigation).
- Accès indirect : (B->D->C) : 1 B peut accéder à 1 D et 1 D peut accéder à 1 C : 1 B peut accéder à 1 C.
- Par héritage : (B est un A et 1 objet A peut accéder à 5 objets D et chaque objet de type D peut accéder à 1 C) : 1 B peut accéder à 5 objets C.
- Total : 1 B peut accéder à 6 objets C.

</details>

## Exercice n°4

Modélisez l'énoncé suivant par un diagramme de classes d'analyse. Argumentez brièvement chaque relation (généralisation, agrégation, composition et/ou association simple) en vous appuyant sur le texte de l'énoncé.

Un bateau contient des cabines, occupées par des personnes qui effectuent des activités. Les personnes sont ou bien des guides, ou bien des animateurs, ou bien des passagers. Les guides expliquent des visites aux passagers et les animateurs animent des animations pour les passagers.

<details>
<summary>Correction</summary>

Trois solutions (Solution1, Solution2, Solution3) sont proposées dans le corrigé.

<!-- TODO: unclear in source, verify against original PDF (Exercice n°4) — Solution1/2/3 are diagram images; no textual detail was extracted beyond their labels -->

</details>

## Exercice n°5

Une université souhaite gérer les cours dispensés dans plusieurs établissements. Pour cela, on dispose des renseignements suivants :

- Chaque établissement est structuré en départements, qui regroupent chacun des enseignants spécifiques. Parmi ces enseignants, l'un d'eux est responsable du département.
- Un enseignant se définit par son nom, prénom, tél, mail, date de prise de fonction et son indice, chaque enseignant ne dispense qu'une seule matière.
- Les étudiants suivent quant à eux plusieurs matières et reçoivent une note pour chacune d'elle. Pour chaque étudiant, on veut gérer son nom, prénom, tél, mail, ainsi que son année d'entrée au sein de cet établissement.
- Une matière peut être enseignée par plusieurs enseignants, mais a toujours lieu dans la même salle de cours (chacune ayant un nombre de places déterminées).
- On désire pouvoir calculer la moyenne par matière ainsi que par département. On veut également calculer la moyenne générale d'un étudiant et pouvoir afficher les matières dans lesquelles il n'a pas été noté. Enfin, on doit pouvoir imprimer la fiche signalétique (prénom, tél, mail) d'un enseignant ou d'un étudiant.

Donnez le diagramme de classes d'analyse (en précisant les attributs et les méthodes de chaque classe) relatif à la gestion des cours dans cette université.

<details>
<summary>Correction</summary>

Classes identifiées : `Etablissement` (nom, adresse), `DEPARTEMENT` (nom), `PERSONNE` (nom, prénom, tel, mail — `afficherFicheSignaletique()`), `ENSEIGNANT` (date de prise de fonction, indice), `ETUDIANT` (année d'entrée — `calculerMoyenne()`, `afficherMatSansNote()`), `COURS` (libellé cours — `calculerMoyenne()`), `SALLE` (nom, capacité), `NOTE`.

Relations : `Etablissement` — Constituer (1..1) — `DEPARTEMENT`, `DEPARTEMENT` — Etre chef de / Enseigner — `ENSEIGNANT`, `COURS` — Dérouler — `SALLE`, `COURS` — Appartenir — `DEPARTEMENT`, `ETUDIANT`/`COURS` reliés via `NOTE`, `ENSEIGNANT` et `ETUDIANT` héritent de `PERSONNE`.

<!-- TODO: unclear in source, verify against original PDF (Exercice n°5) — the multiplicities on each association (e.g. département/enseignant, cours/salle) are not fully legible from the extracted diagram text; verify against the source image -->

</details>

## À vous de jouer — « Réservation de vols dans une agence de voyage »

1. Des compagnies aériennes proposent différents vols.
2. Un vol est ouvert à la réservation et fermé sur ordre de la compagnie.
3. Un client peut réserver un ou plusieurs vols, pour des passagers différents.
4. Une réservation concerne un seul vol, et un seul passager.
5. Une réservation peut être annulée ou confirmée.
6. Un vol a un aéroport de départ et un aéroport d'arrivée.
7. Un vol a un jour et une heure de départ et un jour et une heure d'arrivée.
8. Un vol peut comporter des escales dans des aéroports.
9. Une escale a une heure d'arrivée et une heure de départ.
10. Chaque aéroport dessert une ou plusieurs villes.

**Diagrammes de classes ?**

<details>
<summary>Correction</summary>

Démarche pas à pas, phrase par phrase :

- **Phrase 1** : `CompagnieAerienne` et `Vol` sont 2 objets métiers → 2 classes. `CompagnieAerienne` **Propose** (1..\*) `Vol` — un vol est réalisé par une seule compagnie mais partagé par plusieurs affréteurs (rôle affréteur, 1..\*).
- **Phrase 2** : tout objet peut avoir un état (diagramme d'états). Dans un diagramme de classes, tout concept dynamique est modélisé en opération → deux opérations `ouvrirVol()` et `fermerVol()` déclarées dans la classe `Vol` (les autres classes déclenchent ces opérations par envoi de messages).
- **Phrase 7** : les dates et heures de départ/arrivée ne représentent que des valeurs → attributs `dateDepart`, `heureDepart`, `dateArrivee`, `heureArrivee` de `Vol`.
- **Phrase 6** (aéroport de départ/arrivée) : 3 modélisations envisageables :
  1. Une classe `Aéroport` et une association de multiplicité 2 — modélisation peu parlante.
  2. Deux classes (`AeroportDepart`, `AeroportArrivee`) — modélisation non correcte, car tout aéroport peut être de départ et d'arrivée.
  3. Deux associations avec rôles `Départ` et `Arrivée` entre `Vol` et `Aéroport` (multiplicité 1 côté aéroport) — le rôle de chaque association précise son sens. **Solution retenue.**
- **Phrase 10** (aéroport dessert une ou plusieurs villes) : `Aéroport` **dessert** (1..\*) `Ville` (0..\*). Si desservir signifie l'aéroport le plus proche, la multiplicité est de 1 ; si cela signifie les aéroports dans un rayon de 35 km, la multiplicité est de 0..\*.
- **Phrases 8-9** (escales) : une escale a les propriétés heure d'arrivée et heure de départ, c'est donc un objet, pas un simple attribut. Elle a peu d'informations propres et n'est qu'une partie de `Vol`. On peut la représenter comme une spécialisation d'`Aéroport`, mais elle n'est pas totalement un aéroport. La meilleure solution est de la modéliser comme une **classe d'association** `Escale` (avec `heureArrivee`, `heureDepart`) entre `Vol` et `Aéroport`, avec la contrainte `{ordered}` sur la séquence des escales.
- **Phrases 4-5** (réservation) : `Réservation` et `Passager` sont 2 concepts métier → 2 classes. Une réservation concerne un seul vol et un seul passager → deux associations `concerne`, l'une entre `Vol` et `Réservation`, l'autre entre `Réservation` et `Passager`. La phrase 5 se traduit par l'ajout des opérations `annuler()` et `confirmer()` dans `Réservation`.
- **Phrase 3** (client) : il faut discerner un client d'un passager → classe `Client`, association `Client` **a effectué** (0..\*) `Réservation`.

**Diagramme de classes complet :**

- `CompagnieAerienne` (nom) — Propose (1..\*) → `Vol` (rôle affréteur, 1..\*)
- `Vol` (dateDepart, heureDepart, dateArrivee, heureArrivee ; `ouvrirVol()`, `fermerVol()`) — Départ/Arrivée (1) → `Aéroport` (nom)
- `Vol` ←escale (0..\*, `{ordered}`)→ `InfosEscale` (heureArrivee, heureDepart) ←(0..\*)→ `Aéroport`
- `Aéroport` — dessert (1..\* / 0..\*) → `Ville` (nom)
- `Client` (nom, prénom, adresse, téléphone, e-mail) — a effectué (0..\*) → `Réservation` (date, numéro ; `annuler()`, `confirmer()`)
- `Réservation` — concerne (1) → `Vol`, `Réservation` — concerne (1) → `Passager` (nom, prénom)

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/acoo-td2-analyse-structurelle-corrige.pdf" />

</TabItem>
</Tabs>
