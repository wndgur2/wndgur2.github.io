'''
    변환 가능한 단어끼리 링크를 연결.
    시작 단어부터 목표 단어까지 경로 찾기.
'''

from collections import deque

def isConvertible(strA, strB):# 두 문자열 간 변환 가능한지 체크하는 함수.
    #길이가 다르면 0 리턴
    if len(strA) != len(strB):
        return False
    
    #다른 문자 개수 세기
    dif = 0
    for i in range(len(strA)):
        if strA[i] != strB[i]:
           dif += 1
    
    #다른 문자가 1개가 아니면 0 리턴
    if dif != 1:
        return False
    
    #나머진 모두 변환 가능한 경우
    return True

def solution(begin, target, words):
    if target not in words:
        return 0
    answer = 100
    #링크테이블 만들기
    words.insert(0, begin)
    targetIdx = words.index(target)
    linkTable = [[0 for _ in range(len(words))] for __ in range(len(words))]
    for i in range(len(linkTable)):
        for j in range(len(linkTable[i])):
            if isConvertible(words[i], words[j]):
                linkTable[i][j] = 1
    q = deque([(0, 0)])
    visited = set({})
    while q:
        idx, cost = q.popleft()
        if idx == targetIdx:
            if answer > cost:
                answer = cost
            continue
        if idx in visited:
            continue
        visited.add(idx)
        
        for j in range(len(linkTable[idx])):
            if linkTable[idx][j]:
                q.append((j, cost+1))
    if answer == 100:
        return 0
    return answer
    
print(solution("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]	))