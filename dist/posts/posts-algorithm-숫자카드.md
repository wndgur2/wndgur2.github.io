
## 정렬

---

### Code

<!-- CODE-APPENDED:4834_숫자카드.py -->
```python
"""

	4834_숫자카드 created at 2024-07-07-11:20:18
    가장 많은 숫자와 장수
    N <= 100

    소요시간 5분
    
"""

import sys
sys.stdin = open("input.txt", "r")

for test_case in range(1, int(input()) + 1):
    N = int(input())
    cards = list(map(int, input()))
    card_amount = [cards.count(i) for i in range(10)]
    card_amount.reverse()
    max_amount = 0
    max_num = 9
    for i in range(10):
        if card_amount[i] > max_amount:
            max_num = 9-i
            max_amount = card_amount[i]
    print(f'#{test_case} {max_num} {max_amount}')
```
