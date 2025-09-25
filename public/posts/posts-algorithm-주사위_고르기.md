
# [문제](https://school.programmers.co.kr/learn/courses/30/lessons/258709?language=javascript)
## 문제 설명
A와 B가 n개의 주사위를 가지고 승부를 합니다. 주사위의 6개 면에 각각 하나의 수가 쓰여 있으며, 주사위를 던졌을 때 각 면이 나올 확률은 동일합니다. 각 주사위는 1 ~ n의 번호를 가지고 있으며, 주사위에 쓰인 수의 구성은 모두 다릅니다.

A가 먼저 n / 2개의 주사위를 가져가면 B가 남은 n / 2개의 주사위를 가져갑니다. 각각 가져간 주사위를 모두 굴린 뒤, 나온 수들을 모두 합해 점수를 계산합니다. 점수가 더 큰 쪽이 승리하며, 점수가 같다면 무승부입니다.

A는 자신이 승리할 확률이 가장 높아지도록 주사위를 가져가려 합니다.

다음은 n = 4인 예시입니다.

주사위	구성  

- 1:	[1, 2, 3, 4, 5, 6]  
- 2:	[3, 3, 3, 3, 4, 4]  
- 3:	[1, 3, 3, 4, 4, 4]  
- 4:	[1, 1, 4, 4, 5, 5]    

예를 들어 A가 주사위 #1, #2를 가져간 뒤 6, 3을 굴리고, B가 주사위 #3, #4를 가져간 뒤 4, 1을 굴린다면 A의 승리입니다. (6 + 3 > 4 + 1)  
A가 가져가는 주사위 조합에 따라, 주사위를 굴린 1296가지 경우의 승패 결과를 세어보면 아래 표와 같습니다.

| A의 주사위 |	승 |	무 |	패 |  
| --- | --- | --- | --- |
| #1, #2 |	596 |	196 |	504 |
|#1, #3 |	560 |	176 |	560 |
|#1, #4 |	616 |	184 |	496 |
|#2, #3 |	496 |	184 |	616 |
|#2, #4 |	560 |	176 |	560 |
|#3, #4 |	504 |	196 |	596 |

A가 승리할 확률이 가장 높아지기 위해선 주사위 #1, #4를 가져가야 합니다.

주사위에 쓰인 수의 구성을 담은 2차원 정수 배열 dice가 매개변수로 주어집니다. 이때, 자신이 승리할 확률이 가장 높아지기 위해 A가 골라야 하는 주사위 번호를 오름차순으로 1차원 정수 배열에 담아 return 하도록 solution 함수를 완성해 주세요. 승리할 확률이 가장 높은 주사위 조합이 유일한 경우만 주어집니다.

## 제한사항
- 2 ≤ dice의 길이 = n ≤ 10  
- n은 2의 배수입니다.  
- dice[i]는 i+1번 주사위에 쓰인 6개의 수를 담고 있습니다.  
- dice[i]의 길이 = 6  
- 1 ≤ dice[i]의 원소 ≤ 100

## 입출력 예
| dice | result |
| --- | --- |
| [[1, 2, 3, 4, 5, 6], [3, 3, 3, 3, 4, 4], [1, 3, 3, 4, 4, 4], [1, 1, 4, 4, 5, 5]]|[1, 4] |
| [[1, 2, 3, 4, 5, 6], [2, 2, 4, 4, 6, 6]]|[2] |
| [[40, 41, 42, 43, 44, 45], [43, 43, 42, 42, 41, 41], [1, 1, 80, 80, 80, 80], [70, 70, 1, 1, 70, 70]]|[1, 3] |

## 입출력 예 설명

### 입출력 예 #1

문제 예시와 같습니다.

### 입출력 예 #2

주사위 구성  
- 1:	[1, 2, 3, 4, 5, 6]  
- 2:	[2, 2, 4, 4, 6, 6]  

A가 주사위 #2를 가져갔을 때 승리할 확률이 가장 높습니다. A가 #2, B가 #1 주사위를 굴린 결과에 따른 승패는 아래 표와 같습니다.

| 주사위 결과 |	1 (B)|2 (B)|3 (B)|4 (B)|5 (B)|6 (B)|
| --- | --- | --- | --- | --- | --- | --- |
|2 (A)|	승|	무|	패|	패|	패|	패|
|2 (A)| 승| 무| 패| 패| 패| 패|
|4 (A)|	승|	승|	승|	무|	패|	패|
|4 (A)|	승|	승|	승|	무|	패|	패|
|6 (A)|	승|	승|	승|	승|	승|	무|
|6 (A)|	승|	승|	승|	승|	승|	무|

