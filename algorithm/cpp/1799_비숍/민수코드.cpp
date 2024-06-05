#include <iostream>
#include <vector>
using namespace std;
typedef pair<int, int> pii;
vector<vector<int>> map;
vector<vector<bool>> isCross;
vector<vector<pii>> bishop; // bishop[0]과 bishop[1]에 흑, 백칸의 좌표 저장
int n;

// 중복 걱정이 없는 이유. len이 0부터 증가하기 때문에 현재 len 이전의 비숍들은 이미 결정됨. 그래서 2^20?
void dfs(int len, int depth, vector<pii> &v, int &ret)
{
    ret = max(depth, ret);
    if (len == v.size()) // 모든 흑 혹은 백 칸을 확인했다? len == n*n/2
        return;
    dfs(len + 1, depth, v, ret); // 이 칸에 비숍을 놓지 않고 넘어가는 경우

    int y = v[len].first, x = v[len].second; // 이번에 확인하는 칸의 좌표

    if (!map[y][x]) // 이 칸이 막힌 경우
        return;

    // 대각선은 각 2n-1개 생긴다.
    int leftCross = x + y; // 대각선의 인덱스. 좌측 하단에서 우측 상단으로 긋는 대각선
    if (isCross[0][leftCross]) // 이 대각선이 이미 사용중이다. 비숍을 놓을 수 없다.
        return;
    int rightCross = y - x + n; // 좌상우하
    if (isCross[1][rightCross]) // 이 대각선이 이미 사용중이다. 비숍을 놓을 수 없다.
        return;
    isCross[0][leftCross] = isCross[1][rightCross] = true; // 이 대각선을 사용한다.
    dfs(len + 1, depth + 1, v, ret); // 비숍을 놓았으니(한 대각선을 차지했으니) depth를 1증가
    isCross[0][leftCross] = isCross[1][rightCross] = false; // 이 대각선에서 비숍을 뺀다.
}
int main()
{
    ios::sync_with_stdio(0), cin.tie(0);
    cin >> n;
    bishop = vector<vector<pii>>(2, vector<pii>());
    map = vector<vector<int>>(n, vector<int>(n));
    isCross = vector<vector<bool>>(2, vector<bool>(2 * n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; ++j)
        {
            cin >> map[i][j];
            if ((i + j) % 2)
                bishop[1].push_back({i, j});
            else
                bishop[0].push_back({i, j});
        }
    int ret1 = 0, ret2 = 0;
    dfs(0, 0, bishop[0], ret1);
    dfs(0, 0, bishop[1], ret2);
    cout << ret1 + ret2;
    return 0;
}