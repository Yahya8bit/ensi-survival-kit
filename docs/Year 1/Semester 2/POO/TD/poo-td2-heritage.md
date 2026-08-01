---
sidebar_position: 2
title: Série 2 - L'Héritage en C++
sidebar_label: Série 2 - Héritage C++
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD 2 — L'héritage en C++

## Exercice n°1

Soient les deux classes C++ suivantes :

```cpp
class Rectangle
{
protected :
  void changer_largeur(int);
  void changer_longueur(int);
public:
  int largeur, longueur;
  Rectangle(int l=5, int L=10) ;
  int surface() const;
  int Perimetre();
};

class Carre : private Rectangle
{
public :
  Carre(int cote=10);
  void changer_cote(int);
};
```

1. Implémentez les classes `Rectangle` et `Carre`.
2. Corrigez le programme principal suivant :

```cpp
int main()
{
  Rectangle R;
  Carre c1, c2(13,14);
  R.longueur =10;
  R.largeur = 11;
  c1.longueur =22;
  c1.largeur = 22;
  cout << c1.surface();
  R.changer_cote(32);
  cout <<c1.Perimetre();
  cout <<R.Perimetre();
}
```

## Exercice n°2

Soit le code C++ comportant les classes A et B suivantes :

```cpp
class A
{ int x;
public:
  A ()
  { x=0;
    cout << "A par défaut" << endl;
  }
  A (int n)
  {
    x=n;
    cout << "A avec n=" << n << endl;
  }
  A (const A& a) { x = a.x;
    cout << "A par copie" << endl; }
  const A& operator= (const A& a) { x = a.x;
    cout << "affectation A" <<endl;
    return a; }
  void afficher() const {
    cout << "(x=" << x << ")" << endl; }
};

class B : public A
{
public :
  B (const A& t=A(5)) : A(t)
  {
    a = t;
    cout << "B avec A=";
    a.afficher() ;
  }
protected :
  A a;
};
```

À la suite de chaque déclaration, indiquez ce qui sera affiché.

1. `A a1;`
2. `A a2 = 2;`
3. `B b1;`
4. `B b2 = a2;`
5. `B b3(b1);`
6. `B b4(10);`

## Exercice n°3

Nous considérons dans cet exercice la classe `Animal` qui peut se spécialiser en sous-classes : `Poisson` et `Mammifère`. Chaque animal est caractérisé par un nom (chaine de caractères) et une position (un couple `(x, y)` de `double`). Chaque animal peut se déplacer et changer par conséquent sa position. La classe `Animal` peut se définir comme suit :

```cpp
class Animal {
protected:
  string nom;      // Nom de l'animal.
  double x;        // Abscisse de sa position.
  double y;        // Ordonnée de sa position.
public:
  Animal(string n="", double x1=0, double y1=0) : nom(n), x(x1), y(y1) {}
  string getNom(void) const { return nom; }
  double getX(void) const { return x; }
  double getY(void) const { return y; }
  void deplacer (float dx, float dy) { x+=dx ; y+=dy ;}
};
```

Les poissons forment une catégorie d'animaux qui sont caractérisés par un champ `profondeur` (entier long) indiquant la profondeur où vit le poisson. En se déplaçant, la position du poisson change et sa profondeur est divisée par deux. Les mammifères, d'autre part, forment une autre catégorie d'animaux qui se distinguent par le champ `vitesse` (entier long) indiquant la vitesse de déplacement. En se déplaçant, les mammifères changent de position et leur vitesse est multipliée par 10.

Pour les dauphins, appartenant à deux branches taxonomiques différentes — les poissons et les cétacés (mammifères marins) — une confusion existe souvent quant à leur nature. Nous considérons dans cet exercice que le dauphin hérite des deux classes `Poisson` et `Mammifere` précédemment mentionnées.

**Travail à faire**

1. Nous nous intéressons dans cette question aux classes `Poisson` et `Mammifere`. Sachant que chaque catégorie a ses propres caractéristiques, donnez la déclaration et l'implémentation des classes `Poisson` et `Mammifere`.
2. Nous nous intéressons maintenant à la classe `Dauphin` qui hérite à la fois des classes `Poisson` et `Mammifere`. Donnez la déclaration de cette classe (n'oubliez pas de résoudre les problèmes qui pourront éventuellement exister).

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/poo-td2-heritage.pdf" />

</TabItem>
</Tabs>
