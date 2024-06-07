N, M = map(int, input().split())
baskets = [ball+1 for ball in range(N)]
for m in range(M):
    i, j = map(int, input().split())
    temp = baskets[i-1]
    baskets[i-1] = baskets[j-1]
    baskets[j-1] = temp

print(*baskets)