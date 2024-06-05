#include <iostream>
#include <vector>

using namespace std;

/**
 * 최소 최대 그룹합을 변수로 이분탐색
*/

vector<int> beads;
int N;

int getGroupN(int maximum){
    int tmpSum = 0;
    int groupN = 1;
    for(int i=0; i<N; ++i){
        tmpSum += beads[i];
        if(tmpSum > maximum){
            ++groupN;
            tmpSum = beads[i];
        }
    }
    return groupN;
}

int main(){
    int M, i, maxN=0, sumN=0;
    cin >> N >> M;
    beads = vector<int> (N);
    
    for(i=0; i<N; ++i){
        cin >> beads[i];
        maxN = beads[i]>maxN? beads[i]:maxN;
        sumN += beads[i];
    }

    int left=maxN, right=sumN, mid, groupN;
    while(left < right){
        mid = (left + right)/2;
        // cout << mid << endl;
        // mid가 최소 최대 그룹합으로 하는 M개의 그룹이 가능한지 확인
        groupN = getGroupN(mid);
        // cout << "GN: " << groupN << endl;
        if(groupN <= M){
            // 만들수있는 그룹 수가 너무 적으면 right을 mid로 (최대 그룹합을 더 줄인다.) > 그룹 수를 늘린다
            // 같아도 줄이는 이유: groupN이 M인 mid가 여러개일 수 있는데 그중 최소값을 찾기위해.
            right = mid;
        } else{
            // 그룹이 충분히 많다면 left를 mid로 (최대 그룹합을 늘린다.) > 그룹 수를 줄인다
            left = mid+1;
        }
    }
    cout << right << endl;

    // right을 최대 그룹합으로 하는 그룹을 짓는다.
    vector<int> groupSizes (M, 0);
    int tmpSum = 0, groupIdx = 0, maxGroup;
    for(i=0; i<N; ++i){
        // right만 안넘게 꽉꽉 채워넣기
        tmpSum += beads[i];
        if(tmpSum > right){
            ++groupIdx;
            tmpSum = beads[i];
        }
        ++groupSizes[groupIdx];

        // 남은 구슬이 남은 그룹 개수이면 나가서 나머지 그룹을 1로 채움
        // 이게 되는 이유:
        // 나머지를 1로 채웠을 때, 최대그룹합이 right보다 작으면 어떡하나?
        // 그럴 수가 없다. right이 최대그룹합을 의미하고, 이는 M개의 그룹을 만들 수 있는 최대그룹합중 가장 작은 값이다. ->
        // 따라서 구슬을 어떻게 배치하더라도 최소 최대그룹합이 right보다 작다면 right이 잘못된 것.

        if(N-i-1 == M-groupIdx-1) break;
    }
    for(i=groupIdx+1; i<M; ++i){
        groupSizes[i] = 1;
    }
    for(int size: groupSizes){
        cout << size << ' ';
    }
    cout << endl;
    return 0;
}