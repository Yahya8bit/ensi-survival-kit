---
sidebar_position: 12
title: "Apprentissage par Renforcement"
sidebar_label: Apprentissage par Renforcement
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Apprentissage par renforcement

<!-- TODO: unclear in source, verify against original PDF (slide deck text extraction reorders some bullet fragments, and the reward-matrix / Q-matrix illustrations in the "A Robot Problem" and "S'exercer" sections are images not fully extracted as text) -->

## Qu'est-ce que l'apprentissage par renforcement ?

L'apprentissage par renforcement est une méthode qui permet de trouver, par un processus d'essais et d'erreurs, la politique de contrôle d'un agent en cherchant à maximiser un signal de renforcement (récompense) provenant de l'environnement.

L'apprentissage par renforcement est un type d'apprentissage automatique où un agent apprend à prendre des décisions en interagissant avec son environnement. L'objectif de l'agent est de maximiser une récompense cumulative au fil du temps.

### Description d'une situation

Un agent interagit avec son environnement. À chaque instant $t$, il est dans un état $s_t$ et peut émettre une action $a_t$. Suite à cette action, il reçoit une conséquence de son action que l'on nomme un retour $r_{t+1}$, et perçoit un nouvel état $s_{t+1}$.

## Processus Décisionnel de Markov (PDM)

Un problème est dit d'apprentissage par renforcement s'il peut être modélisé par un Processus de Décision Markovien (PDM).

Un Processus Décisionnel de Markov est formellement décrit par un quadruplet $\langle S, A, T, R \rangle$, où :

- $S = \{s_0, ..., s_{|S|}\}$ est l'ensemble fini discret des états possibles du système à contrôler.
- $A = \{a_0, ..., a_{|A|}\}$ est l'ensemble fini discret des actions que l'on peut effectuer.
- $T : S \times A \times S \to [0,1]$ est la fonction de transition du système.
- $R : S \times A \times S \to \mathbb{R}$ est la fonction de récompense, elle indique la valeur réelle obtenue lorsque l'on effectue l'action $a$ dans l'état $s$ pour arriver dans l'état $s'$.

Exemple de PDM probabiliste — mais il peut être également déterministe.

<!-- TODO: unclear in source, verify against original PDF (the PDM diagram example is an image, not extracted as text) -->

### Notion de politique

Le comportement de l'agent est défini par une politique. La politique spécifie la manière dont l'agent choisit ses actions en réponse à son environnement.

Formellement, une politique $\pi$ est une fonction qui associe à chaque état $s$ une distribution de probabilité sur l'ensemble des actions $A$ disponibles.

- **Politique déterministe** : $\pi : S \to A$ spécifie directement l'action choisie pour chaque état.
- **Politique stochastique** : $\pi : S \times A \to [0,1]$ spécifie la probabilité de choisir chaque action pour chaque état.

L'apprentissage par renforcement vise à trouver la politique optimale, celle qui maximise la récompense cumulative attendue au fil du temps.

### La fonction de valeur

L'apprentissage par renforcement s'appuie sur une interaction entre l'apprenant et l'environnement, sous la forme de l'exécution à chaque instant $t$ d'une action $a_t$ depuis l'état courant $s_t$, qui mène au nouvel état $s_{t+1}$ et qui fournit la récompense $r_t$. Sur la base de cette interaction, une politique est améliorée progressivement.

La plupart des algorithmes d'apprentissage par renforcement ne travaillent pas directement sur la politique, mais passent par l'évaluation itérative d'une fonction de valeur.

### Le dilemme exploitation/exploration

Pour régler la politique de façon à maximiser la récompense sur le long terme, la phase d'apprentissage se trouve confrontée à la nécessité de trouver un compromis entre l'exploration et l'exploitation de l'apprentissage déjà réalisé :

- Faire confiance à l'estimation courante de la fonction de valeur pour choisir la meilleure action à effectuer dans l'état courant (**exploitation**), OU
- Choisir une action a priori sous-optimale pour observer ses conséquences (**exploration**).

## Algorithme de Q-learning

L'agent évolue dans un environnement qu'il ne connaît que partiellement (il ne connaît pas toujours la matrice de transition $T$ et la fonction de récompense $R$). L'agent va expérimenter : apprendre par essai/erreur l'utilité d'effectuer chacune de ses actions pour chaque situation dans laquelle il se trouve. Il doit apprendre une politique optimale en maximisant ses récompenses.

