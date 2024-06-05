size = 5
vertical = [[] for _ in range(16)]
for i in range(size):
    word = input()
    for j in range(len(word)):
        vertical[j].append(word[j])

res = ""
for vert in vertical:
    if(not vert):
        break
    res += ''.join(vert)
print(res)