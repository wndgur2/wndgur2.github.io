
### 구현, 그리디

---

### Code

<!-- CODE-APPENDED:4831_전기버스.py -->
```python
"""
	4831_전기버스 created at 2024-07-07-11:07:12

    8분 소요
"""

import sys
sys.stdin = open("input.txt", "r")

for test_case in range(1, int(input()) + 1):
    K, N, M = map(int, input().split())
    stations = list(map(int, input().split()))
    stations.sort()

    charged_N = 0
    cur_loc = 0
    for i in range(len(stations)):
        if stations[i]-cur_loc > K:
            charged_N = 0
            break
        if i<M-1 and stations[i+1]-cur_loc <= K:
            continue
        if i==M-1 and N-cur_loc <= K:
            continue

        charged_N += 1
        cur_loc = stations[i]
            
    print(f'#{test_case} {charged_N}')
```
