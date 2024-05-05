/**
 * 2023.09.28 21:00
 * 
 * N <= 100 : 완전탐색 안됨. DP.
 * 
 * DP[i][j] i: 도시, j: 남은시간.
 * 값은 이때 얻을 수 있는 모금액의 최댓값.
*/

#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

vector<unordered_map<int, int>> DP;

int main(){
    int N, K, i;
    cin >> N >> K;

    DP = vector<unordered_map<int, int>> (N);

    int walk_cost, walk_income, bicycle_cost, bicycle_income;
    cin >> walk_cost >> walk_income >> bicycle_cost >> bicycle_income;
    DP[0][K-walk_cost] = walk_income;
    DP[0][K-bicycle_cost] = bicycle_income;

    for(i=1; i<N; ++i){ // 100
        cin >> walk_cost >> walk_income >> bicycle_cost >> bicycle_income;
        for (auto& [key, value]: DP[i-1]) { // key = 비용이 이만큼 남았을 때, value = 모을 수 있는 최대 모금액 // 10만
            if(key-walk_cost >= 0 && DP[i][key-walk_cost] < value+walk_income){
                DP[i][key-walk_cost] = value + walk_income;
                // 이게 재귀 방식이랑 다른점. 들어가는 값이 최대값인지 보장이 안되어있어서 계속 갱신해야함.
                // 그리고 이미 도출한 값을 이용하지 않음? > DP가 아님?
            }
            if(key-bicycle_cost >= 0 && DP[i][key-bicycle_cost] < value+bicycle_income){
                DP[i][key-bicycle_cost] = value + bicycle_income;
            }
        }
    }
    // >> 최대 천만인데 와이 안대? 

    int best_value = 0;
    for(auto& [key, value]: DP[N-1]){
        if(value > best_value) best_value = value;
    }

    cout << best_value << endl;

    return 0;
}