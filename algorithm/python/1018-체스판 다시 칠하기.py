def minimunPaintFromBoard(board):
    check = 0
    #board에서 새로 칠해야하는 칸수 리턴
    nB1 = 0
    nW1 = 0
    nB2 = 0
    nW2 = 0
    for row in range(8):
        for col in range(row%2, 8, 2):
            if(board[row][col]=='B'):
                nB1 += 1
            else:
                nW1 += 1
    for row in range(8):
        for col in range((row+1)%2, 8, 2):
            if(board[row][col]=='B'):
                nB2 += 1
            else:
                nW2 += 1
    change1 = nB1 + nW2
    change2 = nB2 + nW1
    if(change1 > change2):
        return change2
    else:
        return change1

rows, cols = list(map(int, input().split()))
min = 32
rowColors = []
for i in range(rows):
    rowColors.append(input())
for row in range(rows-7):
    for col in range(cols-7):
        tempBoard = []
        for i in range(row, row+8):
            tempRow = []
            for j in range(col, col+8):
                tempRow.append(rowColors[i][j])
            tempBoard.append(tempRow)
        tempN = minimunPaintFromBoard(tempBoard)
        if(tempN < min):
            min = tempN
print(min)