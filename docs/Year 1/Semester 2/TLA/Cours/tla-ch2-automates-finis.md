---
sidebar_position: 2
title: Chapitre 2 - Automates Finis
sidebar_label: Ch2 - Automates finis
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 2 : Automates finis

Plan : automates finis, automates finis non déterministes, propriétés des langages acceptés par un automate fini, automate déterministe minimal, automates finis et langages réguliers, transformation d'un DFA en ER, lemme de pompage.

## Automates finis

Les automates à états finis sont utilisés comme modèle pour :
- la conception des circuits logiques ;
- l'analyse lexicale des compilateurs ;
- la recherche de mots clés dans le Web ;
- …

**Exemples introductifs.**
- Automate fini modélisant un système On/Off : deux états `Off`/`On`, une transition `Push` dans chaque sens.
- Automate fini reconnaissant la chaîne `then` : une chaîne d'états reliés successivement par `t`, `h`, `e`, `n`.

### Motivation

**Problème :** est-ce qu'une chaîne `w` appartient à un langage `L` ? Quelles sont les ressources nécessaires pour répondre à cette question ?

Un **reconnaisseur** d'un langage est un programme qui prend en entrée une chaîne `x` et répond par oui ou non (`x` appartient ou non au langage). On peut raisonner sur les problèmes non pas comme une réponse oui/non, mais comme une transformation des entrées en sorties.

### Définition formelle du DFA

Un **Automate à états Finis Déterministe (DFA)** est un quintuplet `M = (Q, Σ, δ, q₀, F)` où :
- `Q` : ensemble fini d'états.
- `Σ` : alphabet de symboles d'entrée.
- `δ` : fonction de transition, `δ : Q × Σ → Q`. Si l'automate est dans l'état `qᵢ` et reçoit l'entrée `a`, il passe à l'état `qⱼ` : `δ(qᵢ,a) = qⱼ`.
- `q₀` : état initial (un élément de `Q`).
- `F` : zéro ou plus d'états d'acceptation (ou finaux), sous-ensemble de `Q`.

**Exemple de diagramme de transition** : automate à 6 états `q₀,…,q₅` (alphabet `Σ={a,b}`) reconnaissant la chaîne `abba` — `q₀ →a q₁ →b q₂ →b q₃ →a q₄`, `q₄` est l'unique état final (`F={q₄}`), et tout écart de ce chemin (`q₀→b`, `q₁→a`, `q₂→a`, `q₃→b`, ainsi que toutes les transitions depuis `q₄`) mène à l'**état mort** `q₅` (boucle sur lui-même par `a,b`).

**Fonction de transition (table) :**

| `δ` | `a` | `b` |
|---|---|---|
| `q₀` | `q₁` | `q₅` |
| `q₁` | `q₅` | `q₂` |
| `q₂` | `q₅` | `q₃` |
| `q₃` | `q₄` | `q₅` |
| `q₄` | `q₅` | `q₅` |
| `q₅` | `q₅` | `q₅` |

C'est un **mécanisme de calcul sans mémoire**.

### Mot accepté par un automate

Un automate fini **accepte** une chaîne `w = a₁a₂…aₙ` s'il existe un chemin dans le diagramme de transition qui :
1. commence à l'état initial ;
2. finit à un état d'acceptation (ou final) ;
3. possède la séquence libellée par `a₁a₂…aₙ`.

**Exemple.** Sur l'automate reconnaissant `abba` ci-dessus, la chaîne `abbaa` mène de `q₀` à `q₅` (état mort, non acceptant).

**Essayez pas à pas.** L'automate ci-dessous accepte les chaînes binaires ayant un **nombre pair de `0`** (`q₀` est à la fois l'état initial et le seul état final). Modifiez la chaîne, avancez symbole par symbole avec *Step*, ou laissez tourner l'exécution avec *Run*.

<AutomatonSimulator />

### Extension de la fonction de transition

