n, q = map(int, input().split())
inputs = [5]*150000
for case in range(n):
    l, r, s, e = map(int, input().split())
    res = 0
    for i in range(l-1, r):
        for j in range(s-1, e):
            if(i <= j):
                m = max(inputs[i:j+1]) % (10**9+7)
                n = min(inputs[i:j+1]) % (10**9+7)
                res += m*n % (10**9+7)
    print(res)
