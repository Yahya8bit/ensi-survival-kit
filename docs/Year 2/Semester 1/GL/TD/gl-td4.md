---
sidebar_position: 4
title: "TD4 : Principes de conception (avec corrigé)"
sidebar_label: TD4 - Principes de conception
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD4 : Principes de conception

*ENSI — Matière : Génie Logiciel — Classes : II.2 — A-U : 2023-2024*

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments) — best-effort reconstruction below, see task summary. Several exercise-6 code snippets ("a.", "b.", "c.", "d." extraits de code) referenced in the correction slides are images not extracted as text; only the reasoning/justification for each choice is transcribed below. -->

## Exercice 1 : Problème de cohésion

Soit le code suivant :

```java
public static void circonferenceCercle() {
  // Lecture du rayon
  System.out.print("Entrer le rayon du cercle: ");
  double rayon = Keyboard.readDouble();
  while(Keyboard.error() || rayon < 0) {
    System.err.println("Mauvaise valeur de rayon.");
    System.out.print("Entrer le rayon du cercle: ");
    rayon = Keyboard.readDouble();
  }
  // Calcul de la circonférence
  double circonference = 2 * Math.PI * rayon;
  // Affichage de la circonférence
  System.out.println("La circonference est " + circonference);
}
```

**1.** Que fait ce code ?

<details>
<summary>Correction</summary>

Lire d'abord le rayon au clavier, contrôler la saisie afin de valider le rayon saisi et n'accepter que des valeurs nulles ou positives, calculer la circonférence et l'afficher.

</details>

**2.** Analyser et déterminer les problèmes de cohésion de la méthode ci-dessus.

<details>
<summary>Correction</summary>

- Trois tâches : lecture, calcul et affichage.
- Répétition du code.
- Problème de réutilisabilité et de maintenabilité.

</details>

**3.** Proposer une solution pour pallier ces problèmes.

<details>
<summary>Correction</summary>

Solution : fractionnement en méthodes plus cohésives et plus réutilisables.

```java
// Lit le rayon (positif) d'un cercle au clavier.
public static double lireRayon() {
  System.out.print("Entrer le rayon du cercle: ");
  double rayon = Keyboard.readDouble();
  while(Keyboard.error() || rayon < 0) {
    System.err.println("Mauvaise valeur de rayon.");
    System.out.print("Entrer le rayon du cercle: ");
    rayon = Keyboard.readDouble();
  }
  return rayon;
}

// Calcule la circonference d'un cercle de rayon donne.
public static double circonferenceCercle(double rayon) {
  return 2 * Math.PI * rayon;
}

// Affiche la circonference d'un cercle
public static void afficheCirconference(double circonference) {
  System.out.println("La circonference est " + circonference);
}
```

</details>

## Exercice 2 : Problème de couplage

Soit le code suivant :

```java
public class Triangle {
  // Colonne courante, ligne courante et nombre total de lignes
  public static int colonne, ligne, total;

  // Affiche un triangle de nbLignes lignes.
  public static void afficheTriangle(int nbLignes) {
    total = nbLignes;
    for(ligne = 0; ligne < total; ++ligne) {
      colonne = 0;
      afficheEspaces();
      afficheLettres();
      System.out.println();
    }
  }

  // Affiche les espaces au début de la ligne courante.
  public static void afficheEspaces() {
    while(colonne < ligne) {
      System.out.print(' ');
      ++colonne;
    }
  }

  // Affiche les étoiles de la ligne courante.
  public static void afficheLettres() {
    while(colonne < total) {
      System.out.print((char)('a' + ligne));
      ++colonne;
    }
  }
}
```

**1.** Que fait ce code ?

<details>
<summary>Correction</summary>

Afficher un triangle rectangle isocèle avec l'angle droit en haut, en remplissant la i-ème ligne par la i-ème lettre de l'alphabet en minuscule.

</details>

**2.** Analyser et déterminer les problèmes de couplage dans la classe ci-dessus.

<details>
<summary>Correction</summary>

- Code mal écrit avec des variables globales (statiques de classe) qui nécessite la compréhension du rôle de chaque variable.
- Solution difficilement compréhensible à cause du fort couplage :
  - `afficheEspaces()` et `afficheLettres()` dépendent des variables globales `colonne`, `ligne` et `total` ;
  - `afficheEspaces()` dépend d'`afficheTriangle()` ;
  - `afficheLettres()` dépend d'`afficheEspaces()` et d'`afficheTriangle()`.
- Ces méthodes ne sont pas réutilisables (ou presque).
- Problème de maintenabilité : le changement d'une méthode ou d'une variable affecte le comportement des autres méthodes.

</details>