`δ* : Q × Σ* → Q` nous dit dans quel état on arrive en partant de l'état `q` et en analysant la chaîne `w`. Si `w = σ₁σ₂⋯σₖ`, `δ*(q,w)` est l'état atteint après avoir suivi successivement `σ₁,σ₂,…,σₖ`.

**Définition récursive :**
- Base : `δ*(q,ε) = q`.
- Induction : `δ*(q,wσ) = δ(δ*(q,w), σ)`.

Une chaîne `w` est **acceptée** par l'automate `M` d'état initial `q₀` si `δ*(q₀,w)` appartient aux états finaux de `M`.

### Langage accepté

Le langage `L(M)` contient toutes les chaînes acceptées par `M` :

```
L(M) = {w ∈ Σ* : δ*(q₀,w) ∈ F}
```

Le langage **rejeté** par `M` est son complémentaire :

```
L(M)‾ = {w ∈ Σ* : δ*(q₀,w) ∉ F}
```

### Exemples de langages reconnus

- `L(M) = {aⁿb : n≥0}` : boucle `a` sur un état initial, transition `b` vers l'état acceptant, puis état mort sur toute autre entrée.
- `L(M) = {toutes les chaînes avec préfixe ab}` : `q₀ →a q₁ →b q₂(accepté)`, avec boucle `a,b` sur `q₂`, et toute déviation (`q₀→b`, `q₁→a`) mène à un état mort `q₃` (boucle `a,b`).
- `L(M) = {toutes les chaînes sauf celles qui contiennent 001}` : états nommés par le suffixe reconnu (`ε`, `0`, `00`, `001`), `001` étant un état mort/piège une fois atteint.
- `L(M) = {w contient un nombre pair de b}` : deux états `q₀` (initial **et** final) et `q₁`, avec boucle `a` sur chacun et transition `b` entre les deux.
- `L(M) = Σ*` (tous les mots) : un seul état, à la fois initial et final, avec boucle `a,b`.
- `L = {w ∈{a,b}* | w contient un nombre pair de a et un nombre pair de b}`
- `L = {w ∈{0,…,9}* | la somme des chiffres est divisible par 3}`
- `L = {w ∈{a,b}* | |w|_b = 3k+1, k≥0}`

### Automates finis complets

Un automate fini déterministe est **complet** si `δ` est une fonction totale sur `Q×Σ` : de chaque état il part exactement une flèche étiquetée par chacune des lettres de l'alphabet `Σ`.

### Erreurs classiques à éviter

