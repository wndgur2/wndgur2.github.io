#include<stdio.h>

int main(){
  int n, m, k, i, j, l;
  scanf("%d %d", &n, &m);
  int firAr[n*m];
  for(i = 0; i < n*m; i++){
    scanf("%d", &firAr[i]);
  }

  scanf("%d %d", &m, &k);
  int secAr[m*k], res[n*k];

  for(i = 0; i < m*k; i++){
    scanf("%d", &secAr[i]);
  }
  for(i = 0; i < n*k; i++){
    res[i] = 0;
  }

  for(i=0; i < n; i++){
    for(j=0; j < k; j++){
      for(l=0; l < m; l++){
        res[i*k+j] += firAr[m*i+l] * secAr[j+l*k];
      }
    }
  }
  for(i=0; i < n; i++){
    for(j=0; j < k; j++){
      printf("%d ", res[k*i+j]);
    }
    printf("\n");
  }
}