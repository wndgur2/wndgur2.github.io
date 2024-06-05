t = int(input())

arrIsPrime = [True] * 10001
arrIsPrime[0] = False
arrIsPrime[1] = False
for i in range(5001):
    if(arrIsPrime[i]):
        for j in range(i*2, 10001, i):
            arrIsPrime[j] = False

for tIter in range(t):
    n = int(input())
    for a in range(int(n/2)+1):
        if(arrIsPrime[n-a] & arrIsPrime[a]):
            case = [a, n-a]
    print(case[0], case[1])