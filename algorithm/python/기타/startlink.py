n = int(input())
synergy = []
for row in range(n):
    synergy.append(list(map(int, input().split())))


def recall(n, r, liS):
    if r == 0:
        liS.sort()
        teams.add(tuple(liS))
        return 0
    st = 0
    if (len(liS)):
        st = liS[-1]
    for i in range(st+1, n):
        li = liS.copy()
        li.append(i)
        recall(n, r-1, li)


teams = set()
recall(n, int(n/2)-1, [0])
min = 1000000000
for team in teams:
    aPower = 0
    for mem in team:
        for mem2 in team[team.index(mem):]:
            aPower += synergy[mem][mem2]
            aPower += synergy[mem2][mem]
    bPower = 0
    team2 = []
    for i in range(n):
        if not (i in team):
            team2.append(i)
    for mem in team2:
        for mem2 in team2[team2.index(mem):]:
            bPower += synergy[mem][mem2]
            bPower += synergy[mem2][mem]
    if(abs(aPower-bPower) < min):
        min = abs(aPower-bPower)
print(min)
