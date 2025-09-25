
## 1952\_수영장 2024-05-13-16:22:49

### [문제 링크](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV5PpFQaAQMDFAUq)

### #DP

### 문제 요약

테스트케이스 수가 주어진다.
내년에 다니려는 수영장의 가격이 주어진다. 1일권, 1개월권, 3개월권, 1년권이 있다.  
내년에 다니려는 계획이 월별 일수로 주어진다.
내년에 수영장을 계획대로 다닐 수 있는 최소 가격을 출력하라.

| 입력 예                            |
| ---------------------------------- |
| 7                                  |
| 10 40 100 300                      |
| 0 0 2 9 1 5 0 0 0 0 0 0            |
| 10 100 50 300                      |
| 0 0 0 0 0 0 0 0 6 2 7 8            |
| 10 70 180 400                      |
| 6 9 7 7 7 5 5 0 0 0 0 0            |
| 10 70 200 550                      |
| 0 0 0 0 8 9 6 9 6 9 8 6            |
| 10 80 200 550                      |
| 0 8 9 15 1 13 2 4 9 0 0 0          |
| 10 130 360 1200                    |
| 0 0 0 15 14 11 15 13 12 15 10 15   |
| 10 180 520 1900                    |
| 0 18 16 16 19 19 18 18 15 16 17 16 |

| 출력 예 |
| ------- |
| #1 110  |
| #2 100  |
| #3 400  |
| #4 530  |
| #5 430  |
| #6 1080 |
| #7 1840 |

### 풀이

[DP]
dp[i]에 i월까지 다닐 수 있는 최소 비용을 담는다.

$∴ O(n)$ ( $n$=다닐 개월 수 )

약 30분 소요했다.

---

### Code

<!-- CODE-APPENDED:1952_수영장.py -->
```python
"""

	1952_수영장 created at 2024-05-13 16:22:49

    풀이: DP

"""
import sys
sys.stdin = open("input.txt", "r")

for test_case in range(1, int(input()) + 1):
    day_cost, month_cost, three_month_cost, year_cost = map(int, input().split())
    monthly_plan = [0]
    monthly_plan.extend(list(map(int, input().split())))
    
    # dp[i]에 들어갈 값? i월 까지 다니는 최소 비용

    dp = [1e9]*13
    dp[0] = 0
    for i in range(1, len(dp)):
        # 1월, 2월
        if monthly_plan[i]*day_cost > month_cost:
            dp[i] = dp[i-1] + month_cost
        else:
            dp[i] = dp[i-1] + monthly_plan[i]*day_cost

        if i>=3:
            dp[i] = min(dp[i], dp[i-3] + three_month_cost)
        if i==12:
            dp[i] = min(dp[i], year_cost)
    print(f'#{test_case} {dp[12]}')
```
