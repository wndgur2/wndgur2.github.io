/**
 * 2023.09.28 23:10
 * 
 * N <= 100 : 완전탐색 안됨. DP.
 * 
 * DP[i][j] (i: 도시, j: 남은시간)
 * = 이때 얻을 수 있는 모금액의 최댓값.
 * 
 * 기타 배운점
 *  DP 중에서도 클래식한 문제?인데 처음에 이상하게 풀었다.
 *  DP 사용 이점을 기억하기( 한번 얻은 결과를 이용한다는 것 )
 * 
 *  struct를 써서 코드 가독성을 높일 수 있다. 시간은 820 -> 868로 조금 늘었다.
 *  unordered_map은 이점이 확실한 경우 말고는 쓰지 않는게 좋다. 그냥 배열보다 메모리는 4배, 시간은 10배 정도 들었다.
 *  그러니까 어차피 배열과 비슷한 크기를 쓸거라면 그냥 배열이 낫다는 것
 *  ios::sync_with_stdio(0), cin.tie(0): 824 -> 800으로 조금 줄었다.
*/

#include <iostream>
#include <vector>

using namespace std;

struct section{ //구간
    int walk_cost;
    int walk_reward;
    int bike_cost;
    int bike_reward;
};

int N, K, i;
vector<vector<int>> DP;
vector<section> sections;

int solve(int depth, int time_left){
    if(time_left<0) return -100000000; // 100(N) x 1000000(최대 모금액)
    if(depth == N) return 0;
    if(DP[depth][time_left] != -1){
        return DP[depth][time_left];
    }
    return DP[depth][time_left] = max(
        solve(depth+1, time_left-sections[depth].walk_cost) + sections[depth].walk_reward,
        solve(depth+1, time_left-sections[depth].bike_cost) + sections[depth].bike_reward
    );
}

int main(){
    ios::sync_with_stdio(0), cin.tie(0);
    cin >> N >> K;
    DP = vector<vector<int>> (N, vector<int> (K+1, -1));
    sections = vector<section> (N);
    for(i=0; i<N; ++i){
        cin >> sections[i].walk_cost >> sections[i].walk_reward >> sections[i].bike_cost >> sections[i].bike_reward;
    }
    cout << solve(0, K) << endl;
    return 0;
}