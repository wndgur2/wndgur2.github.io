import sys

width, height = map(int, sys.stdin.readline().split())
mapp = [list(map(int, sys.stdin.readline().split())) for _ in range(height)]

qA = []
qB = []
q = [qA, qB]
for i in range(height):
  for j in range(width):
    if(mapp[i][j] == 1):
      q[0].append([j, i])

qI = 0
l = 0
end = 0
while q[0] or q[1]:
  for x, y in q[qI%2]:
    if(x < width-1 and mapp[y][x+1]==0):
      mapp[y][x+1] = 1
      q[(qI+1)%2].append([x+1,y])
    if(x > 0 and mapp[y][x-1]==0):
      mapp[y][x-1] = 1
      q[(qI+1)%2].append([x-1,y])
    if(y < height-1 and mapp[y+1][x]==0):
      mapp[y+1][x] = 1
      q[(qI+1)%2].append([x,y+1])
    if(y > 0 and mapp[y-1][x]==0):
      mapp[y-1][x] = 1
      q[(qI+1)%2].append([x,y-1])
  q[qI%2] = []
  l += 1
  qI+=1
  
uncan=0
for y in mapp:
  for x in y:
    if(x==0):
      print(-1)
      uncan=1
      break
  if(uncan):
    break
if(not uncan):
  print(l-1)