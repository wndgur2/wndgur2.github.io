import sys
dp = [[-1 for _ in range(2002)] for __ in range(2002)]
n = int(input())
inputs = list(map(int, sys.stdin.readline().split()))
inputs.insert(0, 0)
qn = int(input())

start = 1
end = n

for i in range(1, n+1):
  dp[i][i] = 1

for i in range(1, n):
  if(inputs[i] == inputs[i+1]):
    dp[i][i+1] = 1
  else:
    dp[i][i+1] = 0

for l in range(2, n+1):
  for x in range(1, n-l+1):
    start = x
    end = x+l
    if(dp[start+1][end-1]==1):
      if(inputs[start]==inputs[end]):
        dp[start][end] = 1
      else:
        dp[start][end] = 0
    else:
      dp[start][end] = 0

for i in range(qn):
  s, e = map(int, sys.stdin.readline().split())
  print(dp[s][e])