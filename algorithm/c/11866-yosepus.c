#include <stdio.h>
#include <stdlib.h>

int main(){
    int n,k,i,j,removingIndex=-1,idx, TRI;
    scanf("%i", &n);
    scanf("%i", &k);
    int *que= malloc(sizeof(int*)*n);
    int *res= malloc(sizeof(int*)*n);

    for(i=0;i<n;i++) que[i]=i+1;

    for(i=0;i<n;i++){
        j=0;
        while(j<k){
            TRI = (removingIndex+j+1)%n;
            if (que[TRI]==-1){
                removingIndex++;
                removingIndex%=n;
                j--;
            }
            j++;
        }
        removingIndex+=k;
        removingIndex%=n;
        res[i]=que[removingIndex];
        que[removingIndex]=-1;
    }
    printf("<");
    for(i=0;i<n-1;i++) printf("%i, ", res[i]);
    printf("%i>\n", res[n-1]);
    free(que);
    free(res);
}