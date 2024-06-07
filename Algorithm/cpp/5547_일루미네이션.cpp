#include<iostream>
#include<vector>

using namespace std;

int main(){
    int i, j, k;
    int w, h, answer =0;
    cin >> w >> h;
    vector<vector<int>> map_ (h+2, vector<int> (w+2, 0));
    vector<vector<int>> visit (h+2, vector<int> (w+2, 0));
    vector<vector<int>> queue;
    
    for(i=0; i<h; i++)
        for(j=0; j<w; j++)
            cin >> map_[i+1][j+1];

    // 6방향 dFS
    // y의 홀짝에 따라 주변 노드가 바뀜.
    // 홀일 경우 : 북, 북동, 동, 남, 남동, 서
    // 짝일 경우 : 북, 동, 남서, 남, 서, 북서
    vector<vector<int>> d {{1, -1}, {-1, -1}, {-1, 0}, {0, 1}, {1, 0}, {0, -1}, {1, 1}, {-1, 1}}; // 0~5가 짝, 2~7이 홀
    vector<int> current_loc;
    vector<int> new_loc;

    int index_start;
    queue.push_back({0,0});
    while(!queue.empty()){
        current_loc = queue.back();
        queue.pop_back();
        index_start = current_loc[0]%2==1 ? 2:0;
        for(i=index_start; i<index_start+6; i++){
            new_loc = {current_loc[0] + d[i][0], current_loc[1] + d[i][1]};
            
            if((new_loc[0] < 0) || (new_loc[1] < 0)) continue; // 음수
            if((new_loc[0] >= h+2) || (new_loc[1] >= w+2)) continue; // 크기 초과
            if(map_[new_loc[0]][new_loc[1]] == 1){
                answer += 1;
            } else{
                if(visit[new_loc[0]][new_loc[1]] == 0){
                    visit[new_loc[0]][new_loc[1]] = 1;
                    queue.push_back(new_loc);
                }
            }
        }
    }
    cout << answer << endl;

    return 0;
}