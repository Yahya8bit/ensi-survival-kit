---
sidebar_position: 3
title: POO — Les Classes en C++ (Partie 1)
sidebar_label: Ch3 (P1) — Les Classes en C++
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Programmation Orientée Objet — Les classes en C++ (Partie 1)

Plan : déclaration et définition d'une classe, constructeur et destructeur, surcharge des opérateurs, données statiques, généricité.

## Rappels

- Une classe est une implémentation d'un type abstrait de données.
- Une classe est la généralisation de la notion de type défini par l'utilisateur, dans lequel se trouvent associées des données « **membre données** » (ou attributs) et des fonctions « **fonctions membre** » ou méthodes.
- En POO pure, les données sont **encapsulées** → leur accès ne peut se faire que par le biais des méthodes.

## Déclaration d'une classe

```cpp
// Fichier Point.h
/* ------------ Déclaration de la classe point ------------- */
class Point
{ /* déclaration des membres privés, inaccessible en dehors de la classe */
private : /* facultatif */
  int x ;
  int y ;
/* déclaration des membres publics, accessible en dehors de la classe */
public :
  void initialise (int, int) ;
  void deplace (int, int) ;
  void affiche () ;
} ;
```

- `public` et `private` peuvent apparaître plusieurs fois.
- Si aucun n'est précisé, tous les membres de la classe seront **privés** (rarement utile).
- En P.O.O pure, les données membres sont encapsulées (`private`) — en C++ vous avez le choix, mais ce n'est **pas recommandé** de les rendre publiques.

## Déclaration, définition et utilisation d'une classe

```cpp
// Fichier Point.cpp
/* ----- Définition des fonctions membres de la classe point ---- */
void Point::initialise (int abs, int ord) // Définition d'initialise qui appartient à la classe Point
{ x = abs ; y = ord ;
}
void Point::deplace (int dx, int dy)
{ x = x + dx ; y = y + dy ;
}
void Point::affiche ()
{ cout << "Je suis en " << x << " " << y << "\n" ;
}
```

```cpp
// Fichier main.cpp
/* -------- Utilisation de la classe point -------- */
int main()
{ Point a, b ; /* instanciation de la classe Point en deux objets a et b*/
  a.initialise (5, 2) ; a.affiche () ; // méthodes initialise et affiche sur l'objet a
  a.deplace (-2, 4) ; a.affiche () ;   // méthodes deplace et affiche sur l'objet a
  b.initialise (1,-1) ; b.affiche () ; // méthodes initialise et affiche sur l'objet b
}
```

**Exemple :**

```cpp
class ABCD {          // déclaration de la classe ABCD
  int i,j;
public :
  int f() { return i;}
};
...
void main()
{
  ABCD a;              // instanciation de la classe ABCD en un objet a
  int i = a.f();        // on applique la méthode f à l'objet a
}
```

## Protection / visibilité

```cpp
class Point
{
private :
  int x ;
  int y ;
public:
  void initialise (int, int);
  void deplace (int, int) ;
  void affiche () ;
};

int main()
{
  Point a;
  a.initialise(5,2);
  a.deplace (6, 3);
  a.affiche();
  a.x = 5; // ILLÉGAL !!! — x est privé
}
```

`public` et `private` peuvent alterner plusieurs fois dans une même classe — chaque nouveau bloc s'applique aux membres qui le suivent, jusqu'au bloc suivant :

```cpp
class Point
{
private :
  int x ;
  int y ;
public :
  void initialise (int, int) ;
  void affiche () ;
private :
  void deplace (int, int) ;   // désormais privée
} ;

int main()
{
  Point p;
  p.initialise(5,2);
  p.deplace(3,6);   // ILLÉGAL — deplace est privée
}
```

## Affectation d'objets

```cpp
class Point
{
  int x ;
public:
  int y ;
};

int main()
{
  Point a,b;
  b = a;   // recopie des valeurs des membres x et y de a
           // dans les membres x et y de b, publics ou privés
}
```

Contrairement aux structures, il n'est pas toujours possible de remplacer cette instruction par :

```cpp
b.x = a.x ;   // illégal, car x est un membre privé
b.y = a.y ;
```

**L'affectation `a = b` est toujours légale**, quel que soit le statut (public ou privé) des membres données. Elle ne viole pas le principe d'encapsulation, dans la mesure où les données privées de `b` (les copies de celles de `a`, après affectation) restent toujours inaccessibles de manière directe.

## Surcharge des méthodes

```cpp
class A {
public :
  int f() { return i;}
  void f(int val ) { i=val;}
private :
  int i;
};

int main()
{
  A a;
  a.f(10);
  cout << a.f() << "\n";   // affiche 10
}
```

## Modificateurs (setters) et accesseurs (getters)

Une méthode marquée **`const`** est un **accesseur** : elle ne doit **pas** modifier l'état de l'objet.

