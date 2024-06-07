"""

	20934_방울 마술 2024-05-09 15:23:41

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