
## 1206_view 2024-05-10-11:42:36

### [문제 링크](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV134DPqAA8CFAYh)

### #구현

### 문제 요약

빌딩의 개수와 높이가 주어진다. 가로로 2칸 이상 다른 빌딩이 없을 때, 조망권이 확보되었다고 하자. 조망권이 확보된 세대 수를 구하시오.

| 입력 예                           |
| --------------------------------- |
| 10                                |
| 0 0 254 185 76 227 84 175 0 0     |
| 10                                |
| 0 0 251 199 176 27 184 75 0 0     |
| 11                                |
| 0 0 118 90 243 178 99 100 200 0 0 |

| 출력 예 |
| ------- |
| #1 111  |
| #2 60   |
| #3 165  |

### 첫인상

구현으로 할 수 있을 것 같다.

### 풀이

단순 구현으로 앞에서부터 5개의 빌딩의 높이를 비교했다. 최고 높이와 두 번째 높이를 필요로 했으며, 가장 높은 빌딩이 비교한 5개의 빌딩 중 가운데일 경우 정답에 최고높이-2등높이를 더했다.

### 시간 복잡도

연산은 빌딩의 수와 비례한다.  
$∴ O(N)$

### 회고

단순 구현이어서 빠르게 풀었다. 실수를 하지 않은 것은 다행이었다.

---

### Code

<!-- CODE-APPENDED:1206_view.py -->
```python
"""

	1206_view 2024-05-10 11:42:36

"""

import sys
sys.stdin = open("input.txt", "r")

T = 10
for test_case in range(1, T + 1):
    '''
        이 부분에 여러분의 알고리즘 구현이 들어갑니다.
    '''
    n = int(input())
    buildings = list(map(int, input().split()))
    answer = 0

    for i in range(n-4):
        highest = 0
        second = 0
        for b in [buildings[i+j] for j in range(5)]:
            if(b >= highest):
                second = highest
                highest = b
            elif(b > second):
                second = b
        if highest == buildings[i+2]:
            answer += highest - second
    print('#'+str(test_case), end=' ')
    print(answer)
```
