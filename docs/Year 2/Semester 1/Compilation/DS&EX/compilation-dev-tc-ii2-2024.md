---
sidebar_position: 1
title: "Examen : Techniques de Compilation (II2, 2024)"
sidebar_label: DEV TC II2 2024
hide_title: true
---

# Examen — Techniques de Compilation

*Université de la Manouba — École Nationale des Sciences de l'Informatique — Année Universitaire 2023-2024 — Date : 09-01-2024 — Module : Techniques de Compilation — Enseignants : Leila Ben Ayed et Hatem Aouadi — Durée : 2h — Documents non autorisés — Classe : II2*

<!-- TODO: this document was converted from a .docx (no source PDF was provided for this exam) — transcribed as-is below. -->

## Exercice 1 (12 points)

Considérons la grammaire `G` suivante :

```
G = (V, T, S, R)
V = {S, NP, NPT}
T = {+, *, (, ), 0, 1, nb, id}
R = { S → NP | NP + S,
      NP → NPT * NP | NPT,
      NPT → (S) | 0 | 1 | nb | id}
```

1. Donner le résultat de l'analyseur lexical (unités lexicales) pour le mot `m` suivant : `m : (aa + 1) * (b1+ 10)`
2. Montrer que le mot `(id + 1) * (nb + id)` est généré par la grammaire `G` en donnant une dérivation et un arbre syntaxique.
3. Éliminer la récursivité à gauche et factoriser (éliminer l'ambiguïté) si nécessaire pour obtenir une grammaire `G'` prête pour une analyse prédictive.
4. Calculer les ensembles premier et suivant pour chaque non terminal de la grammaire `G'`.
5. Construire la table d'analyse pour la grammaire `G'`.
6. Donner le comportement de l'analyseur syntaxique prédictif descendant non récursif sur le mot `(id + 1) * nb`.
7. Analyser le mot `W` suivant et donner le résultat de l'analyseur syntaxique (récupération sur erreur) : `W : nb + *) + id`
8. Donner un automate fini et un pseudo-code pour un analyseur lexical associé aux unités lexicales de la grammaire `G` (les terminaux de la grammaire).

NB. Ajouter la synchronisation à la table d'analyse pour le traitement des erreurs syntaxiques.

## Exercice 2 (8 points)

Soit les règles de production suivantes d'une partie de grammaire qui génère des séquences d'instructions :

```
L_I → I | I L_I
I → Répéter L_I Jusqu'à B ; | id = E ;
B → E opr E | non B | B et B | B ou B
E → nb | id | E opa E | (E)
```

(`opa` pour "les opérateurs arithmétiques `+`, `*`, `/`, `-`", `opr` pour les opérateurs relationnels `>`, `<`, `==`)

1. Donner un analyseur sémantique en augmentant la grammaire par des règles sémantiques.
2. Traduire, en code pour machine abstraite à pile, le mot `m` suivant :

```
m :
a=1 ;
b=3 ;
Répéter
  a = a+1 ;
  b = b*a ;
Jusqu'à (a == 10) ;
```

3. Donner un traducteur en code pour machine abstraite à pile (un schéma de traduction ou bien une Définition Dirigée par la Syntaxe). Donner un code C pour le traducteur.
