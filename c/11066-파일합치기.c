#include<stdio.h>

int main(){
  int C, n, i, j, res, idx, min, minIdx;
  scanf("%d", &C);

  for(int i=0; i<C; i++){
    scanf("%d", &n);
    int arr[n];
    for(j=0; j<n; j++)
      scanf("%d", &arr[j]);

    res=0;
    
    //Sort array

    while(n > 1){ //배열중 '합의' 정렬을 유지해야함. 홀수일때 최소값과 더할수있게.

      //Compress each 2 elements in 1.
      //res += each compressed element

      //if n is odd, add last element to smallest element in compressed array
      //res += the element
      //Insert first element at right position. (Sort)

      //update n

    }
    
    printf("res: %d\n", res);
  }

}