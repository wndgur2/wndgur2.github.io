#include<stdio.h>
/*
  1 최대값
  1.5 change==0이면 리턴
  2 이분
  3 현재 길이로 개수 측정
  4 넘으면 길이 늘리고 적으면 이분
  5 증감값(change)가 1일 때 결과가 변할 때 까지
   5-1 count가 이미 목표 개수 이상이면 목표 개수보다 떨어질때까지
   5-2 count가 이미 목표 개수 미만이면 목표 개수 이상이 될때까지

  nlogn
*/
int main(){
  unsigned int n, aftN, i, max = 0, count, maxL=0, l, change, wasCountBigEnough;
  scanf("%d %d", &n, &aftN);
  unsigned int ls[n];
  for (i=0; i<n; i++){
    scanf("%d", &ls[i]);
    if(ls[i] > max) max = ls[i];
  }
  l = max;
  change = max/2 + max%2;
  while (1){
    count = 0;
    for (i=0; i<n; i++)
      count += ls[i]/l;
    if(count >= aftN){
      if(l > maxL)
        maxL = l;
      l += change;
    } else l -= change;

    if(change>1) change = change/2;
    else if(change == 1){
      if(count >= aftN) wasCountBigEnough = 1;
      else wasCountBigEnough = 0;
      while (1){
        count = 0;
        for (i=0; i<n; i++)
          count += ls[i]/l;
        if(count >= aftN){
          if(l > maxL)
            maxL = l;
          l += change;
          if(!wasCountBigEnough){
            change = 0;
            break;
          }
        } else{
          l -= change;
          if(wasCountBigEnough){
            change = 0;
            break;
          }
        }
      }
    }
    else if (change == 0) break;
  }
  printf("%d\n", maxL);
}