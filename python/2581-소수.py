def isPrime(n):
  if(n==1):
    return False
  if(n==2):
    return True
  for j in range(2, int(n/2+1)):
    if(n%j==0):
      return False
  return True

m, n = int(input()), int(input())
primes = []

for i in range(m, n+1):
  if(isPrime(i)):
    primes.append(i)

if(len(primes)>0):
  print(sum(primes))
  print(primes[0])
else:
  print(-1)