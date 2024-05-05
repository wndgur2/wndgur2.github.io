a = [1, 2, 3, 4, 5]
for i in range(len(a)):
    if(i >= len(a)):
        break
    if(a[i] == 3):
        del a[i]
        print(i, a[i])
        i -= 1
    else:
        print(i, a[i])

print(a)
