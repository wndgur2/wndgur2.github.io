/*
    2023.6.03
    상어초등학교.cpp
    https://www.acmicpc.net/problem/21608
*/

#include <iostream>
#include <vector>

using namespace std;

int main(){
    int n;
    scanf("%d", &n);
    vector<vector<int> > board(n, vector<int>(n, 0));
    vector<vector<int> > students(n*n+1, vector<int>(4, 0));
    vector<vector<int> > seat(n, vector<int>(n, 0));
    vector<vector<int> > adj(n*n+1, vector<int>(n*n+1, 0));
    vector<vector<int> > adj2(n*n+1, vector<int>(n*n+1, 0));
    vector<int> order(n*n+1, 0);
    int dx[] = {0, 0, -1, 1};
    int dy[] = {-1, 1, 0, 0};

    for(int i=0; i<n*n; i++){
        int student, a, b, c, d;
        scanf("%d %d %d %d %d", &student, &a, &b, &c, &d);
        students[student][0] = a;
        students[student][1] = b;
        students[student][2] = c;
        students[student][3] = d;
        order[i] = student;
    }
    for(int i=0; i<n*n; i++){ // 학생 순서대로 자리 배치
        int student = order[i];
        int x = -1, y = -1, max_like = -1, max_empty = -1;
        for(int j=0; j<n; j++){ // 행
            for(int k=0; k<n; k++){ // 열
                if(seat[j][k] != 0) continue; // 이미 자리가 배정된 경우
                int cnt_like = 0, cnt_empty = 0; // 좋아하는 학생 수, 빈 자리 수
                for(int l=0; l<4; l++){ // 상하좌우
                    int nx = j + dx[l];
                    int ny = k + dy[l];
                    if(nx < 0 || nx >= n || ny < 0 || ny >= n) continue; // 범위를 벗어나는 경우
                    if(seat[nx][ny] == 0) cnt_empty++; // 빈 자리인 경우
                    // 좋아하는 학생인 경우
                    else if(seat[nx][ny] == students[student][0] || seat[nx][ny] == students[student][1] || seat[nx][ny] == students[student][2] || seat[nx][ny] == students[student][3]) cnt_like++;
                }
                // 좋아하는 학생 수가 더 많은 경우
                if(cnt_like > max_like){
                    x = j;
                    y = k;
                    max_like = cnt_like;
                    max_empty = cnt_empty;
                }
                // 좋아하는 학생 수가 같은 경우
                else if((cnt_like == max_like) && (cnt_empty > max_empty)){
                    x = j;
                    y = k;
                    max_like = cnt_like;
                    max_empty = cnt_empty;
                }
            }
        }
        seat[x][y] = student;
    }

    for(int i=0; i<n; i++){
        for(int j=0; j<n; j++){
            int student = seat[i][j];
            for(int k=0; k<4; k++){
                int nx = i + dx[k];
                int ny = j + dy[k];
                if(nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
                adj[student][seat[nx][ny]] = 1;
                adj[seat[nx][ny]][student] = 1;
            }
        }
    }

    int answer = 0;
    for(int i=1; i<=n*n; i++){
        int cnt = 0;
        for(int j=0; j<4; j++){
            if(adj[i][students[i][j]] == 1) {
                cnt++;
            }
        }

        if(cnt == 1) answer += 1;
        else if(cnt == 2) answer += 10;
        else if(cnt == 3) answer += 100;
        else if(cnt == 4) answer += 1000;
    }

    printf("%d\n", answer);

    return 0;
}