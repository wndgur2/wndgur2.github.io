#include<stdio.h>

void minHeapify (int Arr[ ], int i, int N);

int main(){
  unsigned int n, t, i, j, length=0;
  scanf("%d", &n);
  int arr[n+1];
  for(i=1; i<n+1; i++){
    scanf("%d", &t);
    if(t != 0){
      length++;
      arr[length] = t;
      for(j=length/2; j>0; j/=2)
        minHeapify(arr, j, length);
    } else{
      if(length==0) printf("0\n");
      else{
        printf("%d\n", arr[1]);
        arr[1] = arr[length];
        length--;
        minHeapify(arr, 1, length);
      }
    }
  }
}

void minHeapify (int Arr[ ], int i, int N){
  int left = 2*i;
  int right = 2*i +1;

  int smallest, t;
  if(left<= N && Arr[left] < Arr[i] )
    smallest = left;
  else
    smallest = i;
  if(right <= N && Arr[right] < Arr[smallest])
    smallest = right;
  if(smallest != i ){
    t = Arr[i];
    Arr[i] = Arr[smallest];
    Arr[smallest] = t;
    minHeapify (Arr, smallest, N);
  }
}