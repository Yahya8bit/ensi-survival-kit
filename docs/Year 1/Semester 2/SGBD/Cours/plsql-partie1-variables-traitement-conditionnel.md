---
sidebar_position: 1
title: PL/SQL — Structure des Blocs, Variables et Traitement Conditionnel
sidebar_label: Blocs, Variables, Conditionnel
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# PL/SQL — Structure des blocs, variables et traitement conditionnel

*hela.boukef@ensi-uma.tn — 2025/2026*

## Plan du cours

- Blocs PL/SQL : structure
- Variables
- Traitements conditionnels
- Traitements répétitifs
- Curseurs
- Exceptions
- Procédures et fonctions
- Triggers

## Structure du bloc PL/SQL

Le langage Oracle PL/SQL est :
- un langage procédural
- une extension procédurale du langage SQL

Il permet de grouper des traitements et de les soumettre au noyau en un bloc unique de traitement. Le langage SQL est non procédural alors que le PL/SQL est un langage procédural. Le PL/SQL sert à programmer des procédures, des fonctions, des triggers, des packages. Des variables permettent l'échange d'information entre les requêtes SQL et le reste du programme.

Le langage PL/SQL :
- Offre une structure de bloc pour les unités de code exécutables. La maintenance du code est facilitée avec une structure bien définie.
- Fournit des structures procédurales telles que :
  - Variables, constantes et types
  - Structures de contrôle, telles que les instructions conditionnelles et les boucles
  - Programmes réutilisables écrits une fois et exécutés plusieurs fois

Un bloc PL/SQL contient des instructions procédurales et des instructions SQL. Si on soumet un bloc PL/SQL au serveur, le moteur PL/SQL commence par analyser le bloc : il identifie les instructions procédurales et les instructions SQL. Il transmet les instructions procédurales au programme d'exécution des instructions procédurales et transmet les instructions SQL au programme d'exécution des instructions SQL. Par conséquent, toutes les instructions procédurales sont exécutées localement et seules les instructions SQL sont exécutées dans la base de données.

### Délimitation des blocs

La structure de base d'un programme PL/SQL est celle de bloc (possiblement imbriqué). La délimitation des blocs est faite avec les mots réservés :

```sql
DECLARE          -- (facultatif)
  -- Variables, curseurs, exceptions définies par l'utilisateur
BEGIN            -- (obligatoire)
  -- Instructions SQL
  -- Instructions PL/SQL
EXCEPTION        -- (facultatif)
  -- Actions à effectuer lorsque des erreurs se produisent
END;             -- (obligatoire)
```

- Le corps du programme (entre `BEGIN` et `END`) contient des instructions PL/SQL (assignements, boucles, appel de procédure) ainsi que des instructions SQL. Il s'agit de la seule partie qui soit obligatoire. Les deux autres zones, dites zone de déclaration et zone de gestion des exceptions, sont facultatives.
- Les seuls ordres SQL que l'on peut trouver dans un bloc PL/SQL sont : `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
- Les autres types d'instructions (par exemple `CREATE`, `DROP`, `ALTER`) ne peuvent se trouver qu'à l'extérieur d'un tel bloc. Chaque instruction se termine par un `;`.
- Le PL/SQL ne se soucie pas de la casse. On peut inclure des commentaires par `--` (en début de chaque ligne commentée) ou par `/* ... */` (pour délimiter des blocs de commentaires).

Ainsi :
- La partie de déclaration est optionnelle, mais chaque objet utilisé doit être déclaré : Variables, Constantes, Types, Curseurs, ...
- La partie des commandes exécutables est toujours présente. Elle est constituée de : ordres SQL, manipulations des variables, constantes, et de structures de programmation (itérations, sélections, etc.).
- La partie des exceptions est optionnelle : elle gère les exceptions et les reprises d'erreurs.

### Premiers pas en PL/SQL

Un bloc PL/SQL doit contenir au moins une instruction, et doit se terminer par un `/`.

```sql
-- Programme 1 : ERREUR — le bloc BEGIN/END est vide et non exécuté (pas de /)
Begin
End;

-- Programme 2 : ERREUR — un bloc pl/sql doit contenir au moins une instruction
Begin
End;
/
```

```sql
-- Programme 3 : ERREUR — le bloc d'exécution Begin/End est obligatoire
Declare
  Mot varchar2(20);
End;
/
```

