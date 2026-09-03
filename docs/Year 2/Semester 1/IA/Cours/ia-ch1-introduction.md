---
sidebar_position: 1
title: "Chapitre 1 : Introduction"
sidebar_label: Ch1 - Introduction
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 1 — Introduction

*Cours « Artificial Intelligence & Machine Learning » — ENSI — Amal Trifa*

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments) — best-effort reconstruction below, see task summary -->

## Plan chapitre 1

- Introduction Générale de l'IA
- Définition de l'intelligence
- Définition de l'IA
- Intelligence de la machine ?
- Historique et évolution
- Types d'IA
- Système d'IA ?
- Domaines d'application
- Intérêts de l'IA et recherches
- IA vs ML vs DL
- Introduction de ML
- Types d'apprentissage
- Applications

## Introduction générale de l'IA

### Définition de l'intelligence

- Capacité mentale générale qui implique la capacité de raisonner, de planifier, de résoudre des problèmes, de penser de manière abstraite, de comprendre les idées et le langage, et d'apprendre.
- Capacité de comprendre et de tirer profit de l'expérience.
- Capacité de percevoir, interpréter et réagir efficacement à l'environnement :
  - percevoir,
  - raisonner et déduire,
  - résoudre des problèmes,
  - apprendre et s'adapter,
  - faire preuve de bon sens,
  - recourir à l'analogie, se souvenir.

### Définitions de l'intelligence Artificielle

- « L'étude des facultés des mentales à l'aide des modèles de type calculatoires » (Charniak et McDermott, 1985)
- « Discipline étudiant la possibilité de faire exécuter par l'ordinateur des tâches pour lesquelles l'homme est aujourd'hui meilleur que la machine » (Rich et Knight, 1990)
- « L'automatisation des activités associées au raisonnement humain, telles que la décision, la résolution de problèmes, l'apprentissage, ... » (Bellman, 1978)
- « L'étude des mécanismes permettant à un agent de percevoir, raisonner, et agir » (Winston, 1992)
- « L'étude des entités ayant un comportement intelligent » (Nilsson, 1998)

### L'intelligence Artificielle en résumé

- Développement de systèmes informatiques et de programmes capables de réaliser des tâches qui nécessitent généralement une intelligence humaine.
- L'objectif principal de l'IA est de créer des machines et des logiciels qui peuvent simuler des processus cognitifs tels que : l'apprentissage, la résolution de problèmes, la prise de décision, la compréhension du langage naturel …

## Intelligence de la machine

### Le test de Turing

En 1950, Alan Turing a introduit un test pour vérifier si une machine peut penser comme un humain ou non.

Considérons que le joueur A est un ordinateur, le joueur B un humain et le joueur C un interrogateur. L'interrogateur sait que l'un d'entre eux est une machine, mais il doit l'identifier sur la base des questions et de leurs réponses.

L'ordinateur est autorisé à faire tout ce qui est en son pouvoir pour forcer l'interrogateur à une identification erronée.

Le test est considéré réussi si C n'arrive pas à trancher au niveau de la réponse.

:::note Examen de Turing : exemple simplifié
- Examinateur : Bonjour, je vais poser quelques questions à deux participants, A et B, mais je ne sais pas lequel est lequel. Participant A, quelle est votre couleur préférée ? Participant B, quelle est votre couleur préférée ?
- Participant A : Ma couleur préférée est le bleu.
- Participant B : J'aime le vert.
- Examinateur : Très bien, merci. Participant A, pouvez-vous me dire ce que vous aimez faire pendant votre temps libre ? Participant B, quelle est votre activité préférée pendant votre temps libre ?
- Participant A : J'aime lire des livres et faire du jardinage.
- Participant B : Mon passe-temps préféré est la peinture.
- Examinateur : Intéressant. Dernière question : Participant A, pouvez-vous me donner votre avis sur la politique actuelle ? Participant B, quel est votre point de vue sur la politique actuelle ?
- Participant A : Je pense que le gouvernement devrait investir davantage dans l'éducation.
- Participant B : Je suis préoccupé par les questions environnementales et le changement climatique.
- Examinateur : Merci à vous deux. Maintenant, laissez-moi deviner...
:::

### ELIZA (Joseph Weizenbaum, 1960)

Ce système agit comme un psychanalyste en entretenant un dialogue avec une personne.

Le médecin (Eliza) pose des questions, alors l'homme répond et le médecin utilise la réponse pour poser une autre question.

La génération d'une réponse/question est en anglais, sur la base d'un groupe de patterns. Si la phrase de l'utilisateur correspond à un pattern, ce pattern est utilisé pour générer la phrase/question suivante.

Exemple de règles :

