n = int(input())
inputs = list(map(int, input().split()))
arrs = [1]*n

for i in range(n-2, -1, -1):
    for j in range(i+1, n):
        if(inputs[j] > inputs[i] and arrs[j] >= arrs[i]):
            arrs[i] = arrs[j]+1
            biggest = False

print(max(arrs))
