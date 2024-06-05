'''
    최소비용으로 트리를 만드는 방법.
    
    시간 내에 직접 알고리즘을 작성하지 못해
    프림 알고리즘을 참고했다.

    링크들을 2차원 해시테이블로 저장한다.

    정복한 노드와 그렇지 않은 노드를 구분한다. => conqueredNodes
    정복한 노드에서 정복하지 않은 노드로 가는 링크들을 유지한다. => possibleLinks
    최소 비용 링크를 선택해 새로운 노드를 정복하고 정복함으로써 생기는 링크들을 possibleLinks에 추가한다. (정복하지 않은 노드로 가는 링크만)

    위처럼 구현하는 방법이 있는가 하면, 링크를 disable하는 방법도 있다.
    enabled 2차원 배열은 두 노드 사이의 링크가 사용 가능한지 표시한다.
    새로운 노드를 정복했을 때, 이 노드를 향한 다른 링크는 비활성화된다.(0) << GOOD!

    근데 노드의 번호가 0부터 시작하지 않을 수도 있으므로 이를 dictionary로 저장한다.
'''
def solution(n, costs):
    answer = 0
    graph = {}
    visited = {}
    for nodeA, nodeB, cost in costs:
        visited[nodeA] = False
        visited[nodeB] = False
        if nodeA in graph:
            graph[nodeA][nodeB] = [cost, True] #cost, enabled?
        else:
            graph[nodeA] = {nodeB: [cost, True]}
        if nodeB in graph:
            graph[nodeB][nodeA] = [cost, True]
        else:
            graph[nodeB] = {nodeA: [cost, True]}

    #initial values
    visited[costs[0][0]] = True
    conqueredNodes = [costs[0][0]]
    possibleLinks = [] #[nodeA, key, value] => [[nodeA, nodeB, [cost, enabled]]]
    for link in graph[conqueredNodes[0]].items():
        possibleLinks.append([conqueredNodes[0], *link])
    while possibleLinks: #[[nodeA, nodeB, [cost, enabled]]]
        #getMinimumCostLink
        minCost = min(possibleLinks, key= lambda x:x[2][0])
        newNodeIndex = possibleLinks.index(minCost)
        newLink = possibleLinks[newNodeIndex]

        #conquerNewNode (answer += cost)
        conqueredNodes.append(newLink[1])
        visited[newLink[1]] = True
        answer += newLink[2][0]
        #addNewPossibleLinks
        for link in graph[newLink[1]].items():
            possibleLinks.append([newLink[1]] + [*link]) #[nodeA, key, value] => [[nodeA, nodeB, [cost, enabled]]]

        #이미 정복했던 노드에서 새로 정복한 노드로 가는 링크들 비활성화
        i = 0
        while i < len(possibleLinks):
            if possibleLinks[i][1] == newLink[1]:
                possibleLinks.remove(possibleLinks[i])
                i -= 1
            elif visited[possibleLinks[i][1]]:
                possibleLinks.remove(possibleLinks[i])
                i -= 1
            i += 1

    return answer