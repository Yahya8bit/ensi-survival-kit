---
sidebar_position: 1
title: Devoir Surveillé 2010/2011 (Corrigé)
sidebar_label: DS 2010/2011 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Devoir Surveillé — Méthodes de Conception OO (Corrigé)

*Institut Supérieur d'Informatique — Niveau : 2ème année Licence (SIL/ARS) — Année Universitaire : 2010-2011 — Enseignants : O. Mourali, A. Gallas, N. Zoubeir, L. Sfaxi, H. Turki*

## Exercice 1 (3 pts)

Définir les relations qui doivent exister entre les différentes entités suivantes en justifiant votre réponse :

1. Un cas d'utilisation "Acheter un produit" et un cas d'utilisation "Vérifier la disponibilité du produit"
2. Une classe "Ordinateur" et une classe "Système d'Exploitation"
3. Une classe "Outil" et une classe "Marteau"
4. Un acteur "Peintre", un acteur "Artiste" et un acteur "Chanteur"
5. Un cas d'utilisation "Jouer à la loterie" et un cas d'utilisation "Gagner à la loterie"
6. Une classe "Document" et une classe "Feuille"

<details>
<summary>Correction</summary>

1. **Relation "include"** (acheter inclut vérifier) car on ne peut acheter un produit qu'après avoir vérifié sa disponibilité.
2. **Relation "agrégation"** (tout : ordi, partie : SE) car un ordinateur contient un (ou plusieurs) systèmes d'exploitation.
3. **Relation d'héritage** (mère : Outil, fille : Marteau) car le marteau est un outil.
4. **Relation d'héritage** (chanteur et peintre héritent de Artiste) car un chanteur et un peintre sont des artistes.
5. **Relation "extends"** (gagner à la loterie extends jouer à la loterie) car on peut gagner à la loterie après avoir joué sous la condition que tous (ou certains) les chiffres trouvés sont corrects.
6. **Relation de composition**, car un document contient des feuilles, et si on détruit le document, les feuilles sont détruites (on peut également considérer que c'est une agrégation car les feuilles peuvent exister en dehors du document).

</details>

## Exercice 2 (9 pts)

En vue de la mise en place d'un logiciel dédié à l'industrie textile, nous étudions principalement quelques fonctionnalités permettant de recueillir l'information sur les produits développés dans l'entreprise. Tout le personnel de l'entreprise peut consulter le système, soit pour vérifier qu'un produit particulier existe, soit pour un parcours libre des informations. Toute consultation doit être précédée par une authentification légère dans laquelle la personne précise son nom et son service à des fins de statistiques ultérieures.

Les ingénieurs peuvent effectuer différentes opérations de mise à jour pour les produits dont ils sont responsables : ajout, retrait et modification des informations sur les produits. Ces opérations doivent être précédées d'une authentification plus approfondie lors de laquelle l'ingénieur précise son nom, son service et introduit un mot de passe qui est vérifié en contactant le système de gestion du personnel.

Toutes les opérations (consultations et mises à jour) donnent lieu à un enregistrement dans un journal des accès et peuvent optionnellement s'accompagner d'une impression des documents accédés.

**Travail à faire :** Représenter le diagramme des cas d'utilisation de ce système.

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 2 — la correction de cet exercice est un diagramme de cas d'utilisation dans le PDF source ; l'OCR n'a extrait que les libellés textuels de ses éléments, pas sa structure graphique (acteurs, cas, relations include/extend). Éléments identifiés dans l'OCR : acteurs "Personnel" et "Ingénieur" (et acteur secondaire "Gestion du personnel") ; cas d'utilisation "Authentification légère", "Consultation des produits", "Vérification de l'existence d'un produit", "Parcours libre des infos", "Authentification approfondie", "Mise à jour de produits", "Enregistrement dans un journal des accès", "Impression des documents accédés" ; relations «include» et «extend» entre certains de ces cas. La disposition exacte n'est pas récupérable depuis le texte OCR — se référer à l'image du PDF page 2. -->

</details>

## Exercice 3 (8 pts)

Le jeu du Démineur est composé d'un plateau rectangulaire, d'un chronomètre et d'un compteur de mines. Le plateau est un quadrillage de cases. Au début du jeu, toutes les cases du plateau sont couvertes, le compteur de mines indiquant le nombre de mines restant à localiser. Le chronomètre compte le nombre de secondes écoulées depuis le début de la partie. La partie commence lorsque la première case est découverte.

Quand une case est découverte, son contenu est affiché. Le contenu d'une case peut être : rien, une mine ou un nombre indiquant le nombre de mines présentes dans les cases voisines. Les scénarios suivants peuvent se produire lorsqu'une case est découverte, en fonction de son contenu :

1. Un chiffre – Il ne se passe rien.
2. Un blanc – Toutes les cases voisines sont dévoilées, à condition qu'elles ne soient pas signalées par un drapeau. Si l'une de ces cases voisines ne contient rien, le processus de découverte continue automatiquement à partir de cette case.
3. Une mine – Le jeu est terminé et le joueur a perdu.

Si elle est toujours couverte, une case peut être marquée en respectant les règles suivantes :

- Marquer une case qui n'est ni découverte ni marquée décrémente le compteur de mines restant à localiser et un drapeau apparaît sur la case. Il indique que cette case contient potentiellement une mine. Une case marquée d'un drapeau ne peut pas être découverte.
- Marquer une case déjà signalée d'un drapeau permet de la remettre dans son état initial, à savoir couverte et non marquée. Le compteur de mines est alors incrémenté de 1.

**Travail à faire :** Représenter le diagramme des classes pour ce système.

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 4 — le corrigé de cet exercice (diagramme de classes) n'a pas été récupéré par l'OCR : le texte de la page de correction se limite à répéter l'énoncé, aucun contenu de diagramme de classes n'est présent dans le texte extrait. Se référer à l'image du PDF page 4 pour le corrigé. -->

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/acoo-ds-2010-2011-correction.pdf" />

</TabItem>
</Tabs>
