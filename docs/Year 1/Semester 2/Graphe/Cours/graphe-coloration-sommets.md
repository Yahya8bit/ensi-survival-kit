---
sidebar_position: 5
title: Coloration des Sommets d'un Graphe (support complémentaire)
sidebar_label: Coloration des sommets
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Coloration des sommets d'un graphe

*Support complémentaire — Cours Graphes & Applications*

## Objectifs

À l'issue de ce chapitre, on doit être capable de :
- Identifier des problèmes dont les solutions sont données via une coloration de graphes.
- Modéliser des situations réelles par des graphes.
- Colorier un graphe.
- Appliquer les algorithmes glouton et Welsh & Powell pour la coloration.
- Encadrer le nombre chromatique pour en déduire, dans certains cas, la solution optimale : minoration par l'ordre d'un sous-graphe complet, majoration par le théorème de Brooks et/ou les résultats des algorithmes.

## Activité introductive : planification des examens

5 étudiants doivent passer des examens : Étudiant 1 (Histoire, Français), Étudiant 2 (Français, Anglais), Étudiant 3 (Histoire, Anglais), Étudiant 4 (Biologie, Anglais), Étudiant 5 (Français, Biologie, Anglais). Peut-on planifier des épreuves en même temps ?

**Modélisation.** Chaque sommet correspond à une matière ; une arête relie deux sommets si un étudiant doit passer l'examen des deux matières correspondantes (ces matières ne peuvent donc pas être planifiées en même temps).

