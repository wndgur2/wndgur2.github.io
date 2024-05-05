#include<stdio.h>
#include<stdlib.h>

int main(){
    int n, m, idx=0, cost=0, i, goal, lCost, rCost, j, g;
    scanf("%i %i", &n, &m);
    int *stack = malloc(sizeof(int*)*m);
    for (i=0; i<m; i++){
        scanf("%i", &goal);
        goal -= 1;
        rCost = goal-idx;
        lCost = idx-goal;
        for(j=0; j<i; j++){
            if(goal < idx){
                if(goal < stack[j] && stack[j] < idx) lCost--;
                else rCost--;
            }
            else if(goal > idx){
                if(goal > stack[j] && idx < stack[j]) rCost --;
                else lCost --;
            }
        }
        if(rCost<0) rCost+=n;
        if(lCost<0) lCost+=n;
        if(lCost>rCost) cost+=rCost;
        else cost+=lCost;
        idx=goal+1;
        g=1;
        while (g){
            g=0;
            if(idx>n-1) idx%=n;
            for (j=0; j<i; j++){
                if(idx == stack[j]){
                    idx++;
                    g=1;
                    break;
                }
            }
        }
        stack[i]=goal;
    }
    printf("%i\n",cost);
}