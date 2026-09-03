---
sidebar_position: 4
title: "Chapitre 3 : Analyse Syntaxique"
sidebar_label: Ch3 - Analyse Syntaxique
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# III. Analyse Syntaxique

*Cours Techniques de Compilation 2023-2024 — Hatem Aouadi*

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments) — best-effort reconstruction below, see task summary -->

## Plan

III.1. Présentation Générale
III.2. Analyse syntaxique par descente récursive
III.3. Analyse syntaxique prédictive récursive
III.4. Analyse syntaxique prédictive non récursive
III.5. Récupération sur erreur
III.6. Analyse syntaxique par décalage réduction

## III.1. Présentation générale

L'analyse syntaxique consiste à vérifier que la séquence d'unités lexicales retournées par l'analyseur lexical est générée par la grammaire du langage. Ceci revient à construire un arbre syntaxique dont les feuilles concordent avec la séquence d'unités lexicales en les parcourant de gauche à droite.

Nous distinguons :

- Analyse syntaxique descendante
- Analyse syntaxique ascendante

**Analyse syntaxique descendante :** elle s'effectue par la construction descendante d'un arbre syntaxique en partant de la racine étiquetée par l'axiome de la grammaire et en réalisant de manière répétitive les étapes suivantes :

- **Étape 1** : au nœud `n` étiqueté par le non terminal `A`, choisir une production ayant `A` à gauche et construire les fils de `n` avec les symboles en partie droite de la production.
- **Étape 2** : déterminer le prochain nœud où un sous-arbre doit être construit.

## III.2. Analyse syntaxique descendante récursive

**Exemple.** Le langage est formé par un ensemble de Types générés par la grammaire non contextuelle suivante :

```
Type → array[Type_simple] of Type
     | Type_simple
     | ^Type
Type_simple → integer | char | nb 2points nb
```

Les étapes de construction descendante de l'arbre syntaxique pour le mot `array[nb 2points nb] of integer` sont les suivantes :

```
(a) Type

(b) Type
    └── array [ Type_simple ] of Type

(c) Type
    └── array [ Type_simple ] of Type
                nb 2points nb

(d) Type
    └── array [ Type_simple ] of Type
                nb 2points nb          Type_simple

(e) Type
    └── array [ Type_simple ] of Type
                nb 2points nb          Type_simple
                                          integer
```

C'est une méthode d'analyse dans laquelle on exécute des procédures récursives. Une procédure est associée à chaque non terminal.

### Pseudo-code

```
Procedure accepter(T)
  Si Symbole = T alors symbole := symbole_suivant();
  Sinon erreur();
Fin Si

Procedure Type()
  Si symbole = array alors
    accepter(array); accepter([); Type_simple(); accepter(]); accepter(of); Type();
  Sinon si symbole ∈ {integer, char, nb} alors
    type_simple();
  Sinon si symbole = ^ alors
    accepter(^); Type();
  sinon erreur();
  Fin Si Fin Si Fin Si
Fin

Procedure Type_simple()
  Si symbole = integer alors AnalLex(); accepter(integer);
  Sinon si symbole = char alors accepter(char);
  Sinon Si symbole = nb alors
    accepter(nb); accepter(2points); accepter(nb);
  Sinon erreur();
  Fin Si Fin Si Fin Si
Fin
```

`Symbole_suivant` est une fonction qui retourne le nouveau symbole trouvé par l'analyseur lexical et l'enregistre dans une variable globale `symbole`.

Exemple d'arbre pour `array[2..20] of integer` :

```
array[ Nb .. 20] of integer
```

### Application

```
P -> DCL Begin INST End.
DCL -> Var id : Type;
TYPE -> integer | real
T = {begin, var, id, :, ;, end, ., opaff, nb, ;, real, integer}
INST -> id opaff nb; | id opaff id;
```

Donner un analyseur syntaxique descendant récursif pour le langage généré par la grammaire.

Exemple de mot : `Var a: real; Begin a:=10; End.`

