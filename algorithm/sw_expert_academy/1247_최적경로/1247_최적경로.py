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