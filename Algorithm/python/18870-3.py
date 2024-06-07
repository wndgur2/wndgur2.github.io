from sys import stdin
import time

n = int(stdin.readline())
inputs = list(map(int, stdin.readline().strip().split()))

result = [-1]*n

st = time.time()
for i in range(n):
    smallers = []
    rate = 0
    for j in range(n):
        if(inputs[j] < inputs[i] and not (inputs[j] in smallers)):
            smallers.append(inputs[j])
            rate += 1
    result[i] = rate
ed = time.time()


s = ""
for i in range(n):
    s += str(result[i]) + '\n'

print(s)
