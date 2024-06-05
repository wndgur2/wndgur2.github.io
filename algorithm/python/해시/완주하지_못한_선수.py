def solution(participant, completion):
    answer = ''
    namesP = {}
    namesC = {}
    for name in participant:
        if name in namesP:
            namesP[name] += 1
        else:
            namesP[name] = 1

    for name in completion:
        if name in namesC:
            namesC[name] += 1
        else:
            namesC[name] = 1
            
    for name in participant:
        if not name in namesC:
            return name
        elif namesC[name] != namesP[name]:
            return name

    return answer