```
(?* ?x) hello (?* ?y) →
  (How do you do. Please state your problem.)

(?* ?x) I want (?* ?y) →
  (What would it mean if you got ?y)
  (Why do you want ?y)
  (Suppose you got ?y soon)

(?* ?x) if (?* ?y) →
  (Do you really think its likely that ?y)
  (Do you wish that ?y)
  (What do you think about ?y)
  (Really-- if ?y)

(?* ?x) no (?* ?y) →
  (Why not?)
  (You are being a bit negative)
  (Are you saying "NO" just to be negative?)

(?* ?x) I was (?* ?y) →
  (Were you really?)
  (Perhaps I already knew you were ?y)
  (Why do you tell me you were ?y now?)

(?* ?x) I feel (?* ?y) →
  (Do you often feel ?y ?)

(?* ?x) I felt (?* ?y) →
  (What other feelings do you have?)
```

ELIZA n'est pas en train de comprendre le texte ni les réponses, plutôt d'appliquer des règles.

## Historique et évolution — Les types d'IA

### 1ère catégorisation

**IA symbolique** — se base sur le raisonnement déductif, l'inférence logique et un certain type d'algorithme de recherche qui trouve une solution dans le cadre des contraintes du modèle spécifié.

Exemples :
- Systèmes experts, qui utilisent des règles et des arbres de décision pour déduire des conclusions à partir des données d'entrée
- Résolveurs de contraintes, qui recherchent une solution dans un espace de possibilités
- Systèmes de planification, qui tentent de trouver une séquence d'actions pour atteindre un objectif bien défini à partir d'un certain état initial

**IA connexionniste**
- S'inspire du fonctionnement du cerveau humain pour résoudre des problèmes complexes.
- Repose sur l'utilisation de neurones artificiels, qui sont organisés en couches pour former des réseaux de neurones.
- L'utilisateur ne spécifie pas les règles du domaine modélisé.
- Le réseau découvre les règles à partir des données d'entraînement, à partir des statistiques et d'un certain modèle mathématique.

**IA symbolique**

- Avantages : Interprétabilité, Explicabilité, Modélisation du raisonnement humain
- Inconvénients : Difficulté dans l'apprentissage à partir de données, Incapacité à gérer l'incertitude et la variabilité des données

**IA connexionniste**

- Avantages : Apprentissage automatique, Adaptabilité, Extraction de caractéristiques pertinentes
- Inconvénients : Opacité, Besoin de données massives, Pas toujours adapté à la modélisation symbolique

### 2ème catégorisation

Il existe trois types d'IA, basés sur les capacités :

- **L'IA étroite (Narrow IA)** : porter un focus sur une seule tâche avec des limites
- **L'IA Générale (General IA)** : effectuer toute tâche intellectuelle avec la même efficacité qu'un humain (pas encore)
- **La Super IA** : surpasser l'intelligence humaine dans toute tâche réalisée (pas encore)

<!-- TODO: unclear in source, verify against original PDF page (image "Prévision de l'évolution de l'IA selon la catégorisation des capacités" not extracted as text) -->

## Système IA : vue conceptuelle globale

Tel que défini et approuvé par l'AIGO en février 2019.

<!-- TODO: unclear in source, verify against original PDF (conceptual diagram image not extracted as text) -->

## Domaines d'application

Agriculture, Automobile, Aérospatial, Distribution et marketing, Publicité, Transport, Juridique, Industrie, Médias, Sécurité, Santé, Finance, Education.

### Quelques applications

- Diagnostic médical, thérapie, surveillance d'appareils
- Synthèse d'images, vision par ordinateur
- Classifications naturelles (biologie, minéralogie, …)
- Planification de tâches (prédictions financières, ...)
- Architecture (conception assistée par ordinateur)
- Détection de pannes (Sherlock pour les avions F16)
- Éducation (Systèmes Tutoriels Intelligents, e-Learning)
- Prospection géologique (gisements miniers)
- Simulateurs de vols (CAE, Bombardier, …)
- Jeux (vidéos)
- Reconnaissance de la parole

### IA et domaines de recherche

- Apprentissage automatique
- Reconnaissance / Synthèse de la parole
- NLU/NLP
- Reconnaissance d'images
- Compréhension visuelle
- IA quantique
- Robotique
- …

## IA et Apprentissage Automatique

Selon NVIDIA :

- **ML** : c'est un sous-ensemble de l'IA. Il permet aux machines d'apprendre et de faire des prédictions sur la base de leur expérience (données).
- **DL** : fait partie des algorithmes de ML mais s'intéresse uniquement aux réseaux de neurones profonds.

### IA vs ML vs DL — Exemple

Un magasin de vêtements vend 3 types : des pulls, des pantalons et des robes. Il souhaite automatiser la détection du type associé à chaque vêtement.

**En utilisant les algorithmes de l'IA** : définir des règles pour chaque type, ex : si `Long_V>1m20` alors robe.

**En utilisant le ML** :
- Récupération de la data descriptive de tous les vêtements avec labellisation.
- Extraction manuelle des caractéristiques.
- Utilisation d'un algorithme tel que l'arbre de décision pour donner un type.
- Indication explicite des caractéristiques les plus importants.

**En utilisant le DL** :
- Récupération des images des vêtements avec labellisation.
- Pas besoin d'indiquer manuellement les caractéristiques à considérer.
- Utilisation d'un RN pour donner un type.
- Détection automatique des caractéristiques.

