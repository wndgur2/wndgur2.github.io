import time

n = int(input())
tst = time.time()
inputs = []

for i in range(n):
    inputs.append(int(input()))
max = 0
for i in inputs:
    if(i>max):
        max = i
result = [0]*max
for i in inputs:
    result[i-1] = i
s=""
for i in result:
    if(i!=0):
        s+=str(i)+"\n"
ten = time.time()

print(s)
print(ten-tst)