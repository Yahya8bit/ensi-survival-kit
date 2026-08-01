---
sidebar_position: 1
title: Série 1 - Les Classes en C++
sidebar_label: Série 1 - Classes C++
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Série N°1 — Les classes en C++

*ENSI — Classe: I.I. 1*

## Exercice n°1

La classe `ABC` et le programme principal `main` sont définis comme suit :

```cpp
class ABC {
private :
  int * ptr;
public:
  ABC(int x = 0) : ptr(new int (x))
  {cout <<"constructeur" << endl;}
  bool compare(ABC c)
  {return (*ptr == *(c.ptr));}
  ~ABC(){cout<<"Destructeur"<<endl;
  delete ptr;}
};
```

```cpp
int main()
{
  /* 1 */ ABC c;
  /* 2 */ ABC c1 = 5;
  /* 3 */ ABC c2(c);
  /* 4 */ c2 = c1;
  /* 5 */ if (c1.compare(c2))
    cout << " Egaux " << endl;
  /* 6 */ }
```

1. À la suite de chaque ligne du `main()` numérotée, indiquer ce qui sera affiché. Dévoiler éventuellement la ou les lignes qui provoquent des problèmes de gestion de mémoire (violation/fuite).

| Instruction | Affichage |
|---|---|
| `/* 1 */ ABC c;` | |
| `/* 2 */ ABC c1 = 5;` | |
| `/* 3 */ ABC c2(c);` | |
| `/* 4 */ c2 = c1;` | |
| `/* 5 */ if (c1.compare(c2)) cout << " Egaux " << endl;` | |
| Fin du bloc | |

2. Reprendre la question n°1 dans le cas où on ajoute le constructeur de copie comme suit :

```cpp
ABC(const ABC & a) : ptr(new int( *(a.ptr) ))
{cout <<" constructeur de recopie "<< endl;}
```

3. Reprendre la question n°1 dans le cas où on ajoute aussi l'opérateur d'affectation suivant :

```cpp
void operator = (const ABC & a)
{*ptr = *(a.ptr);
cout << "operator =" << endl;}
```

## Exercice n°2

Soit le code C++ suivant de la classe `Complexe` dont les parties réelles et imaginaires sont `double` :

```cpp
class Complexe
{public:
  Complexe();
  Complexe (double re, double im) ;
  ~Complexe();
  double getim() const;
  double getre() const;
  void setim(double);
  void setre(double);
private:
  double im;
  double re;
};
```

1. Donner le corps des constructeurs, du destructeur, des accesseurs et des mutateurs de la classe `Complexe`.

2. Nous nous proposons d'exécuter le code suivant :

```cpp
int main()
{
  Complexe c1(1,2), c2(3,4), res;
  Complexe c3(2,5);
  cout<<"c3 ="<<c3<<endl;
  cout<<"++c3 ="<<++c3<<endl;
  cout<<"c3++ ="<<c3++<<endl;
  cout<<"c3 ="<<c3<<endl;
  if(c1==c2) cout<<"Les complexes c1 et c2 sont identiques"<<endl;
  else cout<<"Les complexes c1 et c2 sont differents"<<endl;
  cout<<"Partie Reellle de c1="<<c1[1]<<endl;
  cout<<"Partie Imaginaire de c1="<<c1[2]<<endl;
  cout<< " la somme de ";
  cout<<c1;
  cout<<" et de ";
  cout<<c2;
  cout<<" vaut ";
  res=c1+c2 ;
  cout<<res;
  return 0 ;
}
```

Ajouter les méthodes et les fonctions nécessaires pour exécuter correctement le programme précédent.

3. Combien d'instances de `Complexe` ont été créées ?

4. Nous nous proposons maintenant de créer une classe `Complexe` générique. Donner le code de cette classe.

<details>
<summary>Correction (questions 1 à 3)</summary>

**Complexe.h**

