---
sidebar_position: 2
title: Devoir Surveillé ACOO (Corrigé)
sidebar_label: DS ACOO (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Devoir Surveillé — Analyse et Conception Orientées Objet

*Source : "DS_ACOO + Corr.pdf". Ce document regroupe deux devoirs surveillés distincts : le DS 2011-2012 (dont seul l'énoncé et le formulaire de réponses vierge sont présents dans ce document — aucune correction remplie n'y figure) et le DS 2017-2018 (énoncé accompagné de sa correction remplie).*

## Devoir Surveillé 2011-2012

*Université de la Manouba — École Nationale des Sciences de l'Informatique — Matière : Analyse et Conception Orientées Objets — Niveau : II2 — Nombre de pages : 10 pages (3 p. énoncés + 7 p. réponses) — Date : Lundi 14 novembre 2011 — Durée : 2H — Documents non autorisés — Enseignants : Y. Jamoussi, I. Ben Hamouda, S. Mtibaa, I. Fliss, G. Ziada*

*NB : Répondez directement sur les feuilles de réponses (pages 4 à 10). Ne répondez pas à l'aveuglette. La précision, la consistance, la clarté seront appréciées.*

<!-- TODO: aucune correction n'est présente dans ce document source pour le DS 2011-2012 : les pages de réponses sont un formulaire vierge (nom/prénom/groupe à compléter par l'étudiant), pas un corrigé. L'énoncé est transcrit ci-dessous tel quel, sans <details> de correction. -->

### Exercice n°1 : Modélisation des besoins (7pts)

Le département d'informatique d'une université se propose de développer une application de gestion des cours en ligne `gestion_cours_en_ligne` qui peut être utilisée sur le web.

Dans cette application, la gestion des cours et des inscriptions est à la charge d'un administrateur. Ainsi, cet administrateur est donc en mesure d'enregistrer des cours, de supprimer un cours, d'inscrire un enseignant (resp. un étudiant) dans un cours et de retirer un enseignant (resp. un étudiant) d'un cours. Lors de l'inscription d'un enseignant ou d'un étudiant un login et un mot de passe seront automatiquement générés et envoyés par e-mails au concerné. Les enseignants et les étudiants inscrits, peuvent ainsi se connecter à l'application avec ces données. Pour avoir plus de sécurité de l'application, les enseignants et les étudiants pourront modifier leurs mots de passes. Quand l'administrateur inscrit un étudiant, il doit absolument l'inscrire à au moins un cours pour que l'inscription soit valide. Quand l'administrateur supprime un cours, il doit aussi retirer tous les étudiants de ce cours.

Un enseignant peut entrer des documents, présenter des exercices à rendre avant une date donnée et attribuer des notes aux travaux effectués par les étudiants. Si la date limite de remise des travaux a été dépassée et il y a des étudiants qui n'ont pas encore rendu leurs travaux, ces travaux porteront la mention « travail non rendu » et un e-mail sera envoyé automatiquement aux étudiants concernés. Un enseignant peut aussi préparer des tests électroniques qui contiennent une série de questions sous forme de QCM (Question à Choix Multiples). L'enseignant doit, d'une part, préciser une période (journée et horaire) que les étudiants doivent respecter pour faire le test et, d'autre part, doit indiquer pour chaque question du test électronique, la réponse correcte qui servira pour l'évaluation automatique. On suppose que tous les étudiants inscrits au cours de l'enseignant qui a déposé le test seront informés par mail de la période du test. Pour faire tout ceci, l'enseignant doit s'identifier en précisant son login et son mot de passe.

Les étudiants de leur part, peuvent consulter les documents et leurs notes, déposer leurs travaux et passer des tests. Ils doivent bien sûr s'identifier pour participer à chacune de ces activités. Une fois sur la page du test, l'étudiant pourra choisir de démarrer ou de quitter le test. Le démarrage ne peut se faire que si l'étudiant respecte la période horaire précisée par l'enseignant. Si l'étudiant quitte le test avant qu'il ne termine la réponse à toutes les questions, un e-mail sera envoyé automatiquement à l'enseignant (précisant le nom de l'étudiant et les questions auxquelles il a répondu). Si l'étudiant reprend le test avant l'écoulement d'une heure, il aura une autre chance de le terminer, sinon, le test ne sera plus disponible pour l'étudiant en question. Afin d'avoir une gestion commune du temps par tous les utilisateurs de l'application, on suppose que l'application gère de manière interne une horloge. Si l'étudiant complète le test de manière normale, en répondant à toutes les questions, le test sera automatiquement corrigé et les notes seront automatiquement entrées dans la base de données. Dans le cas contraire, le test sera corrigé manuellement par l'enseignant. Lorsque l'étudiant choisit de quitter, l'étudiant sera systématiquement déconnecté de l'application.

