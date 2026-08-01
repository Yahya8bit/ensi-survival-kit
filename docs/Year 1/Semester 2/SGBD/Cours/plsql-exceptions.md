---
sidebar_position: 3
title: PL/SQL — Les Exceptions
sidebar_label: Exceptions
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# PL/SQL — Les exceptions

PL/SQL permet de définir dans une zone particulière (de gestion d'exception), l'attitude que le programme doit avoir lorsque certaines erreurs définies ou prédéfinies se produisent. Une erreur survenue lors de l'exécution du code déclenche ce que l'on nomme une exception. Un certain nombre d'exceptions sont prédéfinies sous Oracle.

**Exemples :**
- `NO_DATA_FOUND` (Aucune donnée trouvée) — devient vrai dès qu'une requête renvoie un résultat vide.
- `TOO_MANY_ROWS` — l'extraction exacte ramène plus que le nombre de lignes demandé.
- `CURSOR_ALREADY_OPEN` — curseur déjà ouvert.

Le code erreur associé est transmis à la section `EXCEPTION`, pour laisser à l'utilisateur la possibilité de la gérer et donc de ne pas mettre fin prématurément à l'application.

**Exemple 1.** Écrire un programme PL/SQL qui donne le nom des personnes embauchées après le 01/01/2000 en utilisant la clause `select...into...`. Comme la requête ne ramène plus qu'une ligne, l'exception prédéfinie `TOO_MANY_ROWS` est générée et transmise à la section `EXCEPTION` qui peut traiter le cas et poursuivre l'exécution de l'application.

**Exemple 2 :**

```sql
declare
  nompers personne.nomp%type;
begin
  Select nomp into nompers from personne
  where datembp > TO_DATE('01/01/2000', 'DD/MM/YYYY');
EXCEPTION
  WHEN TOO_MANY_ROWS THEN
    DBMS_OUTPUT.PUT_LINE('Utilisez un curseur');
end;
/
```

**Déroulement d'une exception :**

```
Exception générée → Exception interceptée ?
  Oui → Exécuter les instructions de la section EXCEPTION → Interrompre correctement l'exécution
  Non → Interrompre brutalement l'exécution → Propager l'exception
```

## Les 3 types d'exceptions

- **Les exceptions prédéfinies du serveur Oracle.** Ce sont les erreurs les plus fréquentes en langage PL/SQL. Elles sont déclenchées implicitement.
- **Les exceptions non prédéfinies du serveur Oracle.** Ce sont les erreurs standards d'Oracle Server. Elles sont déclenchées implicitement.
- **Les exceptions définies par l'utilisateur.** Ce sont des conditions, définies par le programmeur, comme anormales. Elles sont déclenchées explicitement.

## Syntaxe

```sql
EXCEPTION
WHEN <exception1> [OR <exception2> OR ...] THEN <instructions>;
WHEN <exception3> [OR <exception2> OR ...] THEN <instructions>;
WHEN OTHERS THEN <instructions>;
END;
```

La section de gestion des exceptions commence avec le mot-clé `EXCEPTION`. Lorsqu'une exception se produit, un seul traitement est exécuté avant la sortie du bloc.

La section de traitement des exceptions intercepte seulement les exceptions qui sont définies ; les autres ne sont pas interceptées sauf si la clause `WHEN OTHERS` est précisée. Cette dernière permet d'intercepter les exceptions qui n'ont pas encore été traitées. C'est pour cela que `WHEN OTHERS` doit être la dernière instruction définie.

## Exceptions prédéfinies

| Exception prédéfinie | Erreur Oracle | Description |
|---|---|---|
| `ACCESS_INTO_NUL` | ORA-06530 | Assignation d'une valeur à un objet non initialisé |
| `CURSOR_ALREADY_OPEN` | ORA-06511 | Ouverture d'un curseur déjà ouvert |
| `INVALID_CURSOR` | ORA-01001 | Opération interdite sur un curseur |
| `INVALID_NUMBER` | ORA-01722 | Echec sur une conversion d'une chaine de caractères vers un type number |
| `LOGIN_DENIED` | ORA-01017 | Connexion à oracle avec un utilisateur ou un mot de passe invalide |
| `PROGRAM_ERROR` | ORA-06501 | PL/SQL a un problème interne |
| `VALUE_ERROR` | ORA-06502 | Erreur d'arithmétique, de conversion, troncature ou de limite de taille |
| `ZERO_DIVIDE` | ORA-01476 | Division par zero |

### Interception d'exceptions prédéfinies

Elle se fait en utilisant le nom standard de l'exception à l'intérieur de la section. Une seule exception à la fois est déclenchée et traitée.

**Exemple.** Écrire un bloc PL/SQL permettant de sélectionner le nom d'un employé en connaissant le montant de son salaire `sal`.
- Si le salaire entré renvoie plus d'une ligne, traiter l'exception en affichant le message « Il y a plus d'un employé avec le salaire sal ».
- Si le salaire entré ne renvoie aucune ligne, traiter l'exception en affichant le message « Aucun employé avec le salaire sal ».
- Toute autre exception sera affichée en utilisant le message « Autre erreur ».

## Exceptions définies par l'utilisateur

Les exceptions déclarées par l'utilisateur doivent être déclarées et nommées dans la partie `DECLARE` du bloc PL/SQL, déclenchées explicitement dans la section exécutable (`BEGIN`) à l'aide de l'instruction `RAISE` et traitées dans la partie `EXCEPTION`.

**Syntaxe :**

```sql
DECLARE
  nom_exception EXCEPTION;
  ...
BEGIN
  ...
  RAISE nom_exception;
  ...
EXCEPTION
  WHEN nom_exception THEN ....
END;
```

**Exemple.** Écrire un programme PL/SQL permettant de mettre à jour le nom d'un service et le valider en saisissant au préalable un numéro et un nom. Si le numéro de service saisi n'existe pas, une exception est produite et un message d'erreur s'affiche.

## Procédure raise_application_error

C'est une procédure qui permet de délivrer des messages d'erreurs définis par l'utilisateur. Elle ne peut être appelée que durant l'exécution d'un sous-programme.

**Syntaxe :**

```sql
Raise_application_error(numero_erreur, message [,{TRUE|FALSE}]);
```

- `numero_erreur` : code erreur spécifié par l'utilisateur, compris entre -20000 et -20999.
- `message` : message (chaine de caractères) défini par l'utilisateur pour l'exception.
- `TRUE` : l'erreur est rangée dans la pile des erreurs précédentes. `FALSE` (par défaut) : l'erreur remplace toutes les erreurs précédentes.

Cette procédure peut être utilisée à deux endroits :

**Dans la section exécutable :**

```sql
BEGIN
  ...
  DELETE FROM personne WHERE nump = &num;
  IF SQL%NOTFOUND THEN
    Raise_application_error(-20222, 'employe inexistant');
  END IF;
  ...
```

**Dans la section exception :**

```sql
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    Raise_application_error(-20222, 'employe inexistant');
END;
```

Les erreurs ainsi renvoyées par la procédure `Raise_application_error` seront plus cohérentes par rapport aux erreurs du serveur oracle.

## Exercice

Écrire un programme PL/SQL qui affiche le nombre d'employés qui gagnent 100d de plus ou de moins que le montant d'un salaire saisi préalablement.

S'il n'y a pas d'employés dans cette tranche de salaires, afficher un message à l'utilisateur en utilisant une exception. S'il y a au moins un employé dans cette tranche, le message doit indiquer le nombre d'employés. Traiter toute autre exception avec un message adéquat.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/plsql-exceptions.pdf" />

</TabItem>
</Tabs>
