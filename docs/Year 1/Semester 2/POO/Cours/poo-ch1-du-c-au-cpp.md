---
sidebar_position: 1
title: POO — Préambule et Du C au C++
sidebar_label: Ch1 — Du C au C++
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Programmation Orientée Objet — Du C au C++

*ENSI — II1*

## Préambule

### Motivations

Jusqu'à présent, vous avez appris à écrire des programmes de plus en plus complexes. Il faut donc maintenant des moyens pour organiser ces programmes de façon plus efficace. C'est l'un des objectifs principaux de l'orienté objet.

**L'orienté objets (OO) :** «orienté objet» = organisation du logiciel comme une collection d'objets **autonomes** coopérant ensemble comprenant à la fois une structure de données et un comportement.

### Présentation du cours

- Module 45h.
- Cours
- Travaux dirigés
- Travaux pratiques

### Objectifs du cours

- Introduire le paradigme orienté objet.
- Comprendre l'intérêt et les origines de la Programmation Orientée-Objet (POO).
- Apprendre les nouveaux concepts introduits par le style de POO.
- Se familiariser avec les langages de programmation C++ et Java et apprendre à les utiliser pour programmer dans un style objet.

### Plan du cours

- Introduction
- Du C à C++
- Principes et concepts de base de l'orienté objet
- Classes -- C++
- Héritage -- C++
- Polymorphisme -- C++
- Introduction à Java
- Classes, objets et notions complémentaires en Java
- Héritage et polymorphisme en Java
- Classes abstraites et interfaces en Java
- Packages et règles de visibilité
- Exceptions
- Les entrées/sorties en Java
- Quelques classes de base en Java

### Modalités d'évaluation

- 35% CC + 65% Examen
- CC :
  - 70% Un devoir surveillé
  - 30% 2ème Note (TPs, travaux à rendre, tests)

## Introduction

### Historique

Premiers langages objets : **Simula67** et **SmallTalk** (~1967-1972). Effervescence POO dans les années 1980, âge d'or POO dans les années 1990-2000. Chronologie : Fortran (1954) → Cobol (1959) → BASIC (1964) → Simula67/SmallTalk/C (1967-1972) → Altair BASIC (1975) → C++ (Bjarne Stroustrup, 1982-1985) → Objective-C (1985) → Java (Sun Microsystems, 1995) → C# (Microsoft, 2005).

L'OO en informatique aujourd'hui :
- Quasi-totalité des applications programmées en OO (POO).
- Presque tous les langages intègrent la notion d'objet.

L'OO permet de répondre aux exigences actuelles des applications informatiques (type PC) :
- Applications conviviales et graphiques (mode « fenêtre »).
- Applications complexes.
- Réutilisation du code.
- Maintenance du code.

### Domaines d'applications

Programmation iconique, jeux, environnements de programmation, graphisme, base de données, réseaux, multimédia, intelligence artificielle, …

### Historique C++

- **1980** au laboratoire AT&T Bell (Bjarne Stroustrup). Premier nom : « C with classes » (pas de vrai compilateur C++).
- **1985** : 1ère version publique de C++. Publication du premier compilateur C++ et du premier livre C++ (*The C++ Programming Language*).
- **1995-1997** : Standardisation ANSI. Un C++ portable et cohérent.
- Un C++ multiplateforme, implémentations libres et commerciales : domaine public (environnement GNU ; GCC/G++ ⇒ monde universitaire et public), plusieurs sociétés commerciales (Microsoft Visual C++, Borland, Zortech, …).

### Présentation C++

Le C++ est une extension du C : C est inclus (à 99%) dans le C++. Le C++ ajoute :
- des notions de POO (classe, héritage, polymorphisme, ..)
- des facilités d'écriture (surcharge d'opérateurs `>>`, `<<`, …, surcharge de fonctions, …)

**Compatibilité C/C++ :**
- Principal avantage : même syntaxe de base, code C « propre » directement compilable en C++, facilité d'intégration de fichiers C++ et C dans un même programme.
- Principal inconvénient : C++ hérite de certains choix malencontreux du langage C (conversion implicite, `#define` et macro, …).

C++ = langage **objet** ET **procédural** (contrairement à Java, purement orienté objet). C++ = meilleure ET pire des choses : le meilleur, OO + efficacité du C ; le pire, richesse du langage souvent utilisée à mauvais escient. *« Things should be made as simple as possible but not any simpler »* (Albert Einstein).

