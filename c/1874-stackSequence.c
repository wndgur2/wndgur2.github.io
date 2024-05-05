#include <stdio.h>
#include <stdlib.h>


int main(){
    int n, temp, prev=0;
    scanf("%i", &n);
    int *stack = malloc(sizeof(int*)*n);
    char *res = malloc(sizeof(char*)*n*3);
    int stackPtr = 0, resPtr = 0;
    for (int i=0; i<n; i++){
        scanf("%i", &temp);
        if(temp>prev){
            for (int j=prev+1; j<=temp; j++){
                stack[stackPtr]=j;
                stackPtr++;
                res[resPtr] = '+';
                res[resPtr+1] = '\n';
                resPtr+=2;
            }
            stackPtr--;
            res[resPtr] = '-';
            res[resPtr+1] = '\n';
            resPtr+=2;
            prev = temp;
        }
        else{
            if(stack[stackPtr-1] != temp){
                printf("NO\n");
                return 0;
            }
            else{
                stackPtr--;
                res[resPtr] = '-';
                res[resPtr+1] = '\n';
                resPtr+=2;
            }
        }
    }
    printf("%s", res);
    free(stack);
    free(res);
    return 0;
}