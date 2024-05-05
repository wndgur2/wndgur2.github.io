def solution(clothes):
    hash_map = {}

    for c, t in clothes:
        if t in hash_map:
            hash_map[t] += 1
        else:
            hash_map[t] = 1
    
    answer = 1
    for n in hash_map:
        answer *= hash_map[n]+1
    return answer - 1