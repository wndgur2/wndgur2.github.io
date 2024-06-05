import sys

def checkIf(r, n, w):
  if(w==0):
    return 1
  if(r==n):
    return 0
  if(dp[w][r]!=-1):
    return dp[w][r]
  if(w+(n-r)*500<0):
    return 0
  if(w>(n-r)*500):
    return 0
  dp[w][r] = 0
  if checkIf(r+1, n, w) or checkIf(r+1, n, w+ws[r]) or checkIf(r+1, n, w-ws[r]):
    dp[w][r] = 1
  return dp[w][r]

nW = int(sys.stdin.readline())
ws = list(map(int, sys.stdin.readline().split()))
nBead = int(sys.stdin.readline())
beadWs = list(map(int, sys.stdin.readline().split()))

dp = [[-1 for _ in range(31)] for __ in range(30*500+1+40000)]

for b in beadWs:
  if(checkIf(0, nW, b)==1):
    print('Y', end=' ')
  else:
    print('N', end=' ')
print()