```cpp
class A {
public :
  int f()
  { // modifie l'attribut i,
    // f n'est PAS un accesseur
    i = 0;
    return i;}
  void f(int val)
  { // modifie l'objet i
    // f est un modificateur
    i=val;}
private :
  int i;
};
```

```cpp
int f() const
{
  i = 0;   // ERREUR de compilation : une méthode const ne peut pas modifier l'objet
  return i;
}
```

- Une fonction censée **retourner une valeur** (`int f()`) ne devrait pas modifier l'objet.
- Bonne pratique : utiliser `const` après la signature.

Le mot-clé `const`, placé après la signature d'une méthode :
- indique que celle-ci est un accesseur ;
- garantit qu'elle ne modifie pas l'état de l'objet ;
- toute tentative de modification entraîne un diagnostic de compilation.

```cpp
class A {
public:
  int getI() const {
    return i;
  }
  void setI(int val) {
    i = val;
  }
private:
  int i;
};
```

## Définition des méthodes

Deux façons différentes de définir les méthodes d'une classe : **dans la classe** ou **en dehors de la classe**.

```cpp
class A {
public :
  int f();                       // déclarée ici
  void f(int val) { i=val;}      // méthode inline par défaut (définie dans la classe)
private :
  int i;
};

int A::f()                       // spécification de contexte ::
{
  return i;
}
```

**Exemple d'imbrication de portées** :

```cpp
char c;                 // ::c
class X                 // X::
{
public:
  char c;                // X::c
  class Y                // X::Y::
  {
  public:
    void f(char e) { X t; ::c = t.X::c = c = e; }
  private:
    char c;               // X::Y::c
  };
};
```

## Le pointeur `this`

`this` peut être interprété comme un identifiant de l'objet courant. Il fait toujours référence à l'instance pour laquelle la méthode est invoquée.

```cpp
class A {
public :
  int f();
  void f(int);
private :
  int i;
};

void f(int i)   // ambiguïté de noms : i paramètre de la fonction et i attribut de la classe !
{
  return this->i = i;
}
```

```cpp
int main() {
  A a;
  a.f(10);   // this pointe vers a ; this->i = i devient : a.i = 10;
  ...
}
```

## Les opérateurs de création et de destruction des objets

```cpp
class A {
public :
  int f();
  ...
};

A * a;
a = new A;          // créer l'objet a sur le heap (équivalent conceptuel de (A*) malloc(sizeof(A)))
int i = a->f();      // appeler f sur cet objet
...
delete a;            // détruire l'objet a (équivalent conceptuel de free)

char * text;
/* création d'un tableau dynamique de 80 char sur le heap */
text = new char[80];
...
delete[] text;        // destruction du tableau — noter les [] pour un tableau
```

## Le constructeur et le destructeur

L'initialisation des attributs faite « à la main » via un modifieur (`void f(int)`) présente un **risque d'oubli**.

### Constructeur

- Une fonction membre portant le **même nom** que sa classe se nomme un **constructeur**.
- Un constructeur peut avoir des arguments mais **ne renvoie pas de valeur** (aucune indication de type, même pas `void`).
- Le constructeur est appelé **implicitement** tout juste après l'allocation de l'espace mémoire destiné à l'objet.

### Destructeur

- Une fonction membre portant le même nom que sa classe, précédé du symbole **tilde (`~`)**, se nomme **destructeur**.
- Un destructeur **ne peut pas comporter d'arguments** et **ne renvoie pas de valeur** (aucune indication de type ne doit être prévue).
- Le destructeur est appelé **implicitement** avant la libération de l'espace mémoire associé à l'objet.

### Constructeur & destructeur — objet automatique

```cpp
class A {
public :
  A();          // un constructeur de A
  A(int);       // un constructeur surdéfini de A
  ...
  ~A();          // le destructeur
  ...
};

int main()
{
  A a;                     // le constructeur de A est exécuté automatiquement par A()
  A * ptr;
  cout << "\n" << a.f();
  ...
  ptr = new A(1);           // objet dynamique
  cout << ptr->f();
  ...
  delete ptr;                // le destructeur de A est exécuté
}                              // le destructeur de A (pour a) est exécuté ici
```

`ptr = new A(1)` réalise une allocation dynamique d'espace mémoire pour un élément de type `A` et affecte son adresse au pointeur `ptr` — le constructeur `A(int)` est appelé.

### Constructeur & destructeur — objets automatiques

Les objets **automatiques** sont ceux créés par une déclaration :
- **Dans une fonction :** l'objet est créé lors de la rencontre de sa déclaration (`A a;`) ; il est détruit à la fin de l'exécution de la fonction.
- **Dans un bloc :** l'objet est créé lors de la rencontre de sa déclaration ; il est détruit lors de la sortie du bloc.

### Constructeur & destructeur — objets statiques

Les objets **statiques** sont ceux créés par une déclaration située :
- en dehors de toute fonction ;
- dans une fonction, mais assortie du qualificatif `static` (`static A a;`).

