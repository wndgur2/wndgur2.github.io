'''
    링크에 방향성을 부여해야한다
    받는 링크의 수는 자신보다 위에 있는 노드의 수를 결정하고
    주는 링크의 수는 자신보다 밑에 있는 노드의 수를 결정한다.
    이건 연쇄적으로 발생한다.
    1->2->3이라면, 3 위에는 1과 2, 두 명이 존재한다.
    마찬가지로 1 밑에는 2와 3, 두 명이 존재한다.
    자신으로부터 위 또는 아래로 구분할 수 있는 노드가 두명이므로 자신의 순위를 확정할 수 있다.
    이 두명은 확정되지 않은 노드 -1 이다.
    3이 3등임이 확정되었으면, 1과 2를 봤을 때, 2도 순위를 확정할 수 있다.
    자신보다 위에 있는 노드가 1개이며, 확정되지 않은 노드-1 = 1이므로, 2등이다.

    그러니까, 각 노드에서 주는 링크와 받는 링크를 알아야 한다.
    이를 리스트로 구현한다.

    같은 방향으로만 탐색하는 BFS.
'''
from collections import deque
def solution(n, results):
    #n은 총 노드 수
    #results는 경기 결과들. 상성은 없다.
    answer = 0
    graph = [[[], []] for i in range(n+1)] #주는(이긴) 노드 배열, 받는(진) 노드 배열
    for a, b in results:
        graph[a][0].append(b)
        graph[b][1].append(a)
    for i in range(1, len(graph)):
        #BFS UP 이기는 사람 수
        visited = set({})
        q = deque([i])
        upwards = -1
        while q:
            node = q.popleft()
            upwards += 1
            for j in graph[node][0]:
                if not j in visited:
                    q.append(j)
                    visited.add(j)
        #BFS DOWN 지는 사람 수
        visited = set({})
        q = deque([i])
        downwards = -1
        while q:
            node = q.popleft()
            downwards += 1
            for j in graph[node][1]:
                if not j in visited:
                    q.append(j)
                    visited.add(j)
        
        # print(i, upwards, downwards)
        if upwards + downwards >= n-1:
            answer += 1
    return answer
# print(solution(5,[[4, 3], [4, 2], [3, 2], [1, 2], [2, 5]]))