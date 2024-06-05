def recall(index):
    if(index == 2):
        if(stairs[1] > stairs[0]):
            c = stairs[1]
        else:
            c = stairs[0]
        return stairs[index]+c
    if(index == 1):
        return stairs[1] + stairs[0]
    if(index == 0):
        return stairs[0]

    if not (index-3 in recalls):
        recalls[index-3] = recall(index-3)
    if not (index-2 in recalls):
        recalls[index-2] = recall(index-2)

    short = stairs[index-1] + recalls[index-3]
    long = recalls[index-2]
    if(short > long):
        return stairs[index]+short
    else:
        return stairs[index]+long


recalls = dict()

n = int(input())

stairs = []
for i in range(n):
    stairs.append(int(input()))

res = recall(n-1)
print(res)
