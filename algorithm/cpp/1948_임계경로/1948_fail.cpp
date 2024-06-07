/**
 * 2023.09.29 17:40
 * BFS, 시간초과
 * 문제를 다시 
 * 최장거리의 개수랑 코스트만 구하는게 아니라
 * 최장시간을 들여 목적지에 도달할 수 있는 모든 도로의 개수도 구해야함
*/

#include<iostream>
#include<vector>
using namespace std;

int N, M;

vector<vector<int>> roads;

int main(){
    cin >> N >> M;
    roads = vector<vector<int>> (N, vector<int> (N, 0));
    vector<vector<int>> nodeCosts (N, {0, 0, 0}); // time, road amount, !from

    // 그래프 입력
    int from, to, cost;
    for(int i=0; i<M; ++i){
        cin >> from >> to >> cost;
        if(roads[from-1][to-1] > 0) // 같은 경로가 또 들어옴
            if(roads[from-1][to-1] > cost) continue;
        roads[from-1][to-1] = cost;
    }

    int start, end, turn = 0;
    cin >> start >> end;
    vector<vector<int>> queues = {{start-1}, {}}; // node idx
    while(!queues[0].empty() || !queues[1].empty() ){ // 하나라도 있는동안
        if(queues[turn%2].empty()){
            ++turn;
            continue;
        }
        int node = queues[turn%2].back();
        queues[turn%2].pop_back();
        for(int i=0; i<N; ++i){ // from node to i
            if(roads[node][i]){
                if(nodeCosts[i][0] < nodeCosts[node][0] + roads[node][i]){
                    nodeCosts[i][0] = nodeCosts[node][0] + roads[node][i];
                    nodeCosts[i][2] = node;
                    // 무조건 대체
                    nodeCosts[i][1] = nodeCosts[node][1] + 1;
                    queues[(turn+1)%2].push_back({i});
                }
                else if(nodeCosts[i][0] == nodeCosts[node][0] + roads[node][i]){
                    // from이 다를 경우
                    if(nodeCosts[i][2] != node) nodeCosts[i][1] += nodeCosts[node][1] + 1;
                    // from이 같을 경우
                    else nodeCosts[i][1] = nodeCosts[node][1] + 1;
                    queues[(turn+1)%2].push_back({i}); // 나중에 도달했을 때 다시 탐색해서 도로개수를 세어?
                } // 이방식으로하면오류가생김 나중에 도달한게 경로를 중복해서 추가함.
                // 처음엔 합치는게 맞고, 뒤에는 대체하는게 맞는데. from을 저장하면?
                // 이런 중복을 없애는게 위상정렬이구나. 들어오는 링크?가 없는 순서로 저장해서 와우
            }
        }
        ++turn;
    }
    cout << nodeCosts[end-1][0] << endl << nodeCosts[end-1][1] << endl;
    return 0;
}