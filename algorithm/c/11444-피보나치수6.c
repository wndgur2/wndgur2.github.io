#include<stdio.h>
#include<stdlib.h>

long long fib(long long n){
  if(n==0) return 0;
  if(n<=2) return 1;
  long long i, a, b;
  if(n%2){
    a = fib(n/2+1);
    b = fib(n/2);
    a = (a*a)%1000000007;
    b = (b*b)%1000000007;
    return a+b;
  }
  a = fib(n/2+1);
  b = fib(n/2-1);
  a = (a*a)%1000000007;
  b = (b*b)%1000000007;
  return a-b;
}

int main(){
  long long n;
  scanf("%lld", &n);
  printf("%lld\n", fib(n));
}