import random
n = int(input())
s = str(n)+"\n"
for i in range(n):
    c = str(random.randrange(1, 1000000000))
    s += c + "\n"
with open('inputs.txt', 'w') as f:
    f.write(s)
