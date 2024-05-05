from sys import stdin
n = int(stdin.readline())
result = [0]*n
for i in range(n):
    result[i] = int(stdin.readline())
result.sort()
s = ""
for i in result:
    s += str(i)+'\n'
print(s)
