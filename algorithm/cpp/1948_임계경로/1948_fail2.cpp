/**
 * 2023.09.29 17:40
 * 위상정렬
*/

#include<iostream>
#include<vector>
using namespace std;

int N, M, roadN =0;
vector<vector<int>> edges; // 1억
vector<int> nodeCosts;

void DFS(int node){
    for(int i=0; i<N; ++i){
        if(edges[i][node]>0){
            if(nodeCosts[node]-edges[i][node] == nodeCosts[i]){
                ++roadN;
                DFS(i);
            }
        }
    }
}

int main(){
    cin >> N >> M;
    edges = vector<vector<int>> (N, vector<int> (N, 0));
    vector<int> incomingEdgeN (N, 0);

    // 그래프 입력
    int from, to, cost;
    for(int i=0; i<M; ++i){
        cin >> from >> to >> cost;
        if(edges[from-1][to-1] > 0) // 같은 경로가 또 들어옴
        {
            if(edges[from-1][to-1] > cost) continue;
        }
        else ++incomingEdgeN[to-1];
        edges[from-1][to-1] = cost;
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
                for(int j=0; j<N; ++j){
                    if(edges[i][j]>0){
                        --incomingEdgeN[j];
                    }
                }
            }
        }
    }

    // 최대 시간 구하기
    nodeCosts = vector<int> (N, 0);
    int currentNode;
    for(int i=0; i<N; ++i){
        currentNode = sortedNodes[i];
        for(int j=0; j<N; ++j){
            if(edges[currentNode][j]>0){
                if(nodeCosts[j] < nodeCosts[currentNode] + edges[currentNode][j]){
                    nodeCosts[j] = nodeCosts[currentNode] + edges[currentNode][j];
                }
            }
        }
    }

    // 최대 시간으로 가는 경로들 찾기
    DFS(end-1);


    cout << nodeCosts[end-1] << endl << roadN << endl;
    return 0;
}