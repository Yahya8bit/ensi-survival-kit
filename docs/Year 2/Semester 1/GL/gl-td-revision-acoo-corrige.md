---
sidebar_position: 4
title: TD de révision GL & ACOO (Corrigé)
sidebar_label: TD de révision (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD de révision — Génie Logiciel & ACOO (Corrigé)

*ENSI — II2 — Génie Logiciel*

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments) — best-effort reconstruction below, see task summary. Several diagrams referenced (schéma UML de réalisation d'interface, diagramme d'états-transitions de la boîte de vitesses, diagrammes de classes/activités/séquence de l'exercice de vente en ligne) are images not extracted as text. -->

## Partie GL

### Choisissez LA OU LES bonnes alternatives tout en justifiant votre réponse

(Toute réponse non justifiée ne sera pas notée.)

**1.** Pour avoir un logiciel de qualité, le compromis à considérer entre couplage et cohésion est :

a) Réduire le couplage et accroître la cohésion
b) Réduire la cohésion et accroître le couplage
c) Réduire le couplage et réduire la cohésion
d) Accroître le couplage et accroître la cohésion

**2.** Le test d'un logiciel :

a) Fait partie du processus de développement
b) C'est exécuter le programme dans l'intention d'y trouver des anomalies ou des défauts
c) A pour objectif de réduire les risques d'apparition d'anomalies
d) A pour objectif de corriger le défaut détecté
e) Permet de s'assurer de l'absence d'erreurs dans un logiciel

<details>
<summary>Correction</summary>

Justification : le test détecte la présence des erreurs, non leur absence, et ne corrige pas les erreurs (c'est le rôle de la mise au point).

</details>

**3.** On exécute le programme avec des valeurs en entrée et on observe le comportement dans le cas :

a) Des tests statiques
b) Des tests dynamiques

<details>
<summary>Correction</summary>

Justification : les tests statiques inspectent le code et ne l'exécutent pas.

</details>

**4.** Les tests structurels ou tests boîte blanche :

a) Utilisent la structure interne du code d'un logiciel pour vérifier son comportement.
b) Vérifient que le logiciel est conforme à sa spécification quand on n'a pas encore un code qui tourne.
c) Sont inutiles si nous avons déjà effectué des tests boîte noire.

<details>
<summary>Correction</summary>

Justification : dans les tests boîte blanche, nous avons le code source, et ils sont complémentaires aux tests boîte noire.

</details>

**5.** La stratégie de test boîte noire consiste à :

a) Vérifier le fonctionnement interne d'une fonction en cours d'exécution
b) Tester un système avec la seule connaissance de ses entrées et sorties
c) Couvrir tous les chemins dans un algorithme

**6.** Un style architectural :

a) Est un patron décrivant une architecture logicielle permettant de résoudre un problème particulier
b) Est équivalent à un patron de conception
c) Comporte des guides de bonnes pratiques et des règles générales qui ne peuvent pas être traduites directement en code source

### Corrigez les propositions incorrectes

**1.** Le style architectural physique est indépendant des considérations physiques, hors de tout contexte d'exécution (machines, OS et réseaux).

<details>
<summary>Correction</summary>

Le style architectural **logique** est indépendant des considérations physiques, hors de tout contexte d'exécution (machines, OS et réseaux).

</details>

**2.** La conception détaillée a pour but la structuration et l'organisation générale du système à concevoir.

<details>
<summary>Correction</summary>

La conception **architecturale** a pour but la structuration et l'organisation générale du système à concevoir.

</details>

**3.** Un faible couplage est précurseur d'un bon découpage du système et d'une facilité de maintenance.

<details>
<summary>Correction</summary>

Proposition correcte (pas de correction nécessaire).

</details>

**4.** L'architecture orientée service constitue un style d'architecture basé sur le principe de séparation de l'activité métier en une série de services.

<details>
<summary>Correction</summary>

Proposition correcte (pas de correction nécessaire).

</details>

**5.** Dans le modèle MVC, le contrôleur représente l'ensemble des composants qui sont chargés de réaliser des appels à la couche Services et de mettre les résultats de l'appel à la disposition de la Vue.

<details>
<summary>Correction</summary>

Dans le modèle MVC, le contrôleur gère la synchronisation entre la vue et le modèle. (C'est le **Modèle** qui représente l'ensemble des composants chargés de réaliser des appels à la couche Services et de mettre les résultats de l'appel à la disposition de la Vue.)

</details>

### Choisissez LA OU LES bonnes alternatives tout en justifiant votre réponse

Considérons le cas d'une application qui contient une interface utilisateur qui fournit une interface graphique de dessin (avec menus, visualisation, etc.). Cette interface interagit uniquement avec une bibliothèque des figures. Cette bibliothèque fournit des figures complexes construites uniquement à l'aide des primitives. Cette bibliothèque utilise exclusivement les services d'un moteur géométrique. Ce moteur géométrique est responsable des calculs vectoriels, des transformations, de l'intégrité de la figure, etc. Il fournit un type abstrait permettant d'accéder à une description (en lecture seule) de la figure ainsi qu'un ensemble minimal de primitives qui changent la figure, en préservant son intégrité. Le style architectural logique le plus adéquat est :

a) Modèle-Vue-Contrôleur (MVC)
b) Trois tiers
c) Client lourd
d) Modèle en couches

