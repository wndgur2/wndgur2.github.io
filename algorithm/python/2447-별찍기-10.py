def blank(x, y, n):
    while n>1:
        if(x%n>=n/3 and x%n<n*2/3):
            if(y%n>=n/3 and y%n<n*2/3):
                return True
        n=n/3
    return False
a = int(input())

s = ""
for y in range(int(a/2)+1):
    for x in range(a):
        if(blank(x, y, a)):
            s += ' '
        else:
            s += '*'
    s+='\n'
print(s, end='')
print(s[-3-a::-1])