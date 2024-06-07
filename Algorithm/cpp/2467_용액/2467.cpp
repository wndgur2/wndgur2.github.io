#include <iostream>
#include <vector>
using namespace std;

int main(){
    int n, l, r;
    cin >> n;
    vector<int> aqueous;
    while(n--){
        int tmp;
        cin >> tmp;
        aqueous.push_back(tmp);
    }

    l = 0;
    r = aqueous.size()-1;
    int res = 2000000000;
    int res_l=l, res_r=r;
    while(l < r){
        int new_res = abs(aqueous[l] + aqueous[r]);
        if(new_res < res){
            res = new_res;
            res_l = l;  
            res_r = r;
        }
        if(aqueous[l] + aqueous[r] > 0) --r;
        else if(aqueous[l] + aqueous[r] < 0) ++l;
        else break;
    }
    cout << aqueous[res_l] << ' ' << aqueous[res_r] << endl;
    return 0;
}

/*
    풀이시간: 15분,
    처음 틀린 이유: res 초기값이 20억이 아닌 10억으로 잡음
*/