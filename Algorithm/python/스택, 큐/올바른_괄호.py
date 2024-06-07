def solution(s):
    openNum = 0
    
    for c in s:
        if(c=='('):
            openNum += 1
        else:
            if(openNum == 0):
                return False
            else:
                openNum -= 1
    if(openNum > 0):
        return False
    
    return True