- Ne pas confondre un automate `M` avec `L(M)` : `M` est un programme, `L(M)` est un ensemble de chaînes.
- L'état initial `q₀` est de type *état*, tandis que `F` est de type *ensemble d'états* (l'ensemble des états finaux).
- « `a` » peut désigner un symbole ou une chaîne de longueur 1 selon le contexte (entrée de `δ` ou de `δ*`).

### Configuration

- Configuration initiale : `γ₀(q₀,w)`.
- Configuration finale d'acceptation : `γf(qf,ε)` avec `qf ∈ F`.
- Configuration finale de non-acceptation : `γf(qf,ε)` avec `qf ∉ F`.
- Configuration successeur après `n` transitions : `⊢ᴹⁿ γ'`, avec `γ ⊢ᴹ⁰ γ` (`n=0`), et `∃γ'' / γ ⊢ᴹ γ''` et `γ'' ⊢ᴹⁿ⁻¹ γ'` (`n≠0`).
- Notation `⊢ᴹ*` : fermeture réflexive et transitive.

```
L(M) = {w ∈ Σ* / (q₀,w) ⊢ᴹ* (qf,ε), qf ∈ F}
```

**Exemple.** `M=(Q,Σ,δ,q₀,F)`, `Σ={a,b}`, `Q={q₀,q₁}`, `F={q₀}`, avec `δ(q₀,a)=q₀`, `δ(q₀,b)=q₁`, `δ(q₁,a)=q₁`, `δ(q₁,b)=q₀`. Trace de `(q₀,ababa)` et de `(q₀,aba)`.

## Automates finis non déterministe (NFA)

**Exemple.** Alphabet `Σ={a}`, états `q₀ →a q₁ →a q₂(final)` et `q₀ →a q₃` (deux transitions possibles depuis `q₀` sur `a`).

**Premier choix.** Sur l'entrée `aa`, en suivant `q₀→q₁→q₂` : toutes les entrées sont consommées et `q₂` est un état final → **« accepté »**.

**Deuxième choix.** Sur la même entrée `aa`, en suivant `q₀→q₃` : il n'y a plus de transition possible depuis `q₃` sur `a` → l'automate se bloque → **rejet** sur ce chemin.

### Acceptation par un NFA

Un NFA **accepte** une chaîne lorsqu'il existe **un** calcul dans le NFA qui accepte la chaîne — c'est-à-dire : toutes les entrées sont consommées **et** l'automate est dans un état d'acceptation, pour au moins un des chemins possibles.

Un NFA **rejette** une chaîne lorsqu'il n'y a **aucun** calcul dans le NFA qui accepte la chaîne : soit toutes les entrées sont consommées et l'automate n'est dans aucun état d'acceptation pour tous les chemins, soit l'entrée ne peut être consommée par aucun chemin.

### Transition étiquetée par `ε`

Une transition `ε` permet de changer d'état sans consommer de symbole d'entrée (la tête de lecture ne bouge pas).

**Exemple.** NFA `M₁` : `q₀ →a q₁(final)`. DFA équivalent `M₂` : `q₀ →a q₁(final) →a q₂(final, boucle a)`. Les deux acceptent `L={a}`.

### Définition formelle du NFA

`M = (Q, Σ, δ, q₀, F)` où :
- `Q` : ensemble d'états, ex. `{q₀,q₁,q₂}`.
- `Σ` : alphabet d'entrée, ex. `{a,b}`.
- `δ` : **relation** de transition (et non plus une fonction) — pour un couple `(état, symbole)`, `δ` peut renvoyer un **ensemble** d'états, éventuellement vide.
- `q₀` : état initial.
- `F` : ensemble d'états finaux.

**Exemples de relation :** `δ(q₁,0) = {q₀,q₂}` (transition non déterministe sur `0`) ; `δ(q₀,ε) = {q₀,q₂}` (transition `ε`).

### Extension de la relation de transition

`δ*(q₀,ab) = {q₂,q₃,q₀}` : ensemble de tous les états atteignables depuis `q₀` en consommant `ab`, en tenant compte des transitions `ε` possibles à tout moment.

```
w ∈ L(M) ⟺ δ*(q₀,w) ∩ F ≠ ∅
```

C'est-à-dire qu'il existe au moins un état `qₖ ∈ δ*(q₀,w)` tel que `qₖ ∈ F`.

**Exemple.** Automate reconnaissant `Langage((a∪b)*abb)` : boucle `a,b` sur `q₀`, puis chemin `q₀ →a q₁ →b q₂ →b q₃(final)`.

### Équivalence de machines

La machine `M₁` est **équivalente** à la machine `M₂` si `L(M₁) = L(M₂)`.

**Théorème.** Pour chaque automate fini non déterministe correspond un automate fini déterministe qui lui est équivalent.

### Preuve — algorithme de transformation d'un NFA en DFA (construction des sous-ensembles)

Soit `A = (Q, Σ, δ, q₀, F)` un NFA. On construit `B = (Q', Σ, δ', q'₀, F')` tel que `L(B) = L(A)` :

- `E(q) = {p ∈ Q | (q,ε) ⊢ᴬ* (p,ε)}` : la `ε`-fermeture de `q`.
- `Q' = 2^Q` : l'ensemble des parties de `Q` (chaque état de `B` est un sous-ensemble d'états de `A`). En pratique, `Q'` n'est construit qu'à la demande — c'est un sous-ensemble de `2^Q`.
- `q'₀ = E(q₀)` : la `ε`-fermeture de `q₀`.
- `F' = {K ⊆ Q : K ∩ F ≠ ∅}` : tout sous-ensemble contenant au moins un état final de `A`.
- Construction de `δ'` : pour tout `σ ∈ Σ`, `δ'(K,σ) = ⋃{E(p) : p∈Q; ∃q∈K, δ(q,σ)=p}`. Il est possible que `δ'(K,σ) = ∅`.

