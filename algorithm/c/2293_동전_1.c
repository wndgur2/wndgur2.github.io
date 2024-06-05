/**
 * 2023.4.6
*/
#include <stdio.h>
// n종류의 동전으로 k원을 만드는 경우의 수를 구하는 프로그램.
int main(){
    int n, k, i, j, a[101], dp[10001]={1};
    scanf("%d %d", &n, &k);
    for(i=1; i<=n; i++) scanf("%d", &a[i]);
    for(i=1; i<=n; i++)
        for(j=a[i]; j<=k; j++)
            dp[j]+=dp[j-a[i]];
    printf("%d\n", dp[k]);
    return 0;
}