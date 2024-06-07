#include <stdio.h>
#include <stdlib.h>

void insert(int *array, int end, int index, int x, int y);
void binaryInsert(int x, int y, int *Arr, int st, int end, int sortingVar, int nextIdx);

int main(){
  int n;
  scanf("%d", &n);
  int *arr = malloc(sizeof(int)*n*2);
  int i, j, tmX, tmY, idx = 2;

  scanf("%d %d", &tmX, &tmY);
  arr[0] = tmX;
  arr[1] = tmY;

  for(i=1; i<n; i++){
    scanf("%d %d", &tmX, &tmY);
    binaryInsert(tmX, tmY, arr, 0, (idx-2)/2, 0, (i)*2);
    idx += 2;
  }
  printf("=Array=============\n");
  for(i=0; i<idx/2; i++)
    printf("%d %d\n", arr[i*2], arr[i*2+1]);


  return 0;
}

void insert(int *array, int end, int index, int x, int y){
  for(int i=end+1; i>index; i--)
    array[i] = array[i-2];
  array[index] = x;
  array[index+1] = y;
}

void binaryInsert(int x, int y, int *Arr, int st, int end, int sortingVar, int nextIdx){
  int main, sub, arrMain, arrSub, midIdx = ((end+st)/2)*2;
  if(!sortingVar){
    main = x;
    sub = y;
  } else{
    sub = x;
    main = y;
  }
  arrMain = Arr[midIdx+sortingVar];
  arrSub = Arr[midIdx+(sortingVar?0:1)];

  if(end == st){ //남은 원소가 하나일 때 //! end가 1, st가 2.
    if(arrMain == main)
      insert(Arr, nextIdx, (st + (arrSub < sub ? 1:0))*2, x, y);
    else if(arrMain < main)
      insert(Arr, nextIdx, (st+1)*2, x, y);
    else
      insert(Arr, nextIdx, st*2, x, y);
    return;
  } else if(end<st) {
    insert(Arr, nextIdx, st*2, x, y);
    return;
  }

  if(arrMain == main){
    if(arrSub == sub) insert(Arr, nextIdx, midIdx, x, y);
    else if(arrSub < sub)
      binaryInsert(x, y, Arr, (end+st)/2+1, end, sortingVar, nextIdx);
    else
      binaryInsert(x, y, Arr, st, (end+st)/2-1, sortingVar, nextIdx);
  }
  else if(arrMain < main)
      binaryInsert(x, y, Arr, (end+st)/2+1, end, sortingVar, nextIdx);
  else
    binaryInsert(x, y, Arr, st, (end+st)/2-1, sortingVar, nextIdx);
}