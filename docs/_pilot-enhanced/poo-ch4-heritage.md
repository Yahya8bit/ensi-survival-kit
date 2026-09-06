---
sidebar_position: 5
title: POO — L'Héritage en C++
sidebar_label: Ch4 — Héritage
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Programmation Orientée Objet — L'héritage en C++

:::info You will learn

- Comment définir une classe dérivée et ce qu'elle hérite de sa classe de base
- Comment le mot-clé d'héritage (`public`/`protected`/`private`) contrôle la visibilité des membres hérités
- Comment redéfinir une méthode de la classe de base, et le piège du masquage des surcharges
- L'ordre d'appel des constructeurs/destructeurs dans une hiérarchie
- L'héritage multiple et le problème du diamant
:::

## 1. Concept & principe

**Étendre un type abstrait** = mettre à jour ses services et/ou ses comportements, **sans rien changer à la classe déjà existante**. L'héritage permet d'ajouter de nouvelles fonctionnalités à une classe existante, ou de changer le comportement de certaines de ses méthodes, en définissant une nouvelle classe qui en **hérite**. En C++, on parle de **classe de base** et de **classe dérivée**.

Une classe dérivée hérite les attributs et les méthodes de la classe de base (à l'exception des méthodes amies, notamment). Elle peut aussi **redéfinir** une méthode de la classe de base : c'est alors la méthode redéfinie qui sera appelée pour un objet de cette classe — elle **masque** la méthode de la classe de base.

```cpp title="Employe / Directeur"
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

:::tip
L'héritage est une relation **« est un »** (« is a ») : `Directeur` est une classe dérivée de `Employe` → tout directeur est un employé.
:::

:::warning
Ne confonds pas l'héritage avec l'**agrégation**/composition — techniquement le résultat peut paraître équivalent, mais ce sont deux concepts différents : **héritage = spécialisation ≠ composition = utilisation**.
:::

Un second exemple, plus court, sert de fil rouge pour le reste du chapitre :

```cpp title="point / pointcol"
class point {
  int x, y;
public:
  void initialise(int, int);
  void deplace(int, int);
  void affiche();
};

class pointcol : public point {   // pointcol dérive de point
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

Un objet `pointcol` peut appeler ses propres méthodes publiques (`colore`) **et** celles de sa classe de base `point` (`initialise`, `deplace`, `affiche`).

## Choisir le type d'héritage

Il existe trois types d'héritage — `public`, `private`, `protected` — spécifiés après le `:` : `class Clock : public Horloge`.

:::warning
Par défaut, le type d'héritage est **privé** : `class Clock : Horloge` équivaut à `class Clock : private Horloge`. C'est une source d'erreur fréquente si tu oublies le mot-clé `public`.
:::

Le type d'héritage conditionne la visibilité des membres hérités :

| Héritage `public` | Classe de base | Classe dérivée |
| --- | --- | --- |
| | `private` | inaccessible |
| | `protected` | `protected` |
| | `public` | `public` |

| Héritage `protected` | Classe de base | Classe dérivée |
| --- | --- | --- |
| | `private` | inaccessible |
| | `protected` | `protected` |
| | `public` | `protected` |

| Héritage `private` | Classe de base | Classe dérivée |
| --- | --- | --- |
| | `private` | inaccessible |
| | `protected` | `private` |
| | `public` | `private` |

**Récapitulatif** — accès sur les membres hérités selon leur visibilité d'origine et le mot-clé d'héritage :

| Accès \\ mot-clé | `public` | `protected` | `private` |
| --- | --- | --- | --- |
| `public` | `public` | `protected` | `private` |
| `protected` | `protected` | `protected` | `private` |
| `private` | inaccessible | inaccessible | inaccessible |

<details>
<summary>Exemple complet (héritage public, membres public/protected/private)</summary>

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

</details>

## 2. Visibilité entre héritiers

Lors d'un héritage public, les attributs **privés** de la classe de base deviennent **inaccessibles** pour les classes dérivées — il faut passer par les **méthodes publiques** de la classe de base pour y accéder. Les attributs **protégés** restent accessibles aux classes dérivées, mais pas aux clients de la classe dérivée.

```cpp title="Accès interdit vs. correct"
// INCORRECT : x, y sont privés dans point
class pointcol : public point {
  void affichec() {
    cout << "Je suis en " << x << " " << y << "\n"; // ERREUR
    cout << " et ma couleur est : " << couleur << "\n";
  }
};

// CORRECT : passer par les méthodes publiques de point
void pointcol::affichec() {
  affiche();   // appel de la méthode publique de la classe de base
  cout << " et ma couleur est : " << couleur << "\n";
}

void pointcol::initialisec(int abs, int ord, short cl) {
  initialise(abs, ord);
  couleur = cl;
}
```

## 3. Redéfinir une méthode de la classe de base

Une méthode redéfinie dans la classe dérivée reste accessible via l'**opérateur de résolution de portée** (`::`) :

```cpp title="Clock hérite de Horloge"
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

### Redéfinir un membre donnée

```cpp
class A { int a; char c; };
class B : public A { float a; };   // NB : a est AJOUTÉ, il ne remplace pas A::a

B b;
b.a;     // fait référence au membre a de type float de B
b.A::a;  // fait référence au membre a de type int de A
```

Le membre `a` défini dans `B` **s'ajoute** au membre `a` hérité de `A` ; il ne le remplace pas.

:::danger
Redéfinir une fonction dans une classe dérivée **masque toutes** les fonctions de même nom héritées de la classe de base — même celles qui étaient surchargées, et même celles dont la signature aurait pu convenir.
:::

```cpp title="Piège du masquage de surcharge"
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

## 4. Ce qui ne s'hérite pas

Les classes dérivées **n'héritent pas** :

- des constructeurs (défaut, paramètres, copie) ;
- du destructeur ;
- de l'opérateur d'affectation ;
- des relations d'amitié.

## 5. Ordre des constructeurs et destructeurs

Lors de la création d'un objet dérivé, les constructeurs sont appelés dans l'ordre :

1. les constructeurs des objets attributs de la classe de base ;
2. le constructeur de la classe de base ;
3. les constructeurs des objets attributs de la classe dérivée ;
4. le constructeur de la classe dérivée.

Les destructeurs sont appelés dans l'**ordre inverse**.

```cpp title="Ordre d'appel"
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

### Transmettre des informations au constructeur parent

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

### Constructeur de recopie et `operator=`

Le constructeur de recopie (par défaut ou explicite) est appelé à l'initialisation d'un objet par un objet de même type, ou lors du passage/retour par valeur.

- **`B` ne définit pas de constructeur de recopie** : celui **par défaut** de `B` s'applique, membre par membre — la « partie » héritée de `A` est traitée comme un membre `A`, dont le constructeur de recopie est appelé s'il existe.
- **`B` définit un constructeur de recopie** : c'est celui de `B` qui est appelé.

:::warning
Même logique pour `operator=` : si `B` **redéfinit** `operator=`, l'affectation de deux objets `B` appelle **nécessairement** l'`operator=` de `B` — celui de `A` n'est jamais appelé, même s'il a été surdéfini. L'`operator=` de `B` doit donc gérer lui-même tout ce qui concerne l'affectation, y compris les membres hérités de `A`.
:::

## 6. Héritage multiple

Une classe héritière peut posséder **plusieurs classes parentes** :

```cpp
class A { public: int f() { return i; } private: int i; };
class B { public: int g() { return 2*i; } private: int j; };

class C : public A, public B {
public:
  int h();
};
```

### Ambiguïté de nom entre deux parents

Si deux classes de base définissent un identifiant de même nom (ex. `f()` dans `A` et dans `B`), il faut **redéfinir `f()` dans `C`** pour lever l'ambiguïté — en y appelant explicitement `A::f()` ou `B::f()` selon le besoin :

```cpp title="pointcoul hérite de point et de coul"
class point { public: point(int, int); ~point(); void affiche(); };
class coul  { public: coul(int); ~coul(); void affiche(); };

class pointcoul : public point, public coul {
public:
  pointcoul(int abs, int ord, int cl) : point(abs, ord), coul(cl) {}
  ~pointcoul();
  void affiche() { point::affiche(); coul::affiche(); }
};
```

### Le problème du diamant

Un `Hydravion` hérite de `Avion` et `Bateau`, qui héritent tous deux de `Véhicule`. Sans précaution, `Hydravion` contient **deux sous-objets `Véhicule` distincts** (dupliqués) :

```cpp
class A { public: int f() { return i; } };
class B : public A {};
class C : public A {};
class D : public B, public C { public: int g(); };
// Sans précaution, D contient DEUX sous-objets A distincts (dupliqués)
```

:::tip
La solution est l'**héritage virtuel** : en déclarant `B` et `C` comme héritant *virtuellement* de `A`, `D` ne contient plus qu'**un seul** sous-objet `A` (fusionné).
:::

```cpp
class B : virtual public A { ... };
class C : virtual public A { ... };
// D ne contient alors qu'UN SEUL sous-objet A (fusionné)
```

## Conclusion

Les classes dérivées permettent de définir une nouvelle classe en ajoutant des facilités à une classe existante, sans reprogrammer ni recompiler la classe de base. En définissant une **interface commune** aux classes dérivées, on peut manipuler leurs objets de façon identique dans certaines parties du programme → **réutilisation**.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/poo-ch4-heritage.pdf" />

</TabItem>
</Tabs>
