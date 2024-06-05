"""

	1249_보급로 created at 2024-05-10 14:41:59

    대표적인 가중치를 이용한 백트래킹 문제?

    recursion DFS 메모리 초과 -> while문 DFS

    while문 DFS 시간 초과 -> x, y 탐색 방향 수정 (-, - => +, +)

"""

import sys
sys.stdin = open("input.txt", "r")

directions = [(-1, 0), (0, -1), (1, 0), (0, 1)]

for test_case in range(1, int(input()) + 1):
    size = int(input())
    cost_map = [list(map(int, list(input()))) for _ in range(size)]
    dp = [[1e9]*size for _ in range(size)]
    dp[0][0] = 0
    branches = [[0, 0]]
    while branches:
        y, x = branches.pop() # O(1)

        if dp[y][x] > dp[size-1][size-1]:
            continue
        
        for dy, dx in directions:
            ny, nx = y+dy, x+dx
            if (0<=ny<size) and (0<=nx<size):
                if (dp[ny][nx] > dp[y][x]+cost_map[ny][nx]):
                    dp[ny][nx] = dp[y][x]+cost_map[ny][nx]
                    branches.append([ny, nx])

    print(f'#{test_case} {dp[size-1][size-1]}')

