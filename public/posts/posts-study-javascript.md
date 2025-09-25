
> Javascript의 내부 동작 방식을 정리했다.

# JIT (Just In Time) 컴파일러
Javascript는 JIT(Just In Time) 방식으로 코드를 컴파일하고 실행한다. JIT는 런타임에 코드를 컴파일한다는 의미이며, 코드를 파싱한 후 인터프리터 + 최적화가 더해진 과정이다. JIT 컴파일러는 코드를 실행하기 전에 최적화하여 성능을 향상시키며 프로그램의 적응력을 높인다.

컴파일 방식에 관해서는 컴파일러 + 인터프리터 + 최적화라고 이해하고 넘어갔다. (2025.06.23: 메모리 및 동작 환경을 이해하는 목적이므로)

![Image](https://github.com/user-attachments/assets/e0b597ae-ae1b-4ad8-b8c7-d7cd593d7be3)

# Javascript, Under the Hood

> Javascript runtime을 이해하는 데에 많은 도움이 되는 영상 [Scotland JS](https://vimeo.com/96425312)

## Javascript / Javascript runtime
Javascript는 프로그래밍 언어로, 웹 브라우저에서 실행되는 스크립트 언어이다. Javascript runtime은 Javascript 코드를 실행하는 환경을 의미한다. 대표적인 Javascript runtime으로는 웹 브라우저가 있다.

Javascript는 Heap과 Call Stack을 사용하여 메모리를 관리한다.


## Call Stack
Call Stack은 함수 호출을 관리하고 원시 타입을 저장하는 곳이다. 함수가 호출될 때마다 스택에 쌓이고, 함수 실행이 끝나면 스택에서 제거된다. Call Stack은 LIFO(Last In First Out) 구조로 동작한다.


## Heap
Heap은 객체를 저장하는 곳이다. Call Stack과 달리 객체는 참조 타입으로 저장되며, 메모리 할당과 해제를 자동으로 관리한다(gc).

여기까지는 Javascript에서 기본적으로 사용하는 메모리 구조이다. 이제 Javascript runtime에서 Web API와 이벤트 루프, 태스크 큐를 살펴보자.

## Web API
Web API는 브라우저에서 제공하는 API로, 비동기 작업을 처리할 수 있게 해준다. 예를 들어, setTimeout, fetch, DOM 이벤트 등이 있다. Web API는 Call Stack과 별도로 실행되며, 비동기 작업이 완료되면 Task Queue에 작업을 추가한다.

## Task Queue
Task Queue는 Web API에서 비동기 작업이 완료되었을 때, 해당 작업을 Call Stack으로 가져오기 위해 대기하는 큐이다. Task Queue에 있는 작업은 Call Stack이 비어있을 때 Event Loop에 의해 실행된다. (Call Stack으로 옮겨진다.) Task Queue는 FIFO(First In First Out) 구조로 동작한다.

## Event Loop
Event Loop는 Call Stack과 Task Queue를 연결하는 역할을 한다. Call Stack이 비어있을 때, Task Queue에 있는 작업을 Call Stack으로 가져와 실행한다. 이를 통해 비동기 작업을 처리할 수 있다.

이를 도식화하면 아래와 같다.

![Image](https://github.com/user-attachments/assets/d91142a0-fb35-453c-88ea-de490b67d0b4)