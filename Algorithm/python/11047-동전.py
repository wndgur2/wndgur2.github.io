n, goal = map(int, input().split())
count = 0
currencies = []
for i in range(n):
    currencies.append(int(input()))
for i in range(n-1, -1, -1):
    if(currencies[i] <= goal):
        count += goal//currencies[i]
        goal = goal % currencies[i]
print(count)
