#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int n, i=0, idx=0, res=0, newN;
    scanf("%i", &n);
    int *stack = malloc(sizeof(int*)*n);
    while (i < n){
        scanf("%i", &newN);
        if (newN == 0){
            res -= stack[idx-1];
            stack[idx-1] = 0;
            idx --;
        }
        else{
            stack[idx] = newN;
            res += newN;
            idx ++;
        }
        i ++;
    }
    printf("%i\n", res);
    free(stack);
}