**3.** Proposer une solution pour pallier ces problèmes.

<details>
<summary>Correction</summary>

Solution : écrire des méthodes indépendantes, éviter autant que possible les variables globales (statiques de classe).

```java
public class Triangle {
  // Affiche un triangle de nbLignes lignes.
  public static void afficheTriangle(int nbLignes) {
    int ligne;
    for(ligne = 0; ligne < nbLignes; ++ligne) {
      repeteCaracteres(' ', ligne);
      repeteCaracteres((char)('a' + ligne), nbLignes - ligne);
      System.out.println();
    }
  }

  // Affiche 'combien' fois le caractère c.
  public static void repeteCaracteres(char c, int combien) {
    int i;
    for(i = 0; i < combien; ++i)
      System.out.print(c);
  }
}
```

</details>

## Exercice 3 : Les principes SOLID

**1.** Un nouveau type d'indemnités de congé doit être ajouté dans un système logiciel pour les ressources humaines. Le code d'origine doit être considérablement modifié pour inclure la fonctionnalité. Quel est le principe SOLID enfreint dans cette situation ?

<details>
<summary>Correction</summary>

Le principe « Ouvert/fermé ». Justification : dans ce cas, on ne se contente pas d'étendre la classe, mais on modifie le code d'origine. Selon le principe ouvert/fermé, une classe devrait être ouverte pour l'extension, mais fermée à la modification.

</details>

**2.** Une classe dérivée implémente une méthode redéfinie en lançant une `UnsupportedOperationException`. Quel est le principe SOLID enfreint dans cette situation ?

<details>
<summary>Correction</summary>

Le principe de « Substitution de Liskov ». Justification : on est confronté à un problème d'héritage — l'implémentation de bas niveau ne se conforme pas à celle de haut niveau. Il s'agit d'une violation de la substitution de Liskov.

</details>

**3.** Si une méthode d'une classe présente de trop nombreux cas d'exécution possibles, elle est difficile à tester. Quel est le principe SOLID enfreint dans cette situation ?

<details>
<summary>Correction</summary>

Le principe de « Responsabilité Unique ». Justification : si une méthode a de nombreuses options, cela signifie qu'elle effectue plusieurs choses, et donc qu'elle a plusieurs responsabilités. Cela enfreint le principe de responsabilité unique.

</details>

**4.** Quel est le principe SOLID enfreint par le code suivant ?

<details>
<summary>Correction</summary>

Le principe « Ségrégation des interfaces ». Justification : l'interface présente plusieurs responsabilités, ce qui enfreint le principe de ségrégation des interfaces.

<!-- TODO: unclear in source, verify against original PDF — l'extrait de code référencé par cette question est une image non extraite en texte. -->

</details>

**5.** Pour quelle raison l'extrait du code suivant correspond-il au « U » dans les pratiques STUPID ?

a. Il est explicite
b. Il est impossible de tester
c. Il est inutilisable
d. Il est impossible de maintenir

<details>
<summary>Correction</summary>

Réponse : **b.** Le « U » de STUPID signifie « untestability », impossible à tester. Cet extrait de code est fortement couplé à la classe graphique et ne peut donc pas être testé indépendamment.

