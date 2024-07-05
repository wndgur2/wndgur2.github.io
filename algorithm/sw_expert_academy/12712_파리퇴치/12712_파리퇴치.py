"""

	12712_파리퇴치 created at 2024-07-04-18:31:07

    1. N 은 5 이상 15 이하이다.
    2. M은 2 이상 N 이하이다.
    3. 각 영역의 파리 갯수는 30 이하 이다.

"""

import sys
sys.stdin = open("input.txt", "r")

global flies, N, M

def getKillableFlies(y, x):
    numOfFliesA = 0
    numOfFliesB = 0

    # +
    # row
    stX = x-(M-1) if x-(M-1)>=0 else 0
    endX = x+(M-1) if x+(M-1)<N else N-1
    numOfFliesA += sum([_ for _ in flies[y][stX:endX+1]])

    # col
    stY = y-(M-1) if y-(M-1)>=0 else 0
    endY = y+(M-1) if y+(M-1)<N else N-1
    for tmp_y in range(stY, endY+1):
        numOfFliesA += flies[tmp_y][x]
        
    numOfFliesA -= flies[y][x]

    # x
    # \
    stX = x
    stY = y
    for i in range(M):
        if x-i < 0:
            break
        if y-i < 0:
            break
        stX = x-i
        stY = y-i

    for i in range(M*2-1):
        if stX+i >= N:
            break
        if stY+i >= N:
            break
        numOfFliesB += flies[stY+i][stX+i]

    # /
    stX = x
    stY = y
    for i in range(M):
        if x-i < 0:
            break
        if y+i >= N:
            break
        stX = x-i
        stY = y+i

    for i in range(M*2-1):
        if stX+i >= N:
            break
        if stY-i < 0:
            break
        numOfFliesB += flies[stY-i][stX+i]

    numOfFliesB -= flies[y][x]

    return numOfFliesA if numOfFliesA > numOfFliesB else numOfFliesB

for test_case in range(1, int(input()) + 1):
    N, M = map(int, input().split())
    flies = []

    for i in range(N):
        flies.append(list(map(int, input().split())))

    maxFlies = 0

    for i in range(N):
        for j in range(N):
            killableFlies = getKillableFlies(i, j)
            maxFlies = killableFlies if killableFlies > maxFlies else maxFlies

    print(f'#{test_case} {maxFlies}')