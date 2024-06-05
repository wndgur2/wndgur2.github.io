import sys

height, width = map(int, sys.stdin.readline().split())
mapp = [[0 for _ in range(width)] for __ in range(height)]

for i in range(height):
  inp = sys.stdin.readline()
  for j in range(width):
    mapp[i][j] = bool(int(inp[j]))

# height, width = 1000, 1000
# mapp = [[0 for _ in range(width)] for __ in range(height)]

mapp[0][0] = 1
qA = [[0, 0, False]]
qB = []
q = [qA, qB]
qI = 0
l = 1
end = 0
while not end:
  if (not q[0]) and (not q[1]):
    print(-1)
    break
  for x, y, b in q[qI%2]:
    if(x == width-1 and y == height-1):
      end = 1
      print(l)
      break
    if(x < width-1): # 오른쪽
      if(b):
        if(mapp[y][x+1] == 0):
          mapp[y][x+1] = 2
          q[(qI+1)%2].append([x+1, y, 1])
      else:
        if(mapp[y][x+1] != 1):
          mapp[y][x+1] = 1
          q[(qI+1)%2].append([x+1, y, 0])
        elif(mapp[y][x+1] == 1):
          mapp[y][x+1] = 1
          q[(qI+1)%2].append([x+1, y, 1])
    if(x > 0): # 왼쪽
      if(b):
        if(mapp[y][x-1] == 0):
          mapp[y][x-1] = 2
          q[(qI+1)%2].append([x-1, y, 1])
      else:
        if(mapp[y][x-1] != 1):
          mapp[y][x-1] = 1
          q[(qI+1)%2].append([x-1, y, 0])
        elif(mapp[y][x-1] == 1):
          mapp[y][x-1] = 1
          q[(qI+1)%2].append([x-1, y, 1])
    if(y < height-1): # 아래
      if(b):
        if(mapp[y+1][x] == 0):
            mapp[y+1][x] = 2
            q[(qI+1)%2].append([x, y+1, 1])
      else:
        if(mapp[y+1][x] != 1):
          mapp[y+1][x] = 1
          q[(qI+1)%2].append([x, y+1, 0])
        elif(mapp[y+1][x] == 1):
          mapp[y+1][x] = 1
          q[(qI+1)%2].append([x, y+1, 1])
    if(y > 0): # 위
      if(b):
        if(mapp[y-1][x] == 0):
            mapp[y-1][x] = 2
            q[(qI+1)%2].append([x, y-1, 1])
      else:
        if(mapp[y-1][x] != 1):
          mapp[y-1][x] = 1
          q[(qI+1)%2].append([x, y-1, 0])
        elif(mapp[y-1][x] == 1):
          mapp[y-1][x] = 1
          q[(qI+1)%2].append([x, y-1, 1])
  q[qI%2] = []
  l += 1
  qI+=1