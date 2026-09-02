---
sidebar_position: 1
title: TD1 : Diagramme de cas d'utilisation (corrigé)
sidebar_label: TD1 - Cas d'utilisation
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD1 : Diagramme de cas d'utilisation

*ENSI — Matière : ACOO*

## Exercice 1

On souhaite concevoir et mettre en œuvre une plateforme associative qui permet de promouvoir et d'encourager l'esprit du bénévolat entre ses acteurs. La plateforme permet aux associations de publier et gérer leurs missions. Les bénévoles peuvent consulter la liste des associations et leurs missions. Quand un bénévole souhaite participer à une mission, il doit informer l'association concernée en lui envoyant un émail de demande de participation (cela n'est pas géré par la plateforme associative). Les entreprises peuvent également utiliser la plateforme pour consulter la liste des associations et faire des dons au profit des associations qu'ils choisissent.

On vous demande de :

1. Identifier les acteurs de ce système.
2. Identifier les différents cas d'utilisation.
3. Représenter le diagramme de cas d'utilisation de l'application.

<details>
<summary>Correction</summary>

| Acteur(s) | Besoin(s) Fonctionnel(s) |
| --- | --- |
| Association | – publier des missions<br />– gérer des missions |
| Bénévole | – consulter la liste des associations<br />– consulter la liste des missions |
| Entreprise | – consulter la liste des associations<br />– faire des dons au profit des associations |

<!-- TODO: unclear in source, verify against original PDF (Exercice 1) — the diagramme de cas d'utilisation itself is an image in the slide deck; the OCR extraction did not yield usable text/shapes for it, only the actors/needs table above -->

</details>

## Exercice 2

Les principales fonctions d'un GAB (Guichet Automatique de Banque) sont les suivantes :

- distribution d'argent à tout porteur d'une carte de la banque,
- consultation du solde, dépôt en numéraire et de chèques pour les possesseurs d'une carte de la banque.

Toutes les transactions sont sécurisées (code personnel est vérifié avec le code enregistré sur la puce de la carte ; la carte est avalée après trois échecs). Il faut parfois recharger le GAB et effectuer des opérations de maintenance.

On vous demande de :

1. Identifier les acteurs de ce système.
2. Identifier les différents cas d'utilisation.
3. Représenter le diagramme de cas d'utilisation de l'application.

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF (Exercice 2) — no correction text/diagram for this exercise was extractable from the source PDF -->

</details>

## Exercice 3

Le directeur d'une chaîne de magasins de vente de bracelets de sécurité vous charge de créer un site web de son service de vente ("FeelSECURE.com"). Afin de mieux cerner les besoins de cette entreprise, vous avez interrogé le directeur et dégagé les points suivants :

La seule activité de FeelSECURE.com est la vente de bracelets de sécurité au public sur Internet. Il existe différentes catégories de bracelets selon leur porteur ; des enfants, des personnes âgées, des adultes allant dans des milieux malfamés, etc.

Un visiteur du site de vente en ligne ne peut acheter qu'après inscription et authentification via un e-mail et un mot de passe d'au moins huit caractères. Lors de l'inscription, il est demandé de préciser les informations suivantes : état civil, adresse (celle qui sera utilisée pour la facturation des bracelets achetés) et numéro de carte de fidélité des magasins FeelSECURE (s'il y en a).

Pour chaque bracelet du catalogue, un visiteur peut visualiser le modèle du bracelet et les avis d'autres acheteurs. Il peut également savoir si c'est une édition spéciale du bracelet (un bracelet Sumsung par exemple). Le numéro de code à barres d'un bracelet est différent selon l'édition. Le prix d'un bracelet dépend de la date depuis laquelle il est sorti. En général, à sa sortie, son prix est modéré, puis quelques semaines plus tard, le prix est rehaussé selon le taux de vente.

Lors d'une visite sur le site, un client peut créer un nouveau "panier" dans lequel il met le ou les bracelets qu'il veut acheter ainsi que le nombre d'exemplaires qu'il souhaite acheter. Ce panier est modifiable tant que le paiement de celui-ci n'est pas validé et confirmé. Le paiement s'effectue par un intermédiaire spécialisé qui se charge de prélever le coût de la commande aux clients, de confirmer à FeelSECURE.com que la commande a bien été payée et d'éditer un numéro unique de paiement.

Une facture est alors établie, chaque facture a un numéro (unique mais les numéros ne se suivent pas forcément), les coordonnées du client, une adresse de facturation, une adresse de livraison et la liste des bracelets achetés. Des frais de livraison sont facturés aux clients.

