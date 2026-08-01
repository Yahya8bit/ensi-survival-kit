---
sidebar_position: 4
title: POO — La STL et les Fichiers en C++
sidebar_label: Ch3 (P2) — STL & Fichiers
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Programmation Orientée Objet — La STL et les fichiers en C++

## Qu'est-ce que STL ?

**STL = Standard Template Library.** Il s'agit d'une bibliothèque générique qui fournit des solutions pour gérer un ensemble de données en utilisant des algorithmes efficaces. Du point de vue du programmeur, STL fournit un groupe de classes répondant à divers besoins. Tous les composants de STL sont des **templates**.

**Les composants STL.** Il s'agit de connecter des *algorithmes* génériques à des *structures de données* génériques en utilisant des *itérateurs* — c'est le principe de la programmation générique.

## Les conteneurs

Les conteneurs servent à stocker des collections d'objets d'un même type `T`. STL fournit différentes sortes de conteneurs pour combler différents besoins. Il existe deux types de conteneurs :
- Les **conteneurs séquentiels**, qui conservent la collection d'objets sous un format strictement linéaire : `vector`, `deque`, `list`.
- Les **conteneurs associatifs triés**, qui conservent la collection selon un ordre de tri basé sur une clé : `set`/`multiset`, `map`/`multimap`.

### Conteneurs séquentiels

**Le tableau C++ ordinaire (`T a[n]`) :**
- Accès aléatoire par index en temps constant `O(1)`.
- Insertion et retrait lents au milieu du tableau.
- Taille ne pouvant être modifiée pendant l'exécution.
- Peut être utilisé avec les algorithmes de la STL comme tout autre conteneur de séquence.

**`vector`** = tableau dynamique ; les éléments sont insérés à la fin du tableau.

```cpp
#include <vector>
#include <iostream>
using namespace std;
int main() {
  vector<int> iv;
  cout << "taille" << iv.size() << endl;
  cout << "capacité" << iv.capacity() << endl;
  for (int i = 0; i < 5; ++i) { iv.push_back(i); }
  cout << "taille" << iv.size() << endl;
  cout << "capacité" << iv.capacity() << endl;
  for (int i = 0; i < iv.size(); ++i) { cout << iv[i] << endl; }
  cout << "l'élément n°3= " << iv.at(3) << endl;
  iv.pop_back();
}
```

**Spécificité du conteneur `vector` :**
- La position d'un élément dépend du temps et de l'endroit de l'insertion — elle est indépendante de sa valeur.
- La **taille** est le nombre d'éléments actuellement contenus dans le vector.
- La **capacité** est le nombre maximum d'éléments pouvant être contenus sans réallocation.
- `reserve()` élargit la capacité ; `resize()` redimensionne le vector à la taille spécifiée (appelle le constructeur par défaut de chaque nouvel élément).

> **Attention !** Après un `resize()` (ou toute réallocation), un pointeur/adresse précédemment pris sur un élément (`&iv[0]`) peut être invalidé — la mémoire a pu être déplacée.

**`deque`** (Double-Ended Queue) = tableau dynamique dont les éléments peuvent être insérés à la fin **ou** au début (`push_front`, `push_back`).

```cpp
#include <deque>
deque<int> d;
for (int i = 0; i < 10; ++i) d.push_front(i);
for (int i = 90; i < 100; ++i) d.push_back(i);
```

**`list`** = liste doublement chaînée d'éléments. Un élément pointe sur son prédécesseur et son successeur. Les éléments sont insérés n'importe où dans la liste (`push_front`, `push_back`, `insert`).

```cpp
#include <list>
list<int> l;
for (int i = 1; i < 20; ++i) {
  if (i % 2 == 0) l.push_front(i);
  else l.push_back(i);
}
auto it = l.begin();
advance(it, 3);
l.insert(it, 12);
while (!l.empty()) { cout << l.front() << " "; l.pop_front(); }
```

### Comparaisons

| | Accès direct | Insertion/suppression rapide | Redimensionnement |
|---|---|---|---|
| `vector` | oui | seulement à la fin | recopie complète, pas de `push_front`/`pop_front` |
| `deque` | oui | au début ou à la fin | ne demande pas de recopie complète |
| `list` | non | n'importe où (temps constant) | ne demande pas de recopie ; n'invalide pas les itérateurs, facile à diviser/joindre/inverser |

**Utiliser un `vector`** quand on insère/supprime seulement à la fin et que le conteneur doit être compatible avec un tableau C standard. **Utiliser un `deque`** quand on insère/supprime au début ou à la fin, sans besoin de compatibilité C ni de taille maximum connue à l'avance. **Utiliser une `list`** quand on insère/supprime au milieu du conteneur, sans besoin de compatibilité C ni de taille maximum connue.

