a, b = map(int, input().split())
if(a > b):
    big = a
    small = b
else:
    big = b
    small = a

for i in range(small, 0, -1):
    if(small % i == 0) and big % i == 0:
        print(i)
        break

for i in range(1, small+1):
    if(big*i % small == 0):
        print(i*big)
        break
