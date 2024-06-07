#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

int main(){
    int n, i, ptr=0;
    scanf("%i", &n);
    int *nums= malloc(sizeof(int*)*n);
    int *stack= malloc(sizeof(int*)*n);
    int *res= malloc(sizeof(int*)*n);

    for(i=0; i<n; i++){
        scanf("%i", &nums[i]);
        res[i]=-1;
    }
    for(i=0;i<n;i++){
        while(ptr>0 && nums[stack[ptr-1]]<nums[i]){
            res[stack[ptr-1]]=nums[i];
            ptr--;
        }
        stack[ptr]=i;
        ptr++;
    }

    for(i=0; i<n; i++) printf("%i ", res[i]);
    free(nums);
}