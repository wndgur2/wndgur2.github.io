from sys import stdin
n = int(stdin.readline())
coords = []
for i in range(n):
    x, y = map(int, stdin.readline().strip().split())
    coords.append((y, x))
coords.sort()
s = ""
for i in coords:
    s += str(i[1])+' '+str(i[0])+'\n'
print(s)
