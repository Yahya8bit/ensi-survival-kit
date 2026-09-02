---
sidebar_position: 3
title: Devoir Surveillé 2016/2017 (Corrigé)
sidebar_label: DS 2016/2017 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Devoir Surveillé — Génie Logiciel (Corrigé)

*Université de la Manouba — ENSI — Niveau 1 : II2 — Date : Mardi 15 Novembre 2016 — Durée : 2H — Documents non autorisés — Barème probable : 8, 8, 4 — Enseignants : R. Drira, N. Bellamine, C. Ben Othmen, N. Ben Yahia, I. Fliss, M.A. Mezghich*

*La précision, la consistance, la clarté seront appréciées.*

## Exercice 1 : Questions de réflexion (8pts)

**1.** Plusieurs critères permettent de juger de la qualité d'un bon logiciel.

**a.** Donnez brièvement la définition des critères suivants : Validité, Robustesse, Réutilisabilité. (0,5×3)

**b.** Répondez par vrai/faux et justifiez brièvement : « Un bon logiciel est un logiciel qui vérifie tous les critères de qualité vus dans le cours. »

<details>
<summary>Correction</summary>

**Faux** : il faut choisir les critères de qualité les plus pertinents selon le type du logiciel, le contexte, etc. Il serait impossible de satisfaire tous les critères de qualité, ils sont souvent conflictuels (optimiser un critère de qualité peut nuire à un autre critère…). (1pt : 0,5 Faux + 0,5 justification)

</details>

**c.** Répondez par vrai/faux et justifiez brièvement : « Il coûte moins cher de corriger une erreur à la conception que de la détecter plus tard et corriger le code qui en résulte. »

<details>
<summary>Correction</summary>

**Vrai.** Plus on détecte une erreur tôt, mieux c'est. Quand on corrige une erreur à la conception, cela veut dire que nous avons épargné l'effort de coder une fausse conception et aussi l'effort de correction après le codage… (1pt : 0,5 Vrai + 0,5 justification)

</details>

**2.** Une compagnie spécialisée dans le développement des systèmes de visualisation par ordinateur désire développer un simulateur de chirurgie orthopédique pour aider les chirurgiens à simuler et à planifier par ordinateur les interventions chirurgicales avant de les effectuer. Le système comporterait une composante de visualisation graphique et une composante de modélisation mécanique du corps humain (os et muscles). Il s'agirait du premier système dans le domaine biomédical pour la compagnie en question, malgré que des simulateurs de chirurgie orthopédique existent déjà sur le marché (construits par des compétiteurs). Le système doit être fiable et le nombre d'erreurs résiduelles dans le système après les tests doit être réduit.

**a.** Discutez les avantages et les inconvénients du choix du modèle en cascade comme modèle de développement d'un tel logiciel. (0,5)

**b.** Discutez les avantages et les inconvénients du choix du modèle en V comme modèle de développement d'un tel logiciel. (0,5)

**c.** Quel modèle de développement autre que cascade et V recommanderiez-vous à une telle compagnie ? Pourquoi ? (1pt)

<details>
<summary>Correction</summary>

Plusieurs réponses possibles, ça dépend de la justification.

</details>

**d.** Un extrait du cahier des charges du logiciel montre les deux besoins non fonctionnels suivants :

i. « Le système doit être fiable »
ii. « Le nombre d'erreurs résiduelles dans le système après les tests doit être réduit »

Êtes-vous d'accord avec cette formulation des besoins ? Pourquoi ?

<details>
<summary>Correction</summary>

Non, besoins non vérifiables (mesurables). (0,5pt)

Si vous n'êtes pas d'accord, proposez une correction pour considérer ces besoins comme des besoins non fonctionnels bien formulés : ajouter une métrique par besoin. Plusieurs réponses possibles. (0,5×2)

</details>

**3.** L'entreprise TradAdvance désire implanter des notions d'agilité dans son processus traditionnel de développement de logiciels. Vous êtes engagé(e) comme consultant(e) afin de les aider à comprendre les concepts fondamentaux des méthodes agiles. Dans le cadre des méthodes agiles, répondez à chacune des questions suivantes (0,25×4) :

**a.** Quelle est la meilleure « unité de mesure » de la progression d'un projet ?

<details>
<summary>Correction</summary>

Le code qui fonctionne…

</details>

**b.** À quelle fréquence faut-il faire une nouvelle planification ?

<details>
<summary>Correction</summary>

Les itérations doivent être courtes (exemple pour SCRUM entre 2 et 4 semaines) ; à l'issue de chaque itération on peut revoir la planification selon l'avancement.

</details>

**c.** Faut-il faire participer le client tout au long du développement ?

<details>
<summary>Correction</summary>

Oui, le client est un **partenaire**.

</details>

**d.** Quelle est la taille optimale d'une équipe agile ?

<details>
<summary>Correction</summary>

Minimiser le nombre de développeurs, maximiser les compétences au sein de l'équipe.

</details>

## Exercice 2 : Analyse des besoins (8pts)

