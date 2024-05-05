from sys import stdin
n = int(stdin.readline())
result = [0]*10000
for i in range(n):
    result[int(stdin.readline())-1] += 1

for i in range(10000):
    for j in range(result[i]):
        print(i+1)
