---
sidebar_position: 13
title: "Examen (Session Principale) — 04/01/2019"
sidebar_label: Examen 2018/2019 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Examen (Session Principale) — Analyse et Conception Orientées Objet (2018/2019)

*Université de La Manouba — École Nationale des Sciences de l'Informatique — A.U. : 2018-2019 — Niveau : II2 — Date : 04/01/2019 — Durée : 2h — Documents non autorisés — Nombre de pages : 4 + Annexe — Enseignants : C. Ben Othmane, N. Ben Yahia, I. Fliss, M.A. Mezghich, S. Mathlouthi*

## Exercice 1 (4pts)

**1.** Qu'est-ce qu'un paquet et quelle vue de système représente le diagramme de paquet ? (1pt)

<details>
<summary>Correction</summary>

Ensemble homogène de classes ou sous-paquets — la vue logique.

</details>

**2.** Qu'est-ce qu'un composant dans un diagramme de composants et quelle vue de système représente ce diagramme ? (1pt)

<details>
<summary>Correction</summary>

Entité logicielle — la vue de développement.

</details>

**3.** Qu'est-ce qu'un nœud dans un diagramme de déploiement et quelle vue de système représente ce diagramme ? (1pt)

<details>
<summary>Correction</summary>

Entité matérielle — la vue physique.

</details>

**4.** On souhaite concevoir un jeu collaboratif en ligne. Pour jouer, les utilisateurs ont besoin d'installer sur leurs équipements (ordinateurs, smartphones ou tablettes) un navigateur web. Le jeu sera déployé sur un serveur et géré par le serveur web Apache. Toutes les données (comptes de joueurs, leurs historiques, etc.) seront gérées par un serveur de données via le SGBD MySQL. Proposez un diagramme de déploiement pour ce jeu en ligne. (1pt)

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 1 — le diagramme de déploiement attendu (schéma) n'est pas repris dans le texte extrait. -->

</details>

## Exercice 2 (8pts)

L'objectif est de créer une application permettant le contrôle de la température en degré Celsius ou Fahrenheit. L'application se compose d'une fenêtre principale de configuration et de deux fenêtres d'affichage (fenêtre Celsius et fenêtre Fahrenheit) représentant la même température sous deux formes différentes. La modification d'une des deux fenêtres d'affichage doit mettre automatiquement à jour l'autre fenêtre.

L'utilisateur aura à tester les opérations suivantes et verra de manière animée le résultat de ces opérations :

- Initialiser la valeur de la température dans la fenêtre principale.
- Incrémenter/décrémenter la température à partir de la fenêtre Celsius ou la fenêtre Fahrenheit (l'incrémentation/la décrémentation de la température d'une fenêtre met à jour automatiquement l'affichage de l'autre fenêtre).

Une fois la température est initialisée par l'utilisateur, elle aura deux états en parallèle (TempC et TempF pour les deux modes d'affichage). Chaque état est composé de deux sous-états incrémentée et décrémentée en s'appuyant respectivement sur les boutons «+» et «-».

**1.** Représentez par un diagramme d'états-transitions les différents états d'une température. (1.5pt)

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 1 — le diagramme d'états-transitions attendu (schéma) n'est pas repris dans le texte extrait. -->

</details>

On compte proposer une seconde version où les opérations citées plus haut se feront automatiquement sans l'intervention explicite de l'utilisateur. L'application appliquera sur la température de manière aléatoire les différentes opérations et l'utilisateur n'aura qu'à effectuer les actions suivantes :

- Démarrage : démarrer les opérations sur la température (au début).
- Pause : arrêter momentanément les opérations sur la température (seulement si la température est en action).
- Reprise : reprendre les opérations sur la température après une pause (sans réinitialisation de la température).
- Arrêt : arrêter définitivement les opérations sur la température (seulement si la température est en action).

**2.** Reprenez le diagramme d'états-transitions précédent pour le compléter en pensant à utiliser un état composite. (1.5pt)

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 2 — le schéma comporte un état composite avec les sous-états "Repos" et "Action" (transitions Démarrer/Arrêter/Pauser/Reprendre), reproduit ici de manière incomplète faute d'extraction fiable du diagramme d'origine. -->

</details>

