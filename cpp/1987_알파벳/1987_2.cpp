/*
    각 칸의 최대 점수와, 그 visit 저장.
    새 칸에 접근할 때 그 칸의 visits와 같다면 죽음.
*/

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

vector<vector<int>> d = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

int DFS(int y, int x, int h, int w, int point, vector<char> visits, vector<vector<char>> &alphamap, vector<vector<vector<char>>> &points){
    int maxPoint = point;
    int tmpPoint;
    //상하좌우
    for(vector<int> yx : d){
        int newY = y + yx[0];
        int newX = x + yx[1];
        if((newY >= 0) && (newY <= h-1)){
            if((newX >= 0) && (newX <= w-1)){
                if(find(visits.begin(), visits.end(), alphamap[newY][newX]) == visits.end()){ // 새로운 알파벳?
                    visits.push_back(alphamap[newY][newX]);
                    if(visits != points[newY][newX]){
                        points[newY][newX] = visits;
                        tmpPoint = DFS(newY, newX, h, w, point+1, visits, alphamap, points);
                        maxPoint = tmpPoint > maxPoint ? tmpPoint: maxPoint;
                    }
                    visits.pop_back();
                }
            }  
        }
    }
    return maxPoint;
}

int main(){
    int h, w, i, j;
    cin >> h >> w;

    vector<vector<char>> alphamap (h, vector<char> (w));
    vector<vector<vector<char>>> points (h, vector<vector<char>> (w));
    
    // 지도 입력
    char tmp[w];
    for(i=0; i<h; ++i){
        cin >> tmp;
        for(j=0; j<w; ++j)
            alphamap[i][j] = tmp[j];
    }

    cout << DFS(0, 0, h, w, 1, {alphamap[0][0]}, alphamap, points) << endl;

    return 0;
}