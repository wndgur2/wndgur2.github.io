
## 문제

M이상 N이하의 소수를 모두 출력하는 프로그램을 작성하시오.

## 입력

첫째 줄에 자연수 M과 N이 빈 칸을 사이에 두고 주어진다. (1 ≤ M ≤ N ≤ 1,000,000) M이상 N이하의 소수가 하나 이상 있는 입력만 주어진다.

## 출력

한 줄에 하나씩, 증가하는 순서대로 소수를 출력한다.

## 예제 입력 1

3 16

## 예제 출력 1

3  
5  
7  
11  
13

---

### Code

<!-- CODE-APPENDED:Main.java -->
```java
package BOJ.boj_1929;

import java.io.*;
import java.util.Arrays;

public class Main {
    static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    static BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
    static StringBuilder sb = new StringBuilder();

    public static void main(String[] args)throws IOException {
        String[] MN = br.readLine().split(" ");
        int M = Integer.parseInt(MN[0]);
        int N = Integer.parseInt(MN[1]);
        boolean[] isPrime = new boolean[N+1];
        Arrays.fill(isPrime, true);
        isPrime[0]=false;
        isPrime[1]=false;
        for (int i = 2; i < N; i++) {
            for(int j=i*2; j<=N; j+=i){
                isPrime[j] = false;
            }
        }
        for(int i=M; i<=N; i++){
            if(isPrime[i])
                sb.append(i).append('\n');
        }
        bw.write(sb.toString());
        bw.flush();
        bw.close();
        br.close();
    }
}

```
