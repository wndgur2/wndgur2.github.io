#include <iostream>
#include <vector>
//외판원순회2
using namespace std;
int n;
int w[16][16];
int go(int node, int visit){
    if(visit == (1<<n)-1){
        if(w[node][0] == 0){
            return 1e9;
        }
        return w[node][0];
    }
    int ans = 1e9;
    for(int i=0; i<n; i++){
        if(visit&(1<<i)){
            continue;
        }
        if(w[node][i] == 0){
            continue;
        }
        int temp = w[node][i] + go(i, visit|(1<<i));
        if(ans > temp){
            ans = temp;
        }
    }
    return ans;
}
int main(){
    scanf("%d", &n);
    for(int i=0; i<n; i++){
        for(int k=0; k<n; k++){
            scanf("%d", &w[i][k]);
        }
    }
    printf("%d\n", go(0, 1));
    return 0;
}
