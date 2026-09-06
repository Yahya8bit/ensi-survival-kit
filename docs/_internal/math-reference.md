---
title: KaTeX Math Reference (internal, not published)
draft: true
---

Known-good reference page for verifying KaTeX rendering after any upgrade
to `katex` / `remark-math` / `rehype-katex`, or when a contributor reports
math not rendering correctly in a doc. Compare against this page rather
than guessing.

Excluded from the build two ways: this file lives under `docs/_internal/`
(Docusaurus's default content-docs `exclude` glob drops any path with a
`_`-prefixed segment) and carries `draft: true` in its frontmatter.

## Inline math

Euler's identity: $e^{i\pi} + 1 = 0$. The complexity of binary search is
$O(\log n)$, and merge sort runs in $O(n \log n)$.

## Block equation

$$
T(n) = \begin{cases}
  O(1) & \text{if } n \le 1 \\
  2T(n/2) + O(n) & \text{otherwise}
\end{cases}
$$

## Matrix

$$
A = \begin{pmatrix}
  a_{11} & a_{12} & a_{13} \\
  a_{21} & a_{22} & a_{23} \\
  a_{31} & a_{32} & a_{33}
\end{pmatrix}
$$

## Summation / asymptotic bound

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2} = \Theta(n^2)
$$
