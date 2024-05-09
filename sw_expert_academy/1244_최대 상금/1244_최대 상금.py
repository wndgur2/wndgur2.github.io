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