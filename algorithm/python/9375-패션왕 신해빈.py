case = int(input())
for c in range(case):
    n = int(input())
    cTypes = []
    cloths = []
    for cl in range(n):
        name, cType = input().split()
        if not (cType in cTypes):
            cTypes.append(cType)
            cloths.append([name])
        else:
            cloths[cTypes.index(cType)].append(name)
    res = 1
    for cl in cloths:
        res *= (len(cl)+1)
    res -= 1
    print(res)
