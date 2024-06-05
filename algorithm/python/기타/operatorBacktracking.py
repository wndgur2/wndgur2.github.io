n = int(input())
nums = list(map(int, input().split()))
plus, minus, mul, div = list(map(int, input().split()))
resultOps = set()
ops = []

for i in range(plus):
    ops.append(0)
for i in range(minus):
    ops.append(1)
for i in range(mul):
    ops.append(2)
for i in range(div):
    ops.append(3)


def cal(ns, os):
    result = ns[0]
    for n in range(len(ns)-1):
        if(os[n] == 0):
            result += ns[n+1]
        elif(os[n] == 1):
            result -= ns[n+1]
        elif(os[n] == 2):
            result *= ns[n+1]
        elif(os[n] == 3):
            result = int(result / ns[n+1])
    return result


def recur(result, numset, nums, r):
    if(r == 0):
        result.add(tuple(numset))
        return 0

    for num in nums:
        numsetC = numset.copy()
        numsetC.append(num)
        numsC = nums.copy()
        numsC.remove(num)
        recur(result, numsetC, numsC, r-1)


recur(resultOps, [], ops, n-1)

min = 1000000000
max = -1000000000
for tops in resultOps:
    result = cal(nums, tops)
    if(result > max):
        max = result
    if(result < min):
        min = result

print(max)
print(min)
