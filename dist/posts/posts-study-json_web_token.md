
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/c5361105-709b-4404-96f8-64aa25557936">


# JWT(Json Web Token)

> 쿠키 인증 기법

1. 클라이언트가 로그인에 성공하면, 서버는 \*_JWT를 만들어_ 클라이언트에게 송신한다.
  - 로그인 정보, 로그인 정보를 비밀키로 암호화한 값(Signature), 해싱 방법, 만료 날짜를 묶은 JSON 데이터를 만든다. 이를 JWT라고 부른다.
  - JWT에 담긴 payload는 누구나 조회할 수 있기때문에 비밀 정보는 담으면 안된다.
  - 비밀키는 서버만 알아야 한다. 유효성 검사 시 다시 사용된다.

2. 이후 클라이언트는 요청 시 해당 JWT를 입장권으로 사용한다.

3. 서버는 수신한 JWT의 \**유효성 검사*를 진행하여 Authenticate한다.
  - _유효성 검사_(Validation): 수신한 JWT가 변조되었는지 확인한다.
  - Payload를 암호화한 결과가 Signature와 여전히 일치하는지 확인한다.
  - 만료 날짜가 지났는지 확인한다.
