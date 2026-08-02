---
sidebar_position: 2
title: TD2 - Intégration Numérique (avec corrigé)
sidebar_label: TD2 - Intégration numérique
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TD2 : Intégration numérique

*ENSI — A.U. 2025-2026 (corrigé A.U. 2020-2021)*

## Exercice 1

Soit $g: [a,b] \to \mathbb{R}$ une fonction de classe $C^2([a,b])$. On considère la formule de quadrature :

$$
(1) \qquad \int_a^b g(t)\, dt = \alpha \cdot g(a) + \frac{(b-a)^2}{2} \cdot g'(b) + E(g)
$$

où $\alpha$ est un paramètre réel.

1. Déterminer le réel $\alpha$ pour que la formule (1) soit exacte pour les polynômes constants.
2. Pour la valeur de $\alpha$ trouvée, montrer que la formule de quadrature (1) est exacte pour tout polynôme de degré inférieur ou égal à 1.
3. Déterminer l'ordre de cette formule.

<details>
<summary>Correction</summary>

1. La formule (1) est exacte pour les polynômes constants si $b - a = \alpha$.

2. Pour que la formule de quadrature (1) soit exacte pour tout polynôme de degré $\le 1$, il suffit de montrer que :
   $$
   \int_a^b t\, dt = \alpha \cdot a + \frac{(b-a)^2}{2}
   $$
   car la formule est déjà exacte pour les constantes. Or $\int_a^b t\, dt = \dfrac{b^2-a^2}{2}$ et $\alpha \cdot a + \dfrac{(b-a)^2}{2} = (b-a)a + \dfrac{(b-a)^2}{2} = \dfrac{b^2-a^2}{2}$. D'où $E(t) = 0$.

3. On a l'ordre $N \ge 1$.
   $$
   E(t^2) = \frac{b^3-a^3}{3} - (b-a)a^2 - \frac{(b-a)^2}{2} \cdot 2b = -\frac{2}{3}b^3 + \text{termes en } b^k,\ k\le 2
   $$
   Donc $E(t^2) \ne 0$, **N = 1**.

</details>

## Exercice 2

Soit $g$ une fonction de classe $C^3$ sur $[-1,1]$. On se donne la formule d'intégration numérique :

$$
(2) \qquad \int_{-1}^1 t \cdot g(t)\, dt = \alpha \cdot g(-1) + \beta \cdot g(1) + E(g)
$$

1. Calculer $\alpha$ et $\beta$ pour que la formule (2) soit de degré le plus élevé possible.
2. Déterminer l'ordre de cette formule.
3. Montrer qu'il existe $\eta \in [-1,1]$ tel que $E(g) = -\dfrac{2}{45} \cdot g^{(3)}(\eta)$. On pourra considérer le polynôme d'interpolation de Lagrange de la fonction $g$ aux points $-1, 0, 1$.
4. Déduire de la formule (2), une formule de quadrature pour le calcul de $\int_a^b \left(x - \dfrac{a+b}{2}\right) f(x)\, dx$, où $f$ est une fonction de classe $C^3$ sur $[a,b]$.

<details>
<summary>Correction</summary>

1. $E(1) = 0$ donc $0 = \alpha + \beta$. $E(t) = 0$ donc $\dfrac{2}{3} = -\alpha + \beta$, d'où $\alpha = -\dfrac{1}{3}$, $\beta = \dfrac{1}{3}$.

2. $E(t^2) = 0$ et $E(t^3) = -\dfrac{4}{15} \ne 0$. Donc **N = 2**.

