#include<stdio.h>
#include<stdlib.h>
typedef long long ll;

void absolute_heapify (ll Arr[ ], int i, int N);

int main(){
  unsigned int n, i, j, length=0;
  scanf("%d", &n);
  ll arr[n+1], t;
  for(i=1; i<n+1; i++){
    scanf("%lld", &t);
    if(t != 0){
      length++;
      arr[length] = t;
      for(j=length/2; j>0; j/=2)
        absolute_heapify(arr, j, length);
    } else{
      if(length==0) printf("0\n");
      else{
        printf("%lld\n", arr[1]);
        arr[1] = arr[length];
        length--;
        absolute_heapify(arr, 1, length);
      }
    }
  }
}

void absolute_heapify (ll Arr[ ], int i, int N){
  int left = 2*i;
  int right = 2*i +1;

  int smallest;
  ll t;
  if(left<= N && (llabs(Arr[left]) < llabs(Arr[i])))
    smallest = left;
  else if(left<= N && llabs(Arr[left]) == llabs(Arr[i]) && Arr[left] < Arr[i])
    smallest = left;
  else
    smallest = i;
  if(right <= N && llabs(Arr[right]) < llabs(Arr[smallest]))
    smallest = right;
  else if(right <= N && llabs(Arr[right]) == llabs(Arr[smallest]) && Arr[right] < Arr[smallest])
    smallest = right;
  if(smallest != i ){
    t = Arr[i];
    Arr[i] = Arr[smallest];
    Arr[smallest] = t;
    absolute_heapify (Arr, smallest, N);
  }
}