Une commande peut avoir plusieurs états après sa validation : "en attente de réapprovisionnement" lorsqu'un (plusieurs) bracelet(s) n'est (sont) pas en stock, "en cours de traitement" lorsque la commande est en cours de traitement, "en cours de livraison" lorsqu'elle est chez le transporteur, (le client peut alors consulter le numéro du colis postal correspondant) puis finalement "livrée" lorsque le transporteur a confirmé que le colis a bien été livré.

Tous les utilisateurs de l'application FeelSECURE.com sont gérés (ajoutés, modifiés et supprimés) par l'administrateur.

<details>
<summary>Correction</summary>

**Identification des acteurs**

| Acteur | Type | Justification |
| --- | --- | --- |
| Visiteur | Primaire/principal | Entité externe qui interagit directement avec le système et utilise ses services |
| Client | Primaire/principal | Entité externe qui interagit directement avec le système et utilise ses services |
| Transporteur | Primaire/principal | Entité externe qui interagit directement avec le système et utilise ses services |
| Administrateur | Primaire/principal | Entité externe qui interagit directement avec le système et utilise ses services |
| Intermédiaire spécialisé | Secondaire | Entité externe qui interagit directement avec le système et aide le système à réaliser un de ses services (contribue à la réalisation d'un service) |

**Besoins fonctionnels par acteur**

| Acteur(s) | Besoin(s) Fonctionnel(s) |
| --- | --- |
| Visiteur | – Consulter le modèle du bracelet<br />– Consulter les avis d'autres acheteurs |
| Client | – S'inscrire<br />– Acheter un (des) bracelet(s)<br />– Créer un nouveau panier<br />– Modifier un panier<br />– Payer<br />– Consulter le numéro du colis postal correspondant à sa commande |
| Transporteur | Confirmer que le colis a bien été livré |
| Administrateur | Gérer (ajouter, modifier et supprimer) les comptes d'utilisateurs |

Cas d'utilisation identifiés : Consulter les modèles des bracelets, Consulter les avis d'autres acheteurs, S'inscrire, Acheter un (des) bracelet(s) (`<<include>>` S'inscrire, `<<extend>>` Créer un nouveau panier / Modifier un panier), Payer, Créer un nouveau panier, Consulter le numéro du colis postal correspondant à sa commande, Confirmer que le colis a bien été livré, Gérer les comptes d'utilisateurs.

<!-- TODO: unclear in source, verify against original PDF (Exercice 3) — the diagramme de cas d'utilisation itself is an image; some OCR fragments around it ("시사", "옷", "OK") are visual/layout artifacts of the diagram image, not real text, and are omitted here rather than guessed -->

</details>

## Exercice 4

Nous nous intéressons dans cet exercice à la modélisation du Système d'Information (SI) d'un libraire grâce aux diagrammes de cas d'utilisation. Celui-ci inclut les sous-systèmes de gestion de stock, de facturation et de gestion de commandes.

Le libraire Ali a une boutique sur Tunis. Il vend des articles, de natures différentes, qui possèdent chacun un code barre : des livres, des articles de papeterie et des journaux. Les livres sont caractérisés par un titre, un numéro ISBN, un prix HT, un nom d'auteur, un éditeur, un nombre de pages. Les articles de papeterie sont caractérisés par un libellé et un prix HT. Les journaux sont caractérisés par un titre, une date de parution, un nombre de pages et un prix HT.

Chaque fois qu'un client choisit un article et passe en caisse, le libraire fait lire le code barre à un lecteur optique qui va lire sa référence dans la base de données articles. Le système de gestion de stock de la boutique enregistre alors l'achat et décrémente le stock lié à l'article. Le libraire édite une facture qui est émise à partir du système de facturation de la boutique. Cette facture indique : la date de l'achat, le montant TTC et la TVA.

Si un client arrive dans la boutique et qu'il n'y a plus ou pas l'article demandé, le client peut commander l'article auprès du libraire en indiquant la quantité souhaitée. Le libraire enregistre la commande dans le système de gestion des commandes. Le client a alors le choix :

- Soit payer dès l'initialisation de la commande, la facture est alors éditée avec la mention «en commande». Quand le libraire est approvisionné, il appelle le client ou il lui envoie un mail. Le client vient alors chercher le(s) article(s). Le libraire saisit l'information que les articles commandés ont été approvisionnés. Il édite alors un bon de livraison avec la mention « payée » et le numéro de la facture.
- Soit payer quand le libraire reçoit les articles. Le libraire édite la facture avec la mention «payée».

Dans les deux cas, une commande donne lieu à une seule facture. Pour l'édition de la facture, le client donne son nom, son prénom, son adresse, son mail et son numéro de téléphone. Le libraire saisit ces informations dans le système informatique et l'enregistre dans la base de données clients.

