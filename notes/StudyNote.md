To learn
- How browser render a page
- How react build/render a page
- Html(MDN)
- Vue.js

# HTML: HyperText Markup Language

HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and **structure of web content**. Other technologies besides HTML are generally used to describe a web page's appearance/presentation (CSS) or functionality/behavior (JavaScript).

"Hypertext" refers to links that connect web pages to one another, either within a single website or between websites. Links are a fundamental aspect of the Web. By uploading content to the Internet and linking it to pages created by other people, you become an active participant in the World Wide Web. - MDN

- `<header>`
- `<body>`
- `<footer>`
- `<article>`
- `<section>`
- `<search>`
- `<detail> <summary>` name prop
- `<input> <datalist>`

# Javascript

## Object
- `keys()`
- `values()`

### Array
- `concat()`
- `reduce()`

### async function
### Promise

# CSS

## Property
- `flex-grow`
- `flex-flow`: flex-direction, flex-grow
- `color: var(--variable-name)`: custom variable

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

# React

- `useEffect`
- `useState`
- `useMemo`
- [`useCallback`](https://react.dev/reference/react/useCallback)  
In JavaScript, **a function () {} or () => {} always creates a different function**, similar to how the {} object literal always creates a new object. Normally, this wouldn’t be a problem, but it means that ShippingForm props will never be the same, and your memo optimization won’t work. This is where useCallback comes in handy - react.dev  
리랜더링 시 같은 함수를 계속 생성하는 것을 방지.
- Component
- Custom Hook
- Context

#### Redux: 상태 관리 툴 for browser. (vs Mobx(object-oriented))

# Markdown

- ` `` `: code snippet
- ` ```  ``` `: code block
```javascript
console.log("hello world!");
```
- `---`: 분리선  

---  
  
# # x
## ## x
### ### x
#### #### x
##### ##### x
###### ###### x

# Express.js
- view engine
- controller
- router

# Theories

## SSR (vs CSR)

