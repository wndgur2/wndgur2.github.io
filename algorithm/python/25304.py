costSum = int(input())
n = int(input())
tempCost = 0
for i in range(n):
  cost, amount = map(int, input().split())
  tempCost += cost * amount

if(costSum==tempCost):
  print("Yes")
else:
  print("No")