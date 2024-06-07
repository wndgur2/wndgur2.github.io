origin = [1, 1, 2, 2, 2, 8]
amounts = list(map(int, input().split()))
res = ""
for i in range(6):
  res += str(origin[i]-amounts[i]) + ' '
print(res)