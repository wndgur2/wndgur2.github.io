#include<iostream>
#include<vector>
using namespace std;

/*
    7
    1 7 8 2 3 4 1

    0
    1
    1

    1
    1 2
    1 7

    2
    1 2 3
    1 7 8

    3
    1 2 3
    1 2 8

    4
    1 2 3
    1 2 3

    5
    1 2 3 4
    1 2 3 4

    7
    1 2 3 4
    1 2 3 4
*/

void insertValue(vector<int> &maxValues, int num){
    //0 ~ maxValues.size() 인덱스 중 value가 num보다 큰 쪽으로 가까운 값의 인덱스를 찾고, 그 자리에 num을 삽입한다.
    int left = 0, right = maxValues.size()-1, mid;
    mid = (left + right)/2;
    while(left < right){
        mid = (left + right)/2; // 소수점 버려짐
        // cout << mid << endl;
        if(maxValues[mid] > num){
            right = mid;
        } else if(maxValues[mid] < num){
            left = mid+1;
        } else{ // 같은 값이 있음. 갱신할 필요가 없음.
            return;
        }
    }
    // cout << mid << endl;
    if(maxValues[mid] > num) maxValues[mid] = num;
    else maxValues[mid+1] = num;
    return;
}

int main(){
    int i, N, num;
    cin >> N;
    N--;
    cin >> num;
    vector<int> maxValues = {num};
    while(N--){
        cin >> num;
        if(num > maxValues[maxValues.size()-1]) maxValues.push_back(num);
        else insertValue(maxValues, num);

        // for(auto x : maxValues){
        //     cout << x << " ";
        // }
        // cout << endl;
    }
    cout << maxValues.size() << endl;
    return 0;
}

/*
1~4

only LEFT
    mid:2
    3~4
    mid:3
    4~4 done

only RIGHT
    mid: 2
    1~2
    mid:1
    1~1 done.
*/