### 입출력 예 #3

주사위 구성  
- 1:  [40, 41, 42, 43, 44, 45]  
- 2:  [43, 43, 42, 42, 41, 41]  
- 3:  [1, 1, 80, 80, 80, 80]  
- 4:  [70, 70, 1, 1, 70, 70]  

A가 가져가는 주사위 조합에 따라, 주사위를 굴린 1296가지 경우의 승패 결과를 세어보면 아래 표와 같습니다.

| A의 주사위 | 승  | 무  | 패  |
|------------|-----|-----|-----|
| #1, #2     | 704 | 16  | 576 |
| #1, #3     | 936 | 24  | 336 |
| #1, #4     | 360 | 24  | 912 |
| #2, #3     | 912 | 24  | 360 |
| #2, #4     | 336 | 24  | 936 |
| #3, #4     | 576 | 16  | 704 |

따라서 A가 주사위 #1, #3을 가져갔을 때 승리할 확률이 가장 높습니다.

# 문제 풀이

조합과 시뮬레이션으로 접근하였고, 최대 연산 수가 약 150억(10C5 x 6^5 x 6^5)이 나와 최적화해야겠다고 생각했다.

먼저 A가 굴릴 주사위를 재귀로 선택했다.

나머지는 B의 주사위가 된다.

A와 B가 굴리는 모든 경우를 센다.

여기서 핵심은 중복 경우를 제거하는 것인데, 단순히 같은 주사위 조합일 경우 뿐만 아니라, 주사위의 조합이 다르더라도 주사위의 합이 같은 경우도 중복된 경우였다. (결과에는 반영해야하니 count를 1 더한다.) 결국 A와 B의 주사위의 합으로 비교를 하기 때문이다. => 주사위의 합으로 승패를 가린다는 내용을 문제에서 봤을 때 힌트가 될 거라고 느낄만 한 부분인 것 같다.

하지만 만약 주사위의 합이 모두 다르다면 똑같이 150억 연산을 할 것이다.

그래서 무조건 최악의 경우가 10억 이내에 들어야한다는 생각으로 풀기보다, 최선의 알고리즘을 찾는다는 생각으로 푸는 것이 맞지 않나 싶은데, 그러자니 확신 없이 풀어야한다는 단점도 있는 것 같다.

결국 문제 유형을 잘 이해하고 주어진 시간 내에 최선의 알고리즘을 찾아야하는 것 같다. (당연한 말)


# 코드

```javascript
function solution(dice) {
    var answer = [];
    let maxWins = 0
    
    pickDices(pick, [], -1)
    
    // 252
    function pickDices(callback, currentDices, flag){
        if(currentDices.length == dice.length/2){
            return callback(currentDices)
        }
        for(let i=flag+1; i<dice.length; i++){
            pickDices(callback, [...currentDices, i], i)
        }
    }
    
    function pick(dicesA){
        let winCount = 0
        let loseCount = 0
        
        // A has dicesA.
        // B has rest of it.
        const dicesB = []
        for(let i=0; i<dice.length; i++){
            if(dicesA.indexOf(i)!=-1) {
                continue
            }
            dicesB.push(i)
        }
        
        // roll
        const eyesA = getSumCounts(dicesA)
        const eyesB = getSumCounts(dicesB)
        
        eyesA.forEach((Acount, Asum)=>{
            eyesB.forEach((Bcount, Bsum)=>{
                if(Asum>Bsum){
                    winCount += Acount * Bcount
                    if(winCount > maxWins){
                        maxWins = winCount
                        answer = dicesA.map(v=>v+1)
                    }
                } else{
                    loseCount += Acount * Bcount
                }
            })
        })
    }
    
    function getSumCounts(dices){
        const sumCounts = new Map()
        rollDice(0, dices, 0, sumCounts)
        return sumCounts
    }
    
    function rollDice(currentSum, dices, index, sumCounts){
        if(index==dices.length){
            if(!sumCounts.has(currentSum))
                sumCounts.set(currentSum, 0)
            return sumCounts.set(currentSum, sumCounts.get(currentSum)+1)
        }
        for(let i=0; i<6; i++){
            rollDice(currentSum + dice[dices[index]][i], dices, index+1, sumCounts)
        }
    }
    
    return answer;
}

// 6C2 x 4C2 x 36 x 36
// 15 x 6 x 36 x 36 =~ 120000

// 10C5 x 6^5 x 6^5 =~ 150억
```