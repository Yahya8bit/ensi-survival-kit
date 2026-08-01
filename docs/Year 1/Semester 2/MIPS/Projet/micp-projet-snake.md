---
sidebar_position: 1
title: Projet - Développement du jeu Snake en 8086
sidebar_label: Projet - Snake en 8086
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="markdown" label="Markdown" default>

# Projet : Développement du jeu Snake en 8086

*ENSI — Module : Architecture des Microprocesseurs — Classe : II1*

## 1. Objectif

L'objectif de ce projet est de réaliser un jeu Snake en langage assembleur 8086 en utilisant un environnement DOS.

L'étudiant devra :
- Comprendre le fonctionnement du microprocesseur 8086
- Manipuler les interruptions BIOS et DOS
- Implémenter un affichage graphique
- Gérer les entrées clavier
- Créer une boucle de jeu

## 2. Guide d'installation

1. Installer DOSBox-X
2. Installer NASM
3. Créer un dossier de travail, par exemple :

```
C:\dos\snake
```

4. Monter le dossier dans DOSBox :

```
mount c C:\dos\snake
c:
```

## 3. Code complet du jeu Snake

Créer un fichier nommé `snake.asm` et copier le code suivant :

```asm
org 100h
jmp start

; --- DONNÉES ---
snake_x db 40, 39, 38, 37
snake_y db 12, 12, 12, 12
length  db 4
dir     db 1

start:
    mov ax, 0013h
    int 10h

main_loop:
    call input
    call update
    call draw
    call delay
    jmp main_loop

; --- SAISIE CLAVIER ---
input:
    mov ah, 01h
    int 16h
    jz no_key

    mov ah, 00h
    int 16h

    cmp al, 1Bh
    je exit_game

    cmp ah, 4Dh
    je set_right
    cmp ah, 4Bh
    je set_left
    cmp ah, 48h
    je set_up
    cmp ah, 50h
    je set_down
    ret

exit_game:
    mov ax, 4C00h
    int 21h

set_right:
    cmp byte [dir], 2
    je no_key
    mov byte [dir], 1
    ret
set_left:
    cmp byte [dir], 1
    je no_key
    mov byte [dir], 2
    ret
set_up:
    cmp byte [dir], 4
    je no_key
    mov byte [dir], 3
    ret
set_down:
    cmp byte [dir], 3
    je no_key
    mov byte [dir], 4
    ret

no_key:
    ret

; --- MISE À JOUR POSITION ---
update:
    mov cl, byte [length]
    xor ch, ch
    dec cx
    jz update_head

    mov si, cx
shift_loop:
    mov di, si
    dec di
    mov al, [snake_x + di]
    mov [snake_x + si], al
    mov al, [snake_y + di]
    mov [snake_y + si], al
    dec si
    jnz shift_loop

update_head:
    mov al, [dir]
    cmp al, 1
    je move_r
    cmp al, 2
    je move_l
    cmp al, 3
    je move_u
    cmp al, 4
    je move_d
    ret

move_r:
    inc byte [snake_x]
    ret
move_l:
    dec byte [snake_x]
    ret
move_u:
    dec byte [snake_y]
    ret
move_d:
    inc byte [snake_y]
    ret

; --- AFFICHAGE ---
draw:
    mov ax, 0A000h
    mov es, ax
    xor di, di
    mov cx, 64000
    xor al, al
    rep stosb

    mov cl, byte [length]
    xor ch, ch
    xor si, si
draw_loop:
    ; Calcul offset = y * 320 + x
    mov al, [snake_y + si]
    xor ah, ah
    mov bx, 320
    mul bx
    mov bx, ax

    mov al, [snake_x + si]
    xor ah, ah
    add bx, ax

    mov di, bx
    mov byte [es:di], 10 ; Couleur verte

    inc si
    dec cx
    jnz draw_loop
    ret

; --- TEMPORISATION ---
delay:
    push cx
    mov cx, 0FFFFh
d1:
    loop d1
    pop cx
    ret
```

## 4. Compilation et exécution

Dans le terminal (NASM) :

```
cd C:\dos\snake
nasm -f bin snake.asm -o snake.com
```

Dans DOSBox :

```
snake.com
```

