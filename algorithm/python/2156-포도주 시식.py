n = int(input())

wineAmounts = []
for i in range(n):
    wineAmounts.append(int(input()))

winePath = []
if n < 3:
    print(sum(wineAmounts))
else:
    winePath.append(wineAmounts[0])
    winePath.append(wineAmounts[0]+wineAmounts[1])
    winePath.append(
        max(wineAmounts[0]+wineAmounts[2], wineAmounts[1]+wineAmounts[2], winePath[1]))
    for i in range(3, n):
        winePath.append(
            max(winePath[i-3]+wineAmounts[i]+wineAmounts[i-1], winePath[i-2]+wineAmounts[i], winePath[i-1]))
    print(winePath[-1])
