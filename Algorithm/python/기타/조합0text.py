def nTen(t):
    two = 0
    five = 0
    temp = 2
    while t > 1:
        if(t % temp == 0):
            t = int(t/temp)
            if temp == 2:
                two += 1
            elif temp == 5:
                five += 1
            temp = 2
        else:
            temp += 1
    return [two, five]


def factNTen(t):
    tTwo = 0
    tFive = 0
    for i in range(2, t+1):
        res = nTen(i)
        tTwo += res[0]
        tFive += res[1]
    return [tTwo, tFive]


n, m = map(int, input().split())
nTwo = 0
nFive = 0

res1 = factNTen(n)
res2 = factNTen(n-m)
res3 = factNTen(m)
print(res1, res2, res3)
nTwo += res1[0]
nFive += res1[1]
nTwo -= res2[0]
nFive -= res2[1]
nTwo -= res3[0]
nFive -= res3[1]


print(min([nTwo, nFive]))
