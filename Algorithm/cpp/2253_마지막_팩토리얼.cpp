#include<iostream>
using namespace std;
/**
 * 2023.10.07 18:00
 * 
 * 1
 * 2
 * 6 // 3
 * 24 // 4
 * 120 // 5
 * 720 // 6
 * 5040
 * 40320
 * 362880
 * 3628800 // 10
 * 8 // 11
 * 6 // 12
 * 8 // 13
 * 2 // 14
 * 10 // 15
 * 6
 * 2
 * 6
 * 4
 * 4
*/

int main(){
    int n;
    cin >> n;

    // 
    while(n%10==0){
        n /= 10;
    }
    n %= 10;
    int result = n;
    while(--n){
        result *= n;
    }
    while(result%10==0){
        result /= 10;
    }
    cout << result%10 << endl;

    return 0;
}