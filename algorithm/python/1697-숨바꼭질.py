import sys

N, K= map(int, sys.stdin.readline().split())

check = [0 for _ in range(134000)]
qA = [N]
qB = []
q = [qA, qB]

qI = 0
l = 0

while True:
  if K in q[qI%2]:
    print(l)
    break
  for x in q[qI%2]:
    check[x] = 1
    if((x>0) and (not check[x-1])):
      q[(qI+1)%2].append(x-1)
    if(x<K):
      if((x<100000) and (not check[x+1])):
        q[(qI+1)%2].append(x+1)
      if((x<67000) and (not check[x*2])):
        q[(qI+1)%2].append(x*2)
  q[qI%2] = []
  l += 1
  qI+=1