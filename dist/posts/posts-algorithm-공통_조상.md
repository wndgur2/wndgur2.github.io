
## 1248\_공통조상 2024-05-16-13:06:38

### [문제 링크](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV15PTkqAPYCFAYD)

### #트리

### 문제 요약

이진 트리가 주어진다. 주어진 두 정점의 가장 가까운 공통 조상을 구하고, 공통 조상을 루트로 하는 서브트리의 크기를 구하라.

| 입력 예                                              |
| ---------------------------------------------------- |
| 10                                                   |
| 13 12 8 13                                           |
| 1 2 1 3 2 4 3 5 3 6 4 7 7 12 5 9 5 8 6 11 6 10 11 13 |

| 출력 예 |
| ------- |
| #1 3 8  |
| #2 1 10 |

### 풀이

트리를 dictionary를 이용해 구현했다. parent 노드는 하나, children은 여럿이므로 각각 다른 dictionary에서 관리했다.

a, b의 공통 조상은 a의 부모를 따라가며 a의 모든 조상을 구하고 이를 set에 보관했다.(set의 find 시간 복잡도 O(1)이므로)
그다음 b의 조상을 따라가며 set에 있는지 확인했다.

그렇게 찾은 공통 조상을 루트로 하는 서브트리 크기는, children dictionary를 따라가며 DFS 완전탐색했다.

$∴ O(V)$ ($V$=amount of vertexes)

---

### Code

<!-- CODE-APPENDED:1248_공통조상.py -->
```python
"""

	1248_공통조상 created at 2024-05-16 13:06:38

"""

import sys
sys.stdin = open("input.txt", "r")

for test_case in range(1, int(input()) + 1):
    V, E, a, b = map(int, input().split())

    # 1~V 정점 트리 만들기
    # 위상 정렬?
    # 모든 노드는 parent 엣지가 최대 하나다.
    # dictionary 형으로 구현해보기

    parentOf = {} # key의 parent 노드는 value.
    childrenOf = {} # key의 children은 value[].
    
    isParent = True
    for node in map(int, input().split()):
        if isParent:
            parent = node
        else:
            parentOf[node] = parent
            if parent in childrenOf:
                childrenOf[parent].append(node)
            else:
                childrenOf[parent] = [node]
        isParent = not isParent

    # a, b 공통 조상 찾기
    # a의 조상을 모두 찾아놓고
    # b의 조상을 iterate하며 있는지 확인
    # 최대 depth가 9999이므로 시간 내에 가능
    a_parents = set()
    cur_node = a
    while cur_node:
        a_parents.add(cur_node)
        if cur_node in parentOf:
            cur_node = parentOf[cur_node]
        else:
            cur_node = 0
    
    cur_node = b
    while cur_node:
        if cur_node in a_parents:
            common_parent = cur_node
            break
        if cur_node in parentOf:
            cur_node = parentOf[cur_node]
        else:
            cur_node = 0

    size = 0
    branches = [common_parent]
    while branches:
        size += 1
        node = branches.pop()
        if node in childrenOf:
            for n in childrenOf[node]:
                branches.append(n)

    print(f'#{test_case} {common_parent} {size}')
```
