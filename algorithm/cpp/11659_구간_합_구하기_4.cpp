/**
 * 2022.9.20
*/
#include <iostream>
using namespace std;

int main(){
  ios::sync_with_stdio(false);
  cin.tie(NULL);
  cout.tie(NULL);
  int n, m, tmp, in, st, end;
  cin >> n >> m;
  int *sums;
  sums = (int*)malloc(sizeof(int)*(n+1));

  tmp = 0;
  sums[0] = 0;
  for(int i=1; i<n+1; i++){
    cin >> in;
    tmp += in;
    sums[i] = tmp;
  }

  for(int i=0; i<m; i++){
    cin >> st >> end;
    cout << sums[end] - sums[st-1] << "\n";
  }
  free(sums);
  return 0;
}