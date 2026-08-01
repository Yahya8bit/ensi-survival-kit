---
sidebar_position: 1
title: TP1 - Programmation Assembleur
sidebar_label: TP1 - Programmation Assembleur
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TP1 : Programmation Assembleur

*ENSI — Module : Architecture & microprocesseur — Classes : II1*

## Exercice 1

Dans le cas où ces registres ont les valeurs suivantes :

`BX=324A`, `BP=2500`, `AX=36C1`, `CX=3000`, `DX=2478`, `DS=5000`, `SS=7000`, `SI=2000`, `DI=4000`.

Calculer l'adresse physique de la mémoire où l'opérande est sauvegardé, ainsi que le contenu des locations mémoires dans chacun des modes d'adressage suivants :

- a. `MOV [SI] , AL`
- b. `MOV [SI+BX+10] , AH`
- c. `MOV [BX] , AX`
- d. `MOV [2540] , AX`
- e. `MOV [BX+25] , DX`
- f. `MOV [BP+150] , AX`
- g. `MOV [DI+30] , BX`
- h. `MOV [DI+BX+19] , CX`

## Exercice 2

Supposons que `DS=1111H`, `SS=2222H`, `CS=3333H`, `BP=4444H`, `BX=5555H`, `SI=7777H` et `IP=6666H`.

Le contenu de quelles adresses se retrouvera dans `AX` suite aux instructions suivantes :

- a. `MOV AX , [BP]`
- b. `MOV AX , [BX]`
- c. `MOV AX , [SI]`

## Exercice 3

Corriger, s'il y a des erreurs, les instructions suivantes :

```asm
MOV DX , 23FH
MOV AX , DX
SUB [DX] , [DX]
SHR DX , 5
MOV CL , 20H
MOV BX , DL
ADD AX , CL
```

## Exercice 4

Soit la table suivante :

| Offset | Valeur |
|---|---|
| 200H | 62 |
| 202H | FF |
| 204H | 2D |
| 206H | 4C |
| 208H | 3F |
| 20AH | F3 |
| 20CH | 15 |
| 20EH | 50 |
| 210H | 7D |

Écrire un programme qui permet :
- la saisie de cette table ;
- le calcul de la somme des éléments ;
- l'affichage caractère par caractère du résultat de la somme, et de mettre ce résultat à partir de l'offset 218H.

<details>
<summary>Correction</summary>

```asm
;************************* SAISIE  *************************
mov byte ptr[200h],62h
mov byte ptr[202h],0xFFh
mov byte ptr[204h],2Dh
mov byte ptr[206h],4Ch
mov byte ptr[208h],3Fh
mov byte ptr[20ah],0xF3h
mov byte ptr[20ch],15h
mov byte ptr[20eh],50h
mov byte ptr[210h],7Dh

;mov byte ptr[200h],1
;mov byte ptr[202h],2
;mov byte ptr[204h],3
;mov byte ptr[206h],4
;mov byte ptr[208h],5
;mov byte ptr[20ah],6
;mov byte ptr[20ch],7
;mov byte ptr[20eh],8
;mov byte ptr[210h],9
;

;************************* ADDITION   *************************
mov si,0
mov bx,0
mov ax,0
l1: mov bx,[si+200h]
add ax,bx
inc si
inc si
;add si,2
cmp si,12h
jne l1

;*************************** Remplissage de la somme dans un tableau d'offset 218 ********************************


mov bx,10          ; 10 si on veut afficher le resultat en decimal
             ; sinon 10h et le resultat sera en hexa
mov si,0
l2:mov dx,0          ;reste de la division
div bx
mov [218h+si],dx
inc si
cmp ax,0              ;ax est vide (fin de la division) ou pas
jne l2
      ;***************************AFFICHAGE ********************************
l3:dec si
mov dl,[218h+si]
;add dl,30h                  ; Code ASCII du zero, affichage decimale

 cmp dl,9
       jb inf
       je inf
       ja sup


   sup: add dl,7h
   inf: add dl,30h        ; Code ASCII du zero, affichage hexa



mov ah,2               ;Fonction d'affichage "du contenu du dl"  caractere par caractere
int 21h                ;Interruption relative à l'affichage


cmp si,0
jne l3
int 20h              ;Appel au dos
```

</details>

## Exercice 5

Écrire un programme qui permet de combiner le quartet du poids faible des contenus des cases mémoires d'adresse `DS:0200H` et `DS:0201H` en un mot qui sera rangé à l'adresse `DS:0202H`.

**Exemple :**

| Adresse | Valeur |
|---|---|
| DS:0200H | 42 |
| DS:0201H | 3B |
| DS:0202H | 2B |

<details>
<summary>Correction</summary>

```asm
mov [200h],42h
mov [201h],3Bh
mov al,[200h]
;mov cl,4
shl al,4
mov bl,al         ;bl=20h
mov al,[201h]
and al,0fh       ;  al=0Bh
add al,bl
mov [202h],al
hlt
;int 20h
```

</details>

## Exercice 6

Soit la table suivante :

| Adresse | Valeur |
|---|---|
| DS:0300 | 9A |
| DS:0301 | 82 |
| DS:0302 | 30 |
| DS:0303 | F5 |
| DS:0304 | 54 |
| DS:0305 | C0 |
| DS:0306 | 65 |
| DS:0307 | 70 |
| DS:0308 | 80 |
| DS:0309 | 90 |

1. Écrire un programme qui détermine le nombre d'éléments négatifs (`b7=1`).
2. Écrire un programme qui permet de déterminer la valeur minimale puis la valeur maximale.

<details>
<summary>Correction (question 1)</summary>

```asm
mov byte ptr[300h], 9Ah
mov byte ptr[301h], 82h
mov byte ptr[302h], 30h
mov byte ptr[303h], 0xF5h
mov byte ptr[304h], 54h
mov byte ptr[305h], 0xC0h
mov byte ptr[306h], 65h
mov byte ptr[307h], 70h
mov byte ptr[308h], 80h
mov byte ptr[309h], 90h

mov cx,0          ;cx donne le nbre d'elements negatives
mov si,0


         ;;;;;;;;;; Methode 01   Utilisation du registre CF  ;;;;;;;;;;;;;;;;;;;;;;;

l1:mov al,[300h+si]
shl al,1
jnc l0   ;saut si CF=0   nbre positif
inc cx
l0:inc si
cmp si,10 ;(0Ah)
jne l1
;int 20h
hlt

         ;;;;;;;;;;   Utilisation du registre SF  ;;;;;;;;;;;;;;;;;;;;;;;

;l1:mov al,[300h+si]
;add al,0h
;jns l0   ;saut si SF=0   nbre positif
;inc cx
;l0:inc si
;cmp si,10 ;(0Ah)
;jne l1
;int 20h
```

Deux méthodes équivalentes sont possibles : décaler le bit de poids fort dans le **CF** (`shl al,1` puis `jnc`), ou tester directement le **SF** après une opération arithmétique nulle (`add al,0h` puis `jns`).

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/micp-tp1-programmation-assembleur.pdf" />

</TabItem>
</Tabs>
