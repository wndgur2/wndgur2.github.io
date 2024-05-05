#include <iostream>
#include <vector>
using namespace std;

vector<pair<int, int>> ds = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

// DP[y][x] = y, x에서 goal까지 가는 경우의 수. -1로 초기화
int DFS(int y, int x, vector<vector<int>> &geo, vector<vector<int>> &DP){
    if(y == geo.size()-1 && x == geo[0].size()-1) return 1;
    if(DP[y][x] != -1) return DP[y][x];
    DP[y][x] = 0;
    for(pair<int, int> d : ds){
        int newY = y+d.first;
        int newX = x+d.second;
        if(newY < 0 || newY >= geo.size()) continue;
        if(newX < 0 || newX >= geo[0].size()) continue;
        if(geo[newY][newX] >= geo[y][x]) continue;
        DP[y][x] += DFS(newY, newX, geo, DP);
    }
    return DP[y][x];
}

int main(){
    int H, W, i, j;
    cin >> H >> W;

    vector<vector<int>> geo(H, vector<int> (W));
    vector<vector<int>> DP(H, vector<int> (W, -1));

    for(i=0; i<H; ++i) for(j=0; j<W; ++j)
        cin >> geo[i][j];
    cout << DFS(0, 0, geo, DP) << endl;
}