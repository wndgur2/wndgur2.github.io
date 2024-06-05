import sys

n, e = map(int, sys.stdin.readline().split(" "))

costTable = [[-1 for _ in range(n+1)] for __ in range(n+1)]
graph = [[] for _ in range(n+1)]
linked = [False for _ in range(n+1)]

for i in range(e):
  a, b, c = map(int, sys.stdin.readline().split(" "))
  costTable[b][a] = c
  costTable[a][b] = c
  graph[b].append(a)
  graph[a].append(b)


'''
  중복 없이 최단 경로 ( 거쳐야 하는 노드 없이 )
'''

def costsFromNode(nodeA):
  costs = [-1 for _ in range(n+1)]
  routes = [[0, [nodeA]]]
  costs[nodeA] = 0
  while routes:
    cost, route = routes.pop(0)
    newNode = route[len(route)-1]
    if(nodeA==1):
      linked[newNode]=True
    for nodeB in graph[newNode]:
      if(not (nodeB in route)):
        newCost = cost + costTable[newNode][nodeB]
        if((costs[nodeB]<0) or (costs[nodeB] > newCost)):
          costs[nodeB] = newCost
          newRoute = route.copy()
          newRoute.append(nodeB)
          routes.append([newCost, newRoute])
    # print(cost, route, end="\n\n")
  return costs

stationA, stationB = map(int, sys.stdin.readline().split(" "))

fromStart = costsFromNode(1)
fromA = costsFromNode(stationA)
fromB = costsFromNode(stationB)
res = min(
  fromStart[stationA] + fromA[stationB] + fromB[n],
  fromStart[stationB] + fromB[stationA] + fromA[n]
)
if(linked[n] and linked[stationA] and linked[stationB]):
  print(res)
else:
  print(-1)