### Matrice Q

| État \ Action | Action1 | Action2 | … | Action n |
|---|---|---|---|---|
| État1 | | | | |
| État2 | | | | |
| … | | | | |
| État n | | | | |

Le Q-Learning utilise une fonction de valeur à apprendre $Q(s, a)$. Cette fonction offre un critère de choix d'une action $a$ dans un état $s$ donné :

- $Q(s, a) = 0$ : action possible
- $Q(s, a) < 0$ : action impossible
- $Q(s, a) > 0$ : action prometteuse

### Entrées de l'algorithme

- $M = (S, A, T, R)$ : un PDM
- $\alpha_t$ : taux d'apprentissage, entre 0 et 1 — contrôle la rapidité avec laquelle l'agent met à jour ses estimations en fonction des nouvelles informations.
- $\gamma$ : facteur d'actualisation/d'escompte, entre 0 et 1 — représente la préférence de l'agent pour les récompenses immédiates par rapport aux récompenses futures.
- PEE : une politique d'Exploration/Exploitation.

**Sortie** : $Q \approx Q^*$

La fonction récompense et les transitions peuvent être connues à l'avance ou perçues au fur et à mesure.

Formule de mise à jour :

$$Q(s, a) \leftarrow (1 - \alpha_t) \times Q(s, a) + \alpha_t \times \left[r + \gamma \times \max_{a'} Q(s', a')\right]$$

### Exemples de politique d'exploration/exploitation

- **Gloutonne** : elle consiste à choisir toujours l'action estimée comme la meilleure, soit : $a_{\text{gloutonne}} = \arg\max_a Q(s, a)$
- **$\varepsilon$-Gloutonne** : elle consiste à choisir l'action gloutonne avec une probabilité $\varepsilon$ et à choisir une action au hasard avec une probabilité $1 - \varepsilon$, soit :

$$a_{\varepsilon\text{-gloutonne}} = \begin{cases} \arg\max_a Q(s, a) & \text{avec probabilité } \varepsilon \\ \text{action prise au hasard dans } A(s) & \text{avec probabilité } 1 - \varepsilon \end{cases}$$

### Algorithme (pseudo-code)

```
1. Début :
2. Initialiser Q0(s,a) à 0 pour tout s ∈ S et a ∈ A
3. Pour chaque épisode
4.     Initialiser s {l'état où l'on commence}
5.     Tant que Objectif non atteint (s non terminal)
6.         a ← PEE(s, Qt, S, A)  // Choisir une action suivant la politique
7.         Effectuer l'action a, recevoir le renforcement r et le nouvel état s'
8.         Q(s, a) ← (1- αt) * Q(s, a) + αt * [r + γ * maxa'Q(s', a')]
9.         s ← s'  // passer à l'état suivant
10.    Fin Tantque
11. Fin pour
12. Retourner Q ≈ Q*
13. Fin
```

### Après apprentissage

La politique optimale peut être extraite directement à partir de la matrice Q. Cette utilisation de la matrice Q permet à l'agent de prendre des décisions informées et de maximiser les récompenses sans nécessiter d'interactions supplémentaires avec l'environnement pour l'apprentissage actif.

Une fois que la matrice Q a été apprise, elle peut être utilisée de manière autonome pour guider le comportement de l'agent dans son environnement.

## A Robot Problem

*(exemple illustratif du cours, en anglais dans le support)*

Room 5 is "outdoors" and so a legal action can be to go from 5 to 5. Instead of distance, we will rate sequences based on utility of getting to a particular room (e.g., if goal is Room 5, getting to Room 1 is better than getting to room 0). Robot learns by getting a reward when it reaches the goal room, say Room 5.

**Idea**: learn a Policy for Optimal Path for a Goal Room.

- State = room that robot is in.
- Policy consists of states $s$, actions $a$ (discrete action = going from one room to another room).
- Room 5 is "outdoors" and so a legal action can be to go from 5 to 5.
- States $s$, actions $a$ as a graph.

**Problem: credit assignment.** We usually only know the utility of being in the goal state, not the utility for any intermediate steps. We can reward the robot for its policy (a.k.a. sequence of steps) whenever it reaches the goal state. But we'd like to rate the individual actions (a.k.a. steps) so we can find a better policy. Therefore we would like to distribute the reward "backwards" to the actions.

### The Formula for Q-Learning

$$Q(s, a) = R(s,a) + \gamma \arg\max(Q(s',a'))$$

- $Q(s,a)$: estimated utility of being at state $s$ and taking action $a$
- $R(s)$: reward for being in state $s$
- $\gamma$: discount function
- $Q(s',a')$: possible next state, action pairs

<!-- TODO: unclear in source, verify against original PDF — the initial rewards-matrix walkthrough ("Start With A Rewards Matrix, γ=0.8", the room-graph diagram, and the step-by-step episode traces such as "Q(1,5) = R(1,5) + 0.8 argmax(...)") are heavily image-based in the source slides; the worked numeric trace is transcribed below as best-effort from the extracted text order -->

With $\alpha = 1$ (exploration policy privileged), initial state = 2, goal = 5:

**Step 1 — Rewards Matrix, $\gamma = 0.8$.** Let -1 represent actions that can't be taken; let 0 represent the initial unknown discounting of the reward.

**Step 2 — Initialize the Q Matrix** (all zeros).

**Step 3 — Episode.** Robot randomly starts at State 1. Say the robot has a choice of two actions: go to state 3, go to state 5. It randomly chooses state 5.

$$Q(1,5) = R(1,5) + 0.8 \arg\max(Q(5,1), Q(5,4), Q(5,5)) = 100 + 0.8 \arg\max(0,0,0) = 100$$

End of episode because choosing (1,5) reaches the goal room, 1 → 5.

**Episode (loop).** Robot randomly starts at State 3. Choices: go to state 1, 2, or 4. It randomly chooses state 1.

$$Q(3,1) = R(3,1) + 0.8 \arg\max(Q(1,3), Q(1,5)) = 0 + 0.8 \arg\max(0, 100) = 80$$

**The Q-Learning algorithm** goes as follows:

1. Set the gamma parameter, and environment rewards in matrix R.
2. Initialize matrix Q to zero.
3. For each episode:
   - Select a random initial state.
   - Do While the goal state hasn't been reached:
     - Select one among all possible actions for the current state.
     - Using this possible action, consider going to the next state.
     - Get maximum Q value for this next state based on all possible actions.
     - Compute: `Q(state, action) = R(state, action) + Gamma * Max[Q(next state, all actions)]`
     - Set the next state as the current state.
   - End Do
   - End For

**Inner Do While Loop example.** Robot is at State 1. Choices: go to state 3 or 5. It randomly chooses state 5.

$$Q(1,5) = R(1,5) + 0.8 \arg\max(Q(5,1), Q(5,4), Q(5,5)) = 100 + 0.8 \arg\max(0,0,0) = 100$$

End of episode because 3 → 1 → 5, and 5 is the goal state.

**What if we had randomly chosen state 3 instead?**

$$Q(1,3) = R(1,3) + 0.8 \arg\max(Q(3,1), Q(3,2), Q(3,4)) = 0 + 0.8 \arg\max(80, 0, 0) = 64$$

Robot is then at State 3, with choices: go to state 1, 2, or 4. It randomly chooses state 4.

$$Q(3,4) = R(3,4) + 0.8 \arg\max(Q(s',a'))$$

Robot is then at State 4, with choices: go to state 0, 3, or 5. It randomly chooses state 5.

$$Q(4,5) = R(4,5) + 0.8 \arg\max(Q(s',a'))$$

## S'exercer

$$S = \{1, 2, 3, 4, 5, 6, 7\} \qquad A = \{G, D, H, B\} \qquad \text{Initial} = 1 \qquad \text{Final} = 7$$

$$\alpha = 0{,}3 \qquad \gamma = 0{,}5$$

<!-- TODO: unclear in source, verify against original PDF (the 7-room grid diagram for this exercise is an image, not extracted as text) -->

1. Proposer une matrice de récompense.
2. Définir la PEE 0,5-gloutonne.
3. Réaliser quelques itérations de l'algorithme Q-learning.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/ia-apprentissage-par-renforcement.pdf" />

</TabItem>
</Tabs>
