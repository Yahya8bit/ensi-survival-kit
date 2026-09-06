---
sidebar_position: 14
title: "Examen CPOO — 06/01/2009"
sidebar_label: Examen CPOO 2008/2009 (Corrigé)
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Examen 1er semestre (Session Principale) — Conception et Programmation Orientées Objets (2008/2009)

*Université de La Manouba — École Nationale des Sciences de l'Informatique — A.U. : 2008-2009 — Niveau : II2 — Date : mardi 6 janvier 2009 — Durée : 2h — Documents non autorisés — Nombre de pages : Sujet (2 pages) + 3 Formulaires — Enseignants : Y. Jamoussi, I. Ben Hamouda, G. Ziada, S. Mtibaa*

*Matière de l'époque : « Conception et Programmation Orientées Objets » (CPOO) — le prédécesseur de l'actuel module ACOO, avec en plus un volet codage C++. Archivé ici avec les DS&EX d'ACOO faute de dossier dédié pour cette ancienne matière.*

*NB : Il est fortement conseillé de lire toutes les questions avant de commencer…*

## Problème

Le but de ce problème est de suivre l'évolution d'un jeu se jouant moyennant les règles du jeu d'échecs citées dans ce qui suit. On rappelle que le jeu d'échecs se joue à deux joueurs (jouant à tour de rôle) qui font évoluer des pièces, respectivement blanches et noires, sur un échiquier de 8x8 cases. Les pièces pour chaque joueur pouvant être un mélange de ces catégories : pions, roi, dame, cavaliers, fous, tours. Les huit lignes « verticales » sont appelées colonnes. Les huit lignes « horizontales » sont appelées rangées. Les lignes obliques à 45° sont appelées diagonales. Les colonnes peuvent être repérées par des lettres minuscules : de 'a' à 'h', et les rangées par des chiffres : de 1 à 8. Chaque case est ainsi repérée par un couple colonne-rangée, par exemple : e5. Une case contient au maximum une pièce. Chaque pièce est positionnée sur une case ou hors de l'échiquier si elle est capturée. Toutefois, le jeu peut démarrer par une disposition quelconque de pièces comportant au moins un roi pour chaque joueur.

Lors de son tour, un joueur effectue un coup. Ce coup porte sur une de ses pièces sur l'échiquier et modifie sa position vers une nouvelle position. Un coup peut entraîner la capture d'une pièce de l'adversaire. La pièce capturée finit ainsi à l'extérieur de l'échiquier.

Quand un coup mène à une position qui menace le roi adverse de prise au prochain coup, ce roi est en échec. Le jeu consiste à faire une séquence de coups alternée entre les deux joueurs jusqu'à l'échec et mat. Le mat est une situation dans laquelle le roi n'a pas d'échappatoire de l'échec.

Le déplacement de chaque pièce est comme suit :

- Le pion se déplace droit devant lui d'une case à chaque coup. La première fois qu'il se déplace, il peut avancer de deux cases. Il convient de mentionner que les pions blancs (resp. noirs) évoluent de manière croissante (resp. décroissante) sur les rangées.
- Le roi se déplace d'une case dans n'importe quelle direction. Il n'a toutefois pas le droit de se mettre en échec.
- La dame, la tour et le fou sont des pièces à longue portée, c'est-à-dire qu'elles peuvent se déplacer d'autant de cases qu'elles le souhaitent, en ligne droite, en n'étant limitées que par l'obstacle infranchissable que constitue toute autre pièce (adverse ou non).
  - La tour se déplace en suivant colonnes ou rangées ;
  - Le fou se déplace en suivant les diagonales ;
  - La dame combine les deux (la tour et le fou).
- Le cavalier est une pièce sauteuse (si sa case d'arrivée est jouable, il peut y accéder quel que soit l'encombrement environnant). Le cavalier se déplace sur une des cases se trouvant sur la colonne voisine et la rangée après la voisine ou sur la rangée voisine et la colonne après la voisine (ce qui lui donne 8 possibilités de mouvement dans le meilleur des cas).

Par ailleurs, toutes les pièces, sauf les pions, capturent comme elles se déplacent : l'obstacle sur le trajet constitué par une pièce adverse est accessible avec capture de cette pièce adverse. Les pions ont un mode de prise particulier : ils capturent en avançant d'une case en diagonale.

Comme l'objectif fonctionnel est de représenter une situation de jeu pour les 2 joueurs ainsi que son évolution au cours du temps, un développeur a proposé le diagramme de classes UML incomplet suivant :

