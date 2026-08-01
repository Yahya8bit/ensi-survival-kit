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

<details>
<summary>Correction</summary>

L'énoncé original ne peut pas compiler tel quel : `largeur`/`longueur` sont déclarés `public` mais leurs mutateurs `changer_largeur`/`changer_longueur` sont `protected` (donc inaccessibles depuis `main`), et `Carre` hérite de `Rectangle` en `private`, ce qui rend `surface()` et `Perimetre()` inaccessibles depuis un objet `Carre`, et le constructeur `Carre(int)` ne correspond pas à l'appel `c2(13,14)`. La correction encapsule `largeur`/`longueur` (`protected`) avec de vrais accesseurs publics (`setLargeur`, `setLongueur`), et documente dans `main.cpp` chaque erreur du programme original.

**Rectangle.h**

```cpp
#ifndef RECTANGLE_H
#define RECTANGLE_H

class Rectangle

{

public :

void setLargeur(int);
void setLongueur(int);

protected:

int largeur, longueur;

public:

Rectangle(int l=5, int L=10) ;
int surface() const;
int Perimetre();

};

#endif // RECTANGLE_H
```

**Rectangle.cpp**

```cpp
#include "Rectangle.h"

void Rectangle::setLargeur(int l){
    largeur=l;
}
void Rectangle::setLongueur(int L){
    longueur=L;
}

Rectangle::Rectangle(int l, int L):largeur(l), longueur(L){
}
int Rectangle::surface() const{
    return (largeur*longueur);
}
int Rectangle::Perimetre(){
    return ((largeur+longueur)*2);
}
```

**Carre.h**

```cpp
#ifndef CARRE_H
#define CARRE_H

#include "Rectangle.h"

class Carre : public Rectangle

{

public :

Carre(int cote=10);
void changer_cote(int);

};


#endif // CARRE_H
```

**Carre.cpp**

```cpp
#include "Carre.h"

Carre::Carre(int cote):Rectangle(cote, cote){

}
void Carre::changer_cote(int cote){
    largeur =cote;
    longueur = cote;
}
```

**main.cpp**

```cpp
#include "Rectangle.h"
#include "Carre.h"
#include <iostream>

using namespace std;

int main()

{

Rectangle R;

Carre c1, c2(13); //error: no matching function for call to Carre:Carre(int, int)
R.setLongueur(10);     //R.longueur=10; violation du principe de l'encapsulation

R.setLargeur (11);     //R.largeur=11; violation du principe de l'encapsulation

c1.changer_cote (22);     //c1.longueur = 22 error: int Rectangle::longueur is inaccessible within this context

/*c1.largeur = 22;*/         //c1.largeur = 22 error: int Rectangle::largeur is inaccessible within this context

cout << c1.surface()<<endl;;   //error1: int rectangle::surface() const is inaccessible within this context
                              //error2: Rectangle is not an accessible base of "Carre"
R.setLongueur(32);            //error: Class rectangle has no member named 'changer_cote ==> il faut appeler le setter de rectangle
cout <<c1.Perimetre()<<endl;;  //error: int Rectangle::perimetre() is inaccessible within this context
                               //error2: Rectangle is not an accessible base of "Carre"
cout <<R.Perimetre();

}
```

</details>

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

<details>
<summary>Correction</summary>

Le problème est un cas d'**héritage répété (diamant)** : `Dauphin` hérite à la fois de `Poisson` et de `Mammifere`, qui héritent tous deux de `Animal`. Sans précaution, `Dauphin` contiendrait deux sous-objets `Animal` distincts. La solution consiste à faire hériter `Poisson` et `Mammifere` de `Animal` en **héritage virtuel** (`virtual public Animal`), afin qu'une seule copie de `Animal` soit partagée — construite une seule fois, par la classe la plus dérivée (`Dauphin`).

**Animal.h**

```cpp
#ifndef ANIMAL_H
#define ANIMAL_H

#include <string>
using namespace std;

class Animal{
    protected:
        string name;
        double x, y;
    public:
        Animal(string n="", double x1=0, double y1=0);
        string getName(void) const;
        double getX (void) const;
        double getY (void) const;
        void deplacer (float, float);
};
#endif // ANIMAL_H
```

**Animal.cpp**

```cpp
#include "Animal.h"
#include <iostream>
using namespace std;

Animal::Animal(string n, double x1, double y1): name(n), x(x1),y(y1){
    cout << "Je suis un Animal" <<endl;
}
string Animal::getName(void) const {
    return name;
}
double Animal::getX (void) const{
    return x;
}
double Animal::getY (void) const{
    return y;
}
void Animal::deplacer (float dx, float dy){
    x+=dx;
    y+=dy;
    cout << "Animal " << name << " se deplace en (" << x << "," << y << ")"<<endl;
}
```

