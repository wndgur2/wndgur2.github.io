
## 구간합

---

### Code

<!-- CODE-APPENDED:4835_구간합.py -->
```python
"""

	4835_구간합 created at 2024-07-07-11:25:09
    소요시간 5분
    
"""

import sys
sys.stdin = open("input.txt", "r")

for test_case in range(1, int(input()) + 1):
    N, M = map(int, input().split())
    nums = list(map(int, input().split()))
    sums = []
    for i in range(N-(M-1)):
        tmp_sum = 0
        for j in range(M): # 이거 빼고 그냥 합 구해서 index M 차이나게 빼면 M배 빨라질 것.
            tmp_sum += nums[i+j]
        sums.append(tmp_sum)
    print(f'#{test_case} {max(sums) - min(sums)}')
```
