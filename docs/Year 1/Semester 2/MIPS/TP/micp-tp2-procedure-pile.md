---
sidebar_position: 2
title: TP2 - Procédure et Pile
sidebar_label: TP2 - Procédure et Pile
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# TP2 : Procédure et Pile

*ENSI — Module : Architecture des microprocesseurs — Classes : II1*

## Exercice 1

Déterminer le contenu des registres `AX`, `BX`, `CX` et `DX` dans chaque ligne de la séquence d'instructions ci-dessous sachant que ces registres contiennent initialement les valeurs suivantes :

`AX=9897H`, `BX=5678H`, `CX=1BCEH`, `DX=4532H`

La pile contient une seule valeur = `1F8BH`

```asm
OR BX,FFFFH
PUSH BX
XOR AX,AX
AND DX,0000H
MOV AX,000EH
MUL BL
POP CX
PUSH AX
POP DX
OR BX,0100H
```

## Exercice 2

Soit la table `TAB1` contenant les valeurs suivantes (`62, FF, 2D, 4C, 3F, F3, 15, 50, 7D`) :

### Version 1 : Procédures sans pile

Écrire un programme principal faisant appel à :
1. une procédure `CHAINE` qui permet d'afficher la chaine de caractères suivante : « la somme des termes est : »
2. une procédure `SOMME` qui permet de calculer la somme des éléments de `TAB1`.
3. une procédure `DIVISION` qui permet de mettre ce résultat dans une table `TAB2`.
4. une procédure `AFFICHAGE` qui permet l'affichage caractère par caractère le résultat de la somme.

<details>
<summary>Correction (Version 1)</summary>

```asm
;Version 1: Procedure sans pile

code segment
assume cs:code

org 100h
start:jmp debut

;tab db 1,2,3,4,5,6,7,8,9
tab db 062h,0ffh,02dh,04ch,03fh,0f3h,015h,050h,07dh
tab2 db 5 dup(?)
chaine db "la somme des termes est: $"
s dw 0


        ; procedure CHAINE ***********************************

CHAINEE proc near
    mov dx,offset chaine
    mov ah,9
    int 21h
    ret

CHAINEE endp



         ;procedure SOMME ***********************************

SOMME proc near

    mov cx,9
    mov ah,0
    ;mov bx,offset tab
    xor si,si
   ;l1:mov al,byte ptr [bx+si]
    l1:mov al,tab [si]
    add s,ax
    inc si
    ;cmp si,9
    loop l1
    ;jne l1
    mov ax,s
    ret

SOMME endp
;
;
;        ;procedure DIVISION ***********************************

 DIVISION proc near

                     ;
  mov di,0
  mov bx,offset tab2
 L2:mov dx,0               ;c'est le reste de la division
    mov si,10h
    div si
 mov [bx+di],dl
; mov byte ptr [bx+di],dl
 inc di
 cmp ax,0               ;c'est le quotion de la division
 jne L2
 ret

 DIVISION endp

;
;         ;procedure AFFICHAGE ***********************************
;
;
 AFFICHAGE   proc near

    L3: dec di
    mov dl,byte ptr[bx+di]
     cmp dl,9
       ja sup
       jb inf
       je inf
   sup: add dl,7h
   inf: add dl,30h

      mov ah,2
      int 21h
      cmp di,0
      jne L3
      ret

  AFFICHAGE endp


           ;APPEL des differents procedures ***********************************

debut:  call CHAINEE
        call SOMME
       call DIVISION
       call AFFICHAGE
int 20h
code ends
end start
```

</details>

### Version 2 : sans procédures mais avec pile

Écrire un programme qui permet :
- d'afficher la chaine de caractères suivante : `la somme des termes est`
- de calculer la somme des éléments de `TAB1`.
- de mettre ce résultat dans une table `TAB2`.
- d'afficher caractère par caractère le résultat de la somme.

<details>
<summary>Correction (Version 2)</summary>

