def isApoNum(numberString):
    count = 0
    for c in numberString:
        if(c=='6'):
            count += 1
        else:
            count = 0
        if(count == 3):
            return True
    return False

n = int(input())
numN = 0
for i in range(666, 2666800):
    if(isApoNum(str(i))):
        numN += 1
        if(n==numN):
            print(i)
            break