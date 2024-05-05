#include <stdio.h>
#include <stdlib.h>

int binarySearch(int x, int y, int *xS, int st, int end);

int main(){
  int *arr = malloc(sizeof(int)*14);
  int searchX, searchY;
  for(int i=0; i<7; i++)
    scanf("%d %d", &arr[i*2], &arr[i*2+1]);

  printf("looking for...\n");
  scanf("%d %d", &searchX, &searchY);
  while(searchX!=0){
    if(binarySearch(searchX, searchY, arr, 0, 6)) printf("Found!\n\n");
    else printf("Not exist!\n\n");
    printf("looking for...\n");
    scanf("%d %d", &searchX, &searchY);
  }
  return 0;
}

int binarySearch(int x, int y, int *xS, int st, int end){ // l은 xS의 원소의 개수가 아닌 점의 개수(원소개수/2)
  if(end - st < 0) return 0;
  int midIdx = ((end+st)/2)*2;
  printf("%d %d midV : %d\n", st, end, xS[midIdx+1]);
  if(xS[midIdx+1]==y){
    printf("y found.\n");
    if(xS[midIdx]==x) return 1;
    else if(xS[midIdx]<x)
      return binarySearch(x, y, xS, (end+st)/2+1, end);
    else if(xS[midIdx]>x)
      return binarySearch(x, y, xS, st, (end+st)/2-1);
  }
  else if(xS[midIdx+1] < y)
      return binarySearch(x, y, xS, (end+st)/2+1, end);
  else if(xS[midIdx+1] > y)
    return binarySearch(x, y, xS, st, (end+st)/2-1);
  return -1;
}

// inputs
// -5 0
// -1 1
// 2 1
// -3 4
// 3 4
// 1 7
// 8 8