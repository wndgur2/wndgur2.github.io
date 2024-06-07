n = int(input())
result = 0


def binary(n):
    if(n == 0):
        return [0]
    res = []
    tn = n
    temp = 0
    while tn > 0:
        while tn >= 2**temp:
            temp += 1
        temp -= 1
        tn -= 2**(temp)
        res.append(temp)
        temp = 0
    res2 = [0]*(res[0]+1)
    for k in res:
        res2[res[0]-k] = 1
    return res2


for i in range(30):
    print(i, binary(i))
