import sys

class Node:
  def __init__(self, v):
    self.v = v
    self.linked = []
    self.checked = False

  def link(self, node):
    self.linked.append(node)

  def dfs(self):
    self.checked = True
    res=1
    for j in self.linked:
      if(not j.checked):
        res += j.dfs()
    return res
  
  def __lt__(self, other):
    return self.v < other.v

N = int(sys.stdin.readline())
M = int(sys.stdin.readline())
nodes = []

for i in range(1, N+1):
  nodes.append(Node(i))

for i in range(M):  
  a, b = map(int, sys.stdin.readline().split())
  nodes[a-1].link(nodes[b-1])
  nodes[b-1].link(nodes[a-1])

for i in nodes:
  i.linked.sort()

dfs = nodes[0].dfs()

print(dfs-1)