```
Procedure accepter(T)
  Si Symbole = T alors symbole := symbole_suivant();
  Sinon erreur();
  Fin Si

Proc P()
  DCL(); accepter(Begin); INST(); accepter(End); accepter(.);

Proc DCL()
  Si symbole = var alors
    accepter(var); accepter(id); accepter(:); Type(); accepter(;);
  sinon erreur();

Proc Type()
  si symbole = integer alors accepter(integer);
  sinon si symbole = real alors accepter(real)
  sinon erreur()

Proc INST()
  Si symbole = id Alors
    accepter(id); accepter(opaff);
    si symbole = id alors accepter(id);
    sinon si symbole = nb alors accepter(nb);
    sinon erreur();
    accepter(;)
```

Arbre pour `Var a : integer; begin a:= 10 ; end.` :

```
P
├── DCL
│   └── var id : Type ;
│           integer
├── begin
├── INST
│   └── Id opaff nb ;
└── end .
```

## III.3. Analyse syntaxique Prédictive descendante récursive

C'est une méthode d'analyse syntaxique par descente récursive où un symbole de prévision permet de décider d'une manière unique quelle règle peut être appliquée.

- La grammaire doit être non récursive à gauche et non ambiguë.
- Pour se faire, il faut éliminer la récursivité à gauche puis enlever l'ambiguïté.
- Ensuite, on associe une procédure à chaque non terminal.

**Rq.** Le pseudo-code précédent est associé à un analyseur syntaxique prédictif récursif car la grammaire qui génère les types est non ambiguë et non récursive à gauche.

### III.3.1. Élimination de la récursivité à gauche

Une grammaire est dite récursive à gauche si elle admet une règle de la forme `A → A α`.

Une grammaire récursive à gauche avec les règles de production :

```
A → Aα1 | Aα2 | … | Aαn | β1 | β2 | … | βm
```

est transformée en une grammaire non récursive à gauche ayant les règles de production :

```
A  → β1 A' | β2 A' | … | βm A'
A' → α1 A' | α2 A' | … | αn A' | ε
```

**Exemple.** La grammaire suivante est récursive à gauche :

```
Exp → Exp op Exp | (Exp) | id | nb
```

Elle est transformée en une grammaire non récursive à gauche avec les règles suivantes :

```
Exp → (Exp) E' | id E' | nb E'
E'  → op Exp E' | ε
```

### III.3.2. Élimination de l'ambiguïté

Une grammaire est dite ambiguë si elle admet des règles de la forme `A → α β1 | α β2`.

Une grammaire ambiguë avec les règles de production :

```
A → αβ1 | αβ2 | … | αβn | α1 | α2 | … | αm
```

est transformée en une grammaire non ambiguë ayant les règles de production :

```
A  → α A' | α1 | α2 | … | αn
A' → β1 | β2 | … | βn
```

**Exemple.** La grammaire suivante est ambiguë :

```
I → If (Expb) Then I | If (Expb) Then I else I
```

Elle est transformée en une grammaire non ambiguë avec les règles suivantes :

```
I → If (Expb) Then I S
S → ε | else I
```

### III.3.3. Exemple

Le langage est formé par une séquence non vide d'instructions d'affectation :

```
L_I → I | I L_I
I   → id := Exp;
Exp → id | nb | (Exp) | Exp op Exp
```

1) En éliminant la récursivité à gauche, on obtient :

```
L_I → I | I L_I
I   → id := Exp;
Exp → id E' | nb E' | (Exp) E'
E'  → op Exp E' | ε
```

2) En éliminant l'ambiguïté, on obtient :

```
L_I → I S
S   → ε | L_I
I   → id := Exp;
Exp → id E' | nb E' | (Exp) E'
E'  → op Exp E' | ε
```

**Pseudo-code d'un analyseur syntaxique prédictif et récursif associé :**

