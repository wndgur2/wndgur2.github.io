def checkRankUp(index):
    rankUp = 0
    while index < len(costsDict)-1:
        if (costs[index].index(costsDict[index][0]) == costs[index+1].index(costsDict[index+1][0])) and (costsDict[index][2] > costsDict[index+1][2]):
            rankUp += 1
            index += 1
        else:
            return rankUp
    return rankUp


n = int(input())
costs = []
costSum = 0
costsDict = dict()
rank = []

for cost in range(n):
    costs.append(list(map(int, input().split())))
    minValue = 1000
    midValue = 1000
    if(costs[cost][0] <= costs[cost][1]):
        if(costs[cost][1] <= costs[cost][2]):  # 012
            minValue = costs[cost][0]
            midValue = costs[cost][1]
        elif(costs[cost][2] < costs[cost][0]):  # 201
            minValue = costs[cost][2]
            midValue = costs[cost][0]
        else:  # 021
            minValue = costs[cost][0]
            midValue = costs[cost][2]
    else:
        if(costs[cost][1] >= costs[cost][2]):  # 210
            minValue = costs[cost][2]
            midValue = costs[cost][1]
        elif(costs[cost][2] > costs[cost][0]):  # 102
            minValue = costs[cost][1]
            midValue = costs[cost][0]
        else:  # 120
            minValue = costs[cost][1]
            midValue = costs[cost][2]

    costsDict[cost] = [minValue, midValue]
    rank.append([cost, midValue-minValue])


rank.sort(key=lambda x: x[1], reverse=True)
for r in rank:
    costsDict[r[0]].append(rank.index(r))


rankUp = 0
for i in range(n):
    if rankUp == 0:
        rankUp = checkRankUp(i)
    if rankUp % 2 == 0:
        costSum += costsDict[i][0]
    else:
        costSum += costsDict[i][1]
    if(rankUp != 0):
        rankUp -= 1

print(costSum)
print(costsDict)