**3.** Pour s'assurer de la conformité des deux fenêtres d'affichage, la classe Température ne devrait avoir qu'une seule instance à la fois. Écrivez en Java le code de cette classe en vous basant sur le patron de conception « Singleton ». (1.5pt)

<details>
<summary>Correction</summary>

```java
public class Temperature {
    private static Temperature instance = null;

    // La présence d'un constructeur privé
    private Temperature() { }

    // Retourne l'unique instance de cette classe.
    public static Temperature getInstance() {
        if (instance == null)
            instance = new Temperature();
        return instance;
    }
}
```

</details>

**4.** Cette application utilise les composants graphiques suivants : Fenêtre, Panneau, Bouton, Label et Texte. Les composants Fenêtre et Panneau peuvent eux-mêmes être composés de tous les composants graphiques cités précédemment. Représentez par un diagramme de classes la partie graphique de cette application en vous basant sur le patron de conception « Composite » (vous trouverez en annexe le diagramme de classes de ce design pattern). (1.5pt)

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 2 — le diagramme de classes Composite attendu (schéma) n'est pas repris dans le texte extrait. -->

</details>

**5.** En vous inspirant du patron de conception « Observer », enrichissez le diagramme de classes de la question précédente pour proposer un nouveau diagramme de classes intégrant les classes Température, FenêtreCelsius et FenêtreFahrenheit, etc. (vous trouverez en annexe le diagramme de classes de ce design pattern). (2pts)

<details>
<summary>Correction</summary>

Le corrigé fournit le diagramme de classes du patron Observer appliqué à ce contexte :

- `Sujet` (interface) : `ajouter_Obsv`, `supprimer_Obs`, `notifier` — associée à `1..*` `Observateur` (classe abstraite) qui déclare `miseàjour`.
- `Temperature` hérite de `Sujet` et ajoute `incrementer`, `decrementer`.
- `FenêtreCelsius` (1) et `FenêtreFahrenheit` (4) héritent de `Observateur` et implémentent `miseàjour`.

</details>

## Problème (8 points)

Une société de développement souhaiterait développer une application web de vente d'objets. Elle vous fournit les besoins suivants et vous charge de réaliser l'analyse et la conception de cette application :

Tout utilisateur peut consulter le site web de cette application sans être obligé de s'inscrire. Seuls les acheteurs et les vendeurs doivent s'inscrire pour pouvoir acheter ou vendre des objets.

Pour s'inscrire un vendeur ou un acheteur doit choisir un login et un mot de passe et fournir ensuite ses informations personnelles (nom, prénom, numéro de téléphone, adresse, adresse mail) et aussi les informations concernant sa carte bancaire (numéro de la carte et le code de vérification CVV). Les informations de la carte bancaire des vendeurs servent à la société afin de pouvoir prélever directement les frais sur chaque vente réalisée. Les informations bancaires des acheteurs permettent le paiement des achats.

Le processus de vente passe par les étapes suivantes :

- Un vendeur peut mettre en vente un objet soit par vente directe, soit par enchère. La vente directe permettra aux acheteurs d'acheter directement l'objet. La vente aux enchères quant à elle, permet aux acheteurs de faire des enchères jusqu'à la fin de la durée de l'enchère. Le dernier acheteur ayant proposé le prix le plus haut peut alors acheter l'objet. Aucun acheteur ne peut annuler sa proposition en cours de la procédure de vente, toute proposition d'achat est considérée comme un engagement réel.
- La mise en vente d'un objet (en direct ou par enchère) nécessite le remplissage d'un formulaire (par le vendeur) contenant des informations décrivant l'objet : libellé, catégorie, mots clés, description détaillée, photo et prix. Dans le cas d'une vente par enchère, il faut indiquer en plus la durée de la vente (en jours). Un utilisateur peut chercher ainsi un objet en choisissant la catégorie auquel correspond cet objet ou encore en tapant un ou plusieurs mots clés dans le moteur de recherche du site.
- Chaque acheteur a le choix entre acheter un objet directement ou par enchère selon le type de vente proposé par le vendeur. Pour enchérir, l'acheteur saisit le montant maximum qu'il souhaiterait payer et l'application se charge de l'enchère jusqu'à la fin de la durée de l'enchère.
- À la fin d'une vente (directe ou par enchère) le vendeur peut accepter ou refuser la vente. En cas d'acceptation, le client est informé de la vente et son compte bancaire se voit débité du prix de l'objet choisi. Le vendeur n'enverra l'objet qu'une fois le paiement reçu. Une fois l'objet reçu, le client peut laisser un message au vendeur via le site pour l'informer de son avis ou demander éventuellement un échange en cas de défaut.