**Travail à faire :** L'objectif de ce problème est d'analyser l'application `gestion_cours_en_ligne` grâce aux diagrammes de cas d'utilisation vus en cours. Pour cela, répondez directement aux questions qui sont posées dans les feuilles de réponses.

### Exercice n°2 : Modélisation statique (13pts)

L'objectif de cet exercice est l'analyse et la conception, en partie, d'une version simplifiée d'un jeu mettant en opposition un Pacman et plusieurs adversaires. Ce jeu permet à un joueur de déplacer son Pacman dans un labyrinthe contenant des tonneaux. Lors de son passage, le Pacman peut boire des potions d'énergie qui sont dans des tonneaux. La partie est gagnée quand le Pacman atteint une case « jocker ». La partie est perdue quand le Pacman est tué par un adversaire.

Dans le cadre de ce problème, on suppose que le labyrinthe est composé d'un ensemble de cases (n lignes, m colonnes) et, par conséquent, il est de forme rectangulaire. Les cases du labyrinthe peuvent être de l'une de ces 3 catégories : `Simple`, `Prison` ou `Jocker`. Chaque case de ce labyrinthe peut contenir au plus un tonneau, mais peut abriter un nombre quelconque d'occupants : le Pacman et/ou des adversaires. On suppose que chaque tonneau contient une quantité infinie de potions d'énergie et ne change pas de place au cours du jeu. Si deux occupants de natures différentes se trouvent sur la même case, ils s'attaquent et en fonction de leurs états respectifs, l'un d'eux tue l'autre. On suppose aussi que le déplacement d'un occupant se fait sur l'une des quatre cases voisines à la sienne. Dans le cas où le déplacement fait ressortir l'occupant du labyrinthe, ce dernier réapparaît sur le côté opposé du labyrinthe.

Le Pacman est initialement immobile. Le déplacement du Pacman est commandité par le joueur. Ce dernier lui donne une direction (haut, bas, gauche, droite). Le Pacman se déplace à des fréquences périodiques dans le couloir où il se trouve et dans la direction donnée par le joueur. Le Pacman ne peut pas visiter la case "prison" et dans le cas où il la rencontre dans son chemin il s'arrête. Il est à noter qu'un couloir est une succession de cases sur une même ligne (respectivement même colonne) du labyrinthe.

Le Pacman est initialement dans un état `non agressif`. Dans cet état, il peut être attaqué par un Adversaire. Mais, le Pacman peut à son tour attaquer quand il est à l'état `agressif`. Le Pacman passe à l'état `agressif` lorsqu'il passe par une case qui contient un tonneau et dans ce cas boit systématiquement une potion d'énergie à condition qu'il ne cumule pas en même temps au-delà de 3 potions actives. L'effet d'une potion bue devient inactif après 10 secondes. Il est possible de cumuler des potions d'un même tonneau.

Les adversaires, quant à eux, sont dirigés aléatoirement à des fréquences périodiques. Ils vont poursuivre le Pacman dans le labyrinthe. Les adversaires apparaissent dans la case "prison" où ils ne font rien, puis sont libérés par la suite, chacun à son tour. En se libérant, l'adversaire passe à l'état de `recherche` d'un Pacman. Dans ce cas, il se déplace de manière aléatoire à l'intérieur du labyrinthe. Lorsque le Pacman est dans l'état `non agressif` et se trouve dans un même couloir que l'adversaire, ce dernier passe à l'état de `poursuite` et son déplacement se fait dans la direction du Pacman dans l'espoir de le rattraper. Par contre, l'adversaire va tenter de fuir le Pacman quand ce dernier est à l'état `agressif`, jusqu'à ce que le Pacman passe à l'état `non agressif`. Quand un adversaire est mangé par le Pacman, il va être replacé dans la "prison" et en ressortira après 2 secondes.

