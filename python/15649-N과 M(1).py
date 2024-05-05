from sys import stdin
n, m = list(map(int, stdin.readline().strip().split()))
result = []
stres = ""


def recall(n, r, liS):
    if r == 0:
        liS.sort()
        if(not (liS in result)):
            result.append(liS)
        return 0

    for i in range(1, n+1):
        if not (i in liS):
            li = liS.copy()
            li.append(i)
            recall(n, r-1, li)


recall(n, m, [])

for ss in result:
    for s in ss:
        print(s, end=' ')
    print()
