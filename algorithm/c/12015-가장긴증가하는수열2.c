#include<stdio.h>

void insert(int arr[], int idx, int n);

int main(){
  int i, n, t, idx=1;
  scanf("%d", &n);
  int arr[n], end = n-1;
  arr[0] = 1000000;
  for(i=0; i<n; i++){
    scanf("%d", &t);
    // printf("i: %d\n", i);
    if(t > arr[idx-1]){
      arr[idx] = t;
      idx ++;
    } else{
      insert(arr, idx, t);
    }
    // for(int j=0; j<idx; j++) printf("%d ", arr[j]);
    // printf("\n");
  }

  printf("%d\n", idx);
  return 0;
}

void insert(int arr[], int idx, int n){
  int st=0, end=idx-1, mid;
  while(end>st+1){
    // printf("st %d, mid %d, end %d\n", st, mid, end);
    mid = (st+end)/2;
    if(arr[mid] < n) st = mid;
    else end = mid;
  }
  // printf("Found! %d\n", end);
  if(end>0 && arr[end-1]>=n) end--;
  arr[end] = n;
}