from sys import stdin
import time


def findIndex(obj, sortedLi, stI, edI, idxes):
    mid = int((stI+edI)/2)
    if(sortedLi[mid] == obj):
        idxes.append(mid)
    elif stI <= edI:
        findIndex(obj, sortedLi, stI, mid-1, idxes)
        findIndex(obj, sortedLi, mid+1, edI, idxes)


f = open("inputs.txt", 'r')
n = int(f.readline())
sorted = list(map(int, f.readline().strip().split()))

# n = int(stdin.readline())
# sorted = list(map(int, stdin.readline().strip().split()))

st = time.time()
inputs = sorted.copy()
ed = time.time()
print("copy:", ed-st)

st = time.time()
sorted = set(sorted)
ed = time.time()
print("setify:", ed-st)

st = time.time()
sorted = list(sorted)
sorted.sort()
ed = time.time()
print("listify, sort:", ed-st)
st = time.time()
idxes = []
for i in range(n):
    findIndex(inputs[i], sorted, 0, len(sorted)-1, idxes)
ed = time.time()
print("\nindex print", ed-st)

s = ""
for i in idxes:
    s += str(i) + ' '
print(s)
