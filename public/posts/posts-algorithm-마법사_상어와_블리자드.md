
## 백준*21611*마법사*상어와*블리자드 2024-07-07

### 카테고리 : 구현

## [문제 설명](https://www.acmicpc.net/problem/21611)

마법사 상어가 블리자드라는 스킬을 써서 구슬을 파괴하고,  
같은 번호 구슬이 4개 이상 연속으로 있으면 애니팡처럼 폭발하는 게임이다.

아래와 같은 달팽이 껍질 모양 맵에 구슬 1, 2, 3 이 차있다. (i: 칸 번호)
<img width="566" alt="칸_번호" src="https://github.com/wndgur2/whosleejunghyeok/assets/65120311/b568b056-c779-4598-82ba-c72ea64ca30d">

블리자드(방향, 거리)를 써서 일직선 상의 구슬을 파괴한다. (i: 구슬 번호) ~
<img width="838" alt="구슬_파괴" src="https://github.com/wndgur2/whosleejunghyeok/assets/65120311/27daeb50-f63c-40e4-9895-d6e4a10da201">

구슬이 또르르 굴러와 빈자리를 채운다.
연속된 구슬이 4개 이상이면 폭발한다.
<img width="848" alt="구슬_폭발" src="https://github.com/wndgur2/whosleejunghyeok/assets/65120311/800b5382-591a-4366-8627-38c370ca22b5">

구슬이 다시 굴러 빈자리를 채운다.
폭발하는 구슬이 없을 때까지 반복한다.

각 연속된 구슬 그룹은 2개의 구슬(연속된 구슬의 개수, 그 그룹의 구슬 번호)로 변화한다.
<img width="1463" alt="구슬_변화" src="https://github.com/wndgur2/whosleejunghyeok/assets/65120311/fdb0c48f-8b7e-4c23-a391-6576dd62e865">

위 과정을 M번 반복한다.

1×(폭발한 1번 구슬의 개수) + 2×(폭발한 2번 구슬의 개수) + 3×(폭발한 3번 구슬의 개수) 출력

## 블리자드를 맞는 구슬의 인덱스 구하는 법

달팽이 껍질 모양의 테이블
안쪽 칸에서 바깥쪽 칸으로 가기 위한 인덱스 차이는,
껍질이 커질 수록 커진다.

<img width="566" alt="칸_번호" src="https://github.com/wndgur2/whosleejunghyeok/assets/65120311/b568b056-c779-4598-82ba-c72ea64ca30d">
그 증가량은, 껍질이 코너를 돌 때 1씩 2번 증가한다.

7 7 8 9 9 10 11 11 11 12 13 13 13 14 15 15 15 15 16 16 16 16 17 17 17 17 17

새로운 인덱스 차이를 구했으면, 해당 껍데기의 길이동안 유지된다. (꺾기 전까지 유지된다.)

껍데기의 길이는 (북, 서), (남, 동)이 동일하다.

↑방향으로 사거리 3인 블리자드는  
7 22 45번 구슬을 파괴한다.  
인덱스 증가값은 0에서부터 시작하므로 7, 15, 23이다.

7: 초기값  
15: 7 + 2 + 2 + 2 + 2 : 코너를 4번 돌아야 한다.  
23: 15 + 2 + 2 + 2 + 2 : 코너를 4번

=> 증가값은 항상 8이다.

이러한 규칙을 통해 일직선상 구슬들의 인덱스를 알아낼 수 있다.

## 상세 구현

블리자드는 네 가지 함수로 구현했다.  
코드는 [21611.cpp](https://github.com/wndgur2/wndgur2.github.io/tree/main/algorithm/cpp/21611_%EB%A7%88%EB%B2%95%EC%82%AC_%EC%83%81%EC%96%B4%EC%99%80_%EB%B8%94%EB%A6%AC%EC%9E%90%EB%93%9C/21611.cpp) 파일을 참조하시면 됩니다.

```cpp
// D방향으로 S만큼 구슬을 파괴하고, 그 자리를 0으로 대체한다.
void 구슬파괴(marbles, D, S)

// 배열 중간에 빈자리인 0을 제거하고 다음 칸의 구슬을 앞으로 당긴다. 당길 수 없을 때까지 반복한다.
void 구슬당기기(marbles)

// 4개 이상 연속된 구슬을 0으로 대체하고 당기기를 폭발이 없을 때까지 반복한다. 그 점수를 리턴한다.
int 구슬폭발(marbles)

// 문제의 규칙에 따라 구슬을 재조합한다.
vector<vector<int>> 구슬변화(marbles)
```

이 함수들을 사용하기 전에, input으로 주어지는 테이블을, 중앙에서부터 달팽이 껍질 모양으로 따라나가면서  
1차원 벡터로 바꾸어주는 작업을 했다.

이후에는 위 네 함수를 적절히 사용해 해결했다.

---

### Code

<!-- CODE-APPENDED:21611.cpp -->
```cpp
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
```
