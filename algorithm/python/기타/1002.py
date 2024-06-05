def fibonacci(b2, b1, n):
    if(n==0):
        return b2
    else:
        return fibonacci(b1, b2+b1, n-1)

a = int(input())
print(fibonacci(0, 1, a))