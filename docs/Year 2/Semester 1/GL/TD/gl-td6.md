---
sidebar_position: 6
title: "TD6 : Test du logiciel (avec corrigé)"
sidebar_label: TD6 - Test du logiciel
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD6 : Test du logiciel

*ENSI — Matière : Génie Logiciel — Niveau : I.I.2*

<!-- TODO: unclear in source, verify against original PDF — the correction PDF is titled "td_test_correction" without a TD number and adds a 5th sub-case to Exercice 1 (calcul des impôts) not present in the numbered TD6 statement; both are transcribed faithfully below without merging content into the other. -->

## Exercice 1

Faire la partition en classes des spécifications suivantes et donner ensuite le jeu de test correspondant à cette partition en utilisant les valeurs frontières quand c'est possible.

1. Une méthode retourne le maximum entre deux nombres.
2. Une méthode retourne vrai si on entre un nombre pair et faux sinon.
3. Une méthode retourne trois fois le nombre entré + 28 si le nombre est impair et la racine carrée sinon.
4. Un programme prend les couleurs des feux de circulation en entrée et retourne la consigne de sécurité correspondante.
5. Le gouvernement calcule les impôts de façon différente selon le revenu. 0-20 000 (pas d'impôt), 20 000 à 30 000 (10%), 30 000-40 000 (25%), 40-55 000 (45%), 55 000-75 000 (50%), 75 000+ (55%).

<details>
<summary>Correction</summary>

1. Une méthode retourne le maximum entre deux nombres.
   - R : `D1{(a,b) | a > b}` ; `D2{(a,b) | a < b}` ; `D3{(a,b) | a = b}`
   - DT : (5,2), (2,5), (5,5)
2. Une méthode retourne vrai si on entre un nombre pair et faux sinon.
   - R : `D1{d | d mod 2 = 0}`, `D2{d | d mod 2 = 1}`
   - DT : (2), (3)
3. Une méthode retourne trois fois le nombre entré + 28 si le nombre est impair et la racine carrée sinon.
   - R : `D1{d | d mod 2 = 0}`, `D2{d | d mod 2 = 1}`
   - DT : (2), (3)
4. Un programme prend les couleurs des feux de circulation en entrée et retourne la consigne de sécurité correspondante.
   - R : `D1{rouge}` ; `D2{vert}` ; `D3{orange}` ; `D4{d | d ≠ rouge ∧ d ≠ vert ∧ d ≠ orange}`
   - DT : (rouge), (vert), (orange), (couleur)
5. Le gouvernement calcule les impôts de façon différente selon le revenu.
   - R : `D1{0 ≤ d < 20 000}` ; `D2{20 000 ≤ d < 30 000}` ; `D3{30 000 ≤ d < 40 000}` ; `D4{40 000 ≤ d < 55 000}` ; `D5{55 000 ≤ d < 75 000}` ; `D6{75 000 ≤ d}` ; `D7{d < 0}`
   - Jeu de test = `{-1, 0, 19 999, 20 000, 29 999, 30 000, 39 000, 40 000, 54 999, 55 000, 74 999, 75 000}`

</details>

## Exercice 2

On considère une procédure `triangle` qui reçoit en paramètres 3 réels a, b et c qui sont les longueurs des côtés d'un triangle. La procédure retourne comme résultat un code 0 si le triangle défini par a, b et c est invalide, 1 si le triangle est équilatéral, 2 si le triangle est isocèle et 3 pour un triangle valide quelconque (ni isocèle, ni équilatéral). Donner un jeu d'essai exhaustif pour cette procédure testant tous les cas de figure en distinguant les 3 entrées a, b et c.

<details>
<summary>Correction</summary>

- D1 = `{(a, b, c) : est équilatéral}`
- D21 = `{(a, b, c) : est isocèle et a=b, a≠c}`
- D22 = `{(a, b, c) : est isocèle et a=c, b≠c}`
- D23 = `{(a, b, c) : est isocèle et b=c, a≠b}`
- D3 = `{(a, b, c) : est scalène, c'est-à-dire a≠b≠c}`
- D41 = `{(a, b, c) : pas un triangle et a ≥ b+c}`
- D42 = `{(a, b, c) : pas un triangle et b ≥ a+c}`
- D43 = `{(a, b, c) : pas un triangle et c ≥ a+b}`

Exemple de jeu de test : (3,3,3), (2,2,3), (2,3,2), (3,2,2), (3,4,5), (6,3,3), (3,6,3), (3,3,6)

</details>

## Exercice 3

Soit une application de réservation destinée aux joueurs de golf : le golf est fermé les lundis et mardis et est ouvert de 7h00 à 21h00 le restant de la semaine. La réservation 1 heure avant la fermeture n'est pas prise en compte. Les départs effectués après 18h00 permettent à un membre de l'équipe de golf d'entrer gratuitement. L'application permet à l'utilisateur d'entrer son nom d'utilisateur de type string, de choisir une journée de réservation (choix de dimanche à lundi) et choisir les heures de réservation (choix parmi les tranches de 10 minutes de la journée).

On se propose de tester cette application de réservation de golf en utilisant la technique basée sur la répartition en classes d'équivalence. Définir les classes d'équivalence correspondantes à chaque entrée (tout en étant concis et précis) et proposer un jeu de test pertinent pour chaque classe.

<details>
<summary>Correction</summary>

- **Nom d'utilisateur** : `D1{golfeurlogin}` ; `D2{d | d ≠ golfeurlogin}` — DT : (golfeurlogin), (fajdlkjfka)
- **Journée** : `D1{lundi, mardi}` ; `D2{mercredi, jeudi, vendredi, samedi, dimanche}` ; `D3{autre valeur}` — DT : (lundi), (mercredi), (autre)
- **Heures** : `D1{d | d < 7 ou d > 20}` ; `D2{d | 18 ≤ d ≤ 20}` ; `D3{d | 7 ≤ d < 18}` — DT : `{6:50, 7:00, 17:50, 18:00, 19:50, 20:00}`

</details>

## Exercice 4

Soit le programme suivant :

```
lire(x)
si y < 0 alors
  lire(y)
  signe = -signe
  z = 0
  y = -y
  signe = 1
finsi
si x < 0 alors
  tant que x >= y faire
    signe = -1
    x = x - y
    x = -x
    z = z + 1
finsi
fin
z = signe * z
```

a) Dessiner le graphe de contrôle associé à ce programme en numérotant ses nœuds.
b) Par quelle suite de nœuds faut-il passer pour satisfaire le critère de couverture des instructions ? Donner un jeu d'essai minimum qui satisfasse ce critère.
c) Par quelle suite de nœuds faut-il passer pour satisfaire le critère de couverture des arcs ? Donner un jeu d'essai minimum qui satisfasse ce critère.
d) On appelle critère de couverture des i-chemins le critère qui garantit que l'on passe sur tous les chemins possibles en répétant de 0 à i fois chaque boucle. Par quelle suite de nœuds faut-il passer pour satisfaire le critère de couverture des 1-chemins ? Donner un jeu d'essai minimum qui satisfasse ce critère.

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 2-3 — le graphe de contrôle numéroté (nœuds 1 à 12) n'est décrit dans la correction que par la séquence de nœuds ci-dessous, sans schéma. -->

