def min(ar):
    minimum = 10000
    for i in ar:
        if i <= minimum:
            minimum = i
    return minimum


def reduce(tempN):
    if(tempN == 1):
        return 0
    foundThree = False
    foundTwo = False
    minusOne = 0
    divTwo = 10000
    divTwo2 = 10000
    divThree = 10000
    divThree2 = 10000
    while 1:
        if tempN % 3 == 0:
            if not foundThree:
                foundThree = True
                if not (tempN/3 in reduceDict):
                    reduceDict[tempN/3] = reduce(tempN/3)
                divThree = minusOne + 1 + reduceDict[tempN/3]
            else:
                if not (tempN/3 in reduceDict):
                    reduceDict[tempN/3] = reduce(tempN/3)
                divThree2 = minusOne + 1 + reduceDict[tempN/3]
                break
        if tempN % 2 == 0:
            if not foundTwo:
                foundTwo = True
                if not (tempN/2 in reduceDict):
                    reduceDict[tempN/2] = reduce(tempN/2)
                divTwo = minusOne + 1 + reduceDict[tempN/2]
            else:
                if not (tempN/2 in reduceDict):
                    reduceDict[tempN/2] = reduce(tempN/2)
                divTwo2 = minusOne + 1 + reduce(tempN/2)
                break
        tempN -= 1
        minusOne += 1
        if(tempN == 1):
            return min([divTwo, divTwo2, divThree, divThree2, minusOne])
    return min([divTwo, divTwo2, divThree, divThree2])


reduceDict = dict()
print(reduce(int(input())))
