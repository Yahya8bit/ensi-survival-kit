---
sidebar_position: 6
title: Chapitre 5 - Test du Logiciel
sidebar_label: Ch5 - Test du logiciel
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 5 : Test du Logiciel

*Cours « Génie Logiciel » Niveau II2*

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments) — best-effort reconstruction below, see task summary -->

## Exemples de bugs célèbres

- **Système de téléphones des USA (1991)** : perturbation des communications à Los Angeles, San Francisco, Washington, Baltimore… Des millions d'abonnés mécontents. Trois (3 !) lignes de code modifiées sur plusieurs millions, pas la peine de tester, n'est-ce pas ? D'autant plus que la première phase de test avait duré 13 semaines et que le client n'est pas disposé à attendre une seconde fois… Absence de test de non-régression. Pression du client, du marché…
- **Missile Patriot, guerre du Golfe (1991)** : défaut d'interception d'un missile Scud irakien — 28 morts, 100 blessés. Une erreur d'arrondi dans le calcul du temps s'accumulait, faussant la précision de l'interception : le temps était stocké en 1/10 s ; pour obtenir la durée, on devait multiplier par 0.1 ; malheureusement, 0.1 ne peut être stocké exactement (calcul en virgule fixe sur 24 bits) ; donc erreur d'arrondi qui au bout de 100 heures est de 0.34 s ; à la vitesse du Scud (1676 m/s), cela représente plus de 500 m. Spécification incomplète et fonctionnement hors normes : en temps normal, le système devait être rebooté tous les jours, mais ce mode de fonctionnement n'était qu'implicite dans le cahier des charges ; lors de l'accident, il tournait depuis 5 jours d'affilée. Le bug était connu depuis le début de la guerre et déjà corrigé chez le constructeur, mais considérée non critique, la mise à jour n'a été déployée que trop tard (le lendemain !).

## Problèmes liés au développement de logiciels

3 facteurs liés à l'échec d'un logiciel (méthodes traditionnelles) :

- Le planning n'est pas maîtrisé.
- Les besoins sont mal identifiés (mal compris).
- Des erreurs surviennent lors de la livraison du logiciel (bugs).

### Rappel : activités du cycle de vie

Initiation → Étude préalable → Analyse → Conception → Implémentation → Tests → Installation → Maintenance & Assistance → Évaluation → Mise hors service, avec en transverse Vérification et Validation (V&V), Gestion de la configuration, Documentation, Planification/Pilotage/Suivi du projet, Gestion de qualité.

### Rappel : modèle en V

Branche descendante : Analyse des besoins → Spécification → Conception Globale → Conception Détaillée → Codage/Écriture. Branche montante : Tests unitaires → Tests d'intégration → Tests système → Validation d'acceptation → Installation et test de réception, avec V&V reliant chaque étape descendante à son étape montante correspondante.

## Introduction

« Le test est l'exécution ou l'évaluation d'un système ou d'un composant par des moyens automatiques ou manuels, pour vérifier qu'il répond à ses spécifications ou identifier les différences entre les résultats attendus et les résultats obtenus. » — Définition de l'IEEE (Standard Glossary of Software Engineering Terminology) - STD729 (1983)

*« Un programme sans spécifications est toujours correct ! »*

- Il faut distinguer entre le test et la mise au point :
  - **Test** : on vérifie la présence d'erreurs.
  - **Mise au point** : on localise et corrige les erreurs détectées.
- La conception des tests peut être aussi difficile que la conception initiale du produit lui-même.
- Test = activité coûteuse → optimiser l'investissement (effort minimum avec probabilité max. de détection d'erreur).
- Les tests exhaustifs sont impossibles.

:::note Remarque
« Tester peut révéler la présence d'erreurs mais jamais leur absence »
:::

## Objectifs des tests

Les objectifs de tests peuvent varier :

- Trouver des défauts
- Prévenir des défauts
- Acquérir de la confiance sur le niveau de qualité
- Fournir de l'information utile aux prises de décision

Selon Glen Myers [MYE79] :

- Le test est un processus de l'exécution d'un programme avec l'intention de trouver une erreur.
- Un bon test est celui qui a une forte probabilité de trouver une erreur non encore découverte.
- Un test réussi est celui qui découvre une erreur non encore découverte.

