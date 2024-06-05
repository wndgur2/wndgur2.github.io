def isPrime(n):
  if(n==2):
    return True
  for j in range(2, int(n/2+1)):
    if(n%j==0):
      return False
  return True


for i in range(1, 3):
  print(i, isPrime(i))