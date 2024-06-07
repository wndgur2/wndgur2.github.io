#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
// 참고 https://velog.io/@publicminsu/%EC%88%98%ED%99%95-1823
int makeDp(int l, int r, int depth, vector<vector<int>> &dp, vector<int> &rice){
    if(l > r)
        return 0;
    if(dp[l][r])
        return dp[l][r];
    return dp[l][r] = max(
        rice[l] * depth + makeDp(l + 1, r, depth + 1, dp, rice),
        rice[r] * depth + makeDp(l, r - 1, depth + 1, dp, rice)
    );
}

int main(){
    int N, i;
    cin >> N;

    vector<int> rice(N);
    vector<vector<int>> dp (N, vector<int>(N));

    for (i = 0; i < N; ++i)
        cin >> rice[i];

    cout << makeDp(0, rice.size()-1, 1, dp, rice) << endl;

    return 0;
}