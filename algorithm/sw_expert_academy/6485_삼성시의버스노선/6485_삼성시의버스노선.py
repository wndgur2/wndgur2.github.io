'''
    500개 정류장이 0과 5000번사이에 분포

    범위 체크만 해놓고
    스택구조로 마지막에 +하고 -하면서 정리
    5000회 하고 500회

'''
import sys
sys.stdin = open("input.txt", "r")

for tc in range(1, int(input())+1):
    lane_n = int(input())

    laneStartEnd = [0] * 5000
    for i in range(lane_n):
        A, B = map(int, input().split())
        laneStartEnd[A-1] += 1
        if B < 5000:
            laneStartEnd[B] -= 1

    # print(*laneStartEnd)

    laneAmounts = [0]*5000
    cur_lanes = 0
    for i in range(5000):
        cur_lanes += laneStartEnd[i]
        laneAmounts[i] += cur_lanes
    
    stop_n = int(input())

    to_print = []
    for i in range(stop_n):
        to_print.append(int(input()))
    
    result = ""
    for i in to_print:
        result += str(laneAmounts[i-1]) + " "
    print(f'#{tc} {result[:-1]}')