Après l'analyse de ce jeu, un développeur a commencé une ébauche de la conception et a proposé le diagramme de classes UML incomplet suivant :

<!-- TODO: unclear in source, verify against original PDF — le diagramme de classes incomplet de l'énoncé (image) n'est pas reproduit ici. -->

- La méthode `MAJ()` de la classe `Jeu` se charge de l'invocation des manœuvres (déplacements et attaques) du `Pacman` et celles des `Adversaires` ainsi que l'effet des potions et ce à des fréquences périodiques.
- La méthode `déplacer()` de la classe `Occupant` permet de déplacer l'occupant dans le labyrinthe. Dans le cas de la classe `Pacman`, le joueur choisit la direction de déplacement en l'indiquant comme paramètre dans la méthode `choisir` et dans le cas de l'`Adversaire`, le choix de la direction est automatique selon l'état de ce dernier.
- La méthode `surUnMemeCouloir()` de la classe `Adversaire` permet de détecter la présence du Pacman sur un même couloir (ligne ou colonne).

Les types `Direction`, `Etat_p` et `Etat_adv` sont des énumérations :

- `Direction` = `{immobile, haut, bas, droite, gauche}`
- `Etat_p` = `{agressif, non agressif}`
- `Etat_adv` = `{prisonnier, recherche, poursuite, fuite}`

**Travail à faire :** On se propose de comprendre, compléter, améliorer la modélisation UML proposée par le développeur. Pour cela, il s'agit de répondre directement sur les formulaires de réponses qui vous ont été distribués.

#### Feuilles de réponses (formulaire vierge dans le document source)

**Exercice n°1 : Travail demandé (7 pts)**

1. Identifiez parmi cette liste de noms, les acteurs de l'application `gestion_cours_en_ligne`. Il s'agit d'encercler l'acteur, de préciser son type, et de donner une justification dans le cas où le nom n'est pas retenu comme acteur : Administrateur, Horloge, email, Cours, test, Informaticien, Intervenant, L'application `gestion_cours_en_ligne`, Enseignant, Web, Etudiant.
2. Considérons « Inscrire étudiant », « Déposer un document », « S'identifier » et « Passer un test » comme quatre cas d'utilisation de l'application `gestion_cours_en_ligne`. Complétez le diagramme de cas d'utilisation. Il s'agit de :
   - Rajouter quatre autres cas d'utilisation au choix parmi les éléments que vous jugez les plus pertinents de cette liste (attribuer notes, retirer étudiant, définir login et mot de passe, supprimer cours, entrer document, préciser une période, respecter date, indiquer réponse correcte, déposer travail, quitter test, reprendre test, écouler temps, gérer horloge, répondre à une question).
   - Représenter les acteurs retenus dans la question 1 et de les relier aux cas.
   - Relier, en cas de besoin, les cas par des liens `include` et/ou des liens `extend`.
3. Un diagramme de cas d'utilisation permet-il de spécifier l'ordre d'exécution des cas ? Expliquez.
4. Concernant le cas d'utilisation « Passer un test » :
   - a. Proposez une pré-condition à ce cas.
   - b. Proposez une post-condition à ce cas.
   - c. Précisez les acteurs principaux de ce cas.
   - d. Imaginez trois variantes de scénarios relatifs à ce cas (un scénario nominal et deux scénarios alternatifs). Donnez, en langage naturel, une description claire pour chaque scénario (Nominal, Alternatif 1, Alternatif 2).

**Exercice n°2 : Travail demandé (13 pts)**

*Partie n°1 : Analyse (7pts)*

