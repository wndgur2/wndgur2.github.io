#include<stdio.h>

void maxHeapify(int Arr[ ], int i, int N);
void minHeapify(int Arr[ ], int i, int N);

int main(){
  int n, t, i, j, minHeapL=0, maxHeapL=0;
  scanf("%d", &n);
  int minHeap[n/2+1], maxHeap[n/2+2];

  //add to maxHeap
  scanf("%d", &t);
  maxHeapL++;
  maxHeap[maxHeapL] = t;
  printf("%d\n", t);
  
  for(i=2; i<n+1; i++){
    scanf("%d", &t);
    if(t>maxHeap[1]){
      //add to minHeap
      minHeapL++;
      minHeap[minHeapL] = t;
      for(j=minHeapL/2; j>0; j/=2)
        minHeapify(minHeap, j, minHeapL);
    } else {
      //add to maxHeap
      maxHeapL++;
      maxHeap[maxHeapL] = t;
      for(j=maxHeapL/2; j>0; j/=2)
        maxHeapify(maxHeap, j, maxHeapL);
    }

    if(maxHeapL-minHeapL==2){
      //add maxHeap[1] -> minHeapL[1]
      t = maxHeap[1];
      maxHeap[1] = maxHeap[maxHeapL];
      maxHeapL--;
      maxHeapify(maxHeap, 1, maxHeapL);
      minHeapL++;
      minHeap[minHeapL] = t;
      for(j=minHeapL/2; j>0; j/=2)
        minHeapify(minHeap, j, minHeapL);
    } else if(minHeapL-maxHeapL==2){
      //add minHeap[1] -> maxHeapL[1]
      t = minHeap[1];
      minHeap[1] = minHeap[minHeapL];
      minHeapL--;
      minHeapify(minHeap, 1, minHeapL);
      maxHeapL++;
      maxHeap[maxHeapL] = t;
      for(j=maxHeapL/2; j>0; j/=2)
        maxHeapify(maxHeap, j, maxHeapL);
    }

    if(minHeapL-maxHeapL==1) printf("%d\n", minHeap[1]);
    else printf("%d\n", maxHeap[1]);

    // printf("MAXHEAP: ");
    // for(j=1; j<=maxHeapL; j++)
    //   printf("%d ", maxHeap[j]);
    // printf("\n");

    // printf("MINHEAP: ");
    // for(j=1; j<=minHeapL; j++)
    //   printf("%d ", minHeap[j]);
    // printf("\n");

  }
}

void maxHeapify(int Arr[ ], int i, int N){
  int left = 2*i;
  int right = 2*i +1;

  int largest, t;
  if(left<= N && Arr[left] > Arr[i] )
    largest = left;
  else
    largest = i;
  if(right <= N && Arr[right] > Arr[largest] )
    largest = right;
  if(largest != i ){
    t = Arr[i];
    Arr[i] = Arr[largest];
    Arr[largest] = t;
    maxHeapify (Arr, largest,N);
  }
}

void minHeapify(int Arr[ ], int i, int N){
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