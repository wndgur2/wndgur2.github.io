from queue import Queue
import math

def solution(progresses, speeds):
    answer = []
    que = Queue()
    l = len(progresses)
    
    for p in range(l):
        que.put(math.ceil((100-progresses[p]) / speeds[p]))
    
    maxT = 0
    count = -1
    while not que.empty():
        t = que.get()
        if(maxT < t):
            maxT = t
            answer.append(count)
            count = 1
        else:
            count += 1
    answer.append(count)
    return answer[1:]