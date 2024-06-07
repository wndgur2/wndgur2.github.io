from sys import stdin
board = [list(map(int, stdin.readline().strip().split())) for _ in range(9)]


def sudokuF(board, zeros):
    if(len(zeros) == 0):
        return 0

    zero = zeros[0]
    boxN = set(range(1, 10))
    box = [zero[0]-zero[0] % 3, zero[1]-zero[1] % 3]

    for boxY in range(3):
        for boxX in range(3):
            boxN.discard(board[box[1]+boxY][box[0]+boxX])

    for tempY in range(9):
        boxN.discard(board[tempY][zero[0]])

    for intrsc in boxN.difference(set(board[zero[1]])):
        board[zero[1]][zero[0]] = intrsc
        zerosCopy = zeros.copy()
        zerosCopy.remove(zero)
        if(sudokuF(board, zerosCopy) == 0):
            return 0
        else:
            board[zero[1]][zero[0]] = 0


zeros = []
for y in range(9):
    for x in range(9):
        if(board[y][x] == 0):
            zeros.append([x, y])

sudokuF(board, zeros)

s = ""
for y in board:
    for x in y:
        s += str(x) + ' '
    s += '\n'
print(s, end='')
