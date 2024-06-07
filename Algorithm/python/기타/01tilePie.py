import time

n = int(input())

stt = time.time()


def r(leftN, res):
    r(leftN-2, res.append(00))
    r(leftN-1, res.append(1))


r(n, [])

edt = time.time()

print(result, result % 15746)
print(edt-stt)
