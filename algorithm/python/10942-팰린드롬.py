"""
  IDEA 1
  dp. -1 : unknwon. 0 : false. 1 : true.
  1. 팰린드롬이 아니라면 해당 원소부터 대각선(양옆으로 범위를 1 늘린 수열)은 모두 팰린드롬이 아니다.
  2. 팰린드롬이 맞다면 해당 원소부터 대각선(양옆으로 범위를 1 늘린 수열)을 돌며 팰린드롬인지 확인한다. 이 때 확인법은 추가하는 원소 2개가 같으면 1, 아니면 0.
  // 3. dr[y][x]가 팰린드롬이면 그 사방은 팰린드롬이 아니다. (끝 1개가 추가되거나 빠지므로.) >>>>>>>>>>>>>>>>> 모두 같은 수일 때 가능
  !-> 3% TIMEOUT 팰린드롬이 아닐 때 밖에 메리트가 없다.

  IDEA 1-2
  수열의 길이를 1씩 늘리면서, 펠린드롬인지 확인하여 저장하며 인풋을 도는데,
  현재 길이보다 작은 길이의 수열은 모두 결과가 저장되어 있기 때문에,
  늘어난 길이만큼만 새로 조사하면 펠린드롬인지 아닌지 알 수 있다.

  //IDEA 2 Top-down
  //밑에서부터 확인하는 것이 아니라 위에서(가장 큰 수열부터) 확인.
  //어떤 수열이 팰린드롬이면 그 수열에서 양 끝을 땐 수열도 팰린드롬.
  //어떤 수열이 팰린드롬이 아니면 그 수열에서 양 끝을 땐 수열도 팰린드롬이 아님.
  //!-> 3% TIMEOUT : O(n^3) 

  //! IdEA 3 Diagnal
  //양 쪽에 대해 한 끝 원소부터 반대까지 1~n개에 대한 수열이 팰린드롬인지 확인, 맞으면 수열의 양 끝을 제외해도 팰린드롬, ! 아니면 제외해도 아님. > wrong..
  //대각선 인덱스 dp. (x+y)
  //O( 2*n^2 )
"""

dp = [[-1 for _ in range(2002)] for __ in range(2002)]
n = int(input())
inputs = list(map(int, input().split()))
inputs.insert(0, 0)
qn = int(input())

start = 1
end = n

for i in range(1, n+1):
  dp[i][i] = 1

for i in range(1, n):
  if(inputs[i] == inputs[i+1]):
    dp[i][i+1] = 1
  else:
    dp[i][i+1] = 0

for l in range(2, n+1):
  for x in range(1, n-l+1):
    start = x
    end = x+l
    if(dp[start+1][end-1]==1):
      if(inputs[start]==inputs[end]):
        dp[start][end] = 1
      else:
        dp[start][end] = 0
    else:
      dp[start][end] = 0

for i in range(qn):
  s, e = map(int, input().split())
  print(dp[s][e])