- Question 1.1 : Précisez les cardinalités manquantes des associations sur la portion de diagramme suivante.
- Question 1.2 : On se propose de promouvoir dans la mesure du possible les associations en compositions ou en des agrégations. Cochez LA bonne réponse pour chaque proposition en justifiant brièvement votre réponse, puis reflétez ceci sur le diagramme de classes de la page précédente (question 1.1). N'oubliez pas de proposer un nom à l'association s'il est impossible de la promouvoir : Jeu-Labyrinthe, Case-Labyrinthe, Case-Tonneau, Jeu-Occupant, Case-Occupant, Pacman-Tonneau.
- Question 1.3 : L'effet d'une potion bue dure pendant 10 secondes. Proposez une manière de représentation de cette information dans le diagramme de classes. Commentez brièvement votre solution.
- Question 1.4 : Élaborez le diagramme d'objets conformément à vos réponses à la question (1.2) illustrant la situation représentée par la figure (Adversaire et Tonneau dans une même Case `Simple`, Adversaire dans une Case "Prison", Pacman dans la Case `Jocker`). Pour des raisons de clarté, on vous demande de représenter que les cases occupées. Nommez vos objets cases comme suit : `ci,j` (i est le n° de ligne et j est le n° de colonne).

*Partie 2 : Conception (6pts)*

- Question 2.1 : Afin de faciliter l'implémentation des associations, on se propose de limiter au maximum possible la navigation. Précisez le sens de navigation sur le diagramme de classes en bas de page (Q2.2).
- Question 2.2 (2.5 pts) : Pour comprendre les règles de gestion gouvernant l'évolution des liens entre les objets, on se propose de décorer les associations par les contraintes `{ordered}`, `{addOnly}`, `{frozen}`, `{notUnique}`.
  - a) Rappelez la signification de chaque contrainte de gestion : Ordered, AddOnly, Frozen, NotUnique.
  - b) Décorez, directement sur le diagramme de classes ci-dessous, chacune des associations par les contraintes de gestion appropriées (symboles O, A, F, N).
- Question 2.3 : Donnez l'ordre de navigation sur les instances de classes concernées pour que : 1. la méthode `surUnMemeCouloir()` de la classe `Adversaire` puisse détecter la présence du Pacman sur un même couloir (ligne ou colonne). 2. la méthode `déplacer()` de la classe `Pacman` puisse changer la position du Pacman.
- Question 2.4 : Pour des besoins d'optimisation, on se propose de changer la conception comme suit : l'association entre le labyrinthe et la case devient de cardinalité `1` et non plus `*`.
  - a) Ce changement nécessite-t-il la révision des associations ? Si oui donnez les changements à apporter au diagramme de classes sinon justifiez votre réponse.
  - b) Donnez le nouvel ordre de navigation sur l'ensemble des objets concernés de la méthode `surUnMemeCouloir()`.

## Devoir Surveillé 2017-2018

*Université de la Manouba — École Nationale des Sciences de l'Informatique — Matière : Analyse et Conception Orientées Objet — Niveau : II2 — Nombre de pages : 4 pages énoncé + 8 pages réponses — Date : Jeudi 16 novembre 2017 — Durée : 2H — Documents non autorisés — Barème indicatif : 5, 15 — Enseignants : I. Fliss, N. Bellamine, C. Ben Othmen, N. Ben Yahia, R. Drira, M.A. Mezghich*

*NB : Ne répondez pas à l'aveuglette. La précision, la consistance, la clarté seront appréciées.*

### Questions de réflexion (5pts)

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

**3.** Soit le diagramme de classes suivant (Responsable, Opérateur, Employé, Usine, Modèle, Moteur, Défaut, Type) :

<!-- TODO: unclear in source, verify against original PDF page 1 — le diagramme de classes de l'énoncé (image) n'est pas reproduit ici. -->

a. Une instance de la classe `Responsable` peut accéder au minimum et au maximum à combien d'instances de la classe `Type` ? Justifiez. (0.5)

<details>
<summary>Correction</summary>

Par héritage de la classe `Employé` (qui peut accéder à `0..*` instances de la classe `Type` : `Employé-Usine-Modèle-Moteur-Défaut-Type`), une instance de `Responsable` peut accéder au minimum à 0 et au maximum à `*` instances de la classe `Type`.

</details>

b. Une instance de la classe `Opérateur` peut accéder au minimum et au maximum à combien d'instances de la classe `Type` ? Justifiez. (0.5)

<details>
<summary>Correction</summary>

