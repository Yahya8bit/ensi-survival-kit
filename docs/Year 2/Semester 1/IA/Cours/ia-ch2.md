---
sidebar_position: 3
title: "Chapitre 2 : Résolution de problèmes par la recherche"
sidebar_label: Ch2 - Recherche
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 2 — Résolution de problèmes par la recherche

*Cours IA et Apprentissage automatique*

<!-- TODO: source file is titled generically "chap 2.pdf"; sidebar_label/title above reflect its actual content (search algorithms), verify against original PDF if a different official chapter title is intended -->
<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments, and several node/graph diagrams illustrating each search algorithm are images not extracted as text) -->

- De nombreux problèmes peuvent être représentés sous la forme d'un graphe ou d'un arbre.
- Résoudre ces problèmes = chercher la solution (but) = trouver un chemin dans le graphe/l'arbre (état initial → but).
- Exemples : GPS, recherche d'itinéraires, jeux vidéo, jeux d'échec, ...

## Problème de recherche

Un problème de recherche peut être vu comme un graphe orienté (ou un arbre) où les nœuds sont des états accessibles depuis l'état initial et où les arcs sont des actions.

Un problème de recherche est défini par :

- Un état initial
- Un ensemble d'actions
- Une fonction de successeur, qui définit l'état résultant de l'exécution d'une action dans un état
- Un ensemble d'états buts
- Une fonction de coût, associant à chaque action un nombre non-négatif (le coût de l'action)

Une solution sera un chemin de l'état initial à un état but. Une solution est **optimale** si la somme des coûts des actions du chemin est minimale parmi toutes les solutions du problème.

### Exemple — le taquin

- **État** : les configurations des huit tuiles dans les neuf cases de la grille.
- **État initial** : n'importe quel état pourrait être choisi comme l'état initial.
- **Action** : la position du carré vide : haut, bas, gauche, droite.
- **Fonction de successeur** : spécifie les états résultants des différentes actions.
- **Test de but** : l'état but est unique et fixé au début du jeu (il s'agit en général de remettre les nombres dans l'ordre).
- **Coût de l'action** : chaque déplacement d'une tuile a un coût de 1.

## Schéma général des algorithmes de recherche

La plupart des algorithmes de recherche suivent à peu près le même schéma :

- Commencer par l'état initial et puis exécuter les étapes suivantes en boucle jusqu'à terminaison :
  - s'il n'y a plus d'états à traiter, renvoyer échec, sinon choisir un des états à traiter (?)
  - si l'état est un état but, renvoyer la solution correspondante, sinon supprimer cet état de l'ensemble des états à traiter, et le remplacer par ses états successeurs (?)

### Critères d'évaluation

- **Complexité en temps** : combien de temps prend l'algorithme pour trouver la solution ?
- **Complexité en espace** : combien de mémoire est utilisée lors de la recherche d'une solution ?
- **Complétude** : est-ce que l'algorithme trouve toujours une solution s'il y en a une ?
- **Optimalité** : est-ce que l'algorithme renvoie toujours des solutions optimales ?

## Recherche non informée

La recherche non informée utilise seulement des informations disponibles dans la définition du problème ; elle n'utilise pas des informations internes à l'état (par ex. qualité de l'état).

Algorithmes :

- Recherche en largeur d'abord (Breadth-first search)
- Recherche de coût uniforme (Uniform-cost search)
- Recherche en profondeur d'abord (Depth-first search)
- Recherche en profondeur limitée (Depth-limited search)
- Recherche en approfondissement itératif (Iterative deepening search)

### Recherche en largeur d'abord

**Principe** : le nœud racine est développé en premier, ensuite tous les successeurs du nœud racine sont développés, puis leurs successeurs… Tous les nœuds sont développés à une profondeur donnée dans l'arbre de recherche avant que les nœuds au niveau suivant ne soient développés.

```
Fonction Rech_Largeur (NœudI, But) : Trouvé, Echec
Debut
  Frontière ← NoeudI  // ajout au sommet de la file
  ListeVisités ← Null
  Tant que (Frontière ≠ Vide)
    NoeudC ← Frontière.retirer()  // Au sommet
    si (NoeudC.etat = But) renvoyer Trouvé
    ajouter (ListeVisités, NoeudC)
    Pour chaque Expansion(NoeudC) ∉ ListeVisités
      Frontière ← Frontière + Expansion(NoeudC)
    Fin Pour
  Fin tant que
  renvoyer Echec
Fin
```

Avec `b` = nombre de branchements maximal de l'arbre de recherche, `d` = profondeur de la meilleure solution :

- Complexité en temps : $O(b^d)$
- Complexité en espace : $O(b^d)$
- Complétude : oui
- Optimalité : oui

Gourmande en espace et en temps !

### Recherche de coût uniforme

**Principe** :
- Prendre en compte le coût dans la recherche en largeur.
- Dans la file de priorité : chaque état est associé au coût qu'il a fallu dépenser pour l'atteindre depuis l'état initial.
- La file est triée selon le coût de chaque état (du moins coûteux vers le plus coûteux).
- Si coût de chaque arc = 1, alors recherche à coût uniforme = recherche en largeur d'abord.

```
Fonction Rech_CoutU (NœudI, But) : Trouvé, Echec
Debut
  Frontière ← NoeudI  // ajout au sommet de la file
  ListeVisités ← Null
  Tant que (Frontière ≠ Vide)
    NoeudC ← Frontière.retirer()  // Au sommet
    si (NoeudC.etat = But) renvoyer Trouvé
    ajouter (ListeVisités, NoeudC)
    Pour chaque Expansion(NoeudC) ∉ ListeVisités
      Frontière ← Frontière + Expansion(NoeudC)
    Fin Pour
    Trier(Frontière)  // Trier selon le coût croissant du chemin à partir de l'état initial
  Fin tant que
  renvoyer Echec
Fin
```

Avec `ε` = valeur positive très petite, `b` = nombre de branchements maximal, `C*` = profondeur (coût) de l'arbre de recherche :

- Complexité en temps : $O(b^{C^*/\varepsilon})$
- Complexité en espace : $O(b^{C^*/\varepsilon})$
- Complétude : oui (si coût de chaque branche >= ε)
- Optimalité : oui

### Recherche en profondeur d'abord

**Principe** : démarrer de la racine et explorer le premier chemin de ses successeurs jusqu'au moment où le sommet n'a plus de successeurs non visités. Ensuite remonter d'un niveau pour vérifier s'il ne reste pas de sommets à visiter et ainsi de suite.

```
Fonction Rech_Profondeur (NœudI, But) : Trouvé, Echec
Debut
  Frontière ← NoeudI  // ajout au sommet de la file
  ListeVisités ← Null
  Tant que (Frontière ≠ Vide)
    NoeudC ← Frontière.retirer()  // Au sommet
    si (NoeudC.etat = But) renvoyer Trouvé
    ajouter (ListeVisités, NoeudC)
    Pour chaque Expansion(NoeudC) ∉ ListeVisités
      // Ajout au sommet de la pile
      Frontière ← Expansion(NoeudC) + Frontière
    Fin Pour
  Fin tant que
  renvoyer Echec
Fin
```

Version récursive :

```
Fonction Rech_Profondeur(Nœud, But) : Trouvé, Echec
Debut
  si (Noeud.etat = But) renvoyer Trouvé
  ajouter (ListeVisités, Noeud)
  Pour chaque Expansion(Nœud) ∉ ListeVisités
    Res = Rech_Profondeur(Expansion(Nœud), But)
    si (Res = Trouvé) renvoyer Trouvé
  Fin Pour
  renvoyer Echec
Fin
```

Avec `b` = nombre de branchements maximal, `m` = profondeur maximale de l'arbre de recherche :

- Complexité en temps : $O(b^m)$
- Complexité en espace : $O(b \times m)$
- Complétude : oui
- Optimalité : non

### Recherche en profondeur limitée

**Principe** : c'est une variation de l'algorithme de parcours en profondeur où la profondeur maximale de recherche est limitée à une valeur prédéfinie pour économiser du temps. L'algorithme de recherche limitée peut manquer des solutions potentielles si elles se trouvent au-delà de la profondeur limite. C'est un compromis entre l'exhaustivité de la recherche et la réduction des ressources utilisées.

```
Fonction Rech_Prof_Lim (Nœud, But, Limit) : Trouvé, Echec
Debut
  if (Limit <= LimitMax)
    si (Noeud.etat = But) renvoyer Trouvé
    ajouter (ListeVisités, Noeud)
    Pour chaque Expansion(Nœud) ∉ ListeVisités
      Res = Rech_Prof_Lim (Expansion(Nœud), But, Limit+1)
      si (Res = Trouvé) renvoyer Trouvé
    Fin Pour
  sinon
    renvoyer Echec
Fin
```

Avec `b` = nombre de branchements maximal, `l` = limite de la recherche :

- Complexité en temps : $O(b^l)$
- Complexité en espace : $O(b \times l)$
- Complétude : si $l \geq d$
- Optimalité : non

### Recherche en approfondissement itératif

**Principe** : c'est une variante de l'algorithme de recherche en profondeur qui effectue plusieurs itérations avec des limites de profondeur croissantes. Commencer par une recherche en profondeur avec une profondeur limitée de 1, puis augmenter progressivement la profondeur limite à chaque itération jusqu'à ce que le nœud cible soit trouvé.

Combine les avantages du parcours en profondeur en termes d'espace et de simplicité avec l'approche plus systématique du parcours en largeur.

```
Fonction Rech_Prof_Iter (NœudI, But, LimitMax) : Trouvé, Echec
Début
  Pour lim = 1 à LimitMax
    Res = Rech_Prof_Lim (NœudI, But, lim+1)
    si (Res = Trouvé) renvoyer Trouvé
  Fin Pour
  renvoyer Echec
Fin
```

Avec `b` = nombre de branchements maximal, `d` = profondeur du nœud solution :

- Complexité en temps : $O(b^d)$
- Complexité en espace : $O(b \times d)$
- Complétude : oui
- Optimalité : oui

### Récapitulatif — recherche non informée

| Critère | Largeur d'abord | Coût uniforme | Profondeur d'abord | Profondeur limitée | Approf. itératif |
|---|---|---|---|---|---|
| Temps | $b^d$ | $b^{C^*/\varepsilon}$ | $b^m$ | $b^l$ | $b^d$ |
| Espace | $b \times d$ | $b^{C^*/\varepsilon}$ | $b \times m$ | $b \times l$ | $b \times d$ |
| Complétude | Oui | Oui | Oui | Non | Oui |
| Optimalité | Oui | Oui | Non | Non | Oui |

## Recherche informée

La recherche informée, également appelée recherche heuristique, utilise des informations ou des estimations spécifiques sur le problème pour guider la recherche. Elle explore les nœuds selon une évaluation de leur qualité ou de leur promesse.

Algorithmes :

- Best-First search (BFS)
- A* search
- Recursive best-first search (RBFS)
- Simplified memory-bounded A* (SMA*)

### Best-First search (BFS)

**Principe** :
- Choisit le meilleur nœud suivant à explorer selon une fonction d'évaluation spécifique appelée « fonction heuristique ».
- Cette fonction attribue une valeur à chaque nœud en fonction de son potentiel à mener à la solution : $h(n)$.
- Privilégie toujours l'exploration des nœuds avec les valeurs de fonction heuristique les plus faibles, car cela représente la meilleure estimation de la proximité de la solution.

```
Fonction Rech_BFS (NœudI, But) : Trouvé, Echec
Debut
  Frontière ← NoeudI  // ajout au sommet de la file avec h(n)
  Tant que (Frontière ≠ Vide)
    NoeudC ← Frontière.retirer()  // Au sommet la valeur la plus faible de h(n)
    si (NoeudC.etat = But) renvoyer Trouvé
    Pour chaque Expansion(NoeudC)
      Frontière ← Frontière + Expansion(NoeudC)  // avec h(n)
    Fin Pour
    Trier(Frontière)  // Trier selon la valeur croissante de la fonction heuristique h(n)
  Fin tant que
  renvoyer Echec
Fin
```

Avec `b` = nombre de branchements maximal, `m` = profondeur maximale de l'arbre de recherche :

- Complexité en temps : $O(b^m)$
- Complexité en espace : $O(b^m)$
- Complétude : non
- Optimalité : non

### Recursive best-first search (RBFS)

**Principe** :
- RBFS est un algorithme de recherche basé sur la priorité.
- Gère une file de priorité (ou une liste ordonnée) de nœuds à explorer, en privilégiant toujours le nœud le plus prometteur en fonction d'une estimation du coût $f(n)$ jusqu'à l'objectif, tout en restant dans une approche récursive pour explorer les successeurs de manière sélective.
- $f(n) = h(n) + g(n)$ : coût estimé de la solution la moins coûteuse à travers $n$, où $h(n)$ est la fonction heuristique et $g(n)$ la fonction coût.

Permet de trouver une solution en minimisant le nombre de nœuds explorés, tout en évitant le problème de la limitation de mémoire d'une recherche en largeur ou d'une recherche en profondeur complète.

```
fonction Rech-RBFS (NoeudC, f_limit, But): Trouvé, Echec
Début
  Si (NoeudC.etat = But) retourner Trouvé
  // Générer les successeurs
  Successeurs ← vide
  Pour chaque Succ(NoeudC)
    Successeurs ← Successeurs + Succ(NoeudC)
  Si (Successeurs = Vide) retourner Echec
  Pour chaque s dans Successeurs
    s.f ← max(s.g + s.h, NoeudC.f)
  Fin Pour
  trier(Successeurs)  // ordre croissant de f
  Tant que (vrai)
    Meilleur ← Min(Successeurs)  // le meilleur avec f le plus bas
    si Meilleur.f > f_limit retourner (Echec)
    alternative ← Second-plus-Basse-f(Successeurs)
    résultat ← RBFS(Meilleur, min(f_limit, alternative), But)
    Si (résultat = Succès) retourner (Trouvé)
  Fin Tant que
Fin
```

Avec `b` = nombre de branchements maximal, `m` = profondeur maximale de l'arbre de recherche :

- Complexité en temps : $O(b^m)$
- Complexité en espace : $O(b^m)$
- Complétude : non
- Optimalité : non

### A* search

**Principe** :
- Combine les avantages de la recherche meilleure d'abord (Best-First Search) et de la recherche à coût uniforme (Uniform Cost Search).
- Utilise la fonction heuristique pour guider la recherche vers les parties les plus prometteuses de l'espace d'état, tout en s'assurant que le coût total du chemin parcouru jusqu'à présent est minimisé.
- $f(n) = h(n) + g(n)$ : coût estimé de la solution la moins coûteuse à travers $n$, où $h(n)$ est la fonction heuristique et $g(n)$ la fonction coût.

Notations :
- **Open-list** : liste des nœuds à explorer
- **Closed-list** : liste des nœuds déjà traités (testés)
- `n.g` : coût depuis le nœud initial jusqu'à `n`
- `n.h` : valeur de la fonction heuristique pour `n`
- `n.f = n.g + n.h`

```
Algorithme Rech-A* (NoeudI, But): Echec, Trouvé
Début
  NoeudI.g ← 0
  NoeudI.f ← NoeudI.h
  Open-List.ajouter(NoeudI)
  Tant que (Open-List ≠ Vide)
    NoeudC ← Open-List.retirer()  // la plus faible de f(n)
    si (NoeudC.etat = But) Retourner Trouvé
    Pour chaque NoeudSucc = Expansion(NoeudC)
      Si (NoeudSucc ∉ Closed-List)
        new-g = NoeudC.g + Dist(NoeudC, NoeudSucc)
        Si (NoeudSucc ∉ Open-List)
          NoeudSucc.g ← new-g
          NoeudSucc.f ← NoeudSucc.g + NoeudSucc.h
          Open-List.ajouter(NoeudSucc)  // trié selon f(n)
        sinon
          Si (new-g < NoeudSucc.g)
            NoeudSucc.g ← new-g
            NoeudSucc.f ← NoeudSucc.g + NoeudSucc.h
          Finsi
        Finsi
      Fin Si
    Fin pour
  Fin Tant que
  Retourner echec
Fin
```

Avec `b` = nombre de branchements maximal, `d` = profondeur du nœud solution :

- Complexité en temps : $O(b^d)$
- Complexité en espace : $O(b^d)$
- Complétude : oui
- Optimalité : oui (si la fonction heuristique est admissible et consistante et coûts de mouvements positifs)

**Heuristique admissible** : une heuristique est dite admissible si elle ne surestime jamais le coût réel pour atteindre l'objectif à partir d'un état donné : $h(n) \leq$ coût réel (optimal) de $n$ à l'objectif.

**Heuristique consistante (ou monotone)** : une heuristique $h(n)$ est considérée comme consistante (ou monotone) si elle satisfait la condition de consistance suivante pour chaque paire de nœuds $n$ et $n'$ (successeur de $n$) : $h(n) \leq \text{coût}(n, n') + h(n')$.

### Simplified memory-bounded A* (SMA*)

**Principe** :
- L'objectif de cette approche est de limiter l'utilisation de la mémoire en se concentrant uniquement sur les nœuds dont les évaluations $f$ sont les plus prometteuses en termes de recherche de solutions optimales.
- Cela permet d'assurer que l'algorithme n'utilise pas de mémoire excessive tout en continuant à avancer vers la recherche d'une solution.
- Si la taille de la liste des nœuds à étendre dépasse la limite de mémoire prédéfinie, supprimer le ou les nœuds de la liste avec le coût total estimé le plus élevé (coût $g$ + coût $h$) pour faire de la place aux nouveaux nœuds.

```
Algorithme Rech-SMA* (NoeudI, But): Echec, Trouvé
Début
  NoeudI.g ← 0
  NoeudI.f ← NoeudI.h
  Open-List.ajouter(NoeudI)
  Tant que (Open-List ≠ Vide)
    NoeudC ← Open-List.retirer()  // la plus faible de f(n)
    si (NoeudC.etat = But) renvoyer Trouvé
    Pour chaque NoeudSucc = Expansion(NoeudC)
      si (NoeudSucc ∉ Closed-List)
        new-g = NoeudC.g + Dist(NoeudC, NoeudSucc)
        si (NoeudSucc ∉ Open-List)
          NoeudSucc.g ← new-g
          NoeudSucc.f ← NoeudSucc.g + NoeudSucc.h
          si Taille(Open-List) > Lim
            Open-List.elaguer()  // Enlever le nœud le plus coûteux
        sinon
          si (new-g < NoeudSucc.g)
            NoeudSucc.g ← new-g
            NoeudSucc.f ← NoeudSucc.g + NoeudSucc.h
          Finsi
        Finsi
      Finsi
    Fin pour
  Fin Tant que
  Renvoyer echec
Fin
```

Avec `b` = nombre de branchements maximal, `l` = limite de la profondeur spécifiée :

- Complexité en temps : $O(b^l)$
- Complexité en espace : $O(b^l)$
- Complétude : non (oui si la limite >= profondeur de la solution)
- Optimalité : non

### Récapitulatif — recherche informée

| Critère | BFS | RBFS | A* | SMA* |
|---|---|---|---|---|
| Temps | $b^m$ | $b^m$ | $b^d$ | $b^l$ |
| Espace | $b^m$ | $b^m$ | $b^d$ | $b^l$ |
| Complétude | Non | Non | Oui | Non |
| Optimalité | Non | Non | Oui* | Non |

\* : si la fonction heuristique est admissible et consistante et coûts positifs.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/ia-ch2.pdf" />

</TabItem>
</Tabs>
