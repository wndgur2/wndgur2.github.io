def solution(sizes):
    '''
    가장 작은 넓이를 유지하면서 리스트를...
    [[60, 50], [30, 70], [60, 30], [80, 40]]
    w. h. 
    60 50
    70 50
    60 50
    80 50 = 4000
    
    [[10, 7], [12, 3], [8, 15], [14, 7], [5, 15]]	
    w. h. 
    10 7 = 70
    12 7 = 84
    15 8 = 120
    15 8
    15 8
    '''
    #일단 하나 넣어놓기
    w, h = sizes.pop()
    answer = w * h
    for size in sizes:
        _w, _h = size
        #그대로 넣는 경우
        widthA = w if w > _w else _w
        heightA = h if h > _h else _h
        areaA = widthA * heightA
        #눕혀서 넣는 경우
        widthB = w if w > _h else _h
        heightB = h if h > _w else _w
        areaB = widthB * heightB
        
        if areaA < areaB:
            w = widthA
            h = heightA
            answer = areaA
        else:
            w = widthB
            h = heightB
            answer = areaB
    
    return answer