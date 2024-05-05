#include<stdio.h>
#include<stdlib.h>
typedef long long ll;
#define mod 1000000007

void mupltiply(ll *ar1, ll *ar2, int n);
ll* square(ll *ar1, int n, ll r);

int main(){
  int n = 2;
  ll b;
  scanf("%lld", &b);
  ll *arr = malloc(sizeof(ll)*n*n);
  arr[0] = 1; arr[1] = 1; arr[2] = 1; arr[3] = 0;

  ll *res = square(arr, n, b-1);

  printf("%lld\n", res[0]);
  free(arr);
  free(res);
}

void mupltiply(ll *ar1, ll *ar2, int n){
  ll *result = malloc(sizeof(ll)*n*n);
  ll i, j, k;

  for(i=0; i<n*n; i++){
    result[i] = 0;
  }

  for(i=0; i < n; i++){
    for(j=0; j < n; j++){
      for(k=0; k < n; k++){
        result[i*n+j] += ar1[n*i+k]%mod * ar2[j+k*n]%mod;
      }
      result[i*n+j] %= mod;
    }
  }

  for(i=0; i<n*n; i++){
    ar1[i] = result[i];
  }
  free(result);
}

ll* square(ll *ar1, int n, ll r){
  ll *result;
  if(r<=1){
    ll *newAr = malloc(sizeof(ll)*n*n);
    for(ll i=0; i<n*n; i++){
      newAr[i] = ar1[i];
    }
    return newAr;
  }
  result = square(ar1, n, r/2);
  mupltiply(result, result, n);
  if(r%2){
    mupltiply(result, ar1, n);
  }
  return result;
}