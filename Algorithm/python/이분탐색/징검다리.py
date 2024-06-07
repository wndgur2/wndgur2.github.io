'''
    distance가 10억으로 주어졌으므로,
    이를 기준으로 이분탐색해야겠다.
'''
def solution(distance, rocks, n):
    answer = 0
    rocks.sort()
    rocks = [0] + rocks + [distance]
    gaps = [ rocks[t]- rocks[t-1] for t in range(1, len(rocks))]
    print(gaps)
    left = 0
    right = distance*2
    while left < right:
        mid = (left + right)//2
        print(left, mid, right)
        eliminate = 0
        el = False
        for g in gaps:
            if el:
                gT += g
                el = False
            else:
                gT = g
            if gT < mid: # 한 바위를 제거했을 때 다음거까지 합쳐서 비교해야합니다.
                eliminate += 1
                el = True
        if el:
            eliminate += 1                
        if eliminate <= n:
            left = mid+1
        else:
            answer = mid
            right = mid
                    
    return answer-1
print(solution(100, [50], 1))