---
sidebar_position: 1
title: Devoir Surveillé 2018/2019 (Corrigé)
sidebar_label: DS 2018/2019 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Devoir Surveillé — Génie Logiciel (Corrigé)

*Université de la Manouba — ENSI — Niveau 1 : II2 — Date : Mercredi 7 Novembre 2018 — Durée : 2H — Documents non autorisés — Barème probable : 10+10 — Enseignants : R. Drira, A. Hedhili, C. Ben Othmen, N. Ben Yahia, I. Fliss*

*La précision, la consistance, la clarté seront appréciées.*

## Exercice 1 : Processus logiciels (10 pts)

Dans cet exercice, nous souhaitons aider les étudiants suivants à faire leurs choix méthodologiques pour réaliser leurs projets de fin d'études (PFE) :

1. Le projet de Mohamed consiste à développer un site web moyennant les outils MEAN Stack (une pile logicielle qui comporte les technologies MangoDB, Express.js, Angular et Node.js). Cet étudiant a une vision complète sur les besoins fonctionnels et les besoins techniques. Il doit développer son projet selon une approche itérative et incrémentale.
2. Ahlem doit valider d'abord la spécification, après elle doit livrer les fonctions essentielles de son projet. Le reste du logiciel sera produit composant par composant.
3. Sami est intégré dans une équipe de six personnes qui développe un jeu vidéo innovant pour un client qui a tendance à changer souvent d'avis. L'équipe a expliqué à l'étudiant qu'il faudra satisfaire le client et prendre en considération ses réclamations à tout moment. Chaque deux semaines, une version intermédiaire du jeu devra être réalisée.
4. Malek est intégré dans une équipe qui réalise un projet complexe dans le domaine du transport intelligent en se basant sur les diagrammes UML. À chaque bloc de temps, il doit livrer une version intermédiaire.
5. Le chef de projet de Dorra lui a fourni un cahier des charges précis et lui a expliqué qu'à priori tous les besoins sont clairs sauf que le client a l'air d'avoir des doutes concernant quelques fonctionnalités. Dorra a été prévenue qu'elle doit préparer, à chaque activité du cycle de développement de son logiciel, les jeux de tests nécessaires pour corriger les anomalies engendrées.

### Travail à faire

**1.** Parmi les cinq étudiants, indiquez qui peut passer directement à l'implémentation (pour lui suivre un processus de développement est inutile). Justifiez (0,75pt)

<details>
<summary>Correction</summary>

**Réponse :** Aucun étudiant.

**Justification :** Passer directement à l'implémentation sans suivre un processus de développement est une approche artisanale de développement qui peut engendrer beaucoup de risques : difficulté de communication avec le client (quand ? pourquoi ? le rôle du client ?), avec les autres membres de l'équipe de développement (ce que fait chacun ? il est à quel niveau ? définition d'objectifs communs, jargon commun, approche commune, priorités des tâches), la gestion du projet devient compliquée voire absente (un processus de développement nous apporte un guide méthodologique et nous rappelle à identifier et gérer les risques liés par exemple à la planification, la qualité, etc.).

</details>

**2.** Pour les autres étudiants, proposez pour chacun le meilleur processus de développement qu'il a intérêt à suivre. Justifiez (2,5pts — 5×0,5, dont 0,25 réponse + 0,25 justification)

<details>
<summary>Correction</summary>

Je propose les réponses suivantes, mais elles peuvent ne pas être les seules réponses acceptables (cela dépendra de la justification) :

- **Mohamed** : vision complète sur les besoins fonctionnels et les besoins techniques, approche itérative et incrémentale → **Incrémental**
- **Ahlem** : doit valider d'abord la spécification, après elle doit livrer les fonctions essentielles de son projet ; le reste du logiciel sera produit composant par composant → **Incrémental** après la validation de la spécification, si le projet est décomposable en incréments suffisamment découplés, sinon **SCRUM**
- **Sami** : un jeu vidéo innovant pour un client qui a tendance à changer souvent d'avis, il faudra satisfaire le client et prendre en considération ses réclamations à tout moment, chaque deux semaines une version intermédiaire du jeu devra être réalisée → **SCRUM**
- **Malek** : intégré dans une équipe qui réalise un projet complexe dans le domaine du transport intelligent en se basant sur les diagrammes UML, à chaque bloc de temps il doit livrer une version intermédiaire → **PU**
- **Dorra** : un cahier des charges précis, le client a l'air d'avoir des doutes concernant quelques fonctionnalités, elle doit préparer à chaque activité du cycle de développement les jeux de tests nécessaires pour corriger les anomalies engendrées → **en V**

</details>

**3.** Indiquez les projets des étudiants où l'usage de la technique de prototypage est bénéfique. Expliquez. (1pt)

<details>
<summary>Correction</summary>

Ahlem et Dorra (0,5×2).

</details>

**4.** Donnez une figure qui explique le déroulement du modèle par prototypage. (1pt)

<details>
<summary>Correction</summary>

Voir cours.

</details>

**5.** Dressez un tableau comparatif des différents processus choisis dans la question 2 selon deux critères à définir. (2,5pts)

<details>
<summary>Correction</summary>

Comparatif entre les processus proposés par les étudiants selon les critères choisis : 10 cases × 0,25 ; si un processus a été utilisé deux fois, on peut attribuer 0,5 aux critères.

</details>

**6.** Pour chaque projet, donnez un exemple de risque que l'étudiant doit détecter et résoudre afin de mener à bien son PFE. (1,25pt — 0,25×5)

<details>
<summary>Correction</summary>

- **Mohamed** : les problèmes d'intégration surtout pour les derniers incréments.
- **Ahlem** : risque de ne pas pouvoir valider toutes les spécifications de façon claire et dans des délais.
- **Sami** : risque de ne pas pouvoir avancer convenablement s'il ne réussit pas à bien maîtriser son client qui change d'avis fréquemment.
- **Malek** : risque de donner une priorité à la documentation et ses mises à jour au détriment de l'avancement dans le développement.
- **Dorra** : clarification des doutes du client concernant quelques fonctionnalités.

</details>

**7.** Donnez quatre conseils pratiques à ces étudiants qui peuvent les guider afin de (1) bien développer leurs logiciels et (2) faciliter la phase de maintenance. (1pt — 0,25×4)

<details>
<summary>Correction</summary>

- Planifier et respecter les délais
- Choisir les critères de qualité les plus importants selon le logiciel à développer et s'assurer de les respecter
- Valider et vérifier
- Documenter

</details>

## Exercice 2 : Analyse des besoins (10 pts)

### Partie 1 : Questions de réflexion

**1.** Quelles sont les méthodes qui peuvent être utilisées pour déterminer les besoins d'un logiciel informatique ? (1 pt)

**2.** Précisez les axes et les styles de spécification d'un logiciel. (1,5pt)

<details>
<summary>Correction</summary>

- **Axes** : axe fonctionnel, axe structurel, axe comportemental.
- **Styles** : informel, semi-formel et formel.

</details>

**3.** Définissez la notion de modèle (0,5). Donnez deux avantages et deux inconvénients de la modélisation pour la spécification des logiciels (0,25×4). (1,5pt)

### Partie 2 : Étude de cas

Le directeur d'une chaîne de magasins de vente de bracelets de sécurité vous charge de créer un site web de son service de vente (« FeelSECURE.com »). Afin de mieux cerner les besoins de cette entreprise, vous avez interrogé le directeur et dégagé les points suivants :

La seule activité de FeelSECURE.com est la vente de bracelets de sécurité au public sur Internet. Il existe différentes catégories de bracelets selon leur porteur : des enfants, des personnes âgées, des adultes allant dans des milieux malfamés, etc.

Un visiteur du site de vente en ligne ne peut acheter qu'après inscription et authentification via un e-mail et un mot de passe d'au moins huit caractères. Lors de l'inscription, il est demandé de préciser les informations suivantes : état civil, adresse (celle qui sera utilisée pour la facturation des bracelets achetés) et numéro de carte de fidélité des magasins FeelSECURE (s'il y en a).