### Conteneurs associatifs

Les éléments du conteneur sont automatiquement triés lors de leur insertion selon un critère précis (comparaison de la valeur ou d'une clé). Les conteneurs associatifs sont généralement représentés sous forme d'arbre binaire. `set`, `multiset`, `map` et `multimap` en sont les principaux.

**`set`** : les éléments sont triés selon leur valeur ; chaque élément ne peut exister qu'une fois.

```cpp
#include <set>
set<int> s;
s.insert(50); s.insert(10); s.insert(20); s.insert(80);
s.insert(30); s.insert(70); s.insert(90); s.insert(10); // doublon ignoré
```

**`multiset`** : identique à `set`, sauf qu'un élément peut exister plusieurs fois.

**`map`** : les éléments sont des paires clé/valeur, triées selon leur clé ; chaque clé ne peut exister qu'une fois.

```cpp
#include <map>
map<string, float> coll;   // clé: string, valeur: float
coll["TVA"] = 0.15;
coll["Pi"] = 3.1416;
```

**`multimap`** : identique à `map`, sauf qu'une clé peut exister plusieurs fois — on peut retrouver plusieurs valeurs pour une même clé (ex. dictionnaire).

```cpp
#include <map>
multimap<string, int> phoneNums;
phoneNums.insert(pair<string, int>("A", 123));
phoneNums.insert(pair<string, int>("A", 369));  // même clé "A"
cout << phoneNums.count("A") << endl;   // 2
```

### Conteneurs dérivés

Le standard C++ fournit deux conteneurs supplémentaires bâtis au-dessus des conteneurs séquentiels :
- **Pile (`stack`)** : politique **LIFO** (last-in-first-out). Méthodes principales : `push(valeur)`, `pop()`, `top()`.
- **File (`queue`)** : politique **FIFO** (first-in-first-out), dérive de `deque`. Méthodes : `push(valeur)`, `pop()`, `front()`, `back()`.

```cpp
#include <stack>
stack<int> p;
p.push(2); p.push(3);
cout << p.top() << endl;   // 3
p.pop();
cout << p.top() << endl;   // 2

#include <queue>
queue<int> i;
i.push(10); i.push(20); i.push(30);
cout << i.front() << endl;   // 10
cout << i.back() << endl;    // 30
i.pop();                      // retire 10
```

### Ce que doit posséder un élément inclus dans un conteneur

- un constructeur copie ;
- un opérateur d'affectation (`operator=`) ;
- un destructeur ;
- possiblement un constructeur par défaut ;
- possiblement un test d'égalité (`operator==`) ;
- possiblement un critère de tri (`operator<`, …) — nécessaire pour les conteneurs associatifs.

```cpp
bool operator< (const Complex& z) const {
  return ((re < z.re) || ((re == z.re) && (im == z.im)));
}
```

## Les itérateurs

Un **itérateur** est un objet qui permet de naviguer dans les éléments d'un conteneur — un pointeur « intelligent » (le déplacement dans un arbre binaire équilibré n'est pas comme un déplacement dans une liste d'éléments contigus). L'itérateur fait le lien entre les conteneurs et les algorithmes.

**Opérations d'un itérateur** (interface similaire à celle des pointeurs) :
- `operator*` : retourne l'élément de la position courante.
- `operator++` : fait pointer l'itérateur vers l'élément suivant.
- `operator==` / `operator!=` : indique si deux itérateurs pointent le même élément.
- `operator=` : assigne un itérateur.

**Fonctions membres communes à tous les conteneurs :**

| Fonction | Rôle |
|---|---|
| `begin()` | itérateur sur le début des éléments |
| `end()` | itérateur sur la fin des éléments |
| `size()` | nombre d'éléments |
| `empty()` | vrai si le conteneur est vide |
| `erase(it)` | retire l'élément à `it`, retourne un itérateur sur le suivant |
| `erase(it1, it2)` | retire tous les éléments de `it1` à `it2` |
| `back()` / `front()` | dernier / premier élément |
| `push_back()` / `pop_back()` | insère / retire à la fin |

Tous les conteneurs définissent deux types d'itérateur : `container::iterator` (lecture/écriture) et `container::const_iterator` (lecture seulement).

```cpp
list<char>::const_iterator pos;
for (pos = coll.begin(); pos != coll.end(); pos++)
  cout << *pos << ' ';
*pos = ...;   // illégal avec un const_iterator !
```

**Catégories d'itérateurs :**
- **Bidirectionnel** : itère en avant (`++`) et en arrière (`--`) — `list`, `set`, `multiset`, `map`, `multimap`.
- **Accès par index** : itère en avant, en arrière, et par index (`[]`) — `vector`, `deque`.

## Les algorithmes

STL fournit plusieurs algorithmes pour traiter les éléments des conteneurs (recherche, tri, copie, modification, …). **Les algorithmes ne sont pas des fonctions membres des classes conteneurs** — ce sont des fonctions globales qui opèrent avec des itérateurs (fichier `<algorithm>`).

```cpp
#include <algorithm>
vector<int> coll;
vector<int>::iterator pos;

pos = min_element(coll.begin(), coll.end());
pos = max_element(coll.begin(), coll.end());
sort(coll.begin(), coll.end());

pos = find(coll.begin(), coll.end(), 3);   // recherche de la valeur 3
coll.erase(pos);
```

**Pourquoi certaines fonctionnalités existent-elles à la fois comme algorithme STL et comme fonction membre d'un conteneur ?** Deux raisons :
1. L'algorithme générique ne fonctionne pas avec le conteneur en question (ex. `sort` et `list` — d'où `list::sort()`).
2. L'algorithme générique n'est pas assez efficace pour ce conteneur (ex. `remove_if` et `list`).

