#include<stdio.h>
typedef long long ll;
/*
  집 개수, 좌표, 목표 공유기 수가 입력들어온다.
  1 집 좌표 정렬 maxX, minX 저장
  2 집 간 거리 배열에 저장
  3 min = 집 간 거리 중 가장 짧은 거리, max = maxX-minX
  3.5 l = (min + max) / 2
  4 max-min가 1 이하가 될 때까지
   4-1 거리 d로 목표 공유기 수를 설치 가능하다면 거리를 늘린다. : min = l
   4-2 거리 d로 목표 공유기 수를 설치 불가하다면 거리를 좁힌다. : max = l

  nlogn
*/

void merge(int arr[], int l, int m, int r);
void mergeSort(int arr[], int l, int r);

int main(){
  //INPUT
  int i, n, c, maxD = 0, minD = 1000000000, l, tl, amount;
  scanf("%d %d", &n, &c);
  int xs[n], ds[n-1]; // * 좌표가 10억까지 나온다.
  for(i=0; i<n; i++) scanf("%d", &xs[i]);

  mergeSort(xs, 0, n-1);
  // printf("xs: ");
  // for(i=0; i<n; i++) printf("%d ", xs[i]);
  // printf("\n");
  
  for(i=0; i<n-1; i++) {
    ds[i] = xs[i+1]-xs[i];
    maxD += ds[i];
    if(ds[i]<minD) minD = ds[i];
  }
  // printf("ds: ");
  // for(i=0; i<n-1; i++) printf("%d ", ds[i]);
  // printf("\n");

  while (1)
  {
    l = (minD+maxD) / 2;

    amount = 1; tl = 0;
    for(i=0; i<n-1; i++){
      tl += ds[i];
      if(tl >= l){
        amount ++;
        tl = 0;
      }
    }
    if(amount >= c) {
      minD = l;
      if(maxD-minD == 1) {

        l = maxD;
        amount = 1; tl = 0;
        for(i=0; i<n-1; i++){
          tl += ds[i];
          if(tl >= l){
            amount ++;
            tl = 0;
          }
        }
        if(amount >= c) {minD = maxD; break;}
        else break;
      } else if(maxD-minD == 0) break;
    }
    else {
      maxD = l;
      if(maxD-minD <= 1) break;
    }
    // printf("max: %d min: %d l: %d\n", maxD, minD, l);
  }
  printf("%d\n", minD);
}

void merge(int arr[], int l, int m, int r){
	int i, j, k;
	int n1 = m - l + 1;
	int n2 = r - m;

	int L[n1], R[n2];

	for (i = 0; i < n1; i++)
		L[i] = arr[(l + i)];
	for (j = 0; j < n2; j++)
		R[j] = arr[(m + 1 + j)];

	i = 0;
	j = 0;
	k = l;
	while (i < n1 && j < n2) {
		if (L[i] < R[j]) {
			arr[k] = L[i];
			i++;
		} else{
      arr[k] = R[j];
      j++;
    }
		k++;
	}

	while (i < n1) {
		arr[k] = L[i];
		i++;
		k++;
	}

	while (j < n2) {
		arr[k] = R[j];
		j++;
		k++;
	}
}

void mergeSort(int arr[], int l, int r){
	if (l < r) {
		int m = l + (r - l) / 2;

		mergeSort(arr, l, m);
		mergeSort(arr, m + 1, r);

		merge(arr, l, m, r);
	}
}