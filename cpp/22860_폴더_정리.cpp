/*
    2023.06.03
    폴더정리.cpp
    https://www.acmicpc.net/problem/22860
*/
#include <iostream>
#include <vector>

using namespace std;

int main(){
    // 첫 번째 줄에는 main 폴더 하위에 있는 폴더의 총 개수 
    // N과 파일의 총 개수 
    // M이 공백으로 구분되어 주어진다.

    // 두 번째 줄부터 
    // N + M + 1 번째까지 상위 폴더의 이름 P, 폴더 또는 파일의 이름 F, 폴더인지 아닌지 알려주는 C(0, 1)가 공백으로 구분되어 주어진다.

    // <C, F> 형태로 저장
    vector<vector<int, string> > main;

    scanf("%d %d", &n, &m);
    for(int i=0; i<n+m+1; i++){
        string p, f;
        int c;
        cin >> p >> f >> c;
        if(c == 0){ // 폴더인 경우
        }
        else{ // 파일인 경우
        }
    }
}