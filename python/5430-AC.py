import sys
T = int(input())
for i in range(T):
    r=0
    p = sys.stdin.readline()
    n = int(input())
    arr = list(input())
    for c in p:
        if(c=='R'):
            r+=1
        elif(c=='D'):
            if(r%2==0):
                arr.pop()
            else:
                arr=arr[:-1]
    
    print('[', end='')
    for a in arr:
        print(arr, end='')
    print(']')
    
