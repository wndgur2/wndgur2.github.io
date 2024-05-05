#include <stdio.h>

long long involute(int a, int b, int c);

int main(){
  int a, b, c, i;
  long long ans;
  scanf("%i %i %i", &a, &b, &c);
  ans = involute(a, b, c);
  printf("%lld\n", ans);
}

long long involute(int a, int b, int c){
  if(b==1) return a%c;
  long long devAns = involute(a, b/2, c);
  devAns *= devAns;
  devAns %= c;
  if(b%2!=0){
    devAns *= a;
    devAns %= c;
  }
  return devAns;
}