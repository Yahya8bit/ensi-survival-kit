---
sidebar_position: 4
title: POO — L'Héritage en C++
sidebar_label: Ch4 — Héritage
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Programmation Orientée Objet — L'héritage en C++

Plan : concept & principe, visibilité entre héritier, redéfinition des méthodes, constructeurs & destructeurs, type d'héritage, héritage multiple.

## 1. Concept & principe

**Étendre un type abstrait** = mettre à jour ses services et/ou ses comportements. L'héritage est un mécanisme permettant de :
- ajouter de nouvelles fonctionnalités à une classe existante ;
- changer un peu le comportement de certaines méthodes d'une classe déjà existante,

**sans rien changer à la classe déjà existante.** On définit donc une nouvelle classe qui **hérite** de la classe existante. En C++, on parle de **classe de base** et de **classe dérivée**.

Une classe dérivée **hérite** les attributs et les méthodes de la classe de base (à l'exception de quelques-unes, par exemple les méthodes amies). Mais une classe dérivée peut **redéfinir** une méthode de la classe de base : c'est cette méthode redéfinie qui sera appelée pour un objet de cette classe, et non la méthode originale de la classe supérieure — elle **masque** la méthode de la classe de base.

### Exemple

```cpp
class Employe {
public:
  Employe(std::string nom_employe, double salaire_initial);
  void setSalaire(double nouveau_salaire);
  double getSalaire() const;
  std::string getNom() const;
private:
  string nom;
  double salaire;
};
```

```cpp
class Directeur : public Employe {          // héritage
public:
  Directeur(std::string nom_employe, double salaire_initial);
  void ajouterEmploye(Employe* employe);    // nouvelle méthode
  Employe getEmploye(std::string& nom) const;
private:
  std::vector<Employe*> employes_supervises; // attribut spécifique à l'héritier
};
```

```cpp
Employe P1("Ali", 100), P2("Hédi", 120), P3("Amira", 110);
Directeur D("Salah", 130);
D.ajouterEmploye(&P1);
D.ajouterEmploye(&P2);
```

### Remarques

- **L'héritage est une relation de type « est un » (« is a »).** `Directeur` est une classe dérivée de `Employe` → tout directeur est un employé, ce qui est conforme à l'intuition.
- Il ne faut pas confondre l'héritage avec l'**agrégation** (ou la composition). Il pourrait être tentant d'utiliser l'agrégation au lieu de l'héritage — le résultat peut paraître équivalent techniquement, mais il s'agit de deux concepts très différents : **héritage = spécialisation ≠ composition = utilisation**.

### Exemple 2 : un point coloré est un point

```cpp
class point {
  int x, y;
public:
  void initialise(int, int);
  void deplace(int, int);
  void affiche();
};

class pointcol : public point   // pointcol dérive de point
{
  short couleur;
public:
  void colore(short cl) { couleur = cl; }
};
```

```cpp
int main() {
  pointcol p;
  p.initialise(10, 20);
  p.colore(5);
  p.affiche();     // Je suis en 10 20
  p.deplace(2, 4);
  p.affiche();     // Je suis en 12 24
}
```

Chaque objet de type `pointcol` peut faire appel aux méthodes publiques de `pointcol` (ici `colore`) **et** aux méthodes publiques de la classe de base `point` (ici `initialise`, `deplace`, `affiche`).

## Type d'héritage

Il existe trois types d'héritage : `public`, `private` et `protected`. Le type d'héritage est spécifié après le symbole `:` :

```cpp
class Clock : public Horloge
```

**Par défaut, le type d'héritage est privé** : `class Clock : Horloge` équivaut à `class Clock : private Horloge`. Le type d'héritage **conditionne la visibilité des héritiers**.

### Héritage public

```cpp
class ClasseDerivee : public ClasseBase
```

| Classe de base | Classe dérivée |
|---|---|
| `private` | inaccessible |
| `protected` | `protected` |
| `public` | `public` |

Les attributs `private`, `protected` et `public` de la classe de base restent les mêmes pour la classe dérivée.

### Héritage protected

```cpp
class ClasseDerivee : protected ClasseBase
```

| Classe de base | Classe dérivée |
|---|---|
| `private` | inaccessible |
| `protected` | `protected` |
| `public` | `protected` |

Les attributs `public` de la classe de base deviennent protégés pour la classe dérivée.

### Héritage privé

```cpp
class ClasseDerivee : private ClasseBase
```

| Classe de base | Classe dérivée |
|---|---|
| `private` | inaccessible |
| `protected` | `private` |
| `public` | `private` |

Tous les attributs de la classe de base deviennent `private` pour la classe dérivée.

### Récapitulatif — droits d'accès sur les membres hérités

| Accès aux données \ mot-clé d'héritage | `public` | `protected` | `private` |
|---|---|---|---|
| `public` | `public` | `protected` | `private` |
| `protected` | `protected` | `protected` | `private` |
| `private` | inaccessible | inaccessible | inaccessible |

**Exemple :**

```cpp
class A {
private: int i;
public: int j;
protected: int k;
};

class B : public A {
public:
  void f() {
    i = 0;  // ERREUR — i est privé dans A, inaccessible même dans B
    j = 0;  // OK
    k = 0;  // OK — k est protected, accessible dans la classe dérivée
  }
};
```

```cpp
void main() {
  A a;
  a.i = 0;   // ERREUR (private)
  a.j = 0;   // OK (public)
  a.k = 0;   // ERREUR (protected, inaccessible hors de la hiérarchie)

  B b;
  b.i = 0;   // ERREUR
  b.j = 0;   // OK (resté public via héritage public)
  b.k = 0;   // ERREUR (protected)
}
```

## 2. Visibilité entre héritiers

Lors de l'héritage public, les attributs **privés** de la classe de base deviennent **inaccessibles** pour les classes dérivées → il faut utiliser les **méthodes publiques** de la classe de base pour y accéder. Les attributs **protégés** de la classe de base sont accessibles par les classes dérivées, mais pas par les clients de la classe dérivée.

**Une méthode d'une classe dérivée n'a pas accès aux membres privés de sa classe de base :**

```cpp
class pointcol : public point {
  void affichec() {
    cout << "Je suis en " << x << " " << y << "\n"; // ERREUR : x, y privés dans point
    cout << " et ma couleur est : " << couleur << "\n";
  }
};
```

```cpp
// correct : passer par les méthodes publiques de point
void pointcol::affichec() {
  affiche();   // appel de la méthode publique de la classe de base
  cout << " et ma couleur est : " << couleur << "\n";
}

void pointcol::initialisec(int abs, int ord, short cl) {
  initialise(abs, ord);
  couleur = cl;
}
```

## 3. Redéfinition des méthodes de base

Les méthodes de la classe de base peuvent être **redéfinies** dans la classe dérivée. Les méthodes redéfinies de la classe de base demeurent accessibles via l'**opérateur de résolution de portée** (`::`).

```cpp
class Clock : public Horloge {
public:
  Clock(int h, int m);
  void afficher();      // redéfinition
};

void Clock::afficher() {
  if (valh() < 12) {
    cout << "am ";
    Horloge::afficher();       // appel explicite de la version du parent
  } else {
    cout << "pm " << valh() - 12 << ":" << valm() << endl;
  }
}
```

```cpp
void main() {
  Clock H1(22, 50);
  H1.afficher();             // appelle Clock::afficher()
  H1.Horloge::afficher();    // force l'appel de la version de Horloge
}
```

### Redéfinition des membres données d'une classe dérivée

```cpp
class A { int a; char c; };
class B : public A { float a; };   // NB: a est AJOUTÉ, il ne remplace pas A::a

B b;
b.a;     // fait référence au membre a de type float de B
b.A::a;  // fait référence au membre a de type int de A
```

Le membre `a` défini dans `B` **s'ajoute** au membre `a` hérité de `A` ; il ne le remplace pas.

### Redéfinition et surdéfinition (surcharge)

Lorsqu'une fonction est redéfinie dans une classe dérivée, elle **masque** toutes les fonctions de même nom (quelle que soit leur signature) héritées de la classe de base — même si elles étaient surchargées.

```cpp
class A {
public:
  void f(int n) { ... }
  void f(char c) { ... }   // f surdéfinie dans A
};
class B : public A {
public:
  void f(float x) { ... }  // masque TOUTES les versions de f héritées de A
};

A a; B b; int n; char c;
a.f(n);   // A::f(int)
a.f(c);   // A::f(char)
b.f(n);   // B::f(float)  — alors qu'A::f(int) aurait pu convenir !
b.f(c);   // B::f(float)  — idem
```

## 4. Méthodes non héritées

Les classes dérivées **n'héritent pas** :
- des constructeurs (défaut, paramètres, copie) ;
- du destructeur ;
- de l'opérateur d'affectation ;
- des relations d'amitié.

## 5. Constructeur et destructeur

Lors de la création d'un objet d'une classe dérivée, les constructeurs sont appelés dans l'ordre suivant :
1. les constructeurs des objets attributs de la classe de base ;
2. le constructeur de la classe de base ;
3. les constructeurs des objets attributs de la classe dérivée ;
4. le constructeur de la classe dérivée.

**Les destructeurs sont appelés dans l'ordre inverse** des constructeurs.

```cpp
class A {
public:
  A() { cout << "A::A()"; }
  ~A() { cout << "A::~A()"; }
};
class B : public A {
public:
  B() { cout << "B::B()"; }
  ~B() { cout << "B::~B()"; }
};

void main() { B b; cout << "**"; }
// Affichage : A::A()  B::B()  **  B::~B()  A::~A()
```

### Transmission d'informations entre constructeurs

```cpp
class point { public: point(int, int); ~point(); };
class pointcol : public point {
public:
  pointcol(int, int, short);
  ~pointcol();
};

pointcol::pointcol(int abs, int ord, short cl) : point(abs, ord)
{
  // pointcol retransmet à point les deux premières informations reçues
}
```

```cpp
Horloge::Horloge(int h, int m) : hh(h), mm(m) {}
Clock::Clock(int h, int s) : Horloge(h, s) {}
```

### Le constructeur de recopie

Le constructeur de recopie (par défaut ou fourni explicitement) est appelé lors de :
- l'initialisation d'un objet par un objet de même type ;
- la transmission de la valeur d'un objet en argument ou en retour d'une fonction.

**Cas 1 — la classe dérivée `B` n'a pas défini de constructeur de recopie :** il y a appel du constructeur de recopie **par défaut** de `B` — la recopie se fait membre par membre. La « partie » héritée de `A` est traitée comme un membre de type `A` : le constructeur de recopie de `A` est appelé s'il existe, sinon celui par défaut.

**Cas 2 — la classe dérivée `B` a défini un constructeur de recopie :** c'est **le constructeur de recopie de `B`** qui est appelé.

### L'opérateur d'affectation non hérité

Si la classe de base définit un `operator=` mais que la classe dérivée n'en définit aucun, le compilateur appelle l'`operator=` de la classe de base pour la partie héritée, puis recopie **attribut par attribut** les attributs propres à la classe dérivée.

**Si la classe dérivée `B` n'a pas redéfini `operator=` :** l'affectation se déroule membre à membre, la « partie héritée de `A` » constituant un membre — traitée par l'`operator=` surdéfini dans `A` s'il existe, sinon par l'affectation par défaut.

**Si la classe dérivée `B` a redéfini `operator=` :** l'affectation de deux objets `B` fait **nécessairement** appel à l'`operator=` de `B` — celui de `A` n'est **pas** appelé, même s'il a été surdéfini. L'`operator=` de `B` doit donc prendre en charge tout ce qui concerne l'affectation, y compris les membres hérités de `A`.

## 6. Héritage multiple

Une classe héritière peut posséder **plusieurs classes parentes**.

```cpp
class A { public: int f() { return i; } private: int i; };
class B { public: int g() { return 2*i; } private: int j; };

class C : public A, public B {
public:
  int h();
};
```

### Problème 1 : identifiant ambigu dans deux classes parentes

Si deux classes de base définissent un identifiant de même nom (ex. `f()` dans `A` et dans `B`), il faut **redéfinir `f()` dans `C`** pour lever l'ambiguïté (et y appeler explicitement `A::f()` ou `B::f()` selon le besoin).

### Exemple : `pointcoul` hérite de `point` et de `coul`

```cpp
class point { public: point(int, int); ~point(); void affiche(); };
class coul  { public: coul(int); ~coul(); void affiche(); };

class pointcoul : public point, public coul {
public:
  pointcoul(int abs, int ord, int cl) : point(abs, ord), coul(cl) {}
  ~pointcoul();
  void affiche() { point::affiche(); coul::affiche(); }
};
```

### Problème 2 : héritage répété (diamant)

Un hydravion hérite des classes `Avion` et `Bateau`, qui héritent toutes deux de `Véhicule`. Les caractéristiques de la classe répétée (`Véhicule`) sont-elles **dupliquées** ou **fusionnées** dans `Hydravion` ?

```cpp
class A { public: int f() { return i; } };
class B : public A {};
class C : public A {};
class D : public B, public C { public: int g(); };
// Sans précaution, D contient DEUX sous-objets A distincts (dupliqués)
```

**Solution : l'héritage virtuel.**

```cpp
class B : virtual public A { ... };
class C : virtual public A { ... };
// D ne contient alors qu'UN SEUL sous-objet A (fusionné)
```

## Conclusion

Les classes dérivées sont un mécanisme simple pour définir une nouvelle classe en ajoutant des facilités à une classe existante, sans reprogrammer ni recompiler la classe de base. En utilisant les classes dérivées d'une classe existante, on définit une **interface commune** aux classes dérivées, de telle manière que les objets de ces classes dérivées sont manipulés de façon identique par certaines parties du programme → **réutilisation**. On peut ainsi utiliser l'héritage pour les besoins de généralisation et de réutilisation.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/poo-ch4-heritage.pdf" />

</TabItem>
</Tabs>
