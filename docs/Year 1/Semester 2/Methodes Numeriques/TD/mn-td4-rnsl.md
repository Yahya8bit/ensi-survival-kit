---
sidebar_position: 4
title: TD4 - Résolution Numérique des Systèmes Linéaires
sidebar_label: TD4 - Systèmes linéaires
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD4 : Résolution numérique des systèmes linéaires

*ENSI-II1 — Série d'exercices n°3 — 2022/2023*

## Exercice 1

Résoudre le système linéaire $Ax = b$ avec :

$$
A = \begin{bmatrix} 4 & 2 & 2 \\ 2 & 5 & 3 \\ 2 & 3 & 11 \end{bmatrix} \qquad b = \begin{bmatrix} 1 \\ -2 \\ 0 \end{bmatrix}
$$

1. Par la méthode de Gauss sans stratégie du pivot.
2. Expliquer comment utiliser la méthode de Gauss avec stratégie du pivot total (sans résoudre).
3. Peut-on résoudre le système par la factorisation de Cholesky ? Si oui, résoudre le système par cette méthode.

## Exercice 2

Soit le système linéaire $Ax = b$, avec :

$$
A = \begin{bmatrix} 1 & 1/2 & 1/2 \\ 1/2 & 1 & 1/2 \\ 1/2 & 1/2 & 1 \end{bmatrix}
$$

1. La matrice $A$ est-elle définie positive ?
2. a) $A$ admet-elle une décomposition LU ? Si oui, trouver cette décomposition.
   b) En déduire la décomposition de Cholesky de $A$.
   c) Comment résoudre le système $Ax=b$ ?
3. a) Montrer que la méthode de relaxation converge pour tout $\omega \in\, ]0,2[$.
   b) Écrire la matrice $J$ de la méthode de Jacobi correspondante. La méthode de Jacobi converge-t-elle ? Justifier.
   c) Écrire la matrice $L_1$ de la méthode de Gauss-Seidel correspondante. Calculer $\rho(L_1)$.
   d) La méthode de Gauss-Seidel converge-t-elle plus vite que celle de Jacobi ? Justifier.

## Exercice 3

Soit $(S) : Ax = b$, avec :

$$
A = \begin{bmatrix} 2 & 0 & 1 \\ 0 & 2 & 0 \\ 1 & 0 & 2 \end{bmatrix} \qquad b = \begin{bmatrix} 3 \\ 2 \\ 3 \end{bmatrix}
$$

1. On considère l'algorithme du gradient à pas constant $\alpha$ appliqué à $(S)$.
   - a) Pour quelles valeurs de $\alpha$, l'algorithme converge-t-il ?
   - b) Existe-t-il une valeur optimale de $\alpha$ pour laquelle la convergence de la méthode du gradient à pas fixe est la plus rapide ? Si oui, calculer cette valeur. On la notera $\alpha_0$.
   - c) Déterminer la suite $(x_k)_k$ générée par l'algorithme lorsque $x_0 = (0,0,0)^T$ et $\alpha = \dfrac{1}{2}$.
   - d) Faire 3 itérations de l'algorithme du gradient à pas constant.
2. a) Vérifier que la méthode du gradient à pas optimal appliquée à $(S)$ converge.
   b) On note $e_k$ l'erreur à la k-ème itération de la méthode du gradient à pas optimal. En admettant que :
      $$
      \|e_k\| = \frac{\text{cond}_2(A)-1}{\text{cond}_2(A)+1} \cdot \|e_{k-1}\|
      $$
      trouver le nombre minimum d'itérations nécessaire pour que l'erreur vérifie $\|e_k\| \le 10^{-3}$.

## Exercice 4

Pour $a$ un paramètre réel, on considère le système linéaire $(S) : Ax = b$, où :

$$
A = \begin{bmatrix} 1 & 0 & -a \\ -a & 1 & 1 \\ a & 0 & 1 \end{bmatrix} \qquad b \in \mathbb{R}^3
$$

