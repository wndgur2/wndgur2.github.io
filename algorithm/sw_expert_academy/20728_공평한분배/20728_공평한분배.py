"""

	20728_공평한분배 created at 2024-05-19-00:46:40

"""

import sys
sys.stdin = open("input.txt", "r")

for test_case in range(1, int(input()) + 1):
    N, M = map(int, input().split())
    candies = list(map(int, input().split()))
    candies.sort()
    dif = 2e9
    for i in range(0, len(candies)-M+1):
        cur_dif = candies[i+M-1] - candies[i]
        if cur_dif < dif:
            dif = cur_dif
    print(f'#{test_case} {int(dif)}')