**Coloration.** Chaque couleur représente une plage horaire. Deux sommets adjacents (mêmes contraintes d'étudiant) doivent recevoir des couleurs distinctes. Sur cet exemple (graphe `H-F-B-A` avec les arêtes `HF, HA, BF, BA, FA`), 3 couleurs suffisent : $\{H,B\}$ = couleur 1, $\{F\}$ = couleur 2, $\{A\}$ = couleur 3.

<div style={{textAlign: 'center', overflowX: 'auto'}}>
<svg viewBox="0 0 340 340" width="100%" style={{maxWidth: '260px'}} xmlns="http://www.w3.org/2000/svg">
  <g fill="none">
    <line x1="102.0" y1="80.0" x2="258.0" y2="80.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="95.6" y1="95.6" x2="264.4" y2="264.4" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="95.6" y1="264.4" x2="264.4" y2="95.6" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="102.0" y1="280.0" x2="258.0" y2="280.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="280.0" y1="102.0" x2="280.0" y2="258.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
  </g>
  <g>
    <circle cx="80" cy="80" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="280" cy="80" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="80" cy="280" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="280" cy="280" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
  </g>
  <g fontSize="14" fontWeight="bold" fill="var(--ifm-font-color-base)" textAnchor="middle">
    <text x="80" y="85">H</text>
    <text x="280" y="85">F</text>
    <text x="80" y="285">B</text>
    <text x="280" y="285">A</text>
  </g>
</svg>
</div>

## Définitions

- **Colorier un graphe $G$** : colorier les sommets de telle façon que deux sommets adjacents aient toujours des couleurs différentes.
- **Nombre chromatique $\chi(G)$** : le plus petit nombre de couleurs nécessaires pour colorier le graphe.

## Propriétés

### Coloriage optimal d'un graphe complet

**Propriété.** Le nombre chromatique d'un graphe complet $K_n$, $n\ge1$, est $\chi(K_n) = n$.

### Encadrement du nombre chromatique

Soit $G=(V,E)$ un graphe non orienté, $|V|=n$ :

**Minoration.** Si $G$ contient un sous-graphe complet $K_p$ ($p\le n$), alors $p = \chi(K_p) \le \chi(G)$.

**Majoration.**
- $\chi(G) \le n$.
- Si on arrive à colorier $G$ avec une coloration valide de $p$ couleurs, alors $\chi(G) \le p$.
- **Théorème de Brooks.** Si le plus grand degré d'un sommet de $G$ est $d$, alors $\chi(G) \le d+1$.

### Graphe planaire

**Définition.** Un graphe **planaire** peut être représenté sur un plan tel que tout arc (ou arête) ne se croise pas avec un autre. *Exemple : une carte géographique peut être modélisée par un graphe planaire (sommet = région, arête = frontière).*

**Théorème de coloration (Appel & Haken, 1977).** Lorsque $G$ est planaire, $\chi(G) \le 4$ (théorème des 4 couleurs).

## Algorithme glouton

Considérons $G=(X,E)$ avec $|X|=n$.

**Pseudo-code :**
```
liste ordonnée de sommets X = [x₁,x₂,...,xₙ]
liste ordonnée de couleurs C
Pour i de 1 à n faire
    Sommet = xᵢ
    Couleur = la couleur minimale de C non utilisée par les voisins de Sommet
    Affecter à Sommet la couleur Couleur
fin pour
Afficher le nombre de couleurs utilisées.
```

**Principe.** Avance étape par étape et choisit une solution optimale localement, sans souci d'optimalité globale : à chaque sommet, on assigne la première couleur possible en fonction des voisins déjà coloriés.

**Théorème.** L'algorithme Glouton nécessite $n$ étapes ($n$ = nombre de sommets). D'après le théorème de Brooks, il utilise au plus $d+1$ couleurs ($d$ = degré du graphe).

**Exemple (illustration de la non-optimalité).** Sur un graphe à 6 sommets formant un cycle avec une diagonale, en visitant les sommets dans un certain ordre, l'algorithme glouton utilise **4 couleurs** alors qu'un $K_3$ (triangle) impose seulement $\chi(G)\ge3$ : on ne peut pas conclure directement à l'optimalité. En changeant simplement l'ordre de visite des deux derniers sommets, le même algorithme trouve une coloration à **3 couleurs seulement** — qui, elle, est optimale ($\chi(G)=3$, car il existe un $K_3$).

**Conclusion : l'algorithme Glouton ne donne pas toujours une coloration optimale — le résultat dépend fortement de l'ordre de parcours des sommets.**

<div style={{textAlign: 'center', overflowX: 'auto'}}>
<svg viewBox="0 0 700 590" width="100%" style={{maxWidth: '380px'}} xmlns="http://www.w3.org/2000/svg">
  <g fill="none">
    <line x1="479.0" y1="126.7" x2="301.0" y2="183.3" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="512.4" y1="138.2" x2="637.6" y2="321.8" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="265.0" y1="206.1" x2="155.0" y2="323.9" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="280.8" y1="212.0" x2="289.2" y2="448.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="156.6" y1="354.4" x2="273.4" y2="455.6" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="310.7" y1="462.5" x2="629.3" y2="347.5" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="310.8" y1="477.3" x2="469.2" y2="532.7" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="636.3" y1="357.2" x2="503.7" y2="522.8" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
  </g>
  <g>
    <circle cx="500" cy="120" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="280" cy="190" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="140" cy="340" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="290" cy="470" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="650" cy="340" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="490" cy="540" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
  </g>
  <g fontSize="14" fill="var(--ifm-font-color-base)" textAnchor="middle">
    <text x="500" y="125">1</text>
    <text x="280" y="195">2</text>
    <text x="140" y="345">3</text>
    <text x="290" y="475">4</text>
    <text x="650" y="345">5</text>
    <text x="490" y="545">6</text>
  </g>
</svg>
</div>

*(Sommets non numérotés dans la source — numérotation 1-6 ajoutée ici uniquement pour référence visuelle ; le texte ci-dessus décrit le résultat en termes de nombre de couleurs, pas d'affectation sommet-par-sommet, donc aucun ordre de parcours ni coloration spécifique n'est représenté sur ce schéma.)*

## Algorithme de Welsh & Powell

Soit $G=(X,A)$, $X=[x_1,\ldots,x_n]$, $n=|X|$.

**Procédure :**
1. **Étape 1 :** ordonner les sommets par ordre **décroissant des degrés**, obtenant $v_1,\ldots,v_n$ avec $\deg(v_1)\ge\deg(v_2)\ge\ldots\ge\deg(v_n)$.
2. **Étape 2 :** affecter une couleur $C_1$ au sommet $v_1$, puis attribuer la même couleur au reste des sommets non coloriés et non adjacents à un sommet déjà de cette couleur, de façon cumulative et suivant les degrés décroissants.
3. **Étape 3 :** s'il reste des sommets non coloriés, attribuer une nouvelle couleur au premier sommet non colorié de la liste résiduelle et répéter la procédure.

**Condition d'arrêt :** tous les sommets sont coloriés.

**Pseudo-code :**
```
L : liste ordonnée des sommets de X, ordonnés par ordre décroissant des degrés.
couleur ← 0
Tant que L ≠ ∅ faire
    couleur ← couleur + 1
    s ← L[1]   (premier sommet de L)
    couleur(s) ← couleur
    S_couleur = [s]
    Pour tout v ∈ L faire
        Si v est non-adjacent à S_couleur faire
            couleur(v) = couleur
            S_couleur = S_couleur ∪ v
        fin Si
    fin Pour
    L = L / S_couleur   (retirer les sommets déjà coloriés de L)
fin Tant que
Afficher le nombre de couleurs utilisées.
```

**Exemple.** Graphe à 6 sommets `A,B,C,D,E,F` (chacun de degré 4, sauf 2 de degré 3). Ordre décroissant : `A,B,E,F,C,D`. Itération 1 : $A$ et $C$ reçoivent $C_1$ (non adjacents). Itération 2 : $B$ et $D$ reçoivent $C_2$. Itération 3 : $E$ reçoit $C_3$. Itération 4 : $F$ reçoit $C_4$. **4 couleurs suffisent, donc $\chi(G) \le 4$.**

<div style={{textAlign: 'center', overflowX: 'auto'}}>
<svg viewBox="0 0 700 520" width="100%" style={{maxWidth: '440px'}} xmlns="http://www.w3.org/2000/svg">
  <g fill="none">
    <line x1="94.0" y1="243.0" x2="206.0" y2="107.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="94.0" y1="277.0" x2="206.0" y2="413.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="100.2" y1="268.6" x2="459.8" y2="421.4" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="102.0" y1="260.0" x2="598.0" y2="260.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="242.0" y1="90.0" x2="458.0" y2="90.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="233.4" y1="107.5" x2="466.6" y2="412.5" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="240.2" y1="98.6" x2="599.8" y2="251.4" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="466.6" y1="107.5" x2="233.4" y2="412.5" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="494.0" y1="107.0" x2="606.0" y2="243.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="242.0" y1="430.0" x2="458.0" y2="430.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="494.0" y1="413.0" x2="606.0" y2="277.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
  </g>
  <g>
    <circle cx="220" cy="90" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="480" cy="90" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="80" cy="260" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="620" cy="260" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="220" cy="430" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="480" cy="430" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
  </g>
  <g fontSize="14" fontWeight="bold" fill="var(--ifm-font-color-base)" textAnchor="middle">
    <text x="220" y="95">B</text>
    <text x="480" y="95">C</text>
    <text x="80" y="265">A</text>
    <text x="620" y="265">F</text>
    <text x="220" y="435">D</text>
    <text x="480" y="435">E</text>
  </g>
</svg>
</div>

## Non-optimalité des algorithmes

Les algorithmes Welsh & Powell et Glouton sont efficaces mais **ne sont pas garantis optimaux** dans tous les cas.

**Contre-exemple de Welsh & Powell.** Sur un graphe en forme d'« échelle » à 8 sommets `A,B,C,D,E,F,G,H` (arêtes `AB, BC, CD, DE, BG, GH, HE, EF` — c'est-à-dire un cycle pair `B-C-D-E-H-G-B` avec deux feuilles pendantes $A$ et $F$, donc un graphe biparti), Welsh & Powell donne une coloration à **3 couleurs**, alors que **2 couleurs suffisent** (le graphe étant biparti, sans cycle impair, $\chi(G)=2$). On conclut que la coloration proposée par Welsh & Powell n'est pas toujours optimale : dans certains cas, un nombre plus restreint de couleurs peut être utilisé.

