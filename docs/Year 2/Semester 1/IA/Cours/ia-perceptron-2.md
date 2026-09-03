---
sidebar_position: 4
title: "Apprentissage supervisé : le Perceptron"
sidebar_label: Le Perceptron
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Apprentissage supervisé — Le Perceptron

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments and mangles several formulas/diagrams — best-effort reconstruction below, see task summary. Notably the biological-inspiration diagram, the perceptron classifier figure, and several matrix/vector layout illustrations are images not extracted as text.) -->

## Perceptron : inspiration biologique

Perceptron monocouche : 1 neurone. Le perceptron est un classifieur binaire.

## Principe

- Entrée $x \in \mathbb{R}^n$
- Sortie $\hat{y}$ fonction de $x$ :
  - Partie linéaire (fonction affine — linéaire plus translation par un biais $b$ scalaire) : $s = \sum_{i=1}^{n} w_i x_i + b$
  - Fonction d'activation non-linéaire : $f : \mathbb{R} \to \mathbb{R}$
- $\hat{y} = a(s) = a\left(\sum_{i=1}^{n} w_i x_i + b\right)$

### Partie linéaire

Projection affine : $s = \sum_{i=1}^{n} w_i x_i + b$

- $w$ : vecteur normal à un hyperplan de $\mathbb{R}^n$ ⇒ $s = 0$ définit une frontière linéaire
- Le biais $b$ définit un écart par rapport à la position de l'hyperplan
- Hyperplan en dimension 2 : droite. Hyperplan en dimension 3 : plan.

$$w_1 x_1 + w_2 x_2 + b = 0$$

### Fonction d'activation

$$\hat{y} = a(s) = a\left(\sum_{i=1}^{n} w_i x_i + b\right)$$

Fonction échelon (Heaviside) :

$$h(x) = \begin{cases} 1 & \text{si } x \geq 0 \\ 0 & \text{sinon} \end{cases}$$

## Algorithme d'apprentissage supervisé

Règle d'apprentissage de Widrow-Hoff :

$$w_{ij}^{t+1} = w_{ij}^{t} + \eta (t_j - o_j) x_i$$

où $j$ : $j$-ème exemple, $i$ : $i$-ème attribut.

<!-- TODO: unclear in source, verify against original PDF page — the full worked "Exemple" (avec la fonction somme, la fonction activation, itérations jusqu'à convergence) is present in the source as a diagram-heavy sequence and did not extract cleanly as text -->

## Apprentissage du AND, OR et du XOR

### Réalisation des opérations booléennes

Il est possible de construire des neurones réalisant les opérations AND et OR :

| $X_1$ | $X_2$ | $S$ (AND, seuil -1.5) | $O$ |
|---|---|---|---|
| 0 | 0 | -1.5 | 0 |
| 0 | 1 | -0.5 | 0 |
| 1 | 0 | -0.5 | 0 |
| 1 | 1 | 0.5 | 1 |

| $X_1$ | $X_2$ | $S$ (OR, seuil -0.5) | $O$ |
|---|---|---|---|
| 0 | 0 | -0.5 | 0 |
| 0 | 1 | 0.5 | 1 |
| 1 | 0 | 0.5 | 1 |
| 1 | 1 | 1.5 | 1 |

$O = 1$ si $S \geq 0$ ; sinon $O = 0$.

*N.B. La solution n'est pas unique.*

<!-- TODO: unclear in source — the XOR case is titled in the source ("Apprentissage du AND, OR et du XOR") but the slide content only shows the worked AND/OR truth tables above; the XOR construction itself (which requires a multi-layer network, see below) is not detailed on this slide, verify against original PDF -->

## Perceptron multicouche

*À compléter (voir le chapitre dédié au Perceptron Multicouche / MLP).*

## Exemple de code Python

```python
# Données d'entraînement (AND gate)
class Perceptron:
    # Attributs: weights et bias
    # Méthodes: train, predict, activation
    ...

training_data = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
labels = np.array([0, 0, 0, 1])

# Création et entraînement du perceptron
perceptron = Perceptron()
learning_rate = 0.1
num_epochs = 10
perceptron.train(training_data, labels, learning_rate, num_epochs)

# Test du perceptron
for inputs in training_data:
    predict
```

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/ia-perceptron-2.pdf" />

</TabItem>
</Tabs>
