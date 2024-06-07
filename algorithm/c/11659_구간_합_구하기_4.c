/**
 * 2022.9.20
*/
#include <stdio.h>
#include <stdlib.h>

int main(){
  int n, m, tmp, in, st, end;
  scanf("%d %d", &n, &m);
  int *sums;
  sums = (int*)malloc(sizeof(int)*(n+1));

  tmp = 0;
  sums[0] = 0;
  for(int i=1; i<n+1; i++){
    scanf("%d", &in);
    tmp += in;
    sums[i] = tmp;
  }

  for(int i=0; i<m; i++){
    scanf("%d %d", &st, &end);
    printf("%d\n", sums[end] - sums[st-1]);
  }
  free(sums);
  return 0;
}