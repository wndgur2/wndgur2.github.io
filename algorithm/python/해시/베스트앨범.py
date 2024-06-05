def solution(genres, plays):
    topTwoOfGenre = {} # genre(string): [indexOfMostPlayedSong, indexOfSecondaryPlayedSong]
    playsOfGenre = {} # genre(string): plays(int)
    l = len(genres)

    for i in range(l):
        g = genres[i]
        p = plays[i]
        if g in topTwoOfGenre:
            if(len(topTwoOfGenre[g])==2):
                if p > plays[topTwoOfGenre[g][1]]:
                    if p > plays[topTwoOfGenre[g][0]]:
                        topTwoOfGenre[g][1] = topTwoOfGenre[g][0]
                        topTwoOfGenre[g][0] = i
                    else:
                        topTwoOfGenre[g][1] = i
            else:
                if(p > plays[topTwoOfGenre[g][0]]):
                    topTwoOfGenre[g].append(topTwoOfGenre[g][0])
                    topTwoOfGenre[g][0] = i
                else:
                    topTwoOfGenre[g].append(i)
        else:
            topTwoOfGenre[g] = [i]
        
        if g in playsOfGenre:
            playsOfGenre[g] += p
        else:
            playsOfGenre[g] = p

    mostPlays = list(playsOfGenre.items())
    mostPlays.sort(key=lambda x:x[1], reverse=True)
    answer = []
    for m in mostPlays:
        for i in topTwoOfGenre[m[0]]:
          answer.append(i)
    
    return answer