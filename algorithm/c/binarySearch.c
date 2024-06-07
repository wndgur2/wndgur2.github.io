#include <stdio.h>
#include <stdlib.h>

int binarySearch(int x, int *xS, int st, int end);

int main(){
  int n = 10, i, searchX;
  int *arr = malloc(sizeof(int)*n);
  for(i=0; i<n; i++)
    scanf("%d", &arr[i]);

  printf("looking for...\n");
  scanf("%d", &searchX);

  printf("%d\n", binarySearch(searchX, arr, 0, n-1));

  return 0;
}

int binarySearch(int x, int *xS, int st, int end){ // l은 xS의 원소의 개수가 아닌 점의 개수(원소개수/2)
  if(end - st < 0) return 0;
  int mid = (end+st)/2;

  if(xS[mid]==x)
    return 1;
  else if(xS[mid] < x)
      return binarySearch(x, xS, mid+1, end);
  else
    return binarySearch(x, xS, st, mid-1);
}