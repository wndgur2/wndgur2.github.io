#include<iostream>
#include<vector>
using namespace std;

vector<vector<int>> walls;
vector<vector<int>> visits;
vector<pair<int, int>> ds = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

int main(){
    int H, W, K, i, j;
    cin >> H >> W >> K;
    walls = vector<vector<int>> (H, vector<int> (W));
    visits = vector<vector<int>> (H, vector<int> (W, -1));

    for(i=0; i<H; ++i){
        for(j=0; j<W; ++j){
            scanf("%1d", &walls[i][j]);
        }
    }

    int depth = 1, y, x, leftK, newY, newX, result = -1;
    vector<vector<vector<int>>> routes = {{}, {{0, 0, K}}};
    visits[0][0] = K;

    while(!routes[0].empty() || !routes[1].empty()){
        // cout << "D: " << depth << endl;
        // for(vector<int> route: routes[depth%2]){
        //     cout << route[0] << ' ' << route[1] << ' ' << route[2] << endl;
        // }
        // for(vector<int> row: visits){
        //     for(int k: row){
        //         cout << k;
        //     }
        //     cout << endl;
        // }
        // cout<<endl;

        y = routes[depth%2].back()[0];
        x = routes[depth%2].back()[1];
        if(y==H-1 && x==W-1) {
            result = depth;
            break;
        }
        
        leftK = routes[depth%2].back()[2];
        routes[depth%2].pop_back();

        for(pair<int, int> d: ds){
            newY = y + d.first;
            newX = x + d.second;
            if(newY<0 || newY>=H || newX<0 || newX>=W) continue;
            if(walls[newY][newX]==1){
                if(visits[newY][newX] >= leftK-1) continue;
                if(leftK>0){ // 벽 부수기
                    routes[(depth+1)%2].push_back({newY, newX, leftK-1});
                    visits[newY][newX] = leftK-1;
                }
            }
            else{
                if(visits[newY][newX] >= leftK) continue;
                routes[(depth+1)%2].push_back({newY, newX, leftK});
                visits[newY][newX] = leftK;
            }
        }
        if(routes[depth%2].empty()){
            ++depth;
        }
    }
    cout << result << endl;
    return 0;
}