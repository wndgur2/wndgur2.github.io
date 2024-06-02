n = int(input())
bv = 1
v = 1
for i in range(1, n):
    tv = v
    v = (v+bv) % 15746
    bv = tv
print(v % 15746)
