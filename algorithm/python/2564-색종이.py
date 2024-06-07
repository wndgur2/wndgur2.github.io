'''
    100x100에 10x10 색종이 붙이기
'''

n = int(input())

paper = [[False for _ in range(100)] for __ in range(100)]

for i in range(n):
    y, x = map(int, input().split())
    for row in range(y, y+10):
        for col in range(x, x+10):
            paper[row][col] = True

black_sum = 0
for row in paper:
    black_sum += row.count(True)
print(black_sum)