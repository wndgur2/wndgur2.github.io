#include <iostream>

struct Flipped_team{ // 올해 순위가 역전된 한 쌍의 팀. "역전쌍"이라고 부르겠습니다.
    int team_name_1;
    int team_name_2;
    bool is_applied; // 올해 순위에 반영되었는가?
};

void swap(int *queue, int *indexes, int team_name_1, int team_name_2){
    int temp;
    int idx1 = indexes[team_name_1-1];
    int idx2 = indexes[team_name_2-1];

    // 인덱스 스왑.
    temp = indexes[team_name_1-1];
    indexes[team_name_1-1] = indexes[team_name_2-1];
    indexes[team_name_2-1] = temp;

    // queue에서 스왑.
    temp = queue[idx1];
    queue[idx1] = queue[idx2];
    queue[idx2] = temp;
}

int getDif(int a, int b){
    if(a > b) return a-b;
    else return b-a;
}

void print(int *queue, int n){
    for(int i=0; i<n; i++) printf("%d ", queue[i]);
    printf("\n");
}

int main(){
    int i, j, n, m, T, a, b;
    int team_1_idx, team_2_idx;
    scanf("%d", &T);
    for(i=0; i<T; i++){
        scanf("%d", &n);
        int *queue = (int*)malloc(sizeof(int)*n); // 순위 큐
        int *indexes = (int*)malloc(sizeof(int)*n); // 인덱스 큐
        for(j=0; j<n; j++) {
            scanf("%d", &queue[j]); // %d팀을 큐의 j번째에 넣음 1~n
            indexes[queue[j]-1] = j; // 작년 j등 팀의 현재 index는 j다..
        } 
        scanf("%d", &m);
        struct Flipped_team *flipped_teams = (struct Flipped_team*)malloc(sizeof(Flipped_team)*m); // m개의 역전쌍 저장할 배열        
        // 역전쌍 입력받기. 초기값 넣기.
        for(j=0; j<m; j++) {
            scanf("%d %d", &a, &b); // a팀과 b팀의 순위가 바뀜. 누가 높은진 모름. 누가 몇등이었는지도 모름. 걍 두개의 팀 이름임.
            flipped_teams[j].team_name_1 = a;
            flipped_teams[j].team_name_2 = b;
            flipped_teams[j].is_applied = false;
        }

        // 변화한 두 팀의 순위차가 1이면 swap. 남은 변화가 없거나, 모든 변화쌍의 순위차가 1 이상일 때까지 반복.
        bool changed = true;
        int left_flips = m; // 남은 역전쌍
        while(changed){
            changed = false;
            for(j=0; j<m; j++) {
                if(!flipped_teams[j].is_applied){ // 아직 올해 순위에 적용되지 않은 역전쌍에 대하여
                    team_1_idx = indexes[flipped_teams[j].team_name_1-1];
                    team_2_idx = indexes[flipped_teams[j].team_name_2-1];
                    if(getDif(team_1_idx, team_2_idx)==1){
                        changed = true;
                        swap(queue, indexes, flipped_teams[j].team_name_1, flipped_teams[j].team_name_2);
                        flipped_teams[j].is_applied = true;
                        left_flips --;
                    }
                }
            }
        }
        if(left_flips) printf("IMPOSSIBLE\n");
        else print(queue, n);
    }
}