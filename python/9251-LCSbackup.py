s1 = input()
s2 = input()

i1 = len(s1)-1
i2 = len(s2)-1

resD = dict()
while i1 >= 0 and i2 >= 0:

    if(s1[i1] == s2[i2]):
        resD += 1
        i1 -= 1
        i2 -= 1
    else:
        ti1 = i1
        ti2 = i2
        while i1 >= 0 and i2 >= 0:
            ti1 -= 1
            if(s1[i1] == s2[i2]):
