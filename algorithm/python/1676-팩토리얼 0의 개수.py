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


n = int(input())
nTwo = 0
nFive = 0
for i in range(2, n+1):
    res = nTen(i)
    nTwo += res[0]
    nFive += res[1]
print(min([nTwo, nFive]))
