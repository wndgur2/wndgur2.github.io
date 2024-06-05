'''
    #! 하나의 이진트리이다.
    노드의 개수는 최대 17, 제한시간 10초.
    - 최대 홉수를 100으로 적용한 완전탐색 시도 => 3^100으로 시간초과
    - 최소 늑대비용 양노드 찾는 알고리즘 시도 => 최소 늑대비용 양노드 중에서도 순서가 의미가 있어서 실패. 12/18 (첨부사진 같은 경우)
    - BFS
'''
def search(idx, visited, sheeps, wolfs):
    global answers, info_global, graph
    if info_global[idx]:
        wolfs += 1
    else:
        sheeps += 1
    if sheeps == wolfs:
        answers.append(sheeps)
        return
    visited.add(idx)
    for node in list(visited):
        for i in graph[node]:
            if not i in visited:
                search(i, visited.copy(), sheeps, wolfs)
    answers.append(sheeps)


def solution(info, edges):
    global graph, info_global, answers
    answers = []
    graph = [[] for _ in range(len(info))]
    for p, c in edges:
        graph[p].append(c)
        graph[c].append(p)
    info_global = info

    search(0, set({}), 0, 0)
    return max(answers)
