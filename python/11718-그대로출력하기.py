str = input()
while(str):
    print(str)
    try:
        str = input()
    except:
        break
        