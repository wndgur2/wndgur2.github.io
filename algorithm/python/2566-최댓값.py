size = 9
rows = [list(map(int, input().split())) for _ in range(size)]

max_value, max_row, max_col = -1, 0, 0
for row in range(len(rows)):
    for col in range(len(rows[row])):
        value = rows[row][col]
        if value > max_value:
            max_value = value
            max_row = row+1
            max_col = col+1

print(max_value)
print(max_row, max_col)
