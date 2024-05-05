import random
n = int(input())
s = str(n)+"\n"
for i in range(n):
    for j in range(3):
        c = str(random.randrange(1, 1001))
        s += c + " "
    s += '\n'
with open('rgbStreetInput.txt', 'w') as f:
    f.write(s)
