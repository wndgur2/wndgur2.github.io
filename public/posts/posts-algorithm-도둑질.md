
# [문제](https://school.programmers.co.kr/learn/courses/30/lessons/42897?language=javascript#)
## 문제 설명
도둑이 어느 마을을 털 계획을 하고 있습니다. 이 마을의 모든 집들은 아래 그림과 같이 동그랗게 배치되어 있습니다.

![Image](https://github.com/user-attachments/assets/577a0a63-9bc7-4e21-b93d-2cccd32f4221)

각 집들은 서로 인접한 집들과 방범장치가 연결되어 있기 때문에 인접한 두 집을 털면 경보가 울립니다.

각 집에 있는 돈이 담긴 배열 `money`가 주어질 때, 도둑이 훔칠 수 있는 돈의 최댓값을 return 하도록 `solution` 함수를 작성하세요.

## 제한사항
- 이 마을에 있는 집은 3개 이상 1,000,000개 이하입니다.  
- `money` 배열의 각 원소는 0 이상 1,000 이하인 정수입니다.  

## 입출력 예
| money     | return |
| --------- | ------ |
| [1, 2, 3, 1] | 4 |

# 문제 풀이

전형적인 dp로 보였으나, 배열이 순환한다는 로직이 추가되었다.

그래서 단순히 이전걸 쌓아가는것 뿐만 아니라, 마지막 원소에선 첫 원소를 선택하지 않았을 경우를 추가해야한다.

그래서 첫 분기를 첫 원소를 선택한 경우와 선택하지 않은 경우로 나누었고,
두번째 분기를 해당 원소를 선택한 경우와 선택하지 않은 경우로 나누어
총 4개의 분기가 생겼다.

그런데 효율성 테스트가 실패했다.
여기서 시간복잡도는 더 줄일 수 없다고 느꼈고,
dp 과정을 보니 index를 i와 i-1밖에 사용하지 않길래 dp를 두개만 유지하는 방법을 썼다. (왔다갔다 쓰기)

왜 처음 원소를 선택하지 못하는 경우를 처음부터 처리했는가?

이 부분은 내가 가장 효율적으로 풀이했는지는 확신하지 못한다.  
boolean 값 두개로 대체할 수도 있을 것 같다.  
그래도 고려한 경우를 늘리는 것이 dp에서 예외를 처리하는 가장 확실한 방법인 것 같다.

# 코드
```javascript

function solution(money) {
    const length = money.length
    const dpA = [0,0,0,0]
    const dpB = [0,0,0,0]
    const dps = [dpA, dpB]
    let curDp, prevDp
    
    dpA[0] = money[0]
    
    for(let i=1; i<length; i++){
        curDp = dps[i%2]
        prevDp = dps[(i+1)%2]
        
        // 0을 뽑은 경우
        curDp[0] = prevDp[1] + money[i]
        curDp[1] = max(prevDp[0], prevDp[1])
        
        // 0을 안 뽑은 경우
        curDp[2] = prevDp[3] + money[i]
        curDp[3] = max(prevDp[2], prevDp[3])
        
    }
    
    curDp[0] -= money[0]
    
    const a = max(curDp[0], curDp[1])
    const b = max(curDp[2], curDp[3])
    
    
    return max(a, b)
}
    
function max(a, b){
    if(a>b) return a
    else return b
}

```