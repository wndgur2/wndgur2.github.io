/**
 * 2022.9.20
*/
#include <iostream>
using namespace std;

int main(){

  int n, k, tmp, in, st, end, index;
  scanf("%d %d", &n, &k);
  int *sums;
  sums = (int*)malloc(sizeof(int)*(n-k+1));

  int *ks;
  ks = (int*)malloc(sizeof(int)*(k));

  tmp = 0;

  for(int i=0; i<k; i++){
    scanf("%d", &ks[i]);
    tmp += ks[i];
  }

  sums[0] = tmp;
  index = 0;
  for(int i=0; i<n-k; i++){
    tmp -= ks[index%k];
    scanf("%d", &ks[index%k]);
    tmp += ks[index%k];
    index ++;
    sums[i+1] = tmp;
  }

  int max = -10000000;
  for(int i=0; i<n-k+1; i++){
    max = sums[i] > max? sums[i] : max;
  }
  printf("%d", max);
  free(sums);
  return 0;
}