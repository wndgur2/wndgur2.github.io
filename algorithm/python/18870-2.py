from os import fdopen
import sys
import time
sys.setrecursionlimit(1000001)
f = open("inputs.txt", 'r')
n = int(f.readline())
inputs = list(map(int, f.readline().strip().split()))

# n = int(stdin.readline())
# inputs = list(map(int, stdin.readline().strip().split()))

result = [-1]*n


def press(inputs, result, l, r):
    if((-1 in result) == False):
        return 0
    minimum = 1000000000
    minimumsIndex = []
    for i in range(n):
        if(inputs[i] > l and inputs[i] < minimum):
            minimum = inputs[i]
            minimumsIndex = [i]
        elif(inputs[i] == minimum):
            minimumsIndex.append(i)
    for index in minimumsIndex:
        result[index] = r
    press(inputs, result, minimum, r+1)


st = time.time()
press(inputs, result, -1000000000, 0)
ed = time.time()
s = ""
for i in result:
    s += str(i) + ' '
# print(s)
print(ed-st)
