from sys import stdin
n = int(stdin.readline())
coords = []
for i in range(n):
    coords.append(tuple(map(int, stdin.readline().strip().split())))
coords.sort()
s = ""
for i in coords:
    s += str(i[0])+' '+str(i[1])+'\n'
print(s)
