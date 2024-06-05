#include <iostream>
#include <vector>
using namespace std;

int main(){
    int N, C, i;
    cin >> N >> C;
    vector<int> houses = {};
    while(N--){
        cin >> i;
        houses.push_back(i);
    }
    return 0;
}