---
sidebar_position: 5
title: Chapitre IV - Résolution Numérique des Systèmes Linéaires
sidebar_label: Ch4 - Systèmes linéaires
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre IV : Résolution numérique des systèmes linéaires

*ENSI — II1 — 2022/2023*

## Introduction

On se propose de résoudre les systèmes linéaires $(SL) : Ax = b$, $A \in \text{Mat}_n(IR)$, $b, X \in IR^n$.

$(SL)$ admet une solution $\iff$ $A$ est inversible $\iff$ $\det(A) \neq 0$. Par la méthode de Cramer, $x_k = \det(A_k)/\det(A) = \Delta_k/\Delta$, où $A_k$ est la matrice obtenue en remplaçant la kᵉ colonne de $A$ par $b$.

Le calcul de $\det(A)$ nécessite de l'ordre de $n\cdot n!$ opérations, et la méthode de Cramer de l'ordre de $n^2\cdot n!$ opérations. Pour $n = 18$ : ~200 ans de calcul (à $10^6$ opérations/s) ; pour $n = 50$ : ~$2,4\cdot10^{54}$ ans !

D'où la nécessité de développer des méthodes plus économiques. On distingue :
1. **Les méthodes directes**, qui atteignent la solution en un nombre fini d'opérations.
2. **Les méthodes itératives**, qui construisent une suite de vecteurs convergeant vers la solution.

## Partie I : Rappels d'algèbre linéaire

### Norme matricielle

Une **norme matricielle** est une norme sur $M_n(C)$ compatible avec la multiplication : $\|AB\| \le \|A\|\|B\|$, en plus des axiomes usuels de norme.

**Exemple — norme de Frobenius** : $\|A\|_F = \sqrt{\sum_{ij} |a_{ij}|^2} = \sqrt{\text{tr}({}^{t}AA)}$.

### Rayon spectral