**Poisson.h**

```cpp
#ifndef POISSON_H
#define POISSON_H

#include "Animal.h"
#include <string>
using namespace std;

class Poisson: virtual public Animal{    //évite deux copies de Animal dans Dauphin
    protected:
        long profondeur;
    public:
        Poisson(string n="", double x1=0, double y1=0, long p=0);
        void deplacer (float, float);
        long getProfondeur()const;
};
#endif // POISSON_H
```

**Poisson.cpp**

```cpp
#include "Poisson.h"
#include <iostream>
#include <string>
using namespace std;

Poisson::Poisson(string n, double x1, double y1, long p)
        : Animal(n, x1, y1), profondeur(p) {
            cout << "Je suis un Poisson" <<endl;
        }

void Poisson::deplacer(float dx, float dy){
    Animal::deplacer(dx, dy);
    profondeur /=2;
    cout << " -> Poisson profondeur: " << profondeur << endl;
}

long Poisson::getProfondeur()const {
    return profondeur;
}
```

**Mammifere.h**

```cpp
#ifndef MAMMIFERE_H
#define MAMMIFERE_H

#include "Animal.h"
#include <string>

using namespace std;
class Mammifere: virtual public Animal{    //évite deux copies de Animal dans Dauphin
    protected:
        long vitesse;
    public:
        Mammifere (string n="", double x1=0, double y1=0, long v=0);
        void deplacer (float, float);
        long getVitesse () const;

};
#endif // MAMMIFERE_H
```

**Mammifere.cpp**

```cpp
#include "Mammifere.h"
#include <string>
#include <iostream>
using namespace std;

Mammifere::Mammifere (string n, double x1, double y1, long v)
           : Animal (n, x1, y1), vitesse(v){
               cout << "Je suis un mammifère" <<endl;
           }

void Mammifere::deplacer (float dx, float dy){
    Animal::deplacer(dx, dy);
    vitesse *=10;
    cout << " -> Mammifere vitesse: " << vitesse << endl;
}
long Mammifere::getVitesse () const {
    return vitesse;
}
```

**Dauphin.h**

```cpp
#ifndef DAUPHIN_H
#define DAUPHIN_H

#include "Poisson.h"
#include "Mammifere.h"
#include <string>

using namespace std;

class Dauphin: public Poisson, public Mammifere { //Diamant d'héritage==> Solution ajouter virtual dans l'héritage: Déja fait

    public:
        Dauphin (string n="", double x1=0, double y1=0, long p=0, long v=0);  //Une base virtuelle est construite une seule fois, par la classe la plus dérivée.
        void deplacer (float, float);
};
#endif // DAUPHIN_H
```

**Dauphin.cpp**

```cpp
#include "Dauphin.h"
#include <string>
#include <iostream>

using namespace std;

Dauphin::Dauphin(string n, double x1, double y1, long p, long v)
        : Animal (n, x1, y1), Poisson (n, x1, y1, p), Mammifere (n, x1, y1, v){
            cout << "Je suis un Dauphin"<<endl;
        }

void Dauphin::deplacer(float dx, float dy){
    Animal::deplacer(dx, dy);
    profondeur /=2;
    vitesse *= 10;
    cout << " -> Dauphin profondeur: " << profondeur
             << " vitesse: " << vitesse << endl;
}
```

> Comme `Animal` est une base **virtuelle** partagée par `Poisson` et `Mammifere`, c'est la classe la plus dérivée (`Dauphin`) qui est responsable de l'initialiser directement — d'où l'appel explicite à `Animal(n, x1, y1)` dans la liste d'initialisation du constructeur de `Dauphin`, en plus des appels à `Poisson(...)` et `Mammifere(...)`.

**main.cpp**

```cpp
#include "Animal.h"
#include "Poisson.h"
#include "Mammifere.h"
#include "Dauphin.h"
#include <string>
#include <iostream>

using namespace std;

int main()
{
   Dauphin d ("Flipper",0 ,0, 100, 5);
   d.deplacer (10, 20);
   cout << "Nom: " <<d.getName()<<endl;
   cout << "Position: ("<<d.getX()<<" , "<<d.getY()<<")"<<endl;
   cout << "Profondeur: " <<d.getProfondeur()<<endl;
   cout << "Vitesse: " <<d.getVitesse()<<endl;
    return 0;
}
```

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/poo-td2-heritage.pdf" />

</TabItem>
</Tabs>
