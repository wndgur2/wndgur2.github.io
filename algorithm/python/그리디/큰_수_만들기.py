'''
    오른쪽으로 갈 수록,
    자릿수가 작아질수록 그 중요도가 낮아진다.
    
    붙어있는 숫자는 둘 중 하나가 제거되었을 때 같은 자리에 오게된다.
        예) 1592에서 
        1과 5는 192, 592로 같은 100의 자리,
        5와 9는 152, 192로 같은 10의 자리,
        9와 2는 159, 152로 같은 1의 자리에 오게 된다.
    
    따라서 앞에 있는 작은 수를 제거하면 되지만,
    2자리마다 검사한다. (같은 우선순위라고 할 수 있다)
    
    예로, 1924에서 19를 검사해 1을 제거,
    92를 검사,
    24를 검사해 2를 제거한다.
    
    만약 987654이라면,
    하나도 제거하지 않은 상태에서 마지막 54를 검사하게 될 것이고
    이 두 숫자를 제거하면 된다. ('k-제거된 개수' 만큼)

    @ 4177에서 17을 검사해 1을 제거했으면,
    77을 검사하기 전에 index를 1칸 왼쪽으로 옮겨 47을 다시 검사한다.
    4177 > 477 > 77
'''

def solution(number, k):
    removed = 0
    answer = '9' + number
    i = 1
    while (i < len(answer)) and (removed < k):
        if int(answer[i]) > int(answer[i-1]): #앞에가 더 작음
            answer = answer[:i-1] + answer[i:]
            removed += 1
            i -= 1
            continue
        i += 1
        if removed == k:
            return answer[1:]
    if removed < k:
        return answer[1:-(k-removed)]
    return answer[1:]