## Principes des tests selon [DAV95]

- Tous les tests doivent être traçables aux besoins des clients.
- L'objectif du test de logiciel est de découvrir des erreurs.
- Les tests doivent être planifiés bien avant le début des tests. Tous les tests peuvent être planifiés et conçus avant toute génération de code.
- Le principe de Pareto s'applique aux tests de logiciels : 80% des erreurs proviennent de 20% du code → le problème est d'isoler les composants suspects et de les tester à fond.
- Le dépistage exhaustif n'est pas possible : à cause de l'augmentation exceptionnelle du nombre de chemins d'exécution, il est impossible d'exécuter toutes les combinaisons de chemins pendant le test.
- Pour être plus efficaces, les essais doivent être effectués par une tierce partie indépendante : l'ingénieur logiciel qui a créé le système n'est pas la meilleure personne pour effectuer tous les tests.

## Caractéristiques d'un « bon » test

- Un bon test a une forte probabilité de trouver une erreur.
- Un bon test n'est pas redondant.
- Un bon test devrait être « le meilleur de sa classe ».
- Un bon test ne doit être ni trop simple ni trop complexe.

## Terminologie

- **Plan de test** : document définissant l'organisation des tests (responsabilités, étapes, environnement de test, enchaînement, planning...).
- **Dossier de test** : document ou ensemble de documents contenant la description des tests (scénario, cas de test, résultat attendu) puis la trace des sessions de test (résultat obtenu, fiche d'anomalie...). Il existe un dossier de test par niveau de test.
- **Base de référence** : base de données de test sur laquelle seront exécutés un ou plusieurs cas de test.
- **Cas de test** : chemin fonctionnel à mettre en œuvre pour atteindre un objectif de test. Un cas de test se définit par le jeu d'essai à mettre en œuvre, le scénario de test à exécuter et les résultats attendus.
- **Jeu d'essai** : données en entrée d'un cas de test (valeurs à saisir, données réelles — base existante ou de test —, génération automatique aléatoire ou à partir de spécifications). Le même jeu d'essai peut servir à plusieurs cas de test.
- **Scénario de test** : procédure à suivre par le testeur pour exécuter le cas de test (manipulations à effectuer, dialogue homme/machine...). Le même scénario peut être utilisé dans plusieurs cas de test.

## Les différentes méthodes de test

### Approches de test

Deux approches complémentaires :

- **Test dynamique** : exécuter un programme à l'aide d'un jeu de tests. Les erreurs sont détectées en comparant les résultats obtenus par l'exécution et ceux attendus. Coût du test dynamique : 30% à 60% du coût de développement total.
- **Test statique** : analyser les propriétés de l'application sans exécution du code. Selon des études, on peut détecter jusqu'à 60% des erreurs d'un programme par cette technique.

### Le test statique

1. **Techniques formelles** (méthodes formelles de développement) : preuve de théorèmes ; model checking.
2. **Techniques informelles** : les éléments à examiner peuvent être inspirés des erreurs de programmation les plus communes :
   - toutes les variables du programme sont-elles initialisées avant d'être utilisées ?
   - pour chaque instruction conditionnelle, la condition est-elle correcte ?
   - est-ce que chaque boucle termine ?
   - lorsque l'on traite des tableaux, la borne inférieure est-elle 0, 1 ou autre valeur ?
   - si on utilise un stockage dynamique, a-t-on alloué l'espace correctement ?
   - si on modifie une structure chaînée, rétablit-on bien tous les liens ?
   - les instructions composées sont-elles correctement parenthésées ?
   - etc.

### Le test dynamique

- C'est la détection des erreurs à l'exécution dans l'intention d'y trouver des anomalies ou des défauts.
- Validation fonctionnelle (test de conformité aux spécifications).
- Test de qualité (performance, sécurité, etc.).
- Deux méthodes : méthodes fonctionnelles (boîte noire) ; méthodes structurelles (boîte blanche).

### Types de test

- **Tests unitaires** : test d'une fonction, une classe, un module (pendant le développement). Permettent de vérifier le fonctionnement de chaque composant logiciel modifié ou nouveau dans des cas de fonctionnement normal, aux limites ou dégradé. S'appuient sur la structure interne du composant (tests « boîte blanche »).
- **Tests d'intégration** : test de l'assemblage des modules (pendant le développement). Permettent de vérifier progressivement que l'ensemble constitué par les composants logiciels assemblés répond aux spécifications fonctionnelles et techniques. Ils doivent, s'il y a lieu, activer les interfaces avec les applications connexes.
- **Tests de validation** : chez le fournisseur, par l'équipe de qualification, puis par le client. Permettent de vérifier que les exigences fonctionnelles et techniques du cahier des charges sont respectées. Ils s'effectuent sans connaissance de la structure interne (tests « boîte noire »).
- **Tests de réception** : permettent à un client de s'assurer que le cahier des charges a été respecté.
- **Tests de suivi d'exploitation** : après installation.
- **Tests de non-régression** : dans le cas de changement de version, permettent de vérifier que les modifications apportées n'ont pas entraîné d'effets de bord non prévus qui pourraient dégrader le comportement du logiciel antérieurement validé. Portent sur l'exécution de tests déjà joués afin de s'assurer que le système répond toujours aux exigences spécifiées.

### Nature des tests

- **Tests fonctionnels** : réaction à certaines entrées (sorties produites).
- **Tests de performance** : permettent de vérifier des contraintes de temps de réponse et d'occupation mémoire. Peuvent faire partie des tests de validation ou de non-régression.
- **Tests de fiabilité** : résistance aux pannes.
- **Tests de sécurité**, ...

:::note Remarque
On n'est pas obligé de faire tous les types de test : ça dépend de la criticité du logiciel.
:::

## Vues intérieures et extérieures des tests

Deux techniques de tests : les tests boîte noire, les tests boîte blanche.

### Dimensions du test selon les informations accédées

- **Test boîte noire** [black box testing] : évaluation de l'extérieur (sans regarder le code), uniquement en fonction des entrées et des sorties sur le logiciel ou un de ses composants. Sélection des tests à partir d'une spécification du système sans connaissance de l'implantation. Possibilité de construire les tests avant le codage.
- **Test boîte blanche** [white/glass box testing] : sélection des tests à partir de l'analyse du code source du système. Construction des tests uniquement pour du code déjà écrit.

## Test boîte noire (TBN)

- La génération des tests en boîte noire se base sur les spécifications fonctionnelles d'un programme. Aucune connaissance de la structure interne du programme.
- Catégories d'erreurs : fonctions incorrectes ou manquantes ; erreurs d'interface ; erreurs dans les structures de données ou l'accès de base de données externe ; erreurs de comportement ou de performance ; erreurs d'initialisation et erreurs de terminaison.

Méthodes :

- Analyse partitionnelle (Equivalence partitioning)
- Analyse des valeurs limites (Boundary Value Analysis)
- Autres : tests de « réseau » orthogonal (Orthogonal Array testing), tests à base de modèles (Model based testing), méthodes de test basées sur les graphes (Graph-Based Testing Methods)

### Test par classe d'équivalence

- Une classe d'équivalence correspond à un ensemble de données de tests supposées tester le même comportement, c'est-à-dire activer le même défaut.
- Trois phases : pour chaque donnée d'entrée, calcul de classes d'équivalence sur les domaines de valeurs ; choix d'un représentant de chaque classe d'équivalence ; composition par produit cartésien sur l'ensemble des données d'entrée pour établir les DT.
- Cette méthode consiste à partitionner le domaine d'entrées en plusieurs classes. Les entrées d'un système sont divisées en groupes qui doivent montrer un comportement similaire → elles auront un traitement identique. Prendre en compte les données invalides comme les données valides : toutes sont des entrées.
- Un seul test est nécessaire pour chaque classe : le test se fait avec un seul représentant par classe. Idée : chaque représentant d'une classe a une même « probabilité » que les autres de mettre en évidence une erreur. Partition du domaine d'entrées (souvent infini) en un nombre fini de classes d'équivalence → limite le nombre de tests.

**Règles de partitionnement des domaines** :

- Si la valeur appartient à un intervalle, construire : une classe pour les valeurs inférieures, une classe pour les valeurs supérieures, n classes valides.
- Si la donnée est un ensemble de valeurs, construire : une classe avec l'ensemble vide, une classe avec trop de valeurs, n classes valides.
- Si la donnée est une obligation ou une contrainte (forme, sens, syntaxe), construire : une classe avec la contrainte respectée, une classe avec la contrainte non respectée.

<details>
<summary>Exemple 3 (instruction FOR d'un compilateur) — Corrigé et méthode générale</summary>

Spécification : « L'instruction FOR n'accepte qu'un seul paramètre en tant que variable auxiliaire. Son nom ne doit pas dépasser deux caractères non blancs ; après le signe = on doit préciser aussi une borne supérieure et une borne inférieure. Les bornes sont des entiers positifs et on place entre eux le mot-clé TO. »

Travail demandé : déterminer les jeux de test à produire pour l'instruction FOR en utilisant la technique de test par classe d'équivalence.

<!-- TODO: unclear in source, verify against original PDF — le corrigé détaillé de cet exemple (slide "CORRIGÉ") n'apparaît dans l'extraction que comme le mot "CORRIGÉ" sans contenu détaillé exploitable, et la "MÉTHODE GÉNÉRALE" qui suit est également réduite à un simple titre de diapositive. -->

</details>

### Test aux limites

- L'expérience prouve que les erreurs se situent très souvent aux frontières. Par exemple : indice de tableau tout juste trop grand ou trop petit ; boucles avec une itération en trop ou en moins ; comparaisons strictes au lieu de avec égalité, ou l'inverse.
- Plusieurs représentants par classe d'équivalence : une valeur « médiane » ordinaire + une ou plusieurs valeurs aux limites.
- Aussi appelé « test aux bornes ».

Principe : on s'intéresse aux bornes des intervalles partitionnant les domaines des variables d'entrées :

- Pour chaque intervalle, on garde les 2 valeurs correspondant aux 2 limites, et les 4 valeurs correspondant aux valeurs des limites ± le plus petit delta possible. Exemple : n ∈ 3..15 → v1=3, v2=15, v3=2, v4=4, v5=14, v6=16.
- Si la variable appartient à un ensemble ordonné de valeurs, on choisit le premier, le second, l'avant-dernier et le dernier. Exemple : n ∈ `{-7, 2, 3, 157, 200}` → v1=-7, v2=2, v3=157, v4=200.
- Si une condition d'entrée spécifie un nombre de valeurs, définir les cas de test à partir du nombre minimum et maximum de valeurs, et des tests pour des nombres de valeurs hors limites invalides. Exemple : un fichier d'entrée contient 1-255 records → produire un cas de test pour 0, 1, 255 et 256.

**Types de données** : les données d'entrée ne sont pas seulement des valeurs numériques : caractères, booléens, images, son, … Ces catégories peuvent, en général, se prêter à une analyse partitionnelle et à l'examen des conditions aux limites (True/False, Fichier plein/Fichier vide, Trame pleine/Trame vide, Nuances de couleur, Plus grand/plus petit, …).

<details>
<summary>Exemple (fichier étudiants) — Correction</summary>

« Écrire un programme statistique analysant un fichier comprenant les noms et les notes des étudiants d'une année universitaire. Ce fichier se compose au maximum de 100 champs. Chaque champ comprend le nom de chaque étudiant (20 caractères), son sexe (1 caractère) et ses notes dans 5 matières (entiers compris entre 0 et 20). Le but du programme est de : calculer la moyenne pour chaque étudiant, calculer la moyenne générale (par sexe et par matière), calculer le nombre d'étudiants qui ont réussi (moyenne supérieure à 10). »

DT obtenues par test aux limites pour l'exemple Étudiants :

- Passage d'un fichier vide, puis comprenant 1 champ, 99, 100 et 101 champs (5 tests différents, la valeur -1 n'ayant pas de sens dans ce cas) ;
- Inclure un nom d'étudiant vide, un nom avec des caractères de contrôle, un nom avec 19, puis 20, puis 21 caractères ;
- Inclure un code sexe vide, puis avec un caractère faux (C par exemple) ;
- Avoir un étudiant sans aucune note et un avec plus de 5 notes ;
- Pour certains champs, les notes ne doivent pas être des nombres entiers, mais des caractères, des réels avec plusieurs décimales, des nombres négatifs ou des nombres entiers supérieurs à 20.

Les DT aux limites doivent être passées indépendamment : les erreurs peuvent se compenser.

</details>

**Test par classe d'équivalence + test aux limites** :

- Par classe d'équivalence : ✔ réduction du nombre de cas de test ; ✗ choix des classes délicat.
- Aux limites : ✔ production de tests de conformité et de tests de robustesse ; ✗ explosion combinatoire des données de test.
- Inconvénient majeur : caractère intuitif ou subjectif de la partition en classes et de la notion de limite. Difficulté pour caractériser la couverture des tests.

<details>
<summary>Exercice — recherche dichotomique — Correction</summary>

Algorithme : recherche dichotomique dans une table d'entiers. `R := Recherche(Tab, taille, v)`. On suppose que la fonction reçoit un tableau d'entiers ordonné et une valeur v entière. Préparer un jeu de test en prenant en considération les classes d'équivalence et les tests aux limites.

- Table vide : Tab=nil ; taille=0 ; v=17 / R=-1
- Table ne contenant qu'une valeur égale à la valeur cherchée : Tab=17 ; taille=1 ; v=17 / R=1
- Table ne contenant qu'une valeur différente de la valeur cherchée : Tab=17 ; taille=1 ; v=0 / R=-1
- Table de taille paire, la première valeur = valeur cherchée : Tab=17,23 ; taille=2 ; v=17 / R=1
- Table de taille paire, la dernière valeur = valeur cherchée : Tab=17,23 ; taille=2 ; v=23 / R=2
- Table de taille paire ne contenant pas la valeur cherchée : Tab=17,23 ; taille=2 ; v=3 / R=-1
- Table de taille impaire, la première valeur = valeur cherchée : Tab=17,23,29 ; taille=3 ; v=17 / R=1
- Table de taille impaire, la dernière valeur = valeur cherchée : Tab=17,23,29 ; taille=3 ; v=29 / R=3
- Table de taille impaire ne contenant pas la valeur cherchée : Tab=17,23,29 ; taille=3 ; v=4 / R=-1
- Table de taille quelconque contenant la valeur cherchée : Tab=17,23,29,35,41 ; taille=5 ; v=23 / R=2

Remarque : pas exhaustif mais raisonnable.

</details>

## Test boîte blanche

Principe : étude détaillée de la logique interne et la structure du code. Effectuer des tests boîte blanche nécessite de posséder une connaissance du fonctionnement interne du code. Outils associés : graphe de flots, complexité cyclomatique.

### Graphe de flot de contrôle

- Un nœud est soit un bloc d'instructions séquentielles, soit un prédicat qui permet le transfert du contrôle.
- On ajoute un nœud d'entrée et un nœud de sortie.
- Un arc, éventuellement étiqueté par une condition booléenne, représente le transfert du contrôle entre deux nœuds.
- Ce modèle est antérieur à l'objet et lui est peu adapté : on ne peut pas représenter un appel de méthode.
- Un chemin de contrôle est une suite d'arcs entre le nœud d'entrée et le nœud de sortie.
- Une DT sensibilise un chemin si pour cette DT l'exécution suit ce chemin.

Notation : représentation du flot de contrôle, description de la structure du programme. Cercle : nœud. Flèches : arêtes ou liens. Zone délimitée par les nœuds et les arêtes : région. Nœud prédicat : un nœud contenant une condition.

### Est-il possible de faire des tests exhaustifs ?

```
for(int i=0; i<20; i++) {
  for(int j=0; j<20; j++) {
    if(exp1){...}else{...}
    if(exp2){...}else{...}
    if(exp3){...}else{...}
    if(exp4){...}else{...}
  }
}
```

Il y a environ 10^14 chemins possibles qui peuvent être exécutés dans ce programme !!! Que faire ?

### Critères de couverture

- **Couverture des instructions** : le jeu d'essai doit assurer que toute instruction élémentaire est exécutée au moins une fois.
- **Couverture des arcs du graphe de contrôle**.
- **Couverture des chemins du graphe de contrôle**.
- **Couverture des conditions** : le jeu de tests doit couvrir à vrai et à faux toutes les conditions élémentaires de toutes les conditionnelles.
- En général, il est conseillé de mélanger différents critères.
- Ce type de test structurel ne peut être réutilisé tel quel en cas de modification du code.

**Hiérarchie des critères** : nombreux critères — tous les nœuds, les arcs, tous les chemins indépendants. Ces critères ne sont pas équivalents : demandent plus de DT, détectent plus d'erreurs. On dit que le critère C1 est plus fort que le critère C2 si : toute faute détectée par C2 l'est par C1 ; toute suite de test qui passe pour C1 passe pour C2 ; un taux de couverture de X pour C1 implique un taux au moins égal à X pour C2.

#### Couverture des instructions (nœuds)

- Objectif : exécuter au moins une fois toutes les instructions du programme.
- But : détecter des instructions fautives.
- Justification : si on n'a pas testé toutes les instructions, on n'a pas testé tout le programme.

Limite : on peut exécuter toutes les instructions sans exécuter tous les cas. Exemple : `S1 ; Si C alors S2 ; S3 ;` — C = vrai satisfait le critère (S1, S2 et S3 exécutés) ; C = faux potentiellement jamais testé. Il aurait fallu couvrir les deux branches du if : « critère tous les arcs ».

#### Couverture des branches (arcs)

- Objectif : exécuter au moins une fois chaque branche.
- But : mettre en évidence des défauts dans les instructions conditionnelles ou itératives.
- Limites : `Si C1 alors S1 sinon S2 ; Si C2 alors S3 sinon S4 ;` — (C1, C2) = (F, F) et (V, V) satisfont le critère, mais (F, V) et (V, F) jamais testés.

#### Couverture du flot de contrôle (tous-les-chemins-indépendants)

- Pour prouver que des chemins sont indépendants, il suffit de trouver un arc qui n'est pas contenu dans les deux chemins.
- Le critère tous-les-chemins-indépendants vise à parcourir tous les arcs dans chaque configuration possible (et non pas au moins une fois comme dans le critère tous-les-arcs).
- Lorsque le critère tous-les-chemins-indépendants est satisfait, cela implique : le critère tous-les-arcs est satisfait, le critère tous-les-nœuds est satisfait.
- « Tous les chemins » ⊃ « tous les arcs » ⊃ « tous les nœuds ».
- Problème des boucles : chemin limite (traversée de la boucle sans itération), chemin intérieur (itération de la boucle une seule fois). Impossible à obtenir en général — test exhaustif = « tous les chemins avec toutes les valeurs possibles ».

### Tests chemin de base (technique de Tom McCabe)

Objectif : permettre au concepteur de cas de test de dériver une complexité logique, utilisée comme un guide pour la définition de l'ensemble de chemins d'exécution, et garantir l'exécution de tous les énoncés du code au moins une fois durant les tests.

- **Étape 1** : dessiner le graphe de flot pour représenter la structure de contrôle du code approprié.
- **Étape 2** : calculer la complexité cyclomatique.
- **Étape 3** : déterminer les chemins indépendants.
- **Étape 4** : préparer les cas de test pour forcer l'exécution de chaque chemin du code.

### Complexité cyclomatique

- Métrique logicielle donnant une mesure quantitative de la complexité logique.
- Nombre de chemins indépendants : la valeur calculée pour la complexité cyclomatique.
- Définition de la borne supérieure : le nombre de tests à effectuer pour s'assurer de l'exécution de toutes les instructions au moins une fois.

3 méthodes de calcul de la complexité cyclomatique :

1. Le nombre de régions du graphe de flot.
2. V(G) = E − N + 2 (N : nombre de nœuds du graphe, E : nombre d'arêtes).
3. V(G) = P + 1 (P : nombre de nœuds « conditions »).

### Couverture du flot de contrôle (tous-les-chemins-indépendants) — procédure

1. Évaluer V(G) → nombre cyclomatique (NB : e − n + 2, ou nombre de conditions simples + 1).
2. Produire une DT au hasard couvrant le maximum de nœuds de décisions du graphe.
3. Produire la DT qui modifie la valeur de vérité (donc le flot) de la première instruction de décision de la DT de la seconde étape. Recommencer l'étape 3 jusqu'à la couverture de toutes les décisions.

<details>
<summary>Exemple — fonction goodstring</summary>

```
Function goodstring(var count : integer) : boolean;
var ch : char;
begin
  goodstring := false;
  count := 0;
  read(ch);
  if ch = 'a' then
  begin
    read(ch);
    while (ch = 'b') or (ch = 'c') do
    begin
      count := count + 1;
      read(ch);
    end;
    if ch = 'x' then
      goodstring := true;
  end;
end;
```

La fonction `goodstring` est censée reconnaître toutes les chaînes de caractères (fournies caractère par caractère) commençant par le caractère `a`, suivi d'une série de `b` ou `c` (dont le nombre sera compté) et se terminant par `x`. Si la chaîne est reconnue, la fonction retourne vrai, sinon elle retourne faux.

Travail à faire : construire le graphe de flot de contrôle en décomposant les conditions multiples, puis appliquer la démarche.

Correction :

1. V(G) = 13 − 11 + 2 = 4 + 1 = 5 → 5 chemins indépendants à trouver.
2. DT normale = « abcx » → chemin sensibilisé : B1 = `{0,1,2,3,4,5,3,6,4,5,3,6,7,8,9}`.
3. On choisit la première décision de B1 (1) : elle était vraie, on choisit une DT pour l'inverser et sensibiliser B2 = `{0,1,9}`, DT = « b ». B1 et B2 sont indépendants.
4. On choisit la seconde décision de B1 (3), première itération, valeur vraie (arc(3,4)) : DT dont le second caractère est différent de b, ex DT3 = « acx » → chemin sensibilisé B3 = `{0,1,2,3,6,4,5,3,6,7,8,9}`. B1 contient `{3,4}` absent de B3 et B2 contient `{1,9}` absent de B3 : B1, B2, B3 sont indépendants deux à deux.
5. Troisième condition… (démarche similaire).

Cette technique met en évidence 5 DT : DT1 = `{abcx}`, DT2 = `{b}`, DT3 = `{acx}`, DT4 = `{ax}`, DT5 = `{aba}`. Ces DT mettent en évidence les chemins de base du graphe. NB : les DT 1, 2 et 5 suffisent à satisfaire tous-les-arcs.

</details>

## Complémentarité test fonctionnel - structurel

- Les approches structurelles détectent plus facilement les erreurs commises.
- Les approches fonctionnelles détectent plus facilement les erreurs d'omission et de spécification.
- Une difficulté du test structurel consiste dans la définition de l'Oracle de test.

## Critères d'arrêt de tests

Quand s'arrêter de tester ?

- Négatif : bugs bloquants, on n'est pas en mesure de tester la suite.
- Positif (taux de couverture) : on ne cherche pas 100% de la couverture à chaque fois (> 90% bien fait, sauf normes de sûreté très spécifiques).

Mesure et/ou estimation de la maturité du point de vue de l'usager. Choix de la couverture de tests, 3 critères de choix :

- Criticité du logiciel (normes de sûreté, imposées par le vérificateur).
- Contraintes imposées au logiciel (facteurs qualité imposés par le client : temporelles, portabilité, etc.).
- Type de logiciel (domaine : BD, réseaux, embarqué, etc.).

Taux de couverture : c'est une mesure de la couverture effective des tests. Des justifications peuvent être nécessaires. Chaque jeu de test doit augmenter la couverture de tests.

## Conclusion

- Le test vise à mettre en évidence les erreurs d'un logiciel.
- Le test est une méthode de vérification partielle de logiciels ⇒ la qualité du test dépend de la pertinence du choix des données de test.
- Pour un logiciel critique, le coût du test peut représenter plus de 40% du coût du développement.
- La mise au point d'une méthode optimale de vérification de programmes passe par une combinaison judicieuse de l'utilisation de différentes méthodes de tests statiques et dynamiques (boîte noire et boîte blanche).

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/gl-ch-test.pdf" />

</TabItem>
</Tabs>
