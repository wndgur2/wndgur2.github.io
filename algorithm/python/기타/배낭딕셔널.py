n, k = map(int, input().split())
cases = dict({})

for i in range(n):
    weight, value = map(int, input().split())
    ccases = dict.copy(cases)
    for j in ccases:
        nw = j + weight
        nv = ccases[j]+value
        if j+weight <= k:
            if not (nw in ccases) or (ccases[nw] < nv):
                cases[nw] = nv
    if weight <= k:
        if (not (weight in cases)) or (cases[weight] < value):
            cases[weight] = value
cases[0] = 0
print(max(cases.values()))
