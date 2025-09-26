
12:35~12:46

문제
준규가 가지고 있는 동전은 총 N종류이고, 각각의 동전을 매우 많이 가지고 있다.

동전을 적절히 사용해서 그 가치의 합을 K로 만들려고 한다. 이때 필요한 동전 개수의 최솟값을 구하는 프로그램을 작성하시오.

입력
첫째 줄에 N과 K가 주어진다. (1 ≤ N ≤ 10, 1 ≤ K ≤ 100,000,000)

둘째 줄부터 N개의 줄에 동전의 가치 Ai가 오름차순으로 주어진다. (1 ≤ Ai ≤ 1,000,000, A1 = 1, i ≥ 2인 경우에 Ai는 Ai-1의 배수)

출력
첫째 줄에 K원을 만드는데 필요한 동전 개수의 최솟값을 출력한다.

> 그리디 문제의 핵심은, 그리디로 풀어도 된다는 것을 알아보는 것?

---

### Code

<!-- CODE-APPENDED:Main.java -->
```java
package BOJ.boj_11047;

import java.io.*;

public class Main{
    static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    static BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
    static StringBuilder sb = new StringBuilder();
    public static void main(String[] args) throws IOException{
        String[] N_COST = br.readLine().split(" ");
        int N = Integer.parseInt(N_COST[0]);
        int cost = Integer.parseInt(N_COST[1]);
        int[] units = new int[N];
        while(N-->0){
            units[N] = Integer.parseInt(br.readLine());
        }
        int currentCost = 0;
        int idx=0, res = 0;
        while(currentCost!=cost){
            if(currentCost>cost){
                currentCost-=units[idx++];
                currentCost+=units[idx];
            } else if(currentCost<cost){
                currentCost+=units[idx];
                res ++;
            }
        }
        sb.append(res).append('\n');
        bw.write(sb.toString());
        bw.flush();
        bw.close();
        br.close();
    }
}
```
