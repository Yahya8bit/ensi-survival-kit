---
sidebar_position: 5
title: "Le Perceptron Multicouche (MLP)"
sidebar_label: Perceptron Multicouche (MLP)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Apprentissage supervisé — Le Perceptron Multicouche

<!-- TODO: unclear in source, verify against original PDF (this deck is dense with matrix diagrams and numeric worked examples that did not extract cleanly as text — the OCR output mixes up matrix entries and subscripts in several places. Best-effort reconstruction below; the fully worked numeric example toward the end is flagged separately.) -->

## Algorithme de la rétropropagation

Principe général (boucle d'apprentissage) :

1. Initialisation des poids (valeurs aléatoires)
2. Présentation des exemples $(X, T)$
3. Calcul de la sortie $(o)$
4. Calcul de l'erreur $(T - o)$
5. Propagation de l'erreur de la couche de sortie vers la ou les couche(s) cachée(s)
6. Adaptation des poids
7. Répéter jusqu'à convergence

### Architecture du réseau (pour un exemple, $d = 1$)

Couches : entrées → couche cachée → couche de sortie, avec poids $v_{pi}$ (entrée → cachée) et $w_{ji}$ (cachée → sortie).

<!-- TODO: unclear in source, verify against original PDF (network architecture diagram is an image, not extracted as text) -->

## Calculs

### Phase de présentation (activations logsig)

- Couche de sortie : <!-- TODO: unclear in source, formula not extracted cleanly, verify against original PDF -->
- Couche cachée : <!-- TODO: unclear in source, formula not extracted cleanly, verify against original PDF -->

### Adaptation des poids

- Couche de sortie
- Couche cachée

### Notation matricielle — rétropropagation de l'erreur

Entrée $(x)$ → Couche cachée $(h)$ → Sortie $(o)$, avec les matrices de poids $W$ (entrée → cachée) et $Z$ (cachée → sortie).

### Formules à retenir

$$Z[t+1] = Z[t] + \eta\, \delta_{sortie,k}\, h_j$$

$$\delta_{sortie,k} = o_k \otimes (1 - o_k) \otimes (t_k - o_k)$$

$$W[t+1] = W[t] + \eta\, \delta_{cachée,k}\, x$$

$$\delta_{cachée,j} = h_j \otimes (1 - h_j) \otimes \left(\delta_{sortie}^{t} \, Z^{t}\right)$$

### Ce qu'il faut faire

$$b = W \cdot x \qquad h = f(b) \qquad a = Z \cdot h \qquad o = f(a)$$

$$f'(a) = o \otimes (1 - o)$$

$$\delta_{sortie} = f'(a) \otimes e = o \otimes (1-o) \otimes (t - o)$$

*Etc.*

## Exemple numérique

<!-- TODO: unclear in source, verify against original PDF pages for this worked example — the OCR text for this fully-worked backpropagation example (matrices X, W, Z, t, intermediate activations, and the weight-update computation) is garbled/misaligned and cannot be faithfully reconstructed as a clean matrix here. The general shape of the exercise: X and t are given input/target vectors, W and Z are initial weight matrices, and the slides step through computing h, o, the output-layer delta (δ_sortie ≈ [-0.077, 0.233, 0.0003] in the source), the hidden-layer delta, and the resulting updated Z and W matrices. Please check the original PDF for the exact numeric values. -->

## Un peu de Python

```python
import tensorflow as tf
import numpy as np

# Données d'entraînement XOR
input_data = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=np.float32)
output_data = np.array([[0], [1], [1], [0]], dtype=np.float32)

# Définition du modèle
model = tf.keras.Sequential([
    tf.keras.layers.Dense(2, activation='sigmoid', input_shape=(2,)),  # Couche d'entrée
    tf.keras.layers.Dense(1, activation='sigmoid')  # Couche de sortie
])

# OU
sgd_optimizer = tf.keras.optimizers.SGD(learning_rate=0.01)  # Descente du gradient basique

# Compilation du modèle
model.compile(optimizer="adam", loss='mean_squared_error', metrics=['accuracy'])

# Entraînement du modèle
model.fit(input_data, output_data, epochs=10000, verbose=0)

# Évaluation du modèle
loss, accuracy = model.evaluate(input_data, output_data)
print(f"Loss: {loss}, Accuracy: {accuracy}")

# Prédiction avec le modèle entraîné
predictions = model.predict(input_data)
print("Predictions:")
```

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/ia-mlp.pdf" />

</TabItem>
</Tabs>
