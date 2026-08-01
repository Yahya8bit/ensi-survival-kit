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

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/poo-td1-classes-cpp.pdf" />

</TabItem>
</Tabs>
