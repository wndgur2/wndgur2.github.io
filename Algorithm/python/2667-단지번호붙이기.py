import sys

size = int(sys.stdin.readline())

mapp = [[0 for _ in range(size)]  for __ in range(size)]
checked = [[0 for _ in range(size)]  for __ in range(size)]

for i in range(size):
  inp = sys.stdin.readline()
  for j in range(size):
    mapp[i][j] = int(inp[j])

def checkV(x, y):
  if(checked[y][x] == 0):
    checked[y][x] = 1
    if(mapp[y][x] == 1):
      res = 1
      if(y<size-1):
        res += checkV(x, y+1)
      if(y>0):
        res += checkV(x, y-1)
      if(x<size-1):
        res += checkV(x+1, y)
      if(x>0):
        res += checkV(x-1, y)
      return res
  return 0

vns = []

for i in range(size):
  for j in range(size):
    n = checkV(j, i)
    if(n > 0):
      vns.append(n)

vns.sort()

print(len(vns))
for vn in vns:
  print(vn)