Pour chaque bracelet du catalogue, un visiteur peut visualiser le modèle du bracelet et les avis d'autres acheteurs. Il peut également savoir si c'est une édition spéciale du bracelet (un bracelet Samsung par exemple). Le numéro de code à barres d'un bracelet est différent selon l'édition.

Le prix d'un bracelet dépend de la date depuis laquelle il est sorti. En général, à sa sortie, son prix est modéré, puis quelques semaines plus tard, le prix est rehaussé selon le taux de vente.

Lors d'une visite sur le site, un client peut créer un nouveau « panier » dans lequel il met le ou les bracelets qu'il veut acheter ainsi que le nombre d'exemplaires qu'il souhaite acheter. Ce panier est modifiable tant que le paiement de celui-ci n'est pas validé et confirmé. Le paiement s'effectue par un intermédiaire spécialisé qui se charge de prélever le coût de la commande aux clients, de confirmer à FeelSECURE.com que la commande a bien été payée et d'éditer un numéro unique de paiement. Une facture est alors établie ; chaque facture a un numéro (unique mais les numéros ne se suivent pas forcément), les coordonnées du client, une adresse de facturation, une adresse de livraison et la liste des bracelets achetés.

Des frais de livraison sont facturés aux clients. Une commande peut avoir plusieurs états après sa validation : « en attente de réapprovisionnement » lorsqu'un (ou plusieurs) bracelet(s) n'est (sont) pas en stock, « en cours de traitement » lorsque la commande est en cours de traitement, « en cours de livraison » lorsqu'elle est chez le transporteur (le client peut alors consulter le numéro du colis postal correspondant), puis finalement « livrée » lorsque le transporteur a confirmé que le colis a bien été livré.

Tous les utilisateurs de l'application FeelSECURE.com sont gérés (ajoutés, modifiés et supprimés) par l'administrateur.

#### Travail à faire

**a)** Identifiez les acteurs de FeelSECURE.com et leurs types (primaire ou secondaire). Justifiez (1 pt)

<details>
<summary>Correction</summary>

Acteurs (surlignés en orange dans l'énoncé source) : tous des acteurs primaires.

</details>

**b)** Identifiez les besoins fonctionnels par acteur. (2,5 pts)

<details>
<summary>Correction</summary>

Besoins fonctionnels surlignés en bleu dans l'énoncé source.

</details>

**c)** Donnez trois besoins non fonctionnels vérifiables. (1,5 pts — 3 BNF + métrique : 0,5×3)

<details>
<summary>Correction</summary>

Exemples :

- Chaque client doit être authentifié par un e-mail et un mot de passe d'au moins huit caractères.
- La connexion au site de l'intermédiaire spécialisé doit être sécurisée : utilisation du protocole XXX ou YYY.
- Le temps de réponse du site doit être inférieur à 0,01 ms.

</details>

**d)** Conseilleriez-vous à l'équipe de spécification de ce logiciel de modéliser les besoins en utilisant un langage de spécification semi-formel ? Justifiez votre réponse. (1 pt)

<details>
<summary>Correction</summary>

Oui (0,5pt). Pour communiquer, faciliter la validation, documenter…

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/gl-ds-2018-2019-corrige.pdf" />

</TabItem>
</Tabs>
