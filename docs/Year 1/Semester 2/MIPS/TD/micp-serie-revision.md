---
sidebar_position: 2
title: Série de Révision - Architecture et Microprocesseur
sidebar_label: Série de Révision
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Série de Révision — Architecture et microprocesseur

## Exercice 1

Écrire un programme qui vous permet de :

Saisir par clavier trois valeurs (`A`, `B` et `C`) comprises entre `0` et `9` obligatoirement.

**Fonctions de l'interruption 21h**

| Fonction | Description | Effet |
|---|---|---|
| 01 | Lecture d'un caractère à partir de l'entrée standard | Le code ASCII du caractère est récupéré dans `al` |
| 09 | Affichage d'une chaine de caractère à la sortie standard | L'adresse de la chaine de caractères est placée dans `dx` |

<details>
<summary>Correction</summary>

```asm
tab3 db 3 dup (?)
mov bx,offset tab3
mov si,0

l1:mov ah,1
int 21h
cmp al,30h
jb l1
cmp al, 39h
ja l1
sub al,30h
mov [bx+si],al      ;le tableau doit contenir les trois valeurs saisie entre 0 et 9 obligatoirement
inc si
cmp si,3
jne l1
hlt
```

La fonction `01` de l'interruption `21h` lit un caractère au clavier et place son code ASCII dans `al`. On vérifie que ce code est bien compris entre `'0'` (`30h`) et `'9'` (`39h`) — sinon on reboucle (`jb l1` / `ja l1`) — puis on soustrait `30h` pour convertir le caractère ASCII en sa valeur numérique avant de le stocker dans `tab3`.

</details>

## Exercice 2

Soit le tableau ci-dessous :

| Adresse | Valeur |
|---|---|
| DS:0300 | 9A |
| DS:0301 | 67 |
| DS:0302 | 4D |
| DS:0303 | F5 |
| DS:0304 | F4 |
| DS:0305 | C6 |
| DS:0306 | 95 |
| DS:0307 | 21 |
| DS:0308 | 50 |
| DS:0309 | 34 |

Écrire un programme qui permet de calculer la moyenne de ce tableau.

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/micp-serie-revision.pdf" />

</TabItem>
</Tabs>
