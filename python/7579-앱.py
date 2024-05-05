import sys

N, M = map(int, sys.stdin.readline().split())
ms = list(map(int, sys.stdin.readline().split()))
cs = list(map(int, sys.stdin.readline().split()))

dp = [0 for _ in range(10001)] #index = cost, value = memory

def solve():
  costSum = 0
  for i in cs:
    costSum += i
  
  for i in range(N):
    for j in range(costSum, cs[i]-1, -1):
      dp[j] = max(dp[j], dp[j-cs[i]]+ms[i])
  
  for i in range(costSum+1):
    if dp[i] >= M:
      return i

print(solve())