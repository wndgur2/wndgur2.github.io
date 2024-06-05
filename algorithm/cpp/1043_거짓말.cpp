#include<iostream>
#include<vector>
#include<algorithm>

using namespace std;

int main(){
    int n, m, i, j, v;
    int know_truth_n, answer = 0;
    bool can_lie;

    cin >> n >> m;
    cin >> know_truth_n;
    
    vector<int> know_truth (know_truth_n);
    vector< vector<int>> party (m);

    for(i=0; i<know_truth_n; ++i) cin >> know_truth[i];

    for(i=0; i<m; ++i){
        cin >> n;
        for(j=0; j<n; ++j){
            cin >> v;
            party[i].push_back(v);
        }
    }

    for(int k=0; k<m; ++k)
        for(i=0; i<m; ++i){
            can_lie = true;
            for(int v : party[i]){
                if (find(know_truth.begin(), know_truth.end(), v) != know_truth.end())
                    can_lie = false;
            }
            if(!can_lie){
                //party[i]에 온 사람들은 진실을 안다.
                for(int v : party[i]){
                    if (find(know_truth.begin(), know_truth.end(), v) == know_truth.end())
                        know_truth.push_back(v);
                }
            }
        }

    for(i=0; i<m; ++i){ // party
        can_lie = true;
        for(int v : party[i]){
            if (find(know_truth.begin(), know_truth.end(), v) != know_truth.end())
                can_lie = false;
        }
        if(can_lie) ++answer;
    }

    cout << answer << endl;

    return 0;
}