3. Le polynôme d'interpolation de Lagrange $p$ de la fonction $g$ aux points $-1, 0, 1$ est de degré $\le 2$ donc $E(p) = 0$ :
   $$
   E(p) = \int_{-1}^1 t \cdot p(t)\, dt + \frac{1}{3}p(-1) - \frac{1}{3}p(1) = 0
   $$
   Donc $\displaystyle\int_{-1}^1 t \cdot p(t)\, dt = -\frac{1}{3}p(-1) + \frac{1}{3}p(1) = -\frac{1}{3}g(-1) + \frac{1}{3}g(1)$.

   Donc $E(g) = \displaystyle\int_{-1}^1 t \cdot g(t)\,dt - \int_{-1}^1 t \cdot p(t)\,dt = \int_{-1}^1 t(g(t)-p(t))\, dt = \int_{-1}^1 t \cdot \left[\frac{g^{(3)}(\xi_t)}{3!} \cdot t(t^2-1)\right] dt$, $\xi_t \in \,]-1,1[$.

   La fonction $t^2(t^2-1) \le 0$ sur $[-1,1]$, la formule de la moyenne implique :
   $$
   E(g) = \frac{g^{(3)}(\eta)}{3!} \cdot \int_{-1}^1 t^2(t^2-1)\, dt = \frac{g^{(3)}(\eta)}{3!} \cdot \left(\frac{2}{5} - \frac{2}{3}\right) = -\frac{2}{45} \cdot g^{(3)}(\eta)
   $$

4. Le changement de variable $x = \dfrac{b-a}{2} \cdot t + \dfrac{a+b}{2}$ donne :
   $$
   \begin{aligned}
   J = \int_a^b \left(x - \frac{a+b}{2}\right) f(x)\, dx
     &= \int_{-1}^1 \left(\frac{b-a}{2} \cdot t\right) f\!\left(\frac{b-a}{2} \cdot t + \frac{a+b}{2}\right) \cdot \frac{b-a}{2}\, dt \\
     &= \left(\frac{b-a}{2}\right)^2 \cdot \left(-\frac{1}{3}f(a) + \frac{1}{3}f(b)\right) - \frac{2}{45}\left(\frac{b-a}{2}\right)^5 f^{(3)}(\xi)
   \end{aligned}
   $$
   où $\xi = \dfrac{b-a}{2} \cdot \eta + \dfrac{a+b}{2} \in [a,b]$.

</details>

## Exercice 3

On considère l'intégrale :

$$
I = \int_1^2 \frac{1}{x}\, dx
$$

1. Calculer la valeur exacte de $I$.
2. Évaluer numériquement cette intégrale par la méthode des trapèzes avec $k = 3$ sous-intervalles.
3. Pourquoi la valeur numérique obtenue en (2.) est-elle supérieure à $\ln(2)$ ? Est-ce vrai quel que soit $k$ ? Justifier votre réponse.
4. Quel nombre de sous-intervalles $k$ faut-il choisir pour avoir une erreur inférieure à $10^{-4}$ ?

<details>
<summary>Correction</summary>

1. Une primitive de $\dfrac{1}{x}$ est $F(x) = \ln(x)$. La valeur exacte est alors $I = \big[\ln(x)\big]_1^2 = \ln(2)$.

2. La méthode des trapèzes composite à $m+1$ points pour calculer l'intégrale d'une fonction $f$ sur $[a,b]$ s'écrit :
   $$
   \int_a^b f(t)\,dt \approx h \cdot \left(\frac{1}{2}f(a) + \sum_{i=1}^{m-1} f(a+ih) + \frac{1}{2}f(b)\right) \qquad \text{avec } h = \frac{b-a}{m}
   $$
   Ici on a $f(x)=\dfrac{1}{x}$, $a=1, b=2, m=3$ d'où $h=\dfrac{1}{3}$ et on obtient :
   $$
   I \approx \frac{1}{3}\left(\frac{1}{2}f(1) + f\!\left(1+\frac{1}{3}\right) + f\!\left(1+\frac{2}{3}\right) + \frac{1}{2}f(2)\right) = \frac{1}{3}\left(\frac{1}{2} + \frac{3}{4} + \frac{3}{5} + \frac{1}{4}\right) = \frac{21}{30} = 0.7
   $$

3. La valeur numérique obtenue est supérieure à $\ln(2)$ car la fonction $f(x)=\dfrac{1}{x}$ est **convexe**. On peut se convaincre à l'aide d'un dessin que les trapèzes sont au-dessus de la courbe $y=1/x$, l'aire sous les trapèzes sera donc supérieure à l'aire sous la courbe. Cela reste vrai quel que soit le pas $h$ choisi car la fonction est convexe, ce qui signifie qu'une corde définie par deux points de la courbe $y=1/x$ sera toujours au-dessus de la courbe, et par le raisonnement précédent l'aire sous les trapèzes sera toujours supérieure à l'aire exacte.

4. L'erreur est majorée par :
   $$
   |E_m| \le \frac{(b-a)^3}{12m^2} \cdot \sup_{\xi \in\, ]a,b[} |f''(\xi)|
   $$
   Ici $f(x)=\dfrac{1}{x}$, $f'(x)=-\dfrac{1}{x^2}$ et $f''(x)=\dfrac{2}{x^3}$, ainsi :
   $$
   |E_m| \le \frac{1}{12m^2} \cdot \max_{\xi \in [1,2]} \frac{2}{\xi^3} = \frac{1}{6m^2}
   $$
   Pour que $|E_m| < 10^{-4}$ il suffit que $\dfrac{1}{6m^2} < 10^{-4}$, i.e. $m > \dfrac{10^2}{\sqrt{6}} \approx 40.8$. **À partir de 41 sous-intervalles**, l'erreur de quadrature est inférieure à $10^{-4}$.

</details>

## Exercice 4

On cherche à déterminer une valeur approchée de $I = \displaystyle\int_{-1}^1 f(t)\, dt$ sous la forme :

$$
J = \alpha_0 \cdot f\!\left(-\frac{1}{2}\right) + \alpha_1 \cdot f(0) + \alpha_2 \cdot f\!\left(\frac{1}{2}\right)
$$

1. Trouver les coefficients $\alpha_0, \alpha_1, \alpha_2$ pour que la formule soit exacte pour les polynômes de degré inférieur ou égal à 2. Quel est son ordre ?
2. Déduire une approximation de $I = \displaystyle\int_a^b f(t)\, dt$ faisant intervenir $f\!\left(\dfrac{3a+b}{4}\right)$, $f\!\left(\dfrac{a+b}{2}\right)$ et $f\!\left(\dfrac{a+3b}{4}\right)$.
3. Donner une valeur approchée de $I = \displaystyle\int_0^1 \dfrac{\sin(\pi t)}{(t(1-t))^{3/2}}\, dt$.
4. Même question que 3) en utilisant une formule de Gauss appropriée à 3 points. Quel est son ordre ? Conclure.

