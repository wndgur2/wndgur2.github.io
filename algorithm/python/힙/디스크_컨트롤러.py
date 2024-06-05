import heapq

def solution(jobs):
    length = len(jobs)
    answer =0
    
    heapq.heapify(jobs)
    smallHeap = []
    time = 0
    endTime = 0

    while (len(jobs) > 0) or (len(smallHeap) > 0):
        if (len(jobs) > 0) and (jobs[0][0] <= time):
            s = heapq.heappop(jobs)
            heapq.heappush(smallHeap, [s[1], s[0]])
        
        if (len(smallHeap)) and (time >= endTime):
            p = heapq.heappop(smallHeap)
            answer += time - p[1] + p[0]
            endTime = time + p[0]
        time += 1
    return answer//length