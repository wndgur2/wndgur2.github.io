#include <iostream>
#include <vector>

using namespace std;

typedef pair<int, int> child_t;
int n;
vector<child_t> graph;

int main () {
    cin.tie(0);
    ios_base::sync_with_stdio(false);

    cin >> n;
    graph = vector<child_t>(n+1);
    for (int i=0; i<n; i++){
        int a, b, c;
        cin >> a >> b >> c;
        graph[a].first = b;
        graph[a].second = c;
    }

    int lastNode = 1;
    int cnt = 0;
    while (graph[lastNode].second != -1) {
        cnt++;
        lastNode = graph[lastNode].second;
    }
    cout << (n -1) * 2 - cnt << endl;
}