'''
    문제 설명이 풀이 ?
    맵을 2차원리스트, 각 값을 내구도라고 하면
    최대 1000 x 1000 x 250000 = 2500억
    시간초과가 나겠구나
    
    알고보니 각 스킬의 데미지를 계산해놓고 마지막에 각 건물에 대입하는 것
    근데 스킬 데미지 계산할 때에도 오랜 시간이 걸릴텐데
    
    체력이 5인 1차원 건물 배열 0,1,2,3,4가 있을 때0~4를 1데미지씩 5번 준다고 해보자.
    
    [5,5,5,5,5] -> [4,4,4,4,4] -> ... -> [0,0,0,0,0]: 5x5회 돎
    
    그런데 누적합을 이용하면
    [5,5,5,5,5]
    추가 임시 배열
    [-1,0,0,0,0,1] -> [-2,0,0,0,0,2] -> ... -> [-5,0,0,0,0,5]
    -> [0,0,0,0,0] : 5 + 5회 돎.
'''
def solution(board, skill):
    sum_array = [[0 for _ in range(len(board[0])+1)] for __ in range(len(board)+1)]
    for t, r1, c1, r2, c2, degree in skill:
        if t == 2:
            degree *= -1
        sum_array[r1][c1] -= degree
        sum_array[r1][c2+1] += degree
        sum_array[r2+1][c1] += degree
        sum_array[r2+1][c2+1] -= degree
        print()
        for s in sum_array:
            print(s)
    
    for x in range(len(sum_array[0])):
        val = 0
        for y in range(len(sum_array)):
            sum_array[y][x] += val
            val = sum_array[y][x]
    
    print("D")
    for s in sum_array:
        print(s)
    print()

    for y in range(len(sum_array)):
        val = 0
        for x in range(len(sum_array[0])):
            val += sum_array[y][x]
            if y < len(board):
                if x < len(board[0]):
                    board[y][x] += val
                

    answer = 0
    for y in board:
        print(y)
        for c in y:
            if c > 0:
                answer += 1
    return answer
print(solution([[5,5,5,5,5],[5,5,5,5,5],[5,5,5,5,5],[5,5,5,5,5]],[[1,0,0,3,4,4],[1,2,0,2,3,2],[2,1,0,3,1,2],[1,0,1,3,3,1]]))