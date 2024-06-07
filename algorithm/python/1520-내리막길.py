"""
  Counting the number of downroads.
  내리막길 경로 개수

  max size: 500x500
  max height: 10000

  TODO IDEA 1
  array of topography. (n+1, m+1)
  fill the edges of the array with height 10000
  a pointer starts at [1, 1]
  it goes to up/down/left/right if the block is lower. (check if)
  if pointer arrives at endpoint res+=1
  if pointer is not at the endpoint and has nowhere to go, return 0

  time complecity: O( 3^(n*m) )
!  -> TIME OUT 16%

  TODO IDEA 1-2

  memorize the successed route
  if other route reaches one node of the successed route, res += 1 and return
!  -> MISS THE CASES OVERWRAPPED ROUTE.

  TODO IDEA 1-2-2

  memorize the number of successful cases from the block.
  if another route A joins the successed route B, all blocks on A = the number of block of B
! -> TIME OUT 40%
~ Optimize (Check even if the block doesn't successed finishing.)> SUCCESS!


  TODO IDEA 1-3

  memorize the movable direction of each block.
! -> NOT CRITICAL CHANGE OF TIME

"""

def rec(x, y):
  t = topo[y][x]

  if(suc[y][x]!=-1):
    return suc[y][x]
  
  suc[y][x] = 0
  #RIGHT
  if(topo[y][x+1] < t):
    suc[y][x] += rec(x+1, y)

  #LEFT
  if(topo[y][x-1] < t):
    suc[y][x] += rec(x-1, y)

  #UP
  if(topo[y+1][x] < t):
    suc[y][x] += rec(x, y+1)

  #DOWN
  if(topo[y-1][x] < t):
    suc[y][x] += rec(x, y-1)
  
  return suc[y][x]

n, m = map(int, input().split())

topo = [[10000 for _ in range(m+2)] for __ in range(n+2)]
suc = [[-1 for _ in range(m+2)] for __ in range(n+2)]
suc[n][m] = 1

for y in range(1, n+1):
  inp = list(map(int, input().split()))
  for x in range(1, m+1):
    topo[y][x] = inp[x-1]


print(rec(1, 1))