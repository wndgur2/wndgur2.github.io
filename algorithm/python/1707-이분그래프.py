import sys
sys.setrecursionlimit(20000)

class Node:
  def __init__(self, v):
    self.v = v
    self.linked = []
    self.depth = 0

  def link(self, node):
    self.linked.append(node)

  def dfs(self, d):
    self.depth = d
    res = True
    for j in self.linked:
      if(j.depth==0):
        res = j.dfs(self.depth+1)
        if(not res):
          return False
      elif(self.depth - j.depth > 1):
        if((self.depth - j.depth)%2 == 0):
          return False
      else:
        res = res
    return res
  
  def __lt__(self, other):
    return self.v < other.v

K = int(sys.stdin.readline())

for _ in range(K):
  V, E = map(int, sys.stdin.readline().split())
  nodes = []

  for i in range(1, V+1):
    nodes.append(Node(i))

  for i in range(E):  
    a, b = map(int, sys.stdin.readline().split())
    nodes[a-1].link(nodes[b-1])
    nodes[b-1].link(nodes[a-1])

  for i in nodes:
    i.linked.sort()

  res = True
  for i in range(len(nodes)):
    if(nodes[i].depth == 0):
      res = nodes[i].dfs(1)
      if (not res):
        print('NO')
        break
  if(res):
    print('YES')