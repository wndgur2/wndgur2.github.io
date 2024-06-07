#include <iostream>
#include <vector>
using namespace std;
// 부분수열의 합
int main(){
    int n, s;
    scanf("%d %d", &n, &s);
    vector<int> nums(n);
    for(int i=0; i<n; i++){
        scanf("%d", &nums[i]);
    }
    int ans = 0;
    for(int i=1; i<(1<<n); i++){
        int sum = 0;
        for(int k=0; k<n; k++){
            if(i&(1<<k)){
                sum += nums[k];
            }
        }
        if(sum == s){
            ans += 1;
        }
    }
    printf("%d\n", ans);
    return 0;
}