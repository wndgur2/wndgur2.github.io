'''
    예시: solution([1, 1, 1, 1, 1], 3) == 5
    나뉘는 경우: 더하거나 빼거나.
    재귀함수.
'''

def recurse(idx, value):
    if idx >= maxSize:
        res.append(value)
        return
    recurse(idx + 1, value + arr[idx])
    recurse(idx + 1, value - arr[idx])

def solution(numbers, target):
    global maxSize, res, arr
    maxSize = len(numbers)
    res = []
    arr = numbers
    recurse(0, 0)
    answer = res.count(target)
    return answer

print(solution([4,1,2,1], 4))