Analyse des réponses incorrectes :
- Réponse 1 : le code est difficile à comprendre, ambigu (mais ce n'est pas ce à quoi le « U » fait référence).
- Réponse 3 : même s'il est trop compliqué, il semble produire un résultat et est donc utilisable.
- Réponse 4 : la gestion à long terme de ce code sera difficile, mais ce n'est pas ce à quoi le « U » fait référence.

<!-- TODO: unclear in source, verify against original PDF — l'extrait de code référencé par cette question est une image non extraite en texte. -->

</details>

**6.** Quel extrait de code (de a. à d.) complète le code suivant et lui permet de se conformer au principe d'Inversion de dépendances ?

<details>
<summary>Correction</summary>

Réponse : **d.** Justification :

- ❌ Réponse a. : l'élément `Motorcycle` a introduit un nouvel ensemble de méthodes ; tout élément qui l'utilisera devra changer ses méthodes afin d'appeler ces nouvelles fonctions — ici, la classe de bas niveau pilote la classe de haut niveau.
- ❌ Réponse b. : l'élément `SelfDrivingCar` dispose des mêmes méthodes, mais n'a pas inclus `implements Driveable`, de sorte qu'il ne peut pas être remplacé par un élément `Driveable`.
- ❌ Réponse c. : la classe `Driver` doit appeler des méthodes, pour chaque véhicule, en fonction de la nature de ce dernier — elle n'utilise pas du tout d'interface pour interagir.
- ✅ Réponse d. : une classe de haut niveau (`Driver`) utilise l'interface fournie (`Driveable`).

<!-- TODO: unclear in source, verify against original PDF — les extraits de code a. à d. référencés par cette question sont des images non extraites en texte. -->

</details>

**7.** Lequel des extraits de code de a. à d. complète correctement le principe Ouvert/fermé de l'extrait du code suivant ?

<details>
<summary>Correction</summary>

Réponse : **b.** Justification (analyse des réponses incorrectes) :

- Réponse a. : aucune des classes n'implémente l'interface `Rollable`, dont a besoin la classe `Game`.
- Réponse c. : la classe `Game` a été modifiée de façon à seulement utiliser des objets `Die` — elle n'est pas ouverte à la modification si on utilise un mécanisme différent.

<!-- TODO: unclear in source, verify against original PDF — les extraits de code a. à d. référencés par cette question sont des images non extraites en texte. -->

</details>

## Exercice 4 : Couplage et cohésion — logiciel de dessin

Nous nous proposons dans cet exercice d'étudier en partie le couplage et la cohésion de la conception d'un logiciel de dessin. Ce logiciel permet à son utilisateur de dessiner ou choisir des formes géométriques, de les colorier, de les placer sur au plus un canevas et d'enregistrer le résultat dans un format graphique de son choix.

Soit le code C++ suivant :

```cpp
class Point {
  float x;
  float y;
public:
  Point(float nx, float ny) { x=nx; y=ny; }
  float getx() const { return x; }
  float gety() const { return y; }
  void colorier() { //en utilisant x et y
  }
  void dessiner() { //en utilisant x et y
  }
};

class Forme {
  Vector<Point> ens_points;
  float couleur;
public:
  float dist(Point A, Point B) {
    return sqrt(sqr(A.getx()-B.getx()) + sqr(A.gety()-B.gety()));
  }
  void ajouterForme(Forme forme) { // sans l'utilisation de ens_points
  }
  void retirerForme(Forme forme) { // sans l'utilisation de ens_points
  }
  void dessiner() { // en utilisant ens_points
  }
  void Colorier() { // en utilisant ens_points
  }
};

class Cannevas {
  Set<Forme> formes;
public:
  void ajouterForme(Forme forme) { formes.insert(forme); }
  void retirerForme(Forme forme) { formes.erase(forme); }
  void dessiner() {
    for (std::set<int>::iterator it = formes.begin(); it != formes.end(); it++)
      forme.dessiner();
  }
};
```

**1.** Préciser le(s) type(s) de couplage entre les différentes classes.

<details>
<summary>Correction</summary>

- Point - Forme : couplage entre composants.
- Forme - Cannevas : couplage entre composants.

</details>

**2.** Pour chacune des classes `Point`, `Forme` et `Cannevas`, précisez si elle est fortement cohésive. Si oui, justifiez ; sinon, proposez les modifications nécessaires afin d'améliorer la cohésion de chaque classe.

<details>
<summary>Correction</summary>

Calcul du LCOM (Lack Of Cohesion in Methods) de chaque classe :

**Classe `Point`** : Nb_attributs = 2 (x, y), Nb_méthodes = 3 (`Point()`, `getx()`, `gety()`... et 2 autres selon le diagramme biparti donné), Q = 8, P = 2×5−8 = 2 ⇒ LCOM = max(2−8, 0) = 0.

**Classe `Forme`** : Nb_attributs = 2 (ens_points, couleur), Nb_méthodes = 5 (`dist()`, `ajouterForme()`, `retirerForme()`, `dessiner()`, `Colorier()`), Q = 2, P = 2×5−2 = 8 ⇒ LCOM = max(8−2, 0) = 6.

**Classe `Cannevas`** : Nb_attributs = 1 (formes), Nb_méthodes = 3 (`ajouterforme()`, `retirerforme()`, `dessiner()`), Q = 3, P = 1×3−3 = 0 ⇒ LCOM = max(0−3, 0) = 0.

**Conclusion** :

- Classe `Point` : fortement cohésive, car son LCOM = 0.
- Classe `Cannevas` : de même, LCOM = 0, fortement cohésive.
- Classe `Forme` : LCOM > 0 ⇒ classe non fortement cohésive. Dans ce cas, nous pouvons déplacer la méthode `dist` (qui calcule la distance entre deux points) dans la classe `Point` par exemple, ainsi que `ajouterForme` et `retirerForme` qui n'utilisent pas l'attribut `ens_points`. Nous pouvons aussi déplacer l'attribut `couleur`, qui n'est utilisé dans aucune méthode de la classe `Forme`.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/gl-correction-td4.pdf" />

</TabItem>
</Tabs>
