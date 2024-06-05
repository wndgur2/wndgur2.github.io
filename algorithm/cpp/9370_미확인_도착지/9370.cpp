#include<iostream>
#include<vector>
using namespace std;

/*
    각 후보로 가는 최단경로가 gh를 포함하지 않는 경우 제외시키는 문제.
    일단 경로를 구하고 gh를 포함하는지 확인?
*/

vector<vector<int>> roads;

int main(){
    int T, n, m, t, s, g, h, a, b, d;
    cin >> T;
    while(T--){
        // 교차로, 도로, 목적지 후보의 개수, 출발지, 지나간 경로
        cin >> n >> m >> t >> s >> g >> h;

        // 도로 거리
        roads = vector<vector<int>> (n, vector<int> (n, -1));
        while(m--){
            cin >> a >> b >> d;
            roads[a][b] = d;
            roads[b][a] = d;
        }

        // 가능한 목적지인지.
        vector<int> availableGoals = {};
        int goal;
        while(t--){
            cin >> goal;
            
            if(isGoal(goal, g, h)){ // 최단경로가 gh를 지나는가?
                availableGoals.push_back(goal);
            }
        }
        sort(availableGoals.begin(), availableGoals.end());
        for(int node: availableGoals)
            cout << node << " ";
        cout << endl;
    }

    return 0;
}