## Rappel : structure d'un programme C

```c
#include <stdio.h>       // Directives du préprocesseur : accès avant la compilation
#include <monfichier.h>
#define N 3

int fonc1(int x);        // Déclaration des fonctions
int fonc2(int x);

int main(void)            // Programme principal
{
  int i;                  // Déclaration d'une variable locale
  i = 0;
  fonc1(i);
  fonc2(i);
}

int fonc1(int x) {        // Définitions des fonctions
  return x;
}
int fonc2(int x) {
  return (x * x);
}
```

- Programme source C : des directives de précompilation commençant par `#` (déclaration constantes, fonctions et types `.h`), des commentaires `/* ... */` (peuvent s'étendre sur plusieurs lignes).
- Tout programme C comporte une fonction `main()` comportant 2 parties : la déclaration de toutes les variables et fonctions utilisées, un bloc d'instructions simples (délimitée par `;`).
- Une variable est un objet manipulé par le programme, qui possède un nom et un type. Le type définit l'ensemble des valeurs possibles pour l'objet.
- Les autres fonctions sont des sous-programmes ou modules : permettent de donner un nom à un bloc de traitements réutilisable, une « boîte noire ». Toutes les fonctions sont constituées d'un en-tête et d'un bloc (corps).

### Du programme au code exécutable

Le code source (`.c`) est traité par le **préprocesseur** (retire les commentaires, gère les directives `#`), puis par le **compilateur** (génère un fichier objet `.o`, indique les erreurs de syntaxe mais ignore les fonctions-bibliothèque appelées), puis l'**éditeur de liens** (associe les fichiers objets et les bibliothèques pour produire l'exécutable, résout les références indéfinies).

**Directives de précompilation :**

```c
# include <stdio.h>    // Pour les entrées sorties
# include <stdlib.h>   // Pour les fonctions standards
# include <string.h>   // Pour la manipulation des chaînes de caractères
# include <math.h>     // Pour les fonctions mathématiques

# define MAX 100
# define PI 3.14159265358979
# define DEUX_PI 2 * PI
```

**Librairies sous Windows :** deux types — librairie statique (`.lib`, copiée dans l'exécutable) et librairie dynamique (`.dll`, partagée entre plusieurs programmes, chargée à l'exécution).

**Environnement de développement intégré (EDI/IDE) :** intègre les outils pour écrire, compiler, déboguer, tester et exécuter le code (éditer → compiler → lier → exécuter). Exemples : codeblocks, dev, visual, borland, …

## PASSAGE DU C À C++

### Les commentaires C vs C++

| C | C++ |
|---|---|
| `/* je suis un super commentaire en C et je m'étends sur plusieurs lignes printf("Gros commentaire"); */` | `// je suis un super commentaire C++ sur une ligne` |

En C++, on réserve les deux : `//` pour des indications dans le code, `/* .... */` pour désactiver certaines portions de code. `//` n'appartient qu'à C++.

### Les inclusions C vs C++

Manière classique (C) : `#include <stdio.h>`, `#include <stdlib.h>`, `#include <math.h>`, `#include <string.h>`.

En C++, il n'est plus nécessaire de spécifier l'extension sur les fichiers d'en-tête standards du C++ : `#include <iostream>`. On peut toujours utiliser les bibliothèques C en incluant les `.h`, mais il est préférable d'utiliser : `#include <cstdio>`, `#include <cstdlib>`, `#include <cmath>`, `#include <cstring>`.

### Les espaces de noms (namespaces)

**Problème :** un programme peut utiliser différentes bibliothèques de fonctions ou de types et, dans ces différentes bibliothèques, il se peut que les mêmes noms identifient des composants différents.

**Solution :** définir une unité cohérente (**namespace**) dans laquelle les déclarations des différents objets sont regroupées (types, constantes, variables, fonctions). Les identificateurs présents dans l'espace de noms possèdent alors une portée qui leur est spécifique.

```cpp
namespace Achats { /* ... */ }
namespace Ventes { /* ... */ }
namespace Stocks { /* ... */ }

void main() // livraison aux clients
{
  // [1] désignation explicite de composants appartenant à des espaces différents :
  Achats::Commande de_fourn;
  Ventes::Commande de_client;
  // [2] importation locale d'un nom de composant :
  using Ventes::Facture;
  Facture fact_client;
  // [3] mise à disposition de tous les noms d'un espace :
  using namespace Stocks;
  Article prod;
}
```

