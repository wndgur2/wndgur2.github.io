from sys import stdin
n = int(stdin.readline().strip())
count = 0


def recall(n, r, leftX, leftD, leftU):
    if r == 0:
        global count
        count += 1
        return 0

    y = n-r
    for x in leftX:
        if(leftU[x+y] and leftD[n-1+x-y]):
            lXC = leftX.copy()
            lXC.remove(x)
            leftD[n-1+x-y], leftU[x+y] = False, False
            recall(n, r-1, lXC, leftD, leftU)
            leftD[n-1+x-y], leftU[x+y] = True, True


recall(n, n, list(i for i in range(n)), [True]*(2*n-1), [True]*(2*n-1))
print(count)