**Exemple.** NFA `M` : `q₀ →a q₁(final, boucle a) →ε q₂ →b q₀`. Le DFA équivalent `M'` a pour états `{q₀}`, `{q₁,q₂}` (final, car `q₁∈F`), `∅` (état puits) : `{q₀} →a {q₁,q₂} →a {q₁,q₂}` (boucle), `{q₁,q₂} →b {q₀}`, `{q₀} →b ∅`, `∅ →a,b ∅`.

**Exemple complet (11 états `q₀…q₁₀`) :** en appliquant l'algorithme des sous-ensembles à un NFA avec de nombreuses transitions `ε`, on obtient un DFA avec des états composés `A={q₀,q₁,q₂,q₄,q₇}`, `B={q₁,q₂,q₃,q₄,q₆,q₇,q₈}`, `C={q₁,q₂,q₄,q₅,q₆,q₇}`, `D={q₁,q₂,q₄,q₅,q₆,q₇,q₉}`, `E={q₁,q₂,q₄,q₅,q₆,q₇,q₁₀}` (final, car il contient `q₁₀`) :

| `δ'` | `a` | `b` |
|---|---|---|
| `A` | `B` | `C` |
| `B` | `B` | `D` |
| `C` | `B` | `C` |
| `D` | `B` | `E` |
| `E` | `B` | `C` |

`δ'(A,a) = E(q₃) ∪ E(q₈) = {q₁,q₂,q₃,q₄,q₆,q₇} ∪ {q₈} = B`.

## Propriétés des langages acceptés par un automate fini

La classe des langages acceptés par un automate fini est **fermée** par :
- union ;
- concaténation ;
- fermeture de Kleene (`*`) ;
- complémentation ;
- intersection.

Dans chaque cas, on montre comment construire l'automate qui accepte le langage approprié.

### Union

Soient `M₁ = (Q₁,Σ,δ₁,q₀₁,F₁)` acceptant `L₁`, et `M₂ = (Q₂,Σ,δ₂,q₀₂,F₂)` acceptant `L₂`. Soit `M` le NFA acceptant `L(M₁) ∪ L(M₂)` :

```
M = (Q, Σ, δ, q₀, F)
Q = Q₁ ∪ Q₂ ∪ {q₀}
F = F₁ ∪ F₂
δ = δ₁ ∪ δ₂ ∪ {(q₀,ε,q₀₁), (q₀,ε,q₀₂)}
```

Un nouvel état initial `q₀` relié par des transitions `ε` aux états initiaux de `M₁` et `M₂`.

### Concaténation

Soit `M` le NFA acceptant `L(M₁) . L(M₂)` :

```
M = (Q, Σ, δ, q₀₁, F)
Q = Q₁ ∪ Q₂
F = F₂
δ = δ₁ ∪ δ₂ ∪ {F₁ × {ε} × {q₀₂}}
```

Chaque état final de `M₁` reçoit une transition `ε` vers l'état initial de `M₂` ; l'état initial de `M` est celui de `M₁`, et ses états finaux sont ceux de `M₂`.

### Fermeture de Kleene (`*`)

Soit `M` le NFA acceptant `L(M₁)*` :

```
M = (Q, Σ, δ, q₀, F)
Q = Q₁ ∪ {q₀}
F = F₁ ∪ {q₀}
δ = δ₁ ∪ {F₁ × {ε} × {q₀₁}} ∪ {(q₀,ε,q₀₁)}
```

