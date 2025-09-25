
<img width="720" alt="image" src="https://github.com/user-attachments/assets/20885936-1b8c-48f4-b5f5-11bc362849b6">

> Javascript의 기본 사용법을 모아 정리했다.

# javascript 정리


> [w3schools - JS Tutorial](https://www.w3schools.com/js)

### var vs let

- scope: var는 함수 스코프, let은 블록 스코프
- hoisting: var는 선언 전에 사용 가능하다. let은 선언 전에 사용하면 ReferenceError가 발생한다.
- redeclaration: var는 재선언이 가능하다. let은 재선언이 불가능하다.
- global object: var는 window object의 property로 등록된다(binding). let은 window object의 property로 등록되지 않는다.

### Number

- bit: 64bit
- `Number.MAX_SAFE_INTEGER`: 2^53-1
- `Number.MIN_SAFE_INTEGER`: -(2^53-1)
- `Number.MAX_VALUE`: 1.7976931348623157e+308
- `Number.MIN_VALUE`: 5e-324
- `Number.EPSILON`: 2^-52

```javascript
console.log(Number.MAX_SAFE_INTEGER);
// 9007199254740991

console.log(Number.MIN_SAFE_INTEGER);
// -9007199254740991

console.log(Number.MAX_VALUE);
// 1.7976931348623157e+308

console.log(Number.MIN_VALUE);
// 5e-324

console.log(Number.EPSILON);
// 2.220446049250313e-16
```


### BigInt

- 2^53-1보다 큰 정수를 표현할 수 있다.
- `n`을 붙여서 표현한다.

```javascript
const bigInt1 = 1234567890123456789012345678901234567890n;
const bigInt2 = BigInt("1234567890123456789012345678901234567890");

```

### ?? operator

- nullish coalescing operator
- `null` 또는 `undefined`일 때만 우측의 값을 반환한다.

```javascript
const foo = null ?? "default string";
console.log(foo);
// "default string"

const bar = 0 ?? 42;
console.log(bar);
// 0
```

### ~ operator

- bitwise NOT operator
- `~n`은 `-n-1`을 반환한다.
- 소수점 제거에 활용 가능 (64bit -> 32bit)

```javascript
console.log(~2);
// -3

console.log(~~5.512);
// 5
```

## 손님? 아니, Object가 왕이다.
"If you Understand Objects, you Understand JavaScript."

오브젝트는 프로퍼티와 메소드를 담는 컨테이너이다.

프로퍼티는 이름이 있는 값이다.

메소드는 프로퍼티로서 저장된 함수이다.

프로퍼티는 원시값, 함수, 또는 다른 오브젝트가 될 수 있다.

오브젝트 목록
- Objects
- Maths
- Functions
- Dates
- Arrays
- Maps
- Sets

원시값을 제외한 모든 자바스크립트 값이 오브젝트에 해당한다.

#### 생성자: 모든 자바스크립트 오브젝트는 생성자 property가 있다. 이는 생성자 함수라고 불린다.

```javascript
const x = {};
console.log(x.constructor);
// [Function: Object]

function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
  this.nationality = "English";
}

const myFather = new Person("John", "Doe", 50, "blue");
console.log(myFather);
// Person{...}

```

Property 추가하기  

```javascript

function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
  this.nationality = "English";
}

const myFather = new Person("John", "Doe", 50, "blue");
console.log(myFather);

Person.area = 'London'
console.log(myFather.area)
// undefined

Person.prototype.area = 'London'
console.log(myFather.area)
// London

```

instance를 만든 후에 Property를 추가해도 default value를 가지는 것이 신기했다.

원리:  
- `myFather`는 `Person`의 instance이다.
- `Person`의 prototype에 `area` property를 추가하면, `myFather`의 prototype chain에도 `area` property가 추가된다.
- `myFather`의 prototype chain에 `area` property가 없기 때문에 `Person`의 prototype chain을 타고 올라가 `area` property를 찾는다.

Built-in JavaScript 생성자들  
JavaScript has built-in 생성자들 for all native objects:  

```javascript
new Object()   // A new Object object
new Array()    // A new Array object
new Map()      // A new Map object
new Set()      // A new Set object
new Date()     // A new Date object
new RegExp()   // A new RegExp object
new Function() // A new Function object
```

> Note:
`Math`가 없는데 이는 global object이다. `new` 키워드는 `Math`에 사용될 수 없다.

### 알고 있지? 간단한 생성자

`new Object()` 대신 `{}`를 사용하자.

`new Array()` 대신 `[]`를 사용하자.

`new RegExp()` 대신 `/()/`를 사용하자.

`new Function()` 대신 `() {}`를 사용하자.

```javascript
"";           // primitive string
0;            // primitive number
false;        // primitive boolean

{};           // object object
[];           // array object
/()/          // regexp object
function(){}; // function
```

### Prototypes

모든 JavaScript 오브젝트는 prototype의 property와 methods를 상속한다.

### Primitives

primitives는 property와 method가 없는 값이다.

3.14는 primitive value이다.

Primitive 데이터 타입은 primitive value를 값으로 하는 데이터이다.

#### 7개의 자바스크립트 primitive 데이터 타입:

- string
- number
- boolean
- null
- undefined
- symbol
- bigint

#### 특징
- immutable: 수정 불가.
- Object는 mutable: 수정 가능.

### generator function

Generator Function이란?

Generator Function은 일반적인 함수와 달리 실행을 중간에 멈췄다가(중단), 나중에 다시 실행할 수 있는 함수예요.

이 함수를 선언하려면 function*이라는 키워드를 사용해요.
호출하면 함수가 바로 실행되지 않고, 대신 Generator 객체를 반환해요.

Binding의 역할

function* 선언문을 사용하면, Generator Function을 특정 이름에 바인딩(binding)해요.

예를 들어, function* myGenerator() {}는 myGenerator라는 이름으로 이 Generator Function을 참조하도록 binding을 만든 거예요.
Generator의 특징

Generator Function은 멈출 수 있는 함수예요.
실행이 중단된 상태에서도 내부의 변수와 상태(context)가 그대로 유지돼요.
다시 실행하면 멈췄던 지점부터 이어서 동작해요.
이 기능은 yield 키워드를 통해 구현돼요.
Generator Function의 두 가지 작성법

Declaration 방식: function* 키워드를 사용해 이름이 있는 Generator를 선언.

Expression 방식: 익명 함수로 정의하거나 다른 이름에 할당.

예제

```javascript

// Declaration 방식
function* generatorExample() {
  yield 1; // 1 반환하고 멈춤
  yield 2; // 2 반환하고 멈춤
  return 3; // 3 반환하고 끝냄
}

// 사용
const gen = generatorExample();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: true }

// Expression 방식
const anotherGenerator = function* () {
  yield 'Hello';
  yield 'World';
};
const gen2 = anotherGenerator();
console.log(gen2.next()); // { value: 'Hello', done: false }
console.log(gen2.next()); // { value: 'World', done: false }
```

단어 설명

Generator Function: 중간에 실행을 멈추고, 다시 시작할 수 있는 특수한 함수.

Yield: Generator에서 값을 반환하고 실행을 멈추는 키워드.

Binding: 특정 이름(identifier)과 Generator Function을 연결하는 작업.

Context: 실행 중인 함수가 사용하는 변수와 상태.

Generator는 복잡한 작업(예: 비동기 처리, 반복 가능한 데이터 생성)을 단순하게 표현하는 데 유용합니다.

### binding

프로그래밍에서 binding은 특정 이름(identifier)과 어떤 값(value)을 연결하는 것을 의미해요. 이때 모든 binding이 "변수"는 아니에요. 예를 들어, 함수의 매개변수(parameter)나 catch (e) 블록에서 만들어지는 binding은 엄격한 의미에서 "변수"라고 부르지 않아요.

또한, 일부 binding은 프로그래밍 언어에 의해 자동으로 생성되기도 해요. 예를 들어, JavaScript에서는 this나 new.target 같은 것이 이에 해당해요.

Binding의 두 가지 주요 특징:

Mutable (변경 가능): binding에 새로운 값을 다시 할당할 수 있다면 mutable이라고 해요.

Immutable (변경 불가능): binding에 새로운 값을 할당할 수 없다면 immutable이라고 해요.

⚠️ 하지만, binding이 immutable이라고 해서 그것이 가리키는 값(value) 자체도 변경 불가능한 것은 아니에요. (예: 객체의 속성은 바뀔 수 있음)

Scope와의 관계:
Binding은 일반적으로 특정 스코프와 연관되어 있어요.

어떤 프로그래밍 언어에서는 같은 스코프에서 binding을 다시 만들 수 있어요(redeclare).
그러나 다른 언어에서는 이게 불가능해요.
JavaScript에서는 binding을 만드는 방법에 따라 재선언이 가능한지 여부가 달라져요. (예: var, let, const의 차이점)

단어 설명

Identifier: 식별자. 프로그래밍에서 값을 식별하기 위한 이름.
Scope: 스코프. 특정 코드에서 변수를 접근할 수 있는 범위.
Reassign/Mutable: 다시 할당하다, 변경 가능하다.
Immutable: 변경 불가능한.
추가로 이해를 돕는 예제를 첨부할게요.

```javascript
// mutable binding
let x = 10;
x = 20; // 값을 다시 할당 가능

// immutable binding
const y = 30;
// y = 40; // Error: y는 값을 다시 할당할 수 없음

// 함수 매개변수도 binding의 한 종류
function greet(name) {
  console.log(name); // name은 binding이지만 변수로 보지 않을 수 있음
}

// language-defined binding
function example() {
  console.log(this); // this는 언어에 의해 자동 생성됨
}
```

Generator Function과 binding의 관계를 명확히 설명하겠습니다.

1. Generator Function 선언과 Binding

function* 선언문은 특정 이름(identifier)에 Generator Function을 binding합니다.

이 binding은 Generator Function의 정의와 특정 이름을 연결해 주는 역할을 해요.
예를 들어, 아래 코드는 myGenerator라는 이름에 Generator Function을 바인딩한 것입니다.

```javascript
function* myGenerator() {
  yield 1;
  yield 2;
}
```

위 코드에서 myGenerator는 이름(binding)이고, 이 이름으로 Generator Function에 접근할 수 있어요.

2. Binding의 Scope와 Context

Generator Function 내부에서도 binding의 개념이 중요한데요:

Generator는 **실행을 멈춘 상태에서 변수와 컨텍스트(binding 상태)**를 유지합니다.
다시 실행될 때, 중단된 시점의 변수 값(binding 상태)을 그대로 사용합니다.
예를 들어:

```javascript
function* counter() {
  let count = 0; // count는 Generator의 내부 binding
  while (true) {
    yield count++;
  }
}

const gen = counter();
console.log(gen.next().value); // 0 (count는 0)
console.log(gen.next().value); // 1 (count가 1로 업데이트된 상태 유지)
```

이 예제에서 count라는 binding은 Generator가 멈추고 재실행되는 동안에도 저장돼 있습니다.

3. Binding 방식에 따른 차이

Generator Function은 선언(declaration) 또는 표현식(expression)을 통해 binding할 수 있어요.

Declaration 방식

Generator Function을 이름에 바인딩합니다.

바인딩된 이름은 해당 Generator를 호출하거나 사용할 때 쓰입니다.

```javascript
function* myGenerator() {
  yield 'A';
}
const gen = myGenerator(); // myGenerator라는 binding 사용
```

Expression 방식

Generator Function을 익명 함수로 생성하고, 다른 변수에 바인딩할 수 있습니다.

```javascript
const myGenerator = function* () {
  yield 'B';
};
const gen = myGenerator(); // myGenerator라는 binding 사용
```

4. 언어 정의 Binding (Language-defined Bindings)와 Generator
Generator 내부에서도 언어가 자동으로 만들어주는 binding이 있습니다. 예를 들어:

this: Generator Function 내부에서 사용할 수 있는 특별한 binding입니다.

컨텍스트를 활용해 상태를 유지합니다.

단어 설명

Declaration: 선언. 이름과 기능을 명시적으로 연결하는 방식.

Expression: 표현식. 익명 함수 등을 변수에 바인딩해 사용하는 방식.

Context: 실행 중인 함수의 상태와 변수들이 저장된 환경.

Scope: 스코프. binding이 접근 가능한 범위.

요약

Generator Function은 특정 이름에 바인딩될 뿐만 아니라, 내부 상태(변수)도 context로 유지하며 binding을 활용합니다. 

---

<img src="https://github.com/user-attachments/assets/de863d94-0958-4417-9e4f-49180d36109d" width="640" />


### Template Strings  
Template Strings은 ES6 (JavaScript 2016)에 나왔다.

Templates은 백틱으로 감싸인 문자열이다. (\`This is a template string\`)

template string 안에 single quote(')와 double quote(")를 사용할 수 있다.

```javascript
let text = `He's often called "Johnny"`;
```

### slice(i, j)
i에서 j-1까지의 문자열을 반환한다.

```javascript
let str = "Apple, Banana, Kiwi";
console.log(str.slice(7, 13));
// Banana
console.log(str.slice(-12, 13));
// Banana
console.log(str.slice(-12, -6));
// Banana
```

### substring(i, j)

slice와 비슷하지만 음수를 받을 수 없다.
받으면 0으로 처리한다.

```javascript
let str = "Apple, Banana, Kiwi";
console.log(1, str.substring(7, 13));
// 1 Banana
console.log(2, str.substring(-12, 13));
// 2 Apple, Banana
console.log(3, str.substring(-12, -6));
// 3 
```

### substr(i, length) ( deprecated )

i부터 length만큼의 문자열을 반환한다.

```javascript
let str = "Apple, Banana, Kiwi";
console.log(str.substr(7, 6));
// Banana
console.log(str.substr(-12, 6));
// Banana
console.log(str.substr(-12, -6));
// 
```

### 참고자료

- [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [w3schools](https://www.w3schools.com/js/default.asp)