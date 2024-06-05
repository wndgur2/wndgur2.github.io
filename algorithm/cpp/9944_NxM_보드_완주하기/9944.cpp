// 구현과 완전탐색?

// 장애물이 아닌 위치에 공을 놓는다.
// 각 위치에 대해서
    // 더이상 이동할 수 없을 때까지 4방향 완전탐색을 한다. (DFS) 최소이동횟수를 넘는 경로 다이
    // 모든 곳을 탐색했다면 최소이동횟수를 저장한다.

// visit 배열

// 최소 이동횟수를 출력한다.

#include<iostream>
#include<vector>
using namespace std;

vector<vector<int>> ds = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
vector<vector<char>> board(30, vector<char> (30));
int min_move = 1000001;
int holes;
int n, m;

void DFS(int y, int x, int move, int cnt){
    int newY, newX, curY = y, curX = x;
    if(move >= min_move) return;
    // cout << curY << curX << endl;
    vector<vector<int>> visit = {};
    bool isStuck = true;
    for(vector<int> d : ds){
        newY = y+d[0];
        newX = x+d[1];
        if(
            newY < 0 || newX < 0 ||
            newY >= n ||
            newX >= m ||
            board[newY][newX] == '*'
        )
            continue;
        
        isStuck = false;
        if(move >= min_move-1) return;
        int newCnt = cnt;

        // d방향으로 이동
        while(
            !(newY < 0 || newX < 0 ||
            newY >= n || 
            newX >= m ||
            board[newY][newX] == '*')
        ){
            ++newCnt;

            curY = newY;
            curX = newX;
            visit.push_back({newY, newX});
            board[curY][curX] = '*';

            newY = curY+d[0];
            newX = curX+d[1];
        }
        DFS(curY, curX, move+1, newCnt);
        for(auto v:visit)
            board[v[0]][v[1]] = '.';
    }
    if(isStuck)
        if(cnt == holes) min_move = move < min_move? move:min_move;
        // cout << "! " << move << endl;
}

int main(){
    int i, j, t = 0;
    while(true){
        ++t;
        min_move = 1000001;

        cin >> n >> m;
        if (cin.eof())
            break;

        vector<vector<int>> dots = {};

        holes = 0;
        for(i=0; i<n; ++i) for(j=0; j<m; ++j){
            cin >> board[i][j];
            if(board[i][j] == '.') {
                ++holes;
                dots.push_back({i, j});
            }
        }

        // 장애물이 아닌 위치에 공을 놓는다.
        // 각 위치에 대해서
        for(vector<int> dot: dots){
            board[dot[0]][dot[1]] = '*';
            DFS(dot[0], dot[1], 0, 1);
            board[dot[0]][dot[1]] = '.';
        }
        
        // 최소 이동횟수를 출력한다.
        cout << "Case " << t << ": " << (min_move==1000001?-1:min_move) << endl;
    }
    
    return 0;
}