Par héritage de la classe `Employé` (qui peut accéder à `0..*` instances de la classe `Type` : `Employé-Usine-Modèle-Moteur-Défaut-Type`) et par accès indirect (`Opérateur-Défaut-Type` : min 0 et max 7), une instance de la classe `Opérateur` peut accéder au minimum à 0 et au maximum à `*` instances de la classe `Type`.

</details>

c. Donnez le diagramme d'objets modélisant la situation suivante : « Ali Ben Salah est un employé et plus précisément un opérateur qui travaille pour l'usine BicoMotors installée en France. Cette usine fabrique six modèles de moteurs : M1, M2, M3, M4, M5 et M6. Le modèle M1 correspond à deux moteurs qui ne sont concernés par aucun défaut. Le modèle M2 correspond à un seul moteur concerné par cinq défauts avec une référence de type pour chacun. Le modèle M3 correspond à trois moteurs qui ne sont concernés par aucun défaut. Les modèles M4 et M6 correspondent à trois moteurs concernés chacun par trois défauts avec une référence de type pour chaque défaut. Le modèle M5 correspond à un moteur qui n'est pas concerné par aucun défaut. Ali Ben Salah a relevé sept défauts tout en référant le type de chaque défaut. » (1pt)

<details>
<summary>Correction</summary>

