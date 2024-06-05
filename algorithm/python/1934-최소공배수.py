t = int(input())
for j in range(t):
    a, b = map(int, input().split())
    ta = a
    tb = b
    while 1:
        if(ta % tb == 0):
            cs = tb
            break
        t = ta
        ta = tb
        tb = t % tb
    print(a*b//cs)