```asm
;Version 2 : sans procedures mais avec pile


code segment
assume cs:code
org 100h
start:jmp debut
;tab db 1,2,3,4,5,6,7,8,9
tab db 062h,0ffh,02dh,04ch,03fh,0f3h,015h,050h,07dh
tab2 db 5 dup(?)
chaine db "la somme des termes est: $"
s dw 0

  ;
;    ********; Afficher CHAINE ***********************************

debut:    mov dx,offset chaine
    mov ah,9
    int 21h

;
;
;         ;******************SOMME ***********************************


    mov ah,0
    mov bx,offset tab
    xor si,si
    l1:mov al,byte ptr [bx+si]
    add s,ax
    inc si
    cmp si,9
    jne l1
    mov ax,s


;        ;*****************DIVISION ***********************************

    mov cx,0      ;longeur du resultat  (exp 4 pour 1006) utile lors de l'affichage.
 L2:mov dx,0         ;dx c'est le reste de la division
 mov bx, 10
  ;mov bx, 10
 div bx
 push dx                  ; mov [bx+di],dx
 inc cx                   ;c'est l'equivalent de di
 cmp ax,0
 jne L2

;  ;***************** AFFICHAGE ***********************************


   L3: dec cx                ;dec di
       pop dx               ;mov dl,byte ptr[bx+di]
       cmp dl,9
       ja sup
       jb inf

   sup: add dl,7h
   inf: add dl,30h

      mov ah,2
      int 21h

      ;loop L3
       cmp cx,0                ;cmp di,0
       jne L3
int 20h
code ends
end start

       ;******* ;******* Affichage avec LOOP  ;******* ;******* ;*******

    ;
;     L3:pop dx               ;mov dl,byte ptr[bx+di]
;        cmp dl,9
;        ja sup
;        jb inf
;
;   sup: add dl,7h
;   inf: add dl,30h
;
;      mov ah,2
;      int 21h
;
;      loop L3
;int 20h
;code ends
;end start
```

</details>

### Version 3 : procédures ET pile (combiner les deux versions)

<details>
<summary>Correction (Version 3)</summary>

```asm

;Version 1: Procedure sans pile

code segment
assume cs:code

org 100h
start:jmp debut

;tab db 1,2,3,4,5,6,7,8,9
tab db 062h,0ffh,02dh,04ch,03fh,0f3h,015h,050h,07dh
tab2 db 5 dup(?)
chaine db "la somme des termes est: $"
s dw 0


         ;procedure CHAINE ***********************************

CHAINEE proc near
    mov dx,offset chaine
    mov ah,9
    int 21h
    ret

CHAINEE endp



         ;procedure SOMME ***********************************

SOMME proc near

    mov cx,9
    mov ah,0
   ; mov bx,offset tab
    xor si,si
  ;  l1:mov al,byte ptr [bx+si]
    l1:mov al,tab [si]
    add s,ax
    inc si
    ;cmp si,9
    loop l1
    ;jne l1
    mov ax,s
    ret

SOMME endp

        ;***********   Procedure Affichage dans la procedure DIVISION ***********************************


  DIVISION proc near
  mov cx,0      ;longeur du resultat  (exp 4 pour 1006) utile apres lors de l'affichage.
 L2:mov dx,0
 mov bx, 10
  ;mov bx, 10h
 div bx
 push dx
 inc cx
 inc si
 cmp ax,0
 jne L2

 L3:pop dx

  cmp dl,9
       ja sup
       jb inf

   sup: add dl,7h
   inf: add dl,30h

      mov ah,2
      int 21h

      loop L3
      ret

 DIVISION endp

         ; ***********************************

debut: call CHAINEE
       call SOMME
       call DIVISION
     ;  call AFFICHAGE
int 20h
code ends
end start
```

Cette version combine procédures (`CHAINEE`, `SOMME`, `DIVISION`) et pile : la `DIVISION` empile chaque reste (`push dx`) au lieu de le stocker dans `TAB2`, puis la boucle `L3` dépile (`pop dx`) et affiche directement les chiffres dans le bon ordre — l'affichage est donc intégré à la fin de `DIVISION`, sans procédure `AFFICHAGE` séparée.

</details>

## Exercice 3

Soit la table `TAB1` définie par `(9A, 82, 30, F5, 54, C0, 65, 71, 80, 93)` :

