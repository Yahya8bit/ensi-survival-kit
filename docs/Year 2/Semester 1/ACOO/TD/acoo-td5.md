---
sidebar_position: 5
title: "TD5 : Conception détaillée (avec corrigé)"
sidebar_label: TD5 - Conception détaillée
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Série N°5 : Conception détaillée

*ENSI — Matière : ACOO*

## Exercice n°1

Considérons le diagramme de classes d'analyse suivant :

a) Commentez les relations qui figurent dans le diagramme.

b) On se propose de promouvoir dans la mesure du possible les associations du diagramme de classes en compositions ou en agrégations. Proposez une nouvelle version du diagramme de classes d'analyse tout en justifiant vos réponses (ce n'est pas la peine de représenter les attributs).

c) Nous proposons dans un second lieu, de rajouter des détails à ce diagramme d'analyse afin d'aboutir à une première version de diagramme de classes de conception.

i. Quels sont les détails à rajouter pour les différents attributs présents dans le diagramme de classes ? Donnez une nouvelle version du diagramme de classes prenant en compte les détails des attributs que vous avez jugés utiles.

ii. Pour comprendre les règles de gestion gouvernant l'évolution des liens entre les objets, on se propose de décorer les associations par les contraintes `{ordered}`, `{addOnly}`, `{frozen}`, `{notUnique}`.

1. Rappelez brièvement la signification de chaque contrainte de gestion.
2. Décorez chacune des associations par les contraintes de gestion appropriées.

<details>
<summary>Correction</summary>

**a) et b)** Nouvelle version du diagramme de classes d'analyse promouvant les associations en compositions/agrégations là où c'est justifié (le corrigé illustre la démarche mais ne détaille pas les attributs, comme demandé par l'énoncé).

**c)** Diagramme de classes de conception avec les détails d'attributs ajoutés.

**ii.1) Signification des contraintes de gestion :**

- `{frozen}` : un lien ne peut plus être modifié ni détruit après sa création — le tissage des liens est fixé lors de la création et ne peut pas changer.
- `{ordered}` : les éléments de la collection représentant le tissage des liens sont ordonnés.
- `{addOnly}` : il est possible de tisser de nouveaux liens mais impossible d'en supprimer.
- `{nonUnique}` : il est possible d'avoir plus qu'un lien entre deux objets avec la même association : répétitions possibles.

**ii.2)** Chaque association est décorée par la ou les contraintes appropriées.

<!-- TODO: unclear in source, verify against original PDF (Exercice n°1) — the source class diagrams (analysis version, promoted-associations version, and detailed-attributes version) are images; the specific constraint decorations placed on each association in the corrected diagram were not extracted as text, only the exercise's own recap of what each constraint means -->

</details>

## Exercice n°2

Une société de développement souhaiterait développer une application web de vente d'objets. Elle vous fournit les besoins suivants et vous charge de réaliser l'analyse et la conception de cette application :

- Tout utilisateur peut consulter le site web de cette application sans être obligé de s'inscrire. Seuls les acheteurs et les vendeurs doivent s'inscrire pour pouvoir acheter ou vendre des objets.
- Pour s'inscrire un vendeur ou un acheteur doit choisir un login et un mot de passe et fournir ensuite ses informations personnelles (nom, prénom, numéro de téléphone, adresse, adresse mail) et aussi les informations concernant sa carte bancaire (numéro de la carte et le code de vérification de code CVV). Les informations de la carte bancaire des vendeurs servent à la société afin de pouvoir prélever directement les frais sur chaque vente réalisée. Les informations bancaires des acheteurs permettent le paiement des achats. Le processus de vente passe par les étapes suivantes :
- Un vendeur peut mettre en vente un objet soit par vente directe, soit par enchère. La vente directe permettra aux acheteurs d'acheter directement l'objet. La vente aux enchères quant à elle, permet aux acheteurs de faire des enchères jusqu'à la fin de la durée de l'enchère. Le dernier acheteur ayant proposé le prix le plus haut peut alors acheter l'objet. Aucun acheteur ne peut annuler sa proposition en cours de la procédure de vente, toute proposition d'achat est considérée comme un engagement réel.
- La mise en vente d'un objet (en direct ou par enchère) nécessite le remplissage d'un formulaire (par le vendeur) contenant des informations décrivant l'objet : libellé, catégorie, mots clés, description détaillée, photo et prix. Dans le cas d'une vente par enchère, il faut indiquer en plus la durée de la vente (en jours). Un utilisateur peut chercher ainsi un objet en choisissant la catégorie auquel correspond cet objet ou encore en tapant un ou plusieurs mots clés dans le moteur de recherche du site.
- Chaque acheteur a le choix entre acheter un objet directement ou par enchère selon le type de vente proposé par le vendeur. Pour enchérir, l'acheteur saisit le montant maximum qu'il souhaiterait payer et l'application se charge de l'enchère jusqu'à la fin de la durée de l'enchère.
- A la fin d'une vente (directe ou par enchère) le vendeur peut accepter ou refuser la vente. En cas d'acceptation, le client est informé de la vente et son compte bancaire se voit débité du prix de l'objet choisi. Le vendeur n'enverra l'objet qu'une fois le paiement reçu. Une fois l'objet reçu, le client peut laisser un message au vendeur via le site pour l'informer de son avis ou demander éventuellement un échange en cas de défaut. Une fonction d'administration est également à prévoir afin de permettre la gestion des comptes des différents vendeurs et acheteurs inscrits sur le site de l'application.

