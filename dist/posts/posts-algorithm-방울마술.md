
## 20934\_방울마술 2024-05-09-15:23:41

### [문제 링크](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AY9QTGqqcckDFAVF)

### #구현

### 문제 요약

세 개의 컵과 하나의 공으로 야바위를 한다. 처음 공의 위치와 공이 이동한 횟수가 주어졌을 때, 공이 있을 확률이 가장 높은 컵을 출력하라. (여러개면 왼쪽)

| 입력 예 | 출력 예 |
| ------- | ------- |
| .o. 1   | 0       |
| o.. 1   | 1       |
| ..o 0   | 2       |

### 첫인상

익숙한 유형은 아니어서 규칙을 찾아보려고 했다.

### 풀이

공이 1번 이동할 때 각 컵 안에 있을 확률

    o.. => 0% 100% 0%
    .o. => 50% 0% 50%
    ..o => 0% 100% 0%

공이 이동할 때,  
가운데에서 이동하면 확률은 좌우로 반반씩 나뉜다.  
좌우에서 이동하면 확률은 가운데로 모인다.  
이 두 가지를 독립적으로 동시에 작동하도록 해서 해결했다.

### 시간 복잡도

연산 횟수는 공이 이동하는 횟수 $k$에 비례한다.  
$∴ O(k)$

### 회고

난이도가 쉬워서 재밌는 문제였다. 응용하면 복잡해질 수 있을 것 같다.

---

### Code

<!-- CODE-APPENDED:20934_방울마술.py -->
```python
"""

	20934_방울 마술 2024-05-09 15:23:41

"""
import sys
sys.stdin = open("input.txt", "r")

T = int(input())
for test_case in range(1, T + 1):
    possibility=[0, 0, 0]
    loc, K = input().split()
    loc = loc.find('o')
    possibility[loc] = 100
    K = int(K)
    for i in range(K):
        mid = possibility[1]
        side = possibility[0] + possibility[2]
        possibility[1] = side
        possibility[0] = mid/2
        possibility[2] = mid/2
    idx=0
    maximum = max(possibility)
    print("#" + str(test_case), end=" ")
    for pos in possibility:
        if(pos == maximum):
            print(idx)
            break
        idx+=1
```
