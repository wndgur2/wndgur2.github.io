n = int(input())

inputs = list(map(int, input().split()))
tSum = 0
sums = []
if(max(inputs) < 0):
    maximum = max(inputs)
else:
    for i in range(n):
        if(tSum+inputs[i] < 0):
            tSum = 0
        else:
            tSum += inputs[i]
            sums.append(tSum)
    maximum = max(sums)

print(maximum)
