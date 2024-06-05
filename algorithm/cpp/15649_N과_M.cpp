#include <stdio.h>
#include <vector>
#include <algorithm>
using namespace std;
// N과 M
void dfs(int n, int m, vector<int> nums){
    if(m==0){
        for(int i=0; i<nums.size(); i++)
            printf("%d ", nums[i]);
        printf("\n");
        return;
    }
    for(int i=1; i<=n; i++){
        if(find(nums.begin(), nums.end(), i) == nums.end()){
            nums.push_back(i);
            dfs(n, m-1, nums);
            nums.pop_back();
        }
    }
}
int main(){
    int n, m;
    scanf("%d %d", &n, &m);
    vector<int> nums;
    dfs(n, m, nums);
    return 0;   
}