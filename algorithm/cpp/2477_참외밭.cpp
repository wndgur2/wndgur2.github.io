/**
 * 2022.9.20
*/
#include <iostream>

int main(){
  int n, area=0;
  int square[4] = {4, 2, 3, 1}, indexes[4] = {3, 1, 2, 0}, index;
  int dirs[6], diss[6];
  int dir, dis;
  int ex=0;

  scanf("%d", &n);

  scanf("%d %d", &dirs[0], &diss[0]);
  index = indexes[dirs[0]-1];
  dirs[index] = dirs[0];
  diss[index] = diss[0];

  for(int i=index+1; i<index+6; i++){
    scanf("%d %d", &dirs[i%6], &diss[i%6]);
    if( dirs[i%6]!= square[i%4] && ex == 0){
      ex = i;
      area -= diss[i%6] * diss[(i-1)%6];
    }
  }

  if(ex==0){
    area = 0;
    area -= diss[(index+0)%6] * diss[(index+5)%6];
    area += diss[(index+2)%6] * diss[(index+3)%6];
  } else{
    area += diss[(ex+2)%6] * diss[(ex+3)%6];
  }

  printf("%d", area * n);

  return 0;
}