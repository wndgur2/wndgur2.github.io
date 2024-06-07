/**
 * 블럭 그룹 찾기 > i번 블록에 대해 dfs. visit 필수 // 없으면 끝
 * 블럭 터트리기 > 가장 큰 블럭 그룹을 터트리고 점수 리턴
 * 중력 작용하기
 * 반시계 90도 회전하기
*/

#include <iostream>
#include <vector>
using namespace std;

int N, M;
vector<vector<int>> blocks;
vector<vector<bool>> visits;
vector<pair<int, int>> ds = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

struct blockGroup{
    int size;
    int rainbows;
    int y;
    int x;
};

void initVisits(){
    visits = vector<vector<bool>> (N, vector<bool> (N, false));
}

pair<int, int> DFS(int num, int size, int rainbow, y, x){
    int newY, newX;

    if((num != blocks[y][x]) && (blocks[y][x] != 0)) return make_pair(size, rainbow);
    ++size;
    if(blocks[y][x] == 0) ++rainbow;
    for(pair<int, int> d: ds){
        newY = y+d.first;
        newX = x+d.second;
        //
        if(newY < 0 || newX < 0) continue;
        if(newY >= N || newX >= N) continue;
    }
}

pair<int, int> getGroupSize(int y, int x){
    pair<int, int> sizes = DFS(blocks[y][x], 0, 0, y, x);
    return sizes;
}

blockGroup getBiggestGroup(){
    int i, j, size=0, rainbow=0, y=0, x=0;
    pair<int, int> groupSize;
    initVisits();

    for(i=0; i<N; ++i){
        for(j=0; j<N; ++j){
            if(blocks[i][j]>0 && !visits[i][j]){
                groupSize = getGroupSize(i, j);
                if((groupSize.first>size) || (groupSize.first==size && groupSize.second>=rainbow)){
                    size = groupSize.first;
                    rainbow = groupSize.second;
                    y = i;
                    x = j;
                }
            }
        }
    }
    return {size, rainbows, y, x};
}

int main(){
    cin >> N >> M;

    blocks = vector<vector<int>> (N, vector<int> (N));
    initVisits();

    int point =0;
    int i, j;

    for(i=0; i<N; ++i){
        for(j=0; j<N; ++j){
            cin >> blocks[i][j];
        }
    }
    blockGroup blockGroup;
    while((blockGroup = getBiggestGroup()).size != 0){

    }
    cout << 0 << endl;
    return 0;
}