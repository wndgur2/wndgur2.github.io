'''
    그냥 모든 경우 찾기

    [[최소, 소모], [최소, 소모], [최소, 소모], ... ]

    길이가 8개 밖에 되지 않으니,
    모든 순서를 고려하여 가능한 최대 개수를 센다.
'''

def renewK(ds, leftK):
    k = leftK
    for d in ds:
        if k < d[0]:
            return -1
        k -= d[1]
    return k

def getPath(arr, i):
    if i<len(dungeonsG):
        getPath(arr[:], i+1)
        for j in range(len(arr)+1):
            newArr = arr[:]
            newArr.insert(j, dungeonsG[i])
            if renewK(newArr, kG) >= 0:
                getPath(newArr, i+1)
        if len(arr) == 0:
            if renewK([dungeonsG[i]], kG) >= 0:
                getPath([dungeonsG[i]], i+1)
    else:
        amounts.append(len(arr))


def solution(k, dungeons):
    global dungeonsG
    global kG
    global amounts
    amounts = []
    kG = k
    dungeonsG = dungeons
    getPath([], 0)
    return max(amounts)