from sys import stdin
n, m = list(map(int, stdin.readline().strip().split()))
result = set()
stres = ""


def recall(n, r, liS):
    if r == 0:
        liS.sort()
        result.add(tuple(liS))
        return 0
    st = 0
    if (len(liS)):
        st = liS[-1]
    for i in range(st+1, n):
        li = liS.copy()
        li.append(i)
        recall(n, r-1, li)


recall(n, m-1, [0])

for ss in result:
    for s in ss:
        print(s, end=' ')
    print()
print(len(result))
