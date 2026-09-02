---
sidebar_position: 7
title: Exercice à rendre
sidebar_label: Exercice à rendre
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Exercice à rendre

*ENSI — Matière : ACOO*

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

Diagramme de classes de départ (extrait) : `Client`, `Vendeur`, `Acheteur`, `ObjetAVendre`, `Enchère` (`ouverte: booléen` ; `créer()`, `ouvrir()`, `fermer()`), classe d'association `EnchèreClient` (`montantMax`), association `achat direct`.

<!-- TODO: unclear in source, verify against original PDF — this hand-in variant's class diagram omits the `choisir()` method listed on `Enchère` in the equivalent TD5 exercise; transcribed as-is (with `créer()`, `ouvrir()`, `fermer()` only) since it may be a deliberate difference between the two versions of the exercise -->

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/acoo-exercice-a-rendre.pdf" />

</TabItem>
</Tabs>
