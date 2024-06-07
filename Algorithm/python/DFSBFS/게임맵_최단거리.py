'''
    사방으로 이동하되, 밟았던 길은 가지 않는다.
    재귀함수로 구현한다.
    매개변수로 지나온 타일을 담는 배열이 있어야 한다.
    적진에 도착했을 때 결과 배열에 지나온 타일의 개수를 추가한다.
    결과 배열의 길이가 0일 경우 -1을 리턴하고,
    결과 배열의 길이가 0이 아닐 경우
    결과 배열의 최솟값을 리턴한다.

    BFS로 구현할 경우 더 적은 경우를 고려해 같은 정답을 찾을 수 있다.
    
'''
def solution(maps):
    q = [[0,0,1]] # x, y, cost
    while q:
        x, y, cost = q.pop(0)
        #적진 도착
        if (x == len(maps[0])-1) and (y == len(maps)-1): 
            return cost
        if maps[y][x] == 0:
            continue
        if x > 0: #좌
            q.append([x-1, y, cost+1])
        if y > 0: #상
            q.append([x, y-1, cost+1])
        if x < len(maps[0])-1: #우
            q.append([x+1, y, cost+1])
        if y < len(maps)-1: #하
            q.append([x, y+1, cost+1])
        maps[y][x] = 0
    return -1
print(solution([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]]))
print(solution([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,0],[0,0,0,0,1]]))
