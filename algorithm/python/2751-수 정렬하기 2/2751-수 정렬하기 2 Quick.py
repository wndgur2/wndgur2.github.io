def quickSort(array, sp, ep):
    i = sp
    j = ep-1
    p = array[ep]
    while i!=j:
        if(array[i]<p):
            i+=1
        elif(array[j]>p):
            j-=1
        else:
            t=array[i]
            array[i]=array[j]
            array[j]=t
    if(array[j]>p):
        array[ep]=array[j]
        array[j]=p
        if(sp<j-1):
            quickSort(array, sp, j-1)
        if(j+1<ep):
            quickSort(array, j+1, ep)
    else:
        array[ep]=array[j+1]
        array[j+1]=p
        if(sp<j):
            quickSort(array, sp, j)
        if(j+2<ep):
            quickSort(array, j+2, ep)
from sys import stdin
import time
n = int(stdin.readline())
result = [0]*n
for i in range(n):
    result[i] = int(stdin.readline())
stt=time.time()
quickSort(result, 0, n-1)
edt=time.time()
s = ""
for i in result:
    s += str(i)+'\n'
#print(s)
print(edt-stt)