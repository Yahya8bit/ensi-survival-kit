---
sidebar_position: 2
title: "Examen (Session Principale) — 20/12/2014 (Corrigé)"
sidebar_label: Examen SP 2014/2015 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Examen — Session Principale — Conception et Analyse des Algorithmes

*Université de La Manouba — École Nationale des Sciences de l'Informatique — A.U. : 2014/2015 — Classe : II2 — Date : 20-12-2014 — Durée : 2h — Documents non autorisés — Nbre de pages : 3 — Enseignants : Abid M.A., Chaker W., Dougui N.H.*

## Exercice 1 (7 pts)

1. Calculer la complexité au pire cas des fonctions suivantes (1.5 pts par fonction) :

```
void F1(int n)                          void F2(int n)
{                                        {
    int j;                                  int i = 1;
    for (int i=1 ; i<=n ; i++)              while (i < n)
        j=0                                      if (i % 2 == 0) // si i est pair
        while (j <= n)                              i = i-2 ;
            j = j+i ;                           else
}                                                    i = i+3 ;
                                         }
Indication :  sum_{i=1}^{n} 1/i ≈ log(n)
```

2. Soient les fonctions suivantes :

```
void F3(int n)                          void F4(int n)
{                                        {
    if (n>0)                                if (n>0)
    {                                        {
        printf("%d ", n) ;                      F4(n-1);
        F3(n-1);                                printf("%d ", n) ;
        printf("%d ", n) ;                      F4(n-1);
    }                                        }
}                                        }
```

   a. Quels sont les résultats de l'exécution de F3(4) et de F4(4) ? (2 pts)
   b. Calculer la complexité de F3 et de F4. (2 pts)

<details>
<summary>Correction</summary>

**1) F1** :

```
void F1(int n)
{
    int j;                              Θ(1)
    for (int i=1 ; i<=n ; i++) {        Θ(n)
        j=0;                            Θ(n)
        while (j <= n)
            j = j+i;                    Θ(n log(n))
    }
}
```

Pour $i$ fixé, le nombre de passages dans la boucle `while` est $n/i$. Pour toutes les valeurs de $i$, le nombre de passages est $n\sum_{i=1}^{n} 1/i = \Theta(n\log(n))$.

$$T(n) = \Theta(1) + \Theta(n) + \Theta(n\log(n)) = \Theta(n\log(n))$$

**F2** :

Pour $n=16$ : $i = 1, 4, 3, 6, 5, 8, 7, 10, 9, 12, 11, 14, 13, 16$. Le nombre de passages dans la boucle `while` est exactement $n-1$ si $n$ est impair, $n-2$ à $n$ si $n$ est pair.

$$T(n) = \Theta(1) + \Theta(n) = \Theta(n)$$

**2.a)** $F_3(4) \to F_3(3) \to F_3(2) \to F_3(1) \to F_3(0)$, avec un affichage avant et après chaque appel récursif. Résultat de l'exécution et de l'affichage : $4, 3, 2, 1, 4, 3, 2, 1, 3, 4$ (déroulement complet : $4\ 3\ 2\ 1\ 1\ 2\ 3\ 4$).

Pour $F_4(4)$ : $F_4(4) \to F_4(3) \to F_4(2) \to F_4(1) \to F_4(0)$, mais chaque appel se ramifie en deux sous-appels récursifs (avant et après l'affichage). Résultat de l'exécution : $1\ 2\ 1\ 3\ 1\ 2\ 1\ 4\ 1\ 2\ 1\ 3\ 1\ 2\ 1$.

**2.b)** Pour $F_3$, l'équation de récurrence est $T(n) = T(n-1) + c\hat{o}te = \Theta(n)$.

Pour $F_4$, l'équation de récurrence est $T(n) = 2 \times T(n-1) + c\hat{o}te = \Theta(2^n)$.

</details>

## Exercice 2 (5 pts)

**Définition 1 : CIRCUIT HAMILTONIEN**

