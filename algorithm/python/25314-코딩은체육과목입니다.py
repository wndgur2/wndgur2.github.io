n = int(input())
size = int(n/4) if n%4==0 else int(n/4) + 1
for i in range(size):
    print("long", end = " ")
print("int")