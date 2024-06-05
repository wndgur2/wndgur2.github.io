t = int(input())
for i in range(t):
    n = int(input())
    nums = [1, 1, 1, 2, 2]
    if(n <= 5):
        print(nums[n-1])
    else:
        for j in range(5, n):
            temp = nums[0]+nums[4]
            nums[0] = nums[1]
            nums[1] = nums[2]
            nums[2] = nums[3]
            nums[3] = nums[4]
            nums[4] = temp
        print(nums[4])