Un nouvel état initial `q₀`, également final (pour accepter `ε`), relié par `ε` à l'ancien état initial ; chaque état final de `M₁` reçoit une transition `ε` de retour vers l'état initial de `M₁` (pour permettre la répétition).

### Complémentation

Soit `M = (Q,Σ,δ,q₀,F)` un DFA **complet** acceptant `L`. Soit `M'` le DFA acceptant `Σ* - L(M)` :

```
M' = (Q, Σ, δ, q₀, Q - F)
```

Il suffit d'inverser le statut final/non-final de chaque état (la complétude du DFA est essentielle ici).

> Construction directe pour `L(M₁) ∩ L(M₂)` ? (voir minimisation / produit d'automates — laissé en exercice de réflexion dans le cours).

## Automate déterministe minimal

### Définitions

**Séparation.** Soit `(q₁,q₂) ∈ Q²` : on dit que `q₁,q₂` sont **séparés** par `w ∈ Σ*` si `δ*(q₁,w) ∈ F` ou `δ*(q₂,w) ∈ F`, mais pas les deux en même temps.

**Inséparabilité.** `q₁,q₂` sont **inséparables** si aucun mot de `Σ*` ne les sépare : `δ*(q₁,w) ∈ F` ssi `δ*(q₂,w) ∈ F`.

**Équivalence de Nerode.** `q₁` est équivalent à `q₂` si `q₁,q₂` sont inséparables (noté `q₁ ≡ q₂`).

**Langage associé à un état.** Soit un DFA `A=(Σ,Q,δ,q₀,F)`, on appelle langage associé à `q`, noté `Lq(A)`, le langage :

```
Lq(A) = {w ∈ Σ* : δ*(q,w) ∈ F}
```

`L(A) = Lq₀(A)`.

**Équivalence d'état.** Étant donné `A` un DFA, deux états `p` et `q` (noté `p ≈ q`) sont équivalents si `Lp(A) = Lq(A)`. On note `[q]` la classe d'équivalence de `q` — l'ensemble des états qui lui sont équivalents.

### Problème et idée

**Problème :** soit `A` un automate fini déterministe complet dont chaque état est accessible depuis l'état initial. Construire un DFA minimal qui reconnaisse le même langage que `A`.

**Idée :** fusionner les états équivalents.

### Construction de l'automate minimal

Soit le DFA `A=(Σ,Q,δ,q₀,F)`, l'automate minimal associé à `A` est `Amin = (Σ,Q',δ',[q₀],F')` avec :
- `Q' = {[q] : q∈Q}`
- `F' = {[f] : f∈F}`
- `δ' = {([p],a,[q]) tels que ∃p'∈[p] et ∃q'∈[q] et (p',a,q')∈δ}`

**Propriétés :**
- `Amin` reconnaît le même langage que `A`.
- Pour tout DFA `B` tel que `L(B)=L(A)`, le nombre d'états de `B` est supérieur ou égal à celui de `A` (minimalité).
- `Bmin` est le même que `Amin` — unicité à un renommage près des états.

### Algorithme de minimisation

- **Itération `i=0`** : construire deux classes d'équivalence — les états d'acceptation `F` et les états de non-acceptation `Q-F`. `p ≈₀ q` ssi (`p∈F, q∈F`) ou (`p∉F, q∉F`).
- **Itération `i>0`** : `p ≈ᵢ q` si `p ≈ᵢ₋₁ q` **et** pour tout `a∈Σ`, `δ(p,a) ≈ᵢ₋₁ δ(q,a)`.
- **Arrêt** : quand `≈ᵢ` est identique à `≈ᵢ₋₁`.
- Supprimer tous les états morts et ceux non accessibles depuis l'état de départ.

## Transformation d'un DFA en ER

