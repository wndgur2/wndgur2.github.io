n = int(input())
terms = []
for i in range(n):
    terms.append(list(map(int, input().split())))

terms.sort(key=lambda x: x[0])
terms.sort(key=lambda x: x[1])
count = 1
time = terms[0][1]
for i in range(1, n):
    if terms[i][0] >= time:
        count += 1
        time = terms[i][1]
print(count)
