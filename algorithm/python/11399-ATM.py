n = int(input())
costs = list(map(int, input().split()))
costs.sort()
res = 0
t = 0
for i in costs:
    t += i
    res += t
print(res)
