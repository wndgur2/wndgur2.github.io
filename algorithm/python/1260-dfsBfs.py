import sys

class Node:
  def __init__(self, v):
    self.v = v
    self.linked = []
    self.checked = False

  def link(self, node):
    self.linked.append(node)

  def dfs(self, res):
    self.checked = True
    res.append(self.v)
    for j in self.linked:
      if(not j.checked):
        j.dfs(res)
    return res
  
  def bfs(self):
    self.checked = True
    q = [self]
    for j in q:
      for k in j.linked:
        if(k.checked == False):
          q.append(k)
          k.checked = True
    res = []
    for j in q:
      res.append(j.v)
    return res
  
  def __lt__(self, other):
    return self.v < other.v

N, M, V = map(int, sys.stdin.readline().split())
nodes = []

for i in range(1, N+1):
  nodes.append(Node(i))

for i in range(M):
  a, b = map(int, sys.stdin.readline().split())
  nodes[a-1].link(nodes[b-1])
  nodes[b-1].link(nodes[a-1])

for i in nodes:
  i.linked.sort()

dfs = nodes[V-1].dfs([])
for i in nodes:
  i.checked = False
bfs = nodes[V-1].bfs()

print(*dfs)
print(*bfs)