```cpp
#ifndef COMPLEXE_H
#define COMPLEXE_H
#include <iostream>
using namespace std;
class Complexe{
    public:
        Complexe();
        Complexe (double re, double im);
        ~Complexe();
        double getim() const;
        double getre() const;
        void setim(double);
        void setre(double);
        Complexe& operator=(const Complexe&);
        Complexe operator+ (const Complexe&)const;
        bool operator==(Complexe&);
        double operator[](int);
        Complexe& operator++(); //préfixe=pré-incrémentation
        Complexe operator++(int); //postfixe=post-incrémentation
        friend ostream& operator <<(ostream&, const Complexe&); //istream → flux d'entrée, ostream → flux de sortie et iostream → les deux
        static int getnbCompX();
    private:
        double im;
        double re;
        static int nbCompX;

};
#endif // COMPLEXE_H
```

**Complexe.cpp**

```cpp
#include "Complexe.h"
#include <iostream>

using namespace std;

Complexe::Complexe():re(0), im(0){
    nbCompX ++;
}
Complexe::Complexe (double re, double im){   //autre possibilité const double & re, const double& im
    this -> re=re;
    this -> im=im;
    nbCompX ++;
}
Complexe::~Complexe(){
    }
double Complexe::getim() const{
    return im;
}
double Complexe::getre() const{
    return re;
}
void Complexe::setim(double x){
    im=x;
}
void Complexe::setre(double y){
    re=y;
}
Complexe& Complexe::operator=(const Complexe& c){
    if (this==&c) return *this;
    re=c.re;
    im=c.im;
    return *this;
}
Complexe Complexe::operator+(const Complexe& c)const{
    return Complexe(re+c.re, im+c.im);
}
bool Complexe::operator==(Complexe& c){
    return (re==c.re && im==c.im);
}
double Complexe::operator[](int i){
    if (i==1) return re;
    else if (i==2) return im;
    else throw out_of_range("Index must be 1 or 2");
}
Complexe& Complexe::operator++(){
    ++re;
    ++im;
    return *this;
}
Complexe Complexe::operator++(int){
    Complexe temp(*this);
    ++ re;
    ++ im;
    return temp;
}
ostream& operator<<(ostream& o, const Complexe& c){
    o<<c.re<<" + i* "<<c.im<<endl;
    return o;
}
int Complexe::getnbCompX(){
    return nbCompX;
}
```

**main.cpp**

```cpp
#include "Complexe.h"
#include <iostream>

using namespace std;
int Complexe::nbCompX=0;
int main(){
    Complexe c1(1,2), c2(3,4),res;
    Complexe c3(2,5);
    cout<<c3;                                               //Besoin de rédéfinir l'opérateur << pour afficher l'objet complexe avec sa partie réelle et sa partie imaginaire
    cout<<++c3;                                             //Besoin de redéfinir le ++ préfixe = pré-incrémentation de la partie réelle et imaginaire
    cout<<c3++;                                            //Besoin de redéfinir le ++ postfixe = post-incrémentation // // crée un objet temporaire
    cout<<c3;
    if(c1==c2)                                            //Besoin de redéfinir le == pour pouvoir comparer les parties réelles et imaginaires de deux objets complexes
        cout<<"Les complexes sont identiques\n";
    else cout<<"Les complexes sont différents\n";
    cout<<"Réel:"<<c1[1]<<endl;                           //Besoin de redéfinir [] pour pouvoir accéder à la partie réelle de l'objet complexe
    cout<<"Imag:"<<c1[2]<<endl;                           //same thing pour pouvoir accéder à la partie imaginaire de l'objet complexe
    res=c1+c2;                                           //Besoin de redéfinir le + et le =, crée un objet temporaire mais il est détruit après l'affectation, assignation
    cout<< " la somme de ";
    cout<<c1;
    cout<<" et de ";
    cout<<c2;
    cout<<" vaut ";
    cout<<res;
    cout<<"Nombre d'objets complexes crées est: " <<Complexe::getnbCompX()<<endl;
    return 0 ;
}
```

**Réponse à la question 3.** Le compteur statique `nbCompX` est incrémenté dans les deux constructeurs (par défaut et à deux arguments) et jamais décrémenté dans le destructeur : il reflète donc le nombre total d'instances **créées** au cours de l'exécution (ici `c1`, `c2`, `res`, `c3` → 4 instances), et non le nombre d'instances encore vivantes.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/poo-td1-classes-cpp.pdf" />

</TabItem>
</Tabs>
