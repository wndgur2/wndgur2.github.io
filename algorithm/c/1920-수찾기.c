#include <stdio.h>
#include <stdlib.h>
//mergeSort 후 binarySearch
void merge(int arr[], int l, int m, int r);
void mergeSort(int arr[], int l, int r);
int binarySearch(int x, int *xS, int st, int end);

int main(){
  int n, m, i, f;
  scanf("%d", &n);
  int arr[n];

  for(i=0; i<n; i++)
    scanf("%d", &arr[i]);

	mergeSort(arr, 0, n-1);

  scanf("%d", &m);

  for(i=0; i<m; i++){
    scanf("%d", &f);
    printf("%d\n", binarySearch(f, arr, 0, n-1));
  }

	return 0;
}

int binarySearch(int x, int *xS, int st, int end){
  if(end - st < 0) return 0;
  int mid = (end+st)/2;

  if(xS[mid]==x)
    return 1;
  else if(xS[mid] < x)
      return binarySearch(x, xS, mid+1, end);
  else
    return binarySearch(x, xS, st, mid-1);
}

void merge(int arr[], int l, int m, int r){
	int i, j, k;
	int n1 = m - l + 1;
	int n2 = r - m;

	int L[n1*2], R[n2*2];

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