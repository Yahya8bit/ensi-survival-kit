---
sidebar_position: 1
title: Chapitre 1 - Alphabets et Langages
sidebar_label: Ch1 - Alphabets et langages
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Chapitre 1 : Alphabets et langages

## Définitions de base

1. **Alphabet** : ensemble **fini** de symboles, noté en général `Σ`.
   - Alphabet Latin : `Σ={a,b,c,…,z}`
   - Alphabet binaire : `Σ={0,1}`
   - `Σ={rouge,noir,0,1,a}`

2. **Mot ou chaîne** : séquence de symboles de l'alphabet, notée `w`.
   - `w₁=voiture`, `w₂=voyage` : deux mots définis sur l'alphabet Latin.
   - `w₁=00101`, `w₂=101101` : deux mots définis sur l'alphabet binaire.
   - `w₁=noir01rouge`, `w₂=10aanoir` : deux mots définis sur l'alphabet `Σ={rouge,noir,0,1,a}`.

3. **Taille d'un mot** : `|w|` = nombre de symboles constituant le mot.
   - `|rouge|=5` en considérant l'alphabet Latin.
   - `|001|=3` en considérant l'alphabet binaire.
   - `|rouge|=1` en considérant l'alphabet `Σ={rouge,noir,0,1,a}` (ici `rouge` est un seul symbole de l'alphabet).

4. **Chaîne vide** : notée `ε` — s'il n'appartient pas à l'alphabet — avec `|ε|=0`.

5. **Sous-chaîne** : `x` est une sous-chaîne de `w` s'il existe `y` et `z` (chaînes sur le même alphabet) tel que `w = y x z`.

6. **Préfixe** : `x` est un préfixe de `w` s'il existe `y` tel que `w = x y`.

7. **Suffixe** : `x` est un suffixe de `w` s'il existe `y` tel que `w = y x`.
   - `x = voit` est un préfixe de `w = voiture`, car il existe `y = ure` tel que `w = voit·ure = x y`.
   - `x = ture` est un suffixe de `w = voiture`, car il existe `y = voi` tel que `w = voi·ture = y x`.

## Opérations sur les mots

### Concaténation

Soient `u` et `v` deux mots définis sur l'alphabet `Σ`, tels que `u = x₁x₂...xₙ` et `v = y₁y₂...yₘ`. Alors :

```
w = u.v = x₁x₂...xₙy₁y₂...yₘ
```

La concaténation est **non commutative**.

**Propriétés :**
- `|w| = |uv| = |u| + |v|`
- `.` est associative.
- `ε` est l'élément neutre pour la concaténation : `εx = xε = x`.

### Facteur

Soient `u,v,w,t` des mots définis sur `Σ` tels que `w = uvt`.
- Si `u = ε` alors `v` est dit **facteur gauche** de `w` (ou préfixe).
- Si `t = ε` alors `v` est dit **facteur droit** de `w` (ou suffixe).
- Si `u = t = ε` alors `w` est un facteur de lui-même.

### Occurrence d'un symbole dans un mot

`|abaaba|ₐ = 4` (le symbole `a` apparaît 4 fois dans `abaaba`).

### Image (reverse)

`w = aabab`, `wᴿ = babaa`.
- Si `x ∈ Σ` alors `xᴿ = x`.
- Si `w = xu` alors `wᴿ = uᴿx`.

**Exercice.** Montrer que `(wu)ᴿ = uᴿwᴿ`, `∀k / |u| = k`, par induction sur la longueur de `u` :
- `|u|=1` : `(wu)ᴿ = uwᴿ = uᴿwᴿ`.
- Supposons que c'est vrai pour `k>1` et montrons-le pour `n>k`. Soit `u=tx`, avec `|u| ≥ k`, `|t| < k`, `x ∈ Σ`. Alors `(wu)ᴿ = (wtx)ᴿ = xᴿ(wt)ᴿ = xᴿtᴿwᴿ` (par HI, `|t| ≤ k`) `= xᴿtᴿwᴿ = (tx)ᴿwᴿ = uᴿwᴿ`.

## Langage

Un **langage** est un ensemble de mots choisis dans un alphabet. Un langage peut être infini, mais il existe un nombre fini de symboles permettant de composer les mots de ce langage.

`Σᵏ` = ensemble des mots de longueur `k` avec des symboles de `Σ`.

**Exemple :** `Σ={0,1}`
- `Σ¹={0,1}`
- `Σ²={00,01,10,11}`
- `Σ⁰={ε}`

### `Σ*` : fermeture de l'alphabet

`Σ*` = ensemble de toutes les séquences de taille finie définies sur `Σ`.

```
Σ* = {ε} ∪ Σ¹ ∪ Σ² ∪ ...
Σ⁺ = Σ¹ ∪ Σ² ∪ ...
Σ⁺ ∪ {ε} = Σ*
```

