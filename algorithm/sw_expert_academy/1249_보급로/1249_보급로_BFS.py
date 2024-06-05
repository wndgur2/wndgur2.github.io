from collections import deque 

import sys
sys.stdin = open("input.txt", "r")

directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]

for test_case in range(1,int(input())+1):
    n = int(input())

    cost_map = [[int(__) for __ in input()] for _ in range(n)]
    dp = [[1e9]*n for _ in range(n)]

    branches = deque()
    branches.append((0,0))
    dp[0][0] = 0
    while(branches):
        y, x = branches.popleft()
        for dx, dy in directions:
            ny, nx = y+dx, x+dy
            if 0 <= nx < n and 0 <= ny < n:
                nc = dp[y][x]+cost_map[ny][nx]
                if (dp[ny][nx] > nc):
                    dp[ny][nx] = nc
                    branches.append((ny, nx))
    print(f'#{test_case} {dp[n-1][n-1]}')