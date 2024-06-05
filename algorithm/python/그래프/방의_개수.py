'''
    순환이 있으면 방이다.
    뒤돌지 않고(자신 말고) 방문했던 곳에 도달하면 순환이 있는 것이다.
    두 BFS가 만났을 때, 두 경로를 합쳐 방문했던 어떤 경로로도 돌아가지 않게 한다.
'''

from collections import deque

def solution(arrows):
    answer = 0
    visited = set({})
    visitedLink = set({})
    x, y = 0, 0
    for arrow in arrows:
        for i in range(2):
            visited.add((x, y))
            befX = x
            befY = y
            if arrow == 0:
                y -= 1
            elif arrow == 1:
                x += 1
                y -= 1
            elif arrow == 2:
                x += 1
            elif arrow == 3:
                x += 1
                y += 1
            elif arrow == 4:
                y += 1
            elif arrow == 5:
                x -= 1
                y += 1
            elif arrow == 6:
                x -= 1
            elif arrow == 7:
                x -= 1
                y -= 1
            if (x, y) in visited:
                if not ((befX, befY),(x, y)) in visitedLink:
                    if not ((x, y), (befX, befY)) in visitedLink:
                        answer += 1
            visitedLink.add(((befX, befY), (x, y)))
    return answer

print(solution([6, 6, 6, 4, 4, 4, 2, 2, 2, 0, 0, 0, 1, 6, 5, 5, 3, 6, 0]))