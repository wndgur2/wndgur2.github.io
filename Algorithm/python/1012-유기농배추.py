import sys

def checkV(x, y):
  if(checked[y][x] == 0):
    checked[y][x] = 1
    if(mapp[y][x] == 1):
      res = 1
      if(y<height-1):
        res += checkV(x, y+1)
      if(y>0):
        res += checkV(x, y-1)
      if(x<width-1):
        res += checkV(x+1, y)
      if(x>0):
        res += checkV(x-1, y)
      return res
  return 0

T = int(sys.stdin.readline())

for t in range(T):
  width, height, n = map(int, sys.stdin.readline().split())

  mapp = [[0 for _ in range(width)]  for __ in range(height)]
  checked = [[0 for _ in range(width)]  for __ in range(height)]

  for i in range(n):
    x,  y = map(int, sys.stdin.readline().split())
    mapp[y][x] = 1

  vn = 0

  for i in range(height):
    for j in range(width):
      n = checkV(j, i)
      if(n > 0):
        vn += 1

  print(vn)