<details>
<summary>Correction</summary>

1. La formule de quadrature est : $\displaystyle\int_{-1}^1 f(t)\, dt \approx \frac{4}{3}f\!\left(-\frac{1}{2}\right) - \frac{2}{3}f(0) + \frac{4}{3}f\!\left(\frac{1}{2}\right)$, d'ordre **N = 3**.

2. On utilise un changement de variable affine pour se ramener à une intégrale de $-1$ à $1$ : $t = \dfrac{b-a}{2} \cdot x + \dfrac{b+a}{2}$.
   $$
   \int_a^b f(t)\,dt = \frac{b-a}{2} \cdot \int_{-1}^1 f\!\left(\frac{b-a}{2} \cdot x + \frac{b+a}{2}\right) dx
   $$

3. Application : $I = \displaystyle\int_0^1 \dfrac{\sin \pi t}{(t(1-t))^{3/2}}\, dt$, avec les points $0, \dfrac{1}{4}, \dfrac{1}{2}, \dfrac{3}{4}, 1$. On obtient :
   $$
   I \approx \frac{1}{3}\left[2f\!\left(\frac{1}{4}\right) - f\!\left(\frac{1}{2}\right) + 8f\!\left(\frac{3}{4}\right)\right] \approx 8.945723 \ \text{(à vérifier)}
   $$

