#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

void 구슬파괴(vector<int> &marbles_, int direction, int scope){
    int initial_increment[] = {7, 3, 1, 5}; // 상하좌우
    int marble_index, cur_increment, j;

    cur_increment = initial_increment[direction-1];
    marble_index = initial_increment[direction-1];
    
    for(j=0; j<scope; j++){
        marbles_[marble_index] = 0;
        cur_increment += 8;
        marble_index += cur_increment;
    }
}

void 구슬당기기(vector<int> &marbles_){
    int n = marbles_.size();
    marbles_.erase(remove(marbles_.begin()+1, marbles_.end(), 0), marbles_.end());
    while(marbles_.size() < n)
        marbles_.push_back(0);
    return;
}

int 구슬폭발(vector<int> &marbles_){
    int found_new_i = 0, cur_n = 0, k, l, result = 0;
    bool is_blown_up = true;
    while(is_blown_up){
        is_blown_up = false;
        for(k=1; k<marbles_.size(); ++k){ // 0번은 마법사 상어니까 1번부터
            if(marbles_[k] != cur_n){
                if(k - found_new_i > 3){ // 폭발 발생
                    result += cur_n * (k-found_new_i);
                    is_blown_up = true;
                    for(l=found_new_i; l<k; ++l)
                        marbles_[l] = 0;
                }
                cur_n = marbles_[k];
                found_new_i = k;
            }
            if(marbles_[k] == 0) break;
        }
        구슬당기기(marbles_);
    }
    return result;
}

vector<int> 구슬변화(vector<int> &marbles_){
    vector<int> new_marbles = {0};
    int max_size = marbles_.size();
    int group_size = 0, cur_n = marbles_[1], k, l;
    for(k=1; k<max_size; ++k){ // 0번은 마법사 상어니까 1번부터
        if(marbles_[k] != cur_n){ // 그룹 생성됨
            if(new_marbles.size() < max_size) new_marbles.push_back(group_size);
            else break;
            if(new_marbles.size() < max_size) new_marbles.push_back(cur_n);
            else break;
            
            if(marbles_[k] == 0) break;
            
            cur_n = marbles_[k];
            group_size = 0;
        }

        ++group_size;
    }
    while(new_marbles.size() < max_size)
        new_marbles.push_back(0);

    return new_marbles;
}

int main(){
    int N, M, i, j, answer = 0;
    cin >> N >> M;
    vector<vector<int>> table(N, vector<int> (N));
    vector<int> marbles = {};

    for(i=0; i<N; ++i)
        for(j=0; j<N; ++j)
            cin >> table[i][j];

    // 달팽이 모양 테이블을 1자로 펴서 1D로 저장하기
    int current_length = 0, side_length = 1, y = int(N/2), x = int(N/2), turn = 0;
    vector<vector<int>> directions = {{0, -1}, {1, 0}, {0, 1}, {-1, 0}}; // 좌하우상
    int i_dir = 0;

    for(i=0; i<N*N; ++i){
        ++current_length;
        marbles.push_back(table[y][x]);
            
        y += directions[i_dir][0];
        x += directions[i_dir][1];

        if(current_length % side_length == 0){
            current_length = 0;
            i_dir = (i_dir+1) % 4;
            if(++turn%2 == 0) ++side_length;
        }
    }

    // 블리자드 맛좀 보소
    int D, S; // 방향, 거리

    for(i=0; i<M; ++i){
        cin >> D >> S;
        구슬파괴(marbles, D, S);
        구슬당기기(marbles);
        answer += 구슬폭발(marbles);
        marbles = 구슬변화(marbles);
    }

    cout << answer << endl;

    return 0;
}