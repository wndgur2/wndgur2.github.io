/*
    최대 5회 이동. >> 5회 미만이어도 됨.

    사방을 다 하드코딩?

    한 방향으로 회전 후 밀어넣고 원래 방향으로 회전
    >> 20x20x4 = 1600. 1600 x 1024 = 160만. x 400 = XXX

    >> 사방 해야함
*/

#include<iostream>
#include<vector>

using namespace std;

vector<vector<int>> board;
int score = 0;
int N, row, col;

void up(){
    int newRow, tmp;
    // 미는것과 합치는걸 따로하면 한 번에 한 번만 합치게 할 수 있다.
    // 위로 밀기
    for(col=0; col<N; ++col){
        for(row=1; row<N; ++row){
            if(board[row][col] == 0) continue;
            newRow = row-1;
            while(newRow>=0 && board[newRow][col]==0){
                board[newRow][col] = board[newRow+1][col];
                board[newRow+1][col] = 0;
                --newRow;
            }
        }
    }
    // 합치기
    for(col=0; col<N; ++col){
        for(row=1; row<N; ++row){
            if(board[row][col] == 0) break;
            if(board[row-1][col]==board[row][col]){
                // 합치고 다 당기기
                board[row-1][col] *= 2;
                for(tmp = row; tmp<N-1; ++tmp){
                    board[tmp][col] = board[tmp+1][col];
                }
                board[N-1][col] = 0;
            }
        }
    }
}

void down(){
    int newRow, tmp;
    // 아래로 밀기
    for(col=0; col<N; ++col){
        for(row=N-2; row>=0; --row){
            if(board[row][col] == 0) continue;
            newRow = row+1;
            while(newRow<N && board[newRow][col]==0){
                board[newRow][col] = board[newRow-1][col];
                board[newRow-1][col] = 0;
                ++newRow;
            }
        }
    }
    // 아래로 합치기
    for(col=0; col<N; ++col){
        for(row=N-2; row>=0; --row){
            if(board[row][col] == 0) break;
            if(board[row+1][col]==board[row][col]){
                // 합치고 다 당기기
                board[row+1][col] *= 2;
                for(tmp = row; tmp>0; --tmp){
                    board[tmp][col] = board[tmp-1][col];
                }
                board[0][col] = 0;
            }
        }
    }
}

void left(){
    int newCol, tmp;
    // 왼쪽으로 밀기
    for(row=0; row<N; ++row){
        for(col=1; col<N; ++col){
            if(board[row][col] == 0) continue;
            newCol = col-1;
            while(newCol>=0 && board[row][newCol]==0){
                board[row][newCol] = board[row][newCol+1];
                board[row][newCol+1] = 0;
                --newCol;
            }
        }
    }
    // 왼쪽으로 합치기
    for(row=0; row<N; ++row){
        for(col=1; col<N; ++col){
            if(board[row][col] == 0) break;
            if(board[row][col-1]==board[row][col]){
                // 합치고 다 당기기
                board[row][col-1] *= 2;
                for(tmp = col; tmp<N-1; ++tmp){
                    board[row][tmp] = board[row][tmp+1];
                }
                board[row][N-1] = 0;
            }
        }
    }
}

void right(){
    int newCol, tmp;
    // 오른쪽으로 밀기
    for(row=0; row<N; ++row){
        for(col=N-2; col>=0; --col){
            if(board[row][col] == 0) continue;
            newCol = col+1;
            while(newCol<N && board[row][newCol]==0){
                board[row][newCol] = board[row][newCol-1];
                board[row][newCol-1] = 0;
                ++newCol;
            }
        }
    }
    // 오른쪽으로 합치기
    for(row=0; row<N; ++row){
        for(col=N-2; col>=0; --col){
            if(board[row][col] == 0) break;
            if(board[row][col+1]==board[row][col]){
                // 합치고 다 당기기
                board[row][col+1] *= 2;
                for(tmp = col; tmp>0; --tmp){
                    board[row][tmp] = board[row][tmp-1];
                }
                board[row][0] = 0;
            }
        }
    }
}

void setScore(){
    for(row=0; row<N; ++row){
        for(col=0; col<N; ++col){
            score = board[row][col] > score? board[row][col]: score;
        }
    }
}

void DFS(int depth){
    // for(row=0; row<N; ++row){
    //     for(col=0; col<N; ++col){
    //         cout << board[row][col];
    //     }
    //     cout << endl;
    // }

    if(depth == 5){
        setScore();
        return;
    }
    vector<vector<int>> oldBoard = board;
    up();
    DFS(depth+1);
    board = oldBoard;
    down();
    DFS(depth+1);
    board = oldBoard;
    left();
    DFS(depth+1);
    board = oldBoard;
    right();
    DFS(depth+1);
    board = oldBoard;
}

int main(){
    cin >> N;

    board = vector<vector<int>> (N, vector<int> (N));

    for(row=0; row<N; ++row){
        for(col=0; col<N; ++col){
            cin >> board[row][col];
        }
    }

    DFS(0);

    cout << score << endl;

    return 0;
}