### Exercice de test — fonction `invmaxsum`

Nous nous proposons de tester la fonction `void invmaxsum(int maxint, int valeur)` qui calcule l'inverse de la somme de la suite d'entiers inférieurs au paramètre `valeur` tant que cette somme reste plus petite que `maxint`. Sinon, une erreur est affichée. Si le paramètre `valeur` est négatif, sa valeur absolue est considérée.

**1.** Définissez les classes d'équivalence correspondantes aux entrées (tout en étant concis et précis) et proposez un jeu de test pertinent pour chaque classe.

**2.** Soit le code (P) suivant correspondant à cette fonction :

<!-- TODO: unclear in source, verify against original PDF — le code source (P) référencé (image) n'a pas été extrait en texte. -->

a) Donnez le graphe de contrôle pour le programme P (NB : numérotez les nœuds en respectant la numérotation des instructions).
b) Trouvez un jeu de données de test permettant de satisfaire le critère de couverture de toutes les instructions.
c) Ces données de test assurent-elles la couverture de tous les arcs ? Sinon, ajoutez de nouvelles données de test pour couvrir ce critère.
d) Donnez le nombre cyclomatique de (P) par deux méthodes. À quoi sert cette mesure ?

<details>
<summary>Correction</summary>

b) Tous les nœuds : exemple DT1 = (10, −1), DT2 = (0, −1)

c) Non. Exemple de jeu de test à rajouter : DT1 = (10, 3)

d) V(G) = Nombre d'arêtes − nombre de nœuds + 2 = 14 − 12 + 2 = 4. V(G) = Nombre de nœuds condition + 1 = 3 + 1 = 4. V(G) indique le nombre de chemins indépendants.

</details>

**3.** À quelle technique de test correspond chacune des questions (1) et (2) ?

<details>
<summary>Correction</summary>

- Question 1 : test boîte noire.
- Question 2 : test boîte blanche.

</details>

## Partie ACOO (Analyse et Conception Orientées Objet)

### Exercice 1

**1.** Illustrez par un schéma les deux manières de représenter en UML la relation de réalisation d'une interface par une classe.

<!-- TODO: unclear in source, verify against original PDF — le schéma UML illustrant la relation de réalisation (classe + interface, avec le "petit cercle" reliant la classe qui fournit effectivement les services) est une image non extraite en texte. -->

<details>
<summary>Correction</summary>

Représentation d'une interface au moyen d'un petit cercle relié à la classe qui fournit effectivement les services.

</details>

**2.** Quelles sont les vues d'une architecture logicielle ? Donner les diagrammes UML utilisés pour modéliser ces vues.

<details>
<summary>Correction</summary>

Les vues d'une architecture logicielle :

- **Vue logique** : description logique du système décomposé en sous-systèmes (modules + interfaces). UML : diagramme de paquetages.
- **Vue d'implémentation** : description de l'implémentation (physique) du système logiciel en termes de composants et de connecteurs. UML : diagramme de composants.
- **Vue de déploiement** : description de la distribution de la partie logicielle sur la partie matérielle. UML : diagramme de déploiement.
- **Vue d'implémentation + vue physique** : UML : diagramme combiné (déploiement/composants).

</details>

**3.** On considère une boîte de vitesses automatique de voiture. La boîte au démarrage est au point mort. La marche arrière ainsi que la position parking peuvent être enclenchées à partir du point mort. La première marche avant peut également être enclenchée à partir du point mort. En revanche, les autres marches avant, la seconde et la troisième, sont enclenchées en séquence : 1→2→3 pour une accélération, et 3→2→1 pour une décélération. Seules la marche arrière, la position parking et la première marche avant peuvent être ramenées directement au point mort. Modélisez le fonctionnement de la boîte de vitesses à l'aide d'un diagramme d'états-transitions.

<!-- TODO: unclear in source, verify against original PDF — le diagramme d'états-transitions attendu en réponse est une image non extraite en texte. -->

**4.** Pour une expression numérique sélectionnée, le logiciel « A » propose de calculer plusieurs statistiques possibles :

- Le nombre de nœuds de l'arbre binaire ;
- Le nombre d'opérandes de type « variable » ;
- Le nombre d'opérandes de type « constante ».

L'utilisateur sélectionne les statistiques qu'il désire ou annule celles qu'il ne désire plus. À chaque modification de l'expression, ces statistiques sélectionnées sont automatiquement modifiées et calculées dans un objet « Statistique » associé à l'expression numérique. Quel est le patron de conception que vous proposez d'utiliser pour mettre en place la gestion de cet objet « Statistique » associé à une expression numérique ? Justifiez.

