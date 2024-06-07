'''
    힙으로 풀려다 시간초과.
    이진탐색으로 푸는 방법을 생각해내는 데 실패했다
    
    public minsu의 "시간당 처리할 수 있는 사람 수"
    라는 말 덕분에 이해했다.

    시간의 최대 범위는 한 심사대에서 모든 사람을 심사하는 경우일 것이다.
    최소 범위는 시간이 가장 짧게 걸리는 심사대에서 한 사람을 심사하는 경우로 잡았다.
'''
def solution(n, times):
    times.sort()
    right = times[0] * n
    left = times[0]
    while left < right:
        mid = (right + left) // 2
        sumP = 0
        for t in times:
            sumP += mid//t # t라는 심사대에서 넘기는 사람 수
        if sumP < n:
            left = mid+1
        else:
            result = mid
            right = mid
    return result