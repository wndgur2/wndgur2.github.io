def binaryCount(x, arr):
  l = len(arr)
  midIdx = (l-1)/2 # 홀수면 가운데 짝수면 왼쪽
  if(arr[midIdx] == x):
    return binaryCount(x, arr[midIdx+1:]) - binaryCount(x, arr[:midIdx-1])

n = input()
cards = list(map(int, input().split()))
cards.sort()
countN = input()
nums = list(map(int, input().split()))
result = ""

# nums들에 대해서 카운팅하는데 바이너리 서치.
for x in nums:
  result += binaryCount(x, cards) + ' '