---
sidebar_position: 1
title: PL/SQL — Exercice IF et Traitement Répétitif (Boucles)
sidebar_label: Exercice IF + Boucles
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# PL/SQL — Exercice IF et traitement répétitif

## Exercice IF

Écrire un programme PL/SQL permettant d'extraire le salaire moyen du service 20. Si la différence entre le salaire minimal de ce service et le salaire moyen est supérieure à 200, multiplier ce salaire par 2 (sans modification dans la base de données).

Afficher pour la personne concernée son nom et prénom et son salaire avant et après modification.

## Traitement répétitif

Les boucles permettent d'exécuter plusieurs fois une instruction ou une séquence d'instructions.

Il existe trois types de boucle :
- Boucle de base `LOOP`
- Boucle `WHILE`
- Boucle `FOR`

### La boucle LOOP

C'est une boucle potentiellement infinie. Au moins une des instructions du corps de la boucle doit être une instruction de sortie. Dès que la condition devient vraie (si elle le devient...), on sort de la boucle.

**Syntaxe :**

```sql
LOOP
  commandes;
  ...
  EXIT [WHEN condition];
END LOOP;
```

**Exemple.** À partir du numéro du dernier service inséré au niveau de la table `service`, utiliser une boucle pour insérer à l'aide d'un compteur (de valeur égale à 1) 3 nouveaux enregistrements de votre choix.

### La boucle WHILE

Elle permet la sortie selon une condition prédéfinie. Elle est utilisée pour répéter des instructions tant que la condition choisie renvoie `TRUE`. Si la condition renvoie la valeur `NULL`, la boucle est ignorée et l'exécution du programme reprend à l'instruction suivant la fin de la boucle.

**Syntaxe :**

```sql
WHILE <condition> LOOP
  commandes;
END LOOP;
```

**Exemple.** Faire le même exemple que le précédent en utilisant la boucle `While`.

### La boucle FOR

Ce type de boucle permet de répéter un nombre défini de fois un même traitement. Elle est utilisée pour simplifier le contrôle du nombre d'itérations. La déclaration du compteur est implicite. La syntaxe `lower_bound .. upper_bound` est obligatoire.

**Syntaxe :**

```sql
FOR <compteur> IN [REVERSE] <limite_inf> .. <limite_sup> loop
  commandes;
END LOOP;
```

**Exemple.** Supprimer les dernières lignes ajoutées suite aux deux exemples précédents.

### Règles à respecter pour la boucle FOR

- Le compteur ne doit être référencé qu'à l'intérieur de la boucle ; il n'est pas défini en dehors.
- Le compteur ne doit pas être utilisé en tant que cible d'une affectation.
- Aucune limite de boucle ne doit être `NULL`.

### Autres règles pour les boucles

- Utilisez la boucle `LOOP` lorsque ses instructions doivent s'exécuter au moins une fois.
- Utilisez la boucle `WHILE` si la condition doit être évaluée au début de chaque itération.
- Utilisez une boucle `FOR` si le nombre d'itérations est connu.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/plsql-exercice-if-boucles.pdf" />

</TabItem>
</Tabs>