## 5. Résultat attendu

Un serpent s'affiche à l'écran et peut être contrôlé avec le clavier.

## 6. Travail demandé

L'étudiant doit corriger et améliorer le programme en ajoutant :
- Système de nourriture
- Détection de collision
- Score
- Écran de fin (Game Over)

## 7. Remise du projet

L'étudiant doit rendre sur classroom :
- Code complet `snake_full.asm`
- Vidéo courte de démo commentée

<details>
<summary>Correction — snake_full.asm</summary>

Version complète intégrant le système de nourriture (`spawn_food`, `check_food`), la détection de collision avec les bords et le corps du serpent (`check_collision`), le score (`score`, `print_word`), et l'écran de fin de partie avec possibilité de rejouer (`game_over`).

```asm
org 100h
jmp start

; --- DONNÉES ---
snake_x  db 40, 39, 38, 37, 0, 0, 0, 0, 0, 0
snake_y  db 12, 12, 12, 12, 0, 0, 0, 0, 0, 0
length   db 4
dir      db 1             ; 1=droite 2=gauche 3=haut 4=bas
food_x   db 60
food_y   db 10
score    dw 0

msg_over   db 'GAME OVER', 0
msg_score  db 'SCORE: ', 0
msg_replay db 'Appuyez sur R pour rejouer, ESC pour quitter', 0

; --- POINT D'ENTRÉE ---
start:
    call init_video
    call spawn_food

main_loop:
    call input
    call update
    call check_food
    call check_collision
    call draw
    call delay
    jmp  main_loop

; --- INITIALISATION VIDÉO ---
init_video:
    mov  ax, 0013h
    int  10h
    ret

; --- SAISIE CLAVIER ---
input:
    mov  ah, 01h
    int  16h
    jz   .no_key

    mov  ah, 00h
    int  16h

    cmp  al, 1Bh
    je   exit_game

    cmp  ah, 4Dh
    je   .set_right
    cmp  ah, 4Bh
    je   .set_left
    cmp  ah, 48h
    je   .set_up
    cmp  ah, 50h
    je   .set_down
    jmp  .no_key

.set_right:
    cmp  byte [dir], 2
    je   .no_key
    mov  byte [dir], 1
    ret
.set_left:
    cmp  byte [dir], 1
    je   .no_key
    mov  byte [dir], 2
    ret
.set_up:
    cmp  byte [dir], 4
    je   .no_key
    mov  byte [dir], 3
    ret
.set_down:
    cmp  byte [dir], 3
    je   .no_key
    mov  byte [dir], 4
    ret
.no_key:
    ret

exit_game:
    mov  ax, 4C00h
    int  21h

; --- MISE À JOUR POSITION ---
update:
    mov  cl, byte [length]
    xor  ch, ch
    dec  cx
    jz   .update_head

    mov  si, cx
.shift_loop:
    mov  di, si
    dec  di
    mov  al, [snake_x + di]
    mov  [snake_x + si], al
    mov  al, [snake_y + di]
    mov  [snake_y + si], al
    dec  si
    jnz  .shift_loop

.update_head:
    mov  al, [dir]
    cmp  al, 1
    je   .move_r
    cmp  al, 2
    je   .move_l
    cmp  al, 3
    je   .move_u
    inc  byte [snake_y]
    ret
.move_r: inc  byte [snake_x]
         ret
.move_l: dec  byte [snake_x]
         ret
.move_u: dec  byte [snake_y]
         ret

; --- VÉRIFICATION NOURRITURE ---
check_food:
    mov  al, [snake_x]
    cmp  al, [food_x]
    jne  .no_eat
    mov  al, [snake_y]
    cmp  al, [food_y]
    jne  .no_eat

    add  word [score], 10

    mov  al, [length]
    cmp  al, 10
    jae  .no_grow
    inc  byte [length]
.no_grow:
    call spawn_food
.no_eat:
    ret

; --- DÉTECTION DE COLLISION ---
check_collision:
    cmp  byte [snake_x], 255
    je   game_over
    cmp  byte [snake_x], 200
    jae  game_over
    cmp  byte [snake_y], 255
    je   game_over
    cmp  byte [snake_y], 130
    jae  game_over

    mov  cl, byte [length]
    xor  ch, ch
    cmp  cx, 1
    jbe  .done

    mov  si, 1
.loop:
    mov  al, [snake_x]
    cmp  al, [snake_x + si]
    jne  .next
    mov  al, [snake_y]
    cmp  al, [snake_y + si]
    je   game_over
.next:
    inc  si
    dec  cx
    cmp  cx, 1
    jne  .loop
.done:
    ret

; --- SPAWN NOURRITURE ---
spawn_food:
    xor  ah, ah
    int  1Ah

    mov  ax, dx
    xor  ah, ah
    mov  bl, 200
    div  bl
    mov  [food_x], ah

    mov  ax, dx
    xor  ah, ah
    mov  bl, 130
    div  bl
    mov  [food_y], ah

    mov  al, [food_x]
    cmp  al, [snake_x]
    jne  .ok
    mov  al, [food_y]
    cmp  al, [snake_y]
    je   spawn_food
.ok:
    ret

; --- AFFICHAGE ---
draw:
    mov  ax, 0A000h
    mov  es, ax

    xor  di, di
    mov  cx, 64000
    xor  al, al
    rep  stosb

    mov  cl, byte [length]
    xor  ch, ch
    xor  si, si
.draw_snake:
    call pixel_addr
    mov  byte [es:di], 10
    inc  si
    loop .draw_snake

    mov  al, [food_y]
    xor  ah, ah
    mov  bx, 320
    mul  bx
    mov  di, ax
    mov  al, [food_x]
    xor  ah, ah
    add  di, ax
    mov  byte [es:di], 4

    ret

pixel_addr:
    mov  al, [snake_y + si]
    xor  ah, ah
    mov  bx, 320
    mul  bx
    mov  di, ax
    mov  al, [snake_x + si]
    xor  ah, ah
    add  di, ax
    ret

; --- TEMPORISATION ---
delay:
    push cx
    mov  cx, 0FFFFh
.d1: loop .d1
    pop  cx
    ret

; --- GAME OVER ---
game_over:
    mov  ax, 0003h
    int  10h

    mov  ah, 01h
    mov  cx, 2000h
    int  10h

    mov  ah, 02h
    mov  bh, 0
    mov  dh, 10
    mov  dl, 35
    int  10h

    mov  si, msg_over
    call print_str

    mov  ah, 02h
    mov  bh, 0
    mov  dh, 12
    mov  dl, 35
    int  10h

    mov  si, msg_score
    call print_str

    mov  ax, [score]
    call print_word

    mov  ah, 02h
    mov  bh, 0
    mov  dh, 14
    mov  dl, 18
    int  10h

    mov  si, msg_replay
    call print_str

.wait_key:
    xor  ah, ah
    int  16h
    cmp  al, 1Bh
    je   exit_game
    cmp  al, 'r'
    je   .restart
    cmp  al, 'R'
    je   .restart
    jmp  .wait_key

.restart:
    mov  byte [snake_x],   40
    mov  byte [snake_x+1], 39
    mov  byte [snake_x+2], 38
    mov  byte [snake_x+3], 37
    mov  byte [snake_y],   12
    mov  byte [snake_y+1], 12
    mov  byte [snake_y+2], 12
    mov  byte [snake_y+3], 12
    mov  byte [length], 4
    mov  byte [dir], 1
    mov  word [score], 0
    call init_video
    call spawn_food
    jmp  main_loop

; --- AFFICHAGE CHAÎNE ---
print_str:
    mov  ah, 0Eh
.loop:
    mov  al, [si]
    test al, al
    jz   .done
    int  10h
    inc  si
    jmp  .loop
.done:
    ret

; --- AFFICHAGE SCORE ---
print_word:
    mov  cx, 0
    mov  bx, 10
.divide:
    xor  dx, dx
    div  bx
    push dx
    inc  cx
    test ax, ax
    jnz  .divide
.print:
    pop  dx
    mov  al, dl
    add  al, '0'
    mov  ah, 0Eh
    int  10h
    loop .print
    ret
```

</details>

</TabItem>
<TabItem value="pdf" label="PDF">

<PdfViewer file="/pdfs/micp-projet-snake.pdf" />

</TabItem>
</Tabs>
