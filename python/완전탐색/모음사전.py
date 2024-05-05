'''
    +1을 정의해보자
    문자열의 길이가 5 미만일 경우
        A를 append한다.
    예) A+1 = AA, EI+1 = EIA, IUUU+1 = IUUUA
    
    문자열의 길이가 5일 경우
        마지막 문자를 다음 모음으로 바꾼다.
    예) AAAAA+1 = AAAAE, EIAEI+1 = EIAEO, EIAUU+1 = EIEA
    
    바꾸는 문자가 U일 경우 제거하고 앞 문자에 1을 더한다.
    A = 0
    E = 1
    I = 2
    O = 3
    U = 4
'''

def toWord(nums):
    result = ""
    for n in nums:
        if n == 0:
            result += 'A'
        elif n == 1:
            result += 'E'
        elif n == 2:
            result += 'I'
        elif n == 3:
            result += 'O'
        elif n == 4:
            result += 'U'
    return result

def solution(word):
    answer = 1
    countingWord = [0]
    while word != toWord(countingWord):
        answer += 1
        if len(countingWord) < 5:
            countingWord.append(0)
        else:
            while countingWord[-1] == 4:
                countingWord.pop()
            countingWord[-1] += 1
    return answer