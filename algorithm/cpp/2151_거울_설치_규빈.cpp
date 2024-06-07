#include <iostream>
#include <vector>
#include <queue>

using namespace std;

struct Param
{
   int x;
   int y;
   int d;
};

int n;
vector<vector<char>> house;

vector<pair<int, int>> dir{ {0, 1}, {0, -1}, {1, 0}, {-1, 0} };
vector<vector<vector<int>>> dist; // [x][y][dir]

bool OOB(int x, int y)
{
   return x < 0 || x >= n || y < 0 || y >= n;
}

int min(int a, int b) { return a < b ? a : b; }

int main()
{
   cin >> n;
   dist.assign(n, vector<vector<int>>(n, vector<int>(4, INT32_MAX)));
   house.resize(n, vector<char>(n));

   int answer = INT32_MAX;
   queue<Param> q;
   for (int i = 0; i < n; ++i)
   {
      for (int j = 0; j < n; ++j)
      {
         cin >> house[i][j];

         if (house[i][j] == '#' && q.empty())
         {
            q.push({ i, j, 0 });
            q.push({ i, j, 1 });
            q.push({ i, j, 2 });
            q.push({ i, j, 3 });

            dist[i][j][0] = 0;
            dist[i][j][1] = 0;
            dist[i][j][2] = 0;
            dist[i][j][3] = 0;
         }
      }
   }

   while (!q.empty())
   {
      int x = q.front().x;
      int y = q.front().y;
      int d = q.front().d;
      q.pop();

      int nx = x + dir[d].first;
      int ny = y + dir[d].second;

      if (OOB(nx, ny))
         continue;

      if (dist[nx][ny][d] <= dist[x][y][d])
         continue;

      switch (house[nx][ny])
      {
      case '*':
         continue;
         break;

      case '.':
         q.push({ nx, ny, d });
         dist[nx][ny][d] = dist[x][y][d];
         break;

      case '!':
      {
         q.push({ nx, ny, d });
         dist[nx][ny][d] = dist[x][y][d];

         int nd1 = (d / 2 + 1) % 2 * 2 + 0;
         int nd2 = (d / 2 + 1) % 2 * 2 + 1;
         dist[nx][ny][nd1] = dist[x][y][d] + 1;
         dist[nx][ny][nd2] = dist[x][y][d] + 1;
         q.push({ nx, ny, nd1 });
         q.push({ nx, ny, nd2 });
         break;
      }

      case '#':
         dist[nx][ny][d] = dist[x][y][d];
         answer = min(answer, dist[nx][ny][d]);
         break;

      default:
         break;
      }
   }

   cout << answer << endl;

   return 0;
}