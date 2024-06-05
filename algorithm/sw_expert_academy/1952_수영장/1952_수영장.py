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