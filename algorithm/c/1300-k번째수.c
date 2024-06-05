#include<stdio.h>
typedef long long ll;

ll countDown(ll r, int n);

int main(){
  int n, k, i;

  scanf("%d", &n);
  scanf("%d", &k);
  ll start = 1, end = k, mid, size; //start를 0으로 하면 틀리는 이유를 모르겠다. 일단 변수의 의미를 확실히 하기로..

  while (end-start > 1){
    mid = (start + end) / 2;
    size = 0;
    for(i=1; i<=n; i++) size += n<(mid/i)?n:(mid/i);
    if(size >= k){
      end = mid;
    } else if(size < k){
      start = mid;
    }
  }
  printf("%lld\n", end);
}

ll countDown(ll r, int n){
  ll count = 0;

  for(int i=1; i<=n; i++) count += n<(r/i)?n:(r/i);

  return count;
}