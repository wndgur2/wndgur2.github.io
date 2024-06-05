import sys

M, N, H= map(int, sys.stdin.readline().split())
mapp = [[list(map(int, sys.stdin.readline().split())) for _ in range(N)] for __ in range(H)]

qA = []
qB = []
q = [qA, qB]
for i in range(H):
  for j in range(N):
    for k in range(M):
      if(mapp[i][j][k] == 1):
        q[0].append([k, j, i])

qI = 0
l = 0
end = 0
while q[0] or q[1]:
  for x, y, z in q[qI%2]:
    if(x < M-1 and mapp[z][y][x+1]==0):
      mapp[z][y][x+1] = 1
      q[(qI+1)%2].append([x+1, y, z])
    if(x > 0 and mapp[z][y][x-1]==0):
      mapp[z][y][x-1] = 1
      q[(qI+1)%2].append([x-1, y, z])
    if(y < N-1 and mapp[z][y+1][x]==0):
      mapp[z][y+1][x] = 1
      q[(qI+1)%2].append([x, y+1, z])
    if(y > 0 and mapp[z][y-1][x]==0):
      mapp[z][y-1][x] = 1
      q[(qI+1)%2].append([x, y-1, z])
    if(z < H-1 and mapp[z+1][y][x]==0):
      mapp[z+1][y][x] = 1
      q[(qI+1)%2].append([x, y, z+1])
    if(z > 0 and mapp[z-1][y][x]==0):
      mapp[z-1][y][x] = 1
      q[(qI+1)%2].append([x, y, z-1])
  q[qI%2] = []
  l += 1
  qI+=1
  
uncan=0
for z in mapp:
  for y in z:
    for x in y:
      if(x==0):
        print(-1)
        uncan=1
        break
    if(uncan):
      break
if(not uncan):
  print(l-1)