from sys import stdin
import time

n = int(stdin.readline())
sorted = list(map(int, stdin.readline().strip().split()))

inputs = sorted.copy()
sorted = set(sorted)
sorted = list(sorted)
sorted.sort()

dictionary = {}

for i in range(len(sorted)):
    dictionary[sorted[i]] = i

st = time.time()
idxs = []
for i in range(0, n):
    idxs.append(dictionary[inputs[i]])
ed = time.time()

for idx in idxs:
    print(idx, end=' ')
