"""
	1959_두개의숫자열 created at 2024-07-06-22:34:49
    
    통과 22:45

    소요 시간 11분
"""

import sys
sys.stdin = open("input.txt", "r")

for test_case in range(1, int(input()) + 1):
    N, M = map(int, input().split())
    A = list(map(int, input().split()))
    B = list(map(int, input().split()))
    
    BIG = A if len(A) > len(B) else B
    SMALL = A if len(B) > len(A) else B

    DIF = len(BIG) - len(SMALL)

    result = -123456789
    
    for i in range(DIF+1):
        tmp = 0
        for j in range(len(SMALL)):
            tmp += SMALL[j] * BIG[i + j]
        result = tmp if tmp > result else result

    print(f'#{test_case} {result}')