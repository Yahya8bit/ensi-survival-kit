---
sidebar_position: 5
title: POO — Le Polymorphisme en C++
sidebar_label: Ch5 — Polymorphisme
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Programmation Orientée Objet — Le polymorphisme en C++

Plan : introduction, conversion d'objets et trans-typage, fonction virtuelle, fonction virtuelle pure, classe abstraite, structure polymorphe, destructeur virtuel, exemples.

## Exemple d'héritage

```
        ObjetGeo
       /    |    \
  Sphere   Cube  Cylindre
```

- `ObjetGeo` : super-classe ou classe de base — classe très générale.
- `Sphere`, `Cube`, `Cylindre` : classes dérivées — classes plus spécifiques.

## Conversion d'objets

**Un objet de la classe dérivée peut être converti implicitement en un objet de la classe de base.**

```cpp
ObjetGeo UnObjet;
Cube MonCube;
UnObjet = MonCube;
```

```cpp
class A {
protected: int i;
public: int f() { return (2*i); }
};
class B : public A {
  int j;
public: int f() { return (i*j); }
};

A a; a.f();
B b; b.f();
a = b;      // seule la « partie A » de b est copiée dans a
a.f();      // appelle A::f() sur cette partie A
```

**Un pointeur (ou une référence) sur un objet de la classe dérivée peut être converti implicitement en un pointeur de la classe de base — c'est l'`upcasting`.**

```cpp
Cube monCube;
ObjetGeo & obj = monCube;

ObjetGeo * PtrObjet;
PtrObjet = new Cube;
```

**Une conversion de la classe de base vers la classe dérivée n'est PAS autorisée** (downcasting implicite interdit) :

```cpp
ObjetGeo MonObjet;
Cube MonCube;
MonCube = MonObjet;   // ERREUR
```

En cas de besoin, il faut créer la surcharge de l'opérateur `=(const ObjetGeo &)` dans la classe `Cube`, qui copie la partie commune et initialise la partie spécifique.

## Que se passe-t-il ?

Un pointeur d'une classe de base peut pointer/référencer une instance dynamique de la classe dérivée (`PtrObjet` pointe vers un espace mémoire de type `Cube`) → c'est le **polymorphisme** (« plusieurs formes »).

À partir du pointeur `PtrObjet`, on ne peut accéder qu'à l'**interface publique** de la classe `ObjetGeo`. Si la classe dérivée redéfinit les méthodes de la classe de base, doit-on invoquer les méthodes de la classe dérivée ou de la classe de base ? **Deux cas : sans virtualité ou avec virtualité.**

## Fonction virtuelle

La fonction **virtuelle** est utilisée pour permettre l'utilisation d'objets de façon appropriée dans un programme où le type des objets n'est pas connu à la compilation. Le mot-clé `virtual` indique que la fonction peut avoir différentes versions pour les différentes classes dérivées. Lors de l'exécution du programme, la bonne version de la fonction est exécutée **dynamiquement** → **liaison (ligature) dynamique**.

```cpp
class ObjetGeo {
  Position P;
public:
  ObjetGeo();
  virtual void afficher();      // fonction virtuelle
};
void ObjetGeo::afficher() { cout << "Position " << P << endl; }
```

```cpp
class Sphere : public ObjetGeo {
public:
  Sphere(int r);
  void afficher();               // redéfinition de la méthode afficher()
private:
  float rayon;
};
void Sphere::afficher() {
  ObjetGeo::afficher();
  cout << "Rayon: " << rayon << endl;
}
```

```cpp
ObjetGeo *ptr;
ptr = new Sphere(7);
ptr->afficher();   // appelle Sphere::afficher() malgré le type statique ObjetGeo*
```

### Portée de la virtualité

