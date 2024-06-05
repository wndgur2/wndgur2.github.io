/*
    완전탐색 실패.
    시간초과: 4^400 회
*/

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> d = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

int DFS(int y, int x, int h, int w, int point, vector<char> visits, vector<vector<char>> &alphamap){
    // cout << y << x << endl;
    int maxPoint = point;
    int tmpPoint;
    //상하좌우
    for(vector<int> yx : d){
        int newY = y + yx[0];
        int newX = x + yx[1];
        if((newY >= 0) && (newY <= h-1)){
            if((newX >= 0) && (newX <= w-1)){
                // cout << "NEW";
                // cout << newY << newX << endl;
                if(find(visits.begin(), visits.end(), alphamap[newY][newX]) == visits.end()){
                    visits.push_back(alphamap[newY][newX]);
                    tmpPoint = DFS(newY, newX, h, w, point+1, visits, alphamap);
                    maxPoint = tmpPoint > maxPoint ? tmpPoint: maxPoint;
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
    
    // 지도 입력
    char tmp[w];
    for(i=0; i<h; ++i){
        cin >> tmp;
        for(j=0; j<w; ++j)
            alphamap[i][j] = tmp[j];
    }

    cout << DFS(0, 0, h, w, 1, {alphamap[0][0]}, alphamap) << endl;

    return 0;
}