Si `Σ` est un alphabet, et `L ⊆ Σ*`, alors `L` est un langage. Un langage est un ensemble de mots appartenant à `Σ*` et qui vérifient une propriété donnée :

```
L = {w ∈ Σ* | w possède la propriété P}
```

**Exemples de langages :**
- Ensemble des mots anglais légaux.
- Ensemble des programmes C légaux.
- Ensemble des mots de l'alphabet binaire contenant un nombre `n` de `0` suivi par le même nombre `n` de `1` : `L={ε; 01; 0011; 000111; …}`.
- Ensemble des mots de l'alphabet binaire ayant un même nombre de `0` et de `1` : `L={ε; 01; 10; 0101; 1001; …}`.
- Ensemble des mots de l'alphabet binaire tels que leur valeur est premier : `L={10; 11; 101; 111; 1011; …}`.
- Le **langage vide** `L = ∅`.
- Le langage `{ε}` contenant le mot vide.

> **Note :** `∅ ≠ {ε}`. L'alphabet `Σ` est un ensemble fini.

**Exemple : ensemble des palindromes** sur l'alphabet `Σ = {a,b}` :

```
L = {w ∈ Σ* | w = wᴿ}
L = {ε, aba, bab, a, b, …}
```

### Il y a une différence ?

Il faut faire la différence entre :
- `ε` — la chaîne vide (`""`)
- `∅` — l'ensemble vide (`{}`)
- `{ε}` — l'ensemble qui contient tout simplement la chaîne vide.

### Propriétés du langage

- `Σ*` est infinie et dénombrable.
- `L = L₁ ∪ L₂ = {w ∈ Σ* | w ∈ L₁ ou w ∈ L₂}`
- `L = L₁ ∩ L₂ = {w ∈ Σ* | w ∈ L₁ et w ∈ L₂}`
- **Concaténation :** `L = L₁ . L₂ = L₁L₂ = {w ∈ Σ* | ∃x,y, w = xy, x ∈ L₁, y ∈ L₂}`
- **Fermeture de Kleene :** `L* = {w ∈ Σ* | w = w₁w₂…wₖ, k ≥ 0 et w₁,w₂,…,wₖ ∈ L}`. `k=0 ⇒ w=ε` ; `k=1 ⇒ w ∈ L`.

  Si `L` est un langage alors `L*` désigne l'ensemble de toutes les chaînes de longueurs finies formées par concaténation de mots de `L`, où chaque mot peut être utilisé de 0 à `n` fois — la chaîne vide est incluse.

  **Exemple :** `L={aa,b}` → `L*={ε,b,aa,bb,aab,baa,bbb,aaaa,aabb,baab,bbaa,bbbb,aaaab,aabaa,aabbb,baaaa,bbaab,bbbaa,bbbbb,…}`.

  > **Note :** `∅* = {ε} ≠ ∅`.

  **Exercice.** Soit `Σ={0,1}`, `L={w ∈ Σ* | w contient un nombre de 1 différent du nombre de 0}`. Montrer que `L* = Σ*`.

- `L ∪ M = M ∪ L` — union commutative.
- `(L ∪ M) ∪ N = L ∪ (M ∪ N)` — union associative.
- `(LM)N = L(MN)` — concaténation associative.

  > **Note :** la concaténation n'est **pas** commutative, i.e. il existe `L` et `M` tel que `LM ≠ ML`.

- `L(M ∪ N) = LM ∪ LN` — concaténation distributive à gauche pour l'union.
- `(M ∪ N)L = ML ∪ NL` — concaténation distributive à droite pour l'union.
- `L ∪ L = L` — union idempotente.
- `∅* = {ε}`, `{ε}* = {ε}`
- `L⁺ = LL* = L*L`, `L* = L⁺ ∪ {ε}`
- `(L*)* = L*` — la fermeture est idempotente.

**Exercice.** Compléter :

| Expression | = |
|---|---|
| `L* ∪ {ε}` | |
| `L⁺ • {ε}` | |
| `{ε} • {ε}` | |
| `∅ • L` | |
| `L* • L*` | |
| `(L*)*` | |
| `L • L*` | |
| `∅*` | |
| `{ε}*` | |

## Représentation finie de langages

Tout sous-ensemble de `Σ*` dont les mots peuvent être définis de deux façons :

### Définition par propriété

Modélisation formelle d'une description naturelle d'un langage.

**Exemple :** `L₁` = ensemble de mots définis sur `{a,b}` de longueur paire : `L₁ = {w ∈ {a,b}* / |w| = 2n; n ≥ 0}`.

### Définition récursive

Définition dans laquelle un langage est défini sur lui-même.

```
L₂ = {w ∈ Σ* | w = a ou w = aw₁; w₁ ∈ L₂} = {a,aa,…,aaaa,…}
L₃ = {w ∈ Σ* | w = ε ou w = w₁w₂; |w₁| = 2 et w₂ ∈ L₃}
```

`L₃ ≡ L₁`.

## Expressions régulières

