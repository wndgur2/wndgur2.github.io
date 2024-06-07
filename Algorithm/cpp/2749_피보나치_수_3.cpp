/**
 * 2023.10.28 13:49
*/
#include<iostream>
using namespace std;

int main(){
    int p = 1500000;
    long long N;
    cin >> N;
    int fibo[1500000] = {0, 1};
    for(int i=2; i<p; ++i){
        fibo[i] = fibo[i-1] + fibo[i-2];
        fibo[i] %= 1000000;
    }
    cout << fibo[N%p] << endl;
    return 0;
}