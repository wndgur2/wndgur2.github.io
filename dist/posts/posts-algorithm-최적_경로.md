
## 1247\_최적경로 2024-05-16-13:50:09

### [문제 링크](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV15OZ4qAPICFAYD)

### #완전탐색 #DFS #순열

### 문제 요약

좌표 (0,0) ~ (100,100)에 회사와 집, 그리고 N명의 고객 좌표가 주어진다. 회사에서 집에 가는 길에, 모든 고객을 거쳐 오는 최단거리를 구하시오.

| 입력 예                                                             |
| ------------------------------------------------------------------- |
| 3                                                                   |
| 5                                                                   |
| 0 0 100 100 70 40 30 10 10 5 90 70 50 20                            |
| 6                                                                   |
| 88 81 85 80 19 22 31 15 27 29 30 10 20 26 5 14                      |
| 10                                                                  |
| 39 9 97 61 35 93 62 64 96 39 36 36 9 59 59 96 61 7 64 43 43 58 1 36 |

| 출력 예 |
| ------- |
| #1 200  |
| #2 304  |
| #3 366  |

### 풀이

N개의 고객을 방문하는 조합을 구하고, 그 거리에 집과 회사를 포함해 최단거리를 찾았다.  
시간 복잡도는 N명의 고객을 방문하는 순열의 개수이다.  
$∴ O(N!)$

간단한 문제였는데 한 시간 이상 걸렸다. N개의 순열을 구하는데 bfs로 했더니 메모리 초과가 났다. dfs로 수정해서 해결했다.

---

### Code

<!-- CODE-APPENDED:1247_최적경로.py -->
```python
"""

	1247_최적경로 created at 2024-05-16 13:50:09

"""

import sys
sys.stdin = open("input.txt", "r")

for test_case in range(1, int(input()) + 1):
    N = int(input())
    xys = list(map(int, input().split()))
    company = [xys[0], xys[1]]
    home = [xys[2], xys[3]]
    nodes = [home]
    isX = True
    for xy in xys[4:]:
        if(isX):
            nodes.append([xy])
        else:
            nodes[-1].append(xy)
        isX = not isX
    nodes.append(company)

    # 완전 탐색
    # n-1 순회하기
    # [0, 2~n+1 조합, 1]
    
    min_cost = 2e9
    branches = [[0]]
    routes = []
    while branches:
        branch = branches.pop()
        if len(branch) == N+1:
            branch = branch + [N+1]
            cost = 0
            for i in range(N+1):
                cost += abs(nodes[branch[i]][0] - nodes[branch[i+1]][0])\
                    + abs(nodes[branch[i]][1] - nodes[branch[i+1]][1])
            if cost<min_cost:
                min_cost = cost
            continue
        for i in range(N+1):
            if i not in branch:
                branches.append(branch + [i])


    print(f'#{test_case} {min_cost}')
```
