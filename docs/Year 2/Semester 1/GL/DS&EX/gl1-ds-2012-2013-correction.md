---
sidebar_position: 5
title: Devoir Surveillé 1 2012/2013 (Corrigé)
sidebar_label: DS1 2012/2013 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Devoir Surveillé — Génie Logiciel (Corrigé)

*Université de la Manouba — ENSI — Niveau : II2 — Date : Mercredi 28 Novembre 2012 — Durée : 2H — Documents non autorisés — Barème probable : 9 – 8 – 3 — Enseignantes : H. Ben Ghzala, N. Ben Yahia, H. Benali, S. Zbidi*

*Répondez directement sur les feuilles de réponses. La précision, la consistance et la clarté seront appréciées.*

<!-- TODO: unclear in source, verify against original PDF — cette feuille de réponses laisse les justifications manuscrites vierges dans l'extraction du texte source pour la Partie 1 ; les réponses (choix des lettres) n'y sont pas non plus marquées, contrairement à d'autres DS de ce module. -->

## Partie 1 : Questions de réflexion (9pts)

*Choisir LA (ou les) bonne(s) réponse(s) tout en la justifiant (toute réponse non justifiée ne sera pas notée). Chaque question sur 1pt (0,25 choix + 0,75 justification). Réponse sans justification → 0pt.*

**1.** Lequel(s) de ces besoins ne doit (doivent) pas figurer dans un cahier des charges ?

A) Le logiciel devra enregistrer la vente
B) Le logiciel devra enregistrer la vente dans une base de données
C) Le logiciel devra envoyer une commande SQL « insert » pour enregistrer la vente

**2.** Une fois le logiciel est implémenté et qu'il fonctionne, le travail de l'ingénieur est terminé.

A) Vrai&nbsp;&nbsp;&nbsp;B) Faux

**3.** Tant qu'un logiciel ne fonctionne pas, il n'y a pas moyen d'en mesurer la qualité.

A) Vrai&nbsp;&nbsp;&nbsp;B) Faux

**4.** Le succès d'un projet tient essentiellement de la livraison d'un programme fonctionnel.

A) Vrai&nbsp;&nbsp;&nbsp;B) Faux

**5.** Lequel(s) de ces modèles permettra difficilement la gestion des changements en cours de projet ?

A) SCRUM&nbsp;&nbsp;&nbsp;B) Cascade&nbsp;&nbsp;&nbsp;C) En V&nbsp;&nbsp;&nbsp;D) Incrémental

**6.** La phase d'analyse des besoins a une importance primordiale et peut causer l'échec du projet, d'autant plus dans le modèle :

A) En spirale&nbsp;&nbsp;&nbsp;B) En V&nbsp;&nbsp;&nbsp;C) RAD&nbsp;&nbsp;&nbsp;D) Cascade

**7.** Le DFD1 représente le premier niveau d'abstraction d'un problème.

A) Vrai&nbsp;&nbsp;&nbsp;B) Faux

**8.** Dans le cadre d'un projet de développement, le client demande un système composé d'un ensemble de fonctions dont une partie seulement est vue comme étant « claire ». Afin de répondre positivement au client, quel est le modèle de processus le plus adéquat que le chef d'équipe de développement doit choisir pour ce projet ?

A) En spirale&nbsp;&nbsp;&nbsp;B) En V&nbsp;&nbsp;&nbsp;C) Prototypage&nbsp;&nbsp;&nbsp;D) Incrémental

**9.** À cause de l'ambiguïté de ses besoins, le client exige l'acceptation des modifications à n'importe quel moment du développement. Afin de répondre positivement au client, quel est le modèle de processus le plus adéquat que le chef d'équipe de développement doit choisir pour ce projet ?

A) Cascade&nbsp;&nbsp;&nbsp;B) SCRUM&nbsp;&nbsp;&nbsp;C) RAD&nbsp;&nbsp;&nbsp;D) Prototypage

## Partie 2 : Logiciel de Reporting d'Activité et de Frais (RAF) (8pts)

