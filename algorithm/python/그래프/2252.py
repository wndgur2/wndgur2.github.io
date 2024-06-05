from collections import deque
import sys

n, m = map(int, sys.stdin.readline().split())

aheads = [[] for _ in range(n)] 
ranks = [0 for _ in range(n)]
checked = [False for _ in range(n)]
res = ""
que = deque()

for i in range(m):
  a, b = map(int, sys.stdin.readline().split())
  aheads[b-1].append(a-1)
  ranks[a-1] += 1

minR = min(ranks)
for i in range(len(ranks)):
  if(ranks[i]==minR):
    que.append(i)

while que:
  index = que.popleft()
  if(checked[index] == False):
    checked[index] = True
    res = ' ' + str(index+1) + res
    for j in aheads[index]:
      ranks[j] -= 1
      if(ranks[j]==0):
        que.append(j)

print(res.strip())