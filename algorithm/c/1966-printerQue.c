#include <stdio.h>
#include <stdlib.h>

int main(){
    int caseN, c, n, idx, i, j, res, rotated=0, isMax, end;
    scanf("%i", &caseN);
    int *ans=malloc(sizeof(int*)*caseN);
    for (c=0;c<caseN;c++){
        scanf("%i %i", &n, &idx);
        int *que = malloc(sizeof(int*)*n);
        for(i=0;i<n;i++) scanf("%i", &que[i]);
        res=1;
        end=0;
        rotated=0;
        while(end==0){
            isMax=1;
            for(j=1;j<n;j++){
                if(que[rotated%n]<que[(rotated+j)%n]){
                    rotated++;
                    isMax=0;
                    break;
                }
            }
            if(isMax){
                if(rotated%n==idx){
                    ans[c]=res;
                    end=1;
                }
                else{
                    que[rotated%n]=-1;
                    res++;
                }
            }
        }
        free(que);
    }
    for (i=0;i<caseN;i++){
        printf("%i\n", ans[i]);
    }
}