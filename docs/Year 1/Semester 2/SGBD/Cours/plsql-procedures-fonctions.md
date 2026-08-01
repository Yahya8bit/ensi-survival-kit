---
sidebar_position: 4
title: PL/SQL — Procédures et Fonctions
sidebar_label: Procédures et fonctions
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# PL/SQL — Procédures et fonctions

Il est possible de créer des procédures et des fonctions dans PL/SQL comme dans n'importe quel langage de programmation classique. Les procédures et fonctions sont des blocs PL/SQL nommés, appelés sous-programmes.

Contrairement aux blocs anonymes :
- Ils sont compilés une seule fois et sont stockés dans la base de données (d'où l'appellation de procédure stockée).
- Il est possible de les appeler par d'autres applications.
- Ils peuvent accepter des paramètres et, dans le cas des fonctions, doivent renvoyer des valeurs.

Toute fonction ou procédure créée devient un objet à part entière de la base (comme une table ou une vue, par exemple). Elle est souvent appelée « procédure ou fonction stockée ». Elle est donc, entre autres, sensible à la notion de droit (son créateur peut décider ou non d'en permettre l'utilisation à d'autres utilisateurs). Elle est aussi appelable depuis n'importe quel bloc PL/SQL.

## Procédures

**Syntaxe :**

```sql
CREATE [OR REPLACE] PROCEDURE <nom_procedure>
[(argument1 [mode1] type1, argument2 [mode2] type2, ...)]
IS
  <zone de déclaration de variables>
BEGIN
  <corps de la procédure>
EXCEPTION
  <traitement des exceptions>
END;
```

- `CREATE` indique que l'on veut créer une procédure stockée dans la base.
- La clause facultative `OR REPLACE` permet d'écraser une procédure existante portant le même nom.
- `nom_procedure` est le nom donné par l'utilisateur à la procédure.
- Il y a trois modes pour passer les paramètres dans une procédure : `IN` (lecture seule), `OUT` (écriture seule), `INOUT` (lecture et écriture).
  - Le mode `IN` est réservé aux paramètres qui ne doivent pas être modifiés par la procédure.
  - Le mode `OUT`, pour les paramètres transmis en résultat ; le mode `INOUT` pour les variables dont la valeur peut être modifiée en sortie et consultée par la procédure.

**Appel de la procédure :**

Soit en utilisant l'instruction :

```sql
call nom_procédure();
```

Ou bien dans un bloc PL/SQL :

```sql
BEGIN
  nom_procédure;
END;
```

**Exemple 1.** Écrire une procédure PL/SQL permettant d'extraire chaque employé du service 10 et le poste qui lui est associé sous la forme « l'employé ... a pour poste... ». Appeler cette procédure.

**Exemple 2.** Écrire une procédure PL/SQL permettant d'afficher le compte à rebours d'un nombre.

## Fonctions

**Syntaxe :**

```sql
CREATE [OR REPLACE] FUNCTION <nom_fonction>
[(argument1 [mode1] type1, argument2 [mode2] type2, ...)]
RETURN type_de_donnée
IS
  <zone de déclaration de variables>
BEGIN
  <corps de la fonction>
EXCEPTION
  <traitement des exceptions>
END;
```

La différence entre une procédure et une fonction est qu'une fonction doit renvoyer une valeur au programme appelant. L'instruction `RETURN` devra se trouver dans le corps pour spécifier quel résultat est renvoyé. La liste des arguments est facultative dans la déclaration d'une fonction.

**Appel de la fonction :**

Soit en utilisant l'instruction :

```sql
select nom_fonction() from dual;
```

Ou bien dans un bloc PL/SQL :

```sql
BEGIN
  if nom_fonction(a, b) = c then ...;
END;
```

**Exemple 1.** Écrire une fonction `nbre_emp` permettant d'indiquer le nombre total d'employés par service.

### Fonctions recevant des paramètres

**Exemple 1.** Écrire une fonction « minimum » permettant, à partir de deux nombres donnés `a` et `b`, d'afficher :
- `a` tel que `a < b`
- si `a > b`, appeler `a - b` jusqu'à ce que `a` soit inférieur à `b`

Exécuter cette fonction.

**Exemple 2.** Écrire une fonction `nbre_emp_serv` permettant d'indiquer le nombre d'employés pour un service donné. Appeler cette fonction.

**Exemple 3.** Écrire une fonction `verif_sal` permettant de déterminer si le salaire d'un employé donné est supérieur ou inférieur au salaire moyen de tous les employés de son service. La fonction renvoie `TRUE` si le salaire de l'employé est supérieur au salaire moyen des employés de son service ; sinon, elle renvoie `FALSE`. La fonction renvoie `NULL` si une exception `NO_DATA_FOUND` est générée.

Appeler cette fonction pour un employé choisi.

## Surcharge et suppression

Les procédures et fonctions PL/SQL supportent assez bien la surcharge (coexistence de procédures de même nom ayant des listes de paramètres différentes). C'est le système qui, au moment de l'appel, infère, en fonction du nombre d'arguments et de leur types, quelle est la bonne procédure à appeler.

Les procédures et fonctions sont des objets stockés. On peut, donc, les supprimer par des instructions similaires aux instructions de suppression de tables…

```sql
DROP PROCEDURE <nom_de_procedure>
DROP FUNCTION <nom_de_fonction>
```

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/plsql-procedures-fonctions.pdf" />

</TabItem>
</Tabs>
