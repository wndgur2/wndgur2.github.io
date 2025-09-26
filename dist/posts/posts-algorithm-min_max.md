
## min(), max()

---

### Code

<!-- CODE-APPENDED:4828_min_max.py -->
```python
"""

	4828_min_max created at 2024-07-07-11:32:24
    소요시간 3분

"""

import sys
sys.stdin = open("input.txt", "r")

for test_case in range(1, int(input()) + 1):
    N = input()
    nums = list(map(int, input().split()))

    print(f'#{test_case} {max(nums) - min(nums)}')
```
