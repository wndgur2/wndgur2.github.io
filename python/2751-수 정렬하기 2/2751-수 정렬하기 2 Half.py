def halfSort(array, t, indexS, indexE):
    mid = int((indexS+indexE)/2)
    if(indexE-indexS==1):
        if array[indexS]!=0:
            zeroIndex = indexS
            while array[zeroIndex]!=0:
                zeroIndex-=1
            array[zeroIndex:-1] = array[zeroIndex+1:]
            array[indexS] = t
        else:
            array[indexS] = t
        return 0
    if(t<array[mid]):
        halfSort(array, t, indexS, mid)
    else:
        halfSort(array, t, mid, indexE)
from sys import stdin
import time
n = int(stdin.readline())
st = time.time()
result = [0]*n
for i in range(n):
    t = int(stdin.readline())
    index = halfSort(result, t, 0, len(result))
s=""
for i in result:
    s+=str(i)+"\n"
et = time.time()
print(result)
print(et-st)