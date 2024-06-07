import sys

height, width = map(int, sys.stdin.readline().split())
mapp = [[0 for _ in range(width)] for __ in range(height)]

for i in range(height):
  inp = sys.stdin.readline()
  for j in range(width):
    mapp[i][j] = bool(int(inp[j]))

#todo USE BFS (NOT recursive(DFS))

mapp[0][0] = 0
qA = [[0,0]]
qB = []
q = [qA, qB]
qI = 0
l = 0
end = 0
while not end:
  for x, y in q[qI%2]:
    if(x == width-1 and y == height-1):
      end = 1
      break
    if(x < width-1 and mapp[y][x+1]):
      mapp[y][x+1] = 0
      q[(qI+1)%2].append([x+1,y])
    if(x > 0 and mapp[y][x-1]):
      mapp[y][x-1] = 0
      q[(qI+1)%2].append([x-1,y])
    if(y < height-1 and mapp[y+1][x]):
      mapp[y+1][x] = 0
      q[(qI+1)%2].append([x,y+1])
    if(y > 0 and mapp[y-1][x]):
      mapp[y-1][x] = 0
      q[(qI+1)%2].append([x,y-1])
  q[qI%2] = []
  l += 1
  qI+=1
  
print(l)