4. Formule de Gauss appropriée à 3 points : $I = \displaystyle\int_0^1 \dfrac{\sin \pi t}{(t(1-t))^{3/2}}\, dt$. Changement de variable vers $[-1,1]$ : $x = 2t-1$, donne $I = 16\displaystyle\int_{-1}^1 \dfrac{\sin\left(\frac{\pi}{2}(x+1)\right)}{(1-x^2)} \cdot \dfrac{dx}{\sqrt{1-x^2}}$.

   Formule de Tchebychev à 3 points :
   $$
   I \cong \frac{16\pi}{3}\left[f\!\left(-\frac{\sqrt{3}}{2}\right) + f(0) + f\!\left(\frac{\sqrt{3}}{2}\right)\right] \qquad \text{avec } f(x) = \frac{\sin\left(\frac{\pi}{2}(x+1)\right)}{1-x^2}
   $$
   Ordre N=5 : on utilise aussi 3 points mais un ordre plus grand, on obtient une meilleure précision.

</details>

## Exercice 5

Soit $0 < \alpha \le 1$ un nombre réel donné et soit $\omega_0, \omega_1, \omega_2$ trois nombres réels. Considérons la formule de quadrature :

$$
\int_{-1}^1 f(t)\, dt = \omega_0 \cdot f(-\alpha) + \omega_1 \cdot f(0) + \omega_2 \cdot f(\alpha)
$$

1. Calculer $\alpha, \omega_0, \omega_1, \omega_2$ pour que l'ordre de la formule soit égal à 5.
2. Quelle est cette formule ? Justifier.
3. À l'aide d'un changement de variable affine, en déduire une formule de quadrature pour l'intégrale $\int_{x_i}^{x_{i+1}} f(x)\, dx$.
4. Soit $h = \dfrac{b-a}{n}$ et $x_i = a+ih$ pour $i=0,\ldots,n$. On subdivise l'intervalle $[a,b]$ en $n$ sous-intervalles $[x_i,x_{i+1}]$ de largeur $h$. En déduire la formule de quadrature composée pour le calcul approché de $\int_a^b f(t)\, dt$.
5. Écrire l'algorithme associé à cette formule de quadrature.

<details>
<summary>Correction</summary>

1. En imposant l'exactitude pour $p_k(x)=x^k$, $k=0,\ldots,6$ (table des moments $\int_{-1}^1 p_k(x)dx$), on obtient par symétrie $\omega_2=\omega_0$, puis en résolvant :
   $$
   \omega_1 = 2 - 2\omega_0, \qquad \omega_0 = \omega_2 = \frac{1}{3\alpha^2}, \qquad \omega_1 = 2 - \frac{2}{3\alpha^2}
   $$
   L'exactitude sur $x^4$ impose $\alpha = \sqrt{3/5}$, d'où $\omega_0 = \omega_2 = \dfrac{5}{9}$ et $\omega_1 = \dfrac{8}{9}$.

2. Si $\alpha = \sqrt{3/5}$, $\omega_1=\omega_3=\dfrac{5}{9}$ et $\omega_2=\dfrac{8}{9}$, alors la formule est exacte pour les polynômes de degré au plus 5 (il s'agit de la **formule de Gauss-Legendre à 3 points**). Remarquons que si on choisit $\alpha=1$ on retrouve la formule de Simpson.

3. Soit $x = mt+q$, alors $\int_{x_i}^{x_{i+1}} f(x)dx = m\int_{-1}^1 f(mt+q)dt$ avec $x_i=-m+q$, $x_{i+1}=m+q$, d'où le changement de variable $x = x_i + \dfrac{(t+1)(x_{i+1}-x_i)}{2}$. On déduit la formule de quadrature (exacte sur l'espace des polynômes de degré au plus 5) :
   $$
   \int_{x_i}^{x_{i+1}} f(x)dx \approx \frac{x_{i+1}-x_i}{18} \cdot \left[5f\!\left(x_i+(1-\sqrt{3/5})\frac{x_{i+1}-x_i}{2}\right) + 8f\!\left(\frac{x_{i+1}+x_i}{2}\right) + 5f\!\left(x_i+(1+\sqrt{3/5})\frac{x_{i+1}-x_i}{2}\right)\right]
   $$

