def howM(number, devision):
    tempRes = 0
    square = 1
    while 1:
        temp = number//(devision**square)
        if(temp >= 1):
            tempRes += temp
            square += 1
        else:
            return tempRes


def factNTen(t):
    tenM = howM(t, 10)
    res = [howM(t, 2), howM(t, 5)]
    return res


n, m = map(int, input().split())

res1 = factNTen(n)
res2 = factNTen(n-m)
res3 = factNTen(m)
res1[0] -= res2[0] + res3[0]
res1[1] -= res2[1] + res3[1]

print(min(res1))
