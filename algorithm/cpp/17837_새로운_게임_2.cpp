#include <iostream>
#include <vector>

using namespace std;

struct Piece{
    int number_;
    int row;
    int col;
    int dir;
};

int N, K;
bool isOver = false;
vector<Piece *> pieces;
vector<vector<int>> boardColor;
vector<vector<vector<Piece *>>> boardStack;
vector<pair<int, int>> ds = {{0, 1}, {0, -1}, {-1, 0}, {1, 0}};

void changeDir(Piece *curPiece);
void movePiece(Piece *curPiece);
void printBoard();

int main(){    
    cin >> N >> K;

    boardColor = vector<vector<int>> (N, vector<int> (N));
    boardStack = vector<vector<vector<Piece *>>> (N, vector<vector<Piece *>> (N));

    // 입력
    for(int i=0; i<N; ++i)
        for(int j=0; j<N; ++j)
            cin >> boardColor[i][j];

    int row, col, dir;
    for(int i=0; i<K; ++i){
        cin >> row >> col >> dir;
        Piece *newPiece = new Piece;
        newPiece->number_ = i;
        newPiece->row = row-1;
        newPiece->col = col-1;
        newPiece->dir = dir-1;

        pieces.push_back(newPiece);
        boardStack[row-1][col-1].push_back(newPiece);
    }

    // 실행
    int turn = 0;
    while(!isOver && turn <= 1000){
        for(int i=0; i<K; ++i) movePiece(pieces[i]);
        ++turn;
    }

    if(turn > 1000) cout << -1 << endl;
    else cout << turn << endl;

    return 0;
}

void printBoard(){
    for(int l=0; l<N; ++l){
        for(int j=0; j<N; ++j){
            for(int k=0; k<boardStack[l][j].size(); ++k)
                cout << boardStack[l][j][k]->number_;
            cout << " | ";
        }
        cout << "\n";
    }
}

void changeDir(Piece *curPiece){
    if(curPiece->dir%2==0) ++curPiece->dir;
    else --curPiece->dir;
    pair<int, int> nextPos = {curPiece->row+ds[curPiece->dir].first, curPiece->col+ds[curPiece->dir].second};
    if(nextPos.first<0 || nextPos.first>=N) return;
    if(nextPos.second<0 || nextPos.second>=N) return;
    if(boardColor[nextPos.first][nextPos.second] != 2) movePiece(curPiece);
    return;
};

void movePiece(Piece *curPiece){
    // printBoard();
    pair<int, int> nextPos = {curPiece->row+ds[curPiece->dir].first, curPiece->col+ds[curPiece->dir].second};

    if((nextPos.first<0) || (nextPos.first>=N) || (nextPos.second<0) || (nextPos.second>=N)){ // 벽
        changeDir(curPiece);
        return;
    }

    switch(boardColor[nextPos.first][nextPos.second]){
        case 0:{ // 흰색: 나부터 위로 쌓인 말들을 그대로 옮김. => 스택을 다 pop하고 push한(뒤집은) temp stack을 다시 목표 스택에 pop하고 push
            vector<Piece *> tempStack;
            while(boardStack[curPiece->row][curPiece->col].size()>0){
                Piece *movingPiece = boardStack[curPiece->row][curPiece->col].back();
                tempStack.push_back(movingPiece);
                boardStack[curPiece->row][curPiece->col].pop_back();

                // 좌표 업데이트
                movingPiece->row = nextPos.first;
                movingPiece->col = nextPos.second;
                if(movingPiece == curPiece) break;
            }
            while(tempStack.size()>0){
                boardStack[nextPos.first][nextPos.second].push_back(tempStack.back());
                tempStack.pop_back();
            }
            if(boardStack[nextPos.first][nextPos.second].size()>=4) isOver = true;
            break;
        }
        case 1:{ // 빨간색: 나부터 위로 쌓인 말들을 반대 순서로 옮김. => 스택을 목표 스택에 pop해서 push 반복
            while(boardStack[curPiece->row][curPiece->col].size()>0){
                Piece *movingPiece = boardStack[curPiece->row][curPiece->col].back();
                boardStack[nextPos.first][nextPos.second].push_back(movingPiece);
                boardStack[curPiece->row][curPiece->col].pop_back();

                //좌표 업데이트
                movingPiece->row = nextPos.first;
                movingPiece->col = nextPos.second;
                if(boardStack[nextPos.first][nextPos.second].size()>=4) isOver = true;
                if(movingPiece == curPiece) break;
            }
            break;
        }
        case 2:{ // 파란색: 방향을 반대로 바꿈. 반대가 파란색이나 맵 끝이 아닐 경우 이동
            changeDir(curPiece);
            break;
        }
    }
}