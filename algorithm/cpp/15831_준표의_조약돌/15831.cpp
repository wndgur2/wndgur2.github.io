#include <iostream>
#include <vector>
using namespace std;

int main(){
    int N, B, W;
    cin >> N >> B >> W;
    vector<int> pebbles = {};
    char a;
    while (N--){
        cin >> a;
        if(a=='W') pebbles.push_back(1);
        else pebbles.push_back(0);
    }

    int answer = 0;
    for(int pebble: pebbles){
        
    }
    return 0;
}