**Travail demandé :**

1. Une première analyse a permis de réaliser le diagramme de classes suivant :

   a. Améliorez et complétez ce diagramme de classes en :
      - factorisant les informations par des liens d'héritage
      - complétant les associations et leurs cardinalités
      - rajoutant des attributs et quelques méthodes nécessaires
      - décorant chaque association par le ou les contraintes de gestion appropriées

   b. Une des classes est une classe d'association, précisez laquelle et justifiez votre réponse.

2. Représentez à l'aide d'un digramme d'activités avec couloirs le processus de vente.

3. La gestion des enchères étant faite par l'application, on suppose qu'il y a une classe `Juge` permettant de gérer les enchères (déclencher la création, l'ouverture et la fermeture de l'enchère et le choix du montant le plus haut). Proposez un diagramme de séquence objets modélisant les interactions entre les instances des classes `ObjetAVendre`, `Juge` et `Enchère` lorsqu'un vendeur met un objet à vendre par enchère.

Diagramme de classes de départ (extrait) : `Client`, `Vendeur`, `Acheteur`, `ObjetAVendre`, `Enchère` (`ouverte: booléen` ; `créer()`, `ouvrir()`, `fermer()`, `choisir()`), classe d'association `EnchèreClient` (`montantMax`), association `achat direct`.

<details>
<summary>Correction</summary>

**1.b)** `EnchèreClient` est une classe d'association : elle dépend à la fois d'`Acheteur` et d'`Enchère`, et `montantMax` est un attribut de cette association — c'est-à-dire une information qui n'appartient ni à `Acheteur` seul ni à `Enchère` seule, mais au lien entre les deux.

**1.a)** Le diagramme complété factorise `Vendeur` et `Acheteur` sous une classe `Client` (héritage), complète les associations et leurs cardinalités, ajoute des attributs et méthodes, et décore certaines associations avec la contrainte `{addonly}` (notamment sur les associations liées aux enchères, où une proposition d'achat ne peut être ni modifiée ni supprimée une fois faite, cf. énoncé : « Aucun acheteur ne peut annuler sa proposition »).

**2.** Diagramme d'activités avec couloirs (`Vendeur`, `Acheteur`/`Client`, `Application`) représentant le processus de vente : mise en vente de l'objet → recherche/consultation par les acheteurs → achat direct ou enchère → fin de vente → acceptation/refus par le vendeur → débit du compte de l'acheteur → envoi de l'objet → réception et avis du client.

**3.** Diagramme de séquence objets : le vendeur met un objet en vente par enchère → `ObjetAVendre` (ou le vendeur) sollicite `Juge.créer()` pour l'`Enchère` → `Juge.ouvrir()` l'enchère → (les acheteurs enchérissent pendant la durée de l'enchère) → à la fin de la durée, `Juge.fermer()` puis `Juge.choisir()` le montant le plus haut sur `Enchère`.

<!-- TODO: unclear in source, verify against original PDF (Exercice n°2) — the swimlane activity diagram (question 2) and the object sequence diagram (question 3) are images in the source; the descriptions above summarize the corrected class diagram's stated reasoning (EnchèreClient as association class, {addonly} constraint) but the exact swimlane layout and message ordering of the sequence diagram were not extractable as text — verify against the original PDF pages -->

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/acoo-correction-td5.pdf" />

</TabItem>
</Tabs>