```sql
-- Programme 4 : Affichage
Set serveroutput on   -- permet l'activation de l'affichage sur écran

Declare
  Chaine varchar2(10) := 'Bonjour';
Begin
  Dbms_output.put_line(chaine);
End;
/
```

Toute variable doit avoir été déclarée avant de pouvoir être utilisée dans la section exécutable.

## Les variables

### La section déclarative

Syntaxe :

```sql
nom_variable [CONSTANT] type [ [NOT NULL] := expression ];
```

- `nom_variable` représente le nom de la variable, composé de lettres, chiffres, `$`, `#` ou `_`. Le nom de la variable ne peut pas excéder 30 caractères, doit commencer par une lettre, n'est pas sensible à la casse et doit être déclarée avant d'être utilisée.
- `CONSTANT` indique que la valeur ne pourra pas être modifiée dans le code du bloc PL/SQL.
- `NOT NULL` indique que la variable ne peut pas être `NULL`, et dans ce cas `expression` doit être indiquée.
- `TYPE` représente le type de la variable.

Plusieurs types de variables sont manipulés par un programme PL/SQL :

**Variables PL/SQL :**
- Types scalaires recevant une seule valeur : `INTEGER`, `REAL`, `STRING`, `DATE`, `BOOLEAN` + `%TYPE` + types SQL (tous les types SQL sont utilisables en PL/SQL)
- Types composites (`%ROWTYPE`, `RECORD`)

**Variables non PL/SQL :**
- définies sous SQL*Plus (de substitution et globales), variables hôtes (déclarées dans des programmes précompilés).

Exemples :

```sql
age integer;
nom varchar2(30);
dateNaissance date;
ok boolean := true;
```

> **Rq !** Déclarations multiples interdites : `i, j integer;` n'est pas permis.

```sql
declare
  date_naissance DATE := '03/02/2008';
  compteur integer default 0;
  id char(5) not null;   -- ERREUR : une variable NOT NULL doit avoir une affectation d'initialisation
begin
  dbms_output.put_line(date_naissance||' '||compteur||' '||id);
end;
/
```

### Le type %TYPE

Référence à un type existant qui est soit une colonne d'une table (ou d'une vue), soit un type défini précédemment :

```sql
nom_variable nom_table.nom_colonne%TYPE;
nom_variable nom_variable_ref%TYPE;
```

```sql
-- Exemple 1
Declare
  idProjet projet.numproj%Type;

-- Exemple 2
Declare
  Date1 DATE;
  Date2 Date1%Type;
```

### Le type %ROWTYPE

Ce type est composé d'un ensemble de colonnes d'un enregistrement. L'enregistrement peut contenir toutes les colonnes d'une table ou seulement certaines. Il fait référence à une ligne d'une table.

```sql
Declare
  Employe personne%Rowtype;
```

Utilité :
- diminue les changements à apporter au code en cas de modification des types des colonnes de la table.
- il est aussi possible d'insérer dans une table ou de modifier une table en utilisant une variable de type `%ROWTYPE`.

**Exercice.** Créer le type `un service` composé d'un enregistrement de la table `service` et dont tous les composants sont de même type que la table `service`, avec la valeur du numéro accordé au service étant choisie par défaut et les autres valeurs quelconques. Insérer le service créé au niveau de la table `service` puis le visualiser.

### Le type RECORD

Permet de déclarer des structures de données personnalisées.

```sql
TYPE nomRecord IS RECORD
  ( nomChamp1 typeDonnées [[NOT NULL] {:= | DEFAULT} expression]
  [, nomChamp2 typeDonnées ... ] ... );
```

```sql
DECLARE
  TYPE employe IS RECORD (
    numemp NUMBER(4),
    Nomemp VARCHAR2(16),
    postemp VARCHAR2(12) := 'ingénieur'   -- initialisation par défaut
  );
  Emp1 employe;   -- déclaration d'une variable de type employe
```

**Remarque :** il est possible qu'un champ d'un `RECORD` soit lui-même un `RECORD`, ou soit déclaré avec les directives `%TYPE` ou `%ROWTYPE`.

**Exemple.** Déclarer une structure « point » composée d'une abscisse et d'une ordonnée. Afficher l'abscisse et l'ordonnée d'un point de votre choix.

### Affectation

Il existe plusieurs façons de donner une valeur à une variable :
- `:=`
- par la directive `default`
- par la directive `INTO` de la requête `SELECT`

