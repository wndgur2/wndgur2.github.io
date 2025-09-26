
소요시간 1시간

## 구현

BufferedReader에 이어 BufferedWriter를 써봤다.  
flush();를 해야만 했다.

---

### Code

<!-- CODE-APPENDED:Solution.java -->
```java
package SWEA.swea_1868;
import java.io.*;
import java.util.*;

class Solution
{
    static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    static BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
    static int[][] dirs = {{1,0},{1,1},{1,-1},{0,1},{0,-1},{-1,1},{-1,0},{-1,-1}};

    public static void main(String args[]) throws Exception
    {
        int T;
        T=Integer.parseInt(br.readLine());

        for(int test_case = 1; test_case <= T; test_case++)
        {
            bw.write("#" + Integer.toString(test_case) + " ");
            new Solution().solve();
        }

        br.close();
        bw.flush();
        bw.close();
    }

    ArrayList<char[]> mapVision= new ArrayList<>();
    int SIZE;
    int answer=0;

    public void solve() throws IOException{
        this.SIZE = Integer.parseInt(br.readLine());
        char[] tmp;

        for(int i=0; i<SIZE; i++){
            tmp = br.readLine().toCharArray();
            mapVision.add(tmp);
        }

        // fill nums
        for(int i=0; i<SIZE; i++) {
            for(int j=0; j<SIZE; j++) {
                if (mapVision.get(i)[j] == '.') {
                    int bombN = new Coord(i, j).getBombN();
                    mapVision.get(i)[j] = Character.forDigit(bombN, 10);
                }
            }
        }

        // 영역의 개수 세기
        for(int i=0; i<SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                Coord coord = new Coord(i, j);
                if(coord.getValue() == '0'){
                    answer++;
                    coord.fillArea();
                }
            }
        }
        for(int i=0; i<SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                Coord coord = new Coord(i, j);
                if(coord.getValue() != '*' && coord.getValue() != 'V'){
                    answer++;
                    coord.fillArea();
                }
            }
        }

        bw.write(Integer.toString(answer)+'\n');
    }

    public class Coord{
        int y, x;
        public Coord(int y, int x){
            this.y = y;
            this.x = x;
        }

        boolean isValidate(){
            return y >= 0 && y < Solution.this.SIZE && x >= 0 && x < Solution.this.SIZE;
        }

        char getValue(){
            return Solution.this.mapVision.get(this.y)[this.x];
        }

        void setValue(char c){
            Solution.this.mapVision.get(this.y)[this.x] = c;
        }

        int getBombN(){
            int res = 0;
            for (int dIndex = 0; dIndex < 8; dIndex++) {
                Coord newCoord = new Coord(this.y+dirs[dIndex][0], this.x+dirs[dIndex][1]);
                if(!newCoord.isValidate()) continue;
                if(newCoord.getValue()=='*') res++;
            }
            return res;
        }

        void fillArea(){
            if(getValue()=='V') return;
            if(getValue()!='0') {
                setValue('V');
                return;
            }
            setValue('V');
            for (int dIndex = 0; dIndex < 8; dIndex++) {
                Coord newCoord = new Coord(this.y+dirs[dIndex][0], this.x+dirs[dIndex][1]);
                if(!newCoord.isValidate()) continue;
                if(newCoord.getValue()!='*') newCoord.fillArea();
            }
        }
    }
}

```