```
Procédure accepter(T)
  Si symbole = T alors Symbole := symbole_suivant();
  Sinon erreur();
  FinSi

FinProcédure L_I()
  I(); S();
Fin

Procédure S()
  Si symbole = id alors L_I();
FinProcédure

Procédure I()
  Si symbole = id alors accepter(id); accepter(:=); Exp(); accepter(;);
  Sinon erreur();
  Fin Si
FinProcédure

Procédure Exp()
  Si symbole = id alors accepter(id); E'();
  Sinon Si symbole = nb alors accepter(nb); E'();
  Sinon si symbole = ( alors accepter((); Exp(); accepter()); E'();
  Sinon erreur();
  Fin Si Fin Si Fin Si
FinProcédure

Procédure E'()
  Si symbole = op alors accepter(op); Exp(); E'();
Fin
```

## III.4. Analyse syntaxique prédictive non récursive

C'est une méthode d'analyse où on remplace l'appel de procédures récursives par la manipulation d'une pile.

- La grammaire doit être non récursive à gauche et non ambiguë.
- Initialement la pile contient le symbole fond de pile `$` et au sommet l'axiome de la grammaire ; le tampon d'entrée contient le mot à analyser suivi du symbole `$` ; la tête de lecture/écriture pointe sur le premier symbole.
- À la fin de l'analyse, la pile contient le symbole `$` et la tête de L/E pointe sur le symbole `$` de fin de la chaîne.
- L'évolution de l'analyse s'effectue en consultant une table d'analyse.

**Exemple.** Grammaire :

```
S → id:= E;
E → E + E | E – E | E * E | E/E | (E) | id | nb
```

Après élimination de la récursivité à gauche et de l'ambiguïté :

```
S  → id:= E;
E  → (E) E' | id E' | nb E'
E' → + E E' | – E E' | * E E' | /E E' | ε
```

Configuration initiale : pile `S$`, tampon `Id := id op nb ; $`, tête de L/E sur le premier symbole.
Configuration finale : pile `$`, tampon consommé jusqu'à `$`, tête de L/E sur `$`.

### Table d'analyse M

Elle spécifie, pour chaque non terminal et chaque terminal (ou `$`, cas de fin de chaîne), une règle de production pouvant éventuellement être appliquée.

Pour la grammaire `S → id:= E; E → (E) E' | id E' | nb E'; E' → + E E' | – E E' | * E E' | /E E' | ε`, la table est :

| Non terminal | id | nb | + | - | * | / | ( | ) | := | $ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S | | | | | | | | | | `S → id:= E;` |
| E | `E → id E'` | `E → nb E'` | | | | | `E → (E) E'` | | | |
| E' | | | `E' → + E E'` | `E' → - E E'` | `E' → * E E'` | `E' → / E E'` | | | | |

### III.4.1. Algorithme d'analyse syntaxique prédictive non récursive

```
Positionner le pointeur (ps) sur le premier symbole de ω$;
Répéter
  Soit X le symbole en sommet de pile et a le symbole en cours d'analyse (repéré par ps) :
  Si X est un terminal ou $ alors
    Si X = a alors enlever X de la pile et avancer ps
    Sinon erreur()
  Sinon /* X est un non terminal */
    consulter M[X, a]
    Si M[X, a] = X → Y1 Y2..YK = α alors
      dépiler X et empiler l'image miroir de α
      c-a-d empiler Yk, yk-1, … Y1
      et émettre en sortie la règle X → Y1 Y2..YK
    Sinon erreur()
Jusqu'à X = $ /* la pile est vide */
```

### III.4.1. Exemple

Grammaire : `S → id:= E; E → (E) E' | id E' | nb E'; E' → + E E' | – E E' | * E E' | /E E' | ε`

Analyse du mot `ω : id := id + nb ; $`

| Pile | Entrée | Message |
| --- | --- | --- |
| $S | id := id + nb ; $ | |
| $ ; E := id | id := id + nb ; $ | S → id := E ; |
| $ ; E := | := id + nb ; $ | |
| $ ; E | id + nb ; $ | |
| $ ; E' id | id + nb ; $ | E → id E' |
| $ ; E' | + nb ; $ | |
| $ ; E' E + | + nb ; $ | E' → + E E' |
| $ ; E' E | nb ; $ | |
| $ ; E' E' nb | nb ; $ | E → nb E' |
| $ ; E' E' | ; $ | |
| $ ; | ; $ | E' → ε |
| $ | $ | E' → ε |