**Théorème.** Un langage est régulier si et seulement s'il est accepté par un automate fini.

**Preuve (sens ⇐).** Soit `M = (Q,Σ,δ,q₀,F)` un automate, on doit trouver un langage régulier `R` tel que `R = L(M)`. On représente `L(M)` comme l'union « finie » de plusieurs langages simples.

### Système d'équations associé à un automate

```
∀qᵢ ∈ Q, Lᵢ = ⋃_{a∈Σ} aLⱼ ∪ Bᵢ,   δ(qᵢ,a)=qⱼ,   Bᵢ=ε si qᵢ∈F (sinon ∅)
```

**Exemple.** DFA à 5 états `1,2,3,4,5` (`1` initial, `4` et `5` finaux) : `1→ₐ2`, `2→ᵦ4`, `2→𝒸5`, `1→ᵦ3`, `3→ₐ5`, `5→𝒸5`. Système :

```
L₁ = aL₂ + bL₃
L₂ = bL₄ + cL₅
L₃ = aL₅
L₄ = aL₅ + ε
L₅ = cL₅ + ε
```

Solution du système : `L₁` associé à l'état initial de `M`.

### Théorème et lemme d'Arden

**Théorème.** Soit `(L₁,L₂,….Lₙ)` un système d'équations associé à un automate `M`. Ce système admet une solution unique et `L(M) = L₁`.

**Lemme d'Arden.** Soient `A,B ⊆ Σ*` tel que `ε ∉ B`, alors l'équation `L = A ∪ BL` admet une solution unique : `L = B*A`. Et `L = A ∪ LB` admet une solution unique : `L = AB*`.

**Preuve.**

*`B*A` est solution :* `L = A ∪ BL`, `B*A = A ∪ BB*A = A ∪ B⁺A = (ε∪B⁺)A = B*A`. ✓

*`B*A` inclus dans toute solution :* `L = A ∪ BL ⇒ A ⊆ L`, et `BL ⊆ L`. Par récurrence, `BⁱA ⊆ BL ⊆ L` pour tout `i`, donc `B*A ⊆ L`.

*Unicité (lemme auxiliaire) :* Si `K ⊆ BK`, `K,B ⊆ Σ*`, `ε ∉ B`, alors `K = ∅`. En effet, `K ⊆ BK ⊆ B²K ⊆ … ⊆ BⁿK` pour tout `n>0`. Soit `u ∈ K` avec `|u|=p` : alors `u ∈ Bᵖ⁺¹K`, donc `∃w₁,w₂` tels que `u=w₁w₂` avec `w₁∈Bᵖ⁺¹` et `w₂∈K`, donc `|w₁|≥p+1` (car `ε∉B`) — contradiction avec `|u|=p`. Donc `K=∅`.

*Conclusion :* soit `L` une solution. Posons `L = B*A ∪ K`, avec `B*A ∩ K = ∅`. On a `L = A ∪ BL`, donc `B*A ∪ K = A ∪ B(B*A∪K) = A ∪ B⁺A ∪ BK = (ε∪B⁺)A ∪ BK = B*A ∪ BK`. D'où `K ⊆ BK`, et comme `ε∉B`, `K = ∅`. Donc `L = B*A`.

### Exemple d'application

Automate 3 états : `1` (initial, boucle `a`) `→ᵦ 2` (boucle `b`), `1 →𝒸 3` (final, boucle `c`). Système :

```
L₁ = aL₁ + bL₂ + cL₃
L₂ = bL₂ + aL₁
L₃ = cL₃ + ε
```