Exemples :
- `age := 25;`
- Afficher en utilisant la variable `nompersonne` la personne ayant le numéro 7501.

### Le type Varray

```sql
TYPE nomTypeTableau IS VARRAY (taille) OF typeElements;
NomTableau nomTypeTableau;
```

### Le type Table

```sql
TYPE nomTypeTableau IS TABLE OF
  {typeScalaire | variable%TYPE | table.colonne%TYPE} [NOT NULL]
  | table.%ROWTYPE [INDEX BY BINARY_INTEGER];
nomTableau nomTypeTableau;
```

- Permet de définir et manipuler des tableaux dynamiques (car définis sans dimension initiale).
- Un tableau est composé d'une clé primaire (de type `BINARY_INTEGER`) et d'une colonne (de type scalaire, `TYPE`, `ROWTYPE` ou `RECORD`) pour stocker chaque élément.
- La plage de valeurs du type `BINARY_INTEGER` est comprise entre -2 147 483 647 et 2 147 483 647, ce qui signifie que la valeur de la clé primaire peut être négative. L'indexation ne doit pas nécessairement commencer à 1.

**Fonctions pour les tableaux :**
- `EXISTS(x)` : retourne `TRUE` si le xème élément du tableau existe.
- `COUNT` : retourne le nombre d'éléments du tableau.
- `FIRST` / `LAST` : retourne le premier/dernier indice du tableau (`NULL` si tableau vide).
- `PRIOR(x)` / `NEXT(x)` : retourne l'élément avant/après le xème élément du tableau.
- `DELETE`; `DELETE(x)`; `DELETE(x,y)` : supprime un ou plusieurs éléments du tableau.

**Exercice.** Déclarer un tableau dynamique de chaîne de caractères dont les indices -3, -2, 0 contiennent des noms de personnes ayant les numéros 7369, 7566, 7901. Afficher le premier indice, le dernier indice ainsi que le nombre d'éléments du tableau. Afficher le contenu du tableau correspondant à l'indice 0.

### Variables non PL/SQL

**Variables de substitution.** Il est possible de passer en paramètres d'entrée d'un bloc PL/SQL des variables définies sous SQL*Plus. Ces variables sont dites de substitution. On accède aux valeurs d'une telle variable dans le code PL/SQL en faisant préfixer le nom de la variable du symbole `&` (avec ou sans guillemets simples suivant qu'il s'agit d'un nombre ou pas).

```sql
ACCEPT variable [NUMBER | CHAR | DATE | BINARY_FLOAT | BINARY_DOUBLE] [PROMPT text | NOPROMPT]
```

**Exemple.** Écrire un programme qui permet de demander la saisie d'un numéro puis de l'afficher.

**Variables de session.** Il est possible de définir des variables de session (globales) définies sous SQL*Plus au niveau d'un bloc PL/SQL. La directive SQL*Plus à utiliser en dehors du bloc PL/SQL est `VARIABLE`. Dans le code PL/SQL, il faut faire préfixer le nom de la variable de session du symbole `:`. L'affichage de la variable sous SQL*Plus est réalisé par la directive `PRINT`.

**Exemple.** Déclarer une variable globale `var1`. Affecter à cette variable la somme d'un nombre `num + 5`. Afficher cette variable.

## Traitement conditionnel

### La structure IF

```sql
IF <condition> THEN commandes;
[ ELSIF <condition> THEN commandes; ]
[ ELSE commandes; ]
END IF;
```

**Exemple.** Écrire un programme qui permet d'afficher qu'une personne, selon son âge, est un enfant (avant 13 ans), est un ado (entre 13 et 18) ou un adulte (après 18 ans).

### La structure CASE

```sql
CASE [variable]
  WHEN expr1 THEN instructions1;
  WHEN expr2 THEN instructions2;
  ....
  [ELSE instructionN;]
END CASE;
```

**Exemple.** Donner en fonction de la note obtenue d'un étudiant la mention :
- Très bien si la note est > 16
- Bien si la note est entre 14 et 16
- Assez bien si la note est entre 12 et 14
- Passable si la note est entre 10 et 12

**Exercice.** Écrire un programme permettant de dire pour les personnes :
- 7501 : dans quel numéro de service elle est affectée
- 7901 : combien de personnes travaillent avec elle dans ce service
- 7902 : la moyenne des salaires de son service

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/plsql-partie1-variables-traitement-conditionnel.pdf" />

</TabItem>
</Tabs>
