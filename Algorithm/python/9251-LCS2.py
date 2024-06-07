s1 = input()
s2 = input()
arrs = [0]*len(s1)

for c in range(len(s1)):
    i = s2.find(s1[c])
    if(i != -1):
        tN = 1
        for c2 in s1[c+1:]:
            t = s2[i+1:].find(c2)
            if t != -1:
                i += t
                tN += 1
    arrs[c] = tN

print(arrs)
print(max(arrs))
