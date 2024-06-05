def solution(prices):
    l = len(prices)
    answer = [0 for _ in range(l)]
    stack = [(0, -1)] # price, index
    
    for p in range(l):
        while( prices[p] < stack[-1][0] ):
            index = stack.pop()[1]
            answer[index] = p - index
        stack.append((prices[p], p))
    for s in stack[1:]:
        answer[s[1]] = l - s[1] - 1
    
    return answer