L'algorithme se contente d'informer l'utilisateur par la règle appliquée, ou bien par l'erreur syntaxique détectée. Ces erreurs seront vues plus tard.

### III.4.2. Calcul des premiers et suivants

La construction de la table d'analyse est facilitée par deux fonctions associées à une grammaire `G` : Premier et Suivant.

**Calcul du PREMIER(X)** pour tout symbole `X` de la grammaire. Appliquer les règles suivantes jusqu'à ce qu'aucun terminal ni `ε` ne puisse être ajouté aux ensembles PREMIER :

1. Si `X` est un terminal, PREMIER(X) est `{X}`.
2. Si `X → ε` est une production, ajouter `ε` à PREMIER(X).
3. Si `X` est un non-terminal et `X → Y1 Y2..YK` une production, mettre `a` dans PREMIER(X) s'il existe `i` tel que `a` est dans PREMIER(Yi) et que `ε` est dans tous les PREMIER(Y1), …, PREMIER(Yi-1), c-à-d `Y1…Yi-1 ⇒* ε`. Si `ε` est dans PREMIER(Yj) pour tous les `j = 1, 2, 3, …, k`, ajouter `ε` à PREMIER(X). Si `Y1` ne se dérive pas en `ε`, on n'ajoute rien de plus à PREMIER(X), mais si `Y1 ⇒* ε`, on ajoute PREMIER(Y2), etc.

**Calcul du SUIVANT(A)** pour tous les non-terminaux `A`, appliquer les règles suivantes jusqu'à ce qu'aucun terminal ne puisse être ajouté aux ensembles SUIVANT :

1. Mettre `$` dans SUIVANT(S), où `S` est l'axiome et `$` est le marqueur droit indiquant la fin du texte source.
2. S'il y a une production `A → αBβ`, le contenu de PREMIER(β), excepté `ε`, est ajouté à SUIVANT(B).
3. S'il existe une production `A → αB` ou une production `A → αBβ` telle que PREMIER(β) contient `ε` (c-à-d `β ⇒* ε`), les éléments de SUIVANT(A) sont ajoutés à SUIVANT(B).

### III.4.3. Algorithme de construction d'une table d'analyse prédictive

```
Donnée.  Une grammaire G
Résultat. Une table d'analyse M pour G
Méthode.
1. Pour chaque production A → α de G, procéder aux étapes 2 et 3.
2. Pour chaque terminal a dans PREMIER(α), ajouter A → α à M[A, a].
3. Si ε est dans PREMIER(α), ajouter A → α à M[A, b] pour chaque b dans SUIVANT(A).
   Si ε est dans PREMIER(α) et $ est dans SUIVANT(A), ajouter A → α à M[A, $].
4. Faire de chaque entrée non définie de M une erreur.
```

### III.4.4. Exemple 1

Considérons la grammaire suivante :

```
E  → TE'
E' → +TE' | ε
T  → FT'
T' → *FT' | ε
F  → id | (E)
```

**Premier et Suivant :**

```
PREMIER(E) = PREMIER(T) = PREMIER(F) = {(, id}
PREMIER(E') = {+, ε}
PREMIER(T') = {*, ε}
SUIVANT(E) = SUIVANT(E') = {), $}
SUIVANT(T) = SUIVANT(T') = {+, ), $}
SUIVANT(F) = {+, *, ), $}
```

**Rq.** Si `T → ε` alors `premier(E) = Premier(T) ∪ Premier(E')`.

**Table d'analyse :**

| Non terminal | id | + | * | ( | ) | $ |
| --- | --- | --- | --- | --- | --- | --- |
| E | E→TE' | | | E→TE' | | |
| E' | | E'→+TE' | | | E'→ε | E'→ε |
| T | T→FT' | | | T→FT' | | |
| T' | | T'→ε | T'→*FT' | | T'→ε | T'→ε |
| F | F→id | | | F→(E) | | |

