from sys import stdin

n = int(stdin.readline())
sorted = list(map(int, stdin.readline().strip().split()))
inputs = sorted.copy()
sorted = set(sorted)
sorted = list(sorted)
sorted.sort()

s = ""
for i in range(n):
    s += str(sorted.index(inputs[i])) + '\n'

print(s)
