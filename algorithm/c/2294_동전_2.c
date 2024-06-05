/**
 * 2023.4.6
*/
#include <stdio.h>
// n종류의 동전으로 k원을 만드는 동전의 최소 개수를 구하는 프로그램.
int main(){
    int n, k, i, j, temp, a[101], dp[10001];
    scanf("%d %d", &n, &k);
    for(i=0; i<=k; i++) dp[i] = 10002;
    for(i=1; i<=n; i++) {
        scanf("%d", &temp);
        if(temp < 10001) a[i] = temp;
        dp[a[i]] = 1;
    };
    for(i=1; i<=n; i++)
        for(j=a[i]; j<=k; j++)
            dp[j] = dp[j] < dp[j-a[i]]+1 ? dp[j] : dp[j-a[i]]+1;
    // for(i=0; i<=k; i++) printf("%d ", dp[i]);
    // printf("\n");
    printf("%d\n", dp[k] == 10002? -1 : dp[k]);
    return 0;
}
