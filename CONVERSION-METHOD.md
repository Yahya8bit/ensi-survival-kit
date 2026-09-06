# Conversion Method — From PDF Lecture Notes to MDX

This document governs how PDF lecture content gets converted into MDX
during the **explicit enhancement pass**. It complements two other files
without duplicating either:

- [`CLAUDE.md`](./CLAUDE.md) — the fidelity-only rule for routine
  PDF→markdown conversion (the first pass, before any enhancement).
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — page-level writing conventions
  (admonition types, proof pattern, voice, page mechanics) once content
  has been converted.

This document sits between them: it's about *how much of the source PDF
survives into the enhanced page, and in what shape* — the judgment calls
CONTRIBUTING.md's mechanical rules don't cover.

## 0. Content Archetypes

Consult this before anything else below. Different courses need different
conversion treatments — don't apply one pattern to everything.

| Archetype | Courses | Pattern | Offload |
| --- | --- | --- | --- |
| Proof-heavy theory | Algorithms, Automata Theory, Formal Logic, Numerical Methods, Graph Algorithms | Definition → Theorem → Proof → Example | Collapse the proof; keep statement + one example visible |
| Applied/tool-based programming | OOP, Web Technologies, Advanced C, Database | Goal-oriented steps, Tip/Warning admonitions | Collapse boilerplate/setup code; keep the one line that matters per step visible |
| Hardware/circuits/systems | Digital Circuits, Analogue Electronics, Microprocessor Engineering | Diagram-led; split-attention is dominant | Collapse long derivations by length; diagrams are never optional/placeholder |
| Prose/conceptual | Management, Language & Communication, Intro to Banking | Headers + short paragraphs + Key Takeaway | Minimal — lightest conversion lift |
| Protocol/process-heavy, mixed | Operating Systems, Computer Networks | Classify per section, not per course | Sequence diagrams for protocols; proof-style offload for scheduling/complexity sections |

**Classify per page or section, not per course.** A single course can mix
archetypes across its sections (e.g. an OS course's scheduling chapter is
proof-heavy while its I/O chapter is protocol-heavy).

**Sections 1–5 below detail the Archetype 1 pattern only**, since that's
the only content currently being converted (the algorithms course PDFs).
The other archetypes get their own worked examples once those courses'
materials are actually being converted. Don't force the proof-collapse
pattern onto non-proof content in the meantime — a Digital Circuits page
with no theorems to collapse isn't "missing" anything by not having a
`<details><summary>Proof</summary>` block.

## 1. Core principle

**Split by content type; offload reasoning, don't cut it.**