<details>
<summary>Correction</summary>

Patron de conception : **Observateur**.

Justification : patron de conception comportemental qui permet de suivre et d'observer les modifications de l'expression numérique et, en conséquence, de calculer les statistiques : sujet observé : expression numérique ; observateur : Statistique.

</details>

### Exercice 2

Une société de développement souhaiterait développer une application web de vente d'objets. Elle vous fournit les besoins suivants et vous charge de réaliser l'analyse et la conception de cette application :

- Tout utilisateur peut consulter le site web de cette application sans être obligé de s'inscrire. Seuls les acheteurs et les vendeurs doivent s'inscrire pour pouvoir acheter ou vendre des objets.
- Pour s'inscrire, un vendeur ou un acheteur doit choisir un login et un mot de passe et fournir ensuite ses informations personnelles (nom, prénom, numéro de téléphone, adresse, adresse mail) et aussi les informations concernant sa carte bancaire (numéro de la carte et le code de vérification CVV). Les informations de la carte bancaire des vendeurs servent à la société afin de pouvoir prélever directement les frais sur chaque vente réalisée. Les informations bancaires des acheteurs permettent le paiement des achats.
- Le processus de vente passe par les étapes suivantes : un vendeur peut mettre en vente un objet soit par vente directe, soit par enchère. La vente directe permettra aux acheteurs d'acheter directement l'objet. La vente aux enchères, quant à elle, permet aux acheteurs de faire des enchères jusqu'à la fin de la durée de l'enchère. Le dernier acheteur ayant proposé le prix le plus haut peut alors acheter l'objet. Aucun acheteur ne peut annuler sa proposition en cours de la procédure de vente, toute proposition d'achat est considérée comme un engagement réel.
- La mise en vente d'un objet (en direct ou par enchère) nécessite le remplissage d'un formulaire (par le vendeur) contenant des informations décrivant l'objet : libellé, catégorie, mots clés, description détaillée, photo et prix. Dans le cas d'une vente par enchère, il faut indiquer en plus la durée de la vente (en jours).
- Un utilisateur peut chercher ainsi un objet en choisissant la catégorie à laquelle correspond cet objet ou encore en tapant un ou plusieurs mots clés dans le moteur de recherche du site.
- Chaque acheteur a le choix entre acheter un objet directement ou par enchère selon le type de vente proposé par le vendeur. Pour enchérir, l'acheteur saisit le montant maximum qu'il souhaiterait payer et l'application se charge de l'enchère jusqu'à la fin de la durée de l'enchère.
- À la fin d'une vente (directe ou par enchère), le vendeur peut accepter ou refuser la vente. En cas d'acceptation, le client est informé de la vente et son compte bancaire se voit débité du prix de l'objet choisi. Le vendeur n'enverra l'objet qu'une fois le paiement reçu.
- Une fois l'objet reçu, le client peut laisser un message au vendeur via le site pour l'informer de son avis ou demander éventuellement un échange en cas de défaut.
- Une fonction d'administration est également à prévoir afin de permettre la gestion des comptes des différents vendeurs et acheteurs inscrits sur le site de l'application.

**1.** Une première analyse a permis de réaliser le diagramme de classes ci-contre :

a. Améliorez et complétez ce diagramme de classes en : factorisant les informations par des liens d'héritage ; complétant les associations et leurs cardinalités ; rajoutant des attributs et quelques méthodes nécessaires ; décorant chaque association par la ou les contraintes de gestion appropriées.
b. Une des classes est une classe d'association, précisez laquelle et justifiez votre réponse.

<!-- TODO: unclear in source, verify against original PDF — le diagramme de classes initial ("ci-contre") est une image non extraite en texte. -->

<details>
<summary>Correction</summary>

b. `EnchèreClient` : classe d'association. Justification : elle dépend d'`Acheteur` et d'`Enchère`, et `MontantMax` est un attribut de l'association.

</details>

**2.** Représentez à l'aide d'un diagramme d'activités avec couloirs le processus de vente.

<!-- TODO: unclear in source, verify against original PDF — le diagramme d'activités attendu en réponse est une image non extraite en texte. -->

**3.** La gestion des enchères étant faite par l'application, on suppose qu'il y a une classe `Juge` permettant de gérer les enchères (déclencher la création, l'ouverture et la fermeture de l'enchère et le choix du montant le plus haut). Proposez un diagramme de séquence objets modélisant les interactions entre les instances des classes `ObjetAVendre`, `Juge` et `Enchère` lorsqu'un vendeur met un objet à vendre par enchère.

<!-- TODO: unclear in source, verify against original PDF — le diagramme de séquence attendu en réponse est une image non extraite en texte. -->

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/gl-td-revision-acoo-corrige.pdf" />

</TabItem>
</Tabs>
