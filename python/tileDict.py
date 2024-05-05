import time


def factorial(fn):
    if not (fn in factorials):
        res = 1
        for f in range(1, fn+1):
            if not (f in factorials):
                factorials[f] = res*f
            res = factorials[f]
        factorials[fn] = res
    return factorials[fn]


#n = int(input())
factorials = dict()

stt = time.time()
for n in range(1, 15):
    result = 0
    for numOf00 in range(int(n/2)+1):
        b = factorial(numOf00)*factorial(n-numOf00*2)
        result += int(factorial(n-numOf00) % (b*15746) / b)
    print(result)
edt = time.time()

print(result, result % 15746)
print(edt-stt)
