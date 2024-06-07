def solution(numbers):
    answer = ''
    strsByStart = [[] for _ in range(10)]
    for n in numbers:
        l = len(str(n))-1
        firstNum = int(n/pow(10, l))
        strsByStart[firstNum].append(str(n))
    
    for startNum in range(9, -1, -1):
        #여기가 문제 [3, 30, 34] -> [34, 3, 30]
        # [[333, 0], [303, 1], [343, 2]]
        # -> [[343, 2], [333, 0], [303, 1]]
        
        arrForSort = []
        for i in range(len(strsByStart[startNum])):
            tmp = strsByStart[startNum][i]
            for j in range(len(tmp), 4):
                tmp += str(startNum)
            arrForSort.append([int(tmp), i])
        
        arrForSort.sort(reverse = True)
        
        for i in arrForSort:
            answer += strsByStart[startNum][i[1]]
        
    return str(int(answer))


print(solution([0, 0, 0]))