- Donnée : un graphe $G = (V,E)$ (non-orienté).
- Problème : décider s'il existe un circuit Hamiltonien, c'est-à-dire un chemin de $G$ passant une fois et une seule par chacun des sommets et revenant à son point de départ.

**Théorème 1** : le problème CIRCUIT HAMILTONIEN est NP-complet.

**Définition 2 : CIRCUIT LE PLUS LONG**

- Données : un graphe $G = (V,E)$ non-orienté, avec des pondérations sur les arêtes (la distance entre les deux extrémités de l'arête), et un entier $r$.
- Problème : décider s'il existe un circuit de $G$ ne passant pas deux fois par le même sommet dont la longueur est $\geq r$.

Montrer que le problème CIRCUIT LE PLUS LONG est NP-complet, sachant que Circuit Hamiltonien est NPC.

*Indication : pondérer chaque arête du graphe $G$ par le poids 1.*

<details>
<summary>Correction</summary>

**1) Montrer que CLL $\in$ NP.**

Certificat : choisir aléatoirement un ordre des sommets tel que $3 \leq r \leq |V|$ (en $\Theta(1)$). Choisir aléatoirement et successivement une suite d'arêtes du graphe telle que chaque sommet est choisi une seule fois (en $\Theta(r) = \Theta(n)$).

**Vérification** : vérifier qu'il existe une arête dans le graphe entre chaque couple de sommets successifs choisi précédemment, en $\Theta(r \times m) = \Theta(n \times m)$ (avec $m$ le nombre d'arêtes du graphe) — calculer le poids total du circuit choisi, en $\Theta(m)$.

**2) Montrer que CH $\leq_P$ CLL** : $G(V,E) \to G(V,E)$ en donnant le poids 1 à toutes les arêtes du graphe. On fixe $r = n$ (le nombre de sommets du graphe).

Transformation polynomiale (temps $\Theta(m)$, $m$ = nombre d'arêtes) :

- si $G \in CH \Rightarrow \langle G,n \rangle \in CLL$ : si $G \in CH$ alors il existe un circuit qui passe par tous les sommets une seule fois ; en donnant le poids 1 à toutes les arêtes, la longueur de ce circuit est $n \Rightarrow \langle G,n \rangle \in CLL$.
- si $\langle G,n \rangle \in CLL \Rightarrow \exists$ un circuit de coût $\geq n$ qui passe par $n$ arêtes et passe par tous les sommets une seule fois $\Rightarrow$ il passe par tous les sommets une seule fois et est de longueur $n$ arêtes $\Rightarrow G \in CH$.

</details>

## Exercice 3 : Programmation dynamique (8 pts)

On considère un tableau contenant des entiers relatifs dont au moins un est positif. On recherche le sous-tableau, constitué de cases successives, dont la somme des éléments est maximale. Par exemple, le tableau $T$ (à 9 cases), présenté ci-après, contient un sous-tableau de somme maximale égale à 6 :

$$T:\quad -3,\ 1,\ -1,\ 4,\ -1,\ 2,\ 1,\ -5,\ 4$$

Le sous-tableau de $T$ de somme maximale : $4,\ -1,\ 2,\ 1$.

Considérons le cas général d'un tableau $T[1,n]$ à $n$ éléments.

1. Une première idée consiste à énumérer tous les sous-tableaux de $T$ et à sélectionner celui dont la somme est maximale. Écrire l'algorithme correspondant. On pourra utiliser :
   - une variable $d$ variant entre 1 et $n$, pour marquer le début du sous-tableau courant,
   - une variable $f$, variant entre $d$ et $n$, pour marquer la fin du sous-tableau courant,
   - une variable $s$ pour calculer la somme des éléments $T[d]+\ldots+T[f]$,
   - des variables $d_{max}$, $f_{max}$ et $s_{max}$ pour mémoriser le meilleur sous-tableau exploré.
2. Quelle est la complexité de votre algorithme ?
3. Une autre idée consiste à utiliser une technique de programmation dynamique (la Figure 1 illustre cette technique sur le tableau précédent). Pour cela, on considère la classe de problèmes suivante : pour tout entier $m \in [1,n]$, rechercher le sous-tableau de $T[1,m]$ se terminant en $m$ et de somme maximale. On notera $s_{max}[m]$ cette somme maximale et $d_{max}[m]$ l'indice du début de l'intervalle correspondant.

| $m$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $T[m]$ | -3 | 1 | -1 | 4 | -1 | 2 | 1 | -5 | 4 |
| $s_{max}[m]$ | -3 | 1 | 0 | 4 | 3 | 5 | 6 | 1 | 5 |
| $d_{max}[m]$ | 1 | 2 | 2 | 4 | 4 | 4 | 4 | 4 | 4 |

*Figure 1 — Résolution du problème du sous-tableau maximal par un algorithme de programmation dynamique.*

   a. Montrer que si l'on sait résoudre ce problème pour l'indice $m$, on peut facilement trouver une solution pour l'indice $m+1$. Exprimer $s_{max}[m+1]$ et $d_{max}[m+1]$ en fonction de $s_{max}[m]$, $d_{max}[m]$ et $T[m+1]$.
   b. Écrire un algorithme récursif qui permet de remplir les tableaux $s_{max}$ et $d_{max}$.
   c. Montrer que si l'on connaît $s_{max}[m]$ et $d_{max}[m]$ pour tout $m$, on peut facilement en déduire $d_{max}$, $f_{max}$ et $s_{max}$ (globaux).
   d. Écrire l'algorithme de programmation dynamique correspondant. Quelle est sa complexité ?

<details>
<summary>Correction</summary>

**1)**

