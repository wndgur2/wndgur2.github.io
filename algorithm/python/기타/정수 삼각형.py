def max(ar):
    res = 0
    for m in ar:
        if(m > res):
            res = m
    return res


n = int(input())
nums = []
f = int(input())
nums.append(f)
for i in range(1, n):
    befNums = nums
    numList = list(map(int, input().split()))
    nums = [numList[0]+befNums[0]]
    for j in range(1, i):
        nums.append(numList[j]+max([befNums[j-1], befNums[j]]))
    nums.append(numList[-1]+befNums[-1])
print(max(nums))