A la fin de la journée, le libraire demande au système de gestion du stock de lancer un « état du stock ». Le système de gestion du stock vérifie alors les articles dont la quantité est inférieure au niveau de stock prévu par article. Si la quantité est inférieure au niveau de stock prévu par article, le libraire peut lancer une commande auprès du fournisseur. Si le fournisseur ne livre pas dans les 3 jours, le libraire relance par mail le fournisseur. Les informations fournisseurs se trouvent dans une base de données fournisseurs. Chaque article est fourni par un seul fournisseur, et pour chaque type d'article (livre, article de papeterie…), un stock minimum est prévu.

**Travail à faire :**

1. Identifiez le(s) acteur(s) du Système d'Information (SI) du libraire. Précisez à chaque fois le type de l'acteur (principal ou secondaire) en justifiant votre réponse.
2. Représentez le diagramme de cas d'utilisation du système en question.

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF (Exercice 4) — no correction text/diagram for this exercise was extractable from the source PDF -->

</details>

## Exercice 5

Le département d'informatique d'une université se propose de développer une application de gestion des cours en ligne 'gestion_cours_en_ligne' qui peut être utilisée sur le web.

Dans cette application, la gestion des cours et des inscriptions est à la charge d'un administrateur. Ainsi, cet administrateur est donc en mesure d'enregistrer des cours, de supprimer un cours, d'inscrire un enseignant (resp. un étudiant) dans un cours et de retirer un enseignant (resp. un étudiant) d'un cours. Lors de l'inscription d'un enseignant ou d'un étudiant un login et un mot de passe seront automatiquement générés et envoyés par e-mails au concerné. Les enseignants et les étudiants inscrits, peuvent ainsi se connecter à l'application avec ces données. Pour avoir plus de sécurité de l'application, les enseignants et les étudiants pourront modifier leurs mots de passes.

Quand l'administrateur inscrit un étudiant, il doit absolument l'inscrire à au moins un cours pour que l'inscription soit valide. Quand l'administrateur supprime un cours, il doit aussi retirer tous les étudiants de ce cours.

Un enseignant peut entrer des documents, présenter des exercices à rendre avant une date donnée et attribuer des notes aux travaux effectués par les étudiants. Si la date limite de remise des travaux a été dépassée et il y a des étudiants qui n'ont pas encore rendu leurs travaux, ces travaux porteront la mention « travail non rendu» et un e-mail sera envoyé automatiquement aux étudiants concernés.

Un enseignant peut aussi préparer des tests électroniques qui contiennent une série de questions sous forme de QCM (Question à Choix Multiples). L'enseignant doit, d'une part, préciser une période (journée et horaire) que les étudiants doivent respecter pour faire le test et, d'autre part, doit indiquer pour chaque question du test électronique, la réponse correcte qui servira pour l'évaluation automatique. On suppose que tous les étudiants inscrits au cours de l'enseignant qui a déposé le test seront informés par mail de la période du test. Pour faire tout ceci, l'enseignant doit s'identifier en précisant son login et son mot de passe.

Les étudiants de leur part, peuvent consulter les documents et leurs notes, déposer leurs travaux et passer des tests. Ils doivent bien sûr s'identifier pour participer à chacune de ces activités.

