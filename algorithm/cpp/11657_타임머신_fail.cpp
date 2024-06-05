#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

/**
 * 2023.10.21 16:38
 * 
 * 음수가 포함된 간선에서 가장 빠른 경로 찾기
 * -무한이면 -1 출력
 * 
 * 최단경로 찾기
 * 무한으로 줄어드는지 판단하는 방법
 * 비용이 음수인 루프. 를 찾기
 * 
*/

int N, M, searchingNode;
vector<vector<pair<int, int>>> roads;
vector<int> minCosts;
vector<int> countRenew;

vector<int> searchingNodes;
bool search(int index){
    bool result = false;
    for(pair<int, int> destCost: roads[index]){
        int nextNode = destCost.first, cost = destCost.second;
        if(cost + minCosts[index] < minCosts[nextNode]){ // 갱신
            minCosts[nextNode] = cost + minCosts[index];
            if(++countRenew[nextNode] > 25000) return true; // 이 알고리즘으로는 이걸 충분히 하는데 걸리는 시간이 너무 길다.
            if(find(searchingNodes.begin(), searchingNodes.end(), nextNode) == searchingNodes.end())
                searchingNodes.push_back(nextNode);
        }
    }
    while(!searchingNodes.empty()){
        int nextNode = searchingNodes.back();
        searchingNodes.pop_back();
        result = result || search(nextNode);
    }
    return result;
}

int main(){
    cin >> N >> M;
    roads = vector<vector<pair<int, int>>> (N);
    minCosts = vector<int> (N, 5000001);

    int A, B, C;
    while(M--){
        cin >> A >> B >> C;
        roads[A-1].push_back(make_pair(B-1, C));
    }

    minCosts = vector<int> (N, 5000001);
    countRenew = vector<int> (N, 0);
    minCosts[0] = 0;

    if(search(0)){
        cout << -1 << endl;
        return 0;
    }

    for(int i=1; i<N; ++i){
        if(minCosts[i] == 5000001) cout << -1 << endl;
        else cout << minCosts[i] << '\n';
    }
    return 0;
}