Une fois qu'une fonction est déclarée `virtual` dans une classe de base, elle reste virtuelle dans toutes les classes dérivées de la hiérarchie — **même si elle n'y est pas explicitement re-marquée `virtual`**. En revanche, une fonction non virtuelle de la classe de base ne le devient pas automatiquement en la redéclarant `virtual` plus bas (la virtualité se propage vers le bas depuis le premier `virtual`, pas l'inverse).

## Destructeur virtuel

Un destructeur peut être défini comme virtuel. **Un constructeur, en revanche, ne peut jamais l'être.**

**Contexte :** destruction d'un objet de la classe dérivée référencé par un pointeur de la classe de base.

**Résultat :**
- Si le destructeur est **virtuel**, alors **le destructeur de la classe dérivée est appelé**, suivi de celui de la classe de base.
- **Sinon**, seul le destructeur de la classe de base est appelé — **fuite mémoire potentielle** pour la partie spécifique de l'objet dérivé.

```cpp
ObjetGeo *OB = new Cube();
delete OB;
```

```cpp
// avec destructeur virtuel : le destructeur de Cube est appelé en premier,
// puis celui de ObjetGeo
class ObjetGeo { public: virtual ~ObjetGeo(); };
class Cube     { public: ~Cube(); };
```

```cpp
// sans destructeur virtuel : seul le destructeur de ObjetGeo sera appelé
class ObjetGeo { public: ~ObjetGeo(); };
class Cube     { public: ~Cube(); };
```

## Fonction virtuelle pure et classe abstraite

Certaines classes représentent des concepts abstraits pour lesquels des objets ne peuvent jamais exister. *Exemple : un objet géométrique ne peut exister sans savoir comment sa forme est représentée.*

On déclare des **fonctions virtuelles pures** avec un initialisateur `= 0`. **Une classe qui possède une fonction virtuelle pure est une classe abstraite et ne peut donc jamais être instanciée.** Les classes dérivées implémentent à leur niveau ces fonctions.

```cpp
class ObjetGeo {
  ...
public:
  virtual float volume() = 0;   // fonction virtuelle pure
protected:
  Position P;
};

class Cube : public ObjetGeo {
  float Larg, Long, Haut;
public:
  float volume() { return (Larg * Long * Haut); }
};

class Sphere : public ObjetGeo {
  int rayon;
public:
  float volume() { return ((4/3) * rayon^3 * PI); }
};
```

## Classe abstraite

Une classe abstraite sert à **factoriser** ; elle joue le rôle d'une **interface commune** à plusieurs implémentations.
- La classe abstraite **ne peut pas** être passée en paramètre comme objet statique.
- Elle **peut** cependant être passée par pointeur ou par référence (c'est même la base du polymorphisme).
- **Attention !** Les sous-classes d'une classe abstraite doivent implémenter ces fonctions virtuelles pures, sinon elles deviennent elles-mêmes abstraites.

### Exemple : recherche dans une table

```
                    TABLE
        /             |              \
  TABLE INDEXE  TABLE SEQUENTIELLE  ARBRE BINAIRE
                   /      |       \
              TABLEAU  LISTE CHAINEE  FICHIER D'ENREGISTREMENT
```

Les variantes d'implémentation d'une même abstraction (`TABLE`) donnent lieu à une classe abstraite plus des classes dérivées.

| | Tableau | Liste chaînée | Fichier séquentiel |
|---|---|---|---|
| Début de la recherche (`Position_initiale`) | `i = 1` | `l = tête` | `ouvrir` puis `Lecture` |
| Avancer (`Avancer`) | `i = i + 1` | `l = l.suivant` | `lire(enreg)` |
| Comparaison (`Trouvé`) | `t[i] == x` | `l.valeur == x` | `Enreg == X` |
| Fin de parcours (`Épuisé`) | `i > taille` | `l == null` | `Eof` |

```cpp
class Table {
public:
  bool rechercher(X x);
  virtual void demarrer() = 0;
  virtual void avancer() = 0;
  virtual bool trouve() = 0;
  virtual bool fin() = 0;
};

bool Table::rechercher(X x) {
  demarrer();
  while (!fin() && !trouve(x)) avancer();
  return (!fin());
}

class Tableau : public Table {
  X t[MAX];
public:
  void demarrer(); void avancer(); bool trouve(); bool fin();
};

class Liste : public Table {
  struct element { X valeur; element * suivant; } * tete;
public:
  // demarrer(); avancer(); trouve(); fin();
};
```

```cpp
Table * T;
T = new Tableau(/* ... */);   // ou new Liste(/* ... */)
T->rechercher(x);             // appel polymorphe, résolu selon le type réel de T
```

## Structure polymorphe

= collection d'objets d'une classe de base comportant des méthodes virtuelles.

```cpp
ObjetGeo *Tab[N];
// Tab est rempli d'objets de type Sphere et/ou Cube

float Somme = 0;
for (i = 0; i < N; i++)
  Somme += Tab[i]->volume();   // le bon volume() est appelé selon le type réel
```

## L'opérateur `typeid`

L'opérateur `typeid` permet de connaître le type d'un objet lors de l'exécution — on parle de **RTTI** (Run-Time Type Information).

```cpp
ObjetGeo *Tab[N];
int nbCube = 0;
for (i = 0; i < N; i++)
  if (typeid(Tab[i]) == typeid(Cube)) nbCube++;
```

> **Attention :** il faut éviter le plus possible d'utiliser cet opérateur — c'est un signe que le polymorphisme n'est pas exploité correctement.

**Mieux : préférer une méthode virtuelle redéfinie plutôt que `typeid`.**

```cpp
class ObjetGeo {
public:
  virtual bool estCube() { return false; }
};
class Cube : public ObjetGeo {
public:
  bool estCube() { return true; }
};

int main() {
  ObjetGeo *Tab[N];
  int nbCube = 0;
  for (i = 0; i < N; i++)
    if (Tab[i]->estCube()) nbCube++;
}
```

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/poo-ch5-polymorphisme.pdf" />

</TabItem>
</Tabs>
