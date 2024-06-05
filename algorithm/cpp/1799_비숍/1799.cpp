/**
 * 2023.09.28 23:16
 * 
 * 최대 10x10
 * 
 * 서로 잡을 수 없도록 놓을 수 있는 비숍의 최대 개수
 * 
 * N이 작고 규칙이 안보여서 완전탐색처럼 보인다.
 * 그냥 생각하면 2^100인데 대각선 제외하면 100이 아닐것 많아야 20개정도? 2^20 x N?
 * 백트레킹 dfs? 이거라서 시간초과인지, 줄일 수 있는 방법이 있는지 보기
 * 
 * 사용 가능한 대각선인지에 대한 정보를 가지고 가는 문제였다. 그렇게 하면 중복이 생기긴 할텐데
*/
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

int N, maxN=0;
vector<vector<bool>> board;
vector<vector<bool>> board_available;
vector<pair<int, int>> ds = {{-1, -1}, {1, -1}, {1, 1}, {-1, 1}};
vector<vector<vector<bool>>> visits;

vector<pair<int, int>> getAvailables(){
    vector<vector<bool>> temp_board_available = board_available;
    vector<pair<int, int>> bishops;
    for(int i=0; i<N; ++i){
        for(int j=0; j<N; ++j){
            if(board[i][j] == true){
                bishops.push_back(make_pair(i, j));
            }
        }
    }

    // 각 비숍이 갈 수 있는 곳 제거
    int newY, newX;
    for(pair<int, int> bishop: bishops){ // N^2
        for(pair<int, int> d: ds){
            newY = bishop.first;
            newX = bishop.second;
            while(newY>=0 && newX>=0 && newY<N && newX<N){
                temp_board_available[newY][newX] = false;
                newY += d.first;
                newX += d.second;
            }
        }
    }
    vector<pair<int, int>> availables;
    for(int i=0; i<N; ++i){
        for(int j=0; j<N; ++j){
            if(temp_board_available[i][j] == true){
                availables.push_back(make_pair(i, j));
            }
        }
    }
    return availables;
}

void DFS(int amount){
    if(amount>maxN) maxN = amount;
    vector<pair<int, int>> bishops;
    vector<pair<int, int>> availables = getAvailables(); // N^2
    for(pair<int, int> av: availables){
        board[av.first][av.second] = true;
        if(find(visits.begin(), visits.end(), board) != visits.end()){ // 이미 방문함
            board[av.first][av.second] = false;
            continue;
        }
        visits.push_back(board);
        DFS(amount+1);
        board[av.first][av.second] = false;
    }
}

int main(){
    bool tmp;
    cin >> N;
    board = vector<vector<bool>> (N, vector<bool> (N, false));
    board_available = vector<vector<bool>> (N, vector<bool> (N, false));
    for(int i=0; i<N; ++i){
        for(int j=0; j<N; ++j){
            cin >> tmp;
            board_available[i][j] = tmp;
        }
    }
    DFS(0);
    cout << maxN << endl;
    return 0;
}