
소요시간: 27분

# 문제

하나 이상의 연속된 소수의 합으로 나타낼 수 있는 자연수들이 있다. 몇 가지 자연수의 예를 들어 보면 다음과 같다.

3 : 3 (한 가지)
41 : 2+3+5+7+11+13 = 11+13+17 = 41 (세 가지)
53 : 5+7+11+13+17 = 53 (두 가지)
하지만 연속된 소수의 합으로 나타낼 수 없는 자연수들도 있는데, 20이 그 예이다. 7+13을 계산하면 20이 되기는 하나 7과 13이 연속이 아니기에 적합한 표현이 아니다. 또한 한 소수는 반드시 한 번만 덧셈에 사용될 수 있기 때문에, 3+5+5+7과 같은 표현도 적합하지 않다.

자연수가 주어졌을 때, 이 자연수를 연속된 소수의 합으로 나타낼 수 있는 경우의 수를 구하는 프로그램을 작성하시오.

## 입력

첫째 줄에 자연수 N이 주어진다. (1 ≤ N ≤ 4,000,000)

## 출력

첫째 줄에 자연수 N을 연속된 소수의 합으로 나타낼 수 있는 경우의 수를 출력한다.

## 예제 입력 1

20

## 예제 출력 1

0

## 예제 입력 2

3

## 예제 출력 2

1

## 예제 입력 3

41

## 예제 출력 3

3

## 예제 입력 4

53

## 예제 출력 4

2

# 풀이

### 에라토스테네스의체

범위의 소수를 구할 때 사용하는 방법.  
O(n(logn)(logn))이 걸린다.

### 투 포인터

위 방법으로 소수를 구해서 400만까지의 소수의 개수를 출력해보니, 28만개가 나왔다.  
따라서 O(n\*n)으로는 풀 수 없다고 생각했다.  
연속된 소수의 합이라는 조건이 있어서 투 포인터로 시간을 줄일 수 있었다.  
합치는 범위의 시작을 stIdx, 범위의 끝을 endIdx 변수로 유지했다.

결국 문제 해결 시간복잡도는 에라토스테네스의체가 결정하기에 O(n(logn)(logn))이다.

---

### Code

<!-- CODE-APPENDED:Main.java -->
```java
package BOJ.boj_1644;

import java.io.*;

public class Main {
    static final int MAX_N = 4000000;
    static BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
    static BufferedReader br = new BufferedReader((new InputStreamReader(System.in)));
    static StringBuilder sb = new StringBuilder();
    static boolean[] isNotPrime;

    public static void main(String[] args) throws IOException {
        int N = Integer.parseInt(br.readLine());
        isNotPrime = getNotPrimes(N);
        int stN = 2;
        int endN = 2;
        int curSum = 2;
        int res = 0;
        while(endN<=N && stN<=endN){
            if(curSum == N) {
                res++;
                endN = getNextPrime(endN, N);
                curSum += endN;
            } else if(curSum < N){
                endN = getNextPrime(endN, N);
                curSum += endN;
            } else if(curSum > N){
                curSum -= stN;
                stN = getNextPrime(stN, N);
            }
        }
        sb.append(res).append('\n');
        bw.write(sb.toString());
        bw.flush();
        bw.close();
        br.close();
    }

    static boolean[] getNotPrimes(int N){
        boolean[] isNotPrime_ = new boolean[N+1];
        isNotPrime_[0] = true;
        isNotPrime_[1] = true;
        for(int i=2; i<=N; i++){
            if(isNotPrime_[i]) continue;
            for(int j=i*2; j<=N; j+=i){
                isNotPrime_[j] = true;
            }
        }

        return isNotPrime_;
    }

    static int getNextPrime(int i, int N){
        for(i++; i<=N; i++){
            if(!isNotPrime[i]) return i;
        }
        return MAX_N+1;
    }
}

```
