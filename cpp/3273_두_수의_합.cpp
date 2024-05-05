#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

/**
 * 2023.10.14 20:48
*/

int main(){
    int N, tmp, num, answer =0;
    cin >> N;
    vector<int> nums (N);
    tmp = N;
    while(tmp--) cin >> nums[tmp];
    sort(nums.begin(), nums.end());
    
    int l=0, r=N-1, x;
    cin >> x;
    while(l<r){
        tmp = nums[l] + nums[r];
        if(tmp > x) --r;
        else if(tmp == x){
            ++answer;
            ++l;
            --r;
        }
        else ++l;
    }

    cout << answer << endl;

    return 0;
}
