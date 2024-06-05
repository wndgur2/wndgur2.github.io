minus = list(input().split('-'))
res = sum(map(int, minus[0].split('+')))
for i in minus[1:]:
    t = sum(map(int, i.split('+')))
    res -= t
print(res)