**Analyse du mot `id+id*id` :**

| PILE | ENTREE | SORTIE |
| --- | --- | --- |
| $E | id+id*id$ | |
| $E'T | id+id*id$ | E→TE' |
| $E'T'F | id+id*id$ | T→FT' |
| $E'T'id | id+id*id$ | F→id |
| $E'T' | +id*id$ | |
| $E' | +id*id$ | T'→ε |
| $E'T+ | +id*id$ | E'→+TE' |
| $E'T | id*id$ | |
| $E'T'F | id*id$ | T→FT' |
| $E'T'id | id*id$ | F→id |
| $E'T' | *id$ | |
| $E'T'F* | *id$ | T'→*FT' |
| $E'T'F | id$ | |
| $E'T'id | id$ | F→id |
| $E'T' | $ | |
| $E' | $ | T'→ε |
| $ | $ | E'→ε |

### III.4.5. Exemple 2

```
E → E ou T | T
T → T et F | F
F → non F | (E) | id
```

Transformée en la grammaire non récursive à gauche suivante :

```
E  → TE'
E' → ou T E' | ε
T  → F T'
T' → et F T' | ε
F  → non F | (E) | id
```

**Premier et Suivant :**

```
Premier(E) = Premier(T) = Premier(F) = {non, (, id}
Premier(E') = {ou, ε}
Premier(T') = {et, ε}
Suivant(E) = Suivant(E') = {), $}
Suivant(T) = premier(E') – {ε} ∪ suivant(E) = {ou, ), $} = Suivant(T')
Suivant(F) = premier(T') – {ε} ∪ suivant(T) = {et, ou, ), $}
```

**Table d'analyse :**

| Non terminal | id | et | ou | non | ( | ) | $ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| E | E→TE' | | | E→TE' | E→TE' | Sync | Sync |
| E' | | | E'→ouTE' | | | E'→ε | E'→ε |
| T | T→FT' | | | T→FT' | T→FT' | Sync | Sync |
| T' | | T'→etFT' | T'→ε | | | T'→ε | T'→ε |
| F | F→id | | | F→non F | F→(E) | Sync | Sync |

**Analyse du mot `(id et id) ou id` :**

| PILE | ENTREE | SORTIE |
| --- | --- | --- |
| $E | (Id et id) ou id $ | |
| $E'T | (Id et id) ou id $ | E→TE' |
| $E'T'F | (Id et id) ou id $ | T→FT' |
| $E'T')E( | (Id et id) ou id $ | F→(E) |
| $E'T')E | Id et id) ou id $ | |
| $E'T')E'T | Id et id) ou id $ | E→TE' |
| $E'T')E'T'F | Id et id) ou id $ | T→FT' |
| $E'T')E'T'id | Id et id) ou id $ | F→id |
| $E'T')E'T' | et id) ou id $ | |
| $E'T')E'T'F | et et id) ou id $ | T'→et FT' |
| $E'T')E'T'F | id) ou id $ | |
| $E'T')E'T'id | id) ou id $ | |
| $E'T')E'T' | ) ou id $ | F→id |
| $E'T')E' | ) ou id $ | T'→ε |
| $E'T') | ) ou id $ | E'→ε |
| $E'T' | ou id $ | |
| $E' | ou id $ | T'→ε |
| $E'Tou | ou id $ | E'→ou T E' |
| $E'T | id $ | |
| $E'T'F | id $ | T→FT' |
| $E'T'F | id $ | T→FT' |
| $E'T'id | id $ | F→id |
| $E'T' | $ | |
| $E' | $ | T'→ε |
| $ | $ | E'→ε |

### III.4.6. Grammaires LL(1)

Une grammaire dont la table d'analyse n'a aucune entrée définie de façon multiple est appelée **LL(1)**. Le premier `L` signifie « parcours de l'entrée de gauche à droite » (Left to right Scanning). Le deuxième `L` signifie « dérivation gauche» (Left most derivation) et le `1` signifie qu'on utilise un seul symbole de prévision.

