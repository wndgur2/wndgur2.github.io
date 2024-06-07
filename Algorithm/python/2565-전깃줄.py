n = int(input())
inputs = [list(map(int, input().split())) for i in range(n)]
arrs = [1]*n
inputs.sort(key=lambda x: x[0])
for i in range(len(inputs)):
    for j in range(0, i):
        if(inputs[j][1] < inputs[i][1] and arrs[j] >= arrs[i]):
            arrs[i] = arrs[j]+1
print(n-max(arrs))
