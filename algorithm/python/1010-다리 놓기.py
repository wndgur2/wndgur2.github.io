t = int(input())
for case in range(t):
    k, n = map(int, input().split())
    ars = []
    for i in range(n+1):
        ars.append([-1]*(n+1))
    ars[0][0] = 1
    ars[1][0] = 1
    ars[1][1] = 1
    if(n > 1):
        ars[2][0] = 1
        ars[2][1] = 2
    res = 1
    for i in range(2, n+1):
        for j in range(i+1):
            if j != 0 and j != i:
                ars[i][j] = (ars[i-1][j]+ars[i-1][j-1])
            else:
                ars[i][j] = 1
    print(ars[n][k])
