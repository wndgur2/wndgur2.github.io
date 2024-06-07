'''
    트리니까 하나 자르면 무조건 두개로 나뉨
    모든 링크를 다 잘라보고,
    두 트리의 개수 차이를 세서 저장.
    가장 작은 차이 출력.
'''
def BFS(links, node):
    linkQueue = []
    visited = [False for _ in range(len(links))]
    linkQueue = links[node]
    count = 1
    for n in linkQueue:
        visited[n] = True
        count += 1
    visited[node] = True
    while linkQueue:
        # print("L: ", linkQueue)
        tempNode = linkQueue.pop(0)
        for n in links[tempNode]:
            if not visited[n]:
                visited[n] = True
                count += 1
                linkQueue.append(n)
    return count


def solution(n, wires):
    results = []
    #이 와이어 cut하고 a 트리와 b 트리 DFS해서 개수 차이 비교
    for a, b in wires:
        #Links 초기화
        links = [[] for _ in range(n+1)]
        for f, s in wires:
            links[f].append(s)
            links[s].append(f)

        links[a].remove(b)
        links[b].remove(a)
        resA = BFS(links, a)
        resB = BFS(links, b)
        results.append(int(((resA - resB)**2)**0.5))
        # results.append(BFS(links, a))
        # results.append(BFS(links, b))
    return min(results)