b) Nœuds : 1 2 3 4 5 6 7 8 9 10 8 11 12 — Jeu d'essai : (x=-5, y=-2)

c) Nœuds : 1 2 5 8 11 12 et 1 2 3 4 5 6 7 8 9 10 8 11 12 — Jeu d'essai : (x=2, y=5) et (x=-5, y=-2)

d) Nœuds :
- 1 2 5 8 11 12 et 1 2 5 8 9 10 8 11 12
- 1 2 3 4 5 8 11 12 et 1 2 3 4 5 8 9 10 8 11 12
- 1 2 5 6 7 8 11 12 et 1 2 5 6 7 8 9 10 8 11 12
- 1 2 3 4 5 6 7 8 11 12 et 1 2 3 4 5 6 7 8 9 10 8 11 12

Jeu d'essai : (x=2, y=5) (x=5, y=2) (x=-2, y=5) (x=-5, y=2) (x=2, y=-5) (x=5, y=-2) (x=-2, y=-5) (x=-5, y=-2)

</details>

## Exercice 5

Soient les codes P1 et P2 suivants :

```
P1                              P2
if x < 0 then                   z := x;
  x := -x;                      if (not(x=0)) then
end if;                           y := 5;
if (not(x=0)) then                z := z - x;
  z := z - x;                   else
else                               z := 0;
  y := 5;                       end if;
end if;
if (z > 1) then
  z := z / x;
else
  z := 0;
end if;
```

