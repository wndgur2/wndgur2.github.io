row, col = map(int, input().split())

matrix_a = [list(map(int, input().split())) for _ in range(row)]
matrix_b = [list(map(int, input().split())) for _ in range(row)]

for r in range(row):
    row_string = ""
    for c in range(col):
        row_string += str(matrix_a[r][c] + matrix_b[r][c])
        row_string += ' '
    print(row_string.strip())