<!-- TODO: unclear in source, verify against original PDF page 2 — le diagramme de classes UML fourni par l'énoncé (schéma) n'est pas repris dans le texte extrait. -->

**Travail à faire**

On se propose de comprendre, compléter, améliorer la modélisation UML proposée par le développeur et de coder en partie le jeu avec le langage C++. Pour cela, il s'agit de répondre directement sur les 3 formulaires qui vous ont été distribués.

### Partie 1 : Modélisation UML

#### Question 1.1 (3 pt)

Le diagramme de classes proposé par le développeur est incomplet. Parmi les manques nous signalons : (1) le manque de cardinalités de l'association reliant la classe 'Piece' à la classe 'Case' — (2) le manque d'associations entre la classe 'Coup' et les autres classes du diagramme — (3) l'absence de liens unidirectionnels.

**a)** Complétez ces trois manques sur cette portion de diagramme de classes.

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 1 (formulaire 1/10) — le schéma corrigé n'est pas repris dans le texte extrait. -->

</details>

**b)** Indiquez, en commentant éventuellement, l'ordre de navigation nécessaire de ou des associations vous permettant de :

<details>
<summary>Correction</summary>

Savoir si une case est jouable ou non pour une pièce donnée : `Pièce → Case → Échiquier → (Case)*`

Savoir si une pièce est en risque d'attaque par une pièce de l'adversaire : `Pièce → Case → Échiquier → (Case)* → Pièce`

</details>

#### Question 1.2 (1 pt)

Élaborez le diagramme d'objets conformément au diagramme de classes proposé par le développeur reflétant la disposition initiale du jeu d'échecs.

*(Concernant les objets de type 'Case' : pour des raisons de clarté, on vous demande de ne représenter que les cases occupées.)*

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 2 (formulaire 2/10) — le diagramme d'objets attendu (schéma) n'est pas repris dans le texte extrait. -->

</details>

#### Question 1.3 (2 pt)

Élaborez le diagramme d'objets conformément au diagramme de classes proposé par le développeur et aux modifications que vous avez apportées dans la question (1.1-a) reflétant une évolution du jeu d'échecs de la question précédente (Q1.2) de deux coups.

*(Concernant les objets de type 'Case' : pour des raisons de clarté, on vous demande de ne représenter que les cases occupées dans la disposition initiale du jeu d'échecs (Q1.2).)*

<details>
<summary>Correction</summary>

<!-- TODO: unclear in source, verify against original PDF page 3 (formulaire 3/10) — le diagramme d'objets attendu (schéma) n'est pas repris dans le texte extrait. -->

</details>

#### Question 1.4 (1 pt)

Pour comprendre les règles de gestion gouvernant l'évolution des liens entre les objets, on se propose de décorer les associations par les contraintes `{ordered}`, `{addOnly}`, `{frozen}`, `{notUnique}`. Donnez pour chacune de ces associations les contraintes appropriées.

<details>
<summary>Correction</summary>

- `JeuEchecs`-`Piece` : `{addOnly}` — catégoriquement non `{notUnique}`.
- `JeuEchecs`-`Coup` : `{ordered}` — catégoriquement non `{frozen}`.
- `Echiquier`-`Case` : `{frozen}` — catégoriquement non `{notUnique}`, `{addOnly}`.

</details>

### Partie 2 : Codage C++

#### Question 2.1 (1 pt)

L'implémentation des associations avec cardinalité multiple nécessite l'utilisation d'une structure qui implémente une collection (non définie dans le modèle UML proposé par le développeur). Sachant qu'on souhaite utiliser des tableaux statiques C++ et/ou les collections STL (sans exagération), proposez les différentes structures que vous comptez utiliser pour les différentes associations multiples ci-dessous indiquées. Commentez brièvement vos choix.

<details>
<summary>Correction</summary>

- `JeuEchecs`-`Piece` : collection quelconque (séquentielle ou non) → exemple : `Set`, `vector`, …
- `JeuEchecs`-`Coup` : collection ordonnée → exemple : `vector`, `List`.
- `Echiquier`-`Case` : collection indexée → tableau bidimensionnel de `Case` (la taille est connue à l'avance) — pourquoi pas aussi une `map` !

</details>

#### Question 2.2 (2 pts)

Une pièce peut se déplacer de sa case vers une autre case en capturant éventuellement une autre pièce. À cet effet, on se propose de définir deux méthodes virtuelles pures 'peutSeDeplacer' et 'peutCapturer' ayant comme argument une case cible et retournant une valeur booléenne indiquant la validité de l'action. Donnez le code C++ de la classe 'Piece' conformément à vos réponses à la question 1.1.a).

<details>
<summary>Correction</summary>

```cpp
classe Piece {
public:
    // Constructeur à compléter : interface + implémentation
    // Symbole = {Pion, Roi, Dame, Fou, Tour, Cavalier} ; Couleur = {Blanc, Noir}
    Piece(Symbole symbole, Couleur couleur, Case * caseInitiale = NULL)
        : symbole(symbole), couleur(couleur) {
        dans = caseInitiale;
    }

    virtual bool peutSeDeplacer(Case *) = 0;
    virtual bool peutCapturer(Case * c) { return peutSeDeplacer(c); }

    // les méthodes : interface + implémentation
    setCase(Case * c) { dans = c; }
    Case * getCase() const { return dans; }
    Couleur getCouleur() const { return couleur; }
    Symbole getSymbole() const { return symbole; }

private:
    // les attributs
    Symbole symbole;
    Couleur couleur;
    Case * dans;
};
```

</details>

#### Question 2.3 (2 pts)

Dans le diagramme de classes proposé par le développeur, la classe 'Case' ne comporte pas de coordonnées (colonne et rangée).

**a)** Discuter brièvement l'avantage et l'inconvénient de la mémorisation ou non mémorisation des coordonnées dans la classe 'Case'.

<details>
<summary>Correction</summary>

**Mémoriser les coordonnées de la case :**

- Avantage : une pièce peut connaître sa position en consultant la case où elle se trouve.
- Inconvénient : redondance des coordonnées car l'échiquier doit indexer les cases par leur coordonnée.

**Non mémorisation des coordonnées de la case :**

- Avantage(s) : le code de case est léger — pas de redondance.
- Inconvénient : il faut passer par la classe Échiquier pour connaître les coordonnées d'une case (parcourir la collection des cases pour les retrouver).

</details>

**b)** Donnez le code C++ de l'interface de la classe 'Case' conformément à vos choix (surtout les réponses aux questions 1.1.a et 2.3.a).

