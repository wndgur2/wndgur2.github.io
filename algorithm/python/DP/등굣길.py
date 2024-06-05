'''
    구하는 답이 최단경로의 개수임이 중요할 것 같다.
    따라서 완전탐색과 구분된다.
    중간에 최단경로가 아닌 경로는 배제해야한다.
    4방향으로 갈 수 있되,
    왔던길을 또 가면 최단이 아니다.
    처음 밟는 타일인데,
    누군가 밟았던 타일이라면 이 또한 최단이 아니다.( 각 타일까지의 비용을 최소로 유지한다. )
'''
# def seek(x, y, cost):
#     if costs[x][y] < cost:
#         return
#     global answer
#     if (x == width) and (y == height):
#         if cost < costs[x][y]:
#             costs[x][y] = cost
#             answer = 1
#         else:
#             answer += 1
#         return
#     costs[x][y] = cost
#     if x < width:
#         seek(x+1, y, cost+1)
#     if y < height:
#         seek(x, y+1, cost+1)

def solution(m, n, puddles):
    costs = [[0 for _ in range(n+1)] for __ in range(m+1)]
    costs[1][1] = 1
    for p in puddles:
        costs[p[0]][p[1]] = -1
    for y in range(1, n+1):
        for x in range(1, m+1):
            if costs[x][y] == -1:
                continue
            if y < n:
                if costs[x][y+1] != -1:
                    costs[x][y+1] += costs[x][y]
            if x < m:
                if costs[x+1][y] != -1:
                    costs[x+1][y] += costs[x][y]
    # for co in costs:
    #     print(co)
    return costs[m][n]%1000000007
# print(solution(4, 3, [[2, 2]]))
