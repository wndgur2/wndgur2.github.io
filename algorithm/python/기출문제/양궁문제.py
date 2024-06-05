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
def solution(n, info):
    answer = [0 for _ in range(11)]
    outputs = []
    target_point = 10
    for i in info:
        if i != 0:
            output = target_point*2 / (i+1)
        else:
            output = target_point / (i+1)
        outputs.append(output)
        target_point -= 1
    while n > 0:
        #best target index from end
        idx = max(enumerate(outputs), key=lambda x: (x[1], x[0]))[0]
        arrow_cost = info[idx] + 1
        if idx == 10: #어떤 과녁을 쏘더라도 어피치를 넘을 수 없을 때
            arrow_cost = 1
        if n >= arrow_cost:
            n -= arrow_cost
            answer[idx] += arrow_cost
        outputs[idx] = -1
    point_Ryan = 0
    point_Apeach = 0
    for i, shots in enumerate(answer):
        if shots > info[i]:
            point_Ryan += 10-i
        elif info[i] > 0:
            point_Apeach += 10-i
    if point_Ryan > point_Apeach:
        return answer
    return [-1]

print(solution(10, [0,0,0,0,0,2,2,2,2,2,0]))