#include<stdio.h>
#include<stdlib.h>

int* cut(int *arr, int l){
    // printf("arr:");
    // for(int i=0; i<l*l; i++)
    //     printf(" %i", arr[i]);
    // printf("\n");
    static int count[2]={0,0};
    if(l==1) { count[arr[0]]++; }
    else{
        int t = arr[0];
        int isSame = 1;
        for (int i=0; i<l*l; i++){
            if (arr[i]!=t)
                isSame = 0;
        }
        if(isSame == 1){
            count[t]++;
            return count;
        }
        else{
            int nl = (int)(l/2);
            int *tArr=NULL;
            for (int i=0; i<2; i++){
                for (int j=0; j<2; j++){
                    tArr = malloc(sizeof(int)*nl*nl);
                    for (int k=0; k<nl*nl; k++){
                        tArr[k] = arr[i*l*nl+j*nl+(int)((int)(k/nl)*l)+k%nl];
                    }
                    cut(tArr,nl);
                    free(tArr);
                }
            }
        }
    }

    return count;
}
int main(){
    int n;
    scanf("%i", &n);
    int *arr = malloc(sizeof(int)*n*n);
    for (int i=0; i<n*n; i++)
        scanf("%i", &arr[i]);

    int *ans = cut(arr, n);
    printf("%i\n%i\n", ans[0], ans[1]);
}