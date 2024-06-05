#include <stdio.h>
#include <vector>

using namespace std;

/*
    2023.6.03
    나머지합.cpp
    https://www.acmicpc.net/problem/10986
    구간의 합이 m으로 나누어 떨어지는 경우의 수

    키뽀인트: 누적합의 나머지를 저장한 배열에서, 나머지가 같은 두 인덱스를 뽑는다.
*/

int main(){
    int n, m;
    scanf("%d %d", &n, &m);
    vector<int> nums(n);
    
    // cnt[r] : 누적합을 m으로 나눈 나머지가 r인 경우의 수
    vector<int> cnt(m, 0);
    cnt[0] = 1; // 누적합의 나머지가 0인 경우가 1개면 답에 1을 추가해야 하므로 1로 초기화
    
    for(int i=0; i<n; i++)
        scanf("%d", &nums[i]);

    int remainder = 0; // 누적합을 m으로 나눈 나머지

    for(int i=0; i<n; i++){
        remainder += nums[i];
        remainder %= m;
        cnt[remainder] += 1;
    }

    int answer = 0;
    for(int i=0; i<m; i++) // i: 누적합의 나머지
        // 누적합의 나머지가 같은 두 인덱스(두 인덱스는 구간합의 구간이 된다)를 중복 없이 뽑는 경우의 수
        answer += (int)cnt[i]*(cnt[i]-1)/2;

    printf("%d\n", answer);
    return 0;
}