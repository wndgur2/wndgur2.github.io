import heapq

def solution(operations):
    answer = []
    minHeap = []
    maxHeap = []
    minPops = {}
    maxPops = {}
    
    num = 0
    
    for operation in operations:
        op, val = operation.split()
        val = int(val)
        if op == 'I':
            heapq.heappush(minHeap, val)
            heapq.heappush(maxHeap, [-val, val])
            num += 1
        elif num > 0:
            num -= 1
            if val == -1:
                popped = heapq.heappop(minHeap)
                if popped in minPops:
                    minPops[popped] += 1
                else:
                    minPops[popped] = 1
            else:
                popped = heapq.heappop(maxHeap)
                if popped[1] in maxPops:
                    maxPops[popped[1]] += 1
                else:
                    maxPops[popped[1]] = 1
        if num > 0:
            if minHeap[0] in maxPops:
                if maxPops[minHeap[0]] > 0:
                    t = heapq.heappop(minHeap)
                    maxPops[t] -= 1
                    
            if maxHeap[0][1] in minPops:
                if minPops[maxHeap[0][1]] > 0:
                    t = heapq.heappop(maxHeap)
                    minPops[t[1]] -= 1
            
    if num > 0:
        return [heapq.heappop(maxHeap)[1], heapq.heappop(minHeap)]
    else:
        return [0, 0]