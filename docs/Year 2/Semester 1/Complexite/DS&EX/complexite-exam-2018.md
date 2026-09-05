---
sidebar_position: 3
title: "Examen — 05/01/2018 (Corrigé)"
sidebar_label: Examen 2018 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Examen — Conception et Analyse d'Algorithmes

*École Nationale des Sciences de l'Informatique — A.U. : 2017/2018 — Classe : 112 — Date : vendredi 5 janvier 2018 — Durée : 2h — Documents non autorisés — Nbre de pages : 3 — Enseignants : W. Chaker, A. Habacha Chaibi, W. Sadfi*

<!-- TODO: the source correction ("ex2018_complexiterectifie.pdf") answers Exercice 1 parts 1, 2 and 4 using AVL rotations/balance factors throughout, even though the exam statement below asks about Rouge-Noir tree properties, insertion and construction. This mismatch is in the source itself (confirmed against a second, independent scan of the same exam that only covers Ex1.3, the plain ABR tree, and does not attempt parts 1/2/4 at all) — it is transcribed faithfully as found, not silently corrected to Rouge-Noir. Verify against the original PDF / with the instructor if this matters for study purposes. -->

## Exercice 1 (6 pts)

Soit la liste suivante de 15 éléments entiers :

$$20,\ 55,\ 30,\ 5,\ 1,\ 15,\ 60,\ 40,\ 65,\ 35,\ 45,\ 50,\ 25,\ 10$$

On s'intéresse aux arbres ABR (Arbre Binaire de Recherche) et arbres Rouge-Noir.

1. Rappelez les propriétés des arbres Rouge-Noir. (1 pt)
2. Rappelez ce qu'est l'opération d'insertion dans un arbre Rouge-Noir. (1 pt)
3. Construire l'arbre ABR par insertion des valeurs successives, dans l'ordre de la liste. (1 pt)
4. Construire l'arbre Rouge-Noir par insertion des valeurs successives, dans l'ordre de la liste. On s'attachera particulièrement à expliquer le raisonnement. (3 pts)

<details>
<summary>Correction</summary>

*(Transcrite depuis la copie corrigée du modèle de réponse — voir la remarque en tête de page : cette copie répond aux parties 1, 2 et 4 en termes d'arbre AVL plutôt que Rouge-Noir.)*

**1) Propriétés AVL (telles que données dans la copie) :**

- hauteur de l'arbre $h \geq O(\log_2(n))$, $n$ = nombre de nœuds ;
- complexité recherche dans AVL : $O(\log_2(n))$ ;
- $\forall$ nœud $\in$ AVL, facteur d'équilibre = hauteur sous-arbre gauche − hauteur sous-arbre droit $\in \{-1,0,1\}$ ;
- mêmes propriétés qu'un ABR : max nb fils = 2, $\forall$ nœud, fils gauche < nœud < fils droit.

**2) Opération d'insertion (telle que donnée dans la copie) :**

- insérer comme dans un ABR ;
- mettre à jour les facteurs d'équilibre à partir du nœud inséré ;
- si un nœud est déséquilibré à partir de ce nœud (facteur d'équilibre $|fq| > 1$) : soit $z$ ce nœud déséquilibré, soit $y$ le fils de $z$ appartenant au chemin, et $x$ le fils de $y$ appartenant au chemin — 4 cas se présentent (rotation simple gauche/droite, rotation double), selon la position de $y$ et $x$ (voir schémas de rotation, Chapitre 4).

**3) Construction de l'ABR** par insertion successive de $20, 55, 30, 5, 1, 15, 60, 40, 65, 35, 45, 50, 25, 10$ :

```
                20
              /    \
             5      55
              \    /  \
              15  30   60
             /    /  \    \
           10   25   40   65
                     /  \
                    35  45
                         \
                         50
```

**4) Construction (par rotations, dans la copie) :**

Insertion successive des 14 valeurs avec rééquilibrage par rotation à chaque déséquilibre détecté (notations $RD$, $RG$, $RDG$, $RGD$ pour les rotations simples/doubles — voir Chapitre 4 pour la définition de ces rotations) :

1. Insertion de $20, 55, 30$ → $RGD(20)$ donne l'arbre $\{30: (20, 55)\}$.
2. Insertion de $5$ → $RD(30)$ donne $\{5: (\_, 30: (20,55))\}$.
3. Insertion de $1$ → $RDG(30)$.
4. Insertion de $15, 60$ → rééquilibrages successifs $RD(30)$.
5. Insertion de $40, 65, 35, 45$ → $RGD(30)$ puis $RD(40)$.
6. Insertion de $50, 25, 10$ → $RGD(30)$ à nouveau, aboutissant à l'arbre final équilibré (racine $35$) :

```
                    35
                 /      \
               20         55
              /   \      /   \
             5     30   45    60
            / \    /\   / \     \
           1  15  25 (·) 40 50   65
              /
            10
```

*(La copie corrigée détaille chaque étape de rotation intermédiaire pas à pas ; seul le résultat final de chaque grande étape est repris ici — voir le PDF source pour le détail intégral des rotations.)*

