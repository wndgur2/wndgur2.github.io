// 13911 집구하기
#include <iostream>
#include <vector>
#include <queue>
#include <utility>

using namespace std;

#define INF 100000001

int i;
vector<vector<pair<int, int> > > graph; // 상대노드, 가중치
vector<int> V(10001, 0); // 0: 집, 1: 맥, 2: 스타벅스

void search(vector<int> &node, vector<int> &res){
    priority_queue<pair<int, int> > q;
    
    for(int idx: node) {
        res[idx] = 0;
        q.push(make_pair(0, idx));
    }

    while(!q.empty()){
         // 최소비용 노드 뽑음
        int w = -q.top().first;
        int idx = q.top().second;
        q.pop();
        
        if(res[idx] < w) continue; // 노드 최소값이 그새 더 작아짐

        for(pair<int, int> nextNode : graph[idx]){ // idx 근처의 노드들에 대해
            int nextWeight = w + nextNode.second;
            if(w + nextNode.second < res[nextNode.first]){ // 다음 노드로 가는 비용이, 그 노드의 최소비용보다 작다면
                q.push(make_pair(-nextWeight, nextNode.first)); // 큐에 추가
                res[nextNode.first] = nextWeight; // 다음 노드 최소비용 갱신
            }
        }
    }
}

int main(){
    int n_V, n_E, temp;
    scanf("%d %d", &n_V, &n_E);
    
    for(i=0; i<n_V+1; i++) // 그래프 생성
        graph.push_back(vector<pair<int, int> >());
    
    // 노드 연결
    for(i=0; i<n_E; i++){
        int a, b, w;
        scanf("%d %d %d", &a, &b, &w);
        graph[a].push_back(make_pair(b, w));
        graph[b].push_back(make_pair(a, w));
    }

    int x, y, n;
    // 매장 노드 인덱스 벡터, 최소 거리 벡터
    vector<int> mcdonalds;
    vector<int> starbucks;
    vector<int> min_mc(10001, INF);
    vector<int> min_st(10001, INF);

    //맥도날드
    scanf("%d %d", &n, &x);
    for(i=0; i<n; i++){
        int index;
        scanf("%d", &index);
        V[index] = 1;
        mcdonalds.push_back(index);
    }
    search(mcdonalds, min_mc);

    //스타벅스
    scanf("%d %d", &n, &y);
    for(i=0; i<n; i++){
        int index;
        scanf("%d", &index);
        V[index] = 2;
        starbucks.push_back(index);
    }
    search(starbucks, min_st);

    int res = INF;
    for(i=0; i<n_V+1; i++){
        if(V[i]!=0) continue;
        if(min_mc[i] > x || min_st[i] > y) continue;
        if(min_mc[i] + min_st[i] < res)
            res = min_mc[i] + min_st[i];
    }
    if(res >= INF) printf("-1\n");
    else printf("%d\n", res);
    return 0;
}