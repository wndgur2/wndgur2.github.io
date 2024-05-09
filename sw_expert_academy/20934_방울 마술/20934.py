"""
    입력
    첫 번째 줄에 테스트 케이스의 수 T가 주어진다.
    각 테스트 케이스는 한 개의 줄로 이루어진다. 각 줄에는 문자열 S와 정수 K(0≤K≤1,000)가 공백 하나를 사이로 두고 주어진다. S는 컵을 섞기 전 방울이 있는 컵의 위치를 나타내며, 방울이 맨 왼쪽 컵에 있었다면 “o..”, 가운데 컵에 있었다면 “.o.”, 맨 오른쪽 컵에 있었다면 “..o”이다.

    출력
    각 테스트 케이스마다, 현재 방울이 있을 확률이 가장 높은 컵의 위치 (단, 그러한 컵이 여러 개 있다면 그 중 가장 왼쪽 위치)를 구한 뒤,
    맨 왼쪽이라면 0,
    가운데라면 1,
    맨 오른쪽이라면 2

    o.. 1 => 0 100 0
    .o. 1 => 50 0 50
    ..0 1 => 0 100 0

    방울이 울렸을 때,
    가운데 확률은 좌우로 반반씩 나뉨.
    좌우의 확률은 가운데로 모임.
    이 두 가지를 독립적으로

"""
import sys
sys.stdin = open("input.txt", "r")

T = int(input())
for test_case in range(1, T + 1):
    possibility=[0, 0, 0]
    loc, K = input().split()
    loc = loc.find('o')
    possibility[loc] = 100
    K = int(K)
    for i in range(K):
        mid = possibility[1]
        side = possibility[0] + possibility[2]
        possibility[1] = side
        possibility[0] = mid/2
        possibility[2] = mid/2
    idx=0
    maximum = max(possibility)
    print("#" + str(test_case), end=" ")
    for pos in possibility:
        if(pos == maximum):
            print(idx)
            break
        idx+=1