**Utilisation de fonctions dans les algorithmes.** Certains algorithmes (comme `for_each`) permettent de fournir une fonction définie par l'utilisateur, appelée à l'interne pour chaque élément :

```cpp
void print(int elem) { cout << elem << ' '; }
for_each(coll.begin(), coll.end(), print);
```

**Utilisation de prédicats.** Un **prédicat** est une fonction qui retourne une valeur booléenne ; il peut spécifier un critère de recherche ou de tri :

```cpp
bool estPremier(int nombre) {
  if (nombre == 0 || nombre == 1) return true;
  int diviseur;
  for (diviseur = nombre / 2; nombre % diviseur != 0; diviseur--);
  return (diviseur == 1);
}

list<int>::iterator pos = find_if(coll.begin(), coll.end(), estPremier);
if (pos != coll.end()) cout << *pos;
```

## La classe `string` de C++

C++ dispose d'une bibliothèque `<string>` (namespace `std`), plus pratique que la bibliothèque `<cstring>` héritée du C :
- Constructeurs : `string()`, `string(char*)`, `string(string)`.
- Opérateurs : `+`, `+=`, `=`, `==`, `!=`, `<`, `<=`, `>`, `>=`, `[]`.
- Méthodes : `substr`, `replace`, `find`, `swap`, `getline(cin, s1)`, …

```cpp
#include <string>
string MaChaine = "Bonjour les camarades";
cout << MaChaine.size() << endl;
string AutreChaine("!!");
cout << MaChaine + AutreChaine << endl;
```

## Généralités sur les fichiers

**Vision logique d'un fichier :** un tableau d'octets, avec un pointeur de fichier qui indique la position courante.

**Créer un fichier :** l'ouvrir en écriture → écrire des données → le fermer.

**Lire un fichier :** l'ouvrir en lecture → lire les données → le fermer.

**Deux types de fichiers :**
- **Fichiers textes** : lisibles par un simple éditeur de texte.
- **Fichiers binaires** : copie bit à bit du contenu de la RAM, non lisibles avec un éditeur de texte.

**Deux bibliothèques standard :** `<stdio.h>` (héritée du C) et `<fstream>` (typiquement C++).

## Utilisation de `<stdio.h>`

**`FILE * fopen(const char * filepath, char * mode)`** ouvre un fichier en lecture ou en écriture. `filepath` est le chemin du fichier ; `mode` indique le mode d'ouverture :

| Mode | Signification |
|---|---|
| `"r"` (read) | lecture |
| `"w"` (write) | écriture ; fichier créé ou écrasé s'il existait déjà |
| `"a"` (append) | écriture en fin de fichier existant |
| `"b"` | mode binaire (sur certaines plateformes seulement) |
| `"t"` | mode texte |
| `"+"` | ajout du mode lecture **et** écriture (ex. `"r+"`, `"wb"`) |

`fopen` retourne `NULL` si l'ouverture échoue, sinon un pointeur `FILE*` servant à lire, écrire ou fermer le fichier. **`fclose(FILE *)`** ferme le fichier.

### Les fichiers binaires

- **`fwrite(const void * buffer, int size, int nb, FILE * f)`** : écrit `nb` éléments de `size` octets depuis `buffer` (RAM) vers le fichier `f` (ouvert en écriture).
- **`fread(const void * buffer, int size, int nb, FILE * f)`** : lit `nb` éléments de `size` octets depuis le fichier `f` (ouvert en lecture) vers `buffer` (RAM).

