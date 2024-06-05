def solution(array, commands):
    answer = []
    for c in commands:
        tmpArr = array[c[0]-1:c[1]]
        tmpArr.sort()
        answer.append(tmpArr[c[2]-1])
    return answer