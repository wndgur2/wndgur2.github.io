def isPrime(n):
    if n<=1:
        return False
    for i in range(2, int(n/2)+1):
        if n%i==0:
            return False
    return True

'''
for n in numbers:
    pick
        for i in len(array): i번째에 삽입하는 경우
            소수인지 판별
            중복인지 판별 (set 이용)
            리턴값에 +
    
    no pick
        -> do nothing
return set의 길이
'''

def pick(picks, i):
    if i<len(nums):
        pick(picks, i+1)
        if len(picks)==0:
            pick([nums[i]], i+1)
        for j in range(len(picks)+1):
            newPicks = picks[:]
            newPicks.insert(j, nums[i])
            global answer

            #int 배열을 int로
            strs = list(map(str, newPicks))
            nowString = ""
            for n in strs:
                nowString += n
            nowNumber = int(nowString)
            if isPrime(nowNumber):
                if not (nowNumber in setNums):
                    setNums[nowNumber] = 1
                    answer += 1

            pick(newPicks, i+1)

def solution(numbers):
    global nums
    global setNums
    global answer
    nums = numbers
    setNums = {}
    answer = 0
    
    pick([], 0)
        
    return answer