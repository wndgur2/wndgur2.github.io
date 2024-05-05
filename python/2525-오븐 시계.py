h, m = map(int, input().split())
duration = int(input())

now = h*60 + m
fin = (now+duration)%1440
res = str(fin//60) + ' ' + str(fin%60)
print(res)