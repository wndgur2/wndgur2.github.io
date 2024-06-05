def solution(arr):
    answer = []
    answer.append(arr[0])
    for n in arr:
        if(n==answer[len(answer)-1]):
            continue
        answer.append(n)
    return answer