La société JeConseille, spécialisée dans le conseil et l'audit auprès de petites et grandes entreprises, souhaite automatiser son système de reporting d'activité et de frais. Elle désire que son nouveau système soit accessible par tous ses employés lors de leurs missions. Des hauts niveaux de performance sont exigés : plusieurs connexions simultanées et les temps de réponse pour chaque écran doivent être minimaux. Le fonctionnement actuel du système repose sur la saisie dans un tableur, par les employés, de rapports prévisionnels d'activité et de frais mensuels. Ces rapports contiennent le nombre de jours travaillés prévisionnels dans le mois, la répartition par projet (nombre de jours/par projet), le trajet prévisionnel réalisé durant le mois (km) et un cumul des frais (DT) prévisionnel dépensé durant le mois. Ces rapports prévisionnels sont envoyés à la secrétaire de la division en début de mois par messagerie. La secrétaire relance via la messagerie les employés n'ayant pas fourni leurs rapports.

La secrétaire effectue par la suite une consolidation par division de tous les rapports prévisionnels afin d'obtenir une synthèse des activités, des frais par projet et le taux d'activité de la division. Cette synthèse est consultée par le manager de la division tous les mois. Une modification de l'activité ou des frais d'un employé fait l'objet d'une modification du rapport enregistré et d'un nouvel envoi de mail à la secrétaire.

En fin de mois, la secrétaire reporte manuellement les informations nécessaires sur les activités et les frais des employés dans le système de facturation de l'entreprise.

**1.** Identifier les acteurs de « RAF ». (2pts = 0,5×4)

<details>
<summary>Correction</summary>

- Employé
- Secrétaire
- Manager
- Système de facturation de l'entreprise

</details>

**2.** Sélectionner les besoins du système « RAF » : (6pts)

a. En associant à chaque type de besoin une ou plusieurs des 4 propositions suivantes : BF (besoin fonctionnel), BNF (besoin non fonctionnel), MAL (besoin mal exprimé donc non vérifiable), Aucun (besoin inadéquat — ce n'est ni un besoin fonctionnel, ni un besoin non fonctionnel), en justifiant votre choix.
b. En reformulant tout besoin mal exprimé afin de le rendre vérifiable.

<details>
<summary>Correction</summary>

| Besoin du système RAF | Retenu | Type |
|---|---|---|
| Le logiciel permettra l'envoi de mails à la secrétaire | Oui | BF |
| La secrétaire effectuera une consolidation par division de tous les rapports prévisionnels | Oui | BF |
| Le logiciel assurera plusieurs connexions simultanées | Oui | BNF, MAL |
| Le logiciel permettra aux employés la saisie de rapports prévisionnels d'activité et de frais mensuels dans un tableur | Oui | BF |
| Les temps de réponse pour chaque écran devront être minimaux | Oui | BNF, MAL |
| Des requêtes SQL devront être définies pour permettre l'enregistrement des données sur les employés | Non | Aucun |

Pour les besoins marqués MAL, il faut proposer une unité de mesure pour les rendre vérifiables (ex : nombre de connexions simultanées supportées, temps de réponse maximal en secondes).

</details>

## Partie 3 : un système électronique de gestion et de facturation des abonnements (3pts)

La compagnie « POUR LE SAVOIR » permet à des universitaires de s'abonner à une variété de revues hebdomadaires et mensuelles. Cette compagnie désire mettre à la disposition de ses abonnés (clients) un système électronique de gestion et de facturation de leurs abonnements. Voici une brève description des exigences de ce système :

« … à tout moment, le client qui se connecte (via un identifiant et un mot de passe) au système peut choisir entre renouveler un abonnement, ajouter un nouvel abonnement, modifier son adresse, ou encore annuler un abonnement existant. Pour ajouter un nouvel abonnement, le client doit choisir le type de l'abonnement et remplir un formulaire en tapant les informations nécessaires. Pour payer ces abonnements, le service de facturation se charge d'envoyer les factures aux universités auxquelles appartiennent les clients… »

**1.** Proposer un diagramme de contexte pour le système décrit ci-dessus. (1pt)

**2.** Proposer un DFD-1 pour ce système. (2pts)

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF pages — diagrammes attendus (diagramme de contexte, DFD-1) non reproductibles depuis le texte extrait (schémas/images). -->

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/gl1-ds-2012-2013-correction.pdf" />

</TabItem>
</Tabs>