`::` est l'**opérateur de résolution de portée**.

```cpp
namespace A {
  typedef unsigned int B;
  ....
}
.... A::B i; // Utilisation du namespace: i est une variable de type B

using namespace A; // spécifier l'espace de noms par défaut
B i;
```

**Exemple — différenciation par les namespaces :**

```cpp
namespace Deb { class Pile { ... }; .... }
namespace Pro { class Pile { ... }; .... }

int main (int, char **)
{
  Deb::Pile p1; // une pile de débutant
  Pro::Pile p2; // une pile de vrai pro
}
```

`std` (« standard ») : espace de nom unique qui regroupe l'ensemble des bibliothèques standards des langages C et C++.

```cpp
// sans using
int main (int, char **) {
  char nom[64];
  std::cin >> nom;
  std::cout << "Salut " << nom << std::endl;
}

// avec using namespace std;
using namespace std;
int main (int, char **) {
  char nom[64];
  cin >> nom;
  cout << "Salut " << nom << endl;
}
```

### Les entrées/sorties : C vs C++

En C, le programme communiquait avec l'extérieur sur trois canaux : `stdin`, `stdout`, `stderr`. En C++, trois flux dédiés : le flux en entrée `cin`, le flux en sortie `cout`, le flux d'erreur `cerr`.

On utilise des opérateurs d'E/S `>>` et `<<` plutôt que les fonctions `printf()`/`scanf()`. `endl` remplace le `\n` du C (retour à la ligne). Deux syntaxes : `flot << données;` et `flot >> données;` — possibilité d'enchaîner les E/S avec les opérateurs.

```cpp
// en C :
long a;
printf("saisir a:");
scanf("%ld", &a);
printf("%ld au carre vaut %ld\n", a, a*a);

// en C++ :
long a;
cout << "saisir a :";
cin >> a; // plus de formatage ni de &
cout << a << "au carre vaut " << a*a << endl;
```

Chaque flux est en fait un objet. La sortie d'objets sur les flux de sortie (`cout`, `cerr`) se fait avec l'opérateur d'insertion `<<` ; la lecture d'objets sur le flux d'entrée (`cin`) repose sur l'opérateur d'extraction `>>`.

On peut toujours utiliser en C++ les fonctions d'E/S classiques du C (`printf`, `scanf`, `puts`, `gets`, `putc`, `getc`, ...) en incluant `stdio.h`. Les nouvelles possibilités nécessitent d'inclure `iostream` et ne nécessitent pas de FORMATAGE des données.

```cpp
#include <iostream>
using namespace std;
int main(){
  int age;
  char nom[64];
  cin >> nom;
  cin >> age;
  cout << "Coucou " << nom << ", tu as " << age << " ans" << endl;
  return 0;
}
```

Exemples `cout`/`cin` :

```cpp
cout << "BONJOUR";        // équivalent à puts("BONJOUR");
int n = 25;
cout << "Valeur: ";       // équivalent à puts("Valeur");
cout << n;                // équivalent à printf("%d",n);
cout << "Valeur:" << n;
cout << "\n ";             // pour aller à la ligne

int n;
cout << "Saisir un entier: ";
cin >> n;                  // équivalent à scanf("%d",&n);
int a, b;
cin >> a >> b;              // saisie de 2 entiers séparés par un Retour Charriot
```

### Les constantes

**Rappel :** les constantes sont des zones de stockage d'informations non modifiables. Deux types : les constantes littérales (`int Age = 18;` — `18` est la constante littérale) et les constantes symboliques (représentées par un nom).

**Création d'une constante symbolique en C :**

```c
#define nom_de_la_constante valeur_de_la_constante
#define nombre_d_eleves 15
```

Ce n'est pas une instruction en C/C++ mais une directive du préprocesseur qui effectue une substitution de texte. La constante n'a pas de type particulier (pas de vérification de type par le compilateur) et n'est pas réellement créée (la substitution se fait avant la compilation).

**Les constantes en C++ :** le C++ permet de déclarer de véritables constantes typées avec `const`, existant réellement dans l'espace des « objets » du programme : un pointeur constant, un pointeur vers une valeur constante, un pointeur constant vers une valeur constante.

