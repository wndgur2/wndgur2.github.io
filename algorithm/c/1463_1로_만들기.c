/**
 * 2023.4.10
*/
#include <stdio.h>

int main(){
    int N, i, min, dp[1000001]; // dp[i]: i를 1로 만드는데 필요한 최소 연산횟수
    scanf("%d", &N);
    dp[1] = 0;
    for(i=2; i<=N; i++){
        min = dp[i-1];
        if(i%3 == 0 && dp[i/3] < min)
            min = dp[i/3];
        if(i%2 == 0 && dp[i/2] < min)
            min = dp[i/2];
        dp[i] = min + 1;
    }
    printf("%d", dp[N]);
}