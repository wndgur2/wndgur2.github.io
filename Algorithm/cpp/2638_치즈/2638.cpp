#include <iostream>
#include <vector>

using namespace std;

/*
    크기 최대 100*100

    사라지는 시간, 그 직전에 남은 치즈
*/

int H, W, i, j, t;
vector<vector<int>> ds = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
vector<vector<bool>> cheese;
vector<vector<bool>> visits;


bool cheeseExist(){
    for(auto row : cheese)
        for(auto cell : row)
            if(cell)
                return true;

    return false;
}

bool isOut(int y, int x){
    int newY, newX;
    bool result = false;
    visits[y][x] = true;

    for(auto d : ds){
        newY = y + d[0];
        newX = x + d[1];
        if(newY<0 || newY>H-1) return true;
        if(newX<0 || newX>W-1) return true;
        if(cheese[newY][newX]) continue;
        if(visits[newY][newX]) continue;
        result = result || isOut(newY, newX);
    }
    return result;
}

void melt(){
    int newY, newX;
    vector<vector<bool>> newCheese (H, vector<bool> (W));

    // copy cheese
    for(i=0; i<H; ++i)
        for(j=0; j<W; ++j)
            newCheese[i][j] = cheese[i][j];

    for(i=0; i<H; ++i)
    for(j=0; j<W; ++j)
        // 치즈면, 4방에 공기가 있는지 확인.
        // 해당 공기가 겉 공기이면 녹임.
        // dfs 필요없을듯??
        if(cheese[i][j]){
            for(auto d: ds){
                newY = i + d[0];
                newX = j + d[1];

                if(cheese[newY][newX]==false){
                    // visits 초기화
                    visits = vector<vector<bool>> (H, vector<bool> (W, false));
                    if(isOut(newY, newX)){
                        // cout << "MELT: "<<i<<", "<<j<<endl;
                        newCheese[i][j] = false;
                        break;
                    }
                }
            }
        }
    cheese = newCheese;
    return;
}

int countCheese(){
    int n=0;

    for(auto row : cheese)
        for(auto cell : row)
            if(cell)
                ++n;

    return n;
}

int main(){
    cin >> H >> W;
    cheese = vector<vector<bool>> (H, vector<bool> (W));
    for(i=0; i<H; ++i){
        for(j=0; j<W; ++j){
            cin >> t;
            cheese[i][j] = t==1? true:false;
        }
    }

    // cout << endl;
    // for(auto row : cheese){
    //     for(auto cell : row){
    //         if(cell)
    //             cout << "1 ";
    //         else
    //             cout << "0 ";
    //     }
    //     cout << endl;
    // }

    int leftCheese, duration = 0;
    while(cheeseExist()){
        // cout << duration << endl;
        ++duration;
        leftCheese = countCheese();
        melt();
        // cout << leftCheese << endl;
    }

    cout << duration << endl << leftCheese << endl;
    return 0;
}