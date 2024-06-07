#include<stdio.h>
#include<stdlib.h>
typedef long long ll;

int main(){
  int n, i, idx = 0, left, right;
  ll res, tmps;
  int *stack, *inputs, temp;
  while(1){
    scanf("%d", &n);
    if(n==0) break;
    
    res = 0;
    stack = malloc(sizeof(int)*n);
    inputs = malloc(sizeof(int)*n);
    
    for(i=0; i<n; i++)
      scanf("%d", &inputs[i]);
    
    for(i=0; i<n; i++){
      right = i-1; // 이전 원소의 위치
      while(idx > 0 && inputs[stack[idx-1]] > inputs[i]){
        idx--;
        temp = stack[idx];
        if(idx==0) left = 0;
        else left = stack[idx-1]+1;
        //printf("(%d - %d + 1) * %d\n", right, left, inputs[temp]);
        tmps = (ll)(right-left+1)*inputs[temp];
        if(tmps>res) res = tmps;
      }
      stack[idx] = i;
      idx++;
    }
    //printf("=========\n");
    right = n-1;
    while(idx > 0){
      idx--;
      temp = stack[idx];
      if(idx==0) left = 0;
      else left = stack[idx-1]+1;
      //printf("(%d - %d + 1) * %d\n", right, left, inputs[temp]);
      tmps = (ll)(right-left+1)*inputs[temp];
      if(tmps>res) res = tmps;
    }
    
    printf("%lld\n", res);
    free(stack);
    free(inputs);
  }

  return 0;
}