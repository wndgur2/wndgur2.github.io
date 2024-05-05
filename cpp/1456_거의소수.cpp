#include<iostream>
#include<cmath>
using namespace std;

bool is_prime(int n)
{
    if (n <= 1)
        return false;
  
    for (int j = 2; j * j <= n; j++) 
        if (n % j == 0)
            return false;

    return true;
}

int main(){
    int A, B, answer = 0;

    cin >> A >> B;

    // root a ~ root b 소수인지
    int a = ceil(sqrt(A));
    int b = floor(sqrt(B));

    for(int i=a; i<=b; i++)
        if(is_prime(i)){
            answer ++;
            cout << i << endl;
        }

    cout << answer << endl;

    return 0;
}