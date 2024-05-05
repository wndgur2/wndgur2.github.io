/**
 * 2021.11.22
*/
#include<stdio.h>
#define P 1000000007ll
long long factorial(int num);
long long involute(long long a, long long b);

int main(){
  int n, k, i;
  long long np=1, nkp=1, kp=1;
  long long powed;
  scanf ("%d %d", &n, &k);
  np = factorial(n);
  nkp = involute(factorial(n-k), P-2);
  kp = involute(factorial(k), P-2);
  powed = nkp*kp%P;
  printf("%lld\n", np*powed % P);
}

long long factorial(int num){
  long long res = 1;
  for(int i=0; i<num; i++){
    res *= i+1;
    res %= P;
  }
  return res;
}

long long involute(long long a, long long b){
  if(b==1) return a%P;
  long long devAns = involute(a, b/2);
  devAns *= devAns;
  devAns %= P;
  if(b%2!=0){
    devAns *= a;
    devAns %= P;
  }
  return devAns;
}