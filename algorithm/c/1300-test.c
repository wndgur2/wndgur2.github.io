#include<stdio.h>
#include<math.h>
typedef long long ll;

ll count_divisor(ll r, int n);

int main(){
  int n, k, i, size;

  scanf("%d", &n);
  // scanf("%d", &k);

  ll start = 0, end = n*n, mid;

  for(i=1; i<=n*n; i++){
    start = 0, end = n*n;
    k = i;
    while (end-start > 1){ // 0부터 n^2까지 개수 구하고 k보다 크면 end
      mid = (start + end) / 2;
      size = count_divisor(mid, n);
      // printf("st %lld, mid %lld, end %lld, size %d\n", start, mid, end, size);
      if(size >= k){
        end = mid;
      } else if(size < k){
        start = mid;
      }
    }
    printf("%lld ", end);
  }
  printf("\n");
}

ll count_divisor(ll r, int n){ // res = count_divisor(b) - count_divisor(a-1);
  if(r == 0) return 0;
  ll half = (ll) sqrt((double) r);
  ll count = 0;

  for (ll i=1; i<=half; i++) count += (r/i > n? n:r/i);

  return count*2 - half*half;
}