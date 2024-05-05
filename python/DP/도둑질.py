'''
    DP 배열에 집을 턴 경우 중 최대 수익을 쌓는다.
    dp[0]엔 첫 집을 털 경우 money[0]이 들어갈 것이고,
    마지막 집을 털 경우 0이 들어갈 것이다.
    따라서 이 두 경우를 구분해야한다.
    
    첫 집을 터는 것을 고려했을 경우,
    dp[1]에는 money[0]과 money[1]중 큰 값이 들어갈 것이다.
    
    고려하지 않았을 경우,
    dp[1]에는 money[1]이 들어갈 것이다.
    
    dp[2]에는 max(dp[0]+money[2], dp[1])이 들어간다.
    첫 집을 터는 것을 고려하지 않았을 경우 끝까지 이를 반복하며,
    첫 집을 터는 것을 고려했을 경우 마지막 집 전까지 이를 반복한다.
    
'''

def solution(money):
    # 마지막 집 빼고 고려
    dp1 = [0] * len(money)
    dp1[0] = money[0]
    dp1[1] = max(money[0], money[1])

    for i in range(2, len(money)-1): 
        dp1[i] = max(dp1[i-1], money[i]+dp1[i-2])

    # 첫 집 빼고 고려
    dp2 = [0] * len(money)
    dp2[0] = 0
    dp2[1] = money[1]

    for i in range(2, len(money)): 
        dp2[i] = max(dp2[i-1], money[i]+dp2[i-2])
    return max(max(dp1), max(dp2)) # 두 경우 중 최대
