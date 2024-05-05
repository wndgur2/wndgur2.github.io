def getSplitSum(n):
    strN = str(n)
    result = n
    for s in range(len(strN)-1, -1, -1):
        result += int(strN[s])
    return result

inputN = int(input())
structorExist = False
for i in range(int(inputN/2), inputN):
    if(getSplitSum(i)==inputN):
        print(i)
        structorExist = True
        break
if not structorExist:
    print(0)