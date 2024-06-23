---
category: Study
title: CSS
date_started: 2024.06.14
tags: CSS
---
# CSS

## Property
- `flex`: `flex-grow` `flex-shrink` `flex-basis`
- `flex-shrink`: 줄어드는 크기 정도
- `flex-grow`: 늘어나는 크기 정도
- `flex-basis`: 크기 기본값
- `flex-flow`: `flex-direction`, `flex-grow`
- `color: var(--variable-name)`: custom variable
- `scrollbar-color`: `thumb-color`(bar color) `track-color`(background color)

## 단위
- `px`: pixel
- `vw`, `vh`: viewport width/height
- `dvw`, `dvh`: dynamic viewport width/height
- `%`: percentage of the parent's property.
- `em`: font-size
- `rem`: font-size of `<html>`

## Media queries

- `width`(`360px`)
- `resolution`(`150dpi`)
- `pointer`(`fine`, `coarse`)
- `orientation`(`landscape`, `potrait`)

## Selector

- `#a`: id == a
- `,`: or  
- `.a`: classname includes a
- `.a.b`: classname includes a and b  
- ` `(띄어쓰기): 후손  
- `>`: 직속자손  
- `~`: Next sibling  
- `+`: Siblings around  
- `:hover`: when hovered  
- `:focus`: when focused  
- `:focus-within`: 자손이 focused될 때  
- `:first-child`: 자신이 first-child임
- `:last-child`: 자신이 last-child임
- `:nth-child()`: 자신이 nth-child임.  
    `:nth-child(2n+1)` -> 1, 3, 5, 7, ...  
    `:nth-child(3n+2)` -> 2, 5, 8, 11, ...  
- `:disabled`: disabled attribute. 기능이 제한된 상태의 엘리먼트.  
- `:active`: 활성화된(클릭중인) 엘리먼트.  