<details>
<summary>Correction</summary>

```cpp
class Case {
public:
    // méthodes obligatoires
    Case(Echiquier * e);
    setPiece(Piece * p);
    Piece * getPiece();

    // méthodes dépendant des réponses 1.1a) et 2.3a)
    Echiquier * getEchiquier();
    // S'il y a les coordonnées de la case => ajouter les méthodes appropriées

private:
    // les attributs
    Piece * contient;
    Echiquier * ech; // pour permettre la navigation de 1.1b)
    // il est possible de faire la déclaration en static
    // => le constructeur est sans arguments
    // au choix => les coordonnées de la Case
};
```

</details>

#### Question 2.4 (1,5 pts)

Donnez le code C++ de l'interface de la classe 'Coup' conformément à vos réponses à la question 1.1.a) sachant qu'il peut s'agir d'un déplacement avec ou sans prise d'une pièce adverse.

<details>
<summary>Correction</summary>

```cpp
class Coup {
public:
    // Constructeur et méthodes à compléter : interface
    Coup(Case * de, Case * vers, Piece * pb, Piece * pc);
    // + accesseurs aux attributs

private:
    // les attributs
    Case * de;
    Case * vers;
    Piece * piece_bougee;
    Piece * piece_capturee;
};
```

</details>

#### Question 2.5 (1,5 pts)

Les méthodes 'estOccupe' et 'placer' assurent respectivement le test d'occupation et le placement d'une pièce sur l'échiquier. Donnez le code C++ de l'interface de la classe 'Echiquier' conformément à vos réponses à la question 1.1.a). Donnez uniquement le corps du constructeur.

<details>
<summary>Correction</summary>

```cpp
class Echiquier {
public:
    // Constructeur à compléter : interface + implémentation
    Echiquier() {
        for (int i = 0; i < 8; i++)
            for (int j = 0; j < 8; j++)
                tab[i][j] = new Case(this);
        // à revoir si la déclaration est : Case tab[8][8]
    }

    // les interfaces des méthodes + un commentaire par interface
    Case * getCase(char lig, char col);
    bool estOccupe(Case *);
    void initialiser();
    char getLigne(Case *);
    char getColonne(Case *);
    ~Echiquier();

private:
    // les attributs
    Case * tab[8][8];
    // un attribut jeu s'il y a navigation de Echiquier à JeuEchecs
};
```

</details>

#### Question 2.6 (1 pt)

