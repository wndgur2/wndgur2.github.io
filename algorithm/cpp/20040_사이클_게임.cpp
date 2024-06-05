#include <iostream>

int getParent(int i, int* parents){
    if(i==parents[i]){
        return i;
    } else{
        parents[i] = getParent(parents[i], parents);
        return parents[i];
    }
}

int main(){
    int n, turn, result = 0, pA, pB;
    scanf("%d %d", &n, &turn);
    int* parents = (int*)malloc( sizeof(int) * n + 1 );
    int* depth = (int*)malloc( sizeof(int) * n + 1 );

    for(int i=0; i<n; i++){
        parents[i] = i;
        depth[i] = 1;
    }
    for(int i=0; i<turn; i++){
        int a, b;
        scanf("%d %d", &a, &b);
        pA = getParent(a, parents);
        pB = getParent(b, parents);
        if(pA == pB) {
            printf("%d\n", i+1);
            return 0;
        }
        else{
            if(depth[pA] > depth[pB]) parents[pB] = pA;
            else{
                parents[pA] = pB;
                if(depth[pB] == depth[pA]) depth[pB]++;
            }
        }
    }
    printf("0\n");
    return 0;
}