Les objets statiques sont créés **avant le début de l'exécution** de la fonction `main` et détruits **après la fin** de son exécution.

### Le corps du constructeur — liste d'initialisation

Le corps du constructeur peut être précédé par une section optionnelle introduite par `:`, spécifiquement réservée à l'**initialisation** des attributs (membres données de la classe). Il est possible de changer la valeur des attributs dans le corps du constructeur. Les attributs non initialisés dans cette section prendront une valeur par défaut dans le cas où une telle valeur existe.

```cpp
A::A(int val)
  : i(val)     // initialisation
{
  i = ...;      // affectation
}
```

> **Remarque :** on utilise `this` si le nom de l'attribut est identique au nom de l'argument.

### Constructeur par défaut

Lorsqu'on **ne définit aucun** constructeur pour une classe, le compilateur se charge de générer automatiquement un **constructeur par défaut** (minimaliste = initialisation par défaut des attributs). Si une classe contient des objets attributs, le constructeur par défaut auto-généré appelle implicitement les constructeurs par défaut de chacun de ces objets attributs.

```cpp
class A { int i; public: A() : i(10) { } };
class B { int j; public: B(int x) : j(x) { } };
class C {
  A objA;
  B objB;
};
// constructeur auto-généré équivalent (schématique) :
// C() : objA(), objB() { }
```

### Constructeur ayant un seul paramètre — conversion implicite

Un constructeur ayant un unique paramètre définit une **conversion implicite** du type du paramètre vers le type de la classe — on parle de **constructeur de conversion** (« converting constructor »).

```cpp
class A {
  int x;
public:
  A(int v) : x(v) {}
};
void f(A obj) {
  // ...
}
```

```cpp
A a = 5;       // équivalent à : A a(5);   — le compilateur transforme 5 (int) en A(5)
A a(7);        // OK, conversion explicite
A b = A(7);    // OK, conversion explicite
a = 9;         // conversion A(9) + affectation a.x = 9
f(10);         // 10 converti implicitement en A(10)
```

## Clonage des objets — le constructeur de copie

**Forme générale :**

```cpp
<id_classe> (const <id_classe> & obj) : ...
{
}
```

```cpp
A::A(const A & a)
  : i(a.i)
{
  i = ...;
}
```

```cpp
void main()
{
  A a1;
  A a2(a1);    // appel du constructeur de copie
}
```

> **Remarque :** s'il n'est pas défini, le compilateur en génère un de manière automatique (initialisation membre à membre, en invoquant le constructeur de copie de chacun des membres).

```cpp
Point (const Point& obj ) { x=obj.x ; y=obj.y; }
```

### Pourquoi un constructeur de copie explicite est parfois indispensable

Considérons une classe possédant un pointeur alloué dynamiquement :

```cpp
class Bidon
{
  double * adr ; // pointeur sur 1 élément
public :
  Bidon() // constructeur "usuel"
  { adr = new double;
    cout << "+ const. usuel - adr objet : " << this
         << " - adr : " << adr << "\n" ;
  }
  ~Bidon() // destructeur
  { cout << "- Destr. objet - adr objet : "
         << this << " - adr : " << adr << "\n" ;
    delete adr ;
  }
} ;

void fct (Bidon )
{ cout << "*** appel de fct ***\n" ;
}

main()
{
  Bidon a ;
  fct (a) ;   // a est passé par valeur : appel du constructeur de copie PAR DÉFAUT
}
```

Sans constructeur de copie défini explicitement, le constructeur **par défaut** effectue une recopie **membre à membre superficielle** : le paramètre `b` de `fct` reçoit une copie du pointeur `adr` de `a`, mais **pas** une copie de l'objet pointé — `a.adr` et `b.adr` pointent donc vers le **même** emplacement mémoire.

À la fin de l'exécution de `fct`, le destructeur `~Bidon` est appelé pour `b`, ce qui libère l'emplacement pointé par `adr`. À la fin de l'exécution de `main`, le destructeur est appelé pour `a`, ce qui tente de libérer... le **même emplacement**. Cette double libération constitue une **erreur d'exécution** dont les conséquences varient selon l'implémentation.

**Solution : définir explicitement un constructeur de copie qui alloue un nouvel espace mémoire (recopie profonde) :**

```cpp
class Bidon
{
  double * adr ;
public :
  Bidon() // constructeur "usuel"
  { ... }

  Bidon(const Bidon & v) // constructeur de recopie
  {
    adr = new double ;          // création d'un nouvel objet
    *adr = *(v.adr);            // recopie du contenu pointé
    cout << "+ const. recopie - adr objet : " << this
         << " - adr : " << adr << "\n" ;
  }

  ~Bidon() // destructeur
  { ... }
} ;
```

Chaque objet possédant désormais son **propre** emplacement mémoire, les destructions successives de `a` et `b` se déroulent sans problème.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/poo-ch3-classes-part1.pdf" />

</TabItem>
</Tabs>
