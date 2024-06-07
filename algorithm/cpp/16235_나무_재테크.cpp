#include<iostream>
#include<vector>
#include <algorithm>

using namespace std;
/**
 * 2023.10.14 13:00
 * 
 * N: 나무 농장 크기
 * M: 나무 개수
 * K: 보낼 기간(년)
 * 
 * 봄: 나무가 나이만큼 양분을 먹고 나이가 들거나, 양분을 먹지 못하고 죽는다. (어린 나무부터)
 * 여름: 죽은 나무의 나이/2가 해당 칸의 양분으로 변한다.
 * 가을: 나이가 5의 배수인 나무가 주변 8칸에 나이 1인 나무를 생성한다.
 * 겨울: 주어진 배열만큼 양분을 뿌린다.
 * 
 * 각 계절을 함수로 만들기
*/

int N, M, K;
vector<vector<vector<int>>> trees;
vector<vector<int>> fertilizer;
vector<vector<int>> nutrition;
vector<vector<int>> deadTrees;

// 봄: 나무가 나이만큼 양분을 먹고 나이가 들거나, 양분을 먹지 못하고 양분이 된다. (어린 나무부터)
void spring(){
    for(int y=0; y<N; ++y)
        for(int x=0; x<N; ++x){
            if (trees[y][x].size() == 0) continue;
            sort(trees[y][x].begin(), trees[y][x].end());

            int i_tree=0;
            while(i_tree < trees[y][x].size()){
                if(nutrition[y][x] >= trees[y][x][i_tree]){
                    nutrition[y][x] -= trees[y][x][i_tree]++;
                    ++i_tree;
                }
                else{
                    while(trees[y][x].size() > i_tree){
                        deadTrees.push_back({y, x, trees[y][x].back()});
                        trees[y][x].pop_back();
                    }
                    break;
                }
            }
        }
}

// 여름: 죽은 나무의 나이/2가 해당 칸의 양분으로 변한다.
void summer(){
    for(int i_tree=0; i_tree<deadTrees.size(); ++i_tree)
        nutrition[deadTrees[i_tree][0]][deadTrees[i_tree][1]] += deadTrees[i_tree][2]/2;
    deadTrees = {};
}

// 가을: 나이가 5의 배수인 나무가 주변 8칸에 나이 1인 나무를 생성한다.
void fall(){
    vector<pair<int, int>> ds = {{-1, 0}, {-1, -1}, {0, -1}, {1, -1}, {1, 0}, {1, 1}, {0, 1}, {-1, 1}};

    for(int y=0; y<N; ++y)
        for(int x=0; x<N; ++x)
            for(int i_tree=0; i_tree<trees[y][x].size(); ++i_tree){
                if(trees[y][x][i_tree]%5 != 0) continue;
                for(pair<int, int> d: ds){
                    int newY = y+d.first,
                    newX = x+d.second;
                    if(newX<0 || newX>=N || newY<0 || newY>=N) continue;
                    trees[newY][newX].push_back(1);
                }
            }
}

// 겨울: 주어진 배열만큼 양분을 뿌린다.
void winter(){
    for(int y=0; y<N; ++y)
        for(int x=0; x<N; ++x)
            nutrition[y][x] += fertilizer[y][x];
}

int main(){
    cin >> N >> M >> K;
    fertilizer = vector<vector<int>> (N, vector<int> (N));
    nutrition = vector<vector<int>> (N, vector<int> (N, 5));
    trees = vector<vector<vector<int>>> (N, vector<vector<int>> (N));

    for(int i=0; i<N; ++i)
        for(int j=0; j<N; ++j)
            cin >> fertilizer[i][j];

    int Y, X, age;
    while(M--){
        cin >> Y >> X >> age;
        trees[Y-1][X-1].push_back(age);
    }
    
    while(K--){
        spring();
        summer();
        fall();
        winter();
    }
    
    int treeN = 0;
    for(auto row: trees)
        for(auto cell: row)
            treeN += cell.size();

    cout << treeN << endl;

    return 0;
}