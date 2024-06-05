#include<iostream>
#include<vector>

#define endl "\n"
#define MAX 510
#define INF 987654321
using namespace std;

/**
 * 출처: https://yabmoons.tistory.com/380
 * 벨먼포드 알고리즘. (음의 가중치를 포함한 그래프에서 최소비용 탐색)
 * 모든 간선을, 노드의 개수 N번 확인하여 각 노드로 가는 최소비용을 갱신했을 때,
 * N번째 확인에 비용이 갱신된다면, 무한루프가 존재
*/
 
int N, M;
long long Dist[MAX];
vector<pair<pair<int, int>, int>> Edge;
 
void Input()
{
    cin >> N >> M;
    for (int i = 1; i <= N; i++) Dist[i] = INF;
    for (int i = 0; i < M; i++)
    {
        int From, To, Cost;
        cin >> From >> To >> Cost;
        Edge.push_back(make_pair(make_pair(From, To), Cost));
    }
}

void Solution() // 300만
{
    Dist[1] = 0;
    for (int i = 1; i <= N - 1; i++) // 500
    {
        for (int j = 0; j < Edge.size(); j++) // 6000
        {
            int From = Edge[j].first.first;
            int To = Edge[j].first.second;
            int Cost = Edge[j].second;
 
            if (Dist[From] == INF) continue;
 
            if (Dist[To] > Dist[From] + Cost) Dist[To] = Dist[From] + Cost;
        }
    }
 
    for (int i = 0; i < Edge.size(); i++) // 갱신이 있다면 무한루프
    {
        int From = Edge[i].first.first;
        int To = Edge[i].first.second;
        int Cost = Edge[i].second;
 
        if (Dist[From] == INF) continue;
        if (Dist[To] > Dist[From] + Cost)
        {
            cout << -1 << endl;
            return;
        }
    }
 
    for (int i = 2; i <= N; i++)
    {
        if (Dist[i] == INF) cout << -1 << endl;
        else cout << Dist[i] << endl;
    }
}
 
void Solve()
{
    Input();
    Solution();
}
 
int main(void)
{
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    Solve();
    return 0;
}
