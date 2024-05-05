n = int(input())
inputs = list(map(int, input().split()))
arrs = []
for _ in range(n):
    arrs.append([1, 1])

for i in range(n):
    for j in range(0, i):
        if(inputs[j] < inputs[i] and arrs[j][0] >= arrs[i][0]):
            arrs[i][0] = arrs[j][0]+1
for i in range(n-1, -1, -1):
    for j in range(i+1, n):
        if(inputs[j] < inputs[i] and arrs[j][1] >= arrs[i][1]):
            arrs[i][1] = arrs[j][1]+1
maximum = 0
for arr in arrs:
    if(arr[0]+arr[1]-1 > maximum):
        maximum = arr[0]+arr[1]-1
print(maximum)
