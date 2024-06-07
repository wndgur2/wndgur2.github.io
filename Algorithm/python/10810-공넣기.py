N, M = map(int, input().split())
baskets = [0 for _ in range(N)]
for m in range(M):
    i, j, k = map(int, input().split())
    for index in range(i-1, j):
        baskets[index] = k

print(*baskets)