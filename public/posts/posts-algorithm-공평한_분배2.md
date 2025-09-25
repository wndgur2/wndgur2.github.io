
## 20728\_공평한분배2 2024-05-19-00:46:40

### [문제 링크](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AY6cg0MKeVkDFAXt)

### #정렬

### 문제 요약

총 사탕 주머니의 개수와, 뽑는 사탕 주머니 개수 K이 주어진다. 이후 각 사탕 주머니에 들어있는 사탕 수가 주어진다. K개의 사탕 주머니를 뽑아, 사탕이 가장 많이 들어있는 주머니와 가장 적게 들어있는 주머니의 개수 차이가 최소가 되도록 뽑으면, 그 차이가 몇 개인지 구하라.

| 입력 예   |
| --------- |
| 4         |
| 3 2       |
| 1 2 3     |
| 3 3       |
| 5 20 10   |
| 4 3       |
| 4 3 2 1   |
| 5 3       |
| 1 2 3 4 5 |

| 출력 예 |
| ------- |
| #1 1    |
| #2 15   |
| #3 2    |

### 풀이

사탕 개수 순으로 주머니를 정렬한 후, K 간격에 있는 주머니들의 차이의 최솟값을 구했다.

뽑는 사탕 주머니 개수 $K$  
총 사탕 주머니의 개수 $N$  
$∴ O(N - K)$

---

### Code

<!-- CODE-APPENDED:20728_공평한분배.py -->
```python
"""

	20728_공평한분배 created at 2024-05-19-00:46:40

"""

import sys
sys.stdin = open("input.txt", "r")

for test_case in range(1, int(input()) + 1):
    N, M = map(int, input().split())
    candies = list(map(int, input().split()))
    candies.sort()
    dif = 2e9
    for i in range(0, len(candies)-M+1):
        cur_dif = candies[i+M-1] - candies[i]
        if cur_dif < dif:
            dif = cur_dif
    print(f'#{test_case} {int(dif)}')
```
