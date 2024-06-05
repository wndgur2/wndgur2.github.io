from sys import stdin
n = int(stdin.readline())
members = []
for i in range(n):
    age, name = stdin.readline().strip().split()
    members.append((int(age), name))
members.sort(key=lambda member: member[0])
s = ""
for i in members:
    s += str(i[0]) + ' ' + str(i[1]) + '\n'
print(s)