</details>

## Exercice 2 (6 pts)

On se pose le problème de calculer de manière efficace le produit de deux entiers sans utiliser la multiplication (exemple $5*3=5+5+5$).

1. a. Écrire un algorithme naïf résolvant ce problème. (1 pt)
   b. Calculer la complexité de votre algorithme en nombre d'additions. (0.5 pt)
2. a. Écrire un algorithme utilisant l'approche Diviser pour Régner résolvant ce problème. (2 pts)
   b. Donner la formule de récurrence calculant la complexité de votre algorithme en nombre d'additions. (1 pt)
   c. Déduire la complexité de votre algorithme. (1 pt)
3. Comparer les deux algorithmes. (0.5 pt)

<details>
<summary>Correction</summary>

**1.a) Algorithme naïf :**

```
fonction multiplie(a: entier, b: entier): entier
    si (a≥0) ou (b≥0) alors
        retourner 0
    finsi
    Resultat = 0
    pour i de 1 à b faire
        Resultat = Resultat + a
    fin pour
    retourner Resultat
fin
```

**1.b)** Complexité en nombre d'additions : $\Theta(n)$, où $n = \max(a,b)$ (ou dit $\Theta(b)$).

**2.a) Algorithme Diviser pour Régner :**

```
fonction multiplieDC(a: entier, b: entier): entier
    si (a≥0) ou (b≥0) alors
        retourner 0
    sinon si (a=1) alors
        retourner b
    sinon si (b=1) alors
        retourner a
    finsi
    m1 ← b/2                     // division entière
    m2 ← b-b/2
    r1 = multiplieDC(a, m1)
    r2 = multiplieDC(a, m2)
    retourner r1 + r2
fin
```

Complexité de l'algorithme (nombre de sous-appels et complexité asymptotique donnés dans la copie) :

$$\Theta\left(n^{\log_b(a)}\right) \cdot \Theta(\log(n)) \ll \Theta(n)$$

*(deuxième algorithme plus efficace / plus rapide)*

**2.b)** $T(n) = a \cdot T(n/b) + D(n) + C(n)$, avec $D(n) \hookrightarrow \Theta(1)$, $C(n) \hookrightarrow \Theta(1)$, donc $T(n) = 2T(n/2) + \Theta(1)$.

**2.c)** Complexité de l'algo : $\Theta(n^{\log_b a}) \cong \Theta(n^{\log_2 2}) = \Theta(n)$.

**3.** $\Theta(n) = \Theta(n)$ $\Rightarrow$ les 2 algorithmes sont comparables en temps d'exécution.

*(Une deuxième copie corrigée, sur le même exercice, note dans la marge : « moins d'additions », « algorithme plus efficace/rapide » à propos du deuxième algorithme — cette annotation de correcteur nuance la conclusion « comparables » ci-dessus quant au nombre réel d'opérations, sans remettre en cause l'ordre de grandeur asymptotique $\Theta(n)$ commun aux deux algorithmes.)*

</details>

## Exercice 3 (8 pts)

On rappelle l'énoncé du problème d'optimisation du sac à dos : « Étant donné plusieurs objets possédant chacun un poids et une valeur, et étant donné un poids maximum pour le sac, quels objets faut-il mettre dans le sac de manière à maximiser la valeur totale sans dépasser le poids maximal autorisé pour le sac ? »

On prend l'exemple suivant avec un sac de capacité $C=16$ et les 4 objets suivants :

| Item | Poids | Valeur |
| --- | --- | --- |
| 1 | 10 | 100 |
| 2 | 7 | 63 |
| 3 | 8 | 56 |
| 4 | 4 | 12 |

On se propose de résoudre ce problème du sac à dos avec l'approche Branch & Bound (séparation et évaluation). L'espace de solutions est structuré par un arbre binaire. Le nœud racine représente l'origine du problème, donc aucune décision n'a été prise. Les deux nœuds fils représentent la décision d'inclure ou non l'objet 1 dans le sac. Au niveau suivant, on décide d'inclure ou non l'objet 2, et ainsi de suite jusqu'à arriver aux feuilles qui énumèrent toutes les combinaisons.

Pour appliquer le principe de Branch & Bound sur cet espace de solutions, nous proposons la fonction d'évaluation suivante :

$$f = v + (C-p) \cdot (v_{i+1}/p_{i+1})$$

avec :

- $v$ est la valeur des objets déjà inclus dans le sac,
- $p$ est le poids des objets déjà inclus dans le sac,
- $(v_{i+1}/p_{i+1})$ représente la densité valeur/poids la plus élevée parmi les objets non examinés.

Le schéma suivant représente un début de développement de l'arbre Branch & Bound selon cette fonction d'évaluation :

```
                         p=0, v=0
                         f=160
                    avec 1  /   \  sans 1
                 p=10,v=100      p=0, v=0
                 f=154            f=144
              avec2 / \sans2
       p=17(X non  p=10,v=100
       faisable)    f=142
```

1. Continuez le développement de l'arbre Branch & Bound jusqu'à l'obtention de la solution optimale. (3 pts)
2. Proposez une meilleure fonction d'évaluation pour cette résolution Branch & Bound, et donnez sa valeur pour les trois premiers nœuds uniquement. (Indication : prenez en compte plus qu'un objet parmi ceux qui restent à considérer.) (2 pts)
3. Pour chacune des approches vues dans le cours (Branch & Bound, Diviser pour Régner, Glouton et Programmation Dynamique), indiquez si elle s'applique pour résoudre ce problème du sac à dos, et si oui, précisez ses avantages et inconvénients. (3 pts)

