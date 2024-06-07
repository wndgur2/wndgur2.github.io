"""

	1206_view 2024-05-10 11:42:36

"""

import sys
sys.stdin = open("input.txt", "r")

T = 10
for test_case in range(1, T + 1):
    '''
        이 부분에 여러분의 알고리즘 구현이 들어갑니다.
    '''
    n = int(input())
    buildings = list(map(int, input().split()))
    answer = 0

    for i in range(n-4):
        highest = 0
        second = 0
        for b in [buildings[i+j] for j in range(5)]:
            if(b >= highest):
                second = highest
                highest = b
            elif(b > second):
                second = b
        if highest == buildings[i+2]:
            answer += highest - second
    print('#'+str(test_case), end=' ')
    print(answer)