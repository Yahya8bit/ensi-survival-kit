---
sidebar_position: 2
title: "Chapitre 1 : Formulation et Résolution graphique d'un programme linéaire"
sidebar_label: Ch1 - Formulation et résolution graphique
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 1 : Formulation et Résolution graphique d'un programme linéaire

*ENSI — N. Elloumi — RO : Programmation linéaire*

## Exemple : Problème de fabrication

Une entreprise fabrique deux types de ceintures : A et B. Le type A est de meilleure qualité que le type B. Le bénéfice net est 2 \$ pour le type A est 1,5\$ pour le type B. Le temps de fabrication pour le type A est deux fois le temps de fabrication pour le type B et si toutes les ceintures étaient du type B l'entreprise pourrait en fabriquer 1000 par jour. L'approvisionnement en cuir est suffisant pour 800 ceintures par jour (type A ou B). Enfin, 400 boucles de type A et 700 boucles de type B sont disponibles chaque jour.

Quels sont les nombres respectifs de ceintures des deux types à fabriquer chaque jour de manière à maximiser le bénéfice total de l'entreprise ?

## I. Formulation d'un PL

On doit structurer le problème posé à l'aide d'un modèle mathématique permettant :

- D'identifier les variables inconnues du problème
- De présenter les limitations sous forme d'équations de contraintes linéaires
- De traduire l'objectif du problème par une fonction linéaire

### Problème de fabrication

**Les variables :**

- $x_1$ : Le nombre de ceintures de type A à fabriquer chaque jour
- $x_2$ : Le nombre de ceintures de type B à fabriquer chaque jour

**Les contraintes :**

$$x_1 \le 400 \qquad x_2 \le 700 \qquad x_1 + x_2 \le 800 \qquad 2x_1 + x_2 \le 1000$$

**Fonction bénéfice à maximiser :**

$$Z = 2x_1 + \frac{3}{2}x_2$$

$$
\left\{
\begin{aligned}
&Max\ Z = 2x_1 + \frac{3}{2}x_2 \\
&\text{Sous contraintes} \\
&x_1 \le 400 \\
&x_2 \le 700 \\
&x_1 + x_2 \le 800 \\
&2x_1 + x_2 \le 1000 \\
&x_1 \ge 0;\ x_2 \ge 0
\end{aligned}
\right.
$$

### Écriture matricielle d'un programme linéaire

$$Z = 2x_1 + \frac{3}{2}x_2 = \left(2, \frac{3}{2}\right)\begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = {}^t\!cx$$

$$
\begin{cases}
x_1 \le 400 \\
x_2 \le 700 \\
x_1 + x_2 \le 800 \\
2x_1 + x_2 \le 1000
\end{cases}
\;\Rightarrow\;
\begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 1 & 1 \\ 2 & 1 \end{pmatrix}
\begin{pmatrix} x_1 \\ x_2 \end{pmatrix}
\le
\begin{pmatrix} 400 \\ 700 \\ 800 \\ 1000 \end{pmatrix}
\;\Leftrightarrow\; Ax \le b
$$

$$x_1 \ge 0;\ x_2 \ge 0 \quad \text{ou} \quad x = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} \ge 0$$

D'où la forme générale équivalente :

$$
\left\{
\begin{aligned}
&Max\ Z = {}^t\!cx \\
&\text{Sous contraintes} \\
&Ax \le b \\
&x \ge 0
\end{aligned}
\right.
$$

## II. Résolution graphique d'un PL

<!-- TODO: page 5 of the source is a hand-drawn coordinate-plane graph (not a source diagram made of reproducible ASCII-art/shapes — a genuine plotted figure), so it is described in prose here rather than faithfully re-rendered; refer to the PDF tab for the actual figure. -->

Le graphique trace le polygone des solutions réalisables défini par les quatre contraintes ($x_1 \le 400$, $x_2 \le 700$, $x_1 + x_2 \le 800$, $2x_1 + x_2 \le 1000$) dans le premier quadrant, ainsi qu'une famille de droites parallèles $Z = 2x_1 + \frac{3}{2}x_2 = c^{te}$ que l'on déplace dans la direction du gradient (flèche orange) jusqu'à toucher le dernier sommet du polygone avant de le quitter. Le sommet optimal indiqué sur le graphique est $(200, 600)$.

- On rappelle que le gradient de la fonction coût $Z$, noté $\nabla Z$, est un vecteur défini par :

$$
\nabla Z = \begin{pmatrix} \dfrac{\partial Z}{\partial x_1} \\ \vdots \\ \dfrac{\partial Z}{\partial x_n} \end{pmatrix}
$$

Montrer que le vecteur transposé du gradient, $(\nabla Z)^t$, de la fonction coût est une direction d'augmentation de celui-ci en tout point $x^0$. (Indication : utiliser le développement en série de Taylor de la fonction $Z$ au voisinage de $x^0$).

- **Pour un problème de maximisation** : La droite, parallèle à la droite $Z=0$, et qui est la plus éloignée de l'origine, c'est celle qui passe par la solution optimale.
- **Pour un problème de minimisation** : La droite, parallèle à la droite $Z=0$, et qui est la plus proche de l'origine, c'est celle qui passe par la solution optimale.
- **Remarque** : un problème de programmation linéaire peut :
  - Ne pas admettre de solution.
  - Avoir une infinité de solutions.

## Exercice 1

Une entreprise du secteur automobile fabrique des voitures et des camions. Chaque véhicule doit être traité dans l'atelier de peinture et dans l'atelier de carrosserie. La capacité de l'atelier de peinture permet de traiter 40 camions par jour (si l'on ne peint que des camions), ou 60 voitures par jour (si l'on ne peint que des voitures). De la même façon la capacité de l'atelier de carrosserie est limitée à 50 camions par jour et à 50 voitures par jour. Chaque camion produit rapporte 600\$, et chaque voiture 400\$. Déterminer un plan de production quotidien qui permette de maximiser le profit de l'entreprise.

<!-- TODO: source PDF has an apparent OCR/typo artifact "pro.t" for "profit" in the exercise statement — transcribed as "profit" here per evident intent, flagged per CLAUDE.md §5 rather than left as "pro.t". -->

## Exercice 2

Résoudre graphiquement

$$
(P_2)
\left\{
\begin{aligned}
&Max\ Z = x_1 + 2x_2 \\
&\text{S.C} \\
&-2x_1 + x_2 \le 2 \\
&-x_1 + 2x_2 \le 5 \\
&x_1 - 4x_2 \le 4 \\
&x_i \ge 0
\end{aligned}
\right.
\qquad
\text{Solution Non Bornée}
$$

$$
(P_3)
\left\{
\begin{aligned}
&Min\ Z = x_2 - x_1 \\
&\text{S.C} \\
&2x_1 - x_2 \ge -2 \\
&x_1 - x_2 \le 2 \\
&x_1 + x_2 \le 5 \\
&x_i \ge 0
\end{aligned}
\right.
\qquad
\text{Une infinité de solutions}
$$

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/pl-ch1-formulation-resolution-graphique.pdf" />

</TabItem>
</Tabs>
