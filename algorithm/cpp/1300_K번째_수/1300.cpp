/*
    세준이는 크기가 N×N인 배열 A를 만들었다.
    배열에 들어있는 수 A[i][j] = i×j 이다.
    이 수를 일차원 배열 B에 넣으면 B의 크기는 N×N이 된다.
    B를 오름차순 정렬했을 때, B[k]를 구해보자.
    배열 A와 B의 인덱스는 1부터 시작한다.

    첫째 줄에 배열의 크기 N이 주어진다.
    N은 10^5보다 작거나 같은 자연수이다.
    둘째 줄에 k가 주어진다.
    k는 min(10^9, N^2)보다 작거나 같은 자연수이다.
*/

#include<iostream>
#include<cmath>
using namespace std;

int N;

int main(){
    int k;
    cin >> N >> k;

    int l = 1, m, r = k, res, amount;

    while(l <= r){
        m = (l + r) / 2;

        amount = 0;
        for(int i=1; i<=N; ++i) amount += min(N, m/i);

        // m-1보다 작거나 같은 원소의 개수가 k개보다 작고,
        // m보다 작거나 같은 원소의 개수가 k보다 크거나 같아야 함.
        if(amount < k){ // m이 답일 수가 없음.
            l = m +1;
        } else{ // m이 답일 수도 있음.
            res = m;
            r = m - 1;
        }
    }

    cout << res << endl;
}

/*
    참고: https://kbw1101.tistory.com/29
*/