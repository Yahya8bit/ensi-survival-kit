# Contributing — Content Style Guide

This guide governs the **content-enhancement pass**: adding admonitions,
restructuring pages, writing original explanatory prose (intros, "You will
learn" boxes, transitions, Next Steps lines). It is a separate, later,
explicitly-requested task from routine PDF→markdown conversion.

Routine PDF→markdown conversion (transcribing a course PDF into a new doc,
or fixing a transcription that drifted from the source) is governed by
[`CLAUDE.md`](./CLAUDE.md), whose core rule is fidelity over improvement —
numbers, wording, structure, and exercise statements get transcribed
exactly, not polished. This guide does the opposite job: it's for pages
that have already been faithfully transcribed and are now being
deliberately reshaped for readability. Don't apply this guide's rules
(admonitions, "You will learn" boxes, voice) during a conversion pass —
that's exactly the kind of scope-mixing `CLAUDE.md` §1 warns against. Do
one pass at a time.

## Admonition types

| Content | Admonition |
| --- | --- |
| Definition | `:::info Definition` |
| Theorem / Proposition | `:::note Theorem` |
| Worked example | `:::tip Example` |
| Warning / gotcha | `:::warning` or `:::danger` |

Use `:::danger` only for something that will actively break a solution if
missed (a common exam trap, an easy-to-violate precondition). Everyday
"watch out for this" notes are `:::warning`.

## Proofs

Wrap every proof in a collapsible block:

```md
<details>
<summary>Proof</summary>

...proof content...

</details>
```

Rationale: a student reading for the result can skip it; a student doing
exam prep can expand it. Proofs are transcribed content once inside the
block — the fidelity rules from `CLAUDE.md` still apply to the proof text
itself, only its container changes.

## Pseudocode

Pseudocode goes in a titled fenced code block, one algorithm per block —
never inline prose-pseudocode ("first we loop over each vertex, then...").

````md
```text title="Dijkstra"
dist[source] ← 0
for each vertex v ≠ source:
    dist[v] ← ∞
...
```
````

## Page mechanics

- **Short paragraphs**: 1–3 sentences.
- **Heading hierarchy**: `##`, `###` in strict order (no skipped levels) so
  the sidebar table of contents stays accurate.
- **One concept per page** where reasonable.
- **Opening**: every page starts with a "You will learn" box (2–5 bullets)
  before any other content.
- **Code blocks stay short**: introduce → explain → continue. Don't drop
  one long block followed by a wall of explanation after it — interleave.
- **Closing**: every page ends with a "Next Steps" line or box pointing to
  the next logical page.
- **Split-attention rule**: a diagram and the text explaining it must be
  adjacent. No diagram followed by several paragraphs before its
  explanation, and no explanation that says "the diagram above" once the
  reader has scrolled past it. If a diagram needs discussion, that
  discussion goes directly beneath it, before any new content starts.

## Voice

Original explanatory prose you write — page intros, "You will learn"
bullets, transitions, Next Steps lines — uses second-person, reassuring
tone ("you'll see...", "don't worry if this feels abstract at first").
Transcribed definitions, theorems, and proofs keep their existing formal
register: only the scaffolding around the math content gets the voice
treatment, never the math content itself.

## Math syntax

Unsure how to write inline math, block equations, matrices, or summations
so they render correctly? Check
[`docs/_internal/math-reference.md`](./docs/_internal/math-reference.md) —
a known-good reference page (excluded from the build) with one example of
each. Compare against it rather than guessing, especially after any KaTeX
version upgrade.

## A note on content organization

Pages here lean toward "explanation" style — concepts, proofs, theory,
walked through at reading pace. If a page starts accumulating
quick-lookup content instead (bare theorem statements with no discussion,
complexity comparison tables, algorithm signatures with no walkthrough),
that's a signal it wants to become a separate reference/cheat-sheet page
rather than grow in place. Splitting the reference material out of
explanation pages is a planned future content-restructure effort — not
something to execute as part of this pass.

## Worked example

The fragment below follows every rule above — use it as a starting
template for a new page.

````md
---
title: "Diviser pour Régner : Introduction"
sidebar_label: Diviser pour régner
---

:::info You will learn
- What "divide and conquer" means and when it applies
- The formal definition of a divide-and-conquer algorithm
- The Master Theorem, and how to read it
- A worked example: multiplying large integers faster than the naive method
:::

Diviser pour régner is one of the most common algorithm design patterns
you'll meet. Once the pattern clicks, you'll start spotting it everywhere.

## Definition

:::info Definition
A **divide-and-conquer algorithm** solves a problem of size $n$ by:

1. **Dividing** it into $a$ subproblems, each of size $n/b$,
2. **Conquering** each subproblem recursively (or solving it directly if
   small enough),
3. **Combining** the subproblem solutions into a solution for the original
   problem.
:::

## The Master Theorem

Don't worry if the recurrence below looks intimidating at first — you'll
mostly use it by pattern-matching against a table of cases, not by
re-deriving it each time.

:::note Theorem
Let $T(n) = aT(n/b) + f(n)$ where $a \ge 1$, $b > 1$, and $f(n)$ is
asymptotically positive. Let $c = \log_b a$. Then:

$$
T(n) = \begin{cases}
  \Theta(n^c) & \text{if } f(n) = O(n^{c-\epsilon}) \text{ for some } \epsilon > 0 \\
  \Theta(n^c \log n) & \text{if } f(n) = \Theta(n^c) \\
  \Theta(f(n)) & \text{if } f(n) = \Omega(n^{c+\epsilon}) \text{ for some } \epsilon > 0
\end{cases}
$$
:::

<details>
<summary>Proof</summary>

The proof proceeds by expanding the recursion tree to depth $\log_b n$ and
summing the work done at each level, then comparing the growth rate of
that sum against $f(n)$ in each of the three cases.

</details>

## Worked example

:::tip Example
Multiplying two $n$-digit numbers naively costs $\Theta(n^2)$. Karatsuba's
algorithm splits each number in half and reduces the problem to 3
recursive multiplications of half-length numbers instead of 4, giving the
recurrence $T(n) = 3T(n/2) + \Theta(n)$.

Here, $a = 3$, $b = 2$, so $c = \log_2 3 \approx 1.585$, and $f(n) =
\Theta(n) = O(n^{c - \epsilon})$ — Master Theorem case 1 applies, giving
$T(n) = \Theta(n^{\log_2 3})$, faster than the naive $\Theta(n^2)$.
:::

```text title="Karatsuba Multiplication"
karatsuba(x, y):
    if x < 10 or y < 10:
        return x * y
    split x into x1, x0  // x = x1 * 10^(n/2) + x0
    split y into y1, y0
    z2 ← karatsuba(x1, y1)
    z0 ← karatsuba(x0, y0)
    z1 ← karatsuba(x1 + x0, y1 + y0) - z2 - z0
    return z2 * 10^n + z1 * 10^(n/2) + z0
```

The three recursive calls (`z2`, `z0`, `z1`) are exactly where the "3"
in $T(n) = 3T(n/2) + \Theta(n)$ comes from — the naive approach would
need 4.

**Next Steps**: now that you've seen the pattern once, [Greedy
Algorithms](#) covers a different strategy for the same class of
problems — one that commits to a choice instead of exploring all of
them.
````
