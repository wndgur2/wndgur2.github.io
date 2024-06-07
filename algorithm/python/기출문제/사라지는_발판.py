'''
    1. 누가 이기는 맵인지 알아야함.
     : how?
      - 탐욕법으로 작은 승리패턴을 확장?
      - 11이면 A가 이김
      - 111이면 B가 이김
      - 1111이면 A가 이김
      ...
      남은 1의 모양 찾아서?
      
    
    2. 버틸 수 있는 횟수를 알아야 함.
     : 완전탐색
    
    DFS 미니맥스알고리즘
'''
def search(turn, aloc, bloc, board):
    dy = [0, 1, 0, -1]
    dx = [1, 0, -1, 0]
    for i in range(4):
        y = aloc[0]+dy[i]
        x = aloc[1]+dx[i]
        if (y >= 0) and y < len(board):
            if (x >= 0) and x < len(board[0]):
                if board[y][x] == 1:
                    board[aloc[0]][aloc[1]] = 0
                    r = search(turn + 1, [y, x], bloc, board)
                    board[aloc[0]][aloc[1]] = 1
                    if r % 2 == turn % 2:
                        if r > max_turn:
                            max_turn = r
                    else:
                        if r < min_turn:
                            min_turn = r
    return turn
def solution(board, aloc, bloc):
    answer = -1
    return search(0, aloc, bloc, board)