<!-- TODO: fidelity note — the edge list in this paragraph originally read "AB, BC, CD, DE, EF, BG, GH, HD" (an odd 5-cycle B-C-D-H-G-B, which would contradict the χ(G)=2 claim on the same line). Cross-checked against the source PDF diagram (p.46-47) and corrected to the actual topology shown there: H connects to E, not D. This is a genuine transcription-fidelity correction, not a stylistic edit. -->

<div style={{textAlign: 'center', overflowX: 'auto'}}>
<svg viewBox="0 0 640 400" width="100%" style={{maxWidth: '440px'}} xmlns="http://www.w3.org/2000/svg">
  <g fill="none">
    <line x1="82.0" y1="220.0" x2="198.0" y2="220.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="220.0" y1="198.0" x2="220.0" y2="102.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="242.0" y1="80.0" x2="398.0" y2="80.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="420.0" y1="102.0" x2="420.0" y2="198.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="220.0" y1="242.0" x2="220.0" y2="338.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="242.0" y1="360.0" x2="398.0" y2="360.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="420.0" y1="338.0" x2="420.0" y2="242.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <line x1="442.0" y1="220.0" x2="558.0" y2="220.0" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
  </g>
  <g>
    <circle cx="220" cy="80" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="420" cy="80" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="60" cy="220" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="220" cy="220" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="420" cy="220" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="580" cy="220" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="220" cy="360" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
    <circle cx="420" cy="360" r="22" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-600)" strokeWidth="1.5" />
  </g>
  <g fontSize="14" fontWeight="bold" fill="var(--ifm-font-color-base)" textAnchor="middle">
    <text x="220" y="85">C</text>
    <text x="420" y="85">D</text>
    <text x="60" y="225">A</text>
    <text x="220" y="225">B</text>
    <text x="420" y="225">E</text>
    <text x="580" y="225">F</text>
    <text x="220" y="365">G</text>
    <text x="420" y="365">H</text>
  </g>
</svg>
</div>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/graphe-coloration-sommets.pdf" />

</TabItem>
</Tabs>
