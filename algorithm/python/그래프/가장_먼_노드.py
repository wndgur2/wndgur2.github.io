'''
    이건 BFS?
'''
from collections import deque
def solution(n, edge):
    answer = 0
    graph = [[] for _ in range(n+1)]
    for l in edge:
        graph[l[0]].append(l[1])
        graph[l[1]].append(l[0])
    
    visited = set({1})
    q = deque([[1, 0]])
    maxC = 0
    while q:
        node, cost = q.popleft()
        for l in graph[node]:
            if not l in visited:
                q.append([l, cost+1])
                visited.add(l)
        if cost==maxC:
            answer += 1
        if cost>maxC:
            maxC = cost
            answer = 1
        
    return answer
print(solution(6, [[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]]))