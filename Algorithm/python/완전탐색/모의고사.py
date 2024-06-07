def solution(answers):
    answer = []
    fir = 1
    secI = 0
    secs = [2,1,2,3,2,4,2,5]
    trdI = 0
    trds = [3,3,1,1,2,2,4,4,5,5]
    
    points = [0,0,0]
    for i in range(len(answers)):
        if fir == answers[i]:
            points[0] += 1
        if secs[secI] == answers[i]:
            points[1] += 1
        if trds[trdI] == answers[i]:
            points[2] += 1
        
        fir = fir%5 + 1
        secI = (secI+1) % len(secs)
        trdI = (trdI+1) % len(trds)
    
    for p in range(len(points)):
        if points[p] == max(points):
            answer.append(p+1)
    return answer