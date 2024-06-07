#include<stdio.h>
#include<stdlib.h>

//TODO 분할정복을 이용해 2차 좌표평면 위 n개의 점 중 가장 가까운 두 점 사이의 거리의 제곱 출력하기.

int getDistance(int x1, int y1, int x2, int y2); //x1y1, x2y2 사이의 거리의 제곱을 리턴.

int split(int *xS, int st, int end, int *yS); //x 기준 절반으로 나누면서 최소 거리를 구하는 함수 재귀호출.

void merge(int arr[], int l, int m, int r, int sortingVar);

void mergeSort(int arr[], int l, int r, int sortingVar);

int main(){
  int n, i, j, tmX, tmY;
  FILE *fp;
  fp = fopen("testCase6.txt", "r");

  fscanf(fp, "%d", &n);
  int xSorted[2*n];
  int ySorted[2*n];

  //* 입력.
  for(i=0; i<n; i++){
    fscanf(fp, "%d %d", &tmX, &tmY);

    xSorted[i*2] = tmX;
    xSorted[i*2+1] = tmY;
    ySorted[i*2] = tmX;
    ySorted[i*2+1] = tmY;
  }

  mergeSort(xSorted, 0, n-1, 0);
  mergeSort(ySorted, 0, n-1, 1);

  printf("%d\n", split(xSorted, 0, n-1, ySorted));
}

int getDistance(int x1, int y1, int x2, int y2){
  return (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);}

//* xS[st~end]의 크기가 3이하가 될 때까지 st~end의 중간 기준으로 두개 배열에 대한 split을 재귀호출한다.
//* xS[st~end]의 크기가 3이하라면 점 사이의 거리를 리턴한다.
//* 두 개의 거리를 리턴받은 상위 split에서는 st~중간, 중간~end 사이에 최소 거리가 존재하는지 찾고 지금까지의 최솟값을 리턴한다.
int split(int *xS, int st, int end, int *yS){
  int i, j, tempd;
  int l = end-st+1;

  // printf("xS=====================\n");
  // for(i=0; i<l; i++)
  //   printf("%d %d\n", xS[(i+st)*2], xS[(i+st)*2+1]);

  // printf("yS=====================\n");
  // for(i=0; i<l; i++)
  //   printf("%d %d\n", yS[(i)*2], yS[(i)*2+1]);

  if(l<=3){
    int d = 800000000;
    for(i=0;i<l-1;i++){
      for(j=i+1;j<l;j++){
        tempd = getDistance(xS[st*2+i*2], xS[st*2+i*2+1], xS[st*2+j*2], xS[st*2+j*2+1]);
        if(tempd<d)
          d = tempd;
      }
    }
    return d;
  }
  
  //* xS를 절반으로 분할해서 각 최솟값(dl, dr)구하고 그 중 작은 값(d) 구한다. 
  int extra = l%2;
  int leftyS[(l/2+extra)*2];
  int rightyS[(l/2)*2];

  //yS를 돌면서 원소가 leftxS에 존재하면 leftyS에 추가, 아니면 rightyS에 추가. 홀수면 left가 n/2+1개. right가 n/2개.
  int mid = (end+st)/2;

  for(i=0; i<l/2+extra; i++){ // xL yL로 복사
    leftyS[i*2] = xS[(st+i)*2];
    leftyS[i*2+1] = xS[(st+i)*2+1];
  }
  for(i=l/2+extra; i<l; i++){ // xR yR로 복사
    rightyS[(i-l/2-extra)*2] = xS[(st+i)*2];
    rightyS[(i-l/2-extra)*2+1] = xS[(st+i)*2+1];
  }

  // printf("LEFTYS ========================\n");
  // for(i=0; i<l/2+extra; i++) printf("%d %d\n", leftyS[i*2], leftyS[i*2+1]);

  // printf("RIGHTYS ========================\n");
  // for(i=0; i<l/2; i++) printf("%d %d\n", rightyS[i*2], rightyS[i*2+1]);

  //yL, yR 각각 정렬
  mergeSort(leftyS, 0, l/2+extra-1, 1);
  mergeSort(rightyS, 0, l/2-1, 1);
  
  int dl = split(xS, st, mid, leftyS);
  int dr = split(xS, mid+1, end, rightyS);
  int d = dl < dr ? dl : dr;

  //* yS에서 중간지점으로부터 d까지 떨어져있는 점들을 모은 Y' 배열 만들어서 더 작은 거리가 있는지 확인(6개) 후 그 값 리턴.
  int midX = (xS[mid*2] + xS[(mid+1)*2])/2;
  int newyS[l*2];
  int idx = 0;

  for(i=0; i<l; i++){
    if((yS[i*2]-midX)*(yS[i*2]-midX)<d || (yS[i*2]-midX-1)*(yS[i*2]-midX-1)<d){  // midX가 int라 홀수를 2로 나눌 때 오차가 발생해서 널널하게 범위 +1함.
      newyS[idx] = yS[i*2];
      newyS[idx+1] = yS[i*2+1];
      idx+=2;
    }
  }

  for(i=0; i<idx/2-1; i++){// idx/2는 newyS에 존재하는 점의 개수를 의미함. 개수가 6개보다 적을 때는 모두 비교함.
    for(j=i+1; j<idx/2; j++){
      tempd = getDistance(newyS[i*2], newyS[i*2+1], newyS[j*2], newyS[j*2+1]);
      if(tempd<d)
        d = tempd;
    }
  }
  
  return d;
}

void merge(int arr[], int l, int m, int r, int sortingVar){
	int i, j, k;
	int n1 = m - l + 1;
	int n2 = r - m;

	int L[n1*2], R[n2*2];

	for (i = 0; i < n1; i++){
		L[i*2] = arr[(l + i)*2];
		L[i*2+1] = arr[(l + i)*2+1];
  }
	for (j = 0; j < n2; j++){
		R[j*2] = arr[(m + 1 + j)*2];
		R[j*2+1] = arr[(m + 1 + j)*2+1];
  }

	i = 0;
	j = 0;
	k = l;
	while (i < n1 && j < n2) {
		if (L[i*2+sortingVar] < R[j*2+sortingVar]) {
			arr[k*2] = L[i*2];
			arr[k*2+1] = L[i*2+1];
			i++;
		} else if (L[i*2+sortingVar] == R[j*2+sortingVar]){
      if (L[i*2+1-sortingVar] <= R[j*2+1-sortingVar]){
        arr[k*2] = L[i*2];
        arr[k*2+1] = L[i*2+1];
        i++;
      } else{
        arr[k*2] = R[j*2];
        arr[k*2+1] = R[j*2+1];
        j++;
      }
		} else{
        arr[k*2] = R[j*2];
        arr[k*2+1] = R[j*2+1];
        j++;
    }
		k++;
	}

	while (i < n1) {
		arr[k*2] = L[i*2];
		arr[k*2+1] = L[i*2+1];
		i++;
		k++;
	}

	while (j < n2) {
		arr[k*2] = R[j*2];
		arr[k*2+1] = R[j*2+1];
		j++;
		k++;
	}
}

void mergeSort(int arr[], int l, int r, int sortingVar){
	if (l < r) {

		int m = l + (r - l) / 2;

		mergeSort(arr, l, m, sortingVar);
		mergeSort(arr, m + 1, r, sortingVar);

		merge(arr, l, m, r, sortingVar);
	}
}