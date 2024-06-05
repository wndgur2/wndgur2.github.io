'''
    기능
    1. 퍼즐 모양 파악하기 (최대 6개)
        : BFS로 11x11 정사각형에 모양 찍기(중앙부터 찍으면 어떤 모양이든 들어감.)
        : 퍼즐을 담는 최소 크기 배열로 변환.
            : 가로 길이 세고, 세로 길이 세기.
    2. 빈 칸 모양 파악하기
    3. 모양 비교하기
        : ==
    4. 퍼즐 90도 회전하기
        : x와 y 교환. x 뒤집기.
'''

from collections import deque

def rotate(arr):
    result = []
    for x in range(len(arr[0])):
        tempY = []
        for y in range(len(arr)):
            tempY.append(arr[y][x])
        result.append(tempY)
    #x => -x
    tresult = [deque([]) for _ in range(len(result))]
    for y in range(len(result)):
        for x in range(len(result[0])):
            tresult[y].appendleft(result[y][x])
    for y in range(len(tresult)):
        tresult[y] = list(tresult[y])
    return tresult

def getSize(ar):
    result = 0
    for a in ar:
        result += a.count(1)
    return result

def solution(game_board, table):
    q = deque([])
    puzzles = []
    #각 퍼즐 모양 저장
    for y in range(len(table)):
        for x in range(len(table[0])):
            if table[y][x]:
                tempShape = [[0 for _ in range(11)] for __ in range(11)]
                q.append((y, x))
                while q:
                    _y, _x = q.popleft()
                    table[_y][_x] = 0
                    tempShape[5 + _y - y][5 + _x - x] = 1
                    if _x > 0:
                        if table[_y][_x-1]:
                            q.append((_y, _x-1))
                    if _x < len(table[0])-1:
                        if table[_y][_x+1]:
                            q.append((_y, _x+1))
                    if _y > 0:
                        if table[_y-1][_x]:
                            q.append((_y-1, _x))
                    if _y < len(table)-1:
                        if table[_y+1][_x]:
                            q.append((_y+1, _x))
                puzzles.append(tempShape)
    
    holes = []
    #각 빈칸 모양 저장
    for y in range(len(game_board)):
        for x in range(len(game_board[0])):
            if game_board[y][x]==0:
                tempShape = [[0 for _ in range(11)] for __ in range(11)]
                q.append((y, x))
                while q:
                    _y, _x = q.popleft()
                    game_board[_y][_x] = 1
                    tempShape[5 + _y - y][5 + _x - x] = 1
                    if _x > 0:
                        if game_board[_y][_x-1]==0:
                            q.append((_y, _x-1))
                    if _x < len(game_board[0])-1:
                        if game_board[_y][_x+1]==0:
                            q.append((_y, _x+1))
                    if _y > 0:
                        if game_board[_y-1][_x]==0:
                            q.append((_y-1, _x))
                    if _y < len(game_board)-1:
                        if game_board[_y+1][_x]==0:
                            q.append((_y+1, _x))
                holes.append(tempShape)
    
    #각 퍼즐을 최소 크기로 변환
    # 0으로만 이루어진 행 제거
    for shape in puzzles:
        i=0
        while i < len(shape):
            if shape[i].count(1)==0:
                shape.pop(i)
                continue
            i += 1

    # 0으로만 이루어진 열 제거
    for shape in puzzles:
        i=0
        while i < len(shape[0]):
            found = 0 # 1을 찾았는가?
            for j in range(len(shape)): # j번 [y]에서 i번 x가 ..
                if shape[j][i]:
                    found = 1
                    break
            if found: # 1이 있다.
                i += 1
                continue
            for puzzle in shape: # 모든 y에서 i번 줄을 삭제하자.
                puzzle.pop(i)
    
    # for h in holes:
    #     for l in h:
    #         print(l)
    #     print("hole!")
    #각 빈칸을 최소 크기로 변환
    # 0으로만 이루어진 행 제거
    for shape in holes:
        i=0
        while i < len(shape):
            if shape[i].count(1)==0:
                shape.pop(i)
                continue
            i += 1
    

    # 0으로만 이루어진 열 제거
    for shape in holes:
        i=0
        while i < len(shape[0]):
            found = 0 # 1을 찾았는가?
            for j in range(len(shape)): # j번 [y]에서 i번 x가 ..
                if shape[j][i]:
                    found = 1
                    break
            if found: # 1이 있다.
                i += 1
                continue
            for puzzle in shape: # 모든 y에서 i번 줄을 삭제하자.
                puzzle.pop(i)

    #퍼즐 모양을 회전시켜 4배로 저장하기
    newPuzzles = []
    for puzzle in puzzles:
        newPuzzles.append(puzzle)
        for i in range(3):
            newPuzzles.append(rotate(newPuzzles[-1]))

    #모양과 빈칸을 비교하기
    answer = 0
    found = 0
    for i in range(0, len(newPuzzles), 4):
        for hole in holes:
            for j in range(4):
                if newPuzzles[i+j] == hole:
                    found = 1
                    holes.pop(holes.index(hole))
                    answer += getSize(newPuzzles[i+j])
                    break
            if found:
                break
        found = 0
    return answer

print(solution([[1,1,0,0,1,0],[0,0,1,0,1,0],[0,1,1,0,0,1],[1,1,0,1,1,1],[1,0,0,0,1,0],[0,1,1,1,0,0]], [[1,0,0,1,1,0],[1,0,1,0,1,0],[0,1,1,0,1,1],[0,0,1,0,0,0],[1,1,0,1,1,0],[0,1,0,0,0,0]]))