En utilisant la syntaxe C++, donnez les attributs de la classe 'JeuEchecs'. Indiquez comment vous distinguez les rois des deux joueurs.

<details>
<summary>Correction</summary>

```cpp
class JeuEchecs {
    // ...
private:
    // les attributs
    Echiquier ech;
    Vector<Piece *> pieces;
    Vector<Coup *> coups;
    Couleur TourDeQui;
    // on peut distinguer les rois par une position fixe dans le vecteur
    // ou en ajoutant 2 pointeurs qui pointent sur les 2 rois
};
```

</details>

#### Question 2.7 (2 pts)

La méthode 'jouer' de la classe 'JeuEchecs' donne au joueur qui a son tour la main pour jouer. Elle lui demande une ancienne et une nouvelle position. Si le coup est valide, il sera ajouté à la séquence de coups et la pièce sera effectivement déplacée avec éventuellement la capture nécessaire. La méthode 'jouer' retourne un booléen indiquant si le coup est valide ou non.

<details>
<summary>Correction</summary>

```cpp
bool JeuEchecs::jouer() {
    // soit (l1,c1) & (l2,c2) ancienne position & nouvelle position
    cin >> l1 >> c1 >> l2 >> c2;
    Case * source = getCase(l1, c1);
    Case * cible = getCase(l2, c2);

    Piece * piece_bougee = source->getPiece();

    if ((piece_bougee == NULL) || (piece_bougee->getCouleur() != TourDeQui))
        return false;

    Piece * piece_Capturee = cible->getPiece();

    if (piece_bougee->peutSeDeplacer(cible) || piece_bougee->peutCapturer(cible)) {
        coups.push_back(new Coup(getCase(l1, c1), getCase(l2, c2),
                                  getCase(l1, c1)->getPiece(), getCase(l2, c2)->getPiece()));

        source->setPiece(NULL);
        cible->setPiece(piece_bougee);
        piece_bougee->setCase(cible);

        if (piece_Capturee != NULL)
            piece_capturee->setCase(NULL);

        return true;
    } else {
        return false;
    }
}
```

</details>

#### Question 2.8 (2 pts)

On se propose d'écrire la classe 'Pion' conformément à vos réponses aux questions précédentes.

**a)** Avez-vous besoin d'attributs spécifiques ? Justifiez votre réponse.

<details>
<summary>Correction</summary>

Oui, car le déplacement d'un pion pour la 1ère fois diffère des autres → il faut mémoriser si le pion a déjà fait un déplacement.

</details>

**b)** Donnez le corps du constructeur, le corps de la méthode 'deplacer'.

<details>
<summary>Correction</summary>

```cpp
// Constructeur à compléter : interface + implémentation
Pion::Pion(Couleur couleur, Case * c) : Piece(couleur, 'Pion', c) {
    aFaitDeplacement = false;
}

// à compléter l'implémentation
bool Pion::peutSeDeplacer(Case * cible) {
    Case * source = getCase();
    ech = source->getEchiquier();
    char l1 = ech->getLigne(source);
    char c1 = ech->getColonne(source);

    char l2 = ech->getLigne(cible);
    char c2 = ech->getColonne(cible);

    if (cible->getPiece() != NULL)
        return false;

    if (c1 != c2)
        return false;

    if (aFaitDeplacement)
        if (couleur == blanc)
            return ((l2 - l1) == 1);
        else
            return (l1 - l2) == 1;
    else if (couleur == blanc)
        return (((l2 - l1) == 1) || ((l2 - l1) == 2));
    else
        return ((l1 - l2) == 1) || ((l1 - l2) == 2);
}
```

<!-- TODO: unclear in source, verify against original PDF page 9 (formulaire 9/10) — la ligne "if (aFaitDeplacement) if (couleur==blanc) return ((l2-l1)==1); else return (l1-l2)==1;" a une structure conditionnelle ambiguë dans le document source ; reproduite ici telle quelle. -->

</details>

#### Question 2.9 (1 pt)

On se propose de réutiliser les classes 'Tour' et 'Fou' pour l'écriture de la classe 'Dame'. Expliquez comment ? Donner le corps de la méthode 'peutSeDeplacer' de la classe 'Dame'.

<details>
<summary>Correction</summary>

Il s'agit de faire un héritage multiple de `Tour` et `Fou`.

```cpp
bool Dame::peutSeDeplacer(Case * c) {
    return (Tour::peutSeDeplacer(c) || Fou::peutSeDeplacer(c));
}
```

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/acoo-cpoo-examen-2008-2009.pdf" />

</TabItem>
</Tabs>
