#include<stdio.h>
#include<stdlib.h>

int *save;

void fib(long long n){
  if(n==0) return;
  if(n<=2) return;
  long long i, a, b;
  if(save[n] == -1){
    if(n%2){
      fib(n/2+1);
      fib(n/2);
      a = (save[n/2]*save[n/2])%1000000007;
      b = (save[n/2+1]*save[n/2+1])%1000000007;
      save[n] = a+b;
    }
    fib(n/2+1);
    fib(n/2-1);
    a = (save[n/2+1]*save[n/2+1])%1000000007;
    b = (save[n/2-1]*save[n/2-1])%1000000007;
    save[n] = a-b;
  }
}

int main(){
  long long n;
  scanf("%lld", &n);
  save = malloc(sizeof(int)*(n+1));
  for(int i=0; i<n*3; i++) save[i] = -1;
  save[0] = 0; save[1] = 1; save[2] = 1;
  fib(n);
  printf("%d\n", save[n]);
  free(save);
}