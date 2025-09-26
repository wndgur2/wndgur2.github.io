
18:10~ 19:15

시간초과. 제자리에 머무르는 경우가, 소용돌이를 기다릴 때밖에 없다는 것을 알았고, 그렇게 하지 않으면 계속 기다리는 경우때문에 시간초과에 걸림.
아직 이차원 배열을 자유롭게 다루지 못하고 있음. (시간이 너무 오래 걸림)

## 완전탐색

---

### Code

<!-- CODE-APPENDED:Solution.java -->
```java
package SWEA.swea_4193;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.StringTokenizer;

public class Solution {
    static BufferedReader bf;
    final static int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

    public static void main(String[] args) throws IOException{
        bf = new BufferedReader(new InputStreamReader(System.in));
        int T = Integer.parseInt(bf.readLine());
        for(int t=1; t<=T; t++){
            new Solution().solve(t);
        }
    }

    ArrayList<ArrayList<Integer>> map;
    ArrayList<ArrayList<Boolean>> visited;

    public void solve(int t) throws IOException{
        System.out.print("#" + Integer.toString(t) + " ");
        final int SIZE = Integer.parseInt(bf.readLine());

        // System.out.println(SIZE);

        // map
        this.map = new ArrayList<>();
        this.visited = new ArrayList<>();
        for(int row=0; row<SIZE; row++){
            map.add(new ArrayList<>());
            visited.add(new ArrayList<>());
            StringTokenizer st = new StringTokenizer(bf.readLine());
            while(st.hasMoreTokens()){
                map.get(row).add(Integer.parseInt(st.nextToken()));
                visited.get(row).add(false);
            }
        }

        // System.out.println(map);

        StringTokenizer st = new StringTokenizer(bf.readLine());
        Coordinate startCoord = new Coordinate(Integer.parseInt(st.nextToken()), Integer.parseInt(st.nextToken()));
        st = new StringTokenizer(bf.readLine());
        Coordinate endCoord = new Coordinate(Integer.parseInt(st.nextToken()), Integer.parseInt(st.nextToken()));
        
        Branch branch;
        LinkedList<Branch> queue = new LinkedList<>();
        queue.add(new Branch(startCoord, 0));
        while(!queue.isEmpty()){
            branch = queue.pop();
            if(branch.coord.equals(endCoord)){
                System.out.println(branch.depth);
                return;
            }
            if(branch.coord.isVisited()) continue;
            branch.coord.visit();

            if((branch.depth+1)%3!=0){
                this.visited.get(branch.coord.y).set(branch.coord.x, false);
                queue.add(new Branch(new Coordinate(branch.coord.y, branch.coord.x), branch.depth+1));
            }
            
            for(int i=0; i<4; i++){
                int newY = branch.coord.y + Solution.dirs[i][0];
                int newX = branch.coord.x + Solution.dirs[i][1];
                Coordinate newCoord = new Coordinate(newY, newX);

                // 범위
                if(newY<0 || newY>=SIZE || newX<0 || newX>=SIZE) continue;
                
                // 장애물
                int newValue = map.get(newY).get(newX);
                if(newValue == 1 || (newValue==2 && ((branch.depth+1)%3!=0))) continue;
                
                // visited
                if(newCoord.isVisited()) continue;

                queue.add(new Branch(newCoord, branch.depth+1));
            }
        }
        System.out.println(-1);
    }

    public class Coordinate{
        public int y;
        public int x;

        Coordinate(int y, int x){
            this.y = y;
            this.x = x;
        }
        
        public int getValue(){
            return Solution.this.map.get(this.y).get(this.x);
        }

        public void visit(){
            Solution.this.visited.get(this.y).set(this.x, true);
        }

        public boolean isVisited(){
            return Solution.this.visited.get(this.y).get(this.x);
        }

        public boolean equals(Coordinate coord){
            if(this.y == coord.y && this.x == coord.x) return true;
            else return false;
        }
    }

    public class Branch{
        Coordinate coord;
        int depth;
        Branch(Coordinate coord, int depth){
            this.coord = coord;
            this.depth = depth;
        }
    }
}

```