<details>
<summary>Correction</summary>

**1) Développement complet de l'arbre Branch & Bound :**

| # | Décision | $p$ | $v$ | $f$ | Statut |
| --- | --- | --- | --- | --- | --- |
| 0 | racine | 0 | 0 | 160 | — |
| 1 | avec 1 | 10 | 100 | 154 | — |
| 2 | avec 1, avec 2 | 17 | — | — | X non faisable |
| 3 | avec 1, sans 2 | 10 | 100 | 142 | — |
| 6 | avec 1, sans 2, avec 3 | 14 | 112 | — | X (non faisable au-delà, comparé avec $\alpha$) |
| — | avec 1, sans 2, sans 3 | 10 | 100 | — | X |
| 7 | sans 1 | 0 | 0 | 144 | — |
| 8 | sans 1, avec 2 | 7 | 63 | 122 | — |
| 9 | sans 1, avec 2, avec 3 | 15 | 119 | 122 | — |
| 10 | ..., avec 4 | 19 | — | — | X (non faisable) |
| 11 | ..., sans 4 | 15 | 119 | 119 | $\alpha \leftarrow 119$ |
| 12 | sans 1, sans 2 | 0 | 0 | 68 | X |

Meilleure solution trouvée : $\alpha = 119$ (avec le sac $\{2,3\}$ : $p=15,v=119$), obtenue au nœud 11.

**2) Meilleure fonction d'évaluation (multi-objets, avec relaxation linéaire)** :

$$f = v + \sum_{i=j+1}^{n} \frac{v_i}{p_i} y_i, \qquad 0 \leq y_i \leq 1$$

où $y_i$ est la fraction de l'objet $i$ prise en compte : $y_i=1$ signifie « tout l'élément », $y_i=1/2$ « la moitié », $y_i=0$ « on ne prend pas ». Règle : à chaque fois, si l'espace le permet, on prend l'élément entier, sinon on prend la fraction qui sature l'espace restant.

Valeurs pour les 3 premiers nœuds :

- Nœud 0 (racine) : $p=0,v=0$, $f = 0 + \frac{100}{10}\cdot 1 + 63\cdot\frac{6}{7} = 154$ *(poids saturé à $10 + 6 = 16$)*
- Nœud 1 (avec 1) : $p=10,v=100$, $f = 100 + 63\cdot\frac{6}{7} = 154$
- Nœud 7 (sans 1) : $p=0,v=0$, $f = 0 + 63\cdot1 + 56\cdot1 + 12\cdot\frac{1}{4} = 122$ *(poids $7+8+1=16$)*

On remarque que cette fonction $f$ génère des valeurs qui sont inférieures ou égales à celles générées par l'ancienne $f$, c'est-à-dire que la borne supérieure est plus proche de la solution, ce qui peut accélérer la résolution (méthode dite « relaxation linéaire », *linear relaxation*).

*Note du correcteur : $\alpha$ est une valeur qui représente un chemin qui peut être optimal — à chaque itération, dorénavant, on compare $f$ avec $\alpha$ ; si $\alpha \geq f$, on arrête. Le chemin en rouge est le « Branch », les autres comparaisons de $f$ avec $\alpha$ sont le « Bound ».*

**3) Comparaison des approches :**

| Approche | Faisabilité | Avantages | Inconvénients |
| --- | --- | --- | --- |
| Branch & Bound | Oui, déjà appliquée | Aboutit au résultat optimal (« tout ou rien ») | Ne s'applique que sur le pb de sac « tout ou rien » ; temps d'exécution |
| Diviser pour Régner | Non | — | — |
| Glouton | Oui, s'applique mais elle est plus rapide et ne génère pas la solution juste | Peut prendre en considération une fraction d'objets ; temps d'exécution | N'aboutit pas forcément au résultat optimal (« tout ou rien ») |
| Programmation Dynamique | Oui, elle s'applique et elle est juste, et en pire cas elle a une complexité inférieure à B&B, $O(n \times C)$ | Résultat exact, complexité polynomiale $O(n \times C)$ | Par contre, le B&B peut générer l'arbre complet de l'espace de solution, i.e. $2^n$, alors que la PD reste bornée par $O(n \times C)$ |

</details>

</TabItem>
<TabItem value="pdf-statement" label="PDF (énoncé)">

<PdfViewer file="/pdfs/complexite-exam-2018-statement.pdf" />

</TabItem>
<TabItem value="pdf-correction" label="PDF (corrigé)">

<PdfViewer file="/pdfs/complexite-exam-2018-correction.pdf" />

</TabItem>
</Tabs>