## Introduction de l'apprentissage automatique (Machine Learning)

### Domaines d'application et exemples

- Estimation de l'évolution de la rentabilité d'une entreprise : nombre d'employés, productivité de chaque employé, matériel et coût, clients, fournisseurs, inflation.
- Estimer le choix d'un utilisateur e-commerce : récupération des profils cibles à partir des CV(s) (ex : critères de recrutement — maîtriser Java J2EE, au moins 3 ans d'expérience, qualité de communication, grande ouverture, capacités en data mining — sur 2000 CV(s) à traiter).
- Le profiling des utilisateurs : centres d'intérêt, commentaires, navigation web, clics, réponses — pour orienter chaque utilisateur selon le groupe auquel il appartient, ou détecter les niches de clients qui peuvent se désabonner d'un service donné.
- Prédire la maladie d'une personne à partir des symptômes, déterminer s'il y a une tumeur ou pas au niveau d'un organe donné, prédire qui va remporter les élections à partir des réseaux sociaux.

L'idée de découvrir des faits à partir des données est aussi vieille que la statistique :

> « Statistics is the science of learning from data. Statistics is essential for the proper running of government, central to decision making in industry, and a core component of modern educational curricula at all levels. » (J. Kettenring, 1997, ancien président de l'ASA)

### Pourquoi tant d'intérêt ?

- « Les données sont les seules choses qui lorsqu'elles se consomment se multiplient »
- Quantité énorme de données
- Puissance de calculs
- Rentabilité de cette science de fouille des données dans tous les domaines

### Types d'apprentissage

- **Supervisé** : classification, régression
- **Non supervisé** : clustering, analyse factorielle
- **Par renforcement**

#### Apprentissage supervisé

Data : `Y` (cible), `X` (variables) — label $i$, observation $i$. Le problème est de prédire le label de $i$ en fonction des caractéristiques : $F(X) = Y$ où $F$ est le modèle.

Découpage des données :
- Training : 70% de la data
- Test : 30% de la data

`Xtrain`/`Ytrain` (entrepôt d'apprentissage), `Xtest`/`Ytest` (entrepôt de test).

Exemple : classer des individus (taille, poids) en homme/femme.

Il s'agit d'« apprendre » à partir d'exemples présentés : l'algorithme construit petit à petit le modèle de décision grâce à la modification graduelle des paramètres de ce modèle pour que ses réponses soient de plus en plus « exactes ». Après la phase d'apprentissage vient la phase de test. Cette étape teste la capacité du modèle de généraliser le résultat par rapport à de nouvelles données.

**Phase 1 — Durant l'entraînement** : `X-train`, `Y-train` → ML Algorithm → `F` (le modèle). Peut-on faire confiance à `F` pour l'utiliser dans d'autres prédictions ?

Exemple : $Y = F(x) = sig(20x + 30)$, pour $x = 20$, $Y = 1$.

**Phase 2 — Durant le test** : `X-test` → `F` (modèle) → `Y_predit`, qu'on compare à `Y-test` pour évaluer.

#### Apprentissage non supervisé

- L'apprentissage non supervisé englobe tous les types d'apprentissage automatique pour lesquels il n'y a pas de résultat connu, pas d'enseignant pour donner des instructions à l'algorithme d'apprentissage.
- Dans l'apprentissage non supervisé, l'algorithme d'apprentissage se voit simplement présenter les données d'entrée et on lui demande d'extraire des connaissances à partir de ces données.

**Clustering** : technique de l'apprentissage automatique non supervisé qui consiste à regrouper des éléments similaires dans un ensemble, appelé cluster, en fonction de certaines caractéristiques ou similitudes.

**Analyse factorielle** : technique spécifique d'apprentissage non supervisé qui permet de découvrir des relations sous-jacentes entre les variables dans les données.

#### Apprentissage par renforcement

- L'apprentissage par renforcement est une technique d'apprentissage automatique basée sur le retour d'information, dans laquelle un agent apprend à se comporter dans un environnement en effectuant des actions et en voyant les résultats de ces actions.
- Pour chaque bonne action, l'agent reçoit un retour positif, et pour chaque mauvaise action, il reçoit un retour négatif ou une pénalité.
- L'apprentissage par renforcement résout un type de problème spécifique où la prise de décision est séquentielle et où l'objectif est à long terme, comme les jeux, la robotique, etc.

## Références

1. Winston, P. (1992), *Artificial Intelligence*, Addison-Wesley, Reading, MA.
2. Dobrev, D. (2012). A definition of artificial intelligence. *arXiv preprint arXiv:1210.1568*.
3. Ramesh, A. N., Kambhampati, C., Monson, J. R., & Drew, P. J. (2004). Artificial intelligence in medicine. *Annals of the Royal College of Surgeons of England*, 86(5), 334.
4. James H. Fetzer (1990) *Artificial Intelligence: Its Scope and Limits*, Volume 4, ISBN: 978-0-7923-0548-4.
5. Mitchell, T. M. (1997). *Machine learning*.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/ia-ch1-introduction.pdf" />

</TabItem>
</Tabs>