```cpp
/* quelques constantes classiques en C */
#define PI 3.14
#define MOI "Etudiant II1"
#define MAX 100

/* vraies constantes classiques typées en C++ */
const float PI = 3.14;
const char MOI[] = "Etudiant II1";
const int MAX = 100;

int tab[MAX];                        // tableau statique de 100 entiers
char c;
const char *p = 't';                 // pointeur sur un caractère constant
char * const q = &c;                 // pointeur constant sur un caractère
const char * const q2 = MOI;         // pointeur constant sur un caractère constant
```

Règles :
- `const T * p = &v;` : pointeur **modifiable** `p` vers un objet **non modifiable** de type `T`.
- `T * const p = &v;` : pointeur **non modifiable** `p` vers un objet **modifiable** de type `T`.
- `const T * const p = &v;` : pointeur **non modifiable** vers un objet **non modifiable** de type `T`.
- En C++, `const` est fort : `const T` est un sous-type du type `T`.

```cpp
const int taille = 1000; // const définit une expression constante = calculée à la compilation
// Impossible de modifier taille dans la suite du programme

const char* ptr1 = "QWERTY";
ptr1++;        // OK
*ptr1 = 'A';   // KO - assignment to const type

char* const ptr2 = "QWERTY";
ptr2++;        // KO - increment of const type
*ptr2 = 'A';   // OK

const char* const ptr3 = "QWERTY";
ptr3++;        // KO
*ptr3 = 'A';   // KO
```

