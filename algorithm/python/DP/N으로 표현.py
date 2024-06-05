'''
    더하거나 빼거나 나누거나 곱하거나 붙이거나(곱하기 10 더하기 N)
'''

def solution(N, number):
    if(N == number):
        return 1
    caseSets = [set({}) for _ in range(9)] #9개의 집합을 담는 리스트. 각 집합은 N을 i개 사용한 조합을 담음.
    caseSets[1] = {N} #N을 1개 사용한 조합 집합.
    for A in range(2, 9):
        caseSets[A].add(list(caseSets[A-1])[0]*10 + N)
    
    #caseSets[1]을 이용해 경우를 확장. 0~n번째 리스트를 가지고 n+1번째 리스트를 만든다.
    for setIndex in range(2, 9): # 2~8의 리스트를 생성함.
        '''
            두 리스트의 gap은 i가 
            2일 때는 0 (index가 1, 1이어야 하므로 )
            3일 때는 1 (index가 1, 2여야 하므로)
            4일 때는 0 혹은 2
            5일 때는 1 혹은 3
            6일 때는 0, 2, 4
            7일 때는 1, 3, 5
            8일 때는 0, 2, 4, 6
            
            규칙이 있다.
            짝수 개의 N을 사용하면 0부터 시작하고
            홀수 개의 N을 사용하면 1부터 시작한다.
            또한 gap은 2씩 증가하며
            가장 큰 gap은 index를 -2한 값이다.

            이 gap을 아래 for문으로 작성함.
        '''
        for gap in range(setIndex%2, setIndex-1, 2): #setIndex가 8일 때 gap은 0 2 4 6

            #중간값
            mid = setIndex // 2

            #아래는 이 gap을 둔 두 개의 리스트를 합치는 이중 포문이다.
            for A in caseSets[mid - gap//2]: #4, 3, 2, 1
                for B in caseSets[mid + (gap+1)//2]: # 4, 5, 6, 7
                    caseSets[setIndex].add(A+B)
                    caseSets[setIndex].add(A*B)
                    caseSets[setIndex].add(A-B)
                    caseSets[setIndex].add(B-A)
                    if B != 0:
                        caseSets[setIndex].add(A//B)
                    if A != 0:
                        caseSets[setIndex].add(B//A)

        if number in caseSets[setIndex]:
            return setIndex
    return -1