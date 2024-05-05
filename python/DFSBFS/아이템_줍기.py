'''
    점마다 이동가능한지 테이블 유지
    50x50 테이블 유지
    0: 이동 불가. 초기값.
    1: 이동 가능.
    2: 이동 불가, 변경 불가: 직사각형 내부를 의미.
    1, 2는 직사각형 배열을 돌면서 추가.
'''
from collections import deque
def solution(rectangle, characterX, characterY, itemX, itemY):
    answer = 0
    mapTable = [[0 for _ in range(51)] for __ in range(51)]
    for r in rectangle:
        x1, y1, x2, y2 = r
        x1 *= 2
        x2 *= 2
        y1 *= 2
        y2 *= 2
        for x in range(x1, x2+1):
            if mapTable[y1][x] != 2:
                mapTable[y1][x] = 1
            if mapTable[y2][x] != 2:
                mapTable[y2][x] = 1
        for y in range(y1, y2+1):
            if mapTable[y][x1] != 2:
                mapTable[y][x1] = 1
            if mapTable[y][x2] != 2:
                mapTable[y][x2] = 1
        for y in range(y1+1, y2):
            for x in range(x1+1, x2):
                mapTable[y][x] = 2
    
    for m in mapTable:
        print(m)
    #BFS
    q = deque([(characterX*2, characterY*2, 1)])
    while q:
        x, y, cost = q.popleft()
        if (x==itemX*2) and (y==itemY*2):
            return int(cost/2)
        mapTable[y][x] = 2
        if mapTable[y][x-1]==1:
            q.append((x-1, y, cost+1))
        if mapTable[y][x+1]==1:
            q.append((x+1, y, cost+1))
        if mapTable[y-1][x]==1:
            q.append((x, y-1, cost+1))
        if mapTable[y+1][x]==1:
            q.append((x, y+1, cost+1))
    return answer
print(solution([[1,1,7,4],[3,2,5,5],[4,3,6,9],[2,6,8,8]],1,3,7,8))
