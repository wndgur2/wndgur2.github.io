def solve_ass(stack, available_time, result): #available_time을 소모해 stack의 과제 수행
    if(available_time == 0 or len(stack)==0):
        return result
    if(stack[-1][2] <= available_time):
        available_time -= stack[-1][2]
        result.append(stack.pop()[0])
        solve_ass(stack, available_time, result)
    else:
        stack[-1][2] -= available_time
        return result
    return result

def solution(plans):
    answer = []
    plans.sort(key=lambda x: x[1])
    stack = []
    time = 0
    for next_ass, next_start, next_term in plans:
        hour, minute = map(int, next_start.split(":"))
        next_start = hour * 60 + minute
        if(len(stack)==0):
            stack.append([next_ass, next_start, next_term])
        else:
            time = int(stack[-1][1])
            res = solve_ass(stack, next_start - time, [])
            if(res):
                answer.append(res)
    return answer
print(solution([["A", "00:00", 30], ["B", "00:10", 10], ["C", "00:40", 50], ["D", "00:60", 50]])) #BACD