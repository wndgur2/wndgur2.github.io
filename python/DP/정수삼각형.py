def solution(triangle):
    results = [triangle[0][0]]
    for layer in triangle[1:]:
        temp = results
        twoDArr = [[] for _ in range(len(temp)+1)]
        for t in range(len(temp)):
            twoDArr[t].append(temp[t]+layer[t])
            twoDArr[t+1].append(temp[t]+layer[t+1])
        results = []
        for t in twoDArr:
            results.append(max(t))
    return max(results)