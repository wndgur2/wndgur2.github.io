def min(ar):
    res = 1000000
    for m in ar:
        if(m < res):
            res = m
    return res


n = int(input())
costs = []
r, g, b = list(map(int, input().split()))
costs.append([r, g, b])
for i in range(1, n):
    r, g, b = list(map(int, input().split()))
    r += min([costs[i-1][1], costs[i-1][2]])
    g += min([costs[i-1][0], costs[i-1][2]])
    b += min([costs[i-1][1], costs[i-1][0]])
    costs.append([r, g, b])
print(min([r, g, b]))