4. $h=\dfrac{b-a}{n} = x_{i+1}-x_i$ pour $i=0,\ldots,n$. On subdivise $[a,b]$ en $n$ intervalles $[x_i,x_{i+1}]$ de largeur $h$. On trouve ainsi la formule de quadrature composée :
   $$
   \int_a^b f(x)dx \approx \frac{h}{18} \sum_{i=0}^{n-1} \left[5f(a+(i+1-\sqrt{3/5})h) + 8f\!\left(a+\left(i+\frac{1}{2}\right)h\right) + 5f(a+(i+1+\sqrt{3/5})h)\right]
   $$

5. Algorithme du calcul associé à cette formule de quadrature :
   ```
   Require: a; b>a; n>0; f: [a,b] → R
   h ← (b−a)/n
   c1 ← a + (1−sqrt(3/5))h
   c2 ← a + h/2
   c3 ← a + (1+sqrt(3/5))h
   s ← 0
   for i = 0 to n−1 do
       s ← s + 5f(c1+ih) + 8f(c2+ih) + 5f(c3+ih)
   end for
   return (h/18)·s
   ```

</details>

## Exercice 6

1. Donner une formule d'intégration numérique d'ordre 3 pour l'intégrale $\int_0^{+\infty} f(x)e^{-x}\, dx$ (où $f$ est une fonction réelle telle que $\int_0^{+\infty} f(x)e^{-x}\, dx$ est finie).
2. Donner l'erreur sur cette formule.
3. On considère l'intégrale $I = \int_0^{+\infty} \dfrac{1}{1+x^3}\, dx$. Estimer la valeur de l'intégrale $I$ par la méthode de Gauss-Laguerre d'ordre 3.
4. Donner une majoration de l'erreur commise.

<details>
<summary>Correction</summary>

*Extrait de l'examen 2018/2019 : formule à n+1 = 2 points.*

Les nœuds de la formule sont les racines de $L_2(x) = -x^2-4x+2$, soit $x_0 = \sqrt{2}-2$, $x_1 = -\sqrt{2}+2$.
$$
\lambda_0 = \int_0^{+\infty} l_0(x)e^{-x}\, dx \qquad \lambda_1 = \int_0^{+\infty} l_1(x)e^{-x}\, dx
$$
calculés soit par intégration par parties, soit en utilisant que $x = l_0(x) - l_1(x)$ et l'orthogonalité des $L_i$, $i=0,1$ :
$$
\lambda_0 = \frac{2+\sqrt{2}}{4} \qquad \lambda_1 = \frac{2-\sqrt{2}}{4}
$$

2. $E(f) = \left(\displaystyle\int_0^{+\infty} L_2(x)^2\, e^{-x}\, dx\right) \cdot \dfrac{f^{(4)}(\xi)}{4!}$, $\xi \in\, ]1,+\infty[$. $L_2(x)^2 = x^4+8x^3+12x^2-16x+4$. Par intégration par parties, $E(f) = \dfrac{84}{24}\, f^{(4)}(\xi)$.

3. $I = \displaystyle\int_0^{+\infty} \dfrac{e^x}{1+x^3} \cdot e^{-x}\, dx \cong 0.594$ (avec $f(x) = \dfrac{e^x}{1+x^3}$).

4. Calculer $f'(x), f''(x), \ldots, f^{(4)}(x)$ et remplacer dans la formule 2).

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<p><strong>Sujet</strong></p>
<PdfViewer file="/pdfs/mn-td2-integration-numerique.pdf" />

<p><strong>Correction</strong></p>
<PdfViewer file="/pdfs/mn-td2-integration-numerique-correction.pdf" />

</TabItem>
</Tabs>
