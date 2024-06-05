'''
    여벌이 있는 학생이,
    앞 학생 우선으로 빌려주면 될듯
    
    빌려주거나, 빌려야 하는 학생을 판단하는 기준은,
    이 학생의 체육복 개수
'''
def solution(n, lost, reserve):
    answer = 0
    amounts = [1 for _ in range(n+1)]
    for lostStudent in lost:
        amounts[lostStudent] -= 1
    for reservedStudent in reserve:
        amounts[reservedStudent] += 1
    
    bef = 1
    for i in range(len(amounts)):
        if (bef==0) and (amounts[i]==2):
            amounts[i-1] = 1
            amounts[i] -= 1
        if (bef==2) and (amounts[i]==0):
            amounts[i-1] = 1
            amounts[i] = 1
        
        bef = amounts[i]
    
    for a in amounts:
        if a >= 1:
            answer += 1
    return answer-1