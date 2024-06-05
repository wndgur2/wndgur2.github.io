n = int(input())
distances = list(map(int, input().split()))
costs = list(map(int, input().split()))
res = 0
cost = costs[0]
for i in range(n-1):
    if(costs[i] < cost):
        cost = costs[i]
    res += cost * distances[i]
print(res)
