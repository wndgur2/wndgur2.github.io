#include <stdio.h>
#include <stdlib.h>
//mergeSort 후 binaryCount
int binarySearch(int x, int *xS, int st, int end);
int binarySearchStart(int x, int *xS, int st, int end);
int binarySearchLast(int x, int *xS, int st, int end);

int compare(const void * a, const void * b) {
   return ( *(int*)a - *(int*)b );
}

int main(){
  int n, m, i, t;
  scanf("%d", &n);
  int arr[n+2];
  arr[n] = -10000001;
  arr[n+1] = 10000001;

  for(i=0; i<n; i++)
    scanf("%d", &arr[i]);

  qsort(arr, n+2, sizeof(int), compare);

  scanf("%d", &m);

  for(i=0; i<m; i++){
    scanf("%d", &t);
    printf("%d ", binarySearch(t, arr, 0, n+1));
  }
  printf("\n");

	return 0;
}

int binarySearchStart(int x, int *xS, int st, int end){ //direction:0 = left, 1 = right
  int mid;
  while (xS[end] == x){
    mid = (st+end)/2;
    if(xS[mid] < x)
      st = mid+1;
    else
      end = mid-1;
  }
  // printf("%d: left: %d\n", x, end+1);
  return end+1;
}

int binarySearchLast(int x, int *xS, int st, int end){ //direction:0 = left, 1 = right
  int mid;
  while (xS[st] == x){
    mid = (st+end)/2;
    if(xS[mid] > x)
      end = mid-1;
    else
      st = mid+1;
  }
  // printf("%d: right: %d\n", x, st-1);
  return st-1;
}

int binarySearch(int x, int *xS, int st, int end){ //재귀호출보단 while문으로. st, end를 변화 주면서. 찾았을 때만 재귀.
  if(end - st < 0) return 0;

  while (end-st >= 0){
    int mid = (end+st)/2;
    if(xS[mid]==x) // 찾았을 때 시작과 끝 찾아서 그 길이 리턴.
      return binarySearchLast(x, xS, mid+1, end) - binarySearchStart(x, xS, st, mid-1) + 1;
    else if(xS[mid] < x)
      st = mid+1;
    else
      end = mid-1;
  }
  return 0;
}