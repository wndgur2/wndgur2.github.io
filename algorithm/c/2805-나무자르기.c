#include<stdio.h>
typedef long long ll;
/*
  1. 합성 정렬 nlogn
  2. 높이가 h일 때 모일 나무 - l
  3. 다음 나무까지 안 잘라도 목표 달성할 수 있는지 확인
  4. 있으면 높이 리턴, 없으면 반복

  nlogn
*/

void merge(unsigned int arr[], int l, int m, int r);
void mergeSort(unsigned int arr[], int l, int r);

int main(){
  unsigned int n, goal, i, tallerTrees=1, h;
  ll stored=0;
  scanf("%d %d", &n, &goal);
  unsigned int trees[n+1];
  trees[0] = 0;
  for(i=1; i<=n; i++) scanf("%d", &trees[i]);
  mergeSort(trees, 1, n);
  for(i=n; i>=0; i--){
    stored += (ll)(trees[i]-trees[i-1])*tallerTrees; //다음 나무 최대 높이로 자르면 모이는 양
    if(stored >= goal){
      h=trees[i-1] + (stored-goal)/tallerTrees; //그 양이 목표를 넘었을 때 현재와 다음 나무 높이 사이에서 양이 목표가 되는 높이.
      printf("%d\n", h);
      return 0;
    }
    tallerTrees++;
  }
}

void merge(unsigned int arr[], int l, int m, int r){
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

void mergeSort(unsigned int arr[], int l, int r){
	if (l < r) {
		int m = l + (r - l) / 2;

		mergeSort(arr, l, m);
		mergeSort(arr, m + 1, r);

		merge(arr, l, m, r);
	}
}