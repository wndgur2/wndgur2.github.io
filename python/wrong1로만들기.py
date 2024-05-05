n = int(input())


def reduce(tempN):
    if(tempN == 1):
        return 0
    if(tempN % 3 == 0):
        return 1 + reduce(tempN/3)
    else:
        if(tempN % 2 == 0):
            divTwoNotFound = False
            divTwo = 1 + reduce(tempN/2)
        else:
            divTwoNotFound = True
        mOne = 0
        while(tempN % 3 != 0):
            tempN -= 1
            mOne += 1
            if(tempN == 1):
                return mOne
            if(tempN % 2 == 0 and divTwoNotFound):
                divTwo = mOne + 1 + reduce(tempN/2)
                divTwoNotFound = False
        divThree = mOne + 1 + reduce(tempN/3)
        if(divThree < divTwo):
            return divThree
        else:
            return divTwo


print(reduce(n))