> **Attention :** `const int* p1 = &x;` indique que la donnée pointée par `p1` ne pourra pas être modifiée par l'intermédiaire de `p1`, pas qu'elle ne pourra jamais être modifiée (elle peut l'être via un autre pointeur non constant sur le même objet).

### Les variables : rappel

Variable : élément de mémorisation possédant un type (`int a, b;`, `float x;`, `char caractere;`) et un identificateur significatif et explicite (premier caractère = lettre, majuscules/minuscules significatifs).

**Délocalisation des déclarations (C++) :** contrairement au C où les variables devaient être déclarées en début de bloc, en C++ on peut déclarer une variable au point où on en a besoin — notamment la **variable de boucle** :

```cpp
int i = 5;
int j = 2;
for (int i = 0; i < 10; i++)   // i local à la boucle, "masque" le i externe
{
  j += i;
}
cout << i << endl; // i vaut 5 !
cout << j << endl; // j vaut 47 !
```

Cette notion de variable de boucle est généralisée à toutes les instructions de branchement : `if`, `while`, `switch` (ex. `if (double res = fct()) { .... }`).

### Les conversions de type

En C : `(type)expression`. En C++ : `type(expression)`, ou en mixant les deux : `(type)(expression)`.

```cpp
// Conversion explicite
int a; float x; char c;
a = 2;
x = (float) a;         // int → float, x=2.0
x = 2.3;
a = (int) (x+1);        // float → int, a=3 (partie décimale tronquée)
a = 98;
c = (char) a;           // int → char, c='b'
```

Une conversion `int→char`, `float→int` ou `float→char` est dite **dégradante** (perte d'information possible). Une conversion `char→int`, `int→float` ou `char→float` est dite **non dégradante** (aucune perte d'information).

### Les fonctions

Une fonction permet de remplacer une partie qui se répète et de découper un programme en parties isolées (débogage, lisibilité, etc.).

```cpp
type_fonction nom_fonction (type_arg1 arg1, …, type_argn argn) {
  ...
  return (valeur retournée);
}
```

Le nombre d'arguments est quelconque, éventuellement aucun mais il faut toujours mettre les parenthèses.

**Typage et prototypage obligatoire :** le typage des fonctions est obligatoire et a un sens fort — on ne peut pas retourner de valeur si la fonction est `void`, et on doit en retourner une sinon.

```cpp
void f(int, char*);
void f(int i, char* c);  // équivalente à la première
int f(int i) { ...return valeur; };
f();     // f ne peut pas être appelée sans arguments
f(...);  // f peut être appelée avec un nombre quelconque d'arguments
```

**Conversions de type lors d'appel à fonction :** contrairement au C, le C++ autorise dans une certaine mesure le non-respect du type des arguments — le compilateur opère alors une conversion de type.

**La surcharge (overloading) :** permet de déclarer/définir des fonctions ayant un nom identique mais une **signature différente** (le type de retour ne fait pas partie de la signature). La signature de fonction en C++ = nom + types des paramètres (en C : uniquement le nom).

```cpp
void f(int,int);     // f_int_int
void f(int,double);  // f_int_double
void f(double,int);  // f_double_int
// les 3 fonctions coexistent — erreur si on ajoute int f(int,int); (même signature)
```

La surcharge est une forme faible de **polymorphisme**, surtout utilisée pour définir plusieurs variantes du constructeur, et permet d'éviter des conversions de types indésirables lors du passage des paramètres.

**Paramètres avec valeur par défaut :** à partir du moment où un paramètre possède une valeur par défaut, tous les paramètres suivants doivent également en posséder une (contiguïté).

```cpp
void f(double x, double y=0.0, double z=0.0);
f(a);       // ~ f(a, 0.0, 0.0)
f(a, b);    // ~ f(a, b, 0.0)
f(a, b, c); // ~ f(a, b, c)
```

Ne pas rappeler les valeurs par défaut dans la définition de la fonction.

**Paramètres anonymes :** le C++ permet de déclarer des paramètres dont seul le type est spécifié dans la signature.

```cpp
int main (int, char **) { .... }   // C++ : paramètres anonymes autorisés
```

### Les fonctions inline et les macros

Une macro (C) `#define nom_macro(param1, param2, ...) expression` factorise un morceau de code sans créer de fonction (évite le coût d'un appel de fonction), mais présente des inconvénients : effets de bords désastreux si mal définies, aucun contrôle de type. L'utilisation du `#define` correspond à un copier/coller avant la compilation (ex. `carre(X+1)` avec `#define carre(a) a*a` calcule en réalité `X+1*X+1`, pas `(X+1)²`).

En C++, la fonction **`inline`** évite le recours aux macros : le compilateur remplace l'appel par le corps de la fonction quand c'est possible — sécurité d'une fonction + rapidité d'une macro.

```cpp
#define MAX(a,b) (((a)>=(b))? (a) : (b))
inline int Max (int a, int b) {return ((a>=b) ? a : b);}
```

Utilité : le mécanisme d'appel de fonction implique un overhead (calcul des arguments, empilement, saut, retour, …) — la fonction `inline` supprime cet overhead.

### Passage des paramètres

**En C**, l'association paramètre/argument se fait par **copie** de la valeur — chaque argument est une variable locale de la fonction : une fonction ne modifie donc pas les paramètres d'appel (passage par valeur).

**Passage par adresse :** pour qu'une fonction modifie un paramètre, il faut passer l'**adresse** de la variable (`&variable`) et non la variable elle-même ; dans la fonction on va chercher la variable par son adresse (`*adresse`).

### La référence (alias) — nouveauté C++

Une référence désigne un emplacement mémoire qui est l'**alias** d'une autre variable : elle est initialisée au moment de sa définition et désigne **toujours** le même emplacement mémoire (permet de s'affranchir des pointeurs). Se déclare avec `&`.

```cpp
type &nom_de_référence = variable;

int i;
int &j = i; // PAS de référence à une expression ou à une constante
```

```cpp
int n;
int &p = n;   // p occupe le même emplacement mémoire que n
n = 3;
cout << p;    // affiche 3
```

```cpp
long i, k;
long &j;        // interdit : référence vers rien
long &j = 4;    // interdit : référence vers une constante
long &j = i+2;  // interdit : référence vers une expression
long &j = i;
j = k;          // donc i = k (assignation, pas re-liaison de la référence)
```

**Le passage par référence** comble une lacune du C, en permettant de modifier les paramètres sans manipuler explicitement des pointeurs — compromis entre passage par adresse et passage par valeur : on passe le paramètre (le système fait un passage par adresse caché), et dans le corps de la fonction on manipule directement le paramètre (sécurité, simplicité, lisibilité).

```cpp
void swap(int& n1, int& n2)
{
  int temp = n1;
  n1 = n2;
  n2 = temp;
}
// appel : swap(a, b);
```

**Référence constante :** on passe souvent un objet par référence non pour le modifier, mais pour éviter une copie coûteuse (structure volumineuse). Pour empêcher toute modification, on utilise une référence constante — `const objet&` évite la copie ET la modification.

```cpp
struct Objet { int x; int y; };
void afficher(const Objet& o)
{
  cout << "x = " << o.x << ", y = " << o.y << endl;
  // o.x = 10; // interdit (const)
}
```

### L'allocation dynamique

En C, gérée par `malloc`/`free` (et `calloc`, etc.). Le C++ repose sur deux nouveaux opérateurs, plus robustes :
- `new` pour l'allocation : `int *iptr = new int;`
- `delete` pour la désallocation : `delete iptr;`

| C | C++ |
|---|---|
| `ptr=(type*)malloc(sizeof(type)*NbrDeValeurs);` puis `free(ptr);` | `ptr = new type;` / `ptr = new type[NbrDeValeurs];` puis `delete ptr;` / `delete[] ptr;` |

Pour les tableaux : allocation `tab = new int[10];`, désallocation `delete[] tab;`. En C++, on utilise `0` (et non la macro `NULL`) pour symboliser un pointeur sur rien.

```cpp
double *p_doub;
p_doub = new double;  // allocation
delete p_doub;         // libération

char *txt;
txt = new char[42];    // allocation de 42 char
delete[] txt;
```

## Les nouveaux types de données

### Le type bool

Le C n'a pas de type booléen spécifique. Le C++ introduit le type **`bool`** avec les mots-clés `true` et `false`.

```cpp
bool flag = true;
do {
  ....
  if (....) flag = false;
} while (flag == true);
```

### Définition implicite du type (`enum`, `struct`, `union`)

En C++, `typedef` n'est plus nécessaire : l'identificateur qui suit `struct` ou `enum` devient automatiquement un type.

```cpp
enum Status {OK, ERREUR};             // Status est maintenant un type
enum Couleur { rouge=1, noir=3, blanc=7 };

struct Noeud {          // Noeud est un type, référençable directement dans sa propre définition
  char info[20];
  Noeud *g;
  Noeud *d;
} n1;                    // n1 est une variable de type Noeud
```

### Les structures

Une structure rassemble sous un même nom des données de types différents (les **membres**).

```cpp
struct nomdelastructure {
  typemembre1 nommembre1;
  typemembre2 nommembre2;
  …
};
```

```cpp
struct Compte {
  int no_compte;
  char etat;
  char nom[80];
  float solde;
};
struct Compte a, b, c;  // déclaration de 3 variables (le mot-clé struct n'est pas obligatoire en C++)
```

`typedef` (recommandé si on ne réutilise pas `struct nom` par la suite) :

```cpp
typedef struct {
  int no_compte;
  char etat;
  char nom[80];
  float solde;
} cpt;
cpt a, b, c;
```

**Structures imbriquées :** une structure peut être membre d'une autre structure.

```cpp
struct date { int jour; int mois; int annee; };
struct compte {
  int no_compte; char etat; char nom[80]; float solde;
  struct date dernier_versement;
};
```

**Manipulation :**

```cpp
struct compte c1 = {12345, 'p', "Dupond", 2000.45, {01,10,2019}}; // initialisation statique
c1.solde = 3834.56;                       // accès à un membre

struct compte c[100];                     // tableau de 100 comptes
y = c[33].solde;

c1.dernier_versement.jour = 15;           // accès à un membre imbriqué
c[12].dernier_versement.mois = 10;
```

### Le type énumération

Crée un nouveau type dont les valeurs admissibles sont des constantes ; à chaque constante correspond une valeur entière. Pour déclarer une variable de type `enum`, le mot-clé `enum` doit précéder la déclaration.

```cpp
enum nom_du_nouveau_type { constante, constante, …, constante };
// ou
enum nom_du_nouveau_type { constante = valeur, constante = valeur, …, constante = valeur };
```

```cpp
enum RVB { rouge, vert, bleu };            // rouge=0, vert=1, bleu=2
enum RVB couleur_primaire = vert;

enum Unite_de_temps { seconde = 1, minute = 60, heure = 3600 };
```

**Le type énuméré : C vs C++**

| C | C++ |
|---|---|
| Une donnée `enum` est en réalité de type `int`. Le compilateur ne vérifie pas que les valeurs appartiennent à la liste. | Une donnée `enum` **n'est pas** de type `int`. Le compilateur **vérifie** que les valeurs appartiennent à la liste. |
| `sexe = 6; /*OK!*/` | `sexe = 6; // ERREUR` |
| Les deux conversions `enum <--> int` peuvent être implicites. | Seule la conversion `enum --> int` peut être implicite (`sexe = (Sexe) code;` reste indétectable à la compilation). |

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/poo-ch1-du-c-au-cpp.pdf" />

</TabItem>
</Tabs>
