/**
 * 2023.09.30, 21:39
*/

#include<iostream>
#include<vector>
using namespace std;

#define SIZE 19

vector<pair<int, int>> ds = {{1, -1}, {1, 0}, {1, 1}, {0, 1}};
// vector<pair<int, int>> ds = {{-1, -1}, {0, -1}, {1, -1}, {1, 0}, {1, 1}, {0, 1}, {-1, 1}, {-1, 0}};

int main(){
    int i, j;
    vector<vector<int>> board (SIZE, vector<int> (SIZE));
    // vector<vector<int>> visit (SIZE, vector<int> (SIZE, false));

    for(i=0; i<SIZE; ++i){
        for(j=0; j<SIZE; ++j){
            cin >> board[i][j];
        }
    }
    int cur_team, cur_length, newY, newX;
    for(i=0; i<SIZE; ++i){
        for(j=0; j<SIZE; ++j){
            if(board[i][j]==0) continue;
            // if(visit[i][j]) continue;
            cur_team = board[i][j];
            
            for(pair<int, int> d: ds){
                newY = i;
                newX = j;
                cur_length = 0;
                while(board[newY][newX] == cur_team){
                    ++cur_length;
                    newY += d.first;
                    newX += d.second;
                    if(newY<0 || newY>=SIZE || newX<0 || newX>=SIZE) break;
                }
                if(cur_length==5){
                    cout << cur_team << endl;
                    if(d.second == -1) cout << newY+1 << ' ' << newX+1 << endl;
                    else cout << i+1 << ' ' << j+1 << endl;
                    return 0;
                }
            }
        }
    }
    cout << 0 << endl;
    return 0;
}