from sys import stdin
n = stdin.readline().strip()
array = []
for c in n:
    array.append(int(c))
array.sort(reverse=True)
for c in array:
    print(c, end='')
