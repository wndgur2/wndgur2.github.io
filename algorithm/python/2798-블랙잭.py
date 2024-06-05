cardN, num = list(map(int, input().split()))
cards = list(map(int, input().split()))
bestN = 0
for i in range(cardN):
    for j in range(i+1, cardN):
        for k in range(j+1, cardN):
            tempN = cards[i]+cards[j]+cards[k]
            if(tempN<=num and tempN>bestN):
                bestN = tempN
print(bestN)