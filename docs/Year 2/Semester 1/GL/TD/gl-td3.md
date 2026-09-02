---
sidebar_position: 3
title: "TD3 : Analyse des besoins (avec corrigé)"
sidebar_label: TD3 - Analyse des besoins
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD3 : Analyse des besoins

*ENSI — Matière : Génie Logiciel — Classes : II.2 — A-U : 2023-2024*

## Étude de cas 1

On souhaite concevoir et mettre en œuvre une plateforme associative qui permet de promouvoir et d'encourager l'esprit du bénévolat entre ses acteurs. La plateforme permet aux associations de publier et gérer leurs missions. Les bénévoles peuvent consulter la liste des associations et leurs missions. Quand un bénévole souhaite participer à une mission, il doit informer l'association concernée en lui envoyant un émail de demande de participation (cela n'est pas géré par la plateforme associative). Les entreprises peuvent également utiliser la plateforme pour consulter la liste des associations et faire des dons au profit des associations qu'elles choisissent.

**Travail à faire**

**1.** Identifiez parmi la liste suivante les acteurs de la plateforme associative : Association, Mission, Bénévole, Entreprise, Don.

<details>
<summary>Correction</summary>

| Nom | Acteur ? | Justification |
|---|---|---|
| Association | Oui | Entité externe qui interagit directement avec le système et utilise ses services |
| Mission | Non | Simple donnée gérée au niveau de la plateforme |
| Bénévole | Oui | Entité externe qui interagit directement avec le système et utilise ses services |
| Entreprise | Oui | Entité externe qui interagit directement avec le système et utilise ses services |
| Don | Non | Simple donnée gérée au niveau de la plateforme |

</details>

**2.** En considérant le tableau suivant, associez à chaque type de besoin une ou plusieurs des propositions suivantes (Oui/Non ; BF ; BNF ; But) :

| Besoins de la plateforme associative |
|---|
| La plateforme doit être développée de manière à être utilisable par des utilisateurs inexpérimentés après une formation de moins d'une heure. |
| La plateforme doit être capable de gérer les missions. |
| Le système doit être ergonomique. |
| Le système doit répondre dans un délai de 2 secondes. |
| Le système permet la gestion des dons des entreprises. |

<details>
<summary>Correction</summary>

| Besoin | Oui | Non | BF | BNF | But |
|---|---|---|---|---|---|
| La plateforme doit être développée de manière à être utilisable par des utilisateurs inexpérimentés après une formation de moins d'une heure. | X | | | X | |
| La plateforme doit être capable de gérer les missions. | X | | X | | |
| Le système doit être ergonomique. | X | | | | X |
| Le système doit répondre dans un délai de 2 secondes. | X | | | X | |
| Le système permet la gestion des dons des entreprises. | X | | X | | |

</details>

**3.** Identifiez les besoins fonctionnels par acteur.

<details>
<summary>Correction</summary>

| Acteur(s) | Besoin(s) fonctionnel(s) |
|---|---|
| Association | Publier les missions de l'association ; gérer les missions de l'association |
| Bénévole | Consulter la liste des associations et leurs missions |
| Entreprise | Consulter la liste des associations ; faire des dons au profit des associations qu'elle choisit |

</details>

**4.** Donnez deux besoins non fonctionnels.

<details>
<summary>Correction</summary>

- La plateforme doit être développée de manière à être utilisable par des utilisateurs inexpérimentés après une formation de moins d'une heure.
- Le système doit répondre dans un délai de 2 secondes.
- Etc.

</details>

## Étude de cas 2 : Logiciel de Reporting d'Activité et de Frais (RAF)

La société JeConseille, spécialisée dans le conseil et l'audit auprès de petites et grandes entreprises, souhaite automatiser son système de reporting d'activité et de frais. Elle désire que son nouveau système soit accessible par tous ses employés lors de leurs missions. Des hauts niveaux de performance sont exigés : plusieurs connexions simultanées et les temps de réponse pour chaque écran doivent être minimaux.

Le fonctionnement actuel du système repose sur la saisie dans un tableur, par les employés, de rapports prévisionnels d'activité et de frais mensuels. Ces rapports contiennent le nombre de jours travaillés prévisionnels dans le mois, la répartition par projet (nombre de jours/par projet), le trajet prévisionnel réalisé durant le mois (km) et un cumul des frais (DT) prévisionnel dépensé durant le mois. Ces rapports prévisionnels sont envoyés à la secrétaire de la division en début de mois par messagerie. La secrétaire relance via la messagerie les employés n'ayant pas fourni leurs rapports.

