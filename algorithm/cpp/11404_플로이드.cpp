#include<iostream>
#include<vector>
using namespace std;

int size_city;
int INF = 10000000;

void floydWarshall(vector<vector<int>> &init_costs){
    vector<vector<int>> min_costs (size_city, vector<int> (size_city, INF));

    for(int i=0; i<size_city; ++i)
        for(int j=0; j<size_city; ++j)
            min_costs[i][j] = init_costs[i][j];

    for(int k=0; k<size_city; ++k)
        for(int i=0; i<size_city; ++i)
            for(int j=0; j<size_city; ++j)
                if(min_costs[i][k] + min_costs[k][j] < min_costs[i][j])
                    min_costs[i][j] = min_costs[i][k] + min_costs[k][j];

    for(int i=0; i<size_city; ++i){
        for(int j=0; j<size_city; ++j)
            if(min_costs[i][j]==INF) cout << "0 ";
            else cout << min_costs[i][j] << ' ';
        cout << "\n";
    }
}

int main(){
    int size_lane;
    cin >> size_city >> size_lane;
    vector<vector<int>> init_costs (size_city, vector<int> (size_city, INF));
    for(int i=0; i<size_city; ++i)
        init_costs[i][i] = 0;

    int from, to, cost;
    for(int i=0; i<size_lane; ++i){
        cin >> from >> to >> cost;
        if(init_costs[from-1][to-1] > cost)
            init_costs[from-1][to-1] = cost;
    }

    floydWarshall(init_costs);

    return 0;
}