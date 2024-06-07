def move(hanoi, s, e, r):
    if(len(hanoi[s][r:])==1):
        if(len(hanoi[e])==0 or hanoi[e][-1]>hanoi[s][-1]):
            hanoi[e].append(hanoi[s][-1])
            hanoi[s].pop()
            return str(s+1) + ' ' + str(e+1) + '\n'
        else:
            nums = [0,1,2]
            nums.remove(s)
            nums.remove(e)
            r2 = 0
            for i in hanoi[e]:
                if(i>hanoi[s][-1]):
                    r2 += 1
            r1 = move(hanoi, e, nums[0], r2)
            r2 = move(hanoi, s, e, r)
            return r1 + r2
    else:
        nums = [0,1,2]
        nums.remove(s)
        nums.remove(e)
        r1 = move(hanoi, s, nums[0], r+1)
        r2 = move(hanoi, s, e, r)
        return r1 + r2

hanoi = [[],[],[]]
log = ""
n = int(input())
for i in range(n, 0, -1):
    hanoi[0].append(i)
for i in range(n):
    log += move(hanoi, i%2, 2, 0)

moves = 0
befM = 0
for i in range(n):
    moves = befM*2 + 1
    befM = moves
print(moves)
print(log[:-1])