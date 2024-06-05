/**
 * 2023.10.2 14:44
 * 
 * 0,0부터 오른쪽으로 탐색해서 0인 칸에 대하여
 *  availables = 1, 2, 3, 4, 5, 6, 7, 8, 9
 *  해당 행에 있는 숫자를 제거,
 *  해당 열에 있는 숫자를 제거,
 *  해당 (3x3) 칸에 있는 숫자를 제거,
 *  남은 수들 중 하나씩 오름차순으로 해당 칸에 넣고,
 *  다음 빈칸을 탐색 (같은 방향으로)
 * 완성할 수 없다면 (false를 리턴 받는다면),
 * 다음 숫자를 넣고 다시 탐색. (백트래킹)
*/
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

vector<vector<int>> board (9, vector<int> (9));
int maxDepth = 0;

vector<int> getAvailables(int y, int x){
    // get available numbers to put at y, x
    vector<int> availables = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    int i, j;

    // check ROW
    for(i=0; i<9; ++i){
        if(board[y][i] != 0){
            auto iter = find(availables.begin(), availables.end(), board[y][i]);
            if(iter != availables.end())
                availables.erase(iter);
        }
    }

    // check COL
    for(i=0; i<9; ++i){
        if(board[i][x] != 0){
            auto iter = find(availables.begin(), availables.end(), board[i][x]);
            if(iter != availables.end())
                availables.erase(iter);
        }
    }

    // check 3x3
    int bigY = y/3, bigX = x/3;
    for(i = bigY*3; i < bigY*3+3; ++i){
        for(j = bigX*3; j < bigX*3+3; ++j){
            if(board[i][j] != 0){
                auto iter = find(availables.begin(), availables.end(), board[i][j]);
                if(iter != availables.end())
                    availables.erase(iter);
            }
        }
    }

    return availables;
}

bool DFS(int y, int x, int depth){
    vector<int> availables = getAvailables(y, x);
    if(availables.empty()) return false;
    if(depth == maxDepth-1){
        board[y][x] = availables[0];
        return true;
    }

    for(int av: availables){
        // put number in y, x
        board[y][x] = av;
        
        // search next hole
        int newY = y, newX = x;
        while(board[newY][newX] > 0){
            // move right
            if(newX==8) {
                // if(newY==8) return false; // 끝까지 왔음. 이럴 경우는 없을듯
                ++newY;
                newX=0;
            }
            else ++newX;
        }

        if(DFS(newY, newX, depth+1)) return true;
    }
    board[y][x] = 0;
    return false;
}

int main(){
    int i, j;
    for(i=0; i<9; ++i)
        for(j=0; j<9; ++j){
        	char ch = cin.get();
            while( ch == '\n' ){
            	ch = cin.get();
            }
        	board[i][j] = ch-'0';
            if(board[i][j]==0) ++maxDepth;
        }
    
    // 0인 칸에서 DFS 시작
    for(i=0; i<81; ++i)
        if(board[i/9][i%9]==0){
            DFS(i/9, i%9, 0);
            break;
        }
    
    // 보드 출력
    for(i=0; i<9; ++i){
        for(j=0; j<9; ++j){
            cout << board[i][j];
        }
        cout << endl;
    }
    return 0;
}