1. Pour quelles valeurs de $a$, la matrice $A$ admet-elle une factorisation LU ?
2. Calculer cette factorisation lorsqu'elle est possible.
3. Utiliser la question précédente pour résoudre $(S)$ pour $b = (1-a, 2-a, 1+a)^T$.
4. On considère la décomposition classique de $A$ sous la forme $A = D-L-U$ où $D=I$, $L = \begin{bmatrix} 0&0&0\\ a&0&0\\ -a&0&0 \end{bmatrix}$ et $U = \begin{bmatrix} 0&0&a\\ 0&1&-1\\ 0&0&1 \end{bmatrix}$, $I$ étant la matrice identité d'ordre 3.
   - a) Calculer $J$ la matrice de Jacobi pour résoudre le système linéaire $(S)$.
   - b) Pour quelles valeurs de $a$, la méthode de Jacobi converge-t-elle pour résoudre $(S)$ ?
   - c) Soit $L_1$ la matrice de Gauss-Seidel pour résoudre $(S)$. Montrer que : $\det(\lambda(D-L)-U) = 0$ ssi $\lambda$ est une valeur propre de $L_1$.
   - d) On pose $C_\lambda = \lambda(D-L)-U$, $\lambda \in \mathbb{C}$. Déterminer $\det(C_\lambda)$.
   - e) En déduire le rayon spectral $\rho(L_1)$. Pour quelles valeurs de $a$ la méthode de Gauss-Seidel converge-t-elle pour résoudre $(S)$ ?
   - f) Donner une relation entre les rayons spectraux $\rho(J)$ et $\rho(L_1)$.
   - g) En cas de convergence, dire laquelle des deux méthodes est la plus rapide.

## Exercice 5 (supplémentaire) — Diagonale dominante et convergence

**Théorème (relaxation).** Soit $A$ à diagonale strictement dominante. Si $0 < \omega \le 1$, alors la méthode de relaxation est convergente.

Soit $a \in \mathbb{R}$ et soit :

$$
A = \begin{bmatrix} 1 & a & a \\ a & 1 & a \\ a & a & 1 \end{bmatrix}
$$

1. Pour quelles valeurs de $a$, $A$ est-elle définie positive ?
2. Pour quelles valeurs de $a$, la méthode de Gauss-Seidel est-elle convergente ?
3. Écrire la matrice $J$ de la méthode de Jacobi.
4. Pour quelles valeurs de $a$, la méthode de Jacobi converge-t-elle ?
5. Écrire la matrice $\ell_1$ de la méthode de Gauss-Seidel. Calculer $\rho(\ell_1)$.
6. Pour quelle valeur de $a$, la méthode de Gauss-Seidel converge-t-elle plus vite que celle de Jacobi ?

<details>
<summary>Correction (Exercice 5)</summary>

**1.** $A$ est symétrique (donc diagonalisable). $A(\alpha,\beta) = \begin{bmatrix}\beta&\alpha&\alpha\\ \alpha&\beta&\alpha\\ \alpha&\alpha&\beta\end{bmatrix}$ avec $\beta=1, \alpha=a$ : $\det(A(\alpha,\beta)-\lambda I) = \Delta(\alpha,\beta-\lambda) = (\beta-\lambda-\alpha)^2(\beta-\lambda+2\alpha)$. Racines : $\lambda_1 = \beta-\alpha$ (double), $\lambda_2 = \beta+2\alpha$. Avec $\beta=1$ : $\lambda_1 = 1-a$, $\lambda_2 = 1+2a$.

$A$ est définie positive ssi $\lambda_1, \lambda_2 > 0$, i.e. $1-a>0$ et $1+2a>0$, soit **$a \in\, ]-1/2, 1[$**.

*(Vérification alternative par forme quadratique : ${}^tx Ax = x_1^2+x_2^2+x_3^2 + a(2x_1x_2+2x_1x_3+2x_2x_3) \ge 0$ pour $a \in\, ]-1/2,1[$, avec égalité ssi $x=0$.)*

**2.** D'après le théorème du cours : si $A$ est à diagonale strictement dominante, alors la méthode de Gauss-Seidel converge ($\omega=1$). Il faut $1 > |a|+|a|$, soit $|a| < 1/2$.

**3.** $J = D^{-1}N$, $D=I_3$, $N=D-A$ :
$$
J = \begin{bmatrix} 0&-a&-a\\ -a&0&-a\\ -a&-a&0 \end{bmatrix} = A(-a,0)
$$

**4.** $\det(J-\lambda I) = \Delta(-a,-\lambda) = (-\lambda+a)^2(-\lambda-2a)$. Racines : $\lambda_1=a$ (double), $\lambda_2=-2a$. $\rho(J) = \max\{|a|, |2a|\} = 2|a|$.

La méthode de Jacobi converge ssi $\rho(J)<1$, i.e. **$|a| < 1/2$**.

**5.** $\ell_1 = (D-E)^{-1}F$, avec $D=I_3$, $-E=\begin{bmatrix}0&0&0\\ a&0&0\\ a&a&0\end{bmatrix}$, $-F=\begin{bmatrix}0&a&a\\ 0&0&a\\ 0&0&0\end{bmatrix}$.

$(D-E)^{-1} = \begin{bmatrix}1&0&0\\ -a&1&0\\ a^2-a&-a&1\end{bmatrix}$, d'où :
$$
\ell_1 = \begin{bmatrix} 0&-a&-a\\ 0&a^2&a^2-a\\ 0&-a(a^2-a)&-a^3+2a^2 \end{bmatrix}
$$

Le polynôme caractéristique de $\ell_1$ est $P_{\ell_1}(X) = -X[X^2+(a^3-3a^2)X+a^3]$. Les racines de $Q(X)=X^2+(a^3-3a^2)X+a^3$ sont déterminées via $\Delta = (a^3-3a^2)^2-4a^3$ :

- Si $\Delta>0$ : $\rho(\ell_1) = \max\left\{\left|\dfrac{3a^2-a^3-\sqrt\Delta}{2}\right|, \left|\dfrac{3a^2-a^3+\sqrt\Delta}{2}\right|\right\}$
- Si $\Delta<0$ : $\rho(\ell_1) = \left|\dfrac{3a^2-a^3}{2} - i\dfrac{\sqrt{-\Delta}}{2}\right|$
- Si $\Delta=0$ : $\rho(\ell_1) = \left|\dfrac{3a^2-a^3}{2}\right|$

**6.** La méthode de Gauss-Seidel converge pour $a \in\, ]-1/2,1/2[$. En comparant $\rho(\ell_1)$ et $\rho(J)$ (cas $\Delta=0$, $\rho(\ell_1)=\dfrac{|3a^2-a^3|}{2}$, $\rho(J)=2|a|$) :
$$
\rho(\ell_1)-\rho(J) = \frac{|3a^2-a^3|-4|a|}{2} = \frac{|a|}{2}\left(|3a-a^2|-4\right)
$$
$\rho(\ell_1) > \rho(J)$ ssi $|3a-a^2| > 4$. Donc $\rho(\ell_1) > \rho(J)$ sous les conditions $|3a^2-a^3|<2$ (Gauss-Seidel convergente), $2|a|<1$ (Jacobi convergente) et $|3a-a^2|>4$ (impossible dans cette plage). D'où **$\rho(\ell_1) < \rho(J)$ pour $4|a|<2$, i.e. $a \in\, ]-1/4, 1/4[$** : la méthode de Gauss-Seidel converge alors plus vite que celle de Jacobi.

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<p><strong>Sujet</strong></p>
<PdfViewer file="/pdfs/mn-td4-rnsl.pdf" />

<p><strong>Exercice supplémentaire</strong></p>
<PdfViewer file="/pdfs/mn-td4-rnsl-exo-supp.pdf" />

</TabItem>
</Tabs>
