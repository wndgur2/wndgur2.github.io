import sys

while True:
    S = list(map(int, sys.stdin.readline().split()))
    if S[0] == 0:
        break

    answer = 0
    stack = []
    for i in range(1, len(S)): # i : 각 원소의 index
        right = i-1
        while len(stack) > 0 and S[stack[len(stack)-1]] > S[i]: # 지금 들어온 h보다 큰 스택의 원소 pop
            temp = stack.pop()
            left = 1 if len(stack) == 0 else stack[len(stack)-1] + 1 # 작아지는 경우 해당 원소가 스택에서 pop되었을 것이므로, left는 항상 해당 원소의 index다.
            answer = max(answer, S[temp] * (right - left + 1))
        stack.append(i) # index를 stack.
    
    right = len(S)-1
    while len(stack) > 0: # 아직 pop되지 않은 값들 해결. 1~n번 호출
        temp = stack.pop()
        left = 1 if len(stack) == 0 else stack[len(stack)-1] + 1
        answer = max(answer, S[temp] * (right - left + 1))
    
    print(answer)
    