/*
    10만개의 정수가 주어지고
    그 수열에서 하나를 없앨 수도 있다.

    이 때 가장 큰 구간합을 구하는 법

    누적합으로 n만에 구간합은 구할 수 있다.?

    1 하나 빼는거 없이 최대 구간합 구하는법
     > DP
     dp[i]를 arr[i]를 오른쪽 끝으로 하는 구간의 최대 합으로 정의
     10, -4, 3, 1, 5, 6, -35, 12, 21, -1
     10, 6, 9, 10, 15, 21, -14, 12, 33, 32
     dp[i] = max(dp[i-1]+arr[i], arr[i])
     > n
*/

#include <iostream>
#include <vector>

using namespace std;

int main(){
    int n, i=0, result;
    cin >> n;
    vector<int> arr (n);
    vector<int> dp (n);
    vector<int> dp_removed (n);
    while(i<n){ 
        cin >> arr[i++];
    }

    result = arr[0];
    dp[0] = arr[0];
    dp_removed[0] = arr[0];

    for(i=1; i<n; ++i){
        dp[i] = max(dp[i-1]+arr[i], arr[i]); // 이어서 갈 건지, 새로 갈 건지.
        dp_removed[i] = max(dp[i-1], dp_removed[i-1]+arr[i]); // 여기서 삭제할건지, 이전에 삭제했을건지

        result = max(result, max(dp[i], dp_removed[i]));
    }

    cout << result << endl;
    return 0;
}