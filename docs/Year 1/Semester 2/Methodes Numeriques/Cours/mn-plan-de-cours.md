---
sidebar_position: 1
title: Plan de Cours - Méthodes Numériques
sidebar_label: Plan de cours
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Plan de Cours : Méthodes Numériques

*ENSI — Niveau II1 — Semestre S2 — Durée : 14 semaines de cours — A.U. 2025-2026*

## Objectifs spécifiques

1. Introduire les différentes méthodes numériques pour résoudre des problèmes mathématiques issus de problèmes réels : physique, mécanique, environnement...
2. Introduire l'erreur commise en utilisant les méthodes d'approximation numérique pour résoudre des problèmes mathématiques.
3. Comparer les différentes méthodes par rapport à la précision, la mémoire utilisée, le nombre d'opérations et/ou le temps de calcul nécessaires pour chaque méthode.
4. Approfondir les notions de convergence et de stabilité des méthodes numériques.
5. Inciter les étudiants à utiliser les logiciels de calcul pour résoudre les exercices : Maple, Matlab, Python...

## Description / Sommaire

### Chapitre I - Interpolation

**I. Interpolation de Lagrange**
1. Formule de Lagrange, Formule de Newton (différences divisées)
2. Estimation de l'erreur d'interpolation de Lagrange
3. Interpolation aux points de Tchebychev
4. Convergence et stabilité (phénomène de Runge)

**II. Interpolation par morceaux**
1. Les Splines Cubiques

### Chapitre II - Intégration numérique

1. Méthodes de quadratures élémentaires et méthodes composées
2. Méthodes de Newton-Côtes
3. Erreur d'intégration
4. Les méthodes de Gauss : Principe, erreur d'intégration de Gauss

### Chapitre III - Résolution numérique des équations non linéaires

1. Méthode de la bissection et position du problème
2. Méthode de Lagrange
3. Méthode de Newton
4. Méthode du point fixe
5. Étude de la convergence
6. Évaluation de l'erreur
7. Ordre d'une méthode

### Chapitre IV - Résolution numérique des systèmes linéaires

**I. Méthodes directes**
1. Méthode d'élimination de Gauss
2. Factorisation LU
3. Méthode de Cholesky

**II. Méthodes itératives**
1. Principe général
2. Méthode de Jacobi
3. Méthode de Gauss-Seidel
4. Méthode de Relaxation
5. Convergence des méthodes itératives

**III. Méthodes du gradient**
1. La méthode du gradient à pas fixe
2. La méthode du gradient à pas optimal
3. La méthode du gradient conjugué
4. Conditionnement d'une matrice
5. Pré-conditionnement
6. Gradient conjugué pré-conditionné

### Chapitre V - Calcul des valeurs et vecteurs propres

1. Introduction
2. La méthode de la puissance
   - Algorithme de la méthode de la puissance
   - La méthode de la puissance inverse
3. La méthode de Jacobi
4. La méthode QR

## Références bibliographiques

1. S.C. Chapra, and R.P. Canale – *Numerical methods for engineers*, volume 2, McGraw-Hill, New York, 1998.
2. A.M. Quarteroni, R. Sacco, F. Saleri – *Méthodes numériques pour le calcul scientifique : programmes en MATLAB*. Springer Science & Business Media, 2000.
3. A.M. Quarteroni, R. Sacco, F. Saleri – *Numerical Mathematics*, Texts in Applied Mathematics, Springer-Verlag, 2006.
4. A. Quarteroni, F. Saleri – *Calcul scientifique, Cours, exercices corrigés et illustrations en MATLAB et Octave*, Springer, 2006.
5. Y. Saad – *Iterative Methods for sparse linear systems*. PWS Publishing Company, Boston, 1996.
6. R. Théodor – *Initiation à l'analyse numérique*, Masson, 1992.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/mn-plan-de-cours.pdf" />

</TabItem>
</Tabs>