**Exemple d'introduction.** `L₄ = {ε,x,xx,xxx,xxxx,….}`. Soit `S = {x}`, alors `L₄ = S*` ou `L₄ = {x}*`. Considérons l'étoile de la fermeture de Kleene appliquée à la lettre `x` : `x*` indiquera une séquence quelconque de `x` qui peut être vide. `x* = ε` ou `x` ou `xx` ou `xxx`… `L₄ = langage(x*)`.

**Exemple : `ab*`.** `L = {a,ab,abb,abbb,abbbb,…}` — toutes les chaînes constituées d'un `a` suivi d'un nombre quelconque de `b`. `L = Langage(ab*)` : langage dans lequel les mots sont la concaténation d'un `a` (`a`) initial avec un nombre quelconque de `b` (`b*`). Appliquons l'étoile de Kleene à toute la chaîne `ab` : `(ab)* = ε` ou `ab` ou `abab` ou ….

**Exemple : `ab*a`.** Ensemble de toutes les chaînes de `a` et de `b` qui ont au moins deux lettres, qui commencent et finissent par un `a`, et qui n'ont que des `b` (ou rien) à l'intérieur. `langage(ab*a) = {aa,aba,abba,abbba,…}`.

> **Remarque :** description fausse — « ensemble de tous les mots qui commencent et puis finissent par `a` et qui n'ont que des `b` (ou rien) entre eux » — le mot `a` appartient à cette description à tort (il ne commence/finit pas par deux `a` distincts, selon cette lecture ambiguë).

**Exemple : `a*b*`.** Ensemble de toutes les chaînes de `a` et de `b` dans lesquelles les `a`'s viennent avant les `b`'s. `langage(a*b*) = {ε,a,b,aa,bb,ab,bb,aaa,abb,…}`.

> **Remarque :** `a*b* ≠ (ab)*`. Le langage à droite contient `abab` tandis que celui à gauche ne le contient pas.

**Exemple : `T` définie sur `Σ={a,b,c}`.** `T={a,c,ab,cb,abb,cbb,abbb,cbbb,abbbb,cbbbb,…}`. Tous les mots de `T` commencent avec un `a` ou un `c`, ensuite ils sont suivis par un nombre quelconque (éventuellement nul) de `b`. Symboliquement, `T = langage((a∪c)b*)`.

**Autres exemples :**
- Ensemble des chaînes de `a` et de `b` de longueur 3 : `L = lang((a∪b)(a∪b)(a∪b))`.
- Ensemble des chaînes de `a` et de `b` de longueur quelconque : `L = lang((a∪b)*)`.

### Définition formelle

Une **expression régulière** sur un alphabet `Σ` est une chaîne de caractères sur l'alphabet `Σ,(,),∪,*,∅`, telle que :

1. Toute lettre de `Σ ∪ {ε}` et `∅` est une expression régulière.
2. Si `r₁` et `r₂` sont deux expressions régulières, alors `(r₁)`, `r₁r₂`, `r₁ ∪ r₂`, `r₁*` sont des expressions régulières.
3. Rien d'autre n'est une expression régulière.

**Exemple 1.** `Σ={a,b}`, `L={w ∈ Σ* | w contient la sous-chaîne aa}` → `R = (a∪b)*aa(a∪b)*`.

**Exemple 2.** `Σ={a,b}`, `L={w ∈ Σ* | w ne contient pas 3 b consécutifs}` → `R = (a∪ba∪bba)*(ε∪b∪bb)`.

### Langage régulier

**Théorème.** Un langage `L` est dit **régulier** si et seulement s'il existe une expression régulière qui le génère.

**Exemple.** `Σ={a,b}`, `L={w ∈ Σ* | w contient un nombre pair de a et un nombre pair de b}` → `R = (aa∪bb∪(ab∪ba)(aa∪bb)*(ab∪ba))*`.

**Propriétés.** Étant donné deux langages réguliers `L₁` et `L₂` :
- `L₁ ∪ L₂` est un langage régulier.
- `L₁ . L₂` est un langage régulier.
- `L₁*` est un langage régulier.
- `L̄₁ = Σ* \ L₁` est un langage régulier.
- `L₁ ∩ L₂ = (L̄₁ ∪ L̄₂)‾` est un langage régulier.
- `Lᴿ` est un langage régulier.
- `L₁ \ L₂` est un langage régulier.

**Définition (équivalence).** Deux expressions régulières `α` et `β` sont dites **équivalentes** si `L(α) = L(β)`, autrement dit si elles génèrent le même langage.

**Exemple.** Le langage de tous les mots qui ont au moins 2 `a`'s peut être décrit par `(a∪b)*a(a∪b)*a(a∪b)*`, ou de manière équivalente par `b*ab*a(a∪b)*`. On note : `(a∪b)*a(a∪b)*a(a∪b)* = b*ab*a(a∪b)*`.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/tla-ch1-alphabets-langages.pdf" />

</TabItem>
</Tabs>
