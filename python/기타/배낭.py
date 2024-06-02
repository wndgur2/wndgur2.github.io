n, k = map(int, input().split())
maximum = 0
cases = []

for i in range(n):
    weight, value = map(int, input().split())
    for j in range(len(cases)):
        if cases[j][0]+weight <= k:
            nw = weight+cases[j][0]
            nv = cases[j][1]+value
            if not ([nw, nv] in cases):
                cases.append([nw, nv])
                if nv > maximum:
                    maximum = nv
    if(weight <= k):
        cases.append([weight, value])
    if value > maximum:
        maximum = value

cases.append([0, 0])
print(maximum)
