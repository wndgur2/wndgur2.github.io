'''
    쏠 과녁에 대한 점수 효율을 계산한다.

    무조건 최고 효율부터 쏴야한다는 것은 틀렸다.
    주어진 화살 개수를 효율적으로 사용하지 않을 수도 있기 때문.
    ex) 10발의 화살이 있다.
        소모 화살 수, 효율이 다음과 같을 때.
            1. 8발 10
            2. 4발 9
            3. 6발 9
        효율순 알고리즘은 1.을 마치고 끝이날 것이지만,
        실제 최고 점수를 내려면 10발을 다 사용할 수 있는 2와 3을 택해야 한다.

    결국 완전탐색해야하는 문제인가?
    그렇다면 이렇게 하자.
        - 각 점수의 과녁을 한 노드로 본다.
        - visit한 노드는 다시 방문할 수 없다. (중복 점수 획득 불가)
        - 자원은 n으로 시작하며, 각 노드에 소모되는 자원과 획득하는 점수가 정해져있다.
        - 점수는 어피치가 쐈던 과녁일 경우 두배가 된다. (어피치가 받을 점수를 뺏으므로)
        - 가장 낮은 점수의 노드를 방문하는 것부터 탐색한다.
'''
def search(path, arrows, point, idx):
    if arrows==0:
        points.append((point, path)) #점수차와 과녁배열을 담아야 함.
        return
    if idx < 0 :
        return
    if idx == 10:
        for i in range(arrows, 0, -1):
            search([0,0,0,0,0,0,0,0,0,0,i], arrows-i, 0, 9)
    if arrows > information[idx]:
        new_path = path[:]
        new_path[idx] += information[idx] + 1
        getting_point = 10-idx
        if information[idx] > 0: # 어피치꺼 뺏어오기
            getting_point *= 2
        search(new_path, arrows - (information[idx] + 1), point + getting_point, idx-1)
    else:
        if idx == 0:
            return
    search(path, arrows, point, idx-1)

def solution(n, info):
    global point_cost, points, information
    points = []
    information = info
    search([0 for _ in range(11)], n, 0, 10)
    max_point = max(points)[0]
    answers = []
    for po in points:
        if po[0] == max_point:
            answers.append(po[1])
    point_Ryan = 0
    point_Apeche = 0
    arr = answers[0]
    for i, ryans in enumerate(arr):
        if ryans > info[i]:
            point_Ryan += 10-i
        elif info[i] > ryans:
            point_Apeche += 10-i
    if point_Apeche >= point_Ryan:
        return [-1]
    return arr

print(solution(1, [1,0,0,0,0,0,0,0,0,0,0]))