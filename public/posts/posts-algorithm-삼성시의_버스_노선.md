
## 6485\_삼성시의버스노선 2024-05-19-03:42:50

### [문제 링크](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AWczm7QaACgDFAWn)

### #구현 #스택

### 문제 요약

버스 노선 정보가 P개 주어진다. ex) 1~5 정류장까지 운행한다. 각 정류장들에 지나는 노선의 개수를 출력하라.

| 입력 예 |
| ------- |
| 1       |
| 2       |
| 1 3     |
| 2 5     |
| 5       |
| 1       |
| 2       |
| 3       |
| 4       |
| 5       |

| 출력 예      |
| ------------ |
| #1 1 2 2 1 1 |

### 풀이

시간 복잡도를 대강 계산해도 널널해서 모든 정류장의 노선 개수를 리스트에 저장하도록 구현했다.<br>
정류장의 번호 최대값인 5000번 정류장까지 담기 위해 5000개를 담는 리스트를 사용했다.<br>
노선 정보가 들어올 때마다 배열을 도는 것은 비효율적이므로 스택 구조를 이용해 정류장의 시작 지점과 끝 지점만 저장해 놓고,<br>
실제 노선 개수를 담는 수행은 5000개 인덱스를 한 번 돌게끔 했다.<br>
약 15분 소요했다.

---

### Code

<!-- CODE-APPENDED:6485_삼성시의버스노선.py -->
```python
'''
    500개 정류장이 0과 5000번사이에 분포

    범위 체크만 해놓고
    스택구조로 마지막에 +하고 -하면서 정리
    5000회 하고 500회

'''
import sys
sys.stdin = open("input.txt", "r")

for tc in range(1, int(input())+1):
    lane_n = int(input())

    laneStartEnd = [0] * 5000
    for i in range(lane_n):
        A, B = map(int, input().split())
        laneStartEnd[A-1] += 1
        if B < 5000:
            laneStartEnd[B] -= 1

    # print(*laneStartEnd)

    laneAmounts = [0]*5000
    cur_lanes = 0
    for i in range(5000):
        cur_lanes += laneStartEnd[i]
        laneAmounts[i] += cur_lanes
    
    stop_n = int(input())

    to_print = []
    for i in range(stop_n):
        to_print.append(int(input()))
    
    result = ""
    for i in to_print:
        result += str(laneAmounts[i-1]) + " "
    print(f'#{tc} {result[:-1]}')
```
