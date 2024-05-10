"""

	1249_보급로 created at 2024-05-10 14:41:59

    대표적인 가중치를 이용한 백트래킹 문제?

    recursion DFS 메모리 초과 -> while문 DFS

    while문 DFS 시간 초과 -> x, y 탐색 방향 수정 (-, - => +, +)

"""

import sys
sys.stdin = open("input.txt", "r")

T = int(input())
for test_case in range(1, T + 1):
    size = int(input())
    cost_map = [list(map(int, list(input()))) for _ in range(size)]
    min_stacked_cost_map = [[-1 for __ in range(size)] for _ in range(size)]

    branches = [[0, 0, 0]]
    while branches:
        y, x, cost = branches.pop() # O(1)
        if (cost < min_stacked_cost_map[y][x]) or (min_stacked_cost_map[y][x]==-1):
            min_stacked_cost_map[y][x] = cost
        else:
            continue
        if (min_stacked_cost_map[size-1][size-1]!=-1) and (cost > min_stacked_cost_map[size-1][size-1]):
            continue
        if (y==size-1) and (x==size-1):
            continue
        if y>0:
            branches.append([y-1, x, cost+cost_map[y-1][x]])
        if x>0:
            branches.append([y, x-1, cost+cost_map[y][x-1]])
        if y<size-1:
            branches.append([y+1, x, cost+cost_map[y+1][x]])
        if x<size-1:
            branches.append([y, x+1, cost+cost_map[y][x+1]])

    print('#'+str(test_case), min_stacked_cost_map[size-1][size-1])