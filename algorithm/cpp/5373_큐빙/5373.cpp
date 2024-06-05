/*
    윗 면은 흰색, 아랫 면은 노란색, 앞 면은 빨간색, 뒷 면은 오렌지색, 왼쪽 면은 초록색, 오른쪽 면은 파란색
    U: 윗 면, D: 아랫 면, F: 앞 면, B: 뒷 면, L: 왼쪽 면, R: 오른쪽 면
    +인 경우에는 시계 방향 (그 면을 바라봤을 때가 기준), -인 경우에는 반시계 방향
*/

#include<iostream>
#include<vector>
#include<algorithm>

using namespace std;

vector<vector<vector<char>>> cube;
vector<char> colors = {'w', 'y', 'r', 'o', 'g', 'b'};
vector<char> sides = {'U', 'D', 'F', 'B', 'L', 'R'};

void reset_cube(){
    for(int i=0; i<6; ++i){
        cube[i] = vector<vector<char>> (3, vector<char> (3, colors[i]));
    }
}

void print_cube(int side=0){
    for(auto row: cube[side]){
        for(auto cell: row){
            cout << cell;
        }
        cout << endl;
    }
}

void rotate_cube(char side_char, char direction){
    int i, row, col;

    // char 면을 int 면으로
    int side = find(sides.begin(), sides.end(), side_char) - sides.begin();

    // 돌린 면을 90도 회전
    // y=x 대칭
    vector<vector<char>> new_side (3, vector<char> (3));
    for(row=0; row<3; ++row){
        for(col=0; col<3; ++col){
            new_side[2-col][2-row] = cube[side][row][col];
        }
    }

    // +면 y=0 대칭, -면 x=0 대칭
    vector<char> tmp (3);
    if(direction == '+'){
        tmp = new_side[0];
        new_side[0] = new_side[2];
        new_side[2] = tmp;
    } else{
        for(i=0; i<3; ++i) tmp[i] = new_side[i][0];
        for(i=0; i<3; ++i) new_side[i][0] = new_side[i][2];
        for(i=0; i<3; ++i) new_side[i][2] = tmp[i];
    }

    cube[side] = new_side;

    // 돌린 면의 좌, 상, 우, 하 면의 돌린 면과 닿는 열을 옆 면의 열로 변경
    switch (side){
    case 0:
        // 2r0 > 4r0 > 3r2 > 5r0
        if(direction == '+'){
            tmp = cube[5][0];
            for(i=0; i<3; ++i) cube[5][0][i] = cube[3][2][2-i];
            for(i=0; i<3; ++i) cube[3][2][i] = cube[4][0][2-i];
            cube[4][0] = cube[2][0];
            cube[2][0] = tmp;
        } else{
            tmp = cube[2][0];
            cube[2][0] = cube[4][0];
            for(i=0; i<3; ++i) cube[4][0][i] = cube[3][2][2-i];
            for(i=0; i<3; ++i) cube[3][2][i] = cube[5][0][2-i];
            cube[5][0] = tmp;
        }
        break;
    case 1:
        // 2r2 > 5r2 > 3r0 > 4r2
        if(direction == '+'){
            tmp = cube[4][2];
            for(i=0; i<3; ++i) cube[4][2][i] = cube[3][0][2-i];
            for(i=0; i<3; ++i) cube[3][0][i] = cube[5][2][2-i];
            cube[5][2] = cube[2][2];
            cube[2][2] = tmp;
        } else{
            tmp = cube[2][2];
            cube[2][2] = cube[5][2];
            for(i=0; i<3; ++i) cube[5][2][i] = cube[3][0][2-i];
            for(i=0; i<3; ++i) cube[3][0][i] = cube[4][2][2-i];
            cube[4][2] = tmp;
        }
        break;
    case 2:
        // 0r2 > 5c0 > 1r0 > 4c2
        if(direction == '+'){
            for(i=0; i<3; ++i) tmp[i] = cube[4][2-i][2];
            for(i=0; i<3; ++i) cube[4][i][2] = cube[1][0][i];
            for(i=0; i<3; ++i) cube[1][0][i] = cube[5][2-i][0];
            for(i=0; i<3; ++i) cube[5][i][0] = cube[0][2][i];
            cube[0][2] = tmp;
        } else{
            tmp = cube[0][2];
            for(i=0; i<3; ++i) cube[0][2][i] = cube[5][i][0];
            for(i=0; i<3; ++i) cube[5][i][0] = cube[1][0][2-i];
            for(i=0; i<3; ++i) cube[1][0][i] = cube[4][i][2];
            for(i=0; i<3; ++i) cube[4][i][2] = tmp[2-i];
        }
        break;
    case 3:
        // 0r0 > 4c0 > 1r2 > 5c2
        if(direction == '+'){
            for(i=0; i<3; ++i) tmp[i] = cube[5][i][2];
            for(i=0; i<3; ++i) cube[5][i][2] = cube[1][2][2-i];
            for(i=0; i<3; ++i) cube[1][2][i] = cube[4][i][0];
            for(i=0; i<3; ++i) cube[4][i][0] = cube[0][0][2-i];
            cube[0][0] = tmp;
        } else{
            tmp = cube[0][0];
            for(i=0; i<3; ++i) cube[0][0][i] = cube[4][2-i][0];
            for(i=0; i<3; ++i) cube[4][i][0] = cube[1][2][i];
            for(i=0; i<3; ++i) cube[1][2][i] = cube[5][2-i][2];
            for(i=0; i<3; ++i) cube[5][i][2] = tmp[i];
        }
        break;
    case 4:
        // 0c0 > 2c0 > 1c0 > 3c0
        if(direction == '+'){
            for(i=0; i<3; ++i) tmp[i] = cube[3][i][0];
            for(i=0; i<3; ++i) cube[3][i][0] = cube[1][i][0];
            for(i=0; i<3; ++i) cube[1][i][0] = cube[2][i][0];
            for(i=0; i<3; ++i) cube[2][i][0] = cube[0][i][0];
            for(i=0; i<3; ++i) cube[0][i][0] = tmp[i];
        } else{
            for(i=0; i<3; ++i) tmp[i] = cube[0][i][0];
            for(i=0; i<3; ++i) cube[0][i][0] = cube[2][i][0];
            for(i=0; i<3; ++i) cube[2][i][0] = cube[1][i][0];
            for(i=0; i<3; ++i) cube[1][i][0] = cube[3][i][0];
            for(i=0; i<3; ++i) cube[3][i][0] = tmp[i];
        }
        break;
    case 5:
        // 0c2 > 3c2 > 1c2 > 2c2
        if(direction == '+'){
            for(i=0; i<3; ++i) tmp[i] = cube[2][i][2];
            for(i=0; i<3; ++i) cube[2][i][2] = cube[1][i][2];
            for(i=0; i<3; ++i) cube[1][i][2] = cube[3][i][2];
            for(i=0; i<3; ++i) cube[3][i][2] = cube[0][i][2];
            for(i=0; i<3; ++i) cube[0][i][2] = tmp[i];
        } else{
            for(i=0; i<3; ++i) tmp[i] = cube[0][i][2];
            for(i=0; i<3; ++i) cube[0][i][2] = cube[3][i][2];
            for(i=0; i<3; ++i) cube[3][i][2] = cube[1][i][2];
            for(i=0; i<3; ++i) cube[1][i][2] = cube[2][i][2];
            for(i=0; i<3; ++i) cube[2][i][2] = tmp[i];
        }
        break;
    
    default:
        break;
    }
}

void print_cubes(){
    cout << "Up" << endl;
    print_cube();
    cout << "Front" << endl;
    print_cube(2);
    cout << "Down" << endl;
    print_cube(1);
    cout << "Back" << endl;
    print_cube(3);
    cout << "Left" << endl;
    print_cube(4);
    cout << "Right" << endl;
    print_cube(5);
}

int main(){
    int T, N;
    // 면 순서: 윗, 아, 앞, 뒤, 왼, 오
    cube = vector<vector<vector<char>>> (6, vector<vector<char>> (3, vector<char> (3)));
    string rotation;


    cin >> T;

    while (T--){
        reset_cube();
        cin >> N;
        while (N--){
            cin >> rotation;
            rotate_cube(rotation[0], rotation[1]);
            // cout << rotation << endl;
            // print_cubes();
        }
        print_cube();
    }
}