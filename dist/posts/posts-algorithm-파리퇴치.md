
## 12712\_파리퇴치 2024-07-04-18:31:07

### #구현

| 입력 예         |
| --------------- |
| 2               |
| 5 2             |
| 1 3 3 6 7       |
| 8 13 9 12 8     |
| 4 16 11 12 6    |
| 2 4 1 23 2      |
| 9 13 4 7 3      |
| 6 3             |
| 29 21 26 9 5 8  |
| 21 19 8 0 21 19 |
| 9 24 2 11 4 24  |
| 19 29 1 0 21 19 |
| 10 29 6 18 4 3  |
| 29 11 15 3 3 29 |

| 출력 예 |
| ------- |
| #1      |
| 64      |
| #2      |
| 157     |

---

### Code

<!-- CODE-APPENDED:12712_파리퇴치.py -->
```python
"""

	12712_파리퇴치 created at 2024-07-04-18:31:07

    1. N 은 5 이상 15 이하이다.
    2. M은 2 이상 N 이하이다.
    3. 각 영역의 파리 갯수는 30 이하 이다.

"""

import sys
sys.stdin = open("input.txt", "r")

global flies, N, M

def getKillableFlies(y, x):
    numOfFliesA = 0
    numOfFliesB = 0

    # +
    # row
    stX = x-(M-1) if x-(M-1)>=0 else 0
    endX = x+(M-1) if x+(M-1)<N else N-1
    numOfFliesA += sum([_ for _ in flies[y][stX:endX+1]])

    # col
    stY = y-(M-1) if y-(M-1)>=0 else 0
    endY = y+(M-1) if y+(M-1)<N else N-1
    for tmp_y in range(stY, endY+1):
        numOfFliesA += flies[tmp_y][x]
        
    numOfFliesA -= flies[y][x]

    # x
    # \
    stX = x
    stY = y
    for i in range(M):
        if x-i < 0:
            break
        if y-i < 0:
            break
        stX = x-i
        stY = y-i

    for i in range(M*2-1):
        if stX+i >= N:
            break
        if stY+i >= N:
            break
        numOfFliesB += flies[stY+i][stX+i]

    # /
    stX = x
    stY = y
    for i in range(M):
        if x-i < 0:
            break
        if y+i >= N:
            break
        stX = x-i
        stY = y+i

    for i in range(M*2-1):
        if stX+i >= N:
            break
        if stY-i < 0:
            break
        numOfFliesB += flies[stY-i][stX+i]

    numOfFliesB -= flies[y][x]

    return numOfFliesA if numOfFliesA > numOfFliesB else numOfFliesB

for test_case in range(1, int(input()) + 1):
    N, M = map(int, input().split())
    flies = []

    for i in range(N):
        flies.append(list(map(int, input().split())))

    maxFlies = 0

    for i in range(N):
        for j in range(N):
            killableFlies = getKillableFlies(i, j)
            maxFlies = killableFlies if killableFlies > maxFlies else maxFlies

    print(f'#{test_case} {maxFlies}')
```
