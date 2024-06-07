n = int(input())
inputs = list(map(int, input().split()))
arrs = [1]*n

for i in range(n):
    for j in range(0, i):
        if(inputs[j] < inputs[i] and arrs[j] >= arrs[i]):
            arrs[i] = arrs[j]+1
print(arrs)
print(max(arrs))
