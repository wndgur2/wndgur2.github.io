def solution(citations):
    # [0,1,3,5,6] -> 3
    # [1,5,11,40,205] -> 4
    # [2,9,11,12,13,14,20,21,23,101,105,106] -> 10
    # [0,1,3,5,6] -> 3
    citations.sort()
    
    #citations[i] 이상 값이 i개 이상 있으면 continue, 없으면 break 후 남은 개수 return
    for i in range(len(citations)):
        if len(citations) - i > citations[i]: #남은 갯수가 citations[i]를 초과하면 계속
            continue
        return len(citations) - i             #남은 갯수가 citations[i] 이하면 남은 길이(지금 포함) 리턴
    return 0