Écrire un programme faisant appel à :
1. Une procédure `RECHERCHE` qui permet de chercher la valeur `54` dans `TAB1` si elle existe et de la supprimer.
2. Une procédure `INVERSION` qui permet l'inversion des quartets de chaque valeur de la table `TAB1` et de les stocker en ordre inverse dans une autre table `TAB2`, `(39, 08, 17, 56, 0C, 45, 5F, 03, 28, A9)`.
3. Une procédure `PARITE` qui permet de partager `TAB1` en deux tables `TAB3` et `TAB4`. La première doit contenir les éléments pairs. La deuxième doit contenir les éléments impairs.

<details>
<summary>Correction</summary>

```asm
                         ;*************  PARTIE OPTIONNEL *******************************

                                      ;Les instructions sont placees dans le segment de code
code segment           ;OPTIONNEL       ;sert a declarer le segment code,cette ligne ne sera pas compilee: elle ne sert qu'a indiquer
                                      ; au compilateur le debut d'un segment

     assume cs:code         ;OPTIONNEL   ;La directive ASSUME permet d'indiquer a l'assembleur quel est le segment de codes (cs notre cas)



     org 100h              ;OPTIONNEL      ;le programme debute à partir de 100h  (valeur de IP)




;        ***************** RAPPEL UTILE pour la manipulation des tableaux en ASSEMBLEUR ***************************


 ;db: definit une variable de 8 bits : c a d elle reserve un espace memoire d'un octet
;Syntaxe :   Nom  DB Expression

;DW ( define word) : definit une variable de 16 bits : c a d elle reserve un espace mémoire d'un mot


;
;Exemple :
;
;Vil  DB  12H ; Définit une variable (un octet) de valeur Initiale 12.
;Tab  DB 18H, 15H, 13H ; definit un tableau de 3 cases (3 octet) Qui démarre a partir de l'adresse TAB.
;TAB1 DW    10H,11H,14H ; reserve un  tableau de 6 cases, chaque valeur sera mise sur deux cases  (1 case=1 octet)
;Name DB  ?  ; definit une variable de 8 bits de valeur initiale quelconque .



                                     ; *********** dup **************************
; Lorsque l'on veut declarer un tableau de n cases, toutes initialisees a la meme valeur, on utilise la directive dup
                                     ; ******************************************



start:jmp debut

tab1 db 9Ah,82h,30h,0xF5h,54h,0xC0h,65h,71h,80h,93h         ;reserve un  tableau de 10 cases (10 octets) chaque valeur sera mise sur
                                                             ;une seule case
tab2 db 10 dup(?)      ;10 octets non initialises
tab3 db 10 dup(?)
tab4 db 10 dup(?)




     ;************* Procedure RECHERCHE *************

Recherche proc
    mov al,0
    mov si,0                   ;le registre si joue le role d'indice de tableau     (variable)
    mov bx,offset tab1         ;bx represente l'offset du premier element du tableau (constante)  bx=0102
  L2:mov al,[bx+si]
  cmp al,54h
  jne L1
  mov al,[bx+si+1]
  mov [bx+si],al
  ;mov [bx+si],al
  L1:inc si
  cmp si,10 ;(0Ah)
  jne L2
  ret

    ;REMARQUE 1:  Verifier le résultat dans DS:bx avec bx=0102h

 ; REMARQUE 2:  Apres l''instruction ret, il saute vers l'instruction call INVERSION.......



      ;************* Procedure INVERSION *************

Inversion proc
    mov ax,0
    mov si,0
    mov di,9
    mov cl,4



;  LEA signifie : Load Effective Address

;  LEA calcule l'offset de la source et le place dans la destination.



    lea bx,tab1      ;Cela revient à dire : BX = offset tab1 equivalent de  mov bx,offset tab1;
    lea bp,tab2                            ;BP=offset tab2

 L0: mov al,[bx+si]
; xor al,al
rol al,cl
 mov [bp+di],al
 inc si
 dec di
 cmp si,10
 jne L0
 ret
 Inversion endp
;
            ;Remarque:

                          ; Verifier le résultat dans DS:bp (DS:010Ch)


      ;************* Procedure PARITE *************

 Parite proc

    mov ax,0
    mov si,0
    mov di,0
    mov bp,offset tab3        ;bp offset du premier element de la tab3  ; pairs
    mov di,offset tab4        ;di offset du premier element de la tab4 ;impairs
    mov bx,offset tab1
    mov cl,2

  L3:mov al,[bx+si]
  mov dl,al
  div cl         ; Cette instruction effectue la division du contenu de AX par 2
  cmp ah,0      ;ah c le reste de la division   (al c le quotion)
  jne L4
  mov [bp],dl           ;bp=  0116
  inc bp
  inc si
  cmp si,10         ;0ah
  jne L3
  ret

  L4:mov [di],dl     ;di= 0120     DS=0700:0120
  xor ah,ah   ;mov ah, 0
  inc di
   inc si
  cmp si,10
  jne L3
 ret

 Parite endp

                 ;Remarque:
                                             ;0116=offset tab3=bp ; 0120=offset tab4=di
                          ; Verifier le resultat dans DS:0116 (pairs)  et   DS:0120 (impairs)


 ;*************;*************;*************;*************

 debut: call  recherche
        call inversion
        call parite
        int 20h


 code ends
end start
```