D'après l'équation 3 (lemme d'Arden) : `L₃ = c*`. Puis `L₂ = b*aL₁`. Puis `L₁ = aL₁ + b⁺aL₁ + cc* = b*aL₁ + c⁺`, d'où par le lemme d'Arden : `L₁ = (b*a)*c⁺`.

## Lemme de pompage (Pumping Lemma)

On l'utilise pour **prouver qu'un langage n'est pas régulier**.

**Énoncé.** Soit `L` un langage régulier infini. Pour chaque `w ∈ L` avec `|w| ≥ |Q|`, alors `∃x,u,y ∈ Σ*` avec `u ≠ ε` tels que :

1. `w = xuy`
2. `|xu| ≤ |Q|`
3. `|u| ≥ 0` (en fait `|u| > 0`, puisque `u≠ε`)
4. `xuⁿy ∈ L` pour tout `n ≥ 0`.

### Preuve

Soit le DFA ayant `m` états, et soit `|w| > m`. Considérons le chemin de l'état initial à l'état final pour reconnaître `w`. L'exécution de l'automate sur `w` doit passer par un même état au moins deux fois dans les `m` premiers pas (principe des tiroirs), avec une partie non vide du mot séparant ces deux passages.

On peut écrire `w = opqr`, avec `p` correspondant à une boucle, et `|opq| = m` (le préfixe de taille `m`). Soit `x=o`, `u=p`, `y=qr`.

1. Chaque boucle possède au moins un arc, donc `|p| > 0`, i.e. `u ≠ ε`.
2. `|xu| ≤ m` car `xu = op` et `|opq| = m`.
3. `xuⁱy ∈ L` pour tout `i` : si `p` est une boucle, elle part et revient au même état `sᵢ`, avec `δ*(sᵢ,p) = sᵢ` et `δ*(sᵢ,qr) = sfinal`. Comme `δ*(sstart,x) = sᵢ`, et `δ*(sᵢ,uⁱ) = sᵢ` pour tout `i`, on a bien `xuⁱy ∈ L`. C.Q.F.D.

### Utilisation du lemme pour prouver la non-régularité

Pour prouver qu'un langage `L` est **non régulier** on utilise le théorème de pompage par l'absurde :

1. On suppose que `L` est régulier.
2. Soit `w ∈ L` tel que `|w| ≥ n` (où `n` est le nombre d'états supposé de l'automate).
3. Pour **toute** décomposition `w = xuy` avec `u ≠ ε` et `|xu| ≤ n`, on doit démontrer qu'il existe un `i` tel que `xuⁱy ∉ L` — ce qui contredit le lemme, et donc contredit l'hypothèse que `L` est régulier.

### Exemple : `L = {aⁿbⁿ | n≥0}` n'est pas régulier

Il n'existe pas `x,u,y` tels que `xuᵏy ∈ L` pour tout `k`. Supposons qu'il existe `x,u,y`. Trois cas sont possibles :

1. **`u` dans `aⁿ`.** On suppose `u=aᵖ`, `x=aʳ`, `y=aˢbᵗ` avec `p+r+s=t`. Alors `w = aʳaᵖ⁺ˢbᵗ`, et d'après le théorème, `aʳaⁿᵖ⁺ˢbᵗ ∈ L` pour tout `n` — contradiction, car cela exigerait `r+np+s=t` pour tout `n`, ce qui est faux dès que `p>0`.
2. **`u` dans `bⁿ`.** Cas symétrique au premier.
3. **`u = aᵖbᵐ`.** Alors `uⁿ = (aᵖbᵐ)ⁿ`, donc `xuⁿy = aᵏ⁻ᵖ(aᵖbᵐ)ⁿbᵏ⁻ᵐ ∉ L` (mélange non trié de `a` et `b`).

Il n'existe donc pas de `x,u,y` avec `u≠ε` tel que `xuⁿy ∈ L` pour tout `n` : `L` n'est **pas** régulier.

**De même, on peut montrer que les langages suivants ne sont pas réguliers :**
- `L = {w ∈ {0,1}* | w contient le même nombre de 0 et de 1}`
- `L = {w ∈ {a,b,c}* | |w| = k²}`
- `L = {uu | u ∈ {a,b}*}`

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/tla-ch2-automates-finis.pdf" />

</TabItem>
</Tabs>
