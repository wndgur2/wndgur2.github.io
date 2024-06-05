import sys
n, m = map(int, sys.stdin.readline().split())
sums = [0]
tmp = 0
for i in list(map(int, sys.stdin.readline().split())):
  tmp += i;
  sums.append(tmp)
for i in range(m):
  i, j = map(int, sys.stdin.readline().split())
  print(sums[j] - sums[i-1]);