**Exemple.** `S → iEtSS' | a`, `S' → eS | ε`, `E → b`

| Non terminal | a | b | e | i | t | $ |
| --- | --- | --- | --- | --- | --- | --- |
| S | S→a | | | S→iEtSS' | | |
| S' | | | S'→eS | | | S'→ε |
| E | | E→b | | | | |

## III.5. Récupération sur erreur

Une erreur provient dans une analyse syntaxique prédictive non récursive lorsque nous avons un symbole non terminal `A` en sommet de pile et un symbole `a` en entrée et `M[A, a] = φ`, alors sauter jusqu'à suivant(A) et dépiler A, dans l'espoir de continuer avec les suivants de A.

Si nous avons un symbole non terminal `A` en sommet de pile et un symbole `a` en entrée et `M[A, a] = φ`, alors sauter jusqu'à Premier(A) dans l'espoir de continuer avec A.

Si nous avons un symbole terminal `a` en sommet de pile et un symbole `b` en entrée et `a ≠ b`, alors `a` manquant.

**Cas général de traitement des erreurs :** on se synchronise avec les suivants des non terminaux :

- `M[A, a] = φ` ⇒ sauter `a`, en remplissant les cases `[A, suivant(A)]` par `Sync` si la case est vide.
- `M[A, a] = Sync` ⇒ dépiler `A` si au milieu d'analyse ; sauter vers premier(A) si début d'analyse.

**Exemple : analyse du mot `)id*+id`** avec la table synchronisée (voir table de l'Exemple 1 étendue avec `Sync`) :

| PILE | ENTREE | SORTIE |
| --- | --- | --- |
| $E | )Id *+id$ | Sauter jusqu'à premier(E), ')' mal inséré |
| $E | Id *+id$ | |
| $E'T | Id *+id$ | E→TE' |
| $E'T'F | Id *+id$ | T→FT' |
| $E'T'id | Id *+id$ | F→id |
| $E'T' | *+id $ | |
| $E'T'F* | *+id $ | T'→*FT' |
| $E'T'F | +id $ | Sauter jusqu'à suivant(F), 'F' mal formé |
| $E'T' | +id$ | |
| $E' | +id$ | T'→ε |
| $E'T+ | +id$ | E'→+TE' |
| $E'T | id$ | |
| $E'T'F | id$ | T→FT' |
| $E'T'id | id$ | F→id |
| $E'T' | $ | |
| $E' | $ | T'→ε |
| $ | $ | E'→ε |

### Pseudo-code d'un analyseur syntaxique prédictif récursif avec récupération sur erreur

```
E → TE'
E' → +TE' | ε
T → FT'
T' → *FT' | ε
F → id | (E)

Proc E()
  T(); E'();

Proc E'()
  Si symbole.UL = id alors accepter(id);
  Sinon Si Symbole.UL = ( alors accepter((); E(); accepter());
  Sinon Si i = 1 Alors
    Repeter Symbole = Symbole_suivant();
    Jusqu'à symbole.Ul ∈ {id, (} ou EOF
  Sinon Si symbole.UL = + alors accepter(+); T(); E'();

Proc T()
  F(); i = 0; T'();

Proc T'()
  Si symbole.UL = * alors accepter(*); F(); T'();

Proc F()
  Si symbole.UL ∈ {id, (} alors F();
  Sinon Répéter Symbole = Symbole_suivant();
    jusqu'à symbole.UL ∈ {+, *, ), EOF}
    Message(F mal formé);
  Fin
Fin
```

Version récursive (`Accepter(T)`) :

```
Accepter(T)
  Si Symbole.UL = T alors Symbole := Symbole_suivant();
  Sinon Message(T manquant)

Programme AnalSyn()
Début
  Ouvrir Fichier
  Symbole := symbole_suivant; i = 1; E();
  Fermer Fichier
Fin
```

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/compilation-ch3-analyse-syntaxique.pdf" />

</TabItem>
</Tabs>
