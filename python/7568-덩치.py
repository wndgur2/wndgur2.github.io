def isBiggerThan(p1, p2):
    if(p1[0]>p2[0] and p1[1]>p2[1]):
        return True
    else:
        return False

n = int(input())
people = []
rank = []

for i in range(n):
    people.append(list(map(int, input().split())))
    rank.append(1)

for i in range(n):
    for j in range(n):
        if(isBiggerThan(people[i], people[j])):
            rank[j]+=1

for i in rank:
    print(i, end=' ')