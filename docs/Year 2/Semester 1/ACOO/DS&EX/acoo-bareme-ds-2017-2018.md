---
sidebar_position: 6
title: Barème détaillé — Éléments de réponses DS ACOO 2017/2018
sidebar_label: Barème DS 2017/2018
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Barème détaillé et éléments de réponses — DS ACOO 2017/2018

*Source : "Barème détaillé éléments de réponses - DS_ACOO 2017_2018 -.doc - Google Docs". Ce document reprend le corrigé détaillé et le barème par question du Devoir Surveillé ACOO du 16 novembre 2017 (Université de La Manouba — École Nationale des Sciences de l'Informatique, Classes : II2).*

*Ce contenu recouvre en grande partie le corrigé du DS 2017-2018 déjà transcrit dans [Devoir Surveillé ACOO (Corrigé)](./acoo-ds-corrige.md) — les deux documents source proviennent apparemment de la même correction, celui-ci étant présenté comme un barème détaillé question par question.*

## Questions de réflexion (5pts)

**1.** a. Quelles sont les différences entre composition et agrégation ? (0.5)

<details>
<summary>Correction</summary>

L'agrégation représente une relation d'inclusion structurelle ou comportementale d'un élément (agrégé) dans un ensemble (agrégat). La durée de vie des agrégés est indépendante de celle de l'agrégat. Il est possible de rattacher les agrégés à plus d'un agrégat. La composition représente la relation de contenance structurelle (appartenance totale). La durée de vie des composants est liée à celle du composite (si un objet composite est détruit, ses composants aussi).

</details>

**1.** b. Précisez le type de relation (agrégation ou composition) pour chacun des exemples suivants tout en justifiant votre réponse : classe `Pièce` et classe `Mur` (0.5), classe `Mur` et classe `Brique` (0.5), classe `Etre_Humain` et classe `Squelette` (0.5)

<details>
<summary>Correction</summary>

- **Pièce et Mur** : agrégation (un mur peut être commun à plusieurs pièces).
- **Mur et Brique** : composition (une brique n'appartient qu'à un mur).
- **Etre_Humain et Squelette** : composition (le squelette n'appartient qu'à un seul être humain).

</details>

**2.** À quoi correspond la notion de spécialisation/généralisation dans l'approche orientée objet ? (0.5) Dans quel(s) diagramme(s) UML apparaît cette notion ? (0.5 = 0.25×2)

<details>
<summary>Correction</summary>

La notion de généralisation/spécialisation correspond à la réutilisation d'un concept (ou classe) pour la spécification d'un nouveau concept (ou classe), soit par la spécialisation d'un concept plus général en plusieurs concepts plus spécifiques, soit par la généralisation de plusieurs concepts dans un concept plus général. Cette notion apparaît dans deux diagrammes UML : entre classes dans les diagrammes de classes, ou encore entre acteurs et entre cas d'utilisation dans les diagrammes de cas d'utilisation.

</details>

**3.** a. Une instance de la classe `Responsable` peut accéder au minimum et au maximum à combien d'instances de la classe `Type` ? Justifiez. (0.5)

<details>
<summary>Correction</summary>

Par héritage de la classe `Employé` (qui peut accéder à `0..*` instances de la classe `Type` : `Employé-Usine-Modèle-Moteur-Défaut-Type`), une instance de `Responsable` peut accéder au minimum à 0 et au maximum à `*` instances de la classe `Type`.

</details>

**3.** b. Une instance de la classe `Opérateur` peut accéder au minimum et au maximum à combien d'instances de la classe `Type` ? Justifiez. (0.5)

<details>
<summary>Correction</summary>

Par héritage de la classe `Employé` (qui peut accéder à `0..*` instances de la classe `Type` : `Employé-Usine-Modèle-Moteur-Défaut-Type`) et par accès indirect (`Opérateur-Défaut-Type` : min 0 et max 7), une instance de la classe `Opérateur` peut accéder au minimum à 0 et au maximum à `*` instances de la classe `Type`.

</details>

## Problème (15pts)

*Système « SISC » (suivi de patients en clinique) — voir énoncé complet dans [Devoir Surveillé ACOO (Corrigé) — DS 2017-2018](./acoo-ds-corrige.md).*

### Partie 1 : Expression des besoins (7pts)

**1.** Identifiez le(s) acteur(s) du système « SISC ». Précisez à chaque fois le type de l'acteur (principal ou secondaire) en justifiant votre réponse. (1.75)

<details>
<summary>Correction</summary>

- Personnel médical (médecin, infirmier, anesthésiste) → acteurs principaux
- Personnel administratif (réceptionniste, comptable, administrateur) → acteurs principaux
- Assureur → acteur secondaire

</details>

**2.** Complétez le diagramme de cas d'utilisation suivant. Il s'agit de représenter : a. les acteurs (de la question 1), b. les autres cas d'utilisation du logiciel en question, c. les relations entre acteurs-cas d'utilisation, entre acteurs-acteurs (si besoin) et les dépendances entre les cas d'utilisation (si besoin). (3.25)

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF — le barème détaillé de cette question (au-delà des points bruts déjà indiqués dans l'énoncé) n'a pas été récupéré par l'OCR ; le schéma corrigé n'est pas reproduit. -->

</details>

**3.** Concernant le cas d'utilisation « recevoir des patients », imaginez deux variantes de scénarii relatifs à ce cas (un scénario nominal et un scénario alternatif). Représentez chaque scénario par un diagramme de séquence système. (1pt = 0.5 + 0.5)

<details>
<summary>Correction</summary>

Diagramme d'objets modélisant la situation de l'énoncé attendu ici (soulignement des noms des objets, absence de cardinalités et d'héritage).

<!-- TODO: unclear in source, verify against original PDF — l'OCR de ce document fait apparaître un intitulé de question qui semble décalé/mélangé avec la question 2.c d'un autre exercice (« diagramme d'objets modélisant la situation... ») ; à vérifier contre le PDF original, le contenu précis attendu pour cette question n'est pas clairement séparable dans le texte extrait. -->

</details>

**4.** Proposez un diagramme d'activités qui illustre la dynamique du cas d'utilisation « éditer des factures ». (1pt)

<details>
<summary>Correction</summary>

Dans ce cas : il faut considérer que le comptable précise le mode de paiement et le type d'assurance détenu par le patient : 1. paiement comptant, 2. paiement par carte de crédit, 3. paiement par transmission à l'assurance du patient. Finalement et dans tous les cas, un reçu est remis au patient avec indication du mode de paiement.

</details>

### Partie 2 : Analyse structurelle (4,5pts)

**5.** Le diagramme de classes proposé par le développeur est incomplet. Ajoutez sur le diagramme de classes suivant les cardinalités et les associations manquantes. (2pts)

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF — le schéma corrigé (cardinalités et associations ajoutées) n'est pas reproduit ici. -->

</details>

**6.** Ajoutez les attributs et les méthodes correspondants à chaque classe. (2.5pts)

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF — le schéma corrigé (attributs et méthodes ajoutés) n'est pas reproduit ici. -->

</details>

### Partie 3 : Analyse dynamique (3,5pts)

**7.** On se propose de comprendre l'évolution de la classe `Facture`. En vous basant sur l'énoncé, donnez le diagramme d'états-transitions de cette classe. (2.5)

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF — le diagramme d'états-transitions corrigé (schéma) n'est pas reproduit ici. -->

</details>

**8.** En vous basant sur le diagramme de classes que vous avez proposé dans la question (5), construisez un diagramme de séquence (diagramme de séquences objet) décrivant l'émission de la facture pour le patient X, sachant qu'il va payer la totalité de la somme sans avoir recours à l'assureur. N'oubliez pas de préciser toutes les méthodes que vous devez ajouter au diagramme de classes proposé (on suppose que tous les messages échangés sont des messages synchrones). (1pt)

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF — le diagramme de séquence corrigé (schéma) n'est pas reproduit ici. -->

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/acoo-bareme-ds-2017-2018.pdf" />

</TabItem>
</Tabs>