</details>

## Exercice 4

Soient les déclarations suivantes dans le segment de données :

```asm
TAB1 DB 25,30,45,125,15,88
TAB2 DB 38,76,240,108,93,12
TAB_moy DB 6 dup( ?)
TAB_max DB 6 dup(?)
```

Écrire un programme qui fait appel à deux procédures :
- La première est **Moyenne**, qui permet de calculer la moyenne des deux éléments de même rang des deux tableaux `TAB1` et `TAB2` et de loger le résultat dans la table `TAB_moy`.
- La deuxième procédure est **MAXIMUM** qui cherche le plus grand des deux éléments de même rang des deux tableaux `TAB1` et `TAB2` et loge le résultat dans la table `TAB_max`.

<details>
<summary>Correction</summary>

```asm
code segment
assume ds:code
org 100h
start:jmp debut
    tab1 db 25,30,45,125,15,88
    tab2 db 38,76,240,108,93,12

;TAB1 db 8 dup(F5H, 9BH, 75H, A8H, 47H, 9CH, 2AH, 4DH)
;TAB2 db 8 dup(?)

                         ;
;    tab1 db 1,2,3,4,5,6
;    tab2 db 7,8,9,10,11,12
;
    tab_moy db 6 dup( ?)
    tab_max db 6 dup(?)
s dw 0




           ;     *************************** Moyenne ****************************************


  Moyenne   proc near
 mov si,0
 mov bp,offset tab2


l1:  mov bx,offset tab1
     mov al,byte ptr[bx+si]
     mov cl,byte ptr[bp+si]
     mov bx,offset tab_moy
 add al,cl
 mov cl,2
 div cl
mov [bx+si],al         ;al c le quotion de la division
 inc si
 cmp si,6
 jne l1
 int 20h
  Moyenne endp


   ;        *****************************  Maximum  **************************************

 ;Maximum   proc near
; mov si,0
; mov bp,offset tab2
;
;
;l1:  mov bx,offset tab1
;     mov al,byte ptr[bx+si]
;     mov cl,byte ptr[bp+si]
;     mov bx,offset tab_max
;
;
;
;
;cmp al,cl
; ja et4
;
; mov [bx+si],cl
;         inc si
;     cmp si,6
;     jne l1
;     jmp et6
;
;      et4: mov [bx+si],al
;                       inc si
;                     cmp si,6
;                     jne l1
;
;
;  et6: hlt
; int 20h
;Maximum endp




debut: call Moyenne
       ;call Maximum
int 20h
code ends
end start
```

La procédure `Maximum` est laissée en commentaire dans la correction (même logique que `Moyenne`, mais compare `al` et `cl` avec `cmp`/`ja` au lieu de faire la moyenne).

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/micp-tp2-procedure-pile.pdf" />

</TabItem>
</Tabs>
