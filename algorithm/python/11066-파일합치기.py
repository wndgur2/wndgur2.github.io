arr = [ [0 for _ in range(502)] for __ in range(502)]
C = int(input())
"""
  500x500 배열 arr[i][j]는 i~j를 합하는 데 드는 최소비용.
  arr[i][i] = 각 장의 크기
  arr[i][i+1] = arr[i][i]+ arr[i+1][i+1]
  arr[i][i+2] = min(arr[i][i]+arr[i+1][i+2], arr[i][i+1], arr[i+2][i+2]) + sum(arr[i][i], arr[i+1][i+1], arr[i+2][i+2])
"""
for i in range(C):
  res = 0
  n = int(input())
  inputs = list(map(int, input().split()))
  sums = [0]

  for j in range(1, n+1):
    arr[j][j] = inputs[j-1]
    sums.append(sums[j-1]+arr[j][j])

  for j in range(1, n):
    arr[j][j+1] = arr[j][j] + arr[j+1][j+1]

  for j in range(1, n+1):
    arr[j][j] = 0

  for height in range(2, n):
    for x in range(1, n+1-height):
      minimum = 50000000
      for h in range(height):
        minimum = min(minimum, arr[x][x+h] + arr[x+h+1][x+height] + sums[x+height]-sums[x-1])
      arr[x][x+height] = minimum
  
  print(arr[1][n])