La secrétaire effectue par la suite une consolidation par division de tous les rapports prévisionnels afin d'obtenir une synthèse des activités, des frais par projet et le taux d'activité de la division. Cette synthèse est consultée par le manager de la division tous les mois. Une modification de l'activité ou des frais d'un employé fait l'objet d'une modification du rapport enregistré et d'un nouvel envoi de mail à la secrétaire.

En fin de mois, la secrétaire reporte manuellement les informations nécessaires sur les activités et les frais des employés dans le système de facturation de l'entreprise.

**1.** Identifier les acteurs de « RAF ».

<details>
<summary>Correction</summary>

- Employé
- Secrétaire
- Manager
- Système de facturation de l'entreprise

</details>

**2.** Sélectionner les besoins du système « RAF » :

a. En associant à chaque type de besoin une ou plusieurs des 4 propositions suivantes : BF (besoin fonctionnel) ; BNF (besoin non fonctionnel) ; MAL (besoin mal exprimé donc non vérifiable) ; Aucun (besoin inadéquat — ce n'est ni un besoin fonctionnel, ni un besoin non fonctionnel). (Justifier votre choix.)
b. En reformulant tout besoin mal exprimé afin de le rendre vérifiable.

| Besoins du système RAF |
|---|
| Le logiciel permettra l'envoi de mails à la secrétaire |
| La secrétaire effectuera une consolidation par division de tous les rapports prévisionnels |
| Le logiciel assurera plusieurs connexions simultanées |
| Le logiciel permettra aux employés la saisie de rapports prévisionnels d'activité et de frais mensuels dans un tableur |
| Les temps de réponse pour chaque écran devront être minimaux |
| Des requêtes SQL devront être définies pour permettre l'enregistrement des données sur les employés |

<details>
<summary>Correction</summary>

| Besoin | Oui | Non | BF | BNF | MAL | Aucun |
|---|---|---|---|---|---|---|
| Le logiciel permettra l'envoi de mails à la secrétaire | X | | X | | | |
| La secrétaire effectuera une consolidation par division de tous les rapports prévisionnels | | X | | | | X |
| Le logiciel assurera plusieurs connexions simultanées | X | | | X | X | (il faut proposer une unité de mesure pour le rendre vérifiable) |
| Le logiciel permettra aux employés la saisie de rapports prévisionnels d'activité et de frais mensuels dans un tableur | X | | X | | | |
| Les temps de réponse pour chaque écran devront être minimaux | X | | | X | X | (il faut proposer une unité de mesure pour le rendre vérifiable) |
| Des requêtes SQL devront être définies pour permettre l'enregistrement des données sur les employés | | X | | | | X |

</details>

## Étude de cas 3

Des élèves ingénieurs de l'ENSI passionnés de lecture ont décidé de concevoir et développer, à l'instar des applications Airbnb et Uber, une application de vente en ligne de livres selon le modèle d'affaire biface (biface business model), qu'ils ont baptisée « bookish » (une personne qui prend du plaisir à lire des livres). Le but étant de servir deux clientèles différentes : les propriétaires de livres et les passionnés de lecture. Les propriétaires de livres peuvent eux-mêmes être des passionnés de lecture et vice versa.

Un propriétaire de livre peut être n'importe quelle personne morale ou physique possédant des livres qu'elle veut mettre en vente (une librairie spécialisée dans la vente de livres, une librairie ordinaire possédant des livres à vendre, une bibliothèque voulant mettre en vente certains exemplaires rares de ces livres, une personne possédant des livres qu'elle veut vendre à des prix intéressants, etc.). Un passionné de lecture est toute personne morale ou physique intéressée par l'achat et la collection de livres.

Chaque personne voulant bénéficier des services de l'application doit s'enregistrer à l'application et remplir les informations nécessaires dans son profil, entre autres ses coordonnées bancaires pour pouvoir valider son profil. Une personne désirant vendre des livres sur l'application doit obligatoirement fournir des coordonnées bancaires valides, pour pouvoir insérer des photos attestant du bon état du livre à vendre, ainsi qu'une description complète de ce dernier (titre, auteur, catégorie, nombre de pages, résumé, état, prix et année d'achat et prix de vente).

La personne désirant acheter des livres peut faire une recherche simple ou multicritères, faire le filtrage des résultats par prix croissant par exemple ou par état des livres trouvés. Lorsqu'elle trouve le bon livre, elle pourra le commander. Le livre ne sera alors plus disponible et n'apparaîtra plus dans les résultats des recherches des prochains clients. Une commande sera alors créée avec numéro unique communiqué au propriétaire du livre afin qu'il prépare la commande. Le livre doit être fourni avec un emballage correct et solide afin qu'il soit protégé pendant son acheminement du propriétaire vers la personne qui l'a commandé. Le numéro de la commande doit être renseigné sur l'emballage.

L'application permet aux acheteurs de livres de noter les propriétaires selon leur fiabilité par rapport à la description de l'état du livre, la qualité de l'emballage fourni lors de l'envoi de la commande. Cela leur permettra d'obtenir des badges de meilleurs clients qui leur permettront de gagner en notoriété sur l'application et d'apparaître souvent dans les recommandations et les résultats de recherche.

L'application offre deux modes de paiement : paiement électronique par carte bancaire ou paiement à la réception de la commande. Une société tierce assure la livraison des commandes de bout en bout : de chez les propriétaires aux clients selon leurs préférences. Un livreur contactera alors en premier lieu le propriétaire pour récupérer le livre commandé avec un RDV selon sa disponibilité. Une fois la commande récupérée, il contactera l'acheteur pour convenir d'un RDV pour la livraison. Les livreurs ont un accès limité à l'application juste pour valider chaque étape pour attester et notifier du bon déroulement de la livraison.

Une fois la livraison assurée, une notification est envoyée au propriétaire pour l'informer du bon déroulement du processus et une somme de 80% du prix de vente est versée dans son compte bancaire au bout de trois jours. L'acheteur peut se désister et annuler la commande à tout moment avant la livraison, le livre sera alors de nouveau disponible. Il peut également faire un retour de livres s'il n'a pas été satisfait de leur état (pages manquantes, déchirées, couverture manquante, pages annotées au stylo, etc.). Il doit alors déposer une réclamation sur le site et demander un remboursement. La société de livraison sera alors contrainte de faire l'acheminement du livre dans le sens inverse. Si le livre est perdu ou détérioré en cours de route, le propriétaire touchera toujours les 80% du prix de vente.

Tous les clients de l'application peuvent également écrire des avis sur les livres qu'ils ont lus. Ils peuvent également déposer des messages publics pour demander un certain livre s'ils n'ont pas réussi à le trouver parmi les livres proposés sur l'application. L'application utilise également des algorithmes de l'intelligence artificielle qui permettent de fournir des recommandations de livres aux différents profils de clients en prenant en compte leurs préférences. L'application fournit des interfaces intuitives en plusieurs langues (Français, Arabe, Anglais et dialecte tunisien) pour répondre aux différents profils de ses clients.

**Travail à faire**

**1.** Identifier les acteurs de l'application « bookish » tout en les classifiant en acteur principal et acteur secondaire. Chaque choix doit être justifié.

<details>
<summary>Correction</summary>

- **Acteurs principaux** : Acheteur, Vendeur, Livreur.
- **Acteur secondaire** : Système bancaire.

</details>

**2.** Déterminer les besoins fonctionnels par acteur.

<details>
<summary>Correction</summary>

| Acteur | Besoin(s) fonctionnel(s) |
|---|---|
| Acheteur | S'enregistrer à l'application ; remplir les informations nécessaires dans son profil ; faire une recherche simple ou multicritères ; faire le filtrage des résultats ; commander un livre ; noter les propriétaires ; payer ; annuler la commande à tout moment avant la livraison ; déposer une réclamation sur le site ; demander un remboursement ; écrire des avis sur les livres qu'ils ont lus ; déposer des messages publics ; recevoir des recommandations de livres |
| Vendeur | S'enregistrer à l'application ; remplir les informations nécessaires dans son profil ; créer une commande ; recevoir une notification |
| Livreur | S'enregistrer à l'application ; remplir les informations nécessaires dans son profil ; valider chaque étape pour attester et notifier du bon déroulement de la livraison |

</details>

**3.** Donner deux besoins non fonctionnels pour ce système.

<details>
<summary>Correction</summary>

À proposer deux besoins avec unité de mesure, concernant par exemple :

- Ergonomie (interface intuitive en plusieurs langues)
- Sécurité (paiement)
- Utilisabilité
- Rapidité (recherche)
- etc.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/gl-corrige-td3.pdf" />

</TabItem>
</Tabs>
