# [백준 14003. 가장 긴 증가하는 부분 수열 5](https://www.acmicpc.net/problem/14003)

## 문제

수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열을 구하는 프로그램을 작성하시오.

예를 들어, 수열 A = {10, 20, 10, 30, 20, 50} 인 경우에 가장 긴 증가하는 부분 수열은 A = {10, 20, 10, 30, 20, 50} 이고, 길이는 4이다.

## 입력
첫째 줄에 수열 A의 크기 N (1 ≤ N ≤ 1,000,000)이 주어진다.

둘째 줄에는 수열 A를 이루고 있는 Ai가 주어진다. (-1,000,000,000 ≤ Ai ≤ 1,000,000,000)

## 출력
첫째 줄에 수열 A의 가장 긴 증가하는 부분 수열의 길이를 출력한다.

둘째 줄에는 정답이 될 수 있는 가장 긴 증가하는 부분 수열을 출력한다.

## 예제 입력 1
6
10 20 10 30 20 50

## 예제 출력 1
4
10 20 30 50

## 풀이

LIS(Longest Increasing Sequence)의 이진탐색을 활용한 기본적인 풀이는 아래와 같다. (LIS 길이 & 부분 수열 출력)

먼저 LIS를 구하기 위해 사용되는 두 배열, DP 배열과 indexes 배열의 의미는 다음과 같다.

이를 만드는 과정은 그 아래에서 보자.

### DP 배열
DP[i]: DP[i]를 마지막 원소로하여 형성할 수 있는 가장 긴 LIS의 길이는 i+1이다.

ex) input = [1, 2, 3, 2, 5]  
    -> DP = [1, 2, 3, 5]

### indexes 배열
indexes[i]: i번째 입력이 DP에 삽입된 위치

ex) input = [1, 2, 3, 2, 5]  
    -> indexes = [0, 1, 2, 1, 3]

이제 형성 과정을 보자

### 아이디어
 DP에 입력된 수를 넣으며 정렬된 배열로 유지한다. 정렬된 배열이기 때문에 이진탐색으로 통해 다음 수를 삽입할 위치를 빠르게 찾을 수 있고, 그 위치가 LIS의 길이와 관련이 있다.

### 배열 형성 과정

1. 주어진 수열을 순회하며 정렬이 유지된 DP 배열에 삽입한다.
    > 이때 DP 배열은 정렬을 유지하므로 이진탐색을 통해 O(logN)에 삽입이 가능하다.
2. 해당 수가 이미 DP 배열에 존재한다면 교체한다. (= 삽입하지 않는다.)
3. 삽입된 자리를 indexes 배열에 저장한다.
    > 부분 수열을 출력하기 위함 (역추적)

필요한 배열을 모두 완성했다.

DP 배열과 indexes 배열의 의미는 다음과 같다.

DP는 이제 별 의미가 없다. 다만, DP의 크기가 LIS의 길이가 된다. 이는 indexes 원소들 중 최댓값 *(+1)* 이기도 하다.

indexes는 해당 수가 삽입된 위치이다. 이를 거꾸로 순회한다면, LIS(순열)을 찾을 수 있다.

LIS를 찾는 과정은 아래와 같다.

### LIS 탐색 과정

1. 우리는 LIS의 길이를 이미 알고 있다. 이를 l이라 하자.
2. indexes에서 값이 l-1인, 즉, LIS의 마지막 수가 되는 값부터 찾는다.
3. 찾았다면 그 앞 수, indexes에서 값이 l-2인 값을 찾는다.
4. l개 원소를 찾을 때까지 반복한다.

이로써 LIS 원소를 역순으로 수집했으니, 이를 다시 역순으로 출력해주면 된다.

## 풀이 시 주의해야할 점

**배열 형성 과정**에서 DP 배열에 입력하고자 하는 수가 존재할 때(2번) 교체한(혹은 삽입하지 않는)다고 했다. 이때, DP 배열에 변화가 없다고 하더라도 **indexes**에는 그 자리를 저장해야한다.

당연한 과정인데 LIS 구현에 급급하다면 놓칠 수 있는 부분이라고 생각한다.

사실 LIS 풀이 자체는 다른 블로그에 많이 올라와있지만 이 부분을 다룬 글이 없어 많이 헤매었고, 글을 작성하게 되었다.

백준 기준으로 82%에서 '틀렸습니다'가 나온다면 이 문제일 것

여기에 해당하는 반례는 아래와 같다.

input  
> 4  
0 2 2 1

ans  
> 2  
0 1

---

### Code

<!-- CODE-APPENDED:Main.java -->
```java
package BOJ.boj_14003;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        int[] numbers = new int[N];
        int[] indexes = new int[N];
        ArrayList<Integer> LIS = new ArrayList<>();

        StringTokenizer st = new StringTokenizer(br.readLine());
        for(int i=0; i<N; i++){
            numbers[i] = Integer.parseInt(st.nextToken());
        }

        for(int i=0; i<N; i++){
            int idx = (-Collections.binarySearch(LIS, numbers[i]) -1);
            // System.out.println(idx);
            // System.out.println("idx:" + idx + ", LIS.size(): " + LIS.size());
            if(idx<0) {
                indexes[i] = -idx-1;
            } else if(idx>= LIS.size()){
                indexes[i] = LIS.size();
                LIS.add(numbers[i]);
            } else{
                indexes[i] = idx;
                LIS.set(idx, numbers[i]);
            }
        }

        // System.out.println(LIS);
        // System.out.println(Arrays.toString(indexes));
        int curIdx = LIS.size()-1;
        ArrayDeque<Integer> stack = new ArrayDeque<>(); 
        for(int i=N-1; i>=0; i--){
            if(indexes[i] == curIdx){
                curIdx--;
                stack.addFirst(numbers[i]);
                if(curIdx==-1) break;
            }
        }
        StringBuilder sb = new StringBuilder();
        sb.append(LIS.size()).append("\n");
        while(!stack.isEmpty())sb.append(stack.pop() + " ");
        System.out.println(sb.toString().trim());
    }
}

```
