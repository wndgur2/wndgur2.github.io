#소수인지 확인하는 함수
def isPrime(num):
    if num==1:
        return False
    for i in range(2, int(num**(0.5))+1):
        if num%i==0:
            return False
    return True

# k진수로 변환해주는 함수
def convert(num, k):
    tmp = ''
    while num:
        tmp = str(num%k) + tmp
        num //= k
    return tmp

def solution(n, k):
    answer = 0
    kNum = convert(n, k)
    kString = str(kNum)
    nums=kString.split('0')
    nums=[int(i) for i in nums if i!=""]
    answer=0
    for x in nums:
        if isPrime(x):
            answer+=1
    return answer