
## 1244\_최대상금 2024-05-09-20:22:56

### [문제 링크](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV15Khn6AN0CFAYD)

### #DFS

### 문제 요약

최대 6자리 수 중 두개의 자리를 최대 10번 교환하여 만들 수 있는 가장 큰 수를 구하시오.

| 입력 예          | 출력 예      |
| ---------------- | ------------ |
| `수` `교환 횟수` | `가장 큰 수` |
| 123 1            | 321          |
| 32886 3          | 88632        |

### 첫인상

이전에 비슷한 문제를 푼 기억이 있으나, 풀이가 기억나지는 않는다.

6개의 수 중에 교환할 두 수를 중복하여 최대 10번을 고르는 경우의 수는 $15^{10}$개 이므로 시간 내에 불가능할 것이다.

### 실패

규칙을 찾아 직접 구현할 수 있을 것 같았다. 하지만 예시를 만들어보다가, 동일한 최고 숫자가 여러개 있을 경우 구현하기에 점점 복잡해지는 것을 발견했다.

### 풀이

[DFS 백트래킹]

집에 걸어오면서 적은 경우의 수를 탐색하는 방법을 고민했고, 중복된 조합을 제거하면 최대 6자리이므로 10^6개의 경우의 수만 나올 것임을 깨달았다.

*dfs*하며 각 depth(교환 횟수)마다 따로 중복 검사를 하여 통과했다. python의 set를 활용해 중복 검사를 상수 시간에 해결했다.

### 시간 복잡도

$최대 자릿수: l, 교환 횟수:k$

$l$자리 수에서 나올 수 있는 조합은 최대 $10^l$개 (십진수이므로)  
$l$개에서 2개를 $k$번 선택하는 경우의 수 $(l*(l-1)/2)^k$

$∴ O(min(10^l, {l^2}^k))$

### 회고

대표적인 조합 문제인 것 같다. 푼지 너무 오래 되어서 바로 생각이 나지 않았다.  
오래 기억하도록 정리하는 습관 들이기.  
문제 꾸준히 풀기.

---

### Code

<!-- CODE-APPENDED:1244_최대상금.py -->
```python
"""

	1244_최대 상금 2024-05-09 17:34:00

"""

import sys
sys.stdin = open("input.txt", "r")

global combinations
def dfs(price, chance):
    if(price in combinations[chance]):
        return
    combinations[chance].add(price)
    if(chance == 0):
        return
    for i in range(len(price)):
        for j in range(i+1, len(price)):
            list_price = list(price)
            tmp = list_price[i]
            list_price[i] = list_price[j]
            list_price[j] = tmp
            dfs("".join(list_price), chance-1)

T = int(input())
for test_case in range(1, T + 1):
    price, chance = input().split()
    chance = int(chance)

    combinations = [set() for _ in range(chance+1)]
    
    dfs(price, chance)
    print('#'+str(test_case), end=' ')
    print(max(combinations[0]))
```
