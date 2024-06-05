def dfs(i, isRoot):
    global res
    if i >= len(visited):
        return
    if visited[i]:
        dfs(i+1, 1)
        return
    visited[i] = 1
    for c in range(len(cArray[i])):
        if cArray[i][c] and not visited[c]:
            dfs(c, 0)
    if isRoot:
        res += 1
        dfs(i+1, 1)
    
def solution(n, computers):
    global visited, cArray, res
    res = 0
    visited = [0 for _ in range(n)]
    cArray = computers
    dfs(0, 1)
    return res

print(solution(3, [[1, 1, 0], [1, 1, 0], [0, 0, 1]])) #2
print(solution(3, [[1, 1, 0], [1, 1, 1], [0, 1, 1]])) #1