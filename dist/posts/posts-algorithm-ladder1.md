
## 구현

소요시간 48분

JAVA 알고리즘 세 번째 문제  
이차원 배열을 다루어보았다.
입력 받을 때, Stream.toList()를 사용하려 했으나, 이는 jdk8버전에서는 없는 함수였기에,
StringTokenizer로 각각 추가해주었다.

문제 풀이는 단순 구현이었다.

---

### Code

<!-- CODE-APPENDED:Solution.java -->
```java
package SWEA.swea_1210;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.FileInputStream;
import java.util.*;


public class Solution {
    static BufferedReader bf;
    static final int size = 100;
    public static void main(String[] args) throws IOException{
        System.setIn(new FileInputStream("./input.txt"));
        bf = new BufferedReader(new InputStreamReader(System.in));

        for(int T = 1; T<=10; T++){
            new Solution().solve(T);
        }
    }

    public int x, y;
    public boolean movedLeft, movedRight;
    
    public void solve(int T) throws IOException{
        System.out.print("#" + T + ' ');
        Solution.bf.readLine();
        ArrayList<ArrayList<Integer>> map = new ArrayList<>();
        for(int line=0; line<Solution.size; ++line){
            map.add(new ArrayList<>());
            StringTokenizer st = new StringTokenizer(bf.readLine());
            int idx = 0;
            while(st.hasMoreTokens()){
                int tmp = Integer.parseInt(st.nextToken());
                map.get(line).add(tmp);
                if(tmp==2){
                    this.x = idx;
                    this.y = line;
                }
                idx++;
            }
        }

        while(this.y > 0){
            // System.out.println(Integer.toString(x) + ' ' + Integer.toString(y));
            if(!movedLeft && this.x<Solution.size-1 && map.get(this.y).get(this.x+1) == 1){ // 오른쪽
                this.x++;
                this.movedLeft = false;
                this.movedRight = true;
            } else if(!movedRight && this.x>0 && map.get(this.y).get(this.x-1) == 1){ //왼쪽
                this.x--;
                this.movedRight = false;
                this.movedLeft = true;
            } else{
                this.y--;
                this.movedRight = false;
                this.movedLeft = false;
            }
        }

        System.out.println(this.x);
    }
}

```
