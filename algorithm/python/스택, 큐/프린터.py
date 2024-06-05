def solution(priorities, location):
    answer = 1
    locs = [[] for _ in range(10)]
    lenPriorities = len(priorities)
    
    for pI in range(lenPriorities):
        locs[priorities[pI]].append(pI)
    index = 0
    for p in range(9, priorities[location]-1, -1):
        for loc in locs[p]:
            if(loc<index):
                locs[p].append(loc+lenPriorities)
                continue
            elif(loc%lenPriorities==location):
                return answer
            else:
                answer += 1
            index = loc

    return answer