Il s'agit de développer un logiciel **ProManag** permettant de gérer les projets au sein d'une société de services (développement, étude, etc.). Les utilisateurs de l'application auront la possibilité de consulter et mettre à jour les informations auxquelles ils auront accès. Ces informations peuvent concerner un projet en cours ou clôturé.

Chaque projet est affecté à un chef qui a pour rôle de veiller au bon déroulement du projet. Un projet possède les informations suivantes : un code, un nom, une description, un organisme client, une date de début, une date de fin, un montant et un ensemble de documents techniques. Un organisme client est caractérisé par : un code, un nom, une adresse, un numéro de téléphone, le nom du contact, un email du contact et une adresse web.

Afin de mieux maîtriser la complexité des projets, chaque projet est décomposé en phases dont chacune possède : un code, un libellé, une description, une date de début, une date de fin, un ensemble d'employés chargés de la réaliser, un montant à payer à la fin de la phase (un pourcentage du montant du projet), l'état de réalisation (terminée ou non), l'état de facturation (facturée ou non), l'état de paiement (payé ou non). Une phase possède également un ensemble de documents qui constituent les livrables. Un livrable est caractérisé par : un code, un libellé, une description et le chemin vers un document sur disque.

L'application ProManag doit permettre à la secrétaire d'ajouter et de modifier les projets et les organismes clients. Les informations que la secrétaire a le droit d'ajouter ou de modifier concernant les projets sont : le nom du projet, la description, l'organisme client, la date de début et la date de fin. C'est le directeur qui aura le droit de compléter les informations manquantes, en particulier le montant et le chef du projet, et de modifier toutes les informations d'un projet.

Une fois un chef est affecté à un projet, il sera notifié et il pourra le décomposer en phases tout en indiquant pour chaque phase : le libellé, la description, la date de début, la date de fin, le pourcentage à payer, les personnes qui vont la réaliser. Le chef pourra aussi modifier une phase en indiquant les livrables ou son état de clôture. Le même chef pourra être affecté à plusieurs projets.

En ce qui concerne la facturation et le paiement des projets, c'est le comptable qui aura le droit de facturer les phases terminées, de modifier les états de facturation et de modifier l'état de paiement des phases terminées. Chaque facture est envoyée par courrier au client et une copie de la facture est envoyée directement au système de paiement de l'organisme client. Le comptable aura aussi le droit de faire des recherches par période pour avoir les phases terminées mais non facturées, les phases facturées mais non payées, les phases payées, etc.

Tous les utilisateurs de l'application ProManag sont gérés (ajout, modification et suppression) par l'administrateur.

**1.** Identifiez les acteurs de ProManag. (1,5pt)

<details>
<summary>Correction</summary>

**Acteurs primaires** : Secrétaire, Chef de projet, Directeur, Administrateur, Comptable.

**Acteur secondaire** : Système de paiement de l'organisme client.

</details>

**2.** Identifiez les besoins fonctionnels par acteur. (4,5pts)

<details>
<summary>Correction</summary>

Voir ce qui est surligné en rouge sur l'énoncé source.

</details>

**3.** Proposez deux besoins non fonctionnels bien formulés pour ce système. (2pts)

## Exercice 3 : Principes de conception (4pts)

**1.** Définissez les principes de conception suivants : Abstraction, Anticipation des changements. (0,5×3)

**2.** Précisez le type de cohésion au niveau de la classe suivante :

```java
class Math {
  public static int abs(int a){..} // renvoie la valeur absolue
  public static double sqrt (double r){..} // renvoie la racine carrée
  public static double cos(double r){..} // renvoie le cosinus
  public static double sin(double r){..} // renvoie le sinus
}
```

<details>
<summary>Correction</summary>

**Cohésion logique.** (0,5)

</details>

**3.** Deux méthodes d'une même classe communiquent par l'intermédiaire d'attributs de classe (variables globales).

**a.** Quel est le type de couplage entre ces deux méthodes ?

<details>
<summary>Correction</summary>

**Couplage global.** (0,5)

</details>

**b.** Comment le qualifiez-vous ?

<details>
<summary>Correction</summary>

**Couplage fort.** (0,5)

</details>

**c.** Expliquez comment l'améliorer.

<details>
<summary>Correction</summary>

La communication entre ces méthodes devra se faire à travers les paramètres (en entrée, en sortie, en entrée/sortie). Si une méthode a besoin d'une valeur pour faire son calcul, elle devra la recevoir en paramètre et non pas la récupérer à partir d'une variable globale. Si une méthode a besoin de renvoyer un résultat, elle devra le faire dans ses paramètres de sortie et non pas le stocker dans une variable globale. (0,5)

</details>

**d.** Une classe A possède une opération `op1(in a : integer, in b : string) : bool` dont le code fait référence à un objet instance d'une classe B. A et B sont-ils couplés ? Justifiez.

<details>
<summary>Correction</summary>

Oui, A et B sont couplés. Si la classe B est modifiée, il faudra vérifier si `op1` de la classe A devra être modifiée en conséquence, et même d'autres éléments de la classe A risquent d'être modifiés. (0,5)

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/gl-ds-2016-2017-correction.pdf" />

</TabItem>
</Tabs>
