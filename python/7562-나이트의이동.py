import sys

T = int(sys.stdin.readline())
for _ in range(T):
  l = int(sys.stdin.readline())
  x1, y1 = map(int, sys.stdin.readline().split())
  x2, y2 = map(int, sys.stdin.readline().split())

  qA = [[x1, y1]]
  qB = []
  q = [qA, qB]
  qI = 0
  n = 0
  board = [[0 for _ in range(l)] for __ in range(l)]
  end = False
  while not end:
    for x, y in q[qI%2]:
      if(x==x2 and y==y2):
        print(n)
        end = True
        break
      # RIGHT
      if(x+2 < l):
        # R UP
        if(y+1 < l):
          if(not board[y+1][x+2]):
            q[(qI+1)%2].append([x+2, y+1])
            board[y+1][x+2] = 1
        # R DOWN
        if(y-1>=0):
          if(not board[y-1][x+2]):
            q[(qI+1)%2].append([x+2, y-1])
            board[y-1][x+2] = 1
      # LEFT
      if(x-2 >= 0):
        # L UP
        if(y+1 < l):
          if(not board[y+1][x-2]):
            q[(qI+1)%2].append([x-2, y+1])
            board[y+1][x-2] = 1
        # L DOWN
        if(y-1>=0):
          if(not board[y-1][x-2]):
            q[(qI+1)%2].append([x-2, y-1])
            board[y-1][x-2] = 1
      # UP
      if(y+2 < l):
        # U RIGHT
        if(x+1 < l):
          if(not board[y+2][x+1]):
            q[(qI+1)%2].append([x+1, y+2])
            board[y+2][x+1] = 1
        # U LEFT
        if(x-1>=0):
          if(not board[y+2][x-1]):
            q[(qI+1)%2].append([x-1, y+2])
            board[y+2][x-1] = 1
      # DOWN
      if(y-2 >= 0):
        # D RIGHT
        if(x+1 < l):
          if(not board[y-2][x+1]):
            q[(qI+1)%2].append([x+1, y-2])
            board[y-2][x+1] = 1
        # D LEFT
        if(x-1>=0):
          if(not board[y-2][x-1]):
            q[(qI+1)%2].append([x-1, y-2])
            board[y-2][x-1] = 1
    q[qI%2] = []
    qI += 1
    n += 1
    