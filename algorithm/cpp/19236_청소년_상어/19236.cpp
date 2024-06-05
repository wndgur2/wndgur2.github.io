/*
    4x4. 물고기 번호와 방향
    막혔거나 상어면 반시계 45도 회전
    물고기가 있으면 자리 교환

    상어는 0, 0 먹고시작
    방향에 있는 물고기를 골라 먹을 수 있음. 단, 빈칸은 못건너감
    갈 수 있는 곳이 없을 때 끝
    상어는 회전을 하지 않는다

    먹을 수 있는 물고기의 번호 합의 최댓값?

    상어가 고를 수 있는건 어떤 물고기를 먹을 것이냐이다
    완전탐색으로
*/

#include<iostream>
#include<vector>

using namespace std;

vector<pair<int, int>> ds = {{-1, 0}, {-1, -1}, {0, -1}, {1, -1}, {1, 0}, {1, 1}, {0, 1}, {-1, 1}};
vector<pair<int, int>> fishes (16);
vector<vector<int>> numbers (4, vector<int> (4)); // 빈칸은 0, 상어는 -1로
vector<vector<int>> directions (4, vector<int> (4));
int score = 0;


void printNumbers(){
    for(vector<int> ns: numbers){
        for(int n: ns){
            cout << n << ' ';
        }
        cout << endl;
    }
    cout << endl;
}

void moveFish(int y, int x){
    int newY, newX;
    newY = y + ds[directions[y][x]].first;
    newX = x + ds[directions[y][x]].second;

    if((newY<0) || (newY>3) || (newX<0) || (newX>3) || (numbers[newY][newX]==-1)){
        directions[y][x] = (directions[y][x]+1) % 8;
        moveFish(y, x);
        return;
    }

    if(numbers[newY][newX] != 0){
        int tmpNum = numbers[newY][newX];
        int tmpDir = directions[newY][newX];
        numbers[newY][newX] = numbers[y][x];
        directions[newY][newX] = directions[y][x];
        numbers[y][x] = tmpNum;
        directions[y][x] = tmpDir;
        fishes[numbers[y][x]-1] = make_pair(y, x);
    } else{
        numbers[newY][newX] = numbers[y][x];
        directions[newY][newX] = directions[y][x];
        numbers[y][x] = 0;
    }
    fishes[numbers[newY][newX]-1] = make_pair(newY, newX);
}

void moveFishes(){
    int newY, newX;
    for(pair<int, int> fish: fishes){
        if(fish.first != -1){
            moveFish(fish.first, fish.second);
            // printNumbers();    
        }
    }
}

vector<int> getEdibles(int y, int x){
    int newY = y + ds[directions[y][x]].first, newX = x + ds[directions[y][x]].second;

    vector<int> edibles;

    while(newY>=0 && newY<4 && newX>=0 && newX<4){
        if(numbers[newY][newX] > 0)
            edibles.push_back(numbers[newY][newX]-1);
        newY += ds[directions[y][x]].first;
        newX += ds[directions[y][x]].second;
    }
    return edibles;
}

// 먹기
void DFS(int y, int x, int curScore){
    moveFishes();

    // 먹을 수 있는 물고기 리스트 가져오기
    vector<int> edibles = getEdibles(y, x);

    // printNumbers();

    if(edibles.size() < 1) {
        score = curScore> score? curScore: score;
        return;
    }

    // 현재 fishes, numbers, directions 복사해서 보유하기
    vector<pair<int, int>> oldFishes = fishes;
    vector<vector<int>> oldNumbers = numbers;
    vector<vector<int>> oldDirections = directions;


    int fishNum, newY, newX;
    for(int fish: edibles){
        // 물고기를 먹고 물고기 움직이고 DFS
        fishNum = fish;
        newY = fishes[fishNum].first;
        newX = fishes[fishNum].second;

        // 먹기
        curScore += fishNum+1;
        numbers[newY][newX] = -1;
        numbers[y][x] = 0;
        fishes[fishNum].first = -1;

        // DFS
        DFS(newY, newX, curScore);

        // 복구.
        curScore -= fishNum+1;
        fishes = oldFishes;
        numbers = oldNumbers;
        directions = oldDirections;
    }
}

int main(){
    int i, j, tmp;
    for(i=0; i<4; ++i){
        for(j=0; j<4; ++j){
            cin >> numbers[i][j] >> tmp;
            directions[i][j] = tmp-1;
            fishes[numbers[i][j]-1] = make_pair(i, j);
        }
    }
    score += numbers[0][0];
    fishes[numbers[0][0]-1].first = -1; 
    numbers[0][0] = -1;

    DFS(0, 0, score);

    cout << score << endl;
    return 0;
}