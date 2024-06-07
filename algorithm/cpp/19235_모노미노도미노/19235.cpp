/*
    2023. 09. 05

    가로세로 테트리스
    얻은 점수와 남은 블록 수 세기

    근데 입력 x, y가 상식과 반대라 헷갈린다.
    반대로 바꿔서 받기로 함.

    !! pop된 행 밑에 빈 공간이 있다면 거기로도 fall해야함.

    !! 연결되었는지를 저장해야함.
    연결이안되었다면 끊고 밑으로 떨어질 수 있게.

    OVERflow는 그냥 다 내리면 된다?
*/

#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> blueBoard (6, vector<int> (4, 0)); // bools to integer
vector<vector<int>> greenBoard (6, vector<int> (4, 0));// 0 for none, 1 for dot, 2~5 for directions
// 상하좌우 2 3 4 5

void putBlock(int type, int y, int x){
    int height=1, width=1;
    if(type == 2) ++width;
    else if(type == 3) ++height;

    // green에 배치하기: y는 볼 필요가 없다.
    int curY = 2; // 0과 1에는 블럭이 있을 수가 없음.
    while(curY < 6){
        if(greenBoard[curY][x] || (width>1 && greenBoard[curY][x+1])){
            break;
        }
        ++curY;
    }
    --curY;
    
    // 배치하기
    if(width > 1){
        greenBoard[curY][x] = 5;
        greenBoard[curY][x+1] = 4;
    } else if(height > 1){
        greenBoard[curY][x] = 2;
        greenBoard[curY-1][x] = 3;
    } else{
        greenBoard[curY][x] = 1;
    }


    // blue에 배치하기: 판을 90도 돌린다.
    int tmp;
    tmp = width; width = height; height = tmp;
    tmp = x; x = 3 - y; y = tmp;

    curY = 2;
    while(curY < 6){
        if(blueBoard[curY][x] || (width>1 && blueBoard[curY][x-1])){
            break;
        }
        ++curY;
    }
    --curY;
    
    // 배치하기
    if(width > 1){
        blueBoard[curY][x] = 4;
        blueBoard[curY][x-1] = 5;
    } else if(height > 1){
        blueBoard[curY][x] = 2;
        blueBoard[curY-1][x] = 3;
    } else{
        blueBoard[curY][x] = 1;
    }
}

void fallBlocks(vector<vector<int>> &board){
    bool falled = false;
    // cout << "FALLBLOKCS" << isGreen <<endl;
    // 빈 자리 채우기
    for(int j=5; j>0; --j){
        for(int k=0; k<4; ++k){
            if(!board[j][k]){
                if(board[j-1][k] == 1){
                    board[j][k] = 1;
                    board[j-1][k] = 0;
                    falled = true;
                } else if(board[j-1][k] == 2){
                    board[j][k] = 2;
                    board[j-1][k] = 0;
                    falled = true;
                } else if(board[j-1][k] == 5){
                    if(!board[j][k+1]){
                        board[j][k] = 5;
                        board[j][k+1] = 4;
                        board[j-1][k] = 0;
                        board[j-1][k+1] = 0;
                        falled = true;
                    }
                } else if(board[j-1][k] == 3){
                    board[j][k] = 1;
                    board[j-1][k] = 0;
                    falled = true;
                }
            }
        }
    }
    if(falled)
        fallBlocks(board);
}

int popBlocks(){
    int point = 0;
    bool pop;
    for(int i=2; i<6; ++i){

        pop = true;
        for(int isBlock: greenBoard[i]){
            if(!isBlock){
                pop=false;
                break;
            }
        }
        if(pop){
            //erase a row
            for(int j=0; j<4; ++j)
                greenBoard[i][j] = 0;
            ++point;
            fallBlocks(greenBoard);
        }

        pop = true;
        for(int isBlock: blueBoard[i]){
            if(!isBlock){
                pop=false;
                break;
            }
        }
        if(pop){
            //erase a row
            for(int j=0; j<4; ++j)
                blueBoard[i][j] = 0;
            ++point;
            fallBlocks(blueBoard);
        }
    }

    return point;
}

void popIfOverflow(){
    int greenToRemove = 0;
    int blueToRemove = 0;
    for(int i=0; i<2; ++i){
        for(int j=0; j<4; ++j){
            if(greenBoard[i][j]){
                ++greenToRemove;
                break;
            }
        }
        for(int j=0; j<4; ++j){
            if(blueBoard[i][j]){
                ++blueToRemove;
                break;
            }
        }
    }
    if(greenToRemove)
        for(int i=5-greenToRemove; i>=0; --i){
            // copy row i to i + greenToRemove
            for(int j=0; j<4; ++j){
                greenBoard[i+greenToRemove][j] = greenBoard[i][j];
            }
        }
    
    if(blueToRemove)
        for(int i=5-blueToRemove; i>=0; --i){
            // copy row i to i + blueToRemove
            for(int j=0; j<4; ++j){
                blueBoard[i+blueToRemove][j] = blueBoard[i][j];
            }
        }

    for(int i=0; i<2; ++i){
        for(int j=0; j<4; ++j){
            greenBoard[i][j] = 0;
            blueBoard[i][j] = 0;
        }
    }
}

int countBlocks(){
    int n=0;
    for(int i=0; i<6; ++i){
        for(int j=0; j<4; ++j){
            if(greenBoard[i][j]) ++n;
            if(blueBoard[i][j]) ++n;
        }
    }
    return n;
}

int main(){
    int nBlocks, type, x, y, point=0, p;
    cin >> nBlocks;
    while(nBlocks--){
        cin >> type >> y >> x;
        // type=1 : 1x1
        // type=2 : 1x2 (가로)
        // type=3 : 2x1 (세로)

        // 블럭을 초록, 파랑 진영에 배치
        putBlock(type, y, x);

        // 블럭이 터지지 않을 때까지 블럭을 터트림
        while((p = popBlocks())) point += p;

        // 연한 진영에 블럭이 있을 경우 첫 줄을 없애고 당김 x2
        popIfOverflow();

        // cout << "GREEN" << endl;
        // for(vector<int> row: greenBoard){
        //     for(int isBlock: row){
        //         cout << isBlock << " ";
        //     }
        //     cout << endl;
        // }

        // cout << "BLUE" << endl;
        // for(vector<int> row: blueBoard){
        //     for(int isBlock: row){
        //         cout << isBlock << " ";
        //     }
        //     cout << endl;
        // }
    }

    // 각 진영에 남은 블럭을 셈
    int leftBlocks = countBlocks();

    // 답
    cout << point << endl << leftBlocks << endl;

    return 0;
}