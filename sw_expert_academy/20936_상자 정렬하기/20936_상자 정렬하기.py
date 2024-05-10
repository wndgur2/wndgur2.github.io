"""

	20936_상자 정렬하기 created at 2024-05-10 13:41:49

    500개 이하의 상자, 하나의 빈칸을 이용해 정렬하기

    이동 횟수, 이동한 칸 번호 순서대로 출력. 최단은 아니고 가능한 방법 중 하나.

    1)  해당 칸에 들어가야 할 상자를 찾아서 넣으면,
        -   찾는 데 n, 이걸 n번, n^2 = 250000회 -> 3초에 가능할 듯하다.
    
    맨 오른쪽 칸이 비었을 때에는, 앞에서부터 칸에 맞지 않는 상자를 찾으면 그걸 옮긴다.
    그 외에는, 해당 칸에 들어가야 할 상자를 찾아 옮긴다.

"""

import sys
sys.stdin = open("input.txt", "r")

def getIndexToSort(li):
    index = 1
    for n in li:
        if n!= index:
            return index - 1
        index += 1

T = int(input())
for test_case in range(1, T + 1):
    n = int(input())
    log = []
    baskets = list(map(int, input().split()))
    baskets.append(0) # 맨 오른쪽 빈 칸
    indexToSort = getIndexToSort(baskets) # 앞에서부터 정렬되지 않은 인덱스 탐색. 정렬 되어있다면 맨 뒤 인덱스 리턴.
    while((baskets[-1] != 0) or (indexToSort != len(baskets)-1)): # 대부분 앞 조건이 True일 것임.
        if baskets[-1] == 0:
            baskets[-1] = baskets[indexToSort]
            baskets[indexToSort] = 0
            log.append(indexToSort + 1)
        else:
            indexBlank = baskets.index(0)
            indexToMove = baskets.index(indexBlank+1)
            baskets[indexBlank] = baskets[indexToMove]
            baskets[indexToMove] = 0
            log.append(indexToMove + 1)
        indexToSort = getIndexToSort(baskets)
    print(len(log))
    print(*log)