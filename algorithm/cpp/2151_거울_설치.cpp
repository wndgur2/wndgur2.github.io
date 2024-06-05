#include<iostream>
#include<vector>
using namespace std;

/**
 * 2023.11.04 18:30
 * 1. 방향은 양옆으로만 꺾을 수 있다. 뒤로 갈 수 없다.
 * 2. 거울은 무제한. 놓을 수 없는 곳이 있음(방향을 전환할 수 없는 곳)
 * 
 * 꺾횟 제한하기
*/
int n;
vector<vector<char>> room;
pair<int, int> exitDoor;
vector<pair<int, int>> ds = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

bool dfs(int befY, int befX, int y, int x, int n_mirror){
    if(y < 0 || y >= n) return false;
    if(x < 0 || x >= n) return false;
    if(room[y][x] == '*') return false;
    if(room[y][x] == '#') return true;

    bool result = false;
    int newY, newX, dy = y-befY, dx = x-befX;
    if(n_mirror>0 && room[y][x]=='!'){
        for(pair<int, int> d: ds){
            newY = y+d.first;
            newX = x+d.second;
            if(dy == -d.first && dx == -d.second) continue; // 뒤로 반사
            if(dy == d.first && dx == d.second)
                result = result || dfs(y, x, newY, newX, n_mirror);
            else
                result = result || dfs(y, x, newY, newX, n_mirror-1);
        }
        return result;
    }
    else{
        newY = y + dy;
        newX = x + dx;
        return dfs(y, x, newY, newX, n_mirror);
    }
}

int main(){
    cin >> n;
    room = vector<vector<char>> (n, vector<char> (n));
    pair<int, int> entrance = {-1, -1};

    for(int i=0; i<n; ++i){
        for(int j=0; j<n; ++j){
        	char ch = cin.get();
            if(ch == '\n') ch = cin.get();
        	room[i][j] = ch;

            if(ch != '#') continue;
            if(entrance.first==-1){
                entrance = make_pair(i, j);
                room[i][j] = '.';
            }
            else exitDoor = make_pair(i, j);
        }
    }

    bool result;
    for(int i=0; i<n*n-1; ++i){
        result = false;
        for(pair<int, int> dir: ds){
            result = result ||
                dfs(
                    entrance.first,
                    entrance.second,
                    entrance.first+dir.first,
                    entrance.second+dir.second,
                    i
                );
        }
        if(result){
            cout << i << endl;
            break;
        }
    }


    return 0;
}