cords = []
for i in range(3):
    cords.append(list(map(int, input().split())))
xs = []
ys = []
for cord in cords:
    xs.append(cord[0])
    ys.append(cord[1])
for x in xs:
    if(x in xs[xs.index(x)+1:]) == False:
        newX = x
        break
for y in ys:
    if(y in ys[ys.index(y)+1:]) == False:
        newY = y
        break
print(newX, newY)