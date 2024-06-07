#include <iostream>
#include <vector>
using namespace std;

/*
    G개 게이트 <= 10^5
    P개 비행기 <= 10^5
    각 비행기의 최대 게이트번호 gi
    얼마나 많은 비행기 ?
    게이트를 gi에 도킹하는게 제일 베스트일 것이다.
    안되면 하나씩 줄여서하면 ?
    최악: 50억회 정도
    중간중간에 비어있어서 이진탐색은 안될걸 ?

    1~gi 게이트 중 사용중이지 않은 최대 게이트 번호를 유지하는 배열.

    초기값 DP[i] => input
    
    - gi 3 gets in
    DP[3] = 2
    gates[3] = true

    - gi 4 gets in
    DP[4] = 2 <<-- its DP[3]!
    gates[4] = true

*/

vector<int> parents;

int getRoot(int idx){
    if(parents[idx] == idx) return idx;
    return getRoot(parents[idx]);
}

int main(){
    int G, P, i, gi, result=0;
    cin >> G >> P;
    vector<bool> gates (P, false); // 게이트 당
    vector<int> DP (G); // gi보다 작거나 같은 사용중이지 않은 최대 게이트 번호
    parents = vector<int> (G); // DP 당 (결국 게이트 당)

    for(i=0; i<G; ++i){
        DP[i] = i;
        parents[i] = i;
    }
    while(P--){
        cin >> gi;
        --gi;
        if(!gates[gi]){ // gi가 비어있어서 사용했다. 그리고 들어올 비행기를 위해 최대 게이트를 찾아놓는다
            gates[gi] = true;
            if(gi==0) DP[0] = -1;
            else if(gates[gi-1] || (DP[gi-1] == gi-1))
                parents[gi] = getRoot(gi-1); // 앞자리가 사용중이면 root를 갱신
            else
                --DP[gi]; // 아니면 최대 게이트 번호를 1칸 댕김
        } else{
            int root = getRoot(gi);
            parents[gi] = root;
            if(DP[root] < 0) break; // 들어갈 게이트가 없다!

            gates[DP[root]] = true; // 루트1의 게이트를 씀
            if(DP[root] == 0) --DP[root]; // 루트도 마지막이었다. 이제 더이상 이 이하는 못쓰게 바꿈.
            else if(gates[DP[root]-1]){ // 루트1 앞자리가 사용중이면
                parents[root] = getRoot(DP[root]-1); // 그 사용중인 애의 루트를 루트1의 루트로함
            } else{
                --DP[root]; // 아니면 루트1의 최대 게이트를 1 당김
                if(DP[root] == DP[root-1]){
                    parents[root] = getRoot(root-1);
                }
            }
        }
        ++result;
    }
    cout << result << endl;
    return 0;
}