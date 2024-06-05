'''
    끝이 시작보다 크면 겹침.
    이 끝을 안 겹칠 때까지 계속 기억합니다. (큐)
    안 겹칠 경우 다음 끝과 겹치는지 확인합니다.
    반복합니다.

    경우#1
    AABB

    경우#2
    ABAB endA를 저장

    경우#3
    ABBA endB를 저장
'''

def solution(routes):
    answer = 0
    routes.sort()
    end = -30000
    for route in routes:
        if route[0] <= end:
            if route[1] < end: # 경우 3
                end = route[1]
        else:
            answer += 1
            end = route[1]
    return answer 