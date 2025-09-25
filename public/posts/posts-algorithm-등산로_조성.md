
## 1949\_등산로조성 2024-05-18-16:37:31

### [문제 링크](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV5PoOKKAPIDFAUq)

### #DFS #완전탐색

### 문제 요약

땅의 높이가 2차원 배열로 주어진다. 여기에 등산로를 만들기 위해, 가장 높은 곳부터, 주변 낮은 땅으로만 길을 만든다고 하자. 한 좌표의 높이를 최대 K만큼 깎는 공사를 할 수 있다. 이 때 만들 수 있는 가장 긴 등산로를 구하시오

| 입력 예   |
| --------- |
| 11        |
| 5 1       |
| 9 3 2 3 2 |
| 6 3 1 7 5 |
| 3 4 8 9 9 |
| 2 3 7 7 7 |
| 7 6 5 5 8 |

| 출력 예 |
| ------- |
| 1 6     |

### 풀이

map 크기 N과 최대 공사 깊이 K가 작아 완전탐색했다.<br>
visited 변수를 set로 만들기 위해 좌표를 문자열로 보관했다. [1,1] -> "11"<br>
문제 해석 과정에서, 출발 위치의 좌표가 산을 깎기 전, 가장 높은 곳으로 선정된다는 것을 모르고,<br>
산을 깎고 나서 가장 높은 곳부터 출발할 수 있다고 오인해 51개 test 중 계속 50개만 맞았다.

$∴ O(K*N^4)$

---

### Code

<!-- CODE-APPENDED:1949_등산로조성.py -->
```python
"""

	1949_등산로조성 created at 2024-05-18-16:37:31

    완전탐색 구현: 깎을위치(N(<=8)**2) * 깎을높이K(<=5)~0 * 출발지(N**2) * DFS(N*N) = 5 * 64 * 64 * 64 = 최대 대략 64만회

"""

import sys
sys.stdin = open("input.txt", "r")

directions = [[0,1], [1,0], [-1,0], [0, -1]]

global geo_map, N

def DFS(y, x, visited):
    string_coord = str(y)+str(x)
    if string_coord in visited:
        return 0
    visited.add(string_coord)
    res = 1
    for dy, dx in directions:
        ny = y + dy
        nx = x + dx
        if (0<=ny<N) and (0<=nx<N) and (geo_map[ny][nx]<geo_map[y][x]):
            res = max(res, 1+DFS(ny, nx, visited))
    visited.remove(string_coord)
    return res
    

for test_case in range(1, int(input()) + 1):
    N, K = map(int, input().split())

    geo_map = [list(map(int, input().split())) for _ in range(N)]

    max_height = 0
    for y in range(N):
        for x in range(N):
            if geo_map[y][x] > max_height:
                max_height = geo_map[y][x]

    starting_points = []
    for y in range(N):
        for x in range(N):
            if geo_map[y][x] == max_height:
                starting_points.append([y,x])
    max_length = 0
    for cutting_y in range(N):
        for cutting_x in range(N):
            for cutting_depth in range(K+1):
                geo_map[cutting_y][cutting_x] -= cutting_depth


                for y, x in starting_points:
                        length = DFS(y, x, set())
                        if length>max_length:
                            max_length = length
                    
                geo_map[cutting_y][cutting_x] += cutting_depth

    print(f'#{test_case} {max_length}')
```