Une fois sur la page du test, l'étudiant pourra choisir de démarrer ou de quitter le test. Le démarrage ne peut se faire que si l'étudiant respecte la période horaire précisée par l'enseignant. Si l'étudiant quitte le test avant qu'il ne termine la réponse à toutes les questions, un e-mail sera envoyé automatiquement à l'enseignant (précisant le nom de l'étudiant et les questions auxquelles il a répondu). Si l'étudiant reprend le test avant l'écoulement d'une heure, il aura une autre chance de le terminer, sinon, le test ne sera plus disponible pour l'étudiant en question. Afin d'avoir une gestion commune du temps par tous les utilisateurs de l'application, on suppose que l'application gère de manière interne une horloge. Si l'étudiant complète le test de manière normale, en répondant à toutes les questions, le test sera automatiquement corrigé et les notes seront automatiquement entrées dans la base de données. Dans le cas contraire, le test sera corrigé manuellement par l'enseignant. Lorsque l'étudiant choisi de quitter, l'étudiant sera systématiquement déconnecté de l'application.

**Travail à faire :**

- Identifiez parmi cette liste de noms, les acteurs de l'application 'gestion_cours_en_ligne'. Il s'agit d'encercler l'acteur, de préciser son type, et de donner une justification dans le cas où le nom n'est pas retenu comme acteur : Administrateur, Horloge, email, Cours, test, Informaticien, L'application 'gestion_cours_en_ligne', Enseignant, Web, Etudiant.
- Considérons « Inscrire étudiant », « Déposer un document », « S'identifier » et « Passer un test » comme quatre cas d'utilisation de l'application 'gestion_cours_en_ligne'. Complétez le diagramme de cas d'utilisation. Il s'agit de :
  a. Rajouter quatre autres cas d'utilisation au choix parmi les éléments que vous jugez les plus pertinents de cette liste (attribuer notes, retirer étudiant, définir login et mot de passe, supprimer cours, entrer document, préciser une période, respecter date, indiquer réponse correcte, déposer travail, quitter test, reprendre test, écouler temps, gérer horloge, répondre à une question).
  b. Représenter les acteurs retenus dans la question 1 et de les relier aux cas.
  c. Relier, en cas de besoin, les cas par des liens 'include' et/ou des liens 'extend'.
- Concernant le cas d'utilisation « Passer un test » :
  a. Proposez une pré-condition à ce cas.
  b. Proposez une post-condition à ce cas.
  c. Précisez les acteurs principaux de ce cas.
  d. Imaginez deux variantes de scénarios relatifs à ce cas (un scénario nominal et un scénario alternatif). Donnez, en langage naturel, une description pour chaque scénario.

<details>
<summary>Correction</summary>

**Identification des acteurs**

| Nom | Type | Justification |
| --- | --- | --- |
| Administrateur | Principal | — |
| Horloge | (non retenu) | Ne renferme aucun rôle et ne participe à aucun service |
| email | (non retenu) | Ne renferme aucun rôle et ne participe à aucun service |
| Cours | (non retenu) | Ne renferme aucun rôle et ne participe à aucun service |
| test | (non retenu) | Ne renferme aucun rôle et ne participe à aucun service |
| Informaticien | (non retenu) | Ne renferme aucun rôle et ne participe à aucun service |
| L'application 'gestion_cours_en_ligne' | (non retenu) | C'est le système lui-même |
| Enseignant | Principal | — |
| Web | (non retenu) | Ne renferme aucun rôle et ne participe à aucun service |
| Etudiant | Principal | — |

**Cas d'utilisation à rajouter (question 2.a)** : attribuer notes, retirer étudiant, supprimer cours, déposer travail.

**Cas d'utilisation « Passer un test »**

a. Proposez une pré-condition à ce cas : l'application n'est ni en panne ni en maintenance / le test est disponible sur le site / la date correspond à la période où le test est disponible.

b. Proposez une post-condition à ce cas : l'étudiant n'est plus sur la page du test / le test n'est plus disponible pour cet étudiant et sa note est disponible dans la base de données.

c. Précisez les acteurs principaux de ce cas : Etudiant.

d. Scénarios :

- **Scénario Nominal** : Identification réussit dès la première fois et le test est passé sans interruption.
- **Scénario Alternatif** : L'étudiant quitte le test avant de terminer la réponse à toutes les questions ; il reprend le test avant l'écoulement d'une heure.
- **Scénario Exceptionnel** : Un problème informatique arrête sommairement le test (ex : crash système) qui dure plus qu'une heure.

Description détaillée :

1. L'étudiant est sur la page Internet contenant le test.
2. L'étudiant s'identifie.
   - (A) L'étudiant échoue l'identification. L'étudiant saisit le login correct. Même suite du cas.
3. Les consignes du test s'affichent.
4. L'étudiant choisit de démarrer le test.
5. L'étudiant remplit le questionnaire.
   - (A) L'étudiant quitte le test avant de terminer la réponse à toutes les questions. Il est retourné à la page principale. Un email est envoyé à l'enseignant. L'étudiant reprend le test avant l'écoulement d'une heure. Terminaison normale du déroulement.
   - (B) L'étudiant choisit d'arrêter le test et de le reprendre ultérieurement. Un e-mail est envoyé au professeur. Après une heure, le test n'est plus disponible à l'étudiant. Le test est corrigé manuellement par l'enseignant.
   - (E) Le test n'est plus disponible à cause d'un problème informatique (qui dure plus qu'une heure). L'étudiant est amené sur une page qui lui explique le problème.
6. Après la dernière question, un message de confirmation s'affiche.
7. L'étudiant quitte la page de test.
8. Le test est corrigé (automatiquement).
9. Le résultat de l'étudiant est envoyé dans la base de données.
10. Le test n'est plus disponible pour l'étudiant.

<!-- TODO: unclear in source, verify against original PDF (Exercice 5) — the corresponding diagramme de cas d'utilisation is an image not extracted as text/shapes -->

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/acoo-correction-td1-use-case.pdf" />

</TabItem>
</Tabs>