1. Donner les graphes de contrôle pour les programmes P1 et P2.
2. Donner pour P1 un jeu de test qui satisfait le critère de couverture des instructions mais pas celui des arcs.
3. Donner pour P2 un jeu de test qui satisfait le critère de couverture des arcs mais pas celui des chemins.

<details>
<summary>Correction</summary>

2. (x = -2) satisfait le critère de couverture des instructions mais pas celui des arcs. Il faudrait aussi tester ce qui se passe quand x est positif.
3. Le jeu d'essai (x=0, z=1), (x=1, z=3) vérifie la couverture des arcs mais pas celle des chemins et ne peut donc détecter une division par zéro. (x=0, z=3), (x=1, z=1), (x=0, z=1), (x=1, z=3) vérifie la couverture des chemins et détecte donc la division par zéro.

</details>

## Exercice 6

Soit le programme P3 suivant :

```
if n ≤ 0 then
  n := 2-n
end;
if n pair then
  n := n / 2
else
  n := 3*n + 1
end;
write(n);
```

Calculer les DT suivant les critères : tous-les-nœuds, puis tous-les-arcs, puis tous-les-chemins-indépendants.

<details>
<summary>Correction</summary>

- Tous-les-nœuds : DT : n = 0, n = -1
- Tous-les-arcs : DT : n = 3, n = -2
- Tous-les-chemins-indépendants : DT : n = -1, n = -2, n = 1, n = 2

</details>

## Exercice 7

Proposer un jeu de tests pour la fonction `Function(a, b)` en cas de couverture : des nœuds, des arcs et des chemins indépendants du graphe de flot de contrôle.

```
1 : Function (a, b)
2 : If (a < 10)
3 :   c := a + b
4 :   a := a + 1
5 : If (b > 10)
6 :   d := a - b
7 :   b := b - 1
8 : EndIf
9 : EndIf
10 : EndFunction
```

<details>
<summary>Correction</summary>

- Couverture des instructions : (a=5, b=15)
- Couverture des arcs : (5,5) (20,5) (5,15)
- Couverture des chemins : complexité cyclomatique = e - v + 2 = 8 - 7 + 2 = 3 chemins indépendants
- Jeu de test : (5,5) (20,5) (5,15)

</details>

## Exercice 8

Proposer un jeu de tests pour le programme P en cas de couverture : des nœuds, des arcs du graphe de flot de contrôle.

```
Programme P :
1 : Fonction(int a, int b, int c)
2 :   d := a+b+c
3 :   if (a = b)
4 :     d := d*2
5 :   else if (a = c)
6 :     d = d/2
7 :   else
8 :     d = a
9 :   endif
10 :  endif
11 :  while (c > 10)
12 :    d := d+b+a
13 :    c := c-1
14 :    if (b > a)
15 :      d := d*5
16 :    endif
17 :  endwhile
18 : endFunction
```

<details>
<summary>Correction</summary>

a) Couverture des instructions (à revoir) :

- `D1{(a,b,c) | b > a, c>10, c≠a}` ; `D2{(a,b,c) | a=b}` ; `D3{(a,b,c) | a≠b, a=c}`
- (5,10,20), (5,5,5), (5,10,5)

b) Couverture des arcs :

- `D1{(a,b,c) | a=b, c>10}` ; `D2{(a,b,c) | b>a, c=a, c>10}` ; `D3{(a,b,c) | b>a, c≠a, c>10}`
- (5,5,15), (15,10,15), (15,10,20)

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/gl-correction-td6.pdf" />

</TabItem>
</Tabs>
