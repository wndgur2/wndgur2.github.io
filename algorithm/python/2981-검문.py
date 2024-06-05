n = int(input())
nums = []
for i in range(n):
    nums.append(int(input()))
nums.sort()

difs = []
for i in range(1, n):
    difs.append(nums[i]-nums[i-1])

if(len(difs) > 1):
    difs.sort()
    a = difs[1]
    b = difs[0]
    t = a % b
    while t != 0:
        a = b
        b = t
        t = a % b
    for i in range(1, len(difs)):
        a = difs[i]
        t = a % b
        while a % b != 0:
            a = b
            b = t
            t = a % b
else:
    b = difs[0]

res = []
if(b != 1):
    for i in range(1, int(b**0.5)+1):
        if(b % i == 0):
            res.append(i)
            if(i*i != b):
                res.append(int(b/i))
    res.sort()
    for i in res[1:]:
        print(i, end=' ')
