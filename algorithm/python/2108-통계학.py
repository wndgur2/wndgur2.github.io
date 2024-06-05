from sys import stdin


def updown(n):
    if(n >= 0):
        return int(n)+((n) % 1 >= 0.5)
    else:
        return int(n)+((n) % 1 > 0.5)-(n % 1 != 0)


n = int(stdin.readline())
result = [0]*8001
for i in range(n):
    result[int(stdin.readline())+4000] += 1

sum = 0
maxN = 0
biggestF = False
count = 0
for i in range(8000, -1, -1):
    for j in range(result[i]):
        smallest = i-4000
        count += 1
        if(count == int(n/2)+1):
            mid = smallest
        if(not biggestF):
            biggest = smallest
            biggestF = True
        sum += smallest
    if(result[i]):
        if(result[i] > maxN):
            maxN = result[i]
            maxNumber = smallest
            befI = smallest
        elif(result[i] == maxN):
            maxNumber = befI
            befI = smallest

print(updown(sum/n))
print(mid)
print(maxNumber)
print(biggest-smallest)
