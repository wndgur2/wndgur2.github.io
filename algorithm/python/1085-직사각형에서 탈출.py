x, y, w, h = map(int, input().split())

if x > w/2:
    distanceX = w-x
else:
    distanceX = x

if y > h/2:
    distanceY = h-y
else:
    distanceY = y

if distanceX>distanceY:
    print(distanceY)
else:
    print(distanceX)