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