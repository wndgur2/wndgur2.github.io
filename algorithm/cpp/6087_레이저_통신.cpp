#include<iostream>
#include<vector>

using namespace std;

vector<vector<int> > d_loc {{-1, 0}, {0, 1}, {1, 0}, {0, -1}}; // dy, dx
vector< vector<char> > map_; // 각 칸의 character
vector<vector<int> > map_mirror; // 각 칸까지 가기 위한 최소 거울 수

int w, h, i, j;

vector<int> move(int direction, vector<int> loc){
    // loc을 direction으로 1칸 이동한 좌표 리턴

    vector<int> new_loc = loc;

    new_loc[0] += d_loc[direction][0];
    new_loc[1] += d_loc[direction][1];

    return new_loc;
}

bool check_no_wall(vector<int> loc){
    // loc에 갈 수 있는지 리턴

    if((loc[0] < 0) || (loc[1] < 0)) return false; // 음수
    if((loc[0] >= h) || (loc[1] >= w)) return false; // 크기 초과
    if(map_[loc[0]][loc[1]] == '*') return false; // 벽

    return true;
}

void dfs(int direction, vector<int> loc){
    // DFS 과정 출력하기
    // for(j=0; j<h; j++){
    //     for(int k=0; k<w; k++){
    //         if(j==loc[0] && k == loc[1])
    //             cout << '@';
    //         else cout << map_mirror[j][k];
    //     }
    //     cout << endl;
    // }
    // cout << endl;
    // for(j=0; j<10000000; j+=2){
    //     j --;
    // }

    vector<int> new_loc;
    int new_direction, is_turned;
    
    for(int d=0; d<4; d++){
        new_direction = (direction+d) % 4; // 4 방향
        new_loc = move(new_direction, loc);

        // 거울이 추가되었는가?
        if(d==0) is_turned = 0;
        else is_turned = 1;

        if(check_no_wall(new_loc)){
            if(map_mirror[loc[0]][loc[1]] < map_mirror[new_loc[0]][new_loc[1]]){ // 내 앞 칸의 최소 거울 수가 현재 거울 개수보다 크면,
                map_mirror[new_loc[0]][new_loc[1]] = map_mirror[loc[0]][loc[1]] + is_turned; // 앞 칸 거울 수를 바꾸고
                dfs(new_direction, new_loc); // 앞 칸으로 이동
            }
        }
    }
}

int main(){
    // map_ 틀 만들기 (2d vector)
    cin >> w >> h;

    for(i=0; i<h; i++){
        vector<char> tmp;
        vector<int> tmp_;
        map_.push_back(tmp);
        map_mirror.push_back(tmp_);
        for(j=0; j<w; j++){
            map_[i].push_back(' ');
            map_mirror[i].push_back(h*w);
        }
    }

    // map_ input 받고, 시작점과 끝점 설정
    int start_x, start_y, end_x, end_y;
    bool found_C = false;

    for(i=0; i<h; i++){
        for(j=0; j<w; j++){
            cin >> map_[i][j];

            if(map_[i][j] == 'C'){ // 처음 등장하는 C가 출발점이 됨
                if(found_C){
                    end_y = i;
                    end_x = j;
                } else{
                    start_y = i;
                    start_x = j;
                    found_C = true;
                }
            }
        }
    }
    
    map_[start_y][start_x] = '.'; // 출발점 C 제거
    map_mirror[start_y][start_x] = 0;

    // depth first search
    for(i=0; i<4; i++) // 4방향
        dfs(i, {start_y, start_x});

    cout << map_mirror[end_y][end_x] << endl;

    return 0;
}