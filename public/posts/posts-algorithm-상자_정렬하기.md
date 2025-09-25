
## 20936\_상자정렬하기 2024-05-10-13:43:06

### [문제 링크]()

### #정렬

### 문제 요약

1부터 N까지 번호가 붙은 N(1<=N<=500)개의 상자가 N+1개의 칸에 임의의 순서로 나열되어 있다. 하나의 빈칸을 이용해 상자를 하나씩 이동하여 정렬하라.

| 입력 예         |
| --------------- |
| 2               |
| 3               |
| 1 2 3           |
| 8               |
| 5 6 7 2 3 4 1 8 |

| 출력 예   |
| --------- |
| 0         |
|           |
| 5         |
| 3 2 1 4 5 |

### 첫인상

정렬 구현인 듯 하다. 규칙을 찾아보자.

### 풀이

해당 칸에 들어가야 할 상자를 찾아서 넣으면,  
찾는 데에 N, 이걸 N번, N^2 <= 250000이므로 3초에 가능할 듯하다.

맨 오른쪽 칸이 비었을 때에는, 앞에서부터 칸에 맞지 않는 상자를 찾으면 그걸 옮긴다. 그 외에는, 해당 칸에 들어가야 할 상자를 찾아 옮긴다.

### 시간 복잡도

이동시킬 칸을 $N$번 찾는다.  
$∴ O(N^2)$

### 회고

변수의 의미가 미세하게 다를 때 변수명 짓는게 어렵다. 나중에 보면 이해하기 어려울 것 같으니, 문제 해결 후 조금 더 고민해서 지어보기.

### 해결 이후 개선

빈 칸이 맨 오른쪽이 아니라 맨 왼쪽에서 시작한다고 하면 코드가 한결 간결해진다.  
다만, 로그를 출력할 때, 0 대신 마지막 index를 출력해야했다.

---

### Code

<!-- CODE-APPENDED:20936_상자정렬하기.py -->
```python
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

def getNotSortedIndex(li):
    index = 0
    for n in li:
        if n!= index:
            return index
        index += 1
    return -1

T = int(input())
for test_case in range(1, T + 1):
    n = int(input())
    log = []
    baskets = [0]
    baskets.extend(list(map(int, input().split())))
    indexNotSorted = getNotSortedIndex(baskets) # 앞에서부터 정렬되지 않은 인덱스 탐색.
    while(indexNotSorted != -1): # 정렬되어있으면 -1 리턴
        if baskets[0] == 0:
            baskets[0] = baskets[indexNotSorted]
            baskets[indexNotSorted] = 0
            log.append(indexNotSorted if indexNotSorted!=0 else len(baskets))
        else:
            indexBlank = baskets.index(0)
            indexToMove = baskets.index(indexBlank)
            baskets[indexBlank] = baskets[indexToMove]
            baskets[indexToMove] = 0
            log.append(indexToMove  if indexToMove!=0 else len(baskets))
        indexNotSorted = getNotSortedIndex(baskets)
    print(len(log))
    print(*log)
```
