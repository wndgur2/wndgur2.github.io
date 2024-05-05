from sys import stdin
n, m = list(map(int, stdin.readline().strip().split()))


def recall(n, r, liS, result):
    if r == 0:
        liS.sort()
        if(not (liS in result)):
            result.append(liS)
        return 0

    for i in range(1, n+1):
        li = liS.copy()
        if(len(li) == 0 or i >= li[-1]):
            li.append(i)
            recall(n, r-1, li, result)


result = []
recall(n, m, [], result)

res = ""
for ss in result:
    for s in ss:
        res += str(s) + ' '
    res += '\n'
print(res[:-1])
