"""

	1961_숫자배열회전 created at 2024-07-04-19:12:21

"""

import sys
sys.stdin = open("input.txt", "r")

for test_case in range(1, int(input()) + 1):
    N = int(input())
    initialArray = [list(map(int, input().split())) for _ in range(N)]
    rotations = []

    # 90 x0들이 y0, x1들이 y1, ...
    rotation = []
    for i in range(N):
        newLine = []
        for j in range(N):
            newLine.append(initialArray[N-1-j][i])
        rotation.append(newLine)
    rotations.append(rotation)
    
    # 180 중앙 대칭
    rotation = []
    for i in range(N):
        newLine = []
        for j in range(N):
            newLine.append(initialArray[N-1-i][N-1-j])
        rotation.append(newLine)
    rotations.append(rotation)

    # 270
    rotation = []
    for i in range(N):
        newLine = []
        for j in range(N):
            newLine.append(initialArray[j][N-1-i])
        rotation.append(newLine)
    rotations.append(rotation)
    
    print(f'#{test_case}')
    for i in range(N):
        for arr in rotations:
            print(*arr[i], end=" ", sep='')
        print()