```cpp
#include <stdio.h>
#include <string.h>

int main(void) {
  FILE * f;
  int a = 78, i, t1[6];
  double b = 9.87;
  char c = 'W', t2[10];
  for (i = 0; i < 6; i++) t1[i] = 10000 + i;
  strcpy(t2, "AZERTYUIO");

  f = fopen("toto.xyz", "wb");
  if (f == NULL) { /* erreur */ }
  else {
    fwrite(&a, sizeof(int), 1, f);
    fwrite(&b, sizeof(double), 1, f);
    fwrite(&c, sizeof(char), 1, f);
    fwrite(t1, sizeof(int), 6, f);
    fwrite(t2, sizeof(char), 10, f);
    fclose(f);
  }
}
```

Pour écrire un scalaire (`int a`) il faut passer `&a` (pointeur vers cet entier) ; pour un tableau (`t1`), le nom du tableau `t1` est déjà un pointeur vers son premier élément.

```cpp
int main(void) {
  FILE * f;
  int a, t1[6], i;
  double b;
  char c, t2[10];

  f = fopen("toto.xyz", "rb");
  if (f == NULL) { /* erreur */ }
  else {
    fread(&a, sizeof(int), 1, f);
    fread(&b, sizeof(double), 1, f);
    fread(&c, sizeof(char), 1, f);
    fread(t1, sizeof(int), 6, f);
    fread(t2, sizeof(char), 10, f);
    fclose(f);
  }
}
```

### Les fichiers textes

- **`fprintf(FILE *f, const char * format, ...)`** : écrit en mode texte dans un fichier. Ne pas oublier de laisser un espace (ou un passage à la ligne) entre les données pour pouvoir les relire.
- **`fscanf(FILE * f, const char * format, ...)`** : lit les données à partir d'un fichier texte en utilisant le même format que `fprintf`.

Exemples de formats : `"%d"` (entier), `"%lf"` (double), `"%3.7lf"` (double, 3 chiffres avant la virgule, 7 après), `"%s"` (chaîne de caractères sans espace).

```cpp
FILE * f = fopen("A.txt", "wt");
fprintf(f, "%d %lf %c ", a, b, c);
for (i = 0; i < 6; i++) fprintf(f, "%d ", t1[i]);
fprintf(f, "%s ", t2);
fclose(f);
```

```cpp
FILE * f = fopen("A.txt", "rt");
fscanf(f, "%d %lf %c ", &a, &b, &c);
for (i = 0; i < 6; i++) fscanf(f, "%d ", &t1[i]);
fscanf(f, "%s ", t2);
fclose(f);
```

## Utilisation de `<fstream>`

### Les fichiers textes

**Classe `ofstream`** (fichier ouvert en écriture) : le constructeur prend le nom du fichier, ex. `ofstream f("toto.txt");`. `is_open()` renvoie `true` si l'ouverture a réussi. On écrit avec l'opérateur `<<` (sans oublier les séparateurs).

**Classe `ifstream`** (fichier ouvert en lecture) : le constructeur prend le nom du fichier, ex. `ifstream f("toto.txt");`. `is_open()` renvoie `true` si l'ouverture a réussi. On lit avec l'opérateur `>>`.

```cpp
#include <fstream>
#include <string>

ofstream f("toto.txt");
if (!f.is_open()) { /* erreur */ }
else {
  f << a << " " << b << " " << c << endl;
  for (i = 0; i < 6; i++) f << t1[i] << " ";
  f << s;
}
f.close();
```

```cpp
ifstream f("toto.txt");
if (!f.is_open()) { /* erreur */ }
else {
  f >> a >> b >> c;
  for (i = 0; i < 6; i++) f >> t1[i];
  f >> s;
}
f.close();
```

### Les fichiers binaires

**`ofstream`** : ouvrir en écriture binaire avec `ios::out | ios::binary` en second paramètre du constructeur ; écrire avec `write((char*)buffer, int nb)`.

**`ifstream`** : ouvrir en lecture binaire avec `ios::in | ios::binary` ; lire avec `read((char*)buffer, int nb)`.

```cpp
ofstream f("toto.xyz", ios::out | ios::binary);
if (!f.is_open()) { /* erreur */ }
else {
  f.write((char *)&a, sizeof(int));
  f.write((char *)&b, sizeof(double));
  f.write((char *)&c, sizeof(char));
  for (i = 0; i < 6; i++) f.write((char *)&t1[i], sizeof(int));
}
f.close();
```

```cpp
ifstream f("toto.xyz", ios::in | ios::binary);
if (!f.is_open()) { /* erreur */ }
else {
  f.read((char *)&a, sizeof(int));
  f.read((char *)&b, sizeof(double));
  f.read((char *)&c, sizeof(char));
  for (i = 0; i < 6; i++) f.read((char *)&t1[i], sizeof(int));
}
f.close();
```

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/poo-ch3-stl-fichiers.pdf" />

</TabItem>
</Tabs>
