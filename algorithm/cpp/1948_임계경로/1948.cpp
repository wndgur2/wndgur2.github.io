/**
 * 2023.09.29 17:40
 * 위상정렬
*/

#include<iostream>
#include<vector>
using namespace std;

int N, M, roadN =0;
vector<vector<pair<int, int>>> edges; // 1억
vector<vector<vector<int>>> edgesReverse; // to, cost, visit
vector<int> nodeCosts;

void DFS(int node){
    for(int i=0; i<edgesReverse[node].size(); ++i){ // node로 가는 간선들에 대해
        if(edgesReverse[node][i][2]) continue;
        int fromNode = edgesReverse[node][i][0];
        int cost = edgesReverse[node][i][1];
        if(nodeCosts[node]-cost == nodeCosts[fromNode]){
            ++roadN;
            DFS(fromNode); // 여기에 또 올 경우 또 추가됨.
            edgesReverse[node][i][2] = true;
        }
    }
}

int main(){
    cin >> N >> M;
    edges = vector<vector<pair<int, int>>> (N);
    edgesReverse = vector<vector<vector<int>>> (N);
    vector<int> incomingEdgeN (N, 0);

    // 그래프 입력
    int from, to, cost;
    for(int i=0; i<M; ++i){
        cin >> from >> to >> cost;
        // if(edges[from-1][to-1] > 0) // 같은 경로가 또 들어옴
        // {
        //     if(edges[from-1][to-1] > cost) continue;
        // }
        // else
        ++incomingEdgeN[to-1];
        edges[from-1].push_back(make_pair(to-1, cost));
        edgesReverse[to-1].push_back({from-1, cost, false});
    }

    int start, end, turn = 0;
    cin >> start >> end;

    // 위상정렬
    vector<int> sortedNodes = {};
    vector<bool> visit (N, false);
    while(sortedNodes.size() < N){
        for(int i=0; i<N; ++i){
            if(visit[i]) continue;
            if(incomingEdgeN[i]==0){
                sortedNodes.push_back(i);
                visit[i] = true;
                for(int j=0; j<edges[i].size(); ++j){
                    --incomingEdgeN[edges[i][j].first];
                }
            }
        }
    }

    // 최대 시간 구하기
    nodeCosts = vector<int> (N, 0);
    int currentNode;
    for(int i=0; i<N; ++i){
        currentNode = sortedNodes[i];
        for(int j=0; j<edges[currentNode].size(); ++j){
            to = edges[currentNode][j].first;
            if(nodeCosts[to] < nodeCosts[currentNode] + edges[currentNode][j].second){
                nodeCosts[to] = nodeCosts[currentNode] + edges[currentNode][j].second;
            }
        }
    }

    // 최대 시간으로 가는 경로들 찾기
    DFS(end-1);


    cout << nodeCosts[end-1] << endl << roadN << endl;
    return 0;
}