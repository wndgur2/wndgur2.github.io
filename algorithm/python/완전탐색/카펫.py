def solution(brown, yellow):
    answer = []
    '''
        brown의 경우의 수
         => brown + yellow = w * h
         (w, h) 의 경우의 수들
            에 대하여 (w-1) * (h-1)이 yellow면 출력
    '''
    widthHeights = []
    area = brown + yellow
    for i in range(3, int(area**0.5)+1):
        if area%i == 0:
            widthHeights.append((area//i, i))
    
    for width, height in widthHeights:
        if (width-2)*(height-2) == yellow:
            return [width, height]

print(solution(10, 2))