Une fonction d'administration est également à prévoir afin de permettre la gestion des comptes des différents vendeurs et acheteurs inscrits sur le site de l'application.

**Travail demandé :**

**1/** Fournissez le diagramme de cas d'utilisation et faites en sorte de bien distinguer les acteurs principaux des acteurs secondaires (s'ils existent). (2pts)

<details>
<summary>Correction</summary>

Acteurs principaux : utilisateur ordinaire, vendeur, acheteur, administrateur.

Acteur secondaire : système bancaire.

*(Note du corrigé : « 2 pts c'est peu à répartir, je propose une évaluation globale pour toute proposition plausible ».)*

À prendre en compte dans le diagramme :

- les liens d'héritage : par exemple entre les acteurs (utilisateur, vendeur, acheteur) et entre les cas d'utilisation (ex : vendre, vendre aux enchères, vente directe) ;
- les liens d'inclusion (ex : obligation de remplir un formulaire, identification) ;
- les liens d'extension (ex : laisser un message).

</details>

**2/** Une première analyse a permis de réaliser le diagramme de classes suivant (à compléter) :

<!-- TODO: unclear in source, verify against original PDF page 6 — le diagramme de classes de départ fourni par l'énoncé montre les classes Personne, Vendeur, Acheteur, ObjetAVendre, «abstract» Type de vente (Vente directe / Enchère), et une classe association EnchèreClient (attribut montantMax, {ordered}) reliant Acheteur et Enchère ; reproduit ici de manière incomplète faute d'extraction fiable du schéma d'origine. -->

**a/** Améliorez et complétez ce diagramme de classes en : (2pts)

- factorisant les informations par des liens d'héritage,
- complétant les associations et leurs cardinalités,
- rajoutant des attributs et quelques méthodes nécessaires,
- décorant chaque association par le ou les contraintes de gestion appropriées.

**b/** Une des classes est une classe d'association, précisez laquelle et justifiez votre réponse. (1pt)

<details>
<summary>Correction</summary>

`EnchèreClient` : classe d'association — elle dépend d'`Acheteur` et d'`Enchère`, et `montantMax` est un attribut d'association.

*(Note du corrigé sur le schéma de départ : « Ce n'est pas la seule possibilité bien entendu :) ».)*

</details>

**3/** Représenter à l'aide d'un diagramme d'activités avec couloirs le processus de vente. (1.5pt)

<details>
<summary>Correction</summary>

Deux couloirs, Vendeur et Acheteur : `Mettre en vente` → `Remplir formulaire` → branche `[Vente aux enchères]` → `Proposer durée` / sinon → `Acheter direct` ou `Acheter par enchère` → `Proposer montant` → `[si montant = max]` → `Décider`.

Comme le paiement ne se fait pas directement par le client, on peut ajouter l'acteur secondaire système bancaire pour cette activité, et ceci si la décision du vendeur est positive.

</details>

**4/** La gestion des enchères étant faite par l'application, on suppose qu'il y a une classe `Juge` permettant de gérer les enchères (déclencher la création, l'ouverture et la fermeture de l'enchère et le choix du montant le plus haut). Proposez un diagramme de séquence objets modélisant les interactions entre les instances des classes `ObjetAVendre`, `Juge` et `Enchère` lorsqu'un vendeur met un objet à vendre par enchère. (1.5pt)

<details>
<summary>Correction</summary>

`:ObjetAVendre` envoie un message de notification à `:Juge` (déjà créé) qui envoie à son tour un message de création à `:Enchère` (en appelant `créer()`) puis `ouvrir()` et ensuite `fermer()`. Après la fermeture, envoi du message `choisir()` (méthode réflexive pour déterminer le montant max au niveau de `:Enchère`) puis retour de cette valeur à l'objet `:Juge`.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/acoo-examen-2018-2019.pdf" />

</TabItem>
</Tabs>