(Il faut noter ici le soulignement des noms des objets et surtout la non-présence de cardinalités et d'héritage, sinon 0.) Objets attendus : `AliBenSalah : Opérateur`, `BricoMotors : Usine` (nom = BricoMotors, pays = France), `M1 : Modèle`, `M2 : Modèle`, `M3 : Modèle`, `M4 : Modèle`, `M5 : Modèle`, `M6 : Modèle`, des instances `: Moteur` liées à chaque modèle selon l'énoncé, des instances `: Défaut` liées aux moteurs concernés, et des instances `: Type` liées à chaque défaut référencé.

<!-- TODO: unclear in source, verify against original PDF page 1 — le schéma exact du diagramme d'objets (disposition des instances et liens) n'est pas entièrement récupérable depuis le texte OCR. -->

</details>

### Problème (15pts)

Une clinique souhaite informatiser le suivi de ses patients, à travers un nouveau système informatique de suivi « SISC ». Celui-ci sera utilisé par le personnel médical (médecin, infirmier, anesthésiste) et administratif (réceptionniste, comptable, administrateur). Par contre, les fonctionnalités de chacun seront distinctes. Le personnel administratif s'occupera notamment de l'admission des patients et de l'édition de factures, alors que le personnel médical s'occupera du dossier médical.

Le processus d'admission (réception) débute lorsque le patient se présente à la clinique avec un ordre d'admission (émis par un médecin de la clinique) ou en tant que cas d'urgence. À partir de ce moment, un employé de la clinique (un(e) réceptionniste) le prendra en charge. Il fera, d'abord, l'inscription administrative du patient et cherchera une chambre et attribuera un médecin pour lui. Par contre, si aucune chambre n'est disponible dans la clinique, l'employé qui accueille le patient devra coordonner avec le médecin traitant et contacter d'autres cliniques pour rediriger le patient vers une autre institution.

L'inscription administrative correspond à la saisie des données administratives du patient si celui-ci est un nouveau patient, ou la récupération de ses données dans la base de données s'il s'agit d'un patient qui a déjà séjourné dans la clinique (on utilise le numéro d'assurance maladie et le nom et le prénom comme identifiants du patient pour savoir s'il est nouveau ou pas). Les données administratives correspondent aux coordonnées du patient, tels que, son identité (son nom et prénom, numéro d'assurance maladie, adresse, numéro de téléphone, numéro CIN) et le nom du médecin traitant et ses coordonnées. En plus de cela, le dossier administratif du patient comprend le numéro de la chambre et les dates d'arrivée et de sortie du patient. Chaque patient doit aussi avoir un dossier médical. Le dossier médical comprend toutes les données médicales du patient : son groupe sanguin, ses allergies, ses maladies, ses médicaments avec leurs doses, les résultats d'analyses et tests, les valeurs de température et de tension artérielle, les interventions médicales faites et tous les commentaires que le médecin traitant juge nécessaires. S'il s'agit d'un patient admis avec ordre d'admission, le dossier médical est téléchargé depuis le lien présent dans l'ordre d'admission. S'il s'agit d'un ancien patient reçu de nouveau avec un ordre d'admission, une mise à jour de son dossier médical sera faite automatiquement en fusionnant le dossier téléchargé et les informations médicales sauvegardées. Dans le cas d'un nouveau patient en cas d'urgence, le médecin attribué peut demander au médecin traitant de transférer le dossier médical du patient et ces informations seront sauvegardées dans la base des données médicales du patient. Dès la réception d'un patient, une facture est créée. Dans cette facture, les médicaments et les doses prises et les interventions faites sont initialement nuls. Les médicaments pris sont caractérisés par leurs libellés, les quantités utilisées, prix unitaire.

Une fois que le patient sera installé dans la chambre qui lui a été attribuée, un infirmier effectuera un premier contrôle médical (tension artérielle, température…) et fera la saisie de ces informations dans le dossier médical du patient. En parallèle, le (la) réceptionniste contacte par téléphone le médecin traitant attribué. On distingue entre deux types d'attributions de médecins traitants : attribution nominative (le/la patient(e) doit explicitement voir ce médecin (ex. s'il s'agit d'un rendez-vous précisé sur l'ordre d'admission pour faire une opération)) et les attributions flottantes (attribution à n'importe quel médecin disponible ayant les bonnes qualifications). Pour faciliter l'attribution du personnel médical, le système « SISP » permet à un administrateur de gérer les dossiers du personnel médical œuvrant au sein de la clinique. Pour chaque membre du personnel médical, l'administrateur saisit le nom, les coordonnées, la spécialité, les données contractuelles (min et max de présence), les procédures pour lesquelles ils/elles ont été certifiés, et les modalités de rémunération. Il spécifie aussi l'horaire du personnel médical. La spécification de l'horaire se fait par plage horaire par jour de semaine (ex. Mardi de 8:30 à 12:30), avec fréquence (toutes les semaines, toutes les premières semaines du mois, une semaine sur deux, etc.), avec des exceptions (sauf le mois de juillet, sauf la semaine du 13 au 17 novembre, etc.). On peut mettre un horaire préliminaire qu'on pourra éditer par la suite.

À tout moment, le personnel médical peut consulter le dossier médical contenant les données médicales relatives à un patient et ajouter de nouvelles données (résultat d'examens médicaux, interventions médicales, médicaments pris, etc.). Les données médicales sont consultables : soit par interrogation générale, qui ne fournit que les données de base sur l'état de santé du patient (groupe sanguin, allergies, etc.), soit par interrogation détaillée, qui donne un accès intégral au dossier médical du patient. Cette dernière n'est ouverte qu'aux médecins (les autres membres du personnel médical n'y ont pas accès). Le personnel administratif n'a pas le droit de consulter les données médicales d'un patient, mais uniquement les données administratives qui, elles, sont interdites au personnel médical. La facture d'un patient est mise à jour automatiquement dès qu'une intervention ou un médicament est noté dans le dossier médical. Une intervention est caractérisée par une dénomination, type, local, une date et un coût. À la fin du séjour du patient, le comptable peut éditer les factures correspondant aux soins prodigués. La facture comporte la liste des médicaments consommés et leurs coûts (unitaires et totaux) et la liste des interventions faites et leurs coûts en plus des informations personnelles du patient à savoir son nom, prénom, numéro d'assurance maladie et CIN. Il y a différentes modalités de paiement, qui dépendent du type d'assurance détenu par le patient. Le système « SISP » calcule le coût de l'intervention et la fraction payée par l'assureur. Si la totalité est à payer par l'assureur, le système transmet la facture directement à l'assureur. Le système produit alors une facture (à donner au patient) avec la note « à payer par l'assureur ». Si une partie ou la totalité de la facture est à payer directement par le patient, le système transmet la portion à payer par l'assureur directement à l'assureur. Le système produit une facture (à donner au patient) indiquant le total et le montant à payer directement par le patient. Le comptable demande au patient de choisir entre payer en espèce (au comptant) ou utiliser une carte de crédit. Si le paiement au comptant a été sélectionné et le montant a été payé par le client, le comptable confirme au système la réception du montant. Le système modifie la facture en précisant que le montant était payé comptant. Si le patient choisit de payer via une carte de crédit, il la présente au comptable qui la scanne. Le système initie une transaction carte de crédit. Il vérifie que la carte est valide et le solde est suffisant sinon la transaction sera refusée, dans ce cas le patient sera ramené à utiliser une autre carte de crédit ou à payer au comptant. Dans le cas où la transaction est acceptée, le système imprime une copie de la transaction. Le comptable remet la copie de transaction au patient pour signature. Le patient signe. Alors le comptable confirme que la transaction est terminée avec succès. Le système modifie la facture en précisant que le montant était payé via une carte de crédit. Avant de remettre toute facture au patient, le comptable met sa signature et le cachet de la clinique.

Lors de l'analyse du système informatique de suivi « SISC », un développeur a proposé le diagramme de classes UML incomplet suivant :

<!-- TODO: unclear in source, verify against original PDF page 4 — le diagramme de classes incomplet de l'énoncé (image) n'est pas reproduit ici. -->

**Travail à faire :** L'objectif de ce problème est d'analyser en partie le système informatique de suivi « SISC », grâce aux diagrammes UML vus en cours. Pour cela, répondez directement aux questions qui sont posées dans les feuilles de réponses.

#### Partie 1 : Expression des besoins (7pts)

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

0.5pt : système « SISC ». 0.5pt : relations acteurs-cas d'utilisation + relation d'héritage entre acteurs. Cas d'utilisation attendus : `Recevoir des patients`, `Éditer des factures` (parmi d'autres).

<!-- TODO: unclear in source, verify against original PDF page 2 — le schéma complet du diagramme de cas d'utilisation corrigé n'est pas reproduit ici. -->

</details>

**3.** Concernant le cas d'utilisation « recevoir des patients », imaginez deux variantes de scénarii relatifs à ce cas (un scénario nominal et un scénario alternatif). Représentez chaque scénario par un diagramme de séquence système. (1pt = 0.5 + 0.5)

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 3 — les diagrammes de séquence système du corrigé (schémas) ne sont pas reproduits ici. -->

</details>

**4.** Proposez un diagramme d'activités qui illustre la dynamique du cas d'utilisation « éditer des factures ». (1pt)

<details>
<summary>Correction</summary>

Dans ce cas : il faut considérer que le comptable précise le mode de paiement et le type d'assurance détenu par le patient : 1. paiement comptant, 2. paiement par carte de crédit, 3. paiement par transmission à l'assurance du patient. Finalement et dans tous les cas, un reçu est remis au patient avec indication du mode de paiement.

</details>

#### Partie 2 : Analyse structurelle (4,5pts)

**5.** Le diagramme de classes proposé par le développeur est incomplet. Ajoutez sur le diagramme de classes suivant les cardinalités et les associations manquantes. (2pts)

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 3 — le schéma corrigé (cardinalités et associations ajoutées) n'est pas reproduit ici. -->

</details>

**6.** Ajoutez les attributs et les méthodes correspondants à chaque classe. (2.5pts)

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 4 — le schéma corrigé (attributs et méthodes ajoutés) n'est pas reproduit ici. -->

</details>

#### Partie 3 : Analyse dynamique (3,5pts)

**7.** On se propose de comprendre l'évolution de la classe `Facture`. En vous basant sur l'énoncé, donnez le diagramme d'états-transitions de cette classe. (2.5)

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 4 — le diagramme d'états-transitions corrigé (schéma) n'est pas reproduit ici. -->

</details>

**8.** En vous basant sur le diagramme de classes que vous avez proposé dans la question (5), construisez un diagramme de séquence (diagramme de séquences objet) décrivant l'émission de la facture pour le patient X, sachant qu'il va payer la totalité de la somme sans avoir recours à l'assureur. N'oubliez pas de préciser toutes les méthodes que vous devez ajouter au diagramme de classes proposé (on suppose que tous les messages échangés sont des messages synchrones). (1pt)

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 4 — le diagramme de séquence corrigé (schéma) n'est pas reproduit ici. -->

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/acoo-ds-corrige.pdf" />

</TabItem>
</Tabs>
