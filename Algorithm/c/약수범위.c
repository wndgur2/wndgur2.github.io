#include <stdio.h>
#include <math.h>

int count_divisor(int n);

int main(){
  int a, b, res;
  
  scanf("%d %d", &a, &b);

  res = count_divisor(b) - count_divisor(a-1);

  printf("%d\n", res);

  return 0;
}

int count_divisor(int n){
  if(n == 0) return 0;
  int half = (int) sqrt((double) n);
  int count = 0;

  for (int i=1; i<=half; i++) count += n/i;

  return count*2 - half*half;
}