```
RechercheSousTab_max(T, n)
    entier dmax = 1;
    entier fmax = 1;                              Θ(1)
    entier smax = T[1];
    pour entier d = 1 à n faire                    Θ(n)
        pour entier f = d à n faire                Θ(n²)
            entier s = 0;                          Θ(n²)
            pour i = d à f faire
                s = s + T[i];                      Θ(n³)
            finpour
            si s > smax alors
                smax = s;
                dmax = d;                          Θ(n²)
                fmax = f;
        finpour
    finpour
```

**2)** $T(n) = \Theta(1) + \Theta(n) + \Theta(n^3) = \Theta(n^3)$.

**3.a)** Si $s_{max}[m] > 0$ alors $s_{max}[m+1] = s_{max}[m] + T[m+1]$ et $d_{max}[m+1] = d_{max}[m]$. Sinon $s_{max}[m+1] = T[m+1]$ et $d_{max}[m+1] = m+1$.

$s_{max}$ et $d_{max}$ sont initialement vides.

**3.b)**

```
Proc_Remplissage(smax, dmax, T, m)
    si (m==1) alors
        smax[m] = T[1];
        dmax[m] = 1;
    sinon
        Proc_Remplissage(smax, dmax, T, m-1);
        si (smax[m-1] > 0) alors
            smax[m] = smax[m-1] + T[m];
            dmax[m] = dmax[m-1];
        sinon
            smax[m] = T[m];
            dmax[m] = m;
        finsi
    finsi
```

**3.c)** $s_{max}$ (global) est la valeur maximale du tableau $s_{max}[\cdot]$, $d_{max} = d_{max}[i]$ et $f_{max} = i$, où $i$ est l'indice qui réalise ce maximum.

**3.d)**

```
Remplissage(T, smax, dmax, m)
    smax[1] = T[1]; dmax[1] = 1;                    Θ(1)
    pour i = 2 à m faire
        si smax[i-1] > 0 alors
            smax[i] = smax[i-1] + T[i];
            dmax[i] = dmax[i-1];
        sinon
            smax[i] = T[i];
            dmax[i] = i;
        finsi
    finpour                                          Θ(n)
```

$$T(n) = \Theta(1) + \Theta(n) = \Theta(n)$$

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/complexite-exam-2014-2015.pdf" />

</TabItem>
</Tabs>
