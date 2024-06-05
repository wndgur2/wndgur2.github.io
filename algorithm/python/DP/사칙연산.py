'''
'''
def solution(arr):
    i = len(arr)-1
    maxValue = 0
    minValue = 0
    s = 0
    while i >= 0:
        s += int(arr[i])
        if arr[i-1] == '-':
            tMax = maxValue
            tMin = minValue
            maxValue = max(tMax -int(arr[i])*2 + s, -(tMin + s))
            minValue = min(tMin-s, -(tMax + s))
            s = 0
        i-=2
    maxValue += s
    return maxValue
print(solution(["1", "+", "1", "-", "1"]))