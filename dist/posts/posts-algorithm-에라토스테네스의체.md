
## 문제

에라토스테네스의체는 N보다 작거나 같은 모든 소수를 찾는 유명한 알고리즘이다.

이 알고리즘은 다음과 같다.

2부터 N까지 모든 정수를 적는다.
아직 지우지 않은 수 중 가장 작은 수를 찾는다. 이것을 P라고 하고, 이 수는 소수이다.
P를 지우고, 아직 지우지 않은 P의 배수를 크기 순서대로 지운다.
아직 모든 수를 지우지 않았다면, 다시 2번 단계로 간다.
N, K가 주어졌을 때, K번째 지우는 수를 구하는 프로그램을 작성하시오.

## 입력

첫째 줄에 N과 K가 주어진다. (1 ≤ K < N, max(1, K) < N ≤ 1000)

## 출력

첫째 줄에 K번째 지워진 수를 출력한다.

## 예제 입력 1

7 3

## 예제 출력 1

6

## 예제 입력 2

15 12

## 예제 출력 2

7

## 예제 입력 3

10 7

## 예제 출력 3

9

2, 4, 6, 8, 10, 3, 9, 5, 7 순서대로 지워진다. 7번째 지워진 수는 9이다.

### 풀이

에라토스테네스의체 구현.

각 소수의 n배수는 소수가 아니라는 점을 활용한다.

---

### Code

<!-- CODE-APPENDED:Main.java -->
```java
package BOJ.boj_2960;

import java.io.*;

public class Main {
    static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    public static void main(String[] args) throws IOException {
        String[] NK = br.readLine().split(" ");
        int N = Integer.parseInt(NK[0]);
        int K = Integer.parseInt(NK[1]);
        boolean[] isErased = new boolean[N+1];
        int erasedN = 0;

        for(int i=2; i<=N; ++i){
            for(int j=i; j<=N; j+=i){
                if(!isErased[j]){
                    isErased[j] = true;
                    erasedN ++;
                    if(erasedN == K){
                        System.out.println(j);
                        return;
                    }
                }
            }
        }
    }
}

```
