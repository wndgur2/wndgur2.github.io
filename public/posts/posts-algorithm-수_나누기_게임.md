
소요시간: 40분

## 문제

《보드게임컵》을 준비하다 지친 은하는 보드게임컵 참가자들을 경기장에 몰아넣고 결투를 시키는 게임 《수 나누기 게임》을 만들었습니다.

《수 나누기 게임》의 규칙은 다음과 같습니다.

게임을 시작하기 전 각 플레이어는  
$1$부터  
$1\,000\,000$ 사이의 수가 적힌 서로 다른 카드를 잘 섞은 뒤 한 장씩 나눠 가집니다.  
매 턴마다 플레이어는 다른 플레이어와 한 번씩 결투를 합니다.  
결투는 서로의 카드를 보여주는 방식으로 진행되며, 플레이어의 카드에 적힌 수로 다른 플레이어의 카드에 적힌 수를 나눴을 때, 나머지가  
$0$이면 승리합니다. 플레이어의 카드에 적힌 수가 다른 플레이어의 카드에 적힌 수로 나누어 떨어지면 패배합니다. 둘 다 아니라면 무승부입니다.  
승리한 플레이어는  
$1$점을 획득하고, 패배한 플레이어는  
$1$점을 잃습니다. 무승부인 경우 점수의 변화가 없습니다.  
본인을 제외한 다른 모든 플레이어와 정확히 한 번씩 결투를 하고 나면 게임이 종료됩니다.  
《수 나누기 게임》의 결과를 가지고 한별이와 내기를 하던 은하는 게임이 종료되기 전에 모든 플레이어의 점수를 미리 알 수 있을지 궁금해졌습니다. 은하를 위해 각 플레이어가 가지고 있는 카드에 적힌 수가 주어졌을 때, 게임이 종료된 후의 모든 플레이어의 점수를 구해주세요.

## 입력

첫 번째 줄에 플레이어의 수  
$N$이 주어집니다.

두 번째 줄에 첫 번째 플레이어부터  
$N$번째 플레이어까지 각 플레이어가 가지고 있는 카드에 적힌 정수  
$x_{1}$,  
$\cdots$,  
$x_{N}$이 공백으로 구분되어 주어집니다.

## 출력

첫 번째 플레이어부터  
$N$번째 플레이어까지 게임이 종료됐을 때의 각 플레이어의 점수를 공백으로 구분하여 출력해주세요.

## 제한

$2 \le N \le 100\,000$   
모든  
$1 \le i \le N$에 대해  
$1 \le x_i \le 1\,000\,000$입니다.  
모든  
$1 \le i < j \le N$에 대해  
$x_i \ne x_j$입니다. 즉, 어떤 수도  
$x$에서 두 번 이상 등장하지 않습니다.  
예제 입력 1  
3  
3 4 12  
예제 출력 1  
1 1 -2  
예제 입력 2  
4  
7 23 8 6  
예제 출력 2  
0 0 0 0

---

### Code

<!-- CODE-APPENDED:Main.java -->
```java
package BOJ.boj_27172;

// 12:45
// 13:26
/**
 * N < 100000
 * x < 1000000
 */
import java.io.*;

public class Main {
    static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    static BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
    static StringBuilder sb = new StringBuilder();

    public static void main(String[] args) throws IOException{
        int N = Integer.parseInt(br.readLine());
        String[] cardsString = br.readLine().split(" ");
        int[] cards = new int[N];
        int i=0, maxN=0;
        for(String cardString: cardsString){
            cards[i++] = Integer.parseInt(cardString);
            if(cards[i-1] > maxN) maxN = cards[i-1];
        }

        int[] scores = new int[maxN+1];
        boolean[] isPresent = new boolean[maxN+1];
        for(int card:cards){
            isPresent[card] = true;
        }

        for(i=0; i<N; i++){
            for(int j=cards[i]*2; j<=maxN; j+=cards[i]){
                // j가 cards에 있으면
                if(isPresent[j]){
                    scores[j]--;
                    scores[cards[i]]++;
                }
                // System.out.println(Arrays.toString(scores));
            }
        }

        for(int card:cards){
            sb.append(scores[card]).append(' ');
        }
        bw.write(sb.toString() + '\n');
        bw.flush();
        bw.close();
        br.close();
    }
}

```
