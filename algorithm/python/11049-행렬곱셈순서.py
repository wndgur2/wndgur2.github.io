"""
  TODO 500x500 array. arr[i][j]에는 i부터 j까지 행렬을 곱할 때 드는 최소 연산 횟수.

"""
count = [ [0 for _ in range(501)] for __ in range(501)]
shapes = [ [[0,0] for _ in range(501)] for __ in range(501)]

res = 0
n = int(input())

for j in range(1, n+1):
  shapes[j][j] = list(map(int, input().split()))

for j in range(1, n):
  count[j][j+1] = shapes[j][j][0] * shapes[j][j][1] * shapes[j+1][j+1][1] # N * M * K
  shapes[j][j+1] = [shapes[j][j][0], shapes[j+1][j+1][1]]

for height in range(2, n):
  for x in range(1, n+1-height):
    minimum = 2147483647
    for h in range(height):
      t = count[x][x+h] + count[x+h+1][x+height] + shapes[x][x+h][0] * shapes[x][x+h][1] * shapes[x+h+1][x+height][1]
      if(t < minimum):
        minimum = t
        shape = [shapes[x][x+h][0], shapes[x+h+1][x+height][1]]
    count[x][x+height] = minimum
    shapes[x][x+height] = shape
  
print(count[1][n])