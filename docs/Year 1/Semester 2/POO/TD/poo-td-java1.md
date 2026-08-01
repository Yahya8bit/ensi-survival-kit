---
sidebar_position: 4
title: TD1 Java - Classe Point et Classe Paire
sidebar_label: TD1 Java
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD1 Java

## Exercice n°1

Soit le programme suivant :

```java
// Fichier Point.java
class Point {
  int abscisse; int ordonnee; // deux attributs de type int
  Point(){ abscisse = 0 ; ordonnee = 0 ; } // constructeur
  void set( int u , int v ){ abscisse = u ; ordonnee = v ; } //méthode permettant de changer les coordonnées d'un point
  void translate( int u , int v ){ abscisse = abscisse + u ; ordonnee = ordonnee + v ; } // méthode permettant de translater un point
}
```

1. Ajouter à la classe `Point` la méthode `afficher`, de type de retour `void`, de sorte que `p.afficher()` affiche à l'écran l'abscisse et l'ordonnée de `p`.

2. Ajouter à la classe `Point` la méthode `origine`, de type de retour `boolean` qui teste si les coordonnées du point sont nulles. Ajouter également une méthode `egale` telle que `p.egale(q)` renvoie `true` si et seulement si les abscisses et ordonnées des points `p` et `q` sont égaux.

3. Écrire un deuxième constructeur de la classe `Point`, dont le prototype est `Point( int u , int v )` qui permet d'initialiser l'abscisse et l'ordonnée avec `u` et `v`. Écrire une seconde méthode `set`, prenant en argument un objet de la classe `Point`, et qui recopie les attributs de cet argument.

4. Ajouter à la classe `Point` une méthode `symetrie` telle que `p.symetrie()` renvoie un nouvel objet `Point` qui représente le symétrique du point `p`, dans une symétrie centrale par rapport à l'origine du repère.

5. On veut numéroter les points au fur et à mesure de leur création. On ajoute donc les variables suivantes :

```java
static int nombre ;
int numero ;
```

où l'attribut `numero` indique le numéro du point et où la variable de classe `nombre` indique combien d'objets ont été créés. Réécrire les constructeurs `Point` en conséquence. Réécrire également la méthode `afficher` pour observer la valeur de ces nouveaux attributs.

## Exercice n°2

Nous nous proposons dans cet exercice d'écrire une classe implémentant une paire d'entiers. Pour cela :

1. Définir une classe `Paire` dont le constructeur initialise les attributs privés de la paire.
2. Définir un deuxième constructeur, qui initialisera à 0 les composants de la paire.
3. Définir un troisième constructeur, qui initialisera une paire à l'aide d'une autre paire.
4. Définir des méthodes permettant d'accéder et de modifier chaque élément de la paire.
5. Enrichir la classe `Paire` d'une méthode définissant quand une paire est inférieure à une autre selon la règle lexicographique suivante : `(x1, y1) < (x2, y2)` ssi `(x1 < x2)` ou `(x1 = x2 et y1 < y2)`.
6. Définir une méthode `affiche` et une fonction `main` pour tester cette classe.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/poo-td-java1.pdf" />

</TabItem>
</Tabs>
