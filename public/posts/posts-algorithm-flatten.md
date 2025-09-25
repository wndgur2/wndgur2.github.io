
Flatten

소요시간 50분

SWEA 첫 자바 풀이였다.
input 스트림 연결, class명, static 변수 사용 등을 익혔다.

문제 풀이 자체는 어렵지 않았다.

그런데 더 좋은 풀이가 있었다.

나는 박스들의 높이를 정렬한 후 높은 박스를 하나씩 내려주는 방식으로 풀이했고,

가장 짧은 실행시간의 코드를 보니, 박스의 높이를 index로 하는 배열을 썼다.

왜 이걸 생각 못했나 했고, 앞으론 변수의 범위를 잘 보고, 배열의 index로 쓸 수 있는지 확인해야겠다.

---

### Code

<!-- CODE-APPENDED:Solution.java -->
```java
package SWEA.swea_1208;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class Solution {
    static BufferedReader bufferedReader;

    static ArrayList<Integer> boxHeights;
    static int minIndex;
    public static void main(String[] args) throws IOException {
        System.setIn(new FileInputStream("./input.txt"));
        bufferedReader = new BufferedReader(new InputStreamReader(System.in));

        for(int i=0; i<10; ++i){
            System.out.print("#" + (i + 1) + ' ');
            solve();
        }
    }

    static void solve() throws IOException{
        int maxDumpN = Integer.parseInt(bufferedReader.readLine());
//        System.out.println(maxDumpN);
        StringTokenizer boxHeightsTokens = new StringTokenizer(bufferedReader.readLine());

        boxHeights = new ArrayList<>();
        while(boxHeightsTokens.hasMoreTokens()){
            int height = Integer.parseInt(boxHeightsTokens.nextToken());
//            System.out.print(Integer.toString(height) + ' ');
            boxHeights.add(height);
        }
//        System.out.println();
        boxHeights.sort((o1, o2) -> o1>o2?-1: o1.equals(o2)? 0:1);
        minIndex = boxHeights.size()-1;

        int dumpedN = 0;
        int index = 0;
        int curHeight = boxHeights.get(0);
        while(dumpedN < maxDumpN && index < minIndex && boxHeights.get(index) > boxHeights.get(minIndex)){
            if(boxHeights.get(index) == curHeight){
                dump(index);
                dumpedN++;
                index++;
            } else{
                index = 0;
                curHeight = boxHeights.get(0);
            }
        }

        System.out.println(boxHeights.get(index)-boxHeights.get(minIndex));
    }

    static void dump(int index){
        boxHeights.set(index, boxHeights.get(index)-1);
        int minHeight = boxHeights.get(minIndex);
        boxHeights.set(minIndex, boxHeights.get(minIndex)+1);
        minIndex--;
        if(boxHeights.get(minIndex) != minHeight){
            minIndex = boxHeights.size()-1;
        }
    }
}

```