[bibmath.net](https://www.bibmath.net) is the model here: it keeps
theorem statements in full precision, but offloads full proofs to a
linked video rather than either inlining them (wall of text) or cutting
them (loses the reasoning entirely). Our equivalent offload mechanism is
the `<details><summary>Proof</summary>` collapsible pattern already
established in `CONTRIBUTING.md` — the proof isn't deleted, it's one
click away.

The distinction matters: "offload" means the content still exists on the
page in full, just not in the default scan path. "Cut" means it's gone.
Sections 2 below says explicitly, per content type, which one applies.

## 2. Content triage (Archetype 1)

| Content type | Treatment |
| --- | --- |
| Definitions | Keep verbatim precision; tighten wording only |
| Theorem/Proposition statements | Keep in full, exact — non-negotiable |
| Proofs | Never cut — always offload into `<details><summary>Proof</summary>` |
| Worked examples | One clean, compact example per concept (bibmath-style: one line, no elaboration). If the source has 2–3 redundant examples, keep the clearest and note in an HTML comment which were set aside |
| Asides/tangents | Compress to one sentence + a "Further reading" pointer |
| Administrative content | Extract to a separate course-info page |
| Live-lecture artifacts (unfinished figures, trailing thoughts, mid-sentence asides directed at the note-taker) | Cut, or mark explicitly as an open exercise if genuinely unfinished |
| Connective reasoning | **Add** — this is new writing, not filtering. A bridging sentence explaining why the next concept follows, written in the second-person voice from `CONTRIBUTING.md` |

## 3. Architectural split

For any topic substantial enough to warrant it, don't fit everything on
one page:

- **Main concept page** — definitions, theorems, examples, collapsed
  proofs.
- **Optional "Approach" section** — technique-level guidance, if the
  source has it (how to recognize when to apply this technique, common
  pitfalls choosing between it and alternatives).
- **Exercises on their own page**, if the source has them.

## 4. Self-audit

Apply these two questions to the drafted MDX — not the PDF — before
considering a conversion done:

1. **Too close to the PDF?** Does it mirror the source's phrasing or
   paragraph order almost 1:1, filler included? If you can lay the MDX
   and the PDF text side by side and trace matching sentences in order,
   it hasn't been converted — it's been reformatted.
2. **Too thin?** With the proof collapsed, can a first-time reader still
   follow *why* the visible statements are true — or does the visible
   scan path read like a bare formula sheet? A page that only survives
   as a reference once you already know the material has offloaded too
   much of the reasoning, not just the proof.

## 5. Worked example

Converting the "fast exponentiation" section from `algo1.pdf` (III.1.a).

### Before (fidelity-style conversion — not the target)

```md
### III.1.a Exponentiation rapide

On veut calculer x^n. L'algorithme naïf fait n-1 multiplications en
multipliant x par lui-même n-1 fois, ce qui donne une complexité en
O(n). On peut faire mieux en remarquant que x^n peut s'écrire en
fonction de x^(n/2) si n est pair, et de x^((n-1)/2) si n est impair.
Plus précisément :

Si n est pair, x^n = (x^(n/2))^2.
Si n est impair, x^n = x * (x^((n-1)/2))^2.

Démonstration : par récurrence sur n. Si n = 0, x^0 = 1, trivial. Si
n > 0 et pair, on pose n = 2k, alors x^n = x^(2k) = (x^k)^2 par
définition de la puissance, et par hypothèse de récurrence x^k se
calcule en O(log k) opérations, donc x^n se calcule en O(log k) + O(1)
= O(log n) opérations. Si n est impair, on pose n = 2k+1, alors
x^n = x^(2k+1) = x * x^(2k) = x * (x^k)^2, et le même raisonnement
s'applique avec une multiplication supplémentaire, ce qui ne change
pas la complexité asymptotique. On conclut que dans tous les cas,
x^n se calcule en O(log n) multiplications, ce qui est bien meilleur
que l'algorithme naïf en O(n) pour n grand.

Exemple : x^5. On a 5 = 2*2+1, donc x^5 = x * (x^2)^2. On calcule
x^2 (1 multiplication), puis (x^2)^2 (1 multiplication), puis on
multiplie par x (1 multiplication), soit 3 multiplications au total
au lieu de 4 pour la méthode naïve. On peut aussi vérifier avec
x^6 : 6 = 2*3, x^6 = (x^3)^2, et x^3 = x*(x^1)^2... (l'énoncé
continue avec deux exemples supplémentaires de la même forme avant
de passer au chapitre suivant sur la multiplication de polynômes).
```

### After (target)

````md
## Exponentiation rapide

L'algorithme naïf pour calculer $x^n$ fait $n-1$ multiplications
successives — $\Theta(n)$. Tu peux faire beaucoup mieux en remarquant
que $x^n$ se réduit à une puissance de $x^{n/2}$, calculée récursivement.

:::note Proposition
$$
x^n = \begin{cases}
  (x^{n/2})^2 & \text{si } n \text{ est pair} \\
  x \cdot (x^{(n-1)/2})^2 & \text{si } n \text{ est impair}
\end{cases}
$$

Cette formule se calcule en $O(\log n)$ multiplications.
:::

<details>
<summary>Proof</summary>

Par récurrence sur $n$. Cas de base : $x^0 = 1$, trivial. Cas
récursif : pour $n = 2k$ (pair), $x^n = (x^k)^2$, et par hypothèse de
récurrence $x^k$ se calcule en $O(\log k)$ opérations, donc $x^n$ en
$O(\log k) + O(1) = O(\log n)$. Pour $n = 2k+1$ (impair), $x^n =
x \cdot (x^k)^2$ — une multiplication de plus, sans changer la
complexité asymptotique.

</details>

:::tip Example
$x^5 = x \cdot (x^2)^2$ — 3 multiplications ($x^2$, puis son carré,
puis $\times\, x$) au lieu de 4 pour la méthode naïve.
:::

<!-- Source PDF gave two further examples (x^6, and one more) of the
same even/odd reduction — set aside as redundant with x^5 above; the
pattern doesn't change with a different n. -->

Cette même idée — réduire un problème de taille $n$ à un problème de
taille $n/2$ — est le principe derrière Karatsuba et Strassen, que tu
verras juste après : le gain ne vient jamais de calculer plus vite,
mais de calculer moins.
````
