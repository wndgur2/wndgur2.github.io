"""

	1949_등산로조성 created at 2024-05-18-16:37:31

    완전탐색 구현: 깎을위치(N(<=8)**2) * 깎을높이K(<=5)~0 * 출발지(N**2) * DFS(N*N) = 5 * 64 * 64 * 64 = 최대 대략 64만회

"""

import sys
sys.stdin = open("input.txt", "r")

directions = [[0,1], [1,0], [-1,0], [0, -1]]

global geo_map, N

def DFS(y, x, visited):
    string_coord = str(y)+str(x)
    if string_coord in visited:
        return 0
    visited.add(string_coord)
    res = 1
    for dy, dx in directions:
        ny = y + dy
        nx = x + dx
        if (0<=ny<N) and (0<=nx<N) and (geo_map[ny][nx]<geo_map[y][x]):
            res = max(res, 1+DFS(ny, nx, visited))
    visited.remove(string_coord)
    return res
    

for test_case in range(1, int(input()) + 1):
    N, K = map(int, input().split())

    geo_map = [list(map(int, input().split())) for _ in range(N)]

    max_height = 0
    for y in range(N):
        for x in range(N):
            if geo_map[y][x] > max_height:
                max_height = geo_map[y][x]

    starting_points = []
    for y in range(N):
        for x in range(N):
            if geo_map[y][x] == max_height:
                starting_points.append([y,x])
    max_length = 0
    for cutting_y in range(N):
        for cutting_x in range(N):
            for cutting_depth in range(K+1):
                geo_map[cutting_y][cutting_x] -= cutting_depth


                for y, x in starting_points:
                        length = DFS(y, x, set())
                        if length>max_length:
                            max_length = length
                    
                geo_map[cutting_y][cutting_x] += cutting_depth

    print(f'#{test_case} {max_length}')