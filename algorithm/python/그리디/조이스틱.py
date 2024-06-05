'''
    왼쪽 커서는 중간에 A가 있어 지나칠 필요가 없을 경우 사용한다.
    다음 A가 아닌 문자로 가기 위해 왼쪽으로 갈것인지, 오른쪽으로 갈 것인지 판단해야한다.
    
    나머지는 해당 알파벳이 위냐 아래냐만 판단하면 되는 문제이다.
    
    좌우 이동 비용과 위아래 이동 비용을 따로 계산해도 된다.
    
    A-Z를 숫자로 매칭하고, (ASCII를 이용한다. 65-90)
    두 알파뱃의 최소 차이가 최소 이동 수일 것이다.
'''

horizontalCosts = []
def getHorizontalCost(cost, index, string, visits, direction):
    visits[index] = 1

    if len(string) == visits.count(1):
        horizontalCosts.append(cost)
        return

    index = (index+direction) % len(string)
    cost+= 1
    
    while visits[index] == 1:
        visits[index] = 1
        index = (index+direction) % len(string)
        cost += 1
    getHorizontalCost(cost, index, string, visits[:], direction=1)
    getHorizontalCost(cost, index, string, visits[:], direction=-1)


def solution(name):
    answer = 0
    shouldVisit = [1 for _ in range(len(name))]
    for i in range(len(name)):
        if name[i] == 'A':
            shouldVisit[i] = 0
    
    #좌우 이동 비용
    getHorizontalCost(cost = 0, index = 0, string = name, visits = [1 if _ == 'A' else 0 for _ in name], direction=1)
    getHorizontalCost(cost = 0, index = 0, string = name, visits = [1 if _ == 'A' else 0 for _ in name], direction=-1)
    
    answer += min(horizontalCosts)
    
    #상하 이동 비용
    for letter in name:
        a = abs(ord(letter) - ord('A'))
        b = abs((ord(letter)-26)- ord('A'))
        answer += a if a < b else b
    
    return answer

solution("AAAAABBAAAAAAABAAA")