import sys

n, k = map(int, input().split())
c = []
dp = [0 for _ in range(k+1)]
for i in range(n):
  inp = int(sys.stdin.readline())
  if(inp <= k):
    c.append(inp)
if(len(c)):
  for i in c:
    dp[i] += 1
    for j in range(i, k+1):
      dp[j] += dp[j-i]
  print(dp[k])
else:
  print(0)