Le **rayon spectral** de $A \in M_n(IR)$, de valeurs propres $\lambda_i$, est $\rho(A) = \max_{1\le i\le n} |\lambda_i|$. *(Ce n'est pas une norme.)*

### Norme induite (subordonnée)

Pour une norme vectorielle $\|\cdot\|_v$ sur $C^n$, la norme induite est $\|A\| = \max_{x\neq 0} \|Ax\|_v/\|x\|_v$. Toute norme subordonnée vérifie $\|Ax\|_v \le \|A\|\|x\|_v$ et $\|I_n\| = 1$.

**Exemples** (pour $A = (a_{ij}) \in M_n(IR)$) :

| Norme vectorielle | Norme matricielle induite |
|---|---|
| $\|x\|_1 = \sum_i \lvert x_i \rvert$ | $\|A\|_1 = \max_j \sum_i \lvert a_{ij} \rvert$ (max des sommes en colonne) |
| $\|x\|_2$ (euclidienne) | $\|A\|_2 = \sqrt{\rho({}^{t}AA)} = \|{}^{t}A\|_2$ |
| $\|x\|_\infty = \max_i \lvert x_i \rvert$ | $\|A\|_\infty = \max_i \sum_j \lvert a_{ij} \rvert = \|{}^{t}A\|_1$ (max des sommes en ligne) |

:::note Attention
La norme $\|A\| = \sqrt{\sum_{ij} |a_{ij}|^2}$ (variante de Frobenius) n'est **pas** subordonnée dès que $n \ge 2$, car $\|I\| = \sqrt{n} \neq 1$.
:::

### Conditionnement d'une matrice

Pour $\|\cdot\|$ subordonnée et $A$ inversible : $\text{cond}(A) = \|A\|\cdot\|A^{-1}\|$. En pratique : $\text{cond}_p(A) = \|A\|_p\cdot\|A^{-1}\|_p$, $p = 1, 2, \infty$.

**Propriétés** ($A, B$ inversibles, $\alpha \neq 0$) :
1. $\text{cond}(A) \ge 1$ et $\text{cond}(I) = 1$.
2. $\text{cond}(\alpha A) = \text{cond}(A)$.
3. $\text{cond}(A) = \text{cond}(A^{-1})$.
4. $\text{cond}(AB) \le \text{cond}(A)\cdot\text{cond}(B)$.

**Caractérisation pour la norme 2** ($A$ symétrique inversible) : $\text{cond}_2(A) = \lambda_{\max}/\lambda_{\min}$, où $\lambda_{\max}, \lambda_{\min}$ sont les valeurs propres extrêmes en valeur absolue.

Une matrice est **bien conditionnée** si $\text{cond}(A) \approx 1$ : de petites perturbations sur les données induisent de petites perturbations sur la solution (stabilité).

### Majoration de l'erreur relative

- **Perturbation sur b** ($\tilde{x}$ sol. de $Ax=b$, $\tilde{x}+\delta\tilde{x}$ sol. de $Ax=(b+\delta b)$) : $\|\delta\tilde{x}\|/\|\tilde{x}\| \le \text{cond}(A)\cdot\|\delta b\|/\|b\|$.
- **Perturbation sur A** ($\tilde{x}+\delta\tilde{x}$ sol. de $(A+\delta A)x=b$) : $\|\delta\tilde{x}\|/\|\tilde{x}+\delta\tilde{x}\| \le \text{cond}(A)\cdot\|\delta A\|/\|A\|$.
- **Perturbation sur A et b simultanément** (majoration optimale) :
  $$
  \frac{\|\delta\tilde{x}\|}{\|\tilde{x}\|} \le \frac{\text{cond}(A)}{1 - \|\delta A\|\|A^{-1}\|} \cdot \left(\frac{\|\delta b\|}{\|b\|} + \frac{\|\delta A\|}{\|A\|}\right)
  $$

## Partie II : Méthodes directes

### Principe

On cherche $M$ inversible telle que $MA$ soit triangulaire supérieure $B$, et on résout $BX = c$ ($c = Mb$) par la **méthode de remontée** : on calcule $x_n$, puis $x_{n-1}$, ..., $x_1$.

### Méthode de Gauss

On construit $A^{(1)} = A$, puis à chaque étape $k$, on choisit un pivot $a^{(k)}_{ik} \neq 0$, on permute au besoin (matrice de transposition $P^{(k)} = T^{(k,i)}$), puis on élimine via la matrice élémentaire $E^{(k)}$ telle que $(E^{(k)})_{i,k} = -\alpha_{ik}/\alpha_{kk}$ pour $i > k$. On obtient $A^{(k+1)} = E^{(k)}P^{(k)}A^{(k)}$.

**Théorème.** Toute matrice inversible $A$ admet une matrice $M$ inversible telle que $MA$ soit triangulaire supérieure, avec $M = E^{(n-1)}P^{(n-1)}\cdots E^{(1)}P^{(1)}$.

**Algorithme de Gauss :**
```
Pour k = 1,...,n-1
  Pour i = k+1,...,n
    l_ik = a_ik^(k) / a_kk^(k)
    Pour j = k+1,...,n
      a_ij^(k+1) = a_ij^(k) - l_ik * a_kj^(k)
```
Les $a_{kk}^{(k)}$ sont les **pivots** et doivent être non nuls. **Coût : ~$2n^3/3$ opérations.**

#### Stratégie du pivot

Diviser par un pivot "trop petit" cause des erreurs d'arrondi catastrophiques (voir l'exemple classique $10^{-6}x_1+x_2=1,\ x_1+x_2=2$ : le résultat calculé avec le pivot $10^{-6}$ est faux, alors qu'en permutant les lignes pour prendre le plus grand pivot, le résultat est correct).

- **Stratégie du pivot partiel** : à l'étape $k$, le pivot est $a^{(k)}_{pk}$ tel que $|a^{(k)}_{pk}| = \max_{k\le i\le n} |a^{(k)}_{ik}|$ (recherche dans la colonne $k$).
- **Stratégie du pivot total** : le pivot est $a^{(k)}_{pq}$ tel que $|a^{(k)}_{pq}| = \max_{k\le i,j\le n} |a^{(k)}_{ij}|$ (recherche dans toute la sous-matrice restante, avec permutation de lignes **et** de colonnes).

### Factorisation LU

Si l'on n'effectue aucune permutation, $A^{(n)} = E^{(n-1)}\cdots E^{(1)}A$ est triangulaire supérieure, et $A = LU$ avec $U = A^{(n)}$ et $L = (E^{(n-1)}\cdots E^{(1)})^{-1}$ triangulaire inférieure à diagonale unité.

**Proposition.** La factorisation LU de $A$ (inversible, d'ordre $n$) existe **ssi** tous ses mineurs principaux d'ordre $1,\ldots,n$ sont non nuls.

Une fois $L$ et $U$ calculées, on résout $Ax=b$ via deux systèmes triangulaires :
- $Ly = b$ par la **méthode de descente** : $y_1 = b_1/l_{11}$, $y_i = (b_i - \sum_{j<i} l_{ij}y_j)/l_{ii}$ — coût $n^2$.
- $Ux = y$ par la **méthode de remontée** : $x_n = y_n/u_{nn}$, $x_i = (y_i - \sum_{j>i} u_{ij}x_j)/u_{ii}$ — coût $n^2$.

**Intérêt majeur** : pour résoudre plusieurs systèmes $Ax=b$ avec la même $A$, on ne calcule $L$, $U$ qu'une fois.

### Matrice symétrique définie positive

$A$ symétrique est **définie positive** ssi $\forall x \in IR^n\setminus\{0\} : (Ax,x) > 0$.

**Matrice à diagonale strictement dominante** : $|a_{ii}| > \sum_{j\neq i}|a_{ij}|$ pour tout $i$. *(Remarque : une matrice symétrique réelle à diagonale strictement dominante avec coefficients diagonaux positifs est définie positive.)*

**Proposition.** Si $A$ est symétrique définie positive, alors $A = LU$.

### Méthode de Cholesky

**Théorème.** Si $A$ est symétrique définie positive, il existe une matrice triangulaire inférieure $B$ telle que $A = B{}^{t}B$ (unique si les éléments diagonaux de $B$ sont imposés positifs).

**Résolution de $Ax=b$** : calculer $A = B{}^{t}B$, puis résoudre $By = b$ (descente) puis ${}^{t}Bx = y$ (remontée).

**Algorithme (colonne par colonne) :**
```
Pour j = 1 à n
    b_jj = √(a_jj - Σ_{k=1}^{j-1} b_jk²)
    Pour i = j+1 à n
        b_ij = (1/b_jj)(a_ij - Σ_{k=1}^{j-1} b_ik*b_jk)
```
**Coût : ~$n^3/3$ opérations** (deux fois moins que Gauss général, car exploite la symétrie).

### Systèmes tridiagonaux : algorithme de Thomas

Si $A$ est tridiagonale (éléments $a_i$ diagonaux, $e_i$/$c_i$ sous/sur-diagonaux) et que sa factorisation LU existe, $L$ et $U$ sont **bidiagonales** :
$$
\alpha_1 = a_1, \qquad \beta_i = e_i/\alpha_{i-1}, \qquad \alpha_i = a_i - \beta_i c_{i-1}, \quad i=2,\ldots,n
$$
Puis $Ly=b$ : $y_1=b_1$, $y_i = b_i - \beta_i y_{i-1}$. Et $Ux=y$ : $x_n=y_n/\alpha_n$, $x_i = (y_i-c_i x_{i+1})/\alpha_i$. **Coût : de l'ordre de n opérations** (au lieu de $2n^3/3$).

### Résumé — méthodes directes

- La factorisation LU (dite **de Gauss** quand on fixe $\text{diag}(L)=1$) existe et est unique ssi les mineurs principaux d'ordre $1$ à $n-1$ sont non nuls. Coût général : $2n^3/3$ ; cas tridiagonal : $n$.
- Pour $A$ symétrique définie positive : factorisation de **Cholesky** $A=B{}^{t}B$, coût $n^3/3$.
- $\det(A) = \det(L)\cdot\det(U) = \prod_i u_{ii}$ — la factorisation LU permet donc de calculer un déterminant en $O(n^3)$ au lieu de $O(n!)$.
- **Sous MATLAB** : `[L,U]=lu(A)` (ou `[L,U,P]=lu(A)` avec pivot), `R=chol(A)` (renvoie $R = {}^{t}B$), `A\b` résout $Ax=b$ en choisissant automatiquement l'algorithme adapté (Thomas si tridiagonal creux).

## Partie III : Méthodes itératives

### Principe

Pourquoi des méthodes itératives ? Les méthodes directes, sur un système de grande taille, accumulent des erreurs de calcul proportionnelles au nombre d'opérations, et exploitent des propriétés algébriques exactes difficiles à contrôler numériquement.

On décompose $A = M - N$ ($M$ inversible) : $Ax=b \iff Mx = Nx+b$. Pour $x^{(0)}$ donné, on définit :
$$
x^{(k+1)} = M^{-1}(Nx^{(k)} + b) = Cx^{(k)} + d, \qquad C = M^{-1}N, \quad d = M^{-1}b
$$
$C$ est la **matrice de la méthode itérative**.

**Théorème (convergence).** La suite $(x^{(k)})$ converge, pour tout $x^{(0)}$, vers la solution de $(I-C)x=d$ **ssi** $\rho(C) < 1$.

**Cas particulier.** Si $A$ symétrique définie positive, $A=M-N$, $C=M^{-1}N=I-M^{-1}A$. Si $M+{}^{t}N$ est définie positive, alors $\rho(C)<1$.

**Conclusion pratique** : décomposer $A=M-N$ avec $M$ inversible et soit $\rho(M^{-1}N)<1$ (le plus petit possible), soit (cas SDP) $M+{}^{t}N$ définie positive.

### Décomposition D − L − U

Pour $A$, on définit $D$ (diagonale), $L$ ($l_{ij}=-a_{ij}$ si $i>j$, triangulaire inférieure stricte, opposée) et $U$ ($u_{ij}=-a_{ij}$ si $i<j$, triangulaire supérieure stricte, opposée), de sorte que $A = D - L - U$.

### Méthode de Jacobi

$$
D x^{(k+1)} = (L+U) x^{(k)} + b \quad\iff\quad x^{(k+1)} = D^{-1}(L+U) x^{(k)} + D^{-1}b = J x^{(k)} + d_J
$$
$D$ inversible ssi tous les $a_{ii} \neq 0$. $J = D^{-1}(L+U)$ est la **matrice de Jacobi**. Convergence ssi $\rho(J) < 1$.

**Conditions suffisantes de convergence** :
- Si $A$ est à **diagonale strictement dominante**, Jacobi converge pour tout $x^{(0)}$.
- Si $A$ et $2D-A$ sont symétriques définies positives, Jacobi converge.

### Méthode de Gauss-Seidel

$$
(D-L) x^{(k+1)} = U x^{(k)} + b \quad\iff\quad x^{(k+1)} = (D-L)^{-1}U x^{(k)} + (D-L)^{-1}b = L_1 x^{(k)} + d
$$
$D-L$ triangulaire inférieure, inversible ssi $a_{ii} \neq 0$ pour tout $i$. On résout à chaque itération le système (sans calculer $(D-L)^{-1}$). $L_1 = (D-L)^{-1}U$ est la **matrice de Gauss-Seidel**. Convergence ssi $\rho(L_1) < 1$.

**Conditions suffisantes** :
- Si $A$ à diagonale strictement dominante, Gauss-Seidel converge quel que soit $x^{(0)}$.
- Si $A$ symétrique définie positive, Gauss-Seidel converge quel que soit $x^{(0)}$.

### Comparaison Jacobi / Gauss-Seidel

**Théorème.** Si $A$ est **tridiagonale**, $\rho(L_1) = (\rho(J))^2$. Les deux méthodes convergent ou divergent **simultanément**, et quand elles convergent, **Gauss-Seidel converge plus vite**.

### Méthode de relaxation

Pour $\omega \neq 0$ :
$$
M = \frac{D}{\omega} - L, \qquad N = \frac{1-\omega}{\omega} \cdot D + U
$$
$M$ inversible ssi $a_{ii} \neq 0$ pour tout $i$. On résout $\left(\frac{D}{\omega} - L\right)x^{(k+1)} = \left(\frac{1-\omega}{\omega}D+U\right)x^{(k)} + b$.

- $\omega = 1$ : méthode de **Gauss-Seidel**.
- $\omega > 1$ : **sur-relaxation**. $\omega < 1$ : **sous-relaxation**.

$L_\omega = \left(\frac{D}{\omega}-L\right)^{-1}\left(\frac{1-\omega}{\omega}D+U\right)$ est la **matrice de relaxation**.

**Condition suffisante (SOR).** Si $A$ symétrique définie positive, la relaxation converge pour $\omega \in ]0,2[$.

**Condition nécessaire.** $\rho(L_\omega) \ge |\omega-1|$ ; la méthode **diverge** pour tout $\omega \notin [0,2]$.

**Théorème (cas tridiagonal).** Si toutes les valeurs propres de $J$ sont réelles et $< 1$ en valeur absolue : Jacobi et relaxation convergent ou divergent simultanément, et il existe un paramètre optimal :
$$
\omega_0 = \frac{2}{1 + \sqrt{1-(\rho(J))^2}}
$$
qui minimise $\rho(L_\omega)$ : $\forall \omega \in ]0,2[,\ \rho(L_\omega) \ge \rho(L_{\omega_0}) = \omega_0 - 1$.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/mn-ch4-rnsl.pdf" />

</TabItem>
</Tabs>
