
<img src= 'https://github.com/user-attachments/assets/4621b2f2-f1e1-4b47-b0c8-9e355ea46f37'
alt='naver' />

# WEB Client 기본 동작

네이버에 접속하려 한다. 그래서 주소창에 _www.naver.com_을 입력하고 엔터를 친다. 여느 때와 다름 없이 네이버 페이지가 로딩된다. 이미지가 보여지고, HTML에 CSS가 입혀진 모습이다. 버튼들이 각자의 역할을 수행하고 있다. 무슨 일이 일어난 것일까?

## 클라이언트와 서버

페이지를 내 브라우저에 띄울려면, 해당 페이지의 정보를 가지고 있어야 한다. 세상 모든 페이지의 정보를 내 컴퓨터에 안전하게 저장하는 것은 불가능할 것이다. 따라서 우리는, 고객이 페이지 정보를 요청할 때마다 주인장이 고객에게 페이지 정보를 전송하는 방법을 쓴다.<br>
여기서 당연히 고객이 `Client`, 주인장이 `Server`가 된다.<br>
`Browser`는 `Client`측에서 사용하는 Chrome, Edge와 같이 웹 엔진이 담긴 프로그램을 의미한다.

> Client: 어이 네이버! 맥주 한 잔 주쇼!<br>
> Server: 예. 여기 HTML과 CSS와 JS입니다.

## DNS(Domain Name System)

컴퓨터는 다른 컴퓨터에 무언가를 보내기 위해 IP를 알아야 한다. 따라서 _www.naver.com_에 무언가 보내라고 하면 못 알아듣는다. 그래서 이걸 들고 DNS에 가서 해당하는 IP를 물어본다.<br>
위처럼 단순한 과정이 아니었던 것이다.

> Client: 여기 주인장 이름이 뭐요?<br>
> DNS: 192.168.0.68 입니다.<br>
> CLient: 어이 192.168.0.68! 맥주 한 잔 주쇼!<br>
> Server(192.168.0.68): 예. 여기 HTML과 CSS와 JS입니다.

## TCP/IP

## Browser 페이지 파싱 순서

-   브라우저는 먼저 HTML을 읽어들인다. 그러면서 CSS stylesheets를 참조하는 `<link>` 엘리먼트와 스크립트들을 참조하는 `<script>`-엘리먼트를 발견하게 된다.
-   브라우저는 HTML을 읽어들이면서, 찾은 `<link>`나 `<script>` 태그에 대하여 서버에 다시 reqeust를 보낸다. 그리고 그 응답으로부터 CSS와 JavaScript를 읽어들인다.
-   브라우저는 읽어들인 HTML으로 in-memory [DOM(Document Object Model)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) tree를, CSS로부터 in-memory CSSOM을 생성한다. 그리고 JavaScript를 컴파일하고 실행한다.

이렇게 브라우저가 DOM tree와 CSSOM tree를 생성하고 JavaScript를 실행하면서, 페이지 정보가 창에 띄워지고, 사용자가 상호작용할 수 있게 된다.


---

### 참고 자료

- [How the web works - MDN](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)

