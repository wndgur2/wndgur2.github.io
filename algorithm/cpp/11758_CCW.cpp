#include <iostream>
#include <vector>
#define INF 987654321
using namespace std;

bool getSegmentDir(pair<int, int> startPos, pair<int, int> endPos){
    if(startPos.first <= endPos.first) return true;
    else return false;
}

float getGradient(pair<int, int> startPos, pair<int, int> endPos){
    if((endPos.second - startPos.second)==0 && (endPos.first - startPos.first==0)) return 0;
    if(endPos.first - startPos.first==0) return INF;
    return static_cast< float >(endPos.second - startPos.second) /
        static_cast< float >(endPos.first - startPos.first);
}

int getDirection(pair<int, int> coords[3]){
    /**
     * 각 선분이 향하는 방향과 기울기로 방향을 알 수 있다.
     * 
     * 선분1 선분2
     * ->   -> : 기울기가 커지면 반시계(1)
     * ->   <- : 기울기가 커지면 시계(-1)
     * <-   -> : 기울기가 커지면 시계(-1)
     * <-   <- : 기울기가 커지면 반시계(1)
     * 기울기가 같다면 일직선(0)
    */
    bool segmentDirs[2] = {getSegmentDir(coords[0], coords[1]), getSegmentDir(coords[1], coords[2])};
    
    float gradients[2];

    if(segmentDirs[0]) gradients[0] = getGradient(coords[0], coords[1]);
    else  gradients[0] = getGradient(coords[1], coords[0]);

    if(segmentDirs[1]) gradients[1] = getGradient(coords[1], coords[2]);
    else  gradients[1] = getGradient(coords[2], coords[1]);

    if(gradients[0]==INF && gradients[1]==INF) return 0;
    float gradientDif = gradients[1]-gradients[0];
    if(gradientDif == 0) return 0;
    bool gradientGetBigger = gradientDif > 0;

    if(segmentDirs[0])
        if(segmentDirs[1])
            if(gradientGetBigger) return 1;
            else return -1;
        else
            if(gradientGetBigger) return -1;
            else return 1;
    else
        if(segmentDirs[1])
            if(gradientGetBigger) return -1;
            else return 1;
        else
            if(gradientGetBigger) return 1;
            else return -1;
}

int main(){
    pair<int, int> coords[3];
    for(int i=0; i<3; ++i)
        cin >> coords[i].first >> coords[i].second;
    cout << getDirection(coords) << '\n';
    return 0;
}