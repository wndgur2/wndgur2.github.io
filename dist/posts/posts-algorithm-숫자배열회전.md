
## 1961\_숫자배열회전 2024-07-04-19:12:21

### [문제 링크]()

### #구현

| 입력 예     |
| ----------- |
| 2           |
| 3           |
| 1 2 3       |
| 4 5 6       |
| 7 8 9       |
| 6           |
| 6 9 4 7 0 5 |
| 8 9 9 2 6 5 |
| 6 8 5 4 9 8 |
| 2 2 7 7 8 4 |
| 7 5 1 9 7 9 |
| 8 9 3 9 7 6 |

| 출력 예              |
| -------------------- |
| #1                   |
| 741 987 369          |
| 852 654 258          |
| 963 321 147          |
| #2                   |
| 872686 679398 558496 |
| 952899 979157 069877 |
| 317594 487722 724799 |
| 997427 894586 495713 |
| 778960 562998 998259 |
| 694855 507496 686278 |

---

### Code

<!-- CODE-APPENDED:1961_숫자배열회전.py -->
```python
"""

	1961_숫자배열회전 created at 2024-07-04-19:12:21

"""

import sys
sys.stdin = open("input.txt", "r")

for test_case in range(1, int(input()) + 1):
    N = int(input())
    initialArray = [list(map(int, input().split())) for _ in range(N)]
    rotations = []

    # 90 x0들이 y0, x1들이 y1, ...
    rotation = []
    for i in range(N):
        newLine = []
        for j in range(N):
            newLine.append(initialArray[N-1-j][i])
        rotation.append(newLine)
    rotations.append(rotation)
    
    # 180 중앙 대칭
    rotation = []
    for i in range(N):
        newLine = []
        for j in range(N):
            newLine.append(initialArray[N-1-i][N-1-j])
        rotation.append(newLine)
    rotations.append(rotation)

    # 270
    rotation = []
    for i in range(N):
        newLine = []
        for j in range(N):
            newLine.append(initialArray[j][N-1-i])
        rotation.append(newLine)
    rotations.append(rotation)
    
    print(f'#{test_case}')
    for i in range